'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Loader2, FileText, ChevronDown } from 'lucide-react';
import toast from 'react-hot-toast';
import { AsgardLayout } from '@/components/asgard/AsgardLayout';
import { LoadingState } from '@/components/asgard/LoadingState';
import ImageUploader from '@/components/asgard/ImageUploader';
import { RichTextEditor } from '@/components/asgard/RichTextEditor';
import { uploadMedia, getMediaPublicUrl, deleteMedia } from '@/actions/mediaAction';
import {
  getBlogById,
  createBlog,
  updateBlog,
  BlogRecord,
} from '@/app/(asgard)/asgard/blogs/action';

interface BlogFormContainerProps {
  id?: string;
}

const inputClass =
  'w-full px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 bg-slate-100 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-slate-400';

export const BlogFormContainer: React.FC<BlogFormContainerProps> = ({ id }) => {
  const router = useRouter();
  const isEditMode = Boolean(id);
  const [initialLoading, setInitialLoading] = useState(isEditMode);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Controlled form state
  const [formData, setFormData] = useState<BlogRecord>({
    title: '',
    subtitle: '',
    tag: '',
    is_featured: false,
    media_id: null,
    alt_text: '',
    sub_description: '',
    meta_description: '',
    meta_keywords: '',
    content: '',
  });

  const [file, setFile] = useState<File | null>(null);
  const [existingMediaUrl, setExistingMediaUrl] = useState<string>('');
  const initialMediaIdRef = useRef<string | null>(null);

  // If edit mode, fetch blog details by ID via Action
  useEffect(() => {
    async function loadBlog() {
      if (!id) {
        setInitialLoading(false);
        return;
      }

      try {
        setInitialLoading(true);
        const blog = await getBlogById(id);

        if (!blog) {
          toast.error('Blog article not found');
          router.push('/asgard/blogs');
          return;
        }

        initialMediaIdRef.current = blog.media_id || null;

        if (blog.media_id) {
          const publicUrl = getMediaPublicUrl(blog.media_id, 'blogs');
          if (publicUrl) {
            setExistingMediaUrl(publicUrl);
          }
        }

        setFormData({
          title: blog.title || '',
          subtitle: blog.subtitle || '',
          tag: blog.tag || '',
          is_featured: Boolean(blog.is_featured),
          media_id: blog.media_id || null,
          alt_text: blog.alt_text || '',
          sub_description: blog.sub_description || '',
          meta_description: blog.meta_description || blog.meta_descriptior || '',
          meta_keywords: blog.meta_keywords || '',
          content: blog.content || '',
        });
      } catch (err: any) {
        console.error('Error fetching blog:', err);
        toast.error('Failed to load blog details');
        router.push('/asgard/blogs');
      } finally {
        setInitialLoading(false);
      }
    }

    if (isEditMode) {
      loadBlog();
    }
  }, [id, isEditMode, router]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const title = formData.title?.trim();
    if (!title) {
      toast.error('Please provide a title for the blog article.');
      return;
    }

    try {
      setIsSubmitting(true);
      let mediaId = formData.media_id;

      // Handle Cover image upload if file selected
      if (file) {
        const uploadRes = await uploadMedia(file, 'blogs');
        if (!uploadRes.success || !uploadRes.storagePath) {
          toast.error(uploadRes.error || 'Failed to upload blog image');
          setIsSubmitting(false);
          return;
        }
        mediaId = uploadRes.storagePath;
      }

      const payloadData: BlogRecord = {
        title,
        subtitle: formData.subtitle?.trim() || null,
        tag: formData.tag?.trim() || null,
        is_featured: Boolean(formData.is_featured),
        media_id: mediaId,
        alt_text: formData.alt_text?.trim() || null,
        sub_description: formData.sub_description?.trim() || null,
        meta_description: formData.meta_description?.trim() || formData.meta_descriptior?.trim() || null,
        meta_descriptior: formData.meta_descriptior?.trim() || formData.meta_description?.trim() || null,
        meta_keywords: formData.meta_keywords?.trim() || null,
        content: formData.content || null,
      };

      if (isEditMode && id) {
        const res = await updateBlog(id, payloadData);
        if (!res.success) {
          toast.error(res.error || 'Failed to update blog');
          setIsSubmitting(false);
          return;
        }

        // Cleanup old media if replaced
        if (file && initialMediaIdRef.current && initialMediaIdRef.current !== mediaId) {
          await deleteMedia(initialMediaIdRef.current);
        }

        toast.success(`Blog "${title}" updated successfully!`);
      } else {
        const res = await createBlog(payloadData);
        if (!res.success) {
          toast.error(res.error || 'Failed to create blog');
          setIsSubmitting(false);
          return;
        }
        toast.success(`Blog "${title}" published successfully!`);
      }

      router.push('/asgard/blogs');
    } catch (err: any) {
      console.error('Error saving blog:', err);
      toast.error(err.message || 'Failed to save blog');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AsgardLayout>
      <div>
        {/* Top Header with Breadcrumbs & Action Buttons */}
        <div className="mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
              <Link href="/asgard/overview" className="hover:text-slate-900 transition-colors font-medium">
                CMS
              </Link>
              <span>/</span>
              <Link href="/asgard/blogs" className="hover:text-slate-900 transition-colors font-medium">
                Blogs
              </Link>
              <span>/</span>
              <span className="text-slate-800 font-semibold">
                {isEditMode ? 'Edit Blog' : 'Create Blog'}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2.5">
              <FileText className="w-6 h-6 text-indigo-600" />
              <span>{isEditMode ? 'Edit Blog Article' : 'Create New Blog Article'}</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              {isEditMode
                ? 'Update your blog article fields, rich text content, and cover media.'
                : 'Fill in the information below to author and publish a new blog article.'}
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/asgard/blogs"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-medium text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors cursor-pointer shadow-2xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Blogs</span>
            </Link>
          </div>
        </div>

        {/* Content Body */}
        {initialLoading ? (
          <LoadingState message="Loading blog article details..." rows={5} />
        ) : (
          <div className="bg-white rounded-2xl p-5 sm:p-7 border border-slate-200 shadow-xs max-w-4xl">
            <form onSubmit={handleFormSubmit} className="space-y-5 text-xs sm:text-sm">
              {/* Blog Title */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-slate-900 mb-1.5">
                  Blog Title <span className="text-rose-500">*</span>
                </label>
                <input
                  name="title"
                  type="text"
                  required
                  placeholder="e.g. The Future of Cloud Integrations"
                  value={formData.title || ''}
                  onChange={handleInputChange}
                  className={inputClass}
                />
              </div>

              {/* Subtitle */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-slate-900 mb-1.5">
                  Subtitle
                </label>
                <input
                  name="subtitle"
                  type="text"
                  placeholder="How modern architectures are streamlining operations..."
                  value={formData.subtitle || ''}
                  onChange={handleInputChange}
                  className={inputClass}
                />
              </div>

              {/* Grid: Tag & Featured */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-slate-900 mb-1.5">
                    Tag / Category
                  </label>
                  <input
                    name="tag"
                    type="text"
                    placeholder="e.g. Cloud & DevOps, Integration"
                    value={formData.tag || ''}
                    onChange={handleInputChange}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-slate-900 mb-1.5">
                    Featured Article Status
                  </label>
                  <div className="relative">
                    <select
                      name="is_featured"
                      value={formData.is_featured ? 'true' : 'false'}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          is_featured: e.target.value === 'true',
                        }))
                      }
                      className={`${inputClass} pr-10 appearance-none cursor-pointer`}
                    >
                      <option value="false">Standard Blog</option>
                      <option value="true">Featured Article</option>
                    </select>
                    <ChevronDown
                      size={16}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
                    />
                  </div>
                </div>
              </div>

              {/* Global Image Uploader & Cropper */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-800 uppercase tracking-wider">
                  Blog Cover Image
                </label>
                <ImageUploader
                  value={existingMediaUrl}
                  onChange={(newFile: File | null) => setFile(newFile)}
                  onRemove={() => {
                    setFile(null);
                    setExistingMediaUrl('');
                    setFormData((prev) => ({ ...prev, media_id: null }));
                  }}
                  folder="blogs"
                  width={800}
                  height={500}
                  aspectRatio={1.6}
                  label="Upload Blog Cover Image"
                  description="PNG, JPG, or WebP (max 50MB)"
                  maxSizeMB={50}
                />
              </div>

              {/* Alt Text Input */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-slate-900 mb-1.5">
                  Image Alt Text / Caption
                </label>
                <input
                  name="alt_text"
                  type="text"
                  placeholder="e.g. Overview of cloud infrastructure"
                  value={formData.alt_text || ''}
                  onChange={handleInputChange}
                  className={inputClass}
                />
              </div>

              {/* Short Description */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-slate-900 mb-1.5">
                  Short Description / Summary
                </label>
                <textarea
                  name="sub_description"
                  rows={3}
                  placeholder="Discover how modern technology is changing the way events are planned..."
                  value={formData.sub_description || ''}
                  onChange={handleInputChange}
                  className={`${inputClass} resize-y`}
                />
              </div>

              {/* SEO Meta Description */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-800 uppercase tracking-wider">
                  SEO Meta Description
                </label>
                <textarea
                  name="meta_description"
                  rows={2}
                  placeholder="Search engine meta description snippet..."
                  value={formData.meta_description || ''}
                  onChange={handleInputChange}
                  className={inputClass}
                />
              </div>

              {/* SEO Meta Keywords */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-800 uppercase tracking-wider">
                  SEO Meta Keywords
                </label>
                <input
                  type="text"
                  name="meta_keywords"
                  placeholder="comma, separated, keywords, for, seo"
                  value={formData.meta_keywords || ''}
                  onChange={handleInputChange}
                  className={inputClass}
                />
              </div>

              {/* WYSIWYG Rich Text Editor for Content */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-slate-900 mb-1.5">
                  Article Body / Content
                </label>
                <RichTextEditor
                  value={formData.content || ''}
                  onChange={(html: string) => {
                    setFormData((prev) => ({ ...prev, content: html }));
                  }}
                  placeholder="Start composing your article with headings, paragraphs, lists, formatting, and tables..."
                  minHeight="300px"
                />
              </div>

              {/* Footer Actions */}
              <div className="pt-5 border-t border-slate-200 flex items-center justify-end gap-3">
                <Link
                  href="/asgard/blogs"
                  className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-1.5 px-5 py-2 text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all shadow-xs hover:shadow-sm disabled:opacity-60 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>{isEditMode ? 'Updating...' : 'Publishing...'}</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>{isEditMode ? 'Update Blog Article' : 'Publish Blog Article'}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </AsgardLayout>
  );
};
