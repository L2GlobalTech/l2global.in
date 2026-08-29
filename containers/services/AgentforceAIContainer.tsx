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
import { Bot, MessageSquare, Workflow, Users, ShieldCheck, Zap } from "lucide-react";
import AgentforceImg from '../../public/assets/web/Service-detail/agentforce-ai-hero.svg'
import AgentforceAbout from '../../public/assets/web/Service-detail/agentforce-ai-about.svg'
import ServiceRegions from '@/components/web/services/ServiceRegions'
import ServiceFAQ from '@/components/web/services/ServiceFAQ'


const stats = [
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
                <path d="M6 12.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5M3 8.062C3 6.76 4.235 5.765 5.53 5.886a26.6 26.6 0 0 0 4.94 0C11.765 5.765 13 6.76 13 8.062v1.157a.933.933 0 0 1-.765.935c-.845.147-2.34.346-4.235.346-1.895 0-3.39-.2-4.235-.346A.933.933 0 0 1 3 9.219z" />
                <path d="M8.5 1.866a1 1 0 1 0-1 0V3h-2A4.5 4.5 0 0 0 1 7.5V8a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1v-.5A4.5 4.5 0 0 0 10.5 3h-2zM14 7.5V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.5A3.5 3.5 0 0 1 5.5 4h5A3.5 3.5 0 0 1 14 7.5" />
            </svg>
        ),
        number: "60+",
        title: "AI Agents Deployed",
        subtitle: "Autonomous sales and service agents live in production",
        gradient: "blue",
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 8c.828 0 1.5-.895 1.5-2S8.828 4 8 4s-1.5.895-1.5 2S7.172 8 8 8" />
                <path d="M11.953 8.81c-.195-3.388-.968-5.507-1.777-6.819C9.707 1.233 9.23.751 8.857.454a3.5 3.5 0 0 0-.463-.315A2 2 0 0 0 8.25.064.55.55 0 0 0 8 0a.55.55 0 0 0-.266.073 2 2 0 0 0-.142.08 4 4 0 0 0-.459.33c-.37.308-.844.803-1.31 1.57-.805 1.322-1.577 3.433-1.774 6.756l-1.497 1.826-.004.005A2.5 2.5 0 0 0 2 12.202V15.5a.5.5 0 0 0 .9.3l1.125-1.5c.166-.222.42-.4.752-.57.214-.108.414-.192.625-.281l.198-.084c.7.428 1.55.635 2.4.635s1.7-.207 2.4-.635q.1.044.196.083c.213.09.413.174.627.282.332.17.586.348.752.57l1.125 1.5a.5.5 0 0 0 .9-.3v-3.298a2.5 2.5 0 0 0-.548-1.562z" />
            </svg>
        ),
        number: "45%",
        title: "Faster Response Time",
        subtitle: "Customer queries resolved autonomously, around the clock",
        gradient: "purple",
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
                <path d="M9.669.864 8 0 6.331.864l-1.858.282-.842 1.68-1.337 1.32L2.6 6l-.306 1.854 1.337 1.32.842 1.68 1.858.282L8 12l1.669-.864 1.858-.282.842-1.68 1.337-1.32L13.4 6l.306-1.854-1.337-1.32-.842-1.68zm1.196 1.193.684 1.365 1.086 1.072L12.387 6l.248 1.506-1.086 1.072-.684 1.365-1.51.229L8 10.874l-1.355-.702-1.51-.229-.684-1.365-1.086-1.072L3.614 6l-.25-1.506 1.087-1.072.684-1.365 1.51-.229L8 1.126l1.356.702z" />
            </svg>
        ),
        number: "30%",
        title: "More Pipeline Coverage",
        subtitle: "AI sales agents qualifying and following up on every lead",
        gradient: "orange",
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 1a5 5 0 0 0-5 5v1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a6 6 0 1 1 12 0v6a2.5 2.5 0 0 1-2.5 2.5H9.366a1 1 0 0 1-.866.5h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 .866.5H11.5A1.5 1.5 0 0 0 13 12h-1a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h1V6a5 5 0 0 0-5-5" />
            </svg>
        ),
        number: "24/7",
        title: "Autonomous Support",
        subtitle: "Agents that work around the clock without human handoff",
        gradient: "green",
    },
];

const features = [
    "Custom Agentforce agents built for sales, service and your own business processes",
    "Grounded in your Salesforce Data Cloud for accurate, on-brand responses",
    "Prompt Builder and Flow-based actions configured to your approval workflows",
    "Human-in-the-loop escalation paths for anything agents shouldn't handle alone",
    "Ongoing monitoring, guardrails and continuous improvement after go-live",
];


const services = [
    {
        icon: Bot,
        title: "Agentforce Setup & Configuration",
        description:
            "End-to-end Agentforce implementation — topics, actions and guardrails configured to your business.",
        iconBg: "bg-blue-100",
        gradientBar: "from-blue-500 to-blue-300",
    },
    {
        icon: MessageSquare,
        title: "Service Agents",
        description:
            "Autonomous customer service agents that resolve cases, answer questions and escalate when needed.",
        iconBg: "bg-green-100",
        gradientBar: "from-green-500 to-green-300",
    },
    {
        icon: Workflow,
        title: "Sales Agents & Automation",
        description:
            "AI sales agents that qualify leads, schedule meetings and keep pipeline moving automatically.",
        iconBg: "bg-orange-100",
        gradientBar: "from-orange-500 to-orange-300",
    },
    {
        icon: Users,
        title: "Data Cloud Grounding",
        description:
            "Ground every agent response in your real Salesforce data for accurate, trustworthy answers.",
        iconBg: "bg-purple-100",
        gradientBar: "from-purple-500 to-purple-300",
    },
    {
        icon: ShieldCheck,
        title: "Guardrails & Governance",
        description:
            "Define exactly what agents can and can't do, with human escalation paths built in from day one.",
        iconBg: "bg-yellow-100",
        gradientBar: "from-yellow-500 to-yellow-300",
    },
    {
        icon: Zap,
        title: "Ongoing Optimization",
        description:
            "Monitor agent performance and continuously refine prompts, topics and actions after launch.",
        iconBg: "bg-cyan-100",
        gradientBar: "from-cyan-500 to-cyan-300",
    },
];

const agentforceFaqs = [
    {
        q: 'Where can I find Salesforce Agentforce consultants near me?',
        a: 'L2 Global implements Salesforce Agentforce AI agents across USA, UK, Canada, Australia, Asia and Gulf (Dubai, Riyadh). 60+ agents deployed. Free consultation at l2global.in/contact-us.'
    },
    {
        q: 'How much does an Agentforce implementation cost?',
        a: 'A single agent build typically ranges £8,000–£30,000 depending on data readiness and complexity. Free scoping consultation available.'
    },
    {
        q: 'Do Agentforce agents need Salesforce Data Cloud?',
        a: 'Grounding agents in Data Cloud gives the most accurate results, but we can also scope a phased approach starting with existing CRM data.'
    },
    {
        q: 'How long does an Agentforce project take?',
        a: 'Typical first-agent builds run 4–8 weeks from discovery to production. Free consultation to scope your project.'
    },
]


const AgentforceAIContainer = () => {
    return (
        <div>
            <ServiceHeroSection
                image={AgentforceImg}
                sectionTitle={'Salesforce Agentforce AI'}
                titleBefore={'Autonomous AI Agents'}
                titleAfter={''}
                linearText={'For Your Business'}
                description={'Salesforce Agentforce implementation experts serving USA, UK, Canada, Australia, Asia and Gulf businesses. Autonomous sales and service agents grounded in your Data Cloud, live in London, New York and Dubai. 60+ agents deployed. Free consultation.'}
                tag1={'Certified Salesforce Partner'} tag2={'Data Cloud Ready'} tag3={'24/7 Support'} />

            <ServiceKPISection stats={stats} />

            <ServiceAboutSection image={AgentforceAbout} titleBefore={'Why'} titleAfter={'Matters'} linearText={'Agentforce'}
                description={'Agentforce lets your business deploy autonomous AI agents that take action, not just answer questions. Our certified team configures agents grounded in your real Salesforce data, with the guardrails and escalation paths your business needs to trust them with customers from day one.'} features={features} />

            <ServiceExpertiseSection services={services} />

            <ServiceProcessSteps />

            <ServiceServedIndustries />

            <ServiceWhyChooseUs />

            <ServiceRegions serviceName='Salesforce Agentforce AI' />

            <ServiceFAQ faqs={agentforceFaqs} serviceName='Salesforce Agentforce AI' />

            <div className=' pt-2 md:pt-8 lg:pt-12'>
                <HeroCTA
                    tag="Let's Grow Together"
                    heading="Ready to Deploy Autonomous AI Agents?"
                    description="Partner with L2 Global to configure Agentforce agents grounded in your real Salesforce data, with the guardrails your business needs."
                    primaryBtnText="Discuss Your Agentforce Use Case"
                    primaryBtnLink="/contact-us"
                    secondaryBtnText="View Services"
                    secondaryBtnLink="/services"
                />

            </div>
        </div>
    )
}

export default AgentforceAIContainer
