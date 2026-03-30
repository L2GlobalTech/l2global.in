import EducationContainer from '@/containers/web/EducationContainer'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: 'L2 Global Technologies | Education',
    description: '',
};

const page = () => {
    return (
        <>
            <EducationContainer />
        </>
    )
}

export default page