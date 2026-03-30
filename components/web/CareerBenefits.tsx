import React from 'react'
import { Users, ShieldCheck, GraduationCap, BarChart3 } from 'lucide-react'
import clsx from 'clsx'
import PrimaryButton from '../shared/PrimaryButton'
import img1 from '@/public/assets/web/career/team.png'
import img2 from '@/public/assets/web/career/future.png'
import img3 from '@/public/assets/web/career/opportunity.png'
import img4 from '@/public/assets/web/career/skills.png'
import Image from 'next/image'


interface Feature {
    title: string
    description: string
    icon: string
    bg: string
    iconColor: string
}

const features: Feature[] = [
    {
        title: 'Team work',
        description:
            'We encourage collaboration where ideas are shared and teams work together efficiently.',
        icon: img1.src,
        bg: 'bg-[#F4F1FF]',
        iconColor: 'text-[#7B61FF]',
    },
    {
        title: 'Secured Future',
        description:
            'We offer stable career paths with consistent growth and long-term opportunities.',
        icon: img2.src,
        bg: 'bg-[#EAF7EE]',
        iconColor: 'text-[#2EAD65]',
    },
    {
        title: 'Learning Opportunity',
        description:
            'Employees gain continuous learning through real projects and expert guidance.',
        icon: img3.src,
        bg: 'bg-[#FFF2E7]',
        iconColor: 'text-[#F2994A]',
    },
    {
        title: 'Upgrade Skills',
        description:
            'Enhance your skills by working with modern tools and technologies.',
        icon: img4.src,
        bg: 'bg-[#ECF7FF]',
        iconColor: 'text-[#56B2FF]',
    },
]

const CareerBenefits = () => {


    return (
        <div className='container mx-auto py-4 md:py-10'>
            <div className='grid lg:grid-cols-2 gap-10 lg:gap-4'>
                <div>
                    <div>
                        {/* Label */}
                        <div
                            className="flex justify-center md:justify-start mb-4"
                            data-aos="zoom-in"
                            data-aos-delay="100"
                        >
                            <span
                                className={clsx(
                                    "inline-flex items-center gap-2 rounded-full",
                                    "px-3 sm:px-4 py-1 sm:py-1.5",
                                    "bg-[#F6F6F9] text-sm sm:text-base "
                                )}
                            >
                                <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                                <span className="whitespace-nowrap font-medium">Benefits</span>
                                <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                            </span>
                        </div>

                        {/* Title */}
                        <h1
                            className="md:tracking-[-4px] tracking-[-1px] text-2xl sm:text-3xl md:text-5xl font-medium text-black leading-snug text-center lg:text-left"
                            data-aos="fade-up"
                            data-aos-delay="200"
                        >
                            Why you Should Join Our Awesome Team
                        </h1>

                        {/* Description */}
                        <p
                            className="text-sm sm:text-base text-black mt-4 max-w-xl text-center lg:text-left"
                            data-aos="fade-up"
                            data-aos-delay="300"
                        >
                            We want to feel like home when you are working at L2 Global Technology Pvt. Ltd. & for that we have curated a great set of benefits for you.
                        </p>

                        {/* Button */}
                        <div
                            className="mb-4 mt-3 md:mt-8 md:mb-0 flex justify-center md:justify-start items-center w-full"
                            data-aos="zoom-in"
                            data-aos-delay="400"
                        >
                            <PrimaryButton
                                href="mailto:careers@l2globaltech.com"
                                label="Join Now"
                                icon={
                                    <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
                                        <path d="M11.25 14L9.64687 12.3667L13.6969 8.16667H0V5.83333H13.6969L9.675 1.63333L11.25 0L18 7L11.25 14Z" fill="white" />
                                    </svg>
                                }
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-14">
                    {features.map((item, index) => (
                        <div key={index}
                            className="gap-4"
                            data-aos="flip-up"
                            data-aos-delay={index * 200}
                            data-aos-duration="800"
                            data-aos-easing="ease-out-cubic" >
                            {/* Icon box */}
                            <div
                                className={`h-16 w-16 rounded-lg flex items-center justify-center ${item.bg} mb-4`}
                            >
                                <div className={item.iconColor}><Image height={0} width={0} src={item.icon} alt='img' className='object-contain h-8 w-8' /></div>
                            </div>

                            {/* Content */}
                            <div>
                                <h3 className="text-2xl font-semibold text-[#0B1C39] mb-2 md:tracking-[-1px] tracking-[-1px]">
                                    {item.title}
                                </h3>
                                <p className="text-[#5F6C87] text-sm leading-relaxed max-w-md">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CareerBenefits