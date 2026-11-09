import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildPageMetadata(
  'Contact Us',
  'Contact Moon TV with questions, feedback or partnership enquiries.',
  '/contact',
);

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
