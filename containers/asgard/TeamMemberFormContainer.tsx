'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Save,
  Loader2,
  Users,
  User,
  Image as ImageIcon,
  Linkedin,
  Twitter,
  Award,
  Palette,
  ArrowUpDown,
  CheckCircle2,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { AsgardLayout } from '@/components/asgard/AsgardLayout';
import { LoadingState } from '@/components/asgard/LoadingState';
import ImageUploader from '@/components/asgard/ImageUploader';
import { uploadMedia } from '@/actions/mediaAction';
import { TeamMemberFormData } from '@/types/cms';
import {
  getTeamMemberById,
  createTeamMember,
  updateTeamMember,
  TeamMemberRecord,
} from '@/app/(asgard)/asgard/team/action';

interface TeamMemberFormContainerProps {
  id?: string;
}

const PRESET_COLORS = [
  { name: 'Muted Slate (Default)', hex: '#AABBD1' },
  { name: 'Soft Sky', hex: '#D0DAE6' },
  { name: 'Warm Beige', hex: '#D2C9BF' },
  { name: 'Lilac Rose', hex: '#F1E7EE' },
  { name: 'Peach Coral', hex: '#FEE6DB' },
  { name: 'Lavender Purple', hex: '#F4DBFE' },
  { name: 'Indigo Light', hex: '#E0E7FF' },
  { name: 'Mint Emerald', hex: '#DCFCE7' },
  { name: 'Golden Amber', hex: '#FEF08A' },
  { name: 'Blush Pink', hex: '#FCE7F3' },
];

export const TeamMemberFormContainer: React.FC<TeamMemberFormContainerProps> = ({ id }) => {
  const router = useRouter();
  const isEditMode = Boolean(id);
  const [initialLoading, setInitialLoading] = useState(isEditMode);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Form State
  const [formData, setFormData] = useState<TeamMemberFormData>({
    name: '',
    image_url: '',
    linkedin_url: '',
    twitter_url: '',
    certification: '',
    card_color: '#AABBD1',
    display_order: 0,
    is_active: true,
  });

  const [errors, setErrors] = useState<{ name?: string }>({});

  // Fetch existing member if editing
  useEffect(() => {
    async function loadMember() {
      if (!id) {
        setInitialLoading(false);
        return;
      }

      try {
        setInitialLoading(true);
        const member = await getTeamMemberById(id);

        if (!member) {
          toast.error('Team member not found');
          router.push('/asgard/team');
          return;
        }

        setFormData({
          id: member.id,
          name: member.name || '',
          image_url: member.image_url || '',
          linkedin_url: member.linkedin_url || '',
          twitter_url: member.twitter_url || '',
          certification: member.certification || '',
          card_color: member.card_color || '#AABBD1',
          display_order: typeof member.display_order === 'number' ? member.display_order : 0,
          is_active: member.is_active !== undefined ? Boolean(member.is_active) : true,
        });
      } catch (err: any) {
        console.error('Error loading team member:', err);
        toast.error('Failed to load team member details');
        router.push('/asgard/team');
      } finally {
        setInitialLoading(false);
      }
    }

    if (isEditMode) {
      loadMember();
    }
  }, [id, isEditMode, router]);

  // Handle Form Submission
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const name = formData.name?.trim();
    if (!name) {
      setErrors({ name: 'Member name is required' });
      toast.error('Please enter the team member name.');
      return;
    }

    try {
      setIsSubmitting(true);
      setErrors({});

      let finalImageUrl = formData.image_url?.trim() || null;

      // Handle image file upload if a new file is chosen
      if (selectedFile) {
        const uploadRes = await uploadMedia(selectedFile, 'team_members', 'media');
        if (!uploadRes.success || !uploadRes.url) {
          toast.error(uploadRes.error?.message || 'Failed to upload member profile image');
          setIsSubmitting(false);
          return;
        }
        finalImageUrl = uploadRes.url;
      }

      const payload: Partial<TeamMemberRecord> = {
        name,
        image_url: finalImageUrl,
        linkedin_url: formData.linkedin_url?.trim() || null,
        twitter_url: formData.twitter_url?.trim() || null,
        certification: formData.certification?.trim() || null,
        card_color: formData.card_color?.trim() || '#AABBD1',
        display_order: Number.isInteger(Number(formData.display_order))
          ? Number(formData.display_order)
          : 0,
        is_active: Boolean(formData.is_active),
      };

      if (isEditMode && id) {
        const res = await updateTeamMember(id, payload);
        if (!res.success) {
          toast.error(res.error || 'Failed to update team member');
          setIsSubmitting(false);
          return;
        }
        toast.success('Team member updated successfully!');
      } else {
        const res = await createTeamMember(payload);
        if (!res.success) {
          toast.error(res.error || 'Failed to create team member');
          setIsSubmitting(false);
          return;
        }
        toast.success('Team member created successfully!');
      }

      router.push('/asgard/team');
    } catch (err: any) {
      console.error('Error saving team member:', err);
      toast.error(err.message || 'Failed to save team member');
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentColor = formData.card_color || '#AABBD1';

  return (
    <AsgardLayout>
      <div>
        {/* Top Header */}
        <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3.5">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
              <Link
                href="/asgard/overview"
                className="hover:text-slate-900 transition-colors font-medium"
              >
                CMS
              </Link>
              <span>/</span>
              <Link
                href="/asgard/team"
                className="hover:text-slate-900 transition-colors font-medium"
              >
                Team
              </Link>
              <span>/</span>
              <span className="text-slate-800 font-semibold">
                {isEditMode ? 'Edit Member' : 'Add Member'}
              </span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-600" />
              <span>{isEditMode ? 'Edit Team Member' : 'Add New Team Member'}</span>
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              {isEditMode
                ? 'Update team member information, role certifications, image, card styling, and social links.'
                : 'Create a new team member profile to display on the company website.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/asgard/team"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors cursor-pointer shadow-2xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Team</span>
            </Link>
            <button
              type="button"
              onClick={handleFormSubmit}
              disabled={isSubmitting || initialLoading}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-2xs transition-all cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" />
                  <span>{isEditMode ? 'Save Changes' : 'Publish Member'}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Form Body */}
        {initialLoading ? (
          <LoadingState message="Loading team member details..." rows={5} />
        ) : (
          <form onSubmit={handleFormSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 max-w-6xl">
              {/* Main Column (2 cols) */}
              <div className="lg:col-span-2 space-y-4">
                {/* General Information Card */}
                <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5 border-b border-slate-100 pb-2.5">
                    <User className="w-4 h-4 text-indigo-600" />
                    Member Details
                  </h3>

                  {/* Name */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-semibold text-slate-700">
                        Full Name <span className="text-rose-500">*</span>
                      </label>
                      <span className="text-[11px] text-slate-400">
                        {formData.name?.length || 0} chars
                      </span>
                    </div>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: undefined });
                      }}
                      placeholder="e.g. Lenin Gongati"
                      className={`w-full px-3 py-2 text-xs font-medium bg-slate-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-900 placeholder:text-slate-400 ${errors.name ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200'
                        }`}
                    />
                    {errors.name && (
                      <p className="text-xs text-rose-500 mt-1 font-medium">{errors.name}</p>
                    )}
                  </div>

                  {/* Certification */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                        <Award className="w-3.5 h-3.5 text-indigo-500" />
                        Role / Certification
                      </label>
                      <span className="text-[11px] text-slate-400">Optional</span>
                    </div>
                    <input
                      type="text"
                      value={formData.certification || ''}
                      onChange={(e) =>
                        setFormData({ ...formData, certification: e.target.value })
                      }
                      placeholder="e.g. SAP Certified Consultant, Salesforce Architect"
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-800 placeholder:text-slate-400"
                    />
                    <p className="text-[11px] text-slate-400 mt-1">
                      Displays as a badge or role tag on the member profile card.
                    </p>
                  </div>
                </div>

                {/* Profile Image Card */}
                <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5 border-b border-slate-100 pb-2.5">
                    <ImageIcon className="w-4 h-4 text-indigo-600" />
                    Profile Image
                  </h3>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-2">
                      Upload Avatar Photo
                    </label>
                    <ImageUploader
                      value={formData.image_url}
                      onChange={(file) => {
                        setSelectedFile(file);
                        if (!file && !formData.image_url) {
                          setFormData((prev) => ({ ...prev, image_url: '' }));
                        }
                      }}
                      onRemove={() => {
                        setSelectedFile(null);
                        setFormData((prev) => ({ ...prev, image_url: '' }));
                      }}
                      folder="team_members"
                      label="Upload Member Photo"
                      description="Recommended: Transparent PNG or photo"
                    />
                  </div>

                  {/* Direct Image URL input (optional fallback) */}
                  <div className="pt-2 border-t border-slate-100">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Or Direct Image URL
                    </label>
                    <input
                      type="text"
                      value={formData.image_url || ''}
                      onChange={(e) =>
                        setFormData({ ...formData, image_url: e.target.value })
                      }
                      placeholder="https://... or /assets/web/team/lenin.png"
                      className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-mono text-slate-800 placeholder:text-slate-400"
                    />
                  </div>
                </div>

                {/* Social Profiles Card */}
                <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5 border-b border-slate-100 pb-2.5">
                    <ExternalLink className="w-4 h-4 text-indigo-600" />
                    Social Media Profiles
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* LinkedIn */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                        <Linkedin className="w-3.5 h-3.5 text-sky-600" />
                        LinkedIn URL
                      </label>
                      <input
                        type="url"
                        value={formData.linkedin_url || ''}
                        onChange={(e) =>
                          setFormData({ ...formData, linkedin_url: e.target.value })
                        }
                        placeholder="https://linkedin.com/in/username"
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-slate-800 placeholder:text-slate-400"
                      />
                    </div>

                    {/* Twitter / X */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                        <Twitter className="w-3.5 h-3.5 text-slate-800" />
                        Twitter / X URL
                      </label>
                      <input
                        type="url"
                        value={formData.twitter_url || ''}
                        onChange={(e) =>
                          setFormData({ ...formData, twitter_url: e.target.value })
                        }
                        placeholder="https://x.com/username"
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500/20 focus:border-slate-500 transition-all text-slate-800 placeholder:text-slate-400"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar Column (1 col) */}
              <div className="space-y-4">
                {/* Card Accent Color Card */}
                <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs space-y-3.5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5 border-b border-slate-100 pb-2.5">
                    <Palette className="w-4 h-4 text-indigo-600" />
                    Card Accent Color
                  </h3>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-2">
                      Preset Palettes
                    </label>
                    <div className="grid grid-cols-5 gap-2">
                      {PRESET_COLORS.map((preset) => {
                        const isSelected =
                          currentColor.toUpperCase() === preset.hex.toUpperCase();
                        return (
                          <button
                            key={preset.hex}
                            type="button"
                            onClick={() =>
                              setFormData({ ...formData, card_color: preset.hex })
                            }
                            title={`${preset.name} (${preset.hex})`}
                            className={`group relative h-8 rounded-lg border flex items-center justify-center transition-all cursor-pointer ${isSelected
                              ? 'ring-2 ring-indigo-600 ring-offset-2 scale-105 shadow-sm border-transparent'
                              : 'border-slate-300 hover:scale-105'
                              }`}
                            style={{ backgroundColor: preset.hex }}
                          >
                            {isSelected && (
                              <CheckCircle2 className="w-3.5 h-3.5 text-slate-800 drop-shadow-xs" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Custom Hex Picker */}
                  <div className="pt-2 border-t border-slate-100 space-y-2">
                    <label className="block text-xs font-semibold text-slate-700">
                      Custom Color (HEX)
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={currentColor.startsWith('#') ? currentColor : '#AABBD1'}
                        onChange={(e) =>
                          setFormData({ ...formData, card_color: e.target.value.toUpperCase() })
                        }
                        className="w-9 h-8 p-0 border border-slate-200 rounded-lg cursor-pointer bg-transparent"
                      />
                      <input
                        type="text"
                        value={formData.card_color || ''}
                        onChange={(e) =>
                          setFormData({ ...formData, card_color: e.target.value })
                        }
                        placeholder="#AABBD1"
                        maxLength={9}
                        className="flex-1 px-3 py-1.5 text-xs font-mono font-medium uppercase bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-800"
                      />
                    </div>
                  </div>
                </div>

                {/* Live Card Preview */}
                <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5 border-b border-slate-100 pb-2.5">
                    <Sparkles className="w-4 h-4 text-indigo-600" />
                    Live Card Preview
                  </h3>

                  <div className="border border-slate-200 rounded-2xl p-3 bg-slate-50/50 flex flex-col items-center text-center">
                    {/* Background Canvas with Selected Gradient */}
                    <div
                      className="relative w-full h-44 rounded-xl mb-3 flex items-center justify-center overflow-hidden border shadow-inner"
                      style={{
                        background: `linear-gradient(to bottom, #FFFFFF, ${currentColor})`,
                        borderColor: currentColor,
                      }}
                    >
                      {formData.image_url ? (
                        <img
                          src={formData.image_url}
                          alt="Preview"
                          className="h-full object-contain pt-4 drop-shadow-md"
                          onError={(e) => {
                            (e.currentTarget as HTMLElement).style.display = 'none';
                          }}
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-white/70 shadow-sm flex items-center justify-center text-2xl font-bold text-slate-700">
                          {formData.name ? formData.name.charAt(0).toUpperCase() : 'L'}
                        </div>
                      )}

                      {/* Certification Badge */}
                      {formData.certification && (
                        <span className="absolute top-2 right-2 text-[10px] font-semibold bg-indigo-600 text-white px-2 py-0.5 rounded-full shadow-xs">
                          {formData.certification}
                        </span>
                      )}
                    </div>

                    <h4 className="font-bold text-sm text-slate-900 truncate w-full">
                      {formData.name || 'Member Name'}
                    </h4>
                    <p className="text-xs text-slate-600 truncate w-full mt-0.5">
                      {formData.certification || 'Role / Position'}
                    </p>

                    {/* Socials */}
                    {(formData.linkedin_url || formData.twitter_url) && (
                      <div className="flex items-center gap-1.5 mt-2.5">
                        {formData.linkedin_url && (
                          <div className="p-1 bg-sky-100 text-sky-700 rounded-md">
                            <Linkedin className="w-3 h-3" />
                          </div>
                        )}
                        {formData.twitter_url && (
                          <div className="p-1 bg-slate-200 text-slate-800 rounded-md">
                            <Twitter className="w-3 h-3" />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Display & Publication Card */}
                <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs space-y-3.5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5 border-b border-slate-100 pb-2.5">
                    <ArrowUpDown className="w-4 h-4 text-indigo-600" />
                    Display & Visibility
                  </h3>

                  {/* Display Order */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Display Order (Sort)
                    </label>
                    <input
                      type="number"
                      value={formData.display_order ?? 0}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          display_order: parseInt(e.target.value) || 0,
                        })
                      }
                      placeholder="0"
                      className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                    />
                    <span className="text-[11px] text-slate-400 mt-1 block">
                      Lower numbers appear first (0, 1, 2...).
                    </span>
                  </div>

                  {/* Active Visibility */}
                  <div className="pt-2 border-t border-slate-100">
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Active Status
                    </label>
                    <div className="flex items-center gap-2.5">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.is_active ?? true}
                          onChange={(e) =>
                            setFormData({ ...formData, is_active: e.target.checked })
                          }
                          className="sr-only peer"
                        />
                        <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
                      </label>
                      <span className="text-xs font-semibold text-slate-700">
                        {formData.is_active ? (
                          <span className="text-emerald-700 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            Active (Visible)
                          </span>
                        ) : (
                          <span className="text-slate-500">Inactive (Hidden)</span>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </AsgardLayout>
  );
};
