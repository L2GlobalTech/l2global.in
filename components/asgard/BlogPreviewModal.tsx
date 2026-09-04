'use client';

import React from 'react';
import { Star, Tag, X } from 'lucide-react';
import { BlogRecord } from '@/app/(asgard)/asgard/blogs/action';
import { getMediaPublicUrl } from '@/actions/mediaAction';

interface BlogPreviewModalProps {
  blog: BlogRecord | null;
  onClose: () => void;
}

export const BlogPreviewModal: React.FC<BlogPreviewModalProps> = ({ blog, onClose }) => {
  if (!blog) return null;

  const mediaUrl = blog.media_id ? getMediaPublicUrl(blog.media_id, 'blogs') : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 max-h-[85vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              {blog.is_featured && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                  <Star className="w-3 h-3 text-amber-500 fill-amber-400" />
                  Featured
                </span>
              )}
              {blog.tag && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
                  <Tag className="w-3 h-3 text-slate-400" />
                  {blog.tag}
                </span>
              )}
            </div>
            <h3 className="text-lg font-bold text-slate-900 mt-2">{blog.title}</h3>
            {blog.subtitle && (
              <p className="text-xs text-slate-500 font-medium mt-0.5">{blog.subtitle}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Optional Cover Media Image */}
        {mediaUrl && (
          <div className="mt-4 rounded-xl overflow-hidden border border-slate-200 bg-slate-900 max-h-56 flex items-center justify-center">
            <img
              src={mediaUrl}
              alt={blog.alt_text || blog.title || ''}
              className="w-full h-full object-cover max-h-56"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
        )}

        {/* Content Body */}
        <div className="space-y-3 text-sm text-slate-700 mt-4">
          {blog.sub_description && (
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 italic text-slate-600 text-xs">
              {blog.sub_description}
            </div>
          )}

          {blog.content ? (
            blog.content.includes('<') && blog.content.includes('>') ? (
              <div
                className="prose prose-sm max-w-none text-xs leading-relaxed text-slate-800"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            ) : (
              <p className="whitespace-pre-line text-xs leading-relaxed text-slate-800">
                {blog.content}
              </p>
            )
          ) : (
            <p className="text-xs text-slate-400 italic">No content written yet.</p>
          )}

          {/* Meta & Alt Text */}
          {(blog.meta_keywords || blog.meta_description || blog.alt_text) && (
            <div className="pt-3 border-t border-slate-100 mt-4 space-y-1 text-[11px] text-slate-400">
              {blog.alt_text && (
                <div>
                  <span className="font-semibold text-slate-500">Image Alt: </span>
                  {blog.alt_text}
                </div>
              )}
              {blog.meta_keywords && (
                <div>
                  <span className="font-semibold text-slate-500">Keywords: </span>
                  {blog.meta_keywords}
                </div>
              )}
              {blog.meta_description && (
                <div>
                  <span className="font-semibold text-slate-500">Meta Desc: </span>
                  {blog.meta_description}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
