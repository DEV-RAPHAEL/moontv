import type { Metadata } from 'next';
import { getSiteUrl } from './site';

export function buildPageMetadata(
  title: string,
  description: string,
  path: string,
  image = '/hero_bg.jpg',
): Metadata {
  const base = getSiteUrl();
  const url = new URL(path, base).toString();
  const imageUrl = new URL(image, base).toString();

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Moon TV',
      type: 'website',
      images: [{ url: imageUrl, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}
