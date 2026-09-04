'use client';

import React, { useState, useEffect } from 'react';
import { X, Sparkles, Loader2 } from 'lucide-react';
import { AForm, AFormInput } from '@ascendtis/react-a-form';
import { BlogItem, BlogFormData } from '@/types/cms';

interface BlogFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: BlogFormData) => Promise<void>;
  initialData?: BlogItem | null;
  isSubmitting?: boolean;
}

export const BlogFormModal: React.FC<BlogFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isSubmitting = false,
}) => {
  const [formData, setFormData] = useState<BlogFormData>({
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

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        subtitle: initialData.subtitle || '',
        tag: initialData.tag || '',
        is_featured: Boolean(initialData.is_featured),
        media_id: initialData.media_id || null,
        alt_text: initialData.alt_text || '',
        sub_description: initialData.sub_description || '',
        meta_description: initialData.meta_descriptior || initialData.meta_description || '',
        meta_keywords: initialData.meta_keywords || '',
        content: initialData.content || '',
      });
    } else {
      setFormData({
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
    }
  }, [initialData, isOpen]);

  const handleFormSubmit = async (values: any) => {
    const finalData: BlogFormData = {
      title: values?.title || formData.title,
      subtitle: values?.subtitle ?? formData.subtitle ?? '',
      tag: values?.tag ?? formData.tag ?? '',
      is_featured: values?.is_featured === 'true' || values?.is_featured === true || formData.is_featured,
      media_id: values?.media_id ? values.media_id.trim() : null,
      alt_text: values?.alt_text ?? formData.alt_text ?? '',
      sub_description: values?.sub_description ?? formData.sub_description ?? '',
      meta_description: values?.meta_description ?? values?.meta_descriptior ?? formData.meta_description ?? '',
      meta_descriptior: values?.meta_description ?? values?.meta_descriptior ?? formData.meta_description ?? '',
      meta_keywords: values?.meta_keywords ?? formData.meta_keywords ?? '',
      content: values?.content ?? formData.content ?? '',
    };
    await onSubmit(finalData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-2xl w-full my-6 p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-150 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-xl font-bold text-slate-900">
              {initialData ? 'Edit Blog Article' : 'Create New Blog'}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {initialData
                ? 'Update your blog article details and SEO metadata.'
                : 'Fill in the information below to create a new blog article.'}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="flex-1 overflow-y-auto py-4 pr-1">
          <AForm
            onSubmit={handleFormSubmit}
            values={formData}
            formLoading={isSubmitting}
            className="space-y-4 text-xs"
          >
            {/* Title */}
            <div>
              <AFormInput
                name="title"
                label="Blog Title*"
                placeholder="e.g. The Future of Event Management"
                type="text"
                validation={{ required: true }}
                inputStyle={{
                  borderRadius: '6px',
                  border: '1px solid #1e293b',
                  backgroundColor: '#f1f5f9',
                  padding: '9px 12px',
                  fontSize: '14px',
                  width: '100%',
                  outline: 'none',
                  color: '#0f172a',
                }}
              />
            </div>

            {/* Subtitle */}
            <div>
              <AFormInput
                name="subtitle"
                label="Subtitle"
                placeholder="How technology is transforming modern events..."
                type="text"
                inputStyle={{
                  borderRadius: '6px',
                  border: '1px solid #1e293b',
                  backgroundColor: '#f1f5f9',
                  padding: '9px 12px',
                  fontSize: '14px',
                  width: '100%',
                  outline: 'none',
                  color: '#0f172a',
                }}
              />
            </div>

            {/* Grid: Tag & Is Featured */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <AFormInput
                  name="tag"
                  label="Tag / Category"
                  placeholder="e.g. Event Management, Cloud"
                  type="text"
                  inputStyle={{
                    borderRadius: '6px',
                    border: '1px solid #1e293b',
                    backgroundColor: '#f1f5f9',
                    padding: '9px 12px',
                    fontSize: '14px',
                    width: '100%',
                    outline: 'none',
                    color: '#0f172a',
                  }}
                />
              </div>

              <div>
                <AFormInput
                  name="is_featured"
                  label="Featured Article"
                  type="select"
                  options={[
                    { value: 'false', label: 'Standard Blog' },
                    { value: 'true', label: '⭐ Featured Article' },
                  ]}
                  inputStyle={{
                    borderRadius: '6px',
                    border: '1px solid #cbd5e1',
                    backgroundColor: '#ffffff',
                    padding: '9px 12px',
                    fontSize: '14px',
                    width: '100%',
                    outline: 'none',
                    color: '#0f172a',
                  }}
                />
              </div>
            </div>

            {/* Grid: Media ID & Alt Text */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <AFormInput
                  name="media_id"
                  label="Media Record ID (Optional UUID)"
                  placeholder="e.g. 550e8400-e29b-41d4-a716-446655440000"
                  type="text"
                  inputStyle={{
                    borderRadius: '6px',
                    border: '1px solid #1e293b',
                    backgroundColor: '#f1f5f9',
                    padding: '9px 12px',
                    fontSize: '14px',
                    width: '100%',
                    fontFamily: 'monospace',
                    outline: 'none',
                    color: '#0f172a',
                  }}
                />
              </div>

              <div>
                <AFormInput
                  name="alt_text"
                  label="Image Alt Text"
                  placeholder="Future of Event Management"
                  type="text"
                  inputStyle={{
                    borderRadius: '6px',
                    border: '1px solid #1e293b',
                    backgroundColor: '#f1f5f9',
                    padding: '9px 12px',
                    fontSize: '14px',
                    width: '100%',
                    outline: 'none',
                    color: '#0f172a',
                  }}
                />
              </div>
            </div>

            {/* Sub Description */}
            <div>
              <AFormInput
                name="sub_description"
                label="Short Description / Summary"
                placeholder="Discover how modern technology is changing the way events are planned..."
                type="textarea"
                inputStyle={{
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: '#f1f5f9',
                  padding: '10px 14px',
                  fontSize: '14px',
                  width: '100%',
                  minHeight: '76px',
                  outline: 'none',
                  color: '#0f172a',
                }}
              />
            </div>

            {/* Meta Keywords & Description */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <AFormInput
                  name="meta_keywords"
                  label="Meta Keywords (SEO)"
                  placeholder="event management, event technology, digital events"
                  type="text"
                  inputStyle={{
                    borderRadius: '6px',
                    border: '1px solid #1e293b',
                    backgroundColor: '#f1f5f9',
                    padding: '9px 12px',
                    fontSize: '14px',
                    width: '100%',
                    outline: 'none',
                    color: '#0f172a',
                  }}
                />
              </div>
              <div>
                <AFormInput
                  name="meta_description"
                  label="Meta Description (SEO)"
                  placeholder="Learn how modern event management technology is transforming events..."
                  type="text"
                  inputStyle={{
                    borderRadius: '6px',
                    border: '1px solid #1e293b',
                    backgroundColor: '#f1f5f9',
                    padding: '9px 12px',
                    fontSize: '14px',
                    width: '100%',
                    outline: 'none',
                    color: '#0f172a',
                  }}
                />
              </div>
            </div>

            {/* Article Body Content */}
            <div>
              <AFormInput
                name="content"
                label="Article Body / Content (Supports Rich HTML or Plain Text)"
                placeholder="<h2>The Future of Event Management</h2><p>Write your article...</p>"
                type="textarea"
                inputStyle={{
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: '#f1f5f9',
                  padding: '12px 14px',
                  fontSize: '14px',
                  width: '100%',
                  minHeight: '160px',
                  outline: 'none',
                  color: '#0f172a',
                  fontFamily: 'monospace',
                }}
              />
            </div>

            {/* Form Actions Footer */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-5 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-xs disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                {isSubmitting ? 'Saving...' : initialData ? 'Update Blog' : 'Create Blog'}
              </button>
            </div>
          </AForm>
        </div>
      </div>
    </div>
  );
};
