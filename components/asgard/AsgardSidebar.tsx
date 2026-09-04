'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FileText,
  Layers,
  LayoutDashboard,
  LogOut,
  ExternalLink,
  Menu,
  X,
  User as UserIcon,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import Image from 'next/image';
import { useAsgardAuth } from '@/context/AsgardAuthContext';
import { isSupabaseConfigured } from '@/configs/supabase';
import { LogoutModal } from '@/components/asgard/LogoutModal';

export const AsgardSidebar: React.FC = () => {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { user, signOut } = useAsgardAuth();
  const isConfigured = isSupabaseConfigured();

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

  const navigation = [
    {
      name: 'Overview',
      href: '/asgard/overview',
      icon: LayoutDashboard,
      exact: true,
    },
    {
      name: 'Blogs',
      href: '/asgard/blogs',
      icon: FileText,
      exact: false,
    },
    {
      name: 'Services',
      href: '/asgard/services',
      icon: Layers,
      exact: false,
    },
  ];

  const isNavActive = (href: string, exact: boolean) => {
    if (exact) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  const navContent = (
    <div className="flex flex-col h-full bg-slate-900 text-slate-100 font-sans select-none border-r border-slate-800">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800 flex items-center justify-between">
        <Link href="/asgard/overview" className="flex items-center gap-2.5 group">
          <div className="bg-white px-3 py-1.5 rounded-xl shadow-sm group-hover:scale-105 transition-transform flex items-center justify-center">
            <Image
              src="/assets/web/l2-svg.svg"
              alt="L2 Global Technologies"
              width={110}
              height={28}
              className="h-6 w-auto object-contain"
              priority
            />
          </div>
          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            CMS
          </span>
        </Link>
        {mobileOpen && (
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="lg:hidden text-slate-400 hover:text-white p-1 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Main Nav Scrollable Area */}
      <div className="flex-1 overflow-y-auto">
        {/* Navigation Sections */}
        <div className="px-3 py-6 space-y-6">
          <div>
            <div className="px-3 mb-2 text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
              Management Modules
            </div>
            <nav className="space-y-1">
              {navigation.map((item) => {
                const active = isNavActive(item.href, item.exact);
                const Icon = item.icon;

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`group relative flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      active
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                        : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        className={`w-5 h-5 transition-transform group-hover:scale-105 ${
                          active ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'
                        }`}
                      />
                      <span>{item.name}</span>
                    </div>
                    {active && <ChevronRight className="w-4 h-4 text-indigo-200" />}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Footer / User Profile & Logout */}
      <div className="p-4 border-t border-slate-800 space-y-3">
        {user && (
          <div className="rounded-xl bg-slate-800/60 p-3 border border-slate-700/50 flex items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center justify-center shrink-0">
                <UserIcon className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-white truncate">
                  {user.email || 'Admin'}
                </p>
                <p className="text-[10px] text-slate-400">Authenticated</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setLogoutModalOpen(true)}
              className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-700/50 rounded-lg transition-colors cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        )}

        <div className="rounded-xl bg-slate-800/40 p-2.5 border border-slate-700/40 text-[11px] text-slate-400 flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-slate-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Supabase DB
          </span>
          <span
            className={`w-2 h-2 rounded-full ${
              isConfigured ? 'bg-emerald-400' : 'bg-amber-400'
            }`}
          />
        </div>

        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-center gap-2 w-full py-2 px-3 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>View Public Website</span>
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Top Navbar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-slate-900 border-b border-slate-800 px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-linear-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
            A
          </div>
          <span className="text-base font-bold text-white tracking-tight">ASGARD CMS</span>
        </div>
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="p-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800"
          aria-label="Toggle Navigation"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-72 max-w-full shadow-2xl animate-in slide-in-from-left duration-200">
            {navContent}
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block fixed inset-y-0 left-0 z-30 w-64 border-r border-slate-800">
        {navContent}
      </aside>

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

// Also export as Sidebar for backwards compatibility
export const Sidebar = AsgardSidebar;
