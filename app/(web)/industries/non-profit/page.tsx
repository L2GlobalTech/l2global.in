import { ServiceLocalSchema } from '@/components/shared/JsonLd';
import NonProfitContainer from '@/containers/web/NonProfitContainer'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: 'Nonprofit CRM Solutions | UK & Gulf',
    description: 'Salesforce Nonprofit Cloud, donor engagement and impact management for charities and NGOs across the UK, UAE and GCC.',
    alternates: { canonical: 'https://www.l2global.in/industries/non-profit' },
    openGraph: {
        title: 'Non-Profit CRM & Salesforce Solutions | L2 Global Technologies',
        description: 'Salesforce Nonprofit Cloud, donor engagement and impact management for charities and NGOs.',
        url: 'https://www.l2global.in/industries/non-profit',
        images: ['/assets/web/og-image.png'],
    },
};

const page = () => {
    return (
        <>
            <NonProfitContainer />
            <ServiceLocalSchema
                serviceName='Non-Profit CRM & Salesforce Solutions'
                serviceUrl='https://www.l2global.in/industries/non-profit'
                description='Salesforce Nonprofit Cloud, donor engagement and impact management for charities and NGOs.'
                cities={[
                    'London', 'Manchester', 'Birmingham', 'Edinburgh', 'Bristol',
                    'Dubai', 'Abu Dhabi', 'Riyadh', 'Doha', 'Kuwait City',
                ]}
            />
        </>
    )
}

export default page