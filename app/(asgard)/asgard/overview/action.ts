import { supabase, isSupabaseConfigured } from '@/configs/supabase';

export interface OverviewMetrics {
  totalBlogs: number;
  featuredBlogs: number;
  totalServices: number;
  activeServices: number;
  totalFaqs: number;
  activeFaqs: number;
  recentBlogs: any[];
  recentServices: any[];
  recentFaqs: any[];
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
    totalFaqs: 0,
    activeFaqs: 0,
    recentBlogs: [],
    recentServices: [],
    recentFaqs: [],
  };

  if (!isSupabaseConfigured()) {
    return fallback;
  }

  try {
    const [blogsCountRes, servicesCountRes, faqsCountRes, recentBlogsRes, recentServicesRes, recentFaqsRes] = await Promise.all([
      supabase.from('blogs').select('id, is_featured'),
      supabase.from('services').select('id, is_active'),
      supabase.from('faqs').select('id, is_active'),
      supabase
        .from('blogs')
        .select('id, title, subtitle, tag, is_featured, media_id, alt_text, sub_description, created_at')
        .order('created_at', { ascending: false })
        .limit(5),
      supabase
        .from('services')
        .select('id, title, slug, badge_text, hero_title, hero_description, hero_image_id, is_active, sort_order, created_at')
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false })
        .limit(5),
      supabase
        .from('faqs')
        .select('id, category, tag, question, answer, sort_order, is_active, created_at')
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false })
        .limit(5),
    ]);

    const blogs = blogsCountRes.data || [];
    const services = servicesCountRes.data || [];
    const faqs = faqsCountRes.data || [];
    const recentBlogs = recentBlogsRes.data || [];
    const recentServices = recentServicesRes.data || [];
    const recentFaqs = recentFaqsRes.data || [];

    const totalBlogs = blogs.length;
    const featuredBlogs = blogs.filter((b: any) => b.is_featured).length;

    const totalServices = services.length;
    const activeServices = services.filter((s: any) => s.is_active !== false).length;

    const totalFaqs = faqs.length;
    const activeFaqs = faqs.filter((f: any) => f.is_active !== false).length;

    return {
      totalBlogs,
      featuredBlogs,
      totalServices,
      activeServices,
      totalFaqs,
      activeFaqs,
      recentBlogs,
      recentServices,
      recentFaqs,
    };
  } catch (error) {
    console.error('Error fetching overview stats from Supabase:', error);
    return fallback;
  }
}
