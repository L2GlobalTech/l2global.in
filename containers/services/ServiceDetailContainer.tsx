'use client'

import React, { useState, useEffect } from 'react'
import ServiceHeroSection from '@/components/web/services/ServiceHeroSection'
import ServiceKPISection from '@/components/web/services/ServiceKPISection'
import ServiceAboutSection from '@/components/web/services/ServiceAboutSection'
import ServiceExpertiseSection from '@/components/web/services/ServiceExpertiseSection'
import HeroCTA from '@/components/web/HeroCTA'
import ServiceProcessSteps from '@/components/web/services/ServiceProcessSteps'
import ServiceRegions from '@/components/web/services/ServiceRegions'
import ServiceServedIndustries from '@/components/web/services/ServiceServedIndustries'
import ServiceWhyChooseUs from '@/components/web/services/ServiceWhyChooseUs'
import ServiceFAQ from '@/components/web/services/ServiceFAQ'
import { BarChart3, Cloud, Database, GitMerge, Shield, Zap, Server, Settings, Cpu, Layers, Rocket, Users, Award, Headphones } from 'lucide-react'
import { ServiceRecord } from '@/types/cms'
import { getPublicServiceBySlug } from '@/app/(asgard)/asgard/services/action'
import { getMediaPublicUrl } from '@/actions/mediaAction'

// Fallback images
import salesforceHeroImg from '@/public/assets/web/Service-detail/salesforce-img.png'
import salesforceAboutImg from '@/public/assets/web/Service-detail/salesforces-about.png'
import oracleHeroImg from '@/public/assets/web/Service-detail/oracle-service-img.png'
import oracleAboutImg from '@/public/assets/web/Service-detail/oracle-about.png'
import awsHeroImg from '@/public/assets/web/Service-detail/aws-service-img.png'
import awsAboutImg from '@/public/assets/web/Service-detail/AWS-About.png'
import sapHeroImg from '@/public/assets/web/Service-detail/sap-service-img.png'
import sapAboutImg from '@/public/assets/web/Service-detail/SAP-About.png'
import mulesoftHeroImg from '@/public/assets/web/Service-detail/mulesoft-service-img.png'
import mulesoftAboutImg from '@/public/assets/web/Service-detail/Mulesoft-About.png'

interface ServiceDetailContainerProps {
    service?: ServiceRecord | null
    slug: string
}

const getFallbackImages = (slugOrTitle: string) => {
    const key = (slugOrTitle || '').toLowerCase()
    if (key.includes('salesforce') || key.includes('crm')) {
        return { hero: salesforceHeroImg, about: salesforceAboutImg }
    }
    if (key.includes('oracle') || key.includes('dba')) {
        return { hero: oracleHeroImg, about: oracleAboutImg }
    }
    if (key.includes('aws') || key.includes('cloud') || key.includes('devops')) {
        return { hero: awsHeroImg, about: awsAboutImg }
    }
    if (key.includes('sap') || key.includes('s4hana') || key.includes('joule')) {
        return { hero: sapHeroImg, about: sapAboutImg }
    }
    if (key.includes('mule') || key.includes('api') || key.includes('integration')) {
        return { hero: mulesoftHeroImg, about: mulesoftAboutImg }
    }
    return { hero: salesforceHeroImg, about: salesforceAboutImg }
}

const defaultStats = [
    {
        icon: <Rocket className="w-5 h-5 text-white" />,
        number: "180+",
        title: "Enterprise Deployments",
        subtitle: "Across industries & global regions",
        gradient: "blue",
    },
    {
        icon: <Users className="w-5 h-5 text-white" />,
        number: "99.9%",
        title: "Client Satisfaction",
        subtitle: "Proven reliability & adoption",
        gradient: "purple",
    },
    {
        icon: <Award className="w-5 h-5 text-white" />,
        number: "35%",
        title: "Faster Deployment",
        subtitle: "Accelerated delivery",
        gradient: "orange",
    },
    {
        icon: <Headphones className="w-5 h-5 text-white" />,
        number: "24/7",
        title: "Monitoring & Support",
        subtitle: "Always-on cloud support",
        gradient: "green",
    },
]

const defaultCapabilityIcons = [Database, Cloud, GitMerge, BarChart3, Shield, Zap, Server, Settings]
const defaultGradients = [
    { bg: 'bg-blue-100', bar: 'from-blue-500 to-blue-300' },
    { bg: 'bg-green-100', bar: 'from-green-500 to-green-300' },
    { bg: 'bg-orange-100', bar: 'from-orange-500 to-orange-300' },
    { bg: 'bg-purple-100', bar: 'from-purple-500 to-purple-300' },
    { bg: 'bg-yellow-100', bar: 'from-yellow-500 to-yellow-300' },
    { bg: 'bg-cyan-100', bar: 'from-cyan-500 to-cyan-300' },
]

const ServiceDetailContainer: React.FC<ServiceDetailContainerProps> = ({ service: initialService, slug }) => {
    const [serviceData, setServiceData] = useState<ServiceRecord | null>(initialService || null)

    useEffect(() => {
        let isMounted = true
        getPublicServiceBySlug(slug).then((data) => {
            if (isMounted && data) {
                setServiceData(data)
            }
        }).catch(console.error)
        return () => { isMounted = false }
    }, [slug])

    const fallbackImgs = getFallbackImages(slug || serviceData?.title || '')

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

    const heroImg = (serviceData?.hero_image_id ? getMediaPublicUrl(serviceData.hero_image_id, 'services') : null) || fallbackImgs.hero
    const aboutImg = (serviceData?.about_image_id ? getMediaPublicUrl(serviceData.about_image_id, 'services') : null) || fallbackImgs.about

    // Dynamic Capabilities - only show integrated data
    const mappedServices = serviceData?.capabilities && serviceData.capabilities.length > 0
        ? serviceData.capabilities.map((cap: any, index: number) => {
            const IconComponent = defaultCapabilityIcons[index % defaultCapabilityIcons.length]
            const styling = defaultGradients[index % defaultGradients.length]
            return {
                icon: IconComponent,
                title: extractString(cap?.title, 'Capability'),
                description: extractString(cap?.description, ''),
                iconBg: styling.bg,
                gradientBar: styling.bar,
            }
        })
        : []

    // Dynamic Stats - only show integrated data
    const mappedStats = serviceData?.results_stats && serviceData.results_stats.length > 0
        ? serviceData.results_stats.map((stat: any, index: number) => {
            const defaultStat = defaultStats[index % defaultStats.length]
            return {
                icon: defaultStat.icon,
                number: extractString(stat?.value, ''),
                title: extractString(stat?.label, ''),
                subtitle: extractString(stat?.sub_label, ''),
                gradient: defaultStat.gradient,
            }
        })
        : []

    // Dynamic Features - only show integrated data
    const features: string[] = serviceData?.about_features && Array.isArray(serviceData.about_features)
        ? serviceData.about_features
            .map((f: any) => extractString(f, ''))
            .filter((f: string) => f.length > 0)
        : []

    // Dynamic FAQs - only show integrated data
    const mappedFaqs = serviceData?.faqs && serviceData.faqs.length > 0
        ? serviceData.faqs.map((f: any) => ({
            q: extractString(f?.question || f?.q, ''),
            a: extractString(f?.answer || f?.a, ''),
        })).filter((f: any) => f.q.length > 0)
        : []

    const serviceTitle = extractString(serviceData?.title, 'Enterprise Solutions')

    return (
        <div>
            <ServiceHeroSection
                image={heroImg}
                sectionTitle={extractString(serviceData?.badge_text, serviceTitle)}
                title={extractString(serviceData?.hero_title, '')}
                titleBefore={extractString(serviceData?.hero_title, 'Scalable & Intelligent')}
                titleAfter={extractString(serviceData?.hero_logo_text, 'Solutions')}
                linearText={extractString(serviceData?.hero_highlight, '')}
                description={extractString(serviceData?.hero_description, 'Empower your business with tailored transformation, automated workflows, and enterprise-grade cloud solutions.')}
                tag1={extractString(serviceData?.hero_badges?.[0], 'Certified Experts')}
                tag2={extractString(serviceData?.hero_badges?.[1], 'Enterprise Grade')}
                tag3={extractString(serviceData?.hero_badges?.[2], '24/7 Support')}
            />

            {mappedStats.length > 0 && <ServiceKPISection stats={mappedStats} />}

            <ServiceAboutSection
                image={aboutImg}
                title={extractString(serviceData?.about_title, '')}
                titleBefore={extractString(serviceData?.about_title, '')}
                titleAfter={extractString(serviceData?.about_logo_text, '')}
                linearText={extractString(serviceData?.about_highlight, '')}
                description={extractString(serviceData?.about_description, 'Modernize your core business infrastructure with secure, high-performance IT solutions that streamline operations, reduce total cost of ownership, and scale seamlessly.')}
                features={features}
            />

            {mappedServices.length > 0 && <ServiceExpertiseSection services={mappedServices} />}

            <ServiceProcessSteps />

            <ServiceServedIndustries />

            <ServiceWhyChooseUs />

            <ServiceRegions serviceName={serviceTitle} />

            {mappedFaqs.length > 0 && <ServiceFAQ faqs={mappedFaqs} serviceName={serviceTitle} />}

            <div className='pt-2 md:pt-8 lg:pt-12'>
                <HeroCTA
                    tag="Let's Grow Together"
                    heading={extractString(serviceData?.cta_text, `Ready to Transform Your ${serviceTitle}?`)}
                    description="Partner with L2 Global for implementation and consulting backed by 180+ deployments across the USA, UK, Canada, Australia, Asia and Gulf."
                    primaryBtnText={`Book a ${serviceTitle} Consultation`}
                    primaryBtnLink={extractString(serviceData?.cta_url, "/contact-us")}
                    secondaryBtnText="View All Services"
                    secondaryBtnLink="/services"
                />
            </div>
        </div>
    )
}

export default ServiceDetailContainer
