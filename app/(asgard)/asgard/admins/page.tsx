import type { Metadata } from 'next';
import { AdminsContainer } from '@/containers/asgard/AdminsContainer';
import { getAsgardMetadata } from '@/configs/seo';

export const metadata: Metadata = getAsgardMetadata('admins');

export default function AsgardAdminsPage() {
  return <AdminsContainer />;
}
