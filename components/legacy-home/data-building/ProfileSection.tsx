'use client';

import { useEffect, useRef, useState } from 'react';
import { Building2, Check, FileSpreadsheet, Loader2, Target, X, Zap } from 'lucide-react';
import { Accent, Eyebrow, Heading, Lead, Section } from '../ui';
import { CompanyLogo } from './shared';

/**
 * Company Profile: the context Harvin reuses for every search.
 *
 * Copy and the three inputs sit on the left as steps; the product card on the
 * right acts each one out in turn on a frame clock —
 *   01 Tell Harvin   a short Q&A, answers typing in
 *   02 Upload        customers.csv uploads, then sorts into converted / lost
 *   03 Set targeting titles, functions, seniority, markets and exclusions
 *                    get picked, and the profile saves.
 * Follows the site theme. Plays while in view, pauses on hover, and holds each
 * step's finished frame under reduced motion. Real company logos; illustrative.
 */

const INPUTS = [
  { k: 'Tell Harvin', v: 'What you sell, buyers, markets', icon: Building2, dur: 5600 },
  { k: 'Upload', v: 'Converted, lost, customers', icon: FileSpreadsheet, dur: 5200 },
  { k: 'Set targeting', v: 'Titles, functions, seniority', icon: Target, dur: 7000 },
];

const ANSWERS = [
  { q: 'What does your company do?', a: 'B2B payments for global companies' },
  { q: 'What do you sell?', a: 'Cross-border payment infrastructure' },
  { q: 'Who do you sell to?', a: 'Finance teams at global businesses' },
];

const CONVERTED = ['Etsy', 'eBay', 'DoorDash'];
const LOST = ['Starbucks', 'Target'];

/* Set targeting — a small builder, each control animating on the step clock. */
const TITLE_QUERY = 'Finance';
const TITLE_SUGGESTIONS = [
  { v: 'CFO', pick: true },
  { v: 'VP Finance', pick: true },
  { v: 'Head of Payments', pick: true },
  { v: 'Finance Manager', pick: false },
  { v: 'Finance Analyst', pick: false },
];
const SENIORITY = ['Entry', 'Manager', 'Director', 'Head', 'VP', 'C-level'];
const SENIORITY_FROM = 3; // "Head and above"
const FUNCTIONS = ['Finance', 'Treasury', 'Payments'];
const GEOS = ['India', 'Southeast Asia', 'UAE'];
const EXCLUSIONS = ['Competitors', 'DNC', 'Open deals'];

const T_TYPE = 250;
const T_SUGGEST = 800;
const T_PICK = 1150;
const T_PICK_STEP = 260;
const T_SLIDE = 2100;
const T_SLIDE_MS = 900;
const T_FUNC = 3100;
const T_GEO = 3800;
const T_EXCL = 4400;
const T_STEP = 220;
const SAVE_AT = T_EXCL + EXCLUSIONS.length * T_STEP + 450;

const ENTER_MS = 500;
const EXIT_MS = 400;

const clamp = (v: number) => Math.min(1, Math.max(0, v));
const ease = (v: number) => 1 - Math.pow(1 - clamp(v), 3);

/* ---------- step visuals ---------- */

function Bubble({ side, children, style }: { side: 'harvin' | 'you'; children: React.ReactNode; style?: React.CSSProperties }) {
  return side === 'harvin' ? (
    <div className="flex items-start gap-2.5" style={style}>
      <span className="grid h-7 w-7 flex-shrink-0 place-items-center rounded-full bg-slate-900 text-[11px] font-bold text-white dark:bg-white dark:text-slate-900">H</span>
      <p className="rounded-2xl rounded-tl-md bg-slate-100 px-3.5 py-2 text-[13.5px] text-slate-700 dark:bg-white/[0.06] dark:text-slate-200">{children}</p>
    </div>
  ) : (
    <div className="flex justify-end" style={style}>
      <p className="rounded-2xl rounded-tr-md border border-slate-200 bg-white px-3.5 py-2 text-[13.5px] font-semibold text-slate-900 shadow-[0_4px_14px_rgba(15,23,42,0.06)] dark:border-white/[0.1] dark:bg-white/[0.04] dark:text-white dark:shadow-none">
        {children}
      </p>
    </div>
  );
}

function TellStep({ t }: { t: number }) {
  return (
    <div className="space-y-3">
      {ANSWERS.map((r, k) => {
        const qAt = 200 + k * 1600;
        const aAt = qAt + 500;
        const q = ease((t - qAt) / 350);
        const typed = Math.max(0, Math.min(r.a.length, Math.floor((t - aAt) / 26)));
        if (q <= 0) return null;
        return (
          <div key={r.q} className="space-y-2">
            <Bubble side="harvin" style={{ opacity: q, transform: `translateY(${(1 - q) * 8}px)` }}>{r.q}</Bubble>
            {t >= aAt && (
              <Bubble side="you">
                {r.a.slice(0, typed)}
                {typed < r.a.length && <span className="ml-px inline-block h-[14px] w-[2px] translate-y-[2px] animate-pulse bg-slate-900 dark:bg-white" />}
              </Bubble>
            )}
          </div>
        );
      })}
    </div>
  );
}

function UploadStep({ t }: { t: number }) {
  const file = ease((t - 250) / 450);
  const prog = ease((t - 700) / 1200);
  const uploaded = prog >= 0.999;
  return (
    <div>
      <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50/70 p-3 dark:border-white/[0.12] dark:bg-white/[0.02]">
        <div
          className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2.5 shadow-[0_6px_18px_rgba(15,23,42,0.06)] dark:border-white/[0.08] dark:bg-[#141210] dark:shadow-none"
          style={{ opacity: file, transform: `translateY(${(1 - file) * -14}px)` }}
        >
          <FileSpreadsheet size={18} className={uploaded ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'} />
          <span className="min-w-0 flex-1">
            <span className="flex items-center justify-between text-[13px] font-semibold text-slate-900 dark:text-white">
              customers.csv
              <span className="text-[11.5px] font-medium tabular-nums text-slate-400">{Math.round(59 * prog)} rows</span>
            </span>
            <span className="mt-1.5 block h-1 overflow-hidden rounded-full bg-slate-100 dark:bg-white/[0.07]">
              <span className={`block h-full rounded-full ${uploaded ? 'bg-emerald-500' : 'bg-slate-900 dark:bg-white/70'}`} style={{ width: `${prog * 100}%` }} />
            </span>
          </span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        {[
          { label: 'Companies that converted', list: CONVERTED, ok: true, from: 2100 },
          { label: 'Companies that didn’t convert', list: LOST, ok: false, from: 2100 + CONVERTED.length * 260 + 150 },
        ].map((col) => (
          <div key={col.label} className="min-w-0">
            <p className="mb-2 text-[11.5px] text-slate-500 dark:text-slate-400" style={{ opacity: ease((t - col.from + 200) / 300) }}>
              {col.label}
            </p>
            <ul className="space-y-1.5">
              {col.list.map((name, k) => {
                const e = ease((t - col.from - k * 260) / 380);
                return (
                  <li
                    key={name}
                    className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-2 py-1.5 dark:border-white/[0.07] dark:bg-white/[0.02]"
                    style={{ opacity: e, transform: `translateX(${(1 - e) * (col.ok ? -10 : 10)}px)` }}
                  >
                    <CompanyLogo name={name} className="h-5 w-5 rounded-md" />
                    <span className={`min-w-0 flex-1 truncate text-[12.5px] font-medium ${col.ok ? 'text-slate-900 dark:text-white' : 'text-slate-400 line-through decoration-slate-300 dark:text-slate-500 dark:decoration-white/20'}`}>
                      {name}
                    </span>
                    {col.ok ? (
                      <Check size={12} strokeWidth={3} className="flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <X size={12} strokeWidth={3} className="flex-shrink-0 text-slate-400" />
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function Block({ label, children, on }: { label: string; children: React.ReactNode; on: number }) {
  return (
    <div style={{ opacity: 0.35 + 0.65 * on }}>
      <p className="mb-1.5 text-[11.5px] text-slate-500 dark:text-slate-400">{label}</p>
      {children}
    </div>
  );
}

function TargetStep({ t }: { t: number }) {
  const typed = Math.max(0, Math.min(TITLE_QUERY.length, Math.floor((t - T_TYPE) / 60)));
  const list = ease((t - T_SUGGEST) / 350);
  const slide = ease((t - T_SLIDE) / T_SLIDE_MS);
  const handle = (SENIORITY_FROM / (SENIORITY.length - 1)) * slide; // 0 → Head
  let pickIdx = 0;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1.05fr_1fr] sm:gap-5">
      {/* Left: titles + seniority */}
      <div className="space-y-4">
        <Block label="Target job titles" on={ease((t - 100) / 300)}>
          <div className="rounded-lg border border-slate-200 dark:border-white/[0.1]">
            <div className="flex items-center gap-2 border-b border-slate-200 px-2.5 py-1.5 text-[12.5px] dark:border-white/[0.08]">
              <span className="text-slate-400">Title</span>
              <span className="font-semibold text-slate-900 dark:text-white">
                {TITLE_QUERY.slice(0, typed)}
                {typed < TITLE_QUERY.length && <span className="ml-px inline-block h-[12px] w-[2px] translate-y-[1px] animate-pulse bg-slate-900 dark:bg-white" />}
              </span>
            </div>
            <ul className="py-1" style={{ opacity: list }}>
              {TITLE_SUGGESTIONS.map((s, i) => {
                const at = s.pick ? T_PICK + pickIdx++ * T_PICK_STEP : T_PICK + 3 * T_PICK_STEP;
                const on = s.pick ? ease((t - at) / 250) : 0;
                const dim = !s.pick ? ease((t - at) / 400) : 0;
                return (
                  <li
                    key={s.v}
                    className="flex items-center gap-2 px-2.5 py-[3px] text-[12.5px]"
                    style={{ opacity: (1 - 0.6 * dim) * ease((t - T_SUGGEST - i * 60) / 250) }}
                  >
                    <span
                      className={`grid h-3.5 w-3.5 flex-shrink-0 place-items-center rounded border transition-colors duration-200
                                  ${on > 0.5 ? 'border-slate-900 bg-slate-900 text-white dark:border-white dark:bg-white dark:text-slate-900' : 'border-slate-300 dark:border-white/20'}`}
                    >
                      {on > 0.5 && <Check size={9} strokeWidth={3.5} />}
                    </span>
                    <span className={on > 0.5 ? 'font-semibold text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}>{s.v}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </Block>

        <Block label="Seniority" on={ease((t - T_SLIDE + 300) / 300)}>
          <div className="px-1.5 pt-1">
            <div className="relative h-1.5 rounded-full bg-slate-200 dark:bg-white/[0.08]">
              <div
                className="absolute inset-y-0 right-0 rounded-full bg-slate-900 dark:bg-white"
                style={{ left: `${handle * 100}%` }}
              />
              <span
                className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-slate-900 bg-white shadow-[0_2px_6px_rgba(15,23,42,0.2)] dark:border-white dark:bg-slate-900"
                style={{ left: `${handle * 100}%` }}
              />
            </div>
            <div className="mt-2 flex justify-between text-[9.5px] text-slate-400 dark:text-slate-500">
              {SENIORITY.map((lv, i) => (
                <span key={lv} className={i >= SENIORITY_FROM && slide > 0.95 ? 'font-semibold text-slate-900 dark:text-white' : ''}>{lv}</span>
              ))}
            </div>
            <p className="mt-1.5 text-[12px] font-semibold text-slate-900 dark:text-white" style={{ opacity: ease((t - T_SLIDE - T_SLIDE_MS) / 300) }}>
              Head and above
            </p>
          </div>
        </Block>
      </div>

      {/* Right: functions, geographies, exclusions */}
      <div className="space-y-4">
        <Block label="Buyer functions" on={ease((t - T_FUNC + 300) / 300)}>
          <div className="space-y-1.5">
            {FUNCTIONS.map((fn, i) => {
              const on = ease((t - T_FUNC - i * T_STEP) / 250);
              return (
                <div key={fn} className="flex items-center justify-between rounded-md px-1 text-[12.5px]">
                  <span className={on > 0.5 ? 'font-medium text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}>{fn}</span>
                  <span className={`relative h-[16px] w-[28px] rounded-full transition-colors duration-200 ${on > 0.5 ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-white/[0.12]'}`}>
                    <span className="absolute top-[2px] h-3 w-3 rounded-full bg-white shadow-sm" style={{ left: 2 + 12 * on }} />
                  </span>
                </div>
              );
            })}
          </div>
        </Block>

        <Block label="Geographies" on={ease((t - T_GEO + 300) / 300)}>
          <div className="flex flex-wrap gap-1.5">
            {GEOS.map((g, i) => {
              const on = ease((t - T_GEO - i * T_STEP) / 260);
              return (
                <span
                  key={g}
                  className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[12px] font-medium transition-colors duration-200
                              ${on > 0.5 ? 'border-slate-900 bg-slate-900 text-white dark:border-white dark:bg-white dark:text-slate-900' : 'border-dashed border-slate-300 text-slate-400 dark:border-white/[0.14] dark:text-slate-500'}`}
                  style={{ transform: `scale(${1 + 0.08 * Math.sin(Math.PI * on)})` }}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${on > 0.5 ? 'bg-emerald-400' : 'bg-slate-300 dark:bg-white/20'}`} />
                  {g}
                </span>
              );
            })}
          </div>
        </Block>

        <Block label="Exclusions" on={ease((t - T_EXCL + 300) / 300)}>
          <div className="relative min-h-[34px] rounded-lg border border-dashed border-slate-300 px-2 py-1.5 dark:border-white/[0.14]">
            <span className="absolute right-2 top-1.5 text-[10px] font-medium uppercase tracking-[0.1em] text-slate-400 dark:text-slate-500">Excluded</span>
            <div className="flex flex-wrap gap-1.5 pr-14">
              {EXCLUSIONS.map((x, i) => {
                const on = ease((t - T_EXCL - i * T_STEP) / 320);
                return (
                  <span
                    key={x}
                    className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 text-[12px] text-slate-500 line-through decoration-slate-400 dark:bg-white/[0.05] dark:text-slate-400"
                    style={{ opacity: on, transform: `translateY(${(1 - on) * -12}px)` }}
                  >
                    <X size={10} strokeWidth={3} />
                    {x}
                  </span>
                );
              })}
            </div>
          </div>
        </Block>
      </div>
    </div>
  );
}

const STEPS = [TellStep, UploadStep, TargetStep];

/* ---------- section ---------- */

export default function ProfileSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [{ step, t }, setPos] = useState({ step: 0, t: 0 });
  const [inView, setInView] = useState(false);
  const [paused, setPaused] = useState(false);
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
    if (!inView || paused || reduced) return;
    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min(64, now - last);
      last = now;
      setPos((p) => (p.t + dt >= INPUTS[p.step].dur ? { step: (p.step + 1) % INPUTS.length, t: 0 } : { step: p.step, t: p.t + dt }));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [inView, paused, reduced]);

  const dur = INPUTS[step].dur;
  const clock = reduced ? dur - EXIT_MS - 1 : t;
  const enter = reduced ? 1 : ease(clock / ENTER_MS);
  const exit = reduced ? 0 : ease((clock - (dur - EXIT_MS)) / EXIT_MS);
  const saved = step === 2 && clock >= SAVE_AT;
  const Step = STEPS[step];

  return (
    <Section>
      <div id="company-profile" ref={ref} className="grid scroll-mt-28 grid-cols-1 items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        {/* Copy + steps */}
        <div>
          <Eyebrow>Company Profile</Eyebrow>
          <Heading>
            Teach Harvin your business <Accent>once.</Accent>
          </Heading>
          <Lead>Harvin uses this context every time it discovers, researches or scores a company.</Lead>

          <ol className="mt-8 border-t border-slate-200 dark:border-white/[0.08]">
            {INPUTS.map((inp, i) => {
              const active = i === step;
              const done = i < step || (active && saved);
              const Icon = inp.icon;
              return (
                <li key={inp.k} className="relative border-b border-slate-200 dark:border-white/[0.08]">
                  <button
                    type="button"
                    onClick={() => setPos({ step: i, t: 0 })}
                    aria-current={active ? 'step' : undefined}
                    className="group flex w-full items-center gap-4 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:focus-visible:ring-white/40"
                  >
                    <span className={`font-mono text-[12.5px] tabular-nums transition-colors ${active ? 'text-ember-500 dark:text-ember-400' : 'text-slate-400 dark:text-white/30'}`}>
                      0{i + 1}
                    </span>
                    <span
                      className={`grid h-9 w-9 flex-shrink-0 place-items-center rounded-lg transition-colors duration-500
                                  ${active ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'bg-slate-100 text-slate-500 dark:bg-white/[0.05] dark:text-slate-400'}`}
                    >
                      <Icon size={16} strokeWidth={2} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className={`block text-[15.5px] font-semibold transition-colors ${active ? 'text-slate-900 dark:text-white' : 'text-slate-500 group-hover:text-slate-800 dark:text-slate-400 dark:group-hover:text-white'}`}>
                        {inp.k}
                      </span>
                      <span className="block text-[13.5px] text-slate-500 dark:text-slate-400">{inp.v}</span>
                    </span>
                    {done && (
                      <span className="grid h-5 w-5 flex-shrink-0 place-items-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                        <Check size={11} strokeWidth={3} />
                      </span>
                    )}
                  </button>
                  <span aria-hidden="true" className="absolute inset-x-0 -bottom-px h-px">
                    <span className="block h-full bg-slate-900/60 dark:bg-white/70" style={{ width: `${active ? (clock / dur) * 100 : 0}%` }} />
                  </span>
                </li>
              );
            })}
          </ol>

          <div className="mt-7 flex gap-3">
            <Zap size={18} className="mt-0.5 flex-shrink-0 text-slate-900 dark:text-white" fill="currentColor" />
            <p className="text-[16px] font-medium leading-[1.5] text-slate-900 dark:text-white">
              Your team doesn’t rebuild targeting logic every time it creates a list.
            </p>
          </div>
        </div>

        {/* Product card */}
        <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.10)] dark:border-white/[0.08] dark:bg-[#0E0D0B] dark:shadow-[0_24px_60px_rgba(0,0,0,0.55)]">
            <div className="flex items-center gap-3 border-b border-slate-200 px-5 py-3.5 dark:border-white/[0.06]">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-slate-100 text-slate-700 dark:bg-white/[0.06] dark:text-slate-200">
                <Building2 size={15} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[13.5px] font-semibold text-slate-900 dark:text-white">Company Profile</span>
                <span className="block truncate text-[12px] text-slate-500 dark:text-slate-400">Cross-border payments</span>
              </span>
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11.5px] font-semibold transition-colors duration-300
                            ${saved ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300' : 'bg-slate-100 text-slate-600 dark:bg-white/[0.06] dark:text-slate-300'}`}
              >
                {saved ? <Check size={12} strokeWidth={2.8} /> : <Loader2 size={12} className="animate-spin" />}
                {saved ? 'Saved' : 'Building profile'}
              </span>
            </div>

            {/* step tabs inside the product */}
            <div className="flex gap-1 border-b border-slate-200 px-4 dark:border-white/[0.06]">
              {INPUTS.map((inp, i) => (
                <span
                  key={inp.k}
                  className={`border-b-2 px-2 py-2.5 text-[12px] font-semibold transition-colors duration-300
                              ${i === step ? 'border-slate-900 text-slate-900 dark:border-white dark:text-white' : 'border-transparent text-slate-400 dark:text-slate-500'}`}
                >
                  {inp.k}
                </span>
              ))}
            </div>

            <div className="relative h-[600px] overflow-hidden px-5 py-5 sm:h-[330px]">
              <div
                key={step}
                style={{
                  opacity: enter * (1 - exit),
                  transform: `translateY(${(1 - enter) * 10 - exit * 6}px)`,
                }}
              >
                <Step t={clock} />
              </div>
            </div>
          </div>
          <p className="mt-3 text-[11px] text-slate-400 dark:text-slate-500">Illustrative example. Logos belong to their owners; not real customer data.</p>
        </div>
      </div>
    </Section>
  );
}
