import { legacyDescription, legacyImageBySlug, legacyProgrammes } from './legacy';
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
  const slug = doc.slug?.current ?? '';
  const description = doc.description ?? [];

  return {
    id: index + 1,
    slug,
    title: doc.title || 'Untitled programme',
    category: doc.category || 'UNCATEGORISED',
    // Sanity thumbnail wins; otherwise use the bundled asset for that programme.
    image: urlForImage(doc.thumbnail) || legacyImageBySlug.get(slug) || '/hero_bg.jpg',
    gallery: [],
    synopsis: doc.summary || '',
    notableCast: doc.hosts || [],
    isFeatured: Boolean(doc.isFeatured),
    description: description.length > 0 ? description : legacyDescription(slug),
  };
}

export async function getAllProgrammes(): Promise<Programme[]> {
  const docs = await sanityFetch<SanityProgramme[]>({
    query: allProgrammesQuery,
    tags: ['programmes'],
  });

  if (!docs?.length) return legacyProgrammes;

  return docs
    .filter((doc) => Boolean(doc.slug?.current))
    .map(mapProgramme);
}

export async function getProgrammeBySlug(slug: string): Promise<Programme | null> {
  const doc = await sanityFetch<SanityProgramme | null>({
    query: programmeBySlugQuery,
    params: { slug },
    tags: ['programmes'],
  });

  if (doc?.slug?.current) return mapProgramme(doc, 0);
  return legacyProgrammes.find((programme) => programme.slug === slug) ?? null;
}

export async function getAllProgrammeSlugs(): Promise<string[]> {
  const slugs = await sanityFetch<string[]>({
    query: allProgrammeSlugsQuery,
    tags: ['programmes'],
  });
  if (!slugs?.length) return legacyProgrammes.map((programme) => programme.slug);
  return slugs.filter(Boolean);
}
