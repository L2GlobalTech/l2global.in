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
import { BarChart3, Cloud, Database, GitMerge, Shield, Zap, Server, Settings, Cpu, Layers } from 'lucide-react'
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
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 8c.828 0 1.5-.895 1.5-2S8.828 4 8 4s-1.5.895-1.5 2S7.172 8 8 8" />
                <path d="M11.953 8.81c-.195-3.388-.968-5.507-1.777-6.819C9.707 1.233 9.23.751 8.857.454a3.5 3.5 0 0 0-.463-.315A2 2 0 0 0 8.25.064.55.55 0 0 0 8 0a.55.55 0 0 0-.266.073 2 2 0 0 0-.142.08 4 4 0 0 0-.459.33c-.37.308-.844.803-1.31 1.57-.805 1.322-1.577 3.433-1.774 6.756l-1.497 1.826-.004.005A2.5 2.5 0 0 0 2 12.202V15.5a.5.5 0 0 0 .9.3l1.125-1.5c.166-.222.42-.4.752-.57.214-.108.414-.192.625-.281l.198-.084c.7.428 1.55.635 2.4.635s1.7-.207 2.4-.635q.1.044.196.083c.213.09.413.174.627.282.332.17.586.348.752.57l1.125 1.5a.5.5 0 0 0 .9-.3v-3.298a2.5 2.5 0 0 0-.548-1.562zM12 10.445v.055c0 .866-.284 1.585-.75 2.14.146.064.292.13.425.199.39.197.8.46 1.1.86L13 14v-1.798a1.5 1.5 0 0 0-.327-.935zM4.75 12.64C4.284 12.085 4 11.366 4 10.5v-.054l-.673.82a1.5 1.5 0 0 0-.327.936V14l.225-.3c.3-.4.71-.664 1.1-.861.133-.068.279-.135.425-.199M8.009 1.073q.096.06.226.163c.284.226.683.621 1.09 1.28C10.137 3.836 11 6.237 11 10.5c0 .858-.374 1.48-.943 1.893C9.517 12.786 8.781 13 8 13s-1.517-.214-2.057-.607C5.373 11.979 5 11.358 5 10.5c0-4.182.86-6.586 1.677-7.928.409-.67.81-1.082 1.096-1.32q.136-.113.236-.18Z" />
                <path d="M9.479 14.361c-.48.093-.98.139-1.479.139s-.999-.046-1.479-.139L7.6 15.8a.5.5 0 0 0 .8 0z" />
            </svg>
        ),
        number: "180+",
        title: "Enterprise Deployments",
        subtitle: "Across industries & global regions",
        gradient: "blue",
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
                <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
            </svg>
        ),
        number: "99.9%",
        title: "Client Satisfaction",
        subtitle: "Proven reliability & adoption",
        gradient: "purple",
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
                <path d="M9.669.864 8 0 6.331.864l-1.858.282-.842 1.68-1.337 1.32L2.6 6l-.306 1.854 1.337 1.32.842 1.68 1.858.282L8 12l1.669-.864 1.858-.282.842-1.68 1.337-1.32L13.4 6l.306-1.854-1.337-1.32-.842-1.68zm1.196 1.193.684 1.365 1.086 1.072L12.387 6l.248 1.506-1.086 1.072-.684 1.365-1.51.229L8 10.874l-1.355-.702-1.51-.229-.684-1.365-1.086-1.072L3.614 6l-.25-1.506 1.087-1.072.684-1.365 1.51-.229L8 1.126l1.356.702z" />
                <path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1z" />
            </svg>
        ),
        number: "40%",
        title: "Productivity Gain",
        subtitle: "Through intelligent workflows",
        gradient: "orange",
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 1a5 5 0 0 0-5 5v1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a6 6 0 1 1 12 0v6a2.5 2.5 0 0 1-2.5 2.5H9.366a1 1 0 0 1-.866.5h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 .866.5H11.5A1.5 1.5 0 0 0 13 12h-1a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h1V6a5 5 0 0 0-5-5" />
            </svg>
        ),
        number: "24/7",
        title: "Support & SLA",
        subtitle: "Enterprise-grade uptime & maintenance",
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

    const heroImg = (serviceData?.hero_image_id ? getMediaPublicUrl(serviceData.hero_image_id, 'services') : null) || fallbackImgs.hero
    const aboutImg = (serviceData?.about_image_id ? getMediaPublicUrl(serviceData.about_image_id, 'services') : null) || fallbackImgs.about

    // Dynamic Capabilities - only show integrated data
    const mappedServices = serviceData?.capabilities && serviceData.capabilities.length > 0
        ? serviceData.capabilities.map((cap: any, index: number) => {
            const IconComponent = defaultCapabilityIcons[index % defaultCapabilityIcons.length]
            const styling = defaultGradients[index % defaultGradients.length]
            return {
                icon: IconComponent,
                title: cap.title || 'Capability',
                description: cap.description || '',
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
                number: stat.value || '',
                title: stat.label || '',
                subtitle: stat.sub_label || '',
                gradient: defaultStat.gradient,
            }
        })
        : []

    // Dynamic Features - only show integrated data
    const features = serviceData?.about_features && serviceData.about_features.length > 0
        ? serviceData.about_features
        : []

    // Dynamic FAQs - only show integrated data
    const mappedFaqs = serviceData?.faqs && serviceData.faqs.length > 0
        ? serviceData.faqs.map((f: any) => ({
            q: f.question || f.q || '',
            a: f.answer || f.a || '',
        }))
        : []

    const serviceTitle = serviceData?.title || 'Enterprise Solutions'

    return (
        <div>
            <ServiceHeroSection
                image={heroImg}
                sectionTitle={serviceData?.badge_text || serviceTitle}
                titleBefore={serviceData?.hero_title || 'Scalable & Intelligent'}
                titleAfter={serviceData?.hero_logo_text || 'Solutions'}
                linearText={serviceData?.hero_highlight || serviceTitle}
                description={serviceData?.hero_description || 'Empower your business with tailored transformation, automated workflows, and enterprise-grade cloud solutions.'}
                tag1={serviceData?.hero_badges?.[0] || 'Certified Experts'}
                tag2={serviceData?.hero_badges?.[1] || 'Enterprise Grade'}
                tag3={serviceData?.hero_badges?.[2] || '24/7 Support'}
            />

            {mappedStats.length > 0 && <ServiceKPISection stats={mappedStats} />}

            <ServiceAboutSection
                image={aboutImg}
                titleBefore={serviceData?.about_title || 'Why'}
                titleAfter={serviceData?.about_logo_text || 'Matters'}
                linearText={serviceData?.about_highlight || serviceTitle}
                description={serviceData?.about_description || 'Modernize your core business infrastructure with secure, high-performance IT solutions that streamline operations, reduce total cost of ownership, and scale seamlessly.'}
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
                    heading={serviceData?.cta_text || `Ready to Transform Your ${serviceTitle}?`}
                    description="Partner with L2 Global for implementation and consulting backed by 180+ deployments across the USA, UK, Canada, Australia, Asia and Gulf."
                    primaryBtnText={`Book a ${serviceTitle} Consultation`}
                    primaryBtnLink={serviceData?.cta_url || "/contact-us"}
                    secondaryBtnText="View All Services"
                    secondaryBtnLink="/services"
                />
            </div>
        </div>
    )
}

export default ServiceDetailContainer
