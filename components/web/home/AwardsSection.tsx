'use client'
import { useEffect } from 'react'
import PrimaryButton from '@/components/shared/PrimaryButton'
import awd1 from '../../../public/assets/web/home/awards/clutch.png'
import awd2 from '../../../public/assets/web/home/awards/app-futura.png'
import awd3 from '../../../public/assets/web/home/awards/mobile-app.png'
import awd4 from '../../../public/assets/web/home/awards/finalist.png'
import AOS from 'aos'
import 'aos/dist/aos.css'

const AwardsSection = () => {

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
        <div className="container mx-auto py-4 md:py-8 px-4 sm:px-6">
            <div className="grid grid-cols-12 gap-6">

                <div
                    className="col-span-12 md:col-span-6 flex flex-col justify-center items-center lg:items-start px-6 md:py-12 pt-12 pb-5"
                    data-aos="fade-in"
                    data-aos-delay="100"
                >
                    <span
                        className="text-lg font-medium bg-[#F6F6F9] px-4 py-1 rounded-full flex items-center gap-2 text-black tracking-[-1px]"
                        style={{ letterSpacing: "-1px" }}
                        data-aos="zoom-in"
                        data-aos-delay="200"
                    >
                        <span className="w-2 h-2 bg-orange-500 rounded-full" />
                        Top-Ranked Everywhere
                        <span className="w-2 h-2 bg-orange-500 rounded-full" />
                    </span>

                    <h2
                        className="text-3xl md:text-5xl font-medium leading-tight tracking-[-2px] mt-6 text-center lg:text-left"
                        data-aos="fade-up"
                        data-aos-delay="300"
                    >
                        Businesses trust L2 Global for end-to-end technology services
                    </h2>

                    <div className='my-5' data-aos="fade-up" data-aos-delay="450">
                        <PrimaryButton
                            label='Contact Us'
                            href="/contact-us"
                            icon={
                                <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.25 14L9.64687 12.3667L13.6969 8.16667H0V5.83333H13.6969L9.675 1.63333L11.25 0L18 7L11.25 14Z" fill="white" />
                                </svg>
                            }
                        />
                    </div>
                </div>

                <div
                    className="col-span-12 md:col-span-6 flex justify-center items-center px-6 md:py-12 pb-10"
                    data-aos="fade-left"
                    data-aos-delay="200"
                >
                    <div className="grid grid-cols-2 sm:grid-cols-2 w-full max-w-lg">

                        <div
                            className="flex items-center justify-center p-8 border-b sm:border-b border-[#C9C9CB] border-r"
                            data-aos="zoom-in"
                            data-aos-delay="300"
                        >
                            <img src={awd1.src} alt="Clutch Award" className="max-h-40 object-contain" />
                        </div>

                        <div
                            className="flex items-center justify-center p-8 border-b border-[#C9C9CB]"
                            data-aos="zoom-in"
                            data-aos-delay="450"
                        >
                            <img src={awd2.src} alt="AppFutura Award" className="max-h-40 object-contain" />
                        </div>

                        <div
                            className="flex items-center justify-center p-8 border-r border-[#C9C9CB]"
                            data-aos="zoom-in"
                            data-aos-delay="600"
                        >
                            <img src={awd3.src} alt="Mobile App Award" className="max-h-40 object-contain" />
                        </div>

                        <div
                            className="flex items-center justify-center p-8"
                            data-aos="zoom-in"
                            data-aos-delay="750"
                        >
                            <img src={awd4.src} alt="Finalist Award" className="max-h-40 object-contain" />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default AwardsSection
