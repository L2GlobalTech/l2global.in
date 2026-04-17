import { ServiceLocalSchema } from '@/components/shared/JsonLd';
import SapContainer from '@/containers/services/SapContainer'
import React from 'react'

export const metadata = {
    title: 'SAP & Salesforce Integration | UK, USA & UAE | L2 Global Technologies',
    description:
        'Expert SAP–Salesforce integration consultants serving UK (London, Manchester),' +
        ' USA (New York, Texas) and Gulf (Dubai, Riyadh, Doha). Real-time sync,' +
        ' process automation. Free consultation.',
    alternates: { canonical: 'https://l2global.in/services/sap-link-by-salesforce' },
    openGraph: {
        title: 'SAP & Salesforce Integration | L2 Global Technologies',
        description: 'SAP–Salesforce integration for UK, USA and Gulf enterprises. Free consultation.',
        url: 'https://l2global.in/services/sap-link-by-salesforce',
        images: ['/assets/web/og-image.png'],
    },
};


const page = () => {
    return (
        <div>
            <SapContainer />
            <ServiceLocalSchema
                serviceName='SAP & Salesforce Integration'
                serviceUrl='https://l2global.in/services/sap-link-by-salesforce'
                description='Real-time SAP–Salesforce integration for UK, USA and Gulf enterprises. Free demo.'
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