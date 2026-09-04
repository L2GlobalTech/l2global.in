'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Layers,
  Plus,
  Search,
  Edit2,
  Trash2,
  Filter,
  RefreshCw,
  Calendar,
  CheckCircle2,
  ArrowUpDown,
  Tag,
  ExternalLink,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { AsgardLayout } from '@/components/asgard/AsgardLayout';
import { AsgardPageHeader } from '@/components/asgard/AsgardPageHeader';
import { StatusBadge } from '@/components/asgard/StatusBadge';
import { LoadingState } from '@/components/asgard/LoadingState';
import { EmptyState } from '@/components/asgard/EmptyState';
import { DeleteModal } from '@/components/asgard/DeleteModal';
import { DataTablePagination } from '@/components/asgard/DataTablePagination';
import { getMediaPublicUrl, deleteMedia } from '@/actions/mediaAction';
import {
  getServices,
  deleteService,
  toggleServiceActiveStatus,
  ServiceRecord,
} from '@/app/(asgard)/asgard/services/action';

export const ServicesContainer: React.FC = () => {
  const router = useRouter();
  const [services, setServices] = useState<ServiceRecord[]>([]);
  const [loading, setLoading] = useState(true);

  // Search & Filter state
  const [searchInput, setSearchInput] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // Delete Modal state
  const [deletingService, setDeletingService] = useState<ServiceRecord | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchInput);
      setCurrentPage(1);
    }, 350);
    return () => clearTimeout(timer);
  }, [searchInput]);

  // Load services from Supabase
  const loadServices = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getServices({
        page: currentPage,
        pageSize: itemsPerPage,
        search: debouncedSearch,
        status: statusFilter,
      });

      setServices(res.data || []);
      setTotalCount(res.total);
      setTotalPages(res.totalPages);

      if (res.data.length === 0 && currentPage > 1 && res.total > 0) {
        setCurrentPage((prev) => Math.max(1, prev - 1));
      }
    } catch (err: any) {
      console.error('Failed to query services from Supabase:', err);
      toast.error('Failed to load services from Supabase');
    } finally {
      setLoading(false);
    }
  }, [currentPage, itemsPerPage, debouncedSearch, statusFilter]);

  useEffect(() => {
    loadServices();
  }, [loadServices]);

  // Handle Delete Confirmation
  const handleConfirmDelete = async () => {
    if (!deletingService?.id) return;

    try {
      setIsDeleting(true);
      const res = await deleteService(deletingService.id);

      if (!res.success) {
        toast.error(res.error || 'Failed to delete service');
        return;
      }

      // Cleanup associated media if applicable
      if (deletingService.hero_image_id) await deleteMedia(deletingService.hero_image_id, 'services');
      if (deletingService.about_image_id) await deleteMedia(deletingService.about_image_id, 'services');
      if (deletingService.solutions_image_id) await deleteMedia(deletingService.solutions_image_id, 'services');

      toast.success(`Service "${deletingService.title}" deleted successfully.`);
      setDeletingService(null);
      await loadServices();
    } catch (err: any) {
      console.error('Error deleting service:', err);
      toast.error(err.message || 'Failed to delete service');
    } finally {
      setIsDeleting(false);
    }
  };

  // Toggle Active Status
  const handleToggleStatus = async (service: ServiceRecord) => {
    if (!service.id) return;
    const currentBool = Boolean(service.is_active);
    const res = await toggleServiceActiveStatus(service.id, currentBool);
    if (res.success) {
      toast.success(`Service is now ${!currentBool ? 'Active (Visible)' : 'Inactive (Hidden)'}`);
      await loadServices();
    } else {
      toast.error(res.error || 'Failed to toggle status');
    }
  };

  return (
    <AsgardLayout>
      <AsgardPageHeader
        title="Services & Capabilities"
        description="Manage your enterprise technology service offerings, content sections, deliverables, and display order."
        breadcrumb={[
          { label: 'CMS', href: '/asgard/overview' },
          { label: 'Services' },
        ]}
        actionLabel="Add Service"
        onAction={() => router.push('/asgard/services/create')}
      />

      {/* Top Filter & Control Bar */}
      <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200 shadow-xs mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
        {/* Search */}
        <div className="relative flex-1 max-w-lg">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search by title, slug, badge, or hero text..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full pl-9.5 pr-3.5 py-2 text-xs sm:text-sm bg-slate-100 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors placeholder:text-slate-400"
          />
        </div>

        {/* Filter Controls & Refresh */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-xl text-slate-700">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value as any);
                setCurrentPage(1);
              }}
              className="bg-transparent border-0 text-xs sm:text-sm font-medium text-slate-700 focus:outline-none cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active Only</option>
              <option value="inactive">Inactive Only</option>
            </select>
          </div>

          <button
            type="button"
            onClick={loadServices}
            disabled={loading}
            className="p-2 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
            title="Refresh services list"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main Content Area: DataTable / Loading / Empty */}
      {loading ? (
        <LoadingState message="Fetching services from Supabase..." rows={6} />
      ) : services.length === 0 ? (
        <EmptyState
          title={searchInput || statusFilter !== 'all' ? 'No matching services found' : 'No services created yet'}
          description={
            searchInput || statusFilter !== 'all'
              ? 'Try adjusting your search criteria or status filter to find matching services.'
              : 'Add your first enterprise technology service offering.'
          }
          actionLabel="Add Service"
          onAction={() => router.push('/asgard/services/create')}
          icon={<Layers className="w-7 h-7 stroke-[1.5]" />}
        />
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3">Service Offering</th>
                  <th className="px-3.5 py-3">Slug</th>
                  <th className="px-3.5 py-3">Capabilities</th>
                  <th className="px-3.5 py-3">Status</th>
                  <th className="px-3.5 py-3">Order</th>
                  <th className="px-3.5 py-3">Created</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {services.map((service) => {
                  const mediaUrl = service.hero_image_id
                    ? getMediaPublicUrl(service.hero_image_id, 'services')
                    : null;
                  const capsCount = Array.isArray(service.capabilities)
                    ? service.capabilities.length
                    : 0;

                  return (
                    <tr
                      key={service.id}
                      className="hover:bg-slate-50/80 transition-colors group"
                    >
                      {/* Service Offering Title & Thumbnail */}
                      <td className="px-4 py-3">
                        <div className="flex items-start gap-3 max-w-md">
                          {mediaUrl ? (
                            <div className="w-10 h-9 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shrink-0 mt-0.5">
                              <img
                                src={mediaUrl}
                                alt={service.title || 'Service'}
                                className="w-full h-full object-contain p-0.5"
                                onError={(e) => {
                                  (e.target as HTMLElement).style.display = 'none';
                                }}
                              />
                            </div>
                          ) : (
                            <div className="w-9 h-9 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0 mt-0.5">
                              <Layers className="w-4 h-4" />
                            </div>
                          )}

                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <Link
                                href={`/asgard/services/edit?id=${service.id}`}
                                className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors text-xs sm:text-sm line-clamp-1"
                              >
                                {service.title}
                              </Link>
                              {service.badge_text && (
                                <span className="inline-flex items-center px-1.5 py-0.2 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
                                  {service.badge_text}
                                </span>
                              )}
                            </div>
                            {(service.hero_title || service.hero_description) && (
                              <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                                {service.hero_title || service.hero_description}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Slug */}
                      <td className="px-3.5 py-3 whitespace-nowrap text-[11px] font-mono text-slate-700">
                        /{service.slug || '-'}
                      </td>

                      {/* Capabilities count */}
                      <td className="px-3.5 py-3 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          {capsCount} {capsCount === 1 ? 'Item' : 'Items'}
                        </span>
                      </td>

                      {/* Status Toggle */}
                      <td className="px-3.5 py-3 whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => handleToggleStatus(service)}
                          className="cursor-pointer"
                          title="Click to toggle status"
                        >
                          <StatusBadge status={service.is_active ? 'active' : 'inactive'} />
                        </button>
                      </td>

                      {/* Sort Order */}
                      <td className="px-3.5 py-3 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                          <ArrowUpDown className="w-2.5 h-2.5 text-slate-400" />
                          {service.sort_order ?? 0}
                        </span>
                      </td>

                      {/* Created Date */}
                      <td className="px-3.5 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-1 text-xs text-slate-600 font-medium">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          <span>
                            {service.created_at
                              ? new Date(service.created_at).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric',
                                })
                              : '-'}
                          </span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Link
                            href={`/asgard/services/edit?id=${service.id}`}
                            className="p-1 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors cursor-pointer inline-flex items-center justify-center"
                            title="Edit Service"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </Link>
                          <button
                            type="button"
                            onClick={() => setDeletingService(service)}
                            className="p-1 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors cursor-pointer inline-flex items-center justify-center"
                            title="Delete Service"
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

          {/* Reusable Server-Side Pagination */}
          <DataTablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalCount}
            itemsPerPage={itemsPerPage}
            itemName="services"
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
        isOpen={Boolean(deletingService)}
        title="Delete Service"
        itemName={deletingService?.title || 'this service'}
        itemType="service"
        isDeleting={isDeleting}
        onClose={() => setDeletingService(null)}
        onConfirm={handleConfirmDelete}
      />
    </AsgardLayout>
  );
};
