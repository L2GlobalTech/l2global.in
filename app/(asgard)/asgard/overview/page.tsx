import type { Metadata } from 'next';
import { OverviewContainer } from '@/containers/asgard/OverviewContainer';
import { getAsgardMetadata } from '@/configs/seo';

export const metadata: Metadata = getAsgardMetadata('overview');

export default function AsgardOverviewPage() {
  return <OverviewContainer />;
}
