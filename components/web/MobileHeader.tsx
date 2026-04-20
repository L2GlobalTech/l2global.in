"use client"

import Image from "next/image"
import React, { useEffect, useState } from "react"
import logo from "@/public/assets/web/l2-svg.svg"
import {
    ArrowLeft,
    ChevronRight,
    Menu,
    Phone,
    X,
} from "lucide-react"
import Link from "next/link"
import GradientButton from "../shared/GradientButton"
import ContactPopup from "../shared/ContactPopup"


const industries = [
    { label: "Education", href: "/industries/education" },
    { label: "Healthcare", href: "/industries/health-care" },
    { label: "Real Estate", href: "/industries/real-estate" },
    { label: "Manufacturing", href: "/industries/manufacturing" },
    { label: "Non Profit Organizations", href: "/industries/non-profit" },
]

const companyLinks = [
    { label: "About", href: "/about-us" },
    { label: "Contact Us", href: "/contact-us" },
    // { label: "Careers", href: "/career" },
    // { label: "Team", href: "/team" },
]

const services = [
    { label: 'Salesforce Services', href: '/services/salesforce-services' },
    { label: 'SAP Link by Salesforce', href: '/services/sap-link-by-salesforce' },
    { label: 'MuleSoft', href: '/services/mulesoft' },
    { label: 'Oracle Managed Services', href: '/services/oracle-managed-services' },
    { label: 'API Integration', href: '/services/api-integration' },
    { label: 'AWS Cloud Services', href: '/services/aws-cloud-services' },
    { label: 'CRM Consulting', href: '/services/crm-consulting' },
]

type ViewType = "MENU" | "INDUSTRIES" | "COMPANY" | "SERVICES"

const MobileHeader = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [view, setView] = useState<ViewType>("MENU")
    const [isContactOpen, setIsContactOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsSidebarOpen(false)
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const onNavigate = () => {
        setIsSidebarOpen(false)
        setView("MENU")
    }

    const linkClass =
        "block font-medium tracking-tight border-b p-3 border-gray-200 text-black transition-all duration-300 hover:text-[#F15A23]"

    const buttonClass =
        "w-full flex justify-between items-center font-medium tracking-tight border-b p-3 border-gray-200 text-black transition-all duration-300 hover:text-[#F15A23]"

    return (
        <>

            <header className="lg:hidden bg-white py-3.5 fixed top-0 left-0 w-full z-10 shadow-md">
                <div className="container mx-auto flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => {
                                setIsSidebarOpen(true)
                                setView("MENU")
                            }}
                            className="p-2"
                        >
                            <Menu size={22} />
                        </button>

                        <Link href="/" onClick={onNavigate}>
                            <Image
                                src={logo}
                                alt="Logo"
                                width={150}
                                height={80}
                                priority
                                className="object-contain"
                            />
                        </Link>
                    </div>

                    <GradientButton
                        onClick={() => setIsContactOpen(true)}
                        className="rounded-full px-3! py-3!"
                        icon={<Phone size={20} fill="white" strokeWidth={0} />}
                    />
                </div>
            </header>


            {isSidebarOpen && (
                <div
                    onClick={() => setIsSidebarOpen(false)}
                    className="fixed inset-0 bg-black/40 z-40 lg:hidden"
                />
            )}


            <div
                className={`fixed top-0 left-0 h-full w-[85%] max-w-sm bg-white z-50
        transform transition-transform duration-300
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:hidden`}
            >
                {/* SIDEBAR HEADER */}
                <div className="flex items-center justify-between bg-primary px-4 py-5 border-b border-gray-200">
                    <Image src={logo} alt="Logo" width={140} height={60} />
                    <button
                        onClick={() => setIsSidebarOpen(false)}
                        className="bg-red-50 h-10 w-10 rounded-md flex items-center justify-center"
                    >
                        <X size={20} className="text-red-500" />
                    </button>
                </div>

                {/* BACK BUTTON */}
                {view !== "MENU" && (
                    <div className="flex items-center gap-3 px-4 py-3 bg-[#F6F5F8] border-b border-gray-200">
                        <button
                            onClick={() => setView("MENU")}
                            className="h-10 w-10 rounded-md flex items-center justify-center bg-white"
                        >
                            <ArrowLeft size={18} />
                        </button>
                        <h3 className="font-semibold text-md text-[#074FDA]">
                            {view === "INDUSTRIES" && "Industries"}
                            {view === "COMPANY" && "Company"}
                            {view === "SERVICES" && "Services"}
                        </h3>
                    </div>
                )}

                {/* CONTENT */}
                <div className="overflow-y-auto">

                    {view === "MENU" && (
                        <>
                            <Link href="/" onClick={onNavigate} className={linkClass}>
                                Home
                            </Link>

                            <button
                                onClick={() => setView("INDUSTRIES")}
                                className={buttonClass}
                            >
                                Industries
                                <ChevronRight size={18} />
                            </button>

                            <button
                                onClick={() => setView("SERVICES")}
                                className={buttonClass}
                            >
                                Services
                                <ChevronRight size={18} />
                            </button>

                            {/* <Link href="/services" onClick={onNavigate} className={linkClass}>
                                Services
                            </Link>

                            <Link href="/expertise" onClick={onNavigate} className={linkClass}>
                                Expertise
                            </Link> */}

                            <Link href="/career" onClick={onNavigate} className={linkClass}>
                                Career
                            </Link>

                            <Link href="/team" onClick={onNavigate} className={linkClass}>
                                Team
                            </Link>

                            <button
                                onClick={() => setView("COMPANY")}
                                className={buttonClass}
                            >
                                Company
                                <ChevronRight size={18} />
                            </button>

                            {/* CTA */}
                            <Link
                                href="/contact-us"
                                onClick={onNavigate}
                                className={`${linkClass} font-semibold text-[#F15A23]`}
                            >
                                Let’s Talk
                            </Link>
                        </>
                    )}


                    {view === "INDUSTRIES" &&
                        industries.map(item => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={onNavigate}
                                className={linkClass}
                            >
                                {item.label}
                            </Link>
                        ))}


                    {view === "COMPANY" &&
                        companyLinks.map(item => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={onNavigate}
                                className={linkClass}
                            >
                                {item.label}
                            </Link>
                        ))}

                    {view === "SERVICES" &&
                        services.map(item => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={onNavigate}
                                className={linkClass}
                            >
                                {item.label}
                            </Link>
                        ))}
                </div>

                <ContactPopup
                    isOpen={isContactOpen}
                    setIsOpen={setIsContactOpen}
                />
            </div>
        </>
    )
}

export default MobileHeader
