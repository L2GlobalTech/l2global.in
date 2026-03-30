import React, { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import styles from './ServiceWhyChooseUs.module.css'
import { Award, Zap, Shield } from "lucide-react";

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

const features = [
    {
        title: "Certified Experts",
        description:
            "A bench of 200+ certified professionals across every major enterprise platform.",
        icon: Award,
        iconColor: "rgb(25, 93, 240)",
        bg: "rgb(226, 235, 253)",
    },
    {
        title: "Proven Methodology",
        description:
            "Battle-tested agile frameworks for predictable delivery and measurable outcomes.",
        icon: Zap,
        iconColor: "rgb(113, 60, 221)",
        bg: "rgb(236, 229, 250)",
    },
    {
        title: "End-to-End Ownership",
        description:
            "We own the full lifecycle — from architecture design to post-go-live managed support.",
        icon: Shield,
        iconColor: "rgb(255, 124, 10)",
        bg: "rgb(255, 239, 224)",
    },
];

const partners = [
    { name: "partner-1", logo: img1.src },
    { name: "partner-2", logo: img2.src },
    { name: "partner-3", logo: img3.src },
    { name: "partner-4", logo: img4.src },
    { name: "partner-5", logo: img5.src },
    { name: "partner-6", logo: img6.src },
    { name: "partner-7", logo: img7.src },
    { name: "partner-8", logo: img8.src },
    { name: "partner-9", logo: img9.src },
    { name: "partner-10", logo: img10.src },
];

const ServiceWhyChooseUs = () => {

    useEffect(() => {
        AOS.init({
            duration: 600,
            once: true,
            easing: 'ease-out',
        })
    }, [])

    return (
        <div className={`${styles.backgroundMesh}`}>
            <div className='py-20 container mx-auto px-5 md:px-0'>

                <div className="flex justify-center items-center pb-4 sm:pb-5 px-4" data-aos="fade-up">
                    <div
                        className="text-sm sm:text-base md:text-lg font-medium bg-white px-3 sm:px-4 py-1 rounded-full flex items-center gap-2 text-black tracking-[-0.5px] sm:tracking-[-1px]"
                    >
                        <span className="w-2 h-2 bg-orange-500 rounded-full" />
                        Why Choose Us
                        <span className="w-2 h-2 bg-orange-500 rounded-full" />
                    </div>
                </div>

                <h1
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center font-semibold text-[#0D1526] leading-tight px-4 tracking-[-1px] md:tracking-[-2px] lg:tracking-[-3px]"
                    data-aos="fade-up"
                    data-aos-delay="100"
                >
                    The <span className={styles.gradientText}>Trusted Partner</span> of Leading Enterprises
                </h1>

                <p
                    className="text-sm sm:text-base md:text-lg text-[#707A8F] text-center mt-3 px-4 leading-relaxed tracking-[-0.3px] sm:tracking-[-0.5px]"
                    data-aos="fade-up"
                    data-aos-delay="200"
                >
                    Comprehensive enterprise capabilities designed to transform
                    <br className="hidden md:block" /> your operations end-to-end.
                </p>

                <div className={styles.wrapper}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                        {features.map((item, index) => {
                            const Icon = item.icon;

                            return (
                                <div
                                    key={index}
                                    className={styles.card}
                                    data-aos="zoom-in"
                                    data-aos-delay={index * 250}
                                >
                                    <div
                                        className={styles.iconBox}
                                        style={{ background: item.bg }}
                                    >
                                        <Icon size={24} style={{ color: item.iconColor }} />
                                    </div>

                                    <h3 className={styles.title}>{item.title}</h3>
                                    <p className={styles.description}>{item.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="text-center mb-8">
                    <p className="text-xs font-semibold uppercase tracking-widest" data-aos="zoom-in" style={{ color: 'hsl(220 12% 50%)' }}>
                        Trusted Leading Partners
                    </p>
                </div>

                <div className={`rounded-2xl p-8 overflow-hidden ${styles.wrapperBrands}`} data-aos="fade-up">
                    <div className={styles.marquee}>
                        {[...partners, ...partners].map((item, index) => (
                            <div key={index} className={styles.logoCard}>
                                <img src={item.logo} alt={item.name} />
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ServiceWhyChooseUs