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
  MessageSquareQuote,
  Star,
  ArrowUpDown,
  CheckCircle2,
  XCircle,
  Plus,
  Quote,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { AsgardLayout } from '@/components/asgard/AsgardLayout';
import { AsgardPageHeader } from '@/components/asgard/AsgardPageHeader';
import { LoadingState } from '@/components/asgard/LoadingState';
import { EmptyState } from '@/components/asgard/EmptyState';
import { DeleteModal } from '@/components/asgard/DeleteModal';
import { DataTablePagination } from '@/components/asgard/DataTablePagination';
import { AsgardFilterSelect } from '@/components/asgard/AsgardFilterSelect';
import {
  getTestimonials,
  deleteTestimonial,
  toggleTestimonialActiveStatus,
  TestimonialRecord,
} from '@/app/(asgard)/asgard/testimonials/action';

export const TestimonialsContainer: React.FC = () => {
  const router = useRouter();
  const [testimonials, setTestimonials] = useState<TestimonialRecord[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  // Search & Filter state
  const [searchInput, setSearchInput] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Delete Modal state
  const [deletingItem, setDeletingItem] = useState<TestimonialRecord | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Status toggle in-flight tracker
  const [togglingId, setTogglingId] = useState<string | null>(null);

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
  }, [debouncedSearch, statusFilter]);

  // Fetch Testimonials
  const loadTestimonials = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getTestimonials({
        page: currentPage,
        pageSize: itemsPerPage,
        search: debouncedSearch,
        status: statusFilter,
      });

      setTestimonials(res.data);
      setTotalCount(res.total);
      setTotalPages(res.totalPages);
    } catch (err) {
      console.error('Error fetching testimonials:', err);
      toast.error('Failed to load testimonials');
    } finally {
      setLoading(false);
    }
  }, [currentPage, itemsPerPage, debouncedSearch, statusFilter]);

  useEffect(() => {
    loadTestimonials();
  }, [loadTestimonials]);

  // Handle Toggle Active/Inactive
  const handleToggleStatus = async (item: TestimonialRecord) => {
    if (!item.id) return;
    try {
      setTogglingId(item.id);
      const current = item.is_active ?? true;
      const res = await toggleTestimonialActiveStatus(item.id, current);

      if (res.success) {
        setTestimonials((prev) =>
          prev.map((t) => (t.id === item.id ? { ...t, is_active: !current } : t))
        );
        toast.success(`Testimonial is now ${!current ? 'Active' : 'Inactive'}`);
      } else {
        toast.error(res.error || 'Failed to update status');
      }
    } catch (err) {
      console.error('Error toggling status:', err);
      toast.error('Something went wrong');
    } finally {
      setTogglingId(null);
    }
  };

  // Handle Delete Confirmation
  const handleConfirmDelete = async () => {
    if (!deletingItem?.id) return;
    try {
      setIsDeleting(true);
      const res = await deleteTestimonial(deletingItem.id);

      if (res.success) {
        toast.success('Testimonial deleted successfully');
        setDeletingItem(null);
        loadTestimonials();
      } else {
        toast.error(res.error || 'Failed to delete testimonial');
      }
    } catch (err) {
      console.error('Error deleting testimonial:', err);
      toast.error('Something went wrong');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AsgardLayout>
      <AsgardPageHeader
        title="Testimonials Management"
        description="Manage client testimonials displayed on the homepage. Control ratings, client roles, avatar images, and carousel order."
        actionLabel="Add Testimonial"
        onAction={() => router.push('/asgard/testimonials/create')}
      />

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6 shadow-xs">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by client name, company, role, or review text..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-800 placeholder:text-slate-400 transition-all"
            />
          </div>

          <div className="flex items-center gap-2">
            {/* Status Filter */}
            <AsgardFilterSelect
              value={statusFilter}
              onChange={(val) => setStatusFilter(val)}
              options={[
                { label: 'All Statuses', value: 'all' },
                { label: 'Active Only', value: 'active' },
                { label: 'Inactive Only', value: 'inactive' },
              ]}
              icon={<Filter className="w-3.5 h-3.5 text-slate-400" />}
            />

            {/* Refresh Button */}
            <button
              onClick={() => loadTestimonials()}
              title="Refresh"
              className="p-2 text-slate-500 hover:text-slate-700 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 transition-all"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {loading ? (
        <LoadingState message="Loading testimonials from database..." rows={5} />
      ) : testimonials.length === 0 ? (
        <EmptyState
          title="No testimonials found"
          description={
            debouncedSearch || statusFilter !== 'all'
              ? 'Try adjusting your search query or filter options.'
              : 'Start by adding client reviews to showcase on your homepage.'
          }
          actionLabel="Add Testimonial"
          onAction={() => router.push('/asgard/testimonials/create')}
        />
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/75 text-[11px] font-bold uppercase tracking-wider text-slate-600">
                  <th className="py-3 px-4 w-12 text-center">#</th>
                  <th className="py-3 px-4">Client</th>
                  <th className="py-3 px-4">Testimonial Quote</th>
                  <th className="py-3 px-4 w-28 text-center">Rating</th>
                  <th className="py-3 px-4 w-24 text-center">Order</th>
                  <th className="py-3 px-4 w-24 text-center">Status</th>
                  <th className="py-3 px-4 w-28 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {testimonials.map((item, index) => {
                  const ratingStars = Math.max(1, Math.min(5, Number(item.rating) || 5));
                  return (
                    <tr
                      key={item.id || index}
                      className="hover:bg-slate-50/60 transition-colors"
                    >
                      {/* Order / Index */}
                      <td className="py-3.5 px-4 text-center font-medium text-slate-400">
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </td>

                      {/* Client Info with Avatar */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          {item.img ? (
                            <img
                              src={item.img}
                              alt={item.name}
                              className="w-10 h-10 rounded-full object-cover border border-slate-200 shrink-0 bg-slate-100"
                              onError={(e) => {
                                (e.target as HTMLElement).style.display = 'none';
                              }}
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-2xs">
                              {item.name ? item.name.charAt(0).toUpperCase() : 'U'}
                            </div>
                          )}
                          <div className="min-w-0">
                            <h4 className="font-semibold text-slate-900 leading-snug truncate">
                              {item.name}
                            </h4>
                            <p className="text-[11px] text-slate-500 truncate">
                              {item.role || 'Client'}
                            </p>
                            {item.company && (
                              <p className="text-[10px] text-indigo-600 font-medium truncate">
                                {item.company}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Testimonial Quote & Snippet */}
                      <td className="py-3.5 px-4 max-w-md">
                        {item.title && (
                          <div className="font-semibold text-slate-800 line-clamp-1 mb-0.5 text-xs">
                            {item.title}
                          </div>
                        )}
                        <p className="text-slate-600 text-[11px] line-clamp-2 leading-relaxed">
                          {item.desc}
                        </p>
                      </td>

                      {/* Rating */}
                      <td className="py-3.5 px-4 text-center">
                        <div className="flex items-center justify-center gap-0.5 text-amber-400">
                          {Array.from({ length: ratingStars }).map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                      </td>

                      {/* Display Order */}
                      <td className="py-3.5 px-4 text-center">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-700">
                          {item.display_order ?? 0}
                        </span>
                      </td>

                      {/* Active Status Toggle */}
                      <td className="py-3.5 px-4 text-center">
                        <button
                          type="button"
                          disabled={togglingId === item.id}
                          onClick={() => handleToggleStatus(item)}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all ${
                            item.is_active
                              ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'
                          }`}
                        >
                          {item.is_active ? (
                            <>
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              Active
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3 h-3 text-slate-400" />
                              Inactive
                            </>
                          )}
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Link
                            href={`/asgard/testimonials/edit/${item.id}`}
                            className="p-1.5 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-all"
                            title="Edit Testimonial"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </Link>
                          <button
                            type="button"
                            onClick={() => setDeletingItem(item)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-all"
                            title="Delete Testimonial"
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
            itemName="Testimonials"
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
        isOpen={Boolean(deletingItem)}
        title="Delete Testimonial"
        itemName={deletingItem?.name ? `${deletingItem.name}'s testimonial` : undefined}
        itemType="Testimonial"
        isDeleting={isDeleting}
        onClose={() => setDeletingItem(null)}
        onConfirm={handleConfirmDelete}
      />
    </AsgardLayout>
  );
};
