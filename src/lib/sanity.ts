import { createImageUrlBuilder } from '@sanity/image-url';
import { createClient } from 'next-sanity';
import { apiVersion, dataset, isSanityConfigured, projectId } from '@/sanity/env';

export const client = createClient({
  projectId: projectId || 'replace-me',
  dataset,
  apiVersion,
  useCdn: true,
});

const builder = createImageUrlBuilder(client);

export function urlForImage(
  source: Parameters<typeof builder.image>[0] | null | undefined,
) {
  if (!source) return null;
  return builder.image(source).width(1200).height(675).fit('crop').url();
}

type FetchOptions = {
  query: string;
  params?: Record<string, unknown>;
  revalidate?: number;
  tags?: string[];
};

/**
 * Returns null when Sanity is not configured or unreachable so pages can render
 * their empty state instead of crashing.
 */
export async function sanityFetch<T>({
  query,
  params = {},
  revalidate = 60,
  tags = [],
}: FetchOptions): Promise<T | null> {
  if (!isSanityConfigured) return null;

  try {
    return await client.fetch<T>(query, params, {
      next: { revalidate, tags },
    });
  } catch (error) {
    console.error('Sanity fetch failed:', error);
    return null;
  }
}
