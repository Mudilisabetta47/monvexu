import { company } from '@/data/site';
import { SplitText } from '@/components/ui/SplitText';
import { Reveal } from '@/components/ui/Reveal';
import { ContactForm } from './ContactForm';

export function Contact() {
  return (
    <section id="kontakt" className="relative py-28 sm:py-40">
      <div className="shell">
        <Reveal>
          <p className="eyebrow flex items-center gap-3">
            <span className="text-ember">09</span>
            <span className="h-px w-10 bg-ink/25" />
            Kontakt
          </p>
        </Reveal>
        <SplitText text={"Have an idea?\nLet's *build* it."} className="mt-6 text-h2 font-semibold" />
        <Reveal delay={0.1}>
          <p className="mt-6 text-[clamp(1.2rem,1rem+1vw,1.8rem)] font-medium tracking-tight text-graphite">Lass uns etwas Großes bauen.</p>
        </Reveal>

        <Reveal className="mt-16 overflow-hidden rounded-[36px] border border-line bg-white p-6 shadow-card sm:p-10 lg:p-14">
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="flex flex-col justify-between gap-12 lg:col-span-4">
              <div>
                <p className="eyebrow">Sitz</p>
                <address className="mt-5 text-[1.1rem] not-italic leading-relaxed">
                  <span className="font-semibold">{company.legalName}</span>
                  <br />
                  {company.address.street}
                  <br />
                  {company.address.zip} {company.address.city}
                  <br />
                  {company.address.country}
                </address>
              </div>
              <div>
                <p className="eyebrow">Für wen</p>
                <p className="mt-5 max-w-xs leading-relaxed text-graphite">
                  Unternehmer, Unternehmen, Geschäftspartner, Marken, Investoren, Dienstleister und Kooperationspartner.
                </p>
              </div>
            </div>
            <div className="lg:col-span-8">
              <ContactForm />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
