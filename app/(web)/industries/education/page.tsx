import { ServiceLocalSchema } from '@/components/shared/JsonLd';
import EducationContainer from '@/containers/web/EducationContainer'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: 'Salesforce for Schools | UK & UAE',
    description: 'Salesforce for Schools, student lifecycle management and digital transformation for universities and K-12 institutions across the UK and UAE.',
    alternates: { canonical: 'https://www.l2global.in/industries/education' },
    openGraph: {
        title: 'Education Technology Solutions | L2 Global Technologies',
        description: 'Salesforce for Schools, student lifecycle management and digital transformation for education institutions.',
        url: 'https://www.l2global.in/industries/education',
        images: ['/assets/web/og-image.png'],
    },
};

const page = () => {
    return (
        <>
            <EducationContainer />
            <ServiceLocalSchema
                serviceName='Education Technology Solutions'
                serviceUrl='https://www.l2global.in/industries/education'
                description='Salesforce for Schools, student lifecycle management and digital transformation for education institutions.'
                cities={[
                    'London', 'Manchester', 'Birmingham', 'Edinburgh', 'Leeds', 'Bristol',
                    'Dubai', 'Abu Dhabi', 'Riyadh', 'Doha', 'Kuwait City', 'Manama', 'Muscat',
                ]}
            />
        </>
    )
}

export default page