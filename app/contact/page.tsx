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
    /* Next replaces a parent's `openGraph` wholesale rather than merging
       `images` into it, so every segment that declares its own block has to
       name the card (app/opengraph-image.tsx) again or ship with none. */
    images: ['/opengraph-image'],
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
      <section className="relative overflow-hidden border-b border-slate-200 px-4 pb-16 pt-28 dark:border-white/[0.06] sm:px-6 lg:px-8 lg:pb-20 lg:pt-36">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_70%_at_15%_0%,rgba(201,76,30,0.12),transparent_70%)] dark:bg-[radial-gradient(50%_70%_at_15%_0%,rgba(201,76,30,0.2),transparent_70%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(35,34,32,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(35,34,32,0.045)_1px,transparent_1px)] bg-[size:56px_56px]
                     [mask-image:radial-gradient(60%_80%_at_20%_30%,#000,transparent)]
                     dark:bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)]"
        />
        <div className="relative mx-auto max-w-[1180px]">
          <div className="max-w-[720px]">
            <p className="inline-flex items-center gap-2 rounded-full border border-ember-200 bg-ember-50/80 px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-ember-600 dark:border-ember-500/30 dark:bg-ember-500/10 dark:text-ember-400">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-ember-500" />
              Contact
            </p>
            <h1 className="font-instrument font-semibold mt-6 text-[clamp(36px,5vw,64px)] leading-[1.04] tracking-[-0.035em] text-slate-950 dark:text-white">
              Talk to <span className="text-ember-500">us</span>
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
          <div className="self-start rounded-modal border border-slate-200 bg-sand-50 p-6 shadow-[0_4px_32px_rgba(0,0,0,0.06)] dark:border-white/[0.08] dark:bg-[#0F0E0C] dark:shadow-[0_4px_40px_rgba(0,0,0,0.35)] sm:p-9">
            <h2 className="font-instrument font-semibold text-[22px] tracking-[-0.015em] text-slate-950 dark:text-white">
              Send us a message
            </h2>
            <p className="mb-8 mt-2 text-[14.5px] leading-[1.7] text-slate-600 dark:text-slate-400">
              The more you tell us about the team and the stack, the more useful the first reply is.
            </p>
            <ContactForm />
          </div>

          <div className="lg:pt-9">
            <h2 className="font-instrument font-semibold text-[22px] tracking-[-0.015em] text-slate-950 dark:text-white">
              Or reach us directly
            </h2>

            <dl className="mt-8 border-t border-slate-200 dark:border-white/[0.08]">
              {DETAILS.map(({ Icon, label, lines, href }) => (
                <div key={label} className="flex gap-4 border-b border-slate-200 py-5 dark:border-white/[0.08]">
                  <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-btn bg-ember-500/10 text-ember-500">
                    <Icon size={16} strokeWidth={2} aria-hidden="true" />
                  </span>
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
