import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildPageMetadata(
  'Advertise With Us',
  'Advertise on Moon TV and reach a national audience through commercials, sponsorship and digital placements.',
  '/advertise',
);

export default function AdvertiseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
