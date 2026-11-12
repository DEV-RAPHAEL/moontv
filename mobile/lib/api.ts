import AsyncStorage from '@react-native-async-storage/async-storage';
import { replaySchedule } from './schedule-now';
import type {
  Programme,
  ProgrammesResponse,
  ScheduleResponse,
  WeekDay,
} from './types';

const API_URL = process.env.EXPO_PUBLIC_API_URL?.trim().replace(/\/+$/, '');
const CACHE_PREFIX = 'moontv:cache:v1:';
const REQUEST_TIMEOUT_MS = 5000;

export function getSiteOrigin(): string | null {
  return API_URL || null;
}

function endpoint(path: string): string {
  if (!API_URL) {
    throw new Error(
      'EXPO_PUBLIC_API_URL is not set. Copy mobile/.env.example to mobile/.env and restart Expo.',
    );
  }
  return `${API_URL}${path}`;
}

class HttpError extends Error {}

async function getJson<T>(path: string): Promise<T> {
  const url = endpoint(path);
  // Without a timeout an offline device can hang the first screen for a minute.
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const response = await fetch(url, {
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    });

    if (!response.ok) {
      let message = `Request failed (${response.status})`;
      try {
        const body = (await response.json()) as { error?: string };
        if (body.error) message = body.error;
      } catch {
        // Non-JSON error body (for example a Next.js HTML error page).
      }
      throw new HttpError(message);
    }

    return (await response.json()) as T;
  } catch (cause) {
    if (cause instanceof HttpError) throw cause;
    // Dead connection, DNS failure or our own timeout: show something human.
    console.warn('Moon TV request failed', cause);
    throw new Error('Check your internet connection, then try again.');
  } finally {
    clearTimeout(timer);
  }
}

// Last good response per endpoint, so the app opens on a dead connection.
async function withCache<T>(key: string, load: () => Promise<T>): Promise<{ data: T; cached: boolean }> {
  try {
    const data = await load();
    await AsyncStorage.setItem(CACHE_PREFIX + key, JSON.stringify(data)).catch(() => undefined);
    return { data, cached: false };
  } catch (cause) {
    const stored = await AsyncStorage.getItem(CACHE_PREFIX + key).catch(() => null);
    if (stored) {
      try {
        return { data: JSON.parse(stored) as T, cached: true };
      } catch {
        // Corrupt cache: fall through to the real error.
      }
    }
    throw cause;
  }
}

export async function fetchProgrammes(): Promise<Programme[]> {
  const { data: body } = await withCache('programmes', () =>
    getJson<ProgrammesResponse>('/api/programmes'),
  );
  if ('success' in body && body.success) return body.programmes;
  throw new Error('error' in body ? body.error : 'Unexpected programmes response');
}

export async function fetchProgramme(slug: string): Promise<Programme | null> {
  const programmes = await fetchProgrammes();
  return programmes.find((programme) => programme.slug === slug) ?? null;
}

export async function fetchSchedule(includeWeek = false): Promise<ScheduleResponse> {
  const { data, cached } = await withCache(`schedule:${includeWeek ? 'week' : 'day'}`, () =>
    getJson<ScheduleResponse>(`/api/schedule${includeWeek ? '?includeWeek=true' : ''}`),
  );
  return cached ? replaySchedule(data) : data;
}

export function getStreamUrl(): string | null {
  const value = process.env.EXPO_PUBLIC_STREAM_URL?.trim();
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:' ? value : null;
  } catch {
    return null;
  }
}

// The API usually returns absolute Sanity CDN URLs, but falls back to
// "/hero_bg.jpg" when a programme has no thumbnail.
export function resolveImageUrl(path?: string | null): string | undefined {
  if (!path) return undefined;
  if (/^(https?:|data:|file:)/i.test(path)) return path;
  if (!API_URL) return undefined;
  return `${API_URL}${path.startsWith('/') ? '' : '/'}${encodeURI(path)}`;
}

export function portableTextToPlainText(blocks: unknown[]): string {
  return blocks
    .map((block) => {
      if (!block || typeof block !== 'object') return '';
      const children = (block as { children?: { text?: string }[] }).children;
      return (children ?? []).map((child) => child.text ?? '').join('');
    })
    .filter(Boolean)
    .join('\n\n');
}

export function nigeriaToday(): WeekDay {
  const name = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Africa/Lagos',
    weekday: 'long',
  }).format(new Date());
  return name as WeekDay;
}
