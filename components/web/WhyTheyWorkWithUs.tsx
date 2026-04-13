import React from 'react'
import { MoveRight } from 'lucide-react'
import WhyTheyWorkWithUsCarousel from './WhyTheyWorkWithUsCarousel'
import img1 from '@/public/assets/web/partners/logo2.svg'
import img2 from '@/public/assets/web/partners/logo3.svg'
import img3 from '@/public/assets/web/partners/logo4.svg'
import img4 from '@/public/assets/web/partners/logo5.svg'
import img5 from '@/public/assets/web/partners/logo6.svg'
import img6 from '@/public/assets/web/partners/logo7.svg'
import img7 from '@/public/assets/web/partners/logo8.svg'
import img8 from '@/public/assets/web/partners/logo9.svg'
import img9 from '@/public/assets/web/partners/logo10.svg'
import img10 from '@/public/assets/web/partners/logo11.svg'
import PrimaryButton from '../shared/PrimaryButton'

const partnersLogos = [
    { id: "partner-1", src: img1.src, alt: "partner-1", },
    { id: "partner-2", src: img2.src, alt: "partner-2", },
    { id: "partner-3", src: img3.src, alt: "partner-3", },
    { id: "partner-4", src: img4.src, alt: "partner-4", },
    { id: "partner-5", src: img5.src, alt: "partner-5", },
    { id: "partner-6", src: img6.src, alt: "partner-6", },
    { id: "partner-7", src: img7.src, alt: "partner-7", },
    { id: "partner-8", src: img8.src, alt: "partner-8", },
    { id: "partner-9", src: img9.src, alt: "partner-9", },
    { id: "partner-10", src: img10.src, alt: "partner-10", },
];

const WhyTheyWorkWithUs = () => {
    return (
        <div className="container mx-auto px-4 sm:px-6 py-4 md:py-8 lg:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-8 lg:gap-10 items-center">

                {/* LEFT CONTENT */}
                <div
                    className="lg:col-span-5 text-center lg:text-left"
                    data-aos="fade-right"
                    data-aos-duration="800"
                    data-aos-once="true"
                >
                    <div
                        className="text-3xl sm:text-4xl lg:text-5xl capitalize font-medium"
                        style={{ letterSpacing: '-0.5px' }}
                        data-aos="fade-up"
                        data-aos-delay="100"
                    >
                        why should they work with us?
                    </div>

                    <div
                        className="my-4 text-sm sm:text-md text-[#494852] font-normal max-w-xl mx-auto lg:mx-0"
                        style={{ letterSpacing: '-0.5px', lineHeight: '26px' }}
                        data-aos="fade-up"
                        data-aos-delay="250"
                    >
                        Our expertise, transparency, and commitment to quality set us apart.
                        Trusted by companies across industries to drive measurable success.
                    </div>

                    <div
                        className="flex justify-center lg:justify-start"
                        data-aos="zoom-in"
                        data-aos-delay="400"
                        data-aos-once="true"
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

                {/* RIGHT CAROUSEL */}
                <div
                    className="lg:col-span-7 bg-gray-100 rounded-4xl py-6 sm:py-8"
                    data-aos="fade-left"
                    data-aos-delay="200"
                    data-aos-duration="900"
                    data-aos-once="true"
                >
                    <WhyTheyWorkWithUsCarousel items={partnersLogos} direction="left" className="mt-5" />
                    <WhyTheyWorkWithUsCarousel items={partnersLogos} direction="right" />
                    <WhyTheyWorkWithUsCarousel items={partnersLogos} direction="left" />
                </div>

            </div>
        </div>
    )
}

export default WhyTheyWorkWithUs
