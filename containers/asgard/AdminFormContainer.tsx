'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Save,
  Loader2,
  Shield,
  User,
  Mail,
  Lock,
  Phone,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  ShieldAlert,
  ShieldCheck,
  Check,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { AsgardLayout } from '@/components/asgard/AsgardLayout';
import { LoadingState } from '@/components/asgard/LoadingState';
import { useAsgardAuth } from '@/context/AsgardAuthContext';
import {
  getAdminById,
  createAdmin,
  updateAdmin,
  AdminRecord,
} from '@/app/(asgard)/asgard/admins/action';

interface AdminFormContainerProps {
  id?: string;
}

const ROLES = [
  {
    name: 'Super Admin',
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
    desc: 'Full unrestricted access across all CMS modules, services, blogs, FAQs, and administrator settings.',
  },
  {
    name: 'Admin',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    desc: 'Manage blogs, services, FAQs, and CMS content with full create, edit, and publish permissions.',
  },
  {
    name: 'Manager',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    desc: 'Can publish and update services and FAQs, review submissions, and manage general settings.',
  },
  {
    name: 'Editor',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    desc: 'Draft and edit blog articles, update FAQs content, and preview published content.',
  },
];

export const AdminFormContainer: React.FC<AdminFormContainerProps> = ({ id }) => {
  const router = useRouter();
  const { user: currentUser } = useAsgardAuth();
  const isEditMode = Boolean(id);

  const [initialLoading, setInitialLoading] = useState(isEditMode);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    full_name: '',
    role: 'Super Admin',
    password: '',
    phone: '',
    is_active: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Check if currently editing logged-in user
  const isSelf = Boolean(
    currentUser &&
      ((id && currentUser.id === id) ||
        (formData.email &&
          currentUser.email?.toLowerCase().trim() === formData.email.toLowerCase().trim()))
  );

  // Fetch admin if in edit mode
  useEffect(() => {
    async function loadAdmin() {
      if (!id) {
        setInitialLoading(false);
        return;
      }

      try {
        setInitialLoading(true);
        const admin = await getAdminById(id);

        if (!admin) {
          toast.error('Administrator not found');
          router.push('/asgard/admins');
          return;
        }

        setFormData({
          email: admin.email || '',
          full_name: admin.full_name || '',
          role: admin.role || 'Super Admin',
          password: '',
          phone: admin.phone || '',
          is_active: admin.is_active !== false,
        });
      } catch (err) {
        console.error('Error loading admin:', err);
        toast.error('Failed to load administrator details');
        router.push('/asgard/admins');
      } finally {
        setInitialLoading(false);
      }
    }

    loadAdmin();
  }, [id, router]);

  const validate = () => {
    const errs: Record<string, string> = {};

    if (!formData.full_name.trim()) {
      errs.full_name = 'Full name is required';
    }

    if (!isEditMode) {
      if (!formData.email.trim()) {
        errs.email = 'Email address is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
        errs.email = 'Please enter a valid email address';
      }

      if (!formData.password) {
        errs.password = 'Password is required for new accounts';
      } else if (formData.password.length < 6) {
        errs.password = 'Password must be at least 6 characters';
      }
    } else if (formData.password && formData.password.length < 6) {
      errs.password = 'Password must be at least 6 characters';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setIsSubmitting(true);

      const payload: any = {
        email: formData.email.trim().toLowerCase(),
        full_name: formData.full_name.trim(),
        role: formData.role,
        phone: formData.phone.trim(),
        is_active: formData.is_active,
      };

      if (formData.password) {
        payload.password = formData.password;
      }

      if (isEditMode && id) {
        const res = await updateAdmin(id, payload);
        if (!res.success) {
          toast.error(res.error || 'Failed to update administrator');
          return;
        }
        toast.success('Administrator updated successfully');
      } else {
        const res = await createAdmin(payload);
        if (!res.success) {
          toast.error(res.error || 'Failed to create administrator');
          return;
        }
        toast.success('Administrator created successfully');
      }

      router.push('/asgard/admins');
    } catch (err: any) {
      toast.error(err.message || 'Operation failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (initialLoading) {
    return (
      <AsgardLayout>
        <LoadingState message="Loading administrator profile..." />
      </AsgardLayout>
    );
  }

  return (
    <AsgardLayout>
      {/* Top Header with Back Button */}
      <div className="mb-6">
        <Link
          href="/asgard/admins"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors mb-3"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Administrators</span>
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-indigo-600" />
              <span>{isEditMode ? 'Edit Administrator' : 'New Administrator'}</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {isEditMode
                ? `Updating profile and permissions for ${formData.email}`
                : 'Register a new administrator and configure their CMS access permissions.'}
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/asgard/admins"
              className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </Link>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all shadow-xs disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" />
                  <span>{isEditMode ? 'Update Administrator' : 'Save Administrator'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-12">
        {/* Left Column: Profile & Credentials (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Card 1: Basic Information */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
              <User className="w-4 h-4 text-indigo-600" />
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Personal Information
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                  <input
                    type="text"
                    placeholder="e.g. Vikas Yadav"
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors"
                  />
                </div>
                {errors.full_name && (
                  <p className="text-xs text-rose-500 mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.full_name}</span>
                  </p>
                )}
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                  <input
                    type="email"
                    placeholder="e.g. vikas.yadav@ascendtis.com"
                    disabled={isEditMode}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors ${
                      isEditMode ? 'opacity-70 cursor-not-allowed bg-slate-100' : ''
                    }`}
                  />
                </div>
                {isEditMode && (
                  <p className="text-[11px] text-slate-400 mt-1">
                    Email address is linked to auth login credentials.
                  </p>
                )}
                {errors.email && (
                  <p className="text-xs text-rose-500 mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Phone Number (Optional)
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                  <input
                    type="tel"
                    placeholder="e.g. +91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Authentication & Password */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
              <Lock className="w-4 h-4 text-indigo-600" />
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Security & Authentication
              </h2>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                {isEditMode
                  ? 'Update Password (leave empty to keep current)'
                  : 'Account Password'}{' '}
                {!isEditMode && <span className="text-rose-500">*</span>}
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder={isEditMode ? '••••••••••••' : 'Min 6 characters'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-2.5 text-slate-400 hover:text-slate-700 p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-[11px] text-slate-400 mt-1.5">
                Passwords must contain at least 6 characters. Used to log into the Asgard CMS.
              </p>
              {errors.password && (
                <p className="text-xs text-rose-500 mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.password}</span>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Role & Status Settings (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Card 3: Access Role Selector */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
              <Shield className="w-4 h-4 text-indigo-600" />
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Access Permissions
              </h2>
            </div>

            <div className="space-y-3">
              {ROLES.map((r) => {
                const isSelected = formData.role === r.name;
                return (
                  <div
                    key={r.name}
                    onClick={() => setFormData({ ...formData, role: r.name })}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-50/60 border-indigo-300 ring-2 ring-indigo-500/20 shadow-xs'
                        : 'bg-slate-50/60 border-slate-200 hover:bg-slate-100/60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className={`text-xs font-bold px-2 py-0.5 rounded-md border ${r.badgeColor}`}
                      >
                        {r.name}
                      </span>
                      {isSelected && <Check className="w-4 h-4 text-indigo-600" />}
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed">{r.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Card 4: Account Status */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Account Status</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {formData.is_active ? 'Active & Authorized' : 'Inactive / Disabled'}
                </p>
              </div>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.is_active}
                  disabled={isSelf}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
              </label>
            </div>

            {isSelf && (
              <div className="mt-3.5 p-3 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-800 leading-relaxed">
                <strong>Security Protection:</strong> You are currently logged in as this
                administrator. You cannot deactivate your own account.
              </div>
            )}
          </div>
        </div>
      </form>
    </AsgardLayout>
  );
};
