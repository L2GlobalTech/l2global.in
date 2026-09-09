'use client'
import HeroCTA from '@/components/web/HeroCTA'
import ServiceAboutSection from '@/components/web/services/ServiceAboutSection'
import ServiceExpertiseSection from '@/components/web/services/ServiceExpertiseSection'
import ServiceHeroSection from '@/components/web/services/ServiceHeroSection'
import ServiceKPISection from '@/components/web/services/ServiceKPISection'
import ServiceProcessSteps from '@/components/web/services/ServiceProcessSteps'
import ServiceServedIndustries from '@/components/web/services/ServiceServedIndustries'
import ServiceWhyChooseUs from '@/components/web/services/ServiceWhyChooseUs'
import React, { useState, useEffect } from 'react'
import { Database, Settings, Cloud, ShieldCheck, Activity, HardDrive, Rocket, Users, Award, Headphones } from "lucide-react";
import oracleImg from '../../public/assets/web/Service-detail/oracle-service-img.png'
import OracleAbout from '../../public/assets/web/Service-detail/oracle-about.png'
import ServiceRegions from '@/components/web/services/ServiceRegions'
import ServiceFAQ from '@/components/web/services/ServiceFAQ'
import { ServiceRecord } from '@/types/cms'
import { getPublicServiceBySlug } from '@/app/(asgard)/asgard/services/action'
import { getMediaPublicUrl } from '@/actions/mediaAction'

interface OracleContainerProps {
    initialData?: ServiceRecord | null
}

const defaultStats = [
    {
        icon: <Rocket className="w-5 h-5 text-white" />,
        number: "180+",
        title: "Integrations Deployed",
        subtitle: "SAP–Salesforce ecosystems",
        gradient: "blue",
    },
    {
        icon: <Users className="w-5 h-5 text-white" />,
        number: "99.9%",
        title: "Data Accuracy",
        subtitle: "Real-time sync reliability",
        gradient: "purple",
    },
    {
        icon: <Award className="w-5 h-5 text-white" />,
        number: "35%",
        title: "Faster Order Cycle",
        subtitle: "Quote-to-cash automation",
        gradient: "orange",
    },
    {
        icon: <Headphones className="w-5 h-5 text-white" />,
        number: "24/7",
        title: "Integration Monitoring",
        subtitle: "Enterprise-grade support",
        gradient: "green",
    },
];

const defaultFeatures = [
    "24/7 monitoring and proactive issue resolution",
    "Database performance tuning and optimization",
    "Patch management and system upgrades",
    "Security governance and compliance support",
    "Cloud and on-premise operational management",
];

const defaultServices = [
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

const defaultFaqs = [
    {
        q: 'Where can I find Oracle DBA services near me?',
        a: 'L2 Global provides Oracle DBA and Oracle Cloud Infrastructure services across USA, UK, Canada, Australia, Asia and Gulf (Dubai, Riyadh). Free Oracle health check available.'
    },
    {
        q: 'Do you offer Oracle migration services to OCI?',
        a: 'Yes. We have migrated 150+ Oracle workloads to OCI with 99.9% success rate. Typical migration time: 4–8 weeks. Free consultation available.'
    },
    {
        q: 'What is the cost of Oracle managed services in the UK?',
        a: 'Monthly managed services start from £2,000–£10,000 per database depending on size and criticality. Enterprise programmes vary by scope. Free assessment available.'
    },
    {
        q: 'Do you provide 24/7 Oracle support for Oracle EBS?',
        a: 'Yes. L2 Global offers 24/7 monitoring and support for Oracle EBS, Fusion and standalone databases.'
    },
    {
        q: 'How can you reduce our Oracle costs?',
        a: 'We optimise Oracle licensing, automate routine tasks, rightsise cloud resources, and implement proactive maintenance to reduce TCO by up to 40%.'
    },
];

const OracleContainer: React.FC<OracleContainerProps> = ({ initialData }) => {
    const [serviceData, setServiceData] = useState<ServiceRecord | null>(initialData || null)

    useEffect(() => {
        let isMounted = true
        getPublicServiceBySlug('oracle-consulting-managed-services').then((data) => {
            if (isMounted && data) {
                setServiceData(data)
            }
        }).catch(console.error)
        return () => { isMounted = false }
    }, [])

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

    const mappedStats = serviceData?.results_stats && serviceData.results_stats.length > 0
        ? serviceData.results_stats.map((stat: any, index: number) => {
            const defaultStat = defaultStats[index % defaultStats.length]
            return {
                icon: defaultStat.icon,
                number: stat.value || defaultStat.number,
                title: stat.label || defaultStat.title,
                subtitle: defaultStat.subtitle,
                gradient: defaultStat.gradient,
            }
        })
        : defaultStats

    const mappedFaqs = serviceData?.faqs && serviceData.faqs.length > 0
        ? serviceData.faqs.map((f: any) => ({
            q: f.question || f.q,
            a: f.answer || f.a,
        }))
        : defaultFaqs

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

    const features = serviceData?.about_features && Array.isArray(serviceData.about_features) && serviceData.about_features.length > 0
        ? serviceData.about_features.map((f: any) => extractString(f)).filter(Boolean)
        : defaultFeatures

    const heroImg = (serviceData?.hero_image_id ? getMediaPublicUrl(serviceData.hero_image_id, 'services') : null) || oracleImg
    const aboutImg = (serviceData?.about_image_id ? getMediaPublicUrl(serviceData.about_image_id, 'services') : null) || OracleAbout

    return (
        <div>
            <ServiceHeroSection
                image={heroImg}
                sectionTitle={extractString(serviceData?.badge_text, 'Our Managed Services')}
                title={extractString(serviceData?.hero_title, '')}
                titleBefore={extractString(serviceData?.hero_title, 'Reliable Operations')}
                titleAfter={extractString(serviceData?.hero_logo_text, 'Proactive Performance')}
                linearText={extractString(serviceData?.hero_highlight, 'Oracle')}
                description={extractString(serviceData?.hero_description, '24/7 Oracle DBA and Oracle Cloud Infrastructure specialists near you. Serving London, New York, Dubai and all GCC countries remotely. Performance optimisation, security, OCI migration. Free Oracle health check.')}
                tag1={extractString(serviceData?.hero_badges?.[0], 'Oracle Monitoring')}
                tag2={extractString(serviceData?.hero_badges?.[1], 'Secure Operations')}
                tag3={extractString(serviceData?.hero_badges?.[2], '24/7 Support')}
            />

            <ServiceKPISection stats={mappedStats} />

            <ServiceAboutSection
                image={aboutImg}
                title={extractString(serviceData?.about_title, '')}
                titleBefore={extractString(serviceData?.about_title, 'Why')}
                titleAfter={extractString(serviceData?.about_logo_text, 'Managed Services Matter')}
                linearText={extractString(serviceData?.about_highlight, 'Oracle')}
                description={extractString(serviceData?.about_description, 'Oracle environments power mission-critical business operations. Our managed services ensure your Oracle databases, applications, and cloud infrastructure operate securely, efficiently, and without disruption.')}
                features={features}
            />

            <ServiceExpertiseSection services={mappedServices} />

            <ServiceProcessSteps />

            <ServiceServedIndustries />

            <ServiceWhyChooseUs />

            <ServiceRegions serviceName='Oracle Managed Services' />

            <ServiceFAQ faqs={mappedFaqs} serviceName='Oracle Managed Services' />

            <div className='pt-2 md:pt-8 lg:pt-12'>
                <HeroCTA
                    tag="Let's Grow Together"
                    heading={serviceData?.cta_text || "Ready for Reliable Oracle Support?"}
                    description="Partner with L2 Global for 24/7 Oracle DBA and Oracle Cloud Infrastructure support that keeps your systems running."
                    primaryBtnText="Book an Oracle Consultation"
                    primaryBtnLink={serviceData?.cta_url || "/contact-us"}
                    secondaryBtnText="View Services"
                    secondaryBtnLink="/services"
                />
            </div>
        </div>
    )
}

export default OracleContainer