'use client'
import React, { useEffect } from 'react'
import { ArrowUpRight } from "lucide-react";
import Link from 'next/link';
import SectionHeader from './SectionHeader';
import Divider from './Divider';

const Services = () => {
   const cards = [
  {
    title: "Salesforce Agentforce AI & CRM",
    desc: "Deploy autonomous AI agents with Agentforce. CRM implementation, customisation and managed support. 180+ deployments. UK · Texas · UAE.",
    bg: "bg-[#E5ECFD]",
    icon: "/assets/web/home/services/digital.png",
    border: "border-[#C1C1FF]",
    iconColor: "#606EE4",
    href: "/services/salesforce-services",
  },
  {
    title: "SAP S/4HANA & Joule AI",
    desc: "S/4HANA migration, RISE with SAP, BTP, Joule AI deployment. ECC support ends 2027 — plan your migration now. UK · Texas · UAE.",
    bg: "bg-[#FFEFE1]",
    icon: "/assets/web/home/services/data.png",
    border: "border-[#FFBCA5]",
    iconColor: "#F49308",
    href: "/services/sap-link-by-salesforce",
  },
  {
    title: "MuleSoft & API Integration",
    desc: "MuleSoft Anypoint Platform integration. 250+ APIs delivered. Connect SAP, Salesforce, Oracle and every system. API-led connectivity. UK · Texas · UAE.",
    bg: "bg-[#FDE7EB]",
    icon: "/assets/web/home/services/web.png",
    border: "border-[#FAC3CC]",
    iconColor: "#FF7A90",
    href: "/services/mulesoft",
  },
  {
    title: "Data Science, AI & Web Development",
    desc: "Python ML, generative AI, BI dashboards. Salesforce-connected models. Plus B2B website design & development — fixed price, SEO-built-in. UK · Texas · UAE.",
    bg: "bg-[#E4F6DF]",
    icon: "/assets/web/home/services/enterprise.png",
    border: "border-[#ACD99D]",
    iconColor: "#5D9E4B",
    href: "/services/data-science",
  },
];

    // AOS initialised globally in AOSProvider — no need to reinitialise here

    return (
        <div className='py-10 bg-[#F6F5F8]'>
            <div data-aos="fade-up">
                <Divider className='text-black' blur={true} label='Services' pillClassName="bg-white" />
            </div>

            <div className='container mx-auto'>
                <div className='mt-1 md:mt-8' data-aos="fade-up" data-aos-delay="100">
                    <SectionHeader
                        title='Your Needs, Our Expertise'
                        desc='Your Vision, Our Expertise – Together, we bring ideas to life with tailored solutions that deliver real results. Let’s build something amazing.'
                    />
                </div>

                <div className="pb-4 md:pb-10 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
                    {cards.map((card, idx) => (
                        <Link
                            key={idx}
                            href={card.href || "/services/salesforce-services"}
                            data-aos="zoom-in"
                            data-aos-delay={200 + idx * 150}
                            data-aos-duration="800"
                            data-aos-easing="ease-out-back"
                            className={`group ${card.bg} rounded-2xl p-6 md:p-8 flex flex-col gap-2 border ${card.border}
                            transition-all duration-300 ease-out
                            hover:-translate-y-2 hover:shadow-xl hover:shadow-black/5`}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <div className={`w-12 h-12 md:w-[85px] md:h-[85px] rounded-xl md:rounded-2xl flex items-center justify-center border ${card.border} bg-white`}>
                                    <img src={card.icon} alt={card.title} className="w-7 h-7 md:w-12 md:h-12 object-contain" />
                                </div>

                                <div className={`w-10 h-10 md:w-16 md:h-12 rounded-full border ${card.border} flex items-center justify-center bg-white cursor-pointer transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1`}>
                                    <ArrowUpRight className="w-5 h-5 md:w-8 md:h-8 transition-transform duration-300 group-hover:rotate-12" color={card.iconColor} />
                                </div>
                            </div>

                            <h2 className="text-2xl md:text-3xl font-medium text-gray-900 leading-snug" style={{ letterSpacing: '-1px' }}>
                                {card.title}
                            </h2>

                            <p className="text-gray-600 text-sm md:text-lg leading-relaxed font-normal" style={{ letterSpacing: '-1px', lineHeight: '26px' }}>
                                {card.desc}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Services
