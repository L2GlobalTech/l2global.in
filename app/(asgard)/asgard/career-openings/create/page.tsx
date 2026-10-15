import React from 'react';
import type { Metadata } from 'next';
import { CareerOpeningFormContainer } from '@/containers/asgard/CareerOpeningFormContainer';
import { getAsgardMetadata } from '@/configs/seo';

export const metadata: Metadata = getAsgardMetadata('createCareerOpening');

export default function AsgardCreateCareerOpeningPage() {
  return <CareerOpeningFormContainer />;
}
