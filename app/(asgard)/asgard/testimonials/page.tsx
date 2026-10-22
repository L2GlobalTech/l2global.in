import React from 'react';
import { Metadata } from 'next';
import { TestimonialsContainer } from '@/containers/asgard/TestimonialsContainer';
import { getAsgardMetadata } from '@/configs/seo';

export const metadata: Metadata = getAsgardMetadata('testimonials');

export default function AsgardTestimonialsPage() {
  return <TestimonialsContainer />;
}
