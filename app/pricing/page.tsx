import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Bell,
  CalendarClock,
  Check,
  Coins,
  FileSearch,
  Gift,
  Mail,
  Minus,
  PackagePlus,
  RefreshCcw,
  ShieldCheck,
  Users,
} from 'lucide-react';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import Faq from '@/components/Faq';
import PricingPlans from '@/components/PricingPlans';
import CreditCalculator from '@/components/CreditCalculator';
import { BOOK_DEMO_HREF, SITE_URL } from '@/lib/site';
import { ENTITY_SENTENCE, ORG_ID, SITE_ID, breadcrumbSchema, faqSchema, graph } from '@/lib/schema';
import { CREDIT_MENU_GROUPS, FEATURE_TABLE, PLANS, PRICING_APPROVED, WORKED_EXAMPLE } from '@/lib/pricing';

/** Copy: harvin-website-copy-handoff.md §4.8. Every number is PENDING APPROVAL — see lib/pricing.ts. */
export const metadata: Metadata = {
  title: { absolute: 'Harvin.AI Pricing: Start Free, Plans From $99' },
  description:
    'Start free with 250 credits. Plans from $99 a month for 5,000 credits. Pay for company research and contacts, and only when an email or phone is found.',
  alternates: { canonical: '/pricing' },
  openGraph: {
    title: 'Start free. Pay for what Harvin finds.',
    description: 'Plans from $99 a month; contacts charged only when found.',
    url: '/pricing',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Start free. Pay for what Harvin finds.',
    description: 'Plans from $99 a month; contacts charged only when found.',
  },
};

const PRICING_FAQ = [
  {
    q: 'How much does Harvin cost?',
    a: 'Harvin starts free with 250 credits. Paid plans are Starter at $99 a month for 5,000 credits, Growth at $349 for 20,000, Agency at $799 for 50,000, and Enterprise from $12,000 a year. Annual billing saves about 20%. Credits pay for research, fields, contacts and signal monitoring.',
  },
  {
    q: 'What is a credit?',
    a: 'A credit is the unit Harvin uses to charge for work. Researching and scoring a company costs 2 credits, a deep-research field 3, a work email 3 and a phone number 20 when found. Discovery previews and matching up to three decision-makers per company are free.',
  },
  {
    q: "Do I pay if Harvin doesn't find a contact?",
    a: 'No. Emails and phone numbers are charged only when a source in the waterfall returns a qualifying result. If nothing qualifying is found, no credits are used for that lookup.',
  },
  {
    q: 'Do unused credits roll over?',
    a: 'Monthly plan credits roll over for one month, then expire. Annual plans receive all credits at the start of the year. Credit packs last 12 months from purchase.',
  },
  {
    q: 'Is there a free trial?',
    a: 'Yes. The Free plan gives you 250 credits once, discovery previews of 25 companies per search with fit reasons, and 10 free contact reveals. No card is needed.',
  },
  {
    q: 'Which plan should I choose?',
    a: 'Starter suits one SDR or founder. Growth suits a small team that wants shared lists, CRM sync and signals. Agency suits agencies running separate profiles for each client. Enterprise suits larger teams buying credits annually. The credit calculator recommends a plan from your expected monthly work.',
  },
  {
    q: 'Why does Harvin charge for research and not only contacts?',
    a: "Because research is where Harvin does the work other tools don't: finding companies outside your filters, checking the details that decide fit and explaining every score. Charging for it keeps contact prices in line with the market and lets you score companies before paying to reach them.",
  },
  {
    // NEEDS INPUT: cancellation terms.
    q: 'Can I cancel any time?',
    a: 'Monthly plans can be cancelled before the next billing date. See the Refund Policy for details.',
  },
];

const RULES = [
  'Contacts are charged only when found.',
  'Monthly plan credits roll over for one month, then expire.',
  'Annual plans receive all credits up front.',
  'Pack credits expire 12 months after purchase.',
  'Credits are shared by everyone on the account.',
  // NEEDS INPUT: confirm cancellation and proration terms.
  'You can change or cancel your plan at any time; changes apply from the next billing date.',
];

/** Product + Offers only once prices are approved (handoff §4.8 JSON-LD). */
const productSchema = {
  '@type': 'Product',
  name: 'Harvin.AI',
  brand: { '@id': ORG_ID },
  description: ENTITY_SENTENCE,
  offers: PLANS.filter((p) => p.monthly !== null).map((p) => ({
    '@type': 'Offer',
    name: p.name,
    price: String(p.monthly),
    priceCurrency: 'USD',
    ...(p.monthly
      ? {
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: String(p.monthly),
            priceCurrency: 'USD',
            unitText: 'MONTH',
          },
        }
      : {}),
  })),
};

/* ── Shared styles (same language as the homepage) ─────────────────────── */
const SECTION = 'scroll-mt-20 border-b border-slate-200 px-6 py-20 dark:border-white/[0.08] lg:py-24';
const BAND = 'bg-white/60 dark:bg-white/[0.015]';
const WRAP = 'mx-auto max-w-[1180px]';
const H2 =
  'font-instrument font-semibold text-[clamp(30px,3.6vw,46px)] leading-[1.08] tracking-[-0.025em] text-slate-950 dark:text-white';
const LEAD = 'text-[17px] leading-relaxed text-slate-600 dark:text-slate-300';
const SURFACE =
  'rounded-modal border border-slate-200 bg-sand-50 shadow-[0_4px_32px_rgba(0,0,0,0.06)] dark:border-white/[0.08] dark:bg-[#0F0E0C] dark:shadow-[0_4px_40px_rgba(0,0,0,0.35)]';

function Eyebrow({ children, center, dark }: { children: ReactNode; center?: boolean; dark?: boolean }) {
  return (
    <p
      className={[
        'flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em]',
        dark ? 'text-ember-400' : 'text-ember-500 dark:text-ember-400',
        center ? 'justify-center' : '',
      ].join(' ')}
    >
      <span aria-hidden="true" className={`h-px w-6 ${dark ? 'bg-ember-400' : 'bg-ember-500 dark:bg-ember-400'}`} />
      {children}
    </p>
  );
}

const GROUP_ICONS = { free: Gift, research: FileSearch, contacts: Mail, signals: Bell } as const;

const RULE_ICONS = [ShieldCheck, RefreshCcw, CalendarClock, PackagePlus, Users, Coins];

/** Worked-example bar colours, in WORKED_EXAMPLE order. */
const WORKED_COLORS = ['bg-ember-500', 'bg-ember-300', 'bg-slate-950 dark:bg-white'];

const GROWTH_COL = PLANS.findIndex((p) => p.id === 'growth');

export default function PricingPage() {
  const workedTotal = WORKED_EXAMPLE.reduce((sum, r) => sum + r.credits, 0);

  return (
    <div className="min-h-screen bg-sand-100 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white">
      <JsonLd
        data={graph(
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Pricing', path: '/pricing' },
          ]),
          { '@type': 'WebPage', name: 'Harvin.AI Pricing', url: `${SITE_URL}/pricing`, isPartOf: { '@id': SITE_ID } },
          faqSchema(PRICING_FAQ),
          ...(PRICING_APPROVED ? [productSchema] : []),
        )}
      />
      <Navbar />

      <main>
        {/* ═══ Hero + plans ═════════════════════════════════════════════════ */}
        {/* Not id="hero": the Navbar switches to its on-dark styling over any #hero. */}
        <section id="pricing-hero" className="relative overflow-hidden border-b border-slate-200 px-6 pb-20 pt-32 dark:border-white/[0.08] lg:pb-24 lg:pt-40">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_40%_at_50%_0%,rgba(201,76,30,0.14),transparent_70%)] dark:bg-[radial-gradient(55%_40%_at_50%_0%,rgba(201,76,30,0.22),transparent_70%)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(35,34,32,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(35,34,32,0.045)_1px,transparent_1px)] bg-[size:56px_56px]
                       [mask-image:radial-gradient(60%_35%_at_50%_15%,#000,transparent)]
                       dark:bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)]"
          />
          <div className="relative mx-auto max-w-[1240px]">
            <div className="mx-auto max-w-[760px] text-center">
              <span className="inline-flex animate-fade-up items-center gap-2 rounded-full border border-ember-200 bg-ember-50/80 px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-ember-600 dark:border-ember-500/30 dark:bg-ember-500/10 dark:text-ember-300">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-ember-500" />
                Pricing
              </span>
              <h1 className="mt-7 animate-fade-up font-instrument text-[clamp(38px,5.4vw,68px)] font-semibold leading-[1.03] tracking-[-0.035em] text-slate-950 [animation-delay:80ms] [animation-fill-mode:both] dark:text-white">
                Start free. <span className="text-ember-500 dark:text-ember-400">Pay for what Harvin finds.</span>
              </h1>
              <p className="mx-auto mt-6 max-w-[620px] animate-fade-up text-[17px] leading-relaxed text-slate-600 [animation-delay:160ms] [animation-fill-mode:both] dark:text-slate-400 sm:text-[18px]">
                Every plan uses credits. You spend them on the companies Harvin researches and scores, the fields you
                add, and the emails and phone numbers it finds. Contacts are charged only when found.
              </p>
            </div>
            <div className="mt-12 animate-fade-up [animation-delay:240ms] [animation-fill-mode:both]">
              <PricingPlans />
            </div>
          </div>
        </section>

        {/* ═══ Credit menu ══════════════════════════════════════════════════ */}
        <section id="credit-menu" className={`${SECTION} ${BAND}`}>
          <div className={WRAP}>
            <div className="max-w-[720px]">
              <Eyebrow>Credits</Eyebrow>
              <h2 className={`mt-5 ${H2}`}>What do credits pay for?</h2>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {CREDIT_MENU_GROUPS.map((g) => {
                const Icon = GROUP_ICONS[g.id];
                const free = g.id === 'free';
                return (
                  <div
                    key={g.id}
                    className={[
                      'rounded-modal border p-6',
                      free
                        ? 'border-emerald-500/30 bg-emerald-500/[0.05] dark:border-emerald-400/20 dark:bg-emerald-400/[0.04]'
                        : 'border-slate-200 bg-white dark:border-white/[0.08] dark:bg-white/[0.03]',
                    ].join(' ')}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={[
                          'flex h-10 w-10 items-center justify-center rounded-card',
                          free
                            ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400'
                            : 'bg-ember-50 text-ember-500 dark:bg-ember-500/10 dark:text-ember-400',
                        ].join(' ')}
                      >
                        <Icon size={18} aria-hidden="true" />
                      </span>
                      <h3 className="text-[18px] font-bold text-slate-950 dark:text-white">{g.title}</h3>
                    </div>
                    <dl className="mt-5 divide-y divide-slate-200 dark:divide-white/[0.06]">
                      {g.rows.map((row) => (
                        <div key={row.action} className="flex items-start justify-between gap-4 py-3">
                          <dt className="text-[14.5px] leading-relaxed text-slate-700 dark:text-slate-300">{row.action}</dt>
                          <dd
                            className={[
                              'shrink-0 whitespace-nowrap rounded-full px-2.5 py-1 text-[12.5px] font-bold tabular-nums',
                              free
                                ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400'
                                : 'bg-slate-950 text-white dark:bg-white dark:text-slate-950',
                            ].join(' ')}
                          >
                            {row.credits}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══ What $99 buys ════════════════════════════════════════════════ */}
        <section id="worked-example" className={SECTION}>
          <div className={`${WRAP} grid items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16`}>
            <div>
              <Eyebrow>Worked example</Eyebrow>
              <h2 className={`mt-5 ${H2}`}>What does $99 a month buy?</h2>
              <p className={`mt-5 ${LEAD}`}>On Starter, 5,000 credits cover a realistic month for one SDR:</p>
            </div>
            <div className={`${SURFACE} p-6 sm:p-8`}>
              <div className="flex items-baseline justify-between">
                <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">Starter · one month</p>
                <p className="font-instrument text-[32px] font-semibold leading-none tracking-[-0.02em] text-slate-950 dark:text-white">
                  {workedTotal.toLocaleString('en-US')}
                  <span className="ml-1.5 text-[14px] font-normal text-slate-500 dark:text-slate-400">credits</span>
                </p>
              </div>
              <div className="mt-5 flex h-4 gap-1 overflow-hidden rounded-full" aria-hidden="true">
                {WORKED_EXAMPLE.map((r, i) => (
                  <span key={r.work} className={`${WORKED_COLORS[i]} h-full first:rounded-l-full last:rounded-r-full`} style={{ width: `${(r.credits / workedTotal) * 100}%` }} />
                ))}
              </div>
              <table className="mt-6 w-full text-[15px]">
                <caption className="sr-only">Credits used by one SDR on Starter in a month</caption>
                <thead className="sr-only">
                  <tr>
                    <th scope="col">Work</th>
                    <th scope="col">Credits</th>
                  </tr>
                </thead>
                <tbody>
                  {WORKED_EXAMPLE.map((r, i) => (
                    <tr key={r.work} className="border-b border-slate-200 dark:border-white/[0.06]">
                      <td className="py-3 text-slate-700 dark:text-slate-300">
                        <span className="flex items-center gap-3">
                          <span aria-hidden="true" className={`h-2.5 w-2.5 rounded-full ${WORKED_COLORS[i]}`} />
                          {r.work}
                        </span>
                      </td>
                      <td className="py-3 text-right font-semibold tabular-nums text-slate-950 dark:text-white">
                        {r.credits.toLocaleString('en-US')}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td className="pt-4 font-bold text-slate-950 dark:text-white">Total</td>
                    <td className="pt-4 text-right font-bold tabular-nums text-slate-950 dark:text-white">{workedTotal.toLocaleString('en-US')}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ═══ Calculator ═══════════════════════════════════════════════════ */}
        <section id="calculator" className={`${SECTION} ${BAND}`}>
          <div className={WRAP}>
            <div className="mx-auto max-w-[720px] text-center">
              <Eyebrow center>Calculator</Eyebrow>
              <h2 className={`mt-5 ${H2}`}>Estimate your credits</h2>
            </div>
            <div className="mt-12">
              <CreditCalculator />
            </div>
          </div>
        </section>

        {/* ═══ Top-ups + rules ══════════════════════════════════════════════ */}
        <section className={SECTION}>
          <div className={`${WRAP} grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]`}>
            <div id="top-ups" className="relative flex flex-col overflow-hidden rounded-modal bg-gradient-to-br from-ember-500 to-ember-700 p-8 text-white shadow-[0_20px_60px_rgba(201,76,30,0.25)]">
              <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
              <PackagePlus size={26} aria-hidden="true" className="relative text-white/85" />
              <h2 className="relative mt-6 font-instrument text-[clamp(26px,2.8vw,34px)] font-semibold leading-[1.1] tracking-[-0.02em]">
                Need more credits this month?
              </h2>
              <div className="relative mt-6 flex items-end gap-3" aria-hidden="true">
                <span className="font-instrument text-[56px] font-semibold leading-none tracking-[-0.035em]">$59</span>
                <span className="pb-1.5 text-[15px] text-white/80">for 2,500 credits</span>
              </div>
              <p className="relative mt-6 text-[15.5px] leading-relaxed text-white/85">
                Add a credit pack any time: 2,500 credits for $59. Packs last 12 months. If you top up often, upgrading
                your plan costs less per credit.
              </p>
            </div>

            <div id="rules" className={`${SURFACE} p-8`}>
              <h2 className="font-instrument text-[clamp(26px,2.8vw,34px)] font-semibold leading-[1.1] tracking-[-0.02em] text-slate-950 dark:text-white">
                How credits work
              </h2>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {RULES.map((rule, i) => {
                  const Icon = RULE_ICONS[i] ?? Check;
                  return (
                    <li key={rule} className="flex gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-btn bg-ember-50 text-ember-500 dark:bg-ember-500/10 dark:text-ember-400">
                        <Icon size={16} aria-hidden="true" />
                      </span>
                      <span className="pt-1 text-[14.5px] leading-relaxed text-slate-700 dark:text-slate-300">{rule}</span>
                    </li>
                  );
                })}
              </ul>
              <Link
                href="/refund"
                className="group mt-6 inline-flex items-center gap-1.5 text-[14px] font-semibold text-ember-500 hover:text-ember-400 dark:text-ember-400 dark:hover:text-ember-300"
              >
                Refund Policy
                <ArrowRight size={14} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* ═══ Feature table ════════════════════════════════════════════════ */}
        <section id="feature-table" className={`${SECTION} ${BAND}`}>
          <div className={WRAP}>
            <div className="max-w-[720px]">
              <Eyebrow>Compare</Eyebrow>
              <h2 className={`mt-5 ${H2}`}>Compare plans</h2>
            </div>
            <div className={`${SURFACE} mt-12 overflow-x-auto`}>
              <table className="w-full min-w-[820px] border-collapse text-[14.5px]">
                <thead>
                  <tr>
                    <th scope="col" className="sticky left-0 z-10 bg-sand-50 px-6 py-5 text-left text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:bg-[#0F0E0C] dark:text-slate-400">
                      Feature
                    </th>
                    {PLANS.map((p, i) => (
                      <th
                        key={p.id}
                        scope="col"
                        className={`px-4 py-5 text-center ${i === GROWTH_COL ? 'bg-ember-500/[0.07] dark:bg-ember-500/[0.1]' : ''}`}
                      >
                        <span className="block font-instrument text-[17px] font-semibold text-slate-950 dark:text-white">{p.name}</span>
                        <span className="mt-0.5 block text-[12.5px] font-normal text-slate-500 dark:text-slate-400">
                          {p.monthly === null ? 'Custom' : p.monthly === 0 ? '$0' : `$${p.monthly}/mo`}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {FEATURE_TABLE.map((row) => (
                    <tr key={row.feature} className="group border-t border-slate-200 dark:border-white/[0.06]">
                      <th
                        scope="row"
                        className="sticky left-0 z-10 bg-sand-50 px-6 py-3.5 text-left font-medium text-slate-800 transition-colors group-hover:bg-white dark:bg-[#0F0E0C] dark:text-slate-200 dark:group-hover:bg-[#151412]"
                      >
                        {row.feature}
                      </th>
                      {row.cells.map((cell, i) => (
                        <td
                          key={PLANS[i].id}
                          className={`px-4 py-3.5 text-center transition-colors group-hover:bg-white/70 dark:group-hover:bg-white/[0.02] ${i === GROWTH_COL ? 'bg-ember-500/[0.07] dark:bg-ember-500/[0.1]' : ''}`}
                        >
                          {cell === 'Yes' ? (
                            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-ember-500/10 text-ember-500 dark:text-ember-400">
                              <Check size={14} strokeWidth={3} aria-label="Included" />
                            </span>
                          ) : cell === '–' ? (
                            <Minus size={16} className="mx-auto text-slate-300 dark:text-slate-600" aria-label="Not included" />
                          ) : (
                            <span className="text-[13.5px] font-semibold text-slate-800 dark:text-slate-200">{cell}</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <Faq items={PRICING_FAQ} />

        {/* ═══ Enterprise CTA ═══════════════════════════════════════════════ */}
        <section id="enterprise-cta" className="relative overflow-hidden bg-[#0C0B09] px-6 py-24 text-white">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_70%_at_85%_50%,rgba(201,76,30,0.25),transparent_70%)]" />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(60%_80%_at_80%_50%,#000,transparent)]"
          />
          <div className={`relative ${WRAP} grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-center`}>
            <div>
              <Eyebrow dark>Enterprise</Eyebrow>
              <h2 className="mt-5 font-instrument text-[clamp(30px,3.6vw,46px)] font-semibold leading-[1.08] tracking-[-0.025em]">
                Buying for a larger team?
              </h2>
              <p className="mt-5 max-w-[580px] text-[17px] leading-relaxed text-white/70">
                Enterprise gives you annual credits, SSO, guided onboarding and your first list built with our team.
                Bring one market and we&rsquo;ll show you what Harvin finds.
              </p>
              <Link
                href={BOOK_DEMO_HREF}
                className="group mt-8 inline-flex items-center justify-center gap-2 rounded-btn bg-ember-500 px-6 py-3.5 text-[15px] font-semibold text-white transition-all duration-150
                           shadow-[0_1px_4px_rgba(201,76,30,0.3)] hover:bg-ember-400 hover:shadow-[0_4px_14px_rgba(201,76,30,0.4)]
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300"
              >
                Talk to sales
                <ArrowRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2" aria-hidden="true">
              {['Annual credits', 'SSO', 'Guided onboarding', 'First list built with you'].map((f) => (
                <li key={f} className="flex items-center gap-3 rounded-card border border-white/[0.1] bg-white/[0.04] px-4 py-4 text-[14.5px] font-semibold">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ember-500">
                    <Check size={13} strokeWidth={3} />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
