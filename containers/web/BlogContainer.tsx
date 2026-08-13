'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
    Calendar, 
    ArrowRight, 
    Search, 
    Clock, 
    Tag, 
    BookOpen, 
    Sparkles, 
    Mail, 
    Filter,
    X,
    Cpu,
    Database,
    Cloud,
    Workflow,
    Layers,
    LayoutGrid,
    List,
    ChevronRight
} from 'lucide-react';
import { blogPosts } from '@/constants/blogData';

// Helper to calculate read time
const calculateReadTime = (content: string) => {
    const words = content.replace(/<[^>]*>/g, '').trim().split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min read`;
};

// Custom Tech Category Icon Mapper (Replaces cringe stock photos with sleek tech iconography)
const getCategoryIcon = (category: string, slug: string) => {
    if (slug.includes('salesforce') || slug.includes('crm')) {
        return {
            icon: Workflow,
            gradient: 'from-[#074FDA]/10 to-[#3B82F6]/10',
            accent: 'text-[#074FDA]',
            badgeBg: 'bg-[#074FDA]/10 text-[#074FDA] border-[#074FDA]/20',
            border: 'border-l-4 border-l-[#074FDA]'
        };
    }
    if (slug.includes('mulesoft') || slug.includes('boomi') || category.includes('Integration')) {
        return {
            icon: Cpu,
            gradient: 'from-[#F15A23]/10 to-[#FF7E50]/10',
            accent: 'text-[#F15A23]',
            badgeBg: 'bg-[#F15A23]/10 text-[#F15A23] border-[#F15A23]/20',
            border: 'border-l-4 border-l-[#F15A23]'
        };
    }
    if (slug.includes('aws') || slug.includes('cloud')) {
        return {
            icon: Cloud,
            gradient: 'from-sky-500/10 to-indigo-500/10',
            accent: 'text-sky-600',
            badgeBg: 'bg-sky-50 text-sky-700 border-sky-200',
            border: 'border-l-4 border-l-sky-500'
        };
    }
    if (slug.includes('oracle') || slug.includes('database')) {
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

const BlogContainer = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [email, setEmail] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);

    // Extract categories & tags
    const categories = useMemo(() => {
        const cats = Array.from(new Set(blogPosts.map(p => p.category)));
        return ['All', ...cats];
    }, []);

    const allTags = useMemo(() => {
        const tagsSet = new Set<string>();
        blogPosts.forEach(p => p.tags.forEach(t => tagsSet.add(t)));
        return Array.from(tagsSet);
    }, []);

    // Filter posts
    const filteredPosts = useMemo(() => {
        return blogPosts.filter(post => {
            const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
            const matchesTag = !selectedTag || post.tags.includes(selectedTag);
            const query = searchQuery.toLowerCase().trim();
            const matchesQuery = !query || 
                post.title.toLowerCase().includes(query) ||
                post.excerpt.toLowerCase().includes(query) ||
                post.tags.some(t => t.toLowerCase().includes(query));
            
            return matchesCategory && matchesTag && matchesQuery;
        });
    }, [searchQuery, activeCategory, selectedTag]);

    // Top featured article
    const featuredPost = useMemo(() => {
        if (filteredPosts.length === 0) return null;
        return filteredPosts[0];
    }, [filteredPosts]);

    const remainingPosts = useMemo(() => {
        if (!featuredPost) return [];
        return filteredPosts.slice(1);
    }, [filteredPosts, featuredPost]);

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (email.trim()) {
            setIsSubscribed(true);
            setEmail('');
            setTimeout(() => setIsSubscribed(false), 5000);
        }
    };

    return (
        <div className="bg-[#fcfcfd] min-h-screen text-slate-900 font-sans selection:bg-[#074FDA] selection:text-white">
            
            {/* EDITORIAL PUBLICATION HEADER */}
            <header className="bg-white border-b border-slate-200/80 pt-32 pb-14 md:pt-40 md:pb-16">
                <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
                    
                    {/* Masthead Label */}
                    <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-8">
                        <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-slate-500 uppercase">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span>L2 Global Engineering Journal</span>
                            <span className="text-slate-300">•</span>
                            <span>Vol. 2025</span>
                        </div>
                        <div className="text-xs font-mono text-slate-400 hidden sm:block">
                            UK & GCC Enterprise Tech Focus
                        </div>
                    </div>

                    {/* Main Title & Subtitle */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
                        <div className="lg:col-span-8">
                            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.08] mb-4">
                                Enterprise Architecture & <br />
                                <span className="text-[#074FDA]">Cloud Integration Insights</span>
                            </h1>
                            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl">
                                Engineering benchmarks, Salesforce & SAP synchronization patterns, iPaaS evaluations, and AWS cloud strategies for decision makers.
                            </p>
                        </div>

                        {/* Search Box */}
                        <div className="lg:col-span-4">
                            <div className="relative">
                                <div className="relative flex items-center bg-slate-50 rounded-xl border border-slate-200 focus-within:border-[#074FDA] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#074FDA]/10 transition-all p-1">
                                    <Search className="w-4 h-4 text-slate-400 ml-3 flex-shrink-0" />
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search guides, SAP, MuleSoft..."
                                        className="w-full py-2.5 px-3 bg-transparent text-slate-900 placeholder-slate-400 text-sm focus:outline-none font-medium"
                                    />
                                    {searchQuery && (
                                        <button 
                                            onClick={() => setSearchQuery('')}
                                            className="p-1 mr-1 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-200/50"
                                            aria-label="Clear search"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </header>

            {/* CATEGORY & FILTER CONTROL BAR */}
            <div className="sticky top-20 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
                <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
                    <div className="flex items-center justify-between gap-4 py-3">
                        
                        {/* Topic Tabs */}
                        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
                            <span className="hidden sm:inline text-xs font-mono text-slate-400 uppercase tracking-wider mr-2">Topics:</span>
                            {categories.map(cat => {
                                const isActive = activeCategory === cat;
                                return (
                                    <button
                                        key={cat}
                                        onClick={() => { setActiveCategory(cat); setSelectedTag(null); }}
                                        className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
                                            isActive
                                                ? 'bg-[#074FDA] text-white shadow-xs'
                                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
                                        }`}
                                    >
                                        {cat}
                                    </button>
                                );
                            })}
                        </div>

                        {/* View Switcher Toggle */}
                        <div className="hidden md:flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200/60">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-1.5 rounded-md transition-colors ${
                                    viewMode === 'grid' ? 'bg-white text-[#074FDA] shadow-xs' : 'text-slate-400 hover:text-slate-600'
                                }`}
                                title="Grid View"
                            >
                                <LayoutGrid className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-1.5 rounded-md transition-colors ${
                                    viewMode === 'list' ? 'bg-white text-[#074FDA] shadow-xs' : 'text-slate-400 hover:text-slate-600'
                                }`}
                                title="List View"
                            >
                                <List className="w-4 h-4" />
                            </button>
                        </div>

                    </div>
                </div>
            </div>

            {/* MAIN CONTENT AREA */}
            <main className="container mx-auto px-4 lg:px-8 py-10 max-w-6xl">
                
                {/* Active Filter Bar if searching or filtering */}
                {(searchQuery || activeCategory !== 'All' || selectedTag) && (
                    <div className="mb-8 flex items-center justify-between bg-slate-100/80 p-3.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium">
                        <div className="flex items-center gap-2 text-slate-700">
                            <Filter className="w-4 h-4 text-[#074FDA]" />
                            <span>Showing <strong className="text-slate-900">{filteredPosts.length}</strong> matching articles</span>
                            {activeCategory !== 'All' && <span className="bg-white px-2 py-0.5 rounded border text-slate-800 font-bold">{activeCategory}</span>}
                            {selectedTag && <span className="bg-white px-2 py-0.5 rounded border text-slate-800 font-bold">#{selectedTag}</span>}
                            {searchQuery && <span className="text-slate-500 font-normal">for "{searchQuery}"</span>}
                        </div>
                        <button
                            onClick={() => { setActiveCategory('All'); setSelectedTag(null); setSearchQuery(''); }}
                            className="text-xs font-bold text-[#F15A23] hover:underline"
                        >
                            Reset All
                        </button>
                    </div>
                )}

                {/* NO RESULTS STATE */}
                {filteredPosts.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 max-w-md mx-auto p-8 shadow-xs">
                        <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-xl flex items-center justify-center mx-auto mb-4">
                            <Search className="w-6 h-6" />
                        </div>
                        <h3 className="text-base font-bold text-slate-900 mb-2">No matching publications</h3>
                        <p className="text-slate-500 text-xs mb-6 leading-relaxed">
                            No articles found matching your specified topic or query. Please check your keywords or reset filters.
                        </p>
                        <button
                            onClick={() => { setSearchQuery(''); setActiveCategory('All'); setSelectedTag(null); }}
                            className="px-4 py-2 rounded-lg bg-[#074FDA] text-white text-xs font-bold hover:bg-[#053aa4] transition-colors"
                        >
                            View All Publications
                        </button>
                    </div>
                )}

                {/* SPOTLIGHT FEATURED PUBLICATION */}
                {featuredPost && (
                    <section className="mb-12">
                        <article className={`bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:border-slate-300 transition-all ${
                            getCategoryIcon(featuredPost.category, featuredPost.slug).border
                        }`}>
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                                
                                {/* Left Side: Tech Graphic & Header Banner */}
                                <div className={`lg:col-span-5 bg-gradient-to-br ${getCategoryIcon(featuredPost.category, featuredPost.slug).gradient} p-8 sm:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-200/60`}>
                                    <div>
                                        <div className="flex items-center gap-2 mb-6">
                                            <span className="px-3 py-1 rounded-md bg-[#074FDA] text-white font-mono text-[10px] uppercase font-bold tracking-wider">
                                                Featured Story
                                            </span>
                                            <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold border ${getCategoryIcon(featuredPost.category, featuredPost.slug).badgeBg}`}>
                                                {featuredPost.category}
                                            </span>
                                        </div>

                                        {/* Stylized Icon Badge Container */}
                                        <div className="w-16 h-16 rounded-2xl bg-white shadow-xs border border-slate-200 flex items-center justify-center mb-8">
                                            {React.createElement(getCategoryIcon(featuredPost.category, featuredPost.slug).icon, {
                                                className: `w-8 h-8 ${getCategoryIcon(featuredPost.category, featuredPost.slug).accent}`
                                            })}
                                        </div>

                                        <div className="space-y-2 text-xs font-mono text-slate-500">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-3.5 h-3.5 text-[#F15A23]" />
                                                <span>Published: {new Date(featuredPost.datePublished).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Clock className="w-3.5 h-3.5 text-slate-400" />
                                                <span>Estimate: {calculateReadTime(featuredPost.content)}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Author footer */}
                                    <div className="pt-6 mt-8 border-t border-slate-200/60 flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-full bg-[#074FDA] text-white font-bold text-xs flex items-center justify-center flex-shrink-0">
                                            L2
                                        </div>
                                        <div>
                                            <div className="text-xs font-bold text-slate-900">{featuredPost.author}</div>
                                            <div className="text-[11px] text-slate-500 font-medium">{featuredPost.authorRole}</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Side: Title & Content */}
                                <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-between bg-white">
                                    <div>
                                        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4 leading-tight hover:text-[#074FDA] transition-colors">
                                            <Link href={`/blog/${featuredPost.slug}`}>
                                                {featuredPost.title}
                                            </Link>
                                        </h2>

                                        <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                                            {featuredPost.excerpt}
                                        </p>
                                    </div>

                                    <div>
                                        {/* Tag pills */}
                                        <div className="flex flex-wrap gap-1.5 mb-6">
                                            {featuredPost.tags.map(tag => (
                                                <button
                                                    key={tag}
                                                    onClick={() => setSelectedTag(tag)}
                                                    className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200/70 text-slate-600 font-mono text-[11px] transition-colors"
                                                >
                                                    #{tag}
                                                </button>
                                            ))}
                                        </div>

                                        <Link 
                                            href={`/blog/${featuredPost.slug}`}
                                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#074FDA] text-white font-bold text-xs hover:bg-[#053aa4] transition-colors shadow-xs"
                                        >
                                            <span>Read Comprehensive Guide</span>
                                            <ArrowRight className="w-3.5 h-3.5" />
                                        </Link>
                                    </div>
                                </div>

                            </div>
                        </article>
                    </section>
                )}

                {/* MAIN CONTENT GRID & SIDEBAR LAYOUT */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* Left: Articles Stream (8 cols) */}
                    <div className="lg:col-span-8">
                        <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-200">
                            <h3 className="text-sm font-mono uppercase tracking-wider font-bold text-slate-500 flex items-center gap-2">
                                <BookOpen className="w-4 h-4 text-[#F15A23]" />
                                <span>Recent Articles ({remainingPosts.length})</span>
                            </h3>
                        </div>

                        {/* GRID OR LIST VIEW */}
                        {viewMode === 'grid' ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {remainingPosts.map((post) => {
                                    const styleInfo = getCategoryIcon(post.category, post.slug);
                                    const CategoryIcon = styleInfo.icon;

                                    return (
                                        <article 
                                            key={post.id} 
                                            className={`bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between hover:border-slate-300 hover:shadow-xs transition-all ${styleInfo.border}`}
                                        >
                                            <div>
                                                {/* Header Icon & Tag */}
                                                <div className="flex items-center justify-between mb-4">
                                                    <div className={`p-2.5 rounded-lg bg-slate-50 border border-slate-100 ${styleInfo.accent}`}>
                                                        <CategoryIcon className="w-5 h-5" />
                                                    </div>
                                                    <span className={`px-2.5 py-0.5 rounded text-[11px] font-bold border ${styleInfo.badgeBg}`}>
                                                        {post.category}
                                                    </span>
                                                </div>

                                                {/* Title */}
                                                <h4 className="text-base font-bold text-slate-900 mb-2 leading-snug hover:text-[#074FDA] transition-colors line-clamp-2">
                                                    <Link href={`/blog/${post.slug}`}>
                                                        {post.title}
                                                    </Link>
                                                </h4>

                                                {/* Excerpt */}
                                                <p className="text-slate-600 text-xs leading-relaxed line-clamp-3 mb-4 font-normal">
                                                    {post.excerpt}
                                                </p>
                                            </div>

                                            <div>
                                                {/* Meta */}
                                                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-4 pt-3 border-t border-slate-100">
                                                    <span>{new Date(post.datePublished).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</span>
                                                    <span>{calculateReadTime(post.content)}</span>
                                                </div>

                                                {/* Tag list */}
                                                <div className="flex flex-wrap gap-1 mb-4">
                                                    {post.tags.slice(0, 2).map(tag => (
                                                        <span key={tag} className="text-[10px] font-mono bg-slate-100 text-slate-500 px-2 py-0.5 rounded">
                                                            #{tag}
                                                        </span>
                                                    ))}
                                                </div>

                                                <Link 
                                                    href={`/blog/${post.slug}`}
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
                        ) : (
                            /* COMPACT LIST VIEW */
                            <div className="flex flex-col gap-4">
                                {remainingPosts.map((post) => {
                                    const styleInfo = getCategoryIcon(post.category, post.slug);
                                    const CategoryIcon = styleInfo.icon;

                                    return (
                                        <article 
                                            key={post.id} 
                                            className={`bg-white rounded-xl border border-slate-200 p-5 hover:border-slate-300 hover:shadow-xs transition-all ${styleInfo.border}`}
                                        >
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                                <div className="flex items-start gap-4">
                                                    <div className={`p-3 rounded-lg bg-slate-50 border border-slate-100 flex-shrink-0 ${styleInfo.accent}`}>
                                                        <CategoryIcon className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <span className="text-[11px] font-bold text-[#074FDA]">
                                                                {post.category}
                                                            </span>
                                                            <span className="text-slate-300">•</span>
                                                            <span className="text-[11px] font-mono text-slate-400">
                                                                {calculateReadTime(post.content)}
                                                            </span>
                                                        </div>
                                                        <h4 className="text-base font-bold text-slate-900 leading-snug hover:text-[#074FDA] transition-colors mb-1">
                                                            <Link href={`/blog/${post.slug}`}>
                                                                {post.title}
                                                            </Link>
                                                        </h4>
                                                        <p className="text-slate-600 text-xs line-clamp-2 font-normal">
                                                            {post.excerpt}
                                                        </p>
                                                    </div>
                                                </div>

                                                <Link 
                                                    href={`/blog/${post.slug}`}
                                                    className="inline-flex items-center gap-1 text-xs font-bold text-[#074FDA] hover:text-[#053aa4] flex-shrink-0 self-end sm:self-center"
                                                >
                                                    <span>Read</span>
                                                    <ChevronRight className="w-3.5 h-3.5" />
                                                </Link>
                                            </div>
                                        </article>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Right Sidebar (4 cols) */}
                    <aside className="lg:col-span-4 space-y-6">
                        
                        {/* Popular Tags Box */}
                        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
                            <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-slate-500 mb-4 flex items-center gap-1.5">
                                <Tag className="w-3.5 h-3.5 text-[#F15A23]" /> Filter by Tag
                            </h4>
                            <div className="flex flex-wrap gap-1.5">
                                {allTags.map(tag => {
                                    const isSelected = selectedTag === tag;
                                    return (
                                        <button
                                            key={tag}
                                            onClick={() => setSelectedTag(isSelected ? null : tag)}
                                            className={`px-2.5 py-1 rounded text-xs font-mono transition-colors ${
                                                isSelected
                                                    ? 'bg-[#074FDA] text-white font-bold'
                                                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                                            }`}
                                        >
                                            #{tag}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Newsletter Widget */}
                        <div className="bg-slate-900 text-white rounded-xl p-6 shadow-xs">
                            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center mb-3">
                                <Mail className="w-4 h-4 text-[#F15A23]" />
                            </div>
                            <h4 className="font-bold text-base mb-1">Architecture Digest</h4>
                            <p className="text-slate-300 text-xs leading-relaxed mb-4">
                                Quarterly Salesforce, SAP, and MuleSoft integration blueprints delivered directly.
                            </p>
                            <form onSubmit={handleSubscribe} className="space-y-2">
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter corporate email..."
                                    className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#074FDA]"
                                />
                                <button
                                    type="submit"
                                    className="w-full py-2 rounded-lg bg-[#074FDA] hover:bg-[#053aa4] font-bold text-xs text-white transition-colors"
                                >
                                    Subscribe
                                </button>
                            </form>
                            {isSubscribed && (
                                <p className="text-[11px] text-emerald-400 font-bold mt-2">Subscribed successfully!</p>
                            )}
                        </div>

                        {/* Consultation Widget */}
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50/50 rounded-xl border border-blue-200/60 p-5">
                            <h4 className="font-bold text-sm text-slate-900 mb-1">Need Architecture Advice?</h4>
                            <p className="text-xs text-slate-600 leading-relaxed mb-4">
                                Talk directly with our senior integration leaders in London or Dubai.
                            </p>
                            <Link 
                                href="/contact-us"
                                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#074FDA] hover:text-[#053aa4]"
                            >
                                <span>Book Consultation</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>

                    </aside>

                </div>

            </main>

        </div>
    );
};

export default BlogContainer;
