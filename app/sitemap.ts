// app/sitemap.ts
import { MetadataRoute } from 'next';
import { blogPosts } from '@/constants/blogData';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const BASE = 'https://l2global.in';
  const urls = [
    // Core pages
    { path: '/', freq: 'weekly', pri: 1.0 },
    { path: '/about-us', freq: 'monthly', pri: 0.9 },
    { path: '/contact-us', freq: 'monthly', pri: 0.9 },
    { path: '/career', freq: 'monthly', pri: 0.7 },
    { path: '/team', freq: 'monthly', pri: 0.6 },
    { path: '/blog', freq: 'weekly', pri: 0.7 },
    { path: '/privacy-policy', freq: 'yearly', pri: 0.3 },
    { path: '/terms-and-conditions', freq: 'yearly', pri: 0.3 },

    { path: '/services', freq: 'monthly', pri: 0.95 },

    // Services — AI (highest priority)
    { path: '/services/agentforce-ai', freq: 'monthly', pri: 1.0 },
    { path: '/services/sap-ai', freq: 'monthly', pri: 1.0 },
    // Services — Core
    { path: '/services/salesforce-services', freq: 'monthly', pri: 0.95 },
    { path: '/services/sap-link-by-salesforce', freq: 'monthly', pri: 0.95 },
    { path: '/services/mulesoft', freq: 'monthly', pri: 0.95 },
    { path: '/services/crm-consulting', freq: 'monthly', pri: 0.95 },
    { path: '/services/api-integration', freq: 'monthly', pri: 0.9 },
    { path: '/services/aws-cloud-services', freq: 'monthly', pri: 0.9 },
    { path: '/services/oracle-managed-services', freq: 'monthly', pri: 0.9 },
    { path: '/services/sap', freq: 'monthly', pri: 0.95 },
    // Services — Digital
    { path: '/services/data-science', freq: 'monthly', pri: 0.9 },
    { path: '/services/web-development', freq: 'monthly', pri: 0.9 },
    { path: '/services/support-maintenance', freq: 'monthly', pri: 0.9 },
    { path: '/services/software-testing', freq: 'monthly', pri: 0.9 },
    // Industries
    { path: '/industries/education', freq: 'monthly', pri: 0.7 },
    { path: '/industries/health-care', freq: 'monthly', pri: 0.7 },
    { path: '/industries/real-estate', freq: 'monthly', pri: 0.7 },
    { path: '/industries/manufacturing', freq: 'monthly', pri: 0.7 },
    { path: '/industries/non-profit', freq: 'monthly', pri: 0.7 },
  ];

  const blogUrls = blogPosts.map((post) => ({
    path: `/blog/${post.slug}`,
    freq: 'monthly' as const,
    pri: 0.6,
  }));

  return [...urls, ...blogUrls].map(({ path, freq, pri }) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
    changeFrequency: freq as MetadataRoute.Sitemap[number]['changeFrequency'],
    priority: pri,
  }));
}
