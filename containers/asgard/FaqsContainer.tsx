'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search,
  Edit2,
  Trash2,
  Filter,
  RefreshCw,
  HelpCircle,
  Folder,
  Tag,
  ArrowUpDown,
  CheckCircle2,
  XCircle,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { AsgardLayout } from '@/components/asgard/AsgardLayout';
import { AsgardPageHeader } from '@/components/asgard/AsgardPageHeader';
import { LoadingState } from '@/components/asgard/LoadingState';
import { EmptyState } from '@/components/asgard/EmptyState';
import { DeleteModal } from '@/components/asgard/DeleteModal';
import { DataTablePagination } from '@/components/asgard/DataTablePagination';
import {
  getFaqs,
  getFaqCategories,
  deleteFaq,
  toggleFaqActiveStatus,
  FAQRecord,
} from '@/app/(asgard)/asgard/faqs/action';

export const FaqsContainer: React.FC = () => {
  const router = useRouter();
  const [faqs, setFaqs] = useState<FAQRecord[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  // Search & Filter state
  const [searchInput, setSearchInput] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categories, setCategories] = useState<string[]>([]);

  // Expanded answers state (for quick in-table reading)
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Delete Modal state
  const [deletingFaq, setDeletingFaq] = useState<FAQRecord | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Debounce search input (400ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchInput);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchInput]);

  // Reset page to 1 when debounced search changes
  const isFirstMount = useRef(true);
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    setCurrentPage(1);
  }, [debouncedSearch]);

  // Fetch unique categories on mount
  const loadCategories = useCallback(async () => {
    try {
      const cats = await getFaqCategories();
      setCategories(cats);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  }, []);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  // Fetch FAQs with server-side filters & pagination
  const loadFaqs = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getFaqs({
        page: currentPage,
        pageSize: itemsPerPage,
        search: debouncedSearch,
        category: categoryFilter,
        status: statusFilter,
      });

      setFaqs(res.data || []);
      setTotalCount(res.total);
      setTotalPages(res.totalPages);

      if (res.data.length === 0 && currentPage > 1 && res.total > 0) {
        setCurrentPage((prev) => Math.max(1, prev - 1));
      }
    } catch (err: any) {
      console.error('Error querying FAQs from Supabase:', err);
      toast.error('Failed to query FAQs from Supabase');
    } finally {
      setLoading(false);
    }
  }, [currentPage, itemsPerPage, debouncedSearch, categoryFilter, statusFilter]);

  useEffect(() => {
    loadFaqs();
  }, [loadFaqs]);

  // Handle Toggle Active Status
  const handleToggleActive = async (faq: FAQRecord) => {
    if (!faq.id) return;
    try {
      const res = await toggleFaqActiveStatus(faq.id, faq.is_active ?? true);
      if (res.success) {
        toast.success(
          faq.is_active
            ? 'FAQ set to Inactive (Hidden)'
            : 'FAQ set to Active (Published)!'
        );
        await loadFaqs();
      } else {
        toast.error(res.error || 'Failed to update status');
      }
    } catch (err: any) {
      console.error('Error toggling FAQ status:', err);
      toast.error('Failed to update status');
    }
  };

  // Handle Delete
  const handleConfirmDelete = async () => {
    if (!deletingFaq?.id) return;

    try {
      setIsDeleting(true);
      const res = await deleteFaq(deletingFaq.id);

      if (!res.success) {
        toast.error(res.error || 'Failed to delete FAQ');
        return;
      }

      toast.success('FAQ deleted successfully.');
      setDeletingFaq(null);
      await Promise.all([loadFaqs(), loadCategories()]);
    } catch (err: any) {
      console.error('Error deleting FAQ:', err);
      toast.error(err.message || 'Failed to delete FAQ');
    } finally {
      setIsDeleting(false);
    }
  };

  // Toggle answer expansion
  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <AsgardLayout>
      <AsgardPageHeader
        title="Frequently Asked Questions (FAQs)"
        description="Create, organize, categorize and maintain FAQ items shown across the public website."
        breadcrumb={[
          { label: 'CMS', href: '/asgard/overview' },
          { label: 'FAQs' },
        ]}
        actionLabel="New FAQ Item"
        onAction={() => router.push('/asgard/faqs/create')}
      />

      {/* Control Bar: Search, Category Filter, Status Filter & Refresh */}
      <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200 shadow-xs mb-5 flex flex-col md:flex-row md:items-center justify-between gap-3.5">
        <div className="relative flex-1 max-w-lg">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search by question, answer, tag or category..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full pl-9.5 pr-3.5 py-2 text-xs sm:text-sm bg-slate-100 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-colors placeholder:text-slate-400"
          />
        </div>

        <div className="flex items-center flex-wrap gap-2.5">
          {/* Category Filter */}
          <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-xl text-slate-700">
            <Folder className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <select
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-transparent border-0 text-xs sm:text-sm font-medium text-slate-700 focus:outline-none cursor-pointer pr-1"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-xl text-slate-700">
            <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-transparent border-0 text-xs sm:text-sm font-medium text-slate-700 focus:outline-none cursor-pointer pr-1"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active Only</option>
              <option value="inactive">Inactive Only</option>
            </select>
          </div>

          {/* Refresh Button */}
          <button
            type="button"
            onClick={loadFaqs}
            disabled={loading}
            className="p-2 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
            title="Refresh FAQs"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main Content: Table / Loading / Empty */}
      {loading ? (
        <LoadingState message="Fetching FAQs from Supabase..." rows={6} />
      ) : faqs.length === 0 ? (
        <EmptyState
          title={
            searchInput || categoryFilter !== 'all' || statusFilter !== 'all'
              ? 'No matching FAQs found'
              : 'No FAQs created yet'
          }
          description={
            searchInput || categoryFilter !== 'all' || statusFilter !== 'all'
              ? 'Try adjusting your search query or filters to find matching FAQ entries.'
              : 'Get started by creating your very first FAQ item for the website.'
          }
          actionLabel="Create FAQ Item"
          onAction={() => router.push('/asgard/faqs/create')}
          icon={<HelpCircle className="w-6 h-6 stroke-[1.5]" />}
        />
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3">FAQ Details</th>
                  <th className="px-3.5 py-3">Category & Tag</th>
                  <th className="px-3.5 py-3 text-center">Order</th>
                  <th className="px-3.5 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {faqs.map((faq) => {
                  const isExpanded = Boolean(faq.id && expandedIds[faq.id]);

                  return (
                    <tr
                      key={faq.id}
                      className="hover:bg-slate-50/80 transition-colors group align-top"
                    >
                      {/* Question & Answer */}
                      <td className="px-4 py-3 max-w-xl">
                        <div className="space-y-0.5">
                          <h4 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors text-xs sm:text-sm leading-snug">
                            {faq.question}
                          </h4>
                          <p
                            className={`text-xs text-slate-600 leading-relaxed ${
                              isExpanded ? 'whitespace-pre-wrap' : 'line-clamp-2'
                            }`}
                          >
                            {faq.answer}
                          </p>
                          {faq.answer && faq.answer.length > 130 && (
                            <button
                              type="button"
                              onClick={() => faq.id && toggleExpand(faq.id)}
                              className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-600 hover:text-indigo-700 transition-colors cursor-pointer pt-0.5"
                            >
                              {isExpanded ? (
                                <>
                                  <ChevronUp className="w-3 h-3" />
                                  <span>Show Less</span>
                                </>
                              ) : (
                                <>
                                  <ChevronDown className="w-3 h-3" />
                                  <span>Show Full Answer</span>
                                </>
                              )}
                            </button>
                          )}
                        </div>
                      </td>

                      {/* Category & Tag */}
                      <td className="px-3.5 py-3 whitespace-nowrap">
                        <div className="space-y-1">
                          {faq.category ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-100 uppercase tracking-wide">
                              <Folder className="w-3 h-3 text-indigo-500" />
                              {faq.category}
                            </span>
                          ) : (
                            <span className="text-[11px] text-slate-400">Uncategorized</span>
                          )}

                          {faq.tag && (
                            <div>
                              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-600 border border-slate-200">
                                <Tag className="w-2.5 h-2.5 text-slate-400" />
                                {faq.tag}
                              </span>
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Order */}
                      <td className="px-3.5 py-3 whitespace-nowrap text-center">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                          <ArrowUpDown className="w-2.5 h-2.5 text-slate-400" />
                          {faq.sort_order ?? 0}
                        </span>
                      </td>

                      {/* Status Toggle */}
                      <td className="px-3.5 py-3 whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => handleToggleActive(faq)}
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold border transition-all cursor-pointer ${
                            faq.is_active
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 shadow-2xs'
                              : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200'
                          }`}
                          title="Click to toggle visibility"
                        >
                          {faq.is_active ? (
                            <>
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              <span>Active</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3 h-3 text-slate-400" />
                              <span>Inactive</span>
                            </>
                          )}
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Link
                            href={`/asgard/faqs/edit?id=${faq.id}`}
                            className="p-1 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors cursor-pointer inline-flex items-center justify-center"
                            title="Edit FAQ"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </Link>
                          <button
                            type="button"
                            onClick={() => setDeletingFaq(faq)}
                            className="p-1 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors cursor-pointer inline-flex items-center justify-center"
                            title="Delete FAQ"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <DataTablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalCount}
            itemsPerPage={itemsPerPage}
            itemName="FAQs"
            onPageChange={(page: number) => setCurrentPage(page)}
            onItemsPerPageChange={(size: number) => {
              setItemsPerPage(size);
              setCurrentPage(1);
            }}
            pageSizeOptions={[5, 10, 20, 50]}
          />
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={Boolean(deletingFaq)}
        title="Delete FAQ Item"
        itemName={deletingFaq?.question || undefined}
        itemType="FAQ"
        isDeleting={isDeleting}
        onClose={() => setDeletingFaq(null)}
        onConfirm={handleConfirmDelete}
      />
    </AsgardLayout>
  );
};
