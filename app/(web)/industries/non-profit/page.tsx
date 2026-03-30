import NonProfitContainer from '@/containers/web/NonProfitContainer'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: 'L2 Global Technologies | Non-Profit Organization',
    description: '',
};

const page = () => {
    return (
        <>
            <NonProfitContainer />
        </>
    )
}

export default page