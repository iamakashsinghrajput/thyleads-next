import type { Metadata } from 'next';
import Link from 'next/link';
import { Building2, Clock, Mail, MapPin } from 'lucide-react';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import { ORG_ID, breadcrumbSchema, graph } from '@/lib/schema';
import { LEGAL_NAME, SITE_URL } from '@/lib/site';
import ContactForm from './ContactForm';

/**
 * The page three blog CTAs and one prose link pointed at for months while it
 * did not exist. Those now point at /platform, but a company with a registered
 * address and a published support address should have somewhere to send people
 * who want to talk — and the trust signals below (legal entity, company
 * number, registered office) are the ones a crawler reads to decide the site
 * belongs to a real business.
 *
 * The form posts to the same handler as the early-access modal; see
 * ./ContactForm.tsx for why this one surfaces failures and the modal does not.
 */

const CONTACT_EMAIL = 'admin@harvin.ai';

export const metadata: Metadata = {
  title: 'Contact Harvin',
  description:
    'Talk to the Harvin team about running your SDR team on one platform — territories, buying-signal priorities, execution and pipeline reporting. We reply within one working day.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact Harvin',
    description:
      'Questions about the platform, a demo, or your SDR team’s setup — reach the team directly.',
    url: '/contact',
  },
};

const DETAILS = [
  {
    Icon: Mail,
    label: 'Email',
    lines: [CONTACT_EMAIL],
    href: `mailto:${CONTACT_EMAIL}`,
  },
  {
    Icon: Clock,
    label: 'Response time',
    lines: ['Within one working day', 'Monday to Friday'],
  },
  {
    Icon: Building2,
    label: 'Registered company',
    lines: [LEGAL_NAME, 'Company number 17080422', 'Registered in England and Wales'],
  },
  {
    Icon: MapPin,
    label: 'Registered office',
    lines: ['124 City Road', 'London EC1V 2NX', 'United Kingdom'],
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-sand-100 dark:bg-[#040404]">
      <JsonLd
        data={graph(
          {
            '@type': 'ContactPage',
            '@id': `${SITE_URL}/contact#page`,
            url: `${SITE_URL}/contact`,
            name: 'Contact Harvin',
            description:
              'Contact the Harvin team about the SDR management platform, a demo, or an existing account.',
            mainEntity: { '@id': ORG_ID },
          },
          /* Same @id as the node the homepage declares, carrying one extra
             property — a graph merge, not a competing Organization. The
             contact point only claims what this page actually offers: email,
             in English, for sales and support. No phone number is listed
             because there is no published one to answer. */
          {
            '@type': 'Organization',
            '@id': ORG_ID,
            contactPoint: {
              '@type': 'ContactPoint',
              contactType: 'sales',
              email: CONTACT_EMAIL,
              availableLanguage: 'English',
              areaServed: 'Worldwide',
            },
          },
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Contact', path: '/contact' },
          ])
        )}
      />
      <Navbar />

      {/* ═══ HEADER ═══════════════════════════════════════════════════════ */}
      <section className="border-b border-slate-200 px-4 pb-14 pt-28 dark:border-white/[0.06] sm:px-6 lg:px-8 lg:pt-32">
        <div className="mx-auto max-w-[1180px]">
          <div className="max-w-[720px]">
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ember-500">
              Contact
            </p>
            <h1 className="mt-4 font-bricolage text-[clamp(31px,4.2vw,50px)] font-bold leading-[1.07] tracking-[-0.025em] text-slate-900 dark:text-white">
              Talk to us
            </h1>
            <p className="mt-6 text-[17px] leading-[1.7] text-slate-600 dark:text-slate-400">
              A demo, a question about how the platform handles your team’s setup, or something
              about an account you already have — it reaches the same small team either way. Tell us
              what you are working with and we will reply within one working day.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ FORM + DETAILS ═══════════════════════════════════════════════ */}
      <section className="border-b border-slate-200 px-4 py-14 dark:border-white/[0.06] sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-[1180px] gap-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-20">
          <div>
            <h2 className="text-[20px] font-bold tracking-[-0.015em] text-slate-900 dark:text-white">
              Send us a message
            </h2>
            <p className="mb-8 mt-2 text-[14.5px] leading-[1.7] text-slate-600 dark:text-slate-400">
              The more you tell us about the team and the stack, the more useful the first reply is.
            </p>
            <ContactForm />
          </div>

          <div>
            <h2 className="text-[20px] font-bold tracking-[-0.015em] text-slate-900 dark:text-white">
              Or reach us directly
            </h2>

            <dl className="mt-8 border-t border-slate-200 dark:border-white/[0.08]">
              {DETAILS.map(({ Icon, label, lines, href }) => (
                <div key={label} className="flex gap-4 border-b border-slate-200 py-5 dark:border-white/[0.08]">
                  <Icon
                    size={17}
                    strokeWidth={2}
                    aria-hidden="true"
                    className="mt-0.5 flex-shrink-0 text-ember-500"
                  />
                  <div className="min-w-0">
                    <dt className="text-[11.5px] font-semibold uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500">
                      {label}
                    </dt>
                    <dd className="mt-1.5 space-y-0.5">
                      {lines.map((line, i) =>
                        href && i === 0 ? (
                          <a
                            key={line}
                            href={href}
                            className="block text-[15px] font-semibold text-ember-600 underline underline-offset-4 transition-colors hover:text-ember-500 dark:text-ember-300 dark:hover:text-ember-200"
                          >
                            {line}
                          </a>
                        ) : (
                          <p
                            key={line}
                            className="text-[14.5px] leading-[1.6] text-slate-600 dark:text-slate-400"
                          >
                            {line}
                          </p>
                        )
                      )}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>

            <p className="mt-8 text-[14.5px] leading-[1.7] text-slate-600 dark:text-slate-400">
              Still deciding whether the category fits your team? Start with{' '}
              <Link
                href="/sdr-management-platform"
                className="font-semibold text-ember-600 underline underline-offset-4 transition-colors hover:text-ember-500 dark:text-ember-300 dark:hover:text-ember-200"
              >
                what an SDR management platform is
              </Link>
              , or walk the modules on the{' '}
              <Link
                href="/platform"
                className="font-semibold text-ember-600 underline underline-offset-4 transition-colors hover:text-ember-500 dark:text-ember-300 dark:hover:text-ember-200"
              >
                platform page
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
