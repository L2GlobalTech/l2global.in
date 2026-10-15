'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Save,
  Loader2,
  Briefcase,
  FileText,
  MapPin,
  Clock,
  Building,
  DollarSign,
  GraduationCap,
  ExternalLink,
  Plus,
  Trash2,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  Sparkles,
  Hash,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { AsgardLayout } from '@/components/asgard/AsgardLayout';
import { LoadingState } from '@/components/asgard/LoadingState';
import { AsgardSelect } from '@/components/asgard/AsgardSelect';
import {
  getJobOpeningById,
  createJobOpening,
  updateJobOpening,
  slugify,
  JobOpeningRecord,
  JobOpeningFormData,
} from '@/app/(asgard)/asgard/career-openings/action';

interface CareerOpeningFormContainerProps {
  id?: string;
}

const EXPERIENCE_LEVEL_OPTIONS = [
  'Entry-Level',
  'Junior-Level',
  'Mid-Level',
  'Senior-Level',
  'Lead-Level',
];

const EMPLOYMENT_TYPE_OPTIONS = [
  'Full-time',
  'Part-time',
  'Contract',
  'Internship',
  'Freelance',
];

const WORKPLACE_TYPE_OPTIONS = ['On-site', 'Hybrid', 'Remote'];

const PRESET_LOCATIONS = ['Chennai', 'Madurai', 'Bengaluru', 'Hyderabad', 'Coimbatore', 'Remote'];

export const CareerOpeningFormContainer: React.FC<CareerOpeningFormContainerProps> = ({ id }) => {
  const router = useRouter();
  const isEditMode = Boolean(id);
  const [initialLoading, setInitialLoading] = useState(isEditMode);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [manualSlugEdited, setManualSlugEdited] = useState(false);
  const [newLocationInput, setNewLocationInput] = useState('');
  const [newSpecInput, setNewSpecInput] = useState('');

  // Form State
  const [formData, setFormData] = useState<JobOpeningFormData>({
    title: '',
    slug: '',
    experience_level: 'Mid-Level',
    locations: ['Chennai', 'Madurai'],
    primary_responsibility: '',
    job_specifications: [],
    employment_type: 'Full-time',
    work_place_type: 'Hybrid',
    salary: 'Commensurate with experience',
    experience_required: 'Minimum 3 Years',
    application_url: '',
    is_active: true,
    display_order: 0,
  });

  const [errors, setErrors] = useState<{
    title?: string;
    slug?: string;
    locations?: string;
    primary_responsibility?: string;
    application_url?: string;
    job_specifications?: string;
  }>({});

  // Track initial state for unsaved changes warning
  const initialDataRef = useRef<string>('');

  // Auto-generate slug when title changes (unless manually edited)
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title: newTitle,
      slug: manualSlugEdited ? prev.slug : slugify(newTitle),
    }));
    if (errors.title) setErrors((prev) => ({ ...prev, title: undefined }));
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setManualSlugEdited(true);
    setFormData((prev) => ({
      ...prev,
      slug: e.target.value,
    }));
    if (errors.slug) setErrors((prev) => ({ ...prev, slug: undefined }));
  };

  const handleRegenerateSlug = () => {
    const generated = slugify(formData.title);
    setFormData((prev) => ({ ...prev, slug: generated }));
    setManualSlugEdited(false);
    toast.success('Slug regenerated from title');
  };

  // Location helpers
  const handleAddLocation = (locToAdd?: string) => {
    const val = (locToAdd || newLocationInput).trim();
    if (!val) return;

    if (formData.locations?.some((l) => l.toLowerCase() === val.toLowerCase())) {
      toast.error(`Location "${val}" is already added.`);
      return;
    }

    setFormData((prev) => ({
      ...prev,
      locations: [...(prev.locations || []), val],
    }));
    setNewLocationInput('');
    if (errors.locations) setErrors((prev) => ({ ...prev, locations: undefined }));
  };

  const handleRemoveLocation = (indexToRemove: number) => {
    setFormData((prev) => ({
      ...prev,
      locations: prev.locations?.filter((_, idx) => idx !== indexToRemove) || [],
    }));
  };

  // Specification helpers
  const handleAddSpecification = () => {
    const val = newSpecInput.trim();
    if (!val) {
      toast.error('Specification bullet item cannot be empty.');
      return;
    }

    setFormData((prev) => ({
      ...prev,
      job_specifications: [...(prev.job_specifications || []), val],
    }));
    setNewSpecInput('');
    if (errors.job_specifications) {
      setErrors((prev) => ({ ...prev, job_specifications: undefined }));
    }
  };

  const handleUpdateSpecification = (index: number, value: string) => {
    setFormData((prev) => {
      const updated = [...(prev.job_specifications || [])];
      updated[index] = value;
      return { ...prev, job_specifications: updated };
    });
  };

  const handleRemoveSpecification = (indexToRemove: number) => {
    setFormData((prev) => ({
      ...prev,
      job_specifications: prev.job_specifications?.filter((_, idx) => idx !== indexToRemove) || [],
    }));
  };

  // Fetch existing job opening if editing
  useEffect(() => {
    async function loadJob() {
      if (!id) {
        setInitialLoading(false);
        initialDataRef.current = JSON.stringify(formData);
        return;
      }

      try {
        setInitialLoading(true);
        const job = await getJobOpeningById(id);

        if (!job) {
          toast.error('Career opening not found');
          router.push('/asgard/career-openings');
          return;
        }

        const loadedData: JobOpeningFormData = {
          id: job.id,
          title: job.title || '',
          slug: job.slug || '',
          experience_level: job.experience_level || 'Mid-Level',
          locations: Array.isArray(job.locations) && job.locations.length > 0 ? job.locations : [],
          primary_responsibility: job.primary_responsibility || '',
          job_specifications:
            Array.isArray(job.job_specifications) && job.job_specifications.length > 0
              ? job.job_specifications
              : [],
          employment_type: job.employment_type || 'Full-time',
          work_place_type: job.work_place_type || 'Hybrid',
          salary: job.salary || '',
          experience_required: job.experience_required || '',
          application_url: job.application_url || '',
          is_active: job.is_active !== undefined ? Boolean(job.is_active) : true,
          display_order: typeof job.display_order === 'number' ? job.display_order : 0,
        };

        setFormData(loadedData);
        setManualSlugEdited(true); // Preserve existing slug in edit mode
        initialDataRef.current = JSON.stringify(loadedData);
      } catch (err: any) {
        console.error('Error loading job opening:', err);
        toast.error('Failed to load job details');
        router.push('/asgard/career-openings');
      } finally {
        setInitialLoading(false);
      }
    }

    loadJob();
  }, [id, router]);

  // Warn if navigating away with unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (initialDataRef.current && JSON.stringify(formData) !== initialDataRef.current) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [formData]);

  const validateForm = () => {
    const newErrors: typeof errors = {};

    const title = formData.title?.trim();
    if (!title) {
      newErrors.title = 'Job title is required';
    }

    const slug = formData.slug?.trim();
    if (!slug) {
      newErrors.slug = 'Slug is required';
    } else if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
      newErrors.slug = 'Slug must only contain lowercase letters, numbers, and single hyphens';
    }

    if (!formData.locations || formData.locations.length === 0) {
      newErrors.locations = 'At least one location is required';
    }

    const primary_responsibility = formData.primary_responsibility?.trim();
    if (!primary_responsibility) {
      newErrors.primary_responsibility = 'Primary responsibility is required';
    }

    if (formData.application_url?.trim()) {
      const url = formData.application_url.trim();
      const isValid = /^https?:\/\/.+/i.test(url) || /^mailto:.+/i.test(url);
      if (!isValid) {
        newErrors.application_url = 'Please enter a valid URL (starting with http://, https://, or mailto:)';
      }
    }

    // Check if any specification items are empty
    if (formData.job_specifications && formData.job_specifications.some((s) => !s.trim())) {
      newErrors.job_specifications = 'Specification items cannot be empty. Please edit or delete blank lines.';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      const firstError = Object.values(newErrors)[0];
      toast.error(firstError || 'Please correct the highlighted form errors.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e?: React.FormEvent, forceDraft = false) => {
    if (e) e.preventDefault();

    if (!validateForm()) return;

    try {
      setIsSubmitting(true);

      const targetIsActive = forceDraft ? false : Boolean(formData.is_active);

      const payload: Partial<JobOpeningRecord> = {
        title: formData.title.trim(),
        slug: formData.slug.trim(),
        experience_level: formData.experience_level?.trim() || null,
        locations: formData.locations && formData.locations.length > 0 ? formData.locations : null,
        primary_responsibility: formData.primary_responsibility.trim(),
        job_specifications:
          formData.job_specifications && formData.job_specifications.length > 0
            ? formData.job_specifications.filter((s) => s.trim())
            : null,
        employment_type: formData.employment_type?.trim() || null,
        work_place_type: formData.work_place_type?.trim() || null,
        salary: formData.salary?.trim() || null,
        experience_required: formData.experience_required?.trim() || null,
        application_url: formData.application_url?.trim() || null,
        is_active: targetIsActive,
        display_order: Number.isInteger(Number(formData.display_order))
          ? Number(formData.display_order)
          : 0,
      };

      if (isEditMode && id) {
        const res = await updateJobOpening(id, payload);
        if (!res.success) {
          toast.error(res.error || 'Failed to update career opening');
          setIsSubmitting(false);
          return;
        }

        toast.success(
          targetIsActive
            ? 'Career opening updated and published successfully!'
            : 'Career opening updated and saved as Draft!'
        );
      } else {
        const res = await createJobOpening(payload);
        if (!res.success) {
          toast.error(res.error || 'Failed to create career opening');
          setIsSubmitting(false);
          return;
        }

        toast.success(
          targetIsActive
            ? 'Career opening published successfully!'
            : 'Career opening saved as Draft!'
        );
      }

      // Reset unsaved changes tracker before redirecting
      initialDataRef.current = '';
      router.push('/asgard/career-openings');
    } catch (err: any) {
      console.error('Error submitting job opening:', err);
      toast.error(err.message || 'An unexpected error occurred while saving.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (
      initialDataRef.current &&
      JSON.stringify(formData) !== initialDataRef.current &&
      !window.confirm('You have unsaved changes. Are you sure you want to discard them?')
    ) {
      return;
    }
    router.push('/asgard/career-openings');
  };

  if (initialLoading) {
    return (
      <AsgardLayout>
        <div className="py-12">
          <LoadingState message="Loading career opening details..." />
        </div>
      </AsgardLayout>
    );
  }

  return (
    <AsgardLayout>
      <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-6 mx-auto pb-12">
        {/* Top Header / Breadcrumbs */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleCancel}
              className="p-2 text-slate-500 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors cursor-pointer"
              title="Back to list"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <Link href="/asgard/career-openings" className="hover:text-slate-800">
                  Career Openings
                </Link>
                <span>/</span>
                <span className="text-slate-900 font-semibold">
                  {isEditMode ? 'Edit Opening' : 'New Opening'}
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 mt-0.5">
                {isEditMode ? `Edit: ${formData.title || 'Opening'}` : 'Create Job Opening'}
              </h1>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handleCancel}
              disabled={isSubmitting}
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors cursor-pointer disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={() => handleSubmit(undefined, true)}
              disabled={isSubmitting}
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-xl transition-colors cursor-pointer disabled:opacity-50"
            >
              Save as Draft
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-1.5 px-4.5 py-2 text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all shadow-xs cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Job Opening
                </>
              )}
            </button>
          </div>
        </div>

        {/* SECTION 1: Basic Information */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
          <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-indigo-600" />
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              1. Basic Information
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Job Title */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Job Title <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={handleTitleChange}
                placeholder="e.g. Senior Full Stack Developer"
                className={`w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all ${errors.title ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200 focus:border-indigo-500'
                  }`}
              />
              {errors.title && (
                <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.title}
                </p>
              )}
            </div>

            {/* Slug */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-700">
                  URL Slug <span className="text-rose-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={handleRegenerateSlug}
                  className="text-[11px] text-indigo-600 hover:text-indigo-800 font-medium inline-flex items-center gap-1 cursor-pointer"
                  title="Re-generate slug from title"
                >
                  <RefreshCw className="w-3 h-3" />
                  Regenerate
                </button>
              </div>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-xs text-slate-400 font-mono">
                  /
                </span>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={handleSlugChange}
                  placeholder="e.g. senior-full-stack-developer"
                  className={`w-full pl-6 pr-3.5 py-2.5 text-xs sm:text-sm font-mono bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all ${errors.slug ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200 focus:border-indigo-500'
                    }`}
                />
              </div>
              {errors.slug && (
                <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.slug}
                </p>
              )}
            </div>

            {/* Experience Level */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Experience Level
              </label>
              <AsgardSelect
                value={formData.experience_level || 'Mid-Level'}
                onChange={(val) => setFormData((prev) => ({ ...prev, experience_level: val }))}
                options={EXPERIENCE_LEVEL_OPTIONS}
              />
            </div>

            {/* Locations Multi-select / Tag Input */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Locations <span className="text-rose-500">*</span>
              </label>

              {/* Tag Badges */}
              <div className="flex flex-wrap gap-1.5 mb-2 min-h-[30px] p-2 bg-slate-50 border border-slate-200 rounded-xl">
                {formData.locations && formData.locations.length > 0 ? (
                  formData.locations.map((loc, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100"
                    >
                      <MapPin className="w-3 h-3" />
                      {loc}
                      <button
                        type="button"
                        onClick={() => handleRemoveLocation(idx)}
                        className="text-indigo-400 hover:text-rose-600 transition-colors ml-0.5 cursor-pointer"
                      >
                        ×
                      </button>
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-400 self-center">No locations selected</span>
                )}
              </div>

              {/* Add custom location input */}
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newLocationInput}
                  onChange={(e) => setNewLocationInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddLocation();
                    }
                  }}
                  placeholder="Type location and press Enter (e.g. Chennai)"
                  className="flex-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
                <button
                  type="button"
                  onClick={() => handleAddLocation()}
                  className="px-3 py-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-xl transition-colors cursor-pointer"
                >
                  Add
                </button>
              </div>

              {/* Quick Presets */}
              <div className="flex items-center flex-wrap gap-1.5 text-[11px] text-slate-500">
                <span className="font-semibold text-slate-600">Quick add:</span>
                {PRESET_LOCATIONS.map((preset) => {
                  const alreadyAdded = formData.locations?.includes(preset);
                  return (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => handleAddLocation(preset)}
                      disabled={alreadyAdded}
                      className={`px-2 py-0.5 rounded-md text-[10px] font-medium border transition-colors cursor-pointer ${alreadyAdded
                          ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-indigo-400 hover:text-indigo-600'
                        }`}
                    >
                      +{preset}
                    </button>
                  );
                })}
              </div>

              {errors.locations && (
                <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.locations}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* SECTION 2: Job Description & Specifications */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
          <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
            <FileText className="w-4 h-4 text-indigo-600" />
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              2. Job Description & Specifications
            </h2>
          </div>

          {/* Primary Responsibility */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Primary Responsibility <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={5}
              value={formData.primary_responsibility}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, primary_responsibility: e.target.value }));
                if (errors.primary_responsibility) {
                  setErrors((prev) => ({ ...prev, primary_responsibility: undefined }));
                }
              }}
              placeholder="Describe the primary role and core day-to-day responsibilities for this opening..."
              className={`w-full p-3.5 text-xs sm:text-sm bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all ${errors.primary_responsibility
                  ? 'border-rose-400 bg-rose-50/30'
                  : 'border-slate-200 focus:border-indigo-500'
                }`}
            />
            {errors.primary_responsibility && (
              <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.primary_responsibility}
              </p>
            )}
          </div>

          {/* Dynamic Job Specifications List */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-700">
                Job Specifications (Key Requirements / Bullet Points)
              </label>
              <span className="text-[11px] text-slate-400">
                {formData.job_specifications?.length || 0} items
              </span>
            </div>

            {/* List of current specification bullet points */}
            {formData.job_specifications && formData.job_specifications.length > 0 ? (
              <div className="space-y-2 mb-3">
                {formData.job_specifications.map((spec, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-slate-100 text-slate-600 flex items-center justify-center text-xs font-mono shrink-0">
                      {idx + 1}
                    </span>
                    <input
                      type="text"
                      value={spec}
                      onChange={(e) => handleUpdateSpecification(idx, e.target.value)}
                      placeholder={`Specification bullet #${idx + 1}`}
                      className="flex-1 px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveSpecification(idx)}
                      className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 bg-slate-50 border border-dashed border-slate-200 rounded-xl text-center text-xs text-slate-400 mb-3">
                No bullet points added yet. Add items below to display under "Job Specification".
              </div>
            )}

            {/* Add new specification input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={newSpecInput}
                onChange={(e) => setNewSpecInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddSpecification();
                  }
                }}
                placeholder="Add specification bullet point (e.g. Experience with backend frameworks and databases)"
                className="flex-1 px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
              <button
                type="button"
                onClick={handleAddSpecification}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors shadow-xs cursor-pointer shrink-0"
              >
                <Plus className="w-4 h-4" />
                Add Item
              </button>
            </div>

            {errors.job_specifications && (
              <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.job_specifications}
              </p>
            )}
          </div>
        </div>

        {/* SECTION 3: Employment Information */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
          <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
            <Building className="w-4 h-4 text-indigo-600" />
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              3. Employment Information
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Employment Type */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Employment Type
              </label>
              <AsgardSelect
                value={formData.employment_type || 'Full-time'}
                onChange={(val) => setFormData((prev) => ({ ...prev, employment_type: val }))}
                options={EMPLOYMENT_TYPE_OPTIONS}
              />
            </div>

            {/* Workplace Type */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Workplace Type
              </label>
              <AsgardSelect
                value={formData.work_place_type || 'Hybrid'}
                onChange={(val) => setFormData((prev) => ({ ...prev, work_place_type: val }))}
                options={WORKPLACE_TYPE_OPTIONS}
              />
            </div>

            {/* Salary */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Salary (Optional)
              </label>
              <div className="relative">
                <DollarSign className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  value={formData.salary || ''}
                  onChange={(e) => setFormData((prev) => ({ ...prev, salary: e.target.value }))}
                  placeholder="e.g. Commensurate with experience, or ₹12 - 18 LPA"
                  className="w-full pl-9 pr-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
            </div>

            {/* Experience Required */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Experience Required (Optional)
              </label>
              <div className="relative">
                <GraduationCap className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  value={formData.experience_required || ''}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, experience_required: e.target.value }))
                  }
                  placeholder="e.g. Minimum 3 Years, or 3 - 5 Years"
                  className="w-full pl-9 pr-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 4: Application & Publishing */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
          <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
            <ExternalLink className="w-4 h-4 text-indigo-600" />
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              4. Application & Publishing
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Application URL */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Application URL (Optional)
              </label>
              <input
                type="text"
                value={formData.application_url || ''}
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, application_url: e.target.value }));
                  if (errors.application_url) {
                    setErrors((prev) => ({ ...prev, application_url: undefined }));
                  }
                }}
                placeholder="https://... or mailto:careers@l2globaltech.com"
                className={`w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all ${errors.application_url
                    ? 'border-rose-400 bg-rose-50/30'
                    : 'border-slate-200 focus:border-indigo-500'
                  }`}
              />
              <p className="text-[11px] text-slate-400 mt-1">
                If left empty, the "Get Started" button will use the default careers email flow.
              </p>
              {errors.application_url && (
                <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.application_url}
                </p>
              )}
            </div>

            {/* Display Order */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Display Order
              </label>
              <div className="relative">
                <Hash className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={formData.display_order ?? 0}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      display_order: parseInt(e.target.value, 10) || 0,
                    }))
                  }
                  className="w-full pl-9 pr-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Lower numbers appear first on the public career openings list (e.g. 0, 1, 2).
              </p>
            </div>
          </div>

          {/* Active Status Toggle */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-800">Publishing Status</p>
              <p className="text-[11px] text-slate-500">
                {formData.is_active
                  ? 'Active: This opening is visible to all website visitors.'
                  : 'Inactive / Draft: Hidden from public view. Only administrators can view it.'}
              </p>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={Boolean(formData.is_active)}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, is_active: e.target.checked }))
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>
        </div>

        {/* Bottom Action Footer */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
          <button
            type="button"
            onClick={handleCancel}
            disabled={isSubmitting}
            className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors cursor-pointer disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={() => handleSubmit(undefined, true)}
            disabled={isSubmitting}
            className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-xl transition-colors cursor-pointer disabled:opacity-50"
          >
            Save as Draft
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-6 py-2.5 text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all shadow-xs cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Job Opening
              </>
            )}
          </button>
        </div>
      </form>
    </AsgardLayout>
  );
};
