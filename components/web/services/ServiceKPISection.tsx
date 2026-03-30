import React, { useEffect } from 'react'
import AOS from 'aos'
import SectionHeader from '../SectionHeader'
import styles from './ServiceKPISection.module.css'

interface IStats {
    icon: React.ReactNode;
    number: string;
    title: string;
    subtitle: string;
    gradient: string;
}
interface IProps {
    stats: IStats[]
}

const ServiceKPISection: React.FC<IProps> = ({ stats }) => {


    return (
        <div className='py-20 container mx-auto px-5 md:px-0'>
            <div className="flex justify-center items-center pb-4 sm:pb-5 px-4">
                <div
                    className="text-sm sm:text-base md:text-lg font-medium bg-[#F6F6F9] px-3 sm:px-4 py-1 rounded-full flex items-center gap-2 text-black tracking-[-0.5px] sm:tracking-[-1px] text-center"
                    data-aos="fade-down"
                >
                    <span className="w-2 h-2 bg-orange-500 rounded-full" />
                    Our Numbers Speak
                    <span className="w-2 h-2 bg-orange-500 rounded-full" />
                </div>
            </div>

            <h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center font-semibold text-[#0D1526] px-4 leading-tight tracking-[-1px] md:tracking-[-2px] lg:tracking-[-3px]"
                data-aos="fade-up"
            >
                Results That <span className={styles.gradientText}>Speak Louder</span>
            </h1>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-14">
                {stats.map((item, index) => (
                    <div
                        key={index}
                        className={`${styles.card}`}
                        style={{ animationDelay: `${index * 0.1}s` }}
                        data-aos="fade-up"
                        data-aos-delay={index * 150}
                    >
                        <div className={`${styles.iconBox} ${styles[item.gradient]}`}>
                            <span className={styles.iconText}>
                                {item.icon}
                            </span>
                        </div>

                        <div className={`${styles.number} ${styles[item.gradient + "Text"]}`}>
                            {item.number}
                        </div>

                        <div className={styles.title}>{item.title}</div>
                        <div className={styles.subtitle}>{item.subtitle}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ServiceKPISection