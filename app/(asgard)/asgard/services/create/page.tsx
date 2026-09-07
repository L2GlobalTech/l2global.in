import type { Metadata } from 'next';
import { ServiceFormContainer } from '@/containers/asgard/ServiceFormContainer';
import { getAsgardMetadata } from '@/configs/seo';

export const metadata: Metadata = getAsgardMetadata('createService');

export default function AsgardCreateServicePage() {
  return <ServiceFormContainer />;
}
