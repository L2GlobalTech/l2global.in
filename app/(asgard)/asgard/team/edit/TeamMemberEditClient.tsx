'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { TeamMemberFormContainer } from '@/containers/asgard/TeamMemberFormContainer';

export const TeamMemberEditClient: React.FC = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id') || undefined;

  return <TeamMemberFormContainer id={id} />;
};
