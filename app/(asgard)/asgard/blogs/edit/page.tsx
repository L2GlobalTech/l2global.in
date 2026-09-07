import type { Metadata } from 'next';
import { Suspense } from 'react';
import { BlogEditClientPage } from './BlogEditClientPage';
import { getAsgardMetadata } from '@/configs/seo';

export const metadata: Metadata = getAsgardMetadata('editBlog');

export default function AsgardEditBlogPage() {
  return (
    <Suspense fallback={null}>
      <BlogEditClientPage />
    </Suspense>
  );
}
