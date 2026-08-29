import { ServiceLocalSchema } from '@/components/shared/JsonLd';
import ApiIntegrationContainer from '@/containers/services/ApiIntegrationContainer'
import React from 'react'

export const metadata = {
  title: 'API Integration Services | UK & USA',
  description:
    'Professional API and enterprise system integration serving UK (London, Birmingham),' +
    ' USA (New York, Texas) and Gulf (Dubai, Riyadh). 250+ APIs delivered.',
  alternates: { canonical: 'https://l2global.in/services/api-integration' },
  openGraph: {
    title: 'API Integration Services | L2 Global Technologies',
    description: 'Enterprise API integration. UK · USA · Canada · Australia · Asia & Gulf. Free consultation.',
    url: 'https://l2global.in/services/api-integration',
    images: ['/assets/web/og-image.png'],
  },
};

const page = () => {
  return (
    <div>
      <ApiIntegrationContainer />
      <ServiceLocalSchema
        serviceName='API Integration Services'
        serviceUrl='https://l2global.in/services/api-integration'
        description='Certified API integration consultants for USA, UK, Canada, Australia, Asia and Gulf enterprises.'
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