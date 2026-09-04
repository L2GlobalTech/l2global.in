import type { Metadata } from 'next';
import { ServicesContainer } from '@/containers/asgard/ServicesContainer';
import { getAsgardMetadata } from '@/configs/seo';

export const metadata: Metadata = getAsgardMetadata('services');

export default function AsgardServicesPage() {
  return <ServicesContainer />;
}
