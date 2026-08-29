import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, User, Tag, ArrowLeft, Share2, Linkedin, Twitter, Facebook } from 'lucide-react'
import { BlogPost } from '@/types'
import Divider from '@/components/web/Divider'

interface BlogPostContainerProps {
    post: BlogPost
}

const BlogPostContainer: React.FC<BlogPostContainerProps> = ({ post }) => {
    // Article JSON-LD Schema
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": post.title,
        "image": [`https://l2global.in${post.image}`],
        "datePublished": post.datePublished,
        "dateModified": post.datePublished,
        "author": [{
            "@type": "Person",
            "name": post.author,
            "jobTitle": post.authorRole
        }],
        "publisher": {
            "@type": "Organization",
            "name": "L2 Global Technology Ltd.",
            "logo": {
                "@type": "ImageObject",
                "url": "https://l2global.in/assets/web/logo.png"
            }
        },
        "description": post.excerpt
    }

    return (
        <div className="bg-white pt-24 pb-20">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="container mx-auto px-4">
                {/* Back Link */}
                <div className="mb-8">
                    <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-[#F15A23] hover:gap-3 transition-all">
                        <ArrowLeft size={16} /> Back to Blog
                    </Link>
                </div>

                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="mb-12">
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
                            <span className="bg-[#F6F5F8] text-[#F15A23] px-3 py-1 rounded-full font-bold uppercase tracking-wider text-[10px]">
                                {post.category}
                            </span>
                            <div className="flex items-center gap-1">
                                <Calendar size={14} />
                                <span>{new Date(post.datePublished).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <User size={14} />
                                <span>{post.author}</span>
                            </div>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-8 leading-tight">
                            {post.title}
                        </h1>
                    </div>

                    {/* Featured Image */}
                    <div className="relative h-[220px] md:h-[340px] w-full mb-16 rounded-3xl overflow-hidden shadow-2xl">
                        <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    {/* Content Section */}
                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* Sidebar/Table of Contents (Optional) */}
                        <aside className="lg:w-1/4 order-2 lg:order-1">
                            <div className="sticky top-32 space-y-10">
                                <div>
                                    <h4 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">Related Service</h4>
                                    <Link 
                                        href={post.serviceLink}
                                        className="block p-4 rounded-xl border border-[#F15A23]/20 bg-[#F15A23]/5 hover:bg-[#F15A23]/10 transition-colors"
                                    >
                                        <p className="text-xs text-gray-500 mb-1">Learn more about</p>
                                        <p className="font-bold text-gray-900">{post.serviceName}</p>
                                    </Link>
                                </div>

                                <div>
                                    <h4 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">Tags</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {post.tags.map(tag => (
                                            <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-md">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">Share</h4>
                                    <div className="flex gap-3">
                                        <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-[#0077b5] hover:text-white transition-all">
                                            <Linkedin size={18} />
                                        </button>
                                        <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-[#1DA1F2] hover:text-white transition-all">
                                            <Twitter size={18} />
                                        </button>
                                        <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-[#4267B2] hover:text-white transition-all">
                                            <Facebook size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </aside>

                        {/* Article Content */}
                        <article className="lg:w-3/4 order-1 lg:order-2">
                            <div 
                                className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-600 prose-p:leading-relaxed prose-li:text-gray-600 prose-a:text-[#F15A23] prose-a:font-bold prose-a:no-underline hover:prose-a:underline"
                                dangerouslySetInnerHTML={{ __html: post.content }}
                            />
                            
                            <div className="mt-16 pt-10 border-t border-gray-100">
                                <div className="flex items-center gap-6 p-8 bg-[#F6F5F8] rounded-2xl">
                                    <div className="w-16 h-16 rounded-full bg-[#F15A23] flex items-center justify-center text-white text-2xl font-bold">
                                        {post.author.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-gray-900">{post.author}</h4>
                                        <p className="text-gray-600 text-sm">{post.authorRole}</p>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogPostContainer
