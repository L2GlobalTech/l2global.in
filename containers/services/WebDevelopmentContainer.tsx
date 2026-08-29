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
import { Code2, Smartphone, Search, ShoppingCart, Gauge, Palette } from "lucide-react";
import WebDevImg from '../../public/assets/web/Service-detail/web-development-hero.svg'
import WebDevAbout from '../../public/assets/web/Service-detail/web-development-about.svg'
import ServiceRegions from '@/components/web/services/ServiceRegions'
import ServiceFAQ from '@/components/web/services/ServiceFAQ'


const stats = [
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
                <path d="M5.854 4.146a.5.5 0 0 1 0 .708L2.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0m4.292 0a.5.5 0 0 0 0 .708L13.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0" />
            </svg>
        ),
        number: "150+",
        title: "Websites Delivered",
        subtitle: "Fixed-price B2B websites launched across industries",
        gradient: "blue",
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
                <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m9.5-5a.5.5 0 0 0-1 0v.55a2.5 2.5 0 0 0-1.5 4.474V9.5a.5.5 0 0 0 1 0V8.024A2.5 2.5 0 0 0 9.5 3.55z" />
            </svg>
        ),
        number: "1.8s",
        title: "Avg. Load Time",
        subtitle: "Performance-tuned builds for higher conversion",
        gradient: "purple",
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
                <path d="M9.669.864 8 0 6.331.864l-1.858.282-.842 1.68-1.337 1.32L2.6 6l-.306 1.854 1.337 1.32.842 1.68 1.858.282L8 12l1.669-.864 1.858-.282.842-1.68 1.337-1.32L13.4 6l.306-1.854-1.337-1.32-.842-1.68zm1.196 1.193.684 1.365 1.086 1.072L12.387 6l.248 1.506-1.086 1.072-.684 1.365-1.51.229L8 10.874l-1.355-.702-1.51-.229-.684-1.365-1.086-1.072L3.614 6l-.25-1.506 1.087-1.072.684-1.365 1.51-.229L8 1.126l1.356.702z" />
            </svg>
        ),
        number: "100",
        title: "SEO Score",
        subtitle: "SEO best practices built in from day one",
        gradient: "orange",
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 1a5 5 0 0 0-5 5v1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a6 6 0 1 1 12 0v6a2.5 2.5 0 0 1-2.5 2.5H9.366a1 1 0 0 1-.866.5h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 .866.5H11.5A1.5 1.5 0 0 0 13 12h-1a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h1V6a5 5 0 0 0-5-5" />
            </svg>
        ),
        number: "24/7",
        title: "Support & Uptime",
        subtitle: "Ongoing hosting, monitoring and maintenance",
        gradient: "green",
    },
];

const features = [
    "Custom B2B website design and development — fixed price, fixed timeline",
    "Built on modern frameworks (React, Next.js) for speed and scalability",
    "SEO best practices, structured data and performance optimisation built in",
    "Responsive design tested across devices, with CMS integration where needed",
    "Ongoing hosting, monitoring, security updates and support after launch",
];


const services = [
    {
        icon: Code2,
        title: "Custom Website Development",
        description:
            "Bespoke B2B websites built on modern frameworks, designed around your brand and conversion goals.",
        iconBg: "bg-blue-100",
        gradientBar: "from-blue-500 to-blue-300",
    },
    {
        icon: Palette,
        title: "UI/UX Design",
        description:
            "Clean, conversion-focused design systems that make your brand look credible from the first click.",
        iconBg: "bg-green-100",
        gradientBar: "from-green-500 to-green-300",
    },
    {
        icon: Smartphone,
        title: "Responsive & Mobile-First",
        description:
            "Every build is tested and tuned across desktop, tablet and mobile for a consistent experience.",
        iconBg: "bg-orange-100",
        gradientBar: "from-orange-500 to-orange-300",
    },
    {
        icon: Search,
        title: "SEO & Performance",
        description:
            "Technical SEO, structured data and performance optimisation built in from the first line of code.",
        iconBg: "bg-purple-100",
        gradientBar: "from-purple-500 to-purple-300",
    },
    {
        icon: ShoppingCart,
        title: "E-commerce & CMS",
        description:
            "Integrate e-commerce, booking or content management systems tailored to how your business operates.",
        iconBg: "bg-yellow-100",
        gradientBar: "from-yellow-500 to-yellow-300",
    },
    {
        icon: Gauge,
        title: "Hosting & Maintenance",
        description:
            "Ongoing hosting, monitoring, security patching and support to keep your site fast and secure.",
        iconBg: "bg-cyan-100",
        gradientBar: "from-cyan-500 to-cyan-300",
    },
];

const webDevFaqs = [
    {
        q: 'Where can I find web development services near me?',
        a: 'L2 Global provides B2B website design and development across USA, UK, Canada, Australia, Asia and Gulf (Dubai, Riyadh). 150+ websites delivered. Free consultation at l2global.in/contact-us.'
    },
    {
        q: 'How much does a business website cost in the UK?',
        a: 'Fixed-price B2B websites typically range £3,000–£20,000 depending on scope and features. Free scoping consultation available.'
    },
    {
        q: 'Do you build websites with SEO included?',
        a: 'Yes. SEO best practices, structured data and performance optimisation are built into every website by default.'
    },
    {
        q: 'How long does a website project take?',
        a: 'Typical B2B websites are delivered in 4–8 weeks depending on scope. Free consultation to scope your project.'
    },
]


const WebDevelopmentContainer = () => {
    return (
        <div>
            <ServiceHeroSection
                image={WebDevImg}
                sectionTitle={'Web Development'}
                titleBefore={'Fast, Fixed-Price'}
                titleAfter={''}
                linearText={'Websites'}
                description={'B2B website design and development experts serving USA, UK, Canada, Australia, Asia and Gulf businesses. Modern, SEO-built-in websites for companies in London, New York and Dubai. 150+ websites delivered, fixed price, fixed timeline. Free consultation.'}
                tag1={'Fixed Price'} tag2={'SEO Built-In'} tag3={'24/7 Support'} />

            <ServiceKPISection stats={stats} />

            <ServiceAboutSection image={WebDevAbout} titleBefore={'Why'} titleAfter={'Matters'} linearText={'Your Website'}
                description={'Your website is often the first impression a prospect has of your business. Our web development team builds fast, SEO-built-in, conversion-focused websites on modern frameworks — delivered at a fixed price and fixed timeline, with ongoing support after launch.'} features={features} />

            <ServiceExpertiseSection services={services} />

            <ServiceProcessSteps />

            <ServiceServedIndustries />

            <ServiceWhyChooseUs />

            <ServiceRegions serviceName='Website Design & Development' />

            <ServiceFAQ faqs={webDevFaqs} serviceName='Website Design & Development' />

            <div className=' pt-2 md:pt-8 lg:pt-12'>
                <HeroCTA
                    tag="Let's Grow Together"
                    heading="Ready for a Website That Converts?"
                    description="Partner with L2 Global for a fixed-price, SEO-built-in website delivered on a fixed timeline."
                    primaryBtnText="Discuss Your Website Project"
                    primaryBtnLink="/contact-us"
                    secondaryBtnText="View Services"
                    secondaryBtnLink="/services"
                />

            </div>
        </div>
    )
}

export default WebDevelopmentContainer
