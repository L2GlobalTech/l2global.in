import { getPublishedServices } from '@/lib/publicServices';
export const dynamic = 'force-dynamic';
export async function GET() {
  const services = await getPublishedServices();
  const body = ['# L2 Global Technologies', '', 'Website: https://www.l2global.in',
    'Contact: https://www.l2global.in/contact-us', '', '## Published services',
    ...services.map(service => `- ${service.title.replace(/[\r\n]/g, ' ')}: https://www.l2global.in/services/${service.slug}`),
    '', '## Other pages', '- Services: https://www.l2global.in/services',
    '- About: https://www.l2global.in/about-us', '- Blog: https://www.l2global.in/blog', ''].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
