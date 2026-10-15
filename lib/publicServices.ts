import { cache } from 'react';
import { supabase, isSupabaseConfigured } from '@/configs/supabase';
import { normalizeService } from '@/app/(asgard)/asgard/services/action';
import type { ServiceRecord } from '@/types/cms';
type PublishedService = ServiceRecord & { title: string; slug: string };

export function normalizeServiceSlug(value: string | null): string | null {
  const slug = (value || '').trim().replace(/^\/+|\/+$/g, '');
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return null;
  // Preserve the existing CMS record while correcting its known public URL typo.
  return slug === 'oracle-consulting-managed-servicesss' ? 'oracle-consulting-managed-services' : slug;
}

// Only CMS records with a real title and service description can become public pages.
export function isPublishableService(service: ServiceRecord): boolean {
  return service.is_active === true && Boolean(service.title?.trim()) &&
    Boolean(normalizeServiceSlug(service.slug)) &&
    Boolean(service.hero_description?.trim() || service.about_description?.trim());
}

export const getPublishedServices = cache(async (): Promise<PublishedService[]> => {
  if (!isSupabaseConfigured()) return [];
  const services: ServiceRecord[] = [];
  const pageSize = 1000;
  for (let offset = 0; ; offset += pageSize) {
    const { data, error } = await supabase.from('services').select('*')
      .eq('is_active', true).order('id').range(offset, offset + pageSize - 1);
    // Fail visibly on outages instead of caching missing pages or an incomplete sitemap.
    if (error) throw new Error('Unable to load published services');
    services.push(...(data || []).map(normalizeService));
    if (!data || data.length < pageSize) break;
  }
  const unique = new Map<string, PublishedService>();
  for (const service of services.filter(isPublishableService)) {
    const slug = normalizeServiceSlug(service.slug)!;
    if (unique.has(slug)) throw new Error('Duplicate published service slug');
    unique.set(slug, { ...service, title: service.title!.trim(), slug });
  }
  return [...unique.values()].sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
});

export const getPublishedService = cache(async (slug: string): Promise<PublishedService | null> => {
  if (!normalizeServiceSlug(slug)) return null;
  return (await getPublishedServices()).find(service => service.slug === slug) || null;
});
