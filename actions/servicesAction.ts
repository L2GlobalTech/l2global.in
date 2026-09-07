import { supabase, isSupabaseConfigured } from '@/configs/supabase';
import { FrontendService } from '@/types';
import {
    Bot,
    Sparkles,
    RefreshCw,
    Users,
    GitMerge,
    Workflow,
    Database,
    Cloud,
    Server,
    BarChart3,
    Code2,
    Wrench,
    CheckCircle2,
    Layers,
    Cpu,
    LucideIcon
} from 'lucide-react';

export const slugify = (text: string): string => {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/--+/g, '-');
};

// Map slug/title to corresponding Lucide Icon
export const getServiceIcon = (slugOrTitle?: string): LucideIcon => {
    const key = (slugOrTitle || '').toLowerCase();
    if (key.includes('agentforce') || key.includes('bot') || key.includes('autonomous')) return Bot;
    if (key.includes('joule') || key.includes('sap-ai') || key.includes('genai')) return Sparkles;
    if (key.includes('s4hana') || key.includes('rise') || key.includes('migration') || key.includes('sap')) return RefreshCw;
    if (key.includes('salesforce') || key.includes('crm') || key.includes('consulting')) return Users;
    if (key.includes('integration') && key.includes('sap')) return GitMerge;
    if (key.includes('mulesoft') || key.includes('workflow') || key.includes('boomi')) return Workflow;
    if (key.includes('api') || key.includes('database')) return Database;
    if (key.includes('aws') || key.includes('cloud') || key.includes('devops')) return Cloud;
    if (key.includes('oracle') || key.includes('server') || key.includes('dba')) return Server;
    if (key.includes('data') || key.includes('science') || key.includes('machine') || key.includes('ml')) return BarChart3;
    if (key.includes('web') || key.includes('development') || key.includes('code')) return Code2;
    if (key.includes('support') || key.includes('maintenance') || key.includes('wrench')) return Wrench;
    if (key.includes('testing') || key.includes('qa') || key.includes('quality')) return CheckCircle2;
    return Layers;
};

// Resolve route URL for service slug
export const resolveServiceHref = (slug: string): string => {
    const clean = (slug || '').toLowerCase().replace(/^\/+|\/+$/g, '').trim();
    if (!clean) return '/services';
    if (clean.startsWith('services/')) {
        return `/${clean}`;
    }
    return `/services/${clean}`;
};

// Default high-quality services dataset (used only as fallback if Supabase is empty)
export const defaultServices: FrontendService[] = [
    {
        id: '1',
        slug: 'salesforce-consulting-implementation',
        title: 'Salesforce Consulting & Implementation',
        desc: 'Salesforce implementation, customisation and managed support. 180+ deployments.',
        href: '/services/salesforce-consulting-implementation',
        badge_text: 'Salesforce Partner',
        is_active: true,
    },
    {
        id: '2',
        slug: 'oracle-consulting-managed-services',
        title: 'Oracle Consulting & Managed Services',
        desc: '24/7 Oracle DBA and Oracle Cloud Infrastructure specialists.',
        href: '/services/oracle-consulting-managed-services',
        badge_text: 'Oracle 24/7',
        is_active: true,
    },
    {
        id: '3',
        slug: 'cloud-devops-consulting',
        title: 'Cloud & DevOps Consulting',
        desc: 'Cloud migration, DevOps, architecture design and managed cloud services.',
        href: '/services/cloud-devops-consulting',
        badge_text: 'AWS Cloud',
        is_active: true,
    },
];

export const mapServiceRecordToFrontend = (record: any): FrontendService => {
    const rawTitle = record.title?.trim() || 'Enterprise Solution';
    const rawSlug = record.slug?.trim() || slugify(rawTitle) || 'service';
    const cleanSlug = rawSlug.replace(/^\/+|\/+$/g, '');
    const desc = record.hero_description?.trim() ||
        record.about_description?.trim() ||
        record.capabilities_description?.trim() ||
        record.solutions_description?.trim() ||
        (record.badge_text ? `${record.badge_text} enterprise solutions by L2 Global.` : null) ||
        'Enterprise architecture, cloud migration, and integration solutions by L2 Global.';

    return {
        id: record.id || cleanSlug,
        title: rawTitle,
        slug: cleanSlug,
        desc,
        href: resolveServiceHref(cleanSlug),
        badge_text: record.badge_text || null,
        hero_title: record.hero_title || rawTitle,
        hero_description: desc,
        is_active: record.is_active ?? true,
    };
};

/**
 * PRIMARY FRONTEND DATA FETCHER:
 * Fetch all active services from Supabase `public.services` table in their exact defined order.
 * Returns ONLY the services created in Supabase.
 */
export async function fetchServices(): Promise<FrontendService[]> {
    try {
        if (!isSupabaseConfigured()) {
            return defaultServices;
        }

        let query = supabase
            .from('services')
            .select('*');

        try {
            query = query
                .order('sort_order', { ascending: true, nullsFirst: false })
                .order('created_at', { ascending: false, nullsFirst: false });
        } catch {
            query = query.order('created_at', { ascending: false });
        }

        const { data, error } = await query;

        if (error) {
            console.error('Error fetching services from Supabase:', error);
            return defaultServices;
        }

        if (data && data.length > 0) {
            // Filter only active services from Supabase
            const activeDbServices = data
                .filter((item: any) => item.is_active !== false)
                .map(mapServiceRecordToFrontend);

            // Return strictly the active services from Supabase
            if (activeDbServices.length > 0) {
                return activeDbServices;
            }
        }

        return defaultServices;
    } catch (err) {
        console.error('Exception fetching services from Supabase:', err);
        return defaultServices;
    }
}

/**
 * Fetch a single service by slug or ID from Supabase with fallback
 */
export async function fetchServiceBySlug(slug: string): Promise<FrontendService | null> {
    try {
        if (!slug) return null;
        const cleanSlug = slug.trim().toLowerCase().replace(/^\/+|\/+$/g, '');
        const decodedSlug = decodeURIComponent(cleanSlug);

        const all = await fetchServices();
        const found = all.find(
            (s) =>
                s.slug.toLowerCase() === cleanSlug ||
                s.slug.toLowerCase() === decodedSlug ||
                slugify(s.title) === cleanSlug ||
                slugify(s.title) === decodedSlug ||
                s.id === slug
        );

        if (found) return found;

        return all[0] || null;
    } catch (err) {
        console.error('Failed to fetch service by slug:', err);
        return null;
    }
}
