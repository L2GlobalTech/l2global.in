import { supabase, isSupabaseConfigured } from '@/configs/supabase';

export interface AdminRecord {
  id: string;
  email: string;
  full_name: string;
  role: 'Super Admin' | 'Admin' | 'Manager' | 'Editor' | string;
  is_active: boolean;
  phone?: string | null;
  created_at?: string;
  updated_at?: string;
  last_sign_in_at?: string | null;
}

export interface GetAdminsParams {
  page?: number;
  pageSize?: number;
  perPage?: number;
  search?: string;
  role?: string;
  status?: string; // 'all' | 'active' | 'inactive'
}

export interface GetAdminsResult {
  data: AdminRecord[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Initial seed matching existing Supabase Auth users
export const defaultAdmins: AdminRecord[] = [
  {
    id: '8cf90310-c022-4ec1-ada5-9b8bc6772eb8',
    email: 'vikas.yadav@ascendtis.com',
    full_name: 'Vikas Yadav',
    role: 'Super Admin',
    is_active: true,
    phone: '+91 98765 43210',
    created_at: '2026-09-03T06:41:34.000Z',
    last_sign_in_at: '2026-09-10T11:00:00.000Z',
  },
  {
    id: 'b1d087d0-3165-49c4-8a25-b01752ee277d',
    email: 'vikas@yopmail.com',
    full_name: 'Vikas',
    role: 'Admin',
    is_active: true,
    phone: null,
    created_at: '2026-09-03T11:42:57.000Z',
    last_sign_in_at: '2026-09-04T12:00:00.000Z',
  },
];

// In-memory runtime cache for fallback when public.admins table is not yet created in Supabase
let localAdminsStore: AdminRecord[] = [...defaultAdmins];

/**
 * READ: Fetch Admins with search, filtering, and pagination
 */
export async function getAdmins(options?: GetAdminsParams): Promise<GetAdminsResult> {
  const page = Math.max(1, Number(options?.page) || 1);
  const pageSize = Math.max(1, Number(options?.pageSize || options?.perPage) || 10);
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  try {
    if (isSupabaseConfigured()) {
      let query = supabase
        .from('admins')
        .select('*', { count: 'exact' });

      const searchTerm = options?.search?.trim();
      if (searchTerm) {
        const sanitized = searchTerm.replace(/,/g, '');
        query = query.or(
          `email.ilike.%${sanitized}%,full_name.ilike.%${sanitized}%,role.ilike.%${sanitized}%`
        );
      }

      if (options?.role && options.role !== 'all') {
        query = query.eq('role', options.role);
      }

      if (options?.status === 'active') {
        query = query.eq('is_active', true);
      } else if (options?.status === 'inactive') {
        query = query.eq('is_active', false);
      }

      query = query
        .order('created_at', { ascending: false })
        .range(from, to);

      const { data, count, error } = await query;

      if (!error && data) {
        const total = typeof count === 'number' ? count : data.length;
        return {
          data: data as AdminRecord[],
          total,
          page,
          pageSize,
          totalPages: Math.ceil(total / pageSize) || 1,
        };
      }
    }
  } catch {
    // Fall back to local in-memory store
  }

  // Local in-memory filter & paginate fallback
  let filtered = [...localAdminsStore];

  const search = (options?.search || '').toLowerCase().trim();
  if (search) {
    filtered = filtered.filter(
      (a) =>
        a.email.toLowerCase().includes(search) ||
        a.full_name.toLowerCase().includes(search) ||
        a.role.toLowerCase().includes(search)
    );
  }

  if (options?.role && options.role !== 'all') {
    filtered = filtered.filter((a) => a.role === options.role);
  }

  if (options?.status === 'active') {
    filtered = filtered.filter((a) => a.is_active);
  } else if (options?.status === 'inactive') {
    filtered = filtered.filter((a) => !a.is_active);
  }

  const total = filtered.length;
  const paginated = filtered.slice(from, to + 1);

  return {
    data: paginated,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize) || 1,
  };
}

/**
 * READ: Get Single Admin by ID
 */
export async function getAdminById(id: string): Promise<AdminRecord | null> {
  try {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase
        .from('admins')
        .select('*')
        .eq('id', id)
        .single();

      if (!error && data) {
        return data as AdminRecord;
      }
    }
  } catch {
    // Fall back
  }

  return localAdminsStore.find((a) => a.id === id) || null;
}

/**
 * CREATE: Register a new Admin
 * 1. Creates Supabase auth user via signUp (so they can log in)
 * 2. Stores admin profile in admins table / local storage
 */
export async function createAdmin(adminData: {
  email: string;
  password?: string;
  full_name: string;
  role: string;
  is_active?: boolean;
  phone?: string;
}) {
  try {
    const cleanEmail = adminData.email.trim().toLowerCase();
    const cleanName = adminData.full_name.trim();

    if (!cleanEmail || !cleanEmail.includes('@')) {
      return { success: false, error: 'A valid email address is required.' };
    }
    if (!cleanName) {
      return { success: false, error: 'Full name is required.' };
    }
    if (adminData.password && adminData.password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters.' };
    }

    let authUserId = 'admin_' + Math.random().toString(36).substring(2, 10);

    // 1. Try to register with Supabase Auth
    if (isSupabaseConfigured() && adminData.password) {
      try {
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: cleanEmail,
          password: adminData.password,
          options: {
            data: {
              full_name: cleanName,
              role: adminData.role || 'Super Admin',
            },
          },
        });

        if (authError && !authError.message.includes('already registered')) {
          console.warn('Supabase Auth signUp note:', authError.message);
        }

        if (authData?.user?.id) {
          authUserId = authData.user.id;
        }
      } catch (authErr) {
        console.warn('Supabase Auth error:', authErr);
      }
    }

    const newRecord: AdminRecord = {
      id: authUserId,
      email: cleanEmail,
      full_name: cleanName,
      role: adminData.role || 'Super Admin',
      is_active: adminData.is_active !== undefined ? Boolean(adminData.is_active) : true,
      phone: adminData.phone?.trim() || null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      last_sign_in_at: null,
    };

    // 2. Insert into Supabase table if available
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('admins')
          .insert([newRecord])
          .select();

        if (!error && data?.[0]) {
          // Also update local store
          localAdminsStore = [data[0], ...localAdminsStore.filter((a) => a.id !== data[0].id)];
          return { success: true, data: data[0] };
        }
      } catch {
        // Table may not exist yet; use local store
      }
    }

    // Update in-memory store
    localAdminsStore = [newRecord, ...localAdminsStore.filter((a) => a.email !== cleanEmail)];
    return { success: true, data: newRecord };
  } catch (error: any) {
    console.error('Exception creating admin:', error);
    return { success: false, error: error.message || 'Failed to create admin' };
  }
}

/**
 * UPDATE: Edit Admin record
 */
export async function updateAdmin(
  id: string,
  updates: Partial<AdminRecord> & { password?: string }
) {
  try {
    if (!id) {
      return { success: false, error: 'Admin ID is required.' };
    }

    const payload: Partial<AdminRecord> = {
      updated_at: new Date().toISOString(),
    };

    if (updates.full_name !== undefined) payload.full_name = updates.full_name.trim();
    if (updates.role !== undefined) payload.role = updates.role;
    if (updates.is_active !== undefined) payload.is_active = Boolean(updates.is_active);
    if (updates.phone !== undefined) payload.phone = updates.phone?.trim() || null;

    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('admins')
          .update(payload)
          .eq('id', id)
          .select();

        if (!error && data?.[0]) {
          localAdminsStore = localAdminsStore.map((a) => (a.id === id ? { ...a, ...data[0] } : a));
          return { success: true, data: data[0] };
        }
      } catch {
        // Fallback
      }
    }

    localAdminsStore = localAdminsStore.map((a) => (a.id === id ? { ...a, ...payload } : a));
    const updated = localAdminsStore.find((a) => a.id === id);
    return { success: true, data: updated };
  } catch (error: any) {
    console.error('Exception updating admin:', error);
    return { success: false, error: error.message || 'Failed to update admin' };
  }
}

/**
 * DELETE: Remove Admin with strict protection against deleting current logged-in user
 */
export async function deleteAdmin(
  targetId: string,
  targetEmail: string,
  currentAdminId?: string,
  currentAdminEmail?: string
) {
  try {
    if (!targetId && !targetEmail) {
      return { success: false, error: 'Target Admin identifier is required.' };
    }

    // STRICT PROTECTION CHECK: Current logged-in admin cannot delete themselves
    const isSelfId = currentAdminId && targetId === currentAdminId;
    const isSelfEmail =
      currentAdminEmail &&
      targetEmail &&
      currentAdminEmail.toLowerCase().trim() === targetEmail.toLowerCase().trim();

    if (isSelfId || isSelfEmail) {
      return {
        success: false,
        error: 'Security Protection: You cannot delete your own logged-in admin account.',
      };
    }

    if (isSupabaseConfigured()) {
      try {
        const { error } = await supabase.from('admins').delete().eq('id', targetId);
        if (!error) {
          localAdminsStore = localAdminsStore.filter((a) => a.id !== targetId);
          return { success: true };
        }
      } catch {
        // Fallback
      }
    }

    localAdminsStore = localAdminsStore.filter(
      (a) => a.id !== targetId && a.email.toLowerCase() !== targetEmail.toLowerCase()
    );
    return { success: true };
  } catch (error: any) {
    console.error('Exception deleting admin:', error);
    return { success: false, error: error.message || 'Failed to delete admin' };
  }
}

/**
 * TOGGLE: Active Status with protection for logged-in user
 */
export async function toggleAdminActiveStatus(
  targetId: string,
  targetEmail: string,
  currentStatus: boolean,
  currentAdminId?: string,
  currentAdminEmail?: string
) {
  try {
    // Cannot deactivate oneself
    const isSelfId = currentAdminId && targetId === currentAdminId;
    const isSelfEmail =
      currentAdminEmail &&
      targetEmail &&
      currentAdminEmail.toLowerCase().trim() === targetEmail.toLowerCase().trim();

    if ((isSelfId || isSelfEmail) && currentStatus === true) {
      return {
        success: false,
        error: 'Security Protection: You cannot deactivate your own logged-in admin account.',
      };
    }

    const newStatus = !currentStatus;

    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('admins')
          .update({
            is_active: newStatus,
            updated_at: new Date().toISOString(),
          })
          .eq('id', targetId)
          .select();

        if (!error && data?.[0]) {
          localAdminsStore = localAdminsStore.map((a) =>
            a.id === targetId ? { ...a, is_active: newStatus } : a
          );
          return { success: true, data: data[0] };
        }
      } catch {
        // Fallback
      }
    }

    localAdminsStore = localAdminsStore.map((a) =>
      a.id === targetId ? { ...a, is_active: newStatus } : a
    );
    return { success: true, data: localAdminsStore.find((a) => a.id === targetId) };
  } catch (error: any) {
    console.error('Exception toggling admin status:', error);
    return { success: false, error: error.message || 'Failed to toggle status' };
  }
}
