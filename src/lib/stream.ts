export function getStreamUrl(): string | null {
  const value = process.env.NEXT_PUBLIC_STREAM_URL;
  if (!value) return null;

  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:' ? url.toString() : null;
  } catch {
    return null;
  }
}
