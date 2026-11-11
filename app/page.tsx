import type { Metadata } from 'next';

import JsonLd from '@/components/JsonLd';
import { faqSchema, graph, organizationSchema, softwareSchema, websiteSchema } from '@/lib/schema';
import Navbar from '@/components/Navbar';
import HomeClient from '@/app/HomeClient';
import { HOME_FAQ } from '@/app/home-content';
import Faq from '@/components/Faq';
import CtaStartFree from '@/components/CtaStartFree';
import Footer from '@/components/Footer';

/** Copy: public/Harvin Home Page Content .md. */
export const metadata: Metadata = {
  title: { absolute: 'Harvin.AI: Find the B2B Customers Your Database Misses' },
  description:
    'Tell Harvin what you sell, who buys and what makes a company relevant. Harvin discovers and researches companies traditional database searches miss, then finds the right decision-makers. Start free.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Your best customers are filed under the wrong category',
    description: "Harvin finds them, shows why they fit, and finds the right buyer's work email and phone.",
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Your best customers are filed under the wrong category',
    description: "Harvin finds them, shows why they fit, and finds the right buyer's work email and phone.",
  },
};

export default function Home() {
  return (
    // The home page is always dark (like /pricing, /data-building, /blog, legal): the `dark` class here
    // switches every dark: variant below (Navbar, sections, FAQ, CTA, footer) regardless of the site theme toggle.
    <div className="dark min-h-screen bg-slate-950 text-white [color-scheme:dark]">
      {/* Organization/WebSite/SoftwareApplication are declared once, here: every
          other page references these @ids rather than redeclaring the entity.
          Add `offers` to SoftwareApplication only once PRICING_APPROVED. */}
      <JsonLd data={graph(organizationSchema, websiteSchema, softwareSchema, faqSchema(HOME_FAQ))} />
      <Navbar alwaysDark />
      <main>
        <HomeClient />
        <Faq items={HOME_FAQ} />
        <CtaStartFree />
      </main>
      <Footer />
    </div>
  );
}
