import { supabase, isSupabaseConfigured } from '@/configs/supabase';
import {
  ServiceItem as ServiceRecord,
  ServiceCapabilityItem,
  ServiceResultStat,
  ServiceFAQItem,
} from '@/types/cms';

export type { ServiceRecord, ServiceCapabilityItem, ServiceResultStat, ServiceFAQItem };

export interface GetServicesParams {
  page?: number;
  pageSize?: number;
  perPage?: number;
  search?: string;
  status?: 'active' | 'inactive' | 'all';
  isActiveOnly?: boolean;
}

export interface GetServicesResult {
  data: ServiceRecord[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
};

const parseJsonbArray = (val: any): any[] => {
  if (!val) return [];
  if (Array.isArray(val)) return val;
  if (typeof val === 'string') {
    try {
      const parsed = JSON.parse(val);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return val.split('\n').map((s: string) => s.trim()).filter(Boolean);
    }
  }
  return [];
};

export const normalizeService = (item: any): ServiceRecord => {
  if (!item) return item;

  return {
    id: item.id,
    title: item.title || '',
    slug: item.slug || '',
    badge_text: item.badge_text || null,

    // Hero Section
    hero_title: item.hero_title || null,
    hero_highlight: item.hero_highlight || null,
    hero_description: item.hero_description || null,
    hero_image_id: item.hero_image_id || null,
    hero_logo_text: item.hero_logo_text || null,
    hero_cta_text: item.hero_cta_text || 'Get Started Free',
    hero_cta_url: item.hero_cta_url || '#',
    hero_badges: parseJsonbArray(item.hero_badges),

    // Capabilities Section
    capabilities_badge: item.capabilities_badge || null,
    capabilities_title: item.capabilities_title || null,
    capabilities_highlight: item.capabilities_highlight || null,
    capabilities_description: item.capabilities_description || null,
    capabilities: parseJsonbArray(item.capabilities),

    // About Section
    about_badge: item.about_badge || null,
    about_title: item.about_title || null,
    about_highlight: item.about_highlight || null,
    about_description: item.about_description || null,
    about_features: parseJsonbArray(item.about_features),
    about_image_id: item.about_image_id || null,
    about_logo_text: item.about_logo_text || null,
    about_cta_text: item.about_cta_text || 'Get a Quote',
    about_cta_url: item.about_cta_url || '#',

    // Results Section
    results_badge: item.results_badge || null,
    results_title: item.results_title || null,
    results_highlight: item.results_highlight || null,
    results_description: item.results_description || null,
    results_stats: parseJsonbArray(item.results_stats),

    // Solutions Section
    solutions_badge: item.solutions_badge || null,
    solutions_title: item.solutions_title || null,
    solutions_highlight: item.solutions_highlight || null,
    solutions_description: item.solutions_description || null,
    solutions_image_id: item.solutions_image_id || null,
    solutions_logo_text: item.solutions_logo_text || null,
    solutions_badges: parseJsonbArray(item.solutions_badges),

    // FAQ Section
    faq_badge: item.faq_badge || null,
    faq_title: item.faq_title || null,
    faq_description: item.faq_description || null,
    faqs: parseJsonbArray(item.faqs),

    // Global / CTA / SEO
    cta_text: item.cta_text || null,
    cta_url: item.cta_url || null,
    sort_order: typeof item.sort_order === 'number' ? item.sort_order : 0,
    is_active: item.is_active ?? true,
    meta_title: item.meta_title || null,
    meta_description: item.meta_description || null,
    created_at: item.created_at,
    updated_at: item.updated_at,
  };
};

/**
 * READ: Fetch services with server-side search and ordering directly from Supabase
 */
export async function getServices(options?: GetServicesParams): Promise<GetServicesResult> {
  const page = Math.max(1, Number(options?.page) || 1);
  const pageSize = Math.max(1, Number(options?.pageSize || options?.perPage) || 50);
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const fallbackResult: GetServicesResult = {
    data: [],
    total: 0,
    page,
    pageSize,
    totalPages: 1,
  };

  try {
    if (!isSupabaseConfigured()) {
      console.warn('Supabase is not configured in environment');
      return fallbackResult;
    }

    let query = supabase
      .from('services')
      .select('*', { count: 'exact' });

    // 1. Search across relevant text columns in public.services table
    const searchTerm = options?.search?.trim();
    if (searchTerm) {
      const sanitized = searchTerm.replace(/,/g, '');
      query = query.or(
        `title.ilike.%${sanitized}%,slug.ilike.%${sanitized}%,badge_text.ilike.%${sanitized}%,hero_title.ilike.%${sanitized}%,hero_description.ilike.%${sanitized}%,about_title.ilike.%${sanitized}%,meta_title.ilike.%${sanitized}%`
      );
    }

    // 3. Server-side ordering
    try {
      query = query
        .order('sort_order', { ascending: true, nullsFirst: false })
        .order('created_at', { ascending: false, nullsFirst: false });
    } catch {
      query = query.order('created_at', { ascending: false });
    }

    // 4. Pagination range
    if (options?.pageSize && options.pageSize < 100) {
      query = query.range(from, to);
    }

    const { data, count, error } = await query;

    if (error) {
      console.error('Error fetching services from Supabase:', error);
      // If error occurred due to column or ordering, try a direct fallback query
      const fallbackQuery = await supabase.from('services').select('*');
      if (!fallbackQuery.error && fallbackQuery.data) {
        return {
          data: fallbackQuery.data.map(normalizeService),
          total: fallbackQuery.data.length,
          page: 1,
          pageSize: fallbackQuery.data.length,
          totalPages: 1,
        };
      }
      return fallbackResult;
    }

    const total = typeof count === 'number' ? count : (data || []).length;
    const totalPages = Math.ceil(total / pageSize) || 1;

    return {
      data: (data || []).map(normalizeService),
      total,
      page,
      pageSize,
      totalPages,
    };
  } catch (error) {
    console.error('Failed to query services from Supabase:', error);
    return fallbackResult;
  }
}

/**
 * READ: Get a single service by UUID from Supabase
 */
export async function getServiceById(id: string): Promise<ServiceRecord | null> {
  try {
    if (!id || !isSupabaseConfigured()) {
      return null;
    }

    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching service by ID:', error);
      return null;
    }

    return data ? normalizeService(data) : null;
  } catch (error) {
    console.error('Failed to fetch service:', error);
    return null;
  }
}

/**
 * CREATE: Add a new service matching the exact Supabase schema
 */
export async function createService(serviceData: ServiceRecord): Promise<{ success: boolean; data?: ServiceRecord; error?: string }> {
  try {
    if (!isSupabaseConfigured()) {
      return { success: false, error: 'Supabase credentials are not configured.' };
    }

    const title = serviceData.title?.trim();
    if (!title) {
      return { success: false, error: 'Service title is required.' };
    }

    const generatedSlug = serviceData.slug?.trim()
      ? slugify(serviceData.slug)
      : slugify(title);

    const payload: any = {
      title,
      slug: generatedSlug,
      badge_text: serviceData.badge_text?.trim() || null,

      // Hero Section
      hero_title: serviceData.hero_title?.trim() || null,
      hero_highlight: serviceData.hero_highlight?.trim() || null,
      hero_description: serviceData.hero_description?.trim() || null,
      hero_image_id: serviceData.hero_image_id?.trim() || null,
      hero_logo_text: serviceData.hero_logo_text?.trim() || null,
      hero_cta_text: serviceData.hero_cta_text?.trim() || 'Get Started Free',
      hero_cta_url: serviceData.hero_cta_url?.trim() || '#',
      hero_badges: Array.isArray(serviceData.hero_badges)
        ? serviceData.hero_badges.filter((b) => typeof b === 'string' ? b.trim().length > 0 : Boolean(b))
        : [],

      // Capabilities Section
      capabilities_badge: serviceData.capabilities_badge?.trim() || null,
      capabilities_title: serviceData.capabilities_title?.trim() || null,
      capabilities_highlight: serviceData.capabilities_highlight?.trim() || null,
      capabilities_description: serviceData.capabilities_description?.trim() || null,
      capabilities: Array.isArray(serviceData.capabilities) ? serviceData.capabilities : [],

      // About Section
      about_badge: serviceData.about_badge?.trim() || null,
      about_title: serviceData.about_title?.trim() || null,
      about_highlight: serviceData.about_highlight?.trim() || null,
      about_description: serviceData.about_description?.trim() || null,
      about_features: Array.isArray(serviceData.about_features)
        ? serviceData.about_features.filter((f) => typeof f === 'string' ? f.trim().length > 0 : Boolean(f))
        : [],
      about_image_id: serviceData.about_image_id?.trim() || null,
      about_logo_text: serviceData.about_logo_text?.trim() || null,
      about_cta_text: serviceData.about_cta_text?.trim() || 'Get a Quote',
      about_cta_url: serviceData.about_cta_url?.trim() || '#',

      // Results Section
      results_badge: serviceData.results_badge?.trim() || null,
      results_title: serviceData.results_title?.trim() || null,
      results_highlight: serviceData.results_highlight?.trim() || null,
      results_description: serviceData.results_description?.trim() || null,
      results_stats: Array.isArray(serviceData.results_stats) ? serviceData.results_stats : [],

      // Solutions Section
      solutions_badge: serviceData.solutions_badge?.trim() || null,
      solutions_title: serviceData.solutions_title?.trim() || null,
      solutions_highlight: serviceData.solutions_highlight?.trim() || null,
      solutions_description: serviceData.solutions_description?.trim() || null,
      solutions_image_id: serviceData.solutions_image_id?.trim() || null,
      solutions_logo_text: serviceData.solutions_logo_text?.trim() || null,
      solutions_badges: Array.isArray(serviceData.solutions_badges)
        ? serviceData.solutions_badges.filter((b) => typeof b === 'string' ? b.trim().length > 0 : Boolean(b))
        : [],

      // FAQ Section
      faq_badge: serviceData.faq_badge?.trim() || null,
      faq_title: serviceData.faq_title?.trim() || null,
      faq_description: serviceData.faq_description?.trim() || null,
      faqs: Array.isArray(serviceData.faqs) ? serviceData.faqs : [],

      // Global / CTA / SEO
      cta_text: serviceData.cta_text?.trim() || null,
      cta_url: serviceData.cta_url?.trim() || null,
      sort_order: typeof serviceData.sort_order === 'number' ? serviceData.sort_order : 0,
      is_active: serviceData.is_active ?? true,
      meta_title: serviceData.meta_title?.trim() || null,
      meta_description: serviceData.meta_description?.trim() || null,
    };

    const { data, error } = await supabase
      .from('services')
      .insert([payload])
      .select()
      .single();

    if (error) {
      console.error('Error creating service in Supabase:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data: normalizeService(data) };
  } catch (error: any) {
    console.error('Exception creating service:', error);
    return { success: false, error: error.message || 'Failed to create service' };
  }
}

/**
 * UPDATE: Update an existing service in Supabase
 */
export async function updateService(
  id: string,
  updates: Partial<ServiceRecord>
): Promise<{ success: boolean; data?: ServiceRecord; error?: string }> {
  try {
    if (!id || !isSupabaseConfigured()) {
      return { success: false, error: 'Service ID and Supabase configuration are required.' };
    }

    const payload: any = {
      updated_at: new Date().toISOString(),
    };

    if (updates.title !== undefined) payload.title = updates.title?.trim() || null;
    if (updates.slug !== undefined) payload.slug = updates.slug ? slugify(updates.slug) : null;
    if (updates.badge_text !== undefined) payload.badge_text = updates.badge_text?.trim() || null;

    // Hero
    if (updates.hero_title !== undefined) payload.hero_title = updates.hero_title?.trim() || null;
    if (updates.hero_highlight !== undefined) payload.hero_highlight = updates.hero_highlight?.trim() || null;
    if (updates.hero_description !== undefined) payload.hero_description = updates.hero_description?.trim() || null;
    if (updates.hero_image_id !== undefined) payload.hero_image_id = updates.hero_image_id ? updates.hero_image_id.trim() : null;
    if (updates.hero_logo_text !== undefined) payload.hero_logo_text = updates.hero_logo_text?.trim() || null;
    if (updates.hero_cta_text !== undefined) payload.hero_cta_text = updates.hero_cta_text?.trim() || 'Get Started Free';
    if (updates.hero_cta_url !== undefined) payload.hero_cta_url = updates.hero_cta_url?.trim() || '#';
    if (updates.hero_badges !== undefined) {
      payload.hero_badges = Array.isArray(updates.hero_badges)
        ? updates.hero_badges.filter((b) => typeof b === 'string' ? b.trim().length > 0 : Boolean(b))
        : [];
    }

    // Capabilities
    if (updates.capabilities_badge !== undefined) payload.capabilities_badge = updates.capabilities_badge?.trim() || null;
    if (updates.capabilities_title !== undefined) payload.capabilities_title = updates.capabilities_title?.trim() || null;
    if (updates.capabilities_highlight !== undefined) payload.capabilities_highlight = updates.capabilities_highlight?.trim() || null;
    if (updates.capabilities_description !== undefined) payload.capabilities_description = updates.capabilities_description?.trim() || null;
    if (updates.capabilities !== undefined) {
      payload.capabilities = Array.isArray(updates.capabilities) ? updates.capabilities : [];
    }

    // About
    if (updates.about_badge !== undefined) payload.about_badge = updates.about_badge?.trim() || null;
    if (updates.about_title !== undefined) payload.about_title = updates.about_title?.trim() || null;
    if (updates.about_highlight !== undefined) payload.about_highlight = updates.about_highlight?.trim() || null;
    if (updates.about_description !== undefined) payload.about_description = updates.about_description?.trim() || null;
    if (updates.about_features !== undefined) {
      payload.about_features = Array.isArray(updates.about_features)
        ? updates.about_features.filter((f) => typeof f === 'string' ? f.trim().length > 0 : Boolean(f))
        : [];
    }
    if (updates.about_image_id !== undefined) payload.about_image_id = updates.about_image_id ? updates.about_image_id.trim() : null;
    if (updates.about_logo_text !== undefined) payload.about_logo_text = updates.about_logo_text?.trim() || null;
    if (updates.about_cta_text !== undefined) payload.about_cta_text = updates.about_cta_text?.trim() || 'Get a Quote';
    if (updates.about_cta_url !== undefined) payload.about_cta_url = updates.about_cta_url?.trim() || '#';

    // Results
    if (updates.results_badge !== undefined) payload.results_badge = updates.results_badge?.trim() || null;
    if (updates.results_title !== undefined) payload.results_title = updates.results_title?.trim() || null;
    if (updates.results_highlight !== undefined) payload.results_highlight = updates.results_highlight?.trim() || null;
    if (updates.results_description !== undefined) payload.results_description = updates.results_description?.trim() || null;
    if (updates.results_stats !== undefined) {
      payload.results_stats = Array.isArray(updates.results_stats) ? updates.results_stats : [];
    }

    // Solutions
    if (updates.solutions_badge !== undefined) payload.solutions_badge = updates.solutions_badge?.trim() || null;
    if (updates.solutions_title !== undefined) payload.solutions_title = updates.solutions_title?.trim() || null;
    if (updates.solutions_highlight !== undefined) payload.solutions_highlight = updates.solutions_highlight?.trim() || null;
    if (updates.solutions_description !== undefined) payload.solutions_description = updates.solutions_description?.trim() || null;
    if (updates.solutions_image_id !== undefined) payload.solutions_image_id = updates.solutions_image_id ? updates.solutions_image_id.trim() : null;
    if (updates.solutions_logo_text !== undefined) payload.solutions_logo_text = updates.solutions_logo_text?.trim() || null;
    if (updates.solutions_badges !== undefined) {
      payload.solutions_badges = Array.isArray(updates.solutions_badges)
        ? updates.solutions_badges.filter((b) => typeof b === 'string' ? b.trim().length > 0 : Boolean(b))
        : [];
    }

    // FAQ
    if (updates.faq_badge !== undefined) payload.faq_badge = updates.faq_badge?.trim() || null;
    if (updates.faq_title !== undefined) payload.faq_title = updates.faq_title?.trim() || null;
    if (updates.faq_description !== undefined) payload.faq_description = updates.faq_description?.trim() || null;
    if (updates.faqs !== undefined) {
      payload.faqs = Array.isArray(updates.faqs) ? updates.faqs : [];
    }

    // Global / CTA / SEO
    if (updates.cta_text !== undefined) payload.cta_text = updates.cta_text?.trim() || null;
    if (updates.cta_url !== undefined) payload.cta_url = updates.cta_url?.trim() || null;
    if (updates.sort_order !== undefined) payload.sort_order = Number(updates.sort_order) || 0;
    if (updates.is_active !== undefined) payload.is_active = Boolean(updates.is_active);
    if (updates.meta_title !== undefined) payload.meta_title = updates.meta_title?.trim() || null;
    if (updates.meta_description !== undefined) payload.meta_description = updates.meta_description?.trim() || null;

    const { data, error } = await supabase
      .from('services')
      .update(payload)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating service in Supabase:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data: normalizeService(data) };
  } catch (error: any) {
    console.error('Exception updating service:', error);
    return { success: false, error: error.message || 'Failed to update service' };
  }
}

/**
 * DELETE: Remove a service by ID from Supabase
 */
export async function deleteService(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    if (!id || !isSupabaseConfigured()) {
      return { success: false, error: 'Service ID is required.' };
    }

    const { error } = await supabase.from('services').delete().eq('id', id);

    if (error) {
      console.error('Error deleting service from Supabase:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error: any) {
    console.error('Exception deleting service:', error);
    return { success: false, error: error.message || 'Failed to delete service' };
  }
}

/**
 * QUICK TOGGLE: Active status
 */
export async function toggleServiceActiveStatus(id: string, currentIsActive: boolean) {
  try {
    if (!id || !isSupabaseConfigured()) {
      return { success: false, error: 'Service ID is required.' };
    }

    const newIsActive = !currentIsActive;

    const { data, error } = await supabase
      .from('services')
      .update({
        is_active: newIsActive,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error toggling service status:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data: normalizeService(data) };
  } catch (error: any) {
    console.error('Exception toggling service status:', error);
    return { success: false, error: error.message || 'Failed to toggle service status' };
  }
}

// Aliases for compatibility
export const toggleServiceStatus = (id: string, currentStatus: any) => {
  const currentBool = typeof currentStatus === 'boolean' ? currentStatus : currentStatus === 'active';
  return toggleServiceActiveStatus(id, currentBool);
};
