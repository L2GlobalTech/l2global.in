'use client'
import Link from 'next/link'
import { ArrowUpRight, Bot, Sparkles, Cloud, Workflow, Database, Server, Users, BarChart3, Code2, GitMerge, RefreshCw, Wrench, CheckCircle2 } from 'lucide-react'
import HeroCTA from '@/components/web/HeroCTA'

const services = [
    {
        icon: Bot,
        title: 'Salesforce Agentforce AI',
        desc: 'Autonomous AI agents for sales and service, grounded in your Salesforce Data Cloud.',
        href: '/services/agentforce-ai',
    },
    {
        icon: Sparkles,
        title: 'SAP Joule AI Implementation',
        desc: 'Generative AI copilot embedded natively across S/4HANA, SuccessFactors and Ariba.',
        href: '/services/sap-ai',
    },
    {
        icon: RefreshCw,
        title: 'SAP S/4HANA & RISE with SAP',
        desc: 'ECC to S/4HANA migration and RISE with SAP cloud transition, managed end-to-end.',
        href: '/services/sap',
    },
    {
        icon: Users,
        title: 'Salesforce Consulting Services',
        desc: 'Salesforce implementation, customisation and managed support. 180+ deployments.',
        href: '/services/salesforce-services',
    },
    {
        icon: GitMerge,
        title: 'SAP & Salesforce Integration',
        desc: 'Real-time sync and process automation connecting SAP and Salesforce.',
        href: '/services/sap-link-by-salesforce',
    },
    {
        icon: Workflow,
        title: 'MuleSoft Integration Services',
        desc: 'Certified MuleSoft Anypoint Platform consultants. 250+ APIs delivered.',
        href: '/services/mulesoft',
    },
    {
        icon: Database,
        title: 'API Integration Services',
        desc: 'Enterprise API integration connecting Salesforce, SAP, Oracle, AWS and legacy systems.',
        href: '/services/api-integration',
    },
    {
        icon: Cloud,
        title: 'AWS Cloud Migration & DevOps',
        desc: 'Cloud migration, DevOps, architecture design and managed cloud services.',
        href: '/services/aws-cloud-services',
    },
    {
        icon: Server,
        title: 'Oracle Managed Services',
        desc: '24/7 Oracle DBA and Oracle Cloud Infrastructure specialists.',
        href: '/services/oracle-managed-services',
    },
    {
        icon: Users,
        title: 'Salesforce CRM Consulting',
        desc: 'CRM strategy, implementation and optimisation across sales, service and marketing.',
        href: '/services/crm-consulting',
    },
    {
        icon: BarChart3,
        title: 'Data Science & Machine Learning',
        desc: 'Custom ML models, generative AI and BI dashboards connected to your business data.',
        href: '/services/data-science',
    },
    {
        icon: Code2,
        title: 'Website Design & Development',
        desc: 'Fixed-price B2B websites — modern, SEO-built-in, delivered on a fixed timeline.',
        href: '/services/web-development',
    },
    {
        icon: Wrench,
        title: 'Application Support & Maintenance',
        desc: 'Ongoing enhancement, bug fixes and support across Salesforce, SAP, MuleSoft, AWS and websites.',
        href: '/services/support-maintenance',
    },
    {
        icon: CheckCircle2,
        title: 'Software Testing & QA',
        desc: 'Manual and automated testing, regression and QA for Salesforce, SAP, MuleSoft, AWS and web apps.',
        href: '/services/software-testing',
    },
]

const ServicesOverviewContainer = () => {
    return (
        <div>
            <div className="container mx-auto px-5 md:px-0 pt-40 pb-16 md:pt-52 md:pb-20 text-center">
                <p className="text-sm font-medium text-[#F15A23] uppercase tracking-wider mb-3">
                    Our Services
                </p>
                <h1 className="text-4xl md:text-6xl font-bold text-[#0D1526] tracking-[-1px] mb-6">
                    Everything We Deliver
                </h1>
                <p className="text-[#494852] text-lg max-w-2xl mx-auto">
                    Salesforce, SAP, MuleSoft, cloud, data science and web development —
                    all under one roof, serving USA, UK, Canada, Australia, Asia and Gulf businesses.
                </p>
            </div>

            <div className="container mx-auto px-5 md:px-0 pb-24">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {services.map((service) => {
                        const Icon = service.icon
                        return (
                            <Link
                                key={service.href}
                                href={service.href}
                                className="group rounded-2xl p-6 flex flex-col gap-3 border border-[#F1EDFF] bg-[#FCFCFC] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="w-12 h-12 rounded-xl flex items-center justify-center border border-[#F1EDFF] bg-white">
                                        <Icon size={22} className="text-[#195DF0]" />
                                    </div>
                                    <div className="w-10 h-10 rounded-full border border-[#F1EDFF] flex items-center justify-center bg-white transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                                        <ArrowUpRight size={18} className="text-[#F15A23]" />
                                    </div>
                                </div>
                                <h2 className="text-xl font-semibold text-[#0D1526] tracking-[-0.5px]">
                                    {service.title}
                                </h2>
                                <p className="text-sm text-[#707A8F] leading-relaxed">
                                    {service.desc}
                                </p>
                            </Link>
                        )
                    })}
                </div>
            </div>

            <HeroCTA
                tag="Let's Grow Together"
                heading="Not Sure Which Service You Need?"
                description="Tell us about your project and we'll recommend the right service for your business."
                primaryBtnText="Get Started"
                primaryBtnLink="/contact-us"
                secondaryBtnText="Contact Us"
                secondaryBtnLink="/contact-us"
            />
        </div>
    )
}

export default ServicesOverviewContainer
