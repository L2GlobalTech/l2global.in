import BlogPostContainer from '@/containers/web/BlogPostContainer'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React from 'react'
import { getPublicBlogs, getPublicBlogBySlug } from '@/app/(asgard)/asgard/blogs/action'
import { blogPosts } from '@/constants/blogData'

interface PageProps {
    params: Promise<{ slug: string }>
}

export const dynamicParams = false;

export async function generateStaticParams() {
    const slugSet = new Set<string>();

    try {
        const blogs = await getPublicBlogs();
        (blogs || []).forEach((b) => {
            if (b.slug && b.slug !== '[slug]') slugSet.add(b.slug);
        });
    } catch (e) {
        console.warn('generateStaticParams error fetching DB blogs:', e);
    }

    if (slugSet.size === 0) {
        slugSet.add('default');
    }

    return Array.from(slugSet).map((slug) => ({
        slug,
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const cleanSlug = slug ? slug.replace(/^\/+|\/+$/g, '') : '';
    const post = await getPublicBlogBySlug(cleanSlug);

    if (!post) {
        return {
            title: 'Post Not Found | L2 Global Tech',
        }
    }

    const imageUrl = post.image.startsWith('http') ? post.image : `https://l2global.in${post.image}`;

    return {
        title: post.metaTitle || post.title,
        description: post.metaDescription || post.excerpt,
        alternates: { canonical: `https://l2global.in/blog/${post.slug}` },
        openGraph: {
            title: post.metaTitle || post.title,
            description: post.metaDescription || post.excerpt,
            url: `https://l2global.in/blog/${post.slug}`,
            images: [imageUrl],
        },
    }
}

const BlogPostPage = async ({ params }: PageProps) => {
    const { slug } = await params;
    const cleanSlug = slug ? slug.replace(/^\/+|\/+$/g, '') : '';
    const post = await getPublicBlogBySlug(cleanSlug);

    if (!post) {
        notFound()
    }

    const allBlogs = await getPublicBlogs();
    const relatedPosts = allBlogs
        .filter((b) => b.slug !== post.slug && String(b.id) !== String(post.id))
        .slice(0, 3);

    return <BlogPostContainer post={post} slug={cleanSlug} relatedPosts={relatedPosts} />
}

export default BlogPostPage
