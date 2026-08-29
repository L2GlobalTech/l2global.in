import { ServiceLocalSchema } from '@/components/shared/JsonLd';
import DataScienceContainer from '@/containers/services/DataScienceContainer'
import React from 'react'

export const metadata = {
  title: 'Data Science & Machine Learning',
  description:
    'Data science, machine learning and generative AI consulting serving UK (London,' +
    ' Manchester), USA (New York, Texas) and Gulf (Dubai, Riyadh). 120+ models deployed.',
  alternates: { canonical: 'https://l2global.in/services/data-science' },
  openGraph: {
    title: 'Data Science & Machine Learning Services | L2 Global Technologies',
    description: 'Data science, ML and generative AI consulting. UK · USA · Canada · Australia · Asia & Gulf. Free consultation.',
    url: 'https://l2global.in/services/data-science',
    images: ['/assets/web/og-image.png'],
  },
};

const page = () => {
  return (
    <div>
      <DataScienceContainer />
      <ServiceLocalSchema
        serviceName='Data Science & Machine Learning'
        serviceUrl='https://l2global.in/services/data-science'
        description='Certified data science, machine learning and AI consultants for USA, UK, Canada, Australia, Asia and Gulf enterprises.'
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
