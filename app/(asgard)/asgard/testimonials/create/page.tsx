import React from 'react';
import { Metadata } from 'next';
import { TestimonialFormContainer } from '@/containers/asgard/TestimonialFormContainer';
import { getAsgardMetadata } from '@/configs/seo';

export const metadata: Metadata = getAsgardMetadata('createTestimonial');

export default function CreateTestimonialPage() {
  return <TestimonialFormContainer />;
}
