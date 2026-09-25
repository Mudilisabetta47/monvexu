import type { MetadataRoute } from 'next';
import { brands } from '@/data/brands';
import { SITE_URL } from '@/data/site';
import { CONTENT_UPDATED, allAgencyUrls } from '@/data/agency';

/**
 * Dynamische Sitemap. Enthält ausschließlich veröffentlichte, indexierbare Seiten:
 * Branchen und Regionen erscheinen nur, wenn sie eigenen Content besitzen (siehe `publishedRegions`).
 * Keine API-, Admin-, Login- oder Utility-Routen.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = CONTENT_UPDATED;
  return [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE_URL}/brands`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    ...brands.map((b) => ({ url: `${SITE_URL}/brands/${b.slug}`, lastModified, changeFrequency: 'monthly' as const, priority: 0.7 })),
    ...allAgencyUrls().map((u) => ({ url: `${SITE_URL}${u.path}`, lastModified, changeFrequency: u.changeFrequency, priority: u.priority })),
    { url: `${SITE_URL}/impressum`, lastModified, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${SITE_URL}/datenschutz`, lastModified, changeFrequency: 'yearly', priority: 0.2 },
  ];
}
