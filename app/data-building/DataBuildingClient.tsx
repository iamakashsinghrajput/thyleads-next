'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  ArrowDown,
  ArrowRight,
  Check,
  Database,
  FileSpreadsheet,
  Globe,
  Plus,
  Search,
  Sparkles,
  Users,
  X,
  Zap,
} from 'lucide-react';
import { useModal } from '@/components/ModalContext';

/* ═══ Motion hooks ════════════════════════════════════════════════════════════
   Everything animated here degrades to its finished state: before hydration,
   under prefers-reduced-motion, and once a loop is out of view. */

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

function CountUp({ to, suffix }: { to: number; suffix: string }) {
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
      <span className="sr-only">{`${to}${suffix}`}</span>
      <span aria-hidden="true" className="tabular-nums">
        {n}
        {suffix}
      </span>
    </span>
  );
}

/** Circular Company Fit gauge. Colors come from `currentColor` on the two rings. */
function ScoreRing({
  score,
  size = 132,
  stroke = 10,
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

/* ═══ Shared primitives ═══════════════════════════════════════════════════════ */

function Label({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <p className={`text-[14px] text-slate-500 dark:text-slate-400 ${className}`}>{children}</p>;
}

function Chip({ children, tone = 'sand' }: { children: ReactNode; tone?: 'sand' | 'ember' }) {
  return (
    <span
      className={[
        'inline-flex items-center rounded-btn border px-2 py-0.5 text-[13px] font-medium',
        tone === 'ember'
          ? 'border-ember-300 bg-ember-50 text-ember-700 dark:border-ember-500/60 dark:bg-transparent dark:text-ember-400'
          : 'border-slate-200 bg-sand-200 text-slate-800 dark:border-rule dark:bg-transparent dark:text-slate-300',
      ].join(' ')}
    >
      {children}
    </span>
  );
}

function Mark({ className = 'h-4' }: { className?: string }) {
  return <img src="/harvinlogo/logo.png" alt="" aria-hidden="true" className={`w-auto ${className}`} />;
}

function FlowArrow({ className = '' }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`flex shrink-0 items-center justify-center text-slate-500 dark:text-slate-400 ${className}`}>
      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white dark:border-rule dark:bg-slate-950">
        <ArrowRight size={15} strokeWidth={2} className="hidden lg:block" />
        <ArrowDown size={15} strokeWidth={2} className="lg:hidden" />
      </span>
    </div>
  );
}

/** Dashed SVG fan between two columns of a fixed-height (H) row. */
function Fan({ from, to, H }: { from: number[]; to: number[]; H: number }) {
  const pairs = from.length === 1 ? to.map((t) => [from[0], t]) : from.map((f) => [f, to[0]]);
  return (
    <>
      <svg viewBox={`0 0 64 ${H}`} preserveAspectRatio="none" aria-hidden="true" className="hidden h-full w-full lg:block">
        {pairs.map(([a, b], i) => (
          <path
            key={i}
            d={`M0 ${a} C32 ${a}, 32 ${b}, 64 ${b}`}
            fill="none"
            strokeWidth="1.5"
            strokeDasharray="4 6"
            className="stroke-slate-300 dark:stroke-slate-400/40"
          />
        ))}
      </svg>
      <div aria-hidden="true" className="flex justify-center text-slate-500 dark:text-slate-400 lg:hidden">
        <ArrowDown size={18} strokeWidth={2} />
      </div>
    </>
  );
}

const SECTION = 'scroll-mt-20 border-b border-slate-200 px-6 py-20 dark:border-rule lg:py-28';
const WRAP = 'mx-auto max-w-[1180px]';
const H2 = 'font-display font-medium text-[clamp(36px,4.2vw,58px)] leading-[1.05] text-slate-950 dark:text-white';
const H3 = 'font-display font-medium text-[24px] leading-[1.15] text-slate-900 dark:text-white';
const LEAD = 'text-[18px] leading-[1.5] text-slate-600 dark:text-slate-300';
const SURFACE =
  'rounded-modal border border-slate-200 bg-sand-50 dark:border-rule dark:bg-surface';
const TILE = 'rounded-card border border-slate-200 bg-white dark:border-rule dark:bg-slate-950';
const LIFT = 'transition-colors duration-200 hover:border-slate-300 dark:hover:border-slate-400/40';
const CTA_BTN =
  'group inline-flex items-center justify-center gap-2 rounded-btn bg-ember-500 px-6 py-3.5 text-[15px] font-semibold text-pure ' +
  'transition-colors duration-150 hover:bg-ember-400 ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950';
const TEXT_LINK =
  'inline-flex items-center gap-1.5 text-[15px] font-medium text-slate-600 underline-offset-4 transition-colors hover:text-slate-900 hover:underline dark:text-slate-300 dark:hover:text-white';

/* ═══ Content ═════════════════════════════════════════════════════════════════ */

const JUMP = [
  { href: '#company-profile', label: 'Company Profile' },
  { href: '#discovery', label: 'Discovery' },
  { href: '#research', label: 'Research' },
  { href: '#decision-makers', label: 'Decision-makers' },
  { href: '#contacts', label: 'Email & phone' },
  { href: '#signals', label: 'Signals' },
];

const HERO_STEPS = ['Understand', 'Discover', 'Research', 'Match'];

const STEPS = [
  { n: '01', verb: 'Understand', title: 'Your business', items: ['What you sell', 'Who buys', 'Who converted', 'Who didn’t'] },
  { n: '02', verb: 'Build', title: 'Your market', items: ['Search themes', '650M+ B2B profiles', 'Company discovery', 'Company research'] },
  { n: '03', verb: 'Match', title: 'Fit and decision-makers', items: ['Company Fit', 'Target roles', 'Seniority', 'Function'] },
  { n: '04', verb: 'Act', title: 'Contacts and timing', items: ['Verified email', 'Direct/mobile phone', 'Signals'] },
];

/* Discovery diagram geometry: row height and the vertical centre of each card. */
const DISC_H = 420;
const centres = (n: number, h: number) => Array.from({ length: n }, (_, i) => h / 2 + (i * (DISC_H - h)) / (n - 1));
const THEME_H = 90;
const FOUND_H = 56;

const THEMES = [
  { label: 'Use case', items: ['Global payouts', 'International collections'] },
  { label: 'Business model', items: ['Marketplace payments', 'Overseas subscriptions'] },
  { label: 'Customer type', items: ['Cross-border sellers', 'Global employers'] },
  { label: 'Product language', items: ['FX workflows', 'Global payroll'] },
];

const FOUND = ['Northstar Software', 'Vela Commerce', 'Brightpath Learning', 'Atlas Digital', 'Kitecart'];

const STANDARD_FIELDS = [
  { k: 'Industry', v: 'Internet' },
  { k: 'Company size', v: '600' },
  { k: 'HQ', v: 'Singapore' },
];

const RESEARCHED_FIELDS = [
  { k: 'Category', v: 'Online marketplace' },
  { k: 'Revenue', v: '$41M' },
  { k: 'Funding', v: 'Series C' },
  { k: 'Monthly active users', v: '1.2M' },
  { k: 'Location count', v: '17 locations' },
  { k: 'Technologies', v: 'Stripe, Shopify, AWS' },
];

const ENRICH_ROWS = [
  { name: 'Vela Commerce', cat: 'Online marketplace', rev: '$41M', fund: 'Series C', mau: '1.2M', at: 0 },
  { name: 'Brightpath Learning', cat: 'EdTech', rev: '$14M', fund: 'Series A', mau: '420K', at: 0 },
  { name: 'Kitecart', cat: 'Social commerce', rev: '$9M', fund: 'Seed', mau: '310K', at: 1 },
  { name: 'Lumora Health', cat: 'Digital health', rev: '$22M', fund: 'Series B', mau: '95K', at: 2 },
  { name: 'Atlas Digital', cat: 'IT services', rev: '$12M', fund: 'Unknown', mau: '18K', at: 3 },
];

const ENRICH_FIELDS = ['Revenue', 'Funding', 'Category', 'Monthly active users', 'Location count', 'Technologies'];

const KEYWORD_RESULTS = [
  { title: 'Finance Manager', verdict: 'Too junior' },
  { title: 'VP Finance Transformation', verdict: 'Adjacent role' },
  { title: 'Finance Operations Lead', verdict: 'Not the buyer' },
  { title: 'Head of Commercial Finance', verdict: 'Adjacent role' },
  { title: 'VP Strategic Finance', verdict: 'Possible match' },
];

const PRIORITY_ROLES = [
  { role: 'CFO', matched: true },
  { role: 'VP Finance', matched: true },
  { role: 'Head of Finance', matched: false },
  { role: 'Head of Payments', matched: true },
  { role: 'Treasury Director', matched: false },
];

const SOURCES = ['Source A', 'Source B', 'Source C', 'More sources'];

const WATERFALLS = [
  { label: 'Email waterfall', stopAt: 2, result: { k: 'Verified work email', v: 'priya@velacommerce.co' } },
  { label: 'Phone waterfall', stopAt: 1, result: { k: 'Direct/mobile phone', v: '+65 9XXX X412' } },
];

const STATS = [
  { to: 80, suffix: '%', l: 'less time building and researching lists' },
  { to: 3, suffix: '×', l: 'faster from targeting brief to sales-ready data' },
  { to: 40, suffix: '%', l: 'fewer irrelevant decision-maker matches' },
  { to: 30, suffix: '%', l: 'of approved companies discovered outside the original filter set' },
];

const REMOVED_WORK = [
  { area: 'Discovery', before: 'Manual filter experimentation', after: 'Search themes Harvin generates' },
  { area: 'Research', before: 'Opening websites and data tools', after: 'Structured company research' },
  { area: 'People', before: 'Checking job titles by hand', after: 'Matching to your Target Profile' },
  { area: 'Contact data', before: 'Switching between providers', after: 'One email and phone waterfall' },
  { area: 'Monitoring', before: 'Revisiting accounts manually', after: 'Signal monitoring' },
];

/* ═══ Animated mocks ══════════════════════════════════════════════════════════ */

function HeroDiagram() {
  const [ref, seen] = useInView<HTMLDivElement>(0.3);
  const step = useCycle(HERO_STEPS.length, 1400, seen);

  const connector = <div aria-hidden="true" className="ml-8 h-7 w-px bg-slate-200 dark:bg-rule" />;

  return (
    <div ref={ref} className="relative">
      <div className={`${TILE} p-5`}>
        <Label>Your business</Label>
        <div className="mt-3 flex flex-wrap gap-2">
          {['What you sell', 'Customers', 'Lost deals', 'Buyer roles'].map((c) => (
            <Chip key={c}>{c}</Chip>
          ))}
        </div>
      </div>
      {connector}
      <div className={`${SURFACE} rounded-card p-5`}>
        <div className="flex items-center justify-between">
          <p className="flex items-center gap-2 text-[13px] font-medium text-slate-900 dark:text-white">
            <Mark className="h-3.5" />
            Harvin
          </p>
          <span className="flex items-center gap-1.5 text-[13px] text-slate-500 dark:text-slate-400">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-slate-400 motion-safe:animate-pulse" />
            Building market
          </span>
        </div>
        <ol className="mt-3 flex flex-wrap items-center gap-1.5">
          {HERO_STEPS.map((s, i) => (
            <li key={s} className="flex items-center gap-1.5">
              {i > 0 && <ArrowRight size={13} className="text-slate-400" aria-hidden="true" />}
              <span
                className={[
                  'rounded-btn border px-2 py-1 text-[14px] font-medium transition-colors duration-300',
                  i === step
                    ? 'border-ember-500 text-slate-900 dark:text-white'
                    : i < step
                      ? 'border-transparent text-slate-900 dark:text-white'
                      : 'border-transparent text-slate-400 dark:text-slate-400',
                ].join(' ')}
              >
                {s}
              </span>
            </li>
          ))}
        </ol>
      </div>
      {connector}
      <div className={`${SURFACE} p-5`}>
        <div className="flex items-center justify-between">
          <Label>Sales-ready market</Label>
          <Chip>1,284 companies</Chip>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2.5">
          {[
            { k: 'High-fit companies', v: 'Company Fit' },
            { k: 'Right decision-makers', v: 'CFO · VP Finance' },
            { k: 'Verified contacts', v: 'Email + phone' },
            { k: 'Signals', v: '20+ signal types' },
          ].map((t) => (
            <div key={t.k} className={`${TILE} p-3`}>
              <p className="text-[13px] text-slate-500 dark:text-slate-400">{t.k}</p>
              <p className="mt-1.5 text-[14px] font-medium text-slate-900 dark:text-white">{t.v}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function EnrichTable() {
  const [ref, seen] = useInView<HTMLDivElement>(0.3);
  const step = useCycle(7, 1100, seen);
  const done = ENRICH_ROWS.filter((r) => r.at <= step).length;

  return (
    <div ref={ref} className="grid gap-4 lg:grid-cols-[1fr_240px]">
      <div className={`${SURFACE} overflow-hidden`}>
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 px-5 py-3.5 dark:border-rule">
          <p className="text-[14.5px] font-semibold text-slate-900 dark:text-white">List · Cross-border payments</p>
          <span className="flex items-center gap-3 text-[13px] text-slate-500 dark:text-slate-400">
            5 companies selected
            <span className="tabular-nums text-slate-900 dark:text-white">
              {done}/5 researched
            </span>
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-[13.5px]">
            <thead>
              <tr className="border-b border-slate-200 text-[13px] text-slate-500 dark:border-rule dark:text-slate-400">
                <th className="px-5 py-3 font-semibold">Company</th>
                <th className="px-3 py-3 font-semibold">Category</th>
                <th className="px-3 py-3 font-semibold">Revenue</th>
                <th className="px-3 py-3 font-semibold">Funding</th>
                <th className="border-x border-ember-300 px-3 py-3 font-semibold text-ember-600 dark:border-ember-500/50 dark:text-ember-400">Monthly active users</th>
                <th className="px-5 py-3">
                  <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-btn border border-dashed border-slate-300 px-2 py-0.5 text-[13px] font-medium text-slate-500 dark:border-slate-400/40 dark:text-slate-400">
                    <Plus size={11} aria-hidden="true" />
                    Enrich column
                  </span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-rule">
              {ENRICH_ROWS.map((r) => {
                const ready = r.at <= step;
                return (
                  <tr key={r.name} className="transition-colors hover:bg-sand-100/60 dark:hover:bg-white/[0.02]">
                    <td className="px-5 py-3 font-semibold text-slate-900 dark:text-white">{r.name}</td>
                    <td className="px-3 py-3 text-slate-600 dark:text-slate-300">{r.cat}</td>
                    <td className="px-3 py-3 text-slate-600 dark:text-slate-300">{r.rev}</td>
                    <td className={`px-3 py-3 ${r.fund === 'Unknown' ? 'text-slate-400 dark:text-slate-400' : 'text-slate-600 dark:text-slate-300'}`}>{r.fund}</td>
                    <td className="border-x border-ember-300 px-3 py-3 dark:border-ember-500/50">
                      {ready ? (
                        <span className="font-semibold text-slate-900 motion-safe:animate-fade-up dark:text-white">
                          {r.mau}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-[13px] text-slate-500 dark:text-slate-400">
                          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-slate-400 motion-safe:animate-pulse" />
                          Researching…
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3" />
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className={`${SURFACE} self-start p-2`}>
        <p className="px-3 pb-1 pt-2 text-[13px] font-medium text-slate-500 dark:text-slate-400">Choose a field</p>
        <ul>
          {ENRICH_FIELDS.map((f) => {
            const active = f === 'Monthly active users';
            return (
              <li
                key={f}
                className={[
                  'flex items-center justify-between rounded-btn px-3 py-2 text-[14px]',
                  active
                    ? 'bg-sand-200 font-semibold text-slate-900 dark:bg-white/[0.05] dark:text-white'
                    : 'text-slate-700 dark:text-slate-300',
                ].join(' ')}
              >
                {f}
                {active && <Check size={14} aria-hidden="true" />}
              </li>
            );
          })}
        </ul>
        <p className="mt-1 border-t border-slate-200 px-3 pb-1 pt-2.5 text-[13px] text-slate-500 dark:border-rule dark:text-slate-400">More research fields</p>
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
                      state === 'hit' && 'border-ember-500 bg-white font-semibold text-slate-900 dark:bg-slate-950 dark:text-white',
                      state === 'miss' && 'border-slate-200 bg-white text-slate-500 dark:border-rule dark:bg-slate-950 dark:text-slate-400',
                      state === 'checking' && 'border-slate-400 bg-white font-medium text-slate-900 dark:border-slate-400/60 dark:bg-slate-950 dark:text-white',
                      (state === 'skip' || state === 'queued') && 'border-dashed border-slate-300 text-slate-400 dark:border-rule dark:text-slate-400',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                  >
                    <span className={state === 'miss' ? 'line-through decoration-grey' : ''}>{state === 'hit' ? `${src} · Match` : src}</span>
                    {state === 'hit' && (
                      <span className="text-[13px] font-medium text-ember-600 dark:text-ember-400">
                        Stops here
                      </span>
                    )}
                    {state === 'miss' && <span className="font-normal text-slate-500 dark:text-slate-400">No match</span>}
                    {state === 'skip' && <span>Not needed</span>}
                    {state === 'queued' && <span>Queued</span>}
                    {state === 'checking' && (
                      <span className="inline-flex items-center gap-1.5 font-normal text-slate-500 dark:text-slate-400">
                        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-slate-400 motion-safe:animate-pulse" />
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
                  ? 'border-slate-200 bg-white dark:border-rule dark:bg-surface'
                  : 'border-dashed border-slate-300 bg-transparent opacity-50 dark:border-rule',
              ].join(' ')}
            >
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-colors ${finished ? 'border-slate-400 text-slate-900 dark:border-slate-400 dark:text-white' : 'border-slate-300 text-slate-400 dark:border-rule dark:text-slate-400'}`}
              >
                <Check size={13} strokeWidth={3} aria-hidden="true" />
              </span>
              <div>
                <p className="text-[13px] text-slate-500 dark:text-slate-400">{w.result.k}</p>
                <p className="text-[15px] font-medium text-slate-900 dark:text-white">{finished ? w.result.v : 'Waiting for a match…'}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ═══ Page ════════════════════════════════════════════════════════════════════ */

export default function DataBuildingClient() {
  const { openModal } = useModal();

  return (
    <div className="relative w-full">
      {/* ═══ 1. HERO ══════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden border-b border-slate-200 px-6 pb-16 pt-28 dark:border-rule lg:pb-20 lg:pt-36">

        <div className={`relative grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] ${WRAP}`}>
          <div className="motion-safe:animate-fade-up">
            <p className="text-[15px] text-slate-500 dark:text-slate-400">Harvin Data Building</p>
            <h1 className="mt-5 font-display font-medium text-[clamp(44px,5vw,72px)] leading-[1.02] text-slate-950 dark:text-white">
              Find the companies and decision-makers{' '}
              <span className="italic">that fit your business best.</span>
            </h1>
            <p className="mt-6 max-w-[560px] text-[19px] leading-[1.5] text-slate-600 dark:text-slate-300">
              Harvin learns what you sell, who converts and who doesn’t, then discovers, researches and enriches a market around that context.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <button type="button" onClick={() => openModal('talk-to-sales')} className={CTA_BTN}>
                See Harvin on your market
                <ArrowRight size={16} aria-hidden="true" />
              </button>
              <a href="#how-it-works" className={TEXT_LINK}>
                How it works
              </a>
            </div>

            <dl className="mt-12 grid max-w-[520px] grid-cols-3 divide-x divide-slate-200 border-t border-slate-200 pt-6 dark:divide-rule dark:border-rule">
              {[
                { v: '650M+', l: 'B2B profiles' },
                { v: '30+', l: 'contact-data sources' },
                { v: '20+', l: 'signal types' },
              ].map((s, i) => (
                <div key={s.l} className={i === 0 ? 'pr-4' : 'px-4'}>
                  <dt className="sr-only">{s.l}</dt>
                  <dd className="font-display text-[30px] font-medium leading-none text-slate-950 dark:text-white">{s.v}</dd>
                  <dd className="mt-1.5 text-[14px] text-slate-500 dark:text-slate-400">{s.l}</dd>
                </div>
              ))}
            </dl>
          </div>

          <HeroDiagram />
        </div>

        <nav aria-label="On this page" className={`relative mt-16 border-t border-slate-200 pt-6 dark:border-rule ${WRAP}`}>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <li className="text-[14px] text-slate-500 dark:text-slate-400">Jump to</li>
            {JUMP.map((j) => (
              <li key={j.href}>
                <a
                  href={j.href}
                  className="text-[14px] text-slate-700 underline-offset-4 transition-colors hover:text-slate-900 hover:underline dark:text-slate-300 dark:hover:text-white"
                >
                  {j.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </section>

      {/* ═══ 2. THE PROBLEM ═══════════════════════════════════════════════════ */}
      <section className={`${SECTION}`}>
        <div className={WRAP}>
          <Reveal className="max-w-[820px]">
            <h2 className={H2}>A database can give you millions of records. It still needs you to know exactly what to search for.</h2>
          </Reveal>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <Reveal className={`${SURFACE} p-6 sm:p-7`}>
              <Label>Company search</Label>
              <div className="mt-4 flex flex-wrap gap-2">
                {['Industry: Software', 'Employees: 200–2,000', 'Revenue: $10M–$100M', 'India', 'Series B+'].map((f) => (
                  <Chip key={f}>{f}</Chip>
                ))}
              </div>
              <p className="mt-6 text-[16px] font-medium text-slate-900 dark:text-white">Relevant companies can still be missed when they:</p>
              <ul className="mt-3 space-y-2.5">
                {['Sit under a broad or wrong category', 'Describe what they do differently', 'Are missing revenue or funding data', 'Need research before fit is clear'].map((r) => (
                  <li key={r} className="flex items-center gap-3 text-[15px] text-slate-600 dark:text-slate-300">
                    <X size={14} strokeWidth={2.5} className="shrink-0 text-slate-400 dark:text-grey" aria-hidden="true" />
                    {r}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={120} className={`${SURFACE} p-6 sm:p-7`}>
              <Label>Decision-maker search</Label>
              <div className="mt-4 flex items-center gap-2 rounded-btn border border-slate-200 bg-white px-3 py-2 text-[14px] text-slate-700 dark:border-rule dark:bg-slate-950 dark:text-slate-300">
                <Search size={14} className="text-slate-400" aria-hidden="true" />
                Title contains <span className="text-slate-900 dark:text-white">“Finance”</span>
                <span className="ml-auto text-[13px] text-slate-400 dark:text-slate-400">2,418 results</span>
              </div>
              <p className="mt-6 text-[16px] font-medium text-slate-900 dark:text-white">Every result matches the keyword. Few are the buyer.</p>
              <ul className="mt-3 divide-y divide-slate-200 dark:divide-rule">
                {[
                  { t: 'Finance Manager', v: 'Too junior', ok: false },
                  { t: 'VP Finance Transformation', v: 'Adjacent role', ok: false },
                  { t: 'Finance Operations Lead', v: 'Wrong buying role', ok: false },
                  { t: 'VP Finance', v: 'Likely buyer', ok: true },
                ].map((r) => (
                  <li key={r.t} className="flex items-center justify-between gap-3 py-2.5 text-[14.5px]">
                    <span className={r.ok ? 'font-medium text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}>{r.t}</span>
                    <span
                      className={
                        r.ok
                          ? 'rounded-btn border border-ember-300 px-2 py-0.5 text-[13px] font-medium text-ember-600 dark:border-ember-500/60 dark:text-ember-400'
                          : 'text-[13px] text-slate-400 dark:text-slate-400'
                      }
                    >
                      {r.v}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal>
            <p className="mt-12 border-t border-slate-200 pt-8 font-display text-[clamp(24px,2.4vw,32px)] font-medium leading-[1.2] text-slate-900 dark:border-rule dark:text-white">
              More records don’t automatically mean <span className="italic">better targeting.</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══ 3. HOW HARVIN WORKS ══════════════════════════════════════════════ */}
      <section id="how-it-works" className={SECTION}>
        <div className={WRAP}>
          <Reveal className="max-w-[760px]">
            <h2 className={H2}>Harvin adds business context before it adds more data.</h2>
            <p className={`mt-5 ${LEAD}`}>It doesn’t start with which filters you want. It starts with what a good customer looks like for you.</p>
          </Reveal>

          <div className="relative mt-14">
          <div
            aria-hidden="true"
            className="absolute left-5 right-[12.5%] top-5 hidden h-px bg-slate-200 dark:bg-rule lg:block"
          />
          <ol className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => {
              const last = i === STEPS.length - 1;
              return (
                <li key={s.n} className="flex">
                  <Reveal delay={i * 100} className="flex w-full flex-col items-start">
                    <span
                      className={[
                        'relative z-10 flex h-10 w-10 items-center justify-center rounded-full border text-[14px] font-medium tabular-nums',
                        last
                          ? 'border-ember-500 bg-ember-500 text-pure'
                          : 'border-slate-300 bg-sand-50 text-slate-600 dark:border-rule dark:bg-slate-950 dark:text-slate-400',
                      ].join(' ')}
                    >
                      {s.n}
                    </span>
                    <div className={`mt-4 w-full flex-1 p-6 ${SURFACE} ${LIFT}`}>
                      <Label>{s.verb}</Label>
                      <h3 className={`mt-2 ${H3}`}>{s.title}</h3>
                      <ul className="mt-4 space-y-2 border-t border-slate-200 pt-4 dark:border-rule">
                        {s.items.map((it) => (
                          <li key={it} className="flex items-center gap-2 text-[15px] text-slate-600 dark:text-slate-300">
                            <Check size={14} className="shrink-0 text-slate-400" aria-hidden="true" />
                            {it}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ol>
          </div>
        </div>
      </section>

      {/* ═══ 4. COMPANY PROFILE ═══════════════════════════════════════════════ */}
      <section id="company-profile" className={`${SECTION}`}>
        <div className={`grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 ${WRAP}`}>
          <Reveal>
            <h2 className={H2}>Teach Harvin your business once.</h2>
            <p className={`mt-5 ${LEAD}`}>Harvin uses this context every time it discovers, researches or scores a company.</p>
            <ul className="mt-8 space-y-4">
              {[
                { k: 'Tell Harvin', v: 'What you sell, buyers, markets' },
                { k: 'Upload', v: 'Converted, lost, customers' },
                { k: 'Set targeting', v: 'Titles, functions, seniority' },
              ].map((i) => (
                <li key={i.k} className="border-l border-slate-200 pl-4 dark:border-rule">
                  <p className="text-[15px] font-medium text-slate-900 dark:text-white">{i.k}</p>
                  <p className="mt-0.5 text-[15px] text-slate-600 dark:text-slate-300">{i.v}</p>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex gap-3 border-t border-slate-200 pt-6 dark:border-rule">
              <Zap size={18} className="mt-1 shrink-0 text-slate-400" aria-hidden="true" />
              <p className="text-[18px] leading-[1.5] text-slate-900 dark:text-white">Your team doesn’t rebuild targeting logic every time it creates a list.</p>
            </div>
          </Reveal>

          <Reveal delay={120} className={`${SURFACE} overflow-hidden`}>
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-3.5 dark:border-rule">
              <p className="flex items-center gap-2.5 text-[16px] font-medium text-slate-900 dark:text-white">
                <Mark className="h-5" />
                Company Profile
              </p>
              <span className="inline-flex items-center gap-1.5 text-[13px] text-slate-500 dark:text-slate-400">
                <Check size={12} strokeWidth={3} aria-hidden="true" />
                Saved
              </span>
            </div>
            <div className="grid gap-3 p-4 sm:grid-cols-2">
              <div className={`${TILE} p-4`}>
                <Label>Your business</Label>
                <dl className="mt-3 space-y-2.5 text-[13.5px]">
                  {[
                    { q: 'What does your company do?', a: 'B2B payments for global companies' },
                    { q: 'What do you sell?', a: 'Cross-border payment infrastructure' },
                    { q: 'Who do you sell to?', a: 'Finance teams at global businesses' },
                  ].map((r) => (
                    <div key={r.q}>
                      <dt className="text-slate-500 dark:text-slate-400">{r.q}</dt>
                      <dd className="font-medium text-slate-900 dark:text-white">{r.a}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div className={`${TILE} p-4`}>
                <Label>Your customers</Label>
                <div className="mt-3 space-y-3 text-[13.5px]">
                  <div>
                    <p className="text-slate-500 dark:text-slate-400">Companies that converted</p>
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      {['Tripwise', 'Orbit Learn', 'Nomad Stays'].map((c) => (
                        <Chip key={c} tone="ember">
                          {c}
                        </Chip>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-slate-500 dark:text-slate-400">Companies that didn’t convert</p>
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      {['CornerMart', 'CityClinic'].map((c) => (
                        <Chip key={c}>{c}</Chip>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-slate-500 dark:text-slate-400">Existing customers</p>
                    <div className="mt-1.5">
                      <span className="inline-flex items-center gap-1.5 rounded-btn border border-slate-200 bg-sand-200 px-2 py-0.5 text-[13px] font-medium text-slate-800 dark:border-rule dark:bg-transparent dark:text-slate-300">
                        <FileSpreadsheet size={12} aria-hidden="true" />
                        customers.csv
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`${TILE} p-4`}>
                <Label>Target Profile</Label>
                <div className="mt-3 space-y-3 text-[13.5px]">
                  {[
                    { k: 'Target job titles', v: ['CFO', 'VP Finance', 'Head of Payments'] },
                    { k: 'Buyer functions', v: ['Finance', 'Treasury', 'Payments'] },
                    { k: 'Seniority', v: ['Head and above'] },
                  ].map((r) => (
                    <div key={r.k}>
                      <p className="text-slate-500 dark:text-slate-400">{r.k}</p>
                      <div className="mt-1.5 flex flex-wrap gap-1.5">
                        {r.v.map((c) => (
                          <Chip key={c}>{c}</Chip>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className={`${TILE} p-4`}>
                <Label>Your market</Label>
                <div className="mt-3 space-y-3 text-[13.5px]">
                  {[
                    { k: 'Geographies', v: ['India', 'Southeast Asia', 'UAE'] },
                    { k: 'Exclusions', v: ['Competitors', 'DNC', 'Open deals'] },
                  ].map((r) => (
                    <div key={r.k}>
                      <p className="text-slate-500 dark:text-slate-400">{r.k}</p>
                      <div className="mt-1.5 flex flex-wrap gap-1.5">
                        {r.v.map((c) => (
                          <Chip key={c}>{c}</Chip>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ 5. COMPANY DISCOVERY ═════════════════════════════════════════════ */}
      <section id="discovery" className={SECTION}>
        <div className={WRAP}>
          <Reveal className="max-w-[860px]">
            <h2 className={H2}>Harvin turns your business context into the language your market actually uses.</h2>
          </Reveal>

          <Reveal
            delay={120}
            className="mt-14 flex flex-col gap-4 lg:grid lg:h-[420px] lg:grid-cols-[200px_64px_minmax(0,1fr)_64px_168px_64px_minmax(0,1fr)] lg:items-center lg:gap-0"
          >
            <div className="rounded-card border border-slate-200 bg-sand-50 p-5 text-slate-900 dark:border-rule dark:bg-surface dark:text-white">
              <Label>What you sell</Label>
              <p className="mt-2 font-display text-[20px] font-medium leading-snug">Cross-border payment infrastructure</p>
            </div>

            <Fan from={[DISC_H / 2]} to={centres(THEMES.length, THEME_H)} H={DISC_H} />

            <div className="grid gap-3 sm:grid-cols-2 lg:flex lg:h-full lg:flex-col lg:justify-between lg:gap-0">
              {THEMES.map((t) => (
                <div key={t.label} className={`${TILE} ${LIFT} flex flex-col justify-center px-4 py-3 lg:h-[90px]`}>
                  <Label>{t.label}</Label>
                  <p className="mt-1 text-[14px] leading-snug text-slate-800 dark:text-slate-300">{t.items.join(' · ')}</p>
                </div>
              ))}
            </div>

            <Fan from={centres(THEMES.length, THEME_H)} to={[DISC_H / 2]} H={DISC_H} />

            <div className="relative mx-auto flex h-[168px] w-[168px] shrink-0 items-center justify-center">
              <div className="relative flex h-full w-full flex-col items-center justify-center rounded-full border border-slate-300 bg-sand-50 text-center dark:border-slate-400/40 dark:bg-surface">
                <span className="font-display text-[38px] font-medium leading-none text-slate-950 dark:text-white">650M+</span>
                <span className="mt-1.5 text-[14px] text-slate-500 dark:text-slate-400">B2B profiles</span>
              </div>
            </div>

            <Fan from={[DISC_H / 2]} to={centres(FOUND.length, FOUND_H)} H={DISC_H} />

            <div className="lg:flex lg:h-full lg:flex-col">
              <p className="mb-3 text-[14px] text-slate-500 dark:text-slate-400 lg:hidden">Companies found</p>
              <ul className="space-y-2 lg:flex lg:h-full lg:flex-col lg:justify-between lg:space-y-0">
                {FOUND.map((c, i) => (
                  <li
                    key={c}
                    className={`${TILE} ${LIFT} flex items-center justify-between gap-2 px-4 py-2.5 text-[15px] font-medium text-slate-900 dark:text-white lg:h-[56px]`}
                  >
                    {c}
                    {i === 0 && <Chip tone="ember">Off-category</Chip>}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal>
            <div className="mt-14 flex flex-col gap-4 border-t border-slate-200 pt-8 dark:border-rule sm:flex-row sm:items-center sm:gap-8">
              <p className="font-display text-[64px] font-medium leading-none text-ember-500">30%</p>
              <p className="max-w-[720px] text-[18px] leading-[1.5] text-slate-600 dark:text-slate-300">
                A relevant company doesn’t always sit in the category you expect.{' '}
                <span className="text-slate-900 dark:text-white">30% of approved companies are discovered outside the original filter set.</span>
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ 6. ILLUSTRATIVE EXAMPLE — always-dark showcase band ══════════════ */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-slate-950 px-6 py-20 text-white dark:border-rule dark:bg-slate-950 lg:py-28">
        <div className={`relative ${WRAP}`}>
          <Reveal className="max-w-[860px]">
            <h2 className={H2}>
              A company can look wrong in the database, and still be <span className="italic">exactly right for you.</span>
            </h2>
          </Reveal>

          <div className="mt-12 flex flex-col items-stretch gap-4 lg:flex-row">
            <Reveal className="flex flex-col rounded-modal border border-rule bg-surface p-6 lg:w-[30%]">
              <p className="flex items-center gap-2 text-[14px] text-slate-400">
                <Database size={12} aria-hidden="true" />
                Database view
              </p>
              <p className={`mt-2 ${H3}`}>Northstar Software</p>
              <dl className="mt-4 divide-y divide-rule text-[15px]">
                {[
                  { k: 'Industry', v: 'Software' },
                  { k: 'Employees', v: '350' },
                  { k: 'Location', v: 'India' },
                  { k: 'Revenue', v: 'Unknown', muted: true },
                ].map((r) => (
                  <div key={r.k} className="flex justify-between py-2.5">
                    <dt className="text-slate-400">{r.k}</dt>
                    <dd className={r.muted ? 'text-slate-400' : 'font-medium text-white'}>{r.v}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-auto pt-6 text-[15px] text-slate-400">Nothing here says “cross-border payments prospect.”</p>
            </Reveal>

            <div aria-hidden="true" className="flex shrink-0 items-center justify-center text-slate-400">
              <ArrowRight size={20} strokeWidth={2} className="hidden lg:block" />
              <ArrowDown size={20} strokeWidth={2} className="lg:hidden" />
            </div>

            <Reveal
              delay={120}
              className="flex flex-1 flex-col rounded-modal border border-slate-200 bg-sand-50 p-6 text-slate-900 dark:border-rule dark:bg-surface dark:text-white"
            >
              <p className="flex items-center gap-2 text-[14px] text-slate-500 dark:text-slate-400">
                <Sparkles size={12} aria-hidden="true" />
                Harvin research
              </p>
              <ul className="mt-4 space-y-3">
                {['Subscription business', 'Customers in 18 countries', 'Recurring foreign-currency payments', 'Uses Stripe and AWS', '300K monthly active users'].map((r) => (
                  <li key={r} className="flex items-center gap-3 text-[17px]">
                    <Check size={15} strokeWidth={2} className="shrink-0 text-slate-400" aria-hidden="true" />
                    {r}
                  </li>
                ))}
              </ul>
              <p className="mt-auto border-t border-slate-200 pt-4 text-[15px] text-slate-500 dark:border-rule dark:text-slate-400">Harvin looks past the category label to understand the business.</p>
            </Reveal>

            <Reveal delay={240} className="flex flex-col items-start rounded-modal border border-rule bg-surface p-6 text-white lg:w-[24%]">
              <p className="text-[14px] text-slate-400">Company Fit</p>
              <div className="my-5">
                <ScoreRing score={91} trackClass="text-rule" barClass="text-ember-500">
                  <span className="font-display text-[48px] font-medium leading-none text-ember-500">91</span>
                  <span className="text-[13px] text-slate-400">/ 100</span>
                </ScoreRing>
              </div>
              <p className={`mt-auto ${H3}`}>Strong fit</p>
              <p className="mt-1 text-[15px] text-slate-300">Matches patterns from companies that converted</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ 7. TWO WAYS TO BUILD ═════════════════════════════════════════════ */}
      <section className={`${SECTION}`}>
        <div className={WRAP}>
          <Reveal className="max-w-[760px]">
            <h2 className={H2}>Build your list from scratch, or improve the one you already have.</h2>
          </Reveal>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {[
              { tag: 'A', title: 'Create from scratch', sub: 'Starts from your saved Company Profile', steps: ['Company Profile', 'Find companies', 'Research', 'Company Fit', 'Decision-makers'] },
              { tag: 'B', title: 'Enrich existing data', sub: 'Upload a CSV or XLSX of companies, leads or both', steps: ['Upload', 'Normalize', 'Fill gaps', 'Company Fit', 'Missing decision-makers'] },
            ].map((p, pi) => (
              <Reveal key={p.tag} delay={pi * 120} className={`${SURFACE} ${LIFT} flex flex-col p-6 sm:p-7`}>
                <div>
                  <h3 className={H3}>{p.title}</h3>
                  <p className="mt-1 text-[15px] text-slate-500 dark:text-slate-400">{p.sub}</p>
                </div>
                <ol className="relative mt-6 space-y-2 pl-5">
                  <span aria-hidden="true" className="absolute bottom-5 left-[7px] top-5 w-px bg-slate-200 dark:bg-rule" />
                  {p.steps.map((s, i) => (
                    <li key={s} className="relative">
                      <span aria-hidden="true" className="absolute -left-[17px] top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full border-2 border-slate-400 bg-sand-50 dark:bg-surface" />
                      <div className={`${TILE} flex items-center gap-3 px-4 py-2.5 text-[15px] font-medium text-slate-900 dark:text-white`}>
                        <span className="text-[13px] tabular-nums text-slate-400">{i + 1}</span>
                        {s}
                      </div>
                    </li>
                  ))}
                </ol>
                {p.tag === 'B' && (
                  <div className="mt-5 rounded-card border border-dashed border-slate-300 p-4 dark:border-rule">
                    <Label>Automatic normalization</Label>
                    <div className="mt-3 space-y-1.5 text-[13.5px] tabular-nums">
                      {[
                        ['ACME TECHNOLOGIES PVT LTD', 'Acme Technologies'],
                        ['SARAH', 'Sarah'],
                      ].map(([from, to]) => (
                        <p key={from} className="flex flex-wrap items-center gap-2">
                          <span className="text-slate-400 line-through decoration-grey dark:text-slate-400">{from}</span>
                          <ArrowRight size={12} className="text-slate-400" aria-hidden="true" />
                          <span className="font-medium text-slate-900 dark:text-white">{to}</span>
                        </p>
                      ))}
                    </div>
                    <p className="mt-3 text-[14px] text-slate-500 dark:text-slate-400">Clean data before the SDR sees it.</p>
                  </div>
                )}
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-6 flex flex-col gap-3 rounded-card border border-slate-200 bg-sand-50 px-6 py-5 text-slate-900 dark:border-rule dark:bg-surface dark:text-white sm:flex-row sm:items-center sm:gap-5">
              <span className="inline-flex items-center gap-2 text-[15px] font-medium text-ember-600 dark:text-ember-400">
                <Check size={14} strokeWidth={3} aria-hidden="true" />
                Sales-ready data
              </span>
              <span className="flex flex-wrap gap-2">
                {['Researched companies', 'Company Fit', 'Decision-makers', 'Verified email and phone'].map((x) => (
                  <span key={x} className="rounded-btn border border-slate-200 px-3 py-1 text-[14px] text-slate-600 dark:border-rule dark:text-slate-300">
                    {x}
                  </span>
                ))}
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ 8. PREMIUM COMPANY RESEARCH ══════════════════════════════════════ */}
      <section id="research" className={SECTION}>
        <div className={`grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 ${WRAP}`}>
          <Reveal>
            <h2 className={H2}>Add the company data that actually decides fit.</h2>
            <p className={`mt-5 ${LEAD}`}>
              Harvin can research and refresh the information your targeting depends on, instead of relying only on what’s already in the company record.
            </p>
            <ul className="mt-8 space-y-2 text-[15px] text-slate-800 dark:text-slate-300">
              <li className="flex items-center gap-2.5">
                <span aria-hidden="true" className="h-4 w-4 rounded border border-slate-300 bg-white dark:border-rule dark:bg-slate-950" />
                Standard company data
              </li>
              <li className="flex items-center gap-2.5">
                <span aria-hidden="true" className="h-4 w-4 rounded border border-ember-400 bg-ember-50 dark:border-ember-500/60 dark:bg-slate-950" />
                Researched by Harvin
              </li>
            </ul>
            <p className="mt-3 text-[14px] text-slate-500 dark:text-slate-400">Illustrative values. Field availability varies by company.</p>
          </Reveal>

          <Reveal delay={120} className={`${SURFACE} p-5`}>
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-btn border border-slate-200 bg-white font-display text-[20px] font-medium text-slate-900 dark:border-rule dark:bg-slate-950 dark:text-white">V</span>
                <div>
                  <p className="text-[17px] font-medium text-slate-900 dark:text-white">Vela Commerce</p>
                  <p className="text-[14px] text-slate-500 dark:text-slate-400">Illustrative company record</p>
                </div>
              </div>
              <span className="rounded-btn border border-slate-200 px-3 py-1.5 text-[14px] font-medium text-slate-900 dark:border-rule dark:text-white">88 · Strong fit</span>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
              {STANDARD_FIELDS.map((f) => (
                <div key={f.k} className={`${TILE} p-3`}>
                  <p className="text-[13px] text-slate-500 dark:text-slate-400">{f.k}</p>
                  <p className="mt-0.5 text-[15px] font-medium text-slate-900 dark:text-white">{f.v}</p>
                </div>
              ))}
              {RESEARCHED_FIELDS.map((f) => (
                <div
                  key={f.k}
                  className="flex min-h-[110px] flex-col rounded-card border border-ember-300 bg-white p-3 dark:border-ember-500/50 dark:bg-slate-950"
                >
                  <p className="flex items-start justify-between gap-2 text-[13px] text-slate-500 dark:text-slate-400">
                    {f.k}
                    <Search size={12} className="mt-0.5 shrink-0 text-slate-400" aria-hidden="true" />
                  </p>
                  <p className="mt-auto pt-3 font-display text-[20px] font-medium leading-tight text-slate-900 dark:text-white">{f.v}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ 9. ENRICH COLUMN ═════════════════════════════════════════════════ */}
      <section className={`${SECTION}`}>
        <div className={WRAP}>
          <Reveal className="max-w-[820px]">
            <h2 className={H2}>Need another field? Add a column and let Harvin research it.</h2>
            <p className={`mt-5 ${LEAD}`}>
              Add the information you need without rebuilding the list. Choose a field and Harvin researches missing values across the selected companies.
            </p>
          </Reveal>

          <Reveal delay={120} className="mt-12">
            <EnrichTable />
          </Reveal>
        </div>
      </section>

      {/* ═══ 10. DECISION-MAKER MATCHING ══════════════════════════════════════ */}
      <section id="decision-makers" className={SECTION}>
        <div className={WRAP}>
          <Reveal className="max-w-[820px]">
            <h2 className={H2}>Finding the right company is only half the job.</h2>
            <p className={`mt-5 ${LEAD}`}>Finding the right person is where title searches get noisy.</p>
          </Reveal>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <Reveal className={`${SURFACE} p-6 sm:p-7`}>
              <div className="flex items-center justify-between">
                <Label>Keyword title search</Label>
                <span className="text-[13px] text-slate-500 dark:text-slate-400">Without Harvin</span>
              </div>
              <div className="mt-3 flex items-center gap-2 rounded-btn border border-slate-200 bg-white px-3 py-2 text-[14px] text-slate-700 dark:border-rule dark:bg-slate-950 dark:text-slate-300">
                <Search size={14} className="text-slate-400" aria-hidden="true" />
                Title contains <span className="text-slate-900 dark:text-white">“Finance”</span>
              </div>
              <ul className="mt-4 divide-y divide-slate-200 dark:divide-rule">
                {KEYWORD_RESULTS.map((r) => (
                  <li key={r.title} className="flex items-center justify-between gap-3 py-2.5 text-[15px]">
                    <span className="text-slate-600 dark:text-slate-300">{r.title}</span>
                    <span className="inline-flex items-center gap-1.5 text-[13px] text-slate-400 dark:text-slate-400">
                      <X size={12} className="text-slate-400 dark:text-grey" aria-hidden="true" />
                      {r.verdict}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={120} className={`${SURFACE} p-6 sm:p-7`}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="flex items-center gap-2 text-[14px] text-slate-900 dark:text-white">
                  <Mark className="h-3.5" />
                  Harvin · Vela Commerce
                </p>
                <Chip>Target Profile</Chip>
              </div>
              <p className="mt-3 text-[16px] font-medium text-slate-900 dark:text-white">Searches your roles in priority order</p>
              <ol className="mt-4 space-y-2">
                {PRIORITY_ROLES.map((r, i) => (
                  <li
                    key={r.role}
                    className={[
                      'flex items-center gap-3 rounded-btn border px-4 py-2.5 text-[15px]',
                      r.matched
                        ? 'border-slate-200 bg-sand-50 font-medium text-slate-900 dark:border-rule dark:bg-slate-950 dark:text-white'
                        : 'border-dashed border-slate-200 text-slate-400 dark:border-rule dark:text-slate-400',
                    ].join(' ')}
                  >
                    <span className="text-[13px] tabular-nums text-slate-400">{i + 1}</span>
                    <span className="flex-1">{r.role}</span>
                    {r.matched ? (
                      <span className="inline-flex items-center gap-1 text-[13px] font-medium text-ember-600 dark:text-ember-400">
                        <Check size={13} strokeWidth={2.5} aria-hidden="true" />
                        Matched
                      </span>
                    ) : (
                      <span className="text-[13px]">No match</span>
                    )}
                  </li>
                ))}
              </ol>
              <p className="mt-4 text-[14px] text-slate-500 dark:text-slate-400">Matches on title, seniority and function, in your priority order.</p>
            </Reveal>
          </div>

          <Reveal>
            <p className="mt-12 border-t border-slate-200 pt-8 font-display text-[clamp(24px,2.4vw,32px)] font-medium leading-[1.2] text-slate-900 dark:border-rule dark:text-white">
              <span className="italic">40% fewer irrelevant decision-maker matches.</span> Less manual title checking.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══ 11. EMAIL AND PHONE ══════════════════════════════════════════════ */}
      <section id="contacts" className={`${SECTION}`}>
        <div className={WRAP}>
          <Reveal className="max-w-[860px]">
            <h2 className={H2}>One person. One verified result.</h2>
            <p className={`mt-5 ${LEAD}`}>
              Harvin runs separate email and phone waterfalls and stops each one at the first qualifying result, so your team doesn’t jump between contact-data tools.
            </p>
          </Reveal>

          <Reveal delay={120} className="mt-12 flex flex-col items-stretch gap-4 lg:flex-row lg:items-center">
            <div className={`${SURFACE} p-6 lg:w-[220px] lg:shrink-0`}>
              <Label>Decision-maker</Label>
              <span className="mt-4 flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-[16px] font-medium text-slate-900 dark:border-rule dark:bg-slate-950 dark:text-white">PN</span>
              <p className={`mt-3 ${H3}`}>Priya Nair</p>
              <p className="text-[14px] text-slate-500 dark:text-slate-400">Head of Payments</p>
              <p className="text-[14px] text-slate-500 dark:text-slate-400">Vela Commerce</p>
            </div>

            <FlowArrow />

            <Waterfalls />
          </Reveal>

          <p className="mt-8 text-[15px] text-slate-500 dark:text-slate-400 lg:pl-[284px]">30+ sources across Harvin’s contact-data waterfall</p>
        </div>
      </section>

      {/* ═══ 12. SIGNALS ══════════════════════════════════════════════════════ */}
      <section id="signals" className={SECTION}>
        <div className={WRAP}>
          <Reveal className="max-w-[900px]">
            <h2 className={H2}>Find the right companies. Keep watching for the right moment.</h2>
          </Reveal>

          <div className="mt-12 flex flex-col items-stretch gap-4 lg:flex-row">
            <Reveal className={`${SURFACE} flex flex-col p-6 lg:w-[34%]`}>
              <Label>Company Fit</Label>
              <p className={`mt-1 ${H3}`}>Should we sell to them?</p>
              <div className="mt-6 flex items-center gap-5">
                <ScoreRing score={88} size={112} stroke={9} trackClass="text-slate-200 dark:text-rule" barClass="text-ember-500">
                  <span className="font-display text-[40px] font-medium leading-none text-slate-950 dark:text-white">88</span>
                </ScoreRing>
                <div>
                  <p className="text-[17px] font-medium text-slate-900 dark:text-white">Strong fit</p>
                  <p className="text-[14px] text-slate-500 dark:text-slate-400">Vela Commerce</p>
                </div>
              </div>
              <p className="mt-auto border-t border-slate-200 pt-4 text-[15px] text-slate-500 dark:border-rule dark:text-slate-400 lg:mt-10">
                A high-fit company may not have a signal today.
              </p>
            </Reveal>

            <FlowArrow />

            <Reveal delay={120} className={`${SURFACE} flex flex-1 flex-col p-6`}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Label>Signals</Label>
                  <p className={`mt-1 ${H3}`}>Is there a reason to act now?</p>
                </div>
                <div className="text-right">
                  <p className="font-display text-[40px] font-medium leading-none text-slate-950 dark:text-white">20+</p>
                  <p className="mt-1 text-[14px] text-slate-500 dark:text-slate-400">signal types monitored</p>
                </div>
              </div>
              <ul className="mt-5 space-y-3">
                {[
                  { icon: Users, type: 'Leadership change', title: 'New VP Finance joined', meta: 'Vela Commerce · 4 days ago', fresh: true },
                  { icon: Globe, type: 'Expansion', title: 'Opened operations in UAE', meta: 'Vela Commerce · 11 days ago', fresh: false },
                ].map(({ icon: Icon, ...s }) => (
                  <li key={s.title} className={`${TILE} ${LIFT} flex items-start gap-4 p-4`}>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-btn border border-slate-200 text-slate-400 dark:border-rule">
                      <Icon size={17} aria-hidden="true" />
                    </span>
                    <div className="flex-1">
                      <p className="text-[13px] text-slate-500 dark:text-slate-400">{s.type}</p>
                      <p className="mt-0.5 text-[16px] font-medium text-slate-900 dark:text-white">{s.title}</p>
                      <p className="text-[14px] text-slate-500 dark:text-slate-400">{s.meta}</p>
                    </div>
                    {s.fresh && (
                      <span className="flex items-center gap-1.5 rounded-btn border border-slate-200 px-2 py-0.5 text-[13px] font-medium text-slate-900 dark:border-rule dark:text-white">
                        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                        New
                      </span>
                    )}
                  </li>
                ))}
              </ul>
              <p className="mt-auto border-t border-slate-200 pt-4 text-[15px] text-slate-500 dark:border-rule dark:text-slate-400 lg:mt-8">
                A strong signal doesn’t make a poor-fit company a good target.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ 13. WHERE HARVIN REMOVES WORK ════════════════════════════════════ */}
      <section className={`${SECTION}`}>
        <div className={WRAP}>
          <Reveal className="max-w-[820px]">
            <h2 className={H2}>Less manual work. Faster to a sales-ready market.</h2>
          </Reveal>

          <div className="mt-12 grid grid-cols-2 gap-y-8 border-t border-slate-200 dark:border-rule lg:grid-cols-4">
            {STATS.map((s, i) => (
              <Reveal key={s.l} delay={i * 90} className="border-l border-slate-200 px-5 pt-6 dark:border-rule">
                <p className="font-display text-[clamp(40px,4.4vw,58px)] font-medium leading-none text-slate-950 dark:text-white">
                  <CountUp to={s.to} suffix={s.suffix} />
                </p>
                <p className="mt-3 text-[15px] leading-[1.4] text-slate-600 dark:text-slate-300">{s.l}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className={`mt-10 overflow-hidden ${SURFACE}`}>
            <div className="hidden grid-cols-[170px_1fr_1fr] border-b border-slate-200 px-6 py-3 text-[14px] dark:border-rule sm:grid">
              <span className="text-slate-500 dark:text-slate-400">Workflow</span>
              <span className="text-slate-500 dark:text-slate-400">Before</span>
              <span className="text-slate-500 dark:text-slate-400">With Harvin</span>
            </div>
            <div className="divide-y divide-slate-200 dark:divide-rule">
              {REMOVED_WORK.map((r) => (
                <div key={r.area} className="grid gap-1 px-6 py-4 transition-colors hover:bg-sand-100 dark:hover:bg-white/[0.02] sm:grid-cols-[170px_1fr_1fr] sm:items-center">
                  <p className="text-[14px] text-slate-500 dark:text-slate-400">{r.area}</p>
                  <p className="text-[15px] text-slate-500 line-through decoration-grey dark:text-slate-400">{r.before}</p>
                  <p className="flex items-center gap-2 text-[15px] font-medium text-slate-900 dark:text-white">
                    <Check size={15} strokeWidth={2.5} className="shrink-0 text-ember-500 dark:text-ember-400" aria-hidden="true" />
                    {r.after}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ 14. FINAL CTA ════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-slate-950 px-6 py-24 text-white dark:bg-slate-950 lg:py-32">
        <Reveal className={`relative ${WRAP}`}>
          <h2 className={`max-w-[760px] ${H2}`}>
            Give Harvin <span className="text-ember-400">one market.</span>
          </h2>
          <p className="mt-5 max-w-[620px] text-[18px] leading-[1.5] text-slate-300 sm:text-[19px]">
            Share your targeting criteria, your best customers, or the spreadsheet your SDR team is working today. We’ll show you what Harvin finds.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <button type="button" onClick={() => openModal('talk-to-sales')} className={`${CTA_BTN} focus-visible:ring-offset-slate-950`}>
              See Harvin on your market
              <ArrowRight size={16} aria-hidden="true" />
            </button>
          </div>
          <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-[14px] text-slate-400">
            {['Your targeting criteria', 'Your best customers', 'Your current spreadsheet'].map((x) => (
              <li key={x} className="flex items-center gap-1.5">
                <Check size={13} className="text-slate-400" aria-hidden="true" />
                {x}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>
    </div>
  );
}
