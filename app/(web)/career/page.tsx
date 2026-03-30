import CareerContainer from '@/containers/web/CareerContainer'
import React from 'react'
import { Metadata } from 'next';


export const metadata: Metadata = {
    title: "L2 Global Technologies | Careers",
    description:
        "Explore career opportunities at L2 Global Technologies. Join our team of experts delivering Salesforce, SAP, and enterprise IT solutions worldwide.",
    keywords: [
        "L2 Global Careers",
        "IT Jobs",
        "Salesforce Careers",
        "SAP Jobs",
        "Tech Company Hiring",
        "Enterprise IT Careers"
    ],
}

const page = () => {
    return (
        <div><CareerContainer /></div>
    )
}

export default page