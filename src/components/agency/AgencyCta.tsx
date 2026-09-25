import { SplitText } from '@/components/ui/SplitText';
import { Reveal } from '@/components/ui/Reveal';
import { ContactForm } from '@/components/sections/ContactForm';
import { company } from '@/data/site';

/** Branchenspezifischer Abschluss mit Formular. `topic` erscheint in der eingehenden Mail. */
export function AgencyCta({ headline, text, topic }: { headline: string; text: string; topic: string }) {
  return (
    <section id="anfrage" className="relative py-20 sm:py-28">
      <div className="shell">
        <div className="overflow-hidden rounded-[36px] border border-line bg-white p-6 shadow-card sm:p-10 lg:p-14">
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="eyebrow flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-ember" />
                Anfrage
              </p>
              <SplitText text={headline} className="mt-5 text-h3 font-semibold !text-[clamp(1.8rem,1.2rem+2.2vw,3rem)] !leading-[1.02]" />
              <Reveal delay={0.1}>
                <p className="mt-5 leading-relaxed text-graphite">{text}</p>
                <address className="mt-8 text-[.95rem] not-italic leading-relaxed text-graphite">
                  <span className="font-semibold text-ink">{company.legalName}</span>
                  <br />
                  {company.address.street}, {company.address.zip} {company.address.city}
                </address>
              </Reveal>
            </div>
            <div className="lg:col-span-7">
              <ContactForm topic={topic} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
