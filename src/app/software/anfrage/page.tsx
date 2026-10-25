import { JsonLd } from '@/components/ui/JsonLd';
import { RequestForm } from '@/components/software/RequestForm';
import { SwHead } from '@/components/software/SwUi';
import { SwIcon } from '@/components/software/icons';
import { breadcrumbSchema, swMetadata, webPageSchema } from '@/lib/software-seo';
import { legal } from '@/data/site';

const TITLE = 'Anfrage: Demo, Beratung oder Angebot für Software';
const DESC = 'Demo anfragen, Beratung vereinbaren oder ein Angebot für eine individuelle Software erhalten. MONVEX antwortet persönlich.';
export const metadata = swMetadata({ title: TITLE, description: DESC, path: '/software/anfrage' });

export default function RequestPage() {
  const crumbs = [{ name: 'MONVEX', path: '/' }, { name: 'Software', path: '/software' }, { name: 'Anfrage', path: '/software/anfrage' }];
  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), webPageSchema({ name: TITLE, description: DESC, path: '/software/anfrage' })]} />
      <section className="relative isolate overflow-hidden pb-28 pt-28 sm:pt-32 lg:pt-36">
        <div className="sw-mesh pointer-events-none absolute inset-0 -z-10 opacity-80" />
        <div className="grid-cols-1 mx-auto grid w-full max-w-[1320px] gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.35fr]">
          <div>
            <SwHead eyebrow="Anfrage" h1 title={<>Reden wir <span className="sw-grad-text">über Ihr Vorhaben.</span></>}>
              Demo, Beratung, Angebot oder eine ganz eigene Idee: Schildern Sie uns kurz, worum es geht. Wir antworten persönlich.
            </SwHead>
            <ul className="mt-10 space-y-5">
              {[
                ['ShieldCheck', 'Ehrlich zum Stand', 'Wir sagen offen, was Konzept ist und was es schon gibt.'],
                ['Handshake', 'Persönlich statt automatisch', 'Eine Person aus dem Team meldet sich, kein Verkaufsautomat.'],
                ['Lock', 'Ihre Daten bleiben bei uns', 'Wir nutzen Ihre Angaben nur zur Bearbeitung Ihrer Anfrage.'],
              ].map(([i, t, d]) => (
                <li key={t} className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-sw-indigo/10 text-sw-indigo">
                    <SwIcon name={i} size={21} />
                  </span>
                  <span>
                    <span className="block text-[1.02rem] font-semibold text-sw-ink">{t}</span>
                    <span className="block text-[.92rem] leading-relaxed text-sw-mute">{d}</span>
                  </span>
                </li>
              ))}
            </ul>
            {legal.phone && (
              <p className="mt-10 text-[.95rem] text-sw-mute">
                Lieber telefonisch? <a href={`tel:${legal.phone.replace(/\s/g, '')}`} className="font-semibold text-sw-ink underline underline-offset-4">{legal.phone}</a>
              </p>
            )}
          </div>
          <RequestForm />
        </div>
      </section>
    </>
  );
}
