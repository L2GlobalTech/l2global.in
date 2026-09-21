import React from 'react';
import { Metadata } from 'next';
import { TeamMembersContainer } from '@/containers/asgard/TeamMembersContainer';
import { getAsgardMetadata } from '@/configs/seo';

export const metadata: Metadata = getAsgardMetadata('team');

export default function AsgardTeamPage() {
  return <TeamMembersContainer />;
}
