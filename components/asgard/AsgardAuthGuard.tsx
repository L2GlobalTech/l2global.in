'use client';

import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { useAsgardAuth } from '@/context/AsgardAuthContext';

interface AsgardAuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

export const AsgardAuthGuard: React.FC<AsgardAuthGuardProps> = ({
  children,
  requireAuth = true,
}) => {
  const { isAuthenticated, loading } = useAsgardAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) return;

    const isLoginPage = pathname === '/asgard/login';

    if (requireAuth && !isAuthenticated && !isLoginPage) {
      router.replace('/asgard/login');
    } else if (isLoginPage && isAuthenticated) {
      router.replace('/asgard/overview');
    }
  }, [isAuthenticated, loading, pathname, requireAuth, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow-md animate-pulse">
            A
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
            <span>Verifying Asgard CMS session...</span>
          </div>
        </div>
      </div>
    );
  }

  // If requires auth and not authenticated, don't flash content before redirect
  if (requireAuth && !isAuthenticated && pathname !== '/asgard/login') {
    return null;
  }

  return <>{children}</>;
};
