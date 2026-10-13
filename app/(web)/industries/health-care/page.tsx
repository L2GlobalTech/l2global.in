import { ServiceLocalSchema } from '@/components/shared/JsonLd';
import HealthCareContainer from '@/containers/web/HealthCareContainer'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: 'Salesforce Health Cloud | UK & UAE',
  description: 'Salesforce Health Cloud, patient engagement and digital transformation for NHS trusts and healthcare providers across the UK and UAE.',
  alternates: { canonical: 'https://www.l2global.in/industries/health-care' },
  openGraph: {
    title: 'Healthcare IT Solutions | L2 Global Technologies',
    description: 'Salesforce Health Cloud, patient engagement and digital transformation for NHS trusts and healthcare providers.',
    url: 'https://www.l2global.in/industries/health-care',
    images: ['/assets/web/og-image.png'],
  },
};

const page = () => {
  return (
    <div>
      <HealthCareContainer />
      <ServiceLocalSchema
        serviceName='Healthcare IT Solutions'
        serviceUrl='https://www.l2global.in/industries/health-care'
        description='Salesforce Health Cloud, patient engagement and digital transformation for NHS trusts and healthcare providers.'
        cities={[
          'London', 'Manchester', 'Birmingham', 'Edinburgh', 'Leeds', 'Bristol',
          'Dubai', 'Abu Dhabi', 'Riyadh', 'Doha', 'Kuwait City', 'Manama', 'Muscat',
        ]}
      />
    </div>
  )
}

export default page