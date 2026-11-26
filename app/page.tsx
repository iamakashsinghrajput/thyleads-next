import type { Metadata } from 'next';

import JsonLd from '@/components/JsonLd';
import { faqSchema, graph, organizationSchema, softwareSchema, websiteSchema } from '@/lib/schema';
import { HOME_FAQ } from '@/app/home-content';
import Navbar      from '@/components/legacy-home/Navbar';
import Hero        from '@/components/legacy-home/Hero';
import ProductSteps from '@/components/legacy-home/ProductSteps';
import SdrProblem  from '@/components/legacy-home/SdrProblem';
import SdrStory    from '@/components/legacy-home/SdrStory';
import CompanyProfile from '@/components/legacy-home/CompanyProfile';
import CompanyDiscovery from '@/components/legacy-home/CompanyDiscovery';
import ResearchFit from '@/components/legacy-home/ResearchFit';
import PeopleSearch from '@/components/legacy-home/PeopleSearch';
import ContactDetails from '@/components/legacy-home/ContactDetails';
import UploadList from '@/components/legacy-home/UploadList';
import KeepCurrent from '@/components/legacy-home/KeepCurrent';
import PricingTeaser from '@/components/legacy-home/PricingTeaser';
import HomeFaq from '@/components/legacy-home/HomeFaq';
import TheData     from '@/components/legacy-home/TheData';
import Platform    from '@/components/legacy-home/Platform';
import Testimonials from '@/components/legacy-home/Testimonials';
import CTA         from '@/components/legacy-home/CTA';
import Footer      from '@/components/Footer';
import '@/components/legacy-home/legacy-home.css';
import { legacyFontVars } from '@/components/legacy-home/fonts';

/*
 * The homepage deliberately keeps the pre-rebrand design (hero with the man
 * image, testimonial carousel, …) while every other page follows the new brand.
 * Its components live in components/legacy-home, its Tailwind tokens in
 * tailwind.legacy-home.config.ts (scoped to .legacy-home), and its original
 * fonts (components/legacy-home/fonts.ts) are exposed on the .legacy-home
 * wrapper only. The shared navbar (components/Navbar.tsx) uses the same
 * wrapper so it looks identical on every page.
 */

// Same positioning as the site-wide defaults in app/layout.tsx.
const TITLE = 'Harvin AI: Find the B2B Customers Your Database Misses';
const DESCRIPTION =
  'Harvin finds companies and buyers that databases file under the wrong category, shows why each one fits, and finds their work email and phone. Start free.';
const SHARE_DESCRIPTION =
  "Harvin finds them, shows why they fit, and finds the right buyer's work email and phone.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: '/' },
  openGraph: { title: TITLE, description: SHARE_DESCRIPTION, url: '/' },
  twitter: { card: 'summary_large_image', title: TITLE, description: SHARE_DESCRIPTION },
};

export default function Home() {
  return (
    <>
    <div
      className={`legacy-home ${legacyFontVars}`}
    >
      <div className="min-h-screen bg-sand-100 dark:bg-slate-950 transition-colors duration-300">
        {/* Declared once, here: every other page references these @ids rather
            than redeclaring the entity. */}
        <JsonLd data={graph(organizationSchema, websiteSchema, softwareSchema, faqSchema(HOME_FAQ))} />
        <Navbar />
        <div>
          <Hero />
          {/* Problem → mechanism → product → personas → proof → onboarding → ask.
              Onboarding sits late on purpose: "live in three weeks" only means
              something once the reader knows what goes live. */}
          <SdrProblem />
          <CompanyProfile />
          <CompanyDiscovery />
          <ResearchFit />
          <PeopleSearch />
          <ContactDetails />
          <UploadList />
          <KeepCurrent />
          <PricingTeaser />
          <HomeFaq />
          {/* <ProductSteps />
          <Platform />
          <SdrStory />
          <Testimonials />
          <TheData /> */}
          {/* rides up over TheData's pinned panel — the parallax reveal */}
          <div className="relative z-10">
            <CTA />
          </div>
        </div>
      </div>
    </div>
    {/* The site-wide footer sits outside .legacy-home so the homepage's scoped
        utilities can't override its layout. */}
    <div className="relative z-10">
      <Footer />
    </div>
    </>
  );
}
