import type { Metadata } from 'next';
import { Suspense } from 'react';
import { FaqEditClient } from './FaqEditClient';
import { getAsgardMetadata } from '@/configs/seo';

export const metadata: Metadata = getAsgardMetadata('editFaq');

export default function AsgardEditFaqPage() {
  return (
    <Suspense fallback={null}>
      <FaqEditClient />
    </Suspense>
  );
}
