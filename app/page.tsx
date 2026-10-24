import type { Metadata } from 'next';

import JsonLd from '@/components/JsonLd';
import { graph, organizationSchema, softwareSchema, websiteSchema } from '@/lib/schema';
import Navbar      from '@/components/Navbar';
import Hero from '@/components/Hero';
import SdrProblem from '@/components/SdrProblem';
import WorkspacesSection from '@/components/WorkspacesSection';
import FeatureSection from '@/components/FeatureSection';
import SdrStory from '@/components/SdrStory';
import Testimonials from '@/components/Testimonials';
import HomeFaq from '@/components/HomeFaq';
import TheData from '@/components/TheData';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

/** The homepage keeps the root title verbatim rather than templating the brand
 *  on twice; everything else here narrows the root defaults. */
export const metadata: Metadata = {
  title: 'Harvin — Run your entire SDR operation from one platform',
  description:
    'Harvin brings sales intelligence, sales prospecting, outreach, meetings, and SDR team management into one connected workspace.',
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
        <SdrProblem />
        <WorkspacesSection />
        <FeatureSection />
        <SdrStory />
        <Testimonials />
        <HomeFaq />
        <TheData />
        {/* rides up over TheData's pinned panel — the parallax reveal */}
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
