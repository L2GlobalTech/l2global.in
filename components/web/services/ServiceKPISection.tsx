import React from 'react'
import styles from './ServiceKPISection.module.css'

export interface IStats {
    icon?: React.ReactNode;
    number?: string;
    title?: string;
    subtitle?: string;
    gradient?: string;
}

export interface IProps {
    stats?: IStats[] | null;
    badge?: string | null;
    title?: string | null;
    highlight?: string | null;
    description?: string | null;
}

const ServiceKPISection: React.FC<IProps> = ({
    stats,
    badge,
    title,
    highlight,
    description,
}) => {
    // If there is no stats data from backend, do not render this section at all
    const validStats = Array.isArray(stats)
        ? stats.filter((item) => Boolean(item && (item.number?.trim() || item.title?.trim() || item.subtitle?.trim())))
        : [];

    if (validStats.length === 0) {
        return null;
    }

    const badgeText = badge?.trim() || 'Our Numbers Speak';
    const highlightText = highlight?.trim() || 'Speak Louder';
    const titleText = title?.trim() || 'Results That';

    return (
        <section className='py-20 container mx-auto px-5 md:px-0' aria-label={badgeText}>
            <div className="flex justify-center items-center pb-4 sm:pb-5 px-4">
                <div
                    className="text-sm sm:text-base md:text-lg font-medium bg-[#F6F6F9] px-3 sm:px-4 py-1 rounded-full flex items-center gap-2 text-black tracking-[-0.5px] sm:tracking-[-1px] text-center"
                    data-aos="fade-down"
                >
                    <span className="w-2 h-2 bg-orange-500 rounded-full" />
                    {badgeText}
                    <span className="w-2 h-2 bg-orange-500 rounded-full" />
                </div>
            </div>

            <h2
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center font-semibold text-[#0D1526] px-4 leading-tight tracking-[-1px] md:tracking-[-2px] lg:tracking-[-3px]"
                data-aos="fade-up"
            >
                {titleText} <span className={styles.gradientText}>{highlightText}</span>
            </h2>

            {description?.trim() && (
                <p
                    className="text-center text-gray-600 max-w-2xl mx-auto mt-4 px-4 text-base sm:text-lg"
                    data-aos="fade-up"
                    data-aos-delay="100"
                >
                    {description.trim()}
                </p>
            )}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-14">
                {validStats.map((item, index) => (
                    <div
                        key={index}
                        className={`${styles.card}`}
                        style={{ animationDelay: `${index * 0.1}s` }}
                        data-aos="fade-up"
                        data-aos-delay={index * 150}
                    >
                        <div className={`${styles.iconBox} ${styles[item.gradient || 'blue']}`}>
                            <span className={styles.iconText}>
                                {item.icon}
                            </span>
                        </div>

                        <div className={`${styles.number} ${styles[(item.gradient || 'blue') + "Text"]}`}>
                            {item.number}
                        </div>

                        <div className={styles.title}>{item.title}</div>
                        <div className={styles.subtitle}>{item.subtitle}</div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default ServiceKPISection