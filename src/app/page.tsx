import { CivicHero } from '@/components/sections/CivicHero';
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
      <CivicHero />
      <ProductsSection />
      <BrandsPreview />
      <Services />
      <AgencyTeaser />
      <TechSection />
      <Business />
      <About />
      <Contact />
    </>
  );
}
