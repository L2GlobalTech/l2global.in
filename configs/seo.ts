import type { Metadata } from 'next';

export interface PageSeoConfig {
  title: string;
  description: string;
  keywords?: string[];
}

export const asgardSeoConfig: Record<string, PageSeoConfig> = {
  login: {
    title: 'Admin Login',
    description: 'Secure sign in portal to access Asgard CMS dashboard and content management tools.',
    keywords: ['asgard login', 'cms sign in', 'admin portal', 'dashboard authentication'],
  },
  overview: {
    title: 'Overview Dashboard',
    description: 'Quick snapshot and high-level performance metrics of published blogs and active services.',
    keywords: ['asgard overview', 'cms dashboard', 'content metrics', 'asgard admin'],
  },
  blogs: {
    title: 'Blogs Management',
    description: 'Manage, search, filter, publish, and organize all blog articles in Asgard CMS.',
    keywords: ['asgard blogs', 'blog management', 'cms articles', 'editorial publishing'],
  },
  createBlog: {
    title: 'Create Blog Article',
    description: 'Author, format, and publish a new blog post with media attachments and SEO settings.',
    keywords: ['create blog', 'new article', 'asgard editor'],
  },
  editBlog: {
    title: 'Edit Blog Article',
    description: 'Update, edit content, modify tags, and manage media for an existing blog article.',
    keywords: ['edit blog', 'update article', 'asgard editor'],
  },
  services: {
    title: 'Services Management',
    description: 'Manage, reorder, active/inactive toggle, and organize all service offerings in Asgard CMS.',
    keywords: ['asgard services', 'services catalog', 'consulting offerings', 'cms services'],
  },
  createService: {
    title: 'Add New Service',
    description: 'Configure and publish a new service capability with descriptions, badges, and media.',
    keywords: ['create service', 'new offering', 'asgard services'],
  },
  editService: {
    title: 'Edit Service Offering',
    description: 'Modify service details, update features list, edit CTA links, and manage media assets.',
    keywords: ['edit service', 'update service', 'asgard services'],
  },
};

/**
 * Helper to generate Next.js Metadata object from a key in asgardSeoConfig
 */
export function getAsgardMetadata(pageKey: keyof typeof asgardSeoConfig): Metadata {
  const config = asgardSeoConfig[pageKey] || {
    title: 'Asgard CMS',
    description: 'Next-generation content management system.',
  };

  return {
    title: `${config.title} | Asgard CMS`,
    description: config.description,
    keywords: config.keywords,
    robots: {
      index: false,
      follow: false,
    },
    openGraph: {
      title: `${config.title} | Asgard CMS`,
      description: config.description,
      type: 'website',
    },
  };
}
