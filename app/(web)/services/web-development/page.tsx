import { ServiceLocalSchema } from '@/components/shared/JsonLd';
import WebDevelopmentContainer from '@/containers/services/WebDevelopmentContainer'
import React from 'react'

export const metadata = {
  title: 'Web Development Services',
  description:
    'Fixed-price B2B website design and development for USA, UK, Canada, Australia, Asia and Gulf businesses.' +
    ' 150+ websites delivered.',
  alternates: { canonical: 'https://l2global.in/services/web-development' },
  openGraph: {
    title: 'Web Development Services | L2 Global Technologies',
    description: 'Fixed-price B2B website design and development. UK · USA · Canada · Australia · Asia & Gulf. Free consultation.',
    url: 'https://l2global.in/services/web-development',
    images: ['/assets/web/og-image.png'],
  },
};

const page = () => {
  return (
    <div>
      <WebDevelopmentContainer />
      <ServiceLocalSchema
        serviceName='Website Design & Development'
        serviceUrl='https://l2global.in/services/web-development'
        description='B2B website design and development consultants for USA, UK, Canada, Australia, Asia and Gulf enterprises.'
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
