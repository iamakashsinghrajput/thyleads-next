import type { Metadata } from 'next';
import Navbar from '@/components/legacy-home/Navbar';
import Footer from '@/components/Footer';
import '@/components/legacy-home/legacy-home.css';
import { legacyFontVars } from '@/components/legacy-home/fonts';
import DbHero from '@/components/legacy-home/data-building/DbHero';
import Problem from '@/components/legacy-home/data-building/Problem';
import HowItWorks from '@/components/legacy-home/data-building/HowItWorks';
import ProfileSection from '@/components/legacy-home/data-building/ProfileSection';
import Discovery from '@/components/legacy-home/data-building/Discovery';
import BuildWays from '@/components/legacy-home/data-building/BuildWays';
import Research from '@/components/legacy-home/data-building/Research';
import People from '@/components/legacy-home/data-building/People';
import Signals from '@/components/legacy-home/data-building/Signals';
import DbCta from '@/components/legacy-home/data-building/DbCta';

export const metadata: Metadata = {
  title: 'Data Building — Find the Companies and Decision-Makers That Fit | Harvin',
  description:
    'Harvin learns what you sell, who converts and who doesn’t, then discovers, researches and enriches a market around that context — high-fit companies, the right decision-makers, verified contacts and signals.',
  alternates: { canonical: '/data-building' },
  openGraph: {
    title: 'Data Building — Find the Companies and Decision-Makers That Fit | Harvin',
    description:
      'Turn your business context into a sales-ready market: company discovery, research, Company Fit, decision-maker matching and verified email and phone.',
    url: '/data-building',
    images: ['/opengraph-image'],
  },
};

export default function DataBuildingPage() {
  return (
    // Follows the site theme like the homepage: sand in light mode, near-black in
    // dark. The hero is a dark band in both themes, as on the homepage.
    <>
      <div className={`legacy-home ${legacyFontVars}`}>
        <div className="min-h-screen bg-sand-100 transition-colors duration-300 dark:bg-slate-950">
          <Navbar />
          <main>
            <DbHero />
            <Problem />
            <HowItWorks />
            <ProfileSection />
            <Discovery />
            <BuildWays />
            <Research />
            <People />
            <Signals />
            <DbCta />
          </main>
        </div>
      </div>
      {/* Same as the homepage: the site-wide footer sits outside .legacy-home so
          the scoped homepage utilities can't override its layout. */}
      <div className="relative z-10">
        <Footer />
      </div>
    </>
  );
}
