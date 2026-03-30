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
import { Database, Settings, Cloud, ShieldCheck, Activity, HardDrive } from "lucide-react";
import oracleImg from '../../public/assets/web/Service-detail/oracle-service-img.png'
import OracleAbout from '../../public/assets/web/Service-detail/oracle-about.png'


const stats = [
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 8c.828 0 1.5-.895 1.5-2S8.828 4 8 4s-1.5.895-1.5 2S7.172 8 8 8" />
                <path d="M11.953 8.81c-.195-3.388-.968-5.507-1.777-6.819C9.707 1.233 9.23.751 8.857.454a3.5 3.5 0 0 0-.463-.315A2 2 0 0 0 8.25.064.55.55 0 0 0 8 0a.55.55 0 0 0-.266.073 2 2 0 0 0-.142.08 4 4 0 0 0-.459.33c-.37.308-.844.803-1.31 1.57-.805 1.322-1.577 3.433-1.774 6.756l-1.497 1.826-.004.005A2.5 2.5 0 0 0 2 12.202V15.5a.5.5 0 0 0 .9.3l1.125-1.5c.166-.222.42-.4.752-.57.214-.108.414-.192.625-.281l.198-.084c.7.428 1.55.635 2.4.635s1.7-.207 2.4-.635q.1.044.196.083c.213.09.413.174.627.282.332.17.586.348.752.57l1.125 1.5a.5.5 0 0 0 .9-.3v-3.298a2.5 2.5 0 0 0-.548-1.562zM12 10.445v.055c0 .866-.284 1.585-.75 2.14.146.064.292.13.425.199.39.197.8.46 1.1.86L13 14v-1.798a1.5 1.5 0 0 0-.327-.935zM4.75 12.64C4.284 12.085 4 11.366 4 10.5v-.054l-.673.82a1.5 1.5 0 0 0-.327.936V14l.225-.3c.3-.4.71-.664 1.1-.861.133-.068.279-.135.425-.199M8.009 1.073q.096.06.226.163c.284.226.683.621 1.09 1.28C10.137 3.836 11 6.237 11 10.5c0 .858-.374 1.48-.943 1.893C9.517 12.786 8.781 13 8 13s-1.517-.214-2.057-.607C5.373 11.979 5 11.358 5 10.5c0-4.182.86-6.586 1.677-7.928.409-.67.81-1.082 1.096-1.32q.136-.113.236-.18Z" />
                <path d="M9.479 14.361c-.48.093-.98.139-1.479.139s-.999-.046-1.479-.139L7.6 15.8a.5.5 0 0 0 .8 0z" />
            </svg>
        ),
        number: "180+",
        title: "Integrations Deployed",
        subtitle: "SAP–Salesforce ecosystems",
        gradient: "blue",
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
                <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
            </svg>
        ),
        number: "99.9%",
        title: "Data Accuracy",
        subtitle: "Real-time sync reliability",
        gradient: "purple",
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
                <path d="M9.669.864 8 0 6.331.864l-1.858.282-.842 1.68-1.337 1.32L2.6 6l-.306 1.854 1.337 1.32.842 1.68 1.858.282L8 12l1.669-.864 1.858-.282.842-1.68 1.337-1.32L13.4 6l.306-1.854-1.337-1.32-.842-1.68zm1.196 1.193.684 1.365 1.086 1.072L12.387 6l.248 1.506-1.086 1.072-.684 1.365-1.51.229L8 10.874l-1.355-.702-1.51-.229-.684-1.365-1.086-1.072L3.614 6l-.25-1.506 1.087-1.072.684-1.365 1.51-.229L8 1.126l1.356.702z" />
                <path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1z" />
            </svg>
        ),
        number: "35%",
        title: "Faster Order Cycle",
        subtitle: "Quote-to-cash automation",
        gradient: "orange",
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 1a5 5 0 0 0-5 5v1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a6 6 0 1 1 12 0v6a2.5 2.5 0 0 1-2.5 2.5H9.366a1 1 0 0 1-.866.5h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 .866.5H11.5A1.5 1.5 0 0 0 13 12h-1a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h1V6a5 5 0 0 0-5-5" />
            </svg>
        ),
        number: "24/7",
        title: "Integration Monitoring",
        subtitle: "Enterprise-grade support",
        gradient: "green",
    },
];

const features = [
    "24/7 monitoring and proactive issue resolution",
    "Database performance tuning and optimization",
    "Patch management and system upgrades",
    "Security governance and compliance support",
    "Cloud and on-premise operational management",
];


const services = [
    {
        icon: Database,
        title: "Database Administration",
        description:
            "Comprehensive Oracle DBA services including backup, recovery, patching, performance tuning, and lifecycle management.",
        iconBg: "bg-blue-100",
        gradientBar: "from-blue-500 to-blue-300",
    },
    {
        icon: Settings,
        title: "Application Support",
        description:
            "Ongoing support and maintenance for Oracle EBS, Fusion, and enterprise applications to ensure smooth operations.",
        iconBg: "bg-green-100",
        gradientBar: "from-green-500 to-green-300",
    },
    {
        icon: Cloud,
        title: "Cloud Operations",
        description:
            "Management of Oracle Cloud Infrastructure (OCI) environments with monitoring, optimization, and cost control.",
        iconBg: "bg-orange-100",
        gradientBar: "from-orange-500 to-orange-300",
    },
    {
        icon: Activity,
        title: "Monitoring & Performance",
        description:
            "24/7 proactive system monitoring, workload analysis, and performance optimization for maximum uptime.",
        iconBg: "bg-purple-100",
        gradientBar: "from-purple-500 to-purple-300",
    },
    {
        icon: ShieldCheck,
        title: "Security & Compliance",
        description:
            "Role-based access control, auditing, encryption, and regulatory compliance across Oracle environments.",
        iconBg: "bg-yellow-100",
        gradientBar: "from-yellow-500 to-yellow-300",
    },
    {
        icon: HardDrive,
        title: "Backup & Disaster Recovery",
        description:
            "Robust backup strategies and disaster recovery planning to ensure business continuity and data protection.",
        iconBg: "bg-cyan-100",
        gradientBar: "from-cyan-500 to-cyan-300",
    },
];

const OracleContainer = () => {
    return (
        <div>
            <ServiceHeroSection
                image={oracleImg}
                sectionTitle={'Our Managed Services'}
                titleBefore={'Reliable Operations'}
                titleAfter={`Proactive Performance`}
                linearText={'Oracle'}
                description={'Our Oracle Managed Services ensure your critical Oracle applications and databases run securely, efficiently, and without disruption. From continuous monitoring and performance optimization to patch management and incident resolution, we provide end-to-end operational support tailored to your business needs.'}
                tag1={'Oracle Monitoring'} tag2={'Secure Operations'} tag3={'24/7 Support'} />

            <ServiceKPISection stats={stats} />

            <ServiceAboutSection image={OracleAbout} titleBefore={'Why'} titleAfter={'Managed Services Matter'} linearText={'Oracle'}
                description={'Oracle environments power mission-critical business operations. Our managed services ensure your Oracle databases, applications, and cloud infrastructure operate securely, efficiently, and without disruption.'} features={features} />

            <ServiceExpertiseSection services={services} />

            <ServiceProcessSteps />

            <ServiceServedIndustries />

            <ServiceWhyChooseUs />

            <div className=' pt-2 md:pt-8 lg:pt-12'>
                <HeroCTA
                    tag="Let's Grow Together"
                    heading="Expand Your Business with Us!"
                    description="Partner with L2 Global Technology Ltd. to accelerate growth through innovative design, technology, and digital strategy."
                    primaryBtnText="Get Started"
                    primaryBtnLink="/get-started"
                    secondaryBtnText="Watch Demo"
                    secondaryBtnLink="/demo"
                />

            </div>
        </div>
    )
}

export default OracleContainer