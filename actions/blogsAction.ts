import { supabase, isSupabaseConfigured } from '@/configs/supabase';
import { BlogPost } from '@/types';
import { getMediaPublicUrl } from '@/actions/mediaAction';
import { blogPosts } from '@/constants/blogData';
import {
  getBlogs,
  getBlogById,
  getBlogTags,
  createBlog,
  updateBlog,
  deleteBlog,
  toggleBlogFeaturedStatus,
  BlogRecord,
  mapBlogRecordToBlogPost,
  slugify,
  getPublicBlogs,
  getPublicBlogBySlug
} from '@/app/(asgard)/asgard/blogs/action';

export {
  getBlogs,
  getBlogById,
  getBlogTags,
  createBlog,
  updateBlog,
  deleteBlog,
  toggleBlogFeaturedStatus,
  mapBlogRecordToBlogPost,
  slugify,
  getPublicBlogs,
  getPublicBlogBySlug
};
export type { BlogRecord };

/**
 * Primary frontend function to fetch blogs directly from Supabase `blogs` table
 */
export async function fetchBlogs(): Promise<BlogPost[]> {
  return await getPublicBlogs();
}

/**
 * Fetch a single blog by slug from Supabase
 */
export async function fetchBlogBySlug(slug: string): Promise<BlogPost | null> {
  return await getPublicBlogBySlug(slug);
}
