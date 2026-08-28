"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useRef, useState } from "react";

import PrimaryButton from "../shared/PrimaryButton";
import OutlineButton from "../shared/OutlineButton";

import img1 from "../../public/assets/web/home/hero-main.webp";
import img2 from "../../public/assets/web/home/saleforce-img.webp";
import img3 from "../../public/assets/web/home/sap-img.webp";
import img4 from "../../public/assets/web/home/all-ind-img.webp";
import img5 from "../../public/assets/web/home/trust-img.webp";
import img6 from "../../public/assets/web/home/build-img.webp";
import Typewriter from "typewriter-effect";
import Slider, { Settings } from "react-slick";
import excellance from '../../public/assets/web/home/excellence-badge.webp';
import ContactPopup from "../shared/ContactPopup";

// ✅ Hero slides
const heroSlides = [
    {
        id: 1,
        customers: "UK · USA · UAE · India",
        title: { line1: "Generate More", line2: "ROI With Us" },
        desc: "Drive measurable business growth with intelligent digital solutions designed to maximize efficiency and returns, designed for UK, USA and Gulf businesses.",
        img: img1,
        alt: "Generate more ROI with L2 Global digital solutions",
    },
    {
        id: 2,
        customers: "UK · USA · UAE · India",
        title: { line1: "Connect Salesforce", line2: "With MuleSoft" },
        desc: "Unify data, automate workflows, and enable seamless enterprise integration using Salesforce and MuleSoft.Trusted by businesses from London to Dubai.",
        img: img2,
        alt: "Connect Salesforce with MuleSoft integration",
    },
    {
        id: 3,
        customers: "UK · USA · UAE · India",
        title: { line1: "Transform Business", line2: "With SAP" },
        desc: "Optimize core processes, improve visibility, and scale operations efficiently with our SAP expertise, serving clients from London to Dubai to New York",
        img: img3,
        alt: "Transform your business with SAP expertise",
    },
    {
        id: 4,
        customers: "UK · USA · UAE · India",
        title: { line1: "Solutions Across", line2: "Industries" },
        desc: "Delivering tailored digital solutions for healthcare, education, finance, manufacturing, and more across three continents.",
        img: img4,
        alt: "Tailored digital solutions across industries",
    },
    {
        id: 5,
        customers: "UK · USA · UAE · India",
        title: { line1: "Driven By", line2: "Innovation & Trust" },
        desc: "A technology partner focused on building scalable, secure, and future-ready digital solutions for global enterprises.",
        img: img5,
        alt: "Innovation and trust driving digital transformation",
    },
    {
        id: 6,
        customers: "UK · USA · UAE · India",
        title: { line1: "Let’s Build", line2: "Something Great" },
        desc: "Connect with our experts to discuss your requirements and start your digital transformation journey wherever you are — UK, USA or Gulf.",
        img: img6,
        alt: "Build something great with L2 Global experts",
    },
];

// Rotating Badge Component
const RotatingBadge = () => {
    return (
        <div className="absolute top-1 left-4 rounded-full shadow-lg z-50 overflow-hidden">
            <img src={excellance.src} alt="Excellence Badge" className="md:w-28 md:h-28 w-16 h-16 object-contain" />
        </div>
    );
};

export default function HeroCarousel() {
    const sliderRef = useRef<Slider | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isContactOpen, setIsContactOpen] = useState(false);


    const settings: Settings = {
        dots: true,
        infinite: true,
        arrows: false,
        slidesToShow: 1,
        autoplay: false,
        autoplaySpeed: 2500,
        speed: 800,
        pauseOnHover: true,
        beforeChange: (_current, next) => setActiveIndex(next),
    };

    return (
        <>
            <style jsx global>{`
                .slick-dots li button:before {
                  margin-top: 30px;
                  color: #d9d9d9;
                  font-size: 10px;
                  opacity: 1;
                }
                .slick-dots li {
                  margin: 0 -2px;
                }
                .slick-dots li.slick-active button:before {
                  color: #050a30;
                }
                @keyframes spin-slow {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
                .animate-spin-slow {
                  animation: spin-slow 10s linear infinite;
                }
            `}</style>

            <section
                className="w-full bg-cover bg-center bg-no-repeat pt-20 md:pt-36 pb-12 md:pb-24"
                style={{ backgroundImage: "url('/assets/web/home/bg-hero.webp')" }}
            >
                <div className="container mx-auto px-6">
                    <h1 className="sr-only">
                        L2 Global Technologies — Salesforce Agentforce AI, SAP, MuleSoft &amp; Cloud Consultants for UK, USA and Gulf Businesses
                    </h1>
                    <Slider ref={sliderRef} {...settings}>
                        {heroSlides.map((t) => (
                            <div key={t.id} className="px-2">
                                <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4 md:gap-12 relative">

                                    {/* IMAGE (MOBILE) */}
                                    <div className="md:hidden flex justify-center relative">
                                        <Image
                                            src={t.img}
                                            alt={t.alt}
                                            width={600}
                                            height={600}
                                            className="rounded-3xl object-cover"
                                            priority={t.id === 1}
                                            loading={t.id === 1 ? "eager" : "lazy"}
                                        />
                                        <RotatingBadge />

                                    </div>

                                    {/* CONTENT */}
                                    <div className="space-y-3 md:space-y-8 relative">
                                        {/* TITLE */}
                                        <h2
                                            className="text-[40px] md:text-[65px] leading-tight text-center md:text-left tracking-tighter md:tracking-[-3px] h-40"
                                            style={{
                                                background: "linear-gradient(2.84deg, rgba(20,20,20,0.7) 0.04%, #131313 36.04%)",
                                                WebkitBackgroundClip: "text",
                                                WebkitTextFillColor: "transparent",
                                                fontWeight: 700,
                                            }}
                                        >
                                            {activeIndex === t.id - 1 ? (
                                                <Typewriter
                                                    key={`type-${t.id}-${activeIndex}`}
                                                    onInit={(typewriter) => {
                                                        typewriter
                                                            .pauseFor(300)
                                                            .typeString(t.title.line1)
                                                            .pauseFor(250)
                                                            .typeString("<br />")
                                                            .pauseFor(200)
                                                            .typeString(t.title.line2)
                                                            .pauseFor(1000)
                                                            .callFunction(() => {
                                                                sliderRef.current?.slickNext();
                                                            })
                                                            .start();
                                                    }}
                                                    options={{
                                                        delay: 45,
                                                        cursor: "|",
                                                        deleteSpeed: Infinity,
                                                    }}
                                                />
                                            ) : (
                                                <>
                                                    {t.title.line1}
                                                    <br />
                                                    {t.title.line2}
                                                </>
                                            )}
                                        </h2>

                                        {/* DESCRIPTION */}
                                        <p className="text-sm md:text-xl text-[#494852] text-center md:text-left">
                                            {t.desc}
                                        </p>

                                        {/* BUTTONS */}
                                        <div className="flex flex-wrap justify-center md:justify-start gap-4">
                                            <PrimaryButton onClick={() => setIsContactOpen(true)} label='Book a Free Call' icon={
                                                <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M11.25 14L9.64687 12.3667L13.6969 8.16667H0V5.83333H13.6969L9.675 1.63333L11.25 0L18 7L11.25 14Z" fill="white" />
                                                </svg>
                                            } />
                                            {/* Watch Demo button removed — no demo video exists */}
                                        </div>

                                    </div>

                                    {/* IMAGE (DESKTOP) */}
                                    <div className="hidden md:flex justify-center relative">
                                        <Image
                                            src={t.img}
                                            alt={t.alt}
                                            width={600}
                                            height={600}
                                            className="rounded-3xl object-cover"
                                            priority={t.id === 1}
                                            loading={t.id === 1 ? "eager" : "lazy"}
                                        />
                                        {/* Rotating Badge Overlay */}
                                        <RotatingBadge />
                                    </div>

                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>

                <ContactPopup
                    isOpen={isContactOpen}
                    setIsOpen={setIsContactOpen}
                />
            </section>
        </>
    );
}
