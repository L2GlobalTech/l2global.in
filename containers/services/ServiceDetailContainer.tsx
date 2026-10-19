'use client'

import React from 'react'
import { resolveServiceCta } from '@/lib/serviceCta'
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
import { getMediaPublicUrl } from '@/actions/mediaAction'
import { renderFormattedTitle } from '@/utils/highlightText'

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
    const serviceData = initialService

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
    const solutionsImg = serviceData?.solutions_image_id ? getMediaPublicUrl(serviceData.solutions_image_id, 'services') : null

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

    // Dynamic Features / Highlights - preserve structured objects and legacy strings
    const features = serviceData?.about_features && Array.isArray(serviceData.about_features)
        ? serviceData.about_features.filter((f: any) => {
            if (typeof f === 'string') return f.trim().length > 0;
            if (typeof f === 'object' && f !== null) return Boolean(f.description || f.title || f.text);
            return false;
        })
        : []

    // Dynamic FAQs - only show integrated data
    const mappedFaqs = serviceData?.faqs && serviceData.faqs.length > 0
        ? serviceData.faqs.map((f: any) => ({
            q: extractString(f?.question || f?.q, ''),
            a: extractString(f?.answer || f?.a, ''),
        })).filter((f: any) => f.q.length > 0 && f.a.length > 0)
        : []

    const serviceTitle = extractString(serviceData?.title, 'Enterprise Solutions')

    const solutionsTitle = extractString(serviceData?.solutions_title).trim()
    const solutionsHighlight = extractString(serviceData?.solutions_highlight).trim()
    const solutionsLogoText = extractString(serviceData?.solutions_logo_text).trim()
    const solutionsDesc = extractString(serviceData?.solutions_description).trim()
    const solutionsBadge = extractString(serviceData?.solutions_badge).trim()
    const solutionsBadges = Array.isArray(serviceData?.solutions_badges)
        ? serviceData.solutions_badges.map((b: any) => extractString(b).trim()).filter(Boolean)
        : []
    const hasSolutions = Boolean(solutionsDesc || solutionsTitle || solutionsHighlight || solutionsImg)

    return (
        <div>
            <ServiceHeroSection
                serviceName={serviceTitle}
                ctaLabel={extractString(serviceData?.hero_cta_text).trim() || 'Discuss Your Project'}
                image={heroImg}
                imageAlt={`${serviceTitle} illustration`}
                ctaHref={resolveServiceCta(serviceData?.hero_cta_url)}
                sectionTitle={extractString(serviceData?.badge_text, serviceTitle)}
                title={extractString(serviceData?.hero_title, serviceTitle)}
                titleBefore={extractString(serviceData?.hero_title, serviceTitle)}
                titleAfter={extractString(serviceData?.hero_logo_text, '')}
                linearText={extractString(serviceData?.hero_highlight, '')}
                description={extractString(serviceData?.hero_description, extractString(serviceData?.about_description))}
                tag1={extractString(serviceData?.hero_badges?.[0], '')}
                tag2={extractString(serviceData?.hero_badges?.[1], '')}
                tag3={extractString(serviceData?.hero_badges?.[2], '')}
            />

            {mappedStats.length > 0 && <ServiceKPISection stats={mappedStats} />}

            <ServiceAboutSection
                image={aboutImg}
                badge={extractString(serviceData?.about_badge, 'About the Service')}
                title={extractString(serviceData?.about_title, '')}
                titleBefore={extractString(serviceData?.about_title, '')}
                titleAfter={extractString(serviceData?.about_logo_text, '')}
                linearText={extractString(serviceData?.about_highlight, '')}
                description={extractString(serviceData?.about_description, '')}
                features={features}
                ctaText={extractString(serviceData?.about_cta_text).trim() || 'Get a quote'}
                ctaUrl={extractString(serviceData?.about_cta_url, '/contact-us')}
            />

            {mappedServices.length > 0 && <ServiceExpertiseSection services={mappedServices} />}

            {hasSolutions && (
                <section className="container mx-auto px-5 py-12 md:py-16 lg:py-20">
                    <div className={solutionsImg ? "grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center" : "max-w-4xl"}>
                        <div className={`w-full ${solutionsImg ? 'lg:col-span-7' : ''}`} data-aos="fade-right">
                            {solutionsBadge && (
                                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200/80 mb-4">
                                    <span className="w-2 h-2 rounded-full bg-[#195DF0] animate-pulse" />
                                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                                        {solutionsBadge}
                                    </span>
                                </div>
                            )}

                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0D1526] tracking-tight leading-snug">
                                {renderFormattedTitle({
                                    title: solutionsTitle || (!solutionsHighlight && !solutionsLogoText ? `${serviceTitle} Solutions` : ''),
                                    linearText: solutionsHighlight,
                                    titleAfter: solutionsLogoText,
                                    customClassName: 'bg-gradient-to-r from-[#195DF0] to-[#8152E0] bg-clip-text text-transparent inline',
                                })}
                            </h2>

                            {solutionsDesc && (
                                <p className="mt-4 sm:mt-5 text-sm sm:text-base text-[#707A8F] whitespace-pre-line leading-relaxed font-normal">
                                    {solutionsDesc}
                                </p>
                            )}

                            {solutionsBadges.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-6">
                                    {solutionsBadges.map((badgeText: string, idx: number) => (
                                        <span
                                            key={idx}
                                            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100"
                                        >
                                            {badgeText}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        {solutionsImg && (
                            <div
                                className="w-full lg:col-span-5 flex items-center justify-center mt-6 lg:mt-0"
                                data-aos="fade-left"
                                data-aos-delay="200"
                            >
                                <div className="relative w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200/80 bg-slate-50/50 shadow-md hover:shadow-xl transition-all duration-300">
                                    <img
                                        src={solutionsImg}
                                        alt={[solutionsTitle, solutionsHighlight, solutionsLogoText].filter(Boolean).join(' ') || `${serviceTitle} Solutions architecture`}
                                        className="w-full h-auto max-h-[460px] object-cover sm:object-contain lg:object-cover mx-auto"
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            )}

            <ServiceProcessSteps />

            <ServiceServedIndustries />

            <ServiceWhyChooseUs />

            <ServiceRegions serviceName={serviceTitle} />

            {mappedFaqs.length > 0 && <ServiceFAQ faqs={mappedFaqs} serviceName={serviceTitle} />}

            <div className='pt-2 md:pt-8 lg:pt-12'>
                <HeroCTA
                    tag="Let's Grow Together"
                    heading={extractString(serviceData?.cta_text, `Ready to Transform Your ${serviceTitle}?`)}
                    description="Discuss your project requirements with L2 Global."
                    primaryBtnText={`Discuss ${serviceTitle}`}
                    primaryBtnLink={resolveServiceCta(serviceData?.cta_url)}
                    secondaryBtnText="View All Services"
                    secondaryBtnLink="/services"
                />
            </div>
        </div>
    )
}

export default ServiceDetailContainer
