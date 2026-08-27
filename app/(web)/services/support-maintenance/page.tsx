import { ServiceLocalSchema } from '@/components/shared/JsonLd';
import SupportMaintenanceContainer from '@/containers/services/SupportMaintenanceContainer'
import React from 'react'

export const metadata = {
  title: 'Application Support & Maintenance | Salesforce, SAP, MuleSoft, AWS',
  description:
    'Ongoing application enhancement, bug fixes, support and consulting for Salesforce, SAP,' +
    ' MuleSoft and AWS, plus website hosting and maintenance. UK, USA and India offices, remote worldwide delivery.',
  alternates: { canonical: 'https://l2global.in/services/support-maintenance' },
  openGraph: {
    title: 'Application Support & Maintenance | L2 Global Technologies',
    description: 'Enhancement, bug fixes and support across Salesforce, SAP, MuleSoft, AWS and websites. Free consultation.',
    url: 'https://l2global.in/services/support-maintenance',
    images: ['/assets/web/og-image.png'],
  },
};


const page = () => {
  return (
    <div>
      <SupportMaintenanceContainer />
      <ServiceLocalSchema
        serviceName='Application Support & Maintenance'
        serviceUrl='https://l2global.in/services/support-maintenance'
        description='Ongoing application enhancement, bug fixes, support and consulting for Salesforce, SAP, MuleSoft and AWS, plus website hosting and maintenance. Physical offices in UK, USA and India, delivered remotely worldwide.'
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
