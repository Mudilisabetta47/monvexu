import type { Metadata } from 'next';
import { ShopOrderForm } from '@/components/shops/ShopOrderForm';
import { agencyMetadata } from '@/lib/agency-seo';

const base = agencyMetadata({ title: 'Shop bestellen', description: 'Paket und Branche wählen, Angaben senden, wir bauen deinen Shopify-Shop.', path: '/shops/bestellen' });
export const metadata: Metadata = { ...base, robots: { index: false, follow: false } };

export default function OrderPage() {
  return (
    <section className="pb-24 pt-32 sm:pt-40">
      <div className="shell max-w-3xl">
        <p className="eyebrow flex items-center gap-3"><span className="h-2 w-2 rounded-full bg-ember" /> Shop bestellen</p>
        <h1 className="mt-6 text-[clamp(2.2rem,1.2rem+4vw,4.4rem)] font-semibold leading-[.95] tracking-[-0.05em]">
          Erzähl uns von <span className="serif-i text-ember">Ihrem Shop.</span>
        </h1>
        <p className="mt-6 max-w-xl text-lead text-graphite">Wir bestätigen deine Bestellung per E-Mail und melden uns mit der Rechnung und den Fragen, die noch offen sind. Bezahlt wird nach unserer Bestätigung.</p>
        <div className="mt-12">
          <ShopOrderForm />
        </div>
      </div>
    </section>
  );
}
