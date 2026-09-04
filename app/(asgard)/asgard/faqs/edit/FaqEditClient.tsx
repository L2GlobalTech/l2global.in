'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { FaqFormContainer } from '@/containers/asgard/FaqFormContainer';

export const FaqEditClient: React.FC = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id') || undefined;

  return <FaqFormContainer id={id} />;
};
