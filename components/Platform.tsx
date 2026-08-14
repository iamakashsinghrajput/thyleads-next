'use client';

import { useEffect, useRef, useState } from 'react';
import {
  Building2, Check, Clock, Gauge, Layers, MapPin, Radar, Send, SlidersHorizontal, TrendingUp,
  UserRound, Users, Zap,
} from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';

/* ── Scroll fade-in hook ─────────────────────────────────────────────────── */
function useFadeIn(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ── Account record card ─────────────────────────────────────────────────
   Built in markup rather than shipped as an image: it stays sharp at any
   width, themes with the rest of the site, and the fields can be edited
   without round-tripping through a design file.
   ─────────────────────────────────────────────────────────────────────── */

/**
 * A real account, using a real logo from /public/logos.
 *
 * The first four rows are public facts about the company; the rest are Harvin's
 * own computed outputs (score, signal counts, recency) and are illustrative.
 * VERIFY the factual four before shipping — they describe a third party.
 *
 * Note the fourth row is "Listing", not "Funding": Walmart is publicly traded,
 * so a funding-round value would be nonsense on this account. If this card is
 * ever pointed at a venture-backed company, that row flips back.
 */
const ACCOUNT_FIELDS: {
  Icon: typeof Building2;
  label: string;
  value: string;
  badge?: boolean;
}[] = [
  { Icon: Building2,  label: 'Industry',        value: 'Retail · Omnichannel' },
  { Icon: Users,      label: 'Employees',       value: '2.1M' },
  { Icon: MapPin,     label: 'Headquarters',    value: 'Bentonville, US' },
  { Icon: TrendingUp, label: 'Listing',         value: 'Public · NYSE: WMT' },
  { Icon: Layers,     label: 'Tech stack',      value: '240', badge: true },
  { Icon: Zap,        label: 'Buying signals',  value: '5', badge: true },
  { Icon: Gauge,      label: 'Harvin score',    value: '96 / 100' },
  { Icon: UserRound,  label: 'Decision makers', value: '38', badge: true },
  { Icon: Clock,      label: 'Last signal',     value: '4 hours ago' },
];

/** Dimmed record peeking out behind the front card — depth without repeating
 *  readable content, which would just compete with the card in focus. */
function GhostCard() {
  return (
    <div
      aria-hidden="true"
      className="absolute bottom-5 left-4 top-16 w-[58%] overflow-hidden rounded-2xl border border-slate-200/70 bg-sand-50/60
                 dark:border-white/[0.06] dark:bg-white/[0.03]"
    >
      <div className="flex items-center gap-3 px-4 pb-4 pt-4">
        <span className="h-9 w-9 flex-shrink-0 rounded-lg bg-slate-200/70 dark:bg-white/[0.07]" />
        <span className="h-2.5 w-20 rounded-full bg-slate-200/70 dark:bg-white/[0.07]" />
      </div>
      {ACCOUNT_FIELDS.slice(0, 8).map((f, i) => (
        <div key={i} className="flex items-center gap-3 px-4 py-[9px]">
          <span className="grid h-7 w-7 flex-shrink-0 place-items-center rounded-md bg-slate-100 dark:bg-white/[0.05]">
            <f.Icon size={13} className="text-slate-300 dark:text-white/20" strokeWidth={1.8} />
          </span>
          <span className="h-2 flex-1 rounded-full bg-slate-200/60 dark:bg-white/[0.05]" />
        </div>
      ))}
    </div>
  );
}

function AccountRecordVisual() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-sand-200 p-4 dark:bg-[#141210] sm:p-5">
      <GhostCard />

      <div
        className="relative ml-[12%] overflow-hidden rounded-2xl border border-slate-200/80 bg-sand-50
                   shadow-[0_18px_44px_rgba(15,23,42,0.14)]
                   dark:border-white/[0.08] dark:bg-[#16130F] dark:shadow-[0_18px_44px_rgba(0,0,0,0.5)]"
      >
        {/* Header — the account, standing in for the reference's person */}
        <div className="flex items-center gap-3 border-b border-slate-200/70 bg-sand-100/70 px-4 py-3.5 dark:border-white/[0.06] dark:bg-white/[0.03]">
          {/* Official transparent mark, so it needs a white tile to sit on —
              the blue reads correctly against white in both themes. */}
          <span className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-xl border border-slate-200/80 bg-white p-2 dark:border-white/10">
            <img src="/logos/walmart.svg" alt="Walmart" className="h-auto w-full object-contain" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-[15px] font-bold tracking-[-0.01em] text-slate-900 dark:text-white">
              Walmart
            </p>
            <p className="truncate text-[12.5px] text-slate-500 dark:text-slate-400">walmart.com · High priority</p>
          </div>
        </div>

        <div className="px-4 py-1.5">
          {ACCOUNT_FIELDS.map((f) => (
            <div key={f.label} className="flex items-center gap-3 py-[7px]">
              <span className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-lg bg-sand-100 dark:bg-white/[0.05]">
                <f.Icon size={15} className="text-slate-500 dark:text-slate-400" strokeWidth={1.8} />
              </span>
              <span className="min-w-0 flex-1 truncate text-[13.5px] text-slate-700 dark:text-slate-300">
                {f.label}
              </span>
              {f.badge ? (
                <span className="flex-shrink-0 rounded-full bg-ember-50 px-2 py-0.5 text-[12px] font-semibold text-ember-600 dark:bg-ember-500/15 dark:text-ember-300">
                  {f.value}
                </span>
              ) : (
                <span className="flex-shrink-0 text-[13.5px] font-medium text-slate-900 dark:text-white">
                  {f.value}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Signal scoring / shortlist card ─────────────────────────────────────
   Scores are Harvin's own output and illustrative. Companies are named but
   shown with initial tiles rather than reconstructed logos — hand-drawn
   approximations of five more trademarks would be worse than none.
   ─────────────────────────────────────────────────────────────────────── */

const SHORTLIST_CUTOFF = 80;
const BELOW_CUTOFF_COUNT = 182;

/**
 * US enterprise targets, deliberately NOT Harvin's own customer list — this
 * card shows prospecting, so customer logos read wrong here.
 *
 * Marks are the official single-colour SVGs from simple-icons, tinted to each
 * brand's own hex. They are real assets, not hand-drawn approximations.
 *
 * Categories describe what each company actually does; scores, deltas and
 * signals are Harvin's own output and illustrative. Signals are phrased as
 * computed metrics ("42 open GTM roles") rather than named events ("acquired
 * X") — an invented acquisition attached to a real company is a false claim,
 * whereas a hiring tally reads as the product's own count.
 *
 * Only shortlisted accounts are named; the tail collapses to a count, which is
 * how a real console handles it and keeps any named company off the page as
 * low-scoring.
 */
const SCORED_ACCOUNTS = [
  { name: 'Snowflake', logo: '/logos/snowflake.svg', cat: 'Data cloud',
    score: 93, delta: 6,  signal: '42 open GTM roles',        when: '2d' },
  { name: 'Datadog',   logo: '/logos/datadog.svg',   cat: 'Observability',
    score: 88, delta: 11, signal: '9 new tools in stack',     when: '5d' },
  { name: 'HubSpot',   logo: '/logos/hubspot.svg',   cat: 'CRM & marketing',
    score: 84, delta: -2, signal: '23 open engineering roles', when: '1w' },
  { name: 'Okta',      logo: '/logos/okta.svg',      cat: 'Identity',
    score: 81, delta: 4,  signal: 'Headcount +18% QoQ',       when: '2w' },
];

/** Donut score. The value sits inside the ring rather than beside it, so the
 *  number stays the thing you read and the ring is just its weight. */
function ScoreRing({ value }: { value: number }) {
  const R = 17;
  const C = 2 * Math.PI * R;
  return (
    <span className="relative grid h-[44px] w-[44px] flex-shrink-0 place-items-center">
      <svg viewBox="0 0 44 44" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden="true">
        <circle cx="22" cy="22" r={R} fill="none" strokeWidth="3.5" className="stroke-slate-200 dark:stroke-white/[0.12]" />
        <circle
          cx="22" cy="22" r={R} fill="none" strokeWidth="3.5" strokeLinecap="round"
          className="stroke-ember-500"
          strokeDasharray={C}
          strokeDashoffset={C * (1 - value / 100)}
        />
      </svg>
      <span className="relative text-[13px] font-bold tabular-nums text-slate-900 dark:text-white">{value}</span>
    </span>
  );
}

function SignalScoringVisual() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-sand-200 p-4 dark:bg-[#141210] sm:p-5">
      <div
        className="overflow-hidden rounded-2xl border border-slate-200/80 bg-sand-50 shadow-[0_18px_44px_rgba(15,23,42,0.14)]
                   dark:border-white/[0.08] dark:bg-[#16130F] dark:shadow-[0_18px_44px_rgba(0,0,0,0.5)]"
      >
        <div className="flex items-center justify-between gap-3 border-b border-slate-200/70 bg-sand-100/70 px-4 py-3 dark:border-white/[0.06] dark:bg-white/[0.03]">
          <div className="min-w-0">
            <p className="truncate text-[13.5px] font-bold tracking-[-0.01em] text-slate-900 dark:text-white">
              Account scoring
            </p>
            <p className="truncate text-[12px] text-slate-500 dark:text-slate-400">
              248 accounts · B2B SaaS, United States
            </p>
          </div>
          <span className="flex flex-shrink-0 items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-ember-500" />
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Updated 4m ago</span>
          </span>
        </div>

        <div className="px-2 py-1">
          {SCORED_ACCOUNTS.map((a, i) => (
            <div
              key={a.name}
              className={`flex items-center gap-3 px-1.5 py-2.5 ${
                i > 0 ? 'border-t border-slate-200/70 dark:border-white/[0.05]' : ''
              }`}
            >
              {/* White tile so each mark keeps its own brand colours in both
                  themes — several of these are near-black on transparent. */}
              <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-lg border border-slate-200/80 bg-white p-1.5 dark:border-white/10">
                <img src={a.logo} alt="" aria-hidden="true" className="h-auto w-full object-contain" />
              </span>

              <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-2">
                  <p className="truncate text-[13.5px] font-semibold text-slate-900 dark:text-white">{a.name}</p>
                  <p className="truncate text-[11.5px] text-slate-400 dark:text-slate-500">{a.cat}</p>
                </div>
                <div className="mt-1 flex items-baseline gap-1.5">
                  <Zap size={11} className="translate-y-[1.5px] flex-shrink-0 text-ember-500" strokeWidth={2.4} />
                  <span className="min-w-0 truncate text-[12px] text-slate-600 dark:text-slate-300">{a.signal}</span>
                  <span className="flex-shrink-0 text-[11px] tabular-nums text-slate-400 dark:text-slate-500">{a.when}</span>
                </div>
              </div>

              <div className="flex flex-shrink-0 items-center gap-2">
                <span
                  className={`text-[11px] font-semibold tabular-nums ${
                    a.delta > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-500'
                  }`}
                >
                  {a.delta > 0 ? '+' : ''}{a.delta}
                </span>
                <ScoreRing value={a.score} />
              </div>
            </div>
          ))}

          {/* The cut, then the tail collapsed to a count — listing every
              low-scoring account is what a mockup does, not a console. */}
          <div className="flex items-center gap-2.5 px-1.5 pt-3">
            <span className="h-px flex-1 border-t border-dashed border-slate-300 dark:border-white/20" />
            <span className="flex-shrink-0 font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-slate-400 dark:text-slate-500">
              Shortlist cut · {SHORTLIST_CUTOFF}
            </span>
            <span className="h-px flex-1 border-t border-dashed border-slate-300 dark:border-white/20" />
          </div>
          <p className="px-1.5 pb-2.5 pt-2.5 text-[12px] text-slate-400 dark:text-slate-500">
            {BELOW_CUTOFF_COUNT} accounts below threshold · not surfaced
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Watchlist diagram ───────────────────────────────────────────────────
   A branch, not another list: one universe splitting into industry
   watchlists, each holding its own accounts. The connectors are what make
   it read as structure rather than three stacked cards.
   ─────────────────────────────────────────────────────────────────────── */

const WATCHLISTS = [
  {
    name: 'FinTech',
    tint: '#2F6AE8',
    total: 24,
    fresh: 3,
    logos: ['/logos/stripe.svg', '/logos/paypal.svg', '/logos/coinbase.svg'],
  },
  {
    name: 'MarTech',
    tint: '#C94C1E',
    total: 38,
    fresh: 5,
    logos: ['/logos/hubspot.svg', '/logos/salesforce.svg', '/logos/mailchimp.svg'],
  },
  {
    name: 'HRTech',
    tint: '#6455C8',
    total: 19,
    fresh: 2,
    logos: ['/logos/gusto.svg', '/logos/adp.svg', '/logos/greenhouse.svg'],
  },
];

/** Rows are equal height with equal gaps, so their centres land at 1/6, 3/6
 *  and 5/6 — which is what lets the connectors be pure CSS percentages
 *  instead of measured positions. */
const BRANCH_STOPS = ['16.667%', '50%', '83.333%'];

const UNIVERSE_TOTAL = 248;
const TRACKED_TOTAL = WATCHLISTS.reduce((n, w) => n + w.total, 0);

/**
 * Root node as a segmented donut rather than a plain count.
 *
 * The arcs are the branches: each segment is one watchlist, sized by its share
 * of the universe and drawn in that list's own colour. So the node reports how
 * much of the universe is actually tracked (81 of 248) instead of just
 * restating a number, and it stays correct automatically — everything is
 * derived from WATCHLISTS.
 */
function UniverseDonut() {
  const BOX = 104;
  const R = 39;
  const STROKE = 9;
  const C = 2 * Math.PI * R;
  const GAP = 5;
  let cursor = 0;

  return (
    <span className="relative grid flex-shrink-0 place-items-center" style={{ height: BOX, width: BOX }}>
      <svg viewBox={`0 0 ${BOX} ${BOX}`} className="absolute inset-0 h-full w-full -rotate-90" aria-hidden="true">
        <circle cx={BOX / 2} cy={BOX / 2} r={R} fill="none" strokeWidth={STROKE} className="stroke-slate-200 dark:stroke-white/[0.10]" />
        {WATCHLISTS.map((w) => {
          const len = Math.max(0, (w.total / UNIVERSE_TOTAL) * C - GAP);
          const offset = -cursor;
          cursor += len + GAP;
          return (
            <circle
              key={w.name}
              cx={BOX / 2} cy={BOX / 2} r={R}
              fill="none"
              stroke={w.tint}
              strokeWidth={STROKE}
              strokeDasharray={`${len} ${C - len}`}
              strokeDashoffset={offset}
            />
          );
        })}
      </svg>
      <span className="relative text-center leading-none">
        <span className="block text-[26px] font-bold tabular-nums leading-none tracking-[-0.02em] text-slate-900 dark:text-white">
          {UNIVERSE_TOTAL}
        </span>
        <span className="mt-1.5 block text-[8.5px] uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500">
          accounts
        </span>
      </span>
    </span>
  );
}

/** Accounts held by the card behind — deliberately none of the ones inside the
 *  watchlists, so the two layers read as different lists rather than a repeat. */
const RECENTLY_FUNDED = [
  { name: 'Snowflake', logo: '/logos/snowflake.svg' },
  { name: 'Datadog',   logo: '/logos/datadog.svg' },
  { name: 'Okta',      logo: '/logos/okta.svg' },
  { name: 'Walmart',   logo: '/logos/walmart.svg' },
];

/**
 * The card behind, offset so its right edge stays uncovered.
 *
 * Each row puts its logo on the RIGHT, because the right edge is the only part
 * that shows — a left-aligned layout would leave the exposed strip empty. It's
 * a flat list, not a branch, so the overlap reads as a second view of the
 * workspace rather than the same card duplicated behind itself.
 */
function RecentlyFundedCard() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-y-8 right-2 w-[56%] overflow-hidden rounded-2xl border border-slate-200/70 bg-sand-100 px-3.5 py-3
                 shadow-[0_6px_18px_rgba(15,23,42,0.06)] dark:border-white/[0.06] dark:bg-white/[0.05]"
    >
      <div className="flex items-center justify-between gap-2">
        <p className="truncate text-[11.5px] font-semibold text-slate-600 dark:text-slate-300">Recently funded</p>
        <span className="flex-shrink-0 text-[10.5px] tabular-nums text-slate-400 dark:text-slate-500">12</span>
      </div>

      {RECENTLY_FUNDED.map((a) => (
        <div key={a.name} className="mt-2.5 flex items-center justify-between gap-2">
          <span className="truncate text-[11.5px] text-slate-500 dark:text-slate-400">{a.name}</span>
          <span className="grid h-[22px] w-[22px] flex-shrink-0 place-items-center rounded-md border border-slate-200 bg-white p-[3px] dark:border-white/10">
            <img src={a.logo} alt="" className="h-auto w-full object-contain" />
          </span>
        </div>
      ))}
    </div>
  );
}

function WatchlistDiagram() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-sand-200 p-4 dark:bg-[#141210] sm:p-5">
      <RecentlyFundedCard />

      <div
        className="relative mr-[15%] overflow-hidden rounded-2xl border border-slate-200/80 bg-sand-50 shadow-[0_18px_44px_rgba(15,23,42,0.14)]
                   dark:border-white/[0.08] dark:bg-[#16130F] dark:shadow-[0_18px_44px_rgba(0,0,0,0.5)]"
      >
        <div className="flex items-center justify-between gap-3 border-b border-slate-200/70 bg-sand-100/70 px-4 py-3 dark:border-white/[0.06] dark:bg-white/[0.03]">
          <div className="min-w-0">
            <p className="truncate text-[13.5px] font-bold tracking-[-0.01em] text-slate-900 dark:text-white">Watchlists</p>
            <p className="truncate text-[12px] text-slate-500 dark:text-slate-400">
              {WATCHLISTS.length} lists · {TRACKED_TOTAL} of {UNIVERSE_TOTAL} accounts tracked
            </p>
          </div>
          <span className="flex flex-shrink-0 items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-ember-500" />
            <span className="text-[11px] text-slate-500 dark:text-slate-400">10 new signals</span>
          </span>
        </div>

        <div className="flex items-stretch px-3 py-4">
          {/* Root. The label lives INSIDE the ring so the node centres cleanly
              against the connector spine — a caption underneath would grow the
              box and shift the circle upward. */}
          <div className="flex flex-shrink-0 items-center">
            <UniverseDonut />
          </div>

          {/* Connectors — spine between the first and last branch, a stub to
              each row, and one stub back to the root. */}
          <div aria-hidden="true" className="relative w-7 flex-shrink-0">
            <span className="absolute left-0 top-1/2 h-px w-1/2 bg-slate-300 dark:bg-white/20" />
            <span
              className="absolute left-1/2 w-px bg-slate-300 dark:bg-white/20"
              style={{ top: BRANCH_STOPS[0], bottom: BRANCH_STOPS[0] }}
            />
            {BRANCH_STOPS.map((top) => (
              <span
                key={top}
                className="absolute left-1/2 h-px w-1/2 bg-slate-300 dark:bg-white/20"
                style={{ top }}
              />
            ))}
          </div>

          {/* Branches */}
          <div className="flex min-w-0 flex-1 flex-col gap-3">
            {WATCHLISTS.map((w) => (
              <div
                key={w.name}
                className="min-w-0 rounded-xl border border-slate-200 bg-white px-3 py-2.5 dark:border-white/[0.08] dark:bg-white/[0.03]"
              >
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 flex-shrink-0 rounded-full" style={{ background: w.tint }} />
                  <p className="min-w-0 flex-1 truncate text-[13px] font-semibold text-slate-900 dark:text-white">
                    {w.name}
                  </p>
                  <span className="flex-shrink-0 text-[11.5px] tabular-nums text-slate-400 dark:text-slate-500">
                    {w.total}
                  </span>
                </div>

                <div className="mt-2 flex items-center gap-2">
                  {/* Overlapping stack — the accounts held inside this list */}
                  <span className="flex items-center">
                    {w.logos.map((src, i) => (
                      <span
                        key={src}
                        className="grid h-[26px] w-[26px] place-items-center rounded-lg border border-slate-200 bg-white p-1 ring-2 ring-white dark:border-white/10 dark:ring-[#16130F]"
                        style={{ marginLeft: i === 0 ? 0 : '-7px', zIndex: w.logos.length - i }}
                      >
                        <img src={src} alt="" aria-hidden="true" className="h-auto w-full object-contain" />
                      </span>
                    ))}
                    <span className="ml-1.5 text-[11px] tabular-nums text-slate-400 dark:text-slate-500">
                      +{w.total - w.logos.length}
                    </span>
                  </span>

                  <span className="ml-auto flex flex-shrink-0 items-center gap-1">
                    <Zap size={10} className="text-ember-500" strokeWidth={2.6} />
                    <span className="text-[11px] tabular-nums text-slate-500 dark:text-slate-400">{w.fresh} new</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Look-a-like dashboard ───────────────────────────────────────────────
   A console bleeding off the right and bottom edges, with the assistant
   exchange floating over its lower-left corner. The crop is the point: a
   fully-contained screenshot reads as a picture of an app, a cropped one
   reads as the app itself continuing past the frame.
   ─────────────────────────────────────────────────────────────────────── */

/** Smooth cubic path through evenly spaced values (0–100, 100 = top). */
function linePath(values: number[], w: number, h: number) {
  const step = w / (values.length - 1);
  const pts = values.map((v, i) => [i * step, h - (v / 100) * h] as const);
  return pts.reduce((d, [x, y], i) => {
    if (i === 0) return `M ${x} ${y}`;
    const [px, py] = pts[i - 1];
    const cx = (px + x) / 2;
    return `${d} C ${cx} ${py}, ${cx} ${y}, ${x} ${y}`;
  }, '');
}

const MATCH_SERIES    = [52, 40, 63, 48, 70, 45, 78, 88];
const BASELINE_SERIES = [24, 16, 38, 55, 42, 66, 52, 58];

/** Real data-platform companies — genuine peers of the seed account, which is
 *  the point: a lookalike list only lands if the matches are recognisably
 *  similar. Match percentages are Harvin's output and illustrative. */
const LOOKALIKE_MATCHES = [
  { name: 'Databricks', logo: '/logos/databricks.svg', cat: 'Data + AI platform', match: 96, picked: true },
  { name: 'MongoDB',    logo: '/logos/mongodb.svg',    cat: 'Developer data platform', match: 91, picked: true },
  { name: 'ClickHouse', logo: '/logos/clickhouse.svg', cat: 'Analytics database', match: 88, picked: true },
  { name: 'Elastic',    logo: '/logos/elastic.svg',    cat: 'Search & analytics', match: 84, picked: false },
];

/** The traits the match is running on — this is the control the user actually
 *  operates, so it belongs on screen, not just in the copy. */
const MATCH_TRAITS = [
  { label: 'Category',   on: true },
  { label: 'Tech stack', on: true },
  { label: 'Headcount',  on: true },
  { label: 'Region',     on: false },
];

const PICKED_COUNT = LOOKALIKE_MATCHES.filter((m) => m.picked).length;

function LookalikeVisual() {
  const W = 200;
  const H = 84;
  const match = linePath(MATCH_SERIES, W, H);
  const baseline = linePath(BASELINE_SERIES, W, H);

  return (
    <div className="relative overflow-hidden rounded-2xl bg-sand-200 p-5 dark:bg-[#141210] sm:p-6">
      {/* Device — a dark bezel wrapping the screen, open on the right. The
          negative margins push it past the frame's padding and the frame's
          overflow-hidden does the cropping; the bezel is what makes it read as
          hardware rather than a floating card.

          The console is deliberately oversized for its frame: the reference is
          a zoom into a dashboard, so its type is large and the second panel is
          cut off. Scaling the type down to fit both panels would lose exactly
          the quality being copied. */}
      <div className="relative -mb-20 -mr-14 ml-[5%] rounded-l-[32px] bg-[#141414] py-[13px] pl-[13px] shadow-[0_26px_64px_rgba(15,23,42,0.3)]">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-[3px] rounded-l-[32px] bg-gradient-to-b from-white/30 via-white/[0.06] to-transparent"
        />

        <div className="overflow-hidden rounded-l-[22px] bg-white pt-5 dark:bg-[#16130F]">
          <h4 className="px-7 pb-3 text-[22px] font-bold tracking-[-0.025em] text-slate-900 dark:text-white">
            Look-a-like Accounts
          </h4>

          {/* Step 1 — which traits the match runs on */}
          <div className="flex flex-wrap items-center gap-2 px-7 pb-4">
            <SlidersHorizontal size={15} className="flex-shrink-0 text-slate-400 dark:text-slate-500" strokeWidth={2} />
            <span className="mr-1 text-[12.5px] text-slate-500 dark:text-slate-400">Matching on</span>
            {MATCH_TRAITS.map((t) => (
              <span
                key={t.label}
                className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12.5px] font-medium ${
                  t.on
                    ? 'bg-ember-50 text-ember-600 ring-1 ring-ember-200 dark:bg-ember-500/15 dark:text-ember-300 dark:ring-ember-500/30'
                    : 'text-slate-400 ring-1 ring-slate-200 dark:text-slate-500 dark:ring-white/10'
                }`}
              >
                {t.on && <Check size={12} strokeWidth={3} />}
                {t.label}
              </span>
            ))}
          </div>

          <div className="flex gap-4 border-t border-slate-200/70 px-7 py-4 dark:border-white/[0.06]">
            {/* Top matches — the product's actual output, so it leads. Charts
                describe the matching; this shows it. */}
            <div className="w-[72%] flex-shrink-0 rounded-2xl border border-slate-200/80 bg-sand-50 dark:border-white/[0.08] dark:bg-white/[0.03]">
              <div className="flex items-baseline justify-between border-b border-slate-200/70 px-4 py-2.5 dark:border-white/[0.06]">
                <p className="text-[15.5px] font-bold tracking-[-0.01em] text-slate-900 dark:text-white">Top matches</p>
                <p className="text-[13px] text-slate-400 dark:text-slate-500">of 248</p>
              </div>
              <div className="px-4 py-1.5">
                {LOOKALIKE_MATCHES.map((m, i) => (
                  <div
                    key={m.name}
                    className={`flex items-center gap-3 py-[7px] ${i > 0 ? 'border-t border-slate-200/70 dark:border-white/[0.05]' : ''}`}
                  >
                    {/* Step 2 — shortlist */}
                    <span
                      className={`grid h-[18px] w-[18px] flex-shrink-0 place-items-center rounded-[5px] ${
                        m.picked
                          ? 'bg-ember-500 text-white'
                          : 'ring-1 ring-slate-300 dark:ring-white/20'
                      }`}
                    >
                      {m.picked && <Check size={12} strokeWidth={3.2} />}
                    </span>
                    <span className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-lg border border-slate-200 bg-white p-1.5 dark:border-white/10">
                      <img src={m.logo} alt="" aria-hidden="true" className="h-auto w-full object-contain" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[13.5px] font-semibold text-slate-900 dark:text-white">{m.name}</p>
                      <p className="truncate text-[11.5px] text-slate-400 dark:text-slate-500">{m.cat}</p>
                    </div>
                    <span className="flex-shrink-0 rounded-full bg-ember-50 px-2 py-0.5 text-[12px] font-bold tabular-nums text-ember-600 dark:bg-ember-500/15 dark:text-ember-300">
                      {m.match}%
                    </span>
                  </div>
                ))}
              </div>

              {/* Step 3 — the action the whole module exists for */}
              <div className="border-t border-slate-200/70 px-4 py-3 dark:border-white/[0.06]">
                <span className="flex items-center justify-center gap-2 rounded-xl bg-ember-500 py-2.5 text-[14px] font-semibold text-white shadow-[0_6px_16px_rgba(201,76,30,0.3)]">
                  <Send size={15} strokeWidth={2.2} />
                  Launch campaign to {PICKED_COUNT}
                </span>
              </div>
            </div>

            {/* Similarity trend — clipped by the frame, as in the reference */}
            <div className="w-[72%] flex-shrink-0 rounded-2xl border border-slate-200/80 bg-sand-50 dark:border-white/[0.08] dark:bg-white/[0.03]">
              <p className="border-b border-slate-200/70 px-4 py-2.5 text-[15.5px] font-bold tracking-[-0.01em] text-slate-900 dark:border-white/[0.06] dark:text-white">
                Similarity to Snowflake
              </p>
              <div className="px-4 py-3.5">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-2">
                    <span className="h-[9px] w-[9px] rounded-full bg-ember-500" />
                    <span className="text-[12.5px] text-slate-500 dark:text-slate-400">Match</span>
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="h-[9px] w-[9px] rounded-full border border-dashed border-ember-400" />
                    <span className="text-[12.5px] text-slate-500 dark:text-slate-400">Baseline</span>
                  </span>
                </div>

                <div className="mt-3 flex gap-2.5">
                  <div className="flex flex-col justify-between py-[2px] text-[11px] tabular-nums text-slate-400 dark:text-slate-500">
                    <span>100</span><span>50</span><span>0</span>
                  </div>
                  <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="h-[150px] w-full" aria-hidden="true">
                    <defs>
                      <linearGradient id="lookalikeFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#C94C1E" stopOpacity="0.16" />
                        <stop offset="100%" stopColor="#C94C1E" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    {[0.25, 0.5, 0.75].map((f) => (
                      <line key={f} x1="0" y1={H * f} x2={W} y2={H * f} className="stroke-slate-200 dark:stroke-white/10" strokeWidth="0.6" />
                    ))}
                    <path d={`${match} L ${W} ${H} L 0 ${H} Z`} fill="url(#lookalikeFill)" />
                    <path d={baseline} fill="none" stroke="#E56B2C" strokeWidth="2" strokeDasharray="4 3.5" vectorEffect="non-scaling-stroke" />
                    <path d={match} fill="none" stroke="#C94C1E" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Third row, cut by the frame. The reference shows a cropped card
              here (the half-visible "31") — it is what implies the page keeps
              going below the fold rather than ending at the crop. */}
          <div className="flex gap-4 border-t border-slate-200/70 px-7 pb-8 pt-4 dark:border-white/[0.06]">
            <div className="w-[72%] flex-shrink-0 rounded-2xl border border-slate-200/80 bg-sand-50 px-4 py-3.5 dark:border-white/[0.08] dark:bg-white/[0.03]">
              <p className="text-[12.5px] text-slate-500 dark:text-slate-400">New matches this week</p>
              <p className="mt-1.5 font-bricolage text-[34px] font-bold leading-none tracking-[-0.03em] text-slate-900 dark:text-white">31</p>
            </div>
            <div className="w-[72%] flex-shrink-0 rounded-2xl border border-slate-200/80 bg-sand-50 px-4 py-3.5 dark:border-white/[0.08] dark:bg-white/[0.03]">
              <p className="text-[12.5px] text-slate-500 dark:text-slate-400">Avg. match score</p>
              <p className="mt-1.5 font-bricolage text-[34px] font-bold leading-none tracking-[-0.03em] text-slate-900 dark:text-white">86</p>
            </div>
          </div>
        </div>
      </div>

      {/* Assistant exchange, floating over the console's lower-left corner */}
      <div className="absolute bottom-5 left-3 flex flex-col items-start gap-2.5 sm:left-5">
        <span className="rounded-xl bg-ember-500 px-4 py-2.5 text-[14px] font-medium text-white shadow-[0_10px_24px_rgba(201,76,30,0.35)]">
          Find accounts like Snowflake
        </span>
        <span className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 shadow-[0_10px_24px_rgba(15,23,42,0.14)] dark:border-white/10 dark:bg-[#1a1714]">
          <Radar size={17} className="flex-shrink-0 text-ember-500" strokeWidth={2.2} />
          <span className="text-[14px] text-slate-700 dark:text-slate-200">Scanning 248 accounts now</span>
        </span>
      </div>
    </div>
  );
}

/* ── Module data ─────────────────────────────────────────────────────────── */
type Module = {
  title: string;
  desc: string;
  details: string[];
  stat: string;
  statLabel: string;
  screenshot: string;
  screenshotDark: string;
  /** Rendered instead of the screenshot when present. */
  Visual?: () => React.JSX.Element;
  /** Gives the visual more of the row — for modules whose visual is the pitch. */
  wide?: boolean;
};

const MODULES: Module[] = [
  {
    title: 'Account Intelligence',
    Visual: AccountRecordVisual,
    desc: 'Every account is a living intelligence entity. Search and filter your account universe by geography, category, employee size, funding stage, business motion, or priority score.',
    details: ['Living intelligence per account', 'Multi-dimension filters', 'Dynamic priority score'],
    stat: 'Live',
    statLabel: 'scoring',
    screenshot: '/dashboard-preview.png',
    screenshotDark: '/dashboard-preview-dark.png',
  },
  {
    title: 'AI Signal Detection',
    Visual: SignalScoringVisual,
    desc: 'Score accounts from live signals — funding, hiring, scaling & expansion, M&A and layoffs. Everything above your threshold is shortlisted automatically, with the evidence behind every score.',
    details: ['Funding · Hiring · Scaling', 'M&A · Firing', 'Evidence for every signal'],
    stat: '5',
    statLabel: 'signal types',
    screenshot: '/tech-scanner.png',
    screenshotDark: '/tech-scanner-dark.png',
  },
  {
    title: 'Watchlists',
    Visual: WatchlistDiagram,
    desc: 'Group accounts into focused lists — by industry, by funding stage, by competitor footprint. Each list tracks its own accounts and alerts you the second something changes.',
    details: ['Filters, manual, or CSV import', 'Slack & email alerts', 'Aggregate trends per list'],
    stat: 'Real-time',
    statLabel: 'alerts',
    screenshot: '/Watchlist.png',
    screenshotDark: '/Watchlist-dark.png',
  },
  {
    title: 'Look-a-like Accounts',
    Visual: LookalikeVisual,
    wide: true,
    desc: 'Point Harvin at a customer you already won, choose what actually makes it a fit — category, tech stack, headcount, region — and it returns the accounts that look like it. Tick the ones worth pursuing and launch a campaign to them without leaving the screen.',
    details: [
      'Seed from any account or domain',
      'Choose which traits to match on',
      'Every match scored and explained',
      'Shortlist and launch in one flow',
    ],
    stat: '248',
    statLabel: 'accounts searched',
    screenshot: '/Look-a-Like.png',
    screenshotDark: '/Look-a-Like-dark.png',
  },
];

export default function Platform() {
  const header = useFadeIn();
  const { isDark } = useTheme();

  return (
    <section className="relative py-28 bg-sand-100 dark:bg-slate-950 border-t border-slate-200 dark:border-white/[0.06] overflow-hidden">

      {/* ── Header ─────────────────────────────────────────────────── */}
      <div
        ref={header.ref}
        className={`px-6 pb-20 transition-all duration-700 ${header.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      >
        <div className="max-w-[720px] mx-auto text-center">
          <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500 mb-5">
            The Platform
          </p>
          <h2 className="text-[clamp(28px,4.2vw,48px)] font-semibold leading-[1.08] tracking-[-0.025em] text-slate-900 dark:text-white mb-4">
            What&rsquo;s inside
          </h2>
          <p className="text-[16px] leading-relaxed text-slate-500 dark:text-slate-400 max-w-[480px] mx-auto">
            Four modules. One platform. Built for GTM teams running intelligence-led outbound.
          </p>
        </div>
      </div>

      {/* ── Modules ──────────────────────────────────────────────── */}
      <div className="max-w-[1100px] mx-auto px-6">
        {MODULES.map((mod, i) => (
          <ModuleRow key={mod.title} mod={mod} index={i} flipped={i % 2 !== 0} isDark={isDark} />
        ))}
      </div>
    </section>
  );
}

/* ── Single module row — alternates text left / screenshot right ──────── */
function ModuleRow({ mod, index, flipped, isDark }: {
  mod: typeof MODULES[number];
  index: number;
  flipped: boolean;
  isDark: boolean;
}) {
  const row = useFadeIn(0.15);

  return (
    <div
      ref={row.ref}
      className={`flex flex-col ${flipped ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-10 md:gap-12 lg:gap-16 mb-14 sm:mb-18 lg:mb-24 last:mb-0
                   transition-all duration-700 ${row.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* ── Text side ── */}
      <div className="min-w-0 max-w-lg flex-1">
        {/* Index, rule and stat on one line — the old oversized ghost numeral
            competed with the heading for first read. */}
        <div className="mb-5 flex items-center gap-3.5">
          <span className="font-mono text-[12px] font-semibold tracking-[0.16em] text-ember-500">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span aria-hidden="true" className="h-px flex-1 bg-slate-200 dark:bg-white/[0.10]" />
          <span
            className="flex-shrink-0 rounded-full border border-slate-200 bg-sand-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500
                       dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-slate-400"
          >
            {mod.stat} {mod.statLabel}
          </span>
        </div>

        {/* Display face + tighter tracking: at this size the body sans reads
            flat, and negative tracking is what stops large type looking loose. */}
        <h3 className="font-bricolage text-[27px] font-bold leading-[1.1] tracking-[-0.025em] text-slate-900 dark:text-white sm:text-[33px]">
          {mod.title}
        </h3>

        <p className="mt-4 text-[16px] leading-[1.65] text-slate-600 dark:text-slate-400">
          {mod.desc}
        </p>

        {/* Checklist reads as substance; the old pills read as tags. */}
        <ul className="mt-6 flex flex-col gap-2.5">
          {mod.details.map((d) => (
            <li key={d} className="flex items-start gap-2.5">
              <span className="mt-[3px] grid h-[17px] w-[17px] flex-shrink-0 place-items-center rounded-full bg-ember-50 dark:bg-ember-500/15">
                <Check size={11} className="text-ember-600 dark:text-ember-300" strokeWidth={3} />
              </span>
              <span className="text-[14.5px] leading-[1.5] text-slate-700 dark:text-slate-300">{d}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* ── Visual side — a built component when the module supplies one,
             otherwise the screenshot pair ── */}
      <div className={`min-w-0 w-full flex-1 ${mod.wide ? 'md:max-w-[520px] lg:max-w-[640px]' : 'md:max-w-[440px] lg:max-w-[520px]'}`}>
        {mod.Visual ? (
          <mod.Visual />
        ) : (
          <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-white/[0.08] shadow-[0_8px_40px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.3)] bg-sand-100 dark:bg-white/[0.02]">
            <img
              src={isDark ? mod.screenshotDark : mod.screenshot}
              alt={`${mod.title} — HarvinAI`}
              className="w-full h-auto block"
              loading="lazy"
            />
          </div>
        )}
      </div>
    </div>
  );
}
