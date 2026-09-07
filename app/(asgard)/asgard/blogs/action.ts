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
  const trimmed = val.trim();
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
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
};

const inferRelatedService = (tag?: string | null, title?: string | null): { link: string; name: string } => {
  const combined = `${tag || ''} ${title || ''}`.toLowerCase();
  if (combined.includes('agentforce')) return { link: '/services/agentforce-ai', name: 'Salesforce Agentforce AI' };
  if (combined.includes('sap joule') || combined.includes('sap ai')) return { link: '/services/sap-ai', name: 'SAP Joule AI Implementation' };
  if (combined.includes('mulesoft') || combined.includes('boomi') || combined.includes('ipaas')) return { link: '/services/mulesoft', name: 'MuleSoft Consulting' };
  if (combined.includes('sap link') || (combined.includes('salesforce') && combined.includes('sap'))) return { link: '/services/sap-link-by-salesforce', name: 'SAP Link by Salesforce' };
  if (combined.includes('sap')) return { link: '/services/sap', name: 'SAP S/4HANA Services' };
  if (combined.includes('aws') || combined.includes('cloud migration')) return { link: '/services/aws-cloud-services', name: 'AWS Cloud Services' };
  if (combined.includes('oracle') || combined.includes('dba')) return { link: '/services/oracle-managed-services', name: 'Oracle Managed Services' };
  if (combined.includes('crm') || combined.includes('salesforce implementation')) return { link: '/services/crm-consulting', name: 'CRM Consulting' };
  if (combined.includes('salesforce')) return { link: '/services/salesforce-services', name: 'Salesforce Services' };
  if (combined.includes('data science') || combined.includes('machine learning')) return { link: '/services/data-science', name: 'Data Science & ML' };
  if (combined.includes('testing') || combined.includes('qa')) return { link: '/services/software-testing', name: 'Software Testing & QA' };
  if (combined.includes('support') || combined.includes('maintenance')) return { link: '/services/support-maintenance', name: 'Application Support' };
  return { link: '/services', name: 'Enterprise Services' };
};

export const mapBlogRecordToBlogPost = (record: BlogRecord): BlogPost => {
  const rawTitle = record.title?.trim() || 'Untitled Article';
  const computedSlug = (record.slug && record.slug.trim()) ? record.slug.trim() : (slugify(rawTitle) || record.id || 'article');
  const mediaUrl = record.media_id ? getMediaPublicUrl(record.media_id, 'blogs') : null;
  const fallbackImage = '/assets/web/blog/salesforce-sap.png';
  const image = mediaUrl || fallbackImage;

  const tagString = record.tag?.trim() || '';
  const keywordsString = record.meta_keywords?.trim() || '';
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
  const related = inferRelatedService(record.tag, record.title);

  // Format content: convert plain text newlines to html paragraphs if raw text
  let rawContent = record.content || '';
  if (!rawContent && record.sub_description) {
    rawContent = `<p>${record.sub_description}</p>`;
  } else if (rawContent && !rawContent.includes('<') && !rawContent.includes('>')) {
    rawContent = rawContent
      .split(/\n\n+/)
      .map((para) => `<p>${para.replace(/\n/g, '<br/>')}</p>`)
      .join('');
  }

  return {
    id: record.id || computedSlug,
    slug: computedSlug,
    title: rawTitle,
    metaTitle: rawTitle,
    metaDescription: record.meta_description || record.meta_descriptior || record.sub_description || rawTitle,
    excerpt: record.sub_description || record.subtitle || 'Read full insights from L2 Global Technology enterprise integration architects.',
    content: rawContent || '<p>Content coming soon.</p>',
    author: 'L2 Global Tech Editorial',
    authorRole: 'Enterprise Integration Experts',
    datePublished: record.created_at || new Date().toISOString(),
    image,
    category,
    tags: parsedTags,
    serviceLink: related.link,
    serviceName: related.name,
    is_featured: Boolean(record.is_featured),
  };
};

import { blogPosts } from '@/constants/blogData';

/**
 * READ: Fetch all published blogs from Supabase for the public website
 */
export async function getPublicBlogs(): Promise<BlogPost[]> {
  try {
    if (!isSupabaseConfigured()) {
      return blogPosts;
    }

    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching public blogs from Supabase:', error);
      return [];
    }

    const dbBlogs = (data || []).map((row: any) => mapBlogRecordToBlogPost(row as BlogRecord));
    return dbBlogs;
  } catch (error) {
    console.error('Failed to query public blogs from Supabase:', error);
    return [];
  }
}

/**
 * READ: Fetch a single public blog by slug (or ID) from Supabase
 */
export async function getPublicBlogBySlug(slug: string): Promise<BlogPost | null> {
  try {
    if (!slug) return null;

    const cleanSlug = slug.trim().toLowerCase().replace(/^\/+|\/+$/g, '');
    const decodedSlug = decodeURIComponent(cleanSlug);

    // 1. Direct database query for exact slug column in Supabase
    if (isSupabaseConfigured()) {
      const { data: slugMatch } = await supabase
        .from('blogs')
        .select('*')
        .eq('slug', cleanSlug)
        .maybeSingle();

      if (slugMatch) return mapBlogRecordToBlogPost(slugMatch as BlogRecord);

      if (decodedSlug !== cleanSlug) {
        const { data: decodedMatch } = await supabase
          .from('blogs')
          .select('*')
          .eq('slug', decodedSlug)
          .maybeSingle();
        if (decodedMatch) return mapBlogRecordToBlogPost(decodedMatch as BlogRecord);
      }

      // Check UUID match
      const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(cleanSlug);
      if (isUUID) {
        const { data } = await supabase.from('blogs').select('*').eq('id', cleanSlug).maybeSingle();
        if (data) return mapBlogRecordToBlogPost(data as BlogRecord);
      }
    }

    // 2. Search in all blogs list from Supabase
    const allBlogs = await getPublicBlogs();
    const found = allBlogs.find(
      (b) =>
        (b.slug && b.slug.toLowerCase() === cleanSlug) ||
        (b.slug && b.slug.toLowerCase() === decodedSlug) ||
        (b.title && slugify(b.title) === cleanSlug) ||
        (b.title && slugify(b.title) === decodedSlug) ||
        b.id === slug ||
        String(b.id) === slug ||
        String(b.id) === cleanSlug
    );
    if (found) return found;

    // 3. Match by title ilike in database
    if (isSupabaseConfigured()) {
      const titleQueryText = decodedSlug.replace(/-/g, ' ');
      const { data: titleMatches } = await supabase
        .from('blogs')
        .select('*')
        .ilike('title', `%${titleQueryText}%`)
        .limit(1);

      if (titleMatches && titleMatches.length > 0) {
        return mapBlogRecordToBlogPost(titleMatches[0] as BlogRecord);
      }
    }

    return null;
  } catch (error) {
    console.error('Failed to fetch public blog by slug:', error);
    return null;
  }
}


