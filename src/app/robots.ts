import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/data/site';

/** Öffentliche Inhalte crawlbar; sensible und interne Bereiche gesperrt; Sitemap verlinkt. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin', '/login', '/account', '/preview', '/debug', '/intern'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
