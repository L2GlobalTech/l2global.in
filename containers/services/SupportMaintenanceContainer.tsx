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
import { Wrench, Bug, HeadsetIcon, Server, ShieldCheck, Rocket } from "lucide-react";
import SupportImg from '../../public/assets/web/Service-detail/support-maintenance-hero.svg'
import SupportAbout from '../../public/assets/web/Service-detail/support-maintenance-about.svg'
import ServiceRegions from '@/components/web/services/ServiceRegions'
import ServiceFAQ from '@/components/web/services/ServiceFAQ'


const stats = [
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 1a5 5 0 0 0-5 5v1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a6 6 0 1 1 12 0v6a2.5 2.5 0 0 1-2.5 2.5H9.366a1 1 0 0 1-.866.5h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 .866.5H11.5A1.5 1.5 0 0 0 13 12h-1a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h1V6a5 5 0 0 0-5-5" />
            </svg>
        ),
        number: "24/7",
        title: "Support Coverage",
        subtitle: "Round-the-clock monitoring across time zones",
        gradient: "blue",
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
                <path d="M9.669.864 8 0 6.331.864l-1.858.282-.842 1.68-1.337 1.32L2.6 6l-.306 1.854 1.337 1.32.842 1.68 1.858.282L8 12l1.669-.864 1.858-.282.842-1.68 1.337-1.32L13.4 6l.306-1.854-1.337-1.32-.842-1.68zm1.196 1.193.684 1.365 1.086 1.072L12.387 6l.248 1.506-1.086 1.072-.684 1.365-1.51.229L8 10.874l-1.355-.702-1.51-.229-.684-1.365-1.086-1.072L3.614 6l-.25-1.506 1.087-1.072.684-1.365 1.51-.229L8 1.126l1.356.702z" />
            </svg>
        ),
        number: "4",
        title: "Platforms Covered",
        subtitle: "Salesforce, SAP, MuleSoft and AWS under one team",
        gradient: "purple",
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
                <path d="M0 0h1v15h15v1H0zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.9l-3.613 4.417a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 4.402a.5.5 0 0 1-.768-.638l4-4.819a.5.5 0 0 1 .757-.033L10 8.24l3.445-4.207H10.5a.5.5 0 0 1-.5-.5" />
            </svg>
        ),
        number: "182+",
        title: "Projects Delivered",
        subtitle: "Across implementation, enhancement and support",
        gradient: "orange",
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 0a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 4.095 0 5.555 0 7.318 0 9.366 1.708 11 3.781 11H7.5V5.5a.5.5 0 0 1 1 0V11h3.719C14.292 11 16 9.366 16 7.318c0-1.636-1.242-2.969-2.834-3.542"/>
            </svg>
        ),
        number: "3",
        title: "Global Offices",
        subtitle: "UK, USA and India — remote worldwide delivery",
        gradient: "green",
    },
];

const features = [
    "Application enhancement and new-feature development on your existing Salesforce, SAP, MuleSoft or AWS setup",
    "Bug fixes and defect resolution with defined SLA response times",
    "Ongoing application support — user issues, configuration changes, integration monitoring",
    "Website maintenance, hosting management and uptime monitoring",
    "Proactive health checks so small issues get caught before they become outages",
];


const services = [
    {
        icon: Wrench,
        title: "Application Enhancement",
        description:
            "New features, workflow changes and configuration updates on your existing Salesforce, SAP, MuleSoft or AWS environment.",
        iconBg: "bg-blue-100",
        gradientBar: "from-blue-500 to-blue-300",
    },
    {
        icon: Bug,
        title: "Bug Fixes & Defect Resolution",
        description:
            "Diagnosis and resolution of application issues across Salesforce, SAP, MuleSoft, AWS and your website, with clear SLA response times.",
        iconBg: "bg-green-100",
        gradientBar: "from-green-500 to-green-300",
    },
    {
        icon: HeadsetIcon,
        title: "Application Support",
        description:
            "Day-to-day support for end users and admins — configuration help, troubleshooting, and change requests handled by certified consultants.",
        iconBg: "bg-orange-100",
        gradientBar: "from-orange-500 to-orange-300",
    },
    {
        icon: Server,
        title: "Website Hosting & Maintenance",
        description:
            "Ongoing hosting management, uptime monitoring, security patching and performance upkeep for your website.",
        iconBg: "bg-purple-100",
        gradientBar: "from-purple-500 to-purple-300",
    },
    {
        icon: ShieldCheck,
        title: "Proactive Monitoring",
        description:
            "Regular health checks and monitoring across your Salesforce, SAP, MuleSoft and AWS environments to catch issues early.",
        iconBg: "bg-yellow-100",
        gradientBar: "from-yellow-500 to-yellow-300",
    },
    {
        icon: Rocket,
        title: "Consulting & Roadmapping",
        description:
            "Ongoing advisory on how to evolve your platforms as your business needs change, backed by 45+ certified consultants.",
        iconBg: "bg-cyan-100",
        gradientBar: "from-cyan-500 to-cyan-300",
    },
];

const supportFaqs = [
    {
        q: 'Do you support Salesforce, SAP, MuleSoft and AWS environments that L2 Global didn’t originally build?',
        a: 'Yes. We take on application support and maintenance for existing environments regardless of who implemented them, after an initial assessment of your setup.'
    },
    {
        q: 'What are your support response times?',
        a: 'Response times are defined per SLA agreed with you, typically prioritised by severity. Get in touch for a support plan tailored to your platforms and business hours.'
    },
    {
        q: 'Can you support multiple platforms under one contract?',
        a: 'Yes — many clients consolidate Salesforce, SAP, MuleSoft, AWS and website support under a single L2 Global support agreement instead of managing separate vendors.'
    },
    {
        q: 'Do you offer website hosting and maintenance as well?',
        a: 'Yes. Alongside enterprise application support, we manage website hosting, uptime monitoring, security patching and ongoing maintenance.'
    },
    {
        q: 'We are outside the UK, USA or India — can you still support us?',
        a: 'Yes. Our physical offices are in the UK, USA and India, but our support and maintenance services are delivered remotely worldwide.'
    },
]


const SupportMaintenanceContainer = () => {
    return (
        <div>
            <ServiceHeroSection
                image={SupportImg}
                sectionTitle={'Application Support & Maintenance'}
                titleBefore={'Keep Everything'}
                titleAfter={''}
                linearText={'Running Smoothly'}
                description={'Ongoing application enhancement, bug fixes, support and consulting for Salesforce, SAP, MuleSoft and AWS — plus website design, hosting and maintenance. Physical offices in the UK, USA and India, delivering support remotely worldwide.'}
                tag1={'4 Platforms'} tag2={'SLA-Backed'} tag3={'24/7 Support'} />

            <ServiceKPISection stats={stats} />

            <ServiceAboutSection image={SupportAbout} titleBefore={'Why'} titleAfter={'Matters'} linearText={'Ongoing Support'}
                description={'Going live is the start, not the finish. Our support and maintenance team keeps your Salesforce, SAP, MuleSoft, AWS and website environments enhanced, bug-free and running — one accountable team across every platform, instead of juggling separate vendors for each one.'} features={features} />

            <ServiceExpertiseSection services={services} />

            <ServiceProcessSteps />

            <ServiceServedIndustries />

            <ServiceWhyChooseUs />

            <ServiceRegions serviceName='Application Support & Maintenance' />

            <ServiceFAQ faqs={supportFaqs} serviceName='Application Support & Maintenance' />

            <div className=' pt-2 md:pt-8 lg:pt-12'>
                <HeroCTA
                    tag="Let's Grow Together"
                    heading="Need Ongoing Support Across Your Platforms?"
                    description="Partner with L2 Global for application enhancement, bug fixes and support across Salesforce, SAP, MuleSoft, AWS and your website — delivered remotely from our UK, USA and India teams."
                    primaryBtnText="Book a Support Consultation"
                    primaryBtnLink="/contact-us"
                    secondaryBtnText="View Services"
                    secondaryBtnLink="/services"
                />

            </div>
        </div>
    )
}

export default SupportMaintenanceContainer
