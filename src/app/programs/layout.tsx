import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildPageMetadata(
  'Programmes',
  'Explore Moon TV programmes across drama, talk, culture, food and more.',
  '/programs',
);

export default function ProgramsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
