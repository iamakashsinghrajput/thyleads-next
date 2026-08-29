'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CTA from '@/components/CTA';
import { useModal } from '@/components/ModalContext';
import { useRef, useEffect, useState } from 'react';
import {
  Building2, ShoppingBag, Cpu, Briefcase, Target, Users,
} from 'lucide-react';
import PromptFunnel from '@/components/PromptFunnel';
import Platform from '@/components/Platform';
import PlatformFaq from '@/components/PlatformFaq';
import ProductSteps from '@/components/ProductSteps';

/* ── Keyframe styles ─────────────────────────────────────────────────────── */
const pageStyles = `
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50%      { opacity: 0; }
  }
  @keyframes heroGlow {
    0%, 100% { opacity: 0.5; transform: translate(-50%, 0) scale(1); }
    50%      { opacity: 0.8; transform: translate(-50%, 0) scale(1.08); }
  }
  @keyframes floatUp {
    from { opacity: 0; transform: translateY(40px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.92); }
    to   { opacity: 1; transform: scale(1); }
  }
  @keyframes slideInLeft {
    from { opacity: 0; transform: translateX(-30px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes slideInRight {
    from { opacity: 0; transform: translateX(30px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes countReveal {
    from { opacity: 0; transform: translateY(16px) scale(0.9); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }
  @keyframes shimmer {
    0%   { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  @keyframes slideUpFade {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes subtleFadeIn {
    from { opacity: 0; transform: scale(0.985); }
    to   { opacity: 1; transform: scale(1); }
  }
  @keyframes scanSweep {
    0%   { transform: translateY(6%);  }
    46%  { transform: translateY(80%); }
    54%  { transform: translateY(80%); }
    100% { transform: translateY(6%);  }
  }
  @keyframes gradientShift {
    0%, 100% { background-position: 0% 50%; }
    50%      { background-position: 100% 50%; }
  }
  .animate-float-up  { animation: floatUp 0.7s cubic-bezier(0.16,1,0.3,1) both; }
  .animate-scale-in  { animation: scaleIn 0.6s cubic-bezier(0.16,1,0.3,1) both; }
  .animate-slide-left  { animation: slideInLeft 0.65s cubic-bezier(0.16,1,0.3,1) both; }
  .animate-slide-right { animation: slideInRight 0.65s cubic-bezier(0.16,1,0.3,1) both; }
  .animate-count     { animation: countReveal 0.5s cubic-bezier(0.16,1,0.3,1) both; }

  .shimmer-border {
    background: linear-gradient(90deg, transparent 0%, rgba(201,76,30,0.3) 50%, transparent 100%);
    background-size: 200% 100%;
    animation: shimmer 3s ease-in-out infinite;
  }
`;

/* ── Scroll-triggered animation hook ─────────────────────────────────────── */
function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}


/* ── Animated counter hook ───────────────────────────────────────────────── */

/* ── Data ────────────────────────────────────────────────────────────────── */

/**
 * Personas, in parallel structure: what today looks like, what changes, and
 * which modules they actually live in.
 *
 * The old entries carried outcome stats — "3× more qualified meetings",
 * "60% faster ICP matching" — which were invented. They are gone rather than
 * restated; a number on a marketing page reads as measured, and these were not.
 */
const AUDIENCE = [
  {
    n: '01',
    icon: Target,
    role: 'Sales & BDR teams',
    today: 'A cold list, and no idea which of those accounts is in market this week.',
    shift:
      'A shortlist that reorders itself as signals land, so the first call of the day is the best one available — with the evidence for why it ranked.',
    modules: ['AI Signal Detection', 'Watchlists'],
  },
  {
    n: '02',
    icon: Users,
    role: 'Account-based marketing',
    today: 'Target lists built by hand, already stale the week after they ship.',
    shift:
      'Lists seeded from the customers you already won and kept current — look-a-likes, competitor footprints, and accounts entering your category.',
    modules: ['Look-a-like Accounts', 'Account Intelligence'],
  },
  {
    n: '03',
    icon: Briefcase,
    role: 'Revenue & growth leaders',
    today: 'Pipeline reviews assembled from what reps happen to remember.',
    shift:
      'A live view of account movement — funding, hiring, scaling, M&A — so the forecast starts from evidence instead of recall.',
    modules: ['Account Intelligence', 'AI Signal Detection'],
  },
];

/**
 * Three buyer types and the play each one runs.
 *
 * The previous cards ended on an outcome line — "closed 8 deals", "4× pipeline
 * in 60 days", "landed 6 new enterprise clients". None of those are sourced to
 * a real customer, so they are invented results presented as case studies and
 * have been dropped. What replaces them is what the team actually DOES, which
 * is both defensible and more useful to a reader deciding whether the product
 * fits their motion.
 *
 * Find / Watch / Reach is the same order the product works in, so the three
 * cards can be read straight down the column as well as across.
 */
const USE_CASES = [
  {
    icon: Cpu,
    title: 'SaaS & Software Vendors',
    desc: 'Selling platforms, infrastructure or data tools into enterprise accounts, where the buying window opens and closes around a migration.',
    play: [
      ['Find', 'Accounts running a competing tool in your category'],
      ['Watch', 'Infrastructure hiring and funding rounds'],
      ['Reach', 'While the evaluation window is still open'],
    ],
  },
  {
    icon: Building2,
    title: 'Agencies & Consultants',
    desc: 'Growth, GTM and advisory teams pitching retained work, where timing against a funding or leadership change decides the deal.',
    play: [
      ['Find', 'Recently funded accounts in the industries you serve'],
      ['Watch', 'Leadership hires and headcount growth'],
      ['Reach', 'With a proposal shaped to the signal that fired'],
    ],
  },
  {
    icon: ShoppingBag,
    title: 'Services & Solution Providers',
    desc: 'Regional and implementation teams selling into expansion, where the work is won before a vendor shortlist is drawn up.',
    play: [
      ['Find', 'Accounts opening locations or entering new regions'],
      ['Watch', 'Expansion and scaling signals by region'],
      ['Reach', 'Before the shortlist is set'],
    ],
  },
];


/* ── HIW Animated Visuals ─────────────────────────────────────────────── */





/* ── HIW Steps data ──────────────────────────────────────────────────────── */

/* ── HIW Step component — content left, animated visual right ────────────── */

/* ── Audience card with own scroll trigger ───────────────────────────────── */
function AudienceRow({ item, index }: { item: typeof AUDIENCE[0]; index: number }) {
  const reveal = useReveal(0.15);

  return (
    <div
      ref={reveal.ref}
      className={`group grid gap-6 border-b border-slate-200 py-9 transition-all duration-700
                  dark:border-white/[0.08] md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.35fr)] md:gap-12 lg:py-11
                  ${reveal.visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}
      style={{ transitionDelay: `${index * 110}ms` }}
    >
      {/* index · icon · role */}
      <div className="flex items-start gap-4">
        <span className="font-mono text-[12px] font-semibold tabular-nums text-ember-500">{item.n}</span>
        <span className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-xl bg-ember-50 transition-colors duration-300 group-hover:bg-ember-100 dark:bg-ember-500/15">
          <item.icon size={20} className="text-ember-500" strokeWidth={1.9} />
        </span>
        <h3 className="mt-1.5 text-[19px] font-semibold leading-[1.25] tracking-[-0.015em] text-slate-900 dark:text-white sm:text-[21px]">
          {item.role}
        </h3>
      </div>

      {/* the before/after, on one baseline across all three rows */}
      <div>
        <div className="flex gap-3">
          <span className="mt-[7px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-300 dark:bg-white/25" />
          <p className="text-[15px] leading-[1.65] text-slate-500 dark:text-slate-500">{item.today}</p>
        </div>
        <div className="mt-3 flex gap-3">
          <span className="mt-[7px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-ember-500" />
          <p className="text-[15.5px] leading-[1.65] text-slate-800 dark:text-slate-200">{item.shift}</p>
        </div>

        <div className="mt-5 flex flex-wrap gap-2 pl-[18px]">
          {item.modules.map((m) => (
            <span
              key={m}
              className="rounded-full border border-slate-200 bg-sand-50 px-2.5 py-1 text-[11.5px] font-medium text-slate-600
                         dark:border-white/[0.10] dark:bg-white/[0.04] dark:text-slate-300"
            >
              {m}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Use case card with own scroll trigger ───────────────────────────────── */
function UseCaseCard({ uc, index }: { uc: typeof USE_CASES[0]; index: number }) {
  const reveal = useReveal(0.15);

  return (
    <div
      ref={reveal.ref}
      /* slug anchor — the navbar's "For teams" column deep-links to these */
      id={uc.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
      className={`group flex scroll-mt-28 flex-col rounded-2xl border border-slate-200 bg-white p-7 transition-all duration-700
                  hover:border-ember-500/40 hover:shadow-[0_16px_44px_rgba(15,23,42,0.08)]
                  dark:border-white/[0.08] dark:bg-white/[0.02] dark:hover:border-ember-500/40
                  ${reveal.visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
      style={{ transitionDelay: `${index * 110}ms` }}
    >
      <div className="flex items-center gap-3">
        <span className="font-mono text-[11px] font-bold tabular-nums text-ember-500">
          0{index + 1}
        </span>
        <span className="h-px flex-1 bg-slate-200 dark:bg-white/[0.08]" />
        <uc.icon size={17} strokeWidth={1.9} className="flex-shrink-0 text-slate-400 dark:text-slate-500" />
      </div>

      <h3 className="mt-5 text-[19px] font-bold leading-[1.25] tracking-[-0.015em] text-slate-900 dark:text-white">
        {uc.title}
      </h3>
      <p className="mt-2.5 text-[14px] leading-[1.65] text-slate-500 dark:text-slate-400">
        {uc.desc}
      </p>

      {/* ── The play, in the order the product runs it ──────────────── */}
      <dl className="mt-6 space-y-3 border-t border-slate-200 pt-5 dark:border-white/[0.08]">
        {uc.play.map(([step, detail]) => (
          <div key={step} className="flex gap-3">
            <dt className="w-[46px] flex-shrink-0 pt-[1px] font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-ember-500">
              {step}
            </dt>
            <dd className="min-w-0 flex-1 text-[13px] leading-[1.5] text-slate-700 dark:text-slate-300">
              {detail}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════════════════ */

export default function ProductPage() {
  const [heroEmail, setHeroEmail] = useState('');
  const { openModal } = useModal();

  const heroReveal = useReveal(0.05);
  const audienceHeader = useReveal();
  const useCasesHeader = useReveal();

  /* Hero text animation state */
  const [heroReady, setHeroReady] = useState(false);
  useEffect(() => {
    if (heroReveal.visible) {
      const t = setTimeout(() => setHeroReady(true), 100);
      return () => clearTimeout(t);
    }
  }, [heroReveal.visible]);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
      <style>{pageStyles}</style>
      <Navbar />
      <div>

        {/* ═══ HERO ═══════════════════════════════════════════════════════════ */}
        {/* ═══ HERO ═════════════════════════════════════════════════════════
             Always-dark, matching the marketing hero on the home page: same
             #0d0703 ground, same radial wash and grain. Copy sits left, the
             platform illustration right. ─────────────────────────────────── */}
        <section
          ref={heroReveal.ref}
          className="relative isolate overflow-hidden border-b border-slate-200 bg-sand-100 dark:border-white/[0.06] dark:bg-[#040404]"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_24%,rgba(201,76,30,0.07),transparent_45%)] dark:bg-[radial-gradient(circle_at_18%_24%,rgba(201,76,30,0.14),transparent_45%)]"
          />

          <div className="relative z-10 mx-auto grid max-w-[1340px] items-center gap-8 px-6 pb-[110px] pt-24 lg:grid-cols-[1.18fr_1fr] lg:gap-10 lg:pb-[140px] lg:pt-28">
            {/* ── Copy ─────────────────────────────────────────────────── */}
            <div className="text-left">

              <h1 className="font-bricolage text-[clamp(30px,3.6vw,46px)] font-bold leading-[1.07] tracking-[-0.02em] text-slate-900 dark:text-white">
                <span
                  className={`inline-block transition-all delay-[150ms] duration-700
                             ${heroReady ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}
                >
                  The SDR management platform
                </span>
                <br />
                <span
                  className={`inline-block transition-all delay-[300ms] duration-700
                             ${heroReady ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}
                >
                  built for sales leaders
                </span>
              </h1>

              <p
                className={`mt-5 max-w-[560px] text-[14px] sm:text-[16px] leading-relaxed text-slate-600 dark:text-white/70 transition-all delay-[500ms] duration-700
                           ${heroReady ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}
              >
                Manage reps, territories and account ownership, prioritise every SDR&rsquo;s day from
                live buying signals, run email, calls and tasks in one workflow, and see{' '}
                <em className="font-medium not-italic text-slate-900 dark:text-white">
                  what actually creates pipeline
                </em>{' '}
                — from one platform.
              </p>

              <form
                onSubmit={(e) => { e.preventDefault(); openModal('early-access'); }}
                className={`mt-9 flex w-full max-w-[500px] items-center gap-2 rounded-full bg-white p-1.5 pl-6 dark:bg-[#16130F]
                            border border-slate-200 shadow-[0_10px_36px_rgba(15,23,42,0.10)] dark:border-white/[0.10] transition-all delay-[650ms] duration-700
                            ${heroReady ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}
              >
                <input
                  type="email"
                  value={heroEmail}
                  onChange={(e) => setHeroEmail(e.target.value)}
                  placeholder="Your work email"
                  className="min-w-0 flex-1 bg-transparent text-[15px] text-slate-800 outline-none placeholder:text-slate-400"
                />
                <button
                  type="submit"
                  className="flex flex-shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-gradient-to-b from-amber-500 to-amber-600
                             px-6 py-3 text-[14px] font-semibold text-slate-950 shadow-[0_4px_14px_rgba(217,119,6,0.45)]
                             transition-colors hover:from-amber-400 hover:to-amber-500"
                >
                  Get demo
                  <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </button>
              </form>
            </div>

            {/* ── Illustration ─────────────────────────────────────────── */}
            <div
              className={`transition-all delay-[600ms] duration-[900ms]
                         ${heroReady ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
            >
              <PromptFunnel />
            </div>
          </div>

        </section>


        {/* ═══ WHO IT'S FOR ══════════════════════════════════════════════════
             A divided list rather than a card grid: the three personas share a
             parallel structure (today → with Harvin → modules), and rows on a
             common baseline let you read DOWN a column to compare them. Three
             separate cards make that comparison impossible. ───────────────── */}
        <section className="relative border-y border-slate-200 bg-sand-100 px-4 py-20 dark:border-white/[0.06] dark:bg-[#040404] sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-[1180px]">
            <div
              ref={audienceHeader.ref}
              className={`mb-12 max-w-[680px] transition-all duration-700 lg:mb-14
                          ${audienceHeader.visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}
            >
              <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ember-500">
                Who it&apos;s for
              </p>
              <h2 className="mt-4 text-[clamp(27px,3.2vw,42px)] font-semibold leading-[1.09] tracking-[-0.025em] text-slate-900 dark:text-white">
                Built for the people who own pipeline
              </h2>
              <p className="mt-5 text-[16px] leading-[1.7] text-slate-600 dark:text-slate-400">
                Three jobs, one account graph. Whichever seat you sit in, the change is the same —
                you stop assembling the list and start working it.
              </p>
            </div>

            <div className="border-t border-slate-200 dark:border-white/[0.08]">
              {AUDIENCE.map((a, i) => (
                <AudienceRow key={a.role} item={a} index={i} />
              ))}
            </div>
          </div>
        </section>

        <ProductSteps />

        <Platform />

        {/* ═══ USE CASES ═════════════════════════════════════════════════ */}
        <section className="border-t border-slate-200 bg-sand-100 px-4 py-20 dark:border-white/[0.06] dark:bg-[#040404] sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-[1180px]">
            <div
              ref={useCasesHeader.ref}
              className={`mb-12 max-w-[680px] transition-all duration-700 lg:mb-14
                          ${useCasesHeader.visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}
            >
              <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ember-500">Use cases</p>
              <h2 className="mt-4 text-[clamp(27px,3.2vw,42px)] font-semibold leading-[1.09] tracking-[-0.025em] text-slate-900 dark:text-white">
                How teams use Harvin
              </h2>
              <p className="mt-5 text-[16px] leading-[1.7] text-slate-600 dark:text-slate-400">
                The motion is the same in every seat — find the accounts, watch for the move, reach
                while the window is open. What changes is which signal you are waiting on.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:gap-6">
              {USE_CASES.map((uc, i) => (
                <UseCaseCard key={uc.title} uc={uc} index={i} />
              ))}
            </div>

            {/* The category page is the top of this funnel, not a footnote —
                someone still deciding whether they need this kind of tool at
                all should be able to get there from the product page. */}
            <p className="mt-10 max-w-[680px] text-[15px] leading-[1.7] text-slate-600 dark:text-slate-400">
              New to the category? Our guide to{' '}
              <Link
                href="/sdr-management-platform"
                className="font-semibold text-ember-600 underline underline-offset-4 transition-colors hover:text-ember-500 dark:text-ember-300 dark:hover:text-ember-200"
              >
                SDR management platforms
              </Link>{' '}
              covers what they do, how they differ from a CRM and a sales engagement platform, and
              when one is the wrong purchase.
            </p>
          </div>
        </section>

        <PlatformFaq />

        {/* ═══ CTA ═══════════════════════════════════════════════════════════ */}
        <CTA />

      </div>
      <Footer />
    </div>
  );
}
