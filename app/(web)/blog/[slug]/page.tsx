import BlogPostContainer from '@/containers/web/BlogPostContainer'
import { Metadata } from 'next'
import { notFound, permanentRedirect } from 'next/navigation'
import React from 'react'
import { getPublicBlogs, getPublicBlogBySlug } from '@/app/(asgard)/asgard/blogs/action'

interface PageProps {
    params: Promise<{ slug: string }>
}


export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const cleanSlug = slug ? slug.replace(/^\/+|\/+$/g, '') : '';
    const post = await getPublicBlogBySlug(cleanSlug);

    if (!post) return { title: 'Page Not Found', robots: { index: false, follow: true, googleBot: { index: false, follow: true } } };

    const imageUrl = post.image && post.image.startsWith('http') 
        ? post.image 
        : `https://www.l2global.in${post.image || '/assets/web/blog/salesforce-sap.png'}`;

    return {
        title: post.metaTitle || post.title,
        description: post.metaDescription || post.excerpt,
        alternates: { canonical: `https://www.l2global.in/blog/${post.slug}` },
        openGraph: {
            title: post.metaTitle || post.title,
            description: post.metaDescription || post.excerpt,
            url: `https://www.l2global.in/blog/${post.slug}`,
            images: [imageUrl],
        },
    };
}

const BlogPostPage = async ({ params }: PageProps) => {
    const { slug } = await params;
    const cleanSlug = slug ? slug.replace(/^\/+|\/+$/g, '') : '';
    const post = await getPublicBlogBySlug(cleanSlug);

    if (!post) notFound();
    if (cleanSlug !== post.slug) permanentRedirect(`/blog/${post.slug}`);

    const allBlogs = await getPublicBlogs();
    const relatedPosts = (allBlogs || [])
        .filter((b) => b.slug !== cleanSlug && (!post || String(b.id) !== String(post.id)))
        .slice(0, 3);

    return <BlogPostContainer post={post} slug={cleanSlug} relatedPosts={relatedPosts} />
}

export default BlogPostPage
