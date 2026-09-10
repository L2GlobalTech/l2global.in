import type { Metadata } from 'next';
import { Suspense } from 'react';
import { AdminEditClient } from './AdminEditClient';
import { getAsgardMetadata } from '@/configs/seo';

export const metadata: Metadata = getAsgardMetadata('editAdmin');

export default function AsgardEditAdminPage() {
  return (
    <Suspense fallback={null}>
      <AdminEditClient />
    </Suspense>
  );
}
