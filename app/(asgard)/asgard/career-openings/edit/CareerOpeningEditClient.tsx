'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { CareerOpeningFormContainer } from '@/containers/asgard/CareerOpeningFormContainer';

export const CareerOpeningEditClient: React.FC = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id') || undefined;

  return <CareerOpeningFormContainer id={id} />;
};
