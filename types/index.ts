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
  id: number;
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
}