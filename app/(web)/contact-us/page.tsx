import ContactUsContainer from '@/containers/web/ContactUsContainer'
import { Metadata } from 'next';
import React from 'react'

// export const metadata: Metadata = {
//     title: 'L2 Global Technologies | Contact Us',
//     description: '',
// };

export const metadata: Metadata = {
    title: 'Contact Us | Free Consultation',
    description:
        'Book a free consultation. Salesforce, SAP, MuleSoft and cloud experts serving' +
        ' London, New York, Dubai and across the USA, UK, Canada, Australia, Asia and Gulf region.',
    alternates: { canonical: 'https://l2global.in/contact-us' },
    openGraph: {
        title: 'Contact Us | L2 Global Technologies',
        description: 'Book a free consultation. Salesforce, SAP, MuleSoft and cloud experts serving USA, UK, Canada, Australia, Asia and Gulf.',
        url: 'https://l2global.in/contact-us',
        images: ['/assets/web/og-image.png'],
    },
};


const page = () => {
    return (
        <>
            <ContactUsContainer />
        </>
    )
}

export default page