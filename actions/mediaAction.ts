import { supabase, isSupabaseConfigured } from '@/configs/supabase';

export interface UploadMediaResult {
  success: boolean;
  storagePath?: string;
  url?: string;
  data?: {
    id: string;
    url?: string;
    path?: string;
  } | null;
  error?: any;
}

const STORAGE_BUCKET = 'media';

/**
 * Uploads a file to Supabase Storage (or returns a data URL in offline/demo mode)
 */
export async function uploadMedia(
  file: File,
  folder: string = 'general'
): Promise<UploadMediaResult> {
  if (!file) {
    return { success: false, data: null, error: new Error('No file provided') };
  }

  // Clean filename: remove special characters and add timestamp
  const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
  const filePath = `${folder}/${Date.now()}_${cleanName}`;

  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase.storage
        .from(STORAGE_BUCKET)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true,
        });

      if (error) {
        console.error('Supabase storage upload error:', error);
        return { success: false, data: null, error };
      }

      const { data: publicData } = supabase.storage
        .from(STORAGE_BUCKET)
        .getPublicUrl(filePath);

      return {
        success: true,
        storagePath: filePath,
        url: publicData.publicUrl,
        data: {
          id: filePath,
          path: filePath,
          url: publicData.publicUrl,
        },
      };
    } catch (err: any) {
      console.error('Failed to upload file to storage:', err);
      return { success: false, data: null, error: err };
    }
  }

  // Fallback demo/offline mode: convert to base64 Data URL
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve({
        success: true,
        storagePath: filePath,
        url: result,
        data: {
          id: `demo_${Date.now()}_${cleanName}`,
          path: filePath,
          url: result,
        },
      });
    };
    reader.onerror = (err) => {
      resolve({ success: false, data: null, error: err });
    };
    reader.readAsDataURL(file);
  });
}

/**
 * Resolves the public URL for a given media identifier or URL
 */
export function getMediaPublicUrl(
  mediaId: string | null | undefined,
  folder?: string
): string | null {
  if (!mediaId || typeof mediaId !== 'string') return null;
  const clean = mediaId.trim();
  if (!clean) return null;

  // Already a full URL or data URI or local path
  if (
    clean.startsWith('http://') ||
    clean.startsWith('https://') ||
    clean.startsWith('data:') ||
    clean.startsWith('/assets/') ||
    clean.startsWith('/')
  ) {
    return clean;
  }

  if (isSupabaseConfigured()) {
    const fullPath = folder && !clean.includes('/') ? `${folder}/${clean}` : clean;
    const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(fullPath);
    return data.publicUrl;
  }

  return clean;
}

/**
 * Deletes a file from Supabase Storage
 */
export async function deleteMedia(
  mediaId: string | null | undefined,
  folder?: string
): Promise<{ error?: any }> {
  if (!mediaId || typeof mediaId !== 'string') {
    return { error: null };
  }

  // Do not attempt to delete external or local paths
  if (
    mediaId.startsWith('http://') ||
    mediaId.startsWith('https://') ||
    mediaId.startsWith('data:') ||
    mediaId.startsWith('/') ||
    mediaId.startsWith('demo_')
  ) {
    return { error: null };
  }

  if (isSupabaseConfigured()) {
    try {
      const fullPath = folder && !mediaId.includes('/') ? `${folder}/${mediaId}` : mediaId;
      const { error } = await supabase.storage.from(STORAGE_BUCKET).remove([fullPath]);
      if (error) {
        console.error('Supabase storage delete error:', error);
        return { error };
      }
    } catch (err) {
      console.error('Failed to delete media from storage:', err);
      return { error: err };
    }
  }

  return { error: null };
}
