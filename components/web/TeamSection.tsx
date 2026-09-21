'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import SectionHeader from './SectionHeader'
import Divider from './Divider'
import { fetchTeamMembers, TeamMemberRecord } from '@/actions/teamAction'
import { getMediaPublicUrl } from '@/actions/mediaAction'
import { User } from 'lucide-react'

interface DisplayTeamMember {
    id?: string
    name: string
    role?: string
    image?: string | null
    bg: string
    linkedin?: string
    twitter?: string
    certification?: string
}

function mapRecordsToDisplay(data: TeamMemberRecord[]): DisplayTeamMember[] {
    return data.map((item) => {
        const resolvedImg = item.image_url
            ? getMediaPublicUrl(item.image_url, 'team_members') || item.image_url
            : null

        return {
            id: item.id,
            name: item.name || 'Team Member',
            role: '',
            image: resolvedImg,
            bg: item.card_color || '#AABBD1',
            linkedin: item.linkedin_url || undefined,
            twitter: item.twitter_url || undefined,
            certification: item.certification || undefined,
        }
    })
}

interface TeamSectionProps {
    initialMembers?: TeamMemberRecord[]
}

export default function TeamSection({ initialMembers }: TeamSectionProps) {
    const [members, setMembers] = useState<DisplayTeamMember[]>(() => {
        if (initialMembers && initialMembers.length > 0) {
            return mapRecordsToDisplay(initialMembers)
        }
        return []
    })
    const [loading, setLoading] = useState<boolean>(!initialMembers || initialMembers.length === 0)

    useEffect(() => {
        async function loadData() {
            try {
                const data = await fetchTeamMembers()
                if (data && data.length > 0) {
                    setMembers(mapRecordsToDisplay(data))
                } else {
                    setMembers([])
                }
            } catch (err) {
                console.error('Error fetching team members:', err)
            } finally {
                setLoading(false)
            }
        }

        loadData()
    }, [])

    return (
        <section className="w-full bg-[#F5FAFF] py-20 px-4">
            <div className="mb-10">
                <Divider label="Meet Our Team" pillClassName="bg-white" />
            </div>

            <div className="container mx-auto">
                <SectionHeader
                    title="We bring a wealth of skills and experience from a wide range of backgrounds."
                    desc="Our philosophy is simple; hire great people and give them the resources and support to do their best work."
                />

                {/* Grid */}
                {members.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12 sm:gap-y-16 mt-12">
                        {members.map((member, index) => (
                            <div
                                key={member.id || index}
                                data-aos="fade-up"
                                data-aos-delay={index * 120}
                                data-aos-duration="700"
                                data-aos-once="true"
                                className="relative flex flex-col items-center min-h-[360px] sm:min-h-[380px]"
                            >
                                {/* SOCIAL ICONS & CERTIFICATION – LEFT */}
                                <div className="absolute left-4 top-2/6 -translate-y-1/2 z-20 flex flex-col gap-2.5">
                                    {member.linkedin && (
                                        <a
                                            href={member.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex h-9 w-9 items-center justify-center transition hover:scale-110"
                                            title="LinkedIn"
                                        >
                                            <svg width="36" height="36" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect width="72" height="72" rx="20" fill="#0B74C7" />
                                                <path d="M25.8031 55.4508H17.6735V29.8666H25.8031V55.4508ZM21.7383 26.2801C19.1082 26.2801 17.1953 24.3672 17.1953 21.7371C17.1953 19.1069 19.3473 17.1941 21.7383 17.1941C24.3685 17.1941 26.2813 19.1069 26.2813 21.7371C26.2813 24.3672 24.3685 26.2801 21.7383 26.2801ZM55.452 55.4508H47.3225V41.5827C47.3225 37.518 45.6487 36.3224 43.2577 36.3224C40.8666 36.3224 38.4756 38.2353 38.4756 41.8218V55.4508H30.3461V29.8666H37.9974V33.4532C38.7147 31.7795 41.584 29.1493 45.6487 29.1493C50.1917 29.1493 54.9738 31.7795 54.9738 39.6699V55.4508H55.452Z" fill="white" />
                                            </svg>
                                        </a>
                                    )}

                                    {member.twitter && (
                                        <a
                                            href={member.twitter}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex h-9 w-9 items-center justify-center transition hover:scale-110"
                                            title="Twitter / X"
                                        >
                                            <svg width="36" height="36" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                                                        <stop stopColor="#1F2937" />
                                                        <stop offset="1" stopColor="#030712" />
                                                    </linearGradient>
                                                </defs>
                                            </svg>
                                        </a>
                                    )}

                                    {member.certification && (
                                        <div className="mt-1 rounded-lg bg-[#0B74C7] px-3 py-1.5 text-[10px] uppercase tracking-wider font-bold text-white shadow-xs max-w-[130px] text-center">
                                            {member.certification}
                                        </div>
                                    )}
                                </div>

                                {/* IMAGE – right bottom */}
                                <div className="absolute -right-12 sm:-right-16 bottom-0 z-10 h-[290px] sm:h-[320px] w-full sm:w-[90%] pointer-events-none flex items-end justify-center">
                                    {member.image ? (
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="w-full h-full object-contain object-bottom drop-shadow-md"
                                            onError={(e) => {
                                                (e.currentTarget as HTMLElement).style.display = 'none';
                                            }}
                                        />
                                    ) : (
                                        <div className="w-24 h-24 mb-16 rounded-full bg-white/80 shadow-md flex items-center justify-center text-slate-400">
                                            <User className="w-12 h-12 text-slate-400" />
                                        </div>
                                    )}
                                </div>

                                {/* NAME CARD */}
                                <div
                                    style={{ backgroundColor: member.bg }}
                                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[92%] rounded-2xl sm:rounded-3xl px-6 py-4 sm:py-5 text-white shadow-sm transition-all"
                                >
                                    <h4 className="font-bold text-lg sm:text-xl leading-tight">
                                        {member.name}
                                    </h4>
                                    {member.role && (
                                        <p className="text-xs sm:text-sm opacity-90 mt-1">
                                            {member.role}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : !loading ? (
                    <div className="text-center py-16">
                        <p className="text-slate-500 text-sm">Our team members will be published soon.</p>
                    </div>
                ) : null}
            </div>
        </section>
    )
}
