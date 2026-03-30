import React, { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import styles from './ServiceServedIndustries.module.css'
import { Banknote, Hospital, ShoppingCart, Factory, GraduationCap, Truck, Building2, Wifi } from "lucide-react";

const industries = [
    {
        name: "Banking & Finance",
        icon: Banknote,
        iconColor: "#195DF0",
        bg: "rgb(226, 235, 253)",
    },
    {
        name: "Healthcare",
        icon: Hospital,
        iconColor: "#2DB470",
        bg: "rgb(226, 248, 237)",
    },
    {
        name: "Retail & E-Commerce",
        icon: ShoppingCart,
        iconColor: "#FF851A",
        bg: "rgb(255, 240, 224)",
    },
    {
        name: "Manufacturing",
        icon: Factory,
        iconColor: "#713CDD",
        bg: "rgb(243, 231, 249)",
    },
    {
        name: "Education",
        icon: GraduationCap,
        iconColor: "#E9B10C",
        bg: "rgb(253, 248, 221)",
    },
    {
        name: "Logistics & Supply Chain",
        icon: Truck,
        iconColor: "#22A5BF",
        bg: "rgb(225, 245, 250)",
    },
    {
        name: "Real Estate",
        icon: Building2,
        iconColor: "#E83030",
        bg: "rgb(252, 232, 232)",
    },
    {
        name: "Telecom & IT",
        icon: Wifi,
        iconColor: "#713CDD",
        bg: "rgb(236, 229, 250)",
    },
];

const ServiceServedIndustries = () => {

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
                        Industries
                        <span className="w-2 h-2 bg-orange-500 rounded-full" />
                    </div>
                </div>

                <h1
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center font-semibold text-[#0D1526] leading-tight px-4 tracking-[-1px] md:tracking-[-2px] lg:tracking-[-3px]"
                    data-aos="fade-up"
                    data-aos-delay="100"
                >
                    Sectors We <span className={styles.gradientText}>Transform</span>
                </h1>

                <p
                    className="text-sm sm:text-base md:text-lg text-[#707A8F] text-center mt-3 px-4 leading-relaxed tracking-[-0.3px] sm:tracking-[-0.5px]"
                    data-aos="fade-up"
                    data-aos-delay="200"
                >
                    Delivering excellence across the industries that power the
                    <br className="hidden md:block" /> global economy.
                </p>

                <div className="py-16">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {industries.map((item, index) => {
                            const Icon = item.icon;

                            return (
                                <div
                                    key={index}
                                    className={`${styles.card} group`}
                                    data-aos="fade-up"
                                    data-aos-delay={index * 250}
                                >
                                    <div
                                        className={styles.iconBox}
                                        style={{ background: item.bg }}
                                    >
                                        <Icon
                                            size={18}
                                            style={{ color: item.iconColor }}
                                        />
                                    </div>

                                    <span className={styles.title}>
                                        {item.name}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ServiceServedIndustries