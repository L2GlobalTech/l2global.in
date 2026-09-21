import { supabase, isSupabaseConfigured } from '@/configs/supabase';
import { TeamMemberRecord } from '@/types/cms';

export type { TeamMemberRecord };

export interface GetTeamMembersParams {
  page?: number;
  pageSize?: number;
  perPage?: number;
  search?: string;
  status?: string; // 'all' | 'active' | 'inactive'
}

export interface GetTeamMembersResult {
  data: TeamMemberRecord[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

/**
 * READ: Fetch team members with server-side search, filtering, ordering and pagination
 */
export async function getTeamMembers(options?: GetTeamMembersParams): Promise<GetTeamMembersResult> {
  const page = Math.max(1, Number(options?.page) || 1);
  const pageSize = Math.max(1, Number(options?.pageSize || options?.perPage) || 10);
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const fallbackResult: GetTeamMembersResult = {
    data: [],
    total: 0,
    page,
    pageSize,
    totalPages: 1,
  };

  try {
    if (!isSupabaseConfigured()) {
      console.warn('Supabase is not configured in environment');
      return fallbackResult;
    }

    let query = supabase
      .from('team_members')
      .select('*', { count: 'exact' });

    // 1. Server-side search across name and certification
    const searchTerm = options?.search?.trim();
    if (searchTerm) {
      const sanitized = searchTerm.replace(/,/g, '');
      query = query.or(
        `name.ilike.%${sanitized}%,certification.ilike.%${sanitized}%`
      );
    }

    // 2. Filter by active status
    if (options?.status === 'active') {
      query = query.eq('is_active', true);
    } else if (options?.status === 'inactive') {
      query = query.eq('is_active', false);
    }

    // 3. Ordering: display_order ascending, then created_at descending
    query = query
      .order('display_order', { ascending: true, nullsFirst: false })
      .order('created_at', { ascending: false })
      .range(from, to);

    const { data, count, error } = await query;

    if (error) {
      console.error('Error fetching team members from Supabase:', error);
      return fallbackResult;
    }

    const total = typeof count === 'number' ? count : (data || []).length;
    const totalPages = Math.ceil(total / pageSize) || 1;

    return {
      data: (data || []) as TeamMemberRecord[],
      total,
      page,
      pageSize,
      totalPages,
    };
  } catch (error) {
    console.error('Failed to query team members from Supabase:', error);
    return fallbackResult;
  }
}

/**
 * READ: Fetch active team members for public website
 */
export async function getPublicTeamMembers(): Promise<TeamMemberRecord[]> {
  try {
    if (!isSupabaseConfigured()) {
      return [];
    }

    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true, nullsFirst: false })
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching public team members from Supabase:', error);
      return [];
    }

    return (data || []) as TeamMemberRecord[];
  } catch (error) {
    console.error('Failed to query public team members from Supabase:', error);
    return [];
  }
}

/**
 * READ: Get single team member by ID
 */
export async function getTeamMemberById(id: string): Promise<TeamMemberRecord | null> {
  try {
    if (!id || !isSupabaseConfigured()) {
      return null;
    }

    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching team member by ID:', error);
      return null;
    }

    return (data || null) as TeamMemberRecord | null;
  } catch (error) {
    console.error('Failed to fetch team member:', error);
    return null;
  }
}

/**
 * CREATE: Add a new team member
 */
export async function createTeamMember(memberData: Partial<TeamMemberRecord>) {
  try {
    if (!isSupabaseConfigured()) {
      return { success: false, error: 'Supabase credentials are not configured.' };
    }

    if (!memberData.name?.trim()) {
      return { success: false, error: 'Team member name is required.' };
    }

    // Supabase Auth session debug check
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    console.log("========== SUPABASE DEBUG ==========");
    console.log("Session exists:", !!session);
    console.log("User ID:", session?.user?.id);
    console.log("User email:", session?.user?.email);
    console.log("Session error:", sessionError);
    console.log("====================================");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    console.log("CURRENT SUPABASE USER:", user);

    const { data, error } = await supabase
      .from('team_members')
      .insert({
        name: memberData.name.trim(),
        image_url: memberData.image_url?.trim() || null,
        linkedin_url: memberData.linkedin_url?.trim() || null,
        twitter_url: memberData.twitter_url?.trim() || null,
        certification: memberData.certification?.trim() || null,
        card_color: memberData.card_color?.trim() || '#AABBD1',
        display_order: Number.isInteger(Number(memberData.display_order)) ? Number(memberData.display_order) : 0,
        is_active: memberData.is_active !== undefined ? Boolean(memberData.is_active) : true,
      })
      .select()
      .single();

    console.log("TEAM MEMBER DATA:", data);
    if (error) {
      console.error("TEAM MEMBER ERROR:", {
        message: error?.message,
        details: (error as any)?.details,
        hint: (error as any)?.hint,
        code: (error as any)?.code,
      });
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error: any) {
    console.error("TEAM MEMBERS ERROR", {
      message: error?.message,
      details: (error as any)?.details,
      hint: (error as any)?.hint,
      code: (error as any)?.code,
    });
    return { success: false, error: error.message || 'Failed to create team member' };
  }
}

/**
 * UPDATE: Update an existing team member
 */
export async function updateTeamMember(id: string, updates: Partial<TeamMemberRecord>) {
  try {
    if (!id || !isSupabaseConfigured()) {
      return { success: false, error: 'Team member ID and Supabase configuration are required.' };
    }

    // Supabase Auth session debug check
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    console.log("========== SUPABASE DEBUG ==========");
    console.log("Session exists:", !!session);
    console.log("User ID:", session?.user?.id);
    console.log("User email:", session?.user?.email);
    console.log("Session error:", sessionError);
    console.log("====================================");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    console.log("CURRENT SUPABASE USER:", user);

    const payload: any = {
      updated_at: new Date().toISOString(),
    };

    if (updates.name !== undefined) payload.name = updates.name?.trim() || null;
    if (updates.image_url !== undefined) payload.image_url = updates.image_url?.trim() || null;
    if (updates.linkedin_url !== undefined) payload.linkedin_url = updates.linkedin_url?.trim() || null;
    if (updates.twitter_url !== undefined) payload.twitter_url = updates.twitter_url?.trim() || null;
    if (updates.certification !== undefined) payload.certification = updates.certification?.trim() || null;
    if (updates.card_color !== undefined) payload.card_color = updates.card_color?.trim() || '#AABBD1';
    if (updates.display_order !== undefined) {
      payload.display_order = Number.isInteger(Number(updates.display_order)) ? Number(updates.display_order) : 0;
    }
    if (updates.is_active !== undefined) payload.is_active = Boolean(updates.is_active);

    const { data, error } = await supabase
      .from('team_members')
      .update(payload)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error("TEAM MEMBERS ERROR", {
        message: error?.message,
        details: (error as any)?.details,
        hint: (error as any)?.hint,
        code: (error as any)?.code,
      });
      return { success: false, error: error.message };
    }

    return { success: true, data: data || payload };
  } catch (error: any) {
    console.error("TEAM MEMBERS ERROR", {
      message: error?.message,
      details: (error as any)?.details,
      hint: (error as any)?.hint,
      code: (error as any)?.code,
    });
    return { success: false, error: error.message || 'Failed to update team member' };
  }
}

/**
 * DELETE: Remove a team member by ID
 */
export async function deleteTeamMember(id: string) {
  try {
    if (!id || !isSupabaseConfigured()) {
      return { success: false, error: 'Team member ID is required.' };
    }

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      console.error("TEAM MEMBERS ERROR - NO ACTIVE SUPABASE SESSION", {
        message: "No active Supabase session found for deletion.",
      });
      return {
        success: false,
        error: "You must be signed in with an active Supabase session to delete team members.",
      };
    }

    const { error } = await supabase.from('team_members').delete().eq('id', id);

    if (error) {
      console.error("TEAM MEMBERS ERROR", {
        message: error?.message,
        details: (error as any)?.details,
        hint: (error as any)?.hint,
        code: (error as any)?.code,
      });
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error: any) {
    console.error("TEAM MEMBERS ERROR", {
      message: error?.message,
      details: (error as any)?.details,
      hint: (error as any)?.hint,
      code: (error as any)?.code,
    });
    return { success: false, error: error.message || 'Failed to delete team member' };
  }
}

/**
 * QUICK TOGGLE: Active Status
 */
export async function toggleTeamMemberActiveStatus(id: string, currentStatus: boolean | null) {
  try {
    if (!id || !isSupabaseConfigured()) {
      return { success: false, error: 'Team member ID is required.' };
    }

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      console.error("TEAM MEMBERS ERROR - NO ACTIVE SUPABASE SESSION", {
        message: "No active Supabase session found for toggle.",
      });
      return {
        success: false,
        error: "You must be signed in with an active Supabase session.",
      };
    }

    const newStatus = !currentStatus;

    const { data, error } = await supabase
      .from('team_members')
      .update({
        is_active: newStatus,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error("TEAM MEMBERS ERROR", {
        message: error?.message,
        details: (error as any)?.details,
        hint: (error as any)?.hint,
        code: (error as any)?.code,
      });
      return { success: false, error: error.message };
    }

    return { success: true, data: data };
  } catch (error: any) {
    console.error("TEAM MEMBERS ERROR", {
      message: error?.message,
      details: (error as any)?.details,
      hint: (error as any)?.hint,
      code: (error as any)?.code,
    });
    return { success: false, error: error.message || 'Failed to toggle status' };
  }
}
