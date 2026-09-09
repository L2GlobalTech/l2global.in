import React, { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import styles from './ServiceHeroSection.module.css'
import PrimaryButton from '@/components/shared/PrimaryButton'
import { StaticImageData } from 'next/image'
import { renderFormattedTitle } from '@/utils/highlightText'

interface IProps {
    title?: string;
    titleBefore?: string;
    titleAfter?: string;
    linearText?: string;
    description: string;
    features: string[];
    image: StaticImageData | string;
}

const ServiceAboutSection: React.FC<IProps> = ({
    description,
    features,
    title,
    linearText,
    titleAfter,
    titleBefore,
    image
}) => {
    const imgSrc = typeof image === 'string' ? image : image?.src || '';

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
            easing: 'ease-in-out',
        })
    }, [])

    return (
        <div className='bg-[#F7F9FD]'>
            <div className='py-20 container mx-auto px-5 md:px-0'>
                <div className='grid md:grid-cols-2 gap-5 items-center'>

                    <div>

                        <div className="flex pb-4 sm:pb-5 px-4" data-aos="fade-up">
                            <div
                                className="text-sm sm:text-base md:text-lg font-medium bg-white px-3 sm:px-4 py-1 rounded-full flex items-center gap-2 text-black tracking-[-0.5px] sm:tracking-[-1px]"
                            >
                                <span className="w-2 h-2 bg-orange-500 rounded-full" />
                                About the Service
                                <span className="w-2 h-2 bg-orange-500 rounded-full" />
                            </div>
                        </div>

                        <div className="px-4">
                            <h2
                                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-[#0D1526] leading-tight tracking-[-1px] md:tracking-[-2px] lg:tracking-[-3px]"
                                data-aos="fade-up"
                                data-aos-delay="100"
                            >
                                {renderFormattedTitle({
                                    title,
                                    titleBefore,
                                    linearText,
                                    titleAfter,
                                    customClassName: styles.gradientText,
                                })}
                            </h2>

                            <p
                                className="text-sm sm:text-base md:text-lg text-[#707A8F] mt-4 font-normal leading-relaxed tracking-[-0.3px] sm:tracking-[-0.5px]"
                                data-aos="fade-up"
                                data-aos-delay="200"
                            >
                                {description}
                            </p>
                            <ul className="space-y-3.5 my-10">
                                {Array.isArray(features) && features.map((item: any, index: number) => {
                                    const featureText = typeof item === 'string' ? item : item?.text ?? item?.title ?? item?.label ?? '';
                                    if (!featureText) return null;
                                    return (
                                        <li
                                            key={index}
                                            className="flex items-start gap-3.5"
                                            data-aos="fade-up"
                                            data-aos-delay={300 + index * 100}
                                        >
                                            <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 bg-linear-to-br from-[#195DF0] to-[#8152E0]">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="w-3 h-3 text-white"
                                                >
                                                    <circle cx="12" cy="12" r="10" />
                                                    <path d="m9 12 2 2 4-4" />
                                                </svg>
                                            </div>

                                            <span className="text-sm text-gray-700 leading-relaxed">
                                                {featureText}
                                            </span>
                                        </li>
                                    );
                                })}
                            </ul>

                            <div
                                className="mb-4 mt-6 md:mt-8 md:mb-0 flex justify-center md:justify-start items-center w-full"
                                data-aos="zoom-in"
                                data-aos-delay="400"
                            >
                                <PrimaryButton
                                    onClick={() => { }}
                                    label={'Get a qoute'}
                                    icon={
                                        <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
                                            <path d="M11.25 14L9.64687 12.3667L13.6969 8.16667H0V5.83333H13.6969L9.675 1.63333L11.25 0L18 7L11.25 14Z" fill="white" />
                                        </svg>
                                    }
                                />
                            </div>

                        </div>

                    </div>

                    <div data-aos="fade-up" data-aos-delay="300" >
                        {imgSrc && <img src={imgSrc} alt={linearText || 'service-about'} className='rounded-xl border border-blue-100' />}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ServiceAboutSection