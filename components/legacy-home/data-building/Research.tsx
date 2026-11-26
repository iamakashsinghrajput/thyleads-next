'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown, Database, FileText, Globe2, Landmark, Loader2, Newspaper, Plus, Sparkles } from 'lucide-react';
import { Accent, Eyebrow, Heading, Lead, Section } from '../ui';
import { CompanyLogo, stageVars } from './shared';

/**
 * Company research, then the Enrich Column.
 *
 * Research: a two-scene film of Etsy's record (see ResearchFilm) — what the
 * database has, then Harvin reading public sources to fill what decides fit.
 *
 * Enrich Column: a cursor-driven product card (see EnrichDemo).
 */

/* ---------- Company research film ----------
 * Scene 1 · Standard company data: the record a database already has fills
 *   in; everything that decides fit is missing, so fit is "?".
 * Scene 2 · Researched by Harvin: public sources are read one by one; each
 *   finished source fills the fields it supports (with a source tag), then
 *   Company Fit resolves.
 * Real company (Etsy), public facts only; fit score is illustrative.
 */

const STANDARD = [
  { k: 'Industry', v: 'Internet' },
  { k: 'Company size', v: '2,000+' },
  { k: 'HQ', v: 'Brooklyn, NY' },
];

const SOURCES = [
  { name: 'etsy.com', kind: 'Website', icon: Globe2 },
  { name: 'Investor relations', kind: 'investors.etsy.com', icon: Landmark },
  { name: '2023 annual report', kind: 'Form 10-K', icon: FileText },
  { name: 'Engineering blog', kind: 'Code as Craft', icon: Newspaper },
];

const RESEARCHED = [
  { k: 'Category', v: 'Online marketplace', src: 0 },
  { k: 'Business model', v: 'Two-sided marketplace', src: 0 },
  { k: 'Funding', v: 'Public · NASDAQ', src: 1 },
  { k: 'Revenue', v: '$2.7B (2023)', src: 2 },
  { k: 'Active buyers', v: '90M+', src: 2 },
  { k: 'Technologies', v: 'Google Cloud', src: 3 },
];

const R_CHAPTERS = [
  { n: '01', title: 'Standard company data', items: STANDARD.map((f) => f.k), dur: 5200 },
  { n: '02', title: 'Researched by Harvin', items: RESEARCHED.map((f) => f.k), dur: 8600 },
];

const SRC_FROM = 500;
const SRC_MS = 1100;
const SRC_STEP = 1050;
const srcDone = (i: number) => SRC_FROM + i * SRC_STEP + SRC_MS;
const FIT_AT = srcDone(SOURCES.length - 1) + 500;

const clamp = (v: number) => Math.min(1, Math.max(0, v));
const ease = (v: number) => 1 - Math.pow(1 - clamp(v), 3);
const easeInOut = (v: number) => {
  const x = clamp(v);
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
};

const R_STYLES =
  stageVars('rs-stage') +
  `
  @keyframes rsShimmer { from { background-position: 200% 0; } to { background-position: -200% 0; } }
  .rs-shimmer {
    color: transparent;
    background: linear-gradient(90deg, rgb(var(--ink) / .25) 0%, rgb(var(--ink) / .7) 50%, rgb(var(--ink) / .25) 100%);
    background-size: 200% 100%;
    -webkit-background-clip: text; background-clip: text;
    animation: rsShimmer 1.6s linear infinite;
  }
  @media (prefers-reduced-motion: reduce) { .rs-shimmer { animation: none; } }
`;

function FitDial({ p }: { p: number }) {
  const size = 44;
  const r = 18;
  const c = 2 * Math.PI * r;
  return (
    <span className="relative grid h-11 w-11 flex-shrink-0 place-items-center">
      <svg viewBox={`0 0 ${size} ${size}`} className="absolute inset-0 -rotate-90" aria-hidden="true">
        <circle cx={22} cy={22} r={r} fill="none" strokeWidth={3.5} style={{ stroke: 'rgb(var(--ink)/0.08)' }} />
        <circle cx={22} cy={22} r={r} fill="none" strokeWidth={3.5} strokeLinecap="round" className="stroke-emerald-500" strokeDasharray={c} strokeDashoffset={c * (1 - 0.88 * p)} />
      </svg>
      <span className="relative text-[13px] font-bold tabular-nums text-[rgb(var(--ink))]">{p > 0.02 ? Math.round(88 * p) : '?'}</span>
    </span>
  );
}

function RecordHeader({ status, fit }: { status: 'db' | 'researching' | 'done'; fit: number }) {
  return (
    <div className="flex items-center gap-3 border-b border-[rgb(var(--ink)/0.08)] px-4 py-3">
      <CompanyLogo name="Etsy" className="h-10 w-10 rounded-xl" />
      <span className="min-w-0 flex-1">
        <span className="block text-[15px] font-semibold text-[rgb(var(--ink))]">Etsy</span>
        <span className="block text-[12px] text-[rgb(var(--ink)/0.5)]">etsy.com</span>
      </span>
      <span
        className={`hidden items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold sm:inline-flex
                    ${status === 'done' ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300' : 'bg-[rgb(var(--ink)/0.06)] text-[rgb(var(--ink)/0.65)]'}`}
      >
        {status === 'done' ? <Check size={11} strokeWidth={3} /> : status === 'researching' ? <Loader2 size={11} className="animate-spin" /> : <Database size={11} />}
        {status === 'done' ? 'Research complete' : status === 'researching' ? 'Researching' : 'Database record'}
      </span>
      <span className="flex items-center gap-2">
        <span className="hidden text-right sm:block">
          <span className="block text-[10.5px] text-[rgb(var(--ink)/0.5)]">Company Fit</span>
          <span className={`block text-[11.5px] font-semibold ${fit > 0.05 ? 'text-emerald-600 dark:text-emerald-400' : 'text-[rgb(var(--ink)/0.45)]'}`}>
            {fit > 0.05 ? 'Strong fit' : 'Unknown'}
          </span>
        </span>
        <FitDial p={fit} />
      </span>
    </div>
  );
}

function Field({ k, v, state, src }: { k: string; v: string; state: 'empty' | 'missing' | 'working' | 'done'; src?: string }) {
  return (
    <div
      className={`flex min-h-[66px] flex-col rounded-lg border px-3 py-2 transition-colors duration-500
                  ${state === 'done' ? 'border-emerald-500/35 bg-emerald-500/[0.06]' : 'border-dashed border-[rgb(var(--ink)/0.14)]'}`}
    >
      <span className="flex items-center justify-between gap-2 text-[11px] text-[rgb(var(--ink)/0.5)]">
        {k}
        {state === 'done' && <Check size={11} strokeWidth={3} className="text-emerald-600 dark:text-emerald-400" />}
      </span>
      <span className="mt-auto pt-1.5">
        {state === 'done' ? (
          <span className="block">
            <span className="block truncate text-[14px] font-semibold leading-tight text-[rgb(var(--ink))]">{v}</span>
            {src && <span className="mt-1 inline-block rounded bg-[rgb(var(--ink)/0.06)] px-1.5 py-px text-[9.5px] font-medium text-[rgb(var(--ink)/0.55)]">{src}</span>}
          </span>
        ) : state === 'working' ? (
          <span className="rs-shimmer text-[11.5px] font-medium">Researching…</span>
        ) : state === 'missing' ? (
          <span className="text-[11.5px] text-[rgb(var(--ink)/0.4)]">Not in the record</span>
        ) : (
          <span className="block h-2 w-1/2 rounded-full bg-[rgb(var(--ink)/0.07)]" />
        )}
      </span>
    </div>
  );
}

/** Scene 1: what the database already knows. */
function SceneStandard({ t }: { t: number }) {
  const card = ease(t / 450);
  return (
    <div className="w-full max-w-[620px] overflow-hidden rounded-xl border border-[rgb(var(--ink)/0.09)] bg-[var(--panel)] shadow-[0_24px_60px_rgb(0_0_0/var(--sh))]" style={{ opacity: card, transform: `translateY(${(1 - card) * 10}px)` }}>
      <RecordHeader status="db" fit={0} />
      <div className="p-4">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[rgb(var(--ink)/0.4)]">Standard company data</p>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {STANDARD.map((f, i) => {
            const e = ease((t - 400 - i * 260) / 380);
            return (
              <div key={f.k} className="rounded-lg border border-[rgb(var(--ink)/0.1)] bg-[rgb(var(--ink)/0.03)] px-3 py-2">
                <p className="text-[11px] text-[rgb(var(--ink)/0.5)]">{f.k}</p>
                <p className="text-[14px] font-semibold text-[rgb(var(--ink))]" style={{ opacity: e, transform: `translateY(${(1 - e) * 4}px)` }}>{f.v}</p>
              </div>
            );
          })}
        </div>
        <p className="mt-4 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[rgb(var(--ink)/0.4)]">What decides fit</p>
        <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {RESEARCHED.map((f, i) => {
            const missing = t >= 1700 + i * 200;
            return <Field key={f.k} k={f.k} v={f.v} state={missing ? 'missing' : 'empty'} />;
          })}
        </div>
      </div>
    </div>
  );
}

/** Scene 2: Harvin reads public sources and fills the fields they support. */
function SceneResearched({ t }: { t: number }) {
  const done = t >= FIT_AT;
  const fit = ease((t - FIT_AT) / 900);
  return (
    <div className="w-full max-w-[640px] overflow-hidden rounded-xl border border-[rgb(var(--ink)/0.09)] bg-[var(--panel)] shadow-[0_24px_60px_rgb(0_0_0/var(--sh))]">
      <RecordHeader status={done ? 'done' : 'researching'} fit={fit} />
      <div className="grid grid-cols-1 sm:grid-cols-[0.8fr_1.2fr]">
        {/* Sources being read */}
        <div className="border-b border-[rgb(var(--ink)/0.08)] p-4 sm:border-b-0 sm:border-r">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[rgb(var(--ink)/0.4)]">Sources</p>
          <ul className="mt-2 space-y-1.5">
            {SOURCES.map((s, i) => {
              const start = SRC_FROM + i * SRC_STEP;
              const pr = clamp((t - start) / SRC_MS);
              const reading = pr > 0 && pr < 1;
              const Icon = s.icon;
              return (
                <li
                  key={s.name}
                  className={`rounded-lg border px-2.5 py-2 transition-colors duration-300 ${reading ? 'border-[rgb(var(--ink)/0.25)] bg-[rgb(var(--ink)/0.04)]' : 'border-[rgb(var(--ink)/0.08)]'}`}
                >
                  <span className="flex items-center gap-2">
                    <Icon size={13} className={pr >= 1 ? 'text-emerald-600 dark:text-emerald-400' : 'text-[rgb(var(--ink)/0.45)]'} />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[12px] font-semibold text-[rgb(var(--ink)/0.9)]">{s.name}</span>
                      <span className="block truncate text-[10.5px] text-[rgb(var(--ink)/0.45)]">{s.kind}</span>
                    </span>
                    {pr >= 1 ? <Check size={12} strokeWidth={3} className="text-emerald-600 dark:text-emerald-400" /> : reading ? <span className="rs-shimmer text-[10.5px] font-medium">Reading</span> : null}
                  </span>
                  <span className="mt-1.5 block h-[3px] overflow-hidden rounded-full bg-[rgb(var(--ink)/0.07)]">
                    <span className={`block h-full rounded-full ${pr >= 1 ? 'bg-emerald-500' : 'bg-[rgb(var(--ink)/0.5)]'}`} style={{ width: `${easeInOut(pr) * 100}%` }} />
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Fields filled from those sources */}
        <div className="p-4">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[rgb(var(--ink)/0.4)]">Researched by Harvin</p>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {RESEARCHED.map((f) => {
              const start = SRC_FROM + f.src * SRC_STEP;
              const state = t >= srcDone(f.src) ? 'done' : t >= start ? 'working' : 'empty';
              return <Field key={f.k} k={f.k} v={f.v} state={state} src={SOURCES[f.src].name} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

const R_SCENES = [SceneStandard, SceneResearched];

function ResearchFilm() {
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
      setPos((p) => (p.t + dt >= R_CHAPTERS[p.scene].dur ? { scene: (p.scene + 1) % R_CHAPTERS.length, t: 0 } : { scene: p.scene, t: p.t + dt }));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced]);

  const EXIT = 450;
  const dur = R_CHAPTERS[scene].dur;
  const clock = reduced ? dur - EXIT - 1 : t;
  const enter = reduced ? 1 : ease(clock / 600);
  const exit = reduced ? 0 : easeInOut((clock - (dur - EXIT)) / EXIT);
  const Scene = R_SCENES[scene];

  // Which fields the copy list ticks off, in step with the film.
  const ticked = (i: number, j: number) => {
    if (i !== scene) return false;
    if (i === 0) return clock >= 400 + j * 260 + 200;
    return clock >= srcDone(RESEARCHED[j].src);
  };

  return (
    <div id="research" ref={ref} className="grid scroll-mt-28 grid-cols-1 items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
      <style>{R_STYLES}</style>
      {/* Film */}
      <div
        className="rs-stage relative flex min-h-[460px] items-center justify-center pb-6 pt-2 sm:min-h-[500px]"
        role="img"
        aria-label={
          scene === 0
            ? 'Etsy’s database record has industry, size and HQ, but none of the fields that decide fit.'
            : 'Harvin reads Etsy’s website, investor relations, annual report and engineering blog, fills the missing fields with sources, and scores a strong fit.'
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
          Illustrative values. Field availability varies by company. Fit score is not real data.
        </p>
      </div>

      {/* Copy */}
      <div>
        <Eyebrow>Company research</Eyebrow>
        <h2 className="mt-3 text-[clamp(26px,2.5vw,36px)] font-semibold leading-[1.12] tracking-[-0.025em] text-slate-900 dark:text-white">
          Add the company data that <Accent>actually decides fit.</Accent>
        </h2>
        <p className="mt-4 text-[15.5px] leading-[1.65] text-slate-600 dark:text-slate-400">
          Harvin can research and refresh the information your targeting depends on, instead of relying only on what’s
          already in the company record.
        </p>

        <ol className="mt-7 border-t border-slate-200 dark:border-white/[0.08]">
          {R_CHAPTERS.map((c, i) => {
            const active = i === scene;
            return (
              <li key={c.n} className="relative border-b border-slate-200 dark:border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => setPos({ scene: i, t: 0 })}
                  aria-current={active ? 'step' : undefined}
                  className="group flex w-full items-start gap-5 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:focus-visible:ring-white/40"
                >
                  <span className={`w-7 flex-shrink-0 pt-[3px] font-mono text-[13px] tabular-nums transition-colors ${active ? 'text-ember-500 dark:text-ember-400' : 'text-slate-400 dark:text-white/30'}`}>
                    {c.n}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className={`block text-[18px] font-semibold tracking-[-0.015em] transition-colors duration-500 ${active ? 'text-slate-900 dark:text-white' : 'text-slate-400 group-hover:text-slate-700 dark:text-white/45 dark:group-hover:text-white/75'}`}>
                      {c.title}
                    </span>
                    <span className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${active ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                      <span className="overflow-hidden">
                        <span className="flex flex-wrap gap-1.5 pt-3.5">
                          {c.items.map((it, j) => {
                            const on = ticked(i, j);
                            return (
                              <span
                                key={it}
                                className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[12px] font-medium transition-all duration-500
                                            ${on
                                              ? 'border-slate-900 bg-slate-900 text-white dark:border-white dark:bg-white dark:text-slate-900'
                                              : 'border-slate-200 text-slate-400 dark:border-white/[0.1] dark:text-white/35'}`}
                              >
                                {on && <Check size={11} strokeWidth={3} />}
                                {it}
                              </span>
                            );
                          })}
                        </span>
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
      </div>
    </div>
  );
}

/* ---------- Enrich Column ----------
 * A live product card driven by a cursor, on one frame clock:
 *   cursor → "+ Add column" (click) → field menu opens, hover walks down to
 *   "Customer type" (click) → "Research 5 companies" prompt → Run (click) →
 *   cells research row by row → "Column added" toast. Cursor targets are
 *   measured from the real elements, so it lands right at any width.
 */

const ROWS = [
  { name: 'Etsy', cat: 'Online marketplace', hq: 'Brooklyn, US', value: 'Consumers & sellers' },
  { name: 'eBay', cat: 'Online marketplace', hq: 'San Jose, US', value: 'Consumers & sellers' },
  { name: 'Twilio', cat: 'Communications APIs', hq: 'San Francisco, US', value: 'Businesses' },
  { name: 'Instacart', cat: 'Grocery delivery', hq: 'San Francisco, US', value: 'Consumers & retailers' },
  { name: 'HubSpot', cat: 'CRM software', hq: 'Cambridge, US', value: 'Businesses' },
];

const FIELDS = ['Revenue', 'Funding', 'Customer type', 'Location count', 'Technologies'];
const PICK = 'Customer type';
const PICK_IDX = FIELDS.indexOf(PICK);

const E_DUR = 9600;
const C_ADD = 1400; // click "Add column"
const C_ITEM = 3000; // click the field
const C_RUN = 4100; // click Run
const MENU_OPEN = C_ADD + 100;
const ADDED = C_ITEM + 120;
const RUN_SHOW = ADDED + 250;
const CELL_FROM = C_RUN + 300;
const CELL_STEP = 520;
const CELL_MS = 480;
const ALL_DONE = CELL_FROM + (ROWS.length - 1) * CELL_STEP + CELL_MS;
const TOAST_AT = ALL_DONE + 300;

const ENRICH_STEPS = [
  { k: 'Add a column', at: C_ADD },
  { k: 'Choose a field', at: C_ITEM },
  { k: 'Harvin researches the missing values', at: ALL_DONE },
];

type Pt = { x: number; y: number };
type Targets = { add: Pt; item: Pt; run: Pt; w: number; h: number };

function Cursor({ pos, clicks, t }: { pos: Pt; clicks: number[]; t: number }) {
  const since = clicks.map((c) => t - c).filter((d) => d >= 0 && d < 500);
  const press = since.length ? Math.sin(Math.PI * clamp(since[0] / 220)) : 0;
  return (
    <span aria-hidden="true" className="pointer-events-none absolute left-0 top-0 z-30" style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}>
      {since.map((d, i) => (
        <span
          key={i}
          className="absolute -left-3 -top-3 h-6 w-6 rounded-full border-2 border-slate-900/40 dark:border-white/50"
          style={{ transform: `scale(${0.4 + (d / 500) * 1.4})`, opacity: 1 - d / 500 }}
        />
      ))}
      <svg width="20" height="22" viewBox="0 0 20 22" style={{ transform: `scale(${1 - 0.15 * press})`, transformOrigin: '2px 2px' }} className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]">
        <path d="M2 2 L2 17 L6.2 13.2 L9 19.5 L11.8 18.3 L9.1 12.1 L14.8 12.1 Z" fill="#fff" stroke="#0F172A" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function EnrichDemo({ t }: { t: number }) {
  const wrap = useRef<HTMLDivElement>(null);
  const addRef = useRef<HTMLSpanElement>(null);
  const itemRef = useRef<HTMLLIElement>(null);
  const runRef = useRef<HTMLSpanElement>(null);
  const [tg, setTg] = useState<Targets | null>(null);

  // Measure where the cursor has to go (re-measured on resize).
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const measure = () => {
      const box = el.getBoundingClientRect();
      const at = (n: HTMLElement | null, fx = 0.55, fy = 0.6): Pt => {
        if (!n) return { x: box.width / 2, y: box.height / 2 };
        const r = n.getBoundingClientRect();
        return { x: r.left - box.left + r.width * fx, y: r.top - box.top + r.height * fy };
      };
      setTg({ add: at(addRef.current), item: at(itemRef.current, 0.4), run: at(runRef.current), w: box.width, h: box.height });
    };
    measure();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    ro?.observe(el);
    return () => ro?.disconnect();
  }, []);

  const menuOpen = t >= MENU_OPEN && t < C_ITEM + 80;
  const added = t >= ADDED;
  const runShow = t >= RUN_SHOW && t < C_RUN + 150;
  const running = t >= C_RUN;
  const filled = ROWS.filter((_, k) => t >= CELL_FROM + k * CELL_STEP + CELL_MS).length;
  const toast = ease((t - TOAST_AT) / 350) * (1 - ease((t - (E_DUR - 900)) / 400));

  // Cursor path between measured points.
  let cursor: Pt = { x: 0, y: 0 };
  let opacity = 0;
  if (tg) {
    const start = { x: tg.w - 36, y: tg.h - 30 };
    const rest = { x: tg.w * 0.62, y: tg.h - 40 };
    // Hover walks down the menu items before clicking the pick.
    const menuTop = { x: tg.item.x, y: tg.item.y - PICK_IDX * 30 };
    const path: { at: number; p: Pt }[] = [
      { at: 0, p: start },
      { at: 500, p: start },
      { at: C_ADD - 80, p: tg.add },
      { at: MENU_OPEN + 450, p: tg.add },
      { at: MENU_OPEN + 850, p: menuTop },
      { at: C_ITEM - 80, p: tg.item },
      { at: RUN_SHOW + 250, p: tg.item },
      { at: C_RUN - 80, p: tg.run },
      { at: C_RUN + 700, p: tg.run },
      { at: C_RUN + 1500, p: rest },
      { at: E_DUR, p: rest },
    ];
    let k = path.findIndex((s, i) => i < path.length - 1 && t >= s.at && t < path[i + 1].at);
    if (k < 0) k = path.length - 2;
    const a = path[k];
    const b = path[k + 1];
    const f = easeInOut((t - a.at) / Math.max(1, b.at - a.at));
    cursor = { x: a.p.x + (b.p.x - a.p.x) * f, y: a.p.y + (b.p.y - a.p.y) * f };
    opacity = ease((t - 150) / 300) * (1 - ease((t - (C_RUN + 1600)) / 400));
  }
  // Which menu item the cursor is over while walking down.
  const hover = menuOpen && tg ? Math.max(0, Math.min(PICK_IDX, Math.round((cursor.y - (tg.item.y - PICK_IDX * 30)) / 30))) : -1;

  const cols = 'grid grid-cols-[1.25fr_1.1fr_1.25fr] sm:grid-cols-[1.2fr_1.15fr_1fr_1.25fr] items-center gap-3';

  return (
    <div ref={wrap} className="relative">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.10)] dark:border-white/[0.08] dark:bg-[#0E0D0B] dark:shadow-[0_24px_60px_rgba(0,0,0,0.55)]">
        {/* Title bar */}
        <div className="flex h-12 items-center gap-3 border-b border-slate-200 px-4 dark:border-white/[0.06]">
          <span className="text-[13.5px] font-semibold text-slate-900 dark:text-white">List · Cross-border payments</span>
          <span className="ml-auto text-[11.5px] tabular-nums text-slate-400">
            {running ? `${filled}/${ROWS.length} researched` : `${ROWS.length} companies`}
          </span>
        </div>

        {/* Header row */}
        <div className={`${cols} h-11 border-b border-slate-200 px-4 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400 dark:border-white/[0.06] dark:text-slate-500`}>
          <span>Company</span>
          <span className="hidden sm:block">Category</span>
          <span>HQ</span>
          <span className="flex justify-end sm:justify-start">
            {added ? (
              <span className="inline-flex items-center gap-1 normal-case tracking-normal text-[12px] font-semibold text-slate-900 dark:text-white" style={{ opacity: ease((t - ADDED) / 300) }}>
                <Sparkles size={12} className="text-emerald-500" /> {PICK}
              </span>
            ) : (
              <span
                ref={addRef}
                className={`inline-flex items-center gap-1 whitespace-nowrap rounded-md border px-2 py-1 normal-case tracking-normal text-[12px] font-semibold transition-colors duration-150
                            ${t >= C_ADD - 250 ? 'border-slate-900 bg-slate-900 text-white dark:border-white dark:bg-white dark:text-slate-900' : 'border-dashed border-slate-300 text-slate-500 dark:border-white/[0.18] dark:text-slate-400'}`}
                style={{ transform: `scale(${1 - 0.06 * Math.sin(Math.PI * clamp((t - C_ADD) / 200))})` }}
              >
                <Plus size={12} /> Add column <ChevronDown size={12} />
              </span>
            )}
          </span>
        </div>

        {/* Rows */}
        {ROWS.map((r, k) => {
          const at = CELL_FROM + k * CELL_STEP;
          const done = t >= at + CELL_MS;
          const working = running && t >= at && !done;
          const v = ease((t - at - CELL_MS) / 300);
          return (
            <div key={r.name} className={`${cols} h-12 border-b border-slate-100 px-4 text-[13px] last:border-b-0 dark:border-white/[0.04]`}>
              <span className="flex min-w-0 items-center gap-2.5">
                <CompanyLogo name={r.name} className="h-6 w-6 rounded-md" />
                <span className="truncate font-semibold text-slate-900 dark:text-white">{r.name}</span>
              </span>
              <span className="hidden truncate text-slate-600 dark:text-slate-300 sm:block">{r.cat}</span>
              <span className="truncate text-slate-600 dark:text-slate-300">{r.hq}</span>
              <span
                className={`flex h-full min-w-0 items-center justify-end rounded-md px-1 transition-colors duration-500 sm:justify-start
                            ${added ? (working ? 'bg-emerald-500/[0.07]' : 'bg-slate-50 dark:bg-white/[0.02]') : ''}`}
              >
                {done ? (
                  <span className="inline-flex min-w-0 items-center gap-1.5 font-semibold text-slate-900 dark:text-white" style={{ opacity: v, transform: `translateY(${(1 - v) * 4}px)` }}>
                    <Check size={12} strokeWidth={3} className="flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
                    <span className="truncate">{r.value}</span>
                  </span>
                ) : working ? (
                  <span className="inline-flex items-center gap-1.5 text-[12px] text-emerald-700 dark:text-emerald-300">
                    <Loader2 size={12} className="animate-spin" /> Researching
                  </span>
                ) : added ? (
                  <span aria-hidden="true" className="block h-2 w-14 rounded-full bg-slate-200 dark:bg-white/[0.07]" />
                ) : null}
              </span>
            </div>
          );
        })}
      </div>

      {/* Field menu */}
      <div
        className="absolute right-3 top-[96px] z-20 w-[220px] rounded-xl border border-slate-200 bg-white p-1.5 shadow-[0_12px_36px_rgba(15,23,42,0.16)] transition-all duration-200 dark:border-white/[0.1] dark:bg-[#16130F] dark:shadow-[0_12px_36px_rgba(0,0,0,0.55)]"
        style={{ opacity: menuOpen ? 1 : 0, transform: menuOpen ? 'none' : 'translateY(-6px) scale(0.98)' }}
        aria-hidden="true"
      >
        <p className="px-2.5 pb-1 pt-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">Choose a field</p>
        <ul>
          {FIELDS.map((f, i) => (
            <li
              key={f}
              ref={f === PICK ? itemRef : undefined}
              className={`flex h-[30px] items-center justify-between rounded-lg px-2.5 text-[13px]
                          ${i === hover ? 'bg-slate-100 font-semibold text-slate-900 dark:bg-white/[0.08] dark:text-white' : 'text-slate-700 dark:text-slate-300'}`}
            >
              {f}
              {f === PICK && t >= C_ITEM - 60 && <Check size={13} strokeWidth={2.8} className="text-emerald-600 dark:text-emerald-400" />}
            </li>
          ))}
        </ul>
      </div>

      {/* Run prompt */}
      <div
        className="absolute right-3 top-[96px] z-20 w-[240px] rounded-xl border border-slate-200 bg-white p-3 shadow-[0_12px_36px_rgba(15,23,42,0.16)] transition-all duration-200 dark:border-white/[0.1] dark:bg-[#16130F] dark:shadow-[0_12px_36px_rgba(0,0,0,0.55)]"
        style={{ opacity: runShow ? 1 : 0, transform: runShow ? 'none' : 'translateY(-6px) scale(0.98)' }}
        aria-hidden="true"
      >
        <p className="flex items-center gap-1.5 text-[12.5px] font-semibold text-slate-900 dark:text-white">
          <Sparkles size={12} className="text-emerald-500" /> Research “{PICK}”
        </p>
        <p className="mt-1 text-[12px] text-slate-500 dark:text-slate-400">for {ROWS.length} selected companies</p>
        <div className="mt-2.5 flex justify-end">
          <span
            ref={runRef}
            className={`rounded-md px-3 py-1 text-[12px] font-semibold transition-colors duration-150 ${t >= C_RUN - 250 ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'}`}
            style={{ transform: `scale(${1 - 0.06 * Math.sin(Math.PI * clamp((t - C_RUN) / 200))})` }}
          >
            Run
          </span>
        </div>
      </div>

      {/* Toast */}
      <div
        className="absolute -bottom-4 left-1/2 z-20 inline-flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full bg-slate-900 px-3.5 py-1.5 text-[12px] font-medium text-white shadow-lg dark:bg-white dark:text-slate-900"
        style={{ opacity: toast, transform: `translate(-50%, ${(1 - toast) * 8}px)` }}
        aria-hidden="true"
      >
        <Check size={12} strokeWidth={3} className="text-emerald-400 dark:text-emerald-600" />
        Column added · {ROWS.length}/{ROWS.length} researched
      </div>

      {tg && <span style={{ opacity }}><Cursor pos={cursor} clicks={[C_ADD, C_ITEM, C_RUN]} t={t} /></span>}
    </div>
  );
}

function EnrichSection() {
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
      setT((v) => (v + dt >= E_DUR ? 0 : v + dt));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced]);

  const clock = reduced ? TOAST_AT + 400 : t;
  // brief fade at the loop seam
  const seam = reduced ? 1 : ease(clock / 350) * (1 - ease((clock - (E_DUR - 350)) / 350));

  return (
    <div id="enrich-column" ref={ref} className="grid scroll-mt-28 grid-cols-1 items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
      <div>
        <Eyebrow>Enrich Column</Eyebrow>
        <Heading>
          Need another field? <Accent>Add a column and let Harvin research it.</Accent>
        </Heading>
        <Lead>
          Add the information you need without rebuilding the list. Choose a field and Harvin researches missing values
          across the selected companies.
        </Lead>

        <ol className="mt-8 border-t border-slate-200 dark:border-white/[0.08]">
          {ENRICH_STEPS.map((s, i) => {
            const prev = i === 0 ? 0 : ENRICH_STEPS[i - 1].at;
            const active = clock >= prev && clock < s.at;
            const done = clock >= s.at;
            const p = clamp((clock - prev) / (s.at - prev));
            return (
              <li key={s.k} className="relative flex items-center gap-4 border-b border-slate-200 py-4 dark:border-white/[0.08]">
                <span className={`font-mono text-[12.5px] tabular-nums ${active ? 'text-ember-500 dark:text-ember-400' : 'text-slate-400 dark:text-white/30'}`}>0{i + 1}</span>
                <span className={`flex-1 text-[15.5px] font-semibold transition-colors duration-300 ${active || done ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-white/40'}`}>{s.k}</span>
                {done && (
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                    <Check size={11} strokeWidth={3} />
                  </span>
                )}
                <span aria-hidden="true" className="absolute inset-x-0 -bottom-px h-px">
                  <span className="block h-full bg-slate-900/60 dark:bg-white/70" style={{ width: `${(active ? p : 0) * 100}%` }} />
                </span>
              </li>
            );
          })}
        </ol>
      </div>

      <div>
        <div style={{ opacity: seam }}>
          <EnrichDemo t={clock} />
        </div>
        <p className="mt-7 text-[11px] text-slate-400 dark:text-slate-500">Illustrative example. Logos belong to their owners.</p>
      </div>
    </div>
  );
}

export default function Research() {
  return (
    <>
      <Section>
        <ResearchFilm />
      </Section>

      <Section>
        <EnrichSection />
      </Section>
    </>
  );
}
