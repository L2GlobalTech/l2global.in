import type { Metadata } from 'next';
import { Suspense } from 'react';
import { ServiceEditClient } from './ServiceEditClient';
import { getAsgardMetadata } from '@/configs/seo';

export const metadata: Metadata = getAsgardMetadata('editService');

export default function AsgardEditServicePage() {
  return (
    <Suspense fallback={null}>
      <ServiceEditClient />
    </Suspense>
  );
}
