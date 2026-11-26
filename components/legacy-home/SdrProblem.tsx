'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Check, Search, Sparkles, X } from 'lucide-react';

/**
 * The problem: best-fit customers are defined by context a database filter
 * can't express. Told as a short film on the left — one scene per example —
 * with the examples themselves listed on the right as chapters.
 *
 * Each scene shows two real companies that fit the example, and what a
 * database filter makes of them — usually a miss. Harvin then checks the
 * thing that actually decides fit, drawn as the thing itself: payouts flowing
 * to other countries, store pins filling a map, a tech stack being detected.
 *
 * The stage is a dark "screen" in both themes; the chapters follow the theme.
 * Every scene is a pure function of a rAF clock `t`, so motion is continuous.
 * Companies are real; every claim shown is a public, approximate figure.
 */

const EXAMPLES = [
  {
    seller: 'A payments company',
    cares: 'may care about who receives money internationally.',
    filter: 'Industry: Fintech',
    fit: 'Who receives money internationally',
  },
  {
    seller: 'A retail software company',
    cares: 'may care about store count.',
    filter: 'Industry: Retail',
    fit: 'Store count',
  },
  {
    seller: 'A SaaS company',
    cares: 'may care about the tools a business uses.',
    filter: 'Employees: 50–500',
    fit: 'The tools a business uses',
  },
];

/* ---------- scene data ---------- */

type Co = {
  name: string;
  logo: string;
  /** What the filter sees for this company, and whether the filter keeps it. */
  filterSees: string;
  matched: boolean;
  caption: string;
  countries?: string[];
  stores?: number;
};

const SCENES: { kind: 'pay' | 'stores' | 'stack'; companies: Co[] }[] = [
  {
    kind: 'pay',
    companies: [
      { name: 'Etsy', logo: 'etsy', filterSees: 'E-commerce', matched: false, caption: 'Pays sellers worldwide', countries: ['GB', 'DE', 'IN', 'AU', 'CA'] },
      { name: 'eBay', logo: 'ebay', filterSees: 'E-commerce', matched: false, caption: 'Pays sellers worldwide', countries: ['GB', 'DE', 'AU', 'CA'] },
    ],
  },
  {
    kind: 'stores',
    companies: [
      { name: 'Target', logo: 'target', filterSees: 'Retail', matched: true, caption: 'stores', stores: 1900 },
      { name: 'Starbucks', logo: 'starbucks', filterSees: 'Food & beverage', matched: false, caption: 'stores', stores: 40000 },
    ],
  },
  {
    kind: 'stack',
    companies: [
      { name: 'Instacart', logo: 'instacart', filterSees: '3,000+', matched: false, caption: 'Uses Snowflake' },
      { name: 'DoorDash', logo: 'doordash', filterSees: '10,000+', matched: false, caption: 'Uses Snowflake' },
    ],
  },
];

/* ---------- timing ---------- */

const DUR = 7200;
const ENTER_MS = 650;
const EXIT_MS = 500;
const STRIKE_AT = 1300;
const RESOLVE_AT = 1800; // first card checked
const INSPECT_STEP = 1000;
const VIZ_MS = 1300;
const SUMMARY_AT = RESOLVE_AT + INSPECT_STEP + VIZ_MS + 150;

/* ---------- helpers ---------- */

const clamp = (v: number) => Math.min(1, Math.max(0, v));
const ease = (v: number) => 1 - Math.pow(1 - clamp(v), 3);
const easeInOut = (v: number) => {
  const x = clamp(v);
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
};
const quad = (a: number, c: number, b: number, f: number) => (1 - f) * (1 - f) * a + 2 * (1 - f) * f * c + f * f * b;

const styles = `
  @keyframes pbShimmer { from { background-position: 200% 0; } to { background-position: -200% 0; } }
  .pb-shimmer {
    color: transparent;
    background: linear-gradient(90deg, rgba(255,255,255,.18) 0%, rgba(255,255,255,.6) 50%, rgba(255,255,255,.18) 100%);
    background-size: 200% 100%;
    -webkit-background-clip: text; background-clip: text;
    animation: pbShimmer 1.6s linear infinite;
  }
  @media (prefers-reduced-motion: reduce) { .pb-shimmer { animation: none; } }
`;

function Shimmer({ children }: { children: React.ReactNode }) {
  return <span className="pb-shimmer text-[11px] font-medium">{children}</span>;
}

/* ---------- content visuals ---------- */

const STORE_MIN = 100;

/* World map as a 48 × 18 dot mask (5px per dot → 240 × 90). */
const WORLD = [
  '................................................',
  '....######.....###....######...################.',
  '..##########....#....#######################....',
  '.###########.........######.###################.',
  '..#########.........#####.####################..',
  '...########.........####..##################....',
  '....######..........######.##############.......',
  '.....####..........########..########.##........',
  '......###..........#########..#####...#.........',
  '.......#####........#######....##.....##........',
  '........######.......#####...........##..##.....',
  '........#######......####..............#.##.....',
  '.........######......###...............###......',
  '..........####.......##..............#######....',
  '..........###...........................######..',
  '..........##............................####....',
  '..........#.....................................',
  '................................................',
];
const LAND = WORLD.flatMap((row, r) => [...row.padEnd(48, '.').slice(0, 48)].map((c, col) => (c === '#' ? [col, r] : null)).filter(Boolean)) as [number, number][];
const PLACE: Record<string, [number, number]> = {
  US: [7, 4], CA: [8, 2], GB: [21, 2], FR: [22, 4], DE: [24, 3], IN: [34, 8], AU: [41, 13], BR: [13, 11],
};
const LABEL_BELOW = ['DE', 'IN'];
const MAP_W = 240;
const MAP_H = 90;
const at5 = ([c, r]: [number, number]) => [c * 5 + 2.5, r * 5 + 2.5] as const;

/** Payouts flying out across a dotted world map from the company's home market. */
function PayViz({ co, p, t, at }: { co: Co; p: number; t: number; at: number }) {
  const [ox, oy] = at5(PLACE.US);
  const list = co.countries ?? [];
  const landIn = ease(p * 2.2);
  return (
    <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`} className="h-full w-full" aria-hidden="true" fill="none">
      {LAND.map(([c, r], k) => (
        <circle key={k} cx={c * 5 + 2.5} cy={r * 5 + 2.5} r="1.05" fill="#fff" opacity={0.1 + 0.06 * landIn} />
      ))}
      {list.map((code, k) => {
        const [x, y] = at5(PLACE[code]);
        const dist = Math.hypot(x - ox, y - oy);
        const cx = (ox + x) / 2;
        const cy = Math.min(oy, y) - dist * 0.32;
        const d = easeInOut((p - 0.12 - k * 0.11) / 0.42);
        const landed = d >= 1;
        const flyer = d > 0 && d < 1;
        const ring = landed ? ((((t - at) / 1400 + k * 0.23) % 1) + 1) % 1 : 0;
        return (
          <g key={code}>
            <path d={`M${ox} ${oy} Q ${cx} ${cy} ${x} ${y}`} stroke="rgba(52,211,153,0.55)" strokeWidth="1" pathLength={1} strokeDasharray="1" strokeDashoffset={1 - d} />
            {flyer && <circle cx={quad(ox, cx, x, d)} cy={quad(oy, cy, y, d)} r="2" fill="#A7F3D0" />}
            {landed && (
              <>
                <circle cx={x} cy={y} r={2 + ring * 6} stroke="rgba(52,211,153,0.6)" opacity={1 - ring} />
                <circle cx={x} cy={y} r="2.2" fill="#34D399" />
                <g transform={`translate(${x + (x > 200 ? -24 : 4)} ${LABEL_BELOW.includes(code) ? y + 3 : y - 13})`}>
                  <rect width="18" height="10" rx="2.5" fill="rgba(16,15,13,0.9)" stroke="rgba(255,255,255,0.18)" />
                  <text x="9" y="7.3" textAnchor="middle" fontSize="6.5" fontWeight="600" fill="rgba(255,255,255,0.85)">{code}</text>
                </g>
              </>
            )}
          </g>
        );
      })}
      <circle cx={ox} cy={oy} r="5.5" fill="rgba(255,255,255,0.1)" />
      <circle cx={ox} cy={oy} r="2.6" fill="#fff" />
    </svg>
  );
}

/** Storefronts popping up in a row, and a log-scale store-count meter crossing the 100-store mark. */
function StoreViz({ co, p }: { co: Co; p: number }) {
  const stores = co.stores ?? 0;
  const fill = (Math.log10(Math.max(1, stores)) / 5) * ease(p * 1.2); // 1 … 100k on a log scale
  const mark = Math.log10(STORE_MIN) / 5;
  const passed = fill >= mark;
  const W = 240;
  return (
    <svg viewBox={`0 0 ${W} 70`} className="h-full w-full" aria-hidden="true" fill="none">
      {Array.from({ length: 10 }, (_, k) => {
        const e = ease(p * 2 - k * 0.12);
        const x = 4 + k * 23.6;
        return (
          <g key={k} opacity={e} transform={`translate(${x} ${6 + (1 - e) * 6})`}>
            {/* awning */}
            {[0, 1, 2, 3].map((j) => (
              <rect key={j} x={j * 4.5} y="0" width="4.5" height="5" fill={j % 2 ? 'rgba(255,255,255,0.85)' : '#34D399'} />
            ))}
            <path d="M0 5 h18 l-1 2 h-16 z" fill="rgba(52,211,153,0.6)" />
            {/* shopfront */}
            <rect x="1" y="7" width="16" height="13" rx="1" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.22)" strokeWidth="0.8" />
            <rect x="3" y="9.5" width="6" height="4.5" rx="0.6" fill="rgba(255,255,255,0.25)" />
            <rect x="11" y="10" width="4" height="10" rx="0.6" fill="rgba(255,255,255,0.18)" />
          </g>
        );
      })}

      {/* meter */}
      <rect x="0" y="40" width={W} height="5" rx="2.5" fill="rgba(255,255,255,0.07)" />
      <rect x="0" y="40" width={W * fill} height="5" rx="2.5" fill="#34D399" />
      <line x1={W * mark} x2={W * mark} y1="35" y2="50" stroke={passed ? '#34D399' : 'rgba(255,255,255,0.45)'} strokeWidth="1.2" />
      <text x={W * mark} y="60" textAnchor="middle" fontSize="7.5" fontWeight="600" fill={passed ? '#6EE7B7' : 'rgba(255,255,255,0.5)'}>
        {passed ? '✓ 100+ needed' : '100+ needed'}
      </text>
      {[
        { v: '1', x: 0, a: 'start' as const },
        { v: '10k', x: W * 0.8, a: 'middle' as const },
        { v: '100k', x: W, a: 'end' as const },
      ].map((l) => (
        <text key={l.v} x={l.x} y="60" textAnchor={l.a} fontSize="7" fill="rgba(255,255,255,0.3)">{l.v}</text>
      ))}
    </svg>
  );
}

/** A scan sweeps the company's stack; Snowflake lights as the beam passes it. */
function StackViz({ co, p }: { co: Co; p: number }) {
  const scan = ease(p * 1.15);
  const slots = ['?', '?', 'snowflake', '?'];
  return (
    <div className="relative h-full w-full overflow-hidden rounded-lg border border-white/[0.06] bg-white/[0.02]">
      <div className="absolute left-3 top-2 flex items-center gap-1.5 text-[9.5px] font-medium text-white/35">
        <span className="h-1.5 w-1.5 rounded-full bg-white/25" /> {co.logo}.com · tech stack
      </div>
      <div className="absolute inset-x-3 bottom-2.5 flex items-center gap-2">
        {slots.map((s, k) => {
          const e = clamp((scan - (k + 0.5) / 4.6) * 6 + 0.5);
          const hit = s !== '?';
          return (
            <span
              key={k}
              className={`grid h-[28px] w-[28px] flex-shrink-0 place-items-center rounded-md ${hit ? 'bg-[#F7F3EB] p-[5px] ring-2 ring-emerald-400/80' : 'bg-white/[0.05]'}`}
              style={{ opacity: hit ? e : 0.35 + 0.4 * e, transform: `scale(${0.78 + 0.22 * e})` }}
            >
              {hit ? <img src="/logos/snowflake.svg" alt="Snowflake" className="h-full w-full object-contain" /> : <span className="h-1.5 w-3 rounded bg-white/15" />}
            </span>
          );
        })}
      </div>
      <span
        aria-hidden="true"
        className="absolute inset-y-0 w-[24%] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.12),transparent)]"
        style={{ left: `${-24 + scan * 124}%`, opacity: p > 0 && p < 1 ? 1 : 0 }}
      />
    </div>
  );
}

/* ---------- one company card ---------- */

function CompanyCard({ co, kind, t, i, filterKey }: { co: Co; kind: 'pay' | 'stores' | 'stack'; t: number; i: number; filterKey: string }) {
  const enter = ease((t - 250 - i * 140) / 450);
  const at = RESOLVE_AT + i * INSPECT_STEP;
  const p = clamp((t - at) / VIZ_MS);
  const done = t >= at + VIZ_MS * 0.75;
  const checking = t >= at && !done;
  const sweep = clamp((t - at) / 700);
  const win = ease((t - at - VIZ_MS * 0.75) / 450);
  const stores = co.stores ?? 0;

  return (
    <div
      className="relative overflow-hidden rounded-xl border border-white/[0.08] bg-[#161412]"
      style={{
        opacity: enter,
        transform: `translateY(${(1 - enter) * 12}px)`,
        boxShadow: `inset 0 0 0 1px rgba(52,211,153,${0.4 * win}), 0 14px 30px rgba(0,0,0,0.35)`,
      }}
    >
      <div className="flex items-center gap-2.5 px-3 pt-3">
        <span className="grid h-7 w-7 flex-shrink-0 place-items-center rounded-md bg-[#F7F3EB] p-1">
          <img src={`/logos/${co.logo}.svg`} alt={`${co.name} logo`} className="h-full w-full object-contain" />
        </span>
        <span className="min-w-0 flex-1 truncate text-[13px] font-semibold text-white">{co.name}</span>
        {done ? (
          <span className="inline-flex flex-shrink-0 items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10.5px] font-semibold text-emerald-300">
            <Check size={10} strokeWidth={3} /> Fit
          </span>
        ) : checking ? (
          <Shimmer>Checking…</Shimmer>
        ) : null}
      </div>

      {/* What the filter makes of it */}
      <div className="mx-3 mt-2.5 flex items-center gap-1.5 text-[10.5px]">
        <span className="text-white/35">{filterKey}</span>
        <span className="rounded bg-white/[0.06] px-1.5 py-0.5 text-white/65">{co.filterSees}</span>
        <span className={`ml-auto inline-flex flex-shrink-0 items-center gap-0.5 whitespace-nowrap ${co.matched ? 'text-white/45' : 'text-white/35'}`}>
          {co.matched ? <Check size={10} strokeWidth={3} /> : <X size={10} strokeWidth={3} />}
          {co.matched ? 'Filter keeps' : 'Filter misses'}
        </span>
      </div>

      <div className={`relative mx-3 mt-2 ${kind === 'pay' ? 'h-[88px]' : 'h-[70px]'}`}>
        {t < at ? (
          <div className="flex h-full flex-col justify-center gap-1.5 rounded-lg border border-dashed border-white/[0.07] px-3">
            <span className="h-1.5 w-3/4 rounded bg-white/[0.05]" />
            <span className="h-1.5 w-1/2 rounded bg-white/[0.05]" />
          </div>
        ) : kind === 'pay' ? (
          <PayViz co={co} p={p} t={t} at={at} />
        ) : kind === 'stores' ? (
          <StoreViz co={co} p={p} />
        ) : (
          <StackViz co={co} p={p} />
        )}
      </div>

      <p className={`truncate px-3 pb-3 pt-2 text-[11.5px] font-medium ${done ? 'text-emerald-300' : 'text-white/25'}`}>
        {t < at ? '—' : kind === 'stores' ? `${Math.round(stores * ease(p * 1.1)).toLocaleString('en-US')}+ stores` : co.caption}
      </p>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 w-1/3 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.07),transparent)]"
        style={{ left: `${-33 + sweep * 133}%`, opacity: sweep > 0 && sweep < 1 ? 1 : 0 }}
      />
    </div>
  );
}

/* ---------- scene ---------- */

function Scene({ index, t }: { index: number; t: number }) {
  const ex = EXAMPLES[index];
  const sc = SCENES[index];
  const [filterKey, filterVal] = ex.filter.split(': ');
  const strike = ease((t - STRIKE_AT) / 450);
  const head = ease((t - STRIKE_AT - 200) / 450);
  const summary = ease((t - SUMMARY_AT) / 450);
  const missed = sc.companies.filter((c) => !c.matched).length;

  return (
    <div className="w-full max-w-[540px] overflow-hidden rounded-2xl border border-white/[0.09] bg-[#100F0D] shadow-[0_30px_70px_rgba(0,0,0,0.6)]">
      {/* Query: filter → what decides fit */}
      <div className="flex flex-wrap items-center gap-2 border-b border-white/[0.07] px-4 py-3">
        <Search size={14} className="text-white/40" />
        <span className="relative inline-flex items-center rounded-md border border-white/[0.1] bg-white/[0.04] px-2 py-0.5 text-[12px] text-white/70">
          {filterKey}: <span className="ml-1 font-semibold text-white">{filterVal}</span>
          <span aria-hidden="true" className="absolute left-1 top-1/2 h-px bg-white/75" style={{ width: `calc(${strike} * (100% - 8px))` }} />
        </span>
        <ArrowRight size={13} className="text-white/30" style={{ opacity: head }} />
        <span
          className="inline-flex items-center gap-1 rounded-md border border-white/25 bg-white/[0.08] px-2 py-0.5 text-[12px] font-medium text-white"
          style={{ opacity: head, transform: `translateX(${(1 - head) * -8}px)` }}
        >
          <Sparkles size={11} /> {ex.fit}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3 p-3.5 sm:grid-cols-2">
        {sc.companies.map((co, i) => (
          <CompanyCard key={co.name} co={co} kind={sc.kind} t={t} i={i} filterKey={filterKey} />
        ))}
      </div>

      <div className="relative h-[40px] border-t border-white/[0.07] text-[12px]">
        <span className="absolute inset-0 flex items-center px-4 text-white/45" style={{ opacity: 1 - summary }}>
          Filtering by {ex.filter}
        </span>
        <span className="absolute inset-0 flex items-center gap-2 px-4 text-white/80" style={{ opacity: summary }}>
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          {missed === sc.companies.length ? (
            <span>The filter missed <span className="font-semibold text-white">both</span>. Harvin found them.</span>
          ) : (
            <span>The filter missed <span className="font-semibold text-white">{missed} of {sc.companies.length}</span>. Harvin found both.</span>
          )}
        </span>
      </div>
    </div>
  );
}

/* ---------- section ---------- */

export default function SdrProblem() {
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

  // Frame clock; scene and time live in one state so they always change together.
  useEffect(() => {
    if (!inView || reduced) return;
    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min(64, now - last);
      last = now;
      setPos((p) => (p.t + dt >= DUR ? { scene: (p.scene + 1) % EXAMPLES.length, t: 0 } : { scene: p.scene, t: p.t + dt }));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced]);

  const go = (i: number) => setPos({ scene: i, t: 0 });

  const clock = reduced ? DUR - EXIT_MS - 1 : t;
  const enter = reduced ? 1 : ease(clock / ENTER_MS);
  const exit = reduced ? 0 : easeInOut((clock - (DUR - EXIT_MS)) / EXIT_MS);
  const p = clock / DUR;
  const struckP = STRIKE_AT / DUR;
  const fitP = RESOLVE_AT / DUR;

  return (
    <section className="border-t border-slate-200 bg-sand-100 px-4 py-20 dark:border-white/[0.06] dark:bg-[#040404] sm:px-6 lg:px-8 lg:py-24">
      <style>{styles}</style>
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-12 max-w-[760px] lg:mb-14">
          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ember-500">The problem</p>
          <h2 className="mt-4 text-[clamp(27px,3.2vw,42px)] font-semibold leading-[1.09] tracking-[-0.025em] text-slate-900 dark:text-white">
            B2B company discovery that starts
            <br />
            with your business, not a filter.
          </h2>
          <p className="mt-5 text-[16px] leading-[1.7] text-slate-600 dark:text-slate-400">
            Your best-fit customers are rarely defined by industry, size and location alone.
          </p>
        </div>

        <div ref={ref} className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_380px] lg:gap-12">
          {/* Film */}
          <div
            className="relative isolate flex min-h-[380px] flex-col items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-[#0A0908] px-3 py-6
                       shadow-[0_18px_44px_rgba(15,23,42,0.12)] dark:border-white/[0.07] dark:shadow-none sm:min-h-[400px] sm:px-8"
            role="img"
            aria-label={`${EXAMPLES[scene].seller}: a filter on ${EXAMPLES[scene].filter} misses companies that fit; checking ${EXAMPLES[scene].fit.toLowerCase()} finds them.`}
          >
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_55%_at_50%_45%,rgba(255,255,255,0.045),transparent_70%)]" />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10 opacity-60 [background-image:linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,black,transparent)]"
            />
            <div
              key={scene}
              className="flex w-full justify-center will-change-transform"
              style={{
                opacity: enter * (1 - exit),
                transform: `translateY(${(1 - enter) * 14}px) scale(${0.95 + 0.05 * enter + 0.04 * exit})`,
                filter: enter < 1 || exit > 0 ? `blur(${(1 - enter) * 8 + exit * 6}px)` : undefined,
              }}
            >
              <Scene index={scene} t={clock} />
            </div>
            <p className="mt-3 text-center text-[10.5px] text-white/30">Illustrative. Store and employee counts are approximate public figures.</p>
          </div>

          {/* Examples */}
          <ol className="border-t border-slate-200 dark:border-white/[0.08] lg:self-center">
            {EXAMPLES.map((ex, i) => {
              const active = i === scene;
              const struck = active && p >= struckP;
              const lit = active && p >= fitP;
              return (
                <li key={ex.seller} className="relative border-b border-slate-200 dark:border-white/[0.08]">
                  <button
                    type="button"
                    onClick={() => go(i)}
                    aria-current={active ? 'step' : undefined}
                    className="group flex w-full items-start gap-5 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:focus-visible:ring-white/40"
                  >
                    <span
                      className={`w-7 flex-shrink-0 pt-[3px] font-mono text-[13px] tabular-nums transition-colors duration-500
                                  ${active ? 'text-ember-500 dark:text-ember-400' : 'text-slate-400 dark:text-white/30'}`}
                    >
                      0{i + 1}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span
                        className={`block text-[19px] font-semibold tracking-[-0.015em] transition-colors duration-500
                                    ${active ? 'text-slate-900 dark:text-white' : 'text-slate-400 group-hover:text-slate-700 dark:text-white/45 dark:group-hover:text-white/75'}`}
                      >
                        {ex.seller}
                      </span>
                      <span className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${active ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                        <span className="overflow-hidden">
                          <span className="block pt-1.5 text-[14.5px] leading-[1.55] text-slate-600 dark:text-slate-400">{ex.cares}</span>
                          <span className="mt-4 flex flex-col gap-3 text-[12.5px]">
                            <span className="block">
                              <span className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500">A database filter sees</span>
                              <span
                                className={`mt-1.5 inline-flex rounded-lg border px-2.5 py-1 font-medium transition-all duration-500
                                            ${struck
                                              ? 'border-slate-200 bg-slate-50 text-slate-400 line-through decoration-slate-400 dark:border-white/[0.08] dark:bg-white/[0.02] dark:text-slate-500'
                                              : 'border-slate-300 bg-white text-slate-700 dark:border-white/[0.15] dark:bg-white/[0.05] dark:text-white/80'}`}
                              >
                                <span className="sr-only">Not: </span>
                                {ex.filter}
                              </span>
                            </span>
                            <span className="block">
                              <span className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500">What decides fit</span>
                              <span
                                className={`mt-1.5 inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 font-semibold transition-all duration-500
                                            ${lit
                                              ? 'border-slate-900 bg-slate-900 text-white dark:border-white dark:bg-white dark:text-[#0A0908]'
                                              : 'border-dashed border-slate-300 text-slate-400 dark:border-white/[0.15] dark:text-white/35'}`}
                              >
                                {lit && <Check size={12} strokeWidth={3} />}
                                {ex.fit}
                              </span>
                            </span>
                          </span>
                        </span>
                      </span>
                    </span>
                  </button>
                  <span aria-hidden="true" className="absolute inset-x-0 -bottom-px h-px">
                    <span className="block h-full bg-slate-900/60 dark:bg-white/70" style={{ width: `${active ? p * 100 : 0}%` }} />
                  </span>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="mt-14 text-center lg:mt-20">
          <p className="text-[16px] leading-[1.7] text-slate-600 dark:text-slate-400">
            That context is hard to fit into a few database filters.
          </p>
          <p className="mx-auto mt-4 text-[clamp(22px,2.6vw,34px)] font-semibold leading-[1.3] tracking-[-0.02em] text-slate-900 [text-wrap:balance] dark:text-white">
            So teams still spend hours researching companies, checking whether they actually fit, and
            finding the right people inside them.{' '}
            <span className="text-ember-500 dark:text-ember-400">Harvin was built to do that work.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
