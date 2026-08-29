'use client'
import HeroCTA from '@/components/web/HeroCTA'
import ServiceAboutSection from '@/components/web/services/ServiceAboutSection'
import ServiceExpertiseSection from '@/components/web/services/ServiceExpertiseSection'
import ServiceHeroSection from '@/components/web/services/ServiceHeroSection'
import ServiceKPISection from '@/components/web/services/ServiceKPISection'
import ServiceProcessSteps from '@/components/web/services/ServiceProcessSteps'
import ServiceServedIndustries from '@/components/web/services/ServiceServedIndustries'
import ServiceWhyChooseUs from '@/components/web/services/ServiceWhyChooseUs'
import React from 'react'
import { Cloud, RefreshCw, Server, Database, ShieldCheck, TrendingUp } from "lucide-react";
import S4Img from '../../public/assets/web/Service-detail/sap-s4hana-hero.svg'
import S4About from '../../public/assets/web/Service-detail/sap-s4hana-about.svg'
import ServiceRegions from '@/components/web/services/ServiceRegions'
import ServiceFAQ from '@/components/web/services/ServiceFAQ'


const stats = [
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
                <path d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383" />
                <path d="M7.646 4.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V14.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708z" />
            </svg>
        ),
        number: "40+",
        title: "S/4HANA Migrations",
        subtitle: "Successful ECC to S/4HANA transitions delivered",
        gradient: "blue",
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 8c.828 0 1.5-.895 1.5-2S8.828 4 8 4s-1.5.895-1.5 2S7.172 8 8 8" />
                <path d="M11.953 8.81c-.195-3.388-.968-5.507-1.777-6.819C9.707 1.233 9.23.751 8.857.454a3.5 3.5 0 0 0-.463-.315A2 2 0 0 0 8.25.064.55.55 0 0 0 8 0a.55.55 0 0 0-.266.073 2 2 0 0 0-.142.08 4 4 0 0 0-.459.33c-.37.308-.844.803-1.31 1.57-.805 1.322-1.577 3.433-1.774 6.756l-1.497 1.826-.004.005A2.5 2.5 0 0 0 2 12.202V15.5a.5.5 0 0 0 .9.3l1.125-1.5c.166-.222.42-.4.752-.57.214-.108.414-.192.625-.281l.198-.084c.7.428 1.55.635 2.4.635s1.7-.207 2.4-.635q.1.044.196.083c.213.09.413.174.627.282.332.17.586.348.752.57l1.125 1.5a.5.5 0 0 0 .9-.3v-3.298a2.5 2.5 0 0 0-.548-1.562z" />
            </svg>
        ),
        number: "99.5%",
        title: "Cutover Success Rate",
        subtitle: "Migrations delivered on schedule with minimal downtime",
        gradient: "purple",
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
                <path d="M9.669.864 8 0 6.331.864l-1.858.282-.842 1.68-1.337 1.32L2.6 6l-.306 1.854 1.337 1.32.842 1.68 1.858.282L8 12l1.669-.864 1.858-.282.842-1.68 1.337-1.32L13.4 6l.306-1.854-1.337-1.32-.842-1.68zm1.196 1.193.684 1.365 1.086 1.072L12.387 6l.248 1.506-1.086 1.072-.684 1.365-1.51.229L8 10.874l-1.355-.702-1.51-.229-.684-1.365-1.086-1.072L3.614 6l-.25-1.506 1.087-1.072.684-1.365 1.51-.229L8 1.126l1.356.702z" />
            </svg>
        ),
        number: "2027",
        title: "ECC Support Deadline",
        subtitle: "SAP ECC mainstream support ends — plan your move now",
        gradient: "orange",
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 1a5 5 0 0 0-5 5v1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a6 6 0 1 1 12 0v6a2.5 2.5 0 0 1-2.5 2.5H9.366a1 1 0 0 1-.866.5h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 .866.5H11.5A1.5 1.5 0 0 0 13 12h-1a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h1V6a5 5 0 0 0-5-5" />
            </svg>
        ),
        number: "24/7",
        title: "Managed Cloud Ops",
        subtitle: "Ongoing RISE with SAP monitoring and support",
        gradient: "green",
    },
];

const features = [
    "SAP ECC to S/4HANA migration assessment, planning and execution",
    "RISE with SAP cloud transition — infrastructure, licensing and migration managed end-to-end",
    "SAP BTP extension development to keep your customisations clean in the cloud",
    "Zero-downtime cutover planning to minimise business disruption during go-live",
    "Ongoing managed cloud operations, monitoring and support after migration",
];


const services = [
    {
        icon: RefreshCw,
        title: "ECC to S/4HANA Migration",
        description:
            "End-to-end migration assessment, planning and execution from SAP ECC to S/4HANA.",
        iconBg: "bg-blue-100",
        gradientBar: "from-blue-500 to-blue-300",
    },
    {
        icon: Cloud,
        title: "RISE with SAP Transition",
        description:
            "Move to RISE with SAP with infrastructure, licensing and migration managed for you end-to-end.",
        iconBg: "bg-green-100",
        gradientBar: "from-green-500 to-green-300",
    },
    {
        icon: Database,
        title: "SAP BTP Extensions",
        description:
            "Keep customisations clean in the cloud with SAP BTP-based extensions instead of core modifications.",
        iconBg: "bg-orange-100",
        gradientBar: "from-orange-500 to-orange-300",
    },
    {
        icon: Server,
        title: "Zero-Downtime Cutover",
        description:
            "Migration planning designed to minimise business disruption during your go-live window.",
        iconBg: "bg-purple-100",
        gradientBar: "from-purple-500 to-purple-300",
    },
    {
        icon: ShieldCheck,
        title: "Managed Cloud Operations",
        description:
            "Ongoing monitoring, patching and support to keep your S/4HANA environment secure and stable.",
        iconBg: "bg-yellow-100",
        gradientBar: "from-yellow-500 to-yellow-300",
    },
    {
        icon: TrendingUp,
        title: "Post-Migration Optimisation",
        description:
            "Fine-tune performance and processes after go-live to get the most out of S/4HANA.",
        iconBg: "bg-cyan-100",
        gradientBar: "from-cyan-500 to-cyan-300",
    },
];

const s4Faqs = [
    {
        q: 'Where can I find SAP S/4HANA migration consultants near me?',
        a: 'L2 Global delivers SAP S/4HANA and RISE with SAP migrations across USA, UK, Canada, Australia, Asia and Gulf (Dubai, Riyadh). 40+ migrations delivered. Free consultation at l2global.in/contact-us.'
    },
    {
        q: 'When does SAP ECC support end?',
        a: 'SAP mainstream maintenance for ECC ends in 2027. Businesses should plan their S/4HANA or RISE with SAP migration now to avoid a last-minute rush.'
    },
    {
        q: 'How much does an S/4HANA migration cost?',
        a: 'Costs vary widely by landscape complexity — typical mid-size migrations range £50,000–£250,000+. Free scoping consultation available.'
    },
    {
        q: 'What is the difference between S/4HANA and RISE with SAP?',
        a: 'S/4HANA is the ERP suite itself; RISE with SAP is a managed cloud bundle that includes S/4HANA, infrastructure and migration services in one contract. We can help you decide which fits your business.'
    },
]


const SapS4HanaContainer = () => {
    return (
        <div>
            <ServiceHeroSection
                image={S4Img}
                sectionTitle={'SAP S/4HANA & RISE with SAP'}
                titleBefore={'Migrate to'}
                titleAfter={''}
                linearText={'S/4HANA With Confidence'}
                description={'SAP S/4HANA and RISE with SAP migration experts serving USA, UK, Canada, Australia, Asia and Gulf businesses. ECC mainstream support ends 2027 — plan your migration in London, New York and Dubai now. 40+ migrations delivered. Free consultation.'}
                tag1={'SAP Gold Partner'} tag2={'RISE Certified'} tag3={'24/7 Support'} />

            <ServiceKPISection stats={stats} />

            <ServiceAboutSection image={S4About} titleBefore={'Why'} titleAfter={'Matters'} linearText={'Migrating Now'}
                description={'SAP ECC mainstream support ends in 2027, and the businesses that migrate early avoid the rush, the risk and the premium pricing that come with last-minute moves. Our certified team plans and executes your S/4HANA or RISE with SAP migration with zero-downtime cutover planning and managed cloud operations after go-live.'} features={features} />

            <ServiceExpertiseSection services={services} />

            <ServiceProcessSteps />

            <ServiceServedIndustries />

            <ServiceWhyChooseUs />

            <ServiceRegions serviceName='SAP S/4HANA & RISE with SAP' />

            <ServiceFAQ faqs={s4Faqs} serviceName='SAP S/4HANA & RISE with SAP' />

            <div className=' pt-2 md:pt-8 lg:pt-12'>
                <HeroCTA
                    tag="Let's Grow Together"
                    heading="Ready to Migrate to S/4HANA?"
                    description="Partner with L2 Global to plan your SAP S/4HANA or RISE with SAP migration before ECC support ends in 2027."
                    primaryBtnText="Book an SAP S/4HANA Consultation"
                    primaryBtnLink="/contact-us"
                    secondaryBtnText="View Services"
                    secondaryBtnLink="/services"
                />

            </div>
        </div>
    )
}

export default SapS4HanaContainer
