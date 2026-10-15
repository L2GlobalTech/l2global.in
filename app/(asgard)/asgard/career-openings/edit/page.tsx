import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { CareerOpeningEditClient } from './CareerOpeningEditClient';
import { getAsgardMetadata } from '@/configs/seo';

export const metadata: Metadata = getAsgardMetadata('editCareerOpening');

export default function AsgardEditCareerOpeningPage() {
  return (
    <Suspense fallback={null}>
      <CareerOpeningEditClient />
    </Suspense>
  );
}
