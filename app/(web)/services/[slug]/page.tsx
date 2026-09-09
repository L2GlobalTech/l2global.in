import ServiceDetailContainer from '@/containers/services/ServiceDetailContainer'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React from 'react'
import { getPublicServiceBySlug } from '@/app/(asgard)/asgard/services/action'
import { fetchServices } from '@/actions/servicesAction'

interface PageProps {
    params: Promise<{ slug: string }>
}


const knownStaticSlugs = [
    'salesforce-consulting-implementation',
    'oracle-consulting-managed-services',
    'cloud-devops-consulting',
    'salesforce-services',
    'oracle-managed-services',
    'aws-cloud-services',
    'sap',
    'sap-link-by-salesforce',
    'sap-ai',
    'mulesoft',
    'data-science',
    'crm-consulting',
    'agentforce-ai',
    'api-integration',
    'software-testing',
    'support-maintenance',
    'web-development',
];

export async function generateStaticParams() {
    const slugSet = new Set<string>();

    // 1. Add all known pre-configured slugs
    knownStaticSlugs.forEach((s) => {
        if (s && s !== '[slug]') slugSet.add(s);
    });

    // 2. Add all dynamic service slugs from Supabase
    try {
        const services = await fetchServices();
        (services || []).forEach((s) => {
            if (s.slug && s.slug !== '[slug]') {
                slugSet.add(s.slug.replace(/^\/+|\/+$/g, ''));
            }
        });
    } catch (e) {
        console.warn('generateStaticParams error fetching Supabase services:', e);
    }

    return Array.from(slugSet).map((slug) => ({
        slug,
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const cleanSlug = slug ? slug.replace(/^\/+|\/+$/g, '') : '';
    const service = await getPublicServiceBySlug(cleanSlug);

    if (!service) {
        return {
            title: 'Service | L2 Global Technologies',
            description: 'Enterprise IT consulting and implementation solutions by L2 Global Technologies.',
        };
    }

    const title = service.meta_title || service.title || 'Enterprise Service | L2 Global';
    const description = service.meta_description || service.hero_description || 'Enterprise consulting and managed services by L2 Global Technologies.';

    return {
        title,
        description,
        alternates: { canonical: `https://l2global.in/services/${cleanSlug}` },
        openGraph: {
            title,
            description,
            url: `https://l2global.in/services/${cleanSlug}`,
            images: ['/assets/web/og-image.png'],
        },
    };
}

const ServiceDetailPage = async ({ params }: PageProps) => {
    const { slug } = await params;
    const cleanSlug = slug ? slug.replace(/^\/+|\/+$/g, '') : '';
    const service = await getPublicServiceBySlug(cleanSlug);

    if (!service) {
        // Check if there is fallback data for known slug
        const isKnown = knownStaticSlugs.includes(cleanSlug);
        if (!isKnown) {
            notFound();
        }
    }

    return <ServiceDetailContainer service={service} slug={cleanSlug} />
}

export default ServiceDetailPage
