import React from 'react';
import { Metadata } from 'next';
import { FaqsContainer } from '@/containers/asgard/FaqsContainer';

export const metadata: Metadata = {
  title: 'FAQ Management | Asgard CMS',
  description: 'Manage frequently asked questions, categories, and tags.',
};

export default function AsgardFaqsPage() {
  return <FaqsContainer />;
}
