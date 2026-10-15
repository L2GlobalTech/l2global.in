import {
  getJobOpenings,
  getJobOpeningById,
  getJobOpeningBySlug,
  createJobOpening,
  updateJobOpening,
  deleteJobOpening,
  toggleJobOpeningActiveStatus,
  getPublicJobOpenings,
  slugify,
  JobOpeningRecord,
  JobOpeningFormData,
} from '@/app/(asgard)/asgard/career-openings/action';

export {
  getJobOpenings,
  getJobOpeningById,
  getJobOpeningBySlug,
  createJobOpening,
  updateJobOpening,
  deleteJobOpening,
  toggleJobOpeningActiveStatus,
  getPublicJobOpenings,
  slugify,
};

export type { JobOpeningRecord, JobOpeningFormData };

/**
 * Primary frontend function to fetch active career openings from Supabase `job_openings` table
 */
export async function fetchJobOpenings(): Promise<JobOpeningRecord[]> {
  return await getPublicJobOpenings();
}

/**
 * Fetch a single career opening by slug from Supabase
 */
export async function fetchJobOpeningBySlug(slug: string): Promise<JobOpeningRecord | null> {
  return await getJobOpeningBySlug(slug);
}
