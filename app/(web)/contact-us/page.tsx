import ContactUsContainer from '@/containers/web/ContactUsContainer'
import { Metadata } from 'next';
import React from 'react'

// export const metadata: Metadata = {
//     title: 'L2 Global Technologies | Contact Us',
//     description: '',
// };

export const metadata: Metadata = {
    title: 'Contact L2 Global Technologies | Free IT Consultation — UK, USA & UAE',
    description:
        'Book a free consultation with L2 Global Technologies. Salesforce, SAP, MuleSoft and cloud' +
        ' experts serving London, New York, Dubai and across the UK, USA and Gulf region.',
    alternates: { canonical: 'https://l2global.in/contact-us' },
};


const page = () => {
    return (
        <>
            <ContactUsContainer />
        </>
    )
}

export default page