import { supabase, getSupabaseAdmin, isSupabaseConfigured } from '@/configs/supabase';
import { JobOpeningRecord, JobOpeningFormData } from '@/types/cms';

export type { JobOpeningRecord, JobOpeningFormData };

export interface GetJobOpeningsParams {
  page?: number;
  pageSize?: number;
  perPage?: number;
  search?: string;
  status?: string; // 'all' | 'active' | 'inactive'
  experienceLevel?: string; // 'all' | 'Entry-Level' | ...
  employmentType?: string; // 'all' | 'Full-time' | ...
}

export interface GetJobOpeningsResult {
  data: JobOpeningRecord[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

/**
 * Generate a clean URL-friendly slug from title
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * READ: Fetch job openings with server-side search, filtering, ordering, and pagination
 */
export async function getJobOpenings(options?: GetJobOpeningsParams): Promise<GetJobOpeningsResult> {
  const page = Math.max(1, Number(options?.page) || 1);
  const pageSize = Math.max(1, Number(options?.pageSize || options?.perPage) || 10);
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const fallbackResult: GetJobOpeningsResult = {
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
      .from('job_openings')
      .select('*', { count: 'exact' });

    // 1. Search by job title (and experience level/slug)
    const searchTerm = options?.search?.trim();
    if (searchTerm) {
      const sanitized = searchTerm.replace(/,/g, '');
      query = query.or(`title.ilike.%${sanitized}%,slug.ilike.%${sanitized}%`);
    }

    // 2. Filter by status
    if (options?.status === 'active') {
      query = query.eq('is_active', true);
    } else if (options?.status === 'inactive') {
      query = query.eq('is_active', false);
    }

    // 3. Filter by experience level
    if (options?.experienceLevel && options.experienceLevel !== 'all') {
      query = query.eq('experience_level', options.experienceLevel);
    }

    // 4. Filter by employment type
    if (options?.employmentType && options.employmentType !== 'all') {
      query = query.eq('employment_type', options.employmentType);
    }

    // 5. Order by display_order ascending, then created_at descending
    query = query
      .order('display_order', { ascending: true, nullsFirst: false })
      .order('created_at', { ascending: false })
      .range(from, to);

    const { data, count, error } = await query;

    if (error) {
      console.error('Error fetching job openings from Supabase:', error);
      return fallbackResult;
    }

    const total = typeof count === 'number' ? count : (data || []).length;
    const totalPages = Math.ceil(total / pageSize) || 1;

    return {
      data: (data || []) as JobOpeningRecord[],
      total,
      page,
      pageSize,
      totalPages,
    };
  } catch (error) {
    console.error('Failed to query job openings from Supabase:', error);
    return fallbackResult;
  }
}

/**
 * READ: Fetch all active job openings for the public website
 */
export async function getPublicJobOpenings(): Promise<JobOpeningRecord[]> {
  try {
    if (!isSupabaseConfigured()) {
      return [];
    }

    const { data, error } = await supabase
      .from('job_openings')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true, nullsFirst: false })
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching public job openings from Supabase:', error);
      return [];
    }

    return (data || []) as JobOpeningRecord[];
  } catch (error) {
    console.error('Failed to query public job openings from Supabase:', error);
    return [];
  }
}



/**
 * READ: Get single job opening by ID
 */
export async function getJobOpeningById(id: string): Promise<JobOpeningRecord | null> {
  try {
    if (!id || !isSupabaseConfigured()) {
      return null;
    }

    const { data, error } = await supabase
      .from('job_openings')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching job opening by ID:', error);
      return null;
    }

    return (data || null) as JobOpeningRecord | null;
  } catch (error) {
    console.error('Failed to fetch job opening:', error);
    return null;
  }
}

/**
 * READ: Get single job opening by slug
 */
export async function getJobOpeningBySlug(slug: string): Promise<JobOpeningRecord | null> {
  try {
    if (!slug || !isSupabaseConfigured()) {
      return null;
    }

    const { data, error } = await supabase
      .from('job_openings')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      console.error('Error fetching job opening by slug:', error);
      return null;
    }

    return (data || null) as JobOpeningRecord | null;
  } catch (error) {
    console.error('Failed to fetch job opening by slug:', error);
    return null;
  }
}

/**
 * CREATE: Add a new job opening
 */
export async function createJobOpening(jobData: Partial<JobOpeningRecord>) {
  try {
    if (!isSupabaseConfigured()) {
      return { success: false, error: 'Supabase credentials are not configured.' };
    }

    const title = jobData.title?.trim();
    if (!title) {
      return { success: false, error: 'Job title is required.' };
    }

    let slug = jobData.slug?.trim() || slugify(title);
    if (!slug) {
      slug = slugify(title);
    }

    const primary_responsibility = jobData.primary_responsibility?.trim();
    if (!primary_responsibility) {
      return { success: false, error: 'Primary responsibility is required.' };
    }

    // Check slug uniqueness
    const { data: existingSlug } = await supabase
      .from('job_openings')
      .select('id')
      .eq('slug', slug)
      .maybeSingle();

    if (existingSlug) {
      return {
        success: false,
        error: `A job opening with slug "${slug}" already exists. Please provide a unique slug.`,
      };
    }

    // Auth session check
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return {
        success: false,
        error: 'You must be signed in with an authorized admin account to create job openings.',
      };
    }

    // Clean arrays: remove empty strings
    const locations = Array.isArray(jobData.locations)
      ? jobData.locations.map((l) => String(l).trim()).filter(Boolean)
      : [];

    const job_specifications = Array.isArray(jobData.job_specifications)
      ? jobData.job_specifications.map((s) => String(s).trim()).filter(Boolean)
      : [];

    const insertPayload: any = {
      title,
      slug,
      experience_level: jobData.experience_level?.trim() || null,
      locations: locations.length > 0 ? locations : null,
      primary_responsibility,
      job_specifications: job_specifications.length > 0 ? job_specifications : null,
      employment_type: jobData.employment_type?.trim() || null,
      work_place_type: jobData.work_place_type?.trim() || null,
      salary: jobData.salary?.trim() || null,
      experience_required: jobData.experience_required?.trim() || null,
      application_url: jobData.application_url?.trim() || null,
      is_active: jobData.is_active !== undefined ? Boolean(jobData.is_active) : true,
      display_order: Number.isInteger(Number(jobData.display_order))
        ? Number(jobData.display_order)
        : 0,
    };

    const client = typeof window === 'undefined' ? getSupabaseAdmin() : supabase;

    const { data, error } = await client
      .from('job_openings')
      .insert([insertPayload])
      .select();

    if (error) {
      console.error('Error inserting job opening into Supabase:', error);
      if (error.code === '23505') {
        return {
          success: false,
          error: `A job opening with slug "${slug}" already exists. Please choose a different slug.`,
        };
      }
      if (error.code === '42501' || error.message?.toLowerCase().includes('row-level security')) {
        return {
          success: false,
          error:
            'Supabase Row-Level Security (RLS) violation: Please run the RLS policy script in Supabase SQL Editor to allow authenticated users to insert into "job_openings".',
        };
      }
      return { success: false, error: error.message };
    }

    return { success: true, data: data?.[0] || insertPayload };
  } catch (error: any) {
    console.error('Failed to create job opening:', error);
    return { success: false, error: error.message || 'Failed to create job opening' };
  }
}

/**
 * UPDATE: Update an existing job opening
 */
export async function updateJobOpening(id: string, updates: Partial<JobOpeningRecord>) {
  try {
    if (!id || !isSupabaseConfigured()) {
      return { success: false, error: 'Job opening ID and Supabase configuration are required.' };
    }

    // Auth session check
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return {
        success: false,
        error: 'You must be signed in with an authorized admin account to update job openings.',
      };
    }

    if (updates.title !== undefined && !updates.title?.trim()) {
      return { success: false, error: 'Job title cannot be empty.' };
    }

    if (updates.primary_responsibility !== undefined && !updates.primary_responsibility?.trim()) {
      return { success: false, error: 'Primary responsibility cannot be empty.' };
    }

    // Slug validation and uniqueness check
    let cleanSlug: string | undefined;
    if (updates.slug !== undefined) {
      cleanSlug = updates.slug?.trim() || (updates.title ? slugify(updates.title) : undefined);
      if (!cleanSlug) {
        return { success: false, error: 'Slug cannot be empty.' };
      }

      const { data: existingSlug } = await supabase
        .from('job_openings')
        .select('id')
        .eq('slug', cleanSlug)
        .neq('id', id)
        .maybeSingle();

      if (existingSlug) {
        return {
          success: false,
          error: `A job opening with slug "${cleanSlug}" already exists. Please choose a different slug.`,
        };
      }
    }

    const payload: any = {
      updated_at: new Date().toISOString(),
    };

    if (updates.title !== undefined) payload.title = updates.title.trim();
    if (cleanSlug !== undefined) payload.slug = cleanSlug;
    if (updates.experience_level !== undefined) {
      payload.experience_level = updates.experience_level?.trim() || null;
    }
    if (updates.locations !== undefined) {
      const locations = Array.isArray(updates.locations)
        ? updates.locations.map((l) => String(l).trim()).filter(Boolean)
        : [];
      payload.locations = locations.length > 0 ? locations : null;
    }
    if (updates.primary_responsibility !== undefined) {
      payload.primary_responsibility = updates.primary_responsibility.trim();
    }
    if (updates.job_specifications !== undefined) {
      const specs = Array.isArray(updates.job_specifications)
        ? updates.job_specifications.map((s) => String(s).trim()).filter(Boolean)
        : [];
      payload.job_specifications = specs.length > 0 ? specs : null;
    }
    if (updates.employment_type !== undefined) {
      payload.employment_type = updates.employment_type?.trim() || null;
    }
    if (updates.work_place_type !== undefined) {
      payload.work_place_type = updates.work_place_type?.trim() || null;
    }
    if (updates.salary !== undefined) {
      payload.salary = updates.salary?.trim() || null;
    }
    if (updates.experience_required !== undefined) {
      payload.experience_required = updates.experience_required?.trim() || null;
    }
    if (updates.application_url !== undefined) {
      payload.application_url = updates.application_url?.trim() || null;
    }
    if (updates.is_active !== undefined) {
      payload.is_active = Boolean(updates.is_active);
    }
    if (updates.display_order !== undefined) {
      payload.display_order = Number.isInteger(Number(updates.display_order))
        ? Number(updates.display_order)
        : 0;
    }

    const client = typeof window === 'undefined' ? getSupabaseAdmin() : supabase;

    const { data, error } = await client
      .from('job_openings')
      .update(payload)
      .eq('id', id)
      .select();

    if (error) {
      console.error('Error updating job opening:', error);
      if (error.code === '23505') {
        return {
          success: false,
          error: `A job opening with slug "${cleanSlug}" already exists. Please choose a different slug.`,
        };
      }
      if (error.code === '42501' || error.message?.toLowerCase().includes('row-level security')) {
        return {
          success: false,
          error:
            'Supabase Row-Level Security (RLS) violation: Please run the RLS policy script in Supabase SQL Editor to allow authenticated users to update "job_openings".',
        };
      }
      return { success: false, error: error.message };
    }

    return { success: true, data: data?.[0] || payload };
  } catch (error: any) {
    console.error('Failed to update job opening:', error);
    return { success: false, error: error.message || 'Failed to update job opening' };
  }
}

/**
 * DELETE: Remove a job opening by UUID
 */
export async function deleteJobOpening(id: string) {
  try {
    if (!id || !isSupabaseConfigured()) {
      return { success: false, error: 'Job opening ID is required.' };
    }

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return {
        success: false,
        error: 'You must be signed in with an authorized admin account to delete job openings.',
      };
    }

    const client = typeof window === 'undefined' ? getSupabaseAdmin() : supabase;

    const { error } = await client.from('job_openings').delete().eq('id', id);

    if (error) {
      console.error('Error deleting job opening:', error);
      if (error.code === '42501' || error.message?.toLowerCase().includes('row-level security')) {
        return {
          success: false,
          error:
            'Supabase Row-Level Security (RLS) violation: Please run the RLS policy script in Supabase SQL Editor to allow authenticated users to delete from "job_openings".',
        };
      }
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error: any) {
    console.error('Failed to delete job opening:', error);
    return { success: false, error: error.message || 'Failed to delete job opening' };
  }
}

/**
 * QUICK TOGGLE: Active Status
 */
export async function toggleJobOpeningActiveStatus(id: string, currentStatus: boolean | null) {
  try {
    if (!id || !isSupabaseConfigured()) {
      return { success: false, error: 'Job opening ID is required.' };
    }

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return {
        success: false,
        error: 'You must be signed in with an authorized admin account to update status.',
      };
    }

    const newStatus = !currentStatus;
    const client = typeof window === 'undefined' ? getSupabaseAdmin() : supabase;

    const { data, error } = await client
      .from('job_openings')
      .update({
        is_active: newStatus,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select();

    if (error) {
      console.error('Error toggling job opening status:', error);
      if (error.code === '42501' || error.message?.toLowerCase().includes('row-level security')) {
        return {
          success: false,
          error:
            'Supabase Row-Level Security (RLS) violation: Please run the RLS policy script in Supabase SQL Editor to allow authenticated users to update "job_openings".',
        };
      }
      return { success: false, error: error.message };
    }

    return { success: true, data: data?.[0] };
  } catch (error: any) {
    console.error('Failed to toggle status:', error);
    return { success: false, error: error.message || 'Failed to toggle status' };
  }
}
