// app/sitemap.ts
import { MetadataRoute } from 'next';
import { getPublishedServices } from '@/lib/publicServices';
import { getPublicBlogs } from '@/app/(asgard)/asgard/blogs/action';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const BASE = 'https://www.l2global.in';
  const urls = [
    // Core pages
    { path: '/', freq: 'weekly', pri: 1.0 },
    { path: '/about-us', freq: 'monthly', pri: 0.9 },
    { path: '/contact-us', freq: 'monthly', pri: 0.9 },
    { path: '/career', freq: 'monthly', pri: 0.7 },
    { path: '/team', freq: 'monthly', pri: 0.6 },
    { path: '/blog', freq: 'weekly', pri: 0.7 },
    { path: '/faq', freq: 'monthly', pri: 0.6 },
    { path: '/privacy-policy', freq: 'yearly', pri: 0.3 },
    { path: '/terms-and-conditions', freq: 'yearly', pri: 0.3 },

    { path: '/services', freq: 'monthly', pri: 0.95 },

    // Industries
    { path: '/industries/education', freq: 'monthly', pri: 0.7 },
    { path: '/industries/health-care', freq: 'monthly', pri: 0.7 },
    { path: '/industries/real-estate', freq: 'monthly', pri: 0.7 },
    { path: '/industries/manufacturing', freq: 'monthly', pri: 0.7 },
    { path: '/industries/non-profit', freq: 'monthly', pri: 0.7 },
  ];

  const [blogs, services] = await Promise.all([getPublicBlogs(), getPublishedServices()]);
  const blogUrls = blogs.map((post) => ({
    path: `/blog/${post.slug}`,
    freq: 'monthly' as const,
    pri: 0.6,
  }));

  const serviceUrls = services.map(service => ({ path: `/services/${service.slug}`, freq: 'monthly', pri: 0.9 }));

  return [...new Map([...urls, ...blogUrls, ...serviceUrls].map(entry => [entry.path, entry])).values()].map(({ path, freq, pri }) => ({
    url: `${BASE}${path}`,
    changeFrequency: freq as MetadataRoute.Sitemap[number]['changeFrequency'],
    priority: pri,
  }));
}
