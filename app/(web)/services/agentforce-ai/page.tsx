import { ServiceLocalSchema } from '@/components/shared/JsonLd';
import AgentforceAIContainer from '@/containers/services/AgentforceAIContainer'
import React from 'react'

export const metadata = {
  title: 'Salesforce Agentforce AI | USA, UK, Canada, Australia, Asia & Gulf',
  description:
    'Salesforce Agentforce autonomous AI agent implementation serving UK (London, Manchester),' +
    ' USA (New York, Texas) and Gulf (Dubai, Riyadh). 60+ agents deployed.',
  alternates: { canonical: 'https://l2global.in/services/agentforce-ai' },
  openGraph: {
    title: 'Salesforce Agentforce AI Implementation | L2 Global Technologies',
    description: 'Autonomous Salesforce AI agents for sales and service. UK · USA · Canada · Australia · Asia & Gulf. Free consultation.',
    url: 'https://l2global.in/services/agentforce-ai',
    images: ['/assets/web/og-image.png'],
  },
};

const page = () => {
  return (
    <div>
      <AgentforceAIContainer />
      <ServiceLocalSchema
        serviceName='Salesforce Agentforce AI'
        serviceUrl='https://l2global.in/services/agentforce-ai'
        description='Certified Salesforce Agentforce AI implementation consultants for USA, UK, Canada, Australia, Asia and Gulf enterprises.'
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
