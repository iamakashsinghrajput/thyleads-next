'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  ArrowDown,
  ArrowRight,
  Banknote,
  Briefcase,
  Check,
  Cpu,
  Globe,
  Mail,
  Newspaper,
  Phone,
  Plus,
  Search,
  Users,
  X,
  Zap,
} from 'lucide-react';
import { useModal } from '@/components/ModalContext';

/* Layout, primitives and terminology mirror the previous /data-building page (DataBuildingClient.tsx, now replaced by components/legacy-home/data-building):
   Company Fit, Signals, Target Profile, verified email + phone, Account 360. */

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
        'inline-flex items-center gap-1 rounded-btn border px-2 py-0.5 text-[13px] font-medium',
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

function NewPill() {
  return (
    <span className="shrink-0 rounded-btn border border-slate-200 px-2 py-0.5 text-[13px] font-medium text-slate-900 dark:border-rule dark:text-white">
      New
    </span>
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
  { href: '#how-it-works', label: 'How it works' },
  { href: '#fit-and-signals', label: 'Company Fit + Signals' },
  { href: '#signals', label: 'Signal types' },
  { href: '#account-360', label: 'Account 360' },
  { href: '#contacts', label: 'Decision-makers' },
  { href: '#faq', label: 'FAQs' },
];

const STEPS = [
  { n: '01', verb: 'Understand', title: 'Your business', items: ['What you sell', 'Who converted', 'Who didn’t', 'Your Target Profile'] },
  { n: '02', verb: 'Watch', title: 'Your accounts', items: ['Lists you build in Harvin', 'Accounts you upload', '20+ signal types'] },
  { n: '03', verb: 'Prioritize', title: 'Fit and timing', items: ['Company Fit', 'Fresh signals', 'Why now, in one line'] },
  { n: '04', verb: 'Act', title: 'People and context', items: ['Decision-makers', 'Verified email', 'Direct/mobile phone', 'Account 360'] },
];

/* Illustrative board: a signal lands on each account in turn (`at`). */
const BOARD = [
  { name: 'Vela Commerce', fit: 88, signal: 'New VP Finance joined', type: 'Leadership change', at: 0 },
  { name: 'Brightpath Learning', fit: 81, signal: 'Raised a Series B', type: 'Funding', at: 1 },
  { name: 'Kitecart', fit: 76, signal: 'Hiring 3 finance roles', type: 'Hiring', at: 2 },
  { name: 'Lumora Health', fit: 72, signal: null, type: null, at: 99 },
  { name: 'CornerMart', fit: 31, signal: 'Opened 12 new stores', type: 'Expansion', at: 3 },
];

const SIGNAL_TYPES = [
  { icon: Users, type: 'Leadership change', title: 'New VP Finance joined', meta: '4 days ago' },
  { icon: Banknote, type: 'Funding', title: 'Raised a Series C', meta: '9 days ago' },
  { icon: Briefcase, type: 'Hiring', title: 'Hiring 3 treasury roles', meta: '6 days ago' },
  { icon: Globe, type: 'Expansion', title: 'Opened operations in UAE', meta: '11 days ago' },
  { icon: Cpu, type: 'Technology change', title: 'Added Stripe to checkout', meta: '2 weeks ago' },
  { icon: Newspaper, type: 'News', title: 'Featured in a cross-border payments report', meta: '3 weeks ago' },
];

const A360_SIGNALS = [
  { icon: Users, type: 'Leadership change', title: 'New VP Finance joined', meta: '4 days ago' },
  { icon: Globe, type: 'Expansion', title: 'Opened operations in UAE', meta: '11 days ago' },
  { icon: Briefcase, type: 'Hiring', title: 'Hiring 3 treasury roles', meta: '2 weeks ago' },
];

const FIT_REASONS = ['Marketplace with cross-border sellers', 'Recurring foreign-currency payouts', 'Matches companies that converted'];

const A360_FIELDS = [
  { k: 'Category', v: 'Online marketplace' },
  { k: 'Revenue', v: '$41M' },
  { k: 'Funding', v: 'Series C' },
  { k: 'Monthly active users', v: '1.2M' },
];

const PRIORITY_ROLES = [
  { role: 'CFO', matched: true },
  { role: 'VP Finance', matched: true },
  { role: 'Head of Finance', matched: false },
  { role: 'Head of Payments', matched: true },
  { role: 'Treasury Director', matched: false },
];

const STATS = [
  { to: 20, suffix: '+', l: 'signal types monitored on the accounts you choose' },
  { to: 30, suffix: '+', l: 'sources across Harvin’s email and phone waterfall' },
  { to: 650, suffix: 'M+', l: 'B2B profiles to find the right decision-makers' },
];

const REMOVED_WORK = [
  { area: 'Prioritization', before: 'Guessing from a static account list', after: 'Company Fit plus fresh signals' },
  { area: 'Monitoring', before: 'Revisiting accounts manually', after: 'Signal monitoring on the accounts you choose' },
  { area: 'Research', before: 'Opening websites, news and data tools', after: 'Structured company research in Account 360' },
  { area: 'People', before: 'Checking job titles by hand', after: 'Matching to your Target Profile' },
  { area: 'Contact data', before: 'Switching between providers', after: 'One email and phone waterfall' },
];

const FAQS = [
  {
    q: 'What is Account Intelligence in Harvin?',
    a: 'Account Intelligence tells your team which accounts to work and why now. Harvin combines Company Fit with live signals, then puts the company research, decision-makers and verified contacts for each account in one view.',
  },
  {
    q: 'How does Harvin decide which accounts deserve attention?',
    a: 'Two questions, answered separately. Company Fit asks whether you should sell to the company at all, based on what you sell and which companies converted. Signals ask whether there’s a reason to act now. An account moves up when it fits and something has changed.',
  },
  {
    q: 'What signals does Harvin track?',
    a: 'Harvin monitors 20+ signal types, including leadership changes, funding, hiring, expansion, technology changes and news. Each signal shows what happened, when, and which account it belongs to.',
  },
  {
    q: 'What is Account 360?',
    a: 'Account 360 is the single view of an account in Harvin: its Company Fit and the reasons behind it, researched company fields, recent signals, matched decision-makers and their verified email and phone.',
  },
  {
    q: 'Which plans include signal monitoring?',
    a: 'Signals are included on the Growth, Agency and Enterprise plans. Monitoring uses 5 credits per account per month, and every paid plan includes unlimited seats. See the pricing page for details.',
  },
];

/* ═══ Animated mocks ══════════════════════════════════════════════════════════ */

/* Hero console: signals stream into the feed; the account card follows the newest one. */
const HERO_FEED = [
  { icon: Users, company: 'Vela Commerce', type: 'Leadership change', signal: 'New VP Finance joined', fit: 88, person: 'Priya Nair', role: 'Head of Payments' },
  { icon: Banknote, company: 'Brightpath Learning', type: 'Funding', signal: 'Raised a Series B', fit: 81, person: 'Arjun Rao', role: 'CFO' },
  { icon: Briefcase, company: 'Kitecart', type: 'Hiring', signal: 'Hiring 3 finance roles', fit: 76, person: 'Sara Lim', role: 'VP Finance' },
  { icon: Globe, company: 'Lumora Health', type: 'Expansion', signal: 'Opened operations in UAE', fit: 79, person: 'Omar Haddad', role: 'Head of Treasury' },
];
const HERO_AGO = ['just now', '2h ago', '1d ago', '3d ago'];

function HeroConsole() {
  const [ref, seen] = useInView<HTMLDivElement>(0.25);
  const step = useCycle(HERO_FEED.length, 2600, seen);
  // Newest first: the item at `step`, then the ones that arrived before it.
  const feed = HERO_FEED.map((_, i) => HERO_FEED[(step - i + HERO_FEED.length) % HERO_FEED.length]);
  const focus = feed[0];
  const initials = focus.person
    .split(' ')
    .map((p) => p[0])
    .join('');

  return (
    <div ref={ref} className="relative">
      <div className={`${SURFACE} relative overflow-hidden`}>
        {/* console chrome */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-5 py-3 dark:border-rule">
          <p className="flex items-center gap-2.5 text-[14px] font-medium text-slate-900 dark:text-white">
            <Mark className="h-4" />
            Account Intelligence
            <span className="hidden text-slate-400 sm:inline">/</span>
            <span className="hidden text-slate-500 dark:text-slate-400 sm:inline">Watchlist</span>
          </p>
          <span className="flex items-center gap-2 text-[13px] text-slate-500 dark:text-slate-400">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-slate-400 motion-safe:animate-pulse" />
            Monitoring 1,284 accounts
          </span>
        </div>

        <div className="grid lg:grid-cols-[1.3fr_1fr]">
          {/* live feed */}
          <div className="border-b border-slate-200 p-4 dark:border-rule sm:p-5 lg:border-b-0 lg:border-r">
            <div className="flex items-center justify-between px-1">
              <Label>Live signals</Label>
              <span className="text-[13px] text-slate-400">Newest first</span>
            </div>
            <ul className="mt-3 space-y-2">
              {feed.map(({ icon: Icon, ...s }, i) => (
                <li
                  key={`${s.company}-${i === 0 ? step : 'old'}`}
                  className={[
                    'flex items-center gap-3 rounded-card border px-3.5 py-3 transition-all duration-500',
                    i === 0
                      ? 'border-ember-400 bg-white motion-safe:animate-fade-up dark:border-ember-500/70 dark:bg-slate-950'
                      : 'border-slate-200 bg-white dark:border-rule dark:bg-slate-950',
                    i === 3 ? 'opacity-50' : '',
                  ].join(' ')}
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-btn border border-slate-200 text-slate-400 dark:border-rule">
                    <Icon size={16} aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[14px] font-medium text-slate-900 dark:text-white">{s.signal}</span>
                    <span className="block truncate text-[13px] text-slate-500 dark:text-slate-400">
                      {s.company} · {s.type}
                    </span>
                  </span>
                  {i === 0 ? <NewPill /> : <span className="shrink-0 text-[13px] text-slate-400">{HERO_AGO[i]}</span>}
                </li>
              ))}
            </ul>
          </div>

          {/* focused account */}
          <div className="flex flex-col p-4 sm:p-5">
            <Label className="px-1">Work now</Label>
            <div className="mt-3 flex items-center gap-4 px-1">
              <ScoreRing score={focus.fit} size={88} stroke={8} trackClass="text-slate-200 dark:text-rule" barClass="text-slate-500 dark:text-slate-300">
                <span className="font-display text-[28px] font-medium leading-none text-slate-950 dark:text-white">{focus.fit}</span>
                <span className="mt-0.5 text-[12px] text-slate-500 dark:text-slate-400">Fit</span>
              </ScoreRing>
              <div className="min-w-0">
                <p key={focus.company} className="truncate font-display text-[22px] font-medium text-slate-900 motion-safe:animate-fade-up dark:text-white">
                  {focus.company}
                </p>
                <p className="text-[13px] text-slate-500 dark:text-slate-400">Company Fit · Strong fit</p>
              </div>
            </div>

            <dl className="mt-4 space-y-2.5">
              <div className={`${TILE} px-3.5 py-2.5`}>
                <dt className="text-[13px] text-slate-500 dark:text-slate-400">Why now</dt>
                <dd className="text-[14px] font-medium text-slate-900 dark:text-white">{focus.signal}</dd>
              </div>
              <div className={`${TILE} flex items-center gap-3 px-3.5 py-2.5`}>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 text-[12px] font-medium text-slate-900 dark:border-rule dark:text-white">
                  {initials}
                </span>
                <div className="min-w-0 flex-1">
                  <dt className="text-[13px] text-slate-500 dark:text-slate-400">Who to engage</dt>
                  <dd className="truncate text-[14px] font-medium text-slate-900 dark:text-white">
                    {focus.person} · {focus.role}
                  </dd>
                </div>
                <span className="flex items-center gap-1 text-slate-400" aria-label="Email and phone verified">
                  <Mail size={13} aria-hidden="true" />
                  <Phone size={13} aria-hidden="true" />
                  <Check size={13} strokeWidth={2.5} className="text-slate-900 dark:text-white" aria-hidden="true" />
                </span>
              </div>
            </dl>

            <span className="mt-4 inline-flex items-center justify-center gap-2 rounded-btn border border-slate-200 px-4 py-2.5 text-[14px] font-medium text-slate-900 dark:border-rule dark:text-white lg:mt-auto">
              <Zap size={14} className="text-slate-400" aria-hidden="true" />
              Open in Account 360
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Signals land on accounts one by one; priority = fit AND a fresh signal. */
function PriorityBoard() {
  const [ref, seen] = useInView<HTMLDivElement>(0.3);
  const step = useCycle(5, 1300, seen);

  return (
    <div ref={ref} className={`${SURFACE} overflow-hidden`}>
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 px-5 py-3.5 dark:border-rule">
        <p className="text-[15px] font-medium text-slate-900 dark:text-white">Watchlist · Cross-border payments</p>
        <span className="flex items-center gap-1.5 text-[13px] text-slate-500 dark:text-slate-400">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-slate-400 motion-safe:animate-pulse" />
          Monitoring for signals
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-[13.5px]">
          <thead>
            <tr className="border-b border-slate-200 text-[13px] text-slate-500 dark:border-rule dark:text-slate-400">
              <th className="px-5 py-3 font-normal">Company</th>
              <th className="px-3 py-3 font-normal">Company Fit</th>
              <th className="px-3 py-3 font-normal">Latest signal</th>
              <th className="px-5 py-3 text-right font-normal">Priority</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-rule">
            {BOARD.map((r) => {
              const arrived = r.signal !== null && r.at <= step;
              const fits = r.fit >= 70;
              const fresh = arrived && r.at === step && seen;
              const priority = fits && arrived ? 'work' : fits ? 'watch' : 'skip';
              return (
                <tr key={r.name} className={`transition-colors duration-500 ${fresh ? 'bg-sand-100 dark:bg-white/[0.03]' : ''}`}>
                  <td className="px-5 py-3 font-medium text-slate-900 dark:text-white">{r.name}</td>
                  <td className="px-3 py-3">
                    <span className="flex items-center gap-2">
                      <span className="h-1.5 w-16 overflow-hidden rounded-full bg-slate-200 dark:bg-rule">
                        <span
                          className={`block h-full rounded-full ${fits ? 'bg-slate-500 dark:bg-slate-300' : 'bg-slate-300 dark:bg-grey'}`}
                          style={{ width: `${r.fit}%` }}
                        />
                      </span>
                      <span className={`font-medium tabular-nums ${fits ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-slate-400'}`}>{r.fit}</span>
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    {arrived ? (
                      <span className="flex items-center gap-2">
                        <span className={fits ? 'text-slate-700 dark:text-slate-300' : 'text-slate-400 line-through decoration-grey dark:text-slate-400'}>{r.signal}</span>
                        {fresh && <NewPill />}
                      </span>
                    ) : (
                      <span className="text-slate-400 dark:text-slate-400">No new signal</span>
                    )}
                  </td>
                  <td className="px-5 py-3 text-right">
                    {priority === 'work' ? (
                      <span className="inline-flex items-center gap-1 rounded-btn border border-ember-400 px-2 py-0.5 text-[13px] font-medium text-ember-600 dark:border-ember-500/70 dark:text-ember-400">
                        <Zap size={12} aria-hidden="true" />
                        Work now
                      </span>
                    ) : priority === 'watch' ? (
                      <span className="rounded-btn border border-slate-200 px-2 py-0.5 text-[13px] text-slate-700 dark:border-rule dark:text-slate-300">
                        Keep watching
                      </span>
                    ) : (
                      <span className="text-[13px] text-slate-400 dark:text-slate-400">Not a fit</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="border-t border-slate-200 px-5 py-3 text-[14px] text-slate-500 dark:border-rule dark:text-slate-400">
        Illustrative accounts. CornerMart has a signal, but a strong signal doesn’t make a poor-fit company a good target.
      </p>
    </div>
  );
}

function Account360() {
  const [ref, seen] = useInView<HTMLDivElement>(0.3);
  const newest = useCycle(A360_SIGNALS.length, 2000, seen);

  return (
    <div ref={ref} className={`${SURFACE} overflow-hidden`}>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-5 py-4 dark:border-rule">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-btn border border-slate-200 bg-white font-display text-[20px] font-medium text-slate-900 dark:border-rule dark:bg-slate-950 dark:text-white">
            V
          </span>
          <div>
            <p className="text-[17px] font-medium text-slate-900 dark:text-white">Vela Commerce</p>
            <p className="text-[14px] text-slate-500 dark:text-slate-400">velacommerce.co · Singapore · 600 employees</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Chip>3 new signals</Chip>
          <span className="rounded-btn border border-ember-400 px-3 py-1 text-[14px] font-medium text-ember-600 dark:border-ember-500/70 dark:text-ember-400">88 · Strong fit</span>
        </div>
      </div>

      <div className="grid gap-3 p-4 md:grid-cols-2">
        <div className={`${TILE} p-4`}>
          <Label>Why it fits</Label>
          <ul className="mt-3 space-y-2.5">
            {FIT_REASONS.map((r) => (
              <li key={r} className="flex items-center gap-2.5 text-[14px] text-slate-700 dark:text-slate-300">
                <Check size={14} strokeWidth={2.5} className="shrink-0 text-slate-400" aria-hidden="true" />
                {r}
              </li>
            ))}
          </ul>
        </div>

        <div className={`${TILE} p-4`}>
          <div className="flex items-center justify-between">
            <Label>Signals</Label>
            <span className="text-[13px] text-slate-400">Last 30 days</span>
          </div>
          <ul className="mt-3 space-y-1.5">
            {A360_SIGNALS.map(({ icon: Icon, ...s }, i) => (
              <li
                key={s.title}
                className={`flex items-center gap-3 rounded-btn px-2 py-1.5 transition-colors duration-500 ${i === newest ? 'bg-sand-100 dark:bg-white/[0.05]' : ''}`}
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-btn border border-slate-200 text-slate-400 dark:border-rule">
                  <Icon size={14} aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[14px] font-medium text-slate-900 dark:text-white">{s.title}</span>
                  <span className="block text-[13px] text-slate-500 dark:text-slate-400">
                    {s.type} · {s.meta}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className={`${TILE} p-4`}>
          <Label>Researched fields</Label>
          <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-3 text-[13.5px]">
            {A360_FIELDS.map((f) => (
              <div key={f.k}>
                <dt className="text-slate-500 dark:text-slate-400">{f.k}</dt>
                <dd className="font-medium text-slate-900 dark:text-white">{f.v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {['Stripe', 'Shopify', 'AWS'].map((t) => (
              <Chip key={t}>{t}</Chip>
            ))}
          </div>
        </div>

        <div className={`${TILE} p-4`}>
          <Label>Decision-makers</Label>
          <ul className="mt-3 space-y-2.5">
            {[
              { i: 'PN', n: 'Priya Nair', r: 'Head of Payments', ready: true },
              { i: 'DT', n: 'Daniel Tan', r: 'VP Finance', ready: true },
              { i: 'ML', n: 'Mei Lin', r: 'CFO', ready: false },
            ].map((p) => (
              <li key={p.n} className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 text-[12px] font-medium text-slate-900 dark:border-rule dark:text-white">
                  {p.i}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[14px] font-medium text-slate-900 dark:text-white">{p.n}</span>
                  <span className="block text-[13px] text-slate-500 dark:text-slate-400">{p.r}</span>
                </span>
                {p.ready ? (
                  <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                    <Mail size={13} aria-hidden="true" />
                    <Phone size={13} aria-hidden="true" />
                    <Check size={13} strokeWidth={2.5} className="text-slate-900 dark:text-white" aria-label="Verified" />
                  </span>
                ) : (
                  <span className="text-[13px] text-slate-400">Reveal</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ═══ Page ════════════════════════════════════════════════════════════════════ */

export default function AccountIntelligenceClient() {
  const { openModal } = useModal();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="relative w-full">
      {/* ═══ 1. HERO — centered headline over a live signals console ══════════ */}
      <section className="relative overflow-hidden border-b border-slate-200 px-6 pb-16 pt-28 dark:border-rule lg:pb-20 lg:pt-36">
        <div className={`relative ${WRAP}`}>
          <div className="max-w-[900px] motion-safe:animate-fade-up">
            <p className="text-[15px] text-slate-500 dark:text-slate-400">Harvin Account Intelligence</p>
            <h1 className="mt-5 font-display font-medium text-[clamp(44px,6vw,80px)] leading-[1.02] text-slate-950 dark:text-white">
              Know which accounts to work,{' '}
              <span className="italic">and why now.</span>
            </h1>
            <p className="mt-6 max-w-[640px] text-[19px] leading-[1.5] text-slate-600 dark:text-slate-300">
              Harvin keeps watching the companies you care about, combines Company Fit with live signals, and puts the people and context your team needs in
              one account view.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-6">
              <button type="button" onClick={() => openModal('talk-to-sales')} className={CTA_BTN}>
                See Harvin on your accounts
                <ArrowRight size={16} aria-hidden="true" />
              </button>
              <a href="#how-it-works" className={TEXT_LINK}>
                How it works
              </a>
            </div>

            <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
              {[
                { v: '20+', l: 'signal types' },
                { v: '30+', l: 'contact-data sources' },
                { v: '650M+', l: 'B2B profiles' },
              ].map((s) => (
                <li
                  key={s.l}
                  className="inline-flex items-baseline gap-1.5 text-[14px] text-slate-500 dark:text-slate-400"
                >
                  <span className="font-display text-[20px] font-medium text-slate-950 dark:text-white">{s.v}</span>
                  {s.l}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-14 max-w-[1040px] motion-safe:animate-fade-up [animation-delay:160ms] [animation-fill-mode:both]">
            <HeroConsole />
          </div>
        </div>

        <nav aria-label="On this page" className={`relative mt-14 border-t border-slate-200 pt-6 dark:border-rule ${WRAP}`}>
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
            <h2 className={H2}>Your team already has a list of accounts. It still has to work out which ones deserve attention today.</h2>
          </Reveal>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <Reveal className={`${SURFACE} p-6 sm:p-7`}>
              <Label>A static account list</Label>
              <ul className="mt-4 divide-y divide-slate-200 dark:divide-rule">
                {['Vela Commerce', 'Brightpath Learning', 'Kitecart', 'Lumora Health'].map((c) => (
                  <li key={c} className="flex items-center justify-between gap-3 py-2.5 text-[15px]">
                    <span className="font-medium text-slate-900 dark:text-white">{c}</span>
                    <span className="text-[13px] text-slate-400 dark:text-slate-400">Last checked: weeks ago</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-[16px] font-medium text-slate-900 dark:text-white">The list doesn’t tell you:</p>
              <ul className="mt-3 space-y-2.5">
                {['Which accounts changed this week', 'Whether a company is worth the effort', 'Who to contact once something changes'].map((r) => (
                  <li key={r} className="flex items-center gap-3 text-[15px] text-slate-600 dark:text-slate-300">
                    <X size={14} strokeWidth={2.5} className="shrink-0 text-slate-400 dark:text-grey" aria-hidden="true" />
                    {r}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={120} className={`${SURFACE} p-6 sm:p-7`}>
              <Label>Researching one account</Label>
              <div className="mt-4 flex items-center gap-2 rounded-btn border border-slate-200 bg-white px-3 py-2 text-[14px] text-slate-700 dark:border-rule dark:bg-slate-950 dark:text-slate-300">
                <Search size={14} className="text-slate-400" aria-hidden="true" />
                Vela Commerce
                <span className="ml-auto text-[13px] text-slate-400">6 tabs open</span>
              </div>
              <p className="mt-6 text-[16px] font-medium text-slate-900 dark:text-white">Every tab holds a piece. None tells the story.</p>
              <ul className="mt-3 divide-y divide-slate-200 dark:divide-rule">
                {[
                  { t: 'Company website', v: 'What they do' },
                  { t: 'News search', v: 'What changed' },
                  { t: 'Funding database', v: 'Latest round' },
                  { t: 'Contact-data tool', v: 'Who to reach' },
                ].map((r) => (
                  <li key={r.t} className="flex items-center justify-between gap-3 py-2.5 text-[15px]">
                    <span className="text-slate-600 dark:text-slate-300">{r.t}</span>
                    <span className="text-[13px] text-slate-400">{r.v}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal>
            <p className="mt-12 border-t border-slate-200 pt-8 font-display text-[clamp(24px,2.4vw,32px)] font-medium leading-[1.2] text-slate-900 dark:border-rule dark:text-white">
              More account data doesn’t automatically mean <span className="italic">better timing.</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══ 3. HOW HARVIN WORKS ══════════════════════════════════════════════ */}
      <section id="how-it-works" className={SECTION}>
        <div className={WRAP}>
          <Reveal className="max-w-[760px]">
            <h2 className={H2}>Harvin knows what a good account looks like, then watches for the moment it’s ready.</h2>
            <p className={`mt-5 ${LEAD}`}>It uses the same Company Profile as Data Building, so fit, signals and people all come from one understanding of your business.</p>
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

      {/* ═══ 4. COMPANY FIT + SIGNALS ═════════════════════════════════════════ */}
      <section id="fit-and-signals" className={`${SECTION}`}>
        <div className={WRAP}>
          <Reveal className="max-w-[900px]">
            <h2 className={H2}>Fit tells you who. Signals tell you when.</h2>
            <p className={`mt-5 ${LEAD}`}>Harvin answers the two questions separately, so a loud signal never hides a poor fit and a great fit never waits for someone to notice it.</p>
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
                Based on what you sell and which companies converted.
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
                {SIGNAL_TYPES.slice(0, 2).map(({ icon: Icon, ...s }, i) => (
                  <li key={s.title} className={`${TILE} ${LIFT} flex items-start gap-4 p-4`}>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-btn border border-slate-200 text-slate-400 dark:border-rule">
                      <Icon size={17} aria-hidden="true" />
                    </span>
                    <div className="flex-1">
                      <p className="text-[13px] text-slate-500 dark:text-slate-400">{s.type}</p>
                      <p className="mt-0.5 text-[16px] font-medium text-slate-900 dark:text-white">{s.title}</p>
                      <p className="text-[14px] text-slate-500 dark:text-slate-400">Vela Commerce · {s.meta}</p>
                    </div>
                    {i === 0 && <NewPill />}
                  </li>
                ))}
              </ul>
              <p className="mt-auto border-t border-slate-200 pt-4 text-[15px] text-slate-500 dark:border-rule dark:text-slate-400 lg:mt-8">
                A high-fit company may not have a signal today. Harvin keeps watching.
              </p>
            </Reveal>
          </div>

          <Reveal delay={120} className="mt-10">
            <PriorityBoard />
          </Reveal>
        </div>
      </section>

      {/* ═══ 5. SIGNAL TYPES ══════════════════════════════════════════════════ */}
      <section id="signals" className={SECTION}>
        <div className={WRAP}>
          <Reveal className="max-w-[860px]">
            <h2 className={H2}>20+ signal types, watched on every account you choose.</h2>
            <p className={`mt-5 ${LEAD}`}>Each signal shows what happened, when it happened and which account it belongs to, so the reason to reach out is already written down.</p>
          </Reveal>

          <div className="mt-12 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
            {SIGNAL_TYPES.map(({ icon: Icon, ...s }, i) => (
              <Reveal key={s.type} delay={i * 70} className="flex items-start gap-4 border-t border-slate-200 py-6 dark:border-rule">
                <Icon size={18} className="mt-0.5 shrink-0 text-slate-400" aria-hidden="true" />
                <div>
                  <p className="text-[14px] text-slate-500 dark:text-slate-400">{s.type}</p>
                  <p className="mt-1 text-[17px] font-medium leading-snug text-slate-900 dark:text-white">{s.title}</p>
                  <p className="mt-0.5 text-[14px] text-slate-500 dark:text-slate-400">{s.meta}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-4 flex flex-col gap-4 border-t border-slate-200 pt-6 dark:border-rule sm:flex-row sm:items-center sm:justify-between sm:gap-6">
              <p className="flex items-center gap-3 text-[17px] leading-[1.5] text-slate-600 dark:text-slate-300">
                <Plus size={18} className="shrink-0 text-slate-400" aria-hidden="true" />
                <span>
                  <span className="text-slate-900 dark:text-white">Signals are included on Growth, Agency and Enterprise.</span> Monitoring uses 5 credits per
                  account per month.
                </span>
              </p>
              <a href="/pricing" className={`shrink-0 ${TEXT_LINK}`}>
                See pricing
                <ArrowRight size={14} aria-hidden="true" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ 6. ILLUSTRATIVE EXAMPLE — always-dark showcase band ══════════════ */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-slate-950 px-6 py-20 text-white dark:border-rule dark:bg-slate-950 lg:py-28">
        <div className={`relative ${WRAP}`}>
          <Reveal className="max-w-[860px]">
            <h2 className={H2}>
              A quiet account can become <span className="italic">the right account overnight.</span>
            </h2>
          </Reveal>

          <div className="mt-12 flex flex-col items-stretch gap-4 lg:flex-row">
            <Reveal className="flex flex-col rounded-modal border border-rule bg-surface p-6 lg:w-[30%]">
              <p className="text-[14px] text-slate-400">Last month</p>
              <p className={`mt-2 ${H3}`}>Vela Commerce</p>
              <dl className="mt-4 divide-y divide-rule text-[15px]">
                {[
                  { k: 'Company Fit', v: '88 · Strong fit' },
                  { k: 'Signals', v: 'None', muted: true },
                  { k: 'Priority', v: 'Keep watching' },
                ].map((r) => (
                  <div key={r.k} className="flex justify-between py-2.5">
                    <dt className="text-slate-400">{r.k}</dt>
                    <dd className={r.muted ? 'text-slate-400' : 'font-medium text-white'}>{r.v}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-auto pt-6 text-[15px] text-slate-400">Right company. No reason to call yet.</p>
            </Reveal>

            <div aria-hidden="true" className="flex shrink-0 items-center justify-center text-slate-400">
              <ArrowRight size={20} strokeWidth={2} className="hidden lg:block" />
              <ArrowDown size={20} strokeWidth={2} className="lg:hidden" />
            </div>

            <Reveal
              delay={120}
              className="flex flex-1 flex-col rounded-modal border border-rule bg-surface p-6 text-white"
            >
              <p className="text-[14px] text-slate-400">This week · signals</p>
              <ul className="mt-4 space-y-3">
                {A360_SIGNALS.map(({ icon: Icon, ...s }) => (
                  <li key={s.title} className="flex items-center gap-3 text-[17px]">
                    <Icon size={16} className="shrink-0 text-slate-400" aria-hidden="true" />
                    <span className="flex-1">{s.title}</span>
                    <span className="hidden text-[14px] text-slate-400 sm:block">{s.meta}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-auto border-t border-rule pt-4 text-[15px] text-slate-400">A new finance leader and a new market: a clear reason to reach out.</p>
            </Reveal>

            <Reveal
              delay={240}
              className="flex flex-col items-start rounded-modal border border-rule bg-surface p-6 text-white lg:w-[24%]"
            >
              <p className="text-[14px] text-slate-400">Priority</p>
              <div className="my-5">
                <ScoreRing score={88} trackClass="text-rule" barClass="text-ember-500">
                  <Zap size={30} className="text-ember-500" aria-hidden="true" />
                  <span className="mt-1 text-[12px] text-slate-400">Fit 88 + 3 signals</span>
                </ScoreRing>
              </div>
              <p className={`mt-auto ${H3}`}>Work now</p>
              <p className="mt-1 text-[15px] text-slate-300">Priya Nair, Head of Payments · email and phone verified</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ 7. ACCOUNT 360 ═══════════════════════════════════════════════════ */}
      <section id="account-360" className={`${SECTION}`}>
        <div className={`grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 ${WRAP}`}>
          <Reveal>
            <h2 className={H2}>Everything about an account, in one view.</h2>
            <p className={`mt-5 ${LEAD}`}>Instead of rebuilding the story from six tabs, your team opens one account and sees why it fits, what changed and who to reach.</p>
            <ul className="mt-8 space-y-4">
              {[
                { k: 'Why it fits', v: 'Company Fit, with the reasons behind the score' },
                { k: 'What changed', v: 'Recent signals, newest first' },
                { k: 'Who to reach', v: 'Decision-makers with verified email and phone' },
              ].map((i) => (
                <li key={i.k} className="border-l border-slate-200 pl-4 dark:border-rule">
                  <p className="text-[15px] font-medium text-slate-900 dark:text-white">{i.k}</p>
                  <p className="mt-0.5 text-[15px] text-slate-600 dark:text-slate-300">{i.v}</p>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex gap-3 border-t border-slate-200 pt-6 dark:border-rule">
              <Zap size={18} className="mt-1 shrink-0 text-slate-400" aria-hidden="true" />
              <p className="text-[18px] leading-[1.5] text-slate-900 dark:text-white">Everyone on your team sees the same account story.</p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <Account360 />
          </Reveal>
        </div>
      </section>

      {/* ═══ 8. DECISION-MAKERS + CONTACTS ════════════════════════════════════ */}
      <section id="contacts" className={SECTION}>
        <div className={WRAP}>
          <Reveal className="max-w-[860px]">
            <h2 className={H2}>When the moment comes, the right person is already there.</h2>
            <p className={`mt-5 ${LEAD}`}>
              Harvin matches people to your Target Profile in priority order, then runs separate email and phone waterfalls and stops at the first qualifying result.
            </p>
          </Reveal>

          <Reveal delay={120} className="mt-12 flex flex-col items-stretch gap-4 lg:flex-row lg:items-center">
            <div className={`${SURFACE} flex-1 p-6 sm:p-7`}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="flex items-center gap-2 text-[14px] text-slate-900 dark:text-white">
                  <Mark className="h-3.5" />
                  Harvin · Vela Commerce
                </p>
                <Chip>Target Profile</Chip>
              </div>
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
            </div>

            <FlowArrow />

            <div className={`${SURFACE} p-6 lg:w-[380px] lg:shrink-0`}>
              <Label>Contact ready</Label>
              <div className="mt-4 flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-[16px] font-medium text-slate-900 dark:border-rule dark:bg-slate-950 dark:text-white">PN</span>
                <div>
                  <p className={H3}>Priya Nair</p>
                  <p className="text-[14px] text-slate-500 dark:text-slate-400">Head of Payments · Vela Commerce</p>
                </div>
              </div>
              <div className="mt-5 space-y-2.5">
                {[
                  { icon: Mail, k: 'Verified work email', v: 'priya@velacommerce.co' },
                  { icon: Phone, k: 'Direct/mobile phone', v: '+65 9XXX X412' },
                ].map(({ icon: Icon, k, v }) => (
                  <div key={k} className="flex items-center gap-3 rounded-btn border border-slate-200 bg-white px-4 py-3 dark:border-rule dark:bg-slate-950">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-400 dark:border-rule">
                      <Icon size={13} aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[13px] text-slate-500 dark:text-slate-400">{k}</p>
                      <p className="truncate text-[15px] font-medium text-slate-900 dark:text-white">{v}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-[14px] text-slate-500 dark:text-slate-400">Charged only when found. 30+ sources across the waterfall.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ 9. WHERE HARVIN REMOVES WORK ═════════════════════════════════════ */}
      <section className={`${SECTION}`}>
        <div className={WRAP}>
          <Reveal className="max-w-[820px]">
            <h2 className={H2}>Less account research. More time on the accounts that are ready.</h2>
          </Reveal>

          <div className="mt-12 grid gap-y-8 border-t border-slate-200 dark:border-rule sm:grid-cols-3">
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

      {/* ═══ 10. FAQS ═════════════════════════════════════════════════════════ */}
      <section id="faq" className={SECTION}>
        <div className={`grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 ${WRAP}`}>
          <Reveal>
            <h2 className={H2}>We thought you might ask</h2>
          </Reveal>

          <div className="divide-y divide-slate-200 border-y border-slate-200 dark:divide-rule dark:border-rule">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={faq.q}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="group flex w-full items-center gap-4 py-5 text-left"
                  >
                    <span className="flex-1 text-[18px] font-medium text-slate-900 transition-colors group-hover:text-slate-600 dark:text-white dark:group-hover:text-slate-300">
                      {faq.q}
                    </span>
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-200 ${
                        isOpen ? 'rotate-45 border-slate-400 text-slate-900 dark:border-slate-400 dark:text-white' : 'border-slate-300 text-slate-500 dark:border-rule dark:text-slate-400'
                      }`}
                    >
                      <Plus size={14} strokeWidth={2.5} aria-hidden="true" />
                    </span>
                  </button>
                  {isOpen && <p className="pb-6 pr-11 text-[17px] leading-[1.5] text-slate-600 dark:text-slate-300">{faq.a}</p>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ 11. FINAL CTA ════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-slate-950 px-6 py-24 text-white dark:bg-slate-950 lg:py-32">
        <Reveal className={`relative ${WRAP}`}>
          <h2 className={`max-w-[760px] ${H2}`}>
            Give Harvin <span className="text-ember-400">your account list.</span>
          </h2>
          <p className="mt-5 max-w-[620px] text-[18px] leading-[1.5] text-slate-300 sm:text-[19px]">
            Share the accounts your team is working today, or your best customers. We’ll show you which ones fit, and which have a reason to act now.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <button type="button" onClick={() => openModal('talk-to-sales')} className={`${CTA_BTN} focus-visible:ring-offset-slate-950`}>
              See Harvin on your accounts
              <ArrowRight size={16} aria-hidden="true" />
            </button>
          </div>
          <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-[14px] text-slate-400">
            {['Your account list', 'Your best customers', 'Your Target Profile'].map((x) => (
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
