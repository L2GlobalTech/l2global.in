// app/sitemap.ts
import { MetadataRoute } from 'next';

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
    // Services — highest priority
    { path: '/services/sap-link-by-salesforce', freq: 'monthly', pri: 0.95 },
    { path: '/services/mulesoft', freq: 'monthly', pri: 0.95 },
    { path: '/services/crm-consulting', freq: 'monthly', pri: 0.95 },
    { path: '/services/api-integration', freq: 'monthly', pri: 0.9 },
    { path: '/services/aws-cloud-services', freq: 'monthly', pri: 0.9 },
    { path: '/services/oracle-managed-services', freq: 'monthly', pri: 0.9 },
    // Industries
    { path: '/industries/education', freq: 'monthly', pri: 0.7 },
    { path: '/industries/health-care', freq: 'monthly', pri: 0.7 },
    { path: '/industries/real-estate', freq: 'monthly', pri: 0.7 },
    { path: '/industries/manufacturing', freq: 'monthly', pri: 0.7 },
    { path: '/industries/non-profit', freq: 'monthly', pri: 0.7 },
  ];
  return urls.map(({ path, freq, pri }) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
    changeFrequency: freq as MetadataRoute.Sitemap[number]['changeFrequency'],
    priority: pri,
  }));
}
