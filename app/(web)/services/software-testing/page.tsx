import { ServiceLocalSchema } from '@/components/shared/JsonLd';
import SoftwareTestingContainer from '@/containers/services/SoftwareTestingContainer'
import React from 'react'

export const metadata = {
  title: 'Software Testing & QA Services',
  description:
    'Manual and automated software testing, QA and regression testing for Salesforce,' +
    ' SAP, MuleSoft, AWS and custom web applications.',
  alternates: { canonical: 'https://l2global.in/services/software-testing' },
  openGraph: {
    title: 'Software Testing & QA Services | L2 Global Technologies',
    description: 'Manual and automated QA across Salesforce, SAP, MuleSoft, AWS and web apps. Free consultation.',
    url: 'https://l2global.in/services/software-testing',
    images: ['/assets/web/og-image.png'],
  },
};


const page = () => {
  return (
    <div>
      <SoftwareTestingContainer />
      <ServiceLocalSchema
        serviceName='Software Testing & QA'
        serviceUrl='https://l2global.in/services/software-testing'
        description='Manual and automated software testing, QA and regression testing for Salesforce, SAP, MuleSoft, AWS and custom web applications. Physical offices in UK, USA and India, delivered remotely worldwide.'
        cities={[
          'London', 'Manchester', 'Birmingham', 'Edinburgh', 'Leeds', 'Bristol', 'Gloucester',
          'New York', 'Texas', 'California', 'Chicago', 'Houston', 'Los Angeles',
          'Vijayawada', 'Bengaluru', 'Hyderabad', 'Vadodara',
          'Dubai', 'Abu Dhabi', 'Riyadh', 'Doha', 'Kuwait City', 'Manama', 'Muscat',
        ]}
      />

    </div>
  )
}

export default page
