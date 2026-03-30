import ContactUsContainer from '@/containers/web/ContactUsContainer'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: 'L2 Global Technologies | Contact Us',
    description: '',
};

const page = () => {
    return (
        <>
            <ContactUsContainer />
        </>
    )
}

export default page