import type { Metadata } from 'next';
import { AdminFormContainer } from '@/containers/asgard/AdminFormContainer';
import { getAsgardMetadata } from '@/configs/seo';

export const metadata: Metadata = getAsgardMetadata('createAdmin');

export default function AsgardCreateAdminPage() {
  return <AdminFormContainer />;
}
