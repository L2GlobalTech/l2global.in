import { ServiceLocalSchema } from '@/components/shared/JsonLd';
import SapAIContainer from '@/containers/services/SapAIContainer'
import React from 'react'

export const metadata = {
  title: 'SAP Joule AI Implementation',
  description:
    'SAP Joule generative AI implementation across S/4HANA and SAP BTP, serving UK,' +
    ' USA and Gulf businesses. 50+ use cases deployed.',
  alternates: { canonical: 'https://l2global.in/services/sap-ai' },
  openGraph: {
    title: 'SAP Joule AI Implementation | L2 Global Technologies',
    description: 'SAP Joule generative AI, embedded in your SAP landscape. UK · USA · Canada · Australia · Asia & Gulf. Free consultation.',
    url: 'https://l2global.in/services/sap-ai',
    images: ['/assets/web/og-image.png'],
  },
};

const page = () => {
  return (
    <div>
      <SapAIContainer />
      <ServiceLocalSchema
        serviceName='SAP Joule AI'
        serviceUrl='https://l2global.in/services/sap-ai'
        description='Certified SAP Joule AI implementation consultants for USA, UK, Canada, Australia, Asia and Gulf enterprises.'
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
