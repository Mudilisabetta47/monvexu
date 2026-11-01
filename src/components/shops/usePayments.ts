'use client';

import { useEffect, useState } from 'react';

type Cfg = { payments: boolean; agbUrl: string; widerrufUrl: string };

/** Fragt zur Laufzeit, ob Online-Bezahlung aktiv ist (Server entscheidet anhand der Umgebungsvariablen). */
export function usePayments(): Cfg & { loaded: boolean } {
  const [cfg, setCfg] = useState<Cfg & { loaded: boolean }>({ payments: false, agbUrl: '', widerrufUrl: '', loaded: false });
  useEffect(() => {
    let live = true;
    fetch('/api/shops/checkout', { cache: 'no-store' })
      .then((r) => (r.ok ? (r.json() as Promise<Cfg>) : null))
      .then((c) => live && setCfg({ ...(c ?? { payments: false, agbUrl: '', widerrufUrl: '' }), loaded: true }))
      .catch(() => live && setCfg((p) => ({ ...p, loaded: true })));
    return () => { live = false; };
  }, []);
  return cfg;
}
