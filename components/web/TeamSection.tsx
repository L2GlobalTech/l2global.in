'use client'

import Image from 'next/image'
import SectionHeader from './SectionHeader'
import img1 from '@/public/assets/web/team/ananya.png'
import img2 from '@/public/assets/web/team/aarav.png'
import img3 from '@/public/assets/web/team/pooja.png'
import img4 from '@/public/assets/web/team/neha.png'
import img5 from '@/public/assets/web/team/rohan.png'
import img6 from '@/public/assets/web/team/sneha.png'
import Divider from './Divider'
import male from "@/public/assets/web/male-placeholder.svg";
import female from "@/public/assets/web/female-placeholder.svg";
import Vijay from '../../public/assets/web/team/vijay-krishna.png';
import satish from '../../public/assets/web/team/satish.png';
import Venkat from '../../public/assets/web/team/venkat.png';

interface TeamMember {
    name: React.ReactNode
    role: React.ReactNode
    image: string
    bg: string
    linkedin: string
    twitter: string
    saleforceCertified?: boolean;
    sapCertified?: boolean;
}

const teamMembers: TeamMember[] = [
    {
        name: (
            <div >
                Lenin <br /> Gongati
            </div>
        ),
        role: (
            <div>
                {/* UI/UX <br /> Designer */}
            </div>
        ),
        image: img2.src,
        bg: 'bg-[#A8B7CC]',
        linkedin: 'https://linkedin.com/',
        twitter: 'https://twitter.com/',
        saleforceCertified: true,
    },
    {
        name: (
            <div>
                Teja<br /> Rani
            </div>
        ),
        role: (
            <div>

            </div>
        ),
        image: img1.src,
        bg: 'bg-[#B7AEA2]',
        linkedin: 'https://linkedin.com/',
        twitter: 'https://twitter.com/',
        saleforceCertified: true,
    },
    {
        name: (
            <div>
                Anitha
            </div>
        ),
        role: (
            <div>
                {/* Product <br /> Designer */}
            </div>
        ),
        image: img3.src,
        bg: 'bg-[#F6B3C8]',
        linkedin: 'https://linkedin.com/',
        twitter: 'https://twitter.com/',
        sapCertified: true,
    },
    {
        name: (
            <div>
                Vijay <br /> Krishna
            </div>
        ),
        role: (
            <div>
                {/* UI/UX <br /> Designer */}
            </div>
        ),
        image: Vijay.src,
        bg: 'bg-[#C3A0B9]',
        linkedin: 'https://linkedin.com/',
        twitter: 'https://twitter.com/',
        sapCertified: true,
    },
    {
        name: (
            <div>
                Rajesh <br />  
            </div>
        ),
        role: (
            <div>
                {/* Full Stack <br /> Developer */}
            </div>
        ),
        image: img5.src,
        bg: 'bg-[#F2A76F]',
        linkedin: 'https://linkedin.com/',
        twitter: 'https://twitter.com/',
        sapCertified: true,
    },
    {
        name: (
            <div>
                Satish <br /> Kumar
            </div>
        ),
        role: (
            <div>
                {/* MERN Stack <br /> Developer */}
            </div>
        ),
        image: satish.src,
        bg: 'bg-[#95B4F6]',
        linkedin: 'https://linkedin.com/',
        twitter: 'https://twitter.com/',
        saleforceCertified: true,
    },
    {
        name: (
            <div>
                Venkat
            </div>
        ),
        role: (
            <div>
                {/* MERN Stack <br /> Developer */}
            </div>
        ),
        image: Venkat.src,
        bg: 'bg-[#FF8989]',
        linkedin: 'https://linkedin.com/',
        twitter: 'https://twitter.com/',
        sapCertified: true,
    },
]

export default function TeamSection() {
    return (
        <section className="w-full bg-[#F5FAFF] py-20 px-4">
            <div className="mb-10">
                <Divider label="Meet Our Team" pillClassName="bg-white" />
            </div>

            <div className="container mx-auto">
                <SectionHeader
                    title="We bring a wealth of skills and experience from a wide range of backgrounds."
                    desc="Our philosophy is simple; hire great people and give them the resources and
                    support to do their best work."
                />

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10">
                    {teamMembers.map((member, index) => (
                        <div
                            key={index}
                            data-aos="fade-up"
                            data-aos-delay={index * 150}
                            data-aos-duration="700"
                            data-aos-once="true"
                            className="relative flex flex-col items-center min-h-80"
                        >
                            {/* SOCIAL ICONS – LEFT */}
                            <div className="absolute left-4 top-2/6 -translate-y-1/2 z-20 flex flex-col gap-3">
                                <a
                                    href={member.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex h-9 w-9 items-center justify-center  transition hover:scale-110"
                                >
                                    <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="72" height="72" rx="20" fill="#0B74C7" />
                                        <path d="M25.8031 55.4508H17.6735V29.8666H25.8031V55.4508ZM21.7383 26.2801C19.1082 26.2801 17.1953 24.3672 17.1953 21.7371C17.1953 19.1069 19.3473 17.1941 21.7383 17.1941C24.3685 17.1941 26.2813 19.1069 26.2813 21.7371C26.2813 24.3672 24.3685 26.2801 21.7383 26.2801ZM55.452 55.4508H47.3225V41.5827C47.3225 37.518 45.6487 36.3224 43.2577 36.3224C40.8666 36.3224 38.4756 38.2353 38.4756 41.8218V55.4508H30.3461V29.8666H37.9974V33.4532C38.7147 31.7795 41.584 29.1493 45.6487 29.1493C50.1917 29.1493 54.9738 31.7795 54.9738 39.6699V55.4508H55.452Z" fill="white" />
                                    </svg>

                                </a>

                                <a
                                    href={member.twitter}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex h-9 w-9 items-center justify-center  transition hover:scale-110"
                                >
                                    <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect
                                            width="72"
                                            height="72"
                                            rx="20"
                                            fill="url(#xGradient)"
                                        />
                                        <path
                                            d="M46.4 18H52.5L38.9 33.6L54.9 54H43.1L33.9 41.9L23.3 54H17.2L31.7 37.2L16.5 18H28.6L37 29L46.4 18ZM44.3 50.1H47.7L26.8 21.6H23.2L44.3 50.1Z"
                                            fill="white"
                                        />
                                        <defs>
                                            <linearGradient
                                                id="xGradient"
                                                x1="0"
                                                y1="0"
                                                x2="72"
                                                y2="72"
                                                gradientUnits="userSpaceOnUse"
                                            >
                                                <stop stop-color="#1F2937" />
                                                <stop offset="1" stop-color="#030712" />
                                            </linearGradient>
                                        </defs>
                                    </svg>

                                </a>

                                <div className={`mt-1 mb-4 rounded-lg ${member.saleforceCertified ? "bg-[#0B74C7]" : "bg-[#0FAAFF]"} px-3 py-1.5 text-[10px] uppercase tracking-wider font-bold text-white`}>
                                    {member.saleforceCertified ? "Salesforce" : "SAP"} Certified
                                </div>
                            </div>

                            {/* IMAGE – right bottom */}
                            <div className="absolute -right-16 bottom-0 z-10 h-[300px] w-full sm:w-[90%]">
                                <Image
                                    src={member.image}
                                    alt="team-member"
                                    fill
                                    className="object-contain object-bottom"
                                />
                            </div>

                            {/* NAME CARD */}
                            <div
                                className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] rounded-3xl px-6 py-5 text-white ${member.bg}`}
                            >
                                <h4 className="font-bold text-xl leading-tight">
                                    {member.name}
                                </h4>
                                <p className="text-sm opacity-90 mt-3">
                                    {member.role}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
