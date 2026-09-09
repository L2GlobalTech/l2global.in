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
import { Server, Cloud, GitMerge, BarChart3, Shield, Zap, Rocket, Users, Award, Headphones } from "lucide-react";
import awsImg from '../../public/assets/web/Service-detail/aws-service-img.png'
import awsAbout from '../../public/assets/web/Service-detail/AWS-About.png'
import ServiceRegions from '@/components/web/services/ServiceRegions'
import ServiceFAQ from '@/components/web/services/ServiceFAQ'
import { ServiceRecord } from '@/types/cms'
import { getPublicServiceBySlug } from '@/app/(asgard)/asgard/services/action'
import { getMediaPublicUrl } from '@/actions/mediaAction'

interface AwsContainerProps {
    initialData?: ServiceRecord | null
}

const defaultStats = [
    {
        icon: <Rocket className="w-5 h-5 text-white" />,
        number: "180+",
        title: "Cloud Migrations Completed",
        subtitle: "Seamless AWS adoption across enterprises",
        gradient: "blue",
    },
    {
        icon: <Users className="w-5 h-5 text-white" />,
        number: "99.9%",
        title: "Uptime & Reliability",
        subtitle: "High-availability systems",
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
];

const defaultFeatures = [
    "End-to-end cloud migration, modernization, and deployment",
    "Integration with SaaS applications, enterprise systems, and on-premises workloads",
    "Serverless architectures, EC2, Lambda, and container solutions",
    "Continuous monitoring, security, and cost optimization",
    "Scalable solutions with AWS cloud-native services and automation",
];

const defaultServices = [
    {
        icon: Cloud,
        title: "Cloud Migration & Modernization",
        description:
            "Seamlessly migrate and modernize enterprise workloads to AWS for scalability, security, and cost efficiency.",
        iconBg: "bg-blue-100",
        gradientBar: "from-blue-500 to-blue-300",
    },
    {
        icon: Server,
        title: "Infrastructure & DevOps",
        description:
            "Design, deploy, and manage AWS infrastructure with best-practice DevOps automation and CI/CD pipelines.",
        iconBg: "bg-green-100",
        gradientBar: "from-green-500 to-green-300",
    },
    {
        icon: GitMerge,
        title: "System & Application Integration",
        description:
            "Integrate cloud and on-premises systems, APIs, and SaaS platforms for seamless enterprise workflows.",
        iconBg: "bg-orange-100",
        gradientBar: "from-orange-500 to-orange-300",
    },
    {
        icon: BarChart3,
        title: "Analytics & Monitoring",
        description:
            "Leverage AWS analytics, CloudWatch, and data services to gain real-time insights and operational intelligence.",
        iconBg: "bg-purple-100",
        gradientBar: "from-purple-500 to-purple-300",
    },
    {
        icon: Shield,
        title: "Security & Compliance",
        description:
            "Implement enterprise-grade security with IAM, encryption, compliance frameworks, and threat monitoring.",
        iconBg: "bg-yellow-100",
        gradientBar: "from-yellow-500 to-yellow-300",
    },
    {
        icon: Zap,
        title: "Performance Optimization",
        description:
            "Optimize cloud performance through auto-scaling, resource tuning, and cost-efficient infrastructure design.",
        iconBg: "bg-cyan-100",
        gradientBar: "from-cyan-500 to-cyan-300",
    },
];

const defaultFaqs = [
    { q: 'Where can I find AWS cloud services in the UK?', a: 'L2 Global has AWS certified cloud consultants serving London, Manchester and all UK regions. Free AWS assessment available.' },
    { q: 'Do you offer AWS migration services in Dubai?', a: 'Yes, we provide AWS cloud migration, DevOps and architecture services across Dubai and GCC. We have 99.9% success rate on migration projects.' },
    { q: 'What are your AWS service charges in the USA?', a: 'Pricing varies by project scope. A typical enterprise AWS migration ranges from $25,000–$200,000. Request free consultation at l2global.in/contact-us.' },
    { q: 'What is the typical timeline for an AWS migration?', a: 'Medium-sized migrations take 2–4 months. Large transformations: 6–12 months. Our team ensures 35%+ faster deployment through automation.' },
    { q: 'Do you provide 24/7 AWS support?', a: 'Yes. L2 Global provides 24/7 monitoring and managed cloud services for AWS environments in USA, UK, Canada, Australia, Asia and Gulf.' },
    { q: 'Can you help with AWS cost optimization?', a: 'Yes. Our AWS FinOps specialists identify savings up to 30% through rightsizing, reserved instances and automation. Free AWS cost assessment available.' },
];

const AwsContainer: React.FC<AwsContainerProps> = ({ initialData }) => {
    const [serviceData, setServiceData] = useState<ServiceRecord | null>(initialData || null)

    useEffect(() => {
        let isMounted = true
        getPublicServiceBySlug('cloud-devops-consulting').then((data) => {
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
                number: extractString(stat?.value, defaultStat.number),
                title: extractString(stat?.label, defaultStat.title),
                subtitle: extractString(stat?.sub_label || stat?.description, defaultStat.subtitle),
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

    const heroImg = (serviceData?.hero_image_id ? getMediaPublicUrl(serviceData.hero_image_id, 'services') : null) || awsImg
    const aboutImg = (serviceData?.about_image_id ? getMediaPublicUrl(serviceData.about_image_id, 'services') : null) || awsAbout

    return (
        <div>
            <ServiceHeroSection
                image={heroImg}
                sectionTitle={extractString(serviceData?.badge_text, 'Cloud Transformation')}
                title={extractString(serviceData?.hero_title, '')}
                titleBefore={extractString(serviceData?.hero_title, 'Scalable & Secure')}
                titleAfter={extractString(serviceData?.hero_logo_text, 'Services')}
                linearText={extractString(serviceData?.hero_highlight, 'AWS Cloud')}
                description={extractString(serviceData?.hero_description, 'Certified AWS cloud consultants serving UK (London, Manchester), USA (New York, Texas) and Gulf (Dubai, Abu Dhabi, Riyadh). Cloud migration, DevOps, architecture design and managed cloud services. Free cloud assessment.')}
                tag1={extractString(serviceData?.hero_badges?.[0], 'ISO Certified')}
                tag2={extractString(serviceData?.hero_badges?.[1], 'Enterprise Grade')}
                tag3={extractString(serviceData?.hero_badges?.[2], '24/7 Support')}
            />

            <ServiceKPISection stats={mappedStats} />

            <ServiceAboutSection
                image={aboutImg}
                title={extractString(serviceData?.about_title, '')}
                titleBefore={extractString(serviceData?.about_title, 'Why')}
                titleAfter={extractString(serviceData?.about_logo_text, 'Services Matter')}
                linearText={extractString(serviceData?.about_highlight, 'AWS Cloud')}
                description={extractString(serviceData?.about_description, 'AWS provides the foundation for modern, scalable enterprises—enabling secure, flexible, and cost-efficient cloud infrastructure. Our certified AWS experts leverage deep industry knowledge and best-practice frameworks to help you accelerate cloud adoption, optimize performance, and drive digital transformation.')}
                features={features}
            />

            <ServiceExpertiseSection services={mappedServices} />

            <ServiceProcessSteps />

            <ServiceServedIndustries />

            <ServiceWhyChooseUs />

            <ServiceRegions serviceName='AWS Cloud Services' />

            <ServiceFAQ faqs={mappedFaqs} serviceName='AWS Cloud Services' />

            <div className='pt-2 md:pt-8 lg:pt-12'>
                <HeroCTA
                    tag="Let's Grow Together"
                    heading={serviceData?.cta_text || "Ready to Move to the Cloud?"}
                    description="Partner with L2 Global for AWS migration, architecture and DevOps that keeps your infrastructure secure, scalable and cost-efficient."
                    primaryBtnText="Book an AWS Consultation"
                    primaryBtnLink={serviceData?.cta_url || "/contact-us"}
                    secondaryBtnText="View Services"
                    secondaryBtnLink="/services"
                />
            </div>
        </div>
    )
}

export default AwsContainer