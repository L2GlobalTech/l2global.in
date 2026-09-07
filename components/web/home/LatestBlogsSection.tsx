'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen, Calendar, Clock, ChevronRight, Layers, Workflow, Cpu, Cloud, Database } from 'lucide-react';
import { BlogPost } from '@/types';
import { getPublicBlogs } from '@/app/(asgard)/asgard/blogs/action';
import Divider from '../Divider';
import SectionHeader from '../SectionHeader';

const calculateReadTime = (content: string) => {
    if (!content) return '1 min read';
    const words = content.replace(/<[^>]*>/g, '').trim().split(/\s+/).length;
    const minutes = Math.max(1, Math.ceil(words / 200));
    return `${minutes} min read`;
};

const getCategoryIcon = (category?: string, slug?: string) => {
    const cat = (category || '').toLowerCase();
    const slg = (slug || '').toLowerCase();

    if (slg.includes('salesforce') || slg.includes('crm') || cat.includes('salesforce') || cat.includes('crm')) {
        return {
            icon: Workflow,
            gradient: 'from-[#074FDA]/10 to-[#3B82F6]/10',
            accent: 'text-[#074FDA]',
            badgeBg: 'bg-[#074FDA]/10 text-[#074FDA] border-[#074FDA]/20',
            border: 'border-l-4 border-l-[#074FDA]'
        };
    }
    if (slg.includes('mulesoft') || slg.includes('boomi') || cat.includes('integration')) {
        return {
            icon: Cpu,
            gradient: 'from-[#F15A23]/10 to-[#FF7E50]/10',
            accent: 'text-[#F15A23]',
            badgeBg: 'bg-[#F15A23]/10 text-[#F15A23] border-[#F15A23]/20',
            border: 'border-l-4 border-l-[#F15A23]'
        };
    }
    if (slg.includes('aws') || slg.includes('cloud') || cat.includes('cloud') || cat.includes('devops')) {
        return {
            icon: Cloud,
            gradient: 'from-sky-500/10 to-indigo-500/10',
            accent: 'text-sky-600',
            badgeBg: 'bg-sky-50 text-sky-700 border-sky-200',
            border: 'border-l-4 border-l-sky-500'
        };
    }
    if (slg.includes('oracle') || slg.includes('database') || cat.includes('database') || cat.includes('oracle')) {
        return {
            icon: Database,
            gradient: 'from-amber-500/10 to-red-500/10',
            accent: 'text-amber-600',
            badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
            border: 'border-l-4 border-l-amber-500'
        };
    }
    return {
        icon: Layers,
        gradient: 'from-slate-500/10 to-gray-500/10',
        accent: 'text-slate-700',
        badgeBg: 'bg-slate-100 text-slate-700 border-slate-200',
        border: 'border-l-4 border-l-slate-600'
    };
};

const LatestBlogsSection: React.FC = () => {
    const [blogs, setBlogs] = useState<BlogPost[]>([]);

    useEffect(() => {
        let isMounted = true;
        getPublicBlogs().then((data) => {
            if (isMounted && data && data.length > 0) {
                setBlogs(data.slice(0, 3));
            }
        }).catch(console.error);
        return () => { isMounted = false; };
    }, []);

    if (blogs.length === 0) return null;

    return (
        <section className="py-16 bg-[#F6F5F8]">
            <div data-aos="fade-up">
                <Divider className="text-black" blur={true} label="Engineering Journal" pillClassName="bg-white" />
            </div>

            <div className="container mx-auto px-4 lg:px-8 mt-2 md:mt-6">
                <div data-aos="fade-up" data-aos-delay="100">
                    <SectionHeader
                        title="Latest Insights & Architecture Guides"
                        desc="Stay updated with enterprise integration patterns, Salesforce, SAP, and cloud engineering insights."
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    {blogs.map((post, idx) => {
                        const styleInfo = getCategoryIcon(post.category, post.slug);
                        const CategoryIcon = styleInfo.icon;

                        return (
                            <article
                                key={post.id}
                                data-aos="zoom-in"
                                data-aos-delay={200 + idx * 100}
                                className={`bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:border-slate-300 hover:shadow-lg transition-all duration-300 ease-out hover:-translate-y-1 ${styleInfo.border}`}
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <div className={`p-2.5 rounded-xl bg-slate-50 border border-slate-100 ${styleInfo.accent}`}>
                                            <CategoryIcon className="w-5 h-5" />
                                        </div>
                                        <span className={`px-2.5 py-0.5 rounded text-[11px] font-bold border ${styleInfo.badgeBg}`}>
                                            {post.category}
                                        </span>
                                    </div>

                                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 leading-snug hover:text-[#074FDA] transition-colors line-clamp-2">
                                        <Link href={`/blog/${post.slug}`}>
                                            {post.title}
                                        </Link>
                                    </h3>

                                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-3 mb-6 font-normal">
                                        {post.excerpt}
                                    </p>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-4 pt-3 border-t border-slate-100">
                                        <div className="flex items-center gap-1.5">
                                            <Calendar className="w-3.5 h-3.5 text-[#F15A23]" />
                                            <span>{new Date(post.datePublished).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                                            <span>{calculateReadTime(post.content)}</span>
                                        </div>
                                    </div>

                                    <Link
                                        href={`/blog/${post.slug}`}
                                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#074FDA] hover:text-[#053aa4] transition-colors group"
                                    >
                                        <span>Read Article</span>
                                        <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </article>
                        );
                    })}
                </div>

                <div className="text-center mt-10" data-aos="fade-up" data-aos-delay="400">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-slate-200 text-slate-800 hover:text-[#074FDA] hover:border-[#074FDA] text-xs font-bold transition-all shadow-xs"
                    >
                        <BookOpen className="w-4 h-4 text-[#F15A23]" />
                        <span>View All Publications</span>
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default LatestBlogsSection;
