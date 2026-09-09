'use client'
import ServiceHeroSection from '@/components/web/services/ServiceHeroSection'
import React, { useState, useEffect } from 'react'
import sapImg from '../../public/assets/web/Service-detail/salesforce-img.png'
import sapAboutImg from '../../public/assets/web/Service-detail/salesforces-about.png'
import ServiceKPISection from '@/components/web/services/ServiceKPISection'
import ServiceAboutSection from '@/components/web/services/ServiceAboutSection'
import ServiceExpertiseSection from '@/components/web/services/ServiceExpertiseSection'
import HeroCTA from '@/components/web/HeroCTA'
import ServiceProcessSteps from '@/components/web/services/ServiceProcessSteps'
import ServiceRegions from '@/components/web/services/ServiceRegions'
import ServiceServedIndustries from '@/components/web/services/ServiceServedIndustries'
import ServiceWhyChooseUs from '@/components/web/services/ServiceWhyChooseUs'
import { BarChart3, Cloud, Database, GitMerge, Shield, Zap, Rocket, Users, Award, Headphones } from 'lucide-react'
import ServiceFAQ from '@/components/web/services/ServiceFAQ'
import { ServiceRecord } from '@/types/cms'
import { getPublicServiceBySlug } from '@/app/(asgard)/asgard/services/action'
import { getMediaPublicUrl } from '@/actions/mediaAction'

interface SalesForceContainerProps {
    initialData?: ServiceRecord | null
}

const defaultFeatures = [
    "End-to-end Salesforce CRM implementation and customization",
    "Seamless integration with SAP, MuleSoft, and third-party systems",
    "Custom development using Apex, Lightning, and Salesforce APIs",
    "Sales, Service, and Marketing Cloud configuration",
    "Automation of workflows, approvals, and business processes",
];

const defaultServices = [
    {
        icon: Database,
        title: "Salesforce Implementation",
        description:
            "End-to-end Salesforce setup tailored to your business processes, ensuring seamless CRM adoption and scalability.",
        iconBg: "bg-blue-100",
        gradientBar: "from-blue-500 to-blue-300",
    },
    {
        icon: Cloud,
        title: "Salesforce Cloud Solutions",
        description:
            "Leverage Sales Cloud, Service Cloud, and Marketing Cloud to enhance customer engagement and business efficiency.",
        iconBg: "bg-green-100",
        gradientBar: "from-green-500 to-green-300",
    },
    {
        icon: GitMerge,
        title: "CRM Integration",
        description:
            "Integrate Salesforce with SAP, APIs, and enterprise tools to create a unified data ecosystem.",
        iconBg: "bg-orange-100",
        gradientBar: "from-orange-500 to-orange-300",
    },
    {
        icon: BarChart3,
        title: "Analytics & Reporting",
        description:
            "Gain real-time insights with advanced dashboards, reports, and Salesforce analytics tools.",
        iconBg: "bg-purple-100",
        gradientBar: "from-purple-500 to-purple-300",
    },
    {
        icon: Shield,
        title: "Security & Compliance",
        description:
            "Ensure data security with role-based access, governance controls, and compliance best practices.",
        iconBg: "bg-yellow-100",
        gradientBar: "from-yellow-500 to-yellow-300",
    },
    {
        icon: Zap,
        title: "Automation & Optimization",
        description:
            "Boost productivity with workflow automation, process builder, and performance optimization strategies.",
        iconBg: "bg-cyan-100",
        gradientBar: "from-cyan-500 to-cyan-300",
    },
];

const defaultStats = [
    {
        icon: <Rocket className="w-5 h-5 text-white" />,
        number: "120+",
        title: "Salesforce Projects Delivered",
        subtitle: "Across industries & business sizes",
        gradient: "blue",
    },
    {
        icon: <Users className="w-5 h-5 text-white" />,
        number: "98%",
        title: "Customer Satisfaction",
        subtitle: "Improved CRM adoption & engagement",
        gradient: "purple",
    },
    {
        icon: <Award className="w-5 h-5 text-white" />,
        number: "40%",
        title: "Increase in Sales Productivity",
        subtitle: "Through automation & CRM optimization",
        gradient: "orange",
    },
    {
        icon: <Headphones className="w-5 h-5 text-white" />,
        number: "24/7",
        title: "Support & Monitoring",
        subtitle: "Continuous Salesforce optimization",
        gradient: "green",
    },
];

const defaultFaqs = [
    {
        q: 'Where can I find a Salesforce consultant near me in the UK?',
        a: 'L2 Global Technologies provides certified Salesforce consultants across London, Manchester, Birmingham and all UK regions — remote and on-site.',
    },
    {
        q: 'How much does Salesforce consulting cost in the UK?',
        a: 'UK Salesforce rates: £750–£1,500/day. Full implementations £8,000–£250,000+.',
    },
    {
        q: 'Can you integrate Salesforce with my existing ERP (SAP, Oracle, NetSuite)?',
        a: 'Yes. We build bi-directional integrations using MuleSoft, REST APIs, and native connectors for SAP, Oracle, NetSuite, and other core business systems.',
    },
    {
        q: 'How long does a typical Salesforce implementation take?',
        a: 'Quick Start implementations: 2–4 weeks. Complex enterprise deployments with multiple clouds: 3–6 months. We provide detailed timeline estimates after discovery.',
    },
    {
        q: 'Do you offer ongoing Salesforce managed services and support?',
        a: 'Yes. We provide tiered support (24/7 or business hours), admin-as-a-service, continuous optimization, user training, and seasonal release management.',
    },
];

export default function SalesForceContainer({ initialData }: SalesForceContainerProps) {
    const [serviceData, setServiceData] = useState<ServiceRecord | null>(initialData || null)

    useEffect(() => {
        if (!initialData) {
            getPublicServiceBySlug('salesforce').then(data => {
                if (data) setServiceData(data)
            })
        }
    }, [initialData])

    // Map Dynamic Services/Capabilities if present in Supabase
    const mappedServices = serviceData?.capabilities && serviceData.capabilities.length > 0
        ? serviceData.capabilities.map((cap: any, index: number) => {
            const defaultItem = defaultServices[index % defaultServices.length]
            return {
                icon: defaultItem.icon,
                title: cap.title || defaultItem.title,
                description: cap.description || defaultItem.description,
                iconBg: defaultItem.iconBg,
                gradientBar: defaultItem.gradientBar,
            }
        })
        : defaultServices

    const extractString = (val: any, fallback: string = ''): string => {
        if (val === null || val === undefined) return fallback;
        if (typeof val === 'string') return val;
        if (typeof val === 'number') return String(val);
        if (typeof val === 'object') {
            if (typeof val.text === 'string') return val.text;
            if (typeof val.label === 'string') return val.label;
            if (typeof val.title === 'string') return val.title;
            if (typeof val.name === 'string') return val.name;
            if (typeof val.value === 'string' || typeof val.value === 'number') return String(val.value);
            return fallback;
        }
        return fallback;
    };

    // Map Dynamic Stats if present in Supabase
    const mappedStats = serviceData?.results_stats && serviceData.results_stats.length > 0
        ? serviceData.results_stats.map((stat: any, index: number) => {
            const defaultStat = defaultStats[index % defaultStats.length]
            return {
                icon: defaultStat.icon,
                number: extractString(stat?.value, defaultStat.number),
                title: extractString(stat?.label, defaultStat.title),
                subtitle: extractString(stat?.sub_label || stat?.description, defaultStat.subtitle),
                gradient: defaultStat.gradient,
            }
        })
        : defaultStats

    // Map Dynamic FAQs if present in Supabase
    const mappedFaqs = serviceData?.faqs && serviceData.faqs.length > 0
        ? serviceData.faqs.map((f: any) => ({
            q: f.question || f.q,
            a: f.answer || f.a,
        }))
        : defaultFaqs

    const features = serviceData?.about_features && Array.isArray(serviceData.about_features) && serviceData.about_features.length > 0
        ? serviceData.about_features.map((f: any) => extractString(f)).filter(Boolean)
        : defaultFeatures

    const heroImg = (serviceData?.hero_image_id ? getMediaPublicUrl(serviceData.hero_image_id, 'services') : null) || sapImg
    const aboutImg = (serviceData?.about_image_id ? getMediaPublicUrl(serviceData.about_image_id, 'services') : null) || sapAboutImg

    return (
        <div>
            <ServiceHeroSection
                image={heroImg}
                sectionTitle={extractString(serviceData?.badge_text, 'Salesforce Solutions')}
                title={extractString(serviceData?.hero_title, '')}
                titleBefore={extractString(serviceData?.hero_title, 'Scalable & Intelligent')}
                titleAfter={extractString(serviceData?.hero_logo_text, 'Solutions')}
                linearText={extractString(serviceData?.hero_highlight, 'Salesforce')}
                description={extractString(serviceData?.hero_description, 'Empower your business with Salesforce-driven transformation. From CRM implementation to automation and AI-powered insights, we help you streamline operations, boost customer engagement, and drive measurable growth.')}
                tag1={extractString(serviceData?.hero_badges?.[0], 'Certified Salesforce Experts')}
                tag2={extractString(serviceData?.hero_badges?.[1], 'End-to-End CRM Solutions')}
                tag3={extractString(serviceData?.hero_badges?.[2], '24/7 Support')}
            />

            <ServiceKPISection stats={mappedStats} />

            <ServiceAboutSection
                image={aboutImg}
                title={extractString(serviceData?.about_title, '')}
                titleBefore={extractString(serviceData?.about_title, 'Why')}
                titleAfter={extractString(serviceData?.about_logo_text, 'Integration Matters')}
                linearText={extractString(serviceData?.about_highlight, 'Salesforce')}
                description={extractString(serviceData?.about_description, 'Salesforce enables businesses to centralize customer data, automate workflows, and gain real-time insights across sales, marketing, and service operations. Our Salesforce experts help you unlock the full potential of CRM with seamless integrations, improved efficiency, and scalable solutions tailored to your business needs.')}
                features={features}
            />

            <ServiceExpertiseSection services={mappedServices} />

            <ServiceProcessSteps />

            <ServiceServedIndustries />

            <ServiceWhyChooseUs />

            <ServiceRegions serviceName='Salesforce Implementation & Consulting' />

            <ServiceFAQ faqs={mappedFaqs} serviceName='Salesforce Implementation & Consulting' />

            <div className='pt-2 md:pt-8 lg:pt-12'>
                <HeroCTA
                    tag="Let's Grow Together"
                    heading={serviceData?.cta_text || "Ready to Transform Your Salesforce?"}
                    description="Partner with L2 Global for Salesforce implementation and consulting backed by 180+ deployments across the USA, UK, Canada, Australia, Asia and Gulf."
                    primaryBtnText="Book a Salesforce Consultation"
                    primaryBtnLink={serviceData?.cta_url || "/contact-us"}
                    secondaryBtnText="View Services"
                    secondaryBtnLink="/services"
                />
            </div>
        </div>
    )
}