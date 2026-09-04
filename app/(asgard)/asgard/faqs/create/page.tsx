import type { Metadata } from 'next';
import { FaqFormContainer } from '@/containers/asgard/FaqFormContainer';
import { getAsgardMetadata } from '@/configs/seo';

export const metadata: Metadata = getAsgardMetadata('createFaq');

export default function AsgardCreateFaqPage() {
  return <FaqFormContainer />;
}
