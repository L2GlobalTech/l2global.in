'use client'

import clsx from 'clsx'
import Image, { StaticImageData } from 'next/image'
import React, { useEffect, useState } from 'react'
import PrimaryButton from '../shared/PrimaryButton'
import AOS from 'aos'
import 'aos/dist/aos.css'
import ContactPopup from '../shared/ContactPopup'

interface HeroSectionProps {
    label?: string
    title: string
    description: string
    image: StaticImageData
    backgroundImage?: string
    btnName?: string;
    btnLink?: string
}

const HeroSection = ({
    label = 'Contact Us',
    title,
    description,
    image,
    backgroundImage = "/assets/web/home/bg-hero.png",
    btnName = 'Get a Quote',
    btnLink = '/contact-us'
}: HeroSectionProps) => {

    useEffect(() => {
        AOS.init({
            duration: 800,
            easing: "ease-out-cubic",
            once: true,
            offset: 150,
            anchorPlacement: "top-bottom",
        });
        AOS.refresh();
    }, []);

    const [isContactOpen, setIsContactOpen] = useState(false);


    return (
        <section
            className="w-full bg-cover bg-center bg-no-repeat pt-10 pb-4 lg:pb-0 md:pt-20 lg:pt-24 md:border-b border-[#F0ECFD]"
            style={{ backgroundImage: `url('${backgroundImage}')` }}
        >
            <div className="container mx-auto flex flex-col-reverse md:grid md:grid-cols-12 gap-4 md:gap-8 px-4 md:px-0 mt-12 mb-10">

                {/* LEFT CONTENT */}
                <div
                    className="md:col-span-7 flex items-center"
                    data-aos="zoom-in"
                >
                    <div>
                        {/* Label */}
                        <div
                            className="flex justify-center md:justify-start mb-3"
                            data-aos="zoom-in"
                            data-aos-delay="100"
                        >
                            <span
                                className={clsx(
                                    "inline-flex items-center gap-2 rounded-full",
                                    "px-3 sm:px-4 py-1 sm:py-1.5",
                                    "bg-white text-sm sm:text-base border border-[#F1EDFF]"
                                )}
                            >
                                <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                                <span className="whitespace-nowrap font-medium tracking-[-1px]">{label}</span>
                                <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                            </span>
                        </div>

                        {/* Title */}
                        <h1
                            className="text-2xl sm:text-3xl md:text-5xl font-medium text-black leading-tight text-center md:tracking-[-4px] tracking-[-1px] lg:text-left"
                            data-aos="fade-up"
                            data-aos-delay="200"
                        >
                            {title}
                        </h1>

                        {/* Description */}
                        <p
                            className="text-sm sm:text-base text-black mt-5 max-w-xl text-center lg:text-left"
                            data-aos="fade-up"
                            data-aos-delay="300"
                        >
                            {description}
                        </p>

                        {/* Button */}
                        <div
                            className="mb-4 mt-6 md:mt-8 md:mb-0 flex justify-center md:justify-start items-center w-full"
                            data-aos="zoom-in"
                            data-aos-delay="400"
                        >
                            <PrimaryButton
                                onClick={() => setIsContactOpen(true)}
                                label={btnName}
                                icon={
                                    <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
                                        <path d="M11.25 14L9.64687 12.3667L13.6969 8.16667H0V5.83333H13.6969L9.675 1.63333L11.25 0L18 7L11.25 14Z" fill="white" />
                                    </svg>
                                }
                            />
                        </div>
                    </div>
                </div>

                {/* RIGHT IMAGE */}
                <div
                    className="md:col-span-5 flex justify-center md:justify-end pt-12 md:pt-0"
                    data-aos="flip-up"
                    data-aos-delay="200"
                >
                    <Image
                        src={image}
                        alt="Hero Image"
                        className="w-full h-auto object-contain"
                        priority
                    />
                </div>
            </div>

            <ContactPopup
                isOpen={isContactOpen}
                setIsOpen={setIsContactOpen}
            />
        </section>
    )
}

export default HeroSection
