'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { AdminFormContainer } from '@/containers/asgard/AdminFormContainer';

export const AdminEditClient: React.FC = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id') || undefined;

  return <AdminFormContainer id={id} />;
};
