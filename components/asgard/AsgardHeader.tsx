'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LogOut,
  User as UserIcon,
  ChevronRight,
  ChevronDown,
  ShieldCheck,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { useAsgardAuth } from '@/context/AsgardAuthContext';
import { LogoutModal } from '@/components/asgard/LogoutModal';

export const AsgardHeader: React.FC = () => {
  const { user, signOut } = useAsgardAuth();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Close profile dropdown on click outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProfileDropdownOpen(false);
      }
    };
    if (profileDropdownOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [profileDropdownOpen]);

  const handleConfirmLogout = async () => {
    try {
      setIsLoggingOut(true);
      await signOut();
      setLogoutModalOpen(false);
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const getBreadcrumbs = () => {
    const crumbs: { label: string; href?: string }[] = [];

    if (pathname.includes('/asgard/career-openings')) {
      crumbs.push({ label: 'Career Openings', href: '/asgard/career-openings' });
      if (pathname.includes('/create')) crumbs.push({ label: 'Create Job' });
      else if (pathname.includes('/edit')) crumbs.push({ label: 'Edit Job' });
      else if (pathname.includes('/view')) crumbs.push({ label: 'Job Details' });
    } else if (pathname.includes('/asgard/blogs')) {
      crumbs.push({ label: 'Blogs', href: '/asgard/blogs' });
      if (pathname.includes('/create')) crumbs.push({ label: 'New Post' });
      else if (pathname.includes('/edit')) crumbs.push({ label: 'Edit Post' });
    } else if (pathname.includes('/asgard/services')) {
      crumbs.push({ label: 'Services', href: '/asgard/services' });
      if (pathname.includes('/create')) crumbs.push({ label: 'New Service' });
      else if (pathname.includes('/edit')) crumbs.push({ label: 'Edit Service' });
    } else if (pathname.includes('/asgard/team')) {
      crumbs.push({ label: 'Team Members', href: '/asgard/team' });
      if (pathname.includes('/create')) crumbs.push({ label: 'Add Member' });
      else if (pathname.includes('/edit')) crumbs.push({ label: 'Edit Member' });
    } else if (pathname.includes('/asgard/faqs')) {
      crumbs.push({ label: 'FAQs', href: '/asgard/faqs' });
      if (pathname.includes('/create')) crumbs.push({ label: 'Add FAQ' });
      else if (pathname.includes('/edit')) crumbs.push({ label: 'Edit FAQ' });
    } else if (pathname.includes('/asgard/admins')) {
      crumbs.push({ label: 'Admin Management', href: '/asgard/admins' });
      if (pathname.includes('/create')) crumbs.push({ label: 'New Admin' });
      else if (pathname.includes('/edit')) crumbs.push({ label: 'Edit Admin' });
    } else if (pathname.includes('/asgard/overview')) {
      crumbs.push({ label: 'Overview' });
    } else {
      crumbs.push({ label: 'Dashboard' });
    }

    return crumbs;
  };

  const breadcrumbs = getBreadcrumbs();
  const userInitial = user?.email ? user.email.charAt(0).toUpperCase() : 'A';

  return (
    <>
      <header className="hidden lg:flex h-14 items-center justify-between px-6 border-b border-slate-200 bg-white/95 backdrop-blur-xs sticky top-0 z-20">
        {/* Dynamic Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 font-medium">
          <Link
            href="/asgard/overview"
            className="hover:text-indigo-600 transition-colors font-medium flex items-center gap-1.5 text-slate-600"
          >
            <span>CMS</span>
          </Link>

          {breadcrumbs.map((crumb, idx) => {
            const isLast = idx === breadcrumbs.length - 1;
            return (
              <React.Fragment key={crumb.label}>
                <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                {crumb.href && !isLast ? (
                  <Link
                    href={crumb.href}
                    className="hover:text-indigo-600 transition-colors text-slate-600 font-medium"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-slate-900 font-bold">{crumb.label}</span>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Right Header: Profile Menu & External Quick Links */}
        <div className="flex items-center gap-3">
          {user && (
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2.5 p-1.5 pl-2.5 pr-2 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-slate-100/70 transition-all cursor-pointer text-left"
              >
                <div className="w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-2xs">
                  {userInitial}
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-semibold text-slate-900 leading-tight truncate max-w-[150px]">
                    {user.email?.split('@')[0] || 'Administrator'}
                  </span>
                </div>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-slate-400 transition-transform ${
                    profileDropdownOpen ? 'rotate-180 text-indigo-600' : ''
                  }`}
                />
              </button>

              {/* Profile Dropdown Popover */}
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-1.5 w-60 bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-900/10 py-1.5 z-50 animate-in fade-in-0 zoom-in-95 duration-100">
                  <div className="px-4 py-2.5 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-900 truncate">{user.email}</p>
                    <p className="text-[11px] text-emerald-600 font-medium flex items-center gap-1 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Active Session
                    </p>
                  </div>

                  <div className="py-1">
                    <Link
                      href="/asgard/admins"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:text-indigo-600 hover:bg-indigo-50/50 transition-colors"
                    >
                      <ShieldCheck className="w-4 h-4 text-slate-400" />
                      <span>Admin Management</span>
                    </Link>

                    <Link
                      href="/"
                      target="_blank"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:text-indigo-600 hover:bg-indigo-50/50 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4 text-slate-400" />
                      <span>View Live Website</span>
                    </Link>
                  </div>

                  <div className="pt-1 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        setLogoutModalOpen(true);
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Logout Confirmation Modal */}
      <LogoutModal
        isOpen={logoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
        onConfirm={handleConfirmLogout}
        isLoading={isLoggingOut}
      />
    </>
  );
};
