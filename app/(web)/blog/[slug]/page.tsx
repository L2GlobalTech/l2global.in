import { blogPosts } from '@/constants/blogData'
import BlogPostContainer from '@/containers/web/BlogPostContainer'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React from 'react'

interface PageProps {
    params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
    return blogPosts.map((post) => ({
        slug: post.slug,
    }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = blogPosts.find((p) => p.slug === slug)

    if (!post) {
        return {
            title: 'Post Not Found',
        }
    }

    return {
        title: post.metaTitle || post.title,
        description: post.metaDescription || post.excerpt,
        alternates: { canonical: `https://l2global.in/blog/${post.slug}` },
        openGraph: {
            title: post.metaTitle || post.title,
            description: post.metaDescription || post.excerpt,
            url: `https://l2global.in/blog/${post.slug}`,
            images: [post.image],
        },
    }
}

const BlogPostPage = async ({ params }: PageProps) => {
    const { slug } = await params;
    const post = blogPosts.find((p) => p.slug === slug)

    if (!post) {
        notFound()
    }

    return <BlogPostContainer post={post} />
}

export default BlogPostPage
