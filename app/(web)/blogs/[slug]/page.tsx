import BlogPostContainer from '@/containers/web/BlogPostContainer'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React from 'react'
import { getPublicBlogs, getPublicBlogBySlug, slugify } from '@/app/(asgard)/asgard/blogs/action'

interface PageProps {
    params: Promise<{ slug: string }>
}


export async function generateStaticParams() {
    const slugSet = new Set<string>();

    try {
        const blogs = await getPublicBlogs();
        (blogs || []).forEach((b) => {
            if (b.id) {
                slugSet.add(String(b.id));
            }
            if (b.slug && b.slug !== '[slug]') {
                slugSet.add(b.slug.replace(/^\/+|\/+$/g, ''));
            }
            if (b.title) {
                slugSet.add(slugify(b.title));
            }
        });
    } catch (e) {
        console.warn('generateStaticParams error fetching blogs:', e);
    }

    // Ensure at least one route is returned for Next.js static export
    if (slugSet.size === 0) {
        slugSet.add('salesforce-sap-integration-2025');
        slugSet.add('salesforce-implementation-cost-uk-2025');
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
        const titleFormatted = cleanSlug
            ? cleanSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
            : 'Blog Post';
        return {
            title: `${titleFormatted} | L2 Global Tech`,
            description: `Read about ${titleFormatted} from L2 Global Technology enterprise integration architects.`,
        };
    }

    const imageUrl = post.image && post.image.startsWith('http') 
        ? post.image 
        : `https://l2global.in${post.image || '/assets/web/blog/salesforce-sap.png'}`;

    return {
        title: post.metaTitle || post.title,
        description: post.metaDescription || post.excerpt,
        alternates: { canonical: `https://l2global.in/blogs/${post.slug}` },
        openGraph: {
            title: post.metaTitle || post.title,
            description: post.metaDescription || post.excerpt,
            url: `https://l2global.in/blogs/${post.slug}`,
            images: [imageUrl],
        },
    };
}

const BlogPostPage = async ({ params }: PageProps) => {
    const { slug } = await params;
    const cleanSlug = slug ? slug.replace(/^\/+|\/+$/g, '') : '';
    const post = await getPublicBlogBySlug(cleanSlug);

    const allBlogs = await getPublicBlogs();
    const relatedPosts = (allBlogs || [])
        .filter((b) => b.slug !== cleanSlug && (!post || String(b.id) !== String(post.id)))
        .slice(0, 3);

    return <BlogPostContainer post={post} slug={cleanSlug} relatedPosts={relatedPosts} />
}

export default BlogPostPage
