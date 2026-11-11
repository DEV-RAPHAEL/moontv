import { beforeEach, describe, expect, it } from 'vitest';
import {
  RATE_LIMIT_MAX,
  RATE_LIMIT_WINDOW_MS,
  getClientIp,
  isRateLimited,
  resetRateLimits,
} from '../src/lib/rate-limit';

beforeEach(() => resetRateLimits());

describe('isRateLimited', () => {
  it('allows requests up to the limit', () => {
    for (let i = 0; i < RATE_LIMIT_MAX; i += 1) {
      expect(isRateLimited('1.2.3.4', 0)).toBe(false);
    }
  });

  it('blocks requests over the limit', () => {
    for (let i = 0; i < RATE_LIMIT_MAX; i += 1) {
      isRateLimited('1.2.3.4', 0);
    }
    expect(isRateLimited('1.2.3.4', 0)).toBe(true);
  });

  it('resets after the window passes', () => {
    for (let i = 0; i < RATE_LIMIT_MAX; i += 1) {
      isRateLimited('1.2.3.4', 0);
    }
    expect(isRateLimited('1.2.3.4', RATE_LIMIT_WINDOW_MS)).toBe(false);
  });

  it('tracks different IPs separately', () => {
    for (let i = 0; i < RATE_LIMIT_MAX; i += 1) {
      isRateLimited('1.2.3.4', 0);
    }
    expect(isRateLimited('5.6.7.8', 0)).toBe(false);
  });
});

describe('getClientIp', () => {
  it('uses the first forwarded address', () => {
    const request = new Request('http://localhost', {
      headers: { 'x-forwarded-for': '1.1.1.1, 2.2.2.2' },
    });
    expect(getClientIp(request)).toBe('1.1.1.1');
  });

  it('falls back to x-real-ip', () => {
    const request = new Request('http://localhost', {
      headers: { 'x-real-ip': '3.3.3.3' },
    });
    expect(getClientIp(request)).toBe('3.3.3.3');
  });

  it('falls back to a shared key when no address is present', () => {
    expect(getClientIp(new Request('http://localhost'))).toBe('unknown');
  });
});
