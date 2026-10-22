import { cache } from 'react';
import { supabase, getSupabaseAdmin, isSupabaseConfigured } from '@/configs/supabase';
import { mapBlogRecordToBlogPost, slugify } from '@/app/(asgard)/asgard/blogs/action';
import type { BlogPost } from '@/types';
import { blogPosts as fallbackBlogs } from '@/constants/blogData';

export const getPublishedBlogs = cache(async (): Promise<BlogPost[]> => {
  if (!isSupabaseConfigured()) return fallbackBlogs || [];
  const posts = new Map<string, BlogPost>();
  const pageSize = 1000;
  const client = typeof window === 'undefined' ? getSupabaseAdmin() : supabase;

  for (let offset = 0; ; offset += pageSize) {
    const { data, error } = await client.from('blogs').select('*')
      .order('created_at', { ascending: false }).order('id').range(offset, offset + pageSize - 1);
    if (error) throw new Error('Unable to load published blogs');
    for (const row of data || []) {
      const slug = (row.slug?.trim() || slugify(row.title || '') || row.id || '').replace(/^\/+|\/+$/g, '').toLowerCase();
      const content = (row.content || row.sub_description || row.subtitle || '').trim();
      if (!row.title?.trim() || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || !content || /^<p>Content coming soon\.<\/p>$/i.test(content)) continue;
      if (posts.has(slug)) throw new Error('Duplicate published blog slug');
      posts.set(slug, { ...mapBlogRecordToBlogPost(row), slug });
    }
    if (!data || data.length < pageSize) break;
  }
  if (posts.size === 0 && fallbackBlogs && fallbackBlogs.length > 0) {
    for (const fb of fallbackBlogs) {
      const slug = (fb.slug?.trim() || slugify(fb.title || '')).replace(/^\/+|\/+$/g, '').toLowerCase();
      posts.set(slug, { ...fb, slug });
    }
  }
  return [...posts.values()];
});

export const getPublishedBlog = cache(async (input: string): Promise<BlogPost | null> => {
  const slug = input.trim().replace(/^\/+|\/+$/g, '').toLowerCase();
  if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return null;
  const posts = await getPublishedBlogs();
  const exact = posts.find(post => post.slug === slug || String(post.id) === slug);
  if (exact) return exact;
  const aliases = posts.filter(post => slugify(post.title) === slug);
  if (aliases.length === 1) return aliases[0];

  // Direct single-row database lookup fallback
  if (isSupabaseConfigured()) {
    try {
      const client = typeof window === 'undefined' ? getSupabaseAdmin() : supabase;
      const { data } = await client
        .from('blogs')
        .select('*')
        .or(`slug.eq.${slug},id.eq.${slug}`)
        .maybeSingle();

      if (data && data.title?.trim()) {
        const mapped = mapBlogRecordToBlogPost(data);
        return { ...mapped, slug };
      }
    } catch {
      // Ignore direct lookup error and return null
    }
  }

  return null;
});
