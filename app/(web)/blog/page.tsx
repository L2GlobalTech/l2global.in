import BlogContainer from '@/containers/web/BlogContainer'
import { Metadata } from 'next'
import React from 'react'
import { getPublicBlogs } from '@/app/(asgard)/asgard/blogs/action'

export const metadata: Metadata = {
    title: 'Blog & Insights',
    description: 'Stay updated with the latest trends in enterprise integration, Salesforce, SAP, MuleSoft, and cloud strategies for the UK and Middle East markets.',
    alternates: { canonical: 'https://l2global.in/blog' },
    openGraph: {
        title: 'Blog & Insights | L2 Global Technologies',
        description: 'Latest trends in enterprise integration, Salesforce, SAP, MuleSoft and cloud strategies for UK and Middle East markets.',
        url: 'https://l2global.in/blog',
        images: ['/assets/web/og-image.png'],
    },
}

const BlogPage = async () => {
    const initialBlogs = await getPublicBlogs();
    return (
        <BlogContainer initialBlogs={initialBlogs} />
    )
}

export default BlogPage