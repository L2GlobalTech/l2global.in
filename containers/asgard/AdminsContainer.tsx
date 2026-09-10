'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  Filter,
  RefreshCw,
  Shield,
  ShieldCheck,
  ShieldAlert,
  User,
  Mail,
  Phone,
  Calendar,
  CheckCircle2,
  XCircle,
  Lock,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { AsgardLayout } from '@/components/asgard/AsgardLayout';
import { AsgardPageHeader } from '@/components/asgard/AsgardPageHeader';
import { LoadingState } from '@/components/asgard/LoadingState';
import { EmptyState } from '@/components/asgard/EmptyState';
import { DeleteModal } from '@/components/asgard/DeleteModal';
import { DataTablePagination } from '@/components/asgard/DataTablePagination';
import { useAsgardAuth } from '@/context/AsgardAuthContext';
import {
  getAdmins,
  deleteAdmin,
  toggleAdminActiveStatus,
  AdminRecord,
} from '@/app/(asgard)/asgard/admins/action';

export const AdminsContainer: React.FC = () => {
  const router = useRouter();
  const { user: currentUser } = useAsgardAuth();

  const [admins, setAdmins] = useState<AdminRecord[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  // Search & Filter state
  const [searchInput, setSearchInput] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Delete modal state
  const [deletingAdmin, setDeletingAdmin] = useState<AdminRecord | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Debounce search input (400ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchInput);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchInput]);

  // Reset page when debounced search changes
  const isFirstMount = useRef(true);
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    setCurrentPage(1);
  }, [debouncedSearch]);

  // Fetch Admins
  const loadAdmins = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getAdmins({
        page: currentPage,
        pageSize: itemsPerPage,
        search: debouncedSearch,
        role: roleFilter,
        status: statusFilter,
      });

      setAdmins(res.data || []);
      setTotalCount(res.total);
      setTotalPages(res.totalPages);

      if (res.data.length === 0 && currentPage > 1 && res.total > 0) {
        setCurrentPage((prev) => Math.max(1, prev - 1));
      }
    } catch (err) {
      console.error('Error querying administrators:', err);
      toast.error('Failed to load administrators');
    } finally {
      setLoading(false);
    }
  }, [currentPage, itemsPerPage, debouncedSearch, roleFilter, statusFilter]);

  useEffect(() => {
    loadAdmins();
  }, [loadAdmins]);

  // Check if target matches currently logged-in user
  const isCurrentLoggedInUser = (admin: AdminRecord) => {
    if (!currentUser) return false;
    const isMatchingId = currentUser.id && admin.id === currentUser.id;
    const isMatchingEmail =
      currentUser.email &&
      admin.email &&
      currentUser.email.toLowerCase().trim() === admin.email.toLowerCase().trim();
    return Boolean(isMatchingId || isMatchingEmail);
  };

  // Toggle active status with safeguard
  const handleToggleStatus = async (admin: AdminRecord) => {
    if (isCurrentLoggedInUser(admin) && admin.is_active) {
      toast.error('Security Protection: You cannot deactivate your own logged-in account.');
      return;
    }

    try {
      const res = await toggleAdminActiveStatus(
        admin.id,
        admin.email,
        admin.is_active,
        currentUser?.id,
        currentUser?.email
      );

      if (!res.success) {
        toast.error(res.error || 'Failed to update status');
        return;
      }

      toast.success(
        `Administrator ${!admin.is_active ? 'activated' : 'deactivated'} successfully.`
      );
      await loadAdmins();
    } catch (err: any) {
      toast.error(err.message || 'Failed to toggle status');
    }
  };

  // Delete Admin with safeguard
  const handleDeleteConfirm = async () => {
    if (!deletingAdmin) return;

    if (isCurrentLoggedInUser(deletingAdmin)) {
      toast.error('Security Protection: You cannot delete your own logged-in admin account.');
      setDeletingAdmin(null);
      return;
    }

    try {
      setIsDeleting(true);
      const res = await deleteAdmin(
        deletingAdmin.id,
        deletingAdmin.email,
        currentUser?.id,
        currentUser?.email
      );

      if (!res.success) {
        toast.error(res.error || 'Failed to delete administrator');
        return;
      }

      toast.success('Administrator deleted successfully.');
      setDeletingAdmin(null);
      await loadAdmins();
    } catch (err: any) {
      console.error('Error deleting admin:', err);
      toast.error(err.message || 'Failed to delete administrator');
    } finally {
      setIsDeleting(false);
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'Super Admin':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">
            <ShieldAlert className="w-3.5 h-3.5 text-purple-600" />
            Super Admin
          </span>
        );
      case 'Admin':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
            Admin
          </span>
        );
      case 'Manager':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <Shield className="w-3.5 h-3.5 text-emerald-600" />
            Manager
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            <User className="w-3.5 h-3.5 text-blue-600" />
            {role || 'Editor'}
          </span>
        );
    }
  };

  return (
    <AsgardLayout>
      <AsgardPageHeader
        title="Administrators Management"
        description="Create, edit, organize, and manage authorized CMS administrators and access roles."
        breadcrumb={[
          { label: 'CMS', href: '/asgard/overview' },
          { label: 'Admins' },
        ]}
        actionLabel="New Administrator"
        onAction={() => router.push('/asgard/admins/create')}
      />

      {/* Control Bar: Search, Role Filter, Status Filter & Refresh */}
      <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200 shadow-xs mb-5 flex flex-col md:flex-row md:items-center justify-between gap-3.5">
        <div className="relative flex-1 max-w-lg">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, email, or role..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full pl-9.5 pr-3.5 py-2 text-xs sm:text-sm bg-slate-100 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-colors placeholder:text-slate-400"
          />
        </div>

        <div className="flex items-center flex-wrap gap-2.5">
          {/* Role Filter */}
          <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-xl text-slate-700">
            <Shield className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <select
              value={roleFilter}
              onChange={(e) => {
                setRoleFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-transparent border-0 text-xs sm:text-sm font-medium text-slate-700 focus:outline-none cursor-pointer pr-1"
            >
              <option value="all">All Roles</option>
              <option value="Super Admin">Super Admin</option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="Editor">Editor</option>
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
            onClick={loadAdmins}
            disabled={loading}
            className="p-2 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
            title="Refresh Administrators"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main Table / Empty / Loading State */}
      {loading ? (
        <LoadingState message="Loading administrators..." />
      ) : admins.length === 0 ? (
        <EmptyState
          title="No Administrators Found"
          description={
            debouncedSearch || roleFilter !== 'all' || statusFilter !== 'all'
              ? 'No administrators match your search criteria. Try resetting filters.'
              : 'No administrators registered yet. Click below to add your first administrator.'
          }
          actionLabel="New Administrator"
          onAction={() => router.push('/asgard/admins/create')}
        />
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80 text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  <th className="py-3 px-4">Administrator</th>
                  <th className="py-3 px-4">Access Role</th>
                  <th className="py-3 px-4">Contact</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Created Date</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                {admins.map((admin) => {
                  const isSelf = isCurrentLoggedInUser(admin);

                  return (
                    <tr
                      key={admin.id || admin.email}
                      className={`hover:bg-slate-50/80 transition-colors ${
                        isSelf ? 'bg-indigo-50/30' : ''
                      }`}
                    >
                      {/* Name & Email */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-700 font-bold shrink-0">
                            {admin.full_name?.charAt(0).toUpperCase() ||
                              admin.email?.charAt(0).toUpperCase() ||
                              'A'}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-slate-900 truncate">
                                {admin.full_name || 'Admin User'}
                              </span>
                              {isSelf && (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-700 border border-indigo-200">
                                  You (Active)
                                </span>
                              )}
                            </div>
                            <span className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                              <Mail className="w-3 h-3 text-slate-400" />
                              {admin.email}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Role */}
                      <td className="py-3.5 px-4">{getRoleBadge(admin.role)}</td>

                      {/* Contact */}
                      <td className="py-3.5 px-4">
                        {admin.phone ? (
                          <span className="text-slate-600 flex items-center gap-1 text-xs">
                            <Phone className="w-3 h-3 text-slate-400" />
                            {admin.phone}
                          </span>
                        ) : (
                          <span className="text-slate-400 text-xs">—</span>
                        )}
                      </td>

                      {/* Status Toggle */}
                      <td className="py-3.5 px-4">
                        <button
                          type="button"
                          disabled={isSelf}
                          onClick={() => handleToggleStatus(admin)}
                          title={
                            isSelf
                              ? 'You cannot deactivate your own logged-in account'
                              : admin.is_active
                              ? 'Click to deactivate'
                              : 'Click to activate'
                          }
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-all ${
                            isSelf
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-not-allowed opacity-90'
                              : admin.is_active
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 cursor-pointer'
                              : 'bg-slate-100 text-slate-500 border border-slate-200 hover:bg-slate-200 cursor-pointer'
                          }`}
                        >
                          {admin.is_active ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              <span>Active</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3.5 h-3.5 text-slate-400" />
                              <span>Inactive</span>
                            </>
                          )}
                        </button>
                      </td>

                      {/* Created */}
                      <td className="py-3.5 px-4">
                        <span className="text-slate-500 text-xs flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          {admin.created_at
                            ? new Date(admin.created_at).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              })
                            : 'Registered'}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Edit Button (links to /asgard/admins/edit?id=...) */}
                          <button
                            type="button"
                            onClick={() => router.push(`/asgard/admins/edit?id=${admin.id}`)}
                            className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
                            title="Edit Administrator"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>

                          {/* Delete Button (Disabled for logged-in user) */}
                          {isSelf ? (
                            <div
                              className="p-1.5 text-slate-300 rounded-lg cursor-not-allowed"
                              title="Current Logged-in Admin (Protected from deletion)"
                            >
                              <Lock className="w-4 h-4 text-slate-300" />
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setDeletingAdmin(admin)}
                              className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                              title="Delete Administrator"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
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
            onPageChange={(p) => setCurrentPage(p)}
            onItemsPerPageChange={(size) => {
              setItemsPerPage(size);
              setCurrentPage(1);
            }}
          />
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={Boolean(deletingAdmin)}
        onClose={() => setDeletingAdmin(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Administrator"
        itemName={deletingAdmin?.full_name || deletingAdmin?.email}
        itemType="administrator"
        isDeleting={isDeleting}
      />
    </AsgardLayout>
  );
};
