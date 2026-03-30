'use client'

import clsx from 'clsx'
import Image from 'next/image'
import React, { FC, useEffect } from 'react'
import GradientButton from '../shared/GradientButton'
import { MoveRight } from 'lucide-react'
import PrimaryButton from '../shared/PrimaryButton'

import AOS from 'aos'
import 'aos/dist/aos.css'

interface IProps {
    label: string
    title: string
    description: React.ReactNode
    image: string
}

const ServiceSubHero: FC<IProps> = ({
    label,
    title,
    description,
    image,
}) => {

    useEffect(() => {
        AOS.init({
            duration: 800,
            easing: "ease-out-cubic",
            once: true,
            offset: 150,
            anchorPlacement: "top-bottom",
        })
        AOS.refresh()
    }, [])

    return (
        <div className="container mx-auto px-4 sm:px-6 py-4 md:py-14 lg:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-10 items-center">

                {/* IMAGE */}
                <div
                    className="lg:col-span-6 flex justify-center order-1 lg:order-0"
                    data-aos="fade-right"
                >
                    <img
                        src={image}
                        alt=""
                        className="object-contain w-full h-auto max-w-md lg:max-w-full"
                    />
                </div>

                {/* CONTENT */}
                <div
                    className="lg:col-span-6 text-center lg:text-left order-2 lg:order-0"
                    data-aos="fade-left"
                    data-aos-delay="150"
                >

                    {/* Label */}
                    <div className="flex justify-center lg:justify-start mb-3 sm:mb-4">
                        <span
                            className={clsx(
                                'inline-flex items-center gap-2 rounded-full',
                                'px-3 sm:px-4 py-1 sm:py-1.5',
                                'bg-[#F6F5F8] text-xs sm:text-sm md:text-base'
                            )}
                        >
                            <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                            <span className="whitespace-nowrap" style={{ letterSpacing: '-0.5px' }}>
                                {label}
                            </span>
                            <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                        </span>
                    </div>

                    {/* Title */}
                    <h1
                        className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-medium text-black leading-snug tracking-[-0.5px] md:tracking-[-1.5px]"
                        data-aos="zoom-in"
                        data-aos-delay="250"
                    >
                        {title}
                    </h1>

                    {/* Description */}
                    <div
                        className="text-sm sm:text-base text-black mt-3 sm:mt-4 max-w-xl mx-auto lg:mx-0"
                        style={{ letterSpacing: '-0.5px', lineHeight: '26px' }}
                        data-aos="fade-up"
                        data-aos-delay="350"
                    >
                        {description}
                    </div>

                    {/* Button */}
                    <div
                        className="mt-4 md:mt-8 flex justify-center lg:justify-start mb-4 md:mb-0"
                        data-aos="fade-up"
                        data-aos-delay="450"
                    >
                        <PrimaryButton
                            href="/contact-us"
                            label="Contact Us"
                            icon={
                                <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
                                    <path
                                        d="M11.25 14L9.64687 12.3667L13.6969 8.16667H0V5.83333H13.6969L9.675 1.63333L11.25 0L18 7L11.25 14Z"
                                        fill="white"
                                    />
                                </svg>
                            }
                        />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ServiceSubHero
