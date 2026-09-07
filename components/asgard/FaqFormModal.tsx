'use client';

import React, { useState, useEffect } from 'react';
import { X, HelpCircle, Sparkles, Loader2, ArrowUpDown, Tag, Folder } from 'lucide-react';
import { FAQItem, FAQFormData } from '@/types/cms';

interface FaqFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FAQFormData) => Promise<void>;
  initialData?: FAQItem | null;
  categories?: string[];
  isSubmitting?: boolean;
}

export const FaqFormModal: React.FC<FaqFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  categories = [],
  isSubmitting = false,
}) => {
  const [formData, setFormData] = useState<FAQFormData>({
    category: '',
    tag: '',
    question: '',
    answer: '',
    sort_order: 0,
    is_active: true,
  });

  const [errors, setErrors] = useState<{ question?: string; answer?: string }>({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id,
        category: initialData.category || '',
        tag: initialData.tag || '',
        question: initialData.question || '',
        answer: initialData.answer || '',
        sort_order: typeof initialData.sort_order === 'number' ? initialData.sort_order : 0,
        is_active: initialData.is_active !== undefined ? Boolean(initialData.is_active) : true,
      });
    } else {
      setFormData({
        category: categories[0] || 'GENERAL & STRATEGY',
        tag: '',
        question: '',
        answer: '',
        sort_order: 0,
        is_active: true,
      });
    }
    setErrors({});
  }, [initialData, isOpen, categories]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { question?: string; answer?: string } = {};

    if (!formData.question.trim()) {
      newErrors.question = 'Question is required';
    }
    if (!formData.answer.trim()) {
      newErrors.answer = 'Answer is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    await onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-2xl w-full my-6 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-150 max-h-[90vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {initialData ? 'Edit FAQ Item' : 'Create New FAQ Item'}
              </h3>
              <p className="text-xs text-slate-500">
                {initialData
                  ? 'Update questions, answers, and categorization.'
                  : 'Add a new frequently asked question to your website.'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Category & Tag row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <Folder className="w-3.5 h-3.5 text-slate-400" />
                Category
              </label>
              <input
                type="text"
                list="category-suggestions"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="e.g. SALESFORCE, ORACLE..."
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all uppercase placeholder:normal-case"
              />
              <datalist id="category-suggestions">
                {categories.map((cat) => (
                  <option key={cat} value={cat} />
                ))}
              </datalist>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-slate-400" />
                Tag / Topic
              </label>
              <input
                type="text"
                value={formData.tag}
                onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                placeholder="e.g. #Automation, #DevOps"
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />
            </div>
          </div>

          {/* Question */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Question <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={formData.question}
              onChange={(e) => {
                setFormData({ ...formData, question: e.target.value });
                if (errors.question) setErrors({ ...errors, question: undefined });
              }}
              placeholder="e.g. How does L2 Global handle cloud migrations?"
              className={`w-full px-3.5 py-2.5 text-sm bg-slate-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium text-slate-900 ${
                errors.question ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200'
              }`}
            />
            {errors.question && (
              <p className="text-xs text-rose-500 mt-1 font-medium">{errors.question}</p>
            )}
          </div>

          {/* Answer */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Answer <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={5}
              value={formData.answer}
              onChange={(e) => {
                setFormData({ ...formData, answer: e.target.value });
                if (errors.answer) setErrors({ ...errors, answer: undefined });
              }}
              placeholder="Provide a clear, detailed explanation or answer..."
              className={`w-full px-3.5 py-2.5 text-sm bg-slate-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-800 ${
                errors.answer ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200'
              }`}
            />
            {errors.answer && (
              <p className="text-xs text-rose-500 mt-1 font-medium">{errors.answer}</p>
            )}
          </div>

          {/* Sort Order & Active Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                Display Sort Order
              </label>
              <input
                type="number"
                value={formData.sort_order}
                onChange={(e) =>
                  setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })
                }
                placeholder="0"
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">
                Lower numbers appear first in lists.
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Visibility Status
              </label>
              <div className="flex items-center gap-3 mt-2">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_active}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
                <span className="text-sm font-medium text-slate-700">
                  {formData.is_active ? (
                    <span className="text-emerald-700 font-semibold">Active (Public)</span>
                  ) : (
                    <span className="text-slate-500">Inactive (Hidden)</span>
                  )}
                </span>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm shadow-indigo-600/20 transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{initialData ? 'Save Changes' : 'Create FAQ'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
