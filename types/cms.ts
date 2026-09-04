export type BlogStatus = 'published' | 'draft' | 'archived' | 'active' | 'inactive' | string;
export type ServiceStatus = 'active' | 'inactive' | 'draft' | 'archived' | string;

export interface BlogItem {
  id?: string;
  title: string | null;
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
  status?: BlogStatus;
  created_at?: string;
  updated_at?: string;
}

export interface BlogFormData {
  id?: string;
  title: string;
  subtitle?: string;
  tag?: string;
  is_featured?: boolean;
  media_id?: string | null;
  alt_text?: string;
  sub_description?: string;
  meta_description?: string;
  meta_descriptior?: string;
  meta_keywords?: string;
  content?: string;
}

export interface ServiceCapabilityItem {
  title: string;
  description?: string;
  icon?: string;
}

export interface ServiceResultStat {
  value: string;
  label: string;
}

export interface ServiceFAQItem {
  question: string;
  answer: string;
}

export interface ServiceItem {
  id?: string;
  title: string | null;
  slug: string | null;
  badge_text?: string | null;
  hero_title?: string | null;
  hero_highlight?: string | null;
  hero_description?: string | null;
  hero_image_id?: string | null;
  hero_logo_text?: string | null;
  hero_cta_text?: string | null;
  hero_cta_url?: string | null;
  hero_badges?: string[] | any[] | null;
  capabilities_badge?: string | null;
  capabilities_title?: string | null;
  capabilities_highlight?: string | null;
  capabilities_description?: string | null;
  capabilities?: ServiceCapabilityItem[] | any[] | null;
  about_badge?: string | null;
  about_title?: string | null;
  about_highlight?: string | null;
  about_description?: string | null;
  about_features?: string[] | any[] | null;
  about_image_id?: string | null;
  about_logo_text?: string | null;
  about_cta_text?: string | null;
  about_cta_url?: string | null;
  results_badge?: string | null;
  results_title?: string | null;
  results_highlight?: string | null;
  results_description?: string | null;
  results_stats?: ServiceResultStat[] | any[] | null;
  solutions_badge?: string | null;
  solutions_title?: string | null;
  solutions_highlight?: string | null;
  solutions_description?: string | null;
  solutions_image_id?: string | null;
  solutions_logo_text?: string | null;
  solutions_badges?: string[] | any[] | null;
  faq_badge?: string | null;
  faq_title?: string | null;
  faq_description?: string | null;
  faqs?: ServiceFAQItem[] | any[] | null;
  cta_text?: string | null;
  cta_url?: string | null;
  sort_order?: number | null;
  is_active?: boolean | null;
  meta_title?: string | null;
  meta_description?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface ServiceFormData {
  id?: string;
  title: string;
  slug?: string;
  badge_text?: string;
  hero_title?: string;
  hero_highlight?: string;
  hero_description?: string;
  hero_image_id?: string | null;
  hero_logo_text?: string;
  hero_cta_text?: string;
  hero_cta_url?: string;
  hero_badges?: string[];
  capabilities_badge?: string;
  capabilities_title?: string;
  capabilities_highlight?: string;
  capabilities_description?: string;
  capabilities?: ServiceCapabilityItem[];
  about_badge?: string;
  about_title?: string;
  about_highlight?: string;
  about_description?: string;
  about_features?: string[];
  about_image_id?: string | null;
  about_logo_text?: string;
  about_cta_text?: string;
  about_cta_url?: string;
  results_badge?: string;
  results_title?: string;
  results_highlight?: string;
  results_description?: string;
  results_stats?: ServiceResultStat[];
  solutions_badge?: string;
  solutions_title?: string;
  solutions_highlight?: string;
  solutions_description?: string;
  solutions_image_id?: string | null;
  solutions_logo_text?: string;
  solutions_badges?: string[];
  faq_badge?: string;
  faq_title?: string;
  faq_description?: string;
  faqs?: ServiceFAQItem[];
  cta_text?: string;
  cta_url?: string;
  sort_order?: number;
  is_active?: boolean;
  meta_title?: string;
  meta_description?: string;
}

export interface FAQItem {
  id?: string;
  category?: string | null;
  tag?: string | null;
  question: string;
  answer: string;
  sort_order?: number | null;
  is_active?: boolean | null;
  created_at?: string;
  updated_at?: string;
}

export interface FAQFormData {
  id?: string;
  category?: string;
  tag?: string;
  question: string;
  answer: string;
  sort_order?: number;
  is_active?: boolean;
}

