import React from 'react';
import { Metadata } from 'next';
import { TestimonialFormContainer } from '@/containers/asgard/TestimonialFormContainer';
import { getAsgardMetadata } from '@/configs/seo';

export const metadata: Metadata = getAsgardMetadata('editTestimonial');

interface EditTestimonialPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditTestimonialPage({ params }: EditTestimonialPageProps) {
  const { id } = await params;
  return <TestimonialFormContainer id={id} />;
}
