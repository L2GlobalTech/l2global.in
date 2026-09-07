'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { BlogFormContainer } from '@/containers/asgard/BlogFormContainer';

export const BlogEditClientPage: React.FC = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id') || undefined;
  return <BlogFormContainer id={id} />;
};
