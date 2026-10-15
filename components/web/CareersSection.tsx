'use client';

import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import PrimaryButton from '../shared/PrimaryButton';
import { Briefcase, MapPin, Loader2, Sparkles, ExternalLink } from 'lucide-react';
import { fetchJobOpenings, JobOpeningRecord } from '@/actions/careerOpeningsAction';
import { CareerApplyModal } from './CareerApplyModal';

const AUTO_TIME = 8000;

interface CareersSectionProps {
  initialJobs?: JobOpeningRecord[];
}

export default function CareersSection({ initialJobs }: CareersSectionProps) {
  const [jobs, setJobs] = useState<JobOpeningRecord[]>(
    initialJobs ? initialJobs.filter((j) => j.is_active !== false) : []
  );
  const [loading, setLoading] = useState(initialJobs === undefined);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch active career openings from Supabase (or refresh if initialJobs was not passed)
  useEffect(() => {
    let isMounted = true;

    async function loadJobs() {
      try {
        if (!initialJobs) setLoading(true);
        const data = await fetchJobOpenings();
        if (isMounted) {
          // Strictly ensure only active jobs are shown
          const activeJobs = (data || []).filter((j) => j.is_active !== false);
          setJobs(activeJobs);
        }
      } catch (err) {
        console.error('Error fetching public career openings:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadJobs();

    return () => {
      isMounted = false;
    };
  }, [initialJobs]);

  // Check URL query parameters or hash to auto-select job (e.g. ?job=mern-stack-developer or #react-developer)
  useEffect(() => {
    if (typeof window !== 'undefined' && jobs.length > 0) {
      const urlParams = new URLSearchParams(window.location.search);
      const jobParam = urlParams.get('job') || window.location.hash.replace('#', '');
      if (jobParam) {
        const foundIdx = jobs.findIndex(
          (j) =>
            j.slug.toLowerCase() === jobParam.toLowerCase() ||
            j.id.toLowerCase() === jobParam.toLowerCase()
        );
        if (foundIdx !== -1) {
          setActiveIndex(foundIdx);
        }
      }
    }
  }, [jobs]);

  // Ensure activeIndex is within range if jobs change
  useEffect(() => {
    if (jobs.length > 0 && activeIndex >= jobs.length) {
      setActiveIndex(0);
    }
  }, [jobs, activeIndex]);

  const activeJob = jobs[activeIndex] || jobs[0] || null;

  /** Start auto rotation if more than 1 job */
  const startAutoSlide = () => {
    if (jobs.length <= 1) return;
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % jobs.length);
    }, AUTO_TIME);
  };

  /** Reset timer when user clicks */
  const handleClick = (index: number) => {
    setActiveIndex(index);
    if (intervalRef.current) clearInterval(intervalRef.current);
    startAutoSlide();
  };

  useEffect(() => {
    startAutoSlide();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [jobs.length]);

  // Loading State Skeleton
  if (loading) {
    return (
      <div className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-10">
          {/* Skeleton Left */}
          <div className="space-y-4">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="rounded-xl border border-white bg-white p-6 shadow-2xs animate-pulse space-y-3"
              >
                <div className="h-5 bg-slate-200 rounded-md w-3/5" />
                <div className="flex gap-2">
                  <div className="h-6 bg-slate-100 rounded-md w-20" />
                  <div className="h-6 bg-slate-100 rounded-md w-24" />
                </div>
                <div className="h-4 bg-slate-100 rounded-md w-full" />
                <div className="h-4 bg-slate-100 rounded-md w-4/5" />
              </div>
            ))}
          </div>

          {/* Skeleton Right */}
          <div className="bg-white rounded-2xl p-8 border border-white shadow-2xs animate-pulse space-y-4">
            <div className="h-7 bg-slate-200 rounded-md w-2/3" />
            <div className="flex gap-2">
              <div className="h-6 bg-slate-100 rounded-md w-24" />
              <div className="h-6 bg-slate-100 rounded-md w-24" />
            </div>
            <div className="h-4 bg-slate-100 rounded-md w-full mt-6" />
            <div className="h-4 bg-slate-100 rounded-md w-11/12" />
            <div className="h-4 bg-slate-100 rounded-md w-4/5" />
            <div className="h-32 bg-slate-50 rounded-xl w-full mt-6" />
          </div>
        </div>
      </div>
    );
  }

  // Polished Empty State
  if (jobs.length === 0 || !activeJob) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl p-10 md:p-14 text-center border border-slate-200 shadow-sm max-w-xl mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-[#FFF3ED] text-[#F15A23] flex items-center justify-center mx-auto mb-4 border border-[#FFE0D1]">
            <Briefcase className="w-8 h-8" />
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
            No Open Positions Right Now
          </h3>
          <p className="text-sm md:text-base text-gray-600 leading-relaxed max-w-md mx-auto mb-6">
            We don’t currently have any active vacancies listed, but we are always eager to connect with talented professionals.
          </p>
          <PrimaryButton
            label="Send Your Resume"
            href="mailto:careers@l2globaltech.com?subject=General Career Application - L2 Global"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-start">
        {/* LEFT LIST */}
        <div className="space-y-4">
          {jobs.map((job, index) => {
            const isSelected = activeIndex === index;
            return (
              <div
                key={job.id}
                onClick={() => handleClick(index)}
                className={clsx(
                  'cursor-pointer rounded-2xl border p-5 sm:p-6 transition-all duration-300',
                  isSelected
                    ? 'border-[#F15A23] bg-white shadow-md ring-1 ring-[#F15A23]/20'
                    : 'border-white bg-white hover:border-[#F15A23]/60 shadow-2xs'
                )}
              >
                <div className="flex items-start justify-between gap-2">
                  <h3
                    className={`text-lg sm:text-xl font-bold transition-colors ${
                      isSelected ? 'text-[#F15A23]' : 'text-gray-900'
                    }`}
                  >
                    {job.title}
                  </h3>
                  {isSelected && (
                    <span className="shrink-0 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-orange-100 text-[#F15A23]">
                      Selected
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-1.5 mt-2.5">
                  {job.experience_level && (
                    <span className="text-xs bg-gray-100 px-2.5 py-1 rounded-md text-gray-700 font-medium">
                      {job.experience_level}
                    </span>
                  )}
                  {job.employment_type && (
                    <span className="text-xs bg-gray-100 px-2.5 py-1 rounded-md text-gray-700 font-medium">
                      {job.employment_type}
                    </span>
                  )}
                  {job.locations &&
                    job.locations.map((loc, i) => (
                      <span
                        key={i}
                        className="text-xs bg-gray-100 px-2.5 py-1 rounded-md text-gray-700 inline-flex items-center gap-1 font-medium"
                      >
                        <MapPin className="w-3 h-3 text-gray-500" />
                        {loc}
                      </span>
                    ))}
                </div>

                <p className="text-xs sm:text-sm text-gray-600 mt-3 line-clamp-2 leading-relaxed">
                  <span className="font-semibold text-gray-700">Primary Responsibility: </span>
                  {job.primary_responsibility}
                </p>
              </div>
            );
          })}
        </div>

        {/* RIGHT DETAILS */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/60 shadow-sm sticky top-24">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              {activeJob.title}
            </h2>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Actively Hiring
            </span>
          </div>

          <div className="flex flex-wrap gap-2 mt-2 pb-5 border-b border-gray-100">
            {activeJob.experience_level && (
              <span className="text-xs sm:text-sm bg-gray-100 px-3 py-1 rounded-md text-gray-700 font-medium">
                {activeJob.experience_level}
              </span>
            )}
            {activeJob.work_place_type && (
              <span className="text-xs sm:text-sm bg-gray-100 px-3 py-1 rounded-md text-gray-700 font-medium">
                {activeJob.work_place_type}
              </span>
            )}
            {activeJob.locations &&
              activeJob.locations.map((loc, i) => (
                <span
                  key={i}
                  className="text-xs sm:text-sm bg-gray-100 px-3 py-1 rounded-md text-gray-700 inline-flex items-center gap-1 font-medium"
                >
                  <MapPin className="w-3 h-3 text-gray-500" />
                  {loc}
                </span>
              ))}
          </div>

          <div className="mt-5 space-y-6">
            <div>
              <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-2">
                Primary Responsibility
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                {activeJob.primary_responsibility}
              </p>
            </div>

            {activeJob.job_specifications && activeJob.job_specifications.length > 0 && (
              <div>
                <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-2">
                  Job Specification
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  {activeJob.job_specifications.map((spec, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F15A23] mt-2 shrink-0" />
                      <span className="leading-relaxed">{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-[#F8FAFC] rounded-xl border border-slate-100 text-xs sm:text-sm text-gray-700">
              <p>
                <strong className="text-gray-900 font-semibold">Employment:</strong>{' '}
                {activeJob.employment_type || 'Full-time'}
              </p>
              <p>
                <strong className="text-gray-900 font-semibold">Workplace:</strong>{' '}
                {activeJob.work_place_type || 'Hybrid'}
              </p>
              <p>
                <strong className="text-gray-900 font-semibold">Salary:</strong>{' '}
                {activeJob.salary || 'Commensurate with experience'}
              </p>
              <p>
                <strong className="text-gray-900 font-semibold">Experience:</strong>{' '}
                {activeJob.experience_required || 'Minimum 3 Years'}
              </p>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <PrimaryButton
                label="Get Started"
                onClick={() => setIsApplyModalOpen(true)}
                icon={
                  <svg
                    width="18"
                    height="14"
                    viewBox="0 0 18 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.25 14L9.64687 12.3667L13.6969 8.16667H0V5.83333H13.6969L9.675 1.63333L11.25 0L18 7L11.25 14Z"
                      fill="white"
                    />
                  </svg>
                }
              />

              {activeJob.application_url && (
                <a
                  href={activeJob.application_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-5 py-3 text-xs sm:text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                >
                  <span>Apply via Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Application Popup Modal */}
      <CareerApplyModal
        job={activeJob}
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
      />
    </div>
  );
}
