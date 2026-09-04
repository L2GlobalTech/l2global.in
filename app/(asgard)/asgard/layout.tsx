import React from 'react';
import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import { AsgardAuthProvider } from '@/context/AsgardAuthContext';

export const metadata: Metadata = {
  title: {
    default: 'Asgard CMS | Content Management System',
    template: '%s | Asgard CMS',
  },
  description: 'Enterprise Content Management System dashboard for managing blogs and services.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AsgardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AsgardAuthProvider>
      {/* Toast Notification Provider */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          style: {
            background: '#1e293b',
            color: '#ffffff',
            fontSize: '14px',
            borderRadius: '10px',
            padding: '12px 16px',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.15)',
          },
        }}
      />
      {children}
    </AsgardAuthProvider>
  );
}
