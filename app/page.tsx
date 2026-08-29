import type { Metadata } from 'next';

import JsonLd from '@/components/JsonLd';
import { graph, organizationSchema, softwareSchema, websiteSchema } from '@/lib/schema';
import Navbar      from '@/components/Navbar';
import Hero        from '@/components/Hero';
import HowItWorks  from '@/components/HowItWorks';
import SdrProblem  from '@/components/SdrProblem';
import SdrStory    from '@/components/SdrStory';
import TheData     from '@/components/TheData';
import Platform    from '@/components/Platform';
import Testimonials from '@/components/Testimonials';
import CTA         from '@/components/CTA';
import Footer      from '@/components/Footer';

/** The homepage keeps the root title verbatim rather than templating the brand
 *  on twice; everything else here narrows the root defaults. */
export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-sand-100 dark:bg-slate-950 transition-colors duration-300">
      {/* Declared once, here: every other page references these @ids rather
          than redeclaring the entity. */}
      <JsonLd data={graph(organizationSchema, websiteSchema, softwareSchema)} />
      <Navbar />
      <div>
        <Hero />
        {/* <HowItWorks /> */}
        <SdrProblem />
        <SdrStory />
        <TheData />
        <Platform />
        <Testimonials />
        {/* rides up over the sticky testimonials — the parallax reveal */}
        <div className="relative z-10">
          <CTA />
        </div>
      </div>
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
