'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Divider from './Divider';
import SectionHeader from './SectionHeader';
import { fetchTeamMembers, TeamMemberRecord } from '@/actions/teamAction';
import { getMediaPublicUrl } from '@/actions/mediaAction';
import {
    Search,
    Linkedin,
    Twitter,
    Award,
    Briefcase,
    X,
} from 'lucide-react';

export interface DisplayMember {
    id: string;
    name: string;
    role: string;
    practices: string[];
    primaryDepartment: string;
    experience?: string;
    certification?: string;
    expertise: string[];
    description?: string;
    image: string | null;
    color: string;
    linkedin?: string;
    twitter?: string;
    is_director?: boolean;
}

const DEPARTMENT_BADGE_STYLES: Record<string, { bg: string; text: string; border: string }> = {
    Leadership: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
    Salesforce: { bg: 'bg-sky-50', text: 'text-sky-700', border: 'border-sky-200' },
    SAP: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
    'Cloud & Integration': { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200' },
    'Enterprise Consulting': { bg: 'bg-slate-100', text: 'text-slate-700', border: 'border-slate-200' },
};

function mapRecordToMember(item: TeamMemberRecord): DisplayMember {
    const resolvedImg = item.image_url
        ? getMediaPublicUrl(item.image_url, 'team_members') || item.image_url
        : null;

    const certLower = (item.certification || '').toLowerCase();
    const expLower = (item.expertise || '').toLowerCase();
    const roleLower = (item.designation || '').toLowerCase();
    const descLower = (item.short_description || '').toLowerCase();

    // Collect all matching practices so a member can be in Salesforce/SAP AND Leadership
    const practices: string[] = [];

    const isSalesforce =
        certLower.includes('salesforce') ||
        expLower.includes('salesforce') ||
        roleLower.includes('salesforce') ||
        descLower.includes('salesforce') ||
        certLower.includes('crm') ||
        expLower.includes('crm');

    const isSAP =
        certLower.includes('sap') ||
        expLower.includes('sap') ||
        roleLower.includes('sap') ||
        descLower.includes('sap') ||
        certLower.includes('erp') ||
        expLower.includes('erp');

    const isCloud =
        certLower.includes('cloud') ||
        expLower.includes('cloud') ||
        roleLower.includes('cloud') ||
        certLower.includes('mule') ||
        expLower.includes('mule') ||
        certLower.includes('aws') ||
        certLower.includes('azure');

    if (isSalesforce) practices.push('Salesforce');
    if (isSAP) practices.push('SAP');
    if (isCloud) practices.push('Cloud & Integration');
    if (item.is_director) practices.push('Leadership');

    if (practices.length === 0) {
        practices.push('Enterprise Consulting');
    }

    const primaryDepartment = isSalesforce
        ? 'Salesforce'
        : isSAP
        ? 'SAP'
        : isCloud
        ? 'Cloud & Integration'
        : item.is_director
        ? 'Leadership'
        : 'Enterprise Consulting';

    const expertiseArr = item.expertise
        ? item.expertise.split(',').map((s) => s.trim()).filter(Boolean)
        : item.certification
        ? [item.certification]
        : [];

    return {
        id: item.id || '',
        name: item.name || 'Team Member',
        role: item.designation || (item.is_director ? 'Director' : 'Specialist'),
        practices,
        primaryDepartment,
        experience: item.experience || undefined,
        certification: item.certification || undefined,
        expertise: expertiseArr,
        description: item.short_description || undefined,
        image: resolvedImg,
        color: item.card_color || '#AABBD1',
        linkedin: item.linkedin_url || undefined,
        twitter: item.twitter_url || undefined,
        is_director: item.is_director ?? false,
    };
}

interface TeamSectionProps {
    initialMembers?: TeamMemberRecord[];
}

export default function TeamSection({ initialMembers }: TeamSectionProps) {
    const [members, setMembers] = useState<DisplayMember[]>(() => {
        return (initialMembers || []).map(mapRecordToMember);
    });
    const [loading, setLoading] = useState<boolean>(!initialMembers || initialMembers.length === 0);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('all');

    useEffect(() => {
        async function loadData() {
            try {
                const data = await fetchTeamMembers();
                if (data && data.length > 0) {
                    setMembers(data.map(mapRecordToMember));
                } else if (!initialMembers || initialMembers.length === 0) {
                    setMembers([]);
                }
            } catch (err) {
                console.error('Error fetching team members:', err);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, [initialMembers]);

    // Build dynamic department tabs with accurate counts across all practices
    const departmentTabs = useMemo(() => {
        const counts: Record<string, number> = { all: members.length };
        const practicesSet = new Set<string>();

        members.forEach((m) => {
            m.practices.forEach((p) => {
                counts[p] = (counts[p] || 0) + 1;
                practicesSet.add(p);
            });
        });

        // Preferred ordering of practice tabs
        const preferredOrder = ['Leadership', 'Salesforce', 'SAP', 'Cloud & Integration', 'Enterprise Consulting'];
        const orderedPractices = preferredOrder.filter((p) => practicesSet.has(p));

        // Add any remaining practice not in preferredOrder
        practicesSet.forEach((p) => {
            if (!orderedPractices.includes(p)) orderedPractices.push(p);
        });

        const list = [{ key: 'all', label: 'All Specialists', count: counts.all }];
        orderedPractices.forEach((p) => {
            list.push({ key: p, label: `${p}${p !== 'Leadership' ? ' Practice' : ''}`, count: counts[p] || 0 });
        });

        return { list, counts };
    }, [members]);

    // Filter members based on search and selected department practice
    const filteredMembers = useMemo(() => {
        return members.filter((member) => {
            if (selectedDepartment !== 'all' && !member.practices.includes(selectedDepartment)) {
                return false;
            }

            if (searchQuery.trim()) {
                const query = searchQuery.toLowerCase().trim();
                const matchName = member.name.toLowerCase().includes(query);
                const matchRole = member.role.toLowerCase().includes(query);
                const matchCert = (member.certification || '').toLowerCase().includes(query);
                const matchExp = (member.experience || '').toLowerCase().includes(query);
                const matchDesc = (member.description || '').toLowerCase().includes(query);
                const matchSkills = member.expertise.some((e) => e.toLowerCase().includes(query));

                if (!matchName && !matchRole && !matchCert && !matchExp && !matchDesc && !matchSkills) {
                    return false;
                }
            }

            return true;
        });
    }, [members, selectedDepartment, searchQuery]);

    if (members.length === 0 && !loading) {
        return (
            <section className="w-full bg-[#F8FAFC] py-20 px-4">
                <div className="container mx-auto text-center">
                    <p className="text-slate-500 text-sm">Team member profiles will be published soon.</p>
                </div>
            </section>
        );
    }

    return (
        <section className="w-full bg-[#F8FAFC] py-16 sm:py-20 px-4 sm:px-6">
            <div className="container mx-auto max-w-7xl">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
                    <div className="mb-4 flex justify-center">
                        <Divider label="Our Practice Leaders & Specialists" pillClassName="bg-white shadow-2xs" />
                    </div>
                    <SectionHeader
                        title="Meet the Global Team Driving Enterprise Innovation"
                        desc="A dedicated team of specialized consultants, technical architects, and domain leaders delivering complex Salesforce, SAP, and Cloud transformations across the globe."
                    />
                </div>

                {/* Control Panel: Wrapped Tabs (NO SCROLLBAR) & Search Bar */}
                <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4 sm:p-5 mb-8 transition-all duration-300">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        {/* Practice Category Tabs - Clean Flex Wrap without ANY scrollbars */}
                        <div className="flex flex-wrap items-center gap-2">
                            {departmentTabs.list.map((tab) => {
                                const isActive = selectedDepartment === tab.key;
                                return (
                                    <button
                                        key={tab.key}
                                        type="button"
                                        onClick={() => setSelectedDepartment(tab.key)}
                                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 ease-out cursor-pointer flex items-center gap-2 select-none active:scale-95 ${
                                            isActive
                                                ? 'bg-slate-900 text-white shadow-sm'
                                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                                        }`}
                                    >
                                        <span>{tab.label}</span>
                                        <span
                                            className={`px-1.5 py-0.5 rounded-md text-[10px] font-mono transition-colors duration-200 ${
                                                isActive ? 'bg-white/20 text-white' : 'bg-slate-200/80 text-slate-700'
                                            }`}
                                        >
                                            {tab.count}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Search Input */}
                        <div className="relative w-full md:w-72 shrink-0">
                            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search by name, role, skill..."
                                className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 ease-out text-slate-800 placeholder:text-slate-400"
                            />
                            {searchQuery && (
                                <button
                                    type="button"
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-md cursor-pointer transition-colors duration-200"
                                    title="Clear search"
                                >
                                    <X className="w-3.5 h-3.5" />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Result Counter & Active Filter Reset */}
                    <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                        <span>
                            Showing <strong className="text-slate-800 font-semibold">{filteredMembers.length}</strong> of{' '}
                            <strong className="text-slate-800 font-semibold">{members.length}</strong> specialists
                        </span>
                        {(searchQuery || selectedDepartment !== 'all') && (
                            <button
                                type="button"
                                onClick={() => {
                                    setSearchQuery('');
                                    setSelectedDepartment('all');
                                }}
                                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors duration-200 cursor-pointer"
                            >
                                Reset all filters
                            </button>
                        )}
                    </div>
                </div>

                {/* Team Members Grid - Smooth 4-Column Directory Architecture */}
                {filteredMembers.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 transition-all duration-500 ease-out">
                        {filteredMembers.map((member, index) => {
                            const badgeStyle =
                                DEPARTMENT_BADGE_STYLES[member.primaryDepartment] ||
                                DEPARTMENT_BADGE_STYLES['Enterprise Consulting'];

                            return (
                                <div
                                    key={member.id || index}
                                    data-aos="fade-up"
                                    data-aos-delay={(index % 4) * 40}
                                    data-aos-duration="400"
                                    data-aos-once="true"
                                    className="group relative bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-[0_16px_36px_-8px_rgba(15,23,42,0.1)] hover:border-indigo-200 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col p-5 hover:-translate-y-1.5 will-change-transform"
                                >
                                    {/* Top Row: Avatar & Social Links */}
                                    <div className="flex items-start justify-between gap-3 mb-3.5">
                                        {/* Avatar Container */}
                                        <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-2xl overflow-hidden bg-gradient-to-b from-slate-100 to-slate-200 border border-slate-200/80 shadow-2xs shrink-0 group-hover:border-indigo-400/50 group-hover:shadow-sm transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]">
                                            {member.image ? (
                                                <img
                                                    src={member.image}
                                                    alt={member.name}
                                                    className="w-full h-full object-cover object-top transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-106 will-change-transform"
                                                    onError={(e) => {
                                                        (e.currentTarget as HTMLElement).style.display = 'none';
                                                    }}
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-slate-400 font-bold text-lg bg-slate-100">
                                                    {member.name.charAt(0)}
                                                </div>
                                            )}
                                        </div>

                                        {/* Social Links on top-right */}
                                        <div className="flex items-center gap-1.5 shrink-0">
                                            {member.linkedin && (
                                                <a
                                                    href={member.linkedin}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-[#0A66C2] text-slate-500 hover:text-white flex items-center justify-center transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-110 shadow-2xs"
                                                    title={`${member.name} on LinkedIn`}
                                                >
                                                    <Linkedin className="w-4 h-4 fill-current" />
                                                </a>
                                            )}

                                            {member.twitter && (
                                                <a
                                                    href={member.twitter}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-black text-slate-500 hover:text-white flex items-center justify-center transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-110 shadow-2xs"
                                                    title={`${member.name} on X`}
                                                >
                                                    <Twitter className="w-4 h-4 fill-current" />
                                                </a>
                                            )}
                                        </div>
                                    </div>

                                    {/* Department / Practice Badges */}
                                    <div className="flex flex-wrap items-center gap-1.5 mb-2">
                                        {member.practices.map((p) => {
                                            const pStyle =
                                                DEPARTMENT_BADGE_STYLES[p] ||
                                                DEPARTMENT_BADGE_STYLES['Enterprise Consulting'];
                                            return (
                                                <span
                                                    key={p}
                                                    className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wider uppercase border transition-colors duration-200 ${pStyle.bg} ${pStyle.text} ${pStyle.border}`}
                                                >
                                                    {p}
                                                </span>
                                            );
                                        })}
                                    </div>

                                    {/* Name & Role */}
                                    <h3 className="font-bold text-base sm:text-lg text-slate-900 group-hover:text-indigo-600 transition-colors duration-300 ease-out tracking-tight line-clamp-1 mb-0.5">
                                        {member.name}
                                    </h3>
                                    <p className="text-xs font-semibold text-slate-600 line-clamp-1 mb-2.5">
                                        {member.role}
                                    </p>

                                    {/* Experience & Certification Badges */}
                                    <div className="space-y-1.5 mb-3">
                                        {member.experience && (
                                            <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-600 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100 w-full truncate">
                                                <Briefcase className="w-3 h-3 text-slate-400 shrink-0" />
                                                <span className="truncate">{member.experience}</span>
                                            </div>
                                        )}

                                        {member.certification && (
                                            <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-indigo-700 bg-indigo-50/70 px-2.5 py-1 rounded-lg border border-indigo-100/60 w-full truncate">
                                                <Award className="w-3 h-3 text-indigo-500 shrink-0" />
                                                <span className="truncate">{member.certification}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Description */}
                                    {member.description && (
                                        <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 mb-3.5 flex-1">
                                            {member.description}
                                        </p>
                                    )}

                                    {/* Expertise Skill Tags */}
                                    {member.expertise.length > 0 && (
                                        <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-1 mt-auto">
                                            {member.expertise.slice(0, 3).map((skill, sIdx) => (
                                                <span
                                                    key={sIdx}
                                                    className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-100 text-slate-600 truncate max-w-full"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    /* Empty Search State */
                    <div className="text-center py-14 bg-white rounded-2xl border border-slate-200/90 p-8 max-w-md mx-auto">
                        <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
                            <Search className="w-5 h-5" />
                        </div>
                        <h4 className="font-bold text-base text-slate-900 mb-1">No specialists match your search</h4>
                        <p className="text-xs text-slate-500 mb-4">
                            We couldn&apos;t find any team members matching &ldquo;{searchQuery}&rdquo;.
                        </p>
                        <button
                            type="button"
                            onClick={() => {
                                setSearchQuery('');
                                setSelectedDepartment('all');
                            }}
                            className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors duration-200 cursor-pointer"
                        >
                            Clear Search & Show All
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
