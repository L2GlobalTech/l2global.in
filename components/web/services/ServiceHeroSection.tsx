import React from 'react'
import styles from './ServiceHeroSection.module.css'
import SectionHeader from '../SectionHeader'
import PrimaryButton from '@/components/shared/PrimaryButton'
import { StaticImageData } from 'next/image';

interface IProps {
    sectionTitle: string;
    titleBefore: string;
    titleAfter: string;
    linearText: string;
    description: string;
    tag1: string;
    tag2: string;
    tag3: string;
    image: StaticImageData;
}

const ServiceHeroSection: React.FC<IProps> = ({ description, sectionTitle, tag1, tag2, tag3, titleAfter, titleBefore, linearText, image
}) => {
    return (
        <div className={styles.backgroundMesh}>
            <div className='md:pt-48 pt-32 container mx-auto px-5 md:px-0'>
                <div className='grid md:grid-cols-2 gap-5'>

                    {/* LEFT SIDE */}
                    <div>

                        <div className='flex pb-5'>
                            <div
                                data-aos="fade-down"
                                data-aos-delay="100"
                                className="text-lg font-medium bg-white px-4 py-1 rounded-full flex items-center gap-2 text-black tracking-[-1px]"
                            >
                                <span className="w-2 h-2 bg-orange-500 rounded-full" />
                                {sectionTitle}
                                <span className="w-2 h-2 bg-orange-500 rounded-full" />
                            </div>
                        </div>

                        <h1
                            data-aos="fade-up"
                            data-aos-delay="200"
                            className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-[#0D1526] tracking-[-1px] md:tracking-[-2px] lg:tracking-[-3px]leading-tight">
                            {titleBefore}
                            <br className="hidden md:block" />
                            <span className={styles.gradientText}>{" "}{linearText}</span>{" "}
                            {titleAfter}
                        </h1>

                        <p
                            data-aos="fade-up"
                            data-aos-delay="300"
                            className='text-[#707A8F] mt-3 font-normal'
                        >
                            {description}
                        </p>

                        <div className="flex flex-wrap mt-3 items-center gap-3 sm:gap-5">

                            <div
                                data-aos="fade-up"
                                data-aos-delay="400"
                                className={`${styles.badge} flex items-center gap-2`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
                                    <path d="m9 11 3 3L22 4"></path>
                                </svg>
                                {tag1}
                            </div>

                            <div
                                data-aos="fade-up"
                                data-aos-delay="500"
                                className={`${styles.badge} flex items-center gap-2`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
                                    <path d="m9 11 3 3L22 4"></path>
                                </svg>
                                {tag2}
                            </div>

                            <div
                                data-aos="fade-up"
                                data-aos-delay="600"
                                className={`${styles.badge} flex items-center gap-2`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
                                    <path d="m9 11 3 3L22 4"></path>
                                </svg>
                                {tag3}
                            </div>

                        </div>
                        <div
                            data-aos="zoom-in"
                            data-aos-delay="550"
                            className="mb-4 mt-6 md:mt-8 md:mb-0 flex justify-center md:justify-start items-center w-full"
                        >
                            <PrimaryButton
                                onClick={() => { }}
                                label={'Get Started Free'}
                                icon={
                                    <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
                                        <path d="M11.25 14L9.64687 12.3667L13.6969 8.16667H0V5.83333H13.6969L9.675 1.63333L11.25 0L18 7L11.25 14Z" fill="white" />
                                    </svg>
                                }
                            />
                        </div>

                        <div className={`${styles.wrapper} mt-8 mb-14`}>

                            <div
                                data-aos="fade-up"
                                data-aos-delay="600"
                                className={styles.avatarGroup}
                            >
                                <div className={`${styles.avatar} ${styles.blue}`}></div>
                                <div className={`${styles.avatar} ${styles.purple}`}></div>
                                <div className={`${styles.avatar} ${styles.orange}`}></div>
                                <div className={`${styles.avatar} ${styles.green}`}></div>
                            </div>

                            <div className={styles.divider}></div>

                            <div data-aos="fade-up" data-aos-delay="650">
                                <div className={styles.stars}>
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} viewBox="0 0 24 24" className={styles.starIcon}>
                                            <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                                        </svg>
                                    ))}
                                </div>
                                <p
                                    data-aos="fade-up"
                                    data-aos-delay="700"
                                    className={styles.text}
                                >
                                    Trusted by 500+ enterprises
                                </p>
                            </div>

                        </div>
                    </div>

                    {/* RIGHT IMAGE */}
                    <div
                        data-aos="zoom-in"
                        data-aos-delay="300"
                        data-aos-duration="1000"
                    >
                        <img src={image.src} alt='sap-service' />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ServiceHeroSection