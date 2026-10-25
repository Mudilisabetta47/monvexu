import path from 'node:path';
import { fileURLToPath } from 'node:url';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: path.dirname(fileURLToPath(import.meta.url)),
  poweredByHeader: false,
  experimental: { optimizePackageImports: ['lucide-react', 'framer-motion'] },
  /**
   * Optionaler Betrieb des Softwarebereichs auf einer eigenen Subdomain (Host per SOFTWARE_HOST, Standard software.monvex-group.de).
   * Auf der Subdomain wird "/" auf "/software" abgebildet; Pfade unter /software, /api, /_next und statische Dateien bleiben unverändert.
   * Auf der Hauptdomain hat die Regel keine Wirkung. Kanonische URLs zeigen immer auf die Hauptdomain.
   */
  async rewrites() {
    const host = process.env.SOFTWARE_HOST || 'software.monvex-group.de';
    const has = [{ type: 'host', value: host }];
    return {
      beforeFiles: [
        { source: '/', has, destination: '/software' },
        { source: '/:path((?!software|api|_next)(?!.*\\.).*)', has, destination: '/software/:path' },
      ],
    };
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
};

export default nextConfig;
