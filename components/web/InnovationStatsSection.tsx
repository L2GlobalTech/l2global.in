'use client'

import React, { FC, useEffect, useRef, useState } from 'react'
import GradientButton from '../shared/GradientButton'
import { MoveRight } from 'lucide-react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Link from 'next/link'


interface StatCardProps {
    bg: string
    text?: string
    height: string
    number: string
    title: React.ReactNode
    aos?: string
    delay?: number
}

const StatCard: FC<StatCardProps> = ({
    bg,
    text = 'text-black',
    height,
    number,
    title,
    aos = 'zoom-in',
    delay = 0,
}) => {
    const cardRef = useRef<HTMLDivElement | null>(null)
    const [count, setCount] = useState(0)
    const [started, setStarted] = useState(false)

    const target = parseInt(number, 10)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !started) {
                    setStarted(true)
                }
            },
            { threshold: 0.4 }
        )

        if (cardRef.current) observer.observe(cardRef.current)

        return () => observer.disconnect()
    }, [started])

    useEffect(() => {
        if (!started) return

        let current = 0
        const duration = 3000
        const step = target / (duration / 16)

        const timer = setInterval(() => {
            current += step
            if (current >= target) {
                setCount(target)
                clearInterval(timer)
            } else {
                setCount(Math.ceil(current))
            }
        }, 16)

        return () => clearInterval(timer)
    }, [started, target])

    return (
        <div
            ref={cardRef}
            className={`${bg} ${text} w-full rounded-4xl`}
            data-aos={aos}
            data-aos-delay={delay}
        >
            <div className={`${height} p-4 flex flex-col justify-between`}>
                <div className="text-4xl font-bold">
                    {count}+
                </div>
                <div style={{ letterSpacing: '-0.5px', lineHeight: '26px' }}>
                    {title}
                </div>
            </div>
        </div>
    )
}



interface IProps {
    title: React.ReactNode
    description: React.ReactNode
    btn?: string
    btnLink?: string
    firstBoxNumber: string
    firstBoxTitle: React.ReactNode
    secondBoxNumber: string
    secondBoxTitle: React.ReactNode
    thirdBoxNumber: string
    thirdBoxTitle: React.ReactNode
    fourthBoxNumber: string
    fourthBoxTitle: React.ReactNode
    firstBoxColor?: string
    secondBoxColor?: string
    thirdBoxColor?: string
    fourthBoxColor?: string
}

const InnovationStatsSection: FC<IProps> = ({
    title,
    description,
    btn,
    firstBoxColor = 'bg-[#0A183A]',
    secondBoxColor = 'bg-[#EFF1F7]',
    thirdBoxColor = 'bg-[#FFCA9C]',
    fourthBoxColor = 'bg-[#4869FF]',
    firstBoxNumber,
    firstBoxTitle,
    secondBoxNumber,
    secondBoxTitle,
    thirdBoxNumber,
    thirdBoxTitle,
    fourthBoxNumber,
    fourthBoxTitle,
    btnLink
}) => {

    useEffect(() => {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 150,
        })
        AOS.refresh()
    }, [])

    return (
        <div className="w-full py-6 md:py-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-4">

                {/* LEFT */}
                <div className="space-y-1" data-aos="fade-right">
                    <h2
                        className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#0A183A]"
                        style={{ letterSpacing: '-0.5px' }}
                    >
                        {title}
                    </h2>

                    {btn && (
                        <div
                            data-aos="fade-up"
                            data-aos-delay="150"
                            className="inline-flex items-center gap-2 group mt-3 cursor-pointer"
                        >
                            <Link
                                href={btnLink || '#'}
                                className="relative text-[#F15A23] font-medium text-lg"
                            >
                                {btn}

                                <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-[#F15A23] transition-all duration-300 ease-out group-hover:w-full"></span>
                            </Link>

                            <svg
                                width="18"
                                height="14"
                                viewBox="0 0 18 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="transition-transform duration-300 ease-out group-hover:translate-x-1"
                            >
                                <path
                                    d="M11.25 14L9.64687 12.3667L13.6969 8.16667H0V5.83333H13.6969L9.675 1.63333L11.25 0L18 7L11.25 14Z"
                                    fill="#F15A23"
                                />
                            </svg>
                        </div>
                    )}

                    <div className="hidden lg:flex gap-4 items-end mt-10">
                        <StatCard
                            bg={firstBoxColor}
                            text="text-white"
                            height="h-80"
                            number={firstBoxNumber}
                            title={firstBoxTitle}
                            delay={200}
                        />
                        <StatCard
                            bg={secondBoxColor}
                            height="h-72"
                            number={secondBoxNumber}
                            title={secondBoxTitle}
                            delay={350}
                        />
                    </div>
                </div>

                {/* RIGHT */}
                <div className="flex flex-col justify-between space-y-6">
                    <div
                        className="text-sm sm:text-base text-[#494852]"
                        data-aos="fade-left"
                    >
                        {description}
                    </div>

                    <div className="hidden lg:flex gap-4 items-end">
                        <StatCard
                            bg={thirdBoxColor}
                            height="h-56"
                            number={thirdBoxNumber}
                            title={thirdBoxTitle}
                            delay={200}
                        />
                        <StatCard
                            bg={fourthBoxColor}
                            text="text-white"
                            height="h-44"
                            number={fourthBoxNumber}
                            title={fourthBoxTitle}
                            delay={350}
                        />
                    </div>
                </div>

                {/* MOBILE */}
                <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-2">
                    <StatCard bg={firstBoxColor} text="text-white" height="h-40" number={firstBoxNumber} title={firstBoxTitle} aos="fade-up" />
                    <StatCard bg={secondBoxColor} height="h-40" number={secondBoxNumber} title={secondBoxTitle} aos="fade-up" delay={150} />
                    <StatCard bg={thirdBoxColor} height="h-40" number={thirdBoxNumber} title={thirdBoxTitle} aos="fade-up" delay={300} />
                    <StatCard bg={fourthBoxColor} text="text-white" height="h-40" number={fourthBoxNumber} title={fourthBoxTitle} aos="fade-up" delay={450} />
                </div>

            </div>
        </div>
    )
}

export default InnovationStatsSection
