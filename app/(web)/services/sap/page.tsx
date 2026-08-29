import { ServiceLocalSchema } from '@/components/shared/JsonLd';
import SapS4HanaContainer from '@/containers/services/SapS4HanaContainer'
import React from 'react'

export const metadata = {
  title: 'SAP S/4HANA & RISE with SAP',
  description:
    'SAP S/4HANA and RISE with SAP migration services for USA, UK, Canada, Australia, Asia and Gulf businesses.' +
    ' 40+ migrations delivered. ECC support ends 2027.',
  alternates: { canonical: 'https://l2global.in/services/sap' },
  openGraph: {
    title: 'SAP S/4HANA & RISE with SAP Migration | L2 Global Technologies',
    description: 'SAP S/4HANA and RISE with SAP migration experts. UK · USA · Canada · Australia · Asia & Gulf. Free consultation.',
    url: 'https://l2global.in/services/sap',
    images: ['/assets/web/og-image.png'],
  },
};

const page = () => {
  return (
    <div>
      <SapS4HanaContainer />
      <ServiceLocalSchema
        serviceName='SAP S/4HANA & RISE with SAP'
        serviceUrl='https://l2global.in/services/sap'
        description='Certified SAP S/4HANA and RISE with SAP migration consultants for USA, UK, Canada, Australia, Asia and Gulf enterprises.'
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
