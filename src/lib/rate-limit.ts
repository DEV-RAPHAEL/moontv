export const RATE_LIMIT_MAX = 10;
export const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

// shortcut: trusts proxy headers and in-memory state, use a shared store with a trusted IP source if abuse continues
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return request.headers.get('x-real-ip')?.trim() || 'unknown';
}

export function isRateLimited(key: string, now = Date.now()): boolean {
  if (buckets.size > 1000) {
    for (const [bucketKey, bucket] of buckets) {
      if (now >= bucket.resetAt) buckets.delete(bucketKey);
    }
  }

  const bucket = buckets.get(key);
  if (!bucket || now >= bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  bucket.count += 1;
  return bucket.count > RATE_LIMIT_MAX;
}

export function resetRateLimits() {
  buckets.clear();
}
