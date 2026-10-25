'use client';

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Blendet die MONVEX-Hauptseiten-Hülle (Nav, Footer, Cursor, Fortschrittsbalken) im Softwarebereich aus.
 * /software hat eigene Navigation und eigenen Footer (eigenständige Website, später auch als Subdomain betreibbar).
 */
export function SiteChrome({ children }: { children: ReactNode }) {
  const path = usePathname() ?? '';
  if (path === '/software' || path.startsWith('/software/')) return null;
  return <>{children}</>;
}
