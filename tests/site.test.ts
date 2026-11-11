import { afterEach, describe, expect, it, vi } from 'vitest';
import { getSiteUrl } from '../src/lib/site';

afterEach(() => vi.unstubAllEnvs());

describe('getSiteUrl', () => {
  it('falls back to the production domain when unset or empty', () => {
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', '');
    expect(getSiteUrl()).toBe('https://moontvonline.com');
  });

  it('returns the configured origin without a path', () => {
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://example.com/some/path');
    expect(getSiteUrl()).toBe('https://example.com');
  });

  it('falls back when the value is invalid', () => {
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'not a url');
    expect(getSiteUrl()).toBe('https://moontvonline.com');
  });
});
