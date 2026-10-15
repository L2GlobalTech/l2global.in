'use client';

import React, { useState } from 'react';
import { Dialog, DialogPanel, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import {
  X,
  Briefcase,
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  Loader2,
  ExternalLink,
  GraduationCap,
  Building,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { JobOpeningRecord } from '@/types/cms';
import { submitLead } from '@/actions/contactAction';

interface CareerApplyModalProps {
  job: JobOpeningRecord | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CareerApplyModal: React.FC<CareerApplyModalProps> = ({ job, isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [experience, setExperience] = useState('');
  const [portfolio, setPortfolio] = useState('');
  const [coverNote, setCoverNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!job) return null;

  const handleReset = () => {
    setName('');
    setEmail('');
    setPhone('');
    setCity('');
    setExperience('');
    setPortfolio('');
    setCoverNote('');
    setIsSubmitted(false);
    setIsSubmitting(false);
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error('Please enter your full name');
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    if (!phone.trim()) {
      toast.error('Please enter your phone number');
      return;
    }

    try {
      setIsSubmitting(true);

      const fullDescription = [
        `=== JOB APPLICATION ===`,
        `Position: ${job.title}`,
        `Slug: ${job.slug}`,
        `Experience Level: ${job.experience_level || 'N/A'}`,
        `Candidate Experience: ${experience.trim() || 'Not specified'}`,
        `Candidate Location: ${city.trim() || 'Not specified'}`,
        `Portfolio / LinkedIn: ${portfolio.trim() || 'None'}`,
        ``,
        `Cover Note / Profile Summary:`,
        coverNote.trim() || 'No cover note provided.',
      ].join('\n');

      const res = await submitLead({
        last_name: name.trim(),
        email: email.trim(),
        mobile: phone.trim(),
        city: city.trim() || undefined,
        company: 'Career Applicant',
        description: fullDescription,
        service: `Career: ${job.title}`,
      });

      if (res.success) {
        setIsSubmitted(true);
        toast.success('Your application has been received!');
      } else {
        toast.error(res.error || 'Failed to submit application. Please try again or email us.');
      }
    } catch (err: any) {
      console.error('Error applying for job:', err);
      toast.error('An error occurred. You can also email us directly at careers@l2globaltech.com');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-9999" onClose={handleReset}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-xs" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95 translate-y-3"
            enterTo="opacity-100 scale-100 translate-y-0"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100 translate-y-0"
            leaveTo="opacity-0 scale-95 translate-y-3"
          >
            <DialogPanel className="relative w-full max-w-xl max-h-[92vh] rounded-3xl bg-white shadow-2xl overflow-hidden flex flex-col border border-slate-100">
              {/* Header */}
              <div className="sticky top-0 z-10 flex items-start justify-between px-6 py-5 border-b border-slate-100 bg-white">
                <div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-orange-50 text-[#F15A23] border border-orange-100 mb-1.5">
                    <Briefcase className="w-3.5 h-3.5" />
                    Career Opportunity
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                    Apply for {job.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 text-xs text-gray-500 mt-1">
                    {job.experience_level && (
                      <span className="flex items-center gap-1">
                        <GraduationCap className="w-3.5 h-3.5 text-gray-400" />
                        {job.experience_level}
                      </span>
                    )}
                    {job.work_place_type && (
                      <span className="flex items-center gap-1">
                        <Building className="w-3.5 h-3.5 text-gray-400" />
                        {job.work_place_type}
                      </span>
                    )}
                    {job.locations && job.locations.length > 0 && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-gray-400" />
                        {job.locations.join(', ')}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleReset}
                  className="rounded-full p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto px-6 py-6">
                {isSubmitted ? (
                  <div className="py-8 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-100">
                      <CheckCircle2 className="w-9 h-9" />
                    </div>
                    <h4 className="text-2xl font-bold text-gray-900">Application Submitted!</h4>
                    <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
                      Thank you for applying for the{' '}
                      <span className="font-semibold text-gray-900">{job.title}</span> position at L2
                      Global. Our recruitment team will review your application and contact you
                      shortly.
                    </p>
                    <div className="pt-4">
                      <button
                        type="button"
                        onClick={handleReset}
                        className="px-6 py-2.5 text-sm font-semibold text-white bg-[#0B52DC] hover:bg-[#074FDA] rounded-full transition-all cursor-pointer shadow-sm"
                      >
                        Done
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* External Link Notice if configured */}
                    {job.application_url && (
                      <div className="p-3.5 bg-blue-50/80 rounded-2xl border border-blue-100 flex items-center justify-between gap-3 text-xs text-blue-900">
                        <div>
                          <p className="font-semibold">External portal available for this role</p>
                          <p className="text-blue-700 text-[11px]">
                            You can apply here directly or visit our external link.
                          </p>
                        </div>
                        <a
                          href={job.application_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0 inline-flex items-center gap-1 font-semibold text-blue-700 hover:text-blue-900 underline"
                        >
                          Visit Link <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Alex Morgan"
                          className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0B52DC]/20 focus:border-[#0B52DC] transition-all bg-gray-50/50"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="alex@example.com"
                          className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0B52DC]/20 focus:border-[#0B52DC] transition-all bg-gray-50/50"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Phone */}
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 98765 43210"
                          className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0B52DC]/20 focus:border-[#0B52DC] transition-all bg-gray-50/50"
                        />
                      </div>

                      {/* Current City */}
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          Current Location / City
                        </label>
                        <input
                          type="text"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="e.g. Chennai, Madurai, Bengaluru"
                          className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0B52DC]/20 focus:border-[#0B52DC] transition-all bg-gray-50/50"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Experience */}
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          Relevant Experience
                        </label>
                        <input
                          type="text"
                          value={experience}
                          onChange={(e) => setExperience(e.target.value)}
                          placeholder="e.g. 3.5 Years"
                          className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0B52DC]/20 focus:border-[#0B52DC] transition-all bg-gray-50/50"
                        />
                      </div>

                      {/* Portfolio / LinkedIn */}
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          LinkedIn / Portfolio URL
                        </label>
                        <input
                          type="url"
                          value={portfolio}
                          onChange={(e) => setPortfolio(e.target.value)}
                          placeholder="https://linkedin.com/in/username"
                          className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0B52DC]/20 focus:border-[#0B52DC] transition-all bg-gray-50/50"
                        />
                      </div>
                    </div>

                    {/* Cover Note / Message */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Tell us about yourself / Profile Summary
                      </label>
                      <textarea
                        rows={3}
                        value={coverNote}
                        onChange={(e) => setCoverNote(e.target.value)}
                        placeholder="Briefly highlight your technical background, major projects, and why you would be a great fit for this position..."
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0B52DC]/20 focus:border-[#0B52DC] transition-all bg-gray-50/50"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 text-sm font-semibold text-white bg-linear-to-b from-[#4684FF] to-[#074FDA] hover:from-[#3a79f5] hover:to-[#0644bd] rounded-full transition-all shadow-md cursor-pointer disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Submitting Application...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            Submit Application
                          </>
                        )}
                      </button>
                    </div>

                    {/* Email Fallback */}
                    <div className="text-center pt-2">
                      <p className="text-xs text-gray-500">
                        Prefer email?{' '}
                        <a
                          href={`mailto:careers@l2globaltech.com?subject=Application for ${encodeURIComponent(
                            job.title
                          )}&body=Dear L2 Global Recruitment Team,%0D%0A%0D%0AI would like to apply for the position of ${encodeURIComponent(
                            job.title
                          )} (${job.slug}). Please find my resume attached.`}
                          className="font-semibold text-[#0B52DC] hover:underline"
                        >
                          Email your resume directly to careers@l2globaltech.com
                        </a>
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </DialogPanel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};
