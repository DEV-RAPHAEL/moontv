import { describe, expect, it } from 'vitest';
import { pickForYou } from '../mobile/lib/recommend';
import type { Programme } from '../mobile/lib/types';

const programme = (slug: string, category: string, overrides: Partial<Programme> = {}): Programme => ({
  id: 1,
  slug,
  title: slug,
  category,
  image: `https://example.com/${slug}.jpg`,
  gallery: [],
  synopsis: `About ${slug}.`,
  notableCast: [],
  isFeatured: false,
  description: [],
  ...overrides,
});

describe('picked for you', () => {
  it('only picks shows with artwork and a synopsis', () => {
    const programmes = [
      programme('good', 'Drama'),
      programme('no-image', 'Drama', { image: '' }),
      programme('placeholder', 'Drama', { image: 'https://example.com/hero_bg.jpg' }),
      programme('no-synopsis', 'Drama', { synopsis: '   ' }),
    ];
    const picked = pickForYou(programmes, [], {}, 10);
    expect(picked.map((item) => item.slug)).toEqual(['good']);
  });

  it('is random on a cold start but still returns a full list', () => {
    const programmes = Array.from({ length: 20 }, (_, index) => programme(`show-${index}`, 'Drama'));
    const picked = pickForYou(programmes, [], {}, 10);
    expect(picked).toHaveLength(10);
    expect(new Set(picked.map((item) => item.slug)).size).toBe(10);
  });

  it('ranks favourite and recently opened categories first, and skips favourites', () => {
    const programmes = [
      programme('drama-1', 'Drama'),
      programme('drama-2', 'Drama'),
      programme('drama-3', 'Drama'),
      ...Array.from({ length: 6 }, (_, index) => programme(`comedy-${index}`, 'Comedy')),
    ];
    const byFavourite = pickForYou(programmes, ['drama-1'], {}, 10);
    expect(byFavourite.slice(0, 2).every((item) => item.category === 'Drama')).toBe(true);
    expect(byFavourite.map((item) => item.slug)).not.toContain('drama-1');

    const byViews = pickForYou(programmes, [], { 'comedy-0': 2, 'comedy-1': 1 }, 10);
    expect(byViews[0].category).toBe('Comedy');
  });
});
