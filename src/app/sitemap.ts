import type { MetadataRoute } from 'next';
export const dynamic = 'force-static';
import { site } from '@/config/brand';
import { activePackages } from '@/config/packages';

/** Generated at build time from config — new packages appear automatically. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages: Array<[string, number, MetadataRoute.Sitemap[number]['changeFrequency']]> = [
    ['/', 1, 'weekly'],
    ['/packages', 0.9, 'weekly'],
    ['/gallery', 0.6, 'monthly'],
    ['/about', 0.6, 'monthly'],
    ['/contact', 0.7, 'monthly'],
    ['/policies', 0.3, 'yearly'],
  ];
  return [
    ...pages.map(([path, priority, changeFrequency]) => ({ url: `${site.url}${path}`, lastModified: now, changeFrequency, priority })),
    ...activePackages.map((p) => ({ url: `${site.url}/packages/${p.slug}`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.8 })),
  ];
}
