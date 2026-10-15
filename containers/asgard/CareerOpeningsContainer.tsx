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
  Briefcase,
  Eye,
  Plus,
  MapPin,
  Clock,
  Building,
  CheckCircle2,
  XCircle,
  GraduationCap,
  Calendar,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { AsgardLayout } from '@/components/asgard/AsgardLayout';
import { AsgardPageHeader } from '@/components/asgard/AsgardPageHeader';
import { LoadingState } from '@/components/asgard/LoadingState';
import { EmptyState } from '@/components/asgard/EmptyState';
import { DeleteModal } from '@/components/asgard/DeleteModal';
import { DataTablePagination } from '@/components/asgard/DataTablePagination';
import { StatusBadge } from '@/components/asgard/StatusBadge';
import { CareerOpeningDetailModal } from '@/components/asgard/CareerOpeningDetailModal';
import { AsgardFilterSelect } from '@/components/asgard/AsgardFilterSelect';
import {
  getJobOpenings,
  deleteJobOpening,
  toggleJobOpeningActiveStatus,
  JobOpeningRecord,
} from '@/app/(asgard)/asgard/career-openings/action';

const EXPERIENCE_LEVELS = [
  'Entry-Level',
  'Junior-Level',
  'Mid-Level',
  'Senior-Level',
  'Lead-Level',
];

const EMPLOYMENT_TYPES = [
  'Full-time',
  'Part-time',
  'Contract',
  'Internship',
  'Freelance',
];

export const CareerOpeningsContainer: React.FC = () => {
  const router = useRouter();
  const [jobs, setJobs] = useState<JobOpeningRecord[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  // Search & Filter state
  const [searchInput, setSearchInput] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [levelFilter, setLevelFilter] = useState<string>('all');
  const [employmentFilter, setEmploymentFilter] = useState<string>('all');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Detail Modal state
  const [selectedJobForDetail, setSelectedJobForDetail] = useState<JobOpeningRecord | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Delete Modal state
  const [deletingJob, setDeletingJob] = useState<JobOpeningRecord | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Status toggle in progress
  const [togglingId, setTogglingId] = useState<string | null>(null);

  // Debounce search input (400ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchInput);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchInput]);

  // Reset page to 1 when debounced search or filters change
  const isFirstMount = useRef(true);
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    setCurrentPage(1);
  }, [debouncedSearch, statusFilter, levelFilter, employmentFilter]);

  // Fetch Job Openings
  const loadJobOpenings = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getJobOpenings({
        page: currentPage,
        pageSize: itemsPerPage,
        search: debouncedSearch,
        status: statusFilter,
        experienceLevel: levelFilter,
        employmentType: employmentFilter,
      });

      setJobs(res.data || []);
      setTotalCount(res.total);
      setTotalPages(res.totalPages);

      if (res.data.length === 0 && currentPage > 1 && res.total > 0) {
        setCurrentPage((prev) => Math.max(1, prev - 1));
      }
    } catch (err: any) {
      console.error('Error querying job openings from Supabase:', err);
      toast.error('Failed to query job openings from Supabase');
    } finally {
      setLoading(false);
    }
  }, [currentPage, itemsPerPage, debouncedSearch, statusFilter, levelFilter, employmentFilter]);

  useEffect(() => {
    loadJobOpenings();
  }, [loadJobOpenings]);

  // Toggle active status
  const handleToggleActive = async (job: JobOpeningRecord) => {
    if (!job.id || togglingId) return;
    try {
      setTogglingId(job.id);
      const res = await toggleJobOpeningActiveStatus(job.id, job.is_active ?? true);
      if (res.success) {
        toast.success(
          job.is_active
            ? `"${job.title}" is now Inactive (Hidden from website)`
            : `"${job.title}" is now Active (Visible on website)!`
        );
        await loadJobOpenings();
      } else {
        toast.error(res.error || 'Failed to update status');
      }
    } catch (err: any) {
      console.error('Error toggling job status:', err);
      toast.error('Failed to update status');
    } finally {
      setTogglingId(null);
    }
  };

  // Delete job opening
  const handleConfirmDelete = async () => {
    if (!deletingJob?.id) return;

    try {
      setIsDeleting(true);
      const res = await deleteJobOpening(deletingJob.id);

      if (!res.success) {
        toast.error(res.error || 'Failed to delete job opening');
        return;
      }

      toast.success(`Job opening "${deletingJob.title}" deleted successfully.`);
      setDeletingJob(null);
      await loadJobOpenings();
    } catch (err: any) {
      console.error('Error deleting job opening:', err);
      toast.error(err.message || 'Failed to delete job opening');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleOpenDetailModal = (job: JobOpeningRecord) => {
    setSelectedJobForDetail(job);
    setIsDetailModalOpen(true);
  };

  const handleEditJob = (id: string) => {
    setIsDetailModalOpen(false);
    router.push(`/asgard/career-openings/edit?id=${id}`);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '—';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  return (
    <AsgardLayout>
      <AsgardPageHeader
        title="Career Openings"
        description="Manage job listings, specifications, requirements, and live publishing on the website."
        breadcrumb={[
          { label: 'CMS', href: '/asgard/overview' },
          { label: 'Career Openings' },
        ]}
        actionLabel="Add Job Opening"
        onAction={() => router.push('/asgard/career-openings/create')}
        actionIcon={<Plus className="w-4 h-4" />}
      />

      {/* Control Bar: Search & Multi-Filters */}
      <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200 shadow-xs mb-5 flex flex-col lg:flex-row lg:items-center justify-between gap-3.5">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search by job title or slug..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full pl-9.5 pr-8 py-2 text-xs sm:text-sm bg-slate-100 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-colors placeholder:text-slate-400"
          />
          {searchInput && (
            <button
              type="button"
              onClick={() => setSearchInput('')}
              className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 p-0.5 rounded cursor-pointer"
              title="Clear search"
            >
              <XCircle className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center flex-wrap gap-2.5">
          {/* Status Filter */}
          <AsgardFilterSelect
            icon={<Filter className="w-3.5 h-3.5 text-slate-400" />}
            labelPrefix="Status"
            value={statusFilter}
            onChange={(val) => {
              setStatusFilter(val);
              setCurrentPage(1);
            }}
            options={[
              { value: 'all', label: 'All Statuses' },
              { value: 'active', label: 'Active Only' },
              { value: 'inactive', label: 'Inactive Only' },
            ]}
          />

          {/* Experience Level Filter */}
          <AsgardFilterSelect
            icon={<GraduationCap className="w-3.5 h-3.5 text-slate-400" />}
            labelPrefix="Level"
            value={levelFilter}
            onChange={(val) => {
              setLevelFilter(val);
              setCurrentPage(1);
            }}
            options={[
              { value: 'all', label: 'All Levels' },
              ...EXPERIENCE_LEVELS.map((lvl) => ({ value: lvl, label: lvl })),
            ]}
          />

          {/* Employment Type Filter */}
          <AsgardFilterSelect
            icon={<Clock className="w-3.5 h-3.5 text-slate-400" />}
            labelPrefix="Type"
            value={employmentFilter}
            onChange={(val) => {
              setEmploymentFilter(val);
              setCurrentPage(1);
            }}
            options={[
              { value: 'all', label: 'All Types' },
              ...EMPLOYMENT_TYPES.map((type) => ({ value: type, label: type })),
            ]}
          />

          {/* Refresh Button */}
          <button
            type="button"
            onClick={loadJobOpenings}
            disabled={loading}
            className="p-2 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
            title="Refresh Job Openings"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main Content: Table / Loading / Empty */}
      {loading ? (
        <LoadingState message="Fetching career openings from Supabase..." rows={6} />
      ) : jobs.length === 0 ? (
        <EmptyState
          title={
            searchInput || statusFilter !== 'all' || levelFilter !== 'all' || employmentFilter !== 'all'
              ? 'No matching career openings found'
              : 'No career openings added yet'
          }
          description={
            searchInput || statusFilter !== 'all' || levelFilter !== 'all' || employmentFilter !== 'all'
              ? 'Try adjusting your search terms or filter selections to view available jobs.'
              : 'Get started by creating your very first job opening to publish on the careers page.'
          }
          actionLabel="Add Job Opening"
          onAction={() => router.push('/asgard/career-openings/create')}
          icon={<Briefcase className="w-6 h-6 stroke-[1.5]" />}
        />
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3">Job Title</th>
                  <th className="px-3.5 py-3">Experience Level</th>
                  <th className="px-3.5 py-3">Locations</th>
                  <th className="px-3.5 py-3">Employment Type</th>
                  <th className="px-3.5 py-3">Workplace Type</th>
                  <th className="px-3.5 py-3">Experience Required</th>
                  <th className="px-3.5 py-3 text-center">Status</th>
                  <th className="px-3.5 py-3 text-center">Display Order</th>
                  <th className="px-3.5 py-3">Created Date</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {jobs.map((job) => {
                  return (
                    <tr
                      key={job.id}
                      className="hover:bg-slate-50/80 transition-colors group align-middle"
                    >
                      {/* Job Title & Slug */}
                      <td className="px-4 py-3">
                        <div className="min-w-[180px]">
                          <div className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                            {job.title}
                          </div>
                          <div className="text-[11px] text-slate-400 font-mono truncate max-w-xs mt-0.5">
                            /{job.slug}
                          </div>
                        </div>
                      </td>

                      {/* Experience Level */}
                      <td className="px-3.5 py-3 whitespace-nowrap">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200/60">
                          {job.experience_level || '—'}
                        </span>
                      </td>

                      {/* Locations */}
                      <td className="px-3.5 py-3">
                        <div className="flex flex-wrap gap-1 max-w-[160px]">
                          {job.locations && job.locations.length > 0 ? (
                            job.locations.map((loc, i) => (
                              <span
                                key={i}
                                className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-medium bg-indigo-50 text-indigo-700 border border-indigo-100 whitespace-nowrap"
                              >
                                <MapPin className="w-2.5 h-2.5 text-indigo-500" />
                                {loc}
                              </span>
                            ))
                          ) : (
                            <span className="text-slate-400 italic">None</span>
                          )}
                        </div>
                      </td>

                      {/* Employment Type */}
                      <td className="px-3.5 py-3 whitespace-nowrap text-slate-700 font-medium">
                        {job.employment_type || 'Full-time'}
                      </td>

                      {/* Workplace Type */}
                      <td className="px-3.5 py-3 whitespace-nowrap text-slate-700 font-medium">
                        {job.work_place_type || 'Hybrid'}
                      </td>

                      {/* Experience Required */}
                      <td className="px-3.5 py-3 whitespace-nowrap text-slate-600">
                        {job.experience_required || 'Commensurate'}
                      </td>

                      {/* Status with Quick Toggle */}
                      <td className="px-3.5 py-3 text-center whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => handleToggleActive(job)}
                          disabled={togglingId === job.id}
                          className="group/toggle inline-flex items-center gap-1.5 transition-transform hover:scale-105 cursor-pointer disabled:opacity-50"
                          title="Click to toggle status"
                        >
                          <StatusBadge status={job.is_active ? 'active' : 'inactive'} />
                        </button>
                      </td>

                      {/* Display Order */}
                      <td className="px-3.5 py-3 text-center font-mono font-semibold text-slate-700">
                        {job.display_order ?? 0}
                      </td>

                      {/* Created Date */}
                      <td className="px-3.5 py-3 whitespace-nowrap text-slate-500 text-[11px]">
                        {formatDate(job.created_at)}
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* View Details */}
                          <button
                            type="button"
                            onClick={() => handleOpenDetailModal(job)}
                            className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
                            title="View Full Details"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>

                          {/* Edit */}
                          <Link
                            href={`/asgard/career-openings/edit?id=${job.id}`}
                            className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                            title="Edit Job Opening"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </Link>

                          {/* Delete */}
                          <button
                            type="button"
                            onClick={() => setDeletingJob(job)}
                            className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                            title="Delete Job Opening"
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
            itemName="openings"
            onPageChange={setCurrentPage}
            onItemsPerPageChange={(newSize: number) => {
              setItemsPerPage(newSize);
              setCurrentPage(1);
            }}
          />
        </div>
      )}

      {/* View Detail Modal */}
      <CareerOpeningDetailModal
        job={selectedJobForDetail}
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedJobForDetail(null);
        }}
        onEdit={handleEditJob}
      />

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={Boolean(deletingJob)}
        title="Delete Career Opening"
        itemName={deletingJob?.title}
        itemType="career opening"
        isDeleting={isDeleting}
        onClose={() => setDeletingJob(null)}
        onConfirm={handleConfirmDelete}
      />
    </AsgardLayout>
  );
};
