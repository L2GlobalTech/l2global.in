'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Search, 
    ChevronDown, 
    MessageCircle, 
    ArrowRight, 
    ThumbsUp, 
    ThumbsDown, 
    Copy, 
    Check, 
    Sparkles, 
    ShieldCheck, 
    HelpCircle, 
    PhoneCall, 
    FileText, 
    Mail, 
    X,
    Layers,
    Cpu,
    Shield,
    DollarSign,
    BookOpen
} from 'lucide-react';
import Link from 'next/link';

interface FaqItem {
    id: number;
    categoryId: string;
    categoryName: string;
    question: string;
    answer: string;
    popularTag?: string;
}

const categoryMeta: Record<string, { title: string; icon: any; color: string; bg: string; desc: string }> = {
    all: {
        title: 'All Topics',
        icon: Layers,
        color: 'text-[#074FDA]',
        bg: 'bg-[#074FDA]/10 border-[#074FDA]/20',
        desc: 'Browse all enterprise questions across systems and services.'
    },
    general: {
        title: 'General & Strategy',
        icon: BookOpen,
        color: 'text-[#074FDA]',
        bg: 'bg-blue-50 border-blue-200',
        desc: 'Company background, delivery timelines, and geographic coverage.'
    },
    services: {
        title: 'Integration & Engineering',
        icon: Cpu,
        color: 'text-[#F15A23]',
        bg: 'bg-orange-50 border-orange-200',
        desc: 'Salesforce, SAP, MuleSoft, Boomi, and AWS Cloud architecture.'
    },
    pricing: {
        title: 'Pricing & Engagement',
        icon: DollarSign,
        color: 'text-emerald-700',
        bg: 'bg-emerald-50 border-emerald-200',
        desc: 'Fixed-price, T&M, retainers, and consulting fee structures.'
    },
    security: {
        title: 'Security & 24/7 Support',
        icon: Shield,
        color: 'text-purple-700',
        bg: 'bg-purple-50 border-purple-200',
        desc: 'GDPR, data sovereignty, 24/7 SLA guarantees, and disaster recovery.'
    }
};

const faqCategories = [
    { id: 'all', name: 'All Questions', count: 12 },
    { id: 'general', name: 'General & Strategy', count: 3 },
    { id: 'services', name: 'Integration & Engineering', count: 3 },
    { id: 'pricing', name: 'Pricing & Engagement', count: 3 },
    { id: 'security', name: 'Security & 24/7 Support', count: 3 },
];

const popularSearches = [
    'Salesforce SAP',
    'MuleSoft vs Boomi',
    'Implementation Cost',
    '24/7 SLA Support',
    'GDPR & Compliance',
    'AWS Migration'
];

const faqs: FaqItem[] = [
    {
        id: 1,
        categoryId: 'general',
        categoryName: 'General & Strategy',
        question: "What makes L2 Global Tech different from standard consulting agencies?",
        answer: "L2 Global Tech specializes in high-complexity enterprise cloud ecosystems across Salesforce, SAP, MuleSoft, and AWS. Rather than executing siloed software setups, we architect scalable, future-proof API-led integration networks. Our dual presence in London and Dubai gives clients local architectural leadership combined with deep technical execution capability.",
        popularTag: 'General'
    },
    {
        id: 2,
        categoryId: 'general',
        categoryName: 'General & Strategy',
        question: "Which geographical markets and industries do you specialize in?",
        answer: "We primarily support mid-market to global enterprise clients across the UK, Europe, UAE, and the Gulf region (GCC). Our core industry expertise spans Real Estate & Property Tech, Healthcare & Life Sciences, Financial Services, Manufacturing, Logistics, and Non-Profit organizations.",
        popularTag: 'Coverage'
    },
    {
        id: 3,
        categoryId: 'general',
        categoryName: 'General & Strategy',
        question: "How long does a typical enterprise cloud integration project take?",
        answer: "Timelines depend on scope and architectural complexity. Quick-start CRM or iPaaS connectivity sprints typically complete in 4 to 8 weeks. Comprehensive multi-cloud enterprise transformations—such as full SAP ERP to Salesforce Lightning synchronization via MuleSoft—range from 3 to 6 months with iterative milestone deliveries.",
        popularTag: 'Timelines'
    },
    {
        id: 4,
        categoryId: 'services',
        categoryName: 'Integration & Engineering',
        question: "Do you offer custom Salesforce Lightning and SAP ERP integrations?",
        answer: "Yes. We specialize in deep bidirectional synchronization between Salesforce CRM (Sales Cloud, Service Cloud, Industries) and SAP ERP (S/4HANA & ECC). We build automated workflows for Quote-to-Cash (Q2C), real-time inventory visibility, customer 360 virtual views via OData, and automated order processing.",
        popularTag: 'Salesforce SAP'
    },
    {
        id: 5,
        categoryId: 'services',
        categoryName: 'Integration & Engineering',
        question: "Can you assist with iPaaS platform selection (MuleSoft vs Dell Boomi)?",
        answer: "Absolutely. We conduct impartial technical audits to determine the right iPaaS architecture for your throughput, governance, and budget requirements. We implement API-led architectures on MuleSoft Anypoint Platform as well as rapid low-code integrations using Dell Boomi.",
        popularTag: 'MuleSoft vs Boomi'
    },
    {
        id: 6,
        categoryId: 'services',
        categoryName: 'Integration & Engineering',
        question: "What AWS cloud architectural services do you provide?",
        answer: "Our AWS Cloud practice offers full-lifecycle services: cloud migration checklists, multi-account Control Tower setup, microservices containerization (ECS/EKS), serverless APIs, cost optimization audits, and low-latency infrastructure deployment in the AWS London and UAE regions.",
        popularTag: 'AWS Migration'
    },
    {
        id: 7,
        categoryId: 'pricing',
        categoryName: 'Pricing & Engagement',
        question: "How do you structure project pricing and engagement models?",
        answer: "We offer three transparent engagement models tailored to client procurement requirements: 1) Fixed-Price Deliverables for well-scoped milestones; 2) Time & Materials (T&M) for agile product development; and 3) Dedicated Engineering Teams / Retainers for long-term strategic support.",
        popularTag: 'Implementation Cost'
    },
    {
        id: 8,
        categoryId: 'pricing',
        categoryName: 'Pricing & Engagement',
        question: "What are the typical consulting rates for UK and Gulf projects?",
        answer: "Our rates are highly competitive compared to Tier-1 global consultancies while offering senior enterprise architect leadership. We provide clear upfront scoping docs with zero hidden fees. Detailed cost breakdowns are provided during initial discovery calls.",
        popularTag: 'Pricing'
    },
    {
        id: 9,
        categoryId: 'pricing',
        categoryName: 'Pricing & Engagement',
        question: "Are there ongoing support or post-launch maintenance packages?",
        answer: "Yes. We offer tiered Managed Services packages (Bronze, Silver, Gold, Enterprise SLA) covering proactive monitoring, security patching, API health checks, version upgrades, and ongoing functional enhancements.",
        popularTag: 'Retainers'
    },
    {
        id: 10,
        categoryId: 'security',
        categoryName: 'Security & 24/7 Support',
        question: "How do you ensure GDPR and UK/GCC data sovereignty compliance?",
        answer: "Data protection is built into our core architecture (Security-by-Design). We enforce encryption in transit and at rest, zero-trust access policies, localized data residency (UK eu-west-2 or UAE regions), and compliance alignment with GDPR, DIFC, and KSA data regulations.",
        popularTag: 'GDPR & Compliance'
    },
    {
        id: 11,
        categoryId: 'security',
        categoryName: 'Security & 24/7 Support',
        question: "What response SLAs do you guarantee for critical production issues?",
        answer: "For Enterprise Managed Support clients, we provide 24/7/365 coverage with guaranteed P1 incident response times under 15 minutes, dedicated Technical Account Managers (TAMs), and automated incident escalation paths.",
        popularTag: '24/7 SLA Support'
    },
    {
        id: 12,
        categoryId: 'security',
        categoryName: 'Security & 24/7 Support',
        question: "How do you handle disaster recovery and system updates?",
        answer: "We implement automated CI/CD deployment pipelines with zero-downtime blue/green deployments, automated database backups, multi-region failover strategies, and continuous vulnerability scanning to maintain peak system uptime.",
        popularTag: 'Security'
    }
];

const FaqContainer = () => {
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [openFaqId, setOpenFaqId] = useState<number | null>(1);
    const [helpfulVotes, setHelpfulVotes] = useState<Record<number, 'yes' | 'no'>>({});
    const [copiedId, setCopiedId] = useState<number | null>(null);

    // Filtered questions
    const filteredFaqs = useMemo(() => {
        return faqs.filter(faq => {
            const query = searchQuery.toLowerCase().trim();
            const matchesQuery = !query || 
                faq.question.toLowerCase().includes(query) ||
                faq.answer.toLowerCase().includes(query) ||
                (faq.popularTag && faq.popularTag.toLowerCase().includes(query));
            
            const matchesCategory = activeCategory === 'all' || faq.categoryId === activeCategory;
            
            return matchesQuery && matchesCategory;
        });
    }, [searchQuery, activeCategory]);

    const handleFeedback = (id: number, type: 'yes' | 'no') => {
        setHelpfulVotes(prev => ({ ...prev, [id]: type }));
    };

    const handleCopyLink = (id: number, e: React.MouseEvent) => {
        e.stopPropagation();
        const url = `${window.location.origin}/faq#faq-${id}`;
        navigator.clipboard.writeText(url);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2500);
    };

    return (
        <div className="bg-[#fcfcfd] min-h-screen text-slate-900 font-sans selection:bg-[#074FDA] selection:text-white">
            
            {/* SUPPORT DESK MASTHEAD */}
            <header className="bg-white border-b border-slate-200/80 pt-32 pb-14 md:pt-40 md:pb-16">
                <div className="container mx-auto px-4 lg:px-8 max-w-5xl text-center">
                    
                    {/* Header Badge */}
                    <div className="flex justify-center mb-5">
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-mono font-bold uppercase tracking-wider">
                            <HelpCircle className="w-3.5 h-3.5 text-[#074FDA]" />
                            <span>Enterprise Knowledge Desk</span>
                        </span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight leading-tight">
                        How can we help your <span className="text-[#074FDA]">enterprise today?</span>
                    </h1>

                    <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto mb-8 font-normal leading-relaxed">
                        Search our technical knowledge desk for answers regarding Salesforce, SAP, MuleSoft, AWS architectures, pricing, and SLAs.
                    </p>

                    {/* SEARCH INPUT */}
                    <div className="relative max-w-xl mx-auto mb-6">
                        <div className="relative flex items-center bg-slate-50 rounded-xl border border-slate-300 focus-within:border-[#074FDA] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#074FDA]/10 transition-all p-1">
                            <Search className="w-4 h-4 text-slate-400 ml-3 flex-shrink-0" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search by topic, system, or keyword (e.g. Salesforce, Pricing, SLA)..."
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

                    {/* POPULAR TAG CHIPS */}
                    <div className="flex flex-wrap items-center justify-center gap-1.5 text-xs">
                        <span className="font-mono text-slate-400 mr-1">Popular Topics:</span>
                        {popularSearches.map(tag => (
                            <button
                                key={tag}
                                onClick={() => { setSearchQuery(tag); setActiveCategory('all'); }}
                                className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200/70 text-slate-700 font-mono text-[11px] transition-colors"
                            >
                                #{tag}
                            </button>
                        ))}
                    </div>

                </div>
            </header>

            {/* TOP-LEVEL KNOWLEDGE DOMAIN HUB CARDS */}
            <div className="py-10 bg-slate-50/60 border-b border-slate-200/60">
                <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
                    <div className="text-center mb-6">
                        <h2 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold">
                            Explore Knowledge Domains
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {Object.entries(categoryMeta).filter(([id]) => id !== 'all').map(([id, meta]) => {
                            const IconComponent = meta.icon;
                            const isActive = activeCategory === id && !searchQuery;
                            const count = faqs.filter(f => f.categoryId === id).length;

                            return (
                                <button
                                    key={id}
                                    onClick={() => {
                                        setActiveCategory(id);
                                        setSearchQuery('');
                                        setOpenFaqId(null);
                                    }}
                                    className={`text-left p-5 rounded-xl border transition-all flex flex-col justify-between ${
                                        isActive
                                            ? 'bg-white border-[#074FDA] ring-2 ring-[#074FDA]/10 shadow-xs'
                                            : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-xs'
                                    }`}
                                >
                                    <div>
                                        <div className="flex items-center justify-between mb-3">
                                            <div className={`p-2 rounded-lg ${meta.bg}`}>
                                                <IconComponent className={`w-4 h-4 ${meta.color}`} />
                                            </div>
                                            <span className="text-[11px] font-mono font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                                                {count} Qs
                                            </span>
                                        </div>
                                        <h3 className="font-bold text-sm text-slate-900 mb-1">
                                            {meta.title}
                                        </h3>
                                        <p className="text-xs text-slate-500 font-normal leading-relaxed line-clamp-2">
                                            {meta.desc}
                                        </p>
                                    </div>

                                    <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#074FDA]">
                                        <span>Explore</span>
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* MAIN QUESTIONS SECTION */}
            <main className="container mx-auto px-4 lg:px-8 py-10 max-w-5xl">
                
                {/* Active Filter Header */}
                <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-200">
                    <div className="flex items-center gap-2">
                        <h2 className="text-base font-bold text-slate-900">
                            {searchQuery 
                                ? `Results for "${searchQuery}"` 
                                : categoryMeta[activeCategory]?.title || 'All Questions'
                            }
                        </h2>
                        <span className="text-xs font-mono text-slate-400 font-semibold">
                            ({filteredFaqs.length} items)
                        </span>
                    </div>

                    {(searchQuery || activeCategory !== 'all') && (
                        <button
                            onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                            className="text-xs font-mono font-bold text-[#F15A23] hover:underline"
                        >
                            Show All
                        </button>
                    )}
                </div>

                {/* FAQ CARDS LIST */}
                <div className="space-y-3">
                    {filteredFaqs.length > 0 ? (
                        filteredFaqs.map((faq) => {
                            const isOpen = openFaqId === faq.id;
                            const vote = helpfulVotes[faq.id];

                            return (
                                <article
                                    key={faq.id}
                                    id={`faq-${faq.id}`}
                                    className={`bg-white rounded-xl border transition-all ${
                                        isOpen 
                                            ? 'border-[#074FDA]/50 ring-1 ring-[#074FDA]/10 shadow-xs' 
                                            : 'border-slate-200 hover:border-slate-300'
                                    }`}
                                >
                                    {/* Question Header Button */}
                                    <button
                                        onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                                        className="w-full flex items-start justify-between p-5 text-left focus:outline-none group"
                                    >
                                        <div className="pr-4">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-mono font-bold text-[10px] uppercase">
                                                    {faq.categoryName}
                                                </span>
                                                {faq.popularTag && (
                                                    <span className="px-2 py-0.5 rounded bg-orange-50 text-[#F15A23] font-mono font-bold text-[10px]">
                                                        #{faq.popularTag}
                                                    </span>
                                                )}
                                            </div>
                                            <h3 className={`text-base sm:text-lg font-bold leading-snug transition-colors ${
                                                isOpen ? 'text-[#074FDA]' : 'text-slate-900 group-hover:text-[#074FDA]'
                                            }`}>
                                                {faq.question}
                                            </h3>
                                        </div>

                                        <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors mt-0.5 ${
                                            isOpen 
                                                ? 'bg-[#074FDA] text-white' 
                                                : 'bg-slate-100 text-slate-400 group-hover:text-slate-700'
                                        }`}>
                                            <ChevronDown className={`w-4 h-4 transition-transform duration-250 ${isOpen ? 'rotate-180' : ''}`} />
                                        </div>
                                    </button>

                                    {/* Answer Body */}
                                    <AnimatePresence>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <div className="px-5 pb-5 pt-0 border-t border-slate-100">
                                                    <p className="text-slate-600 leading-relaxed text-xs sm:text-sm font-normal pt-4 mb-4">
                                                        {faq.answer}
                                                    </p>

                                                    {/* Micro-Actions */}
                                                    <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs text-slate-500">
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-[11px]">Was this helpful?</span>
                                                            <div className="flex items-center gap-1">
                                                                <button
                                                                    onClick={() => handleFeedback(faq.id, 'yes')}
                                                                    className={`inline-flex items-center gap-1 px-2 py-1 rounded border text-[11px] ${
                                                                        vote === 'yes'
                                                                            ? 'bg-emerald-50 text-emerald-700 border-emerald-300 font-bold'
                                                                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                                                                    }`}
                                                                >
                                                                    <ThumbsUp className="w-3 h-3" /> Yes
                                                                </button>
                                                                <button
                                                                    onClick={() => handleFeedback(faq.id, 'no')}
                                                                    className={`inline-flex items-center gap-1 px-2 py-1 rounded border text-[11px] ${
                                                                        vote === 'no'
                                                                            ? 'bg-rose-50 text-rose-700 border-rose-300 font-bold'
                                                                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                                                                    }`}
                                                                >
                                                                    <ThumbsDown className="w-3 h-3" /> No
                                                                </button>
                                                            </div>
                                                            {vote && (
                                                                <span className="text-emerald-600 font-bold text-[11px]">
                                                                    Feedback recorded!
                                                                </span>
                                                            )}
                                                        </div>

                                                        <button
                                                            onClick={(e) => handleCopyLink(faq.id, e)}
                                                            className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-[#074FDA] transition-colors"
                                                        >
                                                            {copiedId === faq.id ? (
                                                                <>
                                                                    <Check className="w-3 h-3 text-emerald-500" />
                                                                    <span className="text-emerald-600 font-bold">Copied</span>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <Copy className="w-3 h-3" />
                                                                    <span>Copy Link</span>
                                                                </>
                                                            )}
                                                        </button>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </article>
                            );
                        })
                    ) : (
                        <div className="text-center py-14 bg-white rounded-xl border border-slate-200 px-6">
                            <div className="w-10 h-10 bg-slate-100 text-slate-400 rounded-lg flex items-center justify-center mx-auto mb-3">
                                <Search className="w-5 h-5" />
                            </div>
                            <h3 className="text-sm font-bold text-slate-900 mb-1">No questions found</h3>
                            <p className="text-slate-500 text-xs max-w-xs mx-auto mb-4">
                                We couldn't find an answer for "{searchQuery}".
                            </p>
                            <button 
                                onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                                className="px-3.5 py-1.5 text-xs font-bold text-[#074FDA] bg-blue-50 hover:bg-blue-100 rounded-md transition-colors"
                            >
                                Clear Filter
                            </button>
                        </div>
                    )}
                </div>

            </main>

            {/* DIRECT SUPPORT TOUCHPOINTS */}
            <section className="bg-white border-t border-b border-slate-200 py-14">
                <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
                    <div className="text-center mb-8">
                        <span className="text-xs font-mono uppercase tracking-wider font-bold text-[#074FDA] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                            Direct Support Touchpoints
                        </span>
                        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-2">Need direct architecture assistance?</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        <div className="bg-slate-50/70 rounded-xl p-5 border border-slate-200 flex flex-col justify-between">
                            <div>
                                <div className="w-9 h-9 rounded-lg bg-[#074FDA]/10 text-[#074FDA] flex items-center justify-center mb-3">
                                    <PhoneCall className="w-4 h-4" />
                                </div>
                                <h4 className="text-sm font-bold text-slate-900 mb-1">Architecture Session</h4>
                                <p className="text-slate-600 text-xs leading-relaxed mb-4">
                                    Book a 30-minute discovery call with our Lead Integration Architect in London or Dubai.
                                </p>
                            </div>
                            <Link 
                                href="/contact-us"
                                className="inline-flex items-center gap-1 text-xs font-bold text-[#074FDA] hover:text-[#053aa4]"
                            >
                                <span>Book Session</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>

                        <div className="bg-slate-50/70 rounded-xl p-5 border border-slate-200 flex flex-col justify-between">
                            <div>
                                <div className="w-9 h-9 rounded-lg bg-[#F15A23]/10 text-[#F15A23] flex items-center justify-center mb-3">
                                    <FileText className="w-4 h-4" />
                                </div>
                                <h4 className="text-sm font-bold text-slate-900 mb-1">Request Proposal</h4>
                                <p className="text-slate-600 text-xs leading-relaxed mb-4">
                                    Submit your project scope or architectural requirements for a formal estimate.
                                </p>
                            </div>
                            <Link 
                                href="/contact-us"
                                className="inline-flex items-center gap-1 text-xs font-bold text-[#F15A23] hover:text-[#d44815]"
                            >
                                <span>Submit Scope</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>

                        <div className="bg-slate-50/70 rounded-xl p-5 border border-slate-200 flex flex-col justify-between">
                            <div>
                                <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-3">
                                    <Mail className="w-4 h-4" />
                                </div>
                                <h4 className="text-sm font-bold text-slate-900 mb-1">Email Technical Team</h4>
                                <p className="text-slate-600 text-xs leading-relaxed mb-4">
                                    Send technical queries regarding Salesforce, SAP, MuleSoft, or AWS directly.
                                </p>
                            </div>
                            <a 
                                href="mailto:info@l2global.in"
                                className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 hover:text-emerald-700"
                            >
                                <span>Email Us</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* BOTTOM BAR */}
            <div className="bg-slate-900 text-white py-12">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <h3 className="text-xl sm:text-2xl font-bold mb-2">
                        Ready to Transform Your Infrastructure?
                    </h3>
                    <p className="text-slate-400 text-xs max-w-md mx-auto mb-6">
                        Partner with L2 Global Tech for enterprise-grade cloud integrations.
                    </p>
                    <Link
                        href="/contact-us"
                        className="inline-flex items-center gap-2 bg-[#F15A23] hover:bg-[#d84a16] text-white px-6 py-2.5 rounded-lg font-bold text-xs transition-colors"
                    >
                        <span>Contact Technical Desk</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                </div>
            </div>

        </div>
    );
};

export default FaqContainer;
