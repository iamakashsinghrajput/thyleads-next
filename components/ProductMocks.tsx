'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  Banknote,
  BadgeCheck,
  Briefcase,
  CalendarDays,
  Cpu,
  Eye,
  Mail,
  Plus,
  Search,
  TrendingUp,
} from 'lucide-react';

/**
 * Shared kit for the coded product look-alikes on marketing pages
 * (/account-intelligence, /product-tour): the dark ember frame, the scaled
 * canvas, small UI atoms and the account mocks used on more than one page.
 */

/* ═══════════════════════════════════════════════════════════════════════════════
   PRODUCT MOCKS
   Coded look-alikes of the product (same approach as FeatureSection): fictional
   accounts, small type, laid out on a fixed canvas and scaled to the frame's
   width. Light product UI sitting inside a dark frame with an ember skeleton.
   ═══════════════════════════════════════════════════════════════════════════════ */

export function FitCanvas({ w, h, label, children }: { w: number; h: number; label: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / w));
    ro.observe(el);
    return () => ro.disconnect();
  }, [w]);

  return (
    <div ref={ref} role="img" aria-label={`${label} preview`} className="absolute inset-0 overflow-hidden bg-sand-50">
      <div style={{ width: w, height: h, transform: `scale(${scale})` }} className="origin-top-left">
        {children}
      </div>
    </div>
  );
}

/* Dark frame: ember wash + skeleton chrome in the top/left margin, product inset. */
export function Frame({ w, h, label, aspect, children }: { w: number; h: number; label: string; aspect: string; children: ReactNode }) {
  return (
    <div className={`relative overflow-hidden rounded-modal border border-white/[0.08] bg-[#0C0B09] shadow-[0_4px_40px_rgba(0,0,0,0.35)] ${aspect}`}>
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(70%_90%_at_0%_0%,rgba(201,76,30,0.45)_0%,rgba(201,76,30,0.12)_45%,transparent_75%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(60%_80%_at_100%_100%,rgba(244,142,86,0.18)_0%,transparent_70%)]" />
        <div className="absolute inset-x-0 top-0 flex h-8 items-center gap-3 pl-3 pr-6 sm:h-10 sm:pl-4">
          <div className="flex gap-1.5">
            <span className="h-2 w-2 rounded-full bg-ember-300/60" />
            <span className="h-2 w-2 rounded-full bg-white/[0.18]" />
            <span className="h-2 w-2 rounded-full bg-white/[0.12]" />
          </div>
          <span className="ml-6 h-2 w-16 rounded-full bg-gradient-to-r from-ember-400/60 to-white/[0.08] sm:ml-10" />
          <span className="h-2 w-24 rounded-full bg-gradient-to-r from-white/[0.14] to-white/[0.04]" />
          <span className="ml-auto h-2 w-20 rounded-full bg-gradient-to-r from-white/[0.04] to-ember-300/30" />
        </div>
        <div className="absolute bottom-0 left-0 top-8 flex w-8 flex-col items-center gap-3 pt-3 sm:top-10 sm:w-10 sm:pt-4">
          <span className="h-3.5 w-3.5 rounded-[4px] bg-gradient-to-br from-ember-300 to-ember-500" />
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="h-3.5 w-3.5 rounded-[4px] bg-white/[0.08]" style={{ opacity: 1 - i * 0.12 }} />
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-8 right-0 top-8 overflow-hidden rounded-tl-card border-l border-t border-white/[0.1] sm:left-10 sm:top-10">
        <FitCanvas w={w} h={h} label={label}>
          {children}
        </FitCanvas>
      </div>
    </div>
  );
}

/* Counts up every `ms` — drives the loops. Frozen for reduced motion. */
export function useTicker(ms: number) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => setTick((n) => n + 1), ms);
    return () => clearInterval(t);
  }, [ms]);
  return tick;
}

export const CARD = 'rounded-card border border-slate-200 bg-white shadow-[0_4px_32px_rgba(0,0,0,0.06)]';

export const TONE = {
  ember: 'border-ember-200 bg-ember-50 text-ember-600',
  emerald: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  amber: 'border-amber-200 bg-amber-50 text-amber-700',
  slate: 'border-slate-200 bg-slate-100 text-slate-600',
} as const;

export function Chip({ tone = 'slate', children }: { tone?: keyof typeof TONE; children: ReactNode }) {
  return <span className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full border px-2 py-0.5 text-[9.5px] font-semibold ${TONE[tone]}`}>{children}</span>;
}

export function LivePill({ children }: { children: ReactNode }) {
  return (
    <span className="flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 motion-safe:animate-pulse" />
      {children}
    </span>
  );
}

export function Mono({ name, className }: { name: string; className: string }) {
  return <span className={`flex shrink-0 items-center justify-center rounded-md font-bold text-white ${className}`}>{name[0]}</span>;
}

export function Avatar({ initials, className = 'bg-ember-400' }: { initials: string; className?: string }) {
  return (
    <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[8px] font-bold text-white ${className}`}>{initials}</span>
  );
}

/* ─── Hero: accounts prioritised by fit + live signals ───────────────────────── */
const ACCOUNTS = [
  { name: 'Initech Systems', ind: 'B2B SaaS · 420 employees', fit: 'A', score: 92, signal: 'Raised Series B', tone: 'ember', owner: 'PS', mono: 'bg-slate-800' },
  { name: 'Northwind Analytics', ind: 'Data platform · 260 employees', fit: 'A', score: 87, signal: 'Hiring 6 SDRs', tone: 'amber', owner: 'AM', mono: 'bg-ember-500' },
  { name: 'Globex Cloud', ind: 'Infrastructure · 1,100 employees', fit: 'A', score: 81, signal: 'New VP Sales', tone: 'ember', owner: 'PS', mono: 'bg-sky-700' },
  { name: 'Umbrella Health', ind: 'Healthtech · 640 employees', fit: 'B', score: 74, signal: 'Adopted HubSpot', tone: 'emerald', owner: 'RK', mono: 'bg-emerald-700' },
  { name: 'Stark Retail', ind: 'Retail tech · 380 employees', fit: 'B', score: 66, signal: 'Visited pricing ×3', tone: 'slate', owner: 'AM', mono: 'bg-amber-600' },
  { name: 'Hooli Payments', ind: 'Fintech · 900 employees', fit: 'B', score: 59, signal: 'Expanding to EMEA', tone: 'amber', owner: 'RK', mono: 'bg-violet-700' },
] as const;

export function PriorityMock() {
  const tick = useTicker(2400);
  const hot = tick % ACCOUNTS.length;
  const today = 14 + tick;

  return (
    <div className="flex h-full flex-col p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] font-medium text-slate-400">Account Intelligence / Watchlist</p>
          <p className="mt-0.5 text-[17px] font-semibold text-slate-900">Prioritised for this week</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 rounded-btn border border-slate-200 bg-white px-2.5 py-1.5 text-[10px] text-slate-500">
            <Search size={11} /> Search accounts
          </span>
          <LivePill>{today} new signals today</LivePill>
        </div>
      </div>

      <div className="mt-3 flex gap-1.5">
        {['ICP fit: A–B', 'Intent ≥ 55', 'Region: India + US', 'Owner: My team'].map((f, i) => (
          <span key={f} className={`rounded-full border px-2.5 py-1 text-[9.5px] font-medium ${i === 0 ? 'border-ember-300 bg-ember-50 text-ember-600' : 'border-slate-200 bg-white text-slate-500'}`}>
            {f}
          </span>
        ))}
      </div>

      <div className={`mt-4 flex-1 overflow-hidden ${CARD}`}>
        <div className="grid grid-cols-[1.7fr_0.5fr_1.2fr_1.2fr_0.5fr] gap-3 border-b border-slate-100 bg-sand-50 px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.08em] text-slate-400">
          <span>Account</span>
          <span>ICP fit</span>
          <span>Intent score</span>
          <span>Why now</span>
          <span>Owner</span>
        </div>
        {ACCOUNTS.map((a, i) => {
          const isHot = i === hot;
          const score = a.score + (isHot ? 3 : 0);
          return (
            <div
              key={a.name}
              className={`grid grid-cols-[1.7fr_0.5fr_1.2fr_1.2fr_0.5fr] items-center gap-3 border-b border-slate-100 px-4 py-2.5 transition-colors duration-500 last:border-0 ${
                isHot ? 'bg-ember-50/70' : ''
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Mono name={a.name} className={`h-7 w-7 text-[11px] ${a.mono}`} />
                <span>
                  <span className="block text-[11.5px] font-semibold text-slate-900">{a.name}</span>
                  <span className="block text-[9.5px] text-slate-400">{a.ind}</span>
                </span>
              </span>
              <span>
                <span className={`inline-flex h-5 w-5 items-center justify-center rounded-md text-[10px] font-bold ${a.fit === 'A' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  {a.fit}
                </span>
              </span>
              <span className="flex items-center gap-2">
                <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                  <span className="block h-full rounded-full bg-gradient-to-r from-ember-300 to-ember-500 transition-all duration-700" style={{ width: `${score}%` }} />
                </span>
                <span className={`w-6 text-right text-[11px] font-semibold ${isHot ? 'text-ember-600' : 'text-slate-700'}`}>{score}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Chip tone={a.tone}>{a.signal}</Chip>
                {isHot && <span className="text-[9px] font-semibold text-ember-500 motion-safe:animate-pulse">● new</span>}
              </span>
              <Avatar initials={a.owner} className={a.owner === 'PS' ? 'bg-ember-400' : a.owner === 'AM' ? 'bg-slate-700' : 'bg-emerald-600'} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Account 360° ────────────────────────────────────────────────────────── */
const SIGNALS = [
  { icon: Banknote, t: 'Raised $40M Series B', s: 'Funding · 2 days ago', tone: 'ember' },
  { icon: Briefcase, t: 'Hiring 6 SDRs, 2 AEs', s: 'Hiring · 5 days ago', tone: 'amber' },
  { icon: Cpu, t: 'Switched CRM to HubSpot', s: 'Tech change · 1 week ago', tone: 'emerald' },
  { icon: CalendarDays, t: 'Speaking at SaaSBoomi', s: 'Event · 2 weeks ago', tone: 'slate' },
] as const;

const CONTACTS = [
  { i: 'PS', n: 'Priya Sharma', r: 'VP Sales', tag: 'Decision maker', c: 'bg-ember-400' },
  { i: 'RM', n: 'Rohan Mehta', r: 'Head of RevOps', tag: 'Champion', c: 'bg-slate-700' },
  { i: 'KA', n: 'Kavya Agarwal', r: 'SDR Manager', tag: 'Influencer', c: 'bg-emerald-600' },
];

const ACTIVITY = [
  { icon: Eye, t: 'Visited pricing page', s: '3× this week' },
  { icon: Mail, t: 'Opened “Scaling SDR ramp”', s: 'Priya · yesterday' },
  { icon: TrendingUp, t: 'Featured in Economic Times', s: 'News · 3 days ago' },
];

const STACK = ['HubSpot', 'Outreach', 'Gong', 'Slack', 'AWS', 'Snowflake'];

function ScoreRing({ value, label, color }: { value: number; label: string; color: string }) {
  const r = 20;
  const c = 2 * Math.PI * r;
  return (
    <div className="flex items-center gap-2">
      <svg width="50" height="50" viewBox="0 0 50 50" className="-rotate-90">
        <circle cx="25" cy="25" r={r} fill="none" stroke="#EEE8DB" strokeWidth="5" />
        <circle cx="25" cy="25" r={r} fill="none" stroke={color} strokeWidth="5" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - value / 100)} className="transition-all duration-700" />
      </svg>
      <span>
        <span className="block text-[17px] font-semibold leading-none text-slate-900">{value}</span>
        <span className="block text-[9.5px] text-slate-400">{label}</span>
      </span>
    </div>
  );
}

export function Account360Mock() {
  const tick = useTicker(2200);
  const newest = tick % SIGNALS.length;
  const intent = 84 + (tick % 3) * 2;

  return (
    <div className="flex h-full flex-col p-6">
      {/* header */}
      <div className={`flex items-center justify-between px-5 py-4 ${CARD}`}>
        <div className="flex items-center gap-3">
          <Mono name="Initech" className="h-11 w-11 bg-slate-800 text-[17px]" />
          <div>
            <div className="flex items-center gap-2">
              <p className="text-[17px] font-semibold text-slate-900">Initech Systems</p>
              <Chip tone="ember">Tier 1</Chip>
              <Chip tone="emerald">In sequence</Chip>
            </div>
            <p className="mt-0.5 text-[10.5px] text-slate-400">initech.io · B2B SaaS · Bengaluru · Owner: Priya S.</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <ScoreRing value={92} label="ICP fit" color="#232220" />
          <ScoreRing value={intent} label="Intent score" color="#C94C1E" />
          <span className="flex items-center gap-1.5 rounded-btn bg-ember-500 px-3 py-2 text-[10.5px] font-semibold text-white">
            <Plus size={12} strokeWidth={3} /> Add to sequence
          </span>
        </div>
      </div>

      <div className="mt-4 grid flex-1 grid-cols-[1.15fr_1fr_0.95fr] gap-4">
        {/* signals */}
        <div className={`p-4 ${CARD}`}>
          <div className="flex items-center justify-between">
            <p className="text-[11.5px] font-semibold text-slate-900">Buying signals</p>
            <span className="text-[9.5px] text-slate-400">Last 30 days</span>
          </div>
          <div className="relative mt-3 space-y-3 before:absolute before:bottom-3 before:left-[13px] before:top-3 before:w-px before:bg-slate-200">
            {SIGNALS.map(({ icon: Icon, t, s, tone }, i) => (
              <div key={t} className={`relative flex items-start gap-3 rounded-btn p-1 transition-colors duration-500 ${i === newest ? 'bg-ember-50' : ''}`}>
                <span className={`relative z-10 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full border ${TONE[tone]}`}>
                  <Icon size={11} />
                </span>
                <span className="min-w-0">
                  <span className="block text-[11px] font-semibold text-slate-900">{t}</span>
                  <span className="block text-[9.5px] text-slate-400">{s}</span>
                </span>
                {i === newest && <span className="ml-auto text-[9px] font-semibold text-ember-500 motion-safe:animate-pulse">new</span>}
              </div>
            ))}
          </div>
        </div>

        {/* contacts + activity */}
        <div className="flex flex-col gap-4">
          <div className={`p-4 ${CARD}`}>
            <p className="text-[11.5px] font-semibold text-slate-900">Key contacts</p>
            <div className="mt-2.5 space-y-2">
              {CONTACTS.map((c) => (
                <div key={c.n} className="flex items-center gap-2">
                  <Avatar initials={c.i} className={c.c} />
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-1 text-[10.5px] font-semibold text-slate-900">
                      {c.n} <BadgeCheck size={11} className="text-emerald-500" />
                    </span>
                    <span className="block text-[9px] text-slate-400">{c.r}</span>
                  </span>
                  <Chip tone={c.tag === 'Decision maker' ? 'ember' : 'slate'}>{c.tag}</Chip>
                </div>
              ))}
            </div>
          </div>
          <div className={`flex-1 p-4 ${CARD}`}>
            <p className="text-[11.5px] font-semibold text-slate-900">Recent activity</p>
            <div className="mt-2.5 space-y-2">
              {ACTIVITY.map(({ icon: Icon, t, s }) => (
                <div key={t} className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-md bg-sand-100 text-slate-500">
                    <Icon size={11} />
                  </span>
                  <span className="text-[10.5px] font-medium text-slate-800">{t}</span>
                  <span className="ml-auto text-[9px] text-slate-400">{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* context */}
        <div className="rounded-card bg-[#232220] p-4 text-white shadow-[0_4px_32px_rgba(0,0,0,0.12)]">
          <p className="text-[11.5px] font-semibold">Account context</p>
          <div className="mt-3 space-y-2.5 text-[10.5px]">
            {[
              ['Owner', 'Priya S. (SDR)'],
              ['Revenue', '$40–60M'],
              ['Campaign', 'Series B outreach'],
              ['Last touch', 'Email · 1 day ago'],
              ['Stage', 'Engaged'],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between border-b border-white/[0.08] pb-2">
                <span className="text-white/50">{k}</span>
                <span className="font-medium">{v}</span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[9.5px] font-semibold uppercase tracking-[0.1em] text-ember-300">Tech stack</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {STACK.map((t) => (
              <span key={t} className="rounded-md bg-white/[0.08] px-2 py-1 text-[9.5px] font-medium text-white/80">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
