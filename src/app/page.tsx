import { BoldHero } from '@/components/sections/BoldHero';
import { Marquee } from '@/components/ui/Marquee';
import { ServiceRows } from '@/components/sections/ServiceRows';
import { Workflow } from '@/components/sections/Workflow';
import { ProductsSection } from '@/components/sections/ProductsSection';
import { TechSection } from '@/components/sections/TechSection';
import { BrandsPreview } from '@/components/sections/BrandsPreview';
import { Services } from '@/components/sections/Services';
import { AgencyTeaser } from '@/components/sections/AgencyTeaser';
import { Business } from '@/components/sections/Business';
import { About } from '@/components/sections/About';
import { Contact } from '@/components/sections/Contact';

export default function Home() {
  return (
    <>
      <BoldHero />
      <div className="border-y border-line bg-white py-5 sm:py-6">
        <Marquee
          dotClassName="bg-ember rounded-full"
          className="font-display text-[clamp(1.3rem,1rem+1.5vw,2.2rem)] font-extrabold leading-none tracking-tight text-ink"
          items={['Softwareentwicklung', 'Digitale Produkte', 'Webdesign', 'SEO', 'Google Ads', 'Branding', 'Print', 'Bremen']}
        />
      </div>
      <ServiceRows />
      <ProductsSection />
      <BrandsPreview />
      <Services />
      <AgencyTeaser />
      <TechSection />
      <Workflow />
      <Business />
      <About />
      <Contact />
    </>
  );
}
