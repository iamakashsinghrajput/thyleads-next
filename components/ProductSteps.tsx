'use client';

import { useEffect, useRef, useState } from 'react';
import {
  Check, Clock, Gauge, Mail, Phone, Send, SlidersHorizontal, Zap,
} from 'lucide-react';

/**
 * "From signal to signed deal in 4 steps", built to the same pattern as the
 * Platform section: alternating rows, copy one side, a rendered visual the
 * other, inside the shared sand frame.
 *
 * Each visual shows the step it belongs to rather than being decorative — a
 * filter panel for discovery, a feed for signals, scored windows for timing,
 * a composer for launch. Company marks are real assets from /public/logos;
 * counts, scores and signal tallies are Harvin's own output and illustrative.
 * Signals stay metric-shaped ("42 open GTM roles"), never named events, so
 * nothing invented is asserted about a real company.
 */

/* ── shared shell, matching Platform's visuals ─────────────────────────── */
function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-sand-200 p-4 dark:bg-[#141210] sm:p-5">
      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-sand-50 shadow-[0_18px_44px_rgba(15,23,42,0.14)] dark:border-white/[0.08] dark:bg-[#16130F] dark:shadow-[0_18px_44px_rgba(0,0,0,0.5)]">
        {children}
      </div>
    </div>
  );
}

function Head({ title, sub, right }: { title: string; sub: string; right?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-slate-200/70 bg-sand-100/70 px-4 py-3 dark:border-white/[0.06] dark:bg-white/[0.03]">
      <div className="min-w-0">
        <p className="truncate text-[13.5px] font-bold tracking-[-0.01em] text-slate-900 dark:text-white">{title}</p>
        <p className="truncate text-[12px] text-slate-500 dark:text-slate-400">{sub}</p>
      </div>
      {right}
    </div>
  );
}

function Mark({ slug }: { slug: string }) {
  return (
    <span className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-lg border border-slate-200 bg-white p-1.5 dark:border-white/10">
      <img src={`/logos/${slug}.svg`} alt="" aria-hidden="true" className="h-auto w-full object-contain" />
    </span>
  );
}

/* ── 01 · Discover ─────────────────────────────────────────────────────── */
const FILTER_GROUPS = [
  {
    label: 'Industry',
    options: [
      { name: 'D2C retail', on: true },
      { name: 'Consumer electronics', on: true },
      { name: 'Marketplaces', on: false },
      { name: 'Health & wellness', on: false },
    ],
  },
  {
    label: 'Headcount',
    options: [
      { name: '500 – 5,000', on: true },
      { name: '5,000+', on: false },
    ],
  },
  {
    label: 'Funding stage',
    options: [
      { name: 'Series B+', on: true },
      { name: 'Public', on: true },
    ],
  },
  {
    label: 'Buying signals',
    options: [
      { name: 'Hiring', on: true },
      { name: 'Scaling', on: true },
      { name: 'Funding', on: false },
    ],
  },
];

const RESULTS = [
  { slug: 'nike', name: 'Nike', cat: 'D2C retail', score: 94 },
  { slug: 'peloton', name: 'Peloton', cat: 'Health & wellness', score: 89 },
  { slug: 'bose', name: 'Bose', cat: 'Consumer electronics', score: 85 },
  { slug: 'sonos', name: 'Sonos', cat: 'Consumer electronics', score: 81 },
  { slug: 'target', name: 'Target', cat: 'D2C retail', score: 78 },
  { slug: 'etsy', name: 'Etsy', cat: 'Marketplaces', score: 74 },
];

/**
 * The filter step as a real app screen: a sidebar of facets on the left and the
 * matching accounts on the right, in the same bezelled device as the Look-a-like
 * visual. A sidebar is what filtering actually looks like — a stack of
 * dropdowns in a card was a form, not a console.
 */
function DiscoverPanel() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-sand-200 p-5 dark:bg-[#141210] sm:p-6">
      {/* Device — dark bezel, screen bleeding off the right */}
      <div className="relative -mb-20 -mr-14 ml-[5%] rounded-l-[32px] bg-[#141414] py-[13px] pl-[13px] shadow-[0_26px_64px_rgba(15,23,42,0.3)]">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-[3px] rounded-l-[32px] bg-gradient-to-b from-white/30 via-white/[0.06] to-transparent"
        />

        <div className="overflow-hidden rounded-l-[22px] bg-white pt-5 dark:bg-[#16130F]">
          <div className="flex items-baseline justify-between gap-4 px-6 pb-3">
            <h4 className="text-[22px] font-bold tracking-[-0.025em] text-slate-900 dark:text-white">
              Account explorer
            </h4>
            <span className="flex-shrink-0 rounded-full bg-ember-50 px-3 py-1 text-[13px] font-bold tabular-nums text-ember-600 dark:bg-ember-500/15 dark:text-ember-300">
              248 match
            </span>
          </div>

          <div className="flex border-t border-slate-200/70 dark:border-white/[0.06]">
            {/* ── Sidebar ─────────────────────────────────────────────── */}
            <aside className="w-[212px] flex-shrink-0 border-r border-slate-200/70 bg-sand-50 px-4 py-5 dark:border-white/[0.06] dark:bg-white/[0.02]">
              <p className="flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500">
                <SlidersHorizontal size={11} strokeWidth={2.2} />
                Filters
              </p>

              {FILTER_GROUPS.map((g) => (
                <div key={g.label} className="mt-4">
                  <p className="text-[11.5px] font-semibold text-slate-700 dark:text-slate-300">{g.label}</p>
                  <div className="mt-2 flex flex-col gap-1.5">
                    {g.options.map((o) => (
                      <span key={o.name} className="flex items-center gap-2">
                        <span
                          className={`grid h-[14px] w-[14px] flex-shrink-0 place-items-center rounded-[4px] ${
                            o.on ? 'bg-ember-500 text-white' : 'ring-1 ring-slate-300 dark:ring-white/20'
                          }`}
                        >
                          {o.on && <Check size={9} strokeWidth={3.5} />}
                        </span>
                        <span
                          className={`truncate text-[11.5px] ${
                            o.on ? 'font-medium text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'
                          }`}
                        >
                          {o.name}
                        </span>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </aside>

            {/* ── Results, running off the right edge ─────────────────── */}
            <div className="min-w-0 flex-1 px-4 py-2.5">
              {RESULTS.map((a, i) => (
                <div
                  key={a.slug}
                  className={`flex items-center gap-3 py-[11px] ${i > 0 ? 'border-t border-slate-200/70 dark:border-white/[0.05]' : ''}`}
                >
                  <Mark slug={a.slug} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] font-semibold text-slate-900 dark:text-white">{a.name}</p>
                    <p className="truncate text-[11px] text-slate-400 dark:text-slate-500">{a.cat}</p>
                  </div>
                  <span className="flex-shrink-0 text-[13.5px] font-bold tabular-nums text-slate-900 dark:text-white">
                    {a.score}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── 02 · Signals ──────────────────────────────────────────────────────── */
const SIGNAL_TYPES = [
  { name: 'Hiring', count: 6, on: true },
  { name: 'Scaling', count: 4, on: true },
  { name: 'Funding', count: 2, on: true },
  { name: 'M&A', count: 0, on: false },
  { name: 'Layoffs', count: 0, on: false },
];

const ALERTS = [
  { slug: 'nike', name: 'Nike', type: 'Hiring', metric: '58 open GTM roles',
    evidence: 'careers page · +22 roles in 14 days', when: '2:14 PM', score: 94 },
  { slug: 'peloton', name: 'Peloton', type: 'Scaling', metric: 'Headcount +14% QoQ',
    evidence: 'team pages · 3 new offices listed', when: '1:02 PM', score: 89 },
  { slug: 'etsy', name: 'Etsy', type: 'Hiring', metric: '19 open data roles',
    evidence: null, when: '11:40 AM', score: 74 },
  { slug: 'sonos', name: 'Sonos', type: 'Scaling', metric: '26 open engineering roles',
    evidence: null, when: '9:26 AM', score: 81 },
];

/**
 * The detect step as one app screen, matching the filter step's device: signal
 * types down the sidebar with live counts, the accounts that fired them on the
 * right. Same chrome as DiscoverPanel so the two steps read as the same product.
 *
 * Signals are metric-shaped tallies, never named events, so nothing invented is
 * asserted about a real company.
 */
function SignalAlert() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-sand-200 p-5 dark:bg-[#141210] sm:p-6">
      <div className="relative -mb-20 -mr-14 ml-[5%] rounded-l-[32px] bg-[#141414] py-[13px] pl-[13px] shadow-[0_26px_64px_rgba(15,23,42,0.3)]">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-[3px] rounded-l-[32px] bg-gradient-to-b from-white/30 via-white/[0.06] to-transparent"
        />

        <div className="overflow-hidden rounded-l-[22px] bg-white pt-5 dark:bg-[#16130F]">
          <div className="flex items-baseline justify-between gap-4 px-6 pb-3">
            <h4 className="text-[22px] font-bold tracking-[-0.025em] text-slate-900 dark:text-white">
              Signal feed
            </h4>
            <span className="flex flex-shrink-0 items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-ember-500" />
              <span className="text-[12px] text-slate-500 dark:text-slate-400">12 today</span>
            </span>
          </div>

          <div className="flex border-t border-slate-200/70 dark:border-white/[0.06]">
            {/* ── Signal types ────────────────────────────────────────── */}
            <aside className="w-[212px] flex-shrink-0 border-r border-slate-200/70 bg-sand-50 px-4 py-5 dark:border-white/[0.06] dark:bg-white/[0.02]">
              <p className="flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500">
                <Zap size={11} strokeWidth={2.4} />
                Signal types
              </p>
              <div className="mt-3 flex flex-col gap-2">
                {SIGNAL_TYPES.map((t) => (
                  <span key={t.name} className="flex items-center gap-2">
                    <span
                      className={`grid h-[14px] w-[14px] flex-shrink-0 place-items-center rounded-[4px] ${
                        t.on ? 'bg-ember-500 text-white' : 'ring-1 ring-slate-300 dark:ring-white/20'
                      }`}
                    >
                      {t.on && <Check size={9} strokeWidth={3.5} />}
                    </span>
                    <span className={`flex-1 truncate text-[11.5px] ${t.on ? 'font-medium text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>
                      {t.name}
                    </span>
                    <span className="flex-shrink-0 text-[11px] font-semibold tabular-nums text-slate-400 dark:text-slate-500">
                      {t.count}
                    </span>
                  </span>
                ))}
              </div>

              <p className="mt-5 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500">
                Sources
              </p>
              <div className="mt-2 flex flex-col gap-1.5">
                {['Careers pages', 'Filings & press', 'Tech stack scan'].map((src) => (
                  <span key={src} className="truncate text-[11.5px] text-slate-500 dark:text-slate-400">{src}</span>
                ))}
              </div>
            </aside>

            {/* ── The accounts that fired ─────────────────────────────── */}
            <div className="min-w-0 flex-1 px-4 py-2.5">
              {ALERTS.map((a, i) => (
                <div key={a.slug} className={`py-[11px] ${i > 0 ? 'border-t border-slate-200/70 dark:border-white/[0.05]' : ''}`}>
                  <div className="flex items-center gap-2.5">
                    <Mark slug={a.slug} />
                    <span className="truncate text-[13px] font-semibold text-slate-900 dark:text-white">{a.name}</span>
                    <span className="flex-shrink-0 rounded-full bg-ember-500/15 px-2 py-[2px] text-[10px] font-bold uppercase tracking-wide text-ember-600 dark:text-ember-300">
                      {a.type}
                    </span>
                    <span className="ml-auto flex-shrink-0 text-[10.5px] tabular-nums text-slate-400 dark:text-slate-500">
                      {a.when}
                    </span>
                  </div>

                  <div className="mt-1.5 flex items-baseline gap-1.5 pl-[42px]">
                    <span className="min-w-0 flex-1 truncate text-[12.5px] text-slate-700 dark:text-slate-200">{a.metric}</span>
                    <span className="flex-shrink-0 text-[12.5px] font-bold tabular-nums text-slate-900 dark:text-white">{a.score}</span>
                  </div>

                  {a.evidence && (
                    <p className="mt-0.5 truncate pl-[42px] text-[11px] text-slate-400 dark:text-slate-500">
                      Evidence · {a.evidence}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── 03 · Score & time ─────────────────────────────────────────────────── */
/**
 * Two accounts scored side by side, each broken into what produced it.
 *
 * Two rather than one because the step's claim is comparative: the score ranks
 * accounts and the window says when to move. A single card can show a number,
 * but it can't show that 93 beats 74 or that a wide-open window differs from a
 * closing one. Both accounts are broken down on the SAME four factors, so the
 * rows read across as well as down.
 *
 * Every total is summed from its own parts — the ring can never disagree with
 * the breakdown beneath it. Bars scale against the largest contribution across
 * BOTH accounts, so Nike's hiring bar is visibly longer than Etsy's.
 */
const FACTORS = ['Hiring velocity', 'Stack expansion', 'Headcount growth', 'Category fit'] as const;

const SCORED = [
  {
    slug: 'nike',
    name: 'Nike',
    meta: 'D2C retail · United States',
    open: true,
    window: 'Buying window open',
    left: '14 days',
    fill: 62,
    parts: [
      { pts: 28, detail: '+22 GTM roles in 14 days' },
      { pts: 24, detail: '11 new tools detected' },
      { pts: 22, detail: '+14% QoQ' },
      { pts: 19, detail: 'D2C retail · US' },
    ],
  },
  {
    slug: 'etsy',
    name: 'Etsy',
    meta: 'Marketplace · United States',
    open: false,
    window: 'Window closing',
    left: '5 days',
    fill: 22,
    parts: [
      { pts: 17, detail: '19 open data roles' },
      { pts: 21, detail: '9 new tools detected' },
      { pts: 15, detail: '+6% QoQ' },
      { pts: 21, detail: 'Marketplace · US' },
    ],
  },
];

const TOTAL = (a: typeof SCORED[0]) => a.parts.reduce((n, p) => n + p.pts, 0);
/** Shared across both accounts, so bars compare between them, not just within. */
const MAX_PART = Math.max(...SCORED.flatMap((a) => a.parts.map((p) => p.pts)));

function ScoreRing({ value }: { value: number }) {
  const R = 26;
  const C = 2 * Math.PI * R;
  return (
    <span className="relative grid h-[66px] w-[66px] flex-shrink-0 place-items-center">
      <svg viewBox="0 0 66 66" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden="true">
        <circle cx="33" cy="33" r={R} fill="none" strokeWidth="6" className="stroke-slate-200 dark:stroke-white/[0.12]" />
        <circle
          cx="33" cy="33" r={R} fill="none" strokeWidth="6" strokeLinecap="round"
          className="stroke-ember-500" strokeDasharray={C} strokeDashoffset={C * (1 - value / 100)}
        />
      </svg>
      <span className="relative font-bricolage text-[21px] font-bold tabular-nums leading-none text-slate-900 dark:text-white">
        {value}
      </span>
    </span>
  );
}

function ScoredAccount({ a }: { a: typeof SCORED[0] }) {
  const total = TOTAL(a);
  const WindowIcon = a.open ? Zap : Clock;

  return (
    <div className="px-5 py-4">
      <div className="flex items-center gap-3.5">
        <ScoreRing value={total} />

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <Mark slug={a.slug} />
            <div className="min-w-0">
              <p className="truncate text-[14.5px] font-bold tracking-[-0.01em] text-slate-900 dark:text-white">
                {a.name}
              </p>
              <p className="truncate text-[11.5px] text-slate-500 dark:text-slate-400">{a.meta}</p>
            </div>
          </div>

          <p
            className={`mt-2.5 flex items-center gap-1.5 text-[12px] font-semibold ${
              a.open ? 'text-ember-600 dark:text-ember-300' : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            <WindowIcon size={12} strokeWidth={2.6} className="flex-shrink-0" />
            {a.window}
            <span className="font-normal text-slate-400 dark:text-slate-500">· {a.left} left</span>
          </p>
          <span className="mt-1.5 block h-1.5 w-full overflow-hidden rounded-full bg-sand-200 dark:bg-white/10">
            <span
              className={`block h-full rounded-full ${a.open ? 'bg-ember-500' : 'bg-slate-300 dark:bg-white/30'}`}
              style={{ width: `${a.fill}%` }}
            />
          </span>
        </div>
      </div>

      <div className="mt-3.5 space-y-2">
        {a.parts.map((p, i) => (
          <div key={FACTORS[i]} className="flex items-center gap-3">
            <span className="w-[112px] flex-shrink-0 truncate text-[11.5px] font-semibold text-slate-700 dark:text-slate-300">
              {FACTORS[i]}
            </span>
            <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-sand-200 dark:bg-white/10">
              <span className="block h-full rounded-full bg-ember-500" style={{ width: `${(p.pts / MAX_PART) * 100}%` }} />
            </span>
            <span className="w-[34px] flex-shrink-0 text-right text-[11.5px] font-bold tabular-nums text-ember-600 dark:text-ember-300">
              +{p.pts}
            </span>
            <span className="hidden w-[132px] flex-shrink-0 truncate text-[11px] text-slate-400 dark:text-slate-500 sm:block">
              {p.detail}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function BuyingWindows() {
  return (
    <Frame>
      <Head
        title="Account scoring"
        sub="Ranked by score · why each one ranked"
        right={
          <span className="flex-shrink-0 rounded-full bg-ember-50 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-ember-600 ring-1 ring-ember-200 dark:bg-ember-500/15 dark:text-ember-300 dark:ring-ember-400/30">
            This week
          </span>
        }
      />

      {/* one divider between the two, so they read as one ranked list */}
      <div className="divide-y divide-slate-200/70 dark:divide-white/[0.06]">
        {SCORED.map((a) => (
          <ScoredAccount key={a.slug} a={a} />
        ))}
      </div>
    </Frame>
  );
}

/* ── 04 · Launch ───────────────────────────────────────────────────────── */
/**
 * The drafted outreach, for the same two accounts scored in step 03.
 *
 * Drafts rather than another labelled settings stack: steps 01–03 are all
 * panels of rows, so a fourth would land as more of the same. Showing the
 * message itself is also the only way to make the step's claim visible — that
 * the copy is written FROM the signal, not merely sent to a filtered list.
 *
 * Every fact in a draft is a merge token rendered in ember, so the card reads
 * as generated from the account record rather than typed by hand — and nothing
 * is asserted about a real company that the scoring card did not already show.
 * Both the subject and the token values are derived from `topFactor`.
 */
/** The single factor that scored highest for an account, from its own
 *  step-03 breakdown — so the draft's angle can't drift from the scoring. */
function topFactor(a: typeof SCORED[0]) {
  const i = a.parts.reduce((best, p, n) => (p.pts > a.parts[best].pts ? n : best), 0);
  return { label: FACTORS[i], detail: a.parts[i].detail };
}

const SEQUENCE = [
  { day: 'Day 0', label: 'Email', Icon: Mail },
  { day: 'Day 2', label: 'Call', Icon: Phone },
  { day: 'Day 5', label: 'Email', Icon: Mail },
];

const DRAFTS: Record<string, { subject: string; body: string }> = {
  nike: {
    subject: 'Scaling GTM at {{Nike}}?',
    body: 'Noticed {{22 open GTM roles}} in the last {{14 days}} — teams hiring at that pace usually rebuild their pipeline motion at the same time.',
  },
  etsy: {
    subject: 'The {{9 new tools}} on your stack',
    body: 'Your team picked up {{9 new tools}} this quarter. Whenever tooling moves that fast, sourcing tends to be the piece still done by hand.',
  },
};

/** Renders {{…}} as data pulled from the account record, not typed copy. */
function Tokenised({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\{\{[^}]+\}\})/g).map((part, i) =>
        part.startsWith('{{') ? (
          <span
            key={i}
            className="rounded bg-ember-500/[0.12] px-1 py-[1px] font-semibold text-ember-600 dark:bg-ember-500/20 dark:text-ember-300"
          >
            {part.slice(2, -2)}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

function CampaignComposer() {
  return (
    <Frame>
      <Head
        title="Campaign draft"
        sub="Written from each account's top signal"
        right={
          <span className="flex-shrink-0 rounded-full bg-ember-50 px-2.5 py-1 text-[12px] font-bold tabular-nums text-ember-600 dark:bg-ember-500/15 dark:text-ember-300">
            34 accounts
          </span>
        }
      />

      {/* ── The sequence these drafts sit in ───────────────────────────── */}
      <div className="flex items-center gap-2 border-b border-slate-200/70 px-4 py-2.5 dark:border-white/[0.06]">
        {SEQUENCE.map(({ day, label, Icon }, i) => (
          <span key={day} className="flex min-w-0 items-center gap-2">
            {i > 0 && <span aria-hidden="true" className="h-px w-3 flex-shrink-0 bg-slate-300 dark:bg-white/20" />}
            <span className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2 py-1 dark:border-white/10 dark:bg-white/[0.05]">
              <Icon size={11} strokeWidth={2.3} className="flex-shrink-0 text-ember-500" />
              <span className="text-[11px] font-semibold text-slate-900 dark:text-white">{label}</span>
              <span className="text-[10.5px] tabular-nums text-slate-400 dark:text-slate-500">{day}</span>
            </span>
          </span>
        ))}
      </div>

      {/* ── The drafts themselves ──────────────────────────────────────── */}
      <div className="space-y-2.5 px-4 py-3.5">
        {SCORED.map((a) => {
          const d = DRAFTS[a.slug];
          const top = topFactor(a);
          return (
            <div
              key={a.slug}
              className="rounded-xl border border-slate-200 bg-white p-3 shadow-[0_1px_2px_rgba(15,23,42,0.04)] dark:border-white/10 dark:bg-white/[0.04] dark:shadow-none"
            >
              <div className="flex items-center gap-2.5">
                <Mark slug={a.slug} />
                <p className="min-w-0 flex-1 truncate text-[13px] font-bold tracking-[-0.01em] text-slate-900 dark:text-white">
                  {a.name}
                </p>
                <span className="flex-shrink-0 rounded-md bg-sand-100 px-1.5 py-[2px] text-[10.5px] font-semibold text-slate-500 dark:bg-white/[0.06] dark:text-slate-400">
                  {top.label}
                </span>
              </div>

              <p className="mt-2.5 text-[12.5px] font-semibold leading-[1.45] text-slate-900 dark:text-white">
                <Tokenised text={d.subject} />
              </p>
              <p className="mt-1.5 text-[11.5px] leading-[1.55] text-slate-500 dark:text-slate-400">
                <Tokenised text={d.body} />
              </p>
            </div>
          );
        })}
      </div>

      {/* ── Send ───────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 border-t border-slate-200/70 px-4 py-3 dark:border-white/[0.06]">
        <span className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-ember-500 py-2.5 text-[14px] font-semibold text-white shadow-[0_6px_16px_rgba(201,76,30,0.3)]">
          <Send size={15} strokeWidth={2.2} />
          Launch campaign
        </span>
        <span className="hidden flex-shrink-0 text-[11px] leading-[1.4] text-slate-400 dark:text-slate-500 sm:block">
          Syncs to
          <br />
          HubSpot · Salesforce
        </span>
      </div>
    </Frame>
  );
}

/* ── Steps ─────────────────────────────────────────────────────────────── */
const STEPS = [
  {
    n: '01',
    tag: 'Filter',
    title: 'Discover your ICP accounts',
    desc:
      'Narrow your universe by industry, geography, funding stage, headcount and business motion. The filters run against a live account graph, so the list you build today reflects the market today — not a CSV someone exported last quarter.',
    details: [
      'Filter on firmographics, stack and motion',
      'Verified account intelligence, kept current',
      'A priority score on every match',
      'Save any filter set as a watchlist',
    ],
    Visual: DiscoverPanel,
  },
  {
    n: '02',
    tag: 'Detect',
    title: 'Track real-time buying signals',
    desc:
      'Funding, hiring, scaling, M&A and layoffs are watched across every account you track. You hear about the move that opens a buying window while it is still open, not at the next quarterly review.',
    details: [
      'Five signal types across your whole universe',
      'Minutes of latency, not days',
      'Delivered to Slack, email or your CRM',
      'Every alert carries its evidence',
    ],
    Visual: SignalAlert,
  },
  {
    n: '03',
    tag: 'Score',
    title: 'Score accounts and time your outreach',
    desc:
      'Every signal moves the account score, and every score is traceable to what caused it. Accounts in an active buying window rise to the top, with an estimate of how long that window stays open.',
    details: [
      'Live score from the full signal history',
      'Business motion analysis per account',
      'Buying window with time remaining',
      'Threshold you set, shortlist we maintain',
    ],
    Visual: BuyingWindows,
  },
  {
    n: '04',
    tag: 'Launch',
    title: 'Launch campaigns and close deals',
    desc:
      'Take the shortlist straight into outbound. Pick the channels, let Harvin draft the angle from the signal that surfaced the account, and sync everything back to HubSpot, Salesforce or CSV.',
    details: [
      'Email and cold calling from one screen',
      'Angle drafted from the detected signal',
      'HubSpot and Salesforce sync',
      'Full context on every account you touch',
    ],
    Visual: CampaignComposer,
  },
];

function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function StepRow({ step, index, flipped }: { step: typeof STEPS[0]; index: number; flipped: boolean }) {
  const reveal = useReveal();
  const { Visual } = step;

  return (
    <div
      ref={reveal.ref}
      className={`mb-14 flex flex-col items-center gap-10 last:mb-0 transition-all duration-700 md:gap-12 lg:mb-24 lg:gap-16
                  ${flipped ? 'md:flex-row-reverse' : 'md:flex-row'}
                  ${reveal.visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="min-w-0 max-w-[540px] flex-1">
        <div className="mb-6 flex items-center gap-3.5">
          <span className="font-mono text-[13px] font-semibold tracking-[0.16em] text-ember-500">{step.n}</span>
          <span aria-hidden="true" className="h-px flex-1 bg-slate-200 dark:bg-white/[0.10]" />
          <span className="flex-shrink-0 rounded-full border border-slate-200 bg-sand-50 px-3 py-1.5 text-[11.5px] font-semibold uppercase tracking-[0.08em] text-slate-500 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-slate-400">
            {step.tag}
          </span>
        </div>

        <h3 className="font-bricolage text-[30px] font-bold leading-[1.12] tracking-[-0.025em] text-slate-900 dark:text-white sm:text-[38px]">
          {step.title}
        </h3>

        <p className="mt-5 text-[17px] leading-[1.72] text-slate-600 dark:text-slate-400">{step.desc}</p>

        <ul className="mt-7 flex flex-col gap-3.5">
          {step.details.map((d) => (
            <li key={d} className="flex items-start gap-2.5">
              <span className="mt-[3px] grid h-[19px] w-[19px] flex-shrink-0 place-items-center rounded-full bg-ember-50 dark:bg-ember-500/15">
                <Check size={12} className="text-ember-600 dark:text-ember-300" strokeWidth={3} />
              </span>
              <span className="text-[15.5px] leading-[1.55] text-slate-700 dark:text-slate-300">{d}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="w-full min-w-0 flex-1 md:max-w-[440px] lg:max-w-[520px]">
        <Visual />
      </div>
    </div>
  );
}

export default function ProductSteps() {
  return (
    <section className="border-y border-slate-200 bg-sand-100 px-4 py-24 dark:border-white/[0.06] dark:bg-[#040404] sm:px-6 lg:px-8">
      <div className="mx-auto mb-14 max-w-[720px] text-center lg:mb-16">
        <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ember-500">How it works</p>
        <h2 className="mt-4 text-[clamp(28px,3.4vw,44px)] font-semibold leading-[1.08] tracking-[-0.025em] text-slate-900 dark:text-white">
          From signal to signed deal in four steps
        </h2>
        <p className="mx-auto mt-5 max-w-[600px] text-[17px] leading-[1.7] text-slate-600 dark:text-slate-400">
          Filter the universe, catch the move, score the window, launch the campaign. Each step hands
          its output to the next, so nothing is rebuilt by hand along the way.
        </p>
      </div>

      <div className="mx-auto max-w-[1180px]">
        {STEPS.map((s, i) => (
          <StepRow key={s.n} step={s} index={i} flipped={i % 2 !== 0} />
        ))}
      </div>
    </section>
  );
}
