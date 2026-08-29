import { ServiceLocalSchema } from '@/components/shared/JsonLd';
import ManufacturingContainer from '@/containers/web/ManufacturingContainer'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: 'SAP & MuleSoft for Manufacturing',
    description: 'SAP S/4HANA migration and MuleSoft integration for discrete and process manufacturers across the USA, UK, Canada, Australia, Asia and Gulf.',
    alternates: { canonical: 'https://l2global.in/industries/manufacturing' },
    openGraph: {
        title: 'Manufacturing IT Solutions | L2 Global Technologies',
        description: 'SAP S/4HANA migration, MuleSoft integration and digital transformation for manufacturers.',
        url: 'https://l2global.in/industries/manufacturing',
        images: ['/assets/web/og-image.png'],
    },
};

const page = () => {
    return (
        <>
            <ManufacturingContainer />
            <ServiceLocalSchema
                serviceName='Manufacturing IT Solutions'
                serviceUrl='https://l2global.in/industries/manufacturing'
                description='SAP S/4HANA migration, MuleSoft integration and digital transformation for manufacturers.'
                cities={[
                    'London', 'Manchester', 'Birmingham', 'New York', 'Texas', 'Houston',
                    'Dubai', 'Abu Dhabi', 'Riyadh', 'Doha', 'Kuwait City',
                ]}
            />
        </>
    )
}

export default page