'use client';

import React from 'react';
import { AsgardSidebar } from '@/components/asgard/AsgardSidebar';
import { AsgardHeader } from '@/components/asgard/AsgardHeader';
import { AsgardPageContainer } from '@/components/asgard/AsgardPageContainer';
import { AsgardAuthGuard } from '@/components/asgard/AsgardAuthGuard';

interface AsgardLayoutProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

export const AsgardLayout: React.FC<AsgardLayoutProps> = ({
  children,
  requireAuth = true,
}) => {
  return (
    <AsgardAuthGuard requireAuth={requireAuth}>
      <div className="min-h-screen bg-slate-50 text-slate-900 flex font-sans">
        {/* Sidebar Navigation */}
        <AsgardSidebar />

        {/* Main Content Area */}
        <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
          {/* Top spacer for mobile fixed nav bar */}
          <div className="h-16 lg:hidden" />

          {/* Top desktop header */}
          <AsgardHeader />

          {/* Page content wrapper */}
          <main className="flex-1">
            <AsgardPageContainer>{children}</AsgardPageContainer>
          </main>
        </div>
      </div>
    </AsgardAuthGuard>
  );
};
