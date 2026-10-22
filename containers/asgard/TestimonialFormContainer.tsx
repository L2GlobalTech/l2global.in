'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Save,
  Loader2,
  User,
  Building2,
  Briefcase,
  Quote,
  Star,
  Image as ImageIcon,
  CheckCircle2,
  MessageSquareQuote,
  ExternalLink,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { AsgardLayout } from '@/components/asgard/AsgardLayout';
import { LoadingState } from '@/components/asgard/LoadingState';
import ImageUploader from '@/components/asgard/ImageUploader';
import { uploadMedia } from '@/actions/mediaAction';
import { TestimonialFormData, TestimonialRecord } from '@/types/cms';
import {
  getTestimonialById,
  createTestimonial,
  updateTestimonial,
} from '@/app/(asgard)/asgard/testimonials/action';

interface TestimonialFormContainerProps {
  id?: string;
}

export const TestimonialFormContainer: React.FC<TestimonialFormContainerProps> = ({ id }) => {
  const router = useRouter();
  const isEditMode = Boolean(id);

  const [isLoading, setIsLoading] = useState<boolean>(isEditMode);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [formData, setFormData] = useState<TestimonialFormData>({
    name: '',
    role: '',
    company: '',
    title: '',
    desc: '',
    img: '',
    rating: 5,
    display_order: 0,
    is_active: true,
  });

  const [errors, setErrors] = useState<{
    name?: string;
    role?: string;
    desc?: string;
  }>({});

  // Fetch record on mount if edit mode
  useEffect(() => {
    if (isEditMode && id) {
      const loadRecord = async () => {
        try {
          setIsLoading(true);
          const data = await getTestimonialById(id);
          if (!data) {
            toast.error('Testimonial not found');
            router.push('/asgard/testimonials');
            return;
          }

          setFormData({
            id: data.id,
            name: data.name || '',
            role: data.role || '',
            company: data.company || '',
            title: data.title || '',
            desc: data.desc || '',
            img: data.img || '',
            rating: data.rating ?? 5,
            display_order: data.display_order ?? 0,
            is_active: data.is_active ?? true,
          });
        } catch (err) {
          console.error('Error loading testimonial:', err);
          toast.error('Failed to load testimonial details');
        } finally {
          setIsLoading(false);
        }
      };

      loadRecord();
    }
  }, [id, isEditMode, router]);

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: typeof errors = {};
    if (!formData.name?.trim()) {
      newErrors.name = 'Client name is required';
    }
    if (!formData.role?.trim()) {
      newErrors.role = 'Role / Designation is required';
    }
    if (!formData.desc?.trim()) {
      newErrors.desc = 'Testimonial description / feedback is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const first = Object.values(newErrors)[0];
      toast.error(first || 'Please fill in all required fields');
      return;
    }

    try {
      setIsSubmitting(true);
      setErrors({});

      let finalImageUrl = formData.img?.trim() || null;

      // Upload image if a new file is chosen
      if (selectedFile) {
        const uploadRes = await uploadMedia(selectedFile, 'testimonials', 'media');
        if (!uploadRes.success || !uploadRes.url) {
          toast.error(uploadRes.error?.message || 'Failed to upload client photo');
          setIsSubmitting(false);
          return;
        }
        finalImageUrl = uploadRes.url;
      }

      const payload: TestimonialFormData = {
        name: formData.name.trim(),
        role: formData.role.trim(),
        company: formData.company?.trim() || undefined,
        title: formData.title?.trim() || undefined,
        desc: formData.desc.trim(),
        img: finalImageUrl,
        rating: Number(formData.rating) || 5,
        display_order: Number(formData.display_order) || 0,
        is_active: Boolean(formData.is_active),
      };

      if (isEditMode && id) {
        const res = await updateTestimonial(id, payload);
        if (!res.success) {
          toast.error(res.error || 'Failed to update testimonial');
          setIsSubmitting(false);
          return;
        }
        toast.success('Testimonial updated successfully!');
      } else {
        const res = await createTestimonial(payload);
        if (!res.success) {
          toast.error(res.error || 'Failed to create testimonial');
          setIsSubmitting(false);
          return;
        }
        toast.success('Testimonial created successfully!');
      }

      router.push('/asgard/testimonials');
      router.refresh();
    } catch (err: any) {
      console.error('Error saving testimonial:', err);
      toast.error(err.message || 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AsgardLayout>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <Link
            href="/asgard/testimonials"
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Testimonials
          </Link>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <MessageSquareQuote className="w-6 h-6 text-indigo-600" />
            {isEditMode ? 'Edit Testimonial' : 'Create New Testimonial'}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {isEditMode
              ? 'Update client feedback, rating, photo, and carousel settings.'
              : 'Add a new client testimonial to display in the homepage slider.'}
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Link
            href="/asgard/testimonials"
            className="px-4 py-2 border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-lg text-xs font-semibold transition-all"
          >
            Cancel
          </Link>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-all disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                {isEditMode ? 'Update Testimonial' : 'Publish Testimonial'}
              </>
            )}
          </button>
        </div>
      </div>

      {isLoading ? (
        <LoadingState message="Loading testimonial data..." rows={4} />
      ) : (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Testimonial Content & Client Details (2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Client Info Card */}
            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5 border-b border-slate-100 pb-2.5">
                <User className="w-4 h-4 text-indigo-600" />
                Client Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Client Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Client Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (errors.name) setErrors({ ...errors, name: undefined });
                    }}
                    placeholder="e.g. Sophia Moore"
                    className={`w-full px-3 py-2 text-xs bg-slate-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-800 placeholder:text-slate-400 ${
                      errors.name ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200'
                    }`}
                  />
                  {errors.name && (
                    <p className="text-xs text-rose-500 mt-1 font-medium">{errors.name}</p>
                  )}
                </div>

                {/* Role / Designation */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Role / Headline <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => {
                      setFormData({ ...formData, role: e.target.value });
                      if (errors.role) setErrors({ ...errors, role: undefined });
                    }}
                    placeholder="e.g. Marketing Head at BrightEdge Solutions"
                    className={`w-full px-3 py-2 text-xs bg-slate-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-800 placeholder:text-slate-400 ${
                      errors.role ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200'
                    }`}
                  />
                  {errors.role && (
                    <p className="text-xs text-rose-500 mt-1 font-medium">{errors.role}</p>
                  )}
                </div>

                {/* Company Name (Optional) */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Company Name <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={formData.company || ''}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. BrightEdge Solutions"
                      className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-800 placeholder:text-slate-400"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial Quote & Feedback Card */}
            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5 border-b border-slate-100 pb-2.5">
                <Quote className="w-4 h-4 text-indigo-600" />
                Testimonial Content
              </h3>

              {/* Title / Heading Quote */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Headline / Catchy Quote <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <input
                  type="text"
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. “The most reliable design agency we’ve worked with”"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-800 placeholder:text-slate-400 font-medium"
                />
              </div>

              {/* Detailed Description */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Review / Testimonial Body <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={4}
                  value={formData.desc}
                  onChange={(e) => {
                    setFormData({ ...formData, desc: e.target.value });
                    if (errors.desc) setErrors({ ...errors, desc: undefined });
                  }}
                  placeholder="Write the full feedback or review given by the client..."
                  className={`w-full px-3 py-2 text-xs bg-slate-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-800 placeholder:text-slate-400 leading-relaxed ${
                    errors.desc ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200'
                  }`}
                />
                {errors.desc && (
                  <p className="text-xs text-rose-500 mt-1 font-medium">{errors.desc}</p>
                )}
              </div>

              {/* Live Preview Card */}
              <div className="pt-3 border-t border-slate-100">
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Live Card Preview
                </p>
                <div className="p-4 rounded-xl border border-indigo-100 bg-linear-to-br from-indigo-50/40 to-slate-50 space-y-2.5">
                  {formData.title && (
                    <h4 className="text-xs font-bold text-slate-900">
                      {formData.title}
                    </h4>
                  )}
                  <p className="text-xs text-slate-600 italic leading-relaxed">
                    "{formData.desc || 'Review text will appear here...'}"
                  </p>
                  <div className="flex items-center gap-2.5 pt-1">
                    {formData.img ? (
                      <img
                        src={formData.img}
                        alt="Preview"
                        className="w-8 h-8 rounded-full object-cover border border-slate-200"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                        {formData.name ? formData.name.charAt(0).toUpperCase() : 'U'}
                      </div>
                    )}
                    <div>
                      <p className="text-xs font-semibold text-slate-800">
                        {formData.name || 'Client Name'}
                      </p>
                      <p className="text-[10px] text-slate-500">
                        {formData.role || 'Designation'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Settings, Avatar Photo, Rating & Order */}
          <div className="space-y-6">
            {/* Status & Display Settings Card */}
            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5 border-b border-slate-100 pb-2.5">
                <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                Publishing Settings
              </h3>

              {/* Active Toggle */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200">
                <div>
                  <label className="text-xs font-semibold text-slate-800 block">
                    Active Status
                  </label>
                  <span className="text-[11px] text-slate-400">
                    Visible in the homepage carousel
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={Boolean(formData.is_active)}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
                />
              </div>

              {/* Rating Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Rating (Stars)
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating: star })}
                      className="p-1 rounded hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-5 h-5 ${
                          (formData.rating ?? 5) >= star
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-semibold text-slate-600 ml-1">
                    {formData.rating ?? 5} / 5
                  </span>
                </div>
              </div>

              {/* Display Order */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Display Order
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.display_order ?? 0}
                  onChange={(e) =>
                    setFormData({ ...formData, display_order: Number(e.target.value) || 0 })
                  }
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-800"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Lower numbers display first (e.g. 1, 2, 3...)
                </p>
              </div>
            </div>

            {/* Avatar Photo Card */}
            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5 border-b border-slate-100 pb-2.5">
                <ImageIcon className="w-4 h-4 text-indigo-600" />
                Client Avatar Photo
              </h3>

              <div>
                <ImageUploader
                  value={formData.img}
                  onChange={(file) => {
                    setSelectedFile(file);
                    if (!file && !formData.img) {
                      setFormData((prev) => ({ ...prev, img: '' }));
                    }
                  }}
                  onRemove={() => {
                    setSelectedFile(null);
                    setFormData((prev) => ({ ...prev, img: '' }));
                  }}
                  folder="testimonials"
                  label="Upload Avatar Photo"
                  description="Recommended: 1:1 square photo (WebP, PNG, JPG)"
                />
              </div>

              {/* Direct Image URL input */}
              <div className="pt-2 border-t border-slate-100">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Or Direct Image URL / Path
                </label>
                <input
                  type="text"
                  value={formData.img || ''}
                  onChange={(e) => setFormData({ ...formData, img: e.target.value })}
                  placeholder="/assets/web/testimonials/sophia-moore.webp"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-800 placeholder:text-slate-400"
                />
              </div>
            </div>
          </div>
        </form>
      )}
    </AsgardLayout>
  );
};
