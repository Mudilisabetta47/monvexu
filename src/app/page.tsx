import dynamic from 'next/dynamic';
import { Hero } from '@/components/sections/Hero';
import { Marquee } from '@/components/ui/Marquee';
import { Ecosystem } from '@/components/sections/Ecosystem';
import { BrandsPreview } from '@/components/sections/BrandsPreview';
import { Services } from '@/components/sections/Services';
import { Process } from '@/components/sections/Process';
import { Business } from '@/components/sections/Business';
import { SelectedWork } from '@/components/sections/SelectedWork';
import { About } from '@/components/sections/About';
import { Contact } from '@/components/sections/Contact';

// Schwerste Sektion (3D, Typing, Graph): eigener Chunk.
const Lab = dynamic(() => import('@/components/sections/Lab').then((m) => m.Lab));

export default function Home() {
  return (
    <>
      <Hero />
      <div className="border-y border-line bg-white/60 py-6 sm:py-8">
        <Marquee
          className="text-[clamp(1.6rem,1rem+2.4vw,3.2rem)] font-semibold tracking-[-0.04em] text-ink"
          items={['Marken', 'Produkte', 'Unternehmen', 'Geschäftsmodelle', 'Digital', 'Technology', 'Travel & Mobility']}
        />
      </div>
      <Ecosystem />
      <BrandsPreview />
      <Services />
      <Process />
      <Business />
      <SelectedWork />
      <Lab />
      <About />
      <Contact />
    </>
  );
}
