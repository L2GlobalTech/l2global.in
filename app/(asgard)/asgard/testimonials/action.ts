import { supabase, isSupabaseConfigured } from '@/configs/supabase';
import { TestimonialRecord, TestimonialFormData } from '@/types/cms';

export type { TestimonialRecord, TestimonialFormData };

export interface GetTestimonialsParams {
  page?: number;
  pageSize?: number;
  perPage?: number;
  search?: string;
  status?: string; // 'all' | 'active' | 'inactive'
}

export interface GetTestimonialsResult {
  data: TestimonialRecord[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

/**
  * READ: Fetch testimonials with server-side search, filtering, ordering and pagination
  */
export async function getTestimonials(options?: GetTestimonialsParams): Promise<GetTestimonialsResult> {
  const page = Math.max(1, Number(options?.page) || 1);
  const pageSize = Math.max(1, Number(options?.pageSize || options?.perPage) || 10);
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const fallbackResult: GetTestimonialsResult = {
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
      .from('testimonials')
      .select('*', { count: 'exact' });

    // 1. Server-side search across name, role, company, title, desc
    const searchTerm = options?.search?.trim();
    if (searchTerm) {
      const sanitized = searchTerm.replace(/,/g, '');
      query = query.or(
        `name.ilike.%${sanitized}%,role.ilike.%${sanitized}%,company.ilike.%${sanitized}%,title.ilike.%${sanitized}%,desc.ilike.%${sanitized}%`
      );
    }

    // 2. Filter by status
    if (options?.status === 'active') {
      query = query.eq('is_active', true);
    } else if (options?.status === 'inactive') {
      query = query.eq('is_active', false);
    }

    // 3. Server-side ordering: display_order ascending, then created_at descending
    query = query
      .order('display_order', { ascending: true, nullsFirst: false })
      .order('created_at', { ascending: false })
      .range(from, to);

    const { data, count, error } = await query;

    if (error) {
      console.error('Error fetching testimonials from Supabase:', error);
      return fallbackResult;
    }

    const total = typeof count === 'number' ? count : (data || []).length;
    const totalPages = Math.ceil(total / pageSize) || 1;

    return {
      data: (data || []) as TestimonialRecord[],
      total,
      page,
      pageSize,
      totalPages,
    };
  } catch (err) {
    console.error('Unexpected error in getTestimonials:', err);
    return fallbackResult;
  }
}

/**
 * READ SINGLE: Fetch single testimonial by ID
 */
export async function getTestimonialById(id: string): Promise<TestimonialRecord | null> {
  try {
    if (!isSupabaseConfigured()) return null;

    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching testimonial by ID:', error);
      return null;
    }

    return data as TestimonialRecord;
  } catch (err) {
    console.error('Unexpected error in getTestimonialById:', err);
    return null;
  }
}

/**
 * CREATE: Insert a new testimonial into Supabase
 */
export async function createTestimonial(
  formData: TestimonialFormData
): Promise<{ success: boolean; data?: TestimonialRecord; error?: any }> {
  try {
    if (!isSupabaseConfigured()) {
      return { success: false, error: 'Supabase is not configured' };
    }

    const payload = {
      name: formData.name.trim(),
      role: formData.role.trim(),
      company: formData.company?.trim() || null,
      title: formData.title?.trim() || null,
      desc: formData.desc.trim(),
      img: formData.img?.trim() || null,
      rating: typeof formData.rating === 'number' ? formData.rating : 5,
      display_order: typeof formData.display_order === 'number' ? formData.display_order : 0,
      is_active: formData.is_active ?? true,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('testimonials')
      .insert([payload])
      .select()
      .single();

    if (error) {
      console.error('Error creating testimonial in Supabase:', error);
      return { success: false, error: error.message || error };
    }

    return { success: true, data: data as TestimonialRecord };
  } catch (err: any) {
    console.error('Unexpected error creating testimonial:', err);
    return { success: false, error: err.message || 'Failed to create testimonial' };
  }
}

/**
 * UPDATE: Update an existing testimonial
 */
export async function updateTestimonial(
  id: string,
  formData: Partial<TestimonialFormData>
): Promise<{ success: boolean; data?: TestimonialRecord; error?: any }> {
  try {
    if (!isSupabaseConfigured()) {
      return { success: false, error: 'Supabase is not configured' };
    }

    const payload: Record<string, any> = {
      updated_at: new Date().toISOString(),
    };

    if (formData.name !== undefined) payload.name = formData.name.trim();
    if (formData.role !== undefined) payload.role = formData.role.trim();
    if (formData.company !== undefined) payload.company = formData.company?.trim() || null;
    if (formData.title !== undefined) payload.title = formData.title?.trim() || null;
    if (formData.desc !== undefined) payload.desc = formData.desc.trim();
    if (formData.img !== undefined) payload.img = formData.img?.trim() || null;
    if (formData.rating !== undefined) payload.rating = formData.rating;
    if (formData.display_order !== undefined) payload.display_order = formData.display_order;
    if (formData.is_active !== undefined) payload.is_active = formData.is_active;

    const { data, error } = await supabase
      .from('testimonials')
      .update(payload)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating testimonial in Supabase:', error);
      return { success: false, error: error.message || error };
    }

    return { success: true, data: data as TestimonialRecord };
  } catch (err: any) {
    console.error('Unexpected error updating testimonial:', err);
    return { success: false, error: err.message || 'Failed to update testimonial' };
  }
}

/**
 * DELETE: Remove a testimonial by ID
 */
export async function deleteTestimonial(
  id: string
): Promise<{ success: boolean; error?: any }> {
  try {
    if (!isSupabaseConfigured()) {
      return { success: false, error: 'Supabase is not configured' };
    }

    const { error } = await supabase
      .from('testimonials')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting testimonial from Supabase:', error);
      return { success: false, error: error.message || error };
    }

    return { success: true };
  } catch (err: any) {
    console.error('Unexpected error deleting testimonial:', err);
    return { success: false, error: err.message || 'Failed to delete testimonial' };
  }
}

/**
 * TOGGLE: Quickly toggle active/inactive status
 */
export async function toggleTestimonialActiveStatus(
  id: string,
  currentStatus: boolean
): Promise<{ success: boolean; error?: any }> {
  return updateTestimonial(id, { is_active: !currentStatus });
}
