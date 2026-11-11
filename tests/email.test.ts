import { describe, expect, it } from 'vitest';
import { isValidEmail } from '../src/lib/email';

describe('isValidEmail', () => {
  it('accepts typical addresses', () => {
    expect(isValidEmail('hello@moontvonline.com')).toBe(true);
    expect(isValidEmail('a.b+tag@sub.example.co.uk')).toBe(true);
  });

  it('rejects malformed addresses', () => {
    for (const value of ['', 'plain', 'a@b', 'a b@c.com', '@example.com', 'a@.com']) {
      expect(isValidEmail(value)).toBe(false);
    }
  });
});
