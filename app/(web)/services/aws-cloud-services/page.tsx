import { ServiceLocalSchema } from '@/components/shared/JsonLd';
import AwsContainer from '@/containers/services/AwsContainer'
import React from 'react'

export const metadata = {
  title: 'AWS Cloud Migration & DevOps',
  description:
    'Certified AWS cloud consultants — migration, architecture and DevOps.' +
    ' Serving London, Manchester, New York, Texas, Dubai and Riyadh.',
  alternates: { canonical: 'https://l2global.in/services/aws-cloud-services' },
  openGraph: {
    title: 'AWS Cloud Services | L2 Global Technologies',
    description: 'AWS cloud experts. UK · USA · Canada · Australia · Asia · UAE. Free assessment.',
    url: 'https://l2global.in/services/aws-cloud-services',
    images: ['/assets/web/og-image.png'],
  },
};


const page = () => {
  return (
    <div>
      <AwsContainer />
      <ServiceLocalSchema
        serviceName='AWS Cloud Services'
        serviceUrl='https://l2global.in/services/aws-cloud-services'
        description='Certified AWS cloud consultants for USA, UK, Canada, Australia, Asia and Gulf enterprises.'
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