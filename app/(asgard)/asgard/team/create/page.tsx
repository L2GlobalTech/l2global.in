import type { Metadata } from 'next';
import { TeamMemberFormContainer } from '@/containers/asgard/TeamMemberFormContainer';
import { getAsgardMetadata } from '@/configs/seo';

export const metadata: Metadata = getAsgardMetadata('createTeamMember');

export default function AsgardCreateTeamMemberPage() {
  return <TeamMemberFormContainer />;
}
