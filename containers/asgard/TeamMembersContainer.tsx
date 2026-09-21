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
  Users,
  Linkedin,
  Twitter,
  ArrowUpDown,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Award,
  Palette,
  User,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { AsgardLayout } from '@/components/asgard/AsgardLayout';
import { AsgardPageHeader } from '@/components/asgard/AsgardPageHeader';
import { LoadingState } from '@/components/asgard/LoadingState';
import { EmptyState } from '@/components/asgard/EmptyState';
import { DeleteModal } from '@/components/asgard/DeleteModal';
import { DataTablePagination } from '@/components/asgard/DataTablePagination';
import {
  getTeamMembers,
  deleteTeamMember,
  toggleTeamMemberActiveStatus,
  TeamMemberRecord,
} from '@/app/(asgard)/asgard/team/action';

export const TeamMembersContainer: React.FC = () => {
  const router = useRouter();
  const [members, setMembers] = useState<TeamMemberRecord[]>([]);
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
  const [deletingMember, setDeletingMember] = useState<TeamMemberRecord | null>(null);
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

  // Fetch Team Members
  const loadTeamMembers = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getTeamMembers({
        page: currentPage,
        pageSize: itemsPerPage,
        search: debouncedSearch,
        status: statusFilter,
      });

      setMembers(res.data || []);
      setTotalCount(res.total);
      setTotalPages(res.totalPages);

      if (res.data.length === 0 && currentPage > 1 && res.total > 0) {
        setCurrentPage((prev) => Math.max(1, prev - 1));
      }
    } catch (err: any) {
      console.error('Error querying team members from Supabase:', err);
      toast.error('Failed to query team members from Supabase');
    } finally {
      setLoading(false);
    }
  }, [currentPage, itemsPerPage, debouncedSearch, statusFilter]);

  useEffect(() => {
    loadTeamMembers();
  }, [loadTeamMembers]);

  // Toggle active status
  const handleToggleActive = async (member: TeamMemberRecord) => {
    if (!member.id) return;
    try {
      const res = await toggleTeamMemberActiveStatus(member.id, member.is_active ?? true);
      if (res.success) {
        toast.success(
          member.is_active
            ? 'Team member set to Inactive (Hidden)'
            : 'Team member set to Active (Visible)!'
        );
        await loadTeamMembers();
      } else {
        toast.error(res.error || 'Failed to update status');
      }
    } catch (err: any) {
      console.error('Error toggling team member status:', err);
      toast.error('Failed to update status');
    }
  };

  // Delete team member
  const handleConfirmDelete = async () => {
    if (!deletingMember?.id) return;

    try {
      setIsDeleting(true);
      const res = await deleteTeamMember(deletingMember.id);

      if (!res.success) {
        toast.error(res.error || 'Failed to delete team member');
        return;
      }

      toast.success('Team member deleted successfully.');
      setDeletingMember(null);
      await loadTeamMembers();
    } catch (err: any) {
      console.error('Error deleting team member:', err);
      toast.error(err.message || 'Failed to delete team member');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AsgardLayout>
      <AsgardPageHeader
        title="Team Members"
        description="Manage leadership and team profiles, certifications, social media links, and card styling."
        breadcrumb={[
          { label: 'CMS', href: '/asgard/overview' },
          { label: 'Team' },
        ]}
        actionLabel="New Team Member"
        onAction={() => router.push('/asgard/team/create')}
      />

      {/* Control Bar: Search, Status Filter & Refresh */}
      <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200 shadow-xs mb-5 flex flex-col md:flex-row md:items-center justify-between gap-3.5">
        <div className="relative flex-1 max-w-lg">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, certification..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full pl-9.5 pr-3.5 py-2 text-xs sm:text-sm bg-slate-100 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-colors placeholder:text-slate-400"
          />
        </div>

        <div className="flex items-center flex-wrap gap-2.5">
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
            onClick={loadTeamMembers}
            disabled={loading}
            className="p-2 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
            title="Refresh Team Members"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main Content: Table / Loading / Empty */}
      {loading ? (
        <LoadingState message="Fetching team members from Supabase..." rows={6} />
      ) : members.length === 0 ? (
        <EmptyState
          title={
            searchInput || statusFilter !== 'all'
              ? 'No matching team members found'
              : 'No team members added yet'
          }
          description={
            searchInput || statusFilter !== 'all'
              ? 'Try adjusting your search query or status filter to find matching team members.'
              : 'Get started by adding your very first team member profile.'
          }
          actionLabel="Add Team Member"
          onAction={() => router.push('/asgard/team/create')}
          icon={<Users className="w-6 h-6 stroke-[1.5]" />}
        />
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3">Member Details</th>
                  <th className="px-3.5 py-3">Certification</th>
                  <th className="px-3.5 py-3">Social Profiles</th>
                  <th className="px-3.5 py-3 text-center">Card Color</th>
                  <th className="px-3.5 py-3 text-center">Order</th>
                  <th className="px-3.5 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {members.map((member) => {
                  const cardColor = member.card_color || '#AABBD1';

                  return (
                    <tr
                      key={member.id}
                      className="hover:bg-slate-50/80 transition-colors group align-middle"
                    >
                      {/* Name & Avatar */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          {member.image_url ? (
                            <img
                              src={member.image_url}
                              alt={member.name || 'Team member'}
                              className="w-10 h-10 rounded-xl object-cover border border-slate-200 shadow-2xs shrink-0"
                              onError={(e) => {
                                (e.currentTarget as HTMLElement).style.display = 'none';
                              }}
                            />
                          ) : (
                            <div
                              style={{ backgroundColor: `${cardColor}30`, borderColor: `${cardColor}80` }}
                              className="w-10 h-10 rounded-xl flex items-center justify-center border font-bold text-sm text-slate-700 shrink-0 shadow-2xs"
                            >
                              {member.name ? member.name.charAt(0).toUpperCase() : <User className="w-4 h-4 text-slate-400" />}
                            </div>
                          )}

                          <div className="min-w-0">
                            <h4 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors text-xs sm:text-sm truncate">
                              {member.name || 'Unnamed Member'}
                            </h4>
                            <span className="text-[11px] text-slate-400 font-mono block truncate">
                              {member.id}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Certification */}
                      <td className="px-3.5 py-3">
                        {member.certification ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100 max-w-xs truncate">
                            <Award className="w-3 h-3 text-indigo-500 shrink-0" />
                            <span className="truncate">{member.certification}</span>
                          </span>
                        ) : (
                          <span className="text-[11px] text-slate-400 italic">None specified</span>
                        )}
                      </td>

                      {/* Social Profiles */}
                      <td className="px-3.5 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          {member.linkedin_url ? (
                            <a
                              href={member.linkedin_url}
                              target="_blank"
                              rel="noreferrer"
                              className="p-1.5 bg-sky-50 text-sky-600 hover:bg-sky-100 hover:text-sky-700 rounded-lg border border-sky-200 transition-colors"
                              title="LinkedIn Profile"
                            >
                              <Linkedin className="w-3.5 h-3.5" />
                            </a>
                          ) : (
                            <span className="p-1.5 text-slate-300 opacity-40">
                              <Linkedin className="w-3.5 h-3.5" />
                            </span>
                          )}

                          {member.twitter_url ? (
                            <a
                              href={member.twitter_url}
                              target="_blank"
                              rel="noreferrer"
                              className="p-1.5 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg border border-slate-200 transition-colors"
                              title="Twitter / X Profile"
                            >
                              <Twitter className="w-3.5 h-3.5" />
                            </a>
                          ) : (
                            <span className="p-1.5 text-slate-300 opacity-40">
                              <Twitter className="w-3.5 h-3.5" />
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Card Color */}
                      <td className="px-3.5 py-3 whitespace-nowrap text-center">
                        <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-lg bg-slate-50 border border-slate-200">
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-slate-300 shadow-2xs shrink-0"
                            style={{ backgroundColor: cardColor }}
                          />
                          <span className="text-[11px] font-mono font-medium text-slate-600">
                            {cardColor}
                          </span>
                        </div>
                      </td>

                      {/* Display Order */}
                      <td className="px-3.5 py-3 whitespace-nowrap text-center">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                          <ArrowUpDown className="w-2.5 h-2.5 text-slate-400" />
                          {member.display_order ?? 0}
                        </span>
                      </td>

                      {/* Status Toggle */}
                      <td className="px-3.5 py-3 whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => handleToggleActive(member)}
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold border transition-all cursor-pointer ${
                            member.is_active
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 shadow-2xs'
                              : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200'
                          }`}
                          title="Click to toggle visibility"
                        >
                          {member.is_active ? (
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
                            href={`/asgard/team/edit?id=${member.id}`}
                            className="p-1 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors cursor-pointer inline-flex items-center justify-center"
                            title="Edit Team Member"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </Link>
                          <button
                            type="button"
                            onClick={() => setDeletingMember(member)}
                            className="p-1 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors cursor-pointer inline-flex items-center justify-center"
                            title="Delete Team Member"
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
            itemName="Team Members"
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
        isOpen={Boolean(deletingMember)}
        title="Delete Team Member"
        itemName={deletingMember?.name || undefined}
        itemType="Team Member"
        isDeleting={isDeleting}
        onClose={() => setDeletingMember(null)}
        onConfirm={handleConfirmDelete}
      />
    </AsgardLayout>
  );
};
