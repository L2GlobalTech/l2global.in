'use client'

import Image from 'next/image'
import React, { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

export interface StepItem {
    step: string
    title: string
    description: string
    image: string
    bgColor: string
    stepColor: string
    dotColor: string
}

interface Props {
    steps: StepItem[]
}

const ProcessSteps: React.FC<Props> = ({ steps }) => {

    useEffect(() => {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 120,
        })
        AOS.refresh()
    }, [])

    return (
        <div className="w-full py-4 md:py-16 mt-4">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

                    {steps.map((item, index) => {
                        const isReverse = index % 2 !== 0

                        return (
                            <div
                                key={index}
                                className="rounded-2xl flex flex-col justify-between items-center text-center"
                                data-aos="fade-up"
                                data-aos-delay={index * 150}
                            >
                                {/* TEXT */}
                                <div
                                    className={`flex flex-col items-center ${
                                        isReverse ? 'lg:order-1' : 'lg:order-2'
                                    }`}
                                    data-aos="fade-up"
                                    data-aos-delay={index * 150 + 100}
                                >
                                    {/* STEP */}
                                    <div
                                        className={`text-sm font-semibold tracking-wide mb-2 ${item.stepColor}`}
                                        style={{ letterSpacing: '-0.5px' }}
                                    >
                                        {item.step}
                                    </div>

                                    {/* TITLE */}
                                    <h3 className="relative text-xl font-bold text-gray-900 mb-2">
                                        <span
                                            className={`absolute -left-2 top-0 h-4 w-4 rounded-full ${item.dotColor} z-0`}
                                        />
                                        <span
                                            className="relative z-10"
                                            style={{ letterSpacing: '-0.5px' }}
                                        >
                                            {item.title}
                                        </span>
                                    </h3>

                                    {/* DESCRIPTION */}
                                    <p
                                        className="text-gray-600 text-sm leading-relaxed max-w-[260px]"
                                        style={{ letterSpacing: '-0.5px', lineHeight: '26px' }}
                                    >
                                        {item.description}
                                    </p>
                                </div>

                                {/* IMAGE */}
                                <div
                                    className={`w-full flex justify-center h-full mt-4 ${
                                        isReverse
                                            ? 'lg:order-2 lg:mt-4'
                                            : 'lg:order-1 lg:mb-4'
                                    }`}
                                    data-aos="zoom-in"
                                    data-aos-delay={index * 150 + 200}
                                >
                                    <div
                                        className={`p-6 rounded-2xl flex justify-center items-center ${item.bgColor}`}
                                    >
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            width={180}
                                            height={180}
                                            className="object-contain"
                                        />
                                    </div>
                                </div>
                            </div>
                        )
                    })}

                </div>
            </div>
        </div>
    )
}

export default ProcessSteps
