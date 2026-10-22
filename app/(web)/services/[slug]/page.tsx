import ServiceDetailContainer from '@/containers/services/ServiceDetailContainer';
import ServiceExploreMore from '@/components/web/services/ServiceExploreMore';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPublishedService, getPublishedServices } from '@/lib/publicServices';

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
        {otherServices.length > 0 && (
            <ServiceExploreMore services={otherServices} currentTitle={service.title} />
        )}
    </>;
}
