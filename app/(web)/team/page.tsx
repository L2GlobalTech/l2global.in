import TeamContainer from '@/containers/web/TeamContainer'
import React from 'react'
import { Metadata } from 'next';


export const metadata: Metadata = {
    title: 'L2 Global Technologies | Team',
    description:
        "Meet the expert team at L2 Global Technologies delivering Salesforce, SAP, and enterprise IT solutions with innovation, expertise, and global experience.",
    keywords: [
        "L2 Global Technologies Team",
        "IT Consulting Experts",
        "Salesforce Experts",
        "SAP Consultants",
        "Enterprise Technology Team"
    ],
};

const page = () => {
    return (
        <div><TeamContainer /></div>
    )
}

export default page