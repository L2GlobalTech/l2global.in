import RealEstateContainer from '@/containers/web/RealEstateContainer'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: 'L2 Global Technologies | Real Estate',
    description: '',
};

const page = () => {
    return (
        <div><RealEstateContainer /></div>
    )
}

export default page