"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { fetchTeamMembers, TeamMemberRecord } from "@/actions/teamAction";
import { getMediaPublicUrl } from "@/actions/mediaAction";
import { User } from "lucide-react";

interface GridMember {
    id?: string;
    name: string;
    role?: string;
    experience?: string;
    certification?: string;
    img?: string | null;
    color: string;
}

function mapRecordsToGrid(data: TeamMemberRecord[]): GridMember[] {
    return data.map((item) => {
        const resolvedImg = item.image_url
            ? getMediaPublicUrl(item.image_url, 'team_members') || item.image_url
            : null;

        return {
            id: item.id,
            name: item.name || 'Team Member',
            role: '',
            experience: '',
            certification: item.certification || undefined,
            img: resolvedImg,
            color: item.card_color || '#D0DAE6',
        };
    });
}

interface TeamGridProps {
    initialMembers?: TeamMemberRecord[];
}

export default function TeamGrid({ initialMembers }: TeamGridProps) {
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

    if (teamList.length === 0 && !loading) {
        return null;
    }

    return (
        <div className="w-full pb-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 lg:gap-4">
                {teamList.map((item, i) => (
                    <div
                        key={item.id || i}
                        data-aos="fade-up"
                        data-aos-delay={i * 120}
                        data-aos-duration="700"
                        data-aos-once="true"
                        className="p-px"
                    >
                        <div className="bg-white text-center h-full transition-transform duration-300 hover:-translate-y-1 flex flex-col items-center">
                            {/* Image Container with Custom Member Color Gradient */}
                            <div className="relative w-full h-[280px] sm:h-[300px] mb-3">
                                <div
                                    style={{
                                        background: `linear-gradient(to bottom, #FFFFFF, ${item.color})`,
                                        borderColor: item.color,
                                    }}
                                    className="relative w-full h-full rounded-3xl pt-8 border overflow-hidden flex items-end justify-center shadow-xs"
                                >
                                    {item.img ? (
                                        <img
                                            src={item.img}
                                            alt={item.name}
                                            className="w-full h-full object-contain object-bottom drop-shadow-md"
                                            onError={(e) => {
                                                (e.currentTarget as HTMLElement).style.display = 'none';
                                            }}
                                        />
                                    ) : (
                                        <div className="w-20 h-20 mb-12 rounded-full bg-white/70 shadow-sm flex items-center justify-center text-slate-400">
                                            <User className="w-10 h-10 text-slate-400" />
                                        </div>
                                    )}
                                </div>

                                {/* Certification Badge */}
                                {item.certification && (
                                    <span className="absolute top-3.5 right-3.5 text-[10px] uppercase font-bold tracking-wider bg-[#0FAAFF] text-white px-2.5 py-0.5 rounded-full shadow-xs">
                                        {item.certification}
                                    </span>
                                )}
                            </div>

                            {/* Name */}
                            <h4 className="font-semibold text-lg sm:text-xl tracking-tight text-slate-900 mb-0 truncate w-full px-2">
                                {item.name}
                            </h4>

                            {/* Role */}
                            {item.role && (
                                <p className="text-xs sm:text-sm text-slate-600 tracking-normal mt-0.5 truncate w-full px-2">
                                    {item.role}
                                </p>
                            )}

                            {/* Experience */}
                            {item.experience && (
                                <p className="text-xs text-zinc-500 mt-1">
                                    {item.experience}
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
