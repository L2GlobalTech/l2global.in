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
import { Sparkles, MessageCircle, Workflow, Database, ShieldCheck, Zap } from "lucide-react";
import SapAIImg from '../../public/assets/web/Service-detail/sap-ai-hero.svg'
import SapAIAbout from '../../public/assets/web/Service-detail/sap-ai-about.svg'
import ServiceRegions from '@/components/web/services/ServiceRegions'
import ServiceFAQ from '@/components/web/services/ServiceFAQ'


const stats = [
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
                <path d="M9.669.864 8 0 6.331.864l-1.858.282-.842 1.68-1.337 1.32L2.6 6l-.306 1.854 1.337 1.32.842 1.68 1.858.282L8 12l1.669-.864 1.858-.282.842-1.68 1.337-1.32L13.4 6l.306-1.854-1.337-1.32-.842-1.68zm1.196 1.193.684 1.365 1.086 1.072L12.387 6l.248 1.506-1.086 1.072-.684 1.365-1.51.229L8 10.874l-1.355-.702-1.51-.229-.684-1.365-1.086-1.072L3.614 6l-.25-1.506 1.087-1.072.684-1.365 1.51-.229L8 1.126l1.356.702z" />
            </svg>
        ),
        number: "50+",
        title: "Joule Use Cases Live",
        subtitle: "Generative AI workflows deployed across SAP modules",
        gradient: "blue",
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 8c.828 0 1.5-.895 1.5-2S8.828 4 8 4s-1.5.895-1.5 2S7.172 8 8 8" />
                <path d="M11.953 8.81c-.195-3.388-.968-5.507-1.777-6.819C9.707 1.233 9.23.751 8.857.454a3.5 3.5 0 0 0-.463-.315A2 2 0 0 0 8.25.064.55.55 0 0 0 8 0a.55.55 0 0 0-.266.073 2 2 0 0 0-.142.08 4 4 0 0 0-.459.33c-.37.308-.844.803-1.31 1.57-.805 1.322-1.577 3.433-1.774 6.756l-1.497 1.826-.004.005A2.5 2.5 0 0 0 2 12.202V15.5a.5.5 0 0 0 .9.3l1.125-1.5c.166-.222.42-.4.752-.57.214-.108.414-.192.625-.281l.198-.084c.7.428 1.55.635 2.4.635s1.7-.207 2.4-.635q.1.044.196.083c.213.09.413.174.627.282.332.17.586.348.752.57l1.125 1.5a.5.5 0 0 0 .9-.3v-3.298a2.5 2.5 0 0 0-.548-1.562z" />
            </svg>
        ),
        number: "38%",
        title: "Faster Reporting",
        subtitle: "Natural-language queries replacing manual report building",
        gradient: "purple",
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
                <path d="M0 0h1v15h15v1H0zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.9l-3.613 4.417a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 4.402a.5.5 0 0 1-.768-.638l4-4.819a.5.5 0 0 1 .757-.033L10 8.24l3.445-4.207H10.5a.5.5 0 0 1-.5-.5" />
            </svg>
        ),
        number: "25%",
        title: "Lower Process Time",
        subtitle: "Repetitive SAP tasks automated with Joule actions",
        gradient: "orange",
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 1a5 5 0 0 0-5 5v1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a6 6 0 1 1 12 0v6a2.5 2.5 0 0 1-2.5 2.5H9.366a1 1 0 0 1-.866.5h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 .866.5H11.5A1.5 1.5 0 0 0 13 12h-1a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h1V6a5 5 0 0 0-5-5" />
            </svg>
        ),
        number: "24/7",
        title: "Embedded Support",
        subtitle: "Joule available natively across every SAP module you use",
        gradient: "green",
    },
];

const features = [
    "Joule copilot enabled across S/4HANA, SuccessFactors, Ariba and other SAP modules",
    "Natural-language queries and reporting — ask SAP questions in plain English",
    "Process automation for repetitive tasks using Joule-powered actions",
    "Grounded in your live SAP data via SAP BTP, with role-based access controls",
    "Change management and enablement so your teams actually adopt the AI",
];


const services = [
    {
        icon: Sparkles,
        title: "Joule Enablement",
        description:
            "Activate and configure Joule across your SAP landscape — S/4HANA, SuccessFactors, Ariba and more.",
        iconBg: "bg-blue-100",
        gradientBar: "from-blue-500 to-blue-300",
    },
    {
        icon: MessageCircle,
        title: "Natural Language Reporting",
        description:
            "Let business users ask SAP questions in plain English and get instant, accurate answers.",
        iconBg: "bg-green-100",
        gradientBar: "from-green-500 to-green-300",
    },
    {
        icon: Workflow,
        title: "Process Automation",
        description:
            "Automate repetitive SAP workflows with Joule-powered actions tailored to your processes.",
        iconBg: "bg-orange-100",
        gradientBar: "from-orange-500 to-orange-300",
    },
    {
        icon: Database,
        title: "SAP BTP Integration",
        description:
            "Ground Joule in your live SAP data through SAP BTP for accurate, context-aware responses.",
        iconBg: "bg-purple-100",
        gradientBar: "from-purple-500 to-purple-300",
    },
    {
        icon: ShieldCheck,
        title: "Governance & Access Control",
        description:
            "Role-based access and guardrails so Joule only surfaces what each user should see.",
        iconBg: "bg-yellow-100",
        gradientBar: "from-yellow-500 to-yellow-300",
    },
    {
        icon: Zap,
        title: "Adoption & Enablement",
        description:
            "Hands-on training and change management so your teams actually use Joule day to day.",
        iconBg: "bg-cyan-100",
        gradientBar: "from-cyan-500 to-cyan-300",
    },
];

const sapAIFaqs = [
    {
        q: 'Where can I find SAP Joule AI implementation consultants near me?',
        a: 'L2 Global implements SAP Joule AI across USA, UK, Canada, Australia, Asia and Gulf (Dubai, Riyadh). 50+ use cases deployed. Free consultation at l2global.in/contact-us.'
    },
    {
        q: 'Do I need S/4HANA to use SAP Joule?',
        a: 'Joule works across several SAP modules, though the deepest integration is with S/4HANA and SAP BTP. We can assess what your current landscape supports.'
    },
    {
        q: 'How much does a SAP Joule rollout cost?',
        a: 'Initial enablement typically ranges £10,000–£40,000 depending on the number of modules and use cases. Free scoping consultation available.'
    },
    {
        q: 'How long does a Joule enablement project take?',
        a: 'Typical first-phase rollouts run 6–10 weeks from discovery to go-live. Free consultation to scope your project.'
    },
]


const SapAIContainer = () => {
    return (
        <div>
            <ServiceHeroSection
                image={SapAIImg}
                sectionTitle={'SAP Joule AI'}
                titleBefore={'Generative AI, Native'}
                titleAfter={''}
                linearText={'To Your SAP'}
                description={'SAP Joule AI implementation experts serving USA, UK, Canada, Australia, Asia and Gulf businesses. Natural-language reporting and process automation embedded across S/4HANA in London, New York and Dubai. 50+ use cases deployed. Free consultation.'}
                tag1={'SAP Gold Partner'} tag2={'BTP Certified'} tag3={'24/7 Support'} />

            <ServiceKPISection stats={stats} />

            <ServiceAboutSection image={SapAIAbout} titleBefore={'Why'} titleAfter={'Matters'} linearText={'SAP Joule'}
                description={'Joule brings generative AI directly into the SAP tools your teams already use — no separate login, no data export. Our certified team enables Joule across your SAP landscape, grounded in your real data via SAP BTP, so your teams get instant answers and automated workflows without leaving SAP.'} features={features} />

            <ServiceExpertiseSection services={services} />

            <ServiceProcessSteps />

            <ServiceServedIndustries />

            <ServiceWhyChooseUs />

            <ServiceRegions serviceName='SAP Joule AI' />

            <ServiceFAQ faqs={sapAIFaqs} serviceName='SAP Joule AI' />

            <div className=' pt-2 md:pt-8 lg:pt-12'>
                <HeroCTA
                    tag="Let's Grow Together"
                    heading="Ready to Bring AI Into Your SAP?"
                    description="Partner with L2 Global to enable SAP Joule across your landscape, grounded in your real SAP data via SAP BTP."
                    primaryBtnText="Discuss SAP Joule AI"
                    primaryBtnLink="/contact-us"
                    secondaryBtnText="View Services"
                    secondaryBtnLink="/services"
                />

            </div>
        </div>
    )
}

export default SapAIContainer
