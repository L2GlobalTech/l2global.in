import AboutUsContainer from '@/containers/web/AboutUsContainer'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: 'L2 Global Technologies | About Us',
    description: '',
};

const page = () => {
    return (
        <>
            <AboutUsContainer />
        </>
    )
}

export default page