import type { Metadata } from 'next';

import JsonLd from '@/components/JsonLd';
import { faqSchema, graph, organizationSchema, softwareSchema, websiteSchema } from '@/lib/schema';
import Navbar from '@/components/Navbar';
import HomeClient from '@/app/HomeClient';
import { HOME_FAQ, HOW_IT_WORKS_STEPS } from '@/app/home-content';
import Faq from '@/components/Faq';
import CtaStartFree from '@/components/CtaStartFree';
import Footer from '@/components/Footer';

/** Copy: harvin-website-copy-handoff.md §4.1. */
export const metadata: Metadata = {
  title: { absolute: 'Harvin.AI: Find the B2B Customers Your Database Misses' },
  description:
    'Harvin finds companies and buyers that databases file under the wrong category, shows why each one fits, and finds their work email and phone. Start free.',
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

const howToSchema = {
  '@type': 'HowTo',
  name: 'How Harvin finds the companies and buyers that fit',
  step: HOW_IT_WORKS_STEPS.map((s, i) => ({ '@type': 'HowToStep', position: i + 1, name: s.name, text: s.text })),
};

export default function Home() {
  return (
    <div className="min-h-screen bg-sand-100 transition-colors duration-300 dark:bg-slate-950">
      {/* Organization/WebSite/SoftwareApplication are declared once, here: every
          other page references these @ids rather than redeclaring the entity.
          Add `offers` to SoftwareApplication only once PRICING_APPROVED. */}
      <JsonLd data={graph(organizationSchema, websiteSchema, softwareSchema, howToSchema, faqSchema(HOME_FAQ))} />
      <Navbar />
      <main>
        <HomeClient />
        <Faq items={HOME_FAQ} />
        <CtaStartFree />
      </main>
      <Footer />
    </div>
  );
}
