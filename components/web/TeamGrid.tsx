"use client";

import React, { useState, useEffect, useMemo } from "react";
import { fetchTeamMembers, TeamMemberRecord } from "@/actions/teamAction";
import { getMediaPublicUrl } from "@/actions/mediaAction";
import { User, Award, Linkedin, Twitter, ArrowUpRight, Briefcase, Sparkles } from "lucide-react";
import Divider from "./Divider";
import SectionHeader from "./SectionHeader";

interface GridMember {
    id?: string;
    name: string;
    role: string;
    experience: string;
    expertise: string;
    description: string;
    certification?: string;
    img?: string | null;
    color: string;
    is_director?: boolean | null;
    linkedin?: string;
    twitter?: string;
}

const DIRECTOR_DETAILS: Record<
    string,
    { designation: string; experience: string; expertise: string; description: string }
> = {
    venkat: {
        designation: "Managing Director",
        experience: "16+ Years Experience",
        expertise: "Salesforce & Cloud Architecture",
        description: "Driving enterprise digital transformation through scalable cloud solutions and innovation.",
    },
    "teja rani": {
        designation: "Director of Technology",
        experience: "12+ Years Experience",
        expertise: "Salesforce CRM & Digital Strategy",
        description: "Empowering global businesses with customized CRM implementations and operational excellence.",
    },
    "satish kumar": {
        designation: "Executive Director",
        experience: "14+ Years Experience",
        expertise: "Enterprise Architecture & MuleSoft",
        description: "Architecting resilient digital ecosystems and high-impact enterprise technology solutions worldwide.",
    },
    "vijay krishna": {
        designation: "Director of Enterprise Solutions",
        experience: "15+ Years Experience",
        expertise: "SAP S/4HANA & Digital ERP",
        description: "Modernizing complex enterprise operations with industry-leading SAP systems and strategies.",
    },
    rajesh: {
        designation: "Director of Global Operations",
        experience: "15+ Years Experience",
        expertise: "SAP Consulting & Supply Chain",
        description: "Leading cross-functional international teams to deliver transformative digital business value.",
    },
    anitha: {
        designation: "Director of Innovation",
        experience: "13+ Years Experience",
        expertise: "SAP Analytics & Cloud Integration",
        description: "Guiding organizations toward data-driven growth through state-of-the-art intelligent ERP technologies.",
    },
};

function getMemberDetails(name?: string | null, cert?: string | null) {
    const key = (name || "").toLowerCase().trim();
    if (DIRECTOR_DETAILS[key]) {
        return DIRECTOR_DETAILS[key];
    }
    const isSalesforce = (cert || "").toLowerCase().includes("salesforce");
    const isSAP = (cert || "").toLowerCase().includes("sap");
    const expertise = isSalesforce
        ? "Salesforce & Cloud Integration"
        : isSAP
        ? "SAP ERP & Modernization"
        : cert || "Enterprise Cloud & Integration";

    return {
        designation: "Director",
        experience: "12+ Years Experience",
        expertise,
        description: "Pioneering innovative digital solutions to accelerate enterprise growth and success.",
    };
}

function mapRecordsToGrid(data: TeamMemberRecord[]): GridMember[] {
    return data.map((item) => {
        const resolvedImg = item.image_url
            ? getMediaPublicUrl(item.image_url, 'team_members') || item.image_url
            : null;

        const defaultDetails = getMemberDetails(item.name, item.certification);

        const designation = item.designation?.trim() || defaultDetails.designation;
        const experience = item.experience?.trim() || defaultDetails.experience;
        const expertise = item.expertise?.trim() || defaultDetails.expertise;
        const description = item.short_description?.trim() || defaultDetails.description;

        return {
            id: item.id,
            name: item.name || 'Team Member',
            role: designation,
            experience,
            expertise,
            description,
            certification: item.certification || undefined,
            img: resolvedImg,
            color: item.card_color || '#D0DAE6',
            is_director: item.is_director ?? false,
            linkedin: item.linkedin_url || undefined,
            twitter: item.twitter_url || undefined,
        };
    });
}

interface TeamGridProps {
    initialMembers?: TeamMemberRecord[];
    onlyDirectors?: boolean;
    sectionTitle?: string;
    sectionLabel?: string;
}

export default function TeamGrid({
    initialMembers,
    onlyDirectors = false,
    sectionTitle,
    sectionLabel,
}: TeamGridProps) {
    const [teamList, setTeamList] = useState<GridMember[]>(() => {
        if (initialMembers && initialMembers.length > 0) {
            return mapRecordsToGrid(initialMembers);
        }
        return [];
    });
    const [loading, setLoading] = useState<boolean>(!initialMembers || initialMembers.length === 0);

    useEffect(() => {
        async function loadTeam() {
            try {
                const data = await fetchTeamMembers();
                if (data && data.length > 0) {
                    setTeamList(mapRecordsToGrid(data));
                } else {
                    setTeamList([]);
                }
            } catch (err) {
                console.error("Error loading team members in TeamGrid:", err);
            } finally {
                setLoading(false);
            }
        }
        loadTeam();
    }, []);

    // Filter strictly by is_director === true when onlyDirectors is enabled (no fallback)
    const displayedMembers = useMemo(() => {
        if (!onlyDirectors) return teamList;
        return teamList.filter((m) => Boolean(m.is_director));
    }, [teamList, onlyDirectors]);

    // If no matching members exist, render nothing (no empty container)
    if (displayedMembers.length === 0 && !loading) {
        return null;
    }

    const cardsContent = (
        <div className="flex flex-wrap justify-center gap-6 sm:gap-7 lg:gap-8">
            {displayedMembers.map((item, i) => (
                <div
                    key={item.id || i}
                    data-aos="fade-up"
                    data-aos-delay={i * 90}
                    data-aos-duration="600"
                    data-aos-once="true"
                    className="group relative w-full sm:w-[310px] md:w-[325px] lg:w-[340px] h-[460px] sm:h-[480px] rounded-[28px] overflow-hidden bg-white border border-slate-200/90 shadow-xs hover:shadow-2xl hover:shadow-slate-900/10 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col justify-end cursor-pointer hover:-translate-y-2 will-change-transform"
                >
                    {/* Background Gradient with member custom signature color */}
                    <div
                        className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
                        style={{
                            background: `linear-gradient(180deg, #FFFFFF 0%, ${item.color}25 45%, ${item.color} 100%)`,
                        }}
                    />

                    {/* Ambient subtle light overlay on hover */}
                    <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        style={{
                            background: `radial-gradient(circle at 50% 20%, rgba(255,255,255,0.7), transparent 70%)`,
                        }}
                    />

                    {/* Top Header Floating Badges */}
                    <div className="absolute top-4 inset-x-4 z-20 flex items-center justify-between pointer-events-none gap-2">
                        {/* Director / Leadership Pill */}
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse shrink-0" />
                            <span className="text-[10px] font-bold tracking-wider text-slate-800 uppercase">
                                Director
                            </span>
                        </div>

                        {/* Experience Pill on top right */}
                        <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold tracking-wide shadow-xs">
                            <Briefcase className="w-3 h-3 text-amber-400 shrink-0" />
                            <span>{item.experience}</span>
                        </div>
                    </div>

                    {/* Director Portrait Image - Fully Visible Hero */}
                    <div className="absolute inset-0 z-10 flex items-end justify-center pointer-events-none overflow-hidden pb-14 sm:pb-16">
                        {item.img ? (
                            <img
                                src={item.img}
                                alt={item.name}
                                className="w-full h-full max-h-[85%] object-contain object-bottom drop-shadow-md transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 will-change-transform"
                            />
                        ) : (
                            <div className="w-20 h-20 mb-20 rounded-full bg-white/80 shadow-sm flex items-center justify-center text-slate-400">
                                <User className="w-10 h-10 text-slate-400" />
                            </div>
                        )}
                    </div>

                    {/* Bottom Frosted Glass Drawer: Shows Name, Designation, Experience, Expertise, 10-word description, and LinkedIn */}
                    <div className="relative z-30 p-3 sm:p-3.5 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                        <div className="relative rounded-2xl bg-white/95 backdrop-blur-xl p-3.5 sm:p-4 shadow-lg border border-white/80 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:shadow-2xl group-hover:bg-white/98">
                            {/* Always Visible: Name & Designation */}
                            <div className="flex items-start justify-between gap-2">
                                <div className="min-w-0">
                                    <h4 className="font-bold text-base sm:text-lg text-slate-900 truncate tracking-tight group-hover:text-indigo-600 transition-colors duration-300">
                                        {item.name}
                                    </h4>
                                    <p className="text-xs font-semibold text-indigo-600 truncate mt-0.5">
                                        {item.role}
                                    </p>
                                </div>

                                {/* Quick indicator arrow */}
                                <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-indigo-50 text-slate-400 group-hover:text-indigo-600 flex items-center justify-center shrink-0 transition-all duration-300">
                                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                </div>
                            </div>

                            {/* Expanded Details on Hover (Accordion reveal) */}
                            <div className="director-accordion">
                                <div className="director-accordion-inner space-y-2.5 pt-2.5">
                                    {/* Experience & Expertise Chips */}
                                    <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-slate-100">
                                        {/* Experience */}
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium">
                                            <Briefcase className="w-3 h-3 text-slate-500 shrink-0" />
                                            <span>{item.experience}</span>
                                        </span>

                                        {/* Expertise */}
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 text-[11px] font-semibold border border-indigo-100/60 max-w-full truncate">
                                            <Sparkles className="w-3 h-3 text-indigo-500 shrink-0" />
                                            <span className="truncate">{item.expertise}</span>
                                        </span>
                                    </div>

                                    {/* 10-Word Description */}
                                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                                        <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed italic font-normal">
                                            &ldquo;{item.description}&rdquo;
                                        </p>
                                    </div>

                                    {/* LinkedIn Icon & Connection CTA */}
                                    <div className="flex items-center justify-between pt-1">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                            Director Profile
                                        </span>

                                        <div className="flex items-center gap-1.5">
                                            {item.linkedin ? (
                                                <a
                                                    href={item.linkedin}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#0A66C2] hover:bg-[#004182] text-white text-xs font-semibold shadow-xs hover:scale-105 transition-all"
                                                    title="View LinkedIn Profile"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <Linkedin className="w-3.5 h-3.5 fill-current" />
                                                    <span>LinkedIn</span>
                                                </a>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-400 text-xs font-medium">
                                                    <Linkedin className="w-3.5 h-3.5" />
                                                    <span>LinkedIn</span>
                                                </span>
                                            )}

                                            {item.twitter && (
                                                <a
                                                    href={item.twitter}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-7 h-7 rounded-lg bg-slate-900 hover:bg-black text-white flex items-center justify-center transition-all duration-300 hover:scale-105 shadow-xs"
                                                    title="Twitter / X Profile"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <Twitter className="w-3.5 h-3.5 fill-current" />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    // If section title is provided, wrap in standard section container
    if (sectionTitle) {
        return (
            <div className="py-14">
                <div>
                    {sectionLabel && <Divider className="text-black" blur label={sectionLabel} />}
                    <SectionHeader title={sectionTitle} />
                </div>
                <div className="container mx-auto px-4 mt-8">
                    {cardsContent}
                </div>
            </div>
        );
    }

    return (
        <div className="w-full pb-10">
            {cardsContent}
        </div>
    );
}
