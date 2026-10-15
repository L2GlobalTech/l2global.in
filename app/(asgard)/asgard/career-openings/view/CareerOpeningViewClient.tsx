'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { CareerOpeningDetailContainer } from '@/containers/asgard/CareerOpeningDetailContainer';

export const CareerOpeningViewClient: React.FC = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id') || undefined;

  return <CareerOpeningDetailContainer id={id} />;
};
