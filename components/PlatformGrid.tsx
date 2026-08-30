'use client';

import { useEffect, useRef, useState } from 'react';
import {
  Bookmark, Building2, CalendarDays, ChartColumn, Check, Copy, Gauge, LayoutTemplate, Mail, Network, Phone, Radar, Users,
} from 'lucide-react';
import {
  ACCOUNT_FIELDS, BELOW_CUTOFF_COUNT, LOOKALIKE_MATCHES, MATCH_TRAITS,
  PICKED_COUNT, SCORED_ACCOUNTS, SHORTLIST_CUTOFF, TRACKED_TOTAL, WATCHLISTS,
} from '@/components/Platform';

/**
 * The Platform, as a 2×2 card grid.
 *
 * Each card is a tinted visual panel with a product fragment floating in it,
 * over a white block carrying the icon, name, description and a link into the
 * deep dive. The fragments deliberately BLEED past the panel's bottom edge —
 * a fragment fully contained inside the tint reads as an illustration, one cut
 * off by the edge reads as a real screen continuing underneath.
 *
 * Each card carries an id slugged from its own title, which is what the
 * navbar's Platform menu deep-links to. /product used to hold a second copy of
 * this material and now redirects to /platform, so the cards no longer carry an
 * "Explore …" link — it would only have pointed at the page you are on.
 *
 * The four visuals render the SAME data as the deep-dive rows on /platform —
 * ACCOUNT_FIELDS, SCORED_ACCOUNTS, WATCHLISTS and LOOKALIKE_MATCHES are
 * imported from Platform.tsx rather than restated here, so the summary card
 * and the module it links to can never disagree. Edit the data there.
 */

/* ── shared bits ───────────────────────────────────────────────────────── */

/** Tinted ground for a visual. `bleed` cards run their fragment off the bottom. */
function Panel({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-[286px] overflow-hidden bg-sand-200 dark:bg-[#141210] sm:h-[318px]">
      {children}
    </div>
  );
}

function Logo({ slug }: { slug: string }) {
  return (
    <span className="grid h-7 w-7 flex-shrink-0 place-items-center rounded-lg border border-slate-200 bg-white p-1 dark:border-white/10">
      <img src={`/logos/${slug}.svg`} alt="" aria-hidden="true" className="h-auto w-full object-contain" />
    </span>
  );
}


/* ── 01 · Account Intelligence ─────────────────────────────────────────── */
/**
 * The record, laid out rather than listed.
 *
 * Nine equal rows read as a data dump and ran past the panel's bottom edge; a
 * fragment that bleeds only works when what's cut off is obviously more of the
 * same. Here the fields are ranked instead: the score is the headline, four
 * firmographics sit in a 2×2 block, and the three live counts run along a
 * footer strip. That fits the panel with room to spare and gives the card a
 * shape.
 *
 * Fields are still looked up from Platform's ACCOUNT_FIELDS by label, so the
 * values stay sourced from the deep dive. A renamed label drops its tile
 * rather than crashing — see `field`.
 */
const field = (label: string) => ACCOUNT_FIELDS.find((f) => f.label === label);

const RECORD_GRID = ['Employees', 'Headquarters', 'Listing', 'Tech stack'];
/** Footer tiles are narrow, so each carries a short unit instead of its full
 *  label — a bare "5" says nothing. '' means the value already reads alone. */
const RECORD_FOOT: [label: string, unit: string][] = [
  ['Buying signals', 'signals'],
  ['Decision makers', 'contacts'],
  ['Last signal', ''],
];

/** '96 / 100' → 96, so the ring can never drift from the printed value. */
const HARVIN_SCORE = parseInt(field('Harvin score')?.value ?? '0', 10);

function AccountRecordCard() {
  const R = 21;
  const C = 2 * Math.PI * R;
  const industry = field('Industry');

  return (
    <Panel>
      <div className="absolute inset-x-7 inset-y-7 flex flex-col overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-[0_18px_44px_rgba(15,23,42,0.13)] dark:border-white/10 dark:bg-[#16130F]">
        {/* ── Who, and the score that ranks them ───────────────────────── */}
        <div className="flex items-center gap-3 border-b border-slate-200/70 px-4 py-3 dark:border-white/[0.06]">
          <Logo slug="walmart" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[14px] font-bold tracking-[-0.01em] text-slate-900 dark:text-white">Walmart</p>
            <p className="truncate text-[11px] text-slate-500 dark:text-slate-400">{industry?.value}</p>
          </div>

          <span className="relative grid h-[54px] w-[54px] flex-shrink-0 place-items-center">
            <svg viewBox="0 0 54 54" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden="true">
              <circle cx="27" cy="27" r={R} fill="none" strokeWidth="5" className="stroke-slate-200 dark:stroke-white/[0.12]" />
              <circle
                cx="27" cy="27" r={R} fill="none" strokeWidth="5" strokeLinecap="round"
                className="stroke-ember-500" strokeDasharray={C} strokeDashoffset={C * (1 - HARVIN_SCORE / 100)}
              />
            </svg>
            <span className="relative font-bricolage text-[16px] font-bold tabular-nums leading-none text-slate-900 dark:text-white">
              {HARVIN_SCORE}
            </span>
          </span>
        </div>

        {/* ── The firmographics, as tiles ──────────────────────────────── */}
        <div className="grid flex-1 grid-cols-2">
          {RECORD_GRID.map((label, i) => {
            const f = field(label);
            if (!f) return null;
            return (
              <div
                key={label}
                className={`min-w-0 px-4 py-3 ${i % 2 === 0 ? 'border-r' : ''} ${i < 2 ? 'border-b' : ''}
                            border-slate-200/70 dark:border-white/[0.06]`}
              >
                <p className="flex items-center gap-1.5 text-[10.5px] font-medium uppercase tracking-[0.07em] text-slate-400 dark:text-slate-500">
                  <f.Icon size={11} strokeWidth={2.1} className="flex-shrink-0" />
                  <span className="truncate">{f.label}</span>
                </p>
                <p className="mt-1.5 truncate text-[14px] font-bold tracking-[-0.01em] text-slate-900 dark:text-white">
                  {f.value}
                </p>
              </div>
            );
          })}
        </div>

        {/* ── What's live on the account right now ─────────────────────── */}
        <div className="flex items-center gap-2 border-t border-slate-200/70 bg-sand-50 px-3 py-2.5 dark:border-white/[0.06] dark:bg-white/[0.03]">
          {RECORD_FOOT.map(([label, unit]) => {
            const f = field(label);
            if (!f) return null;
            return (
              <span
                key={label}
                className="flex min-w-0 flex-1 items-center gap-1.5 rounded-lg bg-white px-2 py-1.5 ring-1 ring-slate-200/80 dark:bg-white/[0.06] dark:ring-white/10"
              >
                <f.Icon size={12} strokeWidth={2.2} className="flex-shrink-0 text-ember-500" />
                <span className="min-w-0 truncate text-[11.5px] font-bold tabular-nums text-slate-900 dark:text-white">
                  {f.value}
                </span>
                {unit && (
                  <span className="truncate text-[11px] text-slate-500 dark:text-slate-400">{unit}</span>
                )}
              </span>
            );
          })}
        </div>
      </div>
    </Panel>
  );
}

/* ── 02 · AI Signal Detection ──────────────────────────────────────────── */
/**
 * The detection path, not another ranked list.
 *
 * Cards 03 and 04 are already row lists, and card 01 is a record — a fourth
 * list said nothing new. This one draws what the module actually claims: five
 * signal types feed one score, and the score is what splits the universe into
 * a named shortlist and a collapsed tail.
 *
 * The fan converges on the scoring box rather than decorating around it, so
 * the direction of the diagram carries the meaning. Strand x-positions are the
 * chip column centres, derived from SIGNAL_TYPES.length.
 */
const SIGNAL_TYPES = ['Funding', 'Hiring', 'Scaling', 'M&A', 'Layoffs'];

function SignalFan() {
  const W = 100;
  const H = 34;
  const cx = W / 2;
  const step = W / SIGNAL_TYPES.length;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="h-[34px] w-full" aria-hidden="true" fill="none">
      {SIGNAL_TYPES.map((t, i) => {
        const x = step * i + step / 2;
        return (
          <path
            key={t}
            d={`M ${x} 0 C ${x} ${H * 0.55}, ${cx} ${H * 0.45}, ${cx} ${H}`}
            stroke="#C94C1E"
            strokeOpacity={0.42}
            strokeWidth="0.7"
            vectorEffect="non-scaling-stroke"
          />
        );
      })}
    </svg>
  );
}

function SignalShortlistCard() {
  return (
    <Panel>
      <div className="absolute inset-x-7 inset-y-7 flex flex-col overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-[0_18px_44px_rgba(15,23,42,0.13)] dark:border-white/10 dark:bg-[#16130F]">
        <div className="flex items-center justify-between gap-2 border-b border-slate-200/70 px-4 py-2.5 dark:border-white/[0.06]">
          <p className="flex items-center gap-2 text-[12.5px] font-bold text-slate-900 dark:text-white">
            <Radar size={13} strokeWidth={2.4} className="text-ember-500" />
            Signal detection
          </p>
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-slate-400 dark:text-slate-500">
            {SIGNAL_TYPES.length} types
          </span>
        </div>

        <div className="flex flex-1 flex-col justify-center px-3.5 py-3">
          {/* what is watched */}
          <div className="grid grid-cols-5 gap-1">
            {SIGNAL_TYPES.map((t) => (
              <span
                key={t}
                className="truncate rounded-md bg-sand-100 px-1 py-[5px] text-center text-[10px] font-semibold text-slate-700 dark:bg-white/[0.07] dark:text-slate-200"
              >
                {t}
              </span>
            ))}
          </div>

          <SignalFan />

          {/* what they feed */}
          <div className="mx-auto flex items-center gap-2 rounded-lg bg-ember-500 px-3 py-1.5 shadow-[0_6px_16px_rgba(201,76,30,0.28)]">
            <Gauge size={13} className="text-white" strokeWidth={2.3} />
            <span className="text-[11.5px] font-bold text-white">Harvin score</span>
            <span className="rounded-full bg-white/20 px-1.5 py-[1px] font-mono text-[10px] font-semibold tabular-nums text-white">
              ≥ {SHORTLIST_CUTOFF}
            </span>
          </div>

          <span aria-hidden="true" className="mx-auto h-4 w-px bg-ember-500/40" />

          {/* what comes out — only the shortlist is named */}
          <div className="grid grid-cols-4 gap-1.5">
            {SCORED_ACCOUNTS.map((a) => (
              <span
                key={a.name}
                className="flex min-w-0 flex-col items-center gap-1 rounded-lg border border-slate-200 bg-white px-1 py-2 dark:border-white/10 dark:bg-white/[0.05]"
              >
                <img src={a.logo} alt="" aria-hidden="true" className="h-[15px] w-[15px] object-contain" />
                <span className="font-bricolage text-[13px] font-bold tabular-nums leading-none text-slate-900 dark:text-white">
                  {a.score}
                </span>
                <span className="w-full truncate text-center text-[9px] leading-none text-slate-400 dark:text-slate-500">
                  {a.name}
                </span>
              </span>
            ))}
          </div>
        </div>

        <p className="border-t border-slate-200/70 bg-sand-50 px-4 py-2 text-[11px] text-slate-400 dark:border-white/[0.06] dark:bg-white/[0.03] dark:text-slate-500">
          <span className="font-semibold tabular-nums text-slate-500 dark:text-slate-400">{BELOW_CUTOFF_COUNT}</span>{' '}
          accounts below cutoff
        </p>
      </div>
    </Panel>
  );
}

/* ── 03 · Watchlists ───────────────────────────────────────────────────── */
/**
 * The My Watchlists tab as it appears in the app.
 *
 * Charts and diagrams read as marketing illustration; the point of these cards
 * is that the product already looks like this. So the fragment is built to the
 * dashboard's own idiom — left rail of lists, toolbar with a result count,
 * account rows with a checkbox, mark, name, category chip and a badge in the
 * 38×24 bordered style app/dashboard uses for Harvin score.
 *
 * Only the first watchlist's members are listed, because that is what a rail
 * selection actually does. The rail counts still come from WATCHLISTS.
 */
const ACTIVE_LIST = WATCHLISTS[0];

function Checkbox({ on }: { on: boolean }) {
  return (
    <span
      className={`grid h-[15px] w-[15px] flex-shrink-0 place-items-center rounded-[4px] border ${
        on ? 'border-ember-500 bg-ember-500' : 'border-slate-300 bg-white dark:border-white/20 dark:bg-transparent'
      }`}
    >
      {on && <Check size={10} className="text-white" strokeWidth={3.4} />}
    </span>
  );
}

function WatchlistCard() {
  return (
    <Panel>
      <div className="absolute inset-x-7 inset-y-7 flex flex-col overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-[0_18px_44px_rgba(15,23,42,0.13)] dark:border-white/10 dark:bg-[#16130F]">
        {/* toolbar */}
        <div className="flex items-center justify-between gap-2 border-b border-slate-200/70 px-3 py-2 dark:border-white/[0.06]">
          <p className="flex items-center gap-2 text-[12.5px] font-bold text-slate-900 dark:text-white">
            <Bookmark size={13} strokeWidth={2.4} className="text-ember-500" />
            My Watchlists
          </p>
          <span className="rounded-md bg-sand-100 px-2 py-[2px] text-[10.5px] font-bold tabular-nums text-slate-500 dark:bg-white/[0.07] dark:text-slate-400">
            {TRACKED_TOTAL} accounts
          </span>
        </div>

        <div className="flex min-h-0 flex-1">
          {/* rail */}
          <div className="w-[104px] flex-shrink-0 space-y-1 border-r border-slate-200/70 p-2 dark:border-white/[0.06]">
            {WATCHLISTS.map((w, i) => (
              <div
                key={w.name}
                className={`rounded-lg px-2 py-1.5 ${
                  i === 0 ? 'bg-ember-500/[0.10] ring-1 ring-ember-500/25' : ''
                }`}
              >
                <p className="flex items-center gap-1.5">
                  <span aria-hidden="true" className="h-[6px] w-[6px] flex-shrink-0 rounded-full" style={{ background: w.tint }} />
                  <span className="min-w-0 truncate text-[11px] font-bold text-slate-900 dark:text-white">{w.name}</span>
                </p>
                <p className="mt-0.5 pl-[13px] text-[10px] tabular-nums text-slate-400 dark:text-slate-500">
                  {w.total} · +{w.fresh} new
                </p>
              </div>
            ))}
          </div>

          {/* rows */}
          <div className="min-w-0 flex-1 divide-y divide-slate-200/70 dark:divide-white/[0.06]">
            {ACTIVE_LIST.members.map((m) => (
              <div key={m.name} className="flex items-center gap-2 px-3 py-[9px]">
                <Checkbox on />
                <span className="grid h-6 w-6 flex-shrink-0 place-items-center rounded-md border border-slate-200 bg-white p-1 dark:border-white/10">
                  <img src={m.logo} alt="" aria-hidden="true" className="h-auto w-full object-contain" />
                </span>
                <span className="min-w-0 flex-1 truncate text-[12px] font-bold text-slate-900 dark:text-white">
                  {m.name}
                </span>
                <span className="hidden flex-shrink-0 truncate rounded-full border border-slate-200/80 bg-sand-100 px-2 py-[2px] text-[10px] font-medium text-slate-600 dark:border-white/[0.08] dark:bg-white/[0.06] dark:text-slate-300 sm:block">
                  {m.cat}
                </span>
              </div>
            ))}

            <p className="px-3 py-[9px] text-[10.5px] text-slate-400 dark:text-slate-500">
              +{ACTIVE_LIST.total - ACTIVE_LIST.members.length} more in {ACTIVE_LIST.name}
            </p>
          </div>
        </div>
      </div>
    </Panel>
  );
}

/* ── 04 · Look-a-like Accounts ─────────────────────────────────────────── */
/**
 * The LookALike Brands tab: seed at the top, traits you match on, results with
 * their scores, and the action bar that turns a selection into a watchlist.
 *
 * The match percentage uses the dashboard's own score-badge treatment — a
 * fixed-width bordered pill, tinted by band — so a visitor who later opens the
 * product recognises the screen.
 */
function LookalikeCard() {
  return (
    <Panel>
      <div className="absolute inset-x-7 inset-y-7 flex flex-col overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-[0_18px_44px_rgba(15,23,42,0.13)] dark:border-white/10 dark:bg-[#16130F]">
        {/* seed */}
        <div className="flex items-center gap-2 border-b border-slate-200/70 p-2 dark:border-white/[0.06]">
          <span className="flex min-w-0 flex-1 items-center gap-2 rounded-lg border border-slate-200 bg-sand-50 px-2 py-1.5 dark:border-white/10 dark:bg-white/[0.05]">
            <img src="/logos/snowflake.svg" alt="" aria-hidden="true" className="h-3.5 w-3.5 flex-shrink-0 object-contain" />
            <span className="min-w-0 truncate text-[11.5px] font-semibold text-slate-900 dark:text-white">snowflake.com</span>
          </span>
          <span className="flex flex-shrink-0 items-center gap-1.5 rounded-lg bg-ember-500 px-2.5 py-1.5 text-[11px] font-bold text-white shadow-[0_4px_12px_rgba(201,76,30,0.28)]">
            <Copy size={11} strokeWidth={2.5} />
            Find similar
          </span>
        </div>

        {/* traits */}
        <div className="flex flex-wrap items-center gap-1.5 border-b border-slate-200/70 px-3 py-2 dark:border-white/[0.06]">
          <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-400 dark:text-slate-500">
            Match on
          </span>
          {MATCH_TRAITS.map((t) => (
            <span
              key={t.label}
              className={`inline-flex items-center gap-1 rounded-md px-1.5 py-[2px] text-[10.5px] font-semibold ${
                t.on
                  ? 'bg-ember-500/[0.12] text-ember-500 ring-1 ring-ember-500/30 dark:text-ember-300'
                  : 'bg-sand-100 text-slate-400 dark:bg-white/[0.06] dark:text-slate-500'
              }`}
            >
              {t.on && <Check size={9} strokeWidth={3.4} />}
              {t.label}
            </span>
          ))}
        </div>

        {/* results */}
        <div className="min-h-0 flex-1 divide-y divide-slate-200/70 dark:divide-white/[0.06]">
          {LOOKALIKE_MATCHES.map((m) => (
            <div key={m.name} className="flex items-center gap-2 px-3 py-[7px]">
              <Checkbox on={m.picked} />
              <span className="grid h-6 w-6 flex-shrink-0 place-items-center rounded-md border border-slate-200 bg-white p-1 dark:border-white/10">
                <img src={m.logo} alt="" aria-hidden="true" className="h-auto w-full object-contain" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[12px] font-bold text-slate-900 dark:text-white">{m.name}</p>
                <p className="truncate text-[10px] text-slate-500 dark:text-slate-400">{m.cat}</p>
              </div>
              {/* the app's own score badge: fixed width, bordered, banded */}
              <span
                className={`inline-flex h-[24px] w-[42px] flex-shrink-0 items-center justify-center rounded-lg border text-[11px] font-bold tabular-nums ${
                  m.match >= 90
                    ? 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-400'
                    : 'border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-400'
                }`}
              >
                {m.match}%
              </span>
            </div>
          ))}
        </div>

        {/* action bar */}
        <div className="flex items-center justify-between gap-2 border-t border-slate-200/70 bg-sand-50 px-3 py-2 dark:border-white/[0.06] dark:bg-white/[0.03]">
          <span className="text-[10.5px] font-semibold tabular-nums text-slate-500 dark:text-slate-400">
            {PICKED_COUNT} selected
          </span>
          <span className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10.5px] font-bold text-slate-900 dark:border-white/10 dark:bg-white/[0.06] dark:text-white">
            <Bookmark size={10} strokeWidth={2.6} className="text-ember-500" />
            Add to watchlist
          </span>
        </div>
      </div>
    </Panel>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   Cards 05–06 use a different visual treatment: the screen is ZOOMED and
   cropped, running off the panel's right and bottom edges instead of sitting
   fully inside it. At this scale the labels are readable at card size, which
   the contained fragments above can only manage by shrinking type. Both are
   built to the same shape — title, a left column of fields, a chart or preview
   on the right — so the pair reads as two views of one reporting surface.
   ══════════════════════════════════════════════════════════════════════════ */

/** Zoomed screen: left and top edges visible, right and bottom cropped away. */
function ZoomFrame({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Panel>
      <div className="absolute -bottom-8 -right-12 left-8 top-7 overflow-hidden rounded-tl-2xl border-l border-t border-slate-200/80 bg-white shadow-[0_18px_44px_rgba(15,23,42,0.13)] dark:border-white/10 dark:bg-[#16130F]">
        <div className="flex items-center border-b border-slate-200/70 px-5 py-3 dark:border-white/[0.06]">
          <img src="/harvinlogo/logo.png" alt="" aria-hidden="true" className="h-[18px] w-auto" />
        </div>
        <p className="px-5 py-4 text-[19px] font-bold tracking-[-0.02em] text-slate-900 dark:text-white">
          {title}
        </p>
        <div className="grid grid-cols-[152px_1fr] border-t border-slate-200/70 dark:border-white/[0.06]">
          {children}
        </div>
      </div>
    </Panel>
  );
}

/** The left rail both zoomed screens share. */
function ZoomRail({ label, items, note }: { label: string; items: string[]; note: string }) {
  return (
    <div className="border-r border-slate-200/70 px-5 py-4 dark:border-white/[0.06]">
      <p className="text-[13px] font-bold text-slate-900 dark:text-white">{label}</p>
      <div className="mt-3 space-y-2">
        {items.map((it) => (
          <span
            key={it}
            className="block truncate rounded-md bg-sand-100 px-2.5 py-[7px] text-[12px] font-medium text-slate-700 dark:bg-white/[0.07] dark:text-slate-200"
          >
            {it}
          </span>
        ))}
      </div>
      <p className="mt-4 text-[13px] font-bold text-slate-900 dark:text-white">{note}</p>
    </div>
  );
}

/* ── 06 · Template Builder ─────────────────────────────────────────────── */
/**
 * The template as it is authored — blocks on the left, live preview on the
 * right, with merge fields rendered as tokens rather than typed text. Same
 * device the campaign drafts in ProductSteps use, for the same reason: a token
 * shows the copy is assembled from the account record.
 */
const TEMPLATE_BLOCKS = ['Subject line', 'Opening', 'Signal line', 'Call to action', 'Signature'];

function TemplateCard() {
  return (
    <ZoomFrame title="New Campaign Template">
      <ZoomRail label="Blocks" items={TEMPLATE_BLOCKS} note="Variables" />

      <div className="min-w-0 px-5 py-4">
        <div className="flex items-center gap-2">
          <p className="text-[13.5px] font-bold text-slate-900 dark:text-white">Preview</p>
          <span className="rounded-md bg-ember-500/[0.12] px-1.5 py-[2px] text-[10.5px] font-semibold text-ember-500 dark:text-ember-300">
            Persona · VP Marketing
          </span>
        </div>

        <div className="mt-3 rounded-lg border border-slate-200 bg-sand-50 p-3.5 dark:border-white/10 dark:bg-white/[0.04]">
          <p className="text-[12px] leading-[2] text-slate-500 dark:text-slate-400">
            <span className="font-mono text-[10px] uppercase tracking-[0.08em]">Subject</span>{' '}
            <span className="rounded bg-ember-500/[0.12] px-1 py-[2px] font-semibold text-ember-500 dark:text-ember-300">
              {'{{company}}'}
            </span>{' '}
            <span className="font-semibold text-slate-900 dark:text-white">is hiring across GTM</span>
          </p>

          <p className="mt-2.5 border-t border-slate-200/70 pt-2.5 text-[12px] leading-[2] text-slate-600 dark:border-white/[0.06] dark:text-slate-300">
            Hi{' '}
            <span className="rounded bg-ember-500/[0.12] px-1 py-[2px] font-semibold text-ember-500 dark:text-ember-300">
              {'{{first_name}}'}
            </span>
            , noticed{' '}
            <span className="rounded bg-ember-500/[0.12] px-1 py-[2px] font-semibold text-ember-500 dark:text-ember-300">
              {'{{signal}}'}
            </span>{' '}
            at your team — worth a look?
          </p>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <span className="rounded-lg bg-ember-500 px-3 py-1.5 text-[11.5px] font-bold text-white">Save template</span>
          <span className="rounded-lg border border-slate-200 px-3 py-1.5 text-[11.5px] font-semibold text-slate-600 dark:border-white/10 dark:text-slate-300">
            Send test
          </span>
        </div>
      </div>
    </ZoomFrame>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   Modules 05–09 — the SDR-workflow surfaces, matching the module rows on this
   same page. Each is a contained panel on the tinted ground, the same
   treatment as cards 01–04, so the grid stays one family.
   ══════════════════════════════════════════════════════════════════════════ */

function Contained({ title, sub, right, children }: {
  title: string; sub: string; right?: React.ReactNode; children: React.ReactNode;
}) {
  return (
    <Panel>
      <div className="absolute inset-x-7 inset-y-7 flex flex-col overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-[0_18px_44px_rgba(15,23,42,0.13)] dark:border-white/10 dark:bg-[#16130F]">
        <div className="flex items-center justify-between gap-2 border-b border-slate-200/70 px-4 py-2.5 dark:border-white/[0.06]">
          <div className="min-w-0">
            <p className="truncate text-[12.5px] font-bold text-slate-900 dark:text-white">{title}</p>
            <p className="truncate text-[11px] text-slate-500 dark:text-slate-400">{sub}</p>
          </div>
          {right}
        </div>
        <div className="min-h-0 flex-1">{children}</div>
      </div>
    </Panel>
  );
}

function Tag({ children, tone = 'slate' }: { children: React.ReactNode; tone?: 'slate' | 'ember' | 'green' }) {
  const tones = {
    slate: 'bg-sand-100 text-slate-600 dark:bg-white/[0.07] dark:text-slate-400',
    ember: 'bg-ember-500/[0.12] text-ember-500 dark:text-ember-300',
    green: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
  };
  return (
    <span className={`flex-shrink-0 rounded-md px-1.5 py-[2px] text-[10px] font-semibold ${tones[tone]}`}>
      {children}
    </span>
  );
}

/* ── 05 · Team & Territories ───────────────────────────────────────────── */
const REPS = [
  { who: 'SW', name: 'Sarah W.', terr: 'West', pct: 82 },
  { who: 'MC', name: 'Marcus C.', terr: 'East', pct: 64 },
  { who: 'PR', name: 'Priya R.', terr: 'Central', pct: 91 },
  { who: 'DL', name: 'Dan L.', terr: 'Mid-market', pct: 38 },
];
const WEAKEST = REPS.reduce((a, b) => (b.pct < a.pct ? b : a));

function TeamCard() {
  return (
    <Contained title="Team" sub="Ownership and coverage" right={<Tag tone="ember">4 SDRs</Tag>}>
      <div className="divide-y divide-slate-200/70 dark:divide-white/[0.06]">
        {REPS.map((r) => (
          <div key={r.name} className="flex items-center gap-2.5 px-4 py-[9px]">
            <span className="grid h-7 w-7 flex-shrink-0 place-items-center rounded-full bg-ember-500/[0.14] text-[10px] font-bold text-ember-600 dark:text-ember-300">
              {r.who}
            </span>
            <div className="min-w-0 flex-1">
              <p className="flex items-center gap-1.5 text-[12px] font-bold text-slate-900 dark:text-white">
                <span className="truncate">{r.name}</span>
                <span className="truncate text-[10.5px] font-normal text-slate-400 dark:text-slate-500">{r.terr}</span>
              </p>
              <span className="mt-1 block h-1.5 w-full overflow-hidden rounded-full bg-sand-200 dark:bg-white/10">
                <span
                  className={`block h-full rounded-full ${r.name === WEAKEST.name ? 'bg-slate-300 dark:bg-white/25' : 'bg-ember-500'}`}
                  style={{ width: `${r.pct}%` }}
                />
              </span>
            </div>
            <span className="w-[30px] flex-shrink-0 text-right text-[11px] tabular-nums text-slate-500 dark:text-slate-400">
              {r.pct}%
            </span>
          </div>
        ))}
      </div>
    </Contained>
  );
}

/* ── 06 · Campaigns & Channels ─────────────────────────────────────────── */
function CampaignsCard() {
  return (
    <Contained title="D2C hiring play" sub="Built from the signal" right={<Tag tone="green">Live</Tag>}>
      <div className="flex flex-wrap gap-1.5 border-b border-slate-200/70 px-4 py-2.5 dark:border-white/[0.06]">
        {['Email', 'Tasks', 'Inbox'].map((c) => (
          <Tag key={c} tone="ember">{c}</Tag>
        ))}
      </div>
      <div className="divide-y divide-slate-200/70 dark:divide-white/[0.06]">
        {[
          { Icon: Mail, l: 'Lead with the hiring signal', d: 'Day 0', on: true },
          { Icon: Check, l: 'Task · check the record', d: 'Day 3', on: false },
          { Icon: Mail, l: 'Case study, same category', d: 'Day 5', on: false },
        ].map((st) => (
          <div key={st.l} className="flex items-center gap-2.5 px-4 py-[9px]">
            <span className={`grid h-4 w-4 flex-shrink-0 place-items-center rounded-full ${st.on ? 'bg-ember-500' : 'border border-slate-300 dark:border-white/20'}`}>
              {st.on && <Check size={9} strokeWidth={3.4} className="text-white" />}
            </span>
            <st.Icon size={12} strokeWidth={2.2} className="flex-shrink-0 text-slate-400 dark:text-slate-500" />
            <span className="min-w-0 flex-1 truncate text-[12px] font-semibold text-slate-900 dark:text-white">{st.l}</span>
            <span className="flex-shrink-0 font-mono text-[10px] tabular-nums text-slate-400 dark:text-slate-500">{st.d}</span>
          </div>
        ))}
      </div>
    </Contained>
  );
}

/* ── 07 · Dialer ───────────────────────────────────────────────────────── */
/** 555 numbers are reserved for fiction, so nothing here dials a real line. */
const CALLS = [
  { slug: 'nike', name: 'Dana Whitfield', tel: '+1 (503) 555-0184', live: true },
  { slug: 'peloton', name: 'Marcus Hale', tel: '+1 (212) 555-0143', live: false },
  { slug: 'sonos', name: 'Priya Raman', tel: '+1 (805) 555-0176', live: false },
  { slug: 'etsy', name: 'Alex Turner', tel: '+1 (718) 555-0119', live: false },
];

function DialerCard() {
  return (
    <Contained title="Call queue" sub="Ordered by ICP tier" right={<Tag tone="ember">8 today</Tag>}>
      <div className="divide-y divide-slate-200/70 dark:divide-white/[0.06]">
        {CALLS.map((c) => (
          <div key={c.name} className="flex items-center gap-2.5 px-4 py-[9px]">
            <Logo slug={c.slug} />
            <div className="min-w-0 flex-1">
              <p className="flex items-center gap-1.5 text-[12px] font-bold text-slate-900 dark:text-white">
                <span className="truncate">{c.name}</span>
                {c.live && <Tag tone="ember">Live</Tag>}
              </p>
              <p className="truncate font-mono text-[10.5px] text-slate-500 dark:text-slate-400">{c.tel}</p>
            </div>
            <Phone size={12} strokeWidth={2.4} className="flex-shrink-0 text-ember-500" />
          </div>
        ))}
      </div>
    </Contained>
  );
}

/* ── 08 · Meetings & Handoff ───────────────────────────────────────────── */
function MeetingsCard() {
  return (
    <Contained title="Meetings" sub="Assigned with full context" right={<Tag tone="ember">46 booked</Tag>}>
      <div className="divide-y divide-slate-200/70 dark:divide-white/[0.06]">
        {[
          { slug: 'nike', name: 'Nike', ae: 'AE Dana · yesterday', out: 'Qualified' },
          { slug: 'peloton', name: 'Peloton', ae: 'AE Rob · Tuesday', out: 'Opportunity' },
          { slug: 'etsy', name: 'Etsy', ae: 'AE Dana · today', out: null },
        ].map((m) => (
          <div key={m.name} className="flex items-center gap-2.5 px-4 py-[10px]">
            <Logo slug={m.slug} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[12px] font-bold text-slate-900 dark:text-white">{m.name}</p>
              <p className="truncate text-[10.5px] text-slate-500 dark:text-slate-400">{m.ae}</p>
            </div>
            {m.out ? <Tag tone="green">{m.out}</Tag> : <Tag>Record outcome</Tag>}
          </div>
        ))}
      </div>
    </Contained>
  );
}

/* ── 09 · Reporting & AI Coaching ──────────────────────────────────────── */
/** Bar widths are each stage's share of the first, so the drawing cannot
 *  disagree with the counts beside it. */
const STAGES = [
  { s: 'Accounts worked', n: 412 },
  { s: 'Conversations', n: 138 },
  { s: 'Meetings booked', n: 46 },
  { s: 'Opportunities', n: 18 },
];
const STAGE_TOP = STAGES[0].n;

function ReportingCard() {
  return (
    <Contained title="Pipeline contribution" sub="Accounts worked to pipeline" right={<Tag tone="ember">$1.4M</Tag>}>
      <div className="space-y-2 px-4 py-3">
        {STAGES.map((f, i) => (
          <div key={f.s} className="flex items-center gap-2.5">
            <span className="w-[104px] flex-shrink-0 truncate text-[11px] font-medium text-slate-600 dark:text-slate-300">
              {f.s}
            </span>
            <span className="h-4 min-w-0 flex-1 overflow-hidden rounded-md bg-sand-200 dark:bg-white/10">
              <span
                className={`block h-full rounded-md ${i === 0 ? 'bg-ember-500' : 'bg-ember-500/70'}`}
                style={{ width: `${(f.n / STAGE_TOP) * 100}%` }}
              />
            </span>
            <span className="w-[30px] flex-shrink-0 text-right text-[11px] font-bold tabular-nums text-slate-900 dark:text-white">
              {f.n}
            </span>
          </div>
        ))}
        <p className="border-t border-slate-200/70 pt-2 text-[10.5px] text-slate-400 dark:border-white/[0.06] dark:text-slate-500">
          2 reps flagged for coaching this week
        </p>
      </div>
    </Contained>
  );
}

/* ── Cards ─────────────────────────────────────────────────────────────── */
const CARDS = [
  {
    Icon: Building2,
    title: 'Account Intelligence',
    desc: 'Every account is a living record, not a row in a spreadsheet. Firmographics, tech stack, funding and buying committee stay current automatically.',
    Visual: AccountRecordCard,
  },
  {
    Icon: Radar,
    title: 'AI Signal Detection',
    desc: 'Funding, hiring, scaling, M&A and layoffs, watched across your whole universe. Every signal moves the score, and every point traces back to its evidence.',
    Visual: SignalShortlistCard,
  },
  {
    Icon: Bookmark,
    title: 'Watchlists',
    desc: 'Group accounts the way your team actually sells, then let rules do the upkeep — a score threshold adds the account and tells its owner the same moment.',
    Visual: WatchlistCard,
  },
  {
    Icon: Copy,
    title: 'Look-a-like Accounts',
    desc: 'Point at one account that already worked and get the companies that resemble it — ranked by how closely they match, ready to shortlist.',
    Visual: LookalikeCard,
  },
  {
    Icon: Users,
    title: 'Team & Territories',
    desc: 'Manage reps, ownership, territories and targets in one place — every account has an owner, and coverage stops being something you reconstruct from a spreadsheet.',
    Visual: TeamCard,
  },
  {
    Icon: Network,
    title: 'Campaigns & Channels',
    desc: 'Build and manage prospecting sequences, then run them across email, tasks and the inbox — with every action attached to the account and the rep who took it.',
    Visual: CampaignsCard,
  },
  {
    Icon: Phone,
    title: 'Dialer',
    desc: 'Call lists built from people, not rows — each contact with their ICP tier and the number to dial, every call recorded and written back to the account.',
    Visual: DialerCard,
  },
  {
    Icon: CalendarDays,
    title: 'Meetings & Handoff',
    desc: 'Manage booked meetings and AE handoffs without losing the thread — the account context travels with the meeting, and the outcome is recorded in a click.',
    Visual: MeetingsCard,
  },
  {
    Icon: ChartColumn,
    title: 'Reporting & AI Coaching',
    desc: 'Connect execution with business outcomes, from accounts worked through to pipeline generated — and surface which reps need coaching, and why.',
    Visual: ReportingCard,
  },
  {
    Icon: LayoutTemplate,
    title: 'Template Builder',
    desc: 'Build your own campaign templates from reusable blocks, with account and signal fields dropped in as merge tokens rather than retyped.',
    Visual: TemplateCard,
  },
];

function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && (setVisible(true), io.disconnect()),
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function PlatformCard({ card, index }: { card: typeof CARDS[0]; index: number }) {
  const r = useReveal();
  return (
    <article
      ref={r.ref}
      /* slug anchor — the navbar's Platform menu deep-links to these */
      id={card.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
      className={`scroll-mt-28 overflow-hidden rounded-[20px] border border-slate-200/80 bg-white transition-all duration-700
                  dark:border-white/[0.08] dark:bg-[#16130F]
                  ${r.visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
      style={{ transitionDelay: `${(index % 2) * 90}ms` }}
    >
      <card.Visual />

      <div className="p-6 sm:p-8">
        <span className="grid h-12 w-12 place-items-center rounded-xl bg-ember-500">
          <card.Icon size={21} className="text-white" strokeWidth={2.1} />
        </span>

        <h3 className="mt-6 text-[clamp(22px,2.2vw,27px)] font-bold tracking-[-0.02em] text-slate-900 dark:text-white">
          {card.title}
        </h3>
        <p className="mt-3 max-w-[460px] text-[15px] leading-[1.6] text-slate-500 dark:text-slate-400">
          {card.desc}
        </p>
      </div>
    </article>
  );
}

export default function PlatformGrid() {
  const header = useReveal();

  return (
    <section className="border-y border-slate-200 bg-sand-100 px-4 py-20 dark:border-white/[0.06] dark:bg-[#040404] sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-[1180px]">
        <div
          ref={header.ref}
          className={`mb-12 max-w-[680px] transition-all duration-700 lg:mb-14
                      ${header.visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}
        >
          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ember-500">The Platform</p>
          <h2 className="mt-4 text-[clamp(27px,3.2vw,42px)] font-semibold leading-[1.09] tracking-[-0.025em] text-slate-900 dark:text-white">
            Four modules, one account graph
          </h2>
          <p className="mt-5 text-[16px] leading-[1.7] text-slate-600 dark:text-slate-400">
            Find the companies worth your time, watch for the moment they enter the market, and
            launch outbound the same day — without stitching four tools together to do it.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:gap-6">
          {CARDS.map((c, i) => (
            <PlatformCard key={c.title} card={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
