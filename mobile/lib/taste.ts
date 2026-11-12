import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import type { TasteCounts } from './recommend';

export type { TasteCounts } from './recommend';
export { pickForYou } from './recommend';

const STORAGE_KEY = 'moontv:taste:v1';
const MAX_TRACKED = 200;
const MAX_VIEWS_PER_PROGRAMME = 9;

let cache: TasteCounts | null = null;

function parseCounts(stored: string | null): TasteCounts {
  if (!stored) return {};
  try {
    const parsed: unknown = JSON.parse(stored);
    if (!parsed || typeof parsed !== 'object') return {};
    const counts: TasteCounts = {};
    for (const [slug, value] of Object.entries(parsed)) {
      if (typeof value === 'number' && value > 0) counts[slug] = value;
    }
    return counts;
  } catch {
    return {};
  }
}

async function loadCounts(): Promise<TasteCounts> {
  if (cache) return cache;
  const stored = await AsyncStorage.getItem(STORAGE_KEY).catch(() => null);
  cache = parseCounts(stored);
  return cache;
}

export async function recordProgrammeView(slug: string): Promise<void> {
  const counts = await loadCounts();
  counts[slug] = Math.min((counts[slug] ?? 0) + 1, MAX_VIEWS_PER_PROGRAMME);
  const slugs = Object.keys(counts);
  for (const old of slugs.slice(0, Math.max(0, slugs.length - MAX_TRACKED))) delete counts[old];
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(counts)).catch(() => undefined);
}

export function useTaste(): TasteCounts {
  const [counts, setCounts] = useState<TasteCounts>(cache ?? {});
  useFocusEffect(
    useCallback(() => {
      let active = true;
      cache = null; // re-read so views opened elsewhere show up on return
      loadCounts()
        .then((next) => {
          if (active) setCounts({ ...next });
        })
        .catch(() => undefined);
      return () => {
        active = false;
      };
    }, []),
  );
  return counts;
}
