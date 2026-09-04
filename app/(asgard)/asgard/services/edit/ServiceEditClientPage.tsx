'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { ServiceFormContainer } from '@/containers/asgard/ServiceFormContainer';

export const ServiceEditClientPage: React.FC = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id') || undefined;
  return <ServiceFormContainer id={id} />;
};
