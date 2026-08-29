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
import { Brain, LineChart, Bot, Database, BarChart3, Sparkles } from "lucide-react";
import DataScienceImg from '../../public/assets/web/Service-detail/data-science-hero.svg'
import DataScienceAbout from '../../public/assets/web/Service-detail/data-science-about.svg'
import ServiceRegions from '@/components/web/services/ServiceRegions'
import ServiceFAQ from '@/components/web/services/ServiceFAQ'


const stats = [
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
                <path d="M0 0h1v15h15v1H0zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.9l-3.613 4.417a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 4.402a.5.5 0 0 1-.768-.638l4-4.819a.5.5 0 0 1 .757-.033L10 8.24l3.445-4.207H10.5a.5.5 0 0 1-.5-.5" />
            </svg>
        ),
        number: "120+",
        title: "Models Deployed",
        subtitle: "Production ML models delivering business impact",
        gradient: "blue",
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 8c.828 0 1.5-.895 1.5-2S8.828 4 8 4s-1.5.895-1.5 2S7.172 8 8 8" />
                <path d="M11.953 8.81c-.195-3.388-.968-5.507-1.777-6.819C9.707 1.233 9.23.751 8.857.454a3.5 3.5 0 0 0-.463-.315A2 2 0 0 0 8.25.064.55.55 0 0 0 8 0a.55.55 0 0 0-.266.073 2 2 0 0 0-.142.08 4 4 0 0 0-.459.33c-.37.308-.844.803-1.31 1.57-.805 1.322-1.577 3.433-1.774 6.756l-1.497 1.826-.004.005A2.5 2.5 0 0 0 2 12.202V15.5a.5.5 0 0 0 .9.3l1.125-1.5c.166-.222.42-.4.752-.57.214-.108.414-.192.625-.281l.198-.084c.7.428 1.55.635 2.4.635s1.7-.207 2.4-.635q.1.044.196.083c.213.09.413.174.627.282.332.17.586.348.752.57l1.125 1.5a.5.5 0 0 0 .9-.3v-3.298a2.5 2.5 0 0 0-.548-1.562z" />
            </svg>
        ),
        number: "94%",
        title: "Prediction Accuracy",
        subtitle: "Average accuracy across deployed forecasting models",
        gradient: "purple",
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
                <path d="M9.669.864 8 0 6.331.864l-1.858.282-.842 1.68-1.337 1.32L2.6 6l-.306 1.854 1.337 1.32.842 1.68 1.858.282L8 12l1.669-.864 1.858-.282.842-1.68 1.337-1.32L13.4 6l.306-1.854-1.337-1.32-.842-1.68zm1.196 1.193.684 1.365 1.086 1.072L12.387 6l.248 1.506-1.086 1.072-.684 1.365-1.51.229L8 10.874l-1.355-.702-1.51-.229-.684-1.365-1.086-1.072L3.614 6l-.25-1.506 1.087-1.072.684-1.365 1.51-.229L8 1.126l1.356.702z" />
            </svg>
        ),
        number: "40%",
        title: "Faster Decisions",
        subtitle: "Reduced time-to-insight with live BI dashboards",
        gradient: "orange",
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 1a5 5 0 0 0-5 5v1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a6 6 0 1 1 12 0v6a2.5 2.5 0 0 1-2.5 2.5H9.366a1 1 0 0 1-.866.5h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 .866.5H11.5A1.5 1.5 0 0 0 13 12h-1a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h1V6a5 5 0 0 0-5-5" />
            </svg>
        ),
        number: "24/7",
        title: "Model Monitoring",
        subtitle: "Continuous drift detection and retraining support",
        gradient: "green",
    },
];

const features = [
    "Custom machine learning models built on your data — forecasting, classification, recommendation",
    "Generative AI and LLM integration connected to Salesforce and enterprise systems",
    "Business intelligence dashboards for real-time, self-serve reporting",
    "End-to-end MLOps: model deployment, monitoring, drift detection and retraining",
    "Data engineering and pipeline design to feed clean, reliable data into every model",
];


const services = [
    {
        icon: Brain,
        title: "Machine Learning Models",
        description:
            "Custom-built forecasting, classification and recommendation models trained on your business data.",
        iconBg: "bg-blue-100",
        gradientBar: "from-blue-500 to-blue-300",
    },
    {
        icon: Bot,
        title: "Generative AI & LLMs",
        description:
            "Deploy generative AI assistants and LLM-powered workflows connected directly to your CRM and data.",
        iconBg: "bg-green-100",
        gradientBar: "from-green-500 to-green-300",
    },
    {
        icon: Database,
        title: "Data Engineering",
        description:
            "Build reliable data pipelines that clean, transform and centralize data from every source system.",
        iconBg: "bg-orange-100",
        gradientBar: "from-orange-500 to-orange-300",
    },
    {
        icon: BarChart3,
        title: "BI Dashboards & Reporting",
        description:
            "Real-time business intelligence dashboards that turn raw data into decisions your teams can act on.",
        iconBg: "bg-purple-100",
        gradientBar: "from-purple-500 to-purple-300",
    },
    {
        icon: LineChart,
        title: "Predictive Analytics",
        description:
            "Forecast demand, churn and revenue with statistical and machine learning models tuned to your industry.",
        iconBg: "bg-yellow-100",
        gradientBar: "from-yellow-500 to-yellow-300",
    },
    {
        icon: Sparkles,
        title: "AI Strategy & Advisory",
        description:
            "Identify the highest-impact AI use cases for your business and build a practical roadmap to deliver them.",
        iconBg: "bg-cyan-100",
        gradientBar: "from-cyan-500 to-cyan-300",
    },
];

const dataScienceFaqs = [
    {
        q: 'Where can I find data science and AI consultants near me?',
        a: 'L2 Global provides data science, machine learning and AI consulting across USA, UK, Canada, Australia, Asia and Gulf (Dubai, Riyadh). 120+ models deployed. Free consultation at l2global.in/contact-us.'
    },
    {
        q: 'How much does a machine learning project cost?',
        a: 'Single model builds typically range £10,000–£45,000 depending on data readiness and complexity. Free scoping consultation available.'
    },
    {
        q: 'Can you connect AI models to our Salesforce or SAP data?',
        a: 'Yes. We specialise in connecting machine learning and generative AI models directly to Salesforce, SAP and other enterprise systems.'
    },
    {
        q: 'How long does a typical data science engagement take?',
        a: 'Typical model builds run 6–12 weeks from data discovery to production deployment. Free consultation to scope your project.'
    },
]


const DataScienceContainer = () => {
    return (
        <div>
            <ServiceHeroSection
                image={DataScienceImg}
                sectionTitle={'Data Science & AI'}
                titleBefore={'Turn Data Into'}
                titleAfter={''}
                linearText={'Decisions'}
                description={'Data science, machine learning and generative AI experts serving USA, UK, Canada, Australia, Asia and Gulf businesses. Custom ML models, BI dashboards and AI assistants connected to Salesforce, SAP and your enterprise data in London, New York and Dubai. 120+ models deployed. Free consultation.'}
                tag1={'Certified Data Scientists'} tag2={'MLOps Ready'} tag3={'24/7 Support'} />

            <ServiceKPISection stats={stats} />

            <ServiceAboutSection image={DataScienceAbout} titleBefore={'Why'} titleAfter={'Matters'} linearText={'Data Science'}
                description={'Data is only valuable when it drives better decisions. Our data science and AI experts turn raw, scattered data into forecasting models, generative AI assistants and live dashboards that your teams can trust and act on every day, reducing guesswork and accelerating growth.'} features={features} />

            <ServiceExpertiseSection services={services} />

            <ServiceProcessSteps />

            <ServiceServedIndustries />

            <ServiceWhyChooseUs />

            <ServiceRegions serviceName='Data Science & Machine Learning' />

            <ServiceFAQ faqs={dataScienceFaqs} serviceName='Data Science & Machine Learning' />

            <div className=' pt-2 md:pt-8 lg:pt-12'>
                <HeroCTA
                    tag="Let's Grow Together"
                    heading="Ready to Turn Data Into Decisions?"
                    description="Partner with L2 Global for machine learning, generative AI and BI dashboards built on your real business data."
                    primaryBtnText="Discuss Your Data & AI Project"
                    primaryBtnLink="/contact-us"
                    secondaryBtnText="View Services"
                    secondaryBtnLink="/services"
                />

            </div>
        </div>
    )
}

export default DataScienceContainer
