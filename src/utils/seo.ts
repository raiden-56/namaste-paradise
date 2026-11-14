import type { Metadata } from 'next';
import { brand } from '@/config/brand';

/** Per-page metadata with canonical URL and matching Open Graph / Twitter fields. */
export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title: `${title} | ${brand.name}`, description, url: path, type: 'website' },
    twitter: { card: 'summary_large_image', title: `${title} | ${brand.name}`, description },
  };
}
