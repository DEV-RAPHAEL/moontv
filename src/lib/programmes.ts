import { allProgrammeSlugsQuery, allProgrammesQuery, programmeBySlugQuery } from './queries';
import { sanityFetch, urlForImage } from './sanity';

export type Programme = {
  id: number;
  slug: string;
  title: string;
  category: string;
  image: string;
  gallery: string[];
  synopsis: string;
  notableCast: string[];
  isFeatured: boolean;
  description: unknown[];
};

type SanityProgramme = {
  title?: string | null;
  slug?: { current?: string | null } | null;
  summary?: string | null;
  description?: unknown[] | null;
  thumbnail?: Parameters<typeof urlForImage>[0] | null;
  category?: string | null;
  hosts?: string[] | null;
  isFeatured?: boolean | null;
};

export function mapProgramme(doc: SanityProgramme, index: number): Programme {
  return {
    id: index + 1,
    slug: doc.slug?.current ?? '',
    title: doc.title || 'Untitled programme',
    category: doc.category || 'UNCATEGORISED',
    image: urlForImage(doc.thumbnail) || '/hero_bg.jpg',
    gallery: [],
    synopsis: doc.summary || '',
    notableCast: doc.hosts || [],
    isFeatured: Boolean(doc.isFeatured),
    description: doc.description || [],
  };
}

export async function getAllProgrammes(): Promise<Programme[]> {
  const docs = await sanityFetch<SanityProgramme[]>({
    query: allProgrammesQuery,
    tags: ['programmes'],
  });

  return (docs ?? [])
    .filter((doc) => Boolean(doc.slug?.current))
    .map(mapProgramme);
}

export async function getProgrammeBySlug(slug: string): Promise<Programme | null> {
  const doc = await sanityFetch<SanityProgramme | null>({
    query: programmeBySlugQuery,
    params: { slug },
    tags: ['programmes'],
  });

  if (!doc?.slug?.current) return null;
  return mapProgramme(doc, 0);
}

export async function getAllProgrammeSlugs(): Promise<string[]> {
  const slugs = await sanityFetch<string[]>({
    query: allProgrammeSlugsQuery,
    tags: ['programmes'],
  });
  return (slugs ?? []).filter(Boolean);
}
