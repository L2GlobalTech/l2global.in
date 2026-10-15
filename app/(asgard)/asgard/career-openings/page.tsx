import React from 'react';
import type { Metadata } from 'next';
import { CareerOpeningsContainer } from '@/containers/asgard/CareerOpeningsContainer';
import { getAsgardMetadata } from '@/configs/seo';

export const metadata: Metadata = getAsgardMetadata('careerOpenings');

export default function AsgardCareerOpeningsPage() {
  return <CareerOpeningsContainer />;
}
