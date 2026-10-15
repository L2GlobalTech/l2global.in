import { ServiceLocalSchema } from '@/components/shared/JsonLd';
import RealEstateContainer from '@/containers/web/RealEstateContainer'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: 'Real Estate CRM | UK & UAE',
    description: 'Salesforce for property management, real-time dashboards and AI-driven analytics for developers and agencies across the UK, UAE and GCC.',
    alternates: { canonical: 'https://www.l2global.in/industries/real-estate' },
    openGraph: {
        title: 'Real Estate CRM Solutions | L2 Global Technologies',
        description: 'Salesforce for property management, real-time dashboards and AI-driven analytics for real estate.',
        url: 'https://www.l2global.in/industries/real-estate',
        images: ['/assets/web/og-image.png'],
    },
};

const page = () => {
    return (
        <div>
            <RealEstateContainer />
            <ServiceLocalSchema
                serviceName='Real Estate CRM Solutions'
                serviceUrl='https://www.l2global.in/industries/real-estate'
                description='Salesforce for property management, real-time dashboards and AI-driven analytics for real estate.'
                cities={[
                    'London', 'Manchester', 'Birmingham', 'Edinburgh', 'Bristol',
                    'Dubai', 'Abu Dhabi', 'Riyadh', 'Doha', 'Kuwait City',
                ]}
            />
        </div>
    )
}

export default page