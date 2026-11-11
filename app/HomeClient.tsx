'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import Link from 'next/link';
import {
  ArrowDown,
  ArrowRight,
  Briefcase,
  Building2,
  Check,
  CircleAlert,
  CreditCard,
  Database,
  FileSpreadsheet,
  Gauge,
  Layers,
  ListFilter,
  Mail,
  MapPin,
  Phone,
  Plus,
  RefreshCw,
  Search,
  Sparkles,
  Store,
  Target,
  TrendingUp,
  Upload,
  UserCheck,
  UserMinus,
  UserPlus,
  Wand2,
  X,
  Zap,
} from 'lucide-react';

import Hero from '@/components/Hero';
import { startFreeHref } from '@/lib/site';
import { FREE_CREDITS, PLANS, PREVIEW_COMPANIES } from '@/lib/pricing';

/**
 * Homepage body (below the hero). Copy is "Harvin Home Page Content .md"
 * (public/), trimmed to one line per section; the visuals carry the rest.
 *
 * Visual language is lifted from app/data-building/DataBuildingClient.tsx,
 * which the client signed off on: ruled eyebrows, sand/#0F0E0C surfaces, the
 * ember "Harvin" accent card, dashed flow connectors, an always-dark showcase
 * band, animated waterfalls and stat cards. Company and person names in the
 * mocks are fictional.
 */

/* ═══ Motion hooks ═══════════════════════════════════════════════════════════
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

/** Steps 0 → length-1 on a loop while `active`; sits on the last (complete) step otherwise. */
function useCycle(length: number, ms: number, active: boolean) {
  const [step, setStep] = useState(length - 1);
  useEffect(() => {
    if (!active || prefersReducedMotion()) return;
    setStep(0);
    const t = setInterval(() => setStep((s) => (s + 1) % length), ms);
    return () => clearInterval(t);
  }, [active, length, ms]);
  return step;
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

function CountUp({ to, prefix = '' }: { to: number; prefix?: string }) {
  const [ref, seen] = useInView<HTMLSpanElement>(0.4);
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!seen) return;
    if (prefersReducedMotion()) {
      setN(to);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / 1200, 1);
      setN(Math.round(to * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, to]);
  return (
    <span ref={ref}>
      <span className="sr-only">{`${prefix}${to.toLocaleString('en-US')}`}</span>
      <span aria-hidden="true" className="tabular-nums">
        {prefix}
        {n.toLocaleString('en-US')}
      </span>
    </span>
  );
}

/** Circular Company Fit gauge. Colors come from `currentColor` on the two rings. */
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

/* ═══ Shared primitives (as on /data-building) ═══════════════════════════════ */

function Eyebrow({ children, center, dark }: { children: ReactNode; center?: boolean; dark?: boolean }) {
  return (
    <p
      className={`flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] ${dark ? 'text-ember-400' : 'text-ember-500 dark:text-ember-400'} ${center ? 'justify-center' : ''}`}
    >
      <span aria-hidden="true" className={`h-px w-6 ${dark ? 'bg-ember-400' : 'bg-ember-500 dark:bg-ember-400'}`} />
      {children}
    </p>
  );
}

function Label({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <p className={`text-[11px] font-semibold uppercase tracking-[0.12em] text-ember-500 dark:text-ember-400 ${className}`}>{children}</p>;
}

function Chip({ children, tone = 'sand' }: { children: ReactNode; tone?: 'sand' | 'ember' }) {
  return (
    <span
      className={[
        'inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[12.5px] font-medium',
        tone === 'ember'
          ? 'bg-ember-50 text-ember-700 dark:bg-ember-500/15 dark:text-ember-300'
          : 'bg-sand-200 text-slate-800 dark:bg-white/[0.06] dark:text-slate-200',
      ].join(' ')}
    >
      {children}
    </span>
  );
}

/** Harvin mark, cut from the same artwork as the footer/navbar lockup (harvin-logo.png) so the colour matches exactly. */
function Mark({ className = 'h-4' }: { className?: string }) {
  return <img src="/harvin-mark.png" alt="" aria-hidden="true" className={`w-auto ${className}`} />;
}

function FlowArrow({ className = '' }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`flex shrink-0 items-center justify-center text-ember-500 dark:text-ember-400 ${className}`}>
      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-ember-200 bg-white dark:border-ember-500/30 dark:bg-[#0F0E0C]">
        <ArrowRight size={15} strokeWidth={2.5} className="hidden lg:block" />
        <ArrowDown size={15} strokeWidth={2.5} className="lg:hidden" />
      </span>
    </div>
  );
}

function TextLink({ href, children, className = '', dark }: { href: string; children: ReactNode; className?: string; dark?: boolean }) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-1.5 text-[15px] font-semibold ${dark ? 'text-ember-300 hover:text-ember-200' : 'text-ember-500 hover:text-ember-400 dark:text-ember-400 dark:hover:text-ember-300'} ${className}`}
    >
      {children}
      <ArrowRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}

const SECTION = 'scroll-mt-20 border-b border-slate-200 px-6 py-20 dark:border-white/[0.08] lg:py-28';
const BAND = 'bg-white/60 dark:bg-white/[0.015]';
const WRAP = 'mx-auto max-w-[1180px]';
const H2 = 'font-instrument font-semibold text-[clamp(30px,3.6vw,46px)] leading-[1.08] tracking-[-0.025em] text-slate-950 dark:text-white';
const LEAD = 'text-[17px] leading-relaxed text-slate-600 dark:text-slate-300';
const SURFACE =
  'rounded-modal border border-slate-200 bg-sand-50 shadow-[0_4px_32px_rgba(0,0,0,0.06)] dark:border-white/[0.08] dark:bg-[#0F0E0C] dark:shadow-[0_4px_40px_rgba(0,0,0,0.35)]';
const SURFACE_ACCENT =
  'rounded-modal border border-ember-300 bg-white shadow-[0_0_0_4px_rgba(201,76,30,0.06),0_4px_32px_rgba(0,0,0,0.06)] dark:border-ember-500/40 dark:bg-[#0F0E0C] dark:shadow-[0_0_0_4px_rgba(201,76,30,0.08),0_4px_40px_rgba(0,0,0,0.35)]';
const TILE = 'rounded-card border border-slate-200 bg-white dark:border-white/[0.08] dark:bg-white/[0.03]';
const LIFT = 'transition-all duration-200 hover:-translate-y-0.5 hover:border-ember-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:hover:border-ember-500/40 dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)]';
const CTA_BTN =
  'group inline-flex items-center justify-center gap-2 rounded-btn bg-ember-500 px-6 py-3.5 text-[15px] font-semibold text-white ' +
  'shadow-[0_1px_4px_rgba(201,76,30,0.3)] transition-all duration-150 hover:bg-ember-400 hover:shadow-[0_4px_14px_rgba(201,76,30,0.4)] ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950';

/** Ember callout strip with a leading icon (the "30%" box on /data-building). */
function Callout({ icon: Icon, children }: { icon: typeof Zap; children: ReactNode }) {
  return (
    <div className="flex items-center gap-4 rounded-modal border border-ember-200 bg-ember-50/70 p-5 dark:border-ember-500/20 dark:bg-ember-500/[0.07] sm:gap-5 sm:p-6">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ember-500 text-white shadow-[0_4px_14px_rgba(201,76,30,0.35)]">
        <Icon size={19} aria-hidden="true" />
      </span>
      <p className="text-[17px] font-semibold leading-snug text-slate-900 dark:text-white">{children}</p>
    </div>
  );
}

/* ═══ Content ════════════════════════════════════════════════════════════════ */

const EXAMPLES = [
  { who: 'A payments company', rest: 'may care about who receives money internationally.', icon: CreditCard, filter: 'Industry: Fintech', matters: 'Who receives money internationally' },
  { who: 'A retail software company', rest: 'may care about store count.', icon: Store, filter: 'Industry: Retail', matters: 'Store count' },
  { who: 'A SaaS company', rest: 'may care about the tools a business uses.', icon: Layers, filter: 'Employees: 50–500', matters: 'The tools a business uses' },
];

const INPUTS = [
  { k: 'What you sell', v: 'What your product does, the problems it solves and who needs it.', icon: Briefcase },
  { k: 'Who already buys', v: 'Add a few customers that converted and companies that didn’t.', icon: Building2 },
  { k: 'Who you want to reach', v: 'Tell Harvin the roles, functions and seniority you usually sell to.', icon: UserCheck },
  { k: 'What matters when judging fit', v: 'Industry, geography, business model, technologies, locations, users or anything else important to your business.', icon: Target },
];

const CRITERIA = [
  { label: 'Business model', body: 'How the company makes money.' },
  { label: 'Use case', body: 'Why the company may need what you sell.' },
  { label: 'Customer type', body: 'Who they sell to or serve.' },
  { label: 'Technology', body: 'The tools and systems they use.' },
  { label: 'Geography', body: 'Where they operate, not just where they are headquartered.' },
  { label: 'Company characteristics', body: 'Stores, locations, users, funding, revenue or other important criteria.' },
];

/* Worked example: a cross-border payments seller. Each company is filed under a
   non-fintech industry, so an industry filter never returns it; the chips say
   which criteria Harvin matched it on. Names are fictional. */
const DISCOVERY_EXAMPLE = [
  { name: 'Northstar Software', listed: 'Software', fit: 91, why: [['Use case', 'Bills customers in 18 countries'], ['Technology', 'Uses Stripe']] },
  { name: 'Vela Commerce', listed: 'Internet', fit: 88, why: [['Business model', 'Marketplace that pays sellers'], ['Geography', 'Operates in 22 countries']] },
  { name: 'Brightpath Learning', listed: 'EdTech', fit: 84, why: [['Customer type', 'Students overseas'], ['Use case', 'Collects tuition from abroad']] },
  { name: 'Kitecart', listed: 'Social commerce', fit: 79, why: [['Company characteristics', '1.2M users'], ['Use case', 'Pays creators abroad']] },
];

/* Before vs after for one company. Standard fields are the same either side. */
const STANDARD = [
  { k: 'Industry', v: 'Internet' },
  { k: 'Employees', v: '600' },
  { k: 'HQ', v: 'Singapore' },
];

const RESEARCH = [
  { k: 'Business model', d: 'Understand how the company operates and makes money.', v: 'Online marketplace' },
  { k: 'Technology', d: 'See the tools and systems relevant to your offer.', v: 'Stripe, Shopify, AWS' },
  { k: 'Locations or stores', d: 'Know the size of a physical business beyond employee count.', v: '17 locations' },
  { k: 'Countries served', d: 'Understand where the company actually operates.', v: '22' },
  { k: 'Users, funding and revenue', d: 'Add the numbers that help you judge fit.', v: '1.2M MAU, Series C' },
  { k: 'Your own criteria', d: 'Ask Harvin to research other information important to your business.', v: 'Pays sellers weekly' },
];

const PEOPLE_RULES = [
  { icon: ListFilter, title: 'Role priority', body: 'CFO first. VP Finance next. Head of Payments after that.' },
  { icon: Briefcase, title: 'Function', body: 'Finance, Operations, IT, Security, Marketing or whatever matters to you.' },
  { icon: TrendingUp, title: 'Seniority', body: 'Avoid people who are too junior for the conversation.' },
  { icon: Search, title: 'Title meaning', body: 'Harvin understands that similar roles can have very different titles.' },
];

const KEYWORD_RESULTS = [
  { title: 'Finance Manager', verdict: 'Too junior' },
  { title: 'VP Finance Transformation', verdict: 'Adjacent role' },
  { title: 'Finance Operations Lead', verdict: 'Not the buyer' },
  { title: 'Head of Commercial Finance', verdict: 'Adjacent role' },
];

const HARVIN_MATCHES = [
  { role: 'CFO', person: '', note: 'Not at this company, moving to the next role' },
  { role: 'VP Finance', person: 'Priya Nair', note: 'Email and phone found' },
  { role: 'Head of Payments', person: 'Arjun Rao', note: 'Title: “Treasury & FX Lead, APAC”' },
];

const SOURCES = ['Source A', 'Source B', 'Source C', 'More sources'];

const WATERFALLS = [
  { label: 'Work email', stopAt: 2, result: 'priya@velacommerce.co' },
  { label: 'Direct or mobile phone number', stopAt: 1, result: '+65 9XXX X412' },
];

const IMPROVE = [
  { icon: Wand2, t: 'Clean your data', d: 'Fix company names, contact names and inconsistent records.' },
  { icon: Gauge, t: 'Check company fit', d: 'See which companies actually match what you are looking for.' },
  { icon: Search, t: 'Fill missing research', d: 'Add the company information your targeting depends on.' },
  { icon: UserCheck, t: 'Find missing decision-makers', d: 'See who your team should be reaching inside each company.' },
  { icon: Sparkles, t: 'Discover more companies', d: 'Find relevant companies beyond the list you started with.' },
];

/* Illustrative outcome for a 500-row upload; one tile per doc item, in doc order. */
const OUTCOMES = [
  { to: 500, prefix: '', unit: 'records cleaned' },
  { to: 186, prefix: '', unit: 'companies that fit' },
  { to: 1240, prefix: '', unit: 'research fields filled' },
  { to: 143, prefix: '', unit: 'decision-makers found' },
  { to: 38, prefix: '+', unit: 'new companies beyond your list' },
];

const UPLOAD_ISSUES = [
  { k: 'Inconsistent names', v: '“ACME TECHNOLOGIES PVT LTD”', pct: 46 },
  { k: 'Revenue missing', v: '214 of 500', pct: 43 },
  { k: 'No decision-maker', v: '357 of 500', pct: 71 },
  { k: 'Fit unknown', v: '500 of 500', pct: 100 },
];

const CHANGE_STATS = [
  { to: 34, prefix: '+', l: 'New companies' },
  { to: 51, prefix: '+', l: 'New people' },
  { to: 12, prefix: '', l: 'Fit changes' },
  { to: 7, prefix: '', l: 'Removed' },
];

const CHANGES = [
  { icon: Building2, t: 'New companies', d: 'See newly discovered companies that now fit your criteria.' },
  { icon: UserPlus, t: 'New decision-makers', d: 'Find relevant people who joined or moved into target roles.' },
  { icon: Gauge, t: 'Fit changes', d: 'See when new information makes a company more or less relevant.' },
  { icon: MapPin, t: 'Company changes', d: 'Track expansion, leadership moves, funding and other useful updates.' },
  { icon: RefreshCw, t: 'Fresh contact data', d: 'Refresh emails and phone numbers when needed.' },
];

/* ═══ Animated mocks ═════════════════════════════════════════════════════════ */

/** Company Profile card. The block for the input the visitor is on lights up. */
function ProfileCard({ active }: { active: number }) {
  const tile = (i: number) =>
    [
      'rounded-card border p-4 transition-all duration-300',
      i === active
        ? 'border-ember-300 bg-white shadow-[0_0_0_4px_rgba(201,76,30,0.08)] dark:border-ember-500/50 dark:bg-ember-500/[0.06]'
        : 'border-slate-200 bg-white dark:border-white/[0.08] dark:bg-white/[0.03]',
    ].join(' ');
  return (
    <div className={`${SURFACE} overflow-hidden`} role="img" aria-label="An illustrative Company Profile for a cross-border payments company.">
      <div className="flex items-center justify-between border-b border-slate-200 bg-white/60 px-5 py-3.5 dark:border-white/[0.08] dark:bg-white/[0.02]" aria-hidden="true">
        <p className="flex items-center gap-2.5 text-[16px] font-semibold text-slate-900 dark:text-white">
          <Mark className="h-5" />
          Company Profile
        </p>
        <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-50 px-2.5 py-1 text-[12.5px] font-medium text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400">
          <Check size={12} strokeWidth={3} />
          Saved
        </span>
      </div>
      <div className="grid gap-3 p-4" aria-hidden="true">
        <div className={tile(0)}>
          <Label>What you sell</Label>
          <p className="mt-2.5 text-[15px] font-bold text-slate-900 dark:text-white">Cross-border payment infrastructure</p>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            <Chip>Global payouts</Chip>
            <Chip>FX</Chip>
          </div>
        </div>
        <div className={tile(1)}>
          <Label>Who already buys</Label>
          <p className="mt-2.5 text-[12.5px] text-slate-500 dark:text-slate-400">Converted</p>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            <Chip tone="ember">Tripwise</Chip>
            <Chip tone="ember">Orbit Learn</Chip>
          </div>
          <p className="mt-2.5 text-[12.5px] text-slate-500 dark:text-slate-400">Didn’t convert</p>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            <Chip>CornerMart</Chip>
          </div>
        </div>
        <div className={tile(2)}>
          <Label>Who you want to reach</Label>
          <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
            {['CFO', 'VP Finance', 'Head of Payments'].map((r, i) => (
              <span key={r} className="flex items-center gap-1.5">
                {i > 0 && <ArrowRight size={11} className="text-ember-400" />}
                <Chip>{r}</Chip>
              </span>
            ))}
          </div>
          <p className="mt-2.5 text-[12.5px] text-slate-500 dark:text-slate-400">Finance, head and above</p>
        </div>
        <div className={tile(3)}>
          <Label>What matters</Label>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {['Pays sellers abroad', '10+ countries', 'Uses Stripe', 'India, SEA, UAE'].map((c) => (
              <Chip key={c} tone="ember">
                {c}
              </Chip>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Waterfalls() {
  const [ref, seen] = useInView<HTMLDivElement>(0.3);
  const step = useCycle(8, 750, seen);

  return (
    <div ref={ref} className="grid flex-1 gap-6 md:grid-cols-2">
      {WATERFALLS.map((w) => {
        const finished = step > w.stopAt;
        return (
          <div key={w.label}>
            <Label>{w.label}</Label>
            <ol className="mt-3 space-y-2">
              {SOURCES.map((src, i) => {
                const revealed = step > i || finished;
                const state = !revealed ? (i === step ? 'checking' : 'queued') : i < w.stopAt ? 'miss' : i === w.stopAt ? 'hit' : 'skip';
                return (
                  <li
                    key={src}
                    className={[
                      'flex items-center justify-between gap-2 rounded-btn border px-4 py-2.5 text-[14px] transition-all duration-300',
                      state === 'hit' && 'border-ember-500 bg-ember-500 font-semibold text-white shadow-[0_4px_14px_rgba(201,76,30,0.3)]',
                      state === 'miss' && 'border-slate-200 bg-white font-semibold text-slate-900 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-white',
                      state === 'checking' && 'border-ember-300 bg-white font-semibold text-slate-900 dark:border-ember-500/40 dark:bg-white/[0.03] dark:text-white',
                      (state === 'skip' || state === 'queued') && 'border-dashed border-slate-300 text-slate-400 dark:border-white/[0.1] dark:text-slate-500',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                  >
                    <span>{src}</span>
                    {state === 'hit' && (
                      <span className="rounded-md bg-white px-2 py-0.5 text-[12px] font-semibold text-slate-900 dark:bg-white/20 dark:text-white dark:ring-1 dark:ring-inset dark:ring-white/25">
                        Found
                      </span>
                    )}
                    {state === 'miss' && <span className="font-normal text-slate-500 dark:text-slate-400">No match</span>}
                    {state === 'skip' && <span>Not needed</span>}
                    {state === 'queued' && <span>Queued</span>}
                    {state === 'checking' && (
                      <span className="inline-flex items-center gap-1.5 font-normal text-ember-600 dark:text-ember-400">
                        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-ember-500 motion-safe:animate-pulse" />
                        Checking…
                      </span>
                    )}
                  </li>
                );
              })}
            </ol>
            <div
              className={[
                'mt-3 flex items-center gap-3 rounded-btn border px-4 py-3 transition-all duration-500',
                finished
                  ? 'border-ember-400 bg-white dark:border-ember-500/60 dark:bg-[#0F0E0C]'
                  : 'border-dashed border-slate-300 bg-transparent opacity-50 dark:border-white/[0.1]',
              ].join(' ')}
            >
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-white transition-colors ${finished ? 'bg-ember-500' : 'bg-slate-300 dark:bg-white/[0.1]'}`}
              >
                <Check size={13} strokeWidth={3} aria-hidden="true" />
              </span>
              <p className="min-w-0 truncate text-[15px] font-semibold text-slate-900 dark:text-white">{finished ? w.result : 'Searching…'}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ═══ Sections ═══════════════════════════════════════════════════════════════ */

function Problem() {
  return (
    <section id="problem" className={`${SECTION} ${BAND}`}>
      <div className={WRAP}>
        <Reveal className="max-w-[860px]">
          <Eyebrow>The problem</Eyebrow>
          <h2 className={`mt-5 ${H2}`}>B2B company discovery that starts with your business, not a filter.</h2>
          <p className={`mt-5 ${LEAD}`}>Your best-fit customers are rarely defined by industry, size and location alone.</p>
        </Reveal>

        <Reveal className={`mt-12 overflow-hidden ${SURFACE}`}>
          <div className="hidden grid-cols-[minmax(0,1.4fr)_minmax(0,0.8fr)_minmax(0,1fr)] gap-6 border-b border-slate-200 bg-white/60 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] dark:border-white/[0.08] dark:bg-white/[0.02] sm:grid">
            <span className="text-slate-400 dark:text-slate-500">If you sell</span>
            <span className="text-slate-400 dark:text-slate-500">A database filter sees</span>
            <span className="text-ember-500 dark:text-ember-400">What decides fit</span>
          </div>
          <div className="divide-y divide-slate-200 dark:divide-white/[0.06]">
            {EXAMPLES.map((r) => (
              <div key={r.who} className="grid gap-2 px-6 py-5 transition-colors hover:bg-white/70 dark:hover:bg-white/[0.02] sm:grid-cols-[minmax(0,1.4fr)_minmax(0,0.8fr)_minmax(0,1fr)] sm:items-center sm:gap-6">
                <p className="flex items-center gap-3 text-[15.5px] leading-snug text-slate-600 dark:text-slate-300">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-btn bg-ember-50 text-ember-500 dark:bg-ember-500/10 dark:text-ember-400">
                    <r.icon size={15} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="font-semibold text-slate-900 dark:text-white">{r.who}</span> {r.rest}
                  </span>
                </p>
                <p className="flex items-center gap-2 text-[15px] text-slate-500 dark:text-slate-400">
                  <X size={14} className="shrink-0 text-slate-300 dark:text-slate-600" aria-hidden="true" />
                  {r.filter}
                </p>
                <p className="flex items-center gap-2 text-[15px] font-semibold text-slate-900 dark:text-white">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ember-500 text-white">
                    <Check size={11} strokeWidth={3} aria-hidden="true" />
                  </span>
                  {r.matters}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
        <p className="mt-4 text-center text-[14.5px] text-slate-500 dark:text-slate-400">That context is hard to fit into a few database filters.</p>

        <Reveal>
          <p className="mx-auto mt-10 max-w-[780px] text-center text-[18px] font-semibold leading-relaxed text-slate-900 dark:text-white">
            So teams still spend hours researching companies, checking whether they actually fit, and finding the right people
            inside them. <span className="text-ember-500 dark:text-ember-400">Harvin was built to do that work.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function StartWithBusiness() {
  // Visitor-driven (hover, focus or click): the profile answers whichever input they are on.
  const [active, setActive] = useState(0);

  const input = (i: number, side: 'left' | 'right') => {
    const inp = INPUTS[i];
    const on = i === active;
    return (
      <li key={inp.k} className="relative">
        {/* dashed connector into the card */}
        <span
          aria-hidden="true"
          className={`absolute top-1/2 hidden w-8 border-t-2 border-dashed transition-colors lg:block ${side === 'left' ? '-right-8' : '-left-8'} ${on ? 'border-ember-400' : 'border-slate-300 dark:border-white/[0.12]'}`}
        />
        <button
          type="button"
          aria-pressed={on}
          onClick={() => setActive(i)}
          onMouseEnter={() => setActive(i)}
          onFocus={() => setActive(i)}
          className={[
            'flex w-full gap-3 rounded-card border p-4 text-left transition-all duration-200',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-500',
            on
              ? 'border-ember-300 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:border-ember-500/40 dark:bg-[#0F0E0C] dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)]'
              : 'border-slate-200 bg-white/60 dark:border-white/[0.08] dark:bg-white/[0.02]',
          ].join(' ')}
        >
          <span
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-btn transition-colors ${on ? 'bg-ember-500 text-white' : 'bg-ember-50 text-ember-500 dark:bg-ember-500/10 dark:text-ember-400'}`}
          >
            <inp.icon size={17} aria-hidden="true" />
          </span>
          <span className="min-w-0">
            <span className="block text-[15px] font-bold text-slate-900 dark:text-white">{inp.k}</span>
            <span className="mt-0.5 block text-[13px] leading-snug text-slate-500 dark:text-slate-400">{inp.v}</span>
          </span>
        </button>
      </li>
    );
  };

  return (
    <section id="company-profile" className={SECTION}>
      <div className={WRAP}>
        <Reveal className="mx-auto max-w-[760px] text-center">
          <Eyebrow center>Start with your business</Eyebrow>
          <h2 className={`mt-5 ${H2}`}>Tell Harvin what a good customer looks like.</h2>
          <p className={`mt-5 ${LEAD}`}>
            You already know more about your best customers than any database filter can capture. Give Harvin that context once.
            It uses it every time it finds and researches companies for you.
          </p>
        </Reveal>

        <div className="mt-14 grid items-center gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)_minmax(0,1fr)] lg:gap-8">
          <ul className="order-2 space-y-4 lg:order-1">
            {input(0, 'left')}
            {input(1, 'left')}
          </ul>

          <Reveal className="order-1 lg:order-2">
            <div className="relative">
              <div aria-hidden="true" className="absolute -inset-6 rounded-[32px] bg-ember-500/10 blur-3xl dark:bg-ember-500/15" />
              <div className="relative">
                <ProfileCard active={active} />
              </div>
            </div>
          </Reveal>

          <ul className="order-3 space-y-4">
            {input(2, 'right')}
            {input(3, 'right')}
          </ul>
        </div>

        <Reveal className="mx-auto mt-12 max-w-[760px]">
          <div className="flex gap-3 rounded-card border border-ember-200 bg-ember-50 p-5 dark:border-ember-500/20 dark:bg-ember-500/10">
            <Zap size={18} className="mt-0.5 shrink-0 text-ember-500 dark:text-ember-400" aria-hidden="true" />
            <div>
              <p className="text-[15.5px] font-semibold text-ember-700 dark:text-ember-300">Harvin turns this into your Company Profile.</p>
              <p className="mt-1 text-[14.5px] leading-relaxed text-slate-700 dark:text-slate-300">
                From there, it knows what to look for — without asking you to rebuild the same filters every time.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Discovery() {
  return (
    <section id="discovery" className={`${SECTION} ${BAND}`}>
      <div className={WRAP}>
        <Reveal className="max-w-[860px]">
          <Eyebrow>Company discovery</Eyebrow>
          <h2 className={`mt-5 ${H2}`}>Discover companies that traditional databases can&rsquo;t find</h2>
          <p className={`mt-5 ${LEAD}`}>Harvin uses your Company Profile to look beyond industry, employee count and revenue.</p>
          <p className={`mt-3 ${LEAD}`}>
            It searches for the things your best customers actually have in common — how they operate, what they sell, who they
            serve, the tools they use and the problems they may have.
          </p>
        </Reveal>

        {/* Worked example */}
        <Reveal delay={120} className={`${SURFACE} mt-12 overflow-hidden`}>
          <div className="flex flex-col gap-4 border-b border-slate-200 bg-white/60 px-5 py-4 dark:border-white/[0.08] dark:bg-white/[0.02] sm:px-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <Mark className="h-6" />
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ember-500 dark:text-ember-400">Example</p>
                <p className="text-[16px] font-bold text-slate-900 dark:text-white">You sell cross-border payment infrastructure</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-[13px]">
              <span className="inline-flex items-center gap-1.5 rounded-md border border-dashed border-slate-300 px-2.5 py-1 text-slate-500 dark:border-white/[0.14] dark:text-slate-400">
                <ListFilter size={13} aria-hidden="true" />
                Database filter: Industry = Fintech
              </span>
              <span className="inline-flex items-center gap-1 rounded-md bg-red-500/10 px-2.5 py-1 font-semibold text-red-600 dark:text-red-400">
                <X size={12} strokeWidth={3} aria-hidden="true" />
                Finds 0 of these
              </span>
            </div>
          </div>

          <div className="hidden grid-cols-[minmax(0,1fr)_minmax(0,1.8fr)_90px] gap-4 border-b border-slate-200 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400 dark:border-white/[0.08] dark:text-slate-500 md:grid">
            <span>Company Harvin found</span>
            <span className="text-ember-500 dark:text-ember-400">Why it matches your Company Profile</span>
            <span className="text-right">Company Fit</span>
          </div>
          <ul className="divide-y divide-slate-200 dark:divide-white/[0.06]">
            {DISCOVERY_EXAMPLE.map((c) => (
              <li
                key={c.name}
                className="grid gap-3 px-5 py-4 transition-colors hover:bg-white/70 dark:hover:bg-white/[0.02] sm:px-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.8fr)_90px] md:items-center md:gap-4"
              >
                <div>
                  <p className="text-[15.5px] font-bold text-slate-900 dark:text-white">{c.name}</p>
                  <p className="mt-1 inline-flex items-center gap-1.5 text-[12.5px] text-slate-500 dark:text-slate-400">
                    <Database size={12} aria-hidden="true" />
                    Listed as <span className="font-semibold text-slate-700 dark:text-slate-300">{c.listed}</span>
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {c.why.map(([k, v]) => (
                    <span
                      key={k + v}
                      className="inline-flex items-center gap-1.5 rounded-md border border-ember-200 bg-ember-50/70 px-2.5 py-1 text-[13px] dark:border-ember-500/25 dark:bg-ember-500/[0.08]"
                    >
                      <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-ember-600 dark:text-ember-400">{k}</span>
                      <span className="font-medium text-slate-800 dark:text-slate-200">{v}</span>
                    </span>
                  ))}
                </div>
                <div className="md:text-right">
                  <span className="inline-flex items-center gap-1.5 rounded-btn bg-ember-500 px-2.5 py-1 font-mono text-[14px] font-bold text-white shadow-[0_1px_4px_rgba(201,76,30,0.3)]">
                    {c.fit}
                  </span>
                </div>
              </li>
            ))}
          </ul>
          <p className="border-t border-slate-200 px-5 py-3 text-[12px] text-slate-400 dark:border-white/[0.08] dark:text-slate-500 sm:px-6">
            Illustrative example. Company names are fictional.
          </p>
        </Reveal>

        <Reveal className="mt-14">
          <h3 className="text-[20px] font-bold text-slate-900 dark:text-white">Search by what matters to your business</h3>
        </Reveal>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CRITERIA.map((c, i) => (
            <li key={c.label} className="flex">
              <Reveal delay={(i % 3) * 80} className={`${TILE} ${LIFT} w-full px-5 py-4`}>
                <Label>{c.label}</Label>
                <p className="mt-1 text-[14px] leading-snug text-slate-700 dark:text-slate-300">{c.body}</p>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal className="mt-10">
          <Callout icon={Sparkles}>That helps surface relevant companies your usual searches may not.</Callout>
        </Reveal>
        <TextLink href="/data-building#discovery" className="mt-8">
          Explore Company Discovery
        </TextLink>
      </div>
    </section>
  );
}

function ResearchFit() {
  return (
    <section id="research" className="relative scroll-mt-20 overflow-hidden border-b border-white/[0.08] bg-[#0C0B09] px-6 py-20 text-white lg:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_60%_at_85%_40%,rgba(201,76,30,0.22),transparent_70%)]" />
      <div className={`relative ${WRAP}`}>
        <Reveal className="max-w-[860px]">
          <Eyebrow dark>Research &amp; Company Fit</Eyebrow>
          <h2 className="mt-5 font-instrument text-[clamp(30px,3.6vw,46px)] font-semibold leading-[1.08] tracking-[-0.025em] text-white">
            Find out which companies <span className="text-ember-400">actually fit.</span>
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-white/65">Finding a company is only the first step.</p>
          <p className="mt-3 text-[17px] leading-relaxed text-white/65">
            Harvin researches the details that matter to your business, then shows how well each company matches what you are
            looking for.
          </p>
        </Reveal>

        {/* One company, field by field: the database record vs. after Harvin's research */}
        <Reveal delay={120} className="mt-12 overflow-hidden rounded-modal border border-white/[0.08] bg-[#0F0E0C] shadow-[0_8px_40px_rgba(0,0,0,0.4)]">
          <div className="flex flex-wrap items-center gap-3 border-b border-white/[0.08] px-5 py-4 sm:px-6">
            <span className="flex h-10 w-10 items-center justify-center rounded-btn bg-gradient-to-br from-ember-500 to-ember-700 text-[13px] font-bold">VC</span>
            <div className="min-w-0 flex-1">
              <p className="text-[17px] font-bold">Vela Commerce</p>
              <p className="text-[13px] text-white/50">Research what your targeting depends on</p>
            </div>
            <span className="text-[12px] text-white/40">Illustrative example</span>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-[680px]">
              <div className="grid grid-cols-[minmax(0,1.25fr)_minmax(0,0.85fr)_minmax(0,1fr)] border-b border-white/[0.08] text-[11px] font-semibold uppercase tracking-[0.12em]">
                <span className="px-5 py-3 text-white/40 sm:px-6">Field</span>
                <span className="flex items-center gap-1.5 border-l border-white/[0.06] px-5 py-3 text-white/40">
                  <Database size={12} aria-hidden="true" /> Before: database record
                </span>
                <span className="flex items-center gap-1.5 border-l border-ember-500/30 bg-ember-500/[0.08] px-5 py-3 text-ember-400">
                  <Mark className="h-3.5" /> After Harvin research
                </span>
              </div>

              {STANDARD.map((f) => (
                <div key={f.k} className="grid grid-cols-[minmax(0,1.25fr)_minmax(0,0.85fr)_minmax(0,1fr)] border-b border-white/[0.05] text-[14px]">
                  <span className="px-5 py-2.5 text-white/50 sm:px-6">{f.k}</span>
                  <span className="border-l border-white/[0.06] px-5 py-2.5 text-white/80">{f.v}</span>
                  <span className="border-l border-ember-500/30 bg-ember-500/[0.04] px-5 py-2.5 text-white/80">{f.v}</span>
                </div>
              ))}

              {RESEARCH.map((r) => (
                <div key={r.k} className="grid grid-cols-[minmax(0,1.25fr)_minmax(0,0.85fr)_minmax(0,1fr)] border-b border-white/[0.05]">
                  <div className="px-5 py-3 sm:px-6">
                    <p className="text-[14px] font-semibold">{r.k}</p>
                    <p className="mt-0.5 text-[12.5px] leading-snug text-white/45">{r.d}</p>
                  </div>
                  <div className="flex items-center border-l border-white/[0.06] px-5 py-3">
                    <span className="rounded-md border border-dashed border-white/[0.14] px-2 py-0.5 text-[12.5px] text-white/35">Not in record</span>
                  </div>
                  <div className="flex items-center gap-2 border-l border-ember-500/30 bg-ember-500/[0.04] px-5 py-3">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ember-500">
                      <Check size={11} strokeWidth={3} aria-hidden="true" />
                    </span>
                    <span className="text-[14.5px] font-semibold">{r.v}</span>
                  </div>
                </div>
              ))}

              <div className="grid grid-cols-[minmax(0,1.25fr)_minmax(0,0.85fr)_minmax(0,1fr)]">
                <span className="px-5 py-4 text-[14px] font-bold sm:px-6">Company Fit</span>
                <div className="flex items-center border-l border-white/[0.06] px-5 py-4">
                  <span className="text-[14px] text-white/35">Unknown</span>
                </div>
                <div className="flex items-center gap-2.5 border-l border-ember-500/30 bg-ember-500/[0.1] px-5 py-4">
                  <span className="rounded-btn bg-ember-500 px-2.5 py-1 font-mono text-[14px] font-bold">88</span>
                  <span className="text-[14.5px] font-bold">Strong fit</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Company Fit, with the reasons */}
        <Reveal delay={200} className="mt-6 grid items-center gap-6 rounded-modal bg-gradient-to-br from-ember-500 to-ember-700 p-6 shadow-[0_8px_40px_rgba(201,76,30,0.35)] sm:p-8 lg:grid-cols-[auto_minmax(0,1fr)_minmax(0,1fr)] lg:gap-10">
          <ScoreRing score={88} size={124} trackClass="text-white/20" barClass="text-white">
            <span className="text-[40px] font-bold leading-none tracking-[-0.03em]">88</span>
            <span className="text-[11px] font-medium text-white/80">/ 100</span>
          </ScoreRing>
          <div>
            <h3 className="text-[22px] font-bold">See why every company fits</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-white/85">Harvin brings that research together into Company Fit.</p>
            <p className="mt-1.5 text-[15px] leading-relaxed text-white/85">
              You see the score and the reasons behind it, so your team can decide which companies deserve attention.
            </p>
          </div>
          <div>
            <ul className="space-y-2">
              {['Marketplace model, like your converted customers', 'Pays sellers in 22 countries', 'Uses Stripe'].map((t) => (
                <li key={t} className="flex items-center gap-2.5 rounded-btn bg-white/10 px-3 py-2 text-[14px] ring-1 ring-inset ring-white/15">
                  <Plus size={13} strokeWidth={3} aria-hidden="true" className="shrink-0" />
                  {t}
                </li>
              ))}
            </ul>
            <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[13px] font-semibold text-ember-700">
              <UserCheck size={14} aria-hidden="true" />
              Harvin recommends. Your team decides.
            </p>
          </div>
        </Reveal>

        <TextLink href="/data-building#research" dark className="mt-10">
          Explore Research &amp; Company Fit
        </TextLink>
      </div>
    </section>
  );
}

function DecisionMakers() {
  return (
    <section id="decision-makers" className={SECTION}>
      <div className={WRAP}>
        <Reveal className="max-w-[860px]">
          <Eyebrow>Decision-makers &amp; contacts</Eyebrow>
          <h2 className={`mt-5 ${H2}`}>Find the right people inside the right companies.</h2>
          <p className={`mt-5 ${LEAD}`}>Once Harvin knows which companies fit, it looks for the people most likely to buy.</p>
          <p className={`mt-3 ${LEAD}`}>
            You tell Harvin the roles, functions and seniority you care about. It searches for them in priority order and matches
            people by what their role actually means, not just by title keywords.
          </p>
        </Reveal>

        {/* Same company, same goal: keyword search vs. Harvin */}
        <div className="relative mt-12 grid gap-6 lg:grid-cols-2 lg:gap-12">
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 z-10 hidden h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-[13px] font-bold text-slate-500 shadow-[0_4px_20px_rgba(0,0,0,0.08)] dark:border-white/[0.12] dark:bg-[#0F0E0C] dark:text-slate-400 dark:shadow-[0_4px_20px_rgba(0,0,0,0.5)] lg:flex"
          >
            VS
          </span>

          {/* Without Harvin */}
          <Reveal className="flex flex-col overflow-hidden rounded-modal border border-slate-200 bg-slate-100/70 dark:border-white/[0.06] dark:bg-white/[0.02]">
            <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-6 py-4 dark:border-white/[0.06]">
              <p className="text-[17px] font-bold text-slate-500 dark:text-slate-400">Title keyword search</p>
              <span className="rounded-md bg-slate-200 px-2 py-0.5 text-[12px] font-semibold text-slate-600 dark:bg-white/[0.06] dark:text-slate-400">Without Harvin</span>
            </div>
            <div className="flex flex-1 flex-col p-6">
              <div className="flex items-center gap-2 rounded-btn border border-slate-200 bg-white px-3 py-2.5 text-[14px] text-slate-600 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-slate-300">
                <Search size={14} className="text-slate-400" aria-hidden="true" />
                Title contains <span className="font-semibold">&ldquo;Finance&rdquo;</span>
                <span className="ml-auto text-[12px] text-slate-400 dark:text-slate-500">2,418 results</span>
              </div>
              <ul className="mt-4 space-y-2">
                {KEYWORD_RESULTS.map((r) => (
                  <li key={r.title} className="flex items-center justify-between gap-3 rounded-btn border border-slate-200 bg-white/60 px-4 py-2.5 text-[14px] dark:border-white/[0.06] dark:bg-white/[0.02]">
                    <span className="text-slate-500 dark:text-slate-400">{r.title}</span>
                    <span className="inline-flex shrink-0 items-center gap-1 rounded-md bg-red-500/10 px-2 py-0.5 text-[12px] font-semibold text-red-600 dark:text-red-400">
                      <X size={11} strokeWidth={3} aria-hidden="true" />
                      {r.verdict}
                    </span>
                  </li>
                ))}
                <li className="flex items-center justify-between gap-3 rounded-btn border border-dashed border-amber-400/60 px-4 py-2.5 text-[14px]">
                  <span className="text-slate-500 dark:text-slate-400">VP Finance</span>
                  <span className="inline-flex shrink-0 items-center gap-1 text-[12px] font-semibold text-amber-600 dark:text-amber-400">
                    <CircleAlert size={12} aria-hidden="true" />
                    Buried at row 38
                  </span>
                </li>
              </ul>
              <div className="mt-auto pt-6">
                <div className="flex items-center justify-between text-[13px]">
                  <span className="text-slate-500 dark:text-slate-400">Right buyers in the results</span>
                  <span className="font-bold text-red-600 dark:text-red-400">1 of 5</span>
                </div>
                <span className="mt-2 block h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-white/[0.06]">
                  <span className="block h-full w-1/5 rounded-full bg-red-500" />
                </span>
                <p className="mt-2 text-[13px] text-slate-500 dark:text-slate-400">Every result matches the keyword. Most aren&rsquo;t the buyer.</p>
              </div>
            </div>
          </Reveal>

          {/* With Harvin */}
          <Reveal delay={120} className={`${SURFACE_ACCENT} flex flex-col overflow-hidden`}>
            <div className="flex items-center justify-between gap-3 border-b border-ember-200 bg-ember-50/70 px-6 py-4 dark:border-ember-500/25 dark:bg-ember-500/[0.08]">
              <p className="flex items-center gap-2 text-[17px] font-bold text-slate-900 dark:text-white">
                <Mark className="h-5" />
                Matched by meaning
              </p>
              <span className="rounded-md bg-ember-500 px-2 py-0.5 text-[12px] font-semibold text-white">With Harvin</span>
            </div>
            <div className="flex flex-1 flex-col p-6">
              <div className="flex flex-wrap items-center gap-1.5 rounded-btn border border-ember-200 bg-white px-3 py-2 text-[13px] dark:border-ember-500/25 dark:bg-white/[0.03]">
                {['CFO', 'VP Finance', 'Head of Payments'].map((r, i) => (
                  <span key={r} className="flex items-center gap-1.5">
                    {i > 0 && <ArrowRight size={11} className="text-ember-400" aria-hidden="true" />}
                    <Chip tone="ember">{r}</Chip>
                  </span>
                ))}
                <span className="ml-auto text-[12px] text-slate-500 dark:text-slate-400">Finance, head and above</span>
              </div>
              <ol className="mt-4 space-y-2">
                {HARVIN_MATCHES.map((m, i) => (
                  <li
                    key={m.role}
                    className={[
                      'flex items-center gap-3 rounded-btn border px-4 py-2.5',
                      m.person
                        ? 'border-emerald-300 bg-emerald-50/60 dark:border-emerald-500/30 dark:bg-emerald-500/[0.07]'
                        : 'border-dashed border-slate-300 dark:border-white/[0.1]',
                    ].join(' ')}
                  >
                    <span className="font-mono text-[12px] font-bold text-ember-500 dark:text-ember-400">{i + 1}</span>
                    <span className="min-w-0 flex-1">
                      <span className={`block text-[14px] font-semibold ${m.person ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-slate-500'}`}>
                        {m.person ? `${m.person}, ${m.role}` : m.role}
                      </span>
                      <span className="block truncate text-[12.5px] text-slate-500 dark:text-slate-400">{m.note}</span>
                    </span>
                    {m.person ? (
                      <span className="flex shrink-0 items-center gap-1.5">
                        <Mail size={14} aria-hidden="true" className="text-emerald-600 dark:text-emerald-400" />
                        <Phone size={14} aria-hidden="true" className="text-emerald-600 dark:text-emerald-400" />
                        <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/15 px-2 py-0.5 text-[12px] font-semibold text-emerald-700 dark:text-emerald-400">
                          <Check size={11} strokeWidth={3} aria-hidden="true" />
                          Buyer
                        </span>
                      </span>
                    ) : (
                      <span className="shrink-0 text-[12px] text-slate-400 dark:text-slate-500">Skipped</span>
                    )}
                  </li>
                ))}
              </ol>
              <div className="mt-auto pt-6">
                <div className="flex items-center justify-between text-[13px]">
                  <span className="text-slate-500 dark:text-slate-400">Right buyers in the results</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">2 of 2</span>
                </div>
                <span className="mt-2 block h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-white/[0.06]">
                  <span className="block h-full w-full rounded-full bg-emerald-500" />
                </span>
                <p className="mt-2 text-[13px] text-slate-500 dark:text-slate-400">Only people who match your target roles, in your order.</p>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-14">
          <h3 className="text-[20px] font-bold text-slate-900 dark:text-white">Find the right decision-makers</h3>
        </Reveal>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PEOPLE_RULES.map((p, i) => (
            <li key={p.title} className="flex">
              <Reveal delay={i * 80} className={`${SURFACE} ${LIFT} w-full p-5`}>
                <span className="flex h-10 w-10 items-center justify-center rounded-btn bg-ember-50 text-ember-500 dark:bg-ember-500/15 dark:text-ember-400">
                  <p.icon size={17} aria-hidden="true" />
                </span>
                <p className="mt-4 text-[16px] font-bold text-slate-900 dark:text-white">{p.title}</p>
                <p className="mt-1 text-[14px] leading-relaxed text-slate-600 dark:text-slate-400">{p.body}</p>
              </Reveal>
            </li>
          ))}
        </ul>

        {/* Then find their contact details */}
        <Reveal className="mt-14">
          <p className="text-[20px] font-bold text-slate-900 dark:text-white">Then find their contact details</p>
          <p className="mt-2 text-[15.5px] text-slate-600 dark:text-slate-400">Once the right person is matched, Harvin can find their:</p>
        </Reveal>
        <Reveal delay={120} className="mt-6 flex flex-col items-stretch gap-4 lg:flex-row lg:items-center">
          <div className={`${SURFACE} p-6 lg:w-[220px] lg:shrink-0`}>
            <Label>Decision-maker</Label>
            <span className="mt-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-ember-300 to-ember-500 text-[16px] font-bold text-white">PN</span>
            <p className="mt-3 text-[19px] font-bold text-slate-900 dark:text-white">Priya Nair</p>
            <p className="text-[14px] text-slate-500 dark:text-slate-400">VP Finance</p>
            <p className="text-[14px] text-slate-500 dark:text-slate-400">Vela Commerce</p>
          </div>
          <FlowArrow />
          <Waterfalls />
        </Reveal>
        <p className="mt-6 text-[15px] font-semibold text-slate-600 dark:text-slate-300 lg:pl-[284px]">
          Contact details are searched across multiple sources and charged only when found.
        </p>

        <TextLink href="/data-building#decision-makers" className="mt-8">
          Explore People Search
        </TextLink>
      </div>
    </section>
  );
}

function YourList() {
  return (
    <section id="your-list" className={`${SECTION} ${BAND}`}>
      <div className={WRAP}>
        <Reveal className="mx-auto max-w-[760px] text-center">
          <Eyebrow center>Already have a list?</Eyebrow>
          <h2 className={`mt-5 ${H2}`}>Start with the companies you already know.</h2>
          <p className={`mt-5 ${LEAD}`}>Upload the account list your team is working from today.</p>
          <p className={`mt-3 ${LEAD}`}>
            Harvin can clean it, research the companies, check which ones fit, find missing decision-makers and help uncover
            relevant companies your current targeting hasn&rsquo;t surfaced.
          </p>
        </Reveal>

        <div className="mt-12 flex flex-col items-stretch gap-4 lg:flex-row">
          {/* What you upload */}
          <Reveal className={`${SURFACE} flex flex-col p-6 lg:w-[30%]`}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">What you upload</p>
            <div className="mt-3 flex items-center gap-3 rounded-btn border border-dashed border-slate-300 px-3 py-3 dark:border-white/[0.14]">
              <span className="flex h-9 w-9 items-center justify-center rounded-btn bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                <FileSpreadsheet size={17} aria-hidden="true" />
              </span>
              <span>
                <span className="block text-[14.5px] font-semibold text-slate-900 dark:text-white">accounts.xlsx</span>
                <span className="block text-[12.5px] text-slate-500 dark:text-slate-400">500 companies</span>
              </span>
            </div>
            <ul className="mt-5 space-y-4">
              {UPLOAD_ISSUES.map((u) => (
                <li key={u.k}>
                  <div className="flex items-baseline justify-between gap-2 text-[13.5px]">
                    <span className="flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-300">
                      <CircleAlert size={13} aria-hidden="true" className="text-amber-500" />
                      {u.k}
                    </span>
                    <span className="truncate text-[12px] text-slate-500 dark:text-slate-400">{u.v}</span>
                  </div>
                  <span className="mt-1.5 block h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-white/[0.06]">
                    <span className="block h-full rounded-full bg-amber-400/80" style={{ width: `${u.pct}%` }} />
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-auto pt-6 text-[13.5px] text-slate-500 dark:text-slate-400">Hard to tell who to work first.</p>
          </Reveal>

          <FlowArrow />

          {/* What you get back */}
          <Reveal delay={120} className={`${SURFACE_ACCENT} flex flex-1 flex-col p-6 sm:p-7`}>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-ember-500 dark:text-ember-400">
                <Mark className="h-3.5" />
                What you get back
              </p>
              <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-50 px-2.5 py-1 text-[12.5px] font-semibold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400">
                <Check size={12} strokeWidth={3} aria-hidden="true" />
                Ready to work
              </span>
            </div>
            <h3 className="mt-2 text-[20px] font-bold text-slate-900 dark:text-white">Improve what you already have</h3>

            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {IMPROVE.map((it, i) => {
                const o = OUTCOMES[i];
                const hero = i === IMPROVE.length - 1;
                return (
                  <li
                    key={it.t}
                    className={[
                      'flex gap-4 rounded-card border p-4',
                      hero
                        ? 'border-transparent bg-gradient-to-r from-ember-500 to-ember-700 text-white shadow-[0_8px_30px_rgba(201,76,30,0.3)] sm:col-span-2'
                        : 'border-slate-200 bg-sand-50 dark:border-white/[0.08] dark:bg-white/[0.03]',
                    ].join(' ')}
                  >
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-btn ${hero ? 'bg-white/20 text-white' : 'bg-ember-50 text-ember-500 dark:bg-ember-500/15 dark:text-ember-400'}`}
                    >
                      <it.icon size={18} aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <p className={`text-[26px] font-bold leading-none tracking-[-0.02em] ${hero ? 'text-white' : 'text-slate-950 dark:text-white'}`}>
                        <CountUp to={o.to} prefix={o.prefix} />
                        <span className={`ml-2 text-[13px] font-semibold tracking-normal ${hero ? 'text-white/85' : 'text-slate-500 dark:text-slate-400'}`}>{o.unit}</span>
                      </p>
                      <p className={`mt-2 text-[14.5px] font-semibold ${hero ? 'text-white' : 'text-slate-900 dark:text-white'}`}>{it.t}</p>
                      <p className={`mt-0.5 text-[13px] leading-snug ${hero ? 'text-white/85' : 'text-slate-500 dark:text-slate-400'}`}>{it.d}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
            <p className="mt-4 text-[12px] text-slate-400 dark:text-slate-500">Illustrative numbers for a 500-company upload.</p>
          </Reveal>
        </div>

        <Reveal className="mt-10 flex flex-col items-center gap-3">
          <a href={startFreeHref()} className={CTA_BTN}>
            <Upload size={16} aria-hidden="true" />
            Upload your list
            <ArrowRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
          </a>
          <p className="text-[14px] italic text-slate-500 dark:text-slate-400">Or start from scratch and let Harvin build the list for you.</p>
        </Reveal>
      </div>
    </section>
  );
}

function KeepCurrent() {
  const feed = [
    { icon: Building2, type: 'New company', title: 'Vela Commerce', meta: 'Operates across 12 countries', badge: '91 Strong fit', fresh: false },
    { icon: UserPlus, type: 'New decision-maker', title: 'Priya Nair, VP Finance', meta: 'Email and phone found', badge: '', fresh: true },
    { icon: TrendingUp, type: 'Fit changed', title: 'Brightpath Learning', meta: 'Expanded into 3 new countries', badge: '72 → 86', fresh: false },
    { icon: UserMinus, type: 'No longer fits', title: 'Orbit Retail', meta: 'Store count below your criteria', badge: '', fresh: false },
  ];
  return (
    <section id="keep-current" className={SECTION}>
      <div className={WRAP}>
        <Reveal className="max-w-[900px]">
          <Eyebrow>Keep your list current</Eyebrow>
          <h2 className={`mt-5 ${H2}`}>Your target companies keep changing. Harvin keeps up.</h2>
          <p className={`mt-5 ${LEAD}`}>New companies appear. Decision-makers change roles. Businesses expand. Priorities shift.</p>
          <p className={`mt-3 ${LEAD}`}>
            Harvin keeps checking the companies you care about and helps surface what changed, so your team is not working from
            an outdated list.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {CHANGE_STATS.map((s, i) => (
            <Reveal key={s.l} delay={i * 90} className={`${SURFACE} ${LIFT} relative overflow-hidden p-6`}>
              <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-ember-500 to-ember-300" />
              <p className="text-[clamp(36px,4vw,52px)] font-bold leading-none tracking-[-0.03em] text-ember-500 dark:text-ember-400">
                <CountUp to={s.to} prefix={s.prefix} />
              </p>
              <p className="mt-3 text-[14.5px] leading-snug text-slate-600 dark:text-slate-300">{s.l}</p>
            </Reveal>
          ))}
        </div>

        <div className="mt-6 flex flex-col items-stretch gap-4 lg:flex-row">
          <Reveal className={`${SURFACE} flex flex-col p-6 lg:w-[38%]`}>
            <h3 className="text-[18px] font-bold text-slate-900 dark:text-white">Stay on top of changes</h3>
            <ul className="mt-4 space-y-3">
              {CHANGES.map(({ icon: Icon, t, d }) => (
                <li key={t} className="flex items-start gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-btn bg-ember-50 text-ember-500 dark:bg-ember-500/15 dark:text-ember-400">
                    <Icon size={15} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-[15px] font-semibold text-slate-900 dark:text-white">{t}</span>
                    <span className="block text-[13px] leading-snug text-slate-500 dark:text-slate-400">{d}</span>
                  </span>
                </li>
              ))}
            </ul>
            <TextLink href="/account-intelligence" className="mt-auto pt-6">
              Review what changed
            </TextLink>
          </Reveal>

          <FlowArrow />

          <Reveal delay={120} className={`${SURFACE} flex flex-1 flex-col p-6`}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <Label>Your target list</Label>
                <p className="mt-1 text-[20px] font-bold text-slate-900 dark:text-white">What changed</p>
              </div>
              <span className="flex items-center gap-1.5 text-[12.5px] text-slate-500 dark:text-slate-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 motion-safe:animate-pulse" />
                Last checked 7d ago
              </span>
            </div>
            <ul className="mt-5 space-y-3">
              {feed.map(({ icon: Icon, ...s }) => (
                <li key={s.type} className={`${TILE} ${LIFT} flex items-start gap-4 p-4`}>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-btn bg-ember-50 text-ember-500 dark:bg-ember-500/15 dark:text-ember-400">
                    <Icon size={17} aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ember-500 dark:text-ember-400">{s.type}</p>
                    <p className="mt-0.5 truncate text-[16px] font-semibold text-slate-900 dark:text-white">{s.title}</p>
                    <p className="truncate text-[13.5px] text-slate-500 dark:text-slate-400">{s.meta}</p>
                  </div>
                  {s.badge && (
                    <span className="shrink-0 rounded-md bg-sand-200 px-2 py-0.5 font-mono text-[12px] font-semibold text-slate-800 dark:bg-white/[0.06] dark:text-slate-200">
                      {s.badge}
                    </span>
                  )}
                  {s.fresh && (
                    <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-0.5 text-[11.5px] font-semibold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 motion-safe:animate-pulse" />
                      New
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function PricingTeaser() {
  const starter = PLANS.find((p) => p.id === 'starter');
  return (
    <section id="pricing-teaser" className={`${SECTION} ${BAND}`}>
      <Reveal className={WRAP}>
        <div className="relative overflow-hidden rounded-modal bg-gradient-to-br from-ember-500 to-ember-700 p-8 text-white shadow-[0_20px_60px_rgba(201,76,30,0.3)] sm:p-12">
          <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(60%_80%_at_80%_20%,#000,transparent)]"
          />
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

export default function HomeClient() {
  return (
    <>
      <Hero />
      <Problem />
      <StartWithBusiness />
      <Discovery />
      <ResearchFit />
      <DecisionMakers />
      <YourList />
      <KeepCurrent />
      <PricingTeaser />
    </>
  );
}
