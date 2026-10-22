import React from 'react'
import Link from 'next/link'
import { ArrowUpRight, ArrowRight } from 'lucide-react'
import { getServiceIcon } from '@/actions/servicesAction'
import styles from './ServiceExploreMore.module.css'

export interface ExploreMoreServiceItem {
    slug: string;
    title: string;
    hero_description?: string | null;
    about_description?: string | null;
    badge_text?: string | null;
}

interface ServiceExploreMoreProps {
    services: ExploreMoreServiceItem[];
    currentTitle?: string;
}

const THEME_CLASSES = [
    styles.themeBlue,
    styles.themePurple,
    styles.themeOrange,
    styles.themeGreen,
    styles.themeCyan,
    styles.themeIndigo,
]

function getSnippet(item: ExploreMoreServiceItem): string {
    const raw = item.hero_description || item.about_description || '';
    if (!raw.trim()) {
        return 'Enterprise consulting, architecture design, and end-to-end implementation support.';
    }
    const clean = raw.trim();
    if (clean.length <= 110) return clean;
    const cut = clean.slice(0, 105);
    const lastSpace = cut.lastIndexOf(' ');
    return (lastSpace > 60 ? cut.slice(0, lastSpace) : cut) + '...';
}

const ServiceExploreMore: React.FC<ServiceExploreMoreProps> = ({ services, currentTitle }) => {
    if (!services || services.length === 0) {
        return null;
    }

    return (
        <section
            className={`py-20 md:py-24 border-t border-slate-100 ${styles.sectionWrapper}`}
            aria-labelledby="more-services-heading"
        >
            <div className="container mx-auto px-5 md:px-8">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
                    <div className="inline-flex justify-center items-center pb-3">
                        <div className={styles.badge} data-aos="fade-down">
                            <span className={styles.badgeDot} />
                            <span>Related Capabilities</span>
                            <span className={styles.badgeDot} />
                        </div>
                    </div>

                    <h2
                        id="more-services-heading"
                        className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0D1526] tracking-[-1px] leading-tight"
                        data-aos="fade-up"
                    >
                        Explore More <span className={styles.gradientText}>Services</span>
                    </h2>

                    <p
                        className="mt-4 text-base sm:text-lg text-[#64748B] max-w-2xl mx-auto leading-relaxed"
                        data-aos="fade-up"
                        data-aos-delay="100"
                    >
                        Accelerate your digital transformation with our complete ecosystem of cloud, ERP, CRM, and API integration capabilities.
                    </p>
                </div>

                {/* Interactive Cards Grid */}
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 list-none p-0 m-0">
                    {services.map((item, index) => {
                        const Icon = getServiceIcon(item.slug || item.title)
                        const themeClass = THEME_CLASSES[index % THEME_CLASSES.length]
                        const description = getSnippet(item)

                        return (
                            <li
                                key={item.slug}
                                className="flex"
                                data-aos="fade-up"
                                data-aos-delay={(index % 6) * 100}
                            >
                                <Link
                                    href={`/services/${item.slug}`}
                                    className={`${styles.card} w-full group`}
                                    aria-label={`Explore ${item.title}`}
                                >
                                    <div>
                                        {/* Card Top Row: Icon + Arrow Button */}
                                        <div className="flex items-center justify-between mb-5">
                                            <div className={`${styles.iconContainer} ${themeClass}`}>
                                                <Icon size={24} />
                                            </div>

                                            <div className={styles.arrowBtn} aria-hidden="true">
                                                <ArrowUpRight size={19} />
                                            </div>
                                        </div>

                                        {/* Card Title */}
                                        <h3 className={styles.cardTitle}>
                                            {item.title}
                                        </h3>

                                        {/* Card Snippet */}
                                        <p className={styles.cardDescription}>
                                            {description}
                                        </p>
                                    </div>

                                    {/* Card Footer: Interactive Learn More */}
                                    <div className={styles.cardFooter}>
                                        <span>View service details</span>
                                        <ArrowRight size={15} className={styles.cardFooterArrow} />
                                    </div>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </section>
    )
}

export default ServiceExploreMore
