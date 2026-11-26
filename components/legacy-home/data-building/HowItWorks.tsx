'use client';

import { useEffect, useRef, useState } from 'react';
import {
  Building2, Check, Crosshair, FileSpreadsheet, Gauge, Globe2, Mail, MousePointer2, Phone, Radar, Send,
  Telescope, UserRound, Zap,
} from 'lucide-react';
import { Accent, Eyebrow, Heading, Lead, Section } from '../ui';
import { CompanyLogo, stageVars } from './shared';

/**
 * How Harvin works, told as a product film: one stage, four scenes that play
 * in order. Every scene is a pure function of its local clock `t` (ms), and
 * the clock runs on requestAnimationFrame, so counts, bars, sweeps, re-sorts
 * and drags are interpolated every frame rather than stepped. Scenes ease in
 * and blur out on the same clock.
 *
 * The chapter list on the right tracks the film: the active row opens, its
 * checklist ticks as the scene plays and a rule along its edge fills. Plays only while in view, and under reduced motion holds each scene's finished frame.
 *
 * Real company logos; roles only, contacts masked, scores illustrative.
 */

const STEPS = [
  { n: '01', verb: 'Understand', title: 'Your business', icon: Building2, items: ['What you sell', 'Who buys', 'Who converted', 'Who didn’t'], dur: 5400 },
  { n: '02', verb: 'Build', title: 'Your market', icon: Telescope, items: ['Search themes', '650M+ B2B profiles', 'Company discovery', 'Company research'], dur: 5800 },
  { n: '03', verb: 'Match', title: 'Fit and decision-makers', icon: Crosshair, items: ['Company Fit', 'Target roles', 'Seniority', 'Function'], dur: 6400 },
  { n: '04', verb: 'Act', title: 'Contacts and timing', icon: Send, items: ['Verified email', 'Direct/mobile phone', 'Signals'], dur: 6600 },
];

const ENTER_MS = 650;
const EXIT_MS = 500;

const styles = stageVars('hiw-stage') + `
  @keyframes hiwShimmer { from { background-position: 200% 0; } to { background-position: -200% 0; } }
  @keyframes hiwPop { from { opacity: 0; transform: scale(.7); } to { opacity: 1; transform: none; } }
  .hiw-pop { animation: hiwPop .4s cubic-bezier(.3,1.4,.5,1) both; }
  .hiw-shimmer {
    color: transparent;
    background: linear-gradient(90deg, rgb(var(--ink)/.18) 0%, rgb(var(--ink)/.6) 50%, rgb(var(--ink)/.18) 100%);
    background-size: 200% 100%;
    -webkit-background-clip: text; background-clip: text;
    animation: hiwShimmer 1.6s linear infinite;
  }
  @media (prefers-reduced-motion: reduce) {
    .hiw-pop, .hiw-shimmer { animation: none; }
  }
`;

/* ---------- helpers ---------- */

const clamp = (v: number) => Math.min(1, Math.max(0, v));
const ease = (v: number) => 1 - Math.pow(1 - clamp(v), 3);
const easeInOut = (v: number) => {
  const x = clamp(v);
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
};
const lerp = (a: number, b: number, p: number) => a + (b - a) * p;

function CoTile({ name, size = 22 }: { name: string; size?: number }) {
  return <CompanyLogo name={name} className="rounded-md" style={{ width: size, height: size }} />;
}

function Shimmer({ children }: { children: React.ReactNode }) {
  return <span className="hiw-shimmer text-[13px] font-medium">{children}</span>;
}

/** Shared card chrome for every scene. */
function Panel({ children, className = '', style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-[rgb(var(--ink)/0.09)] bg-[var(--panel)] shadow-[0_30px_70px_rgb(0_0_0/var(--sh))] ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}

/* ---------- Scene 1 · Understand ----------
 * Harvin reads three sources — your website, the customers who converted and
 * the deals you lost. Each is parsed (progress + count), packets travel along
 * the links into the Company Profile, facts settle in, and finally the
 * pattern it learned: what a converting customer looks like vs one that
 * doesn't. */

const SRC = [
  { name: 'yourcompany.com', kind: 'Website', icon: Globe2, total: 12, unit: 'pages', start: 150 },
  { name: 'customers.csv', kind: 'Converted', icon: FileSpreadsheet, total: 42, unit: 'rows', start: 400 },
  { name: 'lost-deals.csv', kind: 'Didn’t convert', icon: FileSpreadsheet, total: 17, unit: 'rows', start: 650 },
];
const SRC_H = 58;
const SRC_GAP = 12;
const COL_H = 3 * SRC_H + 2 * SRC_GAP;
const LINK_W = 64;
const PARSE_MS = 1500;

const FACTS = [
  { k: 'What you sell', v: 'Cross-border payments', at: 1450 },
  { k: 'Who buys', v: 'Finance teams', at: 1850 },
  { k: 'Markets', v: 'India · Southeast Asia · UAE', at: 2250 },
];
const WIN = [
  { v: 'Marketplaces', at: 3050 },
  { v: 'Sellers in 10+ countries', at: 3200 },
  { v: 'Pays sellers abroad', at: 3350 },
];
const LOSS = [
  { v: 'Single-country retail', at: 3600 },
  { v: 'No overseas payouts', at: 3750 },
];
const SAVED_AT = 4250;

function bez(p0: number, p1: number, p2: number, p3: number, f: number) {
  const u = 1 - f;
  return u * u * u * p0 + 3 * u * u * f * p1 + 3 * u * f * f * p2 + f * f * f * p3;
}

function Appear({ at, t, children, className = '' }: { at: number; t: number; children: React.ReactNode; className?: string }) {
  const e = ease((t - at) / 380);
  return (
    <span className={className} style={{ opacity: e, transform: `translateY(${(1 - e) * 6}px) scale(${0.96 + 0.04 * e})`, display: 'inline-flex' }}>
      {children}
    </span>
  );
}

function SceneUnderstand({ t }: { t: number }) {
  const pattern = ease((t - 2750) / 450);
  const saved = t >= SAVED_AT;

  return (
    <div className="grid w-full max-w-[640px] grid-cols-1 items-center gap-4 sm:grid-cols-[180px_64px_1fr] sm:gap-0">
      {/* Sources */}
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-1 sm:gap-3">
        {SRC.map((src, k) => {
          const enter = ease((t - k * 120) / 450);
          const pr = ease((t - src.start) / PARSE_MS);
          const done = pr >= 0.999;
          const Icon = src.icon;
          return (
            <div
              key={src.name}
              className="min-w-0 rounded-xl border border-[rgb(var(--ink)/0.09)] bg-[var(--panel)] px-3 py-2.5 shadow-[0_14px_34px_rgb(0_0_0/var(--sh))] sm:h-[58px]"
              style={{ opacity: enter, transform: `translateX(${(1 - enter) * -14}px)` }}
            >
              <div className="flex items-center gap-2">
                <Icon size={13} className={done ? 'text-emerald-600 dark:text-emerald-400' : 'text-[rgb(var(--ink)/0.45)]'} />
                <span className="min-w-0 truncate text-[12px] font-semibold text-[rgb(var(--ink))]">{src.name}</span>
              </div>
              <div className="mt-1.5 flex items-center gap-2">
                <span className="h-[3px] flex-1 overflow-hidden rounded-full bg-[rgb(var(--ink)/0.07)]">
                  <span className={`block h-full rounded-full ${done ? 'bg-emerald-400' : 'bg-[rgb(var(--ink)/0.6)]'}`} style={{ width: `${pr * 100}%` }} />
                </span>
                <span className="hidden flex-shrink-0 text-[10.5px] tabular-nums text-[rgb(var(--ink)/0.45)] sm:inline">
                  {Math.round(src.total * pr)} {src.unit}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Links with travelling packets */}
      <svg viewBox={`0 0 ${LINK_W} ${COL_H}`} className="hidden h-[198px] w-[64px] sm:block" aria-hidden="true" fill="none">
        {SRC.map((src, k) => {
          const y0 = k * (SRC_H + SRC_GAP) + SRC_H / 2;
          const y1 = COL_H / 2 + (k - 1) * 14;
          const draw = ease((t - src.start) / 500);
          const packets = [0, 1, 2, 3].map((n) => (t - (src.start + 350 + n * 330)) / 620).filter((f) => f > 0 && f < 1);
          return (
            <g key={src.name}>
              <path
                d={`M0 ${y0} C ${LINK_W / 2} ${y0}, ${LINK_W / 2} ${y1}, ${LINK_W} ${y1}`}
                style={{ stroke: 'rgb(var(--ink)/0.22)' }}
                strokeWidth="1"
                pathLength={1}
                strokeDasharray="1"
                strokeDashoffset={1 - draw}
              />
              {packets.map((f, i) => (
                <circle
                  key={i}
                  cx={bez(0, LINK_W / 2, LINK_W / 2, LINK_W, f)}
                  cy={bez(y0, y0, y1, y1, f)}
                  r="2.2"
                  style={{ fill: 'rgb(var(--ink))' }}
                  opacity={Math.sin(Math.PI * f)}
                />
              ))}
            </g>
          );
        })}
      </svg>

      {/* Company Profile */}
      <div
        className="overflow-hidden rounded-xl border border-[rgb(var(--ink)/0.1)] bg-[var(--panel2)] shadow-[0_30px_70px_rgb(0_0_0/var(--sh))]"
        style={{ opacity: ease((t - 250) / 500), transform: `translateY(${(1 - ease((t - 250) / 500)) * 10}px)` }}
      >
        <div className="flex items-center gap-2.5 border-b border-[rgb(var(--ink)/0.07)] px-4 py-3">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-[rgb(var(--ink)/0.07)] text-[rgb(var(--ink)/0.8)]">
            <Building2 size={14} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[13px] font-semibold text-[rgb(var(--ink))]">Company Profile</span>
            <span className="block text-[11px] text-[rgb(var(--ink)/0.45)]">Your company</span>
          </span>
          {saved ? (
            <span className="hiw-pop inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-300">
              <Check size={11} strokeWidth={3} /> Saved
            </span>
          ) : (
            <Shimmer>Learning…</Shimmer>
          )}
        </div>

        <dl className="space-y-2 px-4 py-3">
          {FACTS.map((f) => (
            <div key={f.k} className="grid grid-cols-[92px_1fr] items-center gap-3 text-[12.5px]">
              <dt className="text-[rgb(var(--ink)/0.45)]">{f.k}</dt>
              <dd className="relative h-[18px]">
                <span
                  className="absolute inset-y-[4px] left-0 w-28 rounded bg-[rgb(var(--ink)/0.06)]"
                  style={{ opacity: 1 - ease((t - f.at) / 300) }}
                />
                <Appear at={f.at} t={t} className="absolute inset-0 items-center font-medium text-[rgb(var(--ink))]">
                  <span className="truncate">{f.v}</span>
                </Appear>
              </dd>
            </div>
          ))}
        </dl>

        <div className="border-t border-[rgb(var(--ink)/0.07)] px-4 py-3" style={{ opacity: 0.25 + 0.75 * pattern }}>
          <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[rgb(var(--ink)/0.4)]">What a good customer looks like</p>
          <div className="mt-2.5 grid grid-cols-2 gap-3">
            {[
              { label: 'Converted', dot: 'bg-emerald-400', items: WIN, tag: 'border-emerald-400/25 bg-emerald-500/10 text-emerald-700 dark:text-emerald-200' },
              { label: 'Didn’t convert', dot: 'bg-[rgb(var(--ink)/0.3)]', items: LOSS, tag: 'border-[rgb(var(--ink)/0.08)] bg-[rgb(var(--ink)/0.03)] text-[rgb(var(--ink)/0.5)] line-through decoration-[rgb(var(--ink)/0.25)]' },
            ].map((col) => (
              <div key={col.label} className="min-w-0">
                <p className="mb-1.5 flex items-center gap-1.5 text-[11.5px] text-[rgb(var(--ink)/0.6)]">
                  <span className={`h-1.5 w-1.5 rounded-full ${col.dot}`} /> {col.label}
                </p>
                <div className="flex flex-wrap gap-1">
                  {col.items.map((it) => (
                    <Appear key={it.v} at={it.at} t={t}>
                      <span className={`rounded-md border px-1.5 py-0.5 text-[11px] ${col.tag}`}>{it.v}</span>
                    </Appear>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Scene 2 · Build ----------
 * A radar sweeps a field of company dots. Dots that fit light up as the
 * beam passes, the found count climbs, and discovered companies drop into a
 * live feed — each one lighting the search theme it came from. */

const DOT_COLS = 13;
const DOT_ROWS = 8;
const SWEEP_START = 300;
const SWEEP_MS = 2300; // one revolution

const DOTS = Array.from({ length: DOT_COLS * DOT_ROWS }, (_, i) => {
  const c = i % DOT_COLS;
  const r = Math.floor(i / DOT_COLS);
  const dx = c - (DOT_COLS - 1) / 2;
  const dy = r - (DOT_ROWS - 1) / 2;
  const deg = ((Math.atan2(dx, -dy) * 180) / Math.PI + 360) % 360; // clockwise from 12 o'clock
  const match = (i * 37 + r * 5) % 11 < 3 && !(dx === 0 && dy === 0);
  return { x: ((c + 0.5) / DOT_COLS) * 100, y: ((r + 0.5) / DOT_ROWS) * 100, deg, match };
});

const THEMES = ['Marketplaces', 'SaaS', 'Delivery', 'Payroll'];

const FOUND = [
  { name: 'Etsy', theme: 'Marketplaces', where: 'United States' },
  { name: 'Twilio', theme: 'SaaS', where: 'United States' },
  { name: 'Instacart', theme: 'Delivery', where: 'United States' },
  { name: 'Gusto', theme: 'Payroll', where: 'United States' },
  { name: 'HubSpot', theme: 'SaaS', where: 'United States' },
  { name: 'eBay', theme: 'Marketplaces', where: 'United States' },
  { name: 'Mailchimp', theme: 'SaaS', where: 'United States' },
];
const FEED_START = 900;
const FEED_EVERY = 520;
const FEED_ROW = 46;
const FEED_VISIBLE = 4;
const MARKET_TOTAL = 1284;

function SceneBuild({ t }: { t: number }) {
  const sweep = Math.max(0, (t - SWEEP_START) / SWEEP_MS) * 360;
  const found = Math.round(MARKET_TOTAL * ease((t - 400) / 4000));
  const searching = t < 4300;

  const feedAt = FOUND.map((_, k) => FEED_START + k * FEED_EVERY);
  const feedIn = feedAt.map((a) => ease((t - a) / 500));
  const themeOn = THEMES.map((th) => {
    const k = FOUND.findIndex((f) => f.theme === th);
    return ease((t - feedAt[k]) / 400);
  });

  return (
    <Panel className="w-full max-w-[600px]">
      <div className="flex flex-col gap-2 border-b border-[rgb(var(--ink)/0.07)] px-4 py-4 sm:flex-row sm:items-end sm:justify-between sm:gap-4 sm:px-5">
        <div className="min-w-0">
          <p className="truncate text-[12.5px] text-[rgb(var(--ink)/0.55)]">Your market · Cross-border payments</p>
          <p className="mt-1 text-[26px] font-semibold tabular-nums tracking-[-0.02em] text-[rgb(var(--ink))]">
            {found.toLocaleString('en-US')} <span className="text-[15px] font-medium text-[rgb(var(--ink)/0.5)]">companies</span>
          </p>
        </div>
        <span className="flex flex-shrink-0 items-center gap-1.5 text-[12px] sm:pb-1">
          <Radar size={13} className={searching ? 'text-[rgb(var(--ink)/0.6)]' : 'text-emerald-600 dark:text-emerald-400'} />
          {searching ? <Shimmer>Searching 650M+ profiles</Shimmer> : <span className="text-emerald-600 dark:text-emerald-300">Market built</span>}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-[1fr_1.05fr]">
        {/* Radar over the company universe */}
        <div className="relative aspect-[13/8] overflow-hidden rounded-lg border border-[rgb(var(--ink)/0.06)] bg-[rgb(var(--ink)/0.03)]">
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 aspect-square w-[160%] rounded-full"
            style={{
              transform: `translate(-50%, -50%) rotate(${sweep}deg)`,
              background: 'conic-gradient(from 0deg, transparent 0deg, transparent 290deg, rgb(var(--ink)/0.02) 300deg, rgb(var(--ink)/0.13) 359deg, rgb(var(--ink)/0.45) 360deg)',
              opacity: searching ? 1 : 1 - ease((t - 4300) / 500),
            }}
          />
          {[0.3, 0.6, 0.9].map((s) => (
            <span
              key={s}
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 aspect-square rounded-full border border-[rgb(var(--ink)/0.05)]"
              style={{ width: `${s * 100}%`, transform: 'translate(-50%, -50%)' }}
            />
          ))}
          {DOTS.map((d, i) => {
            const firstPass = SWEEP_START + (d.deg / 360) * SWEEP_MS;
            const lit = d.match ? ease((t - firstPass) / 260) : 0;
            const behind = (((sweep - d.deg) % 360) + 360) % 360;
            const glow = t > SWEEP_START && searching ? Math.max(0, 1 - behind / 70) : 0;
            const size = 4 + lit * 2 + (d.match ? glow * 3 : 0);
            return (
              <span
                key={i}
                aria-hidden="true"
                className="absolute rounded-full"
                style={{
                  left: `${d.x}%`,
                  top: `${d.y}%`,
                  width: size,
                  height: size,
                  transform: 'translate(-50%, -50%)',
                  background: lit > 0 ? `rgb(var(--ink)/${0.45 + 0.55 * lit})` : `rgb(var(--ink)/${0.12 + glow * 0.3})`,
                  boxShadow: lit > 0 ? `0 0 ${4 + glow * 10}px rgb(var(--ink)/${0.35 * lit})` : 'none',
                }}
              />
            );
          })}
          <span aria-hidden="true" className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgb(var(--ink))] shadow-[0_0_12px_rgb(var(--ink)/0.7)]" />
        </div>

        {/* Live feed of discovered companies */}
        <div>
          <p className="mb-2 text-[11.5px] font-semibold uppercase tracking-[0.12em] text-[rgb(var(--ink)/0.4)]">Discovered</p>
          <div className="relative overflow-hidden" style={{ height: FEED_VISIBLE * FEED_ROW }}>
            {FOUND.map((f, k) => {
              if (feedIn[k] <= 0) return null;
              // slot = how many later rows have arrived (newest sits on top)
              const slot = feedIn.slice(k + 1).reduce((a, b) => a + b, 0);
              const out = clamp(slot - (FEED_VISIBLE - 1));
              return (
                <div
                  key={f.name}
                  className="absolute inset-x-0 flex h-[40px] items-center gap-2.5 rounded-lg border border-[rgb(var(--ink)/0.07)] bg-[rgb(var(--ink)/0.03)] px-2.5"
                  style={{
                    transform: `translateY(${slot * FEED_ROW - (1 - feedIn[k]) * 16}px)`,
                    opacity: feedIn[k] * (1 - out),
                    borderColor: k === FOUND.length - 1 || slot < 0.5 ? `rgb(var(--ink)/${0.22 * (1 - clamp(slot))})` : undefined,
                  }}
                >
                  <CoTile name={f.name} />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[12.5px] font-semibold text-[rgb(var(--ink))]">{f.name}</span>
                    <span className="block truncate text-[11px] text-[rgb(var(--ink)/0.45)]">{f.where}</span>
                  </span>
                  <span className="flex-shrink-0 rounded bg-[rgb(var(--ink)/0.06)] px-1.5 py-0.5 text-[10.5px] text-[rgb(var(--ink)/0.6)]">{f.theme}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-1.5 border-t border-[rgb(var(--ink)/0.07)] px-4 py-3">
        <span className="mr-1 text-[11.5px] text-[rgb(var(--ink)/0.4)]">Search themes</span>
        {THEMES.map((th, i) => (
          <span
            key={th}
            className="rounded-md px-2 py-0.5 text-[11.5px] font-medium"
            style={{
              background: `rgb(var(--ink)/${0.02 + 0.08 * themeOn[i]})`,
              color: `rgb(var(--ink)/${0.4 + 0.5 * themeOn[i]})`,
              boxShadow: `inset 0 0 0 1px rgb(var(--ink)/${0.06 + 0.2 * themeOn[i]})`,
            }}
          >
            {th}
          </span>
        ))}
      </div>
    </Panel>
  );
}

/* ---------- Scene 3 · Match ----------
 * A scan bar walks down the list; each account's fit ring fills and its
 * decision-maker slots in. Then the list re-sorts by fit, the strongest
 * accounts rise and take a green edge, and the misfit sinks and dims. */

const ACCOUNTS = [
  { name: 'Mailchimp', fit: 63, dm: 'Head of Finance', av: 2 },
  { name: 'Etsy', fit: 94, dm: 'Head of Payments', av: 1 },
  { name: 'Ford', fit: 31, dm: null, av: 0 },
  { name: 'HubSpot', fit: 86, dm: 'VP Finance', av: 3 },
  { name: 'eBay', fit: 91, dm: 'Head of Payments', av: 4 },
  { name: 'Twilio', fit: 78, dm: 'Head of Finance', av: 2 },
];
const SORTED = [...ACCOUNTS].sort((a, b) => b.fit - a.fit);
const RANK = ACCOUNTS.map((a) => SORTED.indexOf(a));

const M_ROW = 48;
const SCAN_START = 450;
const SCAN_STEP = 420;
const SORT_AT = 3500;

function fitTone(f: number) {
  if (f >= 85) return { l: 'High fit', text: 'text-emerald-600 dark:text-emerald-300', stroke: 'stroke-emerald-400' };
  if (f >= 60) return { l: 'Good fit', text: 'text-amber-600 dark:text-amber-200', stroke: 'stroke-amber-300' };
  return { l: 'Below threshold', text: 'text-[rgb(var(--ink)/0.4)]', stroke: 'stroke-[rgb(var(--ink)/0.3)]' };
}

function Ring({ p, fit }: { p: number; fit: number }) {
  const r = 10;
  const c = 2 * Math.PI * r;
  return (
    <span className="relative grid h-[26px] w-[26px] flex-shrink-0 place-items-center">
      <svg viewBox="0 0 26 26" className="absolute inset-0 -rotate-90" aria-hidden="true">
        <circle cx="13" cy="13" r={r} fill="none" strokeWidth="2.5" className="stroke-[rgb(var(--ink)/0.08)]" />
        <circle
          cx="13" cy="13" r={r} fill="none" strokeWidth="2.5" strokeLinecap="round"
          className={fitTone(fit).stroke}
          strokeDasharray={c}
          strokeDashoffset={c * (1 - (fit / 100) * p)}
        />
      </svg>
    </span>
  );
}

function SceneMatch({ t }: { t: number }) {
  const scanPos = clamp((t - SCAN_START) / (SCAN_STEP * ACCOUNTS.length)) * (ACCOUNTS.length - 1);
  const scanOpacity = ease((t - 150) / 300) * (1 - ease((t - (SCAN_START + SCAN_STEP * ACCOUNTS.length)) / 350));
  const sort = easeInOut((t - SORT_AT) / 900);
  const summary = ease((t - SORT_AT - 1000) / 450);

  return (
    <Panel className="w-full max-w-[600px]">
      <div className="grid grid-cols-[1.15fr_0.85fr_1.1fr] sm:grid-cols-[1.2fr_1fr_1.2fr] border-b border-[rgb(var(--ink)/0.07)] bg-[rgb(var(--ink)/0.02)] text-[12.5px] font-semibold text-[rgb(var(--ink)/0.8)]">
        <span className="flex items-center gap-2 whitespace-nowrap px-3 py-3 sm:px-4"><Building2 size={14} className="hidden text-[rgb(var(--ink)/0.4)] sm:block" /> Account</span>
        <span className="flex items-center gap-2 whitespace-nowrap border-l border-[rgb(var(--ink)/0.06)] px-3 py-3 sm:px-4"><Gauge size={14} className="hidden text-[rgb(var(--ink)/0.4)] sm:block" /> <span className="sm:hidden">Fit</span><span className="hidden sm:inline">Company Fit</span></span>
        <span className="flex items-center gap-2 whitespace-nowrap border-l border-[rgb(var(--ink)/0.06)] px-3 py-3 sm:px-4"><UserRound size={14} className="hidden text-[rgb(var(--ink)/0.4)] sm:block" /> <span className="sm:hidden">Buyer</span><span className="hidden sm:inline">Decision-maker</span></span>
      </div>

      <div className="relative" style={{ height: ACCOUNTS.length * M_ROW }}>
        {/* scan bar */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 z-10"
          style={{ height: M_ROW, transform: `translateY(${scanPos * M_ROW}px)`, opacity: scanOpacity }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(var(--ink)/0.01),rgb(var(--ink)/0.06),rgb(var(--ink)/0.01))]" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(90deg,transparent,rgb(var(--ink)/0.7),transparent)]" />
        </div>

        {ACCOUNTS.map((a, i) => {
          const scoredAt = SCAN_START + i * SCAN_STEP + 200;
          const enter = ease((t - 80 - i * 80) / 420);
          const ring = ease((t - scoredAt) / 800);
          const label = ease((t - scoredAt - 450) / 350);
          const dm = ease((t - scoredAt - 300) / 400);
          const low = a.fit < 60;
          const dim = low ? ease((t - SORT_AT) / 700) : 0;
          const edge = a.fit >= 85 ? ease((t - SORT_AT - 700) / 450) : 0;
          const tone = fitTone(a.fit);
          const y = lerp(i, RANK[i], sort) * M_ROW;
          const scoring = t >= scoredAt - 500 && t < scoredAt;
          return (
            <div
              key={a.name}
              className="absolute inset-x-0 grid grid-cols-[1.15fr_0.85fr_1.1fr] sm:grid-cols-[1.2fr_1fr_1.2fr] border-b border-[rgb(var(--ink)/0.05)]"
              style={{
                height: M_ROW,
                transform: `translateY(${y + (1 - enter) * -14}px)`,
                opacity: enter * (1 - 0.6 * dim),
                // Solid rows, stacked by final rank, so they pass cleanly over each other while re-sorting.
                zIndex: low ? 1 : 20 - RANK[i] + (RANK[i] !== i ? 5 : 0),
                background: `linear-gradient(rgba(52,211,153,${0.045 * edge}),rgba(52,211,153,${0.045 * edge})), var(--panel)`,
                boxShadow: RANK[i] !== i ? `0 ${10 * Math.sin(Math.PI * sort)}px ${24 * Math.sin(Math.PI * sort)}px rgba(0,0,0,${0.55 * Math.sin(Math.PI * sort)})` : undefined,
              }}
            >
              <span aria-hidden="true" className="absolute inset-y-0 left-0 w-[2px] bg-emerald-400" style={{ opacity: edge }} />
              <span className="flex min-w-0 items-center gap-2.5 px-3 text-[13px] font-medium text-[rgb(var(--ink))] sm:px-4">
                <CoTile name={a.name} /> <span className={`truncate ${low && dim > 0.5 ? 'line-through decoration-[rgb(var(--ink)/0.3)]' : ''}`}>{a.name}</span>
              </span>
              <span className="flex min-w-0 items-center gap-2 border-l border-[rgb(var(--ink)/0.05)] px-3 sm:px-4">
                {ring > 0 ? (
                  <>
                    <Ring p={ring} fit={a.fit} />
                    <span className="text-[13px] font-semibold tabular-nums text-[rgb(var(--ink))]">{Math.round(a.fit * ring)}</span>
                    <span className={`hidden truncate text-[11.5px] font-medium sm:inline ${tone.text}`} style={{ opacity: label }}>{tone.l}</span>
                  </>
                ) : scoring ? (
                  <Shimmer>Scoring…</Shimmer>
                ) : null}
              </span>
              <span className="flex min-w-0 items-center border-l border-[rgb(var(--ink)/0.05)] px-3 sm:px-4">
                {dm > 0 ? (
                  a.dm ? (
                    <span
                      className="inline-flex min-w-0 items-center gap-2 rounded-full bg-[rgb(var(--ink)/0.05)] py-0.5 pl-0.5 pr-2.5 text-[12px] text-[rgb(var(--ink)/0.85)]"
                      style={{ opacity: dm, transform: `translateX(${(1 - dm) * 10}px)` }}
                    >
                      <img src={`/avatars/lead-${a.av}.svg`} alt="" className="h-5 w-5 flex-shrink-0 rounded-full bg-[#0B1A3A]" />
                      <span className="truncate">{a.dm}</span>
                    </span>
                  ) : (
                    <span className="text-[12px] text-[rgb(var(--ink)/0.35)]" style={{ opacity: dm }}>Not matched</span>
                  )
                ) : scoring ? (
                  <Shimmer>Matching roles…</Shimmer>
                ) : null}
              </span>
            </div>
          );
        })}
      </div>

      <div
        className="flex items-center justify-between gap-3 border-t border-[rgb(var(--ink)/0.07)] px-4 py-3 text-[12px]"
        style={{ opacity: 0.35 + 0.65 * summary }}
      >
        <span className="text-[rgb(var(--ink)/0.7)]">
          <span className="font-semibold text-[rgb(var(--ink))]">5 accounts</span> above your fit threshold · 1 excluded
        </span>
        <span className="hidden text-[rgb(var(--ink)/0.45)] sm:inline">Sorted by Company Fit</span>
      </div>
    </Panel>
  );
}

/* ---------- Scene 4 · Act ----------
 * A cursor drags the top matches from "Matched" to "Ready to contact"; cards
 * glide between columns and the rest close up behind them. Then the camera
 * pushes in on the first ready contact as email, phone and signal verify. */

const BOARD = [
  { name: 'Etsy', meta: 'Fit 94 · Head of Payments', move: 700 },
  { name: 'eBay', meta: 'Fit 91 · Head of Payments', move: 1450 },
  { name: 'HubSpot', meta: 'Fit 86 · VP Finance', move: 2200 },
  { name: 'Twilio', meta: 'Fit 78 · Head of Finance', move: null },
];
const DRAG_MS = 650;
const SLOT = 50;
const HEAD = 34;
const ZOOM_AT = 3500;

type Pt = { pct: number; px: number; y: number };
const mix = (a: Pt, b: Pt, p: number): Pt => ({ pct: lerp(a.pct, b.pct, p), px: lerp(a.px, b.px, p), y: lerp(a.y, b.y, p) });

function SceneAct({ t }: { t: number }) {
  const zoom = easeInOut((t - ZOOM_AT) / 750);
  const q = BOARD.map((b) => (b.move === null ? 0 : easeInOut((t - b.move) / DRAG_MS)));
  const moved = q.filter((v) => v >= 0.5).length;

  const pos = (i: number): Pt => {
    const leftIdx = i - q.slice(0, i).reduce((a, b) => a + b, 0);
    const rightIdx = BOARD.slice(0, i).filter((b) => b.move !== null).length;
    return { pct: 50 * q[i], px: 6 * q[i], y: HEAD + lerp(leftIdx, rightIdx, q[i]) * SLOT };
  };

  // Cursor: glide to the next card, grab it, ride along to the drop slot.
  const movers = BOARD.map((b, i) => ({ ...b, i })).filter((b) => b.move !== null) as { move: number; i: number }[];
  const active = movers.find((m) => t < m.move + DRAG_MS) ?? movers[movers.length - 1];
  const ai = movers.indexOf(active);
  const grab = { pct: 28, px: 0, y: 22 };
  const start: Pt = ai === 0 ? { pct: 80, px: 0, y: HEAD + 3.2 * SLOT } : (() => { const p = pos(movers[ai - 1].i); return { pct: p.pct + grab.pct, px: p.px, y: p.y + grab.y }; })();
  const card = pos(active.i);
  const onCard: Pt = { pct: card.pct + grab.pct, px: card.px, y: card.y + grab.y };
  const approach = easeInOut((t - (active.move - 520)) / 480);
  const cursor = t < active.move ? mix(start, onCard, approach) : onCard;
  const cursorOpacity = ease(t / 300) * (1 - ease((t - 3000) / 350));
  const dragging = q.some((v) => v > 0.02 && v < 0.98);

  return (
    <div className="relative w-full max-w-[560px]">
      {/* Board */}
      <div style={{ opacity: 1 - zoom, transform: `scale(${1 + 0.12 * zoom})`, filter: `blur(${6 * zoom}px)` }}>
        <div className="relative" style={{ height: HEAD + 4 * SLOT }}>
          <div className="grid grid-cols-2 gap-3">
            {[
              { title: 'Matched', count: BOARD.length - moved, tone: 'bg-[rgb(var(--ink)/0.1)] text-[rgb(var(--ink)/0.6)]' },
              { title: 'Ready to contact', count: moved, tone: 'bg-[rgb(var(--ink)/0.15)] text-[rgb(var(--ink)/0.85)]' },
            ].map((c) => (
              <p key={c.title} className="flex items-center gap-2 text-[12.5px] font-semibold text-[rgb(var(--ink)/0.85)]">
                {c.title}
                <span className={`rounded-full px-1.5 text-[11px] tabular-nums ${c.tone}`}>{c.count}</span>
              </p>
            ))}
          </div>

          {/* drop zone */}
          <div
            aria-hidden="true"
            className="absolute right-0 rounded-xl border border-dashed transition-colors duration-300"
            style={{
              left: 'calc(50% + 6px)',
              top: HEAD - 4,
              height: 3 * SLOT + 4,
              borderColor: dragging ? 'rgb(var(--ink)/0.28)' : 'rgb(var(--ink)/0.08)',
              background: dragging ? 'rgb(var(--ink)/0.025)' : 'transparent',
            }}
          />

          {BOARD.map((b, i) => {
            const p = pos(i);
            const lift = Math.sin(Math.PI * q[i]);
            const ready = q[i] > 0.5;
            return (
              <div
                key={b.name}
                className="absolute flex h-[42px] items-center gap-2.5 rounded-lg border px-3"
                style={{
                  left: `calc(${p.pct}% + ${p.px}px)`,
                  top: p.y,
                  width: 'calc(50% - 6px)',
                  zIndex: lift > 0.01 ? 5 : 1,
                  transform: `scale(${1 + 0.04 * lift}) rotate(${2.5 * lift}deg)`,
                  borderColor: ready ? 'rgb(var(--ink)/0.2)' : 'rgb(var(--ink)/0.08)',
                  background: ready ? 'var(--panel2)' : 'var(--panel)',
                  boxShadow: `0 ${8 + 14 * lift}px ${20 + 20 * lift}px rgba(0,0,0,${0.4 + 0.2 * lift})`,
                }}
              >
                <CoTile name={b.name} />
                <span className="min-w-0">
                  <span className="block truncate text-[12.5px] font-semibold text-[rgb(var(--ink))]">{b.name}</span>
                  <span className="block truncate text-[11px] text-[rgb(var(--ink)/0.45)]">{b.meta}</span>
                </span>
              </div>
            );
          })}

          <MousePointer2
            size={18}
            className="pointer-events-none absolute z-10 fill-white text-black drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
            style={{
              left: `calc(${cursor.pct}% + ${cursor.px}px)`,
              top: cursor.y,
              opacity: cursorOpacity,
              transform: `scale(${dragging ? 0.9 : 1})`,
            }}
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Close-up on the first ready account */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        style={{ opacity: zoom, transform: `scale(${0.9 + 0.1 * zoom})` }}
      >
        <Panel className="w-full max-w-[400px] bg-[var(--panel2)]">
          <div className="flex items-center gap-3 border-b border-[rgb(var(--ink)/0.07)] px-4 py-3.5">
            <img src="/avatars/lead-1.svg" alt="" className="h-10 w-10 rounded-full bg-[#0B1A3A]" />
            <span className="min-w-0 flex-1">
              <span className="block text-[14.5px] font-semibold text-[rgb(var(--ink))]">Head of Payments</span>
              <span className="block text-[12px] text-[rgb(var(--ink)/0.5)]">Decision-maker · Etsy</span>
            </span>
            <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-300">Ready</span>
          </div>
          {[
            { at: ZOOM_AT + 500, icon: Mail, k: 'Verified email', v: '••••••@etsy.com' },
            { at: ZOOM_AT + 1000, icon: Phone, k: 'Direct/mobile phone', v: '+1 ••• ••• ••••' },
            { at: ZOOM_AT + 1500, icon: Zap, k: 'Signal', v: 'Example: finance leadership change' },
          ].map((r) => {
            const Icon = r.icon;
            const on = t >= r.at;
            return (
              <div key={r.k} className="flex items-center gap-3 border-b border-[rgb(var(--ink)/0.05)] px-4 py-3 last:border-b-0">
                <Icon size={15} className="text-[rgb(var(--ink)/0.4)]" />
                <span className="min-w-0 flex-1">
                  <span className="block text-[11.5px] text-[rgb(var(--ink)/0.45)]">{r.k}</span>
                  <span className="block truncate text-[13px] font-medium text-[rgb(var(--ink))]">
                    {on ? <span className="hiw-pop inline-block">{r.v}</span> : <Shimmer>Finding…</Shimmer>}
                  </span>
                </span>
                {on && (
                  <span className="hiw-pop grid h-5 w-5 place-items-center rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-300">
                    <Check size={12} strokeWidth={3} />
                  </span>
                )}
              </div>
            );
          })}
        </Panel>
      </div>
    </div>
  );
}

const SCENES = [SceneUnderstand, SceneBuild, SceneMatch, SceneAct];

/* ---------- Chapters (right) ---------- */

/** When each checklist item ticks, as a fraction of its scene. */
const tickAt = (j: number, n: number) => 0.12 + (0.7 * j) / Math.max(1, n - 1);

function Chapters({ scene, p, go }: { scene: number; p: number; go: (i: number) => void }) {
  return (
    <ol className="border-t border-slate-200 dark:border-white/[0.08] lg:self-center">
      {STEPS.map((s, i) => {
        const active = i === scene;
        const done = i < scene;
        return (
          <li key={s.n} className="relative border-b border-slate-200 dark:border-white/[0.08]">
            <button
              type="button"
              onClick={() => go(i)}
              aria-current={active ? 'step' : undefined}
              className="group flex w-full items-start gap-5 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:focus-visible:ring-white/40"
            >
              <span
                className={`w-7 flex-shrink-0 pt-[3px] font-mono text-[13px] tabular-nums transition-colors duration-500
                            ${active ? 'text-ember-500 dark:text-ember-400' : done ? 'text-slate-500 dark:text-white/45' : 'text-slate-400 dark:text-white/25'}`}
              >
                {s.n}
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-baseline justify-between gap-3">
                  <span
                    className={`text-[19px] font-semibold tracking-[-0.015em] transition-colors duration-500
                                ${active ? 'text-slate-900 dark:text-white' : 'text-slate-400 group-hover:text-slate-700 dark:text-white/45 dark:group-hover:text-white/75'}`}
                  >
                    {s.title}
                  </span>
                  <span className={`flex-shrink-0 text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors duration-500 ${active ? 'text-slate-500 dark:text-white/55' : 'text-slate-400 dark:text-white/25'}`}>
                    {s.verb}
                  </span>
                </span>
                <span className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${active ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                  <span className="overflow-hidden">
                    <span className="grid grid-cols-2 gap-x-4 gap-y-2 pt-4">
                      {s.items.map((it, j) => {
                        const on = active && p >= tickAt(j, s.items.length);
                        return (
                          <span key={it} className="flex items-center gap-2 text-[13px]">
                            <span
                              className={`grid h-4 w-4 flex-shrink-0 place-items-center rounded-full border transition-all duration-500
                                          ${on ? 'border-transparent bg-slate-900 text-white dark:bg-white dark:text-[#0A0908]' : 'border-slate-300 text-transparent dark:border-white/15'}`}
                            >
                              <Check size={10} strokeWidth={3.4} />
                            </span>
                            <span className={`transition-colors duration-500 ${on ? 'text-slate-800 dark:text-white/85' : 'text-slate-400 dark:text-white/35'}`}>{it}</span>
                          </span>
                        );
                      })}
                    </span>
                  </span>
                </span>
              </span>
            </button>
            {/* progress along the row's bottom rule */}
            <span aria-hidden="true" className="absolute inset-x-0 -bottom-px h-px">
              <span className="block h-full bg-slate-900/60 dark:bg-white/70" style={{ width: `${active ? p * 100 : 0}%` }} />
            </span>
          </li>
        );
      })}
    </ol>
  );
}

/* ---------- Player ---------- */

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const [{ scene, t }, setPos] = useState({ scene: 0, t: 0 });
  const [inView, setInView] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Frame clock. One state object, so a scene change and its clock reset
  // always land together.
  useEffect(() => {
    if (!inView || reduced) return;
    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min(64, now - last);
      last = now;
      setPos((p) => (p.t + dt >= STEPS[p.scene].dur ? { scene: (p.scene + 1) % STEPS.length, t: 0 } : { scene: p.scene, t: p.t + dt }));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced]);

  const go = (i: number) => setPos({ scene: i, t: 0 });

  const dur = STEPS[scene].dur;
  // Reduced motion: hold each scene on its finished frame.
  const clock = reduced ? dur - EXIT_MS - 1 : t;
  const enter = reduced ? 1 : ease(clock / ENTER_MS);
  const exit = reduced ? 0 : easeInOut((clock - (dur - EXIT_MS)) / EXIT_MS);
  const Scene = SCENES[scene];

  return (
    <Section>
      <style>{styles}</style>
      <div id="how-it-works" className="max-w-[680px] scroll-mt-28">
        <Eyebrow>How it works</Eyebrow>
        <Heading>
          Harvin adds business context <Accent>before it adds more data.</Accent>
        </Heading>
        <Lead>It doesn’t start with which filters you want. It starts with what a good customer looks like for you.</Lead>
      </div>

      <div ref={ref} className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px] lg:gap-12">

        {/* Stage */}
        <div
          className="hiw-stage relative flex min-h-[460px] items-center justify-center py-2 sm:min-h-[500px]"
          aria-label={`${STEPS[scene].verb}: ${STEPS[scene].title}`}
          role="img"
        >
          <div
            key={scene}
            className="flex w-full justify-center will-change-transform"
            style={{
              opacity: enter * (1 - exit),
              transform: `translateY(${(1 - enter) * 14}px) scale(${0.95 + 0.05 * enter + 0.04 * exit})`,
              filter: enter < 1 || exit > 0 ? `blur(${(1 - enter) * 8 + exit * 6}px)` : undefined,
            }}
          >
            <Scene t={clock} />
          </div>
          <p className="pointer-events-none absolute inset-x-0 bottom-0 text-center text-[11px] text-slate-400 dark:text-slate-500">Illustrative example. Logos belong to their owners; scores and contacts are not real data.</p>
        </div>

        <Chapters scene={scene} p={clock / dur} go={go} />
      </div>
    </Section>
  );
}
