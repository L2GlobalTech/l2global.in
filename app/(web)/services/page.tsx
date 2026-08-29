import { ServiceLocalSchema } from '@/components/shared/JsonLd';
import ServicesOverviewContainer from '@/containers/web/ServicesOverviewContainer'
import React from 'react'

export const metadata = {
  title: 'Our Services | Salesforce, SAP & Cloud',
  description:
    'Salesforce Agentforce AI, SAP Joule AI, S/4HANA migration, MuleSoft integration,' +
    ' AWS, Oracle, data science and web development for USA, UK, Canada, Australia, Asia and Gulf businesses.',
  alternates: { canonical: 'https://l2global.in/services' },
  openGraph: {
    title: 'Our Services | L2 Global Technologies',
    description: 'Salesforce, SAP, MuleSoft, cloud, data science and web development. UK · USA · Canada · Australia · Asia · UAE. Free consultation.',
    url: 'https://l2global.in/services',
    images: ['/assets/web/og-image.png'],
  },
};

const page = () => {
  return (
    <div>
      <ServicesOverviewContainer />
      <ServiceLocalSchema
        serviceName='IT Consulting Services'
        serviceUrl='https://l2global.in/services'
        description='Salesforce, SAP, MuleSoft, cloud, data science and web development consultants for USA, UK, Canada, Australia, Asia and Gulf enterprises.'
        cities={[
          'London', 'Manchester', 'Birmingham', 'Edinburgh', 'Leeds', 'Bristol',
          'New York', 'Texas', 'California', 'Chicago', 'Houston', 'Los Angeles',
          'Dubai', 'Abu Dhabi', 'Riyadh', 'Doha', 'Kuwait City', 'Manama', 'Muscat',
        ]}
      />
    </div>
  )
}

export default page
