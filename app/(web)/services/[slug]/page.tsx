import ServiceDetailContainer from '@/containers/services/ServiceDetailContainer';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPublishedService, getPublishedServices } from '@/lib/publicServices';
import Link from 'next/link';

export const dynamic = 'force-dynamic';
interface PageProps { params: Promise<{ slug: string }> }

async function requireService(params: PageProps['params']) {
    const { slug } = await params;
    const service = await getPublishedService(slug);
    if (!service) notFound();
    return service;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const service = await requireService(params);
    const title = (service.meta_title?.trim() || service.title).replace(/\s*\|\s*L2 Global(?: Technologies)?\s*$/i, '');
    const description = service.meta_description?.trim() || service.hero_description?.trim() || service.about_description!.trim();
    const url = `https://www.l2global.in/services/${service.slug}`;
    return {
        title, description, alternates: { canonical: url },
        openGraph: {
            type: 'website', title, description, url,
            siteName: 'L2 Global Technologies',
            images: [{ url: '/assets/web/og-image.png', width: 1200, height: 630, alt: 'L2 Global Technologies' }],
        },
        twitter: { card: 'summary_large_image', title, description, images: ['/assets/web/og-image.png'] },
    };
}

export default async function ServiceDetailPage({ params }: PageProps) {
    const service = await requireService(params);
    const otherServices = (await getPublishedServices()).filter(item => item.slug !== service.slug);
    const breadcrumb = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.l2global.in/' },
        { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://www.l2global.in/services' },
        { '@type': 'ListItem', position: 3, name: service.title, item: `https://www.l2global.in/services/${service.slug}` },
    ] };
    const schema = {
        '@context': 'https://schema.org', '@type': 'Service',
        name: service.title, description: service.hero_description || service.about_description,
        url: `https://www.l2global.in/services/${service.slug}`,
        provider: { '@type': 'Organization', name: 'L2 Global Technologies', url: 'https://www.l2global.in' },
    };
    return <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([schema, breadcrumb]).replace(/</g, '\\u003c') }} />
        <ServiceDetailContainer service={service} slug={service.slug} />
        {otherServices.length > 0 && <section className="container mx-auto px-5 py-16" aria-labelledby="more-services-heading">
            <h2 id="more-services-heading" className="text-3xl font-semibold">Explore More Services</h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{otherServices.map(item => <li key={item.slug}><Link href={`/services/${item.slug}`} className="block rounded-xl border border-gray-200 p-5 text-[#195DF0] hover:underline">{item.title}</Link></li>)}</ul>
        </section>}
    </>;
}
