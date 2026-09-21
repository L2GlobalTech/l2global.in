import type { Metadata } from 'next';
import { Suspense } from 'react';
import { TeamMemberEditClient } from './TeamMemberEditClient';
import { getAsgardMetadata } from '@/configs/seo';

export const metadata: Metadata = getAsgardMetadata('editTeamMember');

export default function AsgardEditTeamMemberPage() {
  return (
    <Suspense fallback={null}>
      <TeamMemberEditClient />
    </Suspense>
  );
}
