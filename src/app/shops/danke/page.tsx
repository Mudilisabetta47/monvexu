import type { Metadata } from 'next';
import Link from 'next/link';
import { Check, Clock } from 'lucide-react';
import { paymentConfig, stripeBase } from '@/lib/shops-pay';

export const metadata: Metadata = { title: 'Danke für deine Bestellung', robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

async function sessionStatus(id: string | undefined): Promise<'paid' | 'pending' | 'unknown'> {
  const { key } = paymentConfig();
  if (!id || !/^cs_[A-Za-z0-9_]+$/.test(id) || !key) return 'unknown';
  try {
    const res = await fetch(`${stripeBase()}/v1/checkout/sessions/${id}`, { headers: { Authorization: `Bearer ${key}` }, cache: 'no-store' });
    if (!res.ok) return 'unknown';
    const s = (await res.json()) as { payment_status?: string };
    return s.payment_status === 'paid' ? 'paid' : 'pending';
  } catch {
    return 'unknown';
  }
}

export default async function ThanksPage({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) {
  const { session_id } = await searchParams;
  const status = await sessionStatus(session_id);
  return (
    <section className="pb-24 pt-20">
      <div className="shell max-w-2xl">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-ink text-white">{status === 'pending' ? <Clock size={28} /> : <Check size={28} />}</span>
        <h1 className="mt-8 text-[clamp(2rem,1.2rem+3.4vw,3.6rem)] font-semibold leading-[1] tracking-[-0.045em]">
          {status === 'pending' ? 'Deine Zahlung wird noch bestätigt.' : 'Danke, wir legen los!'}
        </h1>
        <p className="mt-5 text-lead text-graphite">
          {status === 'paid' && 'Deine Zahlung ist bei uns angekommen. '}
          {status === 'pending' && 'Sobald die Zahlung bestätigt ist, melden wir uns. Das kann bei manchen Zahlungsarten etwas dauern. '}
          Wir melden uns per E-Mail mit der Bestätigung und den Fragen, die noch offen sind. Danach bauen wir deinen Shop. Unser Richtwert sind 3 bis 5 Werktage nach vollständigen Angaben, ein Festtermin ist das nicht.
        </p>
        <ul className="mt-8 space-y-3 text-[1rem] text-graphite">
          <li className="flex gap-3"><Check size={18} className="mt-1 shrink-0 text-ember" aria-hidden /> Die Rechnung bekommst du von Stripe per E-Mail.</li>
          <li className="flex gap-3"><Check size={18} className="mt-1 shrink-0 text-ember" aria-hidden /> Den Shopify-Tarif schließt du selbst ab, die Anleitung bekommst du mit der Übergabe.</li>
        </ul>
        <Link href="/shops" className="mt-10 inline-block rounded-full bg-ink px-6 py-3 font-medium text-white hover:bg-ember">Zurück zur Übersicht</Link>
      </div>
    </section>
  );
}
