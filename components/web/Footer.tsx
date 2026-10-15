// app/components/Footer.tsx
'use client'
import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { ArrowUp, Heart } from "lucide-react";
import logo from '@/public/assets/web/home/footer-logo.png'
import { fetchServices } from "@/actions/servicesAction";

const year = new Date().getFullYear();

const footerLinks = {
    Company: [
        { label: "About", href: "/about-us" },
        { label: "Contact us", href: "/contact-us" },
        { label: "Careers", href: "/career" },
        { label: "Team", href: "/team" },
        { label: "Blog & Insights", href: "/blog" },
        { label: "FAQs", href: "/faq" },
    ],

    Industries: [
        { label: "Education", href: "/industries/education" },
        { label: "Healthcare", href: "/industries/health-care" },
        { label: "Real Estate", href: "/industries/real-estate" },
        { label: "Manufacturing", href: "/industries/manufacturing" },
        { label: "Non Profit Organizations", href: "/industries/non-profit" },
        // { label: "Enterprise Technology", href: "/services" },
    ],

    Content: [
        { label: "Terms & Conditions", href: "/terms-and-conditions" },
        { label: "Privacy Policy", href: "/privacy-policy" },
        // { label: "Cookie Policy", href: "/privacy-policy" },
        // { label: "Security & Compliance", href: "/privacy-policy" },
        // { label: "Help & Support", href: "/contact-us" },
        // { label: "Sitemap", href: "/about-us" },
    ],
};

const defaultServices6 = [
    { label: "Salesforce Services", href: "/services/salesforce-services" },
    { label: "SAP & Salesforce Integration", href: "/services/sap-link-by-salesforce" },
    { label: "MuleSoft Integration Services", href: "/services/mulesoft-integration-services" },
    { label: "Oracle Managed Services", href: "/services/oracle-consulting-managed-servicesss" },
    { label: "API Integration Services", href: "/services/api-integration" },
    { label: "AWS Cloud Services", href: "/services/aws-cloud-services" },
];

const Footer: React.FC = () => {
    const [servicesList, setServicesList] = useState(defaultServices6);

    useEffect(() => {
        let isMounted = true;
        fetchServices().then((items) => {
            if (isMounted) {
                setServicesList((items || []).map((s) => ({ label: s.title, href: s.href })));
            }
        }).catch((err) => {
            if (isMounted) setServicesList([]);
            console.warn('Failed to load dynamic services in Footer:', err);
        });
        return () => { isMounted = false; };
    }, []);

    const displayedServices = servicesList && servicesList.length >= 6 ? servicesList.slice(0, 6) : defaultServices6;

    return (
        <footer className="bg-white text-slate-600 border-t border-t-gray-100">
            <div className="mx-auto w-full container px-4 sm:px-6 lg:px-8 pt-12 pb-6">
                {/* Responsive Top Grid with Equal Column Heights */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-8 lg:gap-6 items-stretch">
                    {/* Brand + description + socials */}
                    <div className="col-span-2 sm:col-span-2 md:col-span-4 lg:col-span-4 flex flex-col justify-between h-full pr-0 lg:pr-8 mb-4 lg:mb-0">
                        <div>
                            <div className="flex items-center gap-3">
                                <Image
                                    src={logo.src}
                                    alt="L2 Global Technologies"
                                    width={200}
                                    height={80}
                                    className="h-auto w-40 object-contain"
                                    priority
                                />
                            </div>

                            <p className="mt-4 max-w-sm leading-relaxed text-sm text-[#6F6C90]">
                                UK-headquartered Salesforce Agentforce AI, SAP Gold Partner, MuleSoft,
                                data science and website development consultants. UK · Texas USA · UAE · India.
                                182+ projects. Founded 2014. Free consultation.
                            </p>
                        </div>

                        {/* Social icons */}
                        <div className="mt-6 flex items-center gap-4">
                            <Link aria-label="Facebook" href="https://www.facebook.com/l2globaltechnologies" className="text-[#6F6C90] transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-110">
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="28" height="28" viewBox="0,0,256,256">
                                    <g fill="#f15a23" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none"><g transform="scale(8.53333,8.53333)"><path d="M12,27v-12h-4v-4h4v-2.148c0,-4.067 1.981,-5.852 5.361,-5.852c1.619,0 2.475,0.12 2.88,0.175v3.825h-2.305c-1.435,0 -1.936,0.757 -1.936,2.291v1.709h4.205l-0.571,4h-3.634v12z"></path></g></g>
                                </svg>
                            </Link>
                            <Link aria-label="Twitter" href="https://twitter.com/l2globaltech" className="text-[#6F6C90] transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-110">
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="28" height="28" viewBox="0,0,256,256">
                                    <g fill="#f15a23" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none"><g transform="scale(5.12,5.12)"><path d="M6.91992,6l14.2168,20.72656l-14.9082,17.27344h3.17773l13.13867,-15.22266l10.44141,15.22266h10.01367l-14.87695,-21.6875l14.08008,-16.3125h-3.17578l-12.31055,14.26172l-9.7832,-14.26172z"></path></g></g>
                                </svg>
                            </Link>
                            <Link aria-label="Instagram" href="https://www.instagram.com/l2globaltechnologies" className="text-[#6F6C90] transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-110">
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="28" height="28" viewBox="0,0,256,256">
                                    <g fill="#f15a23" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" ><g transform="scale(8.53333,8.53333)"><path d="M9.99805,3c-3.859,0 -6.99805,3.14195 -6.99805,7.00195v10c0,3.859 3.14195,6.99805 7.00195,6.99805h10c3.859,0 6.99805,-3.14195 6.99805,-7.00195v-10c0,-3.859 -3.14195,-6.99805 -7.00195,-6.99805zM22,7c0.552,0 1,0.448 1,1c0,0.552 -0.448,1 -1,1c-0.552,0 -1,-0.448 -1,-1c0,-0.552 0.448,-1 1,-1zM15,9c3.309,0 6,2.691 6,6c0,3.309 -2.691,6 -6,6c-3.309,0 -6,-2.691 -6,-6c0,-3.309 2.691,-6 6,-6zM15,11c-2.20914,0 -4,1.79086 -4,4c0,2.20914 1.79086,4 4,4c2.20914,0 4,-1.79086 4,-4c0,-2.20914 -1.79086,-4 -4,-4z"></path></g></g>
                                </svg>
                            </Link>
                            <Link aria-label="LinkedIn" href="https://www.linkedin.com/company/l2-global-technologies" className="text-[#6F6C90] transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-110">
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="28" height="28" viewBox="0,0,256,256">
                                    <g fill="#f15a23" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" ><g transform="scale(8.53333,8.53333)"><path d="M24,4h-18c-1.105,0 -2,0.895 -2,2v18c0,1.105 0.895,2 2,2h18c1.105,0 2,-0.895 2,-2v-18c0,-1.105 -0.895,-2 -2,-2zM10.954,22h-2.95v-9.492h2.95zM9.449,11.151c-0.951,0 -1.72,-0.771 -1.72,-1.72c0,-0.949 0.77,-1.719 1.72,-1.719c0.948,0 1.719,0.771 1.719,1.719c0,0.949 -0.771,1.72 -1.719,1.72zM22.004,22h-2.948v-4.616c0,-1.101 -0.02,-2.517 -1.533,-2.517c-1.535,0 -1.771,1.199 -1.771,2.437v4.696h-2.948v-9.492h2.83v1.297h0.04c0.394,-0.746 1.356,-1.533 2.791,-1.533c2.987,0 3.539,1.966 3.539,4.522z"></path></g></g>
                                </svg>
                            </Link>
                            <Link aria-label="YouTube" href="https://www.youtube.com/@l2globaltechnologies" className="text-[#6F6C90] transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-110">
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32" viewBox="0,0,256,256">
                                    <g fill="none" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none"><g transform="scale(5.33333,5.33333)"><path d="M43.2,33.9c-0.4,2.1 -2.1,3.7 -4.2,4c-3.3,0.5 -8.8,1.1 -15,1.1c-6.1,0 -11.6,-0.6 -15,-1.1c-2.1,-0.3 -3.8,-1.9 -4.2,-4c-0.4,-2.3 -0.8,-5.7 -0.8,-9.9c0,-4.2 0.4,-7.6 0.8,-9.9c0.4,-2.1 2.1,-3.7 4.2,-4c3.3,-0.5 8.8,-1.1 15,-1.1c6.2,0 11.6,0.6 15,1.1c2.1,0.3 3.8,1.9 4.2,4c0.4,2.3 0.9,5.7 0.9,9.9c-0.1,4.2 -0.5,7.6 -0.9,9.9z" fill="#f15a23"></path><path d="M20,31v-14l12,7z" fill="#ffffff"></path></g></g>
                                </svg>
                            </Link>
                        </div>
                    </div>

                    {/* Company */}
                    <div className="col-span-1 lg:col-span-2 flex flex-col justify-between h-full">
                        <div>
                            <p className="text-[#170F49] font-bold tracking-tight text-lg mb-4">
                                Company
                            </p>
                            <ul className="space-y-3">
                                {footerLinks.Company.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="hover:text-[#F15A23] text-[#6F6C90] transition-colors duration-200 tracking-[-0.3px] text-sm block truncate"
                                            title={link.label}
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Services */}
                    <div className="col-span-1 lg:col-span-2 flex flex-col justify-between h-full">
                        <div>
                            <p className="text-[#170F49] font-bold tracking-tight text-lg mb-4">
                                Services
                            </p>
                            <ul className="space-y-3">
                                {displayedServices.map((link) => (
                                    <li key={link.href + link.label}>
                                        <Link
                                            href={link.href}
                                            className="hover:text-[#F15A23] text-[#6F6C90] transition-colors duration-200 tracking-[-0.3px] text-sm block truncate"
                                            title={link.label}
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Industries */}
                    <div className="col-span-1 lg:col-span-2 flex flex-col justify-between h-full">
                        <div>
                            <p className="text-[#170F49] font-bold tracking-tight text-lg mb-4">
                                Industries
                            </p>
                            <ul className="space-y-3">
                                {footerLinks.Industries.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="hover:text-[#F15A23] text-[#6F6C90] transition-colors duration-200 tracking-[-0.3px] text-sm block truncate"
                                            title={link.label}
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="col-span-1 lg:col-span-2 flex flex-col justify-between h-full">
                        <div>
                            <p className="text-[#170F49] font-bold tracking-tight text-lg mb-4">
                                Content
                            </p>
                            <ul className="space-y-3">
                                {footerLinks.Content.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="hover:text-[#F15A23] text-[#6F6C90] transition-colors duration-200 tracking-[-0.3px] text-sm block truncate"
                                            title={link.label}
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Divider + back to top */}
                <div className="relative mt-12 border-t border-slate-200 pb-12">
                    <button
                        aria-label="Back to top"
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        className="absolute -top-6 left-1/2 -translate-x-1/2 h-12 w-18 rounded-full border border-slate-200 bg-[#074fda] flex items-center justify-center transition-all duration-500 hover:bg-[#F15A23] cursor-pointer"
                    >
                        <ArrowUp size={25} className="text-white" />
                    </button>

                    {/* Bottom row */}
                    <div className="mt-8 flex flex-col gap-4 items-center justify-between text-[#6F6C90] md:flex-row">
                        <div className="md:flex flex-col justify-start">
                            <p className="text-sm">Copyright {year} © L2 Global Technologies Ltd. · Registered in England &amp; Wales</p>
                            <p className="text-xs text-gray-400 mt-1">UK Office · Texas USA Office · India Delivery Centre · Dubai Office</p>
                            <div className="flex items-center gap-3 mt-1">
                                <p className="text-xs">All Rights Reserved</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                            Made with
                            <span className="heart-pump text-red-500 mx-1"><Heart className="h-4 w-4 text-red-500" fill="oklch(63.7% 0.237 25.331)" /></span>
                            by <a
                                href="https://ascendtis.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#6F6C90] font-semibold transition-all duration-500 hover:text-[#F15A23]"
                            >
                                Ascendtis
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
