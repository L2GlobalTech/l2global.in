'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Save,
  Loader2,
  HelpCircle,
  Folder,
  Tag,
  ArrowUpDown,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { AsgardLayout } from '@/components/asgard/AsgardLayout';
import { LoadingState } from '@/components/asgard/LoadingState';
import { FAQFormData } from '@/types/cms';
import {
  getFaqById,
  getFaqCategories,
  createFaq,
  updateFaq,
  FAQRecord,
} from '@/app/(asgard)/asgard/faqs/action';

interface FaqFormContainerProps {
  id?: string;
}

export const FaqFormContainer: React.FC<FaqFormContainerProps> = ({ id }) => {
  const router = useRouter();
  const isEditMode = Boolean(id);
  const [initialLoading, setInitialLoading] = useState(isEditMode);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);

  // Controlled form state
  const [formData, setFormData] = useState<FAQFormData>({
    category: '',
    tag: '',
    question: '',
    answer: '',
    sort_order: 0,
    is_active: true,
  });

  const [errors, setErrors] = useState<{ question?: string; answer?: string }>({});

  // Fetch categories on mount
  useEffect(() => {
    async function loadCats() {
      try {
        const cats = await getFaqCategories();
        setAvailableCategories(cats);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    }
    loadCats();
  }, []);

  // Fetch existing FAQ if in edit mode
  useEffect(() => {
    async function loadFaq() {
      if (!id) {
        setInitialLoading(false);
        return;
      }

      try {
        setInitialLoading(true);
        const faq = await getFaqById(id);

        if (!faq) {
          toast.error('FAQ item not found');
          router.push('/asgard/faqs');
          return;
        }

        setFormData({
          id: faq.id,
          category: faq.category || '',
          tag: faq.tag || '',
          question: faq.question || '',
          answer: faq.answer || '',
          sort_order: typeof faq.sort_order === 'number' ? faq.sort_order : 0,
          is_active: faq.is_active !== undefined ? Boolean(faq.is_active) : true,
        });
      } catch (err: any) {
        console.error('Error loading FAQ:', err);
        toast.error('Failed to load FAQ details');
        router.push('/asgard/faqs');
      } finally {
        setInitialLoading(false);
      }
    }

    if (isEditMode) {
      loadFaq();
    }
  }, [id, isEditMode, router]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { question?: string; answer?: string } = {};
    if (!formData.question.trim()) {
      newErrors.question = 'Question title is required';
    }
    if (!formData.answer.trim()) {
      newErrors.answer = 'Detailed answer is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error('Please resolve validation errors before saving.');
      return;
    }

    try {
      setIsSubmitting(true);
      setErrors({});

      const payload: Partial<FAQRecord> = {
        category: formData.category?.trim() || null,
        tag: formData.tag?.trim() || null,
        question: formData.question.trim(),
        answer: formData.answer.trim(),
        sort_order: Number.isInteger(Number(formData.sort_order)) ? Number(formData.sort_order) : 0,
        is_active: Boolean(formData.is_active),
      };

      if (isEditMode && id) {
        const res = await updateFaq(id, payload);
        if (!res.success) {
          toast.error(res.error || 'Failed to update FAQ');
          setIsSubmitting(false);
          return;
        }
        toast.success('FAQ updated successfully!');
      } else {
        const res = await createFaq(payload);
        if (!res.success) {
          toast.error(res.error || 'Failed to create FAQ');
          setIsSubmitting(false);
          return;
        }
        toast.success('FAQ created successfully!');
      }

      router.push('/asgard/faqs');
    } catch (err: any) {
      console.error('Error saving FAQ:', err);
      toast.error(err.message || 'Failed to save FAQ');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AsgardLayout>
      <div>
        {/* Top Header */}
        <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3.5">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
              <Link href="/asgard/overview" className="hover:text-slate-900 transition-colors font-medium">
                CMS
              </Link>
              <span>/</span>
              <Link href="/asgard/faqs" className="hover:text-slate-900 transition-colors font-medium">
                FAQs
              </Link>
              <span>/</span>
              <span className="text-slate-800 font-semibold">
                {isEditMode ? 'Edit FAQ' : 'Create FAQ'}
              </span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-indigo-600" />
              <span>{isEditMode ? 'Edit FAQ Item' : 'Create New FAQ Item'}</span>
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              {isEditMode
                ? 'Update question, detailed answer, category and display ordering.'
                : 'Author a new frequently asked question and answer for public visitors.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/asgard/faqs"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors cursor-pointer shadow-2xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to FAQs</span>
            </Link>
            <button
              type="button"
              onClick={handleFormSubmit}
              disabled={isSubmitting || initialLoading}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-2xs transition-all cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" />
                  <span>{isEditMode ? 'Save Changes' : 'Publish FAQ'}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Form Body */}
        {initialLoading ? (
          <LoadingState message="Loading FAQ details..." rows={5} />
        ) : (
          <form onSubmit={handleFormSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-5xl">
              {/* Main Content: Question & Answer (2 cols) */}
              <div className="lg:col-span-2 space-y-4">
                <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5 border-b border-slate-100 pb-2.5">
                    <HelpCircle className="w-4 h-4 text-indigo-600" />
                    FAQ Content
                  </h3>

                  {/* Question */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-semibold text-slate-700">
                        Question <span className="text-rose-500">*</span>
                      </label>
                      <span className="text-[11px] text-slate-400">
                        {formData.question?.length || 0} chars
                      </span>
                    </div>
                    <input
                      type="text"
                      value={formData.question}
                      onChange={(e) => {
                        setFormData({ ...formData, question: e.target.value });
                        if (errors.question) setErrors({ ...errors, question: undefined });
                      }}
                      placeholder="e.g. How does L2 Global ensure data migration security?"
                      className={`w-full px-3 py-2 text-xs font-medium bg-slate-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-900 placeholder:text-slate-400 ${
                        errors.question ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200'
                      }`}
                    />
                    {errors.question && (
                      <p className="text-xs text-rose-500 mt-1 font-medium">{errors.question}</p>
                    )}
                  </div>

                  {/* Answer */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-semibold text-slate-700">
                        Detailed Answer <span className="text-rose-500">*</span>
                      </label>
                      <span className="text-[11px] text-slate-400">
                        {formData.answer?.length || 0} chars
                      </span>
                    </div>
                    <textarea
                      rows={6}
                      value={formData.answer}
                      onChange={(e) => {
                        setFormData({ ...formData, answer: e.target.value });
                        if (errors.answer) setErrors({ ...errors, answer: undefined });
                      }}
                      placeholder="Write a comprehensive and clear explanation to address client queries..."
                      className={`w-full px-3 py-2 text-xs bg-slate-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-800 leading-relaxed placeholder:text-slate-400 ${
                        errors.answer ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200'
                      }`}
                    />
                    {errors.answer && (
                      <p className="text-xs text-rose-500 mt-1 font-medium">{errors.answer}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Sidebar Settings & Categorization (1 col) */}
              <div className="space-y-4">
                {/* Categorization Card */}
                <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs space-y-3.5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5 border-b border-slate-100 pb-2.5">
                    <Folder className="w-4 h-4 text-indigo-600" />
                    Categorization
                  </h3>

                  {/* Category */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Category
                    </label>
                    <input
                      type="text"
                      list="category-options"
                      value={formData.category || ''}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      placeholder="e.g. SALESFORCE, ORACLE"
                      className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 uppercase placeholder:normal-case transition-all text-slate-800"
                    />
                    <datalist id="category-options">
                      {availableCategories.map((c) => (
                        <option key={c} value={c} />
                      ))}
                    </datalist>
                    <span className="text-[11px] text-slate-400 mt-1 block">
                      Select existing or enter a new category.
                    </span>
                  </div>

                  {/* Tag */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                      <Tag className="w-3 h-3 text-slate-400" />
                      Topic Tag
                    </label>
                    <input
                      type="text"
                      value={formData.tag || ''}
                      onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                      placeholder="e.g. #Automation, #DevOps"
                      className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-800"
                    />
                  </div>
                </div>

                {/* Display & Status Card */}
                <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs space-y-3.5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5 border-b border-slate-100 pb-2.5">
                    <ArrowUpDown className="w-4 h-4 text-indigo-600" />
                    Display Settings
                  </h3>

                  {/* Sort Order */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Sort Order
                    </label>
                    <input
                      type="number"
                      value={formData.sort_order ?? 0}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          sort_order: parseInt(e.target.value) || 0,
                        })
                      }
                      placeholder="0"
                      className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                    />
                    <span className="text-[11px] text-slate-400 mt-1 block">
                      Lower numbers display first (0, 1, 2...).
                    </span>
                  </div>

                  {/* Active Visibility */}
                  <div className="pt-2 border-t border-slate-100">
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Publication Status
                    </label>
                    <div className="flex items-center gap-2.5">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.is_active ?? true}
                          onChange={(e) =>
                            setFormData({ ...formData, is_active: e.target.checked })
                          }
                          className="sr-only peer"
                        />
                        <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
                      </label>
                      <span className="text-xs font-semibold text-slate-700">
                        {formData.is_active ? (
                          <span className="text-emerald-700 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            Active (Visible)
                          </span>
                        ) : (
                          <span className="text-slate-500">Inactive (Hidden)</span>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </AsgardLayout>
  );
};
