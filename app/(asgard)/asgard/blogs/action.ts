import { supabase, isSupabaseConfigured } from '@/configs/supabase';
import { BlogPost } from '@/types';
import { getMediaPublicUrl } from '@/actions/mediaAction';

export interface BlogRecord {
  id?: string;
  title: string | null;
  slug?: string | null;
  media_id?: string | null;
  alt_text?: string | null;
  is_featured?: boolean | null;
  tag?: string | null;
  subtitle?: string | null;
  sub_description?: string | null;
  meta_description?: string | null;
  meta_descriptior?: string | null;
  meta_keywords?: string | null;
  content?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface GetBlogsParams {
  page?: number;
  pageSize?: number;
  perPage?: number;
  search?: string;
  tag?: string;
  isFeaturedOnly?: boolean;
}

export interface GetBlogsResult {
  data: BlogRecord[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

const formatMediaId = (val: any): string | null => {
  if (!val || typeof val !== 'string') return null;
  const trimmed = val.trim().replace(/^[\r\n\s]+|[\r\n\s]+$/g, '');
  return trimmed.length > 0 ? trimmed : null;
};

/**
 * READ: Fetch blogs with SERVER-SIDE search and SERVER-SIDE pagination directly from Supabase
 */
export async function getBlogs(options?: GetBlogsParams): Promise<GetBlogsResult> {
  const page = Math.max(1, Number(options?.page) || 1);
  const pageSize = Math.max(1, Number(options?.pageSize || options?.perPage) || 8);
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const fallbackResult: GetBlogsResult = {
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
      .from('blogs')
      .select('*', { count: 'exact' });

    // 1. Server-side search across relevant text columns in Supabase
    const searchTerm = options?.search?.trim();
    if (searchTerm) {
      const sanitized = searchTerm.replace(/,/g, '');
      query = query.or(
        `title.ilike.%${sanitized}%,subtitle.ilike.%${sanitized}%,tag.ilike.%${sanitized}%,sub_description.ilike.%${sanitized}%,content.ilike.%${sanitized}%`
      );
    }

    // 2. Filter by featured status
    if (options?.isFeaturedOnly) {
      query = query.eq('is_featured', true);
    }

    // 3. Filter by category tag
    if (options?.tag && options.tag !== 'all') {
      query = query.eq('tag', options.tag);
    }

    // 4. Server-side ordering and range pagination
    query = query
      .order('created_at', { ascending: false })
      .range(from, to);

    const { data, count, error } = await query;

    if (error) {
      console.error('Error fetching blogs from Supabase:', error);
      return fallbackResult;
    }

    const total = typeof count === 'number' ? count : (data || []).length;
    const totalPages = Math.ceil(total / pageSize) || 1;

    return {
      data: (data || []) as BlogRecord[],
      total,
      page,
      pageSize,
      totalPages,
    };
  } catch (error) {
    console.error('Failed to query blogs from Supabase:', error);
    return fallbackResult;
  }
}

/**
 * READ: Get all unique blog tags for dropdown filters directly from Supabase
 */
export async function getBlogTags(): Promise<string[]> {
  try {
    if (!isSupabaseConfigured()) return [];

    const { data, error } = await supabase
      .from('blogs')
      .select('tag')
      .not('tag', 'is', null);

    if (error || !data) return [];

    const uniqueTags = new Set<string>();
    data.forEach((item: any) => {
      if (item.tag && typeof item.tag === 'string' && item.tag.trim()) {
        uniqueTags.add(item.tag.trim());
      }
    });

    return Array.from(uniqueTags);
  } catch (err) {
    console.error('Error loading blog tags:', err);
    return [];
  }
}

/**
 * READ: Get a single blog by ID
 */
export async function getBlogById(id: string) {
  try {
    if (!id || !isSupabaseConfigured()) {
      return null;
    }

    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching blog by ID:', error);
      return null;
    }

    return (data || null) as BlogRecord | null;
  } catch (error) {
    console.error('Failed to fetch blog:', error);
    return null;
  }
}

/**
 * CREATE: Add a new blog
 */
export async function createBlog(blogData: BlogRecord) {
  try {
    if (!isSupabaseConfigured()) {
      return { success: false, error: 'Supabase credentials are not configured.' };
    }

    const metaDesc = blogData.meta_descriptior?.trim() || blogData.meta_description?.trim() || null;

    const rawSlug = blogData.slug?.trim() ? slugify(blogData.slug.trim()) : (blogData.title ? slugify(blogData.title) : null);

    const payload: any = {
      title: blogData.title?.trim() || null,
      slug: rawSlug || null,
      subtitle: blogData.subtitle?.trim() || null,
      tag: blogData.tag?.trim() || null,
      is_featured: Boolean(blogData.is_featured),
      media_id: formatMediaId(blogData.media_id),
      alt_text: blogData.alt_text?.trim() || null,
      sub_description: blogData.sub_description?.trim() || null,
      meta_descriptior: metaDesc,
      meta_keywords: blogData.meta_keywords?.trim() || null,
      content: blogData.content || null,
    };

    let { data, error } = await supabase
      .from('blogs')
      .insert([payload])
      .select();

    // Fallback if column in DB happens to be meta_description
    if (error && (error.code === 'PGRST204' || error.message?.includes('meta_descriptior'))) {
      delete payload.meta_descriptior;
      payload.meta_description = metaDesc;
      const retryRes = await supabase.from('blogs').insert([payload]).select();
      if (!retryRes.error) {
        return { success: true, data: retryRes.data?.[0] || payload };
      }
      error = retryRes.error;
    }

    if (error) {
      console.error('Error creating blog:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data: data?.[0] || payload };
  } catch (error: any) {
    console.error('Exception creating blog:', error);
    return { success: false, error: error.message || 'Failed to create blog' };
  }
}

/**
 * UPDATE: Update an existing blog
 */
export async function updateBlog(id: string, updates: Partial<BlogRecord>) {
  try {
    if (!id || !isSupabaseConfigured()) {
      return { success: false, error: 'Blog ID and Supabase configuration are required.' };
    }

    const metaDesc = updates.meta_descriptior !== undefined
      ? (updates.meta_descriptior?.trim() || null)
      : updates.meta_description !== undefined
        ? (updates.meta_description?.trim() || null)
        : undefined;

    const payload: any = {
      updated_at: new Date().toISOString(),
    };

    if (updates.title !== undefined) payload.title = updates.title?.trim() || null;
    if (updates.slug !== undefined) payload.slug = updates.slug?.trim() ? slugify(updates.slug.trim()) : (updates.title ? slugify(updates.title) : null);
    if (updates.subtitle !== undefined) payload.subtitle = updates.subtitle?.trim() || null;
    if (updates.tag !== undefined) payload.tag = updates.tag?.trim() || null;
    if (updates.is_featured !== undefined) payload.is_featured = Boolean(updates.is_featured);
    if (updates.media_id !== undefined) payload.media_id = formatMediaId(updates.media_id);
    if (updates.alt_text !== undefined) payload.alt_text = updates.alt_text?.trim() || null;
    if (updates.sub_description !== undefined) payload.sub_description = updates.sub_description?.trim() || null;
    if (metaDesc !== undefined) payload.meta_descriptior = metaDesc;
    if (updates.meta_keywords !== undefined) payload.meta_keywords = updates.meta_keywords?.trim() || null;
    if (updates.content !== undefined) payload.content = updates.content || null;

    let { data, error } = await supabase
      .from('blogs')
      .update(payload)
      .eq('id', id)
      .select();

    // Fallback if column in DB is meta_description
    if (error && (error.code === 'PGRST204' || error.message?.includes('meta_descriptior'))) {
      delete payload.meta_descriptior;
      if (metaDesc !== undefined) payload.meta_description = metaDesc;
      const retryRes = await supabase.from('blogs').update(payload).eq('id', id).select();
      if (!retryRes.error) {
        return { success: true, data: retryRes.data?.[0] || payload };
      }
      error = retryRes.error;
    }

    if (error) {
      console.error('Error updating blog:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data: data?.[0] || payload };
  } catch (error: any) {
    console.error('Exception updating blog:', error);
    return { success: false, error: error.message || 'Failed to update blog' };
  }
}

/**
 * DELETE: Remove a blog by ID
 */
export async function deleteBlog(id: string) {
  try {
    if (!id || !isSupabaseConfigured()) {
      return { success: false, error: 'Blog ID is required.' };
    }

    const { error } = await supabase.from('blogs').delete().eq('id', id);

    if (error) {
      console.error('Error deleting blog:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error: any) {
    console.error('Exception deleting blog:', error);
    return { success: false, error: error.message || 'Failed to delete blog' };
  }
}

/**
 * QUICK TOGGLE: Featured Status
 */
export async function toggleBlogFeaturedStatus(id: string, currentStatus: boolean | null) {
  try {
    if (!id || !isSupabaseConfigured()) {
      return { success: false, error: 'Blog ID is required.' };
    }

    const { data, error } = await supabase
      .from('blogs')
      .update({
        is_featured: !currentStatus,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select();

    if (error) {
      console.error('Error toggling blog featured status:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data: data?.[0] };
  } catch (error: any) {
    console.error('Exception toggling featured status:', error);
    return { success: false, error: error.message || 'Failed to toggle featured status' };
  }
}

// Aliases for compatibility
export const fetchBlogsAction = async (options?: GetBlogsParams) => {
  const result = await getBlogs(options);
  return { success: true, data: result.data, total: result.total, error: null };
};
export const getBlogByIdAction = async (id: string) => {
  const data = await getBlogById(id);
  return { success: Boolean(data), data, error: data ? null : 'Not found' };
};
export const createBlogAction = createBlog;
export const updateBlogAction = updateBlog;
export const deleteBlogAction = deleteBlog;

export const slugify = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\r\n]+/g, '-')
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const mapBlogRecordToBlogPost = (record: BlogRecord): BlogPost => {
  const rawTitle = (record.title || '').trim().replace(/^[\r\n\s]+|[\r\n\s]+$/g, '') || 'Untitled Article';
  const rawSlug = (record.slug || '').trim().replace(/^[\r\n\s]+|[\r\n\s]+$/g, '');
  const computedSlug = rawSlug ? slugify(rawSlug) : (slugify(rawTitle) || record.id || 'article');
  const rawMedia = (record.media_id || '').trim().replace(/^[\r\n\s]+|[\r\n\s]+$/g, '');
  const mediaUrl = rawMedia ? getMediaPublicUrl(rawMedia, 'blogs') : null;
  const fallbackImage = '/assets/web/blog/salesforce-sap.png';
  const image = mediaUrl || fallbackImage;

  const tagString = (record.tag || '').trim().replace(/^[\r\n\s]+|[\r\n\s]+$/g, '');
  const keywordsString = (record.meta_keywords || '').trim().replace(/^[\r\n\s]+|[\r\n\s]+$/g, '');
  const parsedTags: string[] = [];

  if (tagString) {
    tagString.split(',').forEach((t) => {
      const clean = t.trim();
      if (clean && !parsedTags.includes(clean)) parsedTags.push(clean);
    });
  }
  if (keywordsString) {
    keywordsString.split(',').forEach((k) => {
      const clean = k.trim();
      if (clean && !parsedTags.includes(clean)) parsedTags.push(clean);
    });
  }
  if (parsedTags.length === 0) {
    parsedTags.push('Enterprise Tech');
  }

  const category = parsedTags[0] || 'Enterprise Tech';

  // Format content: convert plain text newlines to html paragraphs if raw text
  let rawContent = record.content || '';
  if (!rawContent && record.sub_description) {
    rawContent = `<p>${record.sub_description.trim()}</p>`;
  } else if (!rawContent && record.subtitle) {
    rawContent = `<p>${record.subtitle.trim()}</p>`;
  } else if (rawContent && !rawContent.includes('<') && !rawContent.includes('>')) {
    rawContent = rawContent
      .split(/\n\n+/)
      .map((para) => `<p>${para.replace(/\n/g, '<br/>')}</p>`)
      .join('');
  }

  const excerpt =
    (record.subtitle || '').trim().replace(/^[\r\n\s]+|[\r\n\s]+$/g, '') ||
    (record.sub_description || '').trim().replace(/^[\r\n\s]+|[\r\n\s]+$/g, '') ||
    'Read full insights from L2 Global Technology enterprise integration architects.';

  return {
    id: record.id || computedSlug,
    slug: computedSlug,
    title: rawTitle,
    metaTitle: rawTitle,
    metaDescription: record.meta_description || record.meta_descriptior || excerpt,
    excerpt,
    content: rawContent || '<p>Content coming soon.</p>',
    author: 'L2 Global Tech Editorial',
    authorRole: 'Enterprise Integration Experts',
    datePublished: record.created_at && !Number.isNaN(Date.parse(record.created_at)) ? new Date(record.created_at).toISOString() : '',
    dateModified: record.updated_at && !Number.isNaN(Date.parse(record.updated_at)) ? new Date(record.updated_at).toISOString() : undefined,
    image,
    category,
    tags: parsedTags,
    serviceLink: '/services',
    serviceName: 'Explore IT Services',
    is_featured: Boolean(record.is_featured),
  };
};

/**
 * READ: Fetch all published blogs from Supabase for the public website
 */
export async function getPublicBlogs(): Promise<BlogPost[]> {
  const { getPublishedBlogs } = await import('@/lib/publicBlogs');
  return getPublishedBlogs();
}

export async function getPublicBlogByIdOrSlug(input: string): Promise<BlogPost | null> {
  const { getPublishedBlog } = await import('@/lib/publicBlogs');
  return getPublishedBlog(input);
}

export const getPublicBlogBySlug = getPublicBlogByIdOrSlug;
export const getPublicBlogById = getPublicBlogByIdOrSlug;


