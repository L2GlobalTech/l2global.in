'use client';

import React, { useState, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';
import { AForm, AFormInput } from '@ascendtis/react-a-form';
import { ServiceItem, ServiceFormData } from '@/types/cms';

interface ServiceFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ServiceFormData) => Promise<void>;
  initialData?: ServiceItem | null;
  isSubmitting?: boolean;
}

export const ServiceFormModal: React.FC<ServiceFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isSubmitting = false,
}) => {
  const [formData, setFormData] = useState<ServiceFormData>({
    title: '',
    slug: '',
    badge_text: '',
    short_descriptior: '',
    short_description: '',
    description: '',
    media_id: null,
    cta_text: 'Get Started',
    cta_url: '#',
    sort_order: 0,
    is_active: true,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        slug: initialData.slug || '',
        badge_text: initialData.badge_text || '',
        short_descriptior: initialData.short_descriptior || initialData.short_description || '',
        short_description: initialData.short_description || initialData.short_descriptior || '',
        description: initialData.description || '',
        features: Array.isArray(initialData.features) ? initialData.features : [],
        media_id: initialData.media_id || null,
        cta_text: initialData.cta_text || 'Get Started',
        cta_url: initialData.cta_url || '#',
        sort_order: typeof initialData.sort_order === 'number' ? initialData.sort_order : 0,
        is_active: initialData.is_active ?? true,
      });
    } else {
      setFormData({
        title: '',
        slug: '',
        badge_text: '',
        short_descriptior: '',
        short_description: '',
        description: '',
        features: [],
        media_id: null,
        cta_text: 'Get Started',
        cta_url: '#',
        sort_order: 0,
        is_active: true,
      });
    }
  }, [initialData, isOpen]);

  const slugify = (text: string) => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-');
  };

  const handleFormSubmit = async (values: any) => {
    const finalData: ServiceFormData = {
      title: values?.title || formData.title,
      slug: values?.slug ? slugify(values.slug) : slugify(values?.title || formData.title),
      badge_text: values?.badge_text ?? formData.badge_text ?? '',
      short_descriptior: values?.short_descriptior ?? values?.short_description ?? formData.short_descriptior ?? '',
      short_description: values?.short_description ?? values?.short_descriptior ?? formData.short_description ?? '',
      description: values?.description ?? formData.description ?? '',
      features: formData.features || [],
      media_id: values?.media_id ? values.media_id.trim() : formData.media_id || null,
      cta_text: values?.cta_text ?? formData.cta_text ?? 'Get Started',
      cta_url: values?.cta_url ?? formData.cta_url ?? '#',
      sort_order: Number(values?.sort_order ?? formData.sort_order) || 0,
      is_active: values?.is_active === 'true' || values?.is_active === true || formData.is_active,
    };
    await onSubmit(finalData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-2xl w-full my-6 p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-150 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-xl font-bold text-slate-900">
              {initialData ? 'Edit Service' : 'Add New Service'}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {initialData
                ? 'Update your service offering and status.'
                : 'Fill in the information below to add a new service.'}
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
                label="Service Title*"
                placeholder="e.g. Cloud & AWS Migration Solutions"
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

            {/* Slug */}
            <div>
              <AFormInput
                name="slug"
                label="Slug / URL Key*"
                placeholder="cloud-aws-migration"
                type="text"
                validation={{ required: true }}
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

            {/* Badge Text */}
            <div>
              <AFormInput
                name="badge_text"
                label="Badge Text (Highlight)"
                placeholder="e.g. Popular, Enterprise"
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

            {/* Grid: Status & Sort Order */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <AFormInput
                  name="is_active"
                  label="Publish Status"
                  type="select"
                  options={[
                    { value: 'true', label: 'Active' },
                    { value: 'false', label: 'Inactive' },
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

              <div>
                <AFormInput
                  name="sort_order"
                  label="Display Sort Order"
                  placeholder="0"
                  type="number"
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

            {/* Short Description */}
            <div>
              <AFormInput
                name="short_descriptior"
                label="Short Description / Summary"
                placeholder="A concise description of this service..."
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

            {/* Description */}
            <div>
              <AFormInput
                name="description"
                label="Detailed Description"
                placeholder="Comprehensive overview of deliverables and technologies..."
                type="textarea"
                inputStyle={{
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: '#f1f5f9',
                  padding: '12px 14px',
                  fontSize: '14px',
                  width: '100%',
                  minHeight: '120px',
                  outline: 'none',
                  color: '#0f172a',
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
                {isSubmitting ? 'Saving...' : initialData ? 'Update Service' : 'Add Service'}
              </button>
            </div>
          </AForm>
        </div>
      </div>
    </div>
  );
};
