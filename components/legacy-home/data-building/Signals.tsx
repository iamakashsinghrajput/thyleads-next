'use client';

import { useEffect, useRef, useState } from 'react';
import { Briefcase, Check, Globe, Users } from 'lucide-react';
import { Accent, Eyebrow, Heading, Section } from '../ui';
import { CompanyLogo, Count } from './shared';

/**
 * Signals, then where Harvin removes work.
 *
 * Signals: Company Fit answers "should we sell to them?", signals answer "is
 * there a reason to act now?". The fit ring fills, then the signal feed
 * arrives newest-first.
 *
 * Outcomes: four figures count up, and the before/after table strikes each
 * manual task as its replacement lands.
 */

/* ---------- Signals: Fit × Signal map ----------
 * Accounts sit on a map: x = Company Fit, y = signal strength. They first
 * land along the bottom by fit alone (no signal yet). Example signals then
 * arrive in a live feed and lift their account up the map. High-fit accounts
 * that get a signal enter "Act now"; a strong signal on a poor-fit company
 * lifts it too, but it stays out of the target zone. Real logos; the signals
 * are examples, not real events.
 */

type Acct = { name: string; fit: number; lift?: number; at?: number; type?: string; title?: string; icon?: typeof Users };

const ACCTS: Acct[] = [
  { name: 'Etsy', fit: 92, lift: 82, at: 1900, type: 'Leadership change', title: 'A new finance leader joins', icon: Users },
  { name: 'eBay', fit: 85 },
  { name: 'HubSpot', fit: 76, lift: 72, at: 4300, type: 'Hiring', title: 'Hiring across finance roles', icon: Briefcase },
  { name: 'Twilio', fit: 68 },
  { name: 'Mailchimp', fit: 64, lift: 64, at: 5500, type: 'Expansion', title: 'Enters a new market', icon: Globe },
  { name: 'Starbucks', fit: 30 },
  { name: 'Ford', fit: 18, lift: 80, at: 3100, type: 'Leadership change', title: 'A new finance leader joins', icon: Users },
];
const FEED = ACCTS.filter((a) => a.at !== undefined).sort((x, y) => (x.at as number) - (y.at as number));

const S_DUR = 10500;
const BASE_Y = 12; // signal strength with no signal
const FIT_LINE = 55; // fit threshold
const SIG_LINE = 50; // "a reason to act now"
const SUMMARY_AT = 6800;

const sClamp = (v: number) => Math.min(1, Math.max(0, v));
const sEase = (v: number) => 1 - Math.pow(1 - sClamp(v), 3);

function SignalMap({ t }: { t: number }) {
  const quad = sEase((t - 700) / 500);
  const actNow = ACCTS.filter((a) => a.at !== undefined && a.fit >= FIT_LINE && (a.lift as number) >= SIG_LINE && t >= (a.at as number) + 700).length;

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.10)] dark:border-white/[0.08] dark:bg-[#0E0D0B] dark:shadow-[0_24px_60px_rgba(0,0,0,0.55)]">
      <div className="flex items-center gap-3 border-b border-slate-200 px-4 py-3 dark:border-white/[0.06]">
        <span className="text-[13.5px] font-semibold text-slate-900 dark:text-white">Your market · Fit × Signals</span>
        <span className="ml-auto inline-flex items-center gap-1.5 text-[11.5px] font-semibold text-emerald-700 dark:text-emerald-300">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          Monitoring 20+ signal types
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-[1.35fr_1fr]">
        {/* Map */}
        <div className="border-b border-slate-200 p-4 dark:border-white/[0.06] sm:border-b-0 sm:border-r">
          <div className="relative ml-4 mb-5 h-[250px]">
            {/* quadrants */}
            <div className="absolute inset-0 overflow-hidden rounded-lg border border-slate-200 dark:border-white/[0.08]" style={{ opacity: 0.4 + 0.6 * quad }}>
              <div
                className="absolute right-0 top-0 bg-emerald-500/[0.08] dark:bg-emerald-500/[0.1]"
                style={{ left: `${FIT_LINE}%`, bottom: `${SIG_LINE}%` }}
              />
              <div className="absolute inset-y-0 border-l border-dashed border-slate-300 dark:border-white/[0.15]" style={{ left: `${FIT_LINE}%` }} />
              <div className="absolute inset-x-0 border-t border-dashed border-slate-300 dark:border-white/[0.15]" style={{ bottom: `${SIG_LINE}%` }} />
              <span className="absolute right-2 top-1.5 text-[10.5px] font-semibold uppercase tracking-[0.1em] text-emerald-700 dark:text-emerald-300">Act now</span>
              <span className="absolute left-2 top-1.5 text-[10px] font-medium uppercase tracking-[0.1em] text-slate-400 dark:text-slate-500">Signal, poor fit</span>
              <span className="absolute right-2 text-[10px] font-medium uppercase tracking-[0.1em] text-slate-400 dark:text-slate-500" style={{ top: `calc(${100 - SIG_LINE}% + 6px)` }}>High fit · watching</span>
            </div>
            {/* axes */}
            <span className="absolute -bottom-5 left-0 right-0 text-center text-[10.5px] text-slate-400 dark:text-slate-500">Company Fit →</span>
            <span className="absolute -left-5 top-1/2 origin-center -translate-x-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap text-[10.5px] text-slate-400 dark:text-slate-500">Signal →</span>

            {ACCTS.map((a, i) => {
              const drop = sEase((t - 200 - i * 120) / 450);
              const rise = a.at !== undefined ? sEase((t - a.at) / 900) : 0;
              const y = BASE_Y + ((a.lift ?? BASE_Y) - BASE_Y) * rise;
              const inAct = a.at !== undefined && a.fit >= FIT_LINE && (a.lift as number) >= SIG_LINE && rise > 0.95;
              const poor = a.at !== undefined && a.fit < FIT_LINE && rise > 0.95;
              const ping = a.at !== undefined ? t - a.at : -1;
              return (
                <div
                  key={a.name}
                  className="absolute -translate-x-1/2 translate-y-1/2"
                  style={{ left: `${a.fit}%`, bottom: `${y}%`, opacity: drop, zIndex: inAct ? 3 : 2 }}
                >
                  {ping >= 0 && ping < 900 && (
                    <span
                      aria-hidden="true"
                      className="absolute left-1/2 top-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-emerald-500"
                      style={{ transform: `translate(-50%, -50%) scale(${0.6 + (ping / 900) * 1.2})`, opacity: 1 - ping / 900 }}
                    />
                  )}
                  <span className={`block rounded-lg ${inAct ? 'ring-2 ring-emerald-500 ring-offset-2 ring-offset-white dark:ring-offset-[#0E0D0B]' : ''}`}>
                    <CompanyLogo name={a.name} className="h-7 w-7 rounded-lg" />
                  </span>
                  {poor && (
                    <span className="absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap rounded bg-slate-100 px-1 text-[9.5px] font-medium text-slate-500 dark:bg-white/[0.06] dark:text-slate-400">
                      Poor fit
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Feed */}
        <div className="p-4">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400 dark:text-slate-500">Signal feed</p>
          <ul className="mt-2 space-y-2">
            {[...FEED].reverse().map((a) => {
              const e = sEase((t - (a.at as number)) / 400);
              if (e <= 0) return null;
              const Icon = a.icon as typeof Users;
              const target = a.fit >= FIT_LINE;
              return (
                <li
                  key={a.name}
                  className={`flex items-start gap-2.5 rounded-lg border p-2.5 ${target ? 'border-emerald-500/35 bg-emerald-500/[0.05]' : 'border-slate-200 dark:border-white/[0.08]'}`}
                  style={{ opacity: e, transform: `translateY(${(1 - e) * -10}px)` }}
                >
                  <span className={`grid h-7 w-7 flex-shrink-0 place-items-center rounded-md ${target ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400' : 'bg-slate-100 text-slate-500 dark:bg-white/[0.06] dark:text-slate-400'}`}>
                    <Icon size={13} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                      <CompanyLogo name={a.name} className="h-3.5 w-3.5 rounded-sm p-0" /> {a.name} · {a.type}
                    </span>
                    <span className="mt-0.5 block truncate text-[12.5px] font-semibold text-slate-900 dark:text-white">{a.title}</span>
                    <span className={`mt-0.5 block text-[10.5px] font-semibold ${target ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`}>
                      {target ? 'High fit · act now' : 'Poor fit · not a target'}
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>
          {t < FEED[0].at! && <p className="mt-3 text-[12px] text-slate-400 dark:text-slate-500">Watching your market…</p>}
        </div>
      </div>

      <div className="flex items-center gap-2 border-t border-slate-200 px-4 py-2.5 text-[12px] text-slate-600 dark:border-white/[0.06] dark:text-slate-300" style={{ opacity: 0.35 + 0.65 * sEase((t - SUMMARY_AT) / 400) }}>
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        <span><span className="font-semibold text-slate-900 dark:text-white">{actNow} {actNow === 1 ? 'account' : 'accounts'} to act on now</span> · high fit and a fresh signal</span>
      </div>
    </div>
  );
}

function SignalsVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState(0);
  const [inView, setInView] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || reduced) return;
    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min(64, now - last);
      last = now;
      setT((v) => (v + dt >= S_DUR ? 0 : v + dt));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced]);

  const clock = reduced ? SUMMARY_AT + 500 : t;
  const seam = reduced ? 1 : sEase(clock / 350) * (1 - sEase((clock - (S_DUR - 350)) / 350));
  const signalsPhase = clock >= FEED[0].at!;

  const rows = [
    { k: 'Company Fit', q: 'Should we sell to them?', note: 'A high-fit company may not have a signal today.', on: !signalsPhase },
    { k: 'Signals', q: 'Is there a reason to act now?', note: 'A strong signal doesn’t make a poor-fit company a good target.', on: signalsPhase },
  ];

  return (
    <div ref={ref} className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
      <div>
        <div id="signals" className="scroll-mt-28">
          <Eyebrow>Signals</Eyebrow>
          <Heading>
            Find the right companies. <Accent>Keep watching for the right moment.</Accent>
          </Heading>
        </div>

        <ol className="mt-8 border-t border-slate-200 dark:border-white/[0.08]">
          {rows.map((r, i) => (
            <li key={r.k} className="flex items-start gap-4 border-b border-slate-200 py-4 dark:border-white/[0.08]">
              <span className={`pt-[3px] font-mono text-[12.5px] tabular-nums ${r.on ? 'text-ember-500 dark:text-ember-400' : 'text-slate-400 dark:text-white/30'}`}>0{i + 1}</span>
              <span className="min-w-0 flex-1">
                <span className="block text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">{r.k}</span>
                <span className={`mt-0.5 block text-[17px] font-semibold transition-colors duration-300 ${r.on ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-white/45'}`}>{r.q}</span>
                <span className="mt-1 block text-[13.5px] text-slate-500 dark:text-slate-400">{r.note}</span>
              </span>
            </li>
          ))}
        </ol>
        <p className="mt-6 flex items-baseline gap-2 text-slate-900 dark:text-white">
          <span className="text-[34px] font-semibold leading-none tracking-[-0.03em]">20+</span>
          <span className="text-[13.5px] text-slate-500 dark:text-slate-400">signal types monitored</span>
        </p>
      </div>

      <div>
        <div style={{ opacity: seam }} role="img" aria-label="Accounts mapped by Company Fit and signal strength; high-fit accounts with a fresh signal move into Act now, while a strong signal on a poor-fit company stays out of the target zone.">
          <SignalMap t={clock} />
        </div>
        <p className="mt-3 text-[11px] text-slate-400 dark:text-slate-500">Illustrative example. Logos belong to their owners; signals are examples, not real events.</p>
      </div>
    </div>
  );
}

const STATS = [
  { to: 80, suffix: '%', l: 'less time building and researching lists' },
  { to: 3, suffix: '×', l: 'faster from targeting brief to sales-ready data' },
  { to: 40, suffix: '%', l: 'fewer irrelevant decision-maker matches' },
  { to: 30, suffix: '%', l: 'of approved companies discovered outside the original filter set' },
];

const REMOVED = [
  { area: 'Discovery', before: 'Manual filter experimentation', after: 'Search themes Harvin generates' },
  { area: 'Research', before: 'Opening websites and data tools', after: 'Structured company research' },
  { area: 'People', before: 'Checking job titles by hand', after: 'Matching to your Target Profile' },
  { area: 'Contact data', before: 'Switching between providers', after: 'One email and phone waterfall' },
  { area: 'Monitoring', before: 'Revisiting accounts manually', after: 'Signal monitoring' },
];

/* ---------- Where Harvin removes work ----------
 * A time dial: the ring is the time a list takes by hand, one segment per
 * workflow. As Harvin takes each workflow over, its segment collapses to a
 * sliver (ink), the row beside it strikes the manual task and ticks in
 * Harvin's replacement, and the centre counts down to "80% less time".
 * Monochrome: greys for manual work, ink for Harvin, a thin ember marker on
 * the row being converted.
 */

const WEIGHTS = [24, 20, 18, 16, 22]; // share of manual time per workflow (sums to 100)
const KEEP = 0.2; // Harvin leaves 20% of the time → "80% less"
const O_DUR = 10400;
const O_FROM = 1300;
const O_STEP = 950;
const O_MS = 720;
const O_DONE = O_FROM + (REMOVED.length - 1) * O_STEP + O_MS;

const R = 78;
const C = 2 * Math.PI * R;
const GAP = 5;

function TimeDial({ conv }: { conv: number[] }) {
  const usable = C - GAP * WEIGHTS.length;
  let offset = 0;
  const segs = WEIGHTS.map((w, k) => {
    const share = (w * (1 - (1 - KEEP) * conv[k])) / 100;
    const len = usable * share;
    const seg = { k, len, start: offset, c: conv[k] };
    offset += len + GAP;
    return seg;
  });
  const total = WEIGHTS.reduce((acc, w, k) => acc + w * (1 - (1 - KEEP) * conv[k]), 0);
  const done = conv.every((c) => c >= 1);
  return (
    <div className="relative mx-auto h-[200px] w-[200px] flex-shrink-0">
      <svg viewBox="0 0 200 200" className="absolute inset-0 -rotate-90" aria-hidden="true">
        <circle cx="100" cy="100" r={R} fill="none" strokeWidth="16" className="stroke-slate-100 dark:stroke-white/[0.04]" />
        {segs.map((sg) => (
          <circle
            key={sg.k}
            cx="100"
            cy="100"
            r={R}
            fill="none"
            strokeWidth="16"
            strokeDasharray={`${sg.len} ${C - sg.len}`}
            strokeDashoffset={-sg.start}
            className={sg.c > 0.5 ? 'stroke-slate-900 dark:stroke-white' : 'stroke-slate-300 dark:stroke-white/25'}
          />
        ))}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        {done ? (
          <>
            <span className="text-[40px] font-semibold leading-none tracking-[-0.04em] text-slate-900 dark:text-white">80%</span>
            <span className="mt-1.5 text-[12px] font-medium text-slate-500 dark:text-slate-400">less time</span>
          </>
        ) : (
          <>
            <span className="text-[40px] font-semibold leading-none tracking-[-0.04em] tabular-nums text-slate-900 dark:text-white">{Math.round(total)}%</span>
            <span className="mt-1.5 text-[12px] font-medium text-slate-500 dark:text-slate-400">time on the list</span>
          </>
        )}
      </div>
    </div>
  );
}

function WorkBars({ t }: { t: number }) {
  const conv = REMOVED.map((_, k) => sEase((t - O_FROM - k * O_STEP) / O_MS));
  const active = conv.findIndex((c) => c < 1);

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.10)] dark:border-white/[0.08] dark:bg-[#0E0D0B] dark:shadow-[0_24px_60px_rgba(0,0,0,0.55)]">
      <div className="flex items-center gap-3 border-b border-slate-200 px-5 py-3 dark:border-white/[0.06]">
        <span className="text-[13.5px] font-semibold text-slate-900 dark:text-white">Time to a sales-ready list</span>
        <span className="ml-auto flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-slate-300 dark:bg-white/25" /> Manual</span>
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-slate-900 dark:bg-white" /> With Harvin</span>
        </span>
      </div>

      <div className="grid grid-cols-1 items-center gap-6 p-5 sm:grid-cols-[200px_1fr]">
        <TimeDial conv={conv} />

        <ul className="divide-y divide-slate-100 dark:divide-white/[0.05]">
          {REMOVED.map((r, k) => {
            const c = conv[k];
            const isActive = k === active && t >= O_FROM + k * O_STEP - 250;
            const enter = sEase((t - 150 - k * 110) / 400);
            return (
              <li key={r.area} className="relative py-2.5 pl-3" style={{ opacity: enter }}>
                <span
                  aria-hidden="true"
                  className="absolute inset-y-2 left-0 w-[2px] rounded-full bg-ember-500 transition-opacity duration-300"
                  style={{ opacity: isActive ? 1 : 0 }}
                />
                <span className="flex items-center justify-between gap-3">
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500">{r.area}</span>
                  <span
                    className="grid h-4 w-4 flex-shrink-0 place-items-center rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                    style={{ opacity: sEase((c - 0.6) / 0.4), transform: `scale(${0.6 + 0.4 * sEase((c - 0.6) / 0.4)})` }}
                  >
                    <Check size={10} strokeWidth={3.4} />
                  </span>
                </span>
                <span className="relative mt-1 block h-[20px]">
                  <span
                    className={`absolute inset-0 truncate text-[13.5px] text-slate-500 dark:text-slate-400 ${c > 0.05 ? 'line-through decoration-slate-400' : ''}`}
                    style={{ opacity: 1 - sEase((c - 0.3) / 0.5), transform: `translateY(${-6 * sEase((c - 0.3) / 0.5)}px)` }}
                  >
                    {r.before}
                  </span>
                  <span
                    className="absolute inset-0 truncate text-[13.5px] font-semibold text-slate-900 dark:text-white"
                    style={{ opacity: sEase((c - 0.45) / 0.55), transform: `translateY(${6 * (1 - sEase((c - 0.45) / 0.55))}px)` }}
                  >
                    {r.after}
                  </span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

function Outcomes() {
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState(0);
  const [inView, setInView] = useState(false);
  const [seen, setSeen] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(([e]) => {
      setInView(e.isIntersecting);
      if (e.isIntersecting) setSeen(true);
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || reduced) return;
    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min(64, now - last);
      last = now;
      setT((v) => (v + dt >= O_DUR ? 0 : v + dt));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced]);

  const clock = reduced ? O_DONE + 400 : t;
  const seam = reduced ? 1 : sEase(clock / 350) * (1 - sEase((clock - (O_DUR - 350)) / 350));

  return (
    <div id="removes-work" ref={ref} className="grid scroll-mt-28 grid-cols-1 items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
      <div>
        <Eyebrow>Where Harvin removes work</Eyebrow>
        <Heading>
          Less manual work. <Accent>Faster to a sales-ready market.</Accent>
        </Heading>

        <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-slate-200 pt-6 dark:border-white/[0.08]">
          {STATS.map((s) => (
            <div key={s.l}>
              <p className="text-[clamp(32px,3.2vw,44px)] font-semibold leading-none tracking-[-0.04em] text-slate-900 dark:text-white">
                <Count to={s.to} run={seen} />
                <span className="text-slate-400 dark:text-slate-500">{s.suffix}</span>
              </p>
              <p className="mt-2 text-[13px] leading-[1.45] text-slate-600 dark:text-slate-400">{s.l}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div style={{ opacity: seam }} role="img" aria-label="A time dial of five manual workflows — discovery, research, people, contact data and monitoring. As Harvin takes each over, its share collapses and total list-building time drops by 80%.">
          <WorkBars t={clock} />
        </div>
        <p className="mt-3 text-[11px] text-slate-400 dark:text-slate-500">Segment sizes are illustrative; the 80% figure is from the stats on the left.</p>
      </div>
    </div>
  );
}

export default function Signals() {
  return (
    <>
      <Section>
        <SignalsVisual />
      </Section>

      <Section>
        <Outcomes />
      </Section>
    </>
  );
}
