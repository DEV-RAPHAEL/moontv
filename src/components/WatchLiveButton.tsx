import Link from 'next/link';
import { getStreamUrl } from '@/lib/stream';

export default function WatchLiveButton({
  className = 'btn btn-green',
  label = 'Watch Live',
}: {
  className?: string;
  label?: string;
}) {
  if (!getStreamUrl()) {
    return (
      <button
        type="button"
        className={className}
        disabled
        title="Live stream is not configured yet"
        style={{ opacity: 0.5, cursor: 'not-allowed' }}
      >
        {label}
      </button>
    );
  }

  return (
    <Link href="/watch" className={className}>
      {label}
    </Link>
  );
}
