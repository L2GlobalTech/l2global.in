import TeamContainer from '@/containers/web/TeamContainer'
import React from 'react'
import { Metadata } from 'next';
import { getPublicTeamMembers } from '@/app/(asgard)/asgard/team/action';

export const metadata: Metadata = {
    title: 'Team',
    description:
        "Meet the expert team at L2 Global Technologies delivering Salesforce, SAP, and enterprise IT solutions with innovation, expertise, and global experience.",
    keywords: [
        "L2 Global Technologies Team",
        "IT Consulting Experts",
        "Salesforce Experts",
        "SAP Consultants",
        "Enterprise Technology Team"
    ],
    alternates: { canonical: 'https://l2global.in/team' },
    openGraph: {
        title: 'Team | L2 Global Technologies',
        description: 'Meet the expert team at L2 Global Technologies delivering Salesforce, SAP and enterprise IT solutions.',
        url: 'https://l2global.in/team',
        images: ['/assets/web/og-image.png'],
    },
};

const page = async () => {
    const initialMembers = await getPublicTeamMembers();
    return (
        <div>
            <TeamContainer initialMembers={initialMembers} />
        </div>
    )
}

export default page