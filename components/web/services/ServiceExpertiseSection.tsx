import React, { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import styles from './ServiceExpertiseSection.module.css'

interface IExperties {
    icon: any,
    title: string,
    description: string,
    iconBg: string,
    gradientBar: string,
}

interface IProps {
    services: IExperties[];
}

const ServiceExpertiseSection: React.FC<IProps> = ({ services }) => {

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

                <div className='flex justify-center items-center pb-5' data-aos="fade-up">

                    <div
                        className="text-sm sm:text-base md:text-lg font-medium bg-white px-3 sm:px-4 py-1 rounded-full flex items-center gap-2 text-black tracking-[-0.5px] sm:tracking-[-1px]"
                    >
                        <span className="w-2 h-2 bg-orange-500 rounded-full" />
                        Our Capabilities
                        <span className="w-2 h-2 bg-orange-500 rounded-full" />
                    </div>
                </div>

                <h1
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center font-semibold text-[#0D1526] leading-tight px-4 tracking-[-1px] md:tracking-[-2px] lg:tracking-[-3px]"
                    data-aos="fade-up"
                    data-aos-delay="100"
                >
                    Your Needs, <span className={styles.gradientText}>Our Expertise</span>
                </h1>

                <p
                    className="text-sm sm:text-base md:text-lg text-[#707A8F] text-center mt-3 px-4 leading-relaxed tracking-[-0.3px] sm:tracking-[-0.5px]"
                    data-aos="fade-up"
                    data-aos-delay="200"
                >
                    Comprehensive enterprise capabilities designed to transform
                    <br className="hidden md:block" /> your operations end-to-end.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                    {services.map((service, index) => {
                        const Icon = service.icon;

                        return (
                            <div
                                key={index}
                                className={`${styles.card} group p-7`}
                                data-aos="fade-up"
                                data-aos-delay={index * 250}                      >
                                <div
                                    className={`w-[52px] h-[52px] rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 ${service.iconBg}`}
                                >
                                    <Icon className="w-6 h-6 text-primary" />
                                </div>

                                <h3 className="text-base font-bold text-foreground mb-2.5 group-hover:text-primary transition-colors">
                                    {service.title}
                                </h3>

                                <p className="text-sm text-[#6b7280] leading-relaxed">
                                    {service.description}
                                </p>

                                <div
                                    className={`mt-5 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-linear-to-br ${service.gradientBar}`}
                                />
                            </div>
                        );
                    })}
                </div>

            </div>
        </div>
    )
}

export default ServiceExpertiseSection