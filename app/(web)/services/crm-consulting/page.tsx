import { ServiceLocalSchema } from '@/components/shared/JsonLd';
import CrmContainer from '@/containers/services/CrmContainer'
import React from 'react'

export const metadata = {
  title: 'Salesforce CRM Consulting | UK & USA',
  description:
    'Certified Salesforce CRM consultants — Agentforce AI, implementation and rescue' +
    ' projects. 180+ deployments across UK, Texas USA and UAE.',
  alternates: { canonical: 'https://l2global.in/services/crm-consulting' },
  openGraph: {
    title: 'Salesforce CRM Consulting | L2 Global Technologies',
    description: 'Salesforce CRM experts. UK · USA · Canada · Australia · Asia · UAE. 180+ projects. Free consultation.',
    url: 'https://l2global.in/services/crm-consulting',
    images: ['/assets/web/og-image.png'],
  },
};


const page = () => {
  return (
    <div>
      <CrmContainer />
      <ServiceLocalSchema
        serviceName='CRM Consulting Services'
        serviceUrl='https://l2global.in/services/crm-consulting'
        description='Certified CRM consultants for USA, UK, Canada, Australia, Asia and Gulf enterprises.'
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