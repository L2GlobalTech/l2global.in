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


import { fetchServices } from "@/actions/servicesAction"

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
    { label: "Blog", href: "/blog" },
    { label: "FAQ", href: "/faq" },
]

type ViewType = "MENU" | "INDUSTRIES" | "COMPANY" | "SERVICES"

const MobileHeader = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [view, setView] = useState<ViewType>("MENU")
    const [isContactOpen, setIsContactOpen] = useState(false);
    const [servicesList, setServicesList] = useState<{ label: string; href: string }[]>([])

    useEffect(() => {
        let isMounted = true;
        fetchServices().then((items) => {
            if (isMounted) {
                setServicesList((items || []).map((s) => ({ label: s.title, href: s.href })));
            }
        }).catch((err) => {
            if (isMounted) setServicesList([]);
            console.warn('Failed to load dynamic services in MobileHeader:', err);
        });
        return () => { isMounted = false; };
    }, []);

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

            <header className="lg:hidden bg-white py-2.5 fixed top-0 left-0 w-full z-40 shadow-sm border-b border-gray-100">
                <div className="container mx-auto px-4 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => {
                                setIsSidebarOpen(true)
                                setView("MENU")
                            }}
                            className="p-2 -ml-2 text-gray-800 hover:text-[#F15A23] transition-colors"
                            aria-label="Open menu"
                        >
                            <Menu size={24} />
                        </button>

                        <Link href="/" onClick={onNavigate} className="flex items-center">
                            <Image
                                src={logo}
                                alt="L2 Global Technologies logo"
                                width={160}
                                height={40}
                                priority
                                className="w-36 sm:w-44 h-9 sm:h-10 object-contain"
                            />
                        </Link>
                    </div>

                    <GradientButton
                        onClick={() => setIsContactOpen(true)}
                        className="rounded-full px-3! py-3!"
                        icon={<Phone size={18} fill="white" strokeWidth={0} />}
                    />
                </div>
            </header>


            {isSidebarOpen && (
                <div
                    onClick={() => setIsSidebarOpen(false)}
                    className="fixed inset-0 bg-black/40 z-50 lg:hidden backdrop-blur-xs transition-opacity"
                />
            )}


            <div
                className={`fixed top-0 left-0 h-full w-[85%] max-w-sm bg-white z-50
        transform transition-transform duration-300 flex flex-col shadow-2xl
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:hidden`}
            >
                {/* SIDEBAR HEADER */}
                <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100 bg-white">
                    <Image src={logo} alt="L2 Global Technologies logo" width={150} height={38} className="w-36 h-9 object-contain" />
                    <button
                        onClick={() => setIsSidebarOpen(false)}
                        className="bg-red-50 hover:bg-red-100 h-9 w-9 rounded-lg flex items-center justify-center transition-colors"
                        aria-label="Close menu"
                    >
                        <X size={18} className="text-red-500" />
                    </button>
                </div>

                {/* BACK BUTTON */}
                {view !== "MENU" && (
                    <div className="flex items-center gap-3 px-4 py-3 bg-[#F6F5F8] border-b border-gray-200">
                        <button
                            onClick={() => setView("MENU")}
                            className="h-9 w-9 rounded-lg flex items-center justify-center bg-white border border-gray-200 shadow-xs hover:bg-gray-50 transition-colors"
                            aria-label="Back to main menu"
                        >
                            <ArrowLeft size={16} />
                        </button>
                        <h3 className="font-semibold text-base text-[#074FDA]">
                            {view === "INDUSTRIES" && "Industries"}
                            {view === "COMPANY" && "Company"}
                            {view === "SERVICES" && "Services"}
                        </h3>
                    </div>
                )}

                {/* CONTENT */}
                <div className="flex-1 overflow-y-auto">

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

                            <Link href="/blog" onClick={onNavigate} className={linkClass}>
                                Blog
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

                    {view === "SERVICES" && (
                        <>
                            <Link
                                href="/services"
                                onClick={onNavigate}
                                className="flex items-center justify-between font-semibold tracking-tight border-b p-3.5 border-orange-100 bg-orange-50/70 text-[#F15A23] hover:bg-orange-100/70 transition-all duration-300"
                            >
                                <span>View All Services</span>
                                <ChevronRight size={18} className="text-[#F15A23]" />
                            </Link>
                            {servicesList.map(item => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={onNavigate}
                                    className={linkClass}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </>
                    )}
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
