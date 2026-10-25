import type { ReactNode } from 'react';
import { SwNav } from '@/components/software/SwNav';
import { SwFooter } from '@/components/software/SwFooter';
import { SITE_URL } from '@/data/site';
import './software.css';

/**
 * Eigenständiges Layout des Softwarebereichs: eigene Navigation, eigener Footer, eigene Farbwelt.
 * Die MONVEX-Hauptseiten-Hülle wird über <SiteChrome> im Root-Layout für /software ausgeblendet.
 * Links auf die Hauptseite sind absolut (SITE_URL), damit der Bereich auch auf einer Subdomain funktioniert.
 */
export default function SoftwareLayout({ children }: { children: ReactNode }) {
  return (
    <div className="sw">
      <SwNav mainUrl={SITE_URL} />
      <div className="pt-0">{children}</div>
      <SwFooter mainUrl={SITE_URL} />
    </div>
  );
}
