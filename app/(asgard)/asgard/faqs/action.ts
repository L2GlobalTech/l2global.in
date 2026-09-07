import { supabase, isSupabaseConfigured } from '@/configs/supabase';

export interface FAQRecord {
  id?: string;
  category: string | null;
  tag: string | null;
  question: string | null;
  answer: string | null;
  sort_order: number | null;
  is_active: boolean | null;
  created_at?: string;
  updated_at?: string;
}

export interface GetFaqsParams {
  page?: number;
  pageSize?: number;
  perPage?: number;
  search?: string;
  category?: string;
  status?: string; // 'all' | 'active' | 'inactive'
}

export interface GetFaqsResult {
  data: FAQRecord[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

/**
 * READ: Fetch FAQs with SERVER-SIDE search, filtering, sorting, and pagination
 */
export async function getFaqs(options?: GetFaqsParams): Promise<GetFaqsResult> {
  const page = Math.max(1, Number(options?.page) || 1);
  const pageSize = Math.max(1, Number(options?.pageSize || options?.perPage) || 10);
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const fallbackResult: GetFaqsResult = {
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
      .from('faqs')
      .select('*', { count: 'exact' });

    // 1. Server-side search across question, answer, category, and tag
    const searchTerm = options?.search?.trim();
    if (searchTerm) {
      const sanitized = searchTerm.replace(/,/g, '');
      query = query.or(
        `question.ilike.%${sanitized}%,answer.ilike.%${sanitized}%,category.ilike.%${sanitized}%,tag.ilike.%${sanitized}%`
      );
    }

    // 2. Filter by category
    if (options?.category && options.category !== 'all') {
      query = query.eq('category', options.category);
    }

    // 3. Filter by status
    if (options?.status === 'active') {
      query = query.eq('is_active', true);
    } else if (options?.status === 'inactive') {
      query = query.eq('is_active', false);
    }

    // 4. Server-side ordering: sort_order asc, then created_at desc
    query = query
      .order('sort_order', { ascending: true, nullsFirst: false })
      .order('created_at', { ascending: false })
      .range(from, to);

    const { data, count, error } = await query;

    if (error) {
      console.error('Error fetching faqs from Supabase:', error);
      return fallbackResult;
    }

    const total = typeof count === 'number' ? count : (data || []).length;
    const totalPages = Math.ceil(total / pageSize) || 1;

    return {
      data: (data || []) as FAQRecord[],
      total,
      page,
      pageSize,
      totalPages,
    };
  } catch (error) {
    console.error('Failed to query faqs from Supabase:', error);
    return fallbackResult;
  }
}

/**
 * READ: Fetch all active FAQs for the public website FAQ page
 */
export async function getPublicFaqs(): Promise<FAQRecord[]> {
  try {
    if (!isSupabaseConfigured()) {
      return [];
    }

    const { data, error } = await supabase
      .from('faqs')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true, nullsFirst: false })
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching public FAQs from Supabase:', error);
      return [];
    }

    return (data || []) as FAQRecord[];
  } catch (error) {
    console.error('Failed to query public FAQs from Supabase:', error);
    return [];
  }
}

/**
 * READ: Get all unique categories for filtering and suggestions
 */
export async function getFaqCategories(): Promise<string[]> {
  try {
    if (!isSupabaseConfigured()) return [];

    const { data, error } = await supabase
      .from('faqs')
      .select('category')
      .not('category', 'is', null);

    if (error || !data) return [];

    const uniqueCategories = new Set<string>();
    data.forEach((item: any) => {
      if (item.category && typeof item.category === 'string' && item.category.trim()) {
        uniqueCategories.add(item.category.trim());
      }
    });

    return Array.from(uniqueCategories).sort();
  } catch (err) {
    console.error('Error loading faq categories:', err);
    return [];
  }
}

/**
 * READ: Get single FAQ by ID
 */
export async function getFaqById(id: string): Promise<FAQRecord | null> {
  try {
    if (!id || !isSupabaseConfigured()) {
      return null;
    }

    const { data, error } = await supabase
      .from('faqs')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching faq by ID:', error);
      return null;
    }

    return (data || null) as FAQRecord | null;
  } catch (error) {
    console.error('Failed to fetch faq:', error);
    return null;
  }
}

/**
 * CREATE: Add a new FAQ
 */
export async function createFaq(faqData: Partial<FAQRecord>) {
  try {
    if (!isSupabaseConfigured()) {
      return { success: false, error: 'Supabase credentials are not configured.' };
    }

    if (!faqData.question?.trim()) {
      return { success: false, error: 'Question is required.' };
    }
    if (!faqData.answer?.trim()) {
      return { success: false, error: 'Answer is required.' };
    }

    const payload: any = {
      category: faqData.category?.trim() || null,
      tag: faqData.tag?.trim() || null,
      question: faqData.question.trim(),
      answer: faqData.answer.trim(),
      sort_order: Number.isInteger(Number(faqData.sort_order)) ? Number(faqData.sort_order) : 0,
      is_active: faqData.is_active !== undefined ? Boolean(faqData.is_active) : true,
    };

    const { data, error } = await supabase
      .from('faqs')
      .insert([payload])
      .select();

    if (error) {
      console.error('Error creating faq:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data: data?.[0] || payload };
  } catch (error: any) {
    console.error('Exception creating faq:', error);
    return { success: false, error: error.message || 'Failed to create faq' };
  }
}

/**
 * UPDATE: Update an existing FAQ
 */
export async function updateFaq(id: string, updates: Partial<FAQRecord>) {
  try {
    if (!id || !isSupabaseConfigured()) {
      return { success: false, error: 'FAQ ID and Supabase configuration are required.' };
    }

    const payload: any = {
      updated_at: new Date().toISOString(),
    };

    if (updates.category !== undefined) payload.category = updates.category?.trim() || null;
    if (updates.tag !== undefined) payload.tag = updates.tag?.trim() || null;
    if (updates.question !== undefined) payload.question = updates.question?.trim() || null;
    if (updates.answer !== undefined) payload.answer = updates.answer?.trim() || null;
    if (updates.sort_order !== undefined) {
      payload.sort_order = Number.isInteger(Number(updates.sort_order)) ? Number(updates.sort_order) : 0;
    }
    if (updates.is_active !== undefined) payload.is_active = Boolean(updates.is_active);

    const { data, error } = await supabase
      .from('faqs')
      .update(payload)
      .eq('id', id)
      .select();

    if (error) {
      console.error('Error updating faq:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data: data?.[0] || payload };
  } catch (error: any) {
    console.error('Exception updating faq:', error);
    return { success: false, error: error.message || 'Failed to update faq' };
  }
}

/**
 * DELETE: Remove an FAQ by ID
 */
export async function deleteFaq(id: string) {
  try {
    if (!id || !isSupabaseConfigured()) {
      return { success: false, error: 'FAQ ID is required.' };
    }

    const { error } = await supabase.from('faqs').delete().eq('id', id);

    if (error) {
      console.error('Error deleting faq:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error: any) {
    console.error('Exception deleting faq:', error);
    return { success: false, error: error.message || 'Failed to delete faq' };
  }
}

/**
 * QUICK TOGGLE: Active Status
 */
export async function toggleFaqActiveStatus(id: string, currentStatus: boolean | null) {
  try {
    if (!id || !isSupabaseConfigured()) {
      return { success: false, error: 'FAQ ID is required.' };
    }

    const newStatus = !currentStatus;

    const { data, error } = await supabase
      .from('faqs')
      .update({
        is_active: newStatus,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select();

    if (error) {
      console.error('Error toggling faq active status:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data: data?.[0] };
  } catch (error: any) {
    console.error('Exception toggling faq active status:', error);
    return { success: false, error: error.message || 'Failed to toggle status' };
  }
}
