import { programmes } from '../../scripts/legacy-programmes';
import { legacyDescriptions } from '../../scripts/legacy-descriptions';
import { weeklySchedule } from '../../scripts/legacy-schedule';
import type { Programme } from './programmes';

const descriptionCache = new Map<string, unknown[]>();

/** Portable-text blocks from the batch 1 docx, for programmes that have one. */
export function legacyDescription(slug: string): unknown[] {
  if (!descriptionCache.has(slug)) {
    descriptionCache.set(
      slug,
      (legacyDescriptions[slug] ?? []).map((text) => ({
        _type: 'block',
        children: [{ _type: 'span', text }],
      })),
    );
  }
  return descriptionCache.get(slug) as unknown[];
}

/**
 * Hard-coded catalogue from before Sanity. Used whenever the dataset is
 * missing or empty, so the site always has content.
 */
export const legacyProgrammes: Programme[] = programmes.map((programme) => ({
  ...programme,
  isFeatured: false,
  description: legacyDescription(programme.slug),
}));

export const legacyImageBySlug = new Map(
  programmes.map((programme) => [programme.slug, programme.image]),
);

export { weeklySchedule };
