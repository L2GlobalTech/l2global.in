'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
    Calendar,
    Clock,
    User,
    Tag,
    ArrowLeft,
    ArrowRight,
    Share2,
    Linkedin,
    Twitter,
    Facebook,
    Copy,
    Check,
    BookOpen,
    Workflow,
    Cpu,
    Cloud,
    Database,
    Layers,
    ChevronRight,
    Sparkles,
    ShieldCheck,
    Briefcase,
    Loader2
} from 'lucide-react';
import { BlogPost } from '@/types';
import { getPublicBlogByIdOrSlug, getPublicBlogById, getPublicBlogBySlug, getPublicBlogs } from '@/app/(asgard)/asgard/blogs/action';
import { usePathname } from 'next/navigation';

// Helper to calculate read time
const calculateReadTime = (content: string) => {
    if (!content) return '2 min read';
    const words = content.replace(/<[^>]*>/g, '').trim().split(/\s+/).length;
    const minutes = Math.max(1, Math.ceil(words / 200));
    return `${minutes} min read`;
};

// Custom Tech Category Icon Mapper (matching BlogContainer.tsx)
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

interface BlogPostContainerProps {
    post?: BlogPost | null;
    slug?: string;
    relatedPosts?: BlogPost[];
}

const BlogPostContainer: React.FC<BlogPostContainerProps> = ({ post: initialPost, slug: propSlug, relatedPosts: initialRelated = [] }) => {
    const [post, setPost] = useState<BlogPost | null>(initialPost || null);
    const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>(initialRelated);
    const [loading, setLoading] = useState<boolean>(!initialPost && Boolean(propSlug));
    const [copied, setCopied] = useState(false);

    const pathname = usePathname();
    const blogSlug = propSlug || (pathname ? pathname.split('/').filter(Boolean).pop() : '');

    console.log('Blog Slug from page:', blogSlug);

    // Client-side fetch by Slug or ID on change and log fetched data
    useEffect(() => {
        let isMounted = true;
        const currentSlug = blogSlug;

        if (currentSlug) {
            if (!initialPost) {
                setLoading(true);
            }
            getPublicBlogByIdOrSlug(currentSlug)
                .then((data) => {
                    if (isMounted) {
                        console.log('Fetched Blog Details using Slug/ID:', currentSlug, data);
                        if (data) {
                            setPost(data);
                        } else if (!initialPost) {
                            setPost(null);
                        }
                        setLoading(false);
                    }
                })
                .catch((err) => {
                    console.error('Error fetching blog details by slug/id:', err);
                    if (isMounted) setLoading(false);
                });
        } else if (initialPost) {
            setPost(initialPost);
            setLoading(false);
        }

        return () => {
            isMounted = false;
        };
    }, [blogSlug, initialPost]);

    // Fetch related articles if none provided
    useEffect(() => {
        if (relatedPosts.length === 0 && post) {
            getPublicBlogs().then(all => {
                const filtered = all.filter(b => b.slug !== post.slug && String(b.id) !== String(post.id)).slice(0, 3);
                setRelatedPosts(filtered);
            }).catch(console.error);
        }
    }, [relatedPosts.length, post]);

    if (loading) {
        return (
            <div className="bg-[#fcfcfd] min-h-screen text-slate-900 font-sans flex items-center justify-center pt-32 pb-20">
                <div className="text-center bg-white p-8 rounded-2xl border border-slate-200 shadow-xs max-w-sm w-full mx-4">
                    <Loader2 className="w-8 h-8 text-[#074FDA] animate-spin mx-auto mb-3" />
                    <h3 className="text-base font-bold text-slate-900 mb-1">Loading Publication</h3>
                    <p className="text-slate-500 text-xs">Fetching the latest architectural insights...</p>
                </div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="bg-[#fcfcfd] min-h-screen text-slate-900 font-sans flex items-center justify-center pt-32 pb-20">
                <div className="text-center bg-white p-10 rounded-2xl border border-slate-200 shadow-xs max-w-md w-full mx-4">
                    <div className="w-12 h-12 bg-red-50 text-red-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <BookOpen className="w-6 h-6" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 mb-2">Publication Not Found</h2>
                    <p className="text-slate-500 text-xs mb-6 leading-relaxed">
                        The requested article could not be located. It may have been relocated or updated.
                    </p>
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#074FDA] text-white font-bold text-xs hover:bg-[#053aa4] transition-colors shadow-xs"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Return to Engineering Journal</span>
                    </Link>
                </div>
            </div>
        );
    }

    const formattedImageUrl = post.image?.startsWith('http')
        ? post.image
        : `https://l2global.in${post.image?.startsWith('/') ? '' : '/'}${post.image || 'assets/web/og-image.png'}`;

    const readTime = calculateReadTime(post.content);
    const formattedDate = new Date(post.datePublished).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    const styleInfo = getCategoryIcon(post.category, post.slug);
    const CategoryIcon = styleInfo.icon;

    const pageUrl = typeof window !== 'undefined' ? window.location.href : `https://l2global.in/blog/${post.slug || post.id}`;

    const handleCopyLink = () => {
        if (typeof navigator !== 'undefined' && navigator.clipboard) {
            navigator.clipboard.writeText(pageUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 3000);
        }
    };

    const shareOnLinkedIn = () => {
        const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`;
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    const shareOnTwitter = () => {
        const text = encodeURIComponent(`${post.title} via @L2GlobalTech`);
        const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${text}`;
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    const shareOnFacebook = () => {
        const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`;
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    // Article JSON-LD Schema
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        'headline': post.title,
        'image': [formattedImageUrl],
        'datePublished': post.datePublished,
        'dateModified': post.datePublished,
        'author': [{
            '@type': 'Person',
            'name': post.author || 'L2 Global Tech Editorial',
            'jobTitle': post.authorRole || 'Enterprise Integration Experts'
        }],
        'publisher': {
            '@type': 'Organization',
            'name': 'L2 Global Technology Ltd.',
            'logo': {
                '@type': 'ImageObject',
                'url': 'https://l2global.in/assets/web/logo.png'
            }
        },
        'description': post.excerpt,
        'mainEntityOfPage': {
            '@type': 'WebPage',
            '@id': `https://l2global.in/blog/${post.slug || post.id}`
        }
    };

    const hasValidImage = Boolean(
        post.image &&
        post.image.trim() !== '' &&
        !post.image.includes('placeholder')
    );

    return (
        <div className="bg-[#fcfcfd] min-h-screen text-slate-900 font-sans selection:bg-[#074FDA] selection:text-white">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* EDITORIAL ARTICLE MASTHEAD & BREADCRUMBS */}
            <header className="bg-white border-b border-slate-200/80 pt-28 pb-10 md:pt-36 md:pb-12">
                <div className="container mx-auto px-4 lg:px-8 max-w-6xl">

                    {/* Breadcrumbs */}
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-6 flex-wrap">
                        <Link href="/" className="hover:text-[#074FDA] transition-colors">Home</Link>
                        <span>/</span>
                        <Link href="/blog" className="hover:text-[#074FDA] transition-colors">Engineering Journal</Link>
                        <span>/</span>
                        <span className="text-[#074FDA] font-bold">{post.category}</span>
                    </div>

                    {/* Navigation Back Link */}
                    <div className="mb-6">
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-slate-600 hover:text-[#074FDA] transition-all group"
                        >
                            <ArrowLeft className="w-4 h-4 text-[#F15A23] group-hover:-translate-x-1 transition-transform" />
                            <span>ALL PUBLICATIONS</span>
                        </Link>
                    </div>

                    {/* Meta Top Line */}
                    <div className="flex flex-wrap items-center gap-3 mb-6 text-xs">
                        <span className={`px-3 py-1 rounded-md font-bold uppercase tracking-wider text-[11px] border ${styleInfo.badgeBg}`}>
                            {post.category}
                        </span>
                        <span className="text-slate-300">•</span>
                        <div className="flex items-center gap-1.5 text-slate-500 font-mono">
                            <Calendar className="w-3.5 h-3.5 text-[#F15A23]" />
                            <span>{formattedDate}</span>
                        </div>
                        <span className="text-slate-300">•</span>
                        <div className="flex items-center gap-1.5 text-slate-500 font-mono">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            <span>{readTime}</span>
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.15] mb-6 max-w-4xl">
                        {post.title}
                    </h1>

                    {/* Excerpt Lead */}
                    {post.excerpt && (
                        <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-3xl mb-8">
                            {post.excerpt}
                        </p>
                    )}

                    {/* Author Byline */}
                    <div className="flex items-center gap-3.5 pt-6 border-t border-slate-100">
                        <div className="w-11 h-11 rounded-full bg-[#074FDA] text-white font-bold text-sm flex items-center justify-center shadow-xs">
                            {post.author ? post.author.charAt(0) : 'L'}
                        </div>
                        <div>
                            <div className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                                <span>{post.author || 'L2 Global Tech Editorial'}</span>
                                <ShieldCheck className="w-4 h-4 text-[#074FDA]" />
                            </div>
                            <div className="text-xs text-slate-500 font-medium">
                                {post.authorRole || 'Enterprise Integration Architects'}
                            </div>
                        </div>
                    </div>

                </div>
            </header>

            {/* MAIN ARTICLE & SIDEBAR LAYOUT */}
            <main className="container mx-auto px-4 lg:px-8 py-12 max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                    {/* Left Article Body (8 cols) */}
                    <article className="lg:col-span-8">

                        {/* Featured Visual Hero (Image or Sleek Tech Graphic) */}
                        <div className="mb-10 rounded-2xl border border-slate-200 overflow-hidden shadow-xs bg-white">
                            {hasValidImage ? (
                                <div className="relative h-[260px] sm:h-[380px] md:h-[420px] w-full bg-slate-900 overflow-hidden">
                                    <img
                                        src={formattedImageUrl}
                                        alt={post.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ) : (
                                <div className={`bg-gradient-to-br ${styleInfo.gradient} p-8 sm:p-12 flex flex-col items-center justify-center text-center`}>
                                    <div className="w-20 h-20 rounded-2xl bg-white shadow-xs border border-slate-200 flex items-center justify-center mb-4">
                                        <CategoryIcon className={`w-10 h-10 ${styleInfo.accent}`} />
                                    </div>
                                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-500 mb-1">
                                        Architecture Blueprint
                                    </span>
                                    <span className="text-base font-bold text-slate-900">
                                        {post.category} Integration Series
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Rich HTML Content */}
                        <div
                            className="prose prose-slate prose-lg max-w-none 
                            prose-headings:font-black prose-headings:text-slate-900 prose-headings:tracking-tight 
                            prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:border-b prose-h2:border-slate-100 prose-h2:pb-2
                            prose-h3:text-xl prose-h3:sm:text-2xl prose-h3:mt-8 prose-h3:mb-3
                            prose-p:text-slate-700 prose-p:leading-relaxed prose-p:mb-5 prose-p:text-base sm:prose-p:text-[17px]
                            prose-li:text-slate-700 prose-li:leading-relaxed
                            prose-a:text-[#074FDA] prose-a:font-bold hover:prose-a:underline
                            prose-blockquote:border-l-4 prose-blockquote:border-l-[#074FDA] prose-blockquote:bg-blue-50/40 prose-blockquote:p-4 prose-blockquote:rounded-r-xl prose-blockquote:not-italic prose-blockquote:text-slate-800 prose-blockquote:my-6
                            prose-code:text-[#074FDA] prose-code:bg-slate-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:text-sm
                            prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-pre:rounded-xl
                            prose-img:rounded-2xl prose-img:shadow-sm prose-img:border prose-img:border-slate-200
                            prose-table:border prose-th:bg-slate-50 prose-th:p-3 prose-td:p-3 prose-td:border-t"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />

                        {/* Article Tags */}
                        {post.tags && post.tags.length > 0 && (
                            <div className="mt-12 pt-8 border-t border-slate-200">
                                <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-slate-500 mb-3 flex items-center gap-1.5">
                                    <Tag className="w-3.5 h-3.5 text-[#F15A23]" /> Topics Covered
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {post.tags.map((tag) => (
                                        <Link
                                            key={tag}
                                            href={`/blog`}
                                            className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200/80 text-slate-700 font-mono text-xs font-semibold transition-colors"
                                        >
                                            #{tag}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Share Bar at bottom of article */}
                        <div className="mt-8 p-5 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-700 uppercase tracking-wider">
                                <Share2 className="w-4 h-4 text-[#074FDA]" />
                                <span>Share this publication:</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={shareOnLinkedIn}
                                    className="p-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-white hover:bg-[#0077b5] hover:border-[#0077b5] transition-all shadow-2xs"
                                    title="Share on LinkedIn"
                                    aria-label="Share on LinkedIn"
                                >
                                    <Linkedin className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={shareOnTwitter}
                                    className="p-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-white hover:bg-black hover:border-black transition-all shadow-2xs"
                                    title="Share on X / Twitter"
                                    aria-label="Share on X / Twitter"
                                >
                                    <Twitter className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={shareOnFacebook}
                                    className="p-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-white hover:bg-[#4267B2] hover:border-[#4267B2] transition-all shadow-2xs"
                                    title="Share on Facebook"
                                    aria-label="Share on Facebook"
                                >
                                    <Facebook className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={handleCopyLink}
                                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:border-[#074FDA] hover:text-[#074FDA] text-xs font-bold transition-all shadow-2xs"
                                    title="Copy Link"
                                >
                                    {copied ? (
                                        <>
                                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                                            <span className="text-emerald-600">Copied!</span>
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="w-3.5 h-3.5" />
                                            <span>Copy Link</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Author Bio Box */}
                        <div className="mt-10 p-6 sm:p-8 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start gap-5">
                            <div className="w-16 h-16 rounded-2xl bg-[#074FDA] text-white font-black text-2xl flex items-center justify-center flex-shrink-0 shadow-xs">
                                {post.author ? post.author.charAt(0) : 'L'}
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <h4 className="text-base font-bold text-slate-900">{post.author || 'L2 Global Tech Editorial'}</h4>
                                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-blue-50 text-[#074FDA] font-bold border border-blue-100">
                                        Author
                                    </span>
                                </div>
                                <p className="text-xs text-slate-500 font-mono">{post.authorRole || 'Enterprise Integration Experts'}</p>
                                <p className="text-xs text-slate-600 leading-relaxed pt-1">
                                    L2 Global Technology delivers enterprise-grade architecture consulting, Salesforce, SAP Joule AI, MuleSoft integrations, and cloud migration services across the UK, UAE, and GCC markets.
                                </p>
                            </div>
                        </div>

                    </article>

                    {/* Right Sticky Sidebar (4 cols) */}
                    <aside className="lg:col-span-4 space-y-6">
                        <div className="sticky top-28 space-y-6">

                            {/* Publication Details Card */}
                            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
                                <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-slate-500 mb-4 pb-2 border-b border-slate-100">
                                    Article Overview
                                </h4>
                                <div className="space-y-3 text-xs">
                                    <div className="flex items-center justify-between">
                                        <span className="text-slate-500">Category</span>
                                        <span className="font-bold text-slate-900">{post.category}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-slate-500">Read Time</span>
                                        <span className="font-bold text-slate-900">{readTime}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-slate-500">Published</span>
                                        <span className="font-mono text-slate-900">{formattedDate}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-slate-500">Edition</span>
                                        <span className="font-mono text-[#074FDA] font-bold">Vol. 2025</span>
                                    </div>
                                </div>
                            </div>

                            {/* Related Enterprise Service Card */}
                            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:border-[#074FDA]/40 transition-all group">
                                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#F15A23] uppercase tracking-wider mb-2">
                                    <Briefcase className="w-3.5 h-3.5" />
                                    <span>Related Practice</span>
                                </div>
                                <h4 className="font-bold text-slate-900 text-sm mb-1.5 group-hover:text-[#074FDA] transition-colors">
                                    {post.serviceName || 'Enterprise Architecture Services'}
                                </h4>
                                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                                    Discover how L2 Global architects implement this solution for tier-1 enterprises.
                                </p>
                                <Link
                                    href={post.serviceLink || '/services'}
                                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#074FDA] hover:text-[#053aa4] group-hover:gap-2 transition-all"
                                >
                                    <span>Explore Service Capabilities</span>
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </Link>
                            </div>

                            {/* Consultation CTA Widget */}
                            <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-xl p-6 shadow-xs">
                                <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center mb-3">
                                    <Sparkles className="w-4 h-4 text-[#F15A23]" />
                                </div>
                                <h4 className="font-bold text-base mb-1">Architecture Consultation</h4>
                                <p className="text-slate-300 text-xs leading-relaxed mb-4">
                                    Planning a Salesforce, SAP, or MuleSoft transformation? Speak with our principal integration engineers.
                                </p>
                                <Link
                                    href="/contact-us"
                                    className="block w-full text-center py-2.5 rounded-lg bg-[#074FDA] hover:bg-[#053aa4] font-bold text-xs text-white transition-colors shadow-xs"
                                >
                                    Schedule Tech Discussion
                                </Link>
                            </div>

                            {/* Back to Blog Listing button */}
                            <Link
                                href="/blog"
                                className="block w-full text-center py-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs transition-colors shadow-2xs"
                            >
                                ← Browse All Publications
                            </Link>

                        </div>
                    </aside>

                </div>

                {/* MORE FROM THE JOURNAL / RELATED ARTICLES */}
                {relatedPosts && relatedPosts.length > 0 && (
                    <section className="mt-20 pt-12 border-t border-slate-200">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#F15A23]">
                                    Recommended Reading
                                </span>
                                <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                                    More from L2 Global Engineering Journal
                                </h3>
                            </div>
                            <Link
                                href="/blog"
                                className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-[#074FDA] hover:text-[#053aa4]"
                            >
                                <span>View All</span>
                                <ChevronRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {relatedPosts.map((item) => {
                                const itemStyle = getCategoryIcon(item.category, item.slug);
                                const ItemIcon = itemStyle.icon;

                                return (
                                    <article
                                        key={item.id}
                                        className={`bg-white rounded-xl border border-slate-200 p-5 flex flex-col justify-between hover:border-slate-300 hover:shadow-xs transition-all ${itemStyle.border}`}
                                    >
                                        <div>
                                            <div className="flex items-center justify-between mb-3">
                                                <div className={`p-2 rounded-lg bg-slate-50 border border-slate-100 ${itemStyle.accent}`}>
                                                    <ItemIcon className="w-4 h-4" />
                                                </div>
                                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${itemStyle.badgeBg}`}>
                                                    {item.category}
                                                </span>
                                            </div>

                                            <h4 className="text-sm font-bold text-slate-900 mb-2 leading-snug hover:text-[#074FDA] transition-colors line-clamp-2">
                                                <Link href={`/blog/${item.slug}`}>
                                                    {item.title}
                                                </Link>
                                            </h4>

                                            <p className="text-slate-600 text-xs leading-relaxed line-clamp-2 mb-4 font-normal">
                                                {item.excerpt}
                                            </p>
                                        </div>

                                        <div>
                                            <div className="text-[11px] font-mono text-slate-400 mb-3 pt-3 border-t border-slate-100 flex items-center justify-between">
                                                <span>{new Date(item.datePublished).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</span>
                                                <span>{calculateReadTime(item.content)}</span>
                                            </div>

                                            <Link
                                                href={`/blog/${item.slug}`}
                                                className="inline-flex items-center gap-1 text-xs font-bold text-[#074FDA] hover:text-[#053aa4] transition-colors"
                                            >
                                                <span>Read Article</span>
                                                <ChevronRight className="w-3.5 h-3.5" />
                                            </Link>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    </section>
                )}

            </main>
        </div>
    );
};

export default BlogPostContainer;
