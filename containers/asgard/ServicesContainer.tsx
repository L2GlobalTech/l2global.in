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
  Layers,
  Calendar,
  Eye,
  ArrowUpDown,
  CheckCircle2,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { AsgardLayout } from '@/components/asgard/AsgardLayout';
import { AsgardPageHeader } from '@/components/asgard/AsgardPageHeader';
import { StatusBadge } from '@/components/asgard/StatusBadge';
import { LoadingState } from '@/components/asgard/LoadingState';
import { EmptyState } from '@/components/asgard/EmptyState';
import { DeleteModal } from '@/components/asgard/DeleteModal';
import { ServicePreviewModal } from '@/components/asgard/ServicePreviewModal';
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
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  // Search & Filter state
  const [searchInput, setSearchInput] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Server-side pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  // Delete modal state
  const [deletingService, setDeletingService] = useState<ServiceRecord | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Preview drawer state
  const [previewService, setPreviewService] = useState<ServiceRecord | null>(null);

  // Debounce search input (400ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchInput);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchInput]);

  // When debounced search changes, reset page to 1
  const isFirstMount = useRef(true);
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    setCurrentPage(1);
  }, [debouncedSearch]);

  // Fetch services directly from Supabase with server-side search and pagination
  const loadServices = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getServices({
        page: currentPage,
        pageSize: itemsPerPage,
        search: debouncedSearch,
        status: statusFilter as any,
      });

      setServices(res.data || []);
      setTotalCount(res.total);
      setTotalPages(res.totalPages);

      // Handle edge case: if current page is empty after deletion and previous pages exist
      if (res.data.length === 0 && currentPage > 1 && res.total > 0) {
        setCurrentPage((prev) => Math.max(1, prev - 1));
      }
    } catch (err: any) {
      console.error('Error querying services from Supabase:', err);
      toast.error('Failed to query services from Supabase');
    } finally {
      setLoading(false);
    }
  }, [currentPage, itemsPerPage, debouncedSearch, statusFilter]);

  useEffect(() => {
    loadServices();
  }, [loadServices]);

  // Handle Toggle Status
  const handleToggleStatus = async (service: ServiceRecord) => {
    if (!service.id) return;
    const currentBool = Boolean(service.is_active);
    const res = await toggleServiceActiveStatus(service.id, currentBool);
    if (res.success) {
      toast.success(`Service is now ${!currentBool ? 'Active' : 'Inactive'}!`);
      await loadServices();
    } else {
      toast.error(res.error || 'Failed to update status');
    }
  };

  // Handle Delete
  const handleConfirmDelete = async () => {
    if (!deletingService?.id) return;

    try {
      setIsDeleting(true);
      const mediaIdToDelete = deletingService.media_id;
      const res = await deleteService(deletingService.id);

      if (!res.success) {
        toast.error(res.error || 'Failed to delete service');
        return;
      }

      // Safe cleanup of storage image after successful database delete
      if (mediaIdToDelete) {
        await deleteMedia(mediaIdToDelete);
      }

      toast.success(`Service "${deletingService.title}" deleted.`);
      setDeletingService(null);
      await loadServices();
    } catch (err: any) {
      console.error('Error deleting service:', err);
      toast.error(err.message || 'Failed to delete service');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AsgardLayout>
      <AsgardPageHeader
        title="Services & Capabilities"
        description="Configure enterprise technology services, features, deliverables, and display order."
        breadcrumb={[
          { label: 'CMS', href: '/asgard/overview' },
          { label: 'Services' },
        ]}
        actionLabel="Add Service"
        onAction={() => router.push('/asgard/services/create')}
      />

      {/* Control Bar: Server-side Search & Status Filter */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search by title, slug, badge or description..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-slate-100 border-0 rounded-lg focus:outline-none focus:ring-0 transition-colors"
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-slate-100 border-0 text-sm rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:ring-0"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <button
            type="button"
            onClick={loadServices}
            disabled={loading}
            className="p-2 text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 border-0 rounded-lg transition-colors cursor-pointer"
            title="Refresh list"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main Content: Table / Loading / Empty */}
      {loading ? (
        <LoadingState message="Fetching services from Supabase..." rows={6} />
      ) : services.length === 0 ? (
        <EmptyState
          title={searchInput || statusFilter !== 'all' ? 'No matching services found' : 'No services created yet'}
          description={
            searchInput || statusFilter !== 'all'
              ? 'Try adjusting your search criteria or status filter to find matching services.'
              : 'Add your first enterprise consulting or technology service.'
          }
          actionLabel="Add Service"
          onAction={() => router.push('/asgard/services/create')}
          icon={<Layers className="w-7 h-7 stroke-[1.5]" />}
        />
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-3.5">Service Offering</th>
                  <th className="px-4 py-3.5">Slug</th>
                  <th className="px-4 py-3.5">Features</th>
                  <th className="px-4 py-3.5">Status</th>
                  <th className="px-4 py-3.5">Order</th>
                  <th className="px-4 py-3.5">Created</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {services.map((service) => {
                  const mediaUrl = service.media_id ? getMediaPublicUrl(service.media_id, 'services') : null;
                  const featuresCount = Array.isArray(service.features) ? service.features.length : 0;

                  return (
                    <tr
                      key={service.id}
                      className="hover:bg-slate-50/80 transition-colors group"
                    >
                      {/* Service Offering */}
                      <td className="px-6 py-4">
                        <div className="flex items-start gap-3.5 max-w-md">
                          {mediaUrl ? (
                            <div className="w-12 h-10 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shrink-0 mt-0.5">
                              <img
                                src={mediaUrl}
                                alt={service.title || 'Service'}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  (e.target as HTMLElement).style.display = 'none';
                                }}
                              />
                            </div>
                          ) : (
                            <div className="w-10 h-10 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0 mt-0.5">
                              <Layers className="w-5 h-5" />
                            </div>
                          )}

                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <h4 className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                                {service.title}
                              </h4>
                              {service.badge_text && (
                                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
                                  {service.badge_text}
                                </span>
                              )}
                            </div>
                            {(service.short_description || service.short_descriptior || service.description) && (
                              <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                                {service.short_description || service.short_descriptior || service.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Slug */}
                      <td className="px-4 py-4 whitespace-nowrap text-xs font-mono text-slate-600">
                        /{service.slug || '-'}
                      </td>

                      {/* Features count */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          {featuresCount} {featuresCount === 1 ? 'Feature' : 'Features'}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-4 whitespace-nowrap">
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
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                          <ArrowUpDown className="w-3 h-3 text-slate-400" />
                          {service.sort_order ?? 0}
                        </span>
                      </td>

                      {/* Created Date */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
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
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => setPreviewService(service)}
                            className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <Link
                            href={`/asgard/services/edit?id=${service.id}`}
                            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                            title="Edit Service"
                          >
                            <Edit2 className="w-4 h-4" />
                          </Link>
                          <button
                            type="button"
                            onClick={() => setDeletingService(service)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                            title="Delete Service"
                          >
                            <Trash2 className="w-4 h-4" />
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
            pageSizeOptions={[5, 8, 10, 20]}
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

      {/* Reusable Preview Modal */}
      <ServicePreviewModal
        service={previewService}
        onClose={() => setPreviewService(null)}
      />
    </AsgardLayout>
  );
};
