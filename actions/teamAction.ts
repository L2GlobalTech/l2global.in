import {
  getTeamMembers,
  getTeamMemberById,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
  toggleTeamMemberActiveStatus,
  getPublicTeamMembers,
  TeamMemberRecord,
} from '@/app/(asgard)/asgard/team/action';

export {
  getTeamMembers,
  getTeamMemberById,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
  toggleTeamMemberActiveStatus,
  getPublicTeamMembers,
};
export type { TeamMemberRecord };

/**
 * Primary frontend function to fetch active team members from Supabase `team_members` table
 */
export async function fetchTeamMembers(): Promise<TeamMemberRecord[]> {
  return await getPublicTeamMembers();
}
