import { supabase, isSupabaseConfigured } from '@/configs/supabase';

export interface ServiceRecord {
  id?: string;
  title: string | null;
  slug: string | null;
  badge_text?: string | null;
  short_descriptior?: string | null;
  short_description?: string | null;
  description?: string | null;
  features?: string[] | any[] | null;
  media_id?: string | null;
  cta_text?: string | null;
  cta_url?: string | null;
  sort_order?: number | null;
  is_active?: boolean | null;
  created_at?: string;
  updated_at?: string;
}

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

const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
};

const normalizeService = (item: any): ServiceRecord => {
  if (!item) return item;
  const shortDesc = item.short_description ?? item.short_descriptior ?? null;
  
  // Normalize features to array
  let normalizedFeatures: any[] = [];
  if (Array.isArray(item.features)) {
    normalizedFeatures = item.features;
  } else if (typeof item.features === 'string') {
    try {
      const parsed = JSON.parse(item.features);
      normalizedFeatures = Array.isArray(parsed) ? parsed : [];
    } catch {
      normalizedFeatures = item.features.split('\n').map((s: string) => s.trim()).filter(Boolean);
    }
  }

  return {
    ...item,
    short_descriptior: shortDesc,
    short_description: shortDesc,
    features: normalizedFeatures,
    is_active: item.is_active ?? true,
    sort_order: typeof item.sort_order === 'number' ? item.sort_order : 0,
    cta_text: item.cta_text ?? 'Get Started',
    cta_url: item.cta_url ?? '#',
  };
};

/**
 * READ: Fetch services with SERVER-SIDE search and SERVER-SIDE pagination directly from Supabase
 */
export async function getServices(options?: GetServicesParams): Promise<GetServicesResult> {
  const page = Math.max(1, Number(options?.page) || 1);
  const pageSize = Math.max(1, Number(options?.pageSize || options?.perPage) || 8);
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

    // 1. Server-side search across relevant columns in public.services table
    const searchTerm = options?.search?.trim();
    if (searchTerm) {
      const sanitized = searchTerm.replace(/,/g, '');
      query = query.or(
        `title.ilike.%${sanitized}%,slug.ilike.%${sanitized}%,badge_text.ilike.%${sanitized}%,short_description.ilike.%${sanitized}%,description.ilike.%${sanitized}%`
      );
    }

    // 2. Active status filtering
    if (options?.isActiveOnly || options?.status === 'active') {
      query = query.eq('is_active', true);
    } else if (options?.status === 'inactive') {
      query = query.eq('is_active', false);
    }

    // 3. Server-side ordering and range pagination
    query = query
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false })
      .range(from, to);

    const { data, count, error } = await query;

    if (error) {
      console.error('Error fetching services from Supabase:', error);
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
 * READ: Get a single service by ID
 */
export async function getServiceById(id: string) {
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
 * CREATE: Add a new service matching the Supabase schema
 */
export async function createService(serviceData: ServiceRecord) {
  try {
    if (!isSupabaseConfigured()) {
      return { success: false, error: 'Supabase credentials are not configured.' };
    }

    const title = serviceData.title?.trim();
    if (!title) {
      return { success: false, error: 'Service title is required.' };
    }

    const shortDesc = serviceData.short_description?.trim() || serviceData.short_descriptior?.trim() || null;
    
    // Normalize features array
    const featuresArray = Array.isArray(serviceData.features)
      ? serviceData.features.filter((f) => (typeof f === 'string' ? f.trim().length > 0 : Boolean(f)))
      : [];

    const payload: any = {
      title,
      slug: serviceData.slug ? slugify(serviceData.slug) : slugify(title),
      badge_text: serviceData.badge_text?.trim() || null,
      short_description: shortDesc,
      description: serviceData.description?.trim() || null,
      features: featuresArray,
      media_id: serviceData.media_id ? serviceData.media_id.trim() : null,
      cta_text: serviceData.cta_text?.trim() || 'Get Started',
      cta_url: serviceData.cta_url?.trim() || '#',
      sort_order: typeof serviceData.sort_order === 'number' ? serviceData.sort_order : 0,
      is_active: serviceData.is_active ?? true,
    };

    let { data, error } = await supabase
      .from('services')
      .insert([payload])
      .select()
      .single();

    if (error) {
      console.error('Error creating service:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data: normalizeService(data) };
  } catch (error: any) {
    console.error('Exception creating service:', error);
    return { success: false, error: error.message || 'Failed to create service' };
  }
}

/**
 * UPDATE: Update an existing service
 */
export async function updateService(id: string, updates: Partial<ServiceRecord>) {
  try {
    if (!id || !isSupabaseConfigured()) {
      return { success: false, error: 'Service ID and Supabase configuration are required.' };
    }

    const shortDesc = updates.short_description !== undefined
      ? (updates.short_description?.trim() || null)
      : updates.short_descriptior !== undefined
      ? (updates.short_descriptior?.trim() || null)
      : undefined;

    const payload: any = {
      updated_at: new Date().toISOString(),
    };

    if (updates.title !== undefined) payload.title = updates.title?.trim() || null;
    if (updates.slug !== undefined) payload.slug = updates.slug ? slugify(updates.slug) : null;
    if (updates.badge_text !== undefined) payload.badge_text = updates.badge_text?.trim() || null;
    if (shortDesc !== undefined) payload.short_description = shortDesc;
    if (updates.description !== undefined) payload.description = updates.description?.trim() || null;
    if (updates.features !== undefined) {
      payload.features = Array.isArray(updates.features)
        ? updates.features.filter((f) => (typeof f === 'string' ? f.trim().length > 0 : Boolean(f)))
        : [];
    }
    if (updates.media_id !== undefined) payload.media_id = updates.media_id ? updates.media_id.trim() : null;
    if (updates.cta_text !== undefined) payload.cta_text = updates.cta_text?.trim() || 'Get Started';
    if (updates.cta_url !== undefined) payload.cta_url = updates.cta_url?.trim() || '#';
    if (updates.sort_order !== undefined) payload.sort_order = Number(updates.sort_order) || 0;
    if (updates.is_active !== undefined) payload.is_active = Boolean(updates.is_active);

    let { data, error } = await supabase
      .from('services')
      .update(payload)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating service:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data: normalizeService(data) };
  } catch (error: any) {
    console.error('Exception updating service:', error);
    return { success: false, error: error.message || 'Failed to update service' };
  }
}

/**
 * DELETE: Remove a service by ID
 */
export async function deleteService(id: string) {
  try {
    if (!id || !isSupabaseConfigured()) {
      return { success: false, error: 'Service ID is required.' };
    }

    const { error } = await supabase.from('services').delete().eq('id', id);

    if (error) {
      console.error('Error deleting service:', error);
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

/**
 * Backwards compatible alias
 */
export async function toggleServiceStatus(id: string, currentStatus: any) {
  const currentBool = typeof currentStatus === 'boolean' ? currentStatus : currentStatus === 'active';
  return toggleServiceActiveStatus(id, currentBool);
}
