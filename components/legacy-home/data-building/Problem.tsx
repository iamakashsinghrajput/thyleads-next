'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, Search, SlidersHorizontal, X } from 'lucide-react';
import { Accent, Eyebrow, Section } from '../ui';
import { CompanyLogo, stageVars } from './shared';

/**
 * The problem: a database answers exactly what you ask.
 *
 * Film on the left, copy on the right (same pattern as How it works). Two
 * scenes, each a pure function of a frame clock `t`:
 *   01 Company search    filters apply, thousands of results pile up — while
 *                        companies that would fit get filtered out, each
 *                        tagged with why (the production "missed when" list).
 *   02 Decision-maker    "Finance" returns thousands of titles; the list
 *      search            scrolls, then each title gets its verdict and only
 *                        one is the buyer.
 * The stage follows the site theme via stageVars. Real company logos; illustrative.
 */

const FILTERS = ['Industry: Software', 'Employees: 200–2,000', 'Revenue: $10M–$100M', 'India', 'Series B+'];

const MISSES = [
  'Sit under a broad or wrong category',
  'Describe what they do differently',
  'Are missing revenue or funding data',
  'Need research before fit is clear',
];
const MISSED_COS = ['Etsy', 'Twilio', 'HubSpot', 'Mailchimp'];

const TITLES = [
  { t: 'Finance Manager', v: 'Too junior', ok: false },
  { t: 'VP Finance Transformation', v: 'Adjacent role', ok: false },
  { t: 'Finance Operations Lead', v: 'Wrong buying role', ok: false },
  { t: 'VP Finance', v: 'Likely buyer', ok: true },
];
const FILLER = [
  'Finance Analyst', 'Finance Associate', 'Finance Business Partner', 'Senior Finance Manager',
  'Finance Coordinator', 'Head of Finance Systems', 'Finance Executive', 'Finance Specialist',
];

const CHAPTERS = [
  { n: '01', title: 'Company search', dur: 7600 },
  { n: '02', title: 'Decision-maker search', dur: 7000 },
];

/* timing */
const A_COUNT_FROM = 900;
const A_MISS_FROM = 2700;
const A_MISS_STEP = 650;
const A_FIT_AT = A_MISS_FROM + 4 * A_MISS_STEP + 200;
const B_TYPE_FROM = 300;
const B_SCROLL_FROM = 900;
const B_SCROLL_MS = 1800;
const B_VERDICT_FROM = 3000;
const B_VERDICT_STEP = 480;
const B_SUMMARY_AT = B_VERDICT_FROM + 4 * B_VERDICT_STEP + 200;
const ROW = 42;
const ENTER_MS = 600;
const EXIT_MS = 450;

const clamp = (v: number) => Math.min(1, Math.max(0, v));
const ease = (v: number) => 1 - Math.pow(1 - clamp(v), 3);
const easeInOut = (v: number) => {
  const x = clamp(v);
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
};

const styles = stageVars('pr-stage');

/* ---------- shared chrome ---------- */

function Panel({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-xl border border-[rgb(var(--ink)/0.09)] bg-[var(--panel)] shadow-[0_24px_60px_rgb(0_0_0/var(--sh))] ${className}`}>
      {children}
    </div>
  );
}

/* ---------- Scene A · Company search ---------- */

function SceneCompany({ t }: { t: number }) {
  const count = Math.round(3412 * ease((t - A_COUNT_FROM) / 1500));
  const fit = ease((t - A_FIT_AT) / 450);
  return (
    <Panel className="w-full max-w-[600px]">
      <div className="flex items-center gap-2 border-b border-[rgb(var(--ink)/0.07)] px-4 py-3">
        <SlidersHorizontal size={14} className="text-[rgb(var(--ink)/0.45)]" />
        <span className="text-[12.5px] font-semibold text-[rgb(var(--ink)/0.85)]">Company search</span>
        <span className="ml-auto text-[12px] tabular-nums text-[rgb(var(--ink)/0.5)]">{count.toLocaleString('en-US')} results</span>
      </div>

      <div className="flex flex-wrap gap-1.5 border-b border-[rgb(var(--ink)/0.07)] px-4 py-3">
        {FILTERS.map((f, i) => {
          const e = ease((t - 200 - i * 150) / 350);
          return (
            <span
              key={f}
              className="rounded-md border border-[rgb(var(--ink)/0.12)] bg-[rgb(var(--ink)/0.04)] px-2 py-0.5 text-[11.5px] font-medium text-[rgb(var(--ink)/0.75)]"
              style={{ opacity: e, transform: `translateY(${(1 - e) * 6}px) scale(${0.92 + 0.08 * e})` }}
            >
              {f}
            </span>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-[0.8fr_1.2fr]">
        {/* What the filter returns */}
        <div className="min-w-0">
          <p className="mb-2 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-[rgb(var(--ink)/0.4)]">In your results</p>
          <ul className="space-y-1.5">
            {[0, 1, 2, 3, 4].map((k) => {
              const e = ease((t - A_COUNT_FROM - k * 160) / 380);
              return (
                <li
                  key={k}
                  className="flex items-center gap-2 rounded-lg border border-[rgb(var(--ink)/0.07)] bg-[rgb(var(--ink)/0.02)] px-2 py-2"
                  style={{ opacity: e, transform: `translateY(${(1 - e) * -8}px)` }}
                >
                  <span className="h-5 w-5 flex-shrink-0 rounded-md bg-[rgb(var(--ink)/0.08)]" />
                  <span className="flex-1 space-y-1">
                    <span className="block h-1.5 rounded bg-[rgb(var(--ink)/0.12)]" style={{ width: `${70 - k * 7}%` }} />
                    <span className="block h-1.5 w-2/5 rounded bg-[rgb(var(--ink)/0.07)]" />
                  </span>
                </li>
              );
            })}
          </ul>
          <p className="mt-2 text-[11px] text-[rgb(var(--ink)/0.4)]" style={{ opacity: ease((t - 2200) / 400) }}>
            + {Math.max(0, count - 5).toLocaleString('en-US')} more that match the filters
          </p>
        </div>

        {/* What it leaves out */}
        <div className="min-w-0">
          <p className="mb-2 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-[rgb(var(--ink)/0.4)]" style={{ opacity: ease((t - A_MISS_FROM + 250) / 300) }}>
            Filtered out
          </p>
          <ul className="space-y-1.5">
            {MISSED_COS.map((name, k) => {
              const at = A_MISS_FROM + k * A_MISS_STEP;
              const e = ease((t - at) / 450);
              return (
                <li
                  key={name}
                  className="relative flex items-center gap-2.5 rounded-lg border border-dashed px-2.5 py-1.5"
                  style={{
                    opacity: e,
                    transform: `translateX(${(1 - e) * 18}px)`,
                    borderColor: `rgba(16,185,129,${0.45 * fit})`,
                    background: `rgba(16,185,129,${0.05 * fit})`,
                  }}
                >
                  <CompanyLogo name={name} className="h-6 w-6 rounded-md" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[12.5px] font-semibold text-[rgb(var(--ink)/0.9)]">{name}</span>
                    <span className="block truncate text-[11px] text-[rgb(var(--ink)/0.5)]">{MISSES[k]}</span>
                  </span>
                  <span className="relative h-5 w-[74px] flex-shrink-0">
                    <span
                      className="absolute inset-0 inline-flex items-center justify-end gap-1 text-[10.5px] font-medium text-[rgb(var(--ink)/0.4)]"
                      style={{ opacity: 1 - fit }}
                    >
                      <X size={10} strokeWidth={3} /> Missed
                    </span>
                    <span
                      className="absolute inset-0 inline-flex items-center justify-end gap-1 text-[10.5px] font-semibold text-emerald-600 dark:text-emerald-300"
                      style={{ opacity: fit }}
                    >
                      <Check size={10} strokeWidth={3} /> Good fit
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="flex items-center gap-2 border-t border-[rgb(var(--ink)/0.07)] px-4 py-2.5 text-[12px]" style={{ opacity: 0.35 + 0.65 * fit }}>
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        <span className="text-[rgb(var(--ink)/0.75)]">
          <span className="font-semibold text-[rgb(var(--ink))]">4 good-fit companies</span> never made the list
        </span>
      </div>
    </Panel>
  );
}

/* ---------- Scene B · Decision-maker search ---------- */

function ScenePeople({ t }: { t: number }) {
  const query = 'Finance';
  const typed = Math.max(0, Math.min(query.length, Math.floor((t - B_TYPE_FROM) / 70)));
  const count = Math.round(2418 * ease((t - B_SCROLL_FROM) / 1600));
  const rows = [...FILLER.map((f) => ({ t: f, v: '', ok: false, filler: true })), ...TITLES.map((r) => ({ ...r, filler: false }))];
  const scroll = easeInOut((t - B_SCROLL_FROM) / B_SCROLL_MS) * (rows.length - TITLES.length) * ROW;
  const summary = ease((t - B_SUMMARY_AT) / 450);

  return (
    <Panel className="w-full max-w-[560px]">
      <div className="flex items-center gap-2 border-b border-[rgb(var(--ink)/0.07)] px-4 py-3">
        <Search size={14} className="text-[rgb(var(--ink)/0.45)]" />
        <span className="text-[12.5px] font-semibold text-[rgb(var(--ink)/0.85)]">Decision-maker search</span>
        <span className="ml-auto text-[12px] tabular-nums text-[rgb(var(--ink)/0.5)]">{count.toLocaleString('en-US')} results</span>
      </div>

      <div className="px-4 pt-3.5">
        <div className="flex items-center gap-2 rounded-lg border border-[rgb(var(--ink)/0.12)] bg-[rgb(var(--ink)/0.03)] px-3 py-2 text-[13px] text-[rgb(var(--ink)/0.65)]">
          <Search size={13} className="text-[rgb(var(--ink)/0.4)]" />
          Title contains
          <span className="font-semibold text-[rgb(var(--ink))]">
            “{query.slice(0, typed)}
            {typed < query.length && <span className="ml-px inline-block h-[13px] w-[2px] translate-y-[2px] animate-pulse bg-[rgb(var(--ink))]" />}”
          </span>
        </div>
      </div>

      {/* Scrolling results window */}
      <div className="relative mx-4 my-3.5 overflow-hidden rounded-lg border border-[rgb(var(--ink)/0.08)]" style={{ height: TITLES.length * ROW }}>
        <div style={{ transform: `translateY(${-scroll}px)` }}>
          {rows.map((r, i) => {
            const vi = i - FILLER.length; // index within the real titles
            const at = B_VERDICT_FROM + vi * B_VERDICT_STEP;
            const verdict = r.filler ? 0 : ease((t - at) / 380);
            const dim = !r.filler && !r.ok ? ease((t - at - 300) / 400) : 0;
            const win = !r.filler && r.ok ? ease((t - at - 200) / 400) : 0;
            return (
              <div
                key={r.t}
                className="relative flex items-center justify-between gap-3 border-b border-[rgb(var(--ink)/0.06)] px-3 text-[13px] last:border-b-0"
                style={{ height: ROW, opacity: 1 - 0.5 * dim, background: `rgba(16,185,129,${0.08 * win})` }}
              >
                <span aria-hidden="true" className="absolute inset-y-0 left-0 w-[2px] bg-emerald-500" style={{ opacity: win }} />
                <span className={`truncate ${win > 0.5 ? 'font-semibold text-[rgb(var(--ink))]' : 'text-[rgb(var(--ink)/0.75)]'}`}>{r.t}</span>
                {!r.filler && (
                  <span
                    className={`inline-flex flex-shrink-0 items-center gap-1 text-[11.5px] ${r.ok ? 'rounded-md bg-emerald-500/15 px-1.5 py-0.5 font-semibold text-emerald-700 dark:text-emerald-300' : 'text-[rgb(var(--ink)/0.45)]'}`}
                    style={{ opacity: verdict, transform: `translateX(${(1 - verdict) * 8}px)` }}
                  >
                    {r.ok ? <Check size={11} strokeWidth={3} /> : <X size={11} strokeWidth={2.6} />}
                    {r.v}
                  </span>
                )}
              </div>
            );
          })}
        </div>
        <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-[var(--panel)] to-transparent" style={{ opacity: t > B_SCROLL_FROM && t < B_SCROLL_FROM + B_SCROLL_MS ? 1 : 0 }} />
      </div>

      <div className="flex items-center gap-2 border-t border-[rgb(var(--ink)/0.07)] px-4 py-2.5 text-[12px]" style={{ opacity: 0.35 + 0.65 * summary }}>
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        <span className="text-[rgb(var(--ink)/0.75)]">
          {count.toLocaleString('en-US')} keyword matches · <span className="font-semibold text-[rgb(var(--ink))]">1 likely buyer</span> in view
        </span>
      </div>
    </Panel>
  );
}

const SCENES = [SceneCompany, ScenePeople];

/* ---------- section ---------- */

export default function Problem() {
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
      setPos((p) => (p.t + dt >= CHAPTERS[p.scene].dur ? { scene: (p.scene + 1) % CHAPTERS.length, t: 0 } : { scene: p.scene, t: p.t + dt }));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced]);

  const dur = CHAPTERS[scene].dur;
  const clock = reduced ? dur - EXIT_MS - 1 : t;
  const enter = reduced ? 1 : ease(clock / ENTER_MS);
  const exit = reduced ? 0 : easeInOut((clock - (dur - EXIT_MS)) / EXIT_MS);
  const p = clock / dur;
  const Scene = SCENES[scene];

  return (
    <Section>
      <style>{styles}</style>
      <div id="problem" ref={ref} className="grid scroll-mt-28 grid-cols-1 items-center gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:gap-14">
        {/* Film */}
        <div
          className="pr-stage relative flex min-h-[460px] items-center justify-center py-2 sm:min-h-[500px]"
          role="img"
          aria-label={
            scene === 0
              ? 'A company search returns thousands of results while good-fit companies are filtered out.'
              : 'A title search for “Finance” returns thousands of matches; only one is the likely buyer.'
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
          <p className="pointer-events-none absolute inset-x-0 bottom-0 text-center text-[11px] text-slate-400 dark:text-slate-500">Illustrative example. Logos belong to their owners; scores and contacts are not real data.</p>
        </div>

        {/* Copy */}
        <div>
          <Eyebrow>The problem</Eyebrow>
          <h2 className="mt-3 text-[clamp(26px,2.5vw,36px)] font-semibold leading-[1.12] tracking-[-0.025em] text-slate-900 dark:text-white">
            A database can give you millions of records. It still needs you to know <Accent>exactly what to search for.</Accent>
          </h2>

          <ol className="mt-8 border-t border-slate-200 dark:border-white/[0.08]">
            {CHAPTERS.map((c, i) => {
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
                          {i === 0 ? (
                            <>
                              <span className="block pt-2 text-[14.5px] text-slate-600 dark:text-slate-400">Relevant companies can still be missed when they:</span>
                              <span className="mt-3 block space-y-2">
                                {MISSES.map((m, k) => {
                                  const on = active && clock >= A_MISS_FROM + k * A_MISS_STEP;
                                  return (
                                    <span key={m} className="flex items-center gap-2.5 text-[13.5px]">
                                      <span className={`grid h-4 w-4 flex-shrink-0 place-items-center rounded-full border transition-all duration-500 ${on ? 'border-transparent bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'border-slate-300 text-transparent dark:border-white/15'}`}>
                                        <X size={9} strokeWidth={3.4} />
                                      </span>
                                      <span className={`transition-colors duration-500 ${on ? 'text-slate-800 dark:text-white/85' : 'text-slate-400 dark:text-white/35'}`}>{m}</span>
                                    </span>
                                  );
                                })}
                              </span>
                            </>
                          ) : (
                            <span className="block pt-2 text-[14.5px] text-slate-600 dark:text-slate-400">
                              Every result matches the keyword. Few are the buyer.
                            </span>
                          )}
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

          <p className="mt-7 text-[clamp(18px,1.7vw,22px)] font-semibold tracking-[-0.02em] text-slate-900 dark:text-white">
            More records don’t automatically mean <Accent>better targeting.</Accent>
          </p>
        </div>
      </div>
    </Section>
  );
}
