'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Edit2,
  Briefcase,
  MapPin,
  Clock,
  Building,
  DollarSign,
  GraduationCap,
  ExternalLink,
  Calendar,
  Hash,
  Share2,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { AsgardLayout } from '@/components/asgard/AsgardLayout';
import { AsgardPageHeader } from '@/components/asgard/AsgardPageHeader';
import { LoadingState } from '@/components/asgard/LoadingState';
import { StatusBadge } from '@/components/asgard/StatusBadge';
import { getJobOpeningById, JobOpeningRecord } from '@/app/(asgard)/asgard/career-openings/action';

interface CareerOpeningDetailContainerProps {
  id?: string;
}

export const CareerOpeningDetailContainer: React.FC<CareerOpeningDetailContainerProps> = ({ id }) => {
  const router = useRouter();
  const [job, setJob] = useState<JobOpeningRecord | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadJob() {
      if (!id) {
        toast.error('No career opening ID provided');
        router.push('/asgard/career-openings');
        return;
      }

      try {
        setLoading(true);
        const data = await getJobOpeningById(id);
        if (!data) {
          toast.error('Career opening not found');
          router.push('/asgard/career-openings');
          return;
        }
        setJob(data);
      } catch (err: any) {
        console.error('Error fetching job details:', err);
        toast.error('Failed to load career opening details');
        router.push('/asgard/career-openings');
      } finally {
        setLoading(false);
      }
    }

    loadJob();
  }, [id, router]);

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

  if (loading) {
    return (
      <AsgardLayout>
        <div className="py-12">
          <LoadingState message="Loading career opening details..." />
        </div>
      </AsgardLayout>
    );
  }

  if (!job) {
    return null;
  }

  return (
    <AsgardLayout>
      <div className="max-w-5xl mx-auto space-y-6 pb-12">
        {/* Page Header with Breadcrumbs & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => router.push('/asgard/career-openings')}
              className="p-2 text-slate-500 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors cursor-pointer"
              title="Back to Listings"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <Link href="/asgard/career-openings" className="hover:text-slate-800">
                  Career Openings
                </Link>
                <span>/</span>
                <span className="text-slate-900 font-semibold truncate max-w-xs">{job.title}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 mt-0.5 flex items-center gap-3 flex-wrap">
                {job.title}
                <StatusBadge status={job.is_active ? 'active' : 'inactive'} />
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => router.push('/asgard/career-openings')}
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors cursor-pointer"
            >
              Back to Listings
            </button>
            <Link
              href={`/asgard/career-openings/edit?id=${job.id}`}
              className="inline-flex items-center gap-1.5 px-4.5 py-2 text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors shadow-xs cursor-pointer"
            >
              <Edit2 className="w-4 h-4" />
              Edit Job Opening
            </Link>
          </div>
        </div>

        {/* Top Highlight Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-indigo-500" />
              Experience Level
            </p>
            <p className="text-sm font-bold text-slate-900 mt-1">
              {job.experience_level || 'Not Specified'}
            </p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-indigo-500" />
              Employment Type
            </p>
            <p className="text-sm font-bold text-slate-900 mt-1">
              {job.employment_type || 'Full-time'}
            </p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-indigo-500" />
              Workplace Type
            </p>
            <p className="text-sm font-bold text-slate-900 mt-1">
              {job.work_place_type || 'Hybrid'}
            </p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Hash className="w-3.5 h-3.5 text-indigo-500" />
              Display Order
            </p>
            <p className="text-sm font-bold text-slate-900 mt-1 font-mono">
              {job.display_order ?? 0}
            </p>
          </div>
        </div>

        {/* Main Details Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          {/* Header Slug & Locations */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                Public URL Slug
              </p>
              <p className="text-sm font-mono text-indigo-600 bg-indigo-50/60 px-3 py-1.5 rounded-xl border border-indigo-100 inline-block">
                /{job.slug}
              </p>
            </div>

            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                Locations
              </p>
              <div className="flex flex-wrap gap-1.5">
                {job.locations && job.locations.length > 0 ? (
                  job.locations.map((loc, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-xl text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-200"
                    >
                      <MapPin className="w-3 h-3 text-slate-500" />
                      {loc}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-400 italic">None specified</span>
                )}
              </div>
            </div>
          </div>

          {/* Salary & Experience Required */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-6 border-b border-slate-100">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 mb-1">
                <DollarSign className="w-3.5 h-3.5 text-slate-600" />
                Salary Details
              </p>
              <p className="text-sm font-semibold text-slate-800">
                {job.salary || 'Commensurate with experience'}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 mb-1">
                <GraduationCap className="w-3.5 h-3.5 text-slate-600" />
                Required Experience
              </p>
              <p className="text-sm font-semibold text-slate-800">
                {job.experience_required || 'Minimum 3 Years'}
              </p>
            </div>
          </div>

          {/* Primary Responsibility */}
          <div className="pb-6 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
              Primary Responsibility
            </h3>
            <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200 text-slate-700 text-sm leading-relaxed whitespace-pre-line">
              {job.primary_responsibility}
            </div>
          </div>

          {/* Job Specifications */}
          <div className="pb-6 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
              Job Specifications
            </h3>
            {job.job_specifications && job.job_specifications.length > 0 ? (
              <ul className="space-y-2.5">
                {job.job_specifications.map((spec, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                    <span className="w-2 h-2 rounded-full bg-indigo-600 mt-2 shrink-0" />
                    <span className="leading-relaxed">{spec}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-slate-400 italic">No job specifications provided.</p>
            )}
          </div>

          {/* Application URL & Destination */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              Application URL / Destination
            </h3>
            {job.application_url ? (
              <a
                href={job.application_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 hover:underline break-all inline-flex items-center gap-1.5"
              >
                {job.application_url}
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ) : (
              <p className="text-xs text-slate-600">
                Default flow: Directs candidates to the company careers inbox (<code className="bg-slate-200/60 px-1.5 py-0.5 rounded text-[11px]">careers@l2globaltech.com</code>) with the job title pre-populated.
              </p>
            )}
          </div>

          {/* Timestamps & Audit Info */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-slate-400 pt-2">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>Created: {formatDate(job.created_at)}</span>
            </div>
            <div>
              <span>Last Updated: {formatDate(job.updated_at || job.created_at)}</span>
            </div>
          </div>
        </div>

        {/* Footer Back & Edit Buttons */}
        <div className="flex items-center justify-between pt-4">
          <button
            type="button"
            onClick={() => router.push('/asgard/career-openings')}
            className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors cursor-pointer"
          >
            ← Back to Listings
          </button>
          <Link
            href={`/asgard/career-openings/edit?id=${job.id}`}
            className="inline-flex items-center gap-1.5 px-6 py-2.5 text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors shadow-xs cursor-pointer"
          >
            <Edit2 className="w-4 h-4" />
            Edit This Job Opening
          </Link>
        </div>
      </div>
    </AsgardLayout>
  );
};
