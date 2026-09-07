import type { Metadata } from 'next';
import { BlogsContainer } from '@/containers/asgard/BlogsContainer';
import { getAsgardMetadata } from '@/configs/seo';

export const metadata: Metadata = getAsgardMetadata('blogs');

export default function AsgardBlogsPage() {
  return <BlogsContainer />;
}
