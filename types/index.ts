import React from "react";

export interface IIndustriesSection {
    id: number,
    title: string,
    desc: string,
    rightTitle?: string,
    rightDesc?: string,
    iconBg: string,
    icon: string,
    rightImage: string,
    rightBottomIcon?: React.ReactNode
}

export interface BlogPost {
  id: string | number;
  slug: string;
  title: string;
  metaTitle?: string;
  metaDescription?: string;
  excerpt: string;
  content: string;
  author: string;
  authorRole: string;
  datePublished: string;
  image: string;
  category: string;
  tags: string[];
  serviceLink: string;
  serviceName: string;
  is_featured?: boolean;
}

export interface FrontendService {
  id?: string;
  title: string;
  slug: string;
  desc: string;
  href: string;
  badge_text?: string | null;
  hero_title?: string | null;
  hero_description?: string | null;
  is_active?: boolean;
}