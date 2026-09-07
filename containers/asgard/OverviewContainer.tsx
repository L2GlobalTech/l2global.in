'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FileText,
  Layers,
  HelpCircle,
  ArrowRight,
  Plus,
  Star,
  Tag,
  Edit2,
  Calendar,
  ArrowUpDown,
} from 'lucide-react';
import { AsgardLayout } from '@/components/asgard/AsgardLayout';
import { AsgardPageHeader } from '@/components/asgard/AsgardPageHeader';
import { SupabaseConfigBanner } from '@/components/asgard/SupabaseConfigBanner';
import { StatusBadge } from '@/components/asgard/StatusBadge';
import { BlogImageThumbnail } from '@/components/asgard/BlogImageThumbnail';
import { getMediaPublicUrl } from '@/actions/mediaAction';
import { getOverviewStats, OverviewMetrics } from '@/app/(asgard)/asgard/overview/action';

export const OverviewContainer: React.FC = () => {
  const [metrics, setMetrics] = useState<OverviewMetrics>({
    totalBlogs: 0,
    featuredBlogs: 0,
    totalServices: 0,
    activeServices: 0,
    totalFaqs: 0,
    activeFaqs: 0,
    recentBlogs: [],
    recentServices: [],
    recentFaqs: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        setLoading(true);
        const data = await getOverviewStats();
        setMetrics(data);
      } catch (err) {
        console.error('Failed to load dashboard metrics from Supabase:', err);
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  const {
    totalBlogs,
    featuredBlogs,
    totalServices,
    activeServices,
    totalFaqs,
    activeFaqs,
    recentBlogs,
    recentServices,
  } = metrics;

  return (
    <AsgardLayout>
      <SupabaseConfigBanner />

      <AsgardPageHeader
        title="Dashboard Overview"
        description="Quick snapshot of your published articles, active services, and FAQs."
      />

      {/* Top High-Level Summary Cards */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs h-28 animate-pulse" />
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs h-28 animate-pulse" />
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs h-28 animate-pulse" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8">
          {/* Blogs Summary Card */}
          <Link
            href="/asgard/blogs"
            className="group bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md hover:border-slate-300 transition-all cursor-pointer flex items-center justify-between"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Blog Articles
                </span>
                {featuredBlogs > 0 && (
                  <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 font-bold border border-amber-200">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
                    {featuredBlogs} Featured
                  </span>
                )}
              </div>
              <div className="mt-1.5 flex items-baseline gap-1.5">
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {totalBlogs}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  {totalBlogs === 1 ? 'published' : 'published'}
                </span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
              <FileText className="w-5 h-5" />
            </div>
          </Link>

          {/* Services Summary Card */}
          <Link
            href="/asgard/services"
            className="group bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:shadow-md hover:border-slate-300 transition-all cursor-pointer flex items-center justify-between"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Service Offerings
                </span>
                <span className="inline-flex items-center text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                  {activeServices} Active
                </span>
              </div>
              <div className="mt-1.5 flex items-baseline gap-1.5">
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {totalServices}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  {totalServices === 1 ? 'total service' : 'total services'}
                </span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
              <Layers className="w-5 h-5" />
            </div>
          </Link>

          {/* FAQs Summary Card */}
          <Link
            href="/asgard/faqs"
            className="group bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:shadow-md hover:border-slate-300 transition-all cursor-pointer flex items-center justify-between"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  FAQ Items
                </span>
                <span className="inline-flex items-center text-xs px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-bold border border-indigo-200">
                  {activeFaqs} Active
                </span>
              </div>
              <div className="mt-1.5 flex items-baseline gap-1.5">
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {totalFaqs}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  {totalFaqs === 1 ? 'total item' : 'total items'}
                </span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
              <HelpCircle className="w-5 h-5" />
            </div>
          </Link>
        </div>
      )}

      {/* Main Overview Grid: Side-by-Side Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 1. Recent Blogs Section */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col justify-between">
          <div>
            {/* Header */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <FileText className="w-4.5 h-4.5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base">Recent Blogs</h3>
              </div>
              <Link
                href="/asgard/blogs"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
              >
                <span>View All</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* List Body */}
            {loading ? (
              <div className="p-5 space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-16 bg-slate-50 rounded-xl animate-pulse" />
                ))}
              </div>
            ) : recentBlogs.length === 0 ? (
              <div className="p-10 text-center">
                <p className="text-sm text-slate-500 mb-4">No blog articles published yet.</p>
                <Link
                  href="/asgard/blogs/create"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Blog</span>
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {recentBlogs.map((blog: any) => (
                  <div
                    key={blog.id}
                    className="p-4.5 flex items-center justify-between hover:bg-slate-50/80 transition-colors group"
                  >
                    <div className="flex items-start gap-3.5 min-w-0 max-w-sm">
                      <BlogImageThumbnail
                        mediaId={blog.media_id}
                        alt={blog.alt_text || blog.title || ''}
                        className="w-12 h-12 rounded-xl shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                            {blog.title}
                          </h4>
                          {blog.is_featured && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.2 rounded text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                              <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
                              Featured
                            </span>
                          )}
                        </div>
                        {(blog.subtitle || blog.sub_description) && (
                          <p className="text-xs sm:text-sm text-slate-500 mt-1 line-clamp-1">
                            {blog.subtitle || blog.sub_description}
                          </p>
                        )}
                        <div className="flex items-center gap-2.5 mt-1.5 text-xs text-slate-400">
                          {blog.tag && (
                            <span className="inline-flex items-center gap-1 text-slate-600 font-medium">
                              <Tag className="w-3 h-3 text-slate-400" />
                              {blog.tag}
                            </span>
                          )}
                          {blog.tag && blog.created_at && <span>&bull;</span>}
                          {blog.created_at && (
                            <span className="inline-flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-slate-400" />
                              {new Date(blog.created_at).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="shrink-0 ml-3">
                      <Link
                        href={`/asgard/blogs/edit?id=${blog.id}`}
                        className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors inline-flex items-center justify-center cursor-pointer"
                        title="Edit Article"
                      >
                        <Edit2 className="w-4.5 h-4.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Card Footer */}
          <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-sm">
            <Link
              href="/asgard/blogs/create"
              className="text-sm font-medium text-slate-700 hover:text-indigo-600 inline-flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4 text-indigo-600" />
              <span>Add New Article</span>
            </Link>
            <Link
              href="/asgard/blogs"
              className="font-bold text-indigo-600 hover:text-indigo-700"
            >
              Manage All Blogs &rarr;
            </Link>
          </div>
        </div>

        {/* 2. Services Overview Section */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col justify-between">
          <div>
            {/* Header */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Layers className="w-3.5 h-3.5" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm">Services Overview</h3>
              </div>
              <Link
                href="/asgard/services"
                className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* List Body */}
            {loading ? (
              <div className="p-4 space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-14 bg-slate-50 rounded-xl animate-pulse" />
                ))}
              </div>
            ) : recentServices.length === 0 ? (
              <div className="p-10 text-center">
                <p className="text-xs text-slate-500 mb-3">No services configured yet.</p>
                <Link
                  href="/asgard/services/create"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Service</span>
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {recentServices.map((service: any) => {
                  const mediaUrl = service.media_id
                    ? getMediaPublicUrl(service.media_id, 'services')
                    : null;

                  return (
                    <div
                      key={service.id}
                      className="p-4 flex items-center justify-between hover:bg-slate-50/80 transition-colors group"
                    >
                      <div className="flex items-start gap-3 min-w-0 max-w-sm">
                        {mediaUrl ? (
                          <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                            <img
                              src={mediaUrl}
                              alt={service.title || 'Service'}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLElement).style.display = 'none';
                              }}
                            />
                          </div>
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
                            <Layers className="w-4 h-4" />
                          </div>
                        )}

                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <h4 className="text-xs font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                              {service.title}
                            </h4>
                            {service.badge_text && (
                              <span className="inline-flex items-center px-1.5 py-0.2 rounded text-[10px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
                                {service.badge_text}
                              </span>
                            )}
                          </div>
                          {service.short_description && (
                            <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                              {service.short_description}
                            </p>
                          )}
                          <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-400">
                            <span className="inline-flex items-center gap-0.5">
                              <StatusBadge status={service.is_active ? 'active' : 'inactive'} />
                            </span>
                            <span>&bull;</span>
                            <span className="inline-flex items-center gap-0.5 text-slate-500 font-medium">
                              <ArrowUpDown className="w-2.5 h-2.5 text-slate-400" />
                              Order: {service.sort_order ?? 0}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="shrink-0 ml-3">
                        <Link
                          href={`/asgard/services/edit?id=${service.id}`}
                          className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors inline-flex items-center justify-center cursor-pointer"
                          title="Edit Service"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Card Footer */}
          <div className="p-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
            <Link
              href="/asgard/services/create"
              className="text-xs font-medium text-slate-600 hover:text-indigo-600 inline-flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5 text-indigo-600" />
              <span>Add New Service</span>
            </Link>
            <Link
              href="/asgard/services"
              className="font-semibold text-indigo-600 hover:text-indigo-700"
            >
              Manage All Services &rarr;
            </Link>
          </div>
        </div>
      </div>
    </AsgardLayout>
  );
};
