import { afterEach, describe, expect, it, vi } from 'vitest';
import { getStreamUrl } from '../src/lib/stream';

afterEach(() => vi.unstubAllEnvs());

describe('getStreamUrl', () => {
  it('returns null when unset or empty', () => {
    vi.stubEnv('NEXT_PUBLIC_STREAM_URL', '');
    expect(getStreamUrl()).toBeNull();
  });

  it('accepts http and https URLs', () => {
    vi.stubEnv('NEXT_PUBLIC_STREAM_URL', 'https://example.com/embed');
    expect(getStreamUrl()).toBe('https://example.com/embed');

    vi.stubEnv('NEXT_PUBLIC_STREAM_URL', 'http://example.com/live');
    expect(getStreamUrl()).toBe('http://example.com/live');
  });

  it('rejects invalid values and non-http protocols', () => {
    vi.stubEnv('NEXT_PUBLIC_STREAM_URL', 'not a url');
    expect(getStreamUrl()).toBeNull();

    vi.stubEnv('NEXT_PUBLIC_STREAM_URL', 'ftp://example.com/stream');
    expect(getStreamUrl()).toBeNull();
  });
});
