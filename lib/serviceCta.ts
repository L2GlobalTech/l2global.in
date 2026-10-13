/** Replace empty CMS destinations with the contact page. Preserve configured links. */
export function resolveServiceCta(value?: string | null): string {
  const href = value?.trim();
  return href && href !== '#' ? href : '/contact-us';
}
