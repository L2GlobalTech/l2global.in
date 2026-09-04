'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogOut, User as UserIcon, ChevronRight } from 'lucide-react';
import { useAsgardAuth } from '@/context/AsgardAuthContext';
import { LogoutModal } from '@/components/asgard/LogoutModal';

export const AsgardHeader: React.FC = () => {
  const { user, signOut } = useAsgardAuth();
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const pathname = usePathname();

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

  const getBreadcrumb = () => {
    if (pathname.includes('/asgard/blogs')) return 'Blogs';
    if (pathname.includes('/asgard/services')) return 'Services';
    if (pathname.includes('/asgard/overview')) return 'Overview';
    return 'CMS';
  };

  return (
    <>
      <header className="hidden lg:flex h-14 items-center justify-between px-6 border-b border-slate-200 bg-white/80 backdrop-blur-xs sticky top-0 z-20">
        <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 font-medium">
          <Link href="/asgard/overview" className="hover:text-slate-900 transition-colors font-semibold">
            CMS Dashboard
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-bold">{getBreadcrumb()}</span>
        </div>

        <div className="flex items-center gap-3">
          {user && (
            <div className="flex items-center gap-2 text-xs sm:text-sm">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-800 border border-slate-200 font-medium text-xs">
                <UserIcon className="w-3.5 h-3.5 text-slate-500" />
                {user.email || 'Admin'}
              </span>
              <button
                type="button"
                onClick={() => setLogoutModalOpen(false || true)}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-700 hover:text-rose-600 hover:bg-rose-50 rounded-lg border border-slate-200 transition-colors cursor-pointer"
                title="Sign Out"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
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
