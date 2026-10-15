'use client';

import React from 'react';
import Link from 'next/link';
import {
  X,
  Briefcase,
  MapPin,
  Clock,
  Building,
  DollarSign,
  GraduationCap,
  ExternalLink,
  Edit2,
  Calendar,
  CheckCircle2,
  XCircle,
  Hash,
} from 'lucide-react';
import { JobOpeningRecord } from '@/types/cms';
import { StatusBadge } from './StatusBadge';

interface CareerOpeningDetailModalProps {
  job: JobOpeningRecord | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit?: (id: string) => void;
}

export const CareerOpeningDetailModal: React.FC<CareerOpeningDetailModalProps> = ({
  job,
  isOpen,
  onClose,
  onEdit,
}) => {
  if (!isOpen || !job) return null;

  const formatDate = (dateString?: string) => {
    if (!dateString) return '—';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200 flex items-start justify-between bg-slate-50/70">
          <div className="flex items-start gap-3.5 min-w-0 pr-4">
            <div className="w-11 h-11 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0 mt-0.5">
              <Briefcase className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h2 className="text-xl font-bold text-slate-900 tracking-tight truncate">
                  {job.title}
                </h2>
                <StatusBadge status={job.is_active ? 'active' : 'inactive'} />
              </div>
              <p className="text-xs text-slate-500 font-mono mt-0.5 truncate">
                slug: <span className="text-indigo-600 font-semibold">{job.slug}</span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-200/60 transition-colors cursor-pointer shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm text-slate-700">
          {/* Key Metadata Badges Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200/80">
            <div>
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                Level
              </p>
              <p className="text-xs font-semibold text-slate-800 mt-1">
                {job.experience_level || 'Not Specified'}
              </p>
            </div>

            <div>
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                Employment
              </p>
              <p className="text-xs font-semibold text-slate-800 mt-1">
                {job.employment_type || 'Full-time'}
              </p>
            </div>

            <div>
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Building className="w-3.5 h-3.5 text-slate-400" />
                Workplace
              </p>
              <p className="text-xs font-semibold text-slate-800 mt-1">
                {job.work_place_type || 'Hybrid'}
              </p>
            </div>

            <div>
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Hash className="w-3.5 h-3.5 text-slate-400" />
                Order
              </p>
              <p className="text-xs font-semibold text-slate-800 mt-1">
                {job.display_order ?? 0}
              </p>
            </div>
          </div>

          {/* Locations */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-indigo-600" />
              Locations
            </h4>
            {job.locations && job.locations.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {job.locations.map((loc, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-800 border border-slate-200"
                  >
                    <MapPin className="w-3 h-3 text-slate-500" />
                    {loc}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic">No locations specified</p>
            )}
          </div>

          {/* Experience Required & Salary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
                Experience Required
              </h4>
              <p className="text-xs font-medium text-slate-700">
                {job.experience_required || 'Commensurate with experience'}
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-indigo-600" />
                Salary
              </h4>
              <p className="text-xs font-medium text-slate-700">
                {job.salary || 'Commensurate with experience'}
              </p>
            </div>
          </div>

          {/* Primary Responsibility */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
              Primary Responsibility
            </h4>
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
              {job.primary_responsibility}
            </div>
          </div>

          {/* Job Specifications */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
              Job Specifications
            </h4>
            {job.job_specifications && job.job_specifications.length > 0 ? (
              <ul className="space-y-2">
                {job.job_specifications.map((spec, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-2 shrink-0" />
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-slate-400 italic">No specifications listed</p>
            )}
          </div>

          {/* Application URL */}
          <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <ExternalLink className="w-3.5 h-3.5 text-indigo-600" />
              Application URL
            </h4>
            {job.application_url ? (
              <a
                href={job.application_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium text-indigo-600 hover:text-indigo-800 hover:underline break-all inline-flex items-center gap-1"
              >
                {job.application_url}
                <ExternalLink className="w-3 h-3" />
              </a>
            ) : (
              <p className="text-xs text-slate-500">
                None configured (Default mailto flow will be used on the public website)
              </p>
            )}
          </div>

          {/* Timestamps */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              Created: {formatDate(job.created_at)}
            </span>
            <span>
              Updated: {formatDate(job.updated_at || job.created_at)}
            </span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors cursor-pointer"
          >
            Close
          </button>
          {onEdit && (
            <button
              type="button"
              onClick={() => onEdit(job.id)}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors shadow-xs cursor-pointer"
            >
              <Edit2 className="w-3.5 h-3.5" />
              Edit Job Opening
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
