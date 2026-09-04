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

export interface ServiceItem {
  id?: string;
  title: string | null;
  slug: string | null;
  badge_text?: string | null;
  short_descriptior?: string | null;
  short_description?: string | null;
  description?: string | null;
  features?: string[] | any[] | null;
  media_id?: string | null;
  cta_text?: string | null;
  cta_url?: string | null;
  sort_order?: number | null;
  is_active?: boolean | null;
  status?: ServiceStatus;
  created_at?: string;
  updated_at?: string;
}

export interface ServiceFormData {
  id?: string;
  title: string;
  slug: string;
  badge_text?: string;
  short_descriptior?: string;
  short_description?: string;
  description?: string;
  features?: string[] | any[];
  media_id?: string | null;
  cta_text?: string;
  cta_url?: string;
  sort_order?: number;
  is_active?: boolean;
}
