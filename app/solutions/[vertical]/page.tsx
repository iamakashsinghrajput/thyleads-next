import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowRight, Check, ShieldCheck, TrendingUp, Users } from 'lucide-react';

import JsonLd from '@/components/JsonLd';
import { breadcrumbSchema, faqSchema, graph } from '@/lib/schema';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CTA from '@/components/CTA';

/**
 * The three vertical pages — /solutions/fintech, /martech, /hrtech.
 *
 * Content is carried over from the thyleads-project site and rebuilt to this
 * design system: beige ground, ember accent, left-aligned section headers, the
 * same rhythm as /platform. One dynamic route rather than three files,
 * because the three pages differ only in copy — a shared shell keeps them from
 * drifting apart the way the originals did (the "Why us" section and the whole
 * CTA were already duplicated verbatim across all three).
 *
 * WHAT WAS DROPPED, and why — restore any of it that you can source:
 *
 *  · The stat blocks (FinTech 30 / 100% / Multi, MarTech 90+ / 30% / 60%,
 *    HRTech 55+ / 4X / 14) carry no attribution on the original pages. Same
 *    for the wall chips ("Inbox: 300+ pitches/mo", "ICP fit < 15%", "Cycle:
 *    4–9 months") and the shared CTA line "Join 70+ SaaS companies".
 *  · The MarTech and HRTech testimonials are initials-only — "Rahul S., VP
 *    Growth, MarTech SaaS" — with no company named, so they cannot be verified
 *    or stood behind. Only FinTech's two are real, named and attributed, and
 *    those are kept.
 *  · The case-study cards for CleverTap and Skillate lead with those dropped
 *    figures, so they went with them.
 *
 * The two quotes were given when the company traded as Thyleads; the company
 * name has been updated to Harvin per the rebrand, and nothing else in them is
 * touched. Do not edit any other word of a quote.
 */

type Vertical = {
  slug: string;
  name: string;
  /** Subject only — app/layout.tsx appends '| Harvin' via the title template.
   *  Including the brand here renders it twice. */
  seoTitle: string;
  seoDesc: string;
  badge: string;
  headline: [string, string];
  sub: string;
  visual: { label: string; rows: { k: string; title: string; detail: string; chip: string }[] };
  realityHead: string;
  realitySub: string;
  walls: { n: string; title: string; body: string }[];
  helpHead: string;
  helpSub: string;
  moves: { tag: string; n: string; title: string; body: string }[];
  faq: { q: string; a: string }[];
  quotes?: { quote: string; name: string; role: string; logo: string; image: string }[];
};

const VERTICALS: Vertical[] = [
  /* ── FinTech ─────────────────────────────────────────────────────────── */
  {
    slug: 'fintech',
    name: 'FinTech',
    seoTitle: 'FinTech SDR Management & Outbound',
    seoDesc:
      'Outbound for FinTech SaaS. We engage decision-makers and move through compliance gates with a FinTech-specialised playbook.',
    badge: 'For FinTech SaaS',
    headline: ['You built FinTech.', "We'll get you past compliance checks."],
    sub: 'Specialised outbound for FinTech that earns replies from CFOs, Heads of Risk and CIOs — then keeps the deal alive through legal, procurement and security review.',
    visual: {
      label: 'How a FinTech deal closes',
      rows: [
        { k: '01', title: 'Risk review', detail: 'Vendor risk committee cleared', chip: 'Cleared' },
        { k: '02', title: 'Legal & compliance', detail: 'SOC 2, RBI, data residency', chip: 'Cleared' },
        { k: '03', title: 'Procurement', detail: 'Contract & SLA approved', chip: 'Cleared' },
        { k: '04', title: 'CFO signs', detail: 'Deal closed · contract live', chip: 'Approved' },
      ],
    },
    realityHead: 'Three walls every FinTech SaaS company hits',
    realitySub:
      "The buying committee is bigger, the compliance bar is higher, and the cycle runs long. Generic SaaS outbound playbooks don't survive contact with a risk officer.",
    walls: [
      {
        n: '01',
        title: 'Compliance slows every deal down',
        body: 'FinTech deals move through risk, legal, security and procurement, each layer adding weeks to the cycle. Without sustained follow-up, most outbound loses momentum long before it reaches the CFO.',
      },
      {
        n: '02',
        title: 'Finding the right ICP feels impossible',
        body: 'Different segments, regulations and use cases make FinTech ICPs hard to define clearly. Without precision, outreach goes to accounts that were never going to convert.',
      },
      {
        n: '03',
        title: 'Long cycles, many stakeholders',
        body: 'A single FinTech deal touches the CFO, CIO, Chief Risk Officer, Head of Compliance, Legal and Procurement, each with different priorities. Buyers are demo-fatigued, decisions drag, and single-threaded outreach dies in the approval chain.',
      },
    ],
    helpHead: 'A FinTech-native outbound engine, built around your buyer',
    helpSub:
      "We've run outbound for FinTech companies across payments, lending, RegTech and core banking. The messaging earns replies from CFOs, CIOs and Heads of Risk.",
    moves: [
      {
        tag: 'FinTech-specialist pods',
        n: '01',
        title: 'Vertical pods that speak finance',
        body: 'Dedicated GTM teams trained on FinTech buyer language: settlement risk, fraud loss, audit cycles, RBI compliance, AML/KYC, reconciliation pain. Your outbound sounds like a peer, not a pitch.',
      },
      {
        tag: 'Intent-led targeting',
        n: '02',
        title: 'Intent-led prospecting, not cold lists',
        body: 'We follow real intent signals to spot when an account moves from exploring to actively looking, so we reach out when it actually matters.',
      },
      {
        tag: 'Multi-threaded outreach',
        n: '03',
        title: 'Reach the whole buying committee',
        body: 'CFO, CIO, CRO, Head of Compliance, Procurement — coordinated multi-channel sequences across the full committee, so the deal keeps moving when one stakeholder goes silent or a new one joins late.',
      },
    ],
    quotes: [
      {
        quote:
          'Harvin qualify, set context, and make sure our sales team walks into calls knowing why the prospect is there and what problem they’re trying to solve.',
        name: 'Umar Salman',
        role: 'Head of Marketing',
        logo: '/logos/tazapay.svg',
        image: '/testimonials/tazapay.png',
      },
      {
        quote:
          'In over a decade of experience in Strategy & Marketing, I have worked with several “Lead Agencies” across a wide spectrum of premium price points. Harvin has outperformed them all in terms of value for money.',
        name: 'Argha Karmakar',
        role: 'GM Marketing',
        logo: '/logos/mynd-dark.svg',
        image: '/testimonials/argha-karmakar.jpg',
      },
    ],
    faq: [
      {
        q: 'How do you write outbound that doesn’t sound like every other “AI fraud detection” pitch?',
        a: 'We build messaging from your actual differentiators: settlement speed, reconciliation depth, compliance posture, or a specific persona pain — dispute volume for payment ops, false-positive rate for risk teams.',
      },
      {
        q: 'FinTech sales cycles run long. How do you keep deals warm that whole time?',
        a: "We run a structured nurture layer that reinforces your positioning at every stage of the buyer's evaluation: post-meeting follow-ups, stakeholder mapping, content drops timed to procurement and risk-review windows. Your name stays in the conversation when the committee finally sits down to decide.",
      },
      {
        q: 'How do you ensure we get qualified, high-intent leads?',
        a: 'We track buying signals and research accounts for real need and compliance fit before outreach. By understanding how financial institutions evaluate risk and vendors, we make sure only serious, qualified opportunities move forward.',
      },
    ],
  },

  /* ── MarTech ─────────────────────────────────────────────────────────── */
  {
    slug: 'martech',
    name: 'MarTech',
    seoTitle: 'MarTech SDR Management & Outbound',
    seoDesc:
      'Outbound for MarTech SaaS. We engage CMOs, cut through the noise, and build high-intent pipeline with a MarTech-specialised playbook.',
    badge: 'For MarTech SaaS',
    headline: ['You built MarTech.', "We'll get past the noise to the right CMOs."],
    sub: 'Specialised outbound for MarTech using vertical-trained pods, signal-driven targeting, and messaging that earns replies from CMOs and growth founders.',
    visual: {
      label: 'What we watch before reaching out',
      rows: [
        { k: '01', title: 'Funding raised', detail: 'New budget lands with the CMO', chip: 'Signal' },
        { k: '02', title: 'Marketing ops hire', detail: 'A stack rebuild usually follows', chip: 'Signal' },
        { k: '03', title: 'Pricing page visit', detail: 'Active evaluation, not research', chip: 'Signal' },
        { k: '04', title: 'Outreach sent', detail: 'Timed to the evaluation window', chip: 'Sent' },
      ],
    },
    realityHead: 'Three walls every MarTech SaaS company hits',
    realitySub:
      'The category is crowded and buyers move fast. Generic outbound burns out before it lands.',
    walls: [
      {
        n: '01',
        title: 'The evaluation window slams shut fast',
        body: 'CMOs move from interested to “next vendor, please” in a couple of weeks if follow-up is slow or the value isn’t reinforced. Most outbound stops at the first meeting — by the time your AE circles back, the CMO has already shortlisted someone else.',
      },
      {
        n: '02',
        title: 'CMO inboxes are already saturated',
        body: 'Every vendor pitches “AI segmentation” and “personalisation at scale.” CMOs and heads of growth ignore generic cold email, and your SDRs burn weeks trying to break through with copy that sounds like everyone else.',
      },
      {
        n: '03',
        title: 'Long cycles swallow good leads',
        body: 'MarTech deals stretch across months of demos, pilots and stakeholder reviews. Promising conversations go cold between touchpoints, champions leave mid-cycle, and qualified leads quietly slip out of the pipeline while your team chases the next one.',
      },
    ],
    helpHead: 'A MarTech-native outbound engine, built around your buyer',
    helpSub:
      "We've run outbound for MarTech companies across CDPs, attribution, customer engagement and marketing automation. The messaging earns replies from CMOs and founders.",
    moves: [
      {
        tag: 'MarTech-specialist pods',
        n: '01',
        title: 'Vertical pods that speak marketing',
        body: 'Dedicated GTM teams trained on MarTech buyer language: attribution, retention, CAC, LTV, channel ROI, engagement. Your outbound sounds like a peer, not a pitch.',
      },
      {
        tag: 'Intent-led prospecting',
        n: '02',
        title: 'Signal-tracked ICP targeting',
        body: 'We track the buying signals that matter in MarTech and turn them into “why now” triggers. Your outbound lands the week your buyer is actually rethinking their stack, not six months too early or too late.',
      },
      {
        tag: 'Evaluation-window nurture',
        n: '03',
        title: 'Stay top of mind until the decision',
        body: 'Marketing buyers shortlist fast and decide fast. We run a tight post-meeting nurture sequence that reinforces your positioning at every stage of their evaluation, so you’re still in the conversation when they make the call.',
      },
    ],
    faq: [
      {
        q: 'How do you avoid pitching the same “AI-powered outbound” every other vendor uses?',
        a: 'We start by understanding your ICP, their intent signals, and when they’re actually ready to engage. Then we combine AI agents and dedicated GTM engineers to write messaging tailored to your product and audience, rather than generic outreach.',
      },
      {
        q: 'Do you guarantee exclusivity within MarTech sub-categories?',
        a: 'Yes. We don’t run outbound for two directly competing MarTech products at the same time. If we’re working with you on customer engagement, we won’t take on a competing CEP. This is core to how we operate across every vertical.',
      },
      {
        q: 'How do you ensure we get qualified, high-intent leads?',
        a: 'We track buying signals and research accounts across channels to identify teams actively evaluating MarTech. By understanding how marketing leaders think and buy, we make sure only relevant opportunities reach your team.',
      },
    ],
  },

  /* ── HRTech ──────────────────────────────────────────────────────────── */
  {
    slug: 'hrtech',
    name: 'HRTech',
    seoTitle: 'HRTech SDR Management & Outbound',
    seoDesc:
      'Outbound for HRTech SaaS. We generate pipeline, engage CHROs, and scale enterprise sales with an HRTech-specialised playbook.',
    badge: 'For HRTech SaaS',
    headline: ['You built HRTech.', "We'll get it in front of the right buyers."],
    sub: 'Specialised outbound for HRTech that lands in CHRO inboxes and keeps multi-stakeholder deals moving.',
    visual: {
      label: 'The buying committee we work',
      rows: [
        { k: 'CH', title: 'CHRO', detail: 'Budget holder', chip: 'Engaged' },
        { k: 'VP', title: 'VP People', detail: 'Process owner', chip: 'Engaged' },
        { k: 'CF', title: 'CFO', detail: 'ROI approver', chip: 'Engaged' },
        { k: 'CI', title: 'CIO', detail: 'Security check', chip: 'Engaged' },
      ],
    },
    realityHead: 'Three walls every HRTech SaaS company hits',
    realitySub:
      "The buying committee is sprawling and HR teams are fatigued by demos. Generic playbooks built for CRM or DevTools don't translate.",
    walls: [
      {
        n: '01',
        title: 'Finding the right ICP feels impossible',
        body: 'Not every HR team is a real buyer, even when they look like one. Without a defined ICP, your team ends up chasing leads that go nowhere.',
      },
      {
        n: '02',
        title: 'HR inboxes are already saturated',
        body: 'Every HRTech company pitches “AI-powered HR.” HR leaders ignore generic cold email, and your SDRs burn cycles trying to break through with messaging that sounds like everyone else.',
      },
      {
        n: '03',
        title: 'Long cycles, many stakeholders',
        body: 'A single HRTech deal touches the CHRO, CEO, HR managers and CIO, each with different priorities. Buyers are demo-fatigued, decisions drag, and single-threaded outreach dies in the approval chain.',
      },
    ],
    helpHead: 'An HRTech-native outbound engine, built around your buyer',
    helpSub:
      "We've run outbound for HRTech companies across performance, talent acquisition and L&D. The messaging earns replies from CHROs and VPs of People.",
    moves: [
      {
        tag: 'HR-specialist pods',
        n: '01',
        title: 'Vertical pods that speak HR',
        body: 'Dedicated GTM teams trained on HRTech buyer language: compliance pain, hiring freezes, attrition spikes. Your outbound sounds like a peer, not a pitch.',
      },
      {
        tag: 'Intent-led targeting',
        n: '02',
        title: 'Hiring and tech signals as intent',
        body: 'We track growth signals — leadership changes, funding rounds, tech-stack shifts — to find the “why now” moment that triggers outreach.',
      },
      {
        tag: 'Multi-threaded outreach',
        n: '03',
        title: 'Reach the whole buying committee',
        body: 'CHRO, VP People, CFO, CIO — coordinated multi-channel sequences across the full buying group, so deals don’t stall when one stakeholder goes silent.',
      },
    ],
    faq: [
      {
        q: 'How do you stand out in a saturated HRTech market with outbound?',
        a: 'We start by understanding your ICP, their intent signals, and when they’re actually ready to engage. Then we combine AI agents and dedicated GTM engineers to write messaging tailored to your product and audience, rather than generic outreach.',
      },
      {
        q: 'Do you guarantee exclusivity within HRTech sub-categories?',
        a: 'Yes. We don’t run outbound for two directly competing HRTech products at the same time. If we’re working with you on payroll, we won’t take on a competing payroll SaaS. This is core to how we operate across every vertical.',
      },
      {
        q: 'How do you ensure we get qualified, high-intent leads?',
        a: 'We qualify using a multi-channel approach that combines intent signals, market research and deep ICP understanding. Our HRTech pods know how HR leaders behave, so only relevant, high-fit opportunities reach your pipeline.',
      },
    ],
  },
];

/** Shared across all three, so the sections stay in one voice. */
const WHY_PILLS = [
  { Icon: TrendingUp, label: 'Experience that drives better sales' },
  { Icon: ShieldCheck, label: 'AI-powered, human-led outbound' },
  { Icon: Users, label: 'We grow when you grow' },
];

const bySlug = (slug: string) => VERTICALS.find((v) => v.slug === slug);

export function generateStaticParams() {
  return VERTICALS.map((v) => ({ vertical: v.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ vertical: string }> }
): Promise<Metadata> {
  const v = bySlug((await params).vertical);
  if (!v) return {};
  return {
    title: v.seoTitle,
    description: v.seoDesc,
    alternates: { canonical: `/solutions/${v.slug}` },
    openGraph: { title: v.seoTitle, description: v.seoDesc, url: `/solutions/${v.slug}` },
  };
}

/* ── Section header, matching /platform's left-aligned rhythm ─────────── */
function SectionHead({ eyebrow, title, sub }: { eyebrow: string; title: string; sub: string }) {
  return (
    <div className="mb-12 max-w-[720px] lg:mb-14">
      <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ember-500">{eyebrow}</p>
      <h2 className="mt-4 text-[clamp(27px,3.2vw,42px)] font-semibold leading-[1.09] tracking-[-0.025em] text-slate-900 dark:text-white">
        {title}
      </h2>
      <p className="mt-5 text-[16px] leading-[1.7] text-slate-600 dark:text-slate-400">{sub}</p>
    </div>
  );
}

export default async function VerticalPage(
  { params }: { params: Promise<{ vertical: string }> }
) {
  const v = bySlug((await params).vertical);
  if (!v) notFound();

  return (
    <div className="min-h-screen bg-sand-100 dark:bg-[#040404]">
      {/* the FAQs marked up here are the ones rendered further down this page —
          never mark up questions a visitor cannot see */}
      <JsonLd
        data={graph(
          faqSchema(v.faq),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Solutions', path: '/solutions' },
            { name: v.name, path: `/solutions/${v.slug}` },
          ])
        )}
      />
      <Navbar />

      {/* ═══ HERO ══════════════════════════════════════════════════════════ */}
      <section className="border-b border-slate-200 px-4 pb-20 pt-28 dark:border-white/[0.06] sm:px-6 lg:px-8 lg:pb-24 lg:pt-32">
        <div className="mx-auto grid max-w-[1180px] items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-ember-500/25 bg-ember-500/[0.07] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-ember-500">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-ember-500" />
              {v.badge}
            </p>

            <h1 className="mt-6 font-bricolage text-[clamp(31px,4.4vw,54px)] font-bold leading-[1.06] tracking-[-0.025em] text-slate-900 dark:text-white">
              {v.headline[0]}
              <br />
              <span className="text-ember-500">{v.headline[1]}</span>
            </h1>

            <p className="mt-6 max-w-[560px] text-[16px] leading-[1.7] text-slate-600 dark:text-slate-400 sm:text-[17px]">
              {v.sub}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#how-we-help"
                className="inline-flex items-center gap-2 rounded-btn bg-ember-500 px-5 py-3 text-[14px] font-semibold text-white shadow-[0_1px_4px_rgba(201,76,30,0.3)] transition-all hover:bg-ember-400 hover:shadow-[0_4px_14px_rgba(201,76,30,0.4)]"
              >
                See how it works
                <ArrowRight size={15} strokeWidth={2.4} />
              </a>
              <a
                href="/platform"
                className="inline-flex items-center rounded-btn border border-slate-300 px-5 py-3 text-[14px] font-semibold text-slate-900 transition-colors hover:border-slate-400 dark:border-white/15 dark:text-white"
              >
                See the platform
              </a>
            </div>
          </div>

          {/* ── The vertical's own shape: gates, signals, or committee ──── */}
          <div className="rounded-2xl border border-slate-200 bg-sand-50 p-5 shadow-[0_18px_44px_rgba(15,23,42,0.08)] dark:border-white/[0.08] dark:bg-white/[0.03] dark:shadow-none sm:p-6">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400 dark:text-slate-500">
              {v.visual.label}
            </p>

            <div className="mt-4 space-y-2.5">
              {v.visual.rows.map((r, i) => (
                <div key={r.title} className="relative">
                  {i > 0 && (
                    <span
                      aria-hidden="true"
                      className="absolute -top-2.5 left-[22px] h-2.5 w-px bg-slate-200 dark:bg-white/10"
                    />
                  )}
                  <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2.5 dark:border-white/10 dark:bg-white/[0.05]">
                    <span className="grid h-[26px] w-[26px] flex-shrink-0 place-items-center rounded-lg bg-ember-500/[0.12] font-mono text-[10px] font-bold text-ember-500">
                      {r.k}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[13px] font-bold text-slate-900 dark:text-white">{r.title}</p>
                      <p className="truncate text-[11.5px] text-slate-500 dark:text-slate-400">{r.detail}</p>
                    </div>
                    <span className="flex flex-shrink-0 items-center gap-1 rounded-full bg-emerald-50 px-2 py-[3px] text-[10.5px] font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                      <Check size={9} strokeWidth={3.4} />
                      {r.chip}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ THE REALITY ═══════════════════════════════════════════════════ */}
      <section className="border-b border-slate-200 px-4 py-20 dark:border-white/[0.06] sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-[1180px]">
          <SectionHead eyebrow={`The ${v.name} reality`} title={v.realityHead} sub={v.realitySub} />

          <div className="grid gap-5 md:grid-cols-3 lg:gap-6">
            {v.walls.map((w) => (
              <div
                key={w.n}
                className="rounded-2xl border border-slate-200 bg-white p-7 dark:border-white/[0.08] dark:bg-white/[0.02]"
              >
                <span className="font-mono text-[11px] font-bold tabular-nums text-ember-500">{w.n}</span>
                <h3 className="mt-4 text-[19px] font-bold leading-[1.25] tracking-[-0.015em] text-slate-900 dark:text-white">
                  {w.title}
                </h3>
                <p className="mt-3 text-[14px] leading-[1.65] text-slate-500 dark:text-slate-400">{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ HOW WE HELP ═══════════════════════════════════════════════════ */}
      <section
        id="how-we-help"
        className="scroll-mt-24 border-b border-slate-200 px-4 py-20 dark:border-white/[0.06] sm:px-6 lg:px-8 lg:py-24"
      >
        <div className="mx-auto max-w-[1180px]">
          <SectionHead eyebrow="How Harvin helps" title={v.helpHead} sub={v.helpSub} />

          <div className="border-t border-slate-200 dark:border-white/[0.08]">
            {v.moves.map((m) => (
              <div
                key={m.n}
                className="grid gap-4 border-b border-slate-200 py-8 dark:border-white/[0.08] md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)] md:gap-12 lg:py-10"
              >
                <div>
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-ember-500">
                    {m.n} · {m.tag}
                  </p>
                  <h3 className="mt-3 text-[20px] font-bold leading-[1.25] tracking-[-0.015em] text-slate-900 dark:text-white">
                    {m.title}
                  </h3>
                </div>
                <p className="text-[15px] leading-[1.7] text-slate-600 dark:text-slate-400">{m.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ WHY HARVIN ════════════════════════════════════════════════════ */}
      <section className="border-b border-slate-200 px-4 py-20 dark:border-white/[0.06] sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-[1180px] gap-10 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ember-500">Why Harvin</p>
            <h2 className="mt-4 text-[clamp(27px,3.2vw,40px)] font-semibold leading-[1.09] tracking-[-0.025em] text-slate-900 dark:text-white">
              The outbound partner that learns your {v.name} category first
            </h2>
            <p className="mt-5 text-[16px] leading-[1.7] text-slate-600 dark:text-slate-400">
              We&rsquo;ve been on the other side of the table. We combine AI-powered targeting with GTM
              engineers, account managers and content researchers, and we invest in learning your
              product, ICP and goals so our growth is tied to yours.
            </p>
          </div>

          <div className="space-y-3">
            {WHY_PILLS.map(({ Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-4 dark:border-white/[0.08] dark:bg-white/[0.02]"
              >
                <span className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl bg-ember-500/[0.12]">
                  <Icon size={18} strokeWidth={2} className="text-ember-500" />
                </span>
                <p className="text-[15px] font-semibold tracking-[-0.01em] text-slate-900 dark:text-white">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PROOF — only where the quotes are real and attributed ═════════ */}
      {v.quotes && (
        <section className="border-b border-slate-200 px-4 py-20 dark:border-white/[0.06] sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-[1180px]">
            <SectionHead
              eyebrow="What teams say"
              title={`${v.name} leaders trust us to open the right doors`}
              sub="Named, attributed and reproduced word for word."
            />

            <div className="grid gap-5 md:grid-cols-2 lg:gap-6">
              {v.quotes.map((q) => (
                <figure
                  key={q.name}
                  className="flex flex-col rounded-2xl border border-slate-200 bg-white p-7 dark:border-white/[0.08] dark:bg-white/[0.02]"
                >
                  <blockquote className="flex-1 text-[16px] leading-[1.65] text-slate-700 dark:text-slate-200">
                    {q.quote}
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 border-t border-slate-200 pt-5 dark:border-white/[0.08]">
                    <img src={q.image} alt="" aria-hidden="true" className="h-11 w-11 flex-shrink-0 rounded-full object-cover" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[14px] font-bold text-slate-900 dark:text-white">{q.name}</p>
                      <p className="truncate text-[12.5px] text-slate-500 dark:text-slate-400">{q.role}</p>
                    </div>
                    <img src={q.logo} alt="" aria-hidden="true" className="h-6 w-auto flex-shrink-0 object-contain" />
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ FAQ ═══════════════════════════════════════════════════════════ */}
      <section className="border-b border-slate-200 px-4 py-20 dark:border-white/[0.06] sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-[1180px]">
          <SectionHead
            eyebrow="FAQ"
            title={`What ${v.name} founders ask us first`}
            sub={`The questions that come up on every ${v.name} discovery call.`}
          />

          <div className="border-t border-slate-200 dark:border-white/[0.08]">
            {v.faq.map((f) => (
              <div
                key={f.q}
                className="grid gap-3 border-b border-slate-200 py-7 dark:border-white/[0.08] md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] md:gap-12"
              >
                <h3 className="text-[16px] font-bold leading-[1.4] tracking-[-0.01em] text-slate-900 dark:text-white">
                  {f.q}
                </h3>
                <p className="text-[15px] leading-[1.7] text-slate-600 dark:text-slate-400">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
      <Footer />
    </div>
  );
}
