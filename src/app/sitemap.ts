import type { MetadataRoute } from 'next';
import { getAllProgrammeSlugs } from '@/lib/programmes';
import { getSiteUrl } from '@/lib/site';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    '/',
    '/about',
    '/advertise',
    '/contact',
    '/programs',
    '/epg',
    '/watch',
  ].map((path) => ({
    url: new URL(path, base).toString(),
    lastModified,
    changeFrequency: path === '/' ? 'daily' : 'weekly',
    priority: path === '/' ? 1 : 0.7,
  }));

  const slugs = await getAllProgrammeSlugs();
  const programmeRoutes: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: new URL(`/program/${slug}`, base).toString(),
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticRoutes, ...programmeRoutes];
}
