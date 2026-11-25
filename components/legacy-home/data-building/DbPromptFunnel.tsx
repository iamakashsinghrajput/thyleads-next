'use client';

import { useEffect, useState } from 'react';
import {
  ArrowUp, Building2, Coins, Gauge, Globe2, Layers, Mail, MapPin, Mic, Phone,
  Radar, Store, TrendingUp, UserRound, Users, Wallet, Zap,
} from 'lucide-react';

/**
 * Data Building hero visual — the same scanning funnel as the old product
 * page hero (components/PromptFunnel.tsx), retold for Data Building.
 *
 * A plain-English request types itself out, fans out across the company
 * universe while an ember beam scans it, then funnels into the fields Harvin
 * researches to answer it. Each request declares the fields it genuinely
 * reads, so the lit chips always answer the request on screen.
 *
 * Built for the always-dark Data Building page: light logo tiles so every
 * brand mark stays legible, ember as the only accent.
 */

const FIELDS: { key: string; label: string; Icon: typeof Building2 }[] = [
  { key: 'company',   label: 'Company',             Icon: Building2 },
  { key: 'category',  label: 'Category',            Icon: Layers },
  { key: 'model',     label: 'Business model',      Icon: Store },
  { key: 'countries', label: 'Countries served',    Icon: Globe2 },
  { key: 'tech',      label: 'Technologies',        Icon: Layers },
  { key: 'revenue',   label: 'Revenue',             Icon: Coins },
  { key: 'funding',   label: 'Funding',             Icon: TrendingUp },
  { key: 'mau',       label: 'Monthly active users', Icon: Users },
  { key: 'locations', label: 'Location count',      Icon: MapPin },
  { key: 'fit',       label: 'Company Fit',         Icon: Gauge },
  { key: 'dm',        label: 'Decision-makers',     Icon: UserRound },
  { key: 'email',     label: 'Verified email',      Icon: Mail },
  { key: 'phone',     label: 'Direct phone',        Icon: Phone },
  { key: 'signals',   label: 'Signals',             Icon: Zap },
  { key: 'payments',  label: 'Pays sellers abroad', Icon: Wallet },
];

/** Each request lights the fields it genuinely reads. */
const PROMPTS: { text: string; lit: string[] }[] = [
  { text: 'Find companies like my best customers',              lit: ['company', 'model', 'category', 'fit'] },
  { text: 'Which marketplaces pay sellers in 10+ countries?',   lit: ['model', 'countries', 'payments', 'fit'] },
  { text: 'Who is the Head of Payments at each account?',       lit: ['company', 'dm', 'email', 'phone'] },
  { text: 'Add monthly active users and funding to my list',    lit: ['company', 'mau', 'funding', 'revenue'] },
  { text: 'Which high-fit accounts just changed leadership?',   lit: ['fit', 'signals', 'dm', 'company'] },
];

const TYPE_MS = 42;
const DELETE_MS = 18;
const HOLD_MS = 2400;

/** The company universe being searched. */
const GRID_LOGOS = [
  'stripe', 'adobe', 'paypal', 'etsy', 'ebay', 'amazon', 'doordash',
  'instacart', 'netflix', 'salesforce', 'hubspot', 'twilio', 'snowflake', 'datadog',
  'okta', 'mongodb', 'databricks', 'coinbase', 'nvidia', 'oracle', 'peloton',
];

const styles = `
  @keyframes dbpfCaret { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }
  @keyframes dbpfScan { from { transform: translateX(-110%); } to { transform: translateX(660%); } }
  @media (prefers-reduced-motion: reduce) { .dbpf-scan { display: none; } }
`;

/** Grid geometry — the fans align to these, so lines land on tile centres. */
const GRID_W = 560;
const GRID_COLS = 7;
const GRID_GAP = 6;
const TILE = (GRID_W - GRID_GAP * (GRID_COLS - 1)) / GRID_COLS;
const COL_X = Array.from({ length: GRID_COLS }, (_, i) => i * (TILE + GRID_GAP) + TILE / 2);
const FAN_INSET = 16;

function Fan({ h, dir }: { h: number; dir: 'out' | 'in' }) {
  const cx = GRID_W / 2;
  const top = FAN_INSET;
  const bot = h - 1;
  return (
    <svg viewBox={`0 0 ${GRID_W} ${h}`} className="w-full" aria-hidden="true" fill="none">
      {COL_X.map((x, i) => {
        const [x1, x2] = dir === 'out' ? [cx, x] : [x, cx];
        const edge = Math.abs(i - (GRID_COLS - 1) / 2) / ((GRID_COLS - 1) / 2);
        const span = bot - top;
        return (
          <path
            key={x}
            d={`M ${x1} ${top} C ${x1} ${top + span * 0.55}, ${x2} ${top + span * 0.45}, ${x2} ${bot}`}
            stroke="#E56B2C"
            strokeOpacity={0.55 - edge * 0.28}
            strokeWidth="1"
          />
        );
      })}
      <circle cx={cx} cy={dir === 'out' ? top : bot} r="2.6" fill="#E56B2C" />
    </svg>
  );
}

export default function DbPromptFunnel({ className = '' }: { className?: string }) {
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
    else t = setTimeout(() => { setDeleting(false); setIdx((v) => (v + 1) % PROMPTS.length); }, 260);
    return () => clearTimeout(t);
  }, [n, deleting, full]);

  /** Chips light once the request is complete and stay lit while it clears. */
  const settled = deleting || n === full.length;

  return (
    <div className={`relative mx-auto w-full max-w-[520px] ${className}`}>
      <style>{styles}</style>

      {/* The request — grows and shrinks with the text as it types */}
      <div className="flex justify-center">
        <div className="flex w-fit max-w-full items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3.5 py-2.5 shadow-[0_14px_36px_rgba(15,23,42,0.10)] dark:border-white/[0.1] dark:bg-[#16130F] dark:shadow-[0_14px_36px_rgba(0,0,0,0.5)]">
          <Radar size={18} className="flex-shrink-0 text-ember-500 dark:text-ember-400" strokeWidth={2.3} />
          <span className="min-h-[21px] overflow-hidden whitespace-nowrap text-[14px] font-medium text-slate-900 dark:text-white">
            {full.slice(0, n)}
            <span
              className="ml-[1px] inline-block h-[15px] w-[2px] translate-y-[2px] bg-ember-500 dark:bg-ember-400"
              style={{ animation: 'dbpfCaret 1s steps(1) infinite' }}
            />
          </span>
          <span className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-lg border border-slate-200 text-slate-400 dark:border-white/10 dark:text-white/40">
            <Mic size={14} strokeWidth={2} />
          </span>
          <span className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-lg bg-ember-500 text-white">
            <ArrowUp size={15} strokeWidth={2.6} />
          </span>
        </div>
      </div>

      <Fan h={60} dir="out" />

      {/* The universe it searches, with an ember beam scanning across it */}
      <div className="relative overflow-hidden rounded-xl">
        <div className="grid grid-cols-7 gap-1.5 px-1">
          {GRID_LOGOS.map((slug) => (
            <span
              key={slug}
              className="grid aspect-square place-items-center rounded-lg border border-slate-200 bg-white p-2 shadow-[0_1px_2px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-[#F7F3EB] dark:shadow-[0_1px_2px_rgba(0,0,0,0.3)]"
            >
              <img src={`/logos/${slug}.svg`} alt="" aria-hidden="true" className="h-auto w-full object-contain" />
            </span>
          ))}
        </div>
        <span
          aria-hidden="true"
          className="dbpf-scan pointer-events-none absolute inset-y-0 left-0 w-[15%]
                     bg-[linear-gradient(90deg,transparent,rgba(201,76,30,0.22)_45%,rgba(242,132,28,0.45)_50%,rgba(201,76,30,0.22)_55%,transparent)]"
          style={{ animation: 'dbpfScan 3.8s linear infinite' }}
        />
      </div>

      <Fan h={68} dir="in" />

      {/* The fields Harvin researches to answer it */}
      <div className="flex flex-wrap justify-center gap-1">
        {FIELDS.map((f) => {
          const lit = settled && active.lit.includes(f.key);
          return (
            <span
              key={f.key}
              className={`flex items-center gap-1.5 rounded-lg px-2 py-1 text-[12px] transition-all duration-500 ${
                lit
                  ? 'bg-ember-50 font-semibold text-ember-700 ring-1 ring-ember-300 dark:bg-ember-500/20 dark:text-ember-200 dark:ring-ember-400/50'
                  : 'bg-white/70 text-slate-400 ring-1 ring-slate-200 dark:bg-white/[0.04] dark:text-white/35 dark:ring-white/[0.06]'
              }`}
            >
              <f.Icon size={13} strokeWidth={2} className={lit ? 'text-ember-500 dark:text-ember-300' : 'text-slate-300 dark:text-white/25'} />
              {f.label}
            </span>
          );
        })}
      </div>
    </div>
  );
}
