import { supabase, isSupabaseConfigured } from '@/configs/supabase';

export interface OverviewMetrics {
  totalBlogs: number;
  featuredBlogs: number;
  totalServices: number;
  activeServices: number;
  recentBlogs: any[];
  recentServices: any[];
}

/**
 * READ: Get aggregate metrics and recent records for CMS overview dashboard
 */
export async function getOverviewStats(): Promise<OverviewMetrics> {
  const fallback: OverviewMetrics = {
    totalBlogs: 0,
    featuredBlogs: 0,
    totalServices: 0,
    activeServices: 0,
    recentBlogs: [],
    recentServices: [],
  };

  if (!isSupabaseConfigured()) {
    return fallback;
  }

  try {
    const [blogsCountRes, servicesCountRes, recentBlogsRes, recentServicesRes] = await Promise.all([
      supabase.from('blogs').select('id, is_featured'),
      supabase.from('services').select('id, is_active'),
      supabase
        .from('blogs')
        .select('id, title, subtitle, tag, is_featured, media_id, alt_text, sub_description, created_at')
        .order('created_at', { ascending: false })
        .limit(5),
      supabase
        .from('services')
        .select('id, title, slug, badge_text, short_description, media_id, is_active, sort_order, created_at')
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false })
        .limit(5),
    ]);

    const blogs = blogsCountRes.data || [];
    const services = servicesCountRes.data || [];
    const recentBlogs = recentBlogsRes.data || [];
    const recentServices = recentServicesRes.data || [];

    const totalBlogs = blogs.length;
    const featuredBlogs = blogs.filter((b: any) => b.is_featured).length;

    const totalServices = services.length;
    const activeServices = services.filter((s: any) => s.is_active !== false).length;

    return {
      totalBlogs,
      featuredBlogs,
      totalServices,
      activeServices,
      recentBlogs,
      recentServices,
    };
  } catch (error) {
    console.error('Error fetching overview stats from Supabase:', error);
    return fallback;
  }
}
