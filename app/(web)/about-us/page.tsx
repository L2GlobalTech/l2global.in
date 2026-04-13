import AboutUsContainer from '@/containers/web/AboutUsContainer'
import { Metadata } from 'next';
import React from 'react'

// export const metadata: Metadata = {
//     title: 'L2 Global Technologies | About Us',
//     description: '',
// };
export const metadata: Metadata = {
    title: 'About L2 Global Technologies | UK, USA & Gulf IT Consultants',
    description:
        'L2 Global Technologies — specialist IT integration consultancy delivering Salesforce, SAP,' +
        ' MuleSoft and cloud solutions across the UK, USA, UAE and India. 182+ projects. 45+ experts.',
    alternates: { canonical: 'https://l2global.in/about-us' },
};


const page = () => {
    return (
        <>
            <AboutUsContainer />
        </>
    )
}

export default page