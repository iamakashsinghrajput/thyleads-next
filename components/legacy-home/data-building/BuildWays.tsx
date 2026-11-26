'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, FileSpreadsheet, FileUp, Sparkles } from 'lucide-react';
import { Accent, Eyebrow } from '../ui';
import { CompanyLogo, stageVars } from './shared';

/**
 * Two ways to build — film on the left, copy on the right.
 *
 *   A  Create from scratch   a new list builds stage by stage from the
 *                            Company Profile: companies arrive, get
 *                            researched, scored, then matched to a buyer.
 *   B  Enrich existing data  a messy spreadsheet uploads; names and titles
 *                            normalise, empty cells fill, rows get scored and
 *                            missing decision-makers are added.
 * The copy's step list ticks in time with the film. Theme-aware via
 * stageVars, no box behind the animation. Real company logos; values are
 * public facts or clearly illustrative.
 */

const PATHS = [
  {
    tag: 'A',
    icon: Sparkles,
    title: 'Create from scratch',
    sub: 'Starts from your saved Company Profile',
    steps: ['Company Profile', 'Find companies', 'Research', 'Company Fit', 'Decision-makers'],
    at: [300, 1300, 2600, 3900, 5000],
    dur: 7000,
  },
  {
    tag: 'B',
    icon: FileUp,
    title: 'Enrich existing data',
    sub: 'Upload a CSV or XLSX of companies, leads or both',
    steps: ['Upload', 'Normalize', 'Fill gaps', 'Company Fit', 'Missing decision-makers'],
    at: [300, 1500, 2900, 4300, 5400],
    dur: 7600,
  },
];

const READY = ['Researched companies', 'Company Fit', 'Decision-makers', 'Verified email and phone'];

const SCRATCH = [
  { name: 'Etsy', fit: 94, dm: 'Head of Payments' },
  { name: 'eBay', fit: 91, dm: 'Head of Payments' },
  { name: 'HubSpot', fit: 86, dm: 'VP Finance' },
  { name: 'Twilio', fit: 78, dm: 'Head of Finance' },
];

const UPLOAD = [
  { raw: 'ETSY INC', name: 'Etsy', hqRaw: '', hq: 'Brooklyn, US', roleRaw: 'head of payments', role: 'Head of Payments', fit: 94 },
  { raw: 'ebay inc.', name: 'eBay', hqRaw: 'san jose', hq: 'San Jose, US', roleRaw: '', role: 'Head of Payments', fit: 91 },
  { raw: 'HUBSPOT, INC.', name: 'HubSpot', hqRaw: '', hq: 'Cambridge, US', roleRaw: 'VP FINANCE', role: 'VP Finance', fit: 86 },
  { raw: 'twilio inc', name: 'Twilio', hqRaw: '', hq: 'San Francisco, US', roleRaw: '', role: 'Head of Finance', fit: 78 },
];

const ENTER_MS = 600;
const EXIT_MS = 450;

const clamp = (v: number) => Math.min(1, Math.max(0, v));
const ease = (v: number) => 1 - Math.pow(1 - clamp(v), 3);
const easeInOut = (v: number) => {
  const x = clamp(v);
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
};

const styles =
  stageVars('bw-stage') +
  `
  @keyframes bwShimmer { from { background-position: 200% 0; } to { background-position: -200% 0; } }
  .bw-shimmer {
    color: transparent;
    background: linear-gradient(90deg, rgb(var(--ink) / .25) 0%, rgb(var(--ink) / .7) 50%, rgb(var(--ink) / .25) 100%);
    background-size: 200% 100%;
    -webkit-background-clip: text; background-clip: text;
    animation: bwShimmer 1.6s linear infinite;
  }
  @media (prefers-reduced-motion: reduce) { .bw-shimmer { animation: none; } }
`;

/* ---------- pieces ---------- */

function Shimmer({ children }: { children: React.ReactNode }) {
  return <span className="bw-shimmer text-[11.5px] font-medium">{children}</span>;
}

function Ring({ value, p }: { value: number; p: number }) {
  const size = 28;
  const r = 11.5;
  const c = 2 * Math.PI * r;
  return (
    <span className="relative grid flex-shrink-0 place-items-center" style={{ width: size, height: size, opacity: p > 0 ? 1 : 0 }}>
      <svg viewBox={`0 0 ${size} ${size}`} className="absolute inset-0 -rotate-90" aria-hidden="true">
        <circle cx={14} cy={14} r={r} fill="none" strokeWidth={2.6} style={{ stroke: 'rgb(var(--ink)/0.08)' }} />
        <circle cx={14} cy={14} r={r} fill="none" strokeWidth={2.6} strokeLinecap="round" className="stroke-emerald-500" strokeDasharray={c} strokeDashoffset={c * (1 - (value / 100) * p)} />
      </svg>
      <span className="relative text-[9.5px] font-bold tabular-nums text-[rgb(var(--ink))]">{Math.round(value * p)}</span>
    </span>
  );
}

function Stepper({ steps, at, t }: { steps: string[]; at: number[]; t: number }) {
  const cur = at.filter((a) => t >= a).length - 1;
  const next = at[cur + 1] ?? at[cur] + 1200;
  const fill = clamp((cur + clamp((t - at[cur]) / (next - at[cur]))) / (steps.length - 1));
  return (
    <div className="relative px-4 pb-7 pt-3.5 sm:pb-8">
      <div className="absolute left-[calc(16px+5px)] right-[calc(16px+5px)] top-[19px] h-[2px] rounded-full bg-[rgb(var(--ink)/0.08)]">
        <div className="h-full rounded-full bg-emerald-500" style={{ width: `${fill * 100}%` }} />
      </div>
      <div className="relative flex justify-between">
        {steps.map((s, i) => {
          const on = i <= cur;
          return (
            <span key={s} className="relative flex w-0 flex-col items-center">
              <span className={`h-3 w-3 flex-shrink-0 rounded-full border-2 ${on ? 'border-emerald-500 bg-emerald-500' : 'border-[rgb(var(--ink)/0.2)] bg-[var(--panel)]'}`} />
              {/* end labels anchor inward so they never clip */}
              <span
                className={`absolute top-[18px] hidden whitespace-nowrap text-[10px] font-medium sm:block ${i === cur ? 'text-[rgb(var(--ink))]' : 'text-[rgb(var(--ink)/0.4)]'}`}
                style={i === 0 ? { left: -6 } : i === steps.length - 1 ? { right: -6 } : { left: '50%', transform: 'translateX(-50%)' }}
              >
                {s}
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}

function Panel({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full max-w-[620px] overflow-hidden rounded-xl border border-[rgb(var(--ink)/0.09)] bg-[var(--panel)] shadow-[0_24px_60px_rgb(0_0_0/var(--sh))]">
      {children}
    </div>
  );
}

const COLS = 'grid grid-cols-[1.3fr_1fr_44px_1.25fr] items-center gap-2';

/* ---------- Scene A · Create from scratch ---------- */

function SceneScratch({ t }: { t: number }) {
  const [S1, S2, S3, S4, S5] = PATHS[0].at;
  const count = Math.round(1284 * ease((t - S2) / 2200));
  return (
    <Panel>
      <div className="flex items-center gap-2.5 border-b border-[rgb(var(--ink)/0.07)] px-4 py-3">
        <Sparkles size={14} className="text-[rgb(var(--ink)/0.5)]" />
        <span className="text-[13px] font-semibold text-[rgb(var(--ink))]">New list · Cross-border payments</span>
        <span
          className="ml-auto rounded-full bg-[rgb(var(--ink)/0.06)] px-2 py-0.5 text-[11px] font-medium text-[rgb(var(--ink)/0.7)]"
          style={{ opacity: ease((t - S1) / 400) }}
        >
          From Company Profile
        </span>
      </div>
      <Stepper steps={PATHS[0].steps} at={PATHS[0].at} t={t} />
      <div className={`${COLS} border-y border-[rgb(var(--ink)/0.07)] bg-[rgb(var(--ink)/0.02)] px-4 py-2 text-[10.5px] font-semibold uppercase tracking-[0.1em] text-[rgb(var(--ink)/0.45)]`}>
        <span>Company</span><span>Research</span><span>Fit</span><span>Decision-maker</span>
      </div>
      {SCRATCH.map((r, k) => {
        const e = ease((t - S2 - k * 180) / 380);
        const rAt = S3 + k * 220;
        const researched = t >= rAt + 500;
        const fit = ease((t - S4 - k * 180) / 700);
        const dm = ease((t - S5 - k * 180) / 380);
        return (
          <div key={r.name} className={`${COLS} border-b border-[rgb(var(--ink)/0.05)] px-4 py-2.5 last:border-b-0`} style={{ opacity: e, transform: `translateY(${(1 - e) * -8}px)` }}>
            <span className="flex min-w-0 items-center gap-2">
              <CompanyLogo name={r.name} className="h-6 w-6 rounded-md" />
              <span className="truncate text-[13px] font-semibold text-[rgb(var(--ink))]">{r.name}</span>
            </span>
            <span className="min-w-0 text-[11.5px]">
              {researched ? (
                <span className="inline-flex items-center gap-1 font-medium text-emerald-600 dark:text-emerald-400"><Check size={11} strokeWidth={3} /> Researched</span>
              ) : t >= rAt ? (
                <Shimmer>Researching…</Shimmer>
              ) : (
                <span className="block h-1.5 w-12 rounded bg-[rgb(var(--ink)/0.07)]" />
              )}
            </span>
            <Ring value={r.fit} p={fit} />
            <span className="min-w-0">
              <span
                className="inline-flex max-w-full truncate rounded-full bg-[rgb(var(--ink)/0.06)] px-2 py-0.5 text-[11.5px] font-medium text-[rgb(var(--ink)/0.85)]"
                style={{ opacity: dm, transform: `translateX(${(1 - dm) * 8}px)` }}
              >
                {r.dm}
              </span>
            </span>
          </div>
        );
      })}
      <div className="flex items-center justify-between border-t border-[rgb(var(--ink)/0.07)] px-4 py-2.5 text-[12px] text-[rgb(var(--ink)/0.6)]">
        <span>{t >= S2 ? `${count.toLocaleString('en-US')} companies found` : 'Waiting for search…'}</span>
        <span className="text-[rgb(var(--ink)/0.4)]">showing 4</span>
      </div>
    </Panel>
  );
}

/* ---------- Scene B · Enrich existing data ---------- */

/** Old value struck and fading out while the clean value fades in. */
function Morph({ from, to, p, mono = false }: { from: string; to: string; p: number; mono?: boolean }) {
  return (
    <span className="relative block h-[18px] min-w-0">
      {from && (
        <span
          className={`absolute inset-0 truncate text-[rgb(var(--ink)/0.55)] ${mono ? 'font-mono text-[11px]' : ''} ${p > 0 ? 'line-through' : ''}`}
          style={{ opacity: 1 - p }}
        >
          {from}
        </span>
      )}
      <span className="absolute inset-0 truncate font-semibold text-[rgb(var(--ink))]" style={{ opacity: p, transform: `translateY(${(1 - p) * 4}px)` }}>
        {to}
      </span>
    </span>
  );
}

function SceneEnrich({ t }: { t: number }) {
  const [S1, S2, S3, S4, S5] = PATHS[1].at;
  const file = ease((t - S1) / 450);
  return (
    <Panel>
      <div className="flex items-center gap-2.5 border-b border-[rgb(var(--ink)/0.07)] px-4 py-3">
        <FileSpreadsheet size={15} className={t >= S2 ? 'text-emerald-600 dark:text-emerald-400' : 'text-[rgb(var(--ink)/0.5)]'} />
        <span className="text-[13px] font-semibold text-[rgb(var(--ink))]" style={{ opacity: file }}>accounts.xlsx</span>
        <span className="h-1 w-20 overflow-hidden rounded-full bg-[rgb(var(--ink)/0.08)]">
          <span className="block h-full rounded-full bg-emerald-500" style={{ width: `${ease((t - S1) / 1000) * 100}%` }} />
        </span>
        <span className="ml-auto text-[11px] text-[rgb(var(--ink)/0.45)]">4 rows</span>
      </div>
      <Stepper steps={PATHS[1].steps} at={PATHS[1].at} t={t} />
      <div className={`${COLS} border-y border-[rgb(var(--ink)/0.07)] bg-[rgb(var(--ink)/0.02)] px-4 py-2 text-[10.5px] font-semibold uppercase tracking-[0.1em] text-[rgb(var(--ink)/0.45)]`}>
        <span>Company</span><span>HQ</span><span>Fit</span><span>Decision-maker</span>
      </div>
      {UPLOAD.map((r, k) => {
        const e = ease((t - S1 - 300 - k * 140) / 380);
        const norm = ease((t - S2 - k * 220) / 420);
        const gapAt = S3 + k * 260;
        const hqFill = r.hqRaw ? norm : ease((t - gapAt - 350) / 380);
        const fit = ease((t - S4 - k * 180) / 700);
        const dmAt = S5 + k * 200;
        const roleP = r.roleRaw ? norm : ease((t - dmAt) / 380);
        return (
          <div key={r.name} className={`${COLS} border-b border-[rgb(var(--ink)/0.05)] px-4 py-2.5 text-[12.5px] last:border-b-0`} style={{ opacity: e }}>
            <span className="flex min-w-0 items-center gap-2">
              <span style={{ opacity: norm }}><CompanyLogo name={r.name} className="h-6 w-6 rounded-md" /></span>
              <span className="min-w-0 flex-1"><Morph from={r.raw} to={r.name} p={norm} mono /></span>
            </span>
            <span className="min-w-0">
              {r.hqRaw ? (
                <Morph from={r.hqRaw} to={r.hq} p={norm} mono />
              ) : hqFill > 0 ? (
                <span className="block truncate font-medium text-[rgb(var(--ink))]" style={{ opacity: hqFill }}>{r.hq}</span>
              ) : t >= gapAt ? (
                <Shimmer>Filling…</Shimmer>
              ) : (
                <span className="inline-block rounded border border-dashed border-[rgb(var(--ink)/0.2)] px-1.5 text-[10.5px] text-[rgb(var(--ink)/0.35)]">empty</span>
              )}
            </span>
            <Ring value={r.fit} p={fit} />
            <span className="min-w-0">
              {r.roleRaw ? (
                <Morph from={r.roleRaw} to={r.role} p={norm} mono />
              ) : roleP > 0 ? (
                <span className="inline-flex max-w-full items-center gap-1 truncate rounded-full bg-emerald-500/15 px-2 py-0.5 text-[11.5px] font-medium text-emerald-700 dark:text-emerald-300" style={{ opacity: roleP }}>
                  + {r.role}
                </span>
              ) : (
                <span className="inline-block rounded border border-dashed border-[rgb(var(--ink)/0.2)] px-1.5 text-[10.5px] text-[rgb(var(--ink)/0.35)]">missing</span>
              )}
            </span>
          </div>
        );
      })}
      <div className="flex items-center gap-2 border-t border-[rgb(var(--ink)/0.07)] px-4 py-2.5 text-[12px] text-[rgb(var(--ink)/0.6)]">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        {t >= S5 + 900 ? 'Clean, complete and scored' : t >= S2 ? 'Cleaning your data…' : 'Uploading…'}
      </div>
    </Panel>
  );
}

const SCENES = [SceneScratch, SceneEnrich];

/* ---------- section ---------- */

export default function BuildWays() {
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

  useEffect(() => {
    if (!inView || reduced) return;
    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min(64, now - last);
      last = now;
      setPos((p) => (p.t + dt >= PATHS[p.scene].dur ? { scene: (p.scene + 1) % PATHS.length, t: 0 } : { scene: p.scene, t: p.t + dt }));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced]);

  const dur = PATHS[scene].dur;
  const clock = reduced ? dur - EXIT_MS - 1 : t;
  const enter = reduced ? 1 : ease(clock / ENTER_MS);
  const exit = reduced ? 0 : easeInOut((clock - (dur - EXIT_MS)) / EXIT_MS);
  const ready = scene === 1 && clock >= PATHS[1].at[4] + 900;
  const Scene = SCENES[scene];

  return (
    <section className="border-t border-slate-200 bg-sand-100 px-4 py-16 dark:border-white/[0.06] dark:bg-[#040404] sm:px-6 lg:px-8 lg:py-20">
      <style>{styles}</style>
      <div id="two-ways" ref={ref} className="mx-auto grid max-w-[1180px] scroll-mt-28 grid-cols-1 items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
        {/* Film */}
        <div
          className="bw-stage relative flex min-h-[460px] items-center justify-center pb-6 pt-2 sm:min-h-[480px]"
          role="img"
          aria-label={
            scene === 0
              ? 'A new list builds from the Company Profile: companies found, researched, scored and matched to a decision-maker.'
              : 'An uploaded spreadsheet is normalised, its gaps filled, rows scored and missing decision-makers added.'
          }
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
          <p className="pointer-events-none absolute inset-x-0 bottom-0 text-center text-[11px] text-slate-400 dark:text-slate-500">
            Illustrative example. Logos belong to their owners; scores are not real data.
          </p>
        </div>

        {/* Copy */}
        <div>
          <Eyebrow>Two ways to build</Eyebrow>
          <h2 className="mt-3 text-[clamp(26px,2.5vw,36px)] font-semibold leading-[1.12] tracking-[-0.025em] text-slate-900 dark:text-white">
            Build your list from scratch, or <Accent>improve the one you already have.</Accent>
          </h2>

          <ol className="mt-8 border-t border-slate-200 dark:border-white/[0.08]">
            {PATHS.map((path, i) => {
              const active = i === scene;
              const Icon = path.icon;
              return (
                <li key={path.tag} className="relative border-b border-slate-200 dark:border-white/[0.08]">
                  <button
                    type="button"
                    onClick={() => setPos({ scene: i, t: 0 })}
                    aria-current={active ? 'step' : undefined}
                    className="group flex w-full items-start gap-4 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:focus-visible:ring-white/40"
                  >
                    <span
                      className={`grid h-9 w-9 flex-shrink-0 place-items-center rounded-lg transition-colors duration-500
                                  ${active ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'bg-slate-100 text-slate-500 dark:bg-white/[0.05] dark:text-slate-400'}`}
                    >
                      <Icon size={16} strokeWidth={2} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className={`block text-[18px] font-semibold tracking-[-0.015em] transition-colors duration-500 ${active ? 'text-slate-900 dark:text-white' : 'text-slate-400 group-hover:text-slate-700 dark:text-white/45 dark:group-hover:text-white/75'}`}>
                        {path.title}
                      </span>
                      <span className="block text-[13.5px] text-slate-500 dark:text-slate-400">{path.sub}</span>
                      <span className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${active ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                        <span className="overflow-hidden">
                          <span className="flex flex-wrap gap-1.5 pt-3.5">
                            {path.steps.map((s, k) => {
                              const on = active && clock >= path.at[k];
                              return (
                                <span
                                  key={s}
                                  className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[12px] font-medium transition-all duration-500
                                              ${on
                                                ? 'border-slate-900 bg-slate-900 text-white dark:border-white dark:bg-white dark:text-slate-900'
                                                : 'border-slate-200 text-slate-400 dark:border-white/[0.1] dark:text-white/35'}`}
                                >
                                  {on && <Check size={11} strokeWidth={3} />}
                                  {s}
                                </span>
                              );
                            })}
                          </span>
                          {i === 1 && <span className="block pt-3 text-[13.5px] text-slate-600 dark:text-slate-400">Clean data before the SDR sees it.</span>}
                        </span>
                      </span>
                    </span>
                  </button>
                  <span aria-hidden="true" className="absolute inset-x-0 -bottom-px h-px">
                    <span className="block h-full bg-slate-900/60 dark:bg-white/70" style={{ width: `${active ? (clock / dur) * 100 : 0}%` }} />
                  </span>
                </li>
              );
            })}
          </ol>

          {/* Where both paths end */}
          <div className="mt-6">
            <p className="flex items-center gap-2 text-[14.5px] font-semibold text-slate-900 dark:text-white">
              <span className={`grid h-5 w-5 place-items-center rounded-full transition-colors duration-500 ${ready ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-500 dark:bg-white/[0.08] dark:text-slate-400'}`}>
                <Check size={11} strokeWidth={3.2} />
              </span>
              Sales-ready data
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {READY.map((x) => (
                <span key={x} className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[12.5px] text-slate-700 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-slate-300">
                  {x}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
