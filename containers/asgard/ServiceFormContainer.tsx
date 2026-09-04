'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Loader2, Layers, Plus, Trash2, ChevronDown, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { AsgardLayout } from '@/components/asgard/AsgardLayout';
import { LoadingState } from '@/components/asgard/LoadingState';
import ImageUploader from '@/components/asgard/ImageUploader';
import { uploadMedia, getMediaPublicUrl, deleteMedia } from '@/actions/mediaAction';
import {
  getServiceById,
  createService,
  updateService,
  ServiceRecord,
} from '@/app/(asgard)/asgard/services/action';

interface ServiceFormContainerProps {
  id?: string;
}

const inputClass =
  'w-full px-3.5 py-2.5 text-sm text-slate-900 bg-slate-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-slate-400';

export const ServiceFormContainer: React.FC<ServiceFormContainerProps> = ({ id }) => {
  const router = useRouter();
  const isEditMode = Boolean(id);
  const [initialLoading, setInitialLoading] = useState(isEditMode);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Controlled form state
  const [formData, setFormData] = useState<ServiceRecord>({
    title: '',
    slug: '',
    badge_text: '',
    short_descriptior: '',
    short_description: '',
    description: '',
    features: [''],
    media_id: null,
    cta_text: 'Get Started',
    cta_url: '#',
    sort_order: 0,
    is_active: true,
  });

  const [file, setFile] = useState<File | null>(null);
  const [existingMediaUrl, setExistingMediaUrl] = useState<string>('');
  const initialMediaIdRef = useRef<string | null>(null);

  // If edit mode, fetch service details by ID via Action
  useEffect(() => {
    async function loadService() {
      if (!id) {
        setInitialLoading(false);
        return;
      }

      try {
        setInitialLoading(true);
        const service = await getServiceById(id);

        if (!service) {
          toast.error('Service not found');
          router.push('/asgard/services');
          return;
        }

        initialMediaIdRef.current = service.media_id || null;

        if (service.media_id) {
          const publicUrl = getMediaPublicUrl(service.media_id, 'services');
          if (publicUrl) {
            setExistingMediaUrl(publicUrl);
          }
        }

        const featuresArray = Array.isArray(service.features) && service.features.length > 0
          ? service.features.map((f: any) => typeof f === 'string' ? f : JSON.stringify(f))
          : [''];

        setFormData({
          title: service.title || '',
          slug: service.slug || '',
          badge_text: service.badge_text || '',
          short_descriptior: service.short_descriptior || service.short_description || '',
          short_description: service.short_description || service.short_descriptior || '',
          description: service.description || '',
          features: featuresArray,
          media_id: service.media_id || null,
          cta_text: service.cta_text || 'Get Started',
          cta_url: service.cta_url || '#',
          sort_order: typeof service.sort_order === 'number' ? service.sort_order : 0,
          is_active: service.is_active ?? true,
        });
      } catch (err: any) {
        console.error('Error fetching service:', err);
        toast.error('Failed to load service details');
        router.push('/asgard/services');
      } finally {
        setInitialLoading(false);
      }
    }

    if (isEditMode) {
      loadService();
    }
  }, [id, isEditMode, router]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Feature items handlers
  const handleFeatureChange = (index: number, value: string) => {
    setFormData((prev) => {
      const newFeatures = [...(prev.features || [])];
      newFeatures[index] = value;
      return { ...prev, features: newFeatures };
    });
  };

  const handleAddFeature = () => {
    setFormData((prev) => ({
      ...prev,
      features: [...(prev.features || []), ''],
    }));
  };

  const handleRemoveFeature = (index: number) => {
    setFormData((prev) => {
      const current = prev.features || [];
      if (current.length <= 1) return { ...prev, features: [''] };
      const newFeatures = current.filter((_, i) => i !== index);
      return { ...prev, features: newFeatures };
    });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const title = formData.title?.trim();
    if (!title) {
      toast.error('Service title is required');
      return;
    }

    try {
      setIsSubmitting(true);

      let resolvedMediaId: string | null = initialMediaIdRef.current;

      // 1. If a new image was selected/cropped, upload to Supabase Storage 'media' bucket under 'services/'
      if (file) {
        const uploadToast = toast.loading('Uploading service media to storage...');
        const uploadRes = await uploadMedia(file, 'services');
        toast.dismiss(uploadToast);

        if (!uploadRes.success || !uploadRes.storagePath) {
          toast.error(uploadRes.error || 'Failed to upload service image to media bucket.');
          setIsSubmitting(false);
          return;
        }

        resolvedMediaId = uploadRes.storagePath; // e.g. "services/1725451234-uuid-name.webp"
      } else if (!existingMediaUrl) {
        // User explicitly removed the image
        resolvedMediaId = null;
      } else {
        // User kept existing image
        resolvedMediaId = initialMediaIdRef.current;
      }

      // Filter empty features
      const cleanFeatures = (formData.features || [])
        .map((f: any) => (typeof f === 'string' ? f.trim() : f))
        .filter((f: any) => (typeof f === 'string' ? f.length > 0 : Boolean(f)));

      const shortDesc = formData.short_descriptior?.trim() || formData.short_description?.trim() || null;

      const payload: ServiceRecord = {
        title,
        slug: formData.slug?.trim() || null,
        badge_text: formData.badge_text?.trim() || null,
        short_descriptior: shortDesc,
        short_description: shortDesc,
        description: formData.description?.trim() || null,
        features: cleanFeatures,
        media_id: resolvedMediaId,
        cta_text: formData.cta_text?.trim() || 'Get Started',
        cta_url: formData.cta_url?.trim() || '#',
        sort_order: Number(formData.sort_order) || 0,
        is_active: Boolean(formData.is_active),
      };

      if (isEditMode && id) {
        const res = await updateService(id, payload);
        if (!res.success) {
          toast.error(res.error || 'Failed to update service');
          setIsSubmitting(false);
          return;
        }

        // 2. Safe cleanup: Only delete old image after DB update succeeded AND image was replaced
        if (
          initialMediaIdRef.current &&
          initialMediaIdRef.current !== resolvedMediaId
        ) {
          await deleteMedia(initialMediaIdRef.current);
        }

        toast.success(`Service "${title}" updated successfully!`);
      } else {
        const res = await createService(payload);
        if (!res.success) {
          toast.error(res.error || 'Failed to create service');
          setIsSubmitting(false);
          return;
        }
        toast.success(`Service "${title}" created successfully!`);
      }

      router.push('/asgard/services');
    } catch (err: any) {
      console.error('Error saving service:', err);
      toast.error(err.message || 'Failed to save service');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AsgardLayout>
      <div className=" ">
        {/* Top Header with Breadcrumbs & Action Buttons */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <Link href="/asgard/overview" className="hover:text-slate-900 transition-colors">
                CMS
              </Link>
              <span>/</span>
              <Link href="/asgard/services" className="hover:text-slate-900 transition-colors">
                Services
              </Link>
              <span>/</span>
              <span className="text-slate-800 font-semibold">
                {isEditMode ? 'Edit Service' : 'Create Service'}
              </span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2.5">
              <Layers className="w-6 h-6 text-indigo-600" />
              <span>{isEditMode ? 'Edit Service Offering' : 'Create New Service Offering'}</span>
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              {isEditMode
                ? 'Update your service details, features, deliverables, media, and CTA settings.'
                : 'Fill in the information below to add and publish a new service capability.'}
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/asgard/services"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors cursor-pointer shadow-2xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Services</span>
            </Link>
          </div>
        </div>

        {/* Content Body */}
        {initialLoading ? (
          <LoadingState message="Loading service details..." rows={5} />
        ) : (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs max-w-4xl">
            <form onSubmit={handleFormSubmit} className="space-y-6 text-xs">
              {/* Service Title */}
              <div>
                <label className="block text-xs font-semibold text-slate-900 mb-1.5">
                  Service Title*
                </label>
                <input
                  name="title"
                  type="text"
                  required
                  placeholder="e.g. AWS Cloud Transformation & DevOps"
                  value={formData.title || ''}
                  onChange={handleInputChange}
                  className={inputClass}
                />
              </div>

              {/* Grid: Slug & Badge Text */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-900 mb-1.5">
                    Slug / URL Key (Optional)
                  </label>
                  <input
                    name="slug"
                    type="text"
                    placeholder="e.g. aws-cloud-transformation"
                    value={formData.slug || ''}
                    onChange={handleInputChange}
                    className={`${inputClass} font-mono`}
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    Auto-generated from title if left empty.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-900 mb-1.5">
                    Badge Text (Tag / Highlight)
                  </label>
                  <input
                    name="badge_text"
                    type="text"
                    placeholder="e.g. Popular, Enterprise, New"
                    value={formData.badge_text || ''}
                    onChange={handleInputChange}
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Grid: Status & Sort Order */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-900 mb-1.5">
                    Active Status
                  </label>
                  <div className="relative">
                    <select
                      name="is_active"
                      value={formData.is_active ? 'true' : 'false'}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          is_active: e.target.value === 'true',
                        }))
                      }
                      className={`${inputClass} pr-10 appearance-none cursor-pointer`}
                    >
                      <option value="true">Active (Visible)</option>
                      <option value="false">Inactive (Hidden)</option>
                    </select>
                    <ChevronDown
                      size={16}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-900 mb-1.5">
                    Display Sort Order
                  </label>
                  <input
                    name="sort_order"
                    type="number"
                    placeholder="0"
                    value={formData.sort_order ?? 0}
                    onChange={handleInputChange}
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Global Image Uploader & Cropper */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Service Feature Media / Cover
                </label>
                <ImageUploader
                  value={existingMediaUrl}
                  onChange={(newFile: File | null) => setFile(newFile)}
                  onRemove={() => {
                    setFile(null);
                    setExistingMediaUrl('');
                    setFormData((prev) => ({ ...prev, media_id: null }));
                  }}
                  folder="services"
                  width={800}
                  height={500}
                  aspectRatio={1.6}
                  label="Upload Service Cover Image"
                  description="PNG, JPG, or WebP (max 50MB)"
                  maxSizeMB={50}
                />
              </div>

              {/* Short Description */}
              <div>
                <label className="block text-xs font-semibold text-slate-900 mb-1.5">
                  Short Description / Summary
                </label>
                <textarea
                  name="short_descriptior"
                  rows={2}
                  placeholder="A brief 1-2 sentence overview of this service..."
                  value={formData.short_descriptior || ''}
                  onChange={handleInputChange}
                  className={`${inputClass} resize-y`}
                />
              </div>

              {/* Full Description */}
              <div>
                <label className="block text-xs font-semibold text-slate-900 mb-1.5">
                  Full Service Description
                </label>
                <textarea
                  name="description"
                  rows={4}
                  placeholder="Comprehensive description of the service deliverables, methodologies, and customer outcomes..."
                  value={formData.description || ''}
                  onChange={handleInputChange}
                  className={`${inputClass} resize-y`}
                />
              </div>

              {/* Dynamic Features JSON Array */}
              <div className="p-4 bg-slate-50/80 border border-slate-200 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-xs font-semibold text-slate-900">
                      Key Features & Deliverables (features jsonb)
                    </label>
                    <p className="text-[11px] text-slate-500">
                      Add the bullet points and key highlights for this service.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddFeature}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Feature</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {(formData.features || []).map((feature: string, index: number) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <input
                        type="text"
                        placeholder={`Feature point #${index + 1}`}
                        value={feature || ''}
                        onChange={(e) => handleFeatureChange(index, e.target.value)}
                        className={`${inputClass} py-2`}
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(index)}
                        className="p-2 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                        title="Remove feature"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Grid: CTA Text & CTA URL */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-900 mb-1.5">
                    CTA Button Text
                  </label>
                  <input
                    name="cta_text"
                    type="text"
                    placeholder="Get Started"
                    value={formData.cta_text || 'Get Started'}
                    onChange={handleInputChange}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-900 mb-1.5">
                    CTA Destination URL
                  </label>
                  <input
                    name="cta_url"
                    type="text"
                    placeholder="# or /contact-us"
                    value={formData.cta_url || '#'}
                    onChange={handleInputChange}
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Footer Actions */}
              <div className="pt-6 border-t border-slate-200 flex items-center justify-end gap-3">
                <Link
                  href="/asgard/services"
                  className="px-5 py-2.5 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all shadow-md shadow-indigo-600/20 hover:shadow-lg hover:shadow-indigo-600/30 disabled:opacity-60 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>{isEditMode ? 'Updating...' : 'Creating...'}</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>{isEditMode ? 'Update Service' : 'Publish Service'}</span>
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
