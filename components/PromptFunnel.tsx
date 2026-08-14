'use client';

import { useEffect, useState } from 'react';
import {
  ArrowUp, Bookmark, Building2, Clock, Gauge, Globe2, Layers, MapPin, Mic,
  Radar, Target, TrendingUp, UserRound, Users, Zap,
} from 'lucide-react';

/**
 * Product-hero visual: one plain-English question funnelling down through the
 * account universe into the fields it actually reads.
 *
 * The prompt types itself out, and each prompt declares which fields it
 * touches — so the lit chips always answer the question on screen. Chips
 * lighting at random would be decoration; this is the product's actual logic.
 *
 * Lives on the beige section ground, so the palette is light: white tiles,
 * logos in their own brand colours, ember as the only accent.
 */

const FIELDS: { key: string; label: string; Icon: typeof Building2 }[] = [
  { key: 'name',      label: 'Account name',    Icon: Building2 },
  { key: 'industry',  label: 'Industry',        Icon: Layers },
  { key: 'employees', label: 'Employees',       Icon: Users },
  { key: 'funding',   label: 'Funding stage',   Icon: TrendingUp },
  { key: 'hq',        label: 'Headquarters',    Icon: MapPin },
  { key: 'roles',     label: 'Open GTM roles',  Icon: UserRound },
  { key: 'stack',     label: 'Tech stack',      Icon: Layers },
  { key: 'hiring',    label: 'Hiring velocity', Icon: TrendingUp },
  { key: 'region',    label: 'Region',          Icon: Globe2 },
  { key: 'score',     label: 'Harvin score',    Icon: Gauge },
  { key: 'watchlist', label: 'Watchlist',       Icon: Bookmark },
  { key: 'dm',        label: 'Decision makers', Icon: Users },
  { key: 'signals',   label: 'Buying signals',  Icon: Zap },
  { key: 'last',      label: 'Last signal',     Icon: Clock },
  { key: 'intent',    label: 'Intent',          Icon: Target },
];

/** Each question lights the fields it genuinely reads. */
const PROMPTS: { text: string; lit: string[] }[] = [
  { text: 'Which accounts raised funding in the last 90 days?',  lit: ['name', 'funding', 'last', 'signals'] },
  { text: 'Show me accounts hiring GTM roles this month',        lit: ['name', 'roles', 'hiring', 'score'] },
  { text: 'Find companies running Snowflake in North America',   lit: ['name', 'stack', 'region', 'hq'] },
  { text: 'Who are the decision makers at my top accounts?',     lit: ['name', 'dm', 'score', 'employees'] },
  { text: 'Which watchlist accounts show buying intent?',        lit: ['name', 'watchlist', 'intent', 'signals'] },
];

const TYPE_MS = 42;
const DELETE_MS = 18;
const HOLD_MS = 2400;

/** 21 US direct-to-consumer brands — the account universe being searched. */
const GRID_LOGOS = [
  'nike', 'peloton', 'etsy', 'underarmour', 'fitbit', 'bose', 'amazon',
  'starbucks', 'target', 'walmart', 'newbalance', 'sonos', 'roku', 'doordash',
  'instacart', 'cocacola', 'tesla', 'ford', 'netflix', 'macys', 'ebay',
];

const styles = `
  @keyframes pfCaret { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }
  @keyframes pfScan { from { transform: translateX(-110%); } to { transform: translateX(660%); } }
  @media (prefers-reduced-motion: reduce) { .pf-scan { display: none; } }
`;

/** Grid geometry — the fans align to these, so lines land on tile centres. */
const GRID_W = 560;
const GRID_COLS = 7;
const GRID_GAP = 6;
const TILE = (GRID_W - GRID_GAP * (GRID_COLS - 1)) / GRID_COLS;
const COL_X = Array.from({ length: GRID_COLS }, (_, i) => i * (TILE + GRID_GAP) + TILE / 2);

/**
 * Converging / diverging fan.
 *
 * Replaces the mirrored-curve "onion", which was symmetric and so said nothing
 * about direction. A fan does: one question spreading OUT across the universe,
 * then the universe collapsing IN to the handful of fields it read. Lines land
 * on the grid's actual column centres rather than floating near it.
 */
/** Clearance before the strands begin, so they don't crowd the container above.
 *  Applied INSIDE the fan's own box — the containers themselves don't move. */
const FAN_INSET = 16;

function Fan({ h, dir }: { h: number; dir: 'out' | 'in' }) {
  const cx = GRID_W / 2;
  const top = FAN_INSET;
  const bot = h - 1;
  return (
    <svg viewBox={`0 0 ${GRID_W} ${h}`} className="w-full" aria-hidden="true" fill="none">
      {COL_X.map((x, i) => {
        const [x1, x2] = dir === 'out' ? [cx, x] : [x, cx];
        // fade the outermost strands so the fan doesn't read as a hard cage
        const edge = Math.abs(i - (GRID_COLS - 1) / 2) / ((GRID_COLS - 1) / 2);
        const span = bot - top;
        return (
          <path
            key={x}
            d={`M ${x1} ${top} C ${x1} ${top + span * 0.55}, ${x2} ${top + span * 0.45}, ${x2} ${bot}`}
            stroke="#C94C1E"
            strokeOpacity={0.42 - edge * 0.22}
            strokeWidth="1"
          />
        );
      })}
      {/* the single point the fan gathers at */}
      <circle cx={cx} cy={dir === 'out' ? top : bot} r="2.6" fill="#C94C1E" />
    </svg>
  );
}

export default function PromptFunnel({ className = '' }: { className?: string }) {
  const [idx, setIdx] = useState(0);
  const [n, setN] = useState(0);
  const [deleting, setDeleting] = useState(false);

  const active = PROMPTS[idx];
  const full = active.text;

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    if (!deleting && n < full.length) t = setTimeout(() => setN(n + 1), TYPE_MS);
    else if (!deleting && n === full.length) t = setTimeout(() => setDeleting(true), HOLD_MS);
    else if (deleting && n > 0) t = setTimeout(() => setN(n - 1), DELETE_MS);
    else {
      // fully cleared — advance to the next question
      t = setTimeout(() => { setDeleting(false); setIdx((v) => (v + 1) % PROMPTS.length); }, 260);
    }
    return () => clearTimeout(t);
  }, [n, deleting, full]);

  /** Chips light once the question is complete and stay lit while it clears. */
  const settled = deleting || n === full.length;

  return (
    <div className={`relative mx-auto w-full max-w-[500px] ${className}`}>
      <style>{styles}</style>

      {/* ── The question. w-fit so the bar grows and shrinks with the text
             as it types, rather than sitting at a fixed width. ──────────── */}
      <div className="flex justify-center">
        <div className="flex w-fit max-w-full items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3.5 py-2.5 shadow-[0_14px_36px_rgba(15,23,42,0.10)] dark:border-white/[0.08] dark:bg-[#16130F]">
          <Radar size={18} className="flex-shrink-0 text-ember-500" strokeWidth={2.3} />
          <span className="whitespace-nowrap text-[14px] font-medium text-slate-900 dark:text-white">
            {full.slice(0, n)}
            <span
              className="ml-[1px] inline-block h-[15px] w-[2px] translate-y-[2px] bg-ember-500"
              style={{ animation: 'pfCaret 1s steps(1) infinite' }}
            />
          </span>
          <span className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-lg border border-slate-200 text-slate-400 dark:border-white/10 dark:text-slate-500">
            <Mic size={14} strokeWidth={2} />
          </span>
          <span className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-lg bg-ember-500 text-white">
            <ArrowUp size={15} strokeWidth={2.6} />
          </span>
        </div>
      </div>

      <Fan h={60} dir="out" />

      {/* ── The universe it searches, with an ember beam sweeping it ─────── */}
      <div className="relative overflow-hidden rounded-xl">
        <div className="grid grid-cols-7 gap-1.5 px-1">
          {GRID_LOGOS.map((slug) => (
            <span
              key={slug}
              className="grid aspect-square place-items-center rounded-lg border border-slate-200 bg-white p-2 shadow-[0_1px_2px_rgba(15,23,42,0.04)] dark:border-white/10 dark:bg-white/[0.06]"
            >
              <img src={`/logos/${slug}.svg`} alt="" aria-hidden="true" className="h-auto w-full object-contain" />
            </span>
          ))}
        </div>
        <span
          aria-hidden="true"
          className="pf-scan pointer-events-none absolute inset-y-0 left-0 w-[15%]
                     bg-[linear-gradient(90deg,transparent,rgba(201,76,30,0.16)_45%,rgba(242,132,28,0.30)_50%,rgba(201,76,30,0.16)_55%,transparent)]"
          style={{ animation: 'pfScan 3.8s linear infinite' }}
        />
      </div>

      <Fan h={68} dir="in" />

      {/* ── The fields it reads ──────────────────────────────────────────── */}
      <div className="flex flex-wrap justify-center gap-1">
        {FIELDS.map((f) => {
          const lit = settled && active.lit.includes(f.key);
          return (
            <span
              key={f.key}
              className={`flex items-center gap-1.5 rounded-lg px-2 py-1 text-[12px] transition-all duration-500 ${
                lit
                  ? 'bg-ember-50 font-semibold text-ember-700 ring-1 ring-ember-300 dark:bg-ember-500/20 dark:text-ember-200 dark:ring-ember-400/40'
                  : 'bg-white/70 text-slate-400 ring-1 ring-slate-200/70 dark:bg-white/[0.04] dark:text-white/30 dark:ring-transparent'
              }`}
            >
              <f.Icon size={13} strokeWidth={2} className={lit ? 'text-ember-500' : 'text-slate-300 dark:text-white/25'} />
              {f.label}
            </span>
          );
        })}
      </div>
    </div>
  );
}
