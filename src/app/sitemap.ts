import type { MetadataRoute } from 'next';
import { brands } from '@/data/brands';
import { SITE_URL } from '@/data/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE_URL}/brands`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    ...brands.map((b) => ({ url: `${SITE_URL}/brands/${b.slug}`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.7 })),
    { url: `${SITE_URL}/impressum`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${SITE_URL}/datenschutz`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
  ];
}
