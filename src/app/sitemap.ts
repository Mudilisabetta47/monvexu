import type { MetadataRoute } from 'next';
import { brands } from '@/data/brands';
import { SITE_URL } from '@/data/site';
import { products } from '@/data/products';
import { CONTENT_UPDATED, allAgencyUrls } from '@/data/agency';
import { categories, softwareProducts, swPath } from '@/data/software';

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
    { url: `${SITE_URL}/produkte`, lastModified, changeFrequency: 'monthly', priority: 0.95 },
    ...products.map((pr) => ({ url: `${SITE_URL}${pr.href}`, lastModified, changeFrequency: 'monthly' as const, priority: 0.9 })),
    ...brands.map((b) => ({ url: `${SITE_URL}/brands/${b.slug}`, lastModified, changeFrequency: 'monthly' as const, priority: 0.7 })),
    { url: `${SITE_URL}${swPath.home}`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}${swPath.catalog}`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}${swPath.request}`, lastModified, changeFrequency: 'yearly', priority: 0.5 },
    ...categories.map((c) => ({ url: `${SITE_URL}${swPath.category(c.slug)}`, lastModified, changeFrequency: 'monthly' as const, priority: 0.7 })),
    ...softwareProducts.map((p) => ({ url: `${SITE_URL}${swPath.product(p.slug)}`, lastModified, changeFrequency: 'monthly' as const, priority: 0.6 })),
    ...allAgencyUrls().map((u) => ({ url: `${SITE_URL}${u.path}`, lastModified, changeFrequency: u.changeFrequency, priority: u.priority })),
    { url: `${SITE_URL}/website-check`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/impressum`, lastModified, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${SITE_URL}/datenschutz`, lastModified, changeFrequency: 'yearly', priority: 0.2 },
  ];
}
