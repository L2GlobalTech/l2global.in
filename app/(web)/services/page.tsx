import ServicesOverviewContainer from '@/containers/web/ServicesOverviewContainer'
import React from 'react'
export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'IT Services | Salesforce, SAP, AWS & DevOps',
  description: 'Explore Salesforce, SAP, MuleSoft, AWS cloud, DevOps, IT support, data science, software testing and web development services from L2 Global.',
  alternates: { canonical: 'https://www.l2global.in/services' },
  openGraph: {
    title: 'Our Services | L2 Global Technologies',
    description: 'Explore Salesforce, SAP, MuleSoft, AWS cloud, DevOps, IT support, data science, testing and web development services from L2 Global.',
    url: 'https://www.l2global.in/services',
    images: ['/assets/web/og-image.png'],
  },
};

import { fetchServices } from '@/actions/servicesAction';

const page = async () => {
  const initialServices = await fetchServices();

  return (
    <div>
      <ServicesOverviewContainer initialServices={initialServices} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'ItemList',
        name: 'L2 Global IT Services',
        itemListElement: initialServices.map((service, index) => ({
          '@type': 'ListItem', position: index + 1, name: service.title,
          url: `https://www.l2global.in${service.href}`,
        })),
      }).replace(/</g, '\\u003c') }} />
    </div>
  )
}

export default page
