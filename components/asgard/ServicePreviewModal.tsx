'use client';

import React from 'react';
import { X, Layers, CheckCircle2, ArrowRight, ExternalLink, Calendar, ArrowUpDown, Tag } from 'lucide-react';
import { StatusBadge } from '@/components/asgard/StatusBadge';
import { ServiceRecord } from '@/app/(asgard)/asgard/services/action';
import { getMediaPublicUrl } from '@/actions/mediaAction';

interface ServicePreviewModalProps {
  service: ServiceRecord | null;
  onClose: () => void;
}

export const ServicePreviewModal: React.FC<ServicePreviewModalProps> = ({ service, onClose }) => {
  if (!service) return null;

  const mediaUrl = service.media_id ? getMediaPublicUrl(service.media_id, 'services') : null;
  const featuresList = Array.isArray(service.features)
    ? service.features.filter(Boolean)
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <StatusBadge status={service.is_active ? 'active' : 'inactive'} />
              {service.badge_text && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                  <Tag className="w-3 h-3 text-indigo-500" />
                  {service.badge_text}
                </span>
              )}
              {service.slug && (
                <span className="text-xs text-slate-400 font-mono">/{service.slug}</span>
              )}
            </div>
            <h3 className="text-xl font-bold text-slate-900 mt-2">{service.title}</h3>
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
              alt={service.title || 'Service Cover'}
              className="w-full h-full object-cover max-h-56"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
        )}

        <div className="space-y-4 text-xs text-slate-700 mt-4">
          {/* Short Description */}
          {(service.short_descriptior || service.short_description) && (
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-slate-700 font-medium leading-relaxed">
              {service.short_descriptior || service.short_description}
            </div>
          )}

          {/* Full Description */}
          {service.description && (
            <div>
              <h4 className="font-semibold text-slate-900 mb-1.5 uppercase tracking-wider text-[11px] text-slate-400">
                Detailed Overview
              </h4>
              <div className="whitespace-pre-wrap leading-relaxed text-slate-700 bg-slate-50/50 p-3 rounded-lg border border-slate-100">
                {service.description}
              </div>
            </div>
          )}

          {/* Features JSON array */}
          {featuresList.length > 0 && (
            <div>
              <h4 className="font-semibold text-slate-900 mb-2 uppercase tracking-wider text-[11px] text-slate-400">
                Key Features & Capabilities
              </h4>
              <div className="grid grid-cols-1 gap-1.5">
                {featuresList.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 p-2 rounded-lg bg-emerald-50/60 border border-emerald-100/80 text-emerald-900"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="font-medium text-[11px]">
                      {typeof item === 'string' ? item : JSON.stringify(item)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA & Metadata Info */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 text-[11px] text-slate-500">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1">
                <ArrowUpDown className="w-3 h-3 text-slate-400" />
                Sort: {service.sort_order ?? 0}
              </span>
              {service.created_at && (
                <span className="inline-flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-slate-400" />
                  {new Date(service.created_at).toLocaleDateString()}
                </span>
              )}
            </div>

            {service.cta_text && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-100 font-semibold">
                <span>{service.cta_text}</span>
                <ArrowRight className="w-3 h-3" />
                <span className="text-[10px] text-indigo-400 font-mono">({service.cta_url || '#'})</span>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-medium transition-colors cursor-pointer"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
};
