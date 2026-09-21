import AboutUsContainer from '@/containers/web/AboutUsContainer'
import { Metadata } from 'next';
import React from 'react'
import { getPublicTeamMembers } from '@/app/(asgard)/asgard/team/action';

export const metadata: Metadata = {
    title: 'About Us | USA, UK, Canada, Australia, Asia & Gulf',
    description:
        'Specialist IT integration consultancy delivering Salesforce, SAP, MuleSoft and cloud' +
        ' solutions across the USA, UK, Canada, Australia, Asia and Gulf. 182+ projects delivered.',
    alternates: { canonical: 'https://l2global.in/about-us' },
    openGraph: {
        title: 'About Us | L2 Global Technologies',
        description: 'Specialist IT integration consultancy delivering Salesforce, SAP, MuleSoft and cloud solutions. UK · USA · Canada · Australia · Asia · India.',
        url: 'https://l2global.in/about-us',
        images: ['/assets/web/og-image.png'],
    },
};

const page = async () => {
    const initialTeam = await getPublicTeamMembers();
    return (
        <>
            <AboutUsContainer initialTeam={initialTeam} />
        </>
    )
}

export default page