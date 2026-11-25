'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, Database, Sparkles } from 'lucide-react';
import { Accent, Eyebrow } from '../ui';
import { CompanyLogo, stageVars } from './shared';

/**
 * Company Discovery — film on the left, copy on the right (same pattern as
 * The problem and How it works; no box behind the animation).
 *
 *   01 Search themes      "what you sell" types in; links draw out to the four
 *                         theme groups and their themes pop in.
 *   02 650M+ profiles     a searching hub streams results into a list of found
 *                         companies; fit rings fill; one is off-category; the
 *                         30% stat counts up.
 *   03 Worked example     Mailchimp as the database sees it, Harvin's
 *                         research arriving line by line, then Company Fit 91.
 *
 * Every scene is a pure function of a rAF clock `t`. Theme-aware via
 * stageVars. Real company logos; scores are illustrative.
 */

const THEMES = [
  { label: 'Use case', items: ['Global payouts', 'International collections'] },
  { label: 'Business model', items: ['Marketplace payments', 'Overseas subscriptions'] },
  { label: 'Customer type', items: ['Cross-border sellers', 'Global employers'] },
  { label: 'Product language', items: ['FX workflows', 'Global payroll'] },
];
const SELL = 'Cross-border payment infrastructure';

const FOUND = [
  { name: 'Mailchimp', fit: 91, off: true },
  { name: 'Etsy', fit: 88 },
  { name: 'eBay', fit: 84 },
  { name: 'HubSpot', fit: 79 },
  { name: 'Twilio', fit: 76 },
];

const DB_ROWS = [
  { k: 'Industry', v: 'Software' },
  { k: 'Location', v: 'Atlanta, US' },
  { k: 'Founded', v: '2001' },
  { k: 'Revenue', v: 'Not listed', muted: true },
];
const FINDINGS = ['Subscription software business', 'Sells to small businesses worldwide', 'Bills customers around the world', 'Part of Intuit since 2021'];

const CHAPTERS = [
  { n: '01', title: 'Search themes', dur: 6200 },
  { n: '02', title: '650M+ B2B profiles', dur: 6800 },
  { n: '03', title: 'Illustrative example', dur: 7600 },
];

const ENTER_MS = 600;
const EXIT_MS = 450;

const clamp = (v: number) => Math.min(1, Math.max(0, v));
const ease = (v: number) => 1 - Math.pow(1 - clamp(v), 3);
const easeInOut = (v: number) => {
  const x = clamp(v);
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
};
const bez = (p0: number, p1: number, p2: number, p3: number, f: number) => {
  const u = 1 - f;
  return u * u * u * p0 + 3 * u * u * f * p1 + 3 * u * f * f * p2 + f * f * f * p3;
};

const styles = stageVars('ds-stage');

/* ---------- pieces ---------- */

function Card({ children, className = '', style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={`rounded-xl border border-[rgb(var(--ink)/0.09)] bg-[var(--panel)] shadow-[0_18px_44px_rgb(0_0_0/var(--sh))] ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}

function Micro({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <p className={`font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[rgb(var(--ink)/0.4)] ${className}`}>{children}</p>;
}

/** Fit ring drawn from a progress value (0–1), so it moves with the clock. */
function Ring({ value, p, size = 30, stroke = 3, label = true }: { value: number; p: number; size?: number; stroke?: number; label?: boolean }) {
  const r = (size - stroke) / 2 - 0.5;
  const c = 2 * Math.PI * r;
  return (
    <span className="relative grid flex-shrink-0 place-items-center" style={{ width: size, height: size }}>
      <svg viewBox={`0 0 ${size} ${size}`} className="absolute inset-0 -rotate-90" aria-hidden="true">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth={stroke} style={{ stroke: 'rgb(var(--ink)/0.08)' }} />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth={stroke} strokeLinecap="round"
          className="stroke-emerald-500"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - (value / 100) * p)}
        />
      </svg>
      {label && <span className="relative text-[10px] font-bold tabular-nums text-[rgb(var(--ink))]">{Math.round(value * p)}</span>}
    </span>
  );
}

/* ---------- Scene 1 · Search themes ---------- */

const T_ROW = 64;
const T_GAP = 10;
const T_H = THEMES.length * T_ROW + (THEMES.length - 1) * T_GAP;
const LINK = 56;

function SceneThemes({ t }: { t: number }) {
  const typed = Math.max(0, Math.min(SELL.length, Math.floor((t - 300) / 28)));
  const inCard = ease((t - 100) / 400);
  return (
    <div className="grid w-full max-w-[640px] grid-cols-1 items-center gap-4 sm:grid-cols-[minmax(0,0.85fr)_56px_minmax(0,1.25fr)] sm:gap-0">
      <Card className="p-4" style={{ opacity: inCard, transform: `translateY(${(1 - inCard) * 10}px)` }}>
        <Micro>What you sell</Micro>
        <p className="mt-2 min-h-[48px] text-[16px] font-semibold leading-snug tracking-[-0.01em] text-[rgb(var(--ink))]">
          {SELL.slice(0, typed)}
          {typed < SELL.length && <span className="ml-px inline-block h-[15px] w-[2px] translate-y-[2px] animate-pulse bg-[rgb(var(--ink))]" />}
        </p>
      </Card>

      <svg viewBox={`0 0 ${LINK} ${T_H}`} className="hidden sm:block" style={{ width: LINK, height: T_H }} aria-hidden="true" fill="none">
        {THEMES.map((th, k) => {
          const y0 = T_H / 2;
          const y1 = k * (T_ROW + T_GAP) + T_ROW / 2;
          const draw = easeInOut((t - 1400 - k * 150) / 500);
          const loop = draw >= 1 ? ((((t - 1900 - k * 150) / 1100) % 1) + 1) % 1 : -1;
          return (
            <g key={th.label}>
              <path
                d={`M0 ${y0} C ${LINK / 2} ${y0}, ${LINK / 2} ${y1}, ${LINK} ${y1}`}
                strokeWidth="1.2"
                pathLength={1}
                strokeDasharray="1"
                strokeDashoffset={1 - draw}
                style={{ stroke: 'rgb(var(--ink)/0.25)' }}
              />
              {loop >= 0 && (
                <circle cx={bez(0, LINK / 2, LINK / 2, LINK, loop)} cy={bez(y0, y0, y1, y1, loop)} r="2.4" className="fill-emerald-500" opacity={Math.sin(Math.PI * loop)} />
              )}
            </g>
          );
        })}
      </svg>

      <div className="space-y-[10px]">
        {THEMES.map((th, k) => {
          const at = 1600 + k * 200;
          const e = ease((t - at) / 400);
          return (
            <Card key={th.label} className="flex h-[64px] flex-col justify-center px-3.5" style={{ opacity: e, transform: `translateX(${(1 - e) * 14}px)` }}>
              <Micro>{th.label}</Micro>
              <div className="mt-1.5 flex flex-wrap gap-1">
                {th.items.map((it, j) => {
                  const c = ease((t - at - 300 - j * 180) / 320);
                  return (
                    <span
                      key={it}
                      className="rounded-md bg-[rgb(var(--ink)/0.06)] px-1.5 py-0.5 text-[11.5px] font-medium text-[rgb(var(--ink)/0.85)]"
                      style={{ opacity: c, transform: `scale(${0.85 + 0.15 * c})` }}
                    >
                      {it}
                    </span>
                  );
                })}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- Scene 2 · 650M+ profiles → companies found ---------- */

const F_ROW = 46;
const F_GAP = 8;
const F_H = FOUND.length * F_ROW + (FOUND.length - 1) * F_GAP;

function SceneFound({ t }: { t: number }) {
  const hub = ease((t - 100) / 500);
  const searching = t < 3300;
  const stat = ease((t - 3800) / 500);
  return (
    <div className="w-full max-w-[620px]">
      <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-[132px_56px_minmax(0,1fr)] sm:gap-0">
        {/* Hub */}
        <div className="relative mx-auto grid h-[132px] w-[132px] place-items-center" style={{ opacity: hub, transform: `scale(${0.9 + 0.1 * hub})` }}>
          <svg viewBox="0 0 132 132" className="absolute inset-0" aria-hidden="true" fill="none">
            <circle cx="66" cy="66" r="62" strokeWidth="1" strokeDasharray="3 6" style={{ stroke: 'rgb(var(--ink)/0.25)', transformOrigin: '66px 66px', transform: `rotate(${t * 0.05}deg)` }} />
          </svg>
          <span className="flex h-[112px] w-[112px] flex-col items-center justify-center rounded-full border border-[rgb(var(--ink)/0.1)] bg-[var(--panel)] text-center shadow-[0_18px_44px_rgb(0_0_0/var(--sh))]">
            <span className="text-[26px] font-semibold leading-none tracking-[-0.03em] text-[rgb(var(--ink))]">650M+</span>
            <span className="mt-1 text-[10.5px] text-[rgb(var(--ink)/0.5)]">B2B profiles</span>
            <span className="mt-1.5 h-3 text-[10px] font-medium text-emerald-600 dark:text-emerald-400">{searching ? 'Searching…' : `${FOUND.length} found`}</span>
          </span>
        </div>

        <svg viewBox={`0 0 56 ${F_H}`} className="hidden sm:block" style={{ width: 56, height: F_H }} aria-hidden="true" fill="none">
          {FOUND.map((c, k) => {
            const y0 = F_H / 2;
            const y1 = k * (F_ROW + F_GAP) + F_ROW / 2;
            const at = 900 + k * 420;
            const draw = easeInOut((t - at) / 400);
            const f = clamp((t - at) / 500);
            return (
              <g key={c.name}>
                <path d={`M0 ${y0} C 28 ${y0}, 28 ${y1}, 56 ${y1}`} strokeWidth="1.2" pathLength={1} strokeDasharray="1" strokeDashoffset={1 - draw} style={{ stroke: 'rgb(var(--ink)/0.25)' }} />
                {f > 0 && f < 1 && <circle cx={bez(0, 28, 28, 56, f)} cy={bez(y0, y0, y1, y1, f)} r="2.6" className="fill-emerald-500" />}
              </g>
            );
          })}
        </svg>

        <ul className="space-y-[8px]">
          {FOUND.map((c, k) => {
            const at = 900 + k * 420 + 380;
            const e = ease((t - at) / 380);
            const ring = ease((t - at - 150) / 700);
            return (
              <li key={c.name}>
                <Card
                  className={`flex h-[46px] items-center gap-2.5 px-3 ${c.off ? 'ring-1 ring-amber-500/40' : ''}`}
                  style={{ opacity: e, transform: `translateX(${(1 - e) * 14}px)` }}
                >
                  <CompanyLogo name={c.name} className="h-7 w-7 rounded-md" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13px] font-semibold text-[rgb(var(--ink))]">{c.name}</span>
                    {c.off && <span className="block text-[10.5px] font-semibold text-amber-600 dark:text-amber-300">Off-category</span>}
                  </span>
                  <Ring value={c.fit} p={ring} />
                </Card>
              </li>
            );
          })}
        </ul>
      </div>

      {/* 30% */}
      <div className="mt-5 flex items-center gap-4 border-t border-[rgb(var(--ink)/0.1)] pt-4" style={{ opacity: stat, transform: `translateY(${(1 - stat) * 8}px)` }}>
        <span className="text-[40px] font-semibold leading-none tracking-[-0.04em] tabular-nums text-[rgb(var(--ink))]">{Math.round(30 * ease((t - 3800) / 1000))}%</span>
        <span className="text-[13px] leading-snug text-[rgb(var(--ink)/0.6)]">of approved companies are discovered outside the original filter set.</span>
      </div>
    </div>
  );
}

/* ---------- Scene 3 · Worked example ---------- */

const R_FROM = 1900;
const R_STEP = 450;
const FIT_AT = R_FROM + FINDINGS.length * R_STEP + 250;

function SceneExample({ t }: { t: number }) {
  const inCard = ease(t / 450);
  const dim = ease((t - R_FROM + 300) / 500);
  const sweep = clamp((t - (R_FROM - 400)) / 900);
  const fit = ease((t - FIT_AT) / 900);
  return (
    <Card className="relative w-full max-w-[620px] overflow-hidden" style={{ opacity: inCard, transform: `translateY(${(1 - inCard) * 10}px)` }}>
      <div className="flex items-center gap-3 border-b border-[rgb(var(--ink)/0.08)] px-4 py-3">
        <CompanyLogo name="Mailchimp" className="h-8 w-8 rounded-lg" />
        <span className="min-w-0 flex-1">
          <span className="block text-[14.5px] font-semibold text-[rgb(var(--ink))]">Mailchimp</span>
          <span className="block text-[11.5px] text-[rgb(var(--ink)/0.5)]">Company record</span>
        </span>
        <span className="flex items-center gap-2.5">
          <span className="text-right">
            <span className="block text-[10.5px] text-[rgb(var(--ink)/0.5)]">Company Fit</span>
            <span className="block text-[12px] font-semibold" style={{ opacity: 0.4 + 0.6 * fit }}>
              {fit > 0.05 ? <span className="text-emerald-600 dark:text-emerald-400">Strong fit</span> : <span className="text-[rgb(var(--ink)/0.5)]">Unknown</span>}
            </span>
          </span>
          <span className="relative grid h-[48px] w-[48px] place-items-center">
            <Ring value={91} p={fit} size={48} stroke={4} label={false} />
            <span className="absolute text-[14px] font-bold tabular-nums text-[rgb(var(--ink))]">{fit > 0.02 ? Math.round(91 * fit) : '?'}</span>
          </span>
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-[0.85fr_1.15fr]">
        {/* Database view */}
        <div className="border-b border-[rgb(var(--ink)/0.08)] p-4 sm:border-b-0 sm:border-r" style={{ opacity: 1 - 0.45 * dim }}>
          <p className="flex items-center gap-1.5 text-[11.5px] text-[rgb(var(--ink)/0.5)]">
            <Database size={12} /> Database view
          </p>
          <dl className="mt-2 divide-y divide-[rgb(var(--ink)/0.07)] text-[13px]">
            {DB_ROWS.map((r) => (
              <div key={r.k} className="flex justify-between py-1.5">
                <dt className="text-[rgb(var(--ink)/0.5)]">{r.k}</dt>
                <dd className={r.muted ? 'text-[rgb(var(--ink)/0.35)]' : 'font-medium text-[rgb(var(--ink))]'}>{r.v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-[12px] leading-snug text-[rgb(var(--ink)/0.5)]">Nothing here says “cross-border payments prospect.”</p>
        </div>

        {/* Harvin research */}
        <div className="p-4">
          <p className="flex items-center gap-1.5 text-[11.5px] text-[rgb(var(--ink)/0.5)]">
            <Sparkles size={12} /> Harvin research
          </p>
          <ul className="mt-2.5 space-y-2">
            {FINDINGS.map((f, i) => {
              const e = ease((t - R_FROM - i * R_STEP) / 380);
              return (
                <li key={f} className="flex items-center gap-2.5 text-[13.5px] text-[rgb(var(--ink)/0.9)]" style={{ opacity: e, transform: `translateX(${(1 - e) * -10}px)` }}>
                  <span className="grid h-[18px] w-[18px] flex-shrink-0 place-items-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                    <Check size={11} strokeWidth={3} />
                  </span>
                  {f}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="flex items-center gap-2 border-t border-[rgb(var(--ink)/0.08)] px-4 py-2.5 text-[12px] text-[rgb(var(--ink)/0.7)]" style={{ opacity: 0.3 + 0.7 * fit }}>
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        Matches patterns from companies that converted
      </div>

      {/* research sweep */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 w-1/3 bg-[linear-gradient(90deg,transparent,rgb(var(--ink)/0.06),transparent)]"
        style={{ left: `${-33 + sweep * 133}%`, opacity: sweep > 0 && sweep < 1 ? 1 : 0 }}
      />
    </Card>
  );
}

const SCENES = [SceneThemes, SceneFound, SceneExample];

/* ---------- section ---------- */

export default function Discovery() {
  const ref = useRef<HTMLDivElement>(null);
  const [{ scene, t }, setPos] = useState({ scene: 0, t: 0 });
  const [inView, setInView] = useState(false);
  const [paused, setPaused] = useState(false);
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
    if (!inView || paused || reduced) return;
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
  }, [inView, paused, reduced]);

  const dur = CHAPTERS[scene].dur;
  const clock = reduced ? dur - EXIT_MS - 1 : t;
  const enter = reduced ? 1 : ease(clock / ENTER_MS);
  const exit = reduced ? 0 : easeInOut((clock - (dur - EXIT_MS)) / EXIT_MS);
  const p = clock / dur;
  const Scene = SCENES[scene];

  return (
    <section className="border-t border-slate-200 bg-sand-100 px-4 py-16 dark:border-white/[0.06] dark:bg-[#040404] sm:px-6 lg:px-8 lg:py-20">
      <style>{styles}</style>
      <div id="discovery" ref={ref} className="mx-auto grid max-w-[1180px] scroll-mt-28 grid-cols-1 items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
        {/* Film */}
        <div
          className="ds-stage relative flex min-h-[440px] items-center justify-center py-2 sm:min-h-[480px]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          role="img"
          aria-label={
            scene === 0
              ? 'What you sell becomes search themes: use case, business model, customer type and product language.'
              : scene === 1
                ? 'Harvin searches 650M+ B2B profiles and finds companies with Company Fit scores, including one outside the expected category.'
                : 'Mailchimp looks like a generic software company in the database; Harvin research shows a strong fit of 91.'
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
          <Eyebrow>Company Discovery</Eyebrow>
          <h2 className="mt-3 text-[clamp(26px,2.5vw,36px)] font-semibold leading-[1.12] tracking-[-0.025em] text-slate-900 dark:text-white">
            Harvin turns your business context into <Accent>the language your market actually uses.</Accent>
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
                          {i === 0 && (
                            <span className="mt-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-[13.5px]">
                              {THEMES.map((th) => (
                                <span key={th.label} className="contents">
                                  <span className="text-slate-500 dark:text-slate-400">{th.label}</span>
                                  <span className="text-slate-800 dark:text-slate-200">{th.items.join(' · ')}</span>
                                </span>
                              ))}
                            </span>
                          )}
                          {i === 1 && (
                            <span className="block pt-2 text-[14.5px] leading-[1.55] text-slate-600 dark:text-slate-400">
                              A relevant company doesn’t always sit in the category you expect.{' '}
                              <span className="font-semibold text-slate-900 dark:text-white">30% of approved companies are discovered outside the original filter set.</span>
                            </span>
                          )}
                          {i === 2 && (
                            <span className="block pt-2 text-[14.5px] leading-[1.55] text-slate-600 dark:text-slate-400">
                              A company can look wrong in the database, and still be{' '}
                              <span className="font-semibold text-slate-900 dark:text-white">exactly right for you.</span> Harvin looks past the category
                              label to understand the business.
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
        </div>
      </div>
    </section>
  );
}
