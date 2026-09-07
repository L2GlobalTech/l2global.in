import type { Metadata } from 'next';
import { BlogFormContainer } from '@/containers/asgard/BlogFormContainer';
import { getAsgardMetadata } from '@/configs/seo';

export const metadata: Metadata = getAsgardMetadata('createBlog');

export default function AsgardCreateBlogPage() {
  return <BlogFormContainer />;
}
