import type { Metadata } from 'next';
import { getSiteUrl } from './site';

export function buildPageMetadata(
  title: string,
  description: string,
  path: string,
  image = '/og',
): Metadata {
  const base = getSiteUrl();
  const url = new URL(path, base).toString();
  const images = [{ url: new URL(image, base).toString(), alt: title }];

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
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: images?.map((item) => item.url),
    },
  };
}
