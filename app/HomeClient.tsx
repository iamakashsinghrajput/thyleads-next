'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import Link from 'next/link';
import {
  ArrowDown,
  ArrowRight,
  Bell,
  Building2,
  Check,
  CreditCard,
  Database,
  FileSearch,
  Gauge,
  Globe2,
  Layers,
  Mail,
  Minus,
  Phone,
  Plus,
  Search,
  Sparkles,
  Store,
  Upload,
  UserCheck,
  Users,
  X,
} from 'lucide-react';

import Hero from '@/components/Hero';
import { HOW_IT_WORKS_STEPS } from '@/app/home-content';
import { startFreeHref } from '@/lib/site';
import { ENTITY_SENTENCE } from '@/lib/schema';
import { FREE_CREDITS, PLANS, PREVIEW_COMPANIES } from '@/lib/pricing';

/**
 * Homepage body. Copy is harvin-website-copy-handoff.md §4.1, word for word;
 * everything else here is illustration. Company and person names in the
 * product mocks are fictional (claims register C18).
 *
 * Visual language follows app/data-building/DataBuildingClient.tsx: eyebrows
 * with a rule, sand surfaces, an always-dark showcase band and the ember
 * Company Fit card.
 */

/* ═══ Motion ═════════════════════════════════════════════════════════════════
   Everything degrades to its finished state before hydration, under
   prefers-reduced-motion, and once a loop is out of view. */

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function useInView<T extends Element>(threshold = 0.2) {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: '0px 0px -8% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, seen] as const;
}

function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const [ref, seen] = useInView<HTMLDivElement>(0.12);
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out motion-reduce:transition-none ${seen ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'} ${className}`}
    >
      {children}
    </div>
  );
}

function ScoreRing({
  score,
  size = 120,
  stroke = 9,
  trackClass,
  barClass,
  children,
}: {
  score: number;
  size?: number;
  stroke?: number;
  trackClass: string;
  barClass: string;
  children: ReactNode;
}) {
  const [ref, seen] = useInView<HTMLDivElement>(0.4);
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div ref={ref} className="relative shrink-0" style={{ width: size, height: size }}>
      <svg viewBox={`0 0 ${size} ${size}`} className="h-full w-full -rotate-90" aria-hidden="true">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth={stroke} stroke="currentColor" className={trackClass} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          stroke="currentColor"
          strokeDasharray={c}
          strokeDashoffset={seen ? c * (1 - score / 100) : c}
          className={`transition-[stroke-dashoffset] duration-[1400ms] ease-out motion-reduce:transition-none ${barClass}`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">{children}</div>
    </div>
  );
}

/* ═══ Primitives ═════════════════════════════════════════════════════════════ */

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

function Label({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <p className={`text-[11px] font-semibold uppercase tracking-[0.12em] text-ember-500 dark:text-ember-400 ${className}`}>
      {children}
    </p>
  );
}

function Chip({ children, tone = 'sand' }: { children: ReactNode; tone?: 'sand' | 'ember' | 'muted' }) {
  return (
    <span
      className={[
        'inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[12.5px] font-medium',
        tone === 'ember' && 'bg-ember-50 text-ember-700 dark:bg-ember-500/15 dark:text-ember-300',
        tone === 'sand' && 'bg-sand-200 text-slate-800 dark:bg-white/[0.06] dark:text-slate-200',
        tone === 'muted' && 'border border-dashed border-slate-300 text-slate-500 dark:border-white/[0.14] dark:text-slate-400',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </span>
  );
}

function TextLink({ href, children, className = '' }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-1.5 text-[15px] font-semibold text-ember-500 hover:text-ember-400 dark:text-ember-400 dark:hover:text-ember-300 ${className}`}
    >
      {children}
      <ArrowRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}

const SECTION = 'scroll-mt-20 border-b border-slate-200 px-6 py-20 dark:border-white/[0.08] lg:py-28';
const BAND = 'bg-white/60 dark:bg-white/[0.015]';
const WRAP = 'mx-auto max-w-[1180px]';
const H2 =
  'font-instrument font-semibold text-[clamp(30px,3.6vw,46px)] leading-[1.08] tracking-[-0.025em] text-slate-950 dark:text-white';
const LEAD = 'text-[17px] leading-relaxed text-slate-600 dark:text-slate-300';
const SURFACE =
  'rounded-modal border border-slate-200 bg-sand-50 shadow-[0_4px_32px_rgba(0,0,0,0.06)] dark:border-white/[0.08] dark:bg-[#0F0E0C] dark:shadow-[0_4px_40px_rgba(0,0,0,0.35)]';
const TILE = 'rounded-card border border-slate-200 bg-white dark:border-white/[0.08] dark:bg-white/[0.03]';
const LIFT =
  'transition-all duration-200 hover:-translate-y-0.5 hover:border-ember-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:hover:border-ember-500/40 dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)]';

/* ═══ Illustrative data ══════════════════════════════════════════════════════ */

const DISCOVERED = [
  { name: 'Northstar Software', listed: 'Software', why: 'Customers in 18 countries', fit: 91 },
  { name: 'Vela Commerce', listed: 'Internet', why: 'Pays sellers in many countries', fit: 88 },
  { name: 'Brightpath Learning', listed: 'EdTech', why: 'Bills students overseas', fit: 84 },
  { name: 'Kitecart', listed: 'Social commerce', why: 'Collects payments from abroad', fit: 79 },
  { name: 'Atlas Digital', listed: 'IT services', why: 'Recurring foreign-currency invoices', fit: 74 },
];

/* ═══ 1. Hero ═══════════════════════════════════════════════════════════════
   The original scene hero (components/Hero.tsx), with the v2 copy. */

/* ═══ 2. Entity + proof strip ════════════════════════════════════════════════ */

/**
 * The entity sentence, split so its three promises can be highlighted. The
 * pieces join back into ENTITY_SENTENCE exactly (checked below in dev), so the
 * visible text never drifts from the schema and llms.txt copy.
 */
const ENTITY_PARTS: { text: string; promise?: number }[] = [
  { text: 'Harvin.AI is a B2B company discovery and research platform that ' },
  { text: 'finds the companies and buyers your database misses', promise: 1 },
  { text: ', ' },
  { text: 'shows why each one fits your business', promise: 2 },
  { text: ', and ' },
  { text: 'finds their work emails and phone numbers', promise: 3 },
  { text: '.' },
];
if (process.env.NODE_ENV !== 'production' && ENTITY_PARTS.map((p) => p.text).join('') !== ENTITY_SENTENCE) {
  console.warn('HomeClient: ENTITY_PARTS no longer matches ENTITY_SENTENCE in lib/schema.ts');
}

const PROMISES = [
  { icon: Search, label: 'Discover', body: 'Companies and buyers outside your usual filters' },
  { icon: Gauge, label: 'Explain', body: 'Company Fit for every company, with the reasons' },
  { icon: UserCheck, label: 'Reach', body: 'The right buyer’s work email and phone' },
];

function EntityStrip() {
  return (
    <section id="entity" className={`relative ${SECTION} ${BAND}`}>
      {/* Ember hairline seam where the dark hero ends */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ember-500/50 to-transparent"
      />
      <div className={WRAP}>
        <Reveal className="mx-auto max-w-[920px] text-center">
          <Eyebrow center>What is Harvin.AI?</Eyebrow>
          <p className="mx-auto mt-6 max-w-[820px] font-instrument text-[clamp(22px,2.4vw,30px)] font-medium leading-[1.4] tracking-[-0.01em] text-slate-800 dark:text-slate-200">
            {ENTITY_PARTS.map((part, i) =>
              part.promise === 1 ? (
                <span key={i} className="text-ember-500 dark:text-ember-400">
                  {part.text}
                </span>
              ) : (
                <span key={i}>{part.text}</span>
              ),
            )}
          </p>
        </Reveal>

        <ul className="mx-auto mt-12 grid max-w-[980px] gap-4 sm:grid-cols-3">
          {PROMISES.map((p, i) => (
            <li key={p.label}>
              <Reveal delay={i * 100} className={`${TILE} flex h-full items-start gap-4 p-5`}>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-card bg-ember-50 text-ember-500 dark:bg-ember-500/10 dark:text-ember-400">
                  <p.icon size={18} aria-hidden="true" />
                </span>
                <span>
                  <span className="flex items-center gap-2 text-[15px] font-bold text-slate-950 dark:text-white">
                    <span className="font-mono text-[11px] font-bold text-ember-500 dark:text-ember-400">0{i + 1}</span>
                    {p.label}
                  </span>
                  <span className="mt-1 block text-[13.5px] leading-relaxed text-slate-600 dark:text-slate-400">{p.body}</span>
                </span>
              </Reveal>
            </li>
          ))}
        </ul>

        {/* [id: proof] — the logo row stays hidden until permissioned logos exist. */}
        <p
          id="proof"
          className="mt-10 flex items-center justify-center gap-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400"
        >
          <span aria-hidden="true" className="h-px w-8 bg-slate-300 dark:bg-white/[0.14]" />
          Built from nearly 80 client engagements at Thyleads
          <span aria-hidden="true" className="h-px w-8 bg-slate-300 dark:bg-white/[0.14]" />
        </p>
      </div>
    </section>
  );
}

/* ═══ 3. Problem ═════════════════════════════════════════════════════════════ */

/** Card shell for the three problem panels: copy on top, a small mock below. */
function ProblemCard({
  n,
  label,
  children,
  visual,
  delay,
}: {
  n: string;
  label: string;
  children: ReactNode;
  visual: ReactNode;
  delay: number;
}) {
  return (
    // On lg the card spans two rows of the parent grid (subgrid), so the copy
    // rows and the mock rows line up across all three cards.
    <Reveal delay={delay} className={`${SURFACE} flex flex-col overflow-hidden lg:row-span-2 lg:grid lg:grid-rows-subgrid lg:gap-0`}>
      <div className="p-6 sm:p-7">
        <p className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
          <span className="font-mono text-ember-500 dark:text-ember-400">{n}</span>
          {label}
        </p>
        <p className="mt-4 text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">{children}</p>
      </div>
      <div className="flex flex-1 flex-col justify-center border-t border-slate-200 bg-white/70 p-5 dark:border-white/[0.06] dark:bg-white/[0.02]">
        {visual}
      </div>
    </Reveal>
  );
}

function CompaniesMock() {
  return (
    <div role="img" aria-label="A database filter for financial services misses good-fit companies filed under Software and Internet.">
      <div className="flex flex-wrap gap-1.5">
        <Chip>Industry: Financial services</Chip>
        <Chip>50–500</Chip>
        <Chip>India</Chip>
      </div>
      <ul className="mt-3 space-y-1.5" aria-hidden="true">
        {['w-28', 'w-36'].map((w) => (
          <li key={w} className="flex items-center justify-between rounded-btn border border-slate-200 px-3 py-2 dark:border-white/[0.06]">
            <span className={`h-2 ${w} rounded-full bg-slate-200 dark:bg-white/[0.08]`} />
            <span className="text-[11.5px] text-slate-400 dark:text-slate-500">In results</span>
          </li>
        ))}
      </ul>
      <p className="mb-1.5 mt-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-ember-500 dark:text-ember-400">Missed</p>
      <ul className="space-y-1.5">
        {[
          { n: 'Northstar Software', c: 'Software' },
          { n: 'Vela Commerce', c: 'Internet' },
        ].map((r) => (
          <li
            key={r.n}
            className="flex items-center justify-between gap-2 rounded-btn border border-dashed border-ember-300 bg-ember-50/70 px-3 py-2 dark:border-ember-500/40 dark:bg-ember-500/[0.08]"
          >
            <span className="text-[13px] font-semibold text-slate-900 dark:text-white">{r.n}</span>
            <span className="text-[11.5px] text-slate-500 dark:text-slate-400">Filed under {r.c}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PeopleMock() {
  const rows = [
    { t: 'Finance Manager', tag: 'Too junior' },
    { t: 'VP Finance Transformation', tag: 'Adjacent role' },
    { t: 'Finance Operations Lead', tag: "Doesn't buy" },
  ];
  return (
    <div role="img" aria-label="A title search for Finance returns the wrong people; the VP Finance is buried far down the list.">
      <div className="flex items-center gap-2 rounded-btn border border-slate-200 bg-white px-3 py-2 text-[12.5px] text-slate-600 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-slate-300">
        <Search size={13} aria-hidden="true" className="text-slate-400" />
        Title contains &ldquo;Finance&rdquo;
      </div>
      <ul className="mt-3 space-y-1.5">
        {rows.map((r) => (
          <li key={r.t} className="flex items-center justify-between gap-2 rounded-btn border border-slate-200 px-3 py-2 dark:border-white/[0.06]">
            <span className="truncate text-[13px] font-medium text-slate-800 dark:text-slate-200">{r.t}</span>
            <span className="inline-flex shrink-0 items-center gap-1 rounded-md bg-red-500/10 px-1.5 py-0.5 text-[11px] font-medium text-red-600 dark:text-red-400">
              <X size={11} aria-hidden="true" /> {r.tag}
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-1.5 flex items-center justify-between gap-2 rounded-btn border border-dashed border-slate-300 px-3 py-2 opacity-70 dark:border-white/[0.12]">
        <span className="text-[13px] font-semibold text-slate-900 dark:text-white">VP Finance</span>
        <span className="text-[11.5px] text-slate-500 dark:text-slate-400">Row 38 of 212</span>
      </div>
    </div>
  );
}

function ManualMock() {
  const steps = [
    { t: 'Open the website', done: true },
    { t: 'Work out the business model', done: true },
    { t: 'Find the right title', done: false },
    { t: 'Copy it into the spreadsheet', done: false },
  ];
  return (
    <div role="img" aria-label="Researching companies by hand, one browser tab at a time.">
      <div className="flex gap-1" aria-hidden="true">
        {['Company 1', 'Company 2', 'Company 3', '+ 497'].map((t, i) => (
          <span
            key={t}
            className={[
              'truncate rounded-t-md border border-b-0 px-2.5 py-1 text-[11px]',
              i === 0
                ? 'border-slate-200 bg-white font-semibold text-slate-800 dark:border-white/[0.1] dark:bg-white/[0.06] dark:text-white'
                : 'border-transparent bg-slate-100 text-slate-400 dark:bg-white/[0.03] dark:text-slate-500',
            ].join(' ')}
          >
            {t}
          </span>
        ))}
      </div>
      <ul className="space-y-1.5 rounded-b-btn rounded-tr-btn border border-slate-200 bg-white p-3 dark:border-white/[0.1] dark:bg-white/[0.03]">
        {steps.map((st) => (
          <li key={st.t} className="flex items-center gap-2.5 text-[12.5px]">
            <span
              className={`flex h-4 w-4 shrink-0 items-center justify-center rounded ${st.done ? 'bg-slate-800 text-white dark:bg-white dark:text-slate-950' : 'border border-slate-300 dark:border-white/[0.2]'}`}
            >
              {st.done && <Check size={10} strokeWidth={3} aria-hidden="true" />}
            </span>
            <span className={st.done ? 'text-slate-400 line-through dark:text-slate-500' : 'text-slate-700 dark:text-slate-300'}>{st.t}</span>
          </li>
        ))}
      </ul>
      <div className="mt-3 flex items-center justify-between text-[11.5px] text-slate-500 dark:text-slate-400">
        <span>Company 1 of 500</span>
        <span className="h-1.5 w-24 overflow-hidden rounded-full bg-slate-200 dark:bg-white/[0.08]">
          <span className="block h-full w-[2%] rounded-full bg-ember-500" />
        </span>
      </div>
    </div>
  );
}

function Problem() {
  return (
    <section id="problem" className={SECTION}>
      <div className={WRAP}>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end lg:gap-16">
          <Reveal>
            <Eyebrow>The problem</Eyebrow>
            <h2 className={`mt-5 ${H2}`}>Why do good-fit companies never show up in your database searches?</h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="border-l-2 border-ember-500 pl-5 font-instrument text-[clamp(22px,2.3vw,28px)] font-medium leading-[1.25] tracking-[-0.01em] text-slate-950 dark:border-ember-400 dark:text-white">
              Because databases search the label, not the business.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3 lg:gap-y-0">
          <ProblemCard n="01" label="The wrong companies" delay={0} visual={<CompaniesMock />}>
            Your team knows what makes a good customer: how a company makes money, the markets it serves, what it
            sells, the tools it runs on. A database reduces that to industry, headcount, revenue and location. A company
            that fits perfectly but is filed under &ldquo;Software&rdquo; or &ldquo;Internet&rdquo; never appears in
            your search.
          </ProblemCard>
          <ProblemCard n="02" label="The wrong people" delay={100} visual={<PeopleMock />}>
            The same thing happens with people. Search for titles containing &ldquo;Finance&rdquo; and you get a Finance
            Manager who is too junior, a VP Finance Transformation in an adjacent role, and a Finance Operations Lead who
            doesn&rsquo;t buy. The VP Finance you wanted is somewhere in the list.
          </ProblemCard>
          <ProblemCard n="03" label="Research by hand" delay={200} visual={<ManualMock />}>
            So your team researches companies one by one, checks websites, builds spreadsheets and checks titles by
            hand.
          </ProblemCard>
        </div>

        <Reveal delay={150}>
          <div className="relative mt-6 flex flex-col items-start gap-5 overflow-hidden rounded-modal bg-[#0C0B09] px-7 py-6 text-white sm:flex-row sm:items-center sm:justify-between">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_120%_at_0%_50%,rgba(201,76,30,0.3),transparent_70%)]" />
            <p className="relative flex items-center gap-4 text-[17px] font-semibold leading-snug sm:text-[19px]">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ember-500">
                <Sparkles size={18} aria-hidden="true" />
              </span>
              Harvin does that research for you, using the criteria that matter to your business.
            </p>
            <a
              href="#how-it-works"
              className="group relative inline-flex shrink-0 items-center gap-1.5 text-[14.5px] font-semibold text-ember-300 hover:text-ember-200"
            >
              See how it works
              <ArrowDown size={15} aria-hidden="true" className="transition-transform group-hover:translate-y-0.5" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══ 4. How it works — tabbed, auto-advancing ═══════════════════════════════ */

function StepVisual({ step }: { step: number }) {
  if (step === 0)
    return (
      <div className="space-y-4">
        <Label>Company Profile</Label>
        <div className={`${TILE} p-4`}>
          <p className="text-[12px] text-slate-500 dark:text-slate-400">What you sell</p>
          <p className="mt-1 text-[15px] font-semibold text-slate-900 dark:text-white">Cross-border payment infrastructure</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className={`${TILE} p-4`}>
            <p className="text-[12px] text-slate-500 dark:text-slate-400">Customers</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              <Chip tone="ember">Northstar Software</Chip>
              <Chip tone="ember">Vela Commerce</Chip>
              <Chip tone="ember">Kitecart</Chip>
            </div>
          </div>
          <div className={`${TILE} p-4`}>
            <p className="text-[12px] text-slate-500 dark:text-slate-400">Lost deals</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              <Chip tone="muted">Ledgerly Analytics</Chip>
              <Chip tone="muted">Atlas Digital</Chip>
            </div>
          </div>
        </div>
        <div className={`${TILE} p-4`}>
          <p className="text-[12px] text-slate-500 dark:text-slate-400">Target roles, in order</p>
          <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[12.5px]">
            <Chip>1 · CFO</Chip>
            <Chip>2 · VP Finance</Chip>
            <Chip>3 · Head of Payments</Chip>
          </div>
        </div>
      </div>
    );
  if (step === 1)
    return (
      <div>
        <Label>Search themes → companies</Label>
        <div className="mt-4 grid items-center gap-4 sm:grid-cols-[1fr_auto_1fr]">
          <ul className="space-y-2">
            {['Global payouts', 'Overseas subscriptions', 'Marketplace payments', 'FX workflows'].map((t) => (
              <li key={t} className={`${TILE} px-3.5 py-2.5 text-[13.5px] font-medium text-slate-800 dark:text-slate-200`}>
                {t}
              </li>
            ))}
          </ul>
          <ArrowRight size={20} aria-hidden="true" className="mx-auto hidden text-ember-500 sm:block" />
          <ArrowDown size={20} aria-hidden="true" className="mx-auto text-ember-500 sm:hidden" />
          <ul className="space-y-2">
            {DISCOVERED.slice(0, 4).map((c) => (
              <li key={c.name} className={`${TILE} flex items-center justify-between gap-2 px-3.5 py-2.5 text-[13.5px]`}>
                <span className="font-semibold text-slate-900 dark:text-white">{c.name}</span>
                <span className="text-[11.5px] text-slate-400 dark:text-slate-500">{c.listed}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  if (step === 2)
    return (
      <div>
        <div className="flex items-center justify-between">
          <Label>Vela Commerce · researched</Label>
          <Chip tone="ember">
            <Sparkles size={12} aria-hidden="true" /> Researched by Harvin
          </Chip>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {[
            { k: 'Business model', v: 'Online marketplace' },
            { k: 'Monthly active users', v: '1.2M' },
            { k: 'Location count', v: '17 locations' },
            { k: 'Countries served', v: '22' },
            { k: 'Tech stack', v: 'Stripe, Shopify, AWS' },
            { k: 'Store count', v: 'Not found', muted: true },
          ].map((f) => (
            <div
              key={f.k}
              className={`rounded-card border p-3.5 ${f.muted ? 'border-dashed border-slate-300 dark:border-white/[0.12]' : 'border-ember-200 bg-ember-50/60 dark:border-ember-500/30 dark:bg-ember-500/[0.06]'}`}
            >
              <p className="text-[11.5px] text-slate-500 dark:text-slate-400">{f.k}</p>
              <p className={`mt-1 text-[15px] font-semibold ${f.muted ? 'text-slate-400 dark:text-slate-500' : 'text-slate-900 dark:text-white'}`}>
                {f.v}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  if (step === 3)
    return (
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
        <div className="rounded-modal bg-gradient-to-br from-ember-400 to-ember-600 p-5 text-white shadow-[0_8px_30px_rgba(201,76,30,0.35)]">
          <ScoreRing score={91} size={110} stroke={9} trackClass="text-white/20" barClass="text-white">
            <span className="text-[34px] font-bold leading-none">91</span>
            <span className="text-[11px] text-white/80">/ 100</span>
          </ScoreRing>
          <p className="mt-3 text-center text-[14px] font-bold">Strong fit</p>
        </div>
        <ul className="w-full flex-1 space-y-2">
          {[
            { t: 'Business model matches converted customers', pos: true },
            { t: 'Customers in 18 countries', pos: true },
            { t: 'Recurring foreign-currency payments', pos: true },
            { t: 'Uses Stripe and AWS', pos: true },
            { t: 'Revenue unknown', pos: false },
          ].map((r) => (
            <li key={r.t} className={`${TILE} flex items-center gap-3 px-3.5 py-2.5 text-[13.5px] text-slate-800 dark:text-slate-200`}>
              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${r.pos ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400' : 'bg-amber-500/15 text-amber-700 dark:text-amber-400'}`}
              >
                {r.pos ? <Plus size={12} strokeWidth={3} aria-hidden="true" /> : <Minus size={12} strokeWidth={3} aria-hidden="true" />}
              </span>
              {r.t}
            </li>
          ))}
        </ul>
      </div>
    );
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <div>
        <Label>Roles, in priority order</Label>
        <ol className="mt-3 space-y-2">
          {[
            { r: 'CFO', s: 'Not found' },
            { r: 'VP Finance', s: 'Not found' },
            { r: 'Head of Payments', s: 'Matched' },
          ].map((x, i) => (
            <li
              key={x.r}
              className={`flex items-center justify-between rounded-btn border px-3.5 py-2.5 text-[13.5px] ${x.s === 'Matched' ? 'border-ember-500 bg-ember-500 font-semibold text-white' : 'border-slate-200 bg-white text-slate-700 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-slate-300'}`}
            >
              <span>
                {i + 1}. {x.r}
              </span>
              <span className={x.s === 'Matched' ? '' : 'text-slate-400 dark:text-slate-500'}>{x.s}</span>
            </li>
          ))}
        </ol>
      </div>
      <div>
        <Label>Email and phone waterfall</Label>
        <ol className="mt-3 space-y-2 text-[13.5px]">
          <li className={`${TILE} flex justify-between px-3.5 py-2.5 text-slate-700 dark:text-slate-300`}>
            Source A <span className="text-slate-400 dark:text-slate-500">No match</span>
          </li>
          <li className="flex justify-between rounded-btn border border-ember-400 bg-white px-3.5 py-2.5 font-semibold text-slate-900 dark:border-ember-500/50 dark:bg-white/[0.03] dark:text-white">
            Source B <span className="text-emerald-700 dark:text-emerald-400">Email found</span>
          </li>
          <li className="flex justify-between rounded-btn border border-dashed border-slate-300 px-3.5 py-2.5 text-slate-400 dark:border-white/[0.1] dark:text-slate-500">
            Source C <span>Not needed</span>
          </li>
        </ol>
      </div>
    </div>
  );
}

function HowItWorks() {
  const [ref, seen] = useInView<HTMLDivElement>(0.3);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!seen || paused || prefersReducedMotion()) return;
    const t = setInterval(() => setActive((s) => (s + 1) % HOW_IT_WORKS_STEPS.length), 5000);
    return () => clearInterval(t);
  }, [seen, paused]);

  return (
    <section id="how-it-works" className={`${SECTION} ${BAND}`}>
      <div className={WRAP}>
        <Reveal className="mx-auto max-w-[780px] text-center">
          <Eyebrow center>How Harvin works</Eyebrow>
          <h2 className={`mt-5 ${H2}`}>How does Harvin find the companies and buyers that fit?</h2>
          <p className={`mt-5 ${LEAD}`}>
            Harvin works in five steps. It learns your business once, searches for companies by the need your customers
            share, researches each one, shows how well it fits and why, then finds the right buyer and their contact
            details.
          </p>
        </Reveal>

        <div
          ref={ref}
          className="mt-14 grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-10"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <ol className="space-y-2" role="tablist" aria-label="How Harvin works">
            {HOW_IT_WORKS_STEPS.map((s, i) => {
              const on = i === active;
              return (
                <li key={s.name}>
                  <button
                    type="button"
                    role="tab"
                    id={`hiw-tab-${i}`}
                    aria-selected={on}
                    aria-controls="hiw-panel"
                    onClick={() => {
                      setActive(i);
                      setPaused(true);
                    }}
                    className={[
                      'relative w-full overflow-hidden rounded-card border p-4 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-500',
                      on
                        ? 'border-ember-300 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:border-ember-500/40 dark:bg-[#0F0E0C] dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)]'
                        : 'border-transparent hover:bg-white/70 dark:hover:bg-white/[0.04]',
                    ].join(' ')}
                  >
                    <span className="flex items-start gap-3">
                      <span
                        className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-mono text-[12px] font-bold ${on ? 'bg-ember-500 text-white' : 'bg-sand-200 text-slate-600 dark:bg-white/[0.06] dark:text-slate-400'}`}
                      >
                        {i + 1}
                      </span>
                      <span>
                        <span className={`block text-[16px] font-bold ${on ? 'text-slate-950 dark:text-white' : 'text-slate-700 dark:text-slate-300'}`}>
                          {s.name}.
                        </span>
                        <span
                          className={`grid transition-all duration-300 ${on ? 'mt-1.5 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                        >
                          <span className="overflow-hidden text-[14.5px] leading-relaxed text-slate-600 dark:text-slate-400">{s.text}</span>
                        </span>
                      </span>
                    </span>
                    {on && !paused && seen && (
                      <span
                        aria-hidden="true"
                        key={active}
                        className="absolute bottom-0 left-0 h-0.5 w-full origin-left animate-progress bg-ember-500 motion-reduce:hidden"
                        style={{ animationDuration: '5s' }}
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ol>

          <div
            id="hiw-panel"
            role="tabpanel"
            aria-labelledby={`hiw-tab-${active}`}
            className={`${SURFACE} flex min-h-[380px] flex-col p-6 sm:p-8`}
          >
            <div key={active} className="flex-1 animate-fade-up">
              <StepVisual step={active} />
            </div>
            <p className="mt-6 border-t border-slate-200 pt-4 text-[12.5px] text-slate-500 dark:border-white/[0.08] dark:text-slate-400">
              Illustrative example. Company names are fictional.
            </p>
          </div>
        </div>

        <div className="mt-10 text-center">
          <TextLink href="/data-building">See the full workflow</TextLink>
        </div>
      </div>
    </section>
  );
}

/* ═══ 5. Example — always-dark band ══════════════════════════════════════════ */

function Example() {
  return (
    <section id="example" className="relative overflow-hidden border-b border-white/[0.08] bg-[#0C0B09] px-6 py-20 text-white lg:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_60%_at_85%_60%,rgba(201,76,30,0.22),transparent_70%)]" />
      <div className={`relative ${WRAP}`}>
        <Reveal className="max-w-[860px]">
          <Eyebrow dark>Illustrative example</Eyebrow>
          <h2 className="mt-5 font-instrument text-[clamp(30px,3.6vw,46px)] font-semibold leading-[1.08] tracking-[-0.025em] text-white">
            What does a <span className="text-ember-400">miscategorised customer</span> look like?
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-white/70">
            Here is a fictional example for a company that sells cross-border payments. Its best customers include
            software companies billing customers overseas, travel businesses collecting payments from abroad and
            marketplaces paying sellers in many countries. They sit in different industries but share one need.
          </p>
        </Reveal>

        <div className="mt-12 flex flex-col items-stretch gap-4 lg:flex-row">
          <Reveal className="flex flex-col rounded-modal border border-white/[0.08] bg-white/[0.03] p-6 lg:w-[30%]">
            <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/50">
              <Database size={12} aria-hidden="true" />
              In a typical database
            </p>
            <p className="mt-2 text-[20px] font-bold">Northstar Software</p>
            <dl className="mt-4 divide-y divide-white/[0.06] text-[14.5px]">
              {[
                { k: 'Industry', v: 'Software' },
                { k: 'Employees', v: '350' },
                { k: 'Location', v: 'India' },
                { k: 'Revenue', v: 'Unknown', muted: true },
              ].map((r) => (
                <div key={r.k} className="flex justify-between py-2.5">
                  <dt className="text-white/50">{r.k}</dt>
                  <dd className={r.muted ? 'text-white/35' : 'font-semibold text-white'}>{r.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <div aria-hidden="true" className="flex shrink-0 items-center justify-center text-ember-400">
            <ArrowRight size={22} strokeWidth={2.5} className="hidden lg:block" />
            <ArrowDown size={22} strokeWidth={2.5} className="lg:hidden" />
          </div>

          <Reveal delay={120} className="flex flex-1 flex-col rounded-modal bg-sand-50 p-6 text-slate-900 shadow-[0_8px_40px_rgba(0,0,0,0.4)]">
            <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-ember-500">
              <Sparkles size={12} aria-hidden="true" />
              After Harvin&rsquo;s research
            </p>
            <ul className="mt-4 space-y-3">
              {['Subscription business', 'Customers in 18 countries', 'Recurring foreign-currency payments', 'Uses Stripe and AWS'].map((r) => (
                <li key={r} className="flex items-center gap-3 text-[16px] font-medium">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ember-100 text-ember-600">
                    <Check size={13} strokeWidth={2.5} aria-hidden="true" />
                  </span>
                  {r}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={240} className="flex flex-col items-start rounded-modal bg-gradient-to-br from-ember-400 to-ember-600 p-6 text-white shadow-[0_8px_40px_rgba(201,76,30,0.35)] lg:w-[24%]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/80">Company Fit</p>
            <div className="my-5">
              <ScoreRing score={91} trackClass="text-white/20" barClass="text-white">
                <span className="text-[40px] font-bold leading-none tracking-[-0.03em]">91</span>
                <span className="text-[11px] font-medium text-white/80">/ 100</span>
              </ScoreRing>
            </div>
            <p className="mt-auto text-[20px] font-bold">Strong fit</p>
            <p className="mt-1 text-[14px] text-white/85">Matches the patterns of companies that converted</p>
          </Reveal>
        </div>

        <p className="mt-8 max-w-[760px] text-[15px] text-white/60">
          Nothing in the database record says &ldquo;cross-border payments prospect&rdquo;. Harvin looks past the label
          to understand the business.
        </p>
      </div>
    </section>
  );
}

/* ═══ 6. People search ═══════════════════════════════════════════════════════ */

function PeopleSearch() {
  return (
    <section id="people-search" className={SECTION}>
      <div className={`${WRAP} grid items-start gap-12 lg:grid-cols-2 lg:gap-16`}>
        <Reveal>
          <Eyebrow>People search</Eyebrow>
          <h2 className={`mt-5 ${H2}`}>How does Harvin find the person who actually buys?</h2>
          <div className={`mt-6 space-y-5 ${LEAD}`}>
            <p>
              Harvin searches for the roles in your Target Profile in the order you set, for example CFO, then VP
              Finance, then Head of Payments. If the first role isn&rsquo;t there, it moves to the next. It searches
              across several people-data sources, so a buyer missing from one dataset can still be found in another.
            </p>
            <p>
              Harvin reads titles by meaning, not keywords. &ldquo;Treasury &amp; FX Lead, APAC&rdquo; is understood as
              a payments buyer; &ldquo;Finance Manager&rdquo; is recognised as too junior. Company names and first names
              are cleaned too, so &ldquo;ACME TECHNOLOGIES PVT LTD&rdquo; becomes &ldquo;Acme Technologies&rdquo; and
              &ldquo;SARAH&rdquo; becomes &ldquo;Sarah&rdquo;. Your list is ready to send without cleanup.
            </p>
            <p>
              Then Harvin runs separate email and phone waterfalls, checking contact-data sources one after another and
              stopping at the first qualifying result. You pay only when a contact is found.
            </p>
          </div>
          {/* Link hidden until /people-search exists.
          <TextLink href="/people-search" className="mt-8">
            How People Search works
          </TextLink>
          */}
        </Reveal>

        <Reveal delay={120} className="space-y-4">
          <div
            role="img"
            aria-label="Keyword title search returns the wrong people; Harvin matches target roles in priority order."
            className="grid gap-4 sm:grid-cols-2"
          >
            <div className={`${SURFACE} p-5`}>
              <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                <Search size={12} aria-hidden="true" /> Title contains &ldquo;Finance&rdquo;
              </p>
              <ul className="mt-4 space-y-3">
                {[
                  { t: 'Finance Manager', tag: 'Too junior' },
                  { t: 'VP Finance Transformation', tag: 'Adjacent role' },
                  { t: 'Finance Operations Lead', tag: "Doesn't buy" },
                ].map((r) => (
                  <li key={r.t}>
                    <p className="text-[14px] font-semibold text-slate-900 dark:text-white">{r.t}</p>
                    <span className="mt-1 inline-flex items-center gap-1 rounded-md bg-red-500/10 px-2 py-0.5 text-[12px] font-medium text-red-600 dark:text-red-400">
                      <X size={12} aria-hidden="true" /> {r.tag}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-modal border border-ember-300 bg-white p-5 shadow-[0_0_0_4px_rgba(201,76,30,0.06),0_4px_32px_rgba(0,0,0,0.06)] dark:border-ember-500/40 dark:bg-[#0F0E0C] dark:shadow-[0_0_0_4px_rgba(201,76,30,0.08),0_4px_40px_rgba(0,0,0,0.35)]">
              <Label>Harvin · priority order</Label>
              <ol className="mt-4 space-y-2.5">
                {['CFO', 'VP Finance', 'Head of Payments'].map((r, i) => (
                  <li key={r} className="flex items-center justify-between gap-2 text-[14px]">
                    <span className="font-semibold text-slate-900 dark:text-white">
                      <span className="mr-2 font-mono text-[12px] text-slate-400 dark:text-slate-500">{i + 1}</span>
                      {r}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/10 px-2 py-0.5 text-[12px] font-medium text-emerald-700 dark:text-emerald-400">
                      <Check size={12} aria-hidden="true" /> Matched
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className={`${SURFACE} p-5`}>
            <Label>Names, cleaned</Label>
            <ul className="mt-3 space-y-2 font-mono text-[13px]">
              {[
                { from: 'ACME TECHNOLOGIES PVT LTD', to: 'Acme Technologies' },
                { from: 'SARAH', to: 'Sarah' },
              ].map((r) => (
                <li key={r.from} className="flex flex-wrap items-center gap-2">
                  <span className="text-slate-400 line-through dark:text-slate-500">{r.from}</span>
                  <ArrowRight size={14} aria-hidden="true" className="text-ember-500" />
                  <span className="font-semibold text-slate-900 dark:text-white">{r.to}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-4 rounded-modal bg-slate-950 p-5 text-white dark:bg-white/[0.04]">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ember-500">
              <Mail size={18} aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[14px] font-semibold">Email and phone waterfall</p>
              <p className="text-[13px] text-white/60">Stops at the first qualifying result. You pay only when found.</p>
            </div>
            <span className="hidden gap-1 sm:flex" aria-hidden="true">
              <span className="h-2 w-6 rounded-full bg-white/20" />
              <span className="h-2 w-6 rounded-full bg-white/20" />
              <span className="h-2 w-6 rounded-full bg-ember-400" />
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══ 7. Two ways to start ═══════════════════════════════════════════════════ */

function TwoWays() {
  const ways = [
    {
      letter: 'A',
      icon: Search,
      title: 'Build a new list.',
      body: 'Start from your Company Profile. Harvin discovers companies, researches them, scores Company Fit and finds the buyers.',
      steps: ['Company Profile', 'Discover', 'Research', 'Company Fit', 'Buyers'],
      link: 'Explore Company Discovery',
      href: '/company-discovery', // page not built yet
    },
    {
      letter: 'B',
      icon: Upload,
      title: 'Improve the list you have.',
      body: 'Upload a CSV or XLSX of companies, contacts or both. Harvin cleans the names, fills missing details, scores fit and finds the buyers who are missing.',
      steps: ['Upload', 'Clean names', 'Fill details', 'Company Fit', 'Missing buyers'],
      link: 'Explore Data Enrichment',
      href: '/data-enrichment', // page not built yet
    },
  ];
  return (
    <section id="two-ways" className={`${SECTION} ${BAND}`}>
      <div className={WRAP}>
        <Reveal className="mx-auto max-w-[760px] text-center">
          <Eyebrow center>Two ways to start</Eyebrow>
          <h2 className={`mt-5 ${H2}`}>Build a new list or improve the one you have</h2>
        </Reveal>
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {ways.map((w, i) => (
            <Reveal key={w.letter} delay={i * 120} className={`${SURFACE} flex flex-col p-7`}>
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-btn bg-ember-500 font-instrument text-[18px] font-semibold text-white">
                  {w.letter}
                </span>
                <w.icon size={18} aria-hidden="true" className="text-slate-400 dark:text-slate-500" />
              </div>
              <h3 className="mt-5 text-[20px] font-bold text-slate-950 dark:text-white">{w.title}</h3>
              <p className="mt-2 text-[15.5px] leading-relaxed text-slate-600 dark:text-slate-400">{w.body}</p>
              <ol className="mt-6 flex flex-wrap items-center gap-1.5" aria-hidden="true">
                {w.steps.map((s, j) => (
                  <li key={s} className="flex items-center gap-1.5">
                    <Chip tone={j === w.steps.length - 1 ? 'ember' : 'sand'}>{s}</Chip>
                    {j < w.steps.length - 1 && <ArrowRight size={12} className="text-slate-300 dark:text-slate-600" />}
                  </li>
                ))}
              </ol>
              {/* Links hidden until /company-discovery and /data-enrichment exist.
              <TextLink href={w.href} className="mt-auto pt-7">
                {w.link}
              </TextLink>
              */}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══ 8. What you get — bento ════════════════════════════════════════════════ */

function WhatYouGet() {
  const items = [
    { icon: Building2, title: 'Companies that fit.', body: 'Including ones outside your usual filters.' },
    { icon: FileSearch, title: 'Research on each one.', body: 'Business model, customers, products, tech stack and the fields you choose.' },
    { icon: Gauge, title: 'Company Fit with reasons.', body: 'A score and the factors behind it, so anyone can check the logic.' },
    { icon: UserCheck, title: 'The right buyers.', body: 'Matched to your Target Profile by role, function and seniority.' },
    { icon: Phone, title: 'Work emails and phone numbers.', body: 'Found through an email and phone waterfall. Charged only when found.' },
    {
      icon: Bell,
      title: 'Signals.',
      body: "Changes at accounts you're watching, such as a new finance leader or a move into a new country.",
    },
  ];
  return (
    <section id="what-you-get" className={SECTION}>
      <div className={WRAP}>
        <Reveal className="grid gap-6 lg:grid-cols-2 lg:items-end">
          <div>
            <Eyebrow>What you get</Eyebrow>
            <h2 className={`mt-5 ${H2}`}>What you get on every Harvin list</h2>
          </div>
          <p className={`${LEAD} lg:pb-1`}>Every Harvin list carries six things, so your team can act on it the same day.</p>
        </Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={(i % 3) * 80} className={`${TILE} ${LIFT} group p-6`}>
              <span className="flex h-11 w-11 items-center justify-center rounded-card bg-ember-50 text-ember-500 transition-colors group-hover:bg-ember-500 group-hover:text-white dark:bg-ember-500/10 dark:text-ember-400 dark:group-hover:bg-ember-500 dark:group-hover:text-white">
                <it.icon size={20} aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-[17px] font-bold text-slate-950 dark:text-white">{it.title}</h3>
              <p className="mt-1.5 text-[14.5px] leading-relaxed text-slate-600 dark:text-slate-400">{it.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══ 9. Research fields ═════════════════════════════════════════════════════ */

function ResearchFields() {
  const chips = ['Store count', 'Location count', 'Monthly active users', 'Tech stack', 'Business model', 'Funding', 'Countries served'];
  return (
    <section id="research-fields" className={`${SECTION} ${BAND}`}>
      <div className={`${WRAP} grid items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16`}>
        <Reveal>
          <Eyebrow>Research fields</Eyebrow>
          <h2 className={`mt-5 ${H2}`}>The data that decides fit is often missing from the record</h2>
          <p className={`mt-6 ${LEAD}`}>
            A payments seller cares about currencies and countries. A vendor to retail chains cares about store count.
            A consumer-app tool cares about monthly active users. Harvin researches these fields for each company
            instead of relying on what a database happens to store. Field availability varies by company, and Harvin
            tells you when a value couldn&rsquo;t be found.
          </p>
          <ul className="mt-7 flex flex-wrap gap-2">
            {chips.map((c) => (
              <li key={c}>
                <Chip>{c}</Chip>
              </li>
            ))}
          </ul>
          {/* Link hidden until /research-fields exists.
          <TextLink href="/research-fields" className="mt-8">
            See all research fields
          </TextLink>
          */}
        </Reveal>

        <Reveal delay={120}>
          <div className={`${SURFACE} p-5 sm:p-6`} role="img" aria-label="An illustrative company record with standard database fields and fields researched by Harvin.">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-btn bg-slate-950 font-bold text-white dark:bg-white dark:text-slate-950">
                  V
                </span>
                <div>
                  <p className="text-[16px] font-bold text-slate-950 dark:text-white">Vela Commerce</p>
                  <p className="text-[12.5px] text-slate-500 dark:text-slate-400">Illustrative company record</p>
                </div>
              </div>
              <span className="rounded-md bg-ember-500 px-2.5 py-1 text-[12px] font-semibold text-white">88 · Strong fit</span>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-2.5">
              {[
                { k: 'Industry', v: 'Internet' },
                { k: 'Company size', v: '600' },
                { k: 'HQ', v: 'Singapore' },
              ].map((f) => (
                <div key={f.k} className={`${TILE} p-3`}>
                  <p className="text-[11.5px] text-slate-500 dark:text-slate-400">{f.k}</p>
                  <p className="mt-1 text-[14.5px] font-semibold text-slate-900 dark:text-white">{f.v}</p>
                </div>
              ))}
            </div>

            <p className="mb-2.5 mt-5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-ember-500 dark:text-ember-400">
              <Sparkles size={12} aria-hidden="true" /> Researched by Harvin
            </p>
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
              {[
                { k: 'Business model', v: 'Online marketplace' },
                { k: 'Monthly active users', v: '1.2M' },
                { k: 'Location count', v: '17 locations' },
                { k: 'Countries served', v: '22' },
                { k: 'Tech stack', v: 'Stripe, Shopify, AWS' },
                { k: 'Store count', v: "Couldn't be found", muted: true },
              ].map((f) => (
                <div
                  key={f.k}
                  className={`rounded-card border p-3 ${f.muted ? 'border-dashed border-slate-300 dark:border-white/[0.12]' : 'border-ember-200 bg-ember-50/60 dark:border-ember-500/30 dark:bg-ember-500/[0.06]'}`}
                >
                  <p className="text-[11.5px] text-slate-500 dark:text-slate-400">{f.k}</p>
                  <p className={`mt-1 text-[14.5px] font-semibold ${f.muted ? 'text-slate-400 dark:text-slate-500' : 'text-slate-900 dark:text-white'}`}>
                    {f.v}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══ 10. Who it's for ═══════════════════════════════════════════════════════ */

function WhoItsFor() {
  const segments = [
    { icon: CreditCard, title: 'Fintech and payments.', body: 'Find companies by how they collect, pay and move money.', href: '/use-cases/fintech-payments' }, // page not built yet,
    { icon: Layers, title: 'B2B SaaS and enterprise tech.', body: 'Find companies that share the workflow your product fixes.', href: '/use-cases/b2b-saas' }, // page not built yet,
    {
      icon: Store,
      title: 'Vendors to multi-location and consumer businesses.',
      body: 'Find chains, D2C brands and apps by store count, locations and users.',
      href: '/use-cases/multi-location-consumer', // page not built yet
    },
    { icon: Globe2, title: 'Teams entering new markets.', body: 'Reuse what worked at home to find accounts abroad.', href: '/use-cases/new-markets' }, // page not built yet,
    { icon: Users, title: 'Outbound and GTM agencies.', body: "One research process for every client's ideal customer.", href: '/use-cases/outbound-agencies' }, // page not built yet,
  ];
  const regions = [
    { label: 'India', href: '/regions/india' }, // page not built yet
    { label: 'Southeast Asia', href: '/regions/southeast-asia' }, // page not built yet
    { label: 'UAE & Middle East', href: '/regions/uae' }, // page not built yet
  ];
  return (
    <section id="who-its-for" className={SECTION}>
      <div className={WRAP}>
        <Reveal className="max-w-[780px]">
          <Eyebrow>Who it&rsquo;s for</Eyebrow>
          <h2 className={`mt-5 ${H2}`}>Built for teams whose customers are hard to find with filters</h2>
          <p className={`mt-5 ${LEAD}`}>
            Harvin suits B2B teams whose ideal customers are defined by what companies do, not the industry label they
            carry.
          </p>
        </Reveal>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {segments.map((s, i) => (
            <li key={s.title}>
              <Reveal delay={(i % 3) * 80} className="h-full">
                {/* Plain card until the /use-cases/* pages exist (s.href keeps the route). */}
                <div className={`${TILE} flex h-full flex-col p-6`}>
                  <s.icon size={22} aria-hidden="true" className="text-ember-500 dark:text-ember-400" />
                  <h3 className="mt-5 text-[17px] font-bold text-slate-950 dark:text-white">{s.title}</h3>
                  <p className="mt-1.5 flex-1 text-[14.5px] leading-relaxed text-slate-600 dark:text-slate-400">{s.body}</p>
                </div>
              </Reveal>
            </li>
          ))}
          <li>
            <Reveal delay={160} className="h-full">
              <div className="flex h-full flex-col rounded-card bg-slate-950 p-6 text-white dark:border dark:border-white/[0.08] dark:bg-white/[0.04]">
                <Globe2 size={22} aria-hidden="true" className="text-ember-400" />
                <p className="mt-5 text-[17px] font-bold">Strong where global databases are thin:</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {/* Plain labels until the /regions/* pages exist (r.href keeps the route). */}
                  {regions.map((r) => (
                    <span
                      key={r.href}
                      className="rounded-full border border-white/[0.16] px-3.5 py-1.5 text-[13.5px] font-semibold"
                    >
                      {r.label}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </li>
        </ul>
      </div>
    </section>
  );
}

/* ═══ 11. Pricing teaser ═════════════════════════════════════════════════════ */

function PricingTeaser() {
  const starter = PLANS.find((p) => p.id === 'starter');
  return (
    <section id="pricing-teaser" className={`${SECTION} ${BAND}`}>
      <Reveal className={WRAP}>
        <div className="relative overflow-hidden rounded-modal bg-gradient-to-br from-ember-500 to-ember-700 p-8 text-white shadow-[0_20px_60px_rgba(201,76,30,0.3)] sm:p-12">
          <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="relative grid gap-10 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:items-center">
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-white/75">Pricing</p>
              <h2 className="mt-4 font-instrument text-[clamp(30px,3.6vw,46px)] font-semibold leading-[1.08] tracking-[-0.025em]">
                Start free. Pay for what Harvin finds.
              </h2>
              <p className="mt-5 text-[17px] leading-relaxed text-white/85">
                Start with {FREE_CREDITS} free credits and see your first {PREVIEW_COMPANIES} companies with fit reasons.
                Paid plans start at ${starter?.monthly} a month for {starter?.monthlyCredits?.toLocaleString('en-US')}{' '}
                credits. Emails and phone numbers are charged only when found.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={startFreeHref()}
                  className="group inline-flex items-center justify-center gap-2 rounded-btn bg-white px-6 py-3.5 text-[15px] font-semibold text-ember-600 transition-colors hover:bg-ember-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  Start free
                  <ArrowRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
                </a>
                <Link
                  href="/pricing"
                  className="inline-flex items-center justify-center rounded-btn border border-white/40 px-6 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-white/10"
                >
                  See pricing
                </Link>
              </div>
            </div>
            <ul className="grid grid-cols-3 gap-3 lg:grid-cols-1" aria-hidden="true">
              {[
                { v: String(FREE_CREDITS), k: 'free credits, no card' },
                { v: String(PREVIEW_COMPANIES), k: 'companies, with fit reasons' },
                { v: `$${starter?.monthly}`, k: `a month for ${starter?.monthlyCredits?.toLocaleString('en-US')} credits` },
              ].map((s) => (
                <li key={s.k} className="rounded-card border border-white/20 bg-white/10 p-4 lg:flex lg:items-baseline lg:gap-4">
                  <span className="block font-instrument text-[30px] font-semibold leading-none tracking-[-0.02em] lg:w-20">{s.v}</span>
                  <span className="mt-1.5 block text-[12.5px] text-white/80 lg:mt-0">{s.k}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ═══ 12. Origin ═════════════════════════════════════════════════════════════ */

function Origin() {
  return (
    <section id="origin" className={SECTION}>
      <div className={`${WRAP} grid items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16`}>
        <Reveal>
          <div className="relative overflow-hidden rounded-modal bg-[#0C0B09] p-8 text-white sm:p-10">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_100%_0%,rgba(201,76,30,0.3),transparent_70%)]" />
            <p className="relative font-instrument text-[clamp(72px,9vw,120px)] font-semibold leading-none tracking-[-0.04em] text-ember-400">
              ~80
            </p>
            <p className="relative mt-3 text-[16px] font-semibold">client engagements at Thyleads</p>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <Eyebrow>Why we built Harvin</Eyebrow>
          <h2 className={`mt-5 ${H2}`}>Why did the team behind Thyleads build Harvin?</h2>
          <p className={`mt-6 ${LEAD}`}>
            Harvin was built by the team behind Thyleads, an outbound agency, after nearly 80 client engagements spent
            building prospect lists by hand. Every client could describe a great customer in a sentence, but not in
            database filters. The research happened one browser tab at a time, title searches returned the wrong
            people, and the reasons behind each targeting decision got lost between tools. Harvin is the tool that work
            needed.
          </p>
          {/* <TextLink href="/about" className="mt-7">
            Read our story
          </TextLink> */}
        </Reveal>
      </div>
    </section>
  );
}

/* ═══ Page body ══════════════════════════════════════════════════════════════ */

export default function HomeClient() {
  return (
    <>
      <Hero />
      <EntityStrip />
      <Problem />
      <HowItWorks />
      <Example />
      <PeopleSearch />
      <TwoWays />
      <WhatYouGet />
      <ResearchFields />
      <WhoItsFor />
      <PricingTeaser />
      <Origin />
    </>
  );
}
