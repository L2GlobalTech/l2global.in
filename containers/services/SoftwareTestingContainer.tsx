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
import { CheckCircle2, Bot, Gauge, RefreshCcw, ShieldCheck, ClipboardCheck } from "lucide-react";
import TestingImg from '../../public/assets/web/Service-detail/software-testing-hero.svg'
import TestingAbout from '../../public/assets/web/Service-detail/software-testing-about.svg'
import ServiceRegions from '@/components/web/services/ServiceRegions'
import ServiceFAQ from '@/components/web/services/ServiceFAQ'


const stats = [
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
                <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
            </svg>
        ),
        number: "182+",
        title: "Projects Delivered",
        subtitle: "Across implementation, enhancement and QA",
        gradient: "blue",
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 8c.828 0 1.5-.895 1.5-2S8.828 4 8 4s-1.5.895-1.5 2S7.172 8 8 8" />
                <path d="M11.953 8.81c-.195-3.388-.968-5.507-1.777-6.819C9.707 1.233 9.23.751 8.857.454a3.5 3.5 0 0 0-.463-.315A2 2 0 0 0 8.25.064.55.55 0 0 0 8 0a.55.55 0 0 0-.266.073 2 2 0 0 0-.142.08 4 4 0 0 0-.459.33c-.37.308-.844.803-1.31 1.57-.805 1.322-1.577 3.433-1.774 6.756l-1.497 1.826-.004.005A2.5 2.5 0 0 0 2 12.202V15.5a.5.5 0 0 0 .9.3l1.125-1.5c.166-.222.42-.4.752-.57.214-.108.414-.192.625-.281l.198-.084c.7.428 1.55.635 2.4.635s1.7-.207 2.4-.635q.1.044.196.083c.213.09.413.174.627.282.332.17.586.348.752.57l1.125 1.5a.5.5 0 0 0 .9-.3v-3.298a2.5 2.5 0 0 0-.548-1.562z" />
            </svg>
        ),
        number: "45+",
        title: "Certified Experts",
        subtitle: "QA engineers, automation and platform specialists",
        gradient: "purple",
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
                <path d="M9.669.864 8 0 6.331.864l-1.858.282-.842 1.68-1.337 1.32L2.6 6l-.306 1.854 1.337 1.32.842 1.68 1.858.282L8 12l1.669-.864 1.858-.282.842-1.68 1.337-1.32L13.4 6l.306-1.854-1.337-1.32-.842-1.68zm1.196 1.193.684 1.365 1.086 1.072L12.387 6l.248 1.506-1.086 1.072-.684 1.365-1.51.229L8 10.874l-1.355-.702-1.51-.229-.684-1.365-1.086-1.072L3.614 6l-.25-1.506 1.087-1.072.684-1.365 1.51-.229L8 1.126l1.356.702z" />
            </svg>
        ),
        number: "4",
        title: "Platforms Covered",
        subtitle: "Salesforce, SAP, MuleSoft, AWS and custom web apps",
        gradient: "orange",
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 1a5 5 0 0 0-5 5v1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a6 6 0 1 1 12 0v6a2.5 2.5 0 0 1-2.5 2.5H9.366a1 1 0 0 1-.866.5h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 .866.5H11.5A1.5 1.5 0 0 0 13 12h-1a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h1V6a5 5 0 0 0-5-5" />
            </svg>
        ),
        number: "24/7",
        title: "QA Support",
        subtitle: "Test cycles aligned to your release schedule",
        gradient: "green",
    },
];

const features = [
    "Manual and automated functional testing across web, mobile and enterprise applications",
    "Regression testing to catch breakages before every release",
    "Performance and load testing to validate systems under real-world traffic",
    "Integration and API testing across Salesforce, SAP, MuleSoft and AWS environments",
    "Test planning, defect tracking and QA sign-off as part of your release cycle",
];


const services = [
    {
        icon: CheckCircle2,
        title: "Functional Testing",
        description:
            "Manual and scripted testing to verify your application behaves exactly as specified, before it reaches users.",
        iconBg: "bg-blue-100",
        gradientBar: "from-blue-500 to-blue-300",
    },
    {
        icon: Bot,
        title: "Test Automation",
        description:
            "Automated test suites for repetitive regression checks, cutting manual QA time on every release.",
        iconBg: "bg-green-100",
        gradientBar: "from-green-500 to-green-300",
    },
    {
        icon: Gauge,
        title: "Performance & Load Testing",
        description:
            "Simulated real-world load to find bottlenecks before they become production incidents.",
        iconBg: "bg-orange-100",
        gradientBar: "from-orange-500 to-orange-300",
    },
    {
        icon: RefreshCcw,
        title: "Regression Testing",
        description:
            "Structured regression suites that run before every release so new changes don't break existing features.",
        iconBg: "bg-purple-100",
        gradientBar: "from-purple-500 to-purple-300",
    },
    {
        icon: ShieldCheck,
        title: "Integration & API Testing",
        description:
            "Verification across Salesforce, SAP, MuleSoft, AWS and third-party integrations, so data flows correctly end-to-end.",
        iconBg: "bg-yellow-100",
        gradientBar: "from-yellow-500 to-yellow-300",
    },
    {
        icon: ClipboardCheck,
        title: "Test Planning & QA Sign-off",
        description:
            "Structured test plans, defect tracking and formal QA sign-off built into your release process.",
        iconBg: "bg-cyan-100",
        gradientBar: "from-cyan-500 to-cyan-300",
    },
];

const testingFaqs = [
    {
        q: 'Do you test applications you didn’t build?',
        a: 'Yes. We take on QA and testing engagements for existing Salesforce, SAP, MuleSoft, AWS and web applications regardless of who originally built them.'
    },
    {
        q: 'Do you offer test automation, or only manual testing?',
        a: 'Both. We build automated regression suites for repetitive checks and combine them with manual testing for exploratory and usability coverage.'
    },
    {
        q: 'Can testing be bundled with ongoing support?',
        a: 'Yes — QA and testing is commonly bundled with our Application Support & Maintenance service so every release is tested before it ships.'
    },
    {
        q: 'Do you provide QA for non-Salesforce/SAP web applications too?',
        a: 'Yes. Our QA team tests custom web applications and websites in addition to Salesforce, SAP, MuleSoft and AWS environments.'
    },
    {
        q: 'We are outside the UK, USA or India — can you still provide QA services?',
        a: 'Yes. Our physical offices are in the UK, USA and India, but testing and QA services are delivered remotely worldwide.'
    },
]


const SoftwareTestingContainer = () => {
    return (
        <div>
            <ServiceHeroSection
                image={TestingImg}
                sectionTitle={'Software Testing & QA'}
                titleBefore={'Ship With'}
                titleAfter={''}
                linearText={'Confidence, Not Guesswork'}
                description={'Manual and automated software testing, QA and regression testing for Salesforce, SAP, MuleSoft, AWS and custom web applications. Physical offices in the UK, USA and India, delivering QA remotely worldwide.'}
                tag1={'Manual & Automated'} tag2={'Regression-Tested'} tag3={'24/7 QA Support'} />

            <ServiceKPISection stats={stats} />

            <ServiceAboutSection image={TestingAbout} titleBefore={'Why'} titleAfter={'Matters'} linearText={'Software Testing'}
                description={'Every release carries risk — a missed edge case can mean a broken workflow in production. Our QA team builds structured test plans, automated regression suites and manual exploratory testing into your release cycle, across Salesforce, SAP, MuleSoft, AWS and custom web applications, so issues get caught before your users find them.'} features={features} />

            <ServiceExpertiseSection services={services} />

            <ServiceProcessSteps />

            <ServiceServedIndustries />

            <ServiceWhyChooseUs />

            <ServiceRegions serviceName='Software Testing & QA' />

            <ServiceFAQ faqs={testingFaqs} serviceName='Software Testing & QA' />

            <div className=' pt-2 md:pt-8 lg:pt-12'>
                <HeroCTA
                    tag="Let's Grow Together"
                    heading="Ready for Testing That Catches Issues Early?"
                    description="Partner with L2 Global for manual and automated QA across Salesforce, SAP, MuleSoft, AWS and your web applications."
                    primaryBtnText="Book a QA Consultation"
                    primaryBtnLink="/contact-us"
                    secondaryBtnText="View Services"
                    secondaryBtnLink="/services"
                />

            </div>
        </div>
    )
}

export default SoftwareTestingContainer
