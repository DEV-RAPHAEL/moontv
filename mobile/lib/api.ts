import type {
  Programme,
  ProgrammesResponse,
  ScheduleResponse,
  WeekDay,
} from './types';

const API_URL = process.env.EXPO_PUBLIC_API_URL?.trim().replace(/\/+$/, '');

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

async function getJson<T>(path: string): Promise<T> {
  const response = await fetch(endpoint(path), {
    headers: { Accept: 'application/json' },
  });

  if (!response.ok) {
    let message = `Request failed (${response.status})`;
    try {
      const body = (await response.json()) as { error?: string };
      if (body.error) message = body.error;
    } catch {
      // Non-JSON error body (for example a Next.js HTML error page).
    }
    throw new Error(message);
  }

  return (await response.json()) as T;
}

export async function fetchProgrammes(): Promise<Programme[]> {
  const body = await getJson<ProgrammesResponse>('/api/programmes');
  if ('success' in body && body.success) return body.programmes;
  throw new Error('error' in body ? body.error : 'Unexpected programmes response');
}

export async function fetchProgramme(slug: string): Promise<Programme | null> {
  const programmes = await fetchProgrammes();
  return programmes.find((programme) => programme.slug === slug) ?? null;
}

export async function fetchSchedule(): Promise<ScheduleResponse> {
  return getJson<ScheduleResponse>('/api/schedule');
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
  return `${API_URL}${path.startsWith('/') ? '' : '/'}${path}`;
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
