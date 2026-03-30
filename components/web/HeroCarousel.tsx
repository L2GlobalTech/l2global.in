"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { Smile, Star } from "lucide-react";
import { useRef, useState } from "react";

import PrimaryButton from "../shared/PrimaryButton";
import OutlineButton from "../shared/OutlineButton";

import img1 from "../../public/assets/web/home/hero-main.png";
import img2 from "../../public/assets/web/home/saleforce-img.png";
import img3 from "../../public/assets/web/home/sap-img.png";
import img4 from "../../public/assets/web/home/all-ind-img.png";
import img5 from "../../public/assets/web/home/trust-img.png";
import img6 from "../../public/assets/web/home/build-img.png";
import Typewriter from "typewriter-effect";
import truspilot from '../../public/assets/web/home/trustpilot.svg';
import Slider, { Settings } from "react-slick";
import excellance from '../../public/assets/web/home/excellence.svg';
import ContactPopup from "../shared/ContactPopup";

// ✅ Hero slides
const heroSlides = [
    {
        id: 1,
        customers: "1.2+ million Customers",
        title: { line1: "Generate More", line2: "ROI With Us" },
        desc: "Drive measurable business growth with intelligent digital solutions designed to maximize efficiency and returns.",
        img: img1,
    },
    {
        id: 2,
        customers: "1.2+ million Customers",
        title: { line1: "Connect Salesforce", line2: "With MuleSoft" },
        desc: "Unify data, automate workflows, and enable seamless enterprise integration using Salesforce and MuleSoft.",
        img: img2,
    },
    {
        id: 3,
        customers: "1.2+ million Customers",
        title: { line1: "Transform Business", line2: "With SAP" },
        desc: "Optimize core processes, improve visibility, and scale operations efficiently with our SAP expertise.",
        img: img3,
    },
    {
        id: 4,
        customers: "1.2+ million Customers",
        title: { line1: "Solutions Across", line2: "Industries" },
        desc: "Delivering tailored digital solutions for healthcare, education, finance, manufacturing, and more.",
        img: img4,
    },
    {
        id: 5,
        customers: "1.2+ million Customers",
        title: { line1: "Driven By", line2: "Innovation & Trust" },
        desc: "A technology partner focused on building scalable, secure, and future-ready digital solutions.",
        img: img5,
    },
    {
        id: 6,
        customers: "1.2+ million Customers",
        title: { line1: "Let’s Build", line2: "Something Great" },
        desc: "Connect with our experts to discuss your requirements and start your digital transformation journey.",
        img: img6,
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
                style={{ backgroundImage: "url('/assets/web/home/bg-hero.png')" }}
            >
                <div className="container mx-auto px-6">
                    <Slider ref={sliderRef} {...settings}>
                        {heroSlides.map((t) => (
                            <div key={t.id} className="px-2">
                                <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4 md:gap-12 relative">

                                    {/* IMAGE (MOBILE) */}
                                    <div className="md:hidden flex justify-center relative">
                                        <Image
                                            src={t.img}
                                            alt="Hero Image"
                                            width={600}
                                            height={600}
                                            className="rounded-3xl object-cover"
                                            priority
                                        />
                                        <RotatingBadge />

                                    </div>

                                    {/* CONTENT */}
                                    <div className="space-y-3 md:space-y-8 relative">
                                        {/* TITLE */}
                                        <h1
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
                                        </h1>

                                        {/* DESCRIPTION */}
                                        <p className="text-sm md:text-xl text-[#494852] text-center md:text-left">
                                            {t.desc}
                                        </p>

                                        {/* BUTTONS */}
                                        <div className="flex flex-wrap justify-center md:justify-start gap-4">
                                            <PrimaryButton onClick={() => setIsContactOpen(true)} label='Get Started' icon={
                                                <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M11.25 14L9.64687 12.3667L13.6969 8.16667H0V5.83333H13.6969L9.675 1.63333L11.25 0L18 7L11.25 14Z" fill="white" />
                                                </svg>
                                            } />
                                            <OutlineButton name="Watch Demo" />
                                        </div>

                                        {/* RATING */}
                                        <div className="flex justify-center md:justify-start items-center gap-4">
                                            <div className="bg-[#F5AF191A] rounded-full p-3">
                                                <Star size={24} fill="#F5AF19" stroke="#F5AF19" />
                                            </div>
                                            <div>
                                                <p className="text-xl font-semibold">5.0 Rated</p>
                                                <p className="text-gray-600 text-sm">Rated superb over 4.5k ratings</p>
                                            </div>
                                        </div>

                                        <img src={truspilot.src} className="my-5" />
                                    </div>

                                    {/* IMAGE (DESKTOP) */}
                                    <div className="hidden md:flex justify-center relative">
                                        <Image
                                            src={t.img}
                                            alt="Hero Image"
                                            width={600}
                                            height={600}
                                            className="rounded-3xl object-cover"
                                            priority
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
