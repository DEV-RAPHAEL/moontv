import type { Programme } from './types';

export type TasteCounts = Record<string, number>;

// Stable for one app session: makes cold-start picks random, but stops the rail
// from reshuffling on every re-render.
const SESSION_SALT = Math.random();

function hashJitter(slug: string): number {
  let hash = 2166136261;
  for (let index = 0; index < slug.length; index += 1) {
    hash = Math.imul(hash ^ slug.charCodeAt(index), 16777619);
  }
  return ((hash >>> 0) % 1000) / 1000;
}

function hasArtworkAndSynopsis(programme: Programme): boolean {
  return (
    Boolean(programme.image)
    && !programme.image.endsWith('hero_bg.jpg')
    && programme.synopsis.trim().length > 0
  );
}

/**
 * Favourites and recently opened programmes raise their categories' score.
 * With no history every score is jitter alone, so the list is random.
 */
export function pickForYou(
  programmes: Programme[],
  favorites: string[],
  views: TasteCounts,
  count = 10,
): Programme[] {
  const favouriteSet = new Set(favorites);
  const affinity = new Map<string, number>();
  const bump = (category: string, amount: number) => {
    affinity.set(category, (affinity.get(category) ?? 0) + amount);
  };
  for (const programme of programmes) {
    if (favouriteSet.has(programme.slug)) bump(programme.category, 3);
    const seen = views[programme.slug] ?? 0;
    if (seen) bump(programme.category, Math.min(seen, 3));
  }
  return programmes
    .filter((programme) => hasArtworkAndSynopsis(programme) && !favouriteSet.has(programme.slug))
    .map((programme) => ({
      programme,
      score: (affinity.get(programme.category) ?? 0) + hashJitter(programme.slug + SESSION_SALT),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map((entry) => entry.programme);
}
