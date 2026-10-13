import { canOptimizeServiceImage } from '@/lib/serviceImages'
import React from 'react'
import styles from './ServiceHeroSection.module.css'
import SectionHeader from '../SectionHeader'
import PrimaryButton from '@/components/shared/PrimaryButton'
import Image, { StaticImageData } from 'next/image';
import { renderFormattedTitle } from '@/utils/highlightText';

interface IProps {
    sectionTitle?: string;
    title?: string;
    titleBefore?: string;
    titleAfter?: string;
    linearText?: string;
    description: string;
    tag1?: string;
    tag2?: string;
    tag3?: string;
    image: StaticImageData | string;
    imageAlt?: string;
    ctaHref?: string;
}

const ServiceHeroSection: React.FC<IProps> = ({
    description,
    sectionTitle,
    tag1,
    tag2,
    tag3,
    title,
    titleAfter,
    titleBefore,
    linearText,
    image,
    imageAlt,
    ctaHref = '/contact-us'
}) => {
    const imgSrc = typeof image === 'string' ? image : image?.src || '';
    const renderTag = (tag: any) => {
        if (!tag) return '';
        if (typeof tag === 'string') return tag;
        if (typeof tag === 'object') return tag.text ?? tag.label ?? tag.title ?? '';
        return String(tag);
    };

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
                                {typeof sectionTitle === 'string' ? sectionTitle : (sectionTitle as any)?.text ?? (sectionTitle as any)?.title ?? ''}
                                <span className="w-2 h-2 bg-orange-500 rounded-full" />
                            </div>
                        </div>

                        <h1
                            data-aos="fade-up"
                            data-aos-delay="200"
                            className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-[#0D1526] tracking-[-1px] md:tracking-[-2px] lg:tracking-[-3px] leading-tight">
                            {renderFormattedTitle({
                                title,
                                titleBefore,
                                linearText,
                                titleAfter,
                                customClassName: styles.gradientText,
                            })}
                        </h1>

                        <p
                            data-aos="fade-up"
                            data-aos-delay="300"
                            className='text-[#707A8F] mt-3 font-normal'
                        >
                            {typeof description === 'string' ? description : (description as any)?.text ?? ''}
                        </p>

                        <div className="flex flex-wrap mt-3 items-center gap-3 sm:gap-5">

                            {renderTag(tag1) && (
                                <div
                                    data-aos="fade-up"
                                    data-aos-delay="400"
                                    className={`${styles.badge} flex items-center gap-2`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
                                        <path d="m9 11 3 3L22 4"></path>
                                    </svg>
                                    {renderTag(tag1)}
                                </div>
                            )}

                            {renderTag(tag2) && (
                                <div
                                    data-aos="fade-up"
                                    data-aos-delay="500"
                                    className={`${styles.badge} flex items-center gap-2`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
                                        <path d="m9 11 3 3L22 4"></path>
                                    </svg>
                                    {renderTag(tag2)}
                                </div>
                            )}

                            {renderTag(tag3) && (
                                <div
                                    data-aos="fade-up"
                                    data-aos-delay="600"
                                    className={`${styles.badge} flex items-center gap-2`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
                                        <path d="m9 11 3 3L22 4"></path>
                                    </svg>
                                    {renderTag(tag3)}
                                </div>
                            )}

                        </div>
                        <div
                            data-aos="zoom-in"
                            data-aos-delay="550"
                            className="mb-4 mt-6 md:mt-8 md:mb-0 flex justify-center md:justify-start items-center w-full"
                        >
                            <PrimaryButton
                                href={ctaHref}
                                label={'Get Started Free'}
                                icon={
                                    <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
                                        <path d="M11.25 14L9.64687 12.3667L13.6969 8.16667H0V5.83333H13.6969L9.675 1.63333L11.25 0L18 7L11.25 14Z" fill="white" />
                                    </svg>
                                }
                            />
                        </div>

                    </div>

                    {/* RIGHT IMAGE */}
                    <div
                        data-aos="zoom-in"
                        data-aos-delay="300"
                        data-aos-duration="1000"
                    >
                        {imgSrc && <Image src={image} alt={imageAlt || sectionTitle || 'Service illustration'} width={typeof image === 'string' ? 640 : image.width} height={typeof image === 'string' ? 640 : image.height} sizes="(min-width: 768px) 50vw, 100vw" className="w-full h-auto" priority unoptimized={typeof image === 'string' && !canOptimizeServiceImage(image)} />}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ServiceHeroSection