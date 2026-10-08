import type { Metadata } from 'next';
import { CheckPage } from '@/components/agency/CheckPage';
import { getCheckVariant } from '@/data/check';

const v = getCheckVariant('')!;

// Aktionsseite für Flyer-QR-Codes: nicht indexieren, damit sie nicht mit den Branchenseiten konkurriert.
export const metadata: Metadata = {
  title: v.title,
  description: v.lead,
  alternates: { canonical: '/check' },
  robots: { index: false, follow: false },
};

export default function Check() {
  return <CheckPage v={v} />;
}
