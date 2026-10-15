export function canOptimizeServiceImage(src: string): boolean {
  if (src.startsWith('/') && !src.startsWith('//')) return true;
  const projectUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!projectUrl) return false;
  try {
    const image = new URL(src);
    return image.protocol === 'https:' && image.hostname === new URL(projectUrl).hostname &&
      image.pathname.startsWith('/storage/v1/object/public/');
  } catch { return false; }
}
