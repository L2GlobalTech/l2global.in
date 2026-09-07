'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import HeroCTA from '@/components/web/HeroCTA'
import { FrontendService } from '@/types'
import { fetchServices, defaultServices, getServiceIcon } from '@/actions/servicesAction'

interface ServicesOverviewContainerProps {
    initialServices?: FrontendService[]
}

const ServicesOverviewContainer: React.FC<ServicesOverviewContainerProps> = ({ initialServices }) => {
    const [servicesList, setServicesList] = useState<FrontendService[]>(
        initialServices && initialServices.length > 0 ? initialServices : defaultServices
    )

    useEffect(() => {
        let isMounted = true
        fetchServices().then((data) => {
            if (isMounted && data && data.length > 0) {
                setServicesList(data)
            }
        }).catch((err) => {
            console.error('Failed to fetch services from Supabase:', err)
        })
        return () => { isMounted = false }
    }, [])

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
                    {servicesList.map((service) => {
                        const Icon = getServiceIcon(service.slug || service.title)
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
