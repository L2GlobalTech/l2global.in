import { ServiceLocalSchema } from '@/components/shared/JsonLd';
import MulesoftContainer from '@/containers/services/MulesoftContainer'
import React from 'react'

export const metadata = {
  title: 'MuleSoft Integration Services | UK, USA & Dubai | L2 Global Technologies',
  description:
    'Certified MuleSoft Anypoint Platform consultants near you. Serving London, Manchester,' +
    ' New York, Texas, Dubai, Abu Dhabi, Riyadh. 250+ APIs delivered. Free consultation.',
  alternates: { canonical: 'https://l2global.in/services/mulesoft' },
  openGraph: {
    title: 'MuleSoft Integration Services | L2 Global Technologies',
    description: 'Certified MuleSoft consultants. UK · USA · UAE & Gulf. Free consultation.',
    url: 'https://l2global.in/services/mulesoft',
    images: ['/assets/web/og-image.png'],
  },
};


const page = () => {
  return (
    <div>
      <MulesoftContainer />
      <ServiceLocalSchema
        serviceName='MuleSoft Integration Services'
        serviceUrl='https://l2global.in/services/mulesoft'
        description='Certified MuleSoft consultants for UK, USA and Gulf enterprises.'
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