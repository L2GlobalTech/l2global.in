import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { CareerOpeningViewClient } from './CareerOpeningViewClient';
import { getAsgardMetadata } from '@/configs/seo';

export const metadata: Metadata = getAsgardMetadata('viewCareerOpening');

export default function AsgardViewCareerOpeningPage() {
  return (
    <Suspense fallback={null}>
      <CareerOpeningViewClient />
    </Suspense>
  );
}
