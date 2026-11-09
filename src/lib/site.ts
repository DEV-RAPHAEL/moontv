export function getSiteUrl(): string {
  const value = process.env.NEXT_PUBLIC_SITE_URL || 'https://moontvonline.com';

  try {
    return new URL(value).origin;
  } catch {
    return 'https://moontvonline.com';
  }
}
