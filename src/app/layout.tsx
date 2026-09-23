import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Geist, Geist_Mono, Instrument_Serif } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/layout/Providers';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { SmoothScroll } from '@/components/layout/SmoothScroll';
import { Cursor } from '@/components/layout/Cursor';
import { ScrollProgress } from '@/components/layout/ScrollProgress';
import { JsonLd } from '@/components/ui/JsonLd';
import { SEO, organizationSchema } from '@/lib/seo';
import { SITE_URL, company } from '@/data/site';

const geist = Geist({ subsets: ['latin'], variable: '--font-geist', display: 'swap' });
const mono = Geist_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });
const serif = Instrument_Serif({ subsets: ['latin'], weight: '400', style: ['normal', 'italic'], variable: '--font-serif', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SEO.title, template: '%s | MONVEX' },
  description: SEO.description,
  keywords: SEO.keywords,
  applicationName: company.name,
  authors: [{ name: company.legalName }],
  creator: company.legalName,
  publisher: company.legalName,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: SITE_URL,
    siteName: company.name,
    title: SEO.title,
    description: SEO.description,
  },
  twitter: { card: 'summary_large_image', title: SEO.title, description: SEO.description },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: '#F6F5F1',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de" className={`${geist.variable} ${mono.variable} ${serif.variable}`}>
      <body>
        <JsonLd data={organizationSchema()} />
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[400] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-white">
          Zum Inhalt springen
        </a>
        <Providers>
          <SmoothScroll />
          <Cursor />
          <ScrollProgress />
          <Nav />
          <main id="main">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
