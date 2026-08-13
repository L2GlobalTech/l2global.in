import FaqContainer from '@/containers/web/FaqContainer'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: 'FAQ | L2 Global Technology Ltd.',
    description: 'Frequently asked questions about L2 Global Technology Ltd. services, enterprise integration, Salesforce, SAP, and MuleSoft.',
}

const FaqPage = () => {
    return (

        <FaqContainer />

    )
}

export default FaqPage
