"use client";

import * as LucideIcons from "lucide-react";
import Image from "next/image";
import Divider from "./Divider";
import SectionHeader from "./SectionHeader";
import { useEffect, useState } from "react";
import PrimaryButton from "../shared/PrimaryButton";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";

type StatItem = {
    id: string;
    icon: React.ReactNode;
    value: string;
    label: string;
};

type AboutSectionProps = {
    title: string;
    subtitle: string;
    stats: StatItem[];
    imageSrc: string;
    buttonText: string;
    contactLabel: string;
    contactNumber: string;
    className?: string;
};

/* Counter Hook */
const useCounter = (end: number, duration = 800) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let current = 0;
        const step = end / (duration / 16);

        const timer = setInterval(() => {
            current += step;
            if (current >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(Math.ceil(current));
            }
        }, 16);

        return () => clearInterval(timer);
    }, [end, duration]);

    return count;
};


function StatCard({
    item,
    delay,
}: {
    item: StatItem;
    delay: number;
}) {
    const numericValue = Number(item.value.replace(/\D/g, ""));
    const suffix = item.value.replace(/[0-9]/g, "");
    const counter = useCounter(numericValue);

    return (
        <div
            data-aos="fade-up"
            data-aos-delay={delay}
            className="group bg-[#F6F6F9] rounded-xl px-3 py-6 border border-transparent text-center transition duration-500 hover:border-[#CCCFD3] hover:bg-white"
        >
            <div className="flex justify-center items-start gap-2 text-out">
                <div className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center">
                    {item.icon}
                </div>

                <div className="w-full">
                    <div
                        className="text-2xl sm:text-4xl pb-2 group-hover:text-[#F15A23]"
                        style={{ fontWeight: 700, letterSpacing: "-1px" }}
                    >
                        {counter}
                        {suffix}
                    </div>

                    <div
                        className="border-t border-dotted border-[#1717171A] pt-2 text-[#494852] text-sm"
                        style={{ letterSpacing: "-0.5px" }}
                    >
                        {item.label}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function AboutSection({
    title,
    subtitle,
    stats,
    imageSrc,
    buttonText,
    contactLabel,
    contactNumber,
    className,
}: AboutSectionProps) {

    useEffect(() => {
        AOS.init({
            duration: 900,
            easing: 'ease-out-cubic',
            once: true,
            offset: 200,
            anchorPlacement: 'top-bottom'
        })
        AOS.refresh()
    }, [])

    return (
        <>
            <div>
                <Divider className="text-black" blur={true} label="About Us" />
            </div>

            <div className={`container mx-auto py-4 md:py-8 px-4 sm:px-6 ${className}`}>
                <SectionHeader title={title} desc={subtitle} />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-10 items-center">


                    <div
                        className="flex justify-center mt-10"
                        data-aos="fade-in"
                        data-aos-delay="100"
                    >
                        <img
                            src={imageSrc}
                            alt="About Image"
                            className="w-full h-full object-contain"
                        />
                    </div>


                    <div data-aos="fade-out" data-aos-delay="200">
                        <p className="text-[#494852] mt-3 md:mt-6 font-normal">
                            Global Technologies is recognized for its excellence in key technologies and efficient project management. We build on deep industry experience and specialized skills to deliver scalable, reliable IT solutions at a national level.
                        </p>

                        <p className="text-[#494852] mt-3 md:mt-6 font-normal">
                            Established in 2014, Global Technologies has grown into a trusted global technology company, serving clients across multiple industries with innovative, future-ready digital solutions.
                        </p>

                        <p className="text-[#494852] mt-3 md:mt-6 font-normal">
                            With a team of 45+ skilled certified professionals, we combine technical expertise, collaboration, and agile execution to ensure consistent quality, timely delivery, and measurable business outcomes.
                        </p>


                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8">
                            {stats.map((item, index) => (
                                <StatCard
                                    key={item.id}
                                    item={item}
                                    delay={300 + index * 120}
                                />
                            ))}
                        </div>

                        <div
                            className="flex flex-wrap md:justify-start items-center justify-center gap-6 mt-8"
                            data-aos="fade-up"
                            data-aos-delay="700"
                        >
                            <PrimaryButton
                                label={buttonText}
                                href="/about-us"
                                icon={
                                    <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
                                        <path
                                            d="M11.25 14L9.64687 12.3667L13.6969 8.16667H0V5.83333H13.6969L9.675 1.63333L11.25 0L18 7L11.25 14Z"
                                            fill="white"
                                        />
                                    </svg>
                                }
                            />

                            <div className="flex items-center gap-3">
                                <div className="h-14 w-14 rounded-xl bg-[#F6F6F9] flex items-center justify-center">
                                    <LucideIcons.PhoneCall color="#021B79" size={25} />
                                </div>
                                <div>
                                    <p className="text-gray-600 text-sm">{contactLabel}</p>
                                    <Link
                                        href={`tel:${contactNumber}`}
                                        className="font-semibold text-[#030714] text-xl hover:text-[#F15A23] transition"
                                    >
                                        {contactNumber}
                                    </Link>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}
