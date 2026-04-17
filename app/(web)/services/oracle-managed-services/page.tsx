import { ServiceLocalSchema } from '@/components/shared/JsonLd';
import OracleContainer from '@/containers/services/OracleContainer'
import React from 'react'

export const metadata = {
  title: 'Oracle Managed Services Near Me | UK, USA & Dubai | L2 Global',
  description:
    '24/7 Oracle DBA and Oracle Cloud Infrastructure support near you.' +
    ' Serving London, New York, Dubai, Riyadh and all GCC countries.' +
    ' Free Oracle health check.',
  alternates: { canonical: 'https://l2global.in/services/oracle-managed-services' },
  openGraph: {
    title: 'Oracle Managed Services | L2 Global Technologies',
    description: '24/7 Oracle DBA support. UK · USA · UAE & Gulf. Free health check.',
    url: 'https://l2global.in/services/oracle-managed-services',
    images: ['/assets/web/og-image.png'],
  },
};


const page = () => {
  return (
    <div>
      <OracleContainer />
      <ServiceLocalSchema
        serviceName='Oracle Managed Services'
        serviceUrl='https://l2global.in/services/oracle-managed-services'
        description='24/7 Oracle DBA and Oracle Cloud Infrastructure support near you. Serving London, New York, Dubai, Riyadh and all GCC countries. Free Oracle health check.'
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