import ManufacturingContainer from '@/containers/web/ManufacturingContainer'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: 'L2 Global Technologies | Manufacturing',
    description: '',
};

const page = () => {
    return (
        <>
            <ManufacturingContainer />
        </>
    )
}

export default page