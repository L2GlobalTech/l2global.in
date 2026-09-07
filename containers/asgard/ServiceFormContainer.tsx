'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Save,
  Loader2,
  Layers,
  Sparkles,
  Award,
  HelpCircle,
  FileText,
  BarChart3,
  Plus,
  Trash2,
  CheckCircle2,
  ChevronRight,
  Tag,
  Globe,
  Image as ImageIcon,
  Check,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { AsgardLayout } from '@/components/asgard/AsgardLayout';
import { LoadingState } from '@/components/asgard/LoadingState';
import ImageUploader from '@/components/asgard/ImageUploader';
import { uploadMedia, getMediaPublicUrl, deleteMedia } from '@/actions/mediaAction';
import {
  getServiceById,
  createService,
  updateService,
  slugify,
  ServiceRecord,
} from '@/app/(asgard)/asgard/services/action';
import {
  ServiceFormData,
  ServiceCapabilityItem,
  ServiceResultStat,
  ServiceFAQItem,
} from '@/types/cms';

interface ServiceFormContainerProps {
  id?: string;
}

const inputClass =
  'w-full px-3.5 py-2 text-xs sm:text-sm text-slate-900 bg-slate-100 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all placeholder:text-slate-400';

type FormTab = 'hero' | 'capabilities' | 'about' | 'results' | 'solutions' | 'faq_seo';

export const ServiceFormContainer: React.FC<ServiceFormContainerProps> = ({ id }) => {
  const router = useRouter();
  const isEditMode = Boolean(id);
  const [initialLoading, setInitialLoading] = useState(isEditMode);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<FormTab>('hero');

  // Form State
  const [formData, setFormData] = useState<ServiceFormData>({
    title: '',
    slug: '',
    badge_text: '',
    hero_title: '',
    hero_highlight: '',
    hero_description: '',
    hero_image_id: null,
    hero_logo_text: '',
    hero_cta_text: 'Get Started Free',
    hero_cta_url: '#',
    hero_badges: [],
    capabilities_badge: '',
    capabilities_title: '',
    capabilities_highlight: '',
    capabilities_description: '',
    capabilities: [],
    about_badge: '',
    about_title: '',
    about_highlight: '',
    about_description: '',
    about_features: [],
    about_image_id: null,
    about_logo_text: '',
    about_cta_text: 'Get a Quote',
    about_cta_url: '#',
    results_badge: '',
    results_title: '',
    results_highlight: '',
    results_description: '',
    results_stats: [],
    solutions_badge: '',
    solutions_title: '',
    solutions_highlight: '',
    solutions_description: '',
    solutions_image_id: null,
    solutions_logo_text: '',
    solutions_badges: [],
    faq_badge: '',
    faq_title: '',
    faq_description: '',
    faqs: [],
    cta_text: '',
    cta_url: '',
    sort_order: 0,
    is_active: true,
    meta_title: '',
    meta_description: '',
  });

  // Images state
  const [heroImageFile, setHeroImageFile] = useState<File | null>(null);
  const [heroPreviewUrl, setHeroPreviewUrl] = useState<string>('');

  const [aboutImageFile, setAboutImageFile] = useState<File | null>(null);
  const [aboutPreviewUrl, setAboutPreviewUrl] = useState<string>('');

  const [solutionsImageFile, setSolutionsImageFile] = useState<File | null>(null);
  const [solutionsPreviewUrl, setSolutionsPreviewUrl] = useState<string>('');

  // Input states for badge tag fields
  const [heroBadgeInput, setHeroBadgeInput] = useState('');
  const [solutionsBadgeInput, setSolutionsBadgeInput] = useState('');

  // Load service for edit mode
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
          toast.error('Service not found in Supabase');
          router.push('/asgard/services');
          return;
        }

        setFormData({
          id: service.id,
          title: service.title || '',
          slug: service.slug || '',
          badge_text: service.badge_text || '',
          hero_title: service.hero_title || '',
          hero_highlight: service.hero_highlight || '',
          hero_description: service.hero_description || '',
          hero_image_id: service.hero_image_id || null,
          hero_logo_text: service.hero_logo_text || '',
          hero_cta_text: service.hero_cta_text || 'Get Started Free',
          hero_cta_url: service.hero_cta_url || '#',
          hero_badges: Array.isArray(service.hero_badges) ? [...service.hero_badges] : [],
          capabilities_badge: service.capabilities_badge || '',
          capabilities_title: service.capabilities_title || '',
          capabilities_highlight: service.capabilities_highlight || '',
          capabilities_description: service.capabilities_description || '',
          capabilities: Array.isArray(service.capabilities) ? [...service.capabilities] : [],
          about_badge: service.about_badge || '',
          about_title: service.about_title || '',
          about_highlight: service.about_highlight || '',
          about_description: service.about_description || '',
          about_features: Array.isArray(service.about_features) ? [...service.about_features] : [],
          about_image_id: service.about_image_id || null,
          about_logo_text: service.about_logo_text || '',
          about_cta_text: service.about_cta_text || 'Get a Quote',
          about_cta_url: service.about_cta_url || '#',
          results_badge: service.results_badge || '',
          results_title: service.results_title || '',
          results_highlight: service.results_highlight || '',
          results_description: service.results_description || '',
          results_stats: Array.isArray(service.results_stats) ? [...service.results_stats] : [],
          solutions_badge: service.solutions_badge || '',
          solutions_title: service.solutions_title || '',
          solutions_highlight: service.solutions_highlight || '',
          solutions_description: service.solutions_description || '',
          solutions_image_id: service.solutions_image_id || null,
          solutions_logo_text: service.solutions_logo_text || '',
          solutions_badges: Array.isArray(service.solutions_badges) ? [...service.solutions_badges] : [],
          faq_badge: service.faq_badge || '',
          faq_title: service.faq_title || '',
          faq_description: service.faq_description || '',
          faqs: Array.isArray(service.faqs) ? [...service.faqs] : [],
          cta_text: service.cta_text || '',
          cta_url: service.cta_url || '',
          sort_order: typeof service.sort_order === 'number' ? service.sort_order : 0,
          is_active: service.is_active ?? true,
          meta_title: service.meta_title || '',
          meta_description: service.meta_description || '',
        });

        if (service.hero_image_id) {
          setHeroPreviewUrl(getMediaPublicUrl(service.hero_image_id, 'services') || '');
        }
        if (service.about_image_id) {
          setAboutPreviewUrl(getMediaPublicUrl(service.about_image_id, 'services') || '');
        }
        if (service.solutions_image_id) {
          setSolutionsPreviewUrl(getMediaPublicUrl(service.solutions_image_id, 'services') || '');
        }
      } catch (err: any) {
        console.error('Error loading service:', err);
        toast.error('Failed to load service details');
        router.push('/asgard/services');
      } finally {
        setInitialLoading(false);
      }
    }

    loadService();
  }, [id, router]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (name === 'sort_order') {
      setFormData((prev) => ({ ...prev, [name]: Number(value) || 0 }));
    } else if (name === 'is_active') {
      setFormData((prev) => ({ ...prev, is_active: value === 'true' }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Hero Badges
  const handleAddHeroBadge = () => {
    if (!heroBadgeInput.trim()) return;
    setFormData((prev) => ({
      ...prev,
      hero_badges: [...(prev.hero_badges || []), heroBadgeInput.trim()],
    }));
    setHeroBadgeInput('');
  };
  const handleRemoveHeroBadge = (idx: number) => {
    setFormData((prev) => ({
      ...prev,
      hero_badges: (prev.hero_badges || []).filter((_, i) => i !== idx),
    }));
  };

  // Solutions Badges
  const handleAddSolutionsBadge = () => {
    if (!solutionsBadgeInput.trim()) return;
    setFormData((prev) => ({
      ...prev,
      solutions_badges: [...(prev.solutions_badges || []), solutionsBadgeInput.trim()],
    }));
    setSolutionsBadgeInput('');
  };
  const handleRemoveSolutionsBadge = (idx: number) => {
    setFormData((prev) => ({
      ...prev,
      solutions_badges: (prev.solutions_badges || []).filter((_, i) => i !== idx),
    }));
  };

  // Capabilities
  const handleAddCapability = () => {
    setFormData((prev) => ({
      ...prev,
      capabilities: [...(prev.capabilities || []), { title: '', description: '', icon: '' }],
    }));
  };
  const handleCapabilityChange = (index: number, field: keyof ServiceCapabilityItem, value: string) => {
    setFormData((prev) => {
      const list = [...(prev.capabilities || [])];
      list[index] = { ...list[index], [field]: value };
      return { ...prev, capabilities: list };
    });
  };
  const handleRemoveCapability = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      capabilities: (prev.capabilities || []).filter((_, i) => i !== index),
    }));
  };

  // About Features
  const handleAddAboutFeature = () => {
    setFormData((prev) => ({
      ...prev,
      about_features: [...(prev.about_features || []), ''],
    }));
  };
  const handleAboutFeatureChange = (index: number, value: string) => {
    setFormData((prev) => {
      const list = [...(prev.about_features || [])];
      list[index] = value;
      return { ...prev, about_features: list };
    });
  };
  const handleRemoveAboutFeature = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      about_features: (prev.about_features || []).filter((_, i) => i !== index),
    }));
  };

  // Results Stats
  const handleAddResultStat = () => {
    setFormData((prev) => ({
      ...prev,
      results_stats: [...(prev.results_stats || []), { value: '', label: '' }],
    }));
  };
  const handleResultStatChange = (index: number, field: keyof ServiceResultStat, value: string) => {
    setFormData((prev) => {
      const list = [...(prev.results_stats || [])];
      list[index] = { ...list[index], [field]: value };
      return { ...prev, results_stats: list };
    });
  };
  const handleRemoveResultStat = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      results_stats: (prev.results_stats || []).filter((_, i) => i !== index),
    }));
  };

  // FAQs
  const handleAddFAQ = () => {
    setFormData((prev) => ({
      ...prev,
      faqs: [...(prev.faqs || []), { question: '', answer: '' }],
    }));
  };
  const handleFAQChange = (index: number, field: keyof ServiceFAQItem, value: string) => {
    setFormData((prev) => {
      const list = [...(prev.faqs || [])];
      list[index] = { ...list[index], [field]: value };
      return { ...prev, faqs: list };
    });
  };
  const handleRemoveFAQ = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      faqs: (prev.faqs || []).filter((_, i) => i !== index),
    }));
  };

  // Save / Form Submit
  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const title = formData.title?.trim();
    if (!title) {
      toast.error('Service title is required');
      setActiveTab('hero');
      return;
    }

    try {
      setIsSubmitting(true);

      let resolvedHeroImageId = formData.hero_image_id;
      let resolvedAboutImageId = formData.about_image_id;
      let resolvedSolutionsImageId = formData.solutions_image_id;

      // 1. Upload Hero Image if changed
      if (heroImageFile) {
        const uploadToast = toast.loading('Uploading hero image...');
        const res = await uploadMedia(heroImageFile, 'services');
        toast.dismiss(uploadToast);
        if (res.success && res.storagePath) {
          resolvedHeroImageId = res.storagePath;
        } else {
          toast.error(res.error?.message || 'Failed to upload hero image');
          setIsSubmitting(false);
          return;
        }
      } else if (!heroPreviewUrl) {
        resolvedHeroImageId = null;
      }

      // 2. Upload About Image if changed
      if (aboutImageFile) {
        const uploadToast = toast.loading('Uploading about image...');
        const res = await uploadMedia(aboutImageFile, 'services');
        toast.dismiss(uploadToast);
        if (res.success && res.storagePath) {
          resolvedAboutImageId = res.storagePath;
        } else {
          toast.error(res.error?.message || 'Failed to upload about image');
          setIsSubmitting(false);
          return;
        }
      } else if (!aboutPreviewUrl) {
        resolvedAboutImageId = null;
      }

      // 3. Upload Solutions Image if changed
      if (solutionsImageFile) {
        const uploadToast = toast.loading('Uploading solutions image...');
        const res = await uploadMedia(solutionsImageFile, 'services');
        toast.dismiss(uploadToast);
        if (res.success && res.storagePath) {
          resolvedSolutionsImageId = res.storagePath;
        } else {
          toast.error(res.error?.message || 'Failed to upload solutions image');
          setIsSubmitting(false);
          return;
        }
      } else if (!solutionsPreviewUrl) {
        resolvedSolutionsImageId = null;
      }

      const finalSlug = formData.slug?.trim() ? slugify(formData.slug) : slugify(title);

      const cleanedPayload: any = {
        ...formData,
        title,
        slug: finalSlug,
        hero_image_id: resolvedHeroImageId,
        about_image_id: resolvedAboutImageId,
        solutions_image_id: resolvedSolutionsImageId,
        hero_badges: (formData.hero_badges || []).filter(Boolean),
        capabilities: (formData.capabilities || []).filter((c) => Boolean(c.title?.trim())),
        about_features: (formData.about_features || []).filter((f) => Boolean(f?.trim())),
        results_stats: (formData.results_stats || []).filter((s) => Boolean(s.value?.trim() || s.label?.trim())),
        solutions_badges: (formData.solutions_badges || []).filter(Boolean),
        faqs: (formData.faqs || []).filter((f) => Boolean(f.question?.trim())),
      };

      if (isEditMode && id) {
        const res = await updateService(id, cleanedPayload);
        if (!res.success) {
          toast.error(res.error || 'Failed to update service');
          return;
        }
        toast.success(`Service "${title}" updated successfully!`);
      } else {
        const res = await createService(cleanedPayload);
        if (!res.success) {
          toast.error(res.error || 'Failed to create service');
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

  const tabs = [
    {
      id: 'hero' as FormTab,
      label: 'Overview & Hero',
      desc: 'Title, slug, badge & hero banner',
      icon: Layers,
    },
    {
      id: 'capabilities' as FormTab,
      label: 'Capabilities',
      desc: 'Modular features & deliverables',
      icon: Sparkles,
    },
    {
      id: 'about' as FormTab,
      label: 'About & Features',
      desc: 'Methodology & bullet points',
      icon: FileText,
    },
    {
      id: 'results' as FormTab,
      label: 'Results & Stats',
      desc: 'Quantitative metrics & counters',
      icon: BarChart3,
    },
    {
      id: 'solutions' as FormTab,
      label: 'Solutions Architecture',
      desc: 'Framework, diagram & badges',
      icon: Award,
    },
    {
      id: 'faq_seo' as FormTab,
      label: 'FAQ & SEO Settings',
      desc: 'Q&A pairs, CTA & meta tags',
      icon: HelpCircle,
    },
  ];

  return (
    <AsgardLayout>
      <div className="space-y-5">
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
              <Link href="/asgard/overview" className="hover:text-slate-900 transition-colors font-medium">
                CMS
              </Link>
              <span>/</span>
              <Link href="/asgard/services" className="hover:text-slate-900 transition-colors font-medium">
                Services
              </Link>
              <span>/</span>
              <span className="text-slate-800 font-semibold">
                {isEditMode ? 'Edit Service' : 'Create Service'}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2.5">
              <Layers className="w-6 h-6 text-indigo-600" />
              <span>{isEditMode ? 'Edit Service Offering' : 'Add New Service Offering'}</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              {isEditMode
                ? `Update content, media, deliverables, and SEO settings for this service.`
                : 'Configure complete service details, sections, deliverables, and SEO settings.'}
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/asgard/services"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors cursor-pointer shadow-2xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Services</span>
            </Link>

            <button
              type="button"
              onClick={handleSave}
              disabled={isSubmitting || initialLoading}
              className="inline-flex items-center gap-1.5 px-5 py-2 text-xs sm:text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all shadow-xs hover:shadow-sm disabled:opacity-60 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>{isEditMode ? 'Save Changes' : 'Publish Service'}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Content Body: Left Tabs + Right Form Fields */}
        {initialLoading ? (
          <LoadingState message="Loading service details from Supabase..." rows={6} />
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col lg:flex-row min-h-[650px] items-start relative">
            {/* ========================================================= */}
            {/* LEFT SIDE: VERTICAL SECTION TABS (~300px width)           */}
            {/* ========================================================= */}
            <div className="w-full lg:w-72 border-b lg:border-b-0 lg:border-r border-slate-200 bg-slate-50/50 flex flex-col shrink-0 p-3.5 space-y-1.5 lg:sticky lg:top-16 lg:self-start lg:max-h-[calc(100vh-80px)] overflow-y-auto rounded-tl-2xl rounded-bl-2xl z-10">
              <div className="px-2 py-1 mb-0.5">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Form Sections
                </span>
              </div>

              {tabs.map((tab, idx) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-left p-3 rounded-xl transition-all flex items-start gap-3 cursor-pointer ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80 hover:border-slate-300'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                        isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-indigo-600'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs sm:text-sm font-bold truncate">{tab.label}</h4>
                        <span
                          className={`text-xs font-mono font-semibold ${
                            isActive ? 'text-indigo-200' : 'text-slate-400'
                          }`}
                        >
                          0{idx + 1}
                        </span>
                      </div>
                      <p
                        className={`text-xs mt-0.5 line-clamp-1 ${
                          isActive ? 'text-indigo-100' : 'text-slate-500'
                        }`}
                      >
                        {tab.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* ========================================================= */}
            {/* RIGHT SIDE: FORM FIELDS FOR SELECTED TAB                  */}
            {/* ========================================================= */}
            <div className="flex-1 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto w-full">
              <form onSubmit={handleSave} className="space-y-6">
                {/* TAB 1: OVERVIEW & HERO */}
                {activeTab === 'hero' && (
                  <div className="space-y-5 animate-in fade-in duration-150">
                    <div className="bg-indigo-50/60 p-4 sm:p-5 rounded-xl border border-indigo-100 mb-2">
                      <h3 className="text-sm font-bold text-indigo-900 uppercase tracking-wider">
                        Primary Service Info & Hero Section
                      </h3>
                      <p className="text-xs sm:text-sm text-indigo-700 mt-1">
                        Set the main title, URL slug, badge highlight, display sort order, and hero banner.
                      </p>
                    </div>

                    {/* Title */}
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1.5">
                        Service Title <span className="text-rose-500">*</span>
                      </label>
                      <input
                        name="title"
                        type="text"
                        required
                        placeholder="e.g. AWS Cloud Transformation & Architecture"
                        value={formData.title || ''}
                        onChange={handleInputChange}
                        className={inputClass}
                      />
                    </div>

                    {/* Grid: Slug & Badge */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          URL Slug (Auto-generated from title if blank)
                        </label>
                        <input
                          name="slug"
                          type="text"
                          placeholder="e.g. aws-cloud-transformation"
                          value={formData.slug || ''}
                          onChange={handleInputChange}
                          className={`${inputClass} font-mono`}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Service Badge / Pill Text
                        </label>
                        <input
                          name="badge_text"
                          type="text"
                          placeholder="e.g. Featured, Enterprise, New"
                          value={formData.badge_text || ''}
                          onChange={handleInputChange}
                          className={inputClass}
                        />
                      </div>
                    </div>

                    {/* Grid: Status & Sort Order */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Publish Status
                        </label>
                        <select
                          name="is_active"
                          value={formData.is_active ? 'true' : 'false'}
                          onChange={handleInputChange}
                          className={`${inputClass} cursor-pointer`}
                        >
                          <option value="true">Active (Visible)</option>
                          <option value="false">Inactive (Hidden)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
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

                    <hr className="border-slate-200" />

                    {/* Hero Title & Highlight */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Hero Headline Title
                        </label>
                        <input
                          name="hero_title"
                          type="text"
                          placeholder="e.g. Accelerate Growth with"
                          value={formData.hero_title || ''}
                          onChange={handleInputChange}
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Hero Highlight Text
                        </label>
                        <input
                          name="hero_highlight"
                          type="text"
                          placeholder="e.g. Cloud Transformation"
                          value={formData.hero_highlight || ''}
                          onChange={handleInputChange}
                          className={inputClass}
                        />
                      </div>
                    </div>

                    {/* Hero Description */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Hero Description
                      </label>
                      <textarea
                        name="hero_description"
                        rows={3}
                        placeholder="Comprehensive overview for hero banner..."
                        value={formData.hero_description || ''}
                        onChange={handleInputChange}
                        className={`${inputClass} resize-y`}
                      />
                    </div>

                    {/* Hero Graphic Uploader */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Hero Graphic / Illustration (hero_image_id)
                      </label>
                      <ImageUploader
                        value={heroPreviewUrl}
                        onChange={(file) => setHeroImageFile(file)}
                        onRemove={() => {
                          setHeroImageFile(null);
                          setHeroPreviewUrl('');
                          setFormData((prev) => ({ ...prev, hero_image_id: null }));
                        }}
                        folder="services"
                        width={800}
                        height={500}
                        aspectRatio={1.6}
                        label="Upload Hero Graphic"
                        description="SVG, PNG, or WebP illustration"
                      />
                    </div>

                    {/* Hero Logo Text */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Hero Subtitle / Logo Text
                      </label>
                      <input
                        name="hero_logo_text"
                        type="text"
                        placeholder="e.g. Trusted by Fortune 500 Leaders"
                        value={formData.hero_logo_text || ''}
                        onChange={handleInputChange}
                        className={inputClass}
                      />
                    </div>

                    {/* Grid: CTA Text & URL */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Hero CTA Button Text
                        </label>
                        <input
                          name="hero_cta_text"
                          type="text"
                          placeholder="Get Started Free"
                          value={formData.hero_cta_text || 'Get Started Free'}
                          onChange={handleInputChange}
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Hero CTA Button Destination URL
                        </label>
                        <input
                          name="hero_cta_url"
                          type="text"
                          placeholder="# or /contact-us"
                          value={formData.hero_cta_url || '#'}
                          onChange={handleInputChange}
                          className={inputClass}
                        />
                      </div>
                    </div>

                    {/* Hero Badges */}
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                      <label className="block text-xs font-bold text-slate-800">
                        Hero Badges / Highlights (hero_badges jsonb)
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="e.g. 24/7 Cloud Support, SLA Guaranteed"
                          value={heroBadgeInput}
                          onChange={(e) => setHeroBadgeInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddHeroBadge();
                            }
                          }}
                          className={inputClass}
                        />
                        <button
                          type="button"
                          onClick={handleAddHeroBadge}
                          className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 cursor-pointer shrink-0"
                        >
                          Add Badge
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {(formData.hero_badges || []).map((badge, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs bg-indigo-100 text-indigo-800 font-medium"
                          >
                            {badge}
                            <button
                              type="button"
                              onClick={() => handleRemoveHeroBadge(idx)}
                              className="text-indigo-600 hover:text-rose-600 cursor-pointer font-bold"
                            >
                              &times;
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 2: CAPABILITIES */}
                {activeTab === 'capabilities' && (
                  <div className="space-y-5 animate-in fade-in duration-150">
                    <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-100 mb-2">
                      <h3 className="text-xs font-bold text-emerald-900 uppercase tracking-wider">
                        Capabilities Section
                      </h3>
                      <p className="text-[11px] text-emerald-700 mt-0.5">
                        Configure core technical capabilities, deliverables, and modular feature cards.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Capabilities Badge Text
                        </label>
                        <input
                          name="capabilities_badge"
                          type="text"
                          placeholder="e.g. What We Deliver"
                          value={formData.capabilities_badge || ''}
                          onChange={handleInputChange}
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Capabilities Title
                        </label>
                        <input
                          name="capabilities_title"
                          type="text"
                          placeholder="e.g. Enterprise Capabilities"
                          value={formData.capabilities_title || ''}
                          onChange={handleInputChange}
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Capabilities Highlight Text
                      </label>
                      <input
                        name="capabilities_highlight"
                        type="text"
                        placeholder="e.g. Built for Scale & Reliability"
                        value={formData.capabilities_highlight || ''}
                        onChange={handleInputChange}
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Capabilities Description
                      </label>
                      <textarea
                        name="capabilities_description"
                        rows={3}
                        placeholder="High-level summary of capabilities..."
                        value={formData.capabilities_description || ''}
                        onChange={handleInputChange}
                        className={`${inputClass} resize-y`}
                      />
                    </div>

                    {/* Capabilities Dynamic Array */}
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-xs font-bold text-slate-800">
                            Capabilities Deliverables List (capabilities jsonb)
                          </h4>
                          <p className="text-[11px] text-slate-500">
                            Add capability cards with title, description, and icon identifier.
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={handleAddCapability}
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg border border-indigo-200 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add Capability</span>
                        </button>
                      </div>

                      <div className="space-y-3">
                        {(formData.capabilities || []).map((cap, idx) => (
                          <div key={idx} className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-2 relative shadow-2xs">
                            <button
                              type="button"
                              onClick={() => handleRemoveCapability(idx)}
                              className="absolute right-3 top-3 p-1 text-slate-400 hover:text-rose-600 rounded cursor-pointer"
                              title="Remove capability"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pr-8">
                              <input
                                type="text"
                                placeholder="Capability Title"
                                value={cap.title || ''}
                                onChange={(e) => handleCapabilityChange(idx, 'title', e.target.value)}
                                className={inputClass}
                              />
                              <input
                                type="text"
                                placeholder="Icon identifier (e.g. cloud, shield, zap)"
                                value={cap.icon || ''}
                                onChange={(e) => handleCapabilityChange(idx, 'icon', e.target.value)}
                                className={inputClass}
                              />
                            </div>
                            <textarea
                              rows={2}
                              placeholder="Detailed description of deliverables..."
                              value={cap.description || ''}
                              onChange={(e) => handleCapabilityChange(idx, 'description', e.target.value)}
                              className={`${inputClass} resize-y`}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 3: ABOUT & FEATURES */}
                {activeTab === 'about' && (
                  <div className="space-y-5 animate-in fade-in duration-150">
                    <div className="bg-amber-50/60 p-4 rounded-xl border border-amber-100 mb-2">
                      <h3 className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                        About Section & Feature Deliverables
                      </h3>
                      <p className="text-[11px] text-amber-700 mt-0.5">
                        Deep-dive section, illustration graphic, CTA, and bullet-point feature list.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          About Badge Text
                        </label>
                        <input
                          name="about_badge"
                          type="text"
                          placeholder="e.g. About Our Approach"
                          value={formData.about_badge || ''}
                          onChange={handleInputChange}
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          About Title
                        </label>
                        <input
                          name="about_title"
                          type="text"
                          placeholder="e.g. Architected for Resilience"
                          value={formData.about_title || ''}
                          onChange={handleInputChange}
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        About Highlight Text
                      </label>
                      <input
                        name="about_highlight"
                        type="text"
                        placeholder="e.g. Proven Methodologies"
                        value={formData.about_highlight || ''}
                        onChange={handleInputChange}
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        About Description
                      </label>
                      <textarea
                        name="about_description"
                        rows={3}
                        placeholder="Comprehensive explanation of the service methodology..."
                        value={formData.about_description || ''}
                        onChange={handleInputChange}
                        className={`${inputClass} resize-y`}
                      />
                    </div>

                    {/* About Image Uploader */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        About Section Graphic (about_image_id)
                      </label>
                      <ImageUploader
                        value={aboutPreviewUrl}
                        onChange={(file) => setAboutImageFile(file)}
                        onRemove={() => {
                          setAboutImageFile(null);
                          setAboutPreviewUrl('');
                          setFormData((prev) => ({ ...prev, about_image_id: null }));
                        }}
                        folder="services"
                        width={800}
                        height={500}
                        aspectRatio={1.6}
                        label="Upload About Graphic"
                        description="SVG, PNG, or WebP illustration"
                      />
                    </div>

                    {/* About Logo Text */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        About Logo / Tagline Text
                      </label>
                      <input
                        name="about_logo_text"
                        type="text"
                        placeholder="e.g. Trusted by 500+ Organizations"
                        value={formData.about_logo_text || ''}
                        onChange={handleInputChange}
                        className={inputClass}
                      />
                    </div>

                    {/* Grid: About CTA Text & URL */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          About CTA Text
                        </label>
                        <input
                          name="about_cta_text"
                          type="text"
                          placeholder="Get a Quote"
                          value={formData.about_cta_text || 'Get a Quote'}
                          onChange={handleInputChange}
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          About CTA Destination URL
                        </label>
                        <input
                          name="about_cta_url"
                          type="text"
                          placeholder="# or /contact-us"
                          value={formData.about_cta_url || '#'}
                          onChange={handleInputChange}
                          className={inputClass}
                        />
                      </div>
                    </div>

                    {/* About Features List */}
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-xs font-bold text-slate-800">
                            Feature Bullet Points (about_features jsonb)
                          </h4>
                          <p className="text-[11px] text-slate-500">
                            Checkmark items displayed in the About section.
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={handleAddAboutFeature}
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg border border-indigo-200 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add Bullet Point</span>
                        </button>
                      </div>

                      <div className="space-y-2">
                        {(formData.about_features || []).map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            <input
                              type="text"
                              placeholder={`Feature Point #${idx + 1}`}
                              value={feature || ''}
                              onChange={(e) => handleAboutFeatureChange(idx, e.target.value)}
                              className={inputClass}
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveAboutFeature(idx)}
                              className="p-2 text-slate-400 hover:text-rose-600 rounded cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 4: RESULTS & STATS */}
                {activeTab === 'results' && (
                  <div className="space-y-5 animate-in fade-in duration-150">
                    <div className="bg-purple-50/60 p-4 rounded-xl border border-purple-100 mb-2">
                      <h3 className="text-xs font-bold text-purple-900 uppercase tracking-wider">
                        Results & Performance Metrics
                      </h3>
                      <p className="text-[11px] text-purple-700 mt-0.5">
                        Showcase proven quantitative ROI metrics, stat counters, and key client milestones.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Results Badge Text
                        </label>
                        <input
                          name="results_badge"
                          type="text"
                          placeholder="e.g. Proven Outcomes"
                          value={formData.results_badge || ''}
                          onChange={handleInputChange}
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Results Title
                        </label>
                        <input
                          name="results_title"
                          type="text"
                          placeholder="e.g. Real Business Impact"
                          value={formData.results_title || ''}
                          onChange={handleInputChange}
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Results Highlight Text
                      </label>
                      <input
                        name="results_highlight"
                        type="text"
                        placeholder="e.g. Measured in Scale & ROI"
                        value={formData.results_highlight || ''}
                        onChange={handleInputChange}
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Results Description
                      </label>
                      <textarea
                        name="results_description"
                        rows={3}
                        placeholder="Overview of results generated for enterprise clients..."
                        value={formData.results_description || ''}
                        onChange={handleInputChange}
                        className={`${inputClass} resize-y`}
                      />
                    </div>

                    {/* Results Stats Dynamic List */}
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-xs font-bold text-slate-800">
                            Quantitative Stat Counters (results_stats jsonb)
                          </h4>
                          <p className="text-[11px] text-slate-500">
                            Stat counters (e.g. &quot;99.9%&quot; - &quot;SLA Uptime Guaranteed&quot;).
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={handleAddResultStat}
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg border border-indigo-200 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add Stat Card</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {(formData.results_stats || []).map((stat, idx) => (
                          <div key={idx} className="p-3 bg-white rounded-xl border border-slate-200 space-y-2 relative shadow-2xs">
                            <button
                              type="button"
                              onClick={() => handleRemoveResultStat(idx)}
                              className="absolute right-2 top-2 p-1 text-slate-400 hover:text-rose-600 rounded cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                            <input
                              type="text"
                              placeholder="Stat Value (e.g. 99.9%, 4.8x, $2.4M)"
                              value={stat.value || ''}
                              onChange={(e) => handleResultStatChange(idx, 'value', e.target.value)}
                              className={`${inputClass} font-bold text-indigo-600`}
                            />
                            <input
                              type="text"
                              placeholder="Stat Label (e.g. SLA Uptime Guaranteed)"
                              value={stat.label || ''}
                              onChange={(e) => handleResultStatChange(idx, 'label', e.target.value)}
                              className={inputClass}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 5: SOLUTIONS */}
                {activeTab === 'solutions' && (
                  <div className="space-y-5 animate-in fade-in duration-150">
                    <div className="bg-sky-50/60 p-4 rounded-xl border border-sky-100 mb-2">
                      <h3 className="text-xs font-bold text-sky-900 uppercase tracking-wider">
                        Solutions Architecture & Technology
                      </h3>
                      <p className="text-[11px] text-sky-700 mt-0.5">
                        Architectural frameworks, system diagrams, and technology stack badges.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Solutions Badge Text
                        </label>
                        <input
                          name="solutions_badge"
                          type="text"
                          placeholder="e.g. Architecture"
                          value={formData.solutions_badge || ''}
                          onChange={handleInputChange}
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Solutions Title
                        </label>
                        <input
                          name="solutions_title"
                          type="text"
                          placeholder="e.g. Scalable Enterprise Solutions"
                          value={formData.solutions_title || ''}
                          onChange={handleInputChange}
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Solutions Highlight Text
                      </label>
                      <input
                        name="solutions_highlight"
                        type="text"
                        placeholder="e.g. Built for Modern Workloads"
                        value={formData.solutions_highlight || ''}
                        onChange={handleInputChange}
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Solutions Description
                      </label>
                      <textarea
                        name="solutions_description"
                        rows={3}
                        placeholder="Detail the solutions architecture..."
                        value={formData.solutions_description || ''}
                        onChange={handleInputChange}
                        className={`${inputClass} resize-y`}
                      />
                    </div>

                    {/* Solutions Image Uploader */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Solutions Architecture Diagram (solutions_image_id)
                      </label>
                      <ImageUploader
                        value={solutionsPreviewUrl}
                        onChange={(file) => setSolutionsImageFile(file)}
                        onRemove={() => {
                          setSolutionsImageFile(null);
                          setSolutionsPreviewUrl('');
                          setFormData((prev) => ({ ...prev, solutions_image_id: null }));
                        }}
                        folder="services"
                        width={800}
                        height={500}
                        aspectRatio={1.6}
                        label="Upload Solutions Diagram"
                        description="SVG, PNG, or WebP diagram"
                      />
                    </div>

                    {/* Solutions Logo Text */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Solutions Logo / Tagline Text
                      </label>
                      <input
                        name="solutions_logo_text"
                        type="text"
                        placeholder="e.g. Certified Cloud Architects"
                        value={formData.solutions_logo_text || ''}
                        onChange={handleInputChange}
                        className={inputClass}
                      />
                    </div>

                    {/* Solutions Badges */}
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                      <label className="block text-xs font-bold text-slate-800">
                        Technology Stack Badges (solutions_badges jsonb)
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="e.g. AWS Lambda, Kubernetes, Terraform"
                          value={solutionsBadgeInput}
                          onChange={(e) => setSolutionsBadgeInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddSolutionsBadge();
                            }
                          }}
                          className={inputClass}
                        />
                        <button
                          type="button"
                          onClick={handleAddSolutionsBadge}
                          className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 cursor-pointer shrink-0"
                        >
                          Add Badge
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {(formData.solutions_badges || []).map((badge, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs bg-sky-100 text-sky-800 font-medium"
                          >
                            {badge}
                            <button
                              type="button"
                              onClick={() => handleRemoveSolutionsBadge(idx)}
                              className="text-sky-600 hover:text-rose-600 cursor-pointer font-bold"
                            >
                              &times;
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 6: FAQ & SEO */}
                {activeTab === 'faq_seo' && (
                  <div className="space-y-5 animate-in fade-in duration-150">
                    <div className="bg-rose-50/60 p-4 rounded-xl border border-rose-100 mb-2">
                      <h3 className="text-xs font-bold text-rose-900 uppercase tracking-wider">
                        FAQ Accordion & Global SEO Metadata
                      </h3>
                      <p className="text-[11px] text-rose-700 mt-0.5">
                        Frequently asked questions, global call-to-actions, and search engine metadata.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          FAQ Badge Text
                        </label>
                        <input
                          name="faq_badge"
                          type="text"
                          placeholder="e.g. Common Questions"
                          value={formData.faq_badge || ''}
                          onChange={handleInputChange}
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          FAQ Title
                        </label>
                        <input
                          name="faq_title"
                          type="text"
                          placeholder="e.g. Frequently Asked Questions"
                          value={formData.faq_title || ''}
                          onChange={handleInputChange}
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        FAQ Description
                      </label>
                      <textarea
                        name="faq_description"
                        rows={2}
                        placeholder="Brief intro for the FAQ section..."
                        value={formData.faq_description || ''}
                        onChange={handleInputChange}
                        className={`${inputClass} resize-y`}
                      />
                    </div>

                    {/* FAQ Dynamic List */}
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-xs font-bold text-slate-800">
                            FAQ Question & Answer Pairs (faqs jsonb)
                          </h4>
                          <p className="text-[11px] text-slate-500">
                            Add questions and detailed answers.
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={handleAddFAQ}
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg border border-indigo-200 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add FAQ</span>
                        </button>
                      </div>

                      <div className="space-y-3">
                        {(formData.faqs || []).map((faq, idx) => (
                          <div key={idx} className="p-3 bg-white rounded-xl border border-slate-200 space-y-2 relative shadow-2xs">
                            <button
                              type="button"
                              onClick={() => handleRemoveFAQ(idx)}
                              className="absolute right-3 top-3 p-1 text-slate-400 hover:text-rose-600 rounded cursor-pointer"
                              title="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                            <input
                              type="text"
                              placeholder="Question (e.g. How long does cloud migration typically take?)"
                              value={faq.question || ''}
                              onChange={(e) => handleFAQChange(idx, 'question', e.target.value)}
                              className={`${inputClass} font-semibold`}
                            />
                            <textarea
                              rows={2}
                              placeholder="Detailed answer text..."
                              value={faq.answer || ''}
                              onChange={(e) => handleFAQChange(idx, 'answer', e.target.value)}
                              className={`${inputClass} resize-y`}
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <hr className="border-slate-200" />

                    {/* Global Bottom CTA */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Global Bottom CTA Text
                        </label>
                        <input
                          name="cta_text"
                          type="text"
                          placeholder="e.g. Start Your Project Today"
                          value={formData.cta_text || ''}
                          onChange={handleInputChange}
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Global Bottom CTA URL
                        </label>
                        <input
                          name="cta_url"
                          type="text"
                          placeholder="# or /contact-us"
                          value={formData.cta_url || ''}
                          onChange={handleInputChange}
                          className={inputClass}
                        />
                      </div>
                    </div>

                    {/* SEO Metadata */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Meta Title (SEO)
                      </label>
                      <input
                        name="meta_title"
                        type="text"
                        placeholder="e.g. Enterprise Cloud Migration Services | L2 Global"
                        value={formData.meta_title || ''}
                        onChange={handleInputChange}
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Meta Description (SEO)
                      </label>
                      <textarea
                        name="meta_description"
                        rows={2}
                        placeholder="Search engine meta description..."
                        value={formData.meta_description || ''}
                        onChange={handleInputChange}
                        className={`${inputClass} resize-y`}
                      />
                    </div>
                  </div>
                )}
              </form>

              {/* Bottom Step Navigation & Save Actions */}
              <div className="pt-6 mt-8 border-t border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {activeTab !== 'hero' && (
                    <button
                      type="button"
                      onClick={() => {
                        const idx = tabs.findIndex((t) => t.id === activeTab);
                        if (idx > 0) setActiveTab(tabs[idx - 1].id);
                      }}
                      className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
                    >
                      &larr; Previous Section
                    </button>
                  )}
                  {activeTab !== 'faq_seo' && (
                    <button
                      type="button"
                      onClick={() => {
                        const idx = tabs.findIndex((t) => t.id === activeTab);
                        if (idx < tabs.length - 1) setActiveTab(tabs[idx + 1].id);
                      }}
                      className="px-3.5 py-2 text-xs font-semibold text-indigo-700 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-colors cursor-pointer"
                    >
                      Next Section &rarr;
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    href="/asgard/services"
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
                  >
                    Cancel
                  </Link>
                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 px-6 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all shadow-md shadow-indigo-600/20 disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-3.5 h-3.5" />
                        <span>{isEditMode ? 'Update Service' : 'Publish Service'}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AsgardLayout>
  );
};
