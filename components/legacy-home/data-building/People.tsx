'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, Loader2, Mail, Phone, Search, ShieldCheck, UserRound } from 'lucide-react';
import { Accent, Eyebrow, Heading, Lead, Section } from '../ui';
import { CompanyLogo, Tag } from './shared';

/**
 * Decision-makers, then email & phone.
 *
 * Decision-makers: an org-chart demo (see OrgDemo) — keyword search vs
 * Harvin's priority-order matching, switched by a cursor.
 *
 * Contacts: a cursor starts the email and phone waterfalls on one contact
 * card (see WaterfallDemo); each stops at the first qualifying result.
 */

/* ---------- Decision-makers: org chart demo ----------
 * One illustrative finance org (roles only, no people) inside a product card
 * with two tabs, driven by a cursor on one frame clock:
 *   Keyword search  "Finance" lights every title containing it, each with a
 *                   verdict — and misses the CFO and Head of Payments.
 *   Harvin          the cursor clicks the Harvin tab; the Target Profile's
 *                   roles are walked in priority order and matched people are
 *                   ringed with their priority number. The rest dim.
 */

type OrgNode = {
  id: string;
  title: string;
  x: number; // % centre
  y: number; // % centre
  parent?: string;
  verdict?: string; // keyword-search verdict (titles containing "Finance")
  buyer?: number; // Target Profile priority it matches (1-based)
};

const ORG: OrgNode[] = [
  { id: 'cfo', title: 'CFO', x: 50, y: 12, buyer: 1 },
  { id: 'vpf', title: 'VP Finance', x: 17, y: 47, parent: 'cfo', verdict: 'Possible match', buyer: 2 },
  { id: 'vpft', title: 'VP Finance Transformation', x: 50, y: 47, parent: 'cfo', verdict: 'Adjacent role' },
  { id: 'hop', title: 'Head of Payments', x: 83, y: 47, parent: 'cfo', buyer: 4 },
  { id: 'fm', title: 'Finance Manager', x: 9, y: 84, parent: 'vpf', verdict: 'Too junior' },
  { id: 'hcf', title: 'Head of Commercial Finance', x: 32, y: 84, parent: 'vpf', verdict: 'Adjacent role' },
  { id: 'fol', title: 'Finance Operations Lead', x: 57, y: 84, parent: 'vpft', verdict: 'Not the buyer' },
  { id: 'pol', title: 'Payments Operations Lead', x: 86, y: 84, parent: 'hop' },
];
const KEYWORD_ORDER = ['vpf', 'vpft', 'fm', 'hcf', 'fol'];

const ROLES = [
  { role: 'CFO', node: 'cfo' },
  { role: 'VP Finance', node: 'vpf' },
  { role: 'Head of Finance', node: null },
  { role: 'Head of Payments', node: 'hop' },
  { role: 'Treasury Director', node: null },
];

const D_DUR = 12000;
const K_TYPE = 250;
const K_HIT = 1100;
const K_STEP = 320;
const K_MISSED = K_HIT + KEYWORD_ORDER.length * K_STEP + 300;
const C_TAB = 4700; // cursor clicks the Harvin tab
const H_FROM = C_TAB + 500;
const H_STEP = 720;
const H_DONE = H_FROM + ROLES.length * H_STEP;

const dClamp = (v: number) => Math.min(1, Math.max(0, v));
const dEase = (v: number) => 1 - Math.pow(1 - dClamp(v), 3);
const dEaseInOut = (v: number) => {
  const x = dClamp(v);
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
};

function DemoCursor({ x, y, clickAt, t }: { x: number; y: number; clickAt: number; t: number }) {
  const d = t - clickAt;
  const ring = d >= 0 && d < 500;
  const press = d >= 0 && d < 220 ? Math.sin(Math.PI * (d / 220)) : 0;
  return (
    <span aria-hidden="true" className="pointer-events-none absolute left-0 top-0 z-30" style={{ transform: `translate(${x}px, ${y}px)` }}>
      {ring && (
        <span
          className="absolute -left-3 -top-3 h-6 w-6 rounded-full border-2 border-slate-900/40 dark:border-white/50"
          style={{ transform: `scale(${0.4 + (d / 500) * 1.4})`, opacity: 1 - d / 500 }}
        />
      )}
      <svg width="20" height="22" viewBox="0 0 20 22" style={{ transform: `scale(${1 - 0.15 * press})`, transformOrigin: '2px 2px' }} className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]">
        <path d="M2 2 L2 17 L6.2 13.2 L9 19.5 L11.8 18.3 L9.1 12.1 L14.8 12.1 Z" fill="#fff" stroke="#0F172A" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function OrgDemo({ t }: { t: number }) {
  const wrap = useRef<HTMLDivElement>(null);
  const tabRef = useRef<HTMLSpanElement>(null);
  const [tab, setTab] = useState<{ x: number; y: number; w: number; h: number } | null>(null);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const measure = () => {
      const box = el.getBoundingClientRect();
      const r = tabRef.current?.getBoundingClientRect();
      setTab(r ? { x: r.left - box.left + r.width * 0.55, y: r.top - box.top + r.height * 0.6, w: box.width, h: box.height } : null);
    };
    measure();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    ro?.observe(el);
    return () => ro?.disconnect();
  }, []);

  const harvin = t >= C_TAB + 80;
  const query = 'Finance';
  const typed = Math.max(0, Math.min(query.length, Math.floor((t - K_TYPE) / 70)));
  const missed = !harvin ? dEase((t - K_MISSED) / 400) : 0;
  const hStep = Math.floor((t - H_FROM) / H_STEP); // which priority role is being checked
  const hDone = t >= H_DONE;
  const byId = Object.fromEntries(ORG.map((n) => [n.id, n]));

  // Cursor: rests low-right, glides to the Harvin tab, clicks, then fades.
  let cx = 0;
  let cy = 0;
  let cOpacity = 0;
  if (tab) {
    const rest = { x: tab.w * 0.7, y: tab.h - 50 };
    const f = dEaseInOut((t - (C_TAB - 900)) / 820);
    cx = rest.x + (tab.x - rest.x) * f;
    cy = rest.y + (tab.y - rest.y) * f;
    cOpacity = dEase((t - (C_TAB - 1300)) / 300) * (1 - dEase((t - (C_TAB + 500)) / 350));
  }

  const keywordHits = KEYWORD_ORDER.filter((id, i) => t >= K_HIT + i * K_STEP).length;
  const matched = ROLES.filter((r, i) => r.node && t >= H_FROM + i * H_STEP + 300).length;

  return (
    <div ref={wrap} className="relative">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.10)] dark:border-white/[0.08] dark:bg-[#0E0D0B] dark:shadow-[0_24px_60px_rgba(0,0,0,0.55)]">
        {/* Header with tabs */}
        <div className="flex items-center gap-3 border-b border-slate-200 px-4 pt-3 dark:border-white/[0.06]">
          <span className="whitespace-nowrap pb-3 text-[13.5px] font-semibold text-slate-900 dark:text-white">Etsy · Finance org</span>
          <span className="ml-auto flex gap-1 text-[12px] font-semibold">
            <span className={`border-b-2 px-2 pb-2.5 transition-colors ${!harvin ? 'border-slate-900 text-slate-900 dark:border-white dark:text-white' : 'border-transparent text-slate-400'}`}>
              <span className="sm:hidden">Keyword</span><span className="hidden sm:inline">Keyword search</span>
            </span>
            <span
              ref={tabRef}
              className={`border-b-2 px-2 pb-2.5 transition-colors ${harvin ? 'border-emerald-500 text-slate-900 dark:text-white' : 'border-transparent text-slate-400'}`}
            >
              <span className="sm:hidden">Harvin</span><span className="hidden sm:inline">Harvin · Target Profile</span>
            </span>
          </span>
        </div>

        {/* Query / priority strip */}
        <div className="relative h-[52px] border-b border-slate-200 px-4 dark:border-white/[0.06]">
          <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 transition-opacity duration-300" style={{ opacity: harvin ? 0 : 1 }}>
            <span className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-[12.5px] text-slate-600 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-slate-300">
              <Search size={13} className="text-slate-400" />
              Title contains
              <span className="font-semibold text-slate-900 dark:text-white">
                “{query.slice(0, typed)}
                {typed < query.length && <span className="ml-px inline-block h-[12px] w-[2px] translate-y-[1px] animate-pulse bg-slate-900 dark:bg-white" />}”
              </span>
              <span className="ml-auto tabular-nums text-slate-400">{keywordHits} matches</span>
            </span>
          </div>
          <div className="absolute inset-x-4 top-1/2 flex -translate-y-1/2 flex-wrap gap-1 transition-opacity duration-300" style={{ opacity: harvin ? 1 : 0 }}>
            {ROLES.map((r, i) => {
              const checking = harvin && hStep === i;
              const checked = harvin && t >= H_FROM + i * H_STEP + 300;
              return (
                <span
                  key={r.role}
                  className={`inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-[11px] font-medium transition-colors duration-200
                              ${checked && r.node
                                ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
                                : checked
                                  ? 'border-dashed border-slate-300 text-slate-400 line-through dark:border-white/[0.15] dark:text-slate-500'
                                  : checking
                                    ? 'border-slate-900 text-slate-900 dark:border-white dark:text-white'
                                    : 'border-slate-200 text-slate-500 dark:border-white/[0.1] dark:text-slate-400'}`}
                >
                  <span className="font-mono text-[10px] opacity-70">{i + 1}</span>
                  {r.role}
                  {checking && !checked && <Loader2 size={10} className="animate-spin" />}
                </span>
              );
            })}
          </div>
        </div>

        {/* Org chart */}
        <div className="relative mx-3 my-3 h-[250px] sm:mx-4">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden="true">
            {ORG.filter((n) => n.parent).map((n) => {
              const p = byId[n.parent as string];
              const midY = (p.y + n.y) / 2;
              return (
                <path
                  key={n.id}
                  d={`M${p.x} ${p.y + 8} V${midY} H${n.x} V${n.y - 8}`}
                  fill="none"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                  className="stroke-slate-200 dark:stroke-white/[0.1]"
                />
              );
            })}
          </svg>

          {ORG.map((n) => {
            const ki = KEYWORD_ORDER.indexOf(n.id);
            const hitP = !harvin && ki >= 0 ? dEase((t - K_HIT - ki * K_STEP) / 300) : 0;
            const verdictP = !harvin && ki >= 0 ? dEase((t - K_HIT - ki * K_STEP - 250) / 300) : 0;
            const isMissed = !harvin && n.buyer && !n.verdict && missed > 0;
            const matchP = harvin && n.buyer ? dEase((t - H_FROM - (n.buyer - 1) * H_STEP - 300) / 350) : 0;
            const dim = harvin && !n.buyer ? dEase((t - H_FROM) / 500) : 0;
            return (
              <div
                key={n.id}
                className="absolute w-[22%] min-w-[76px] -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${n.x}%`, top: `${n.y}%`, opacity: 1 - 0.6 * dim }}
              >
                <div
                  className={`relative flex items-center gap-1.5 rounded-lg border bg-white px-1.5 py-1.5 transition-colors duration-300 dark:bg-[#141210] sm:px-2
                              ${matchP > 0.5
                                ? 'border-emerald-500 ring-2 ring-emerald-500/25'
                                : hitP > 0.5
                                  ? 'border-amber-400 bg-amber-50 dark:border-amber-400/60 dark:bg-amber-500/[0.08]'
                                  : isMissed
                                    ? 'border-dashed border-rose-400/70'
                                    : 'border-slate-200 dark:border-white/[0.1]'}`}
                  style={{ transform: `scale(${1 + 0.05 * Math.sin(Math.PI * (matchP || hitP))})` }}
                >
                  <span className="hidden h-5 w-5 flex-shrink-0 place-items-center rounded-full bg-slate-100 text-slate-400 dark:bg-white/[0.06] sm:grid">
                    <UserRound size={11} />
                  </span>
                  <span className="min-w-0 text-[9.5px] font-semibold leading-tight text-slate-800 dark:text-slate-200 sm:text-[10.5px]">{n.title}</span>
                  {matchP > 0 && (
                    <span
                      className="absolute -right-1.5 -top-1.5 grid h-4 w-4 place-items-center rounded-full bg-emerald-500 text-[9px] font-bold text-white"
                      style={{ opacity: matchP, transform: `scale(${matchP})` }}
                    >
                      {n.buyer}
                    </span>
                  )}
                </div>
                {n.verdict && (
                  <span className="absolute left-1/2 top-full mt-0.5 -translate-x-1/2 whitespace-nowrap text-[9px] font-semibold text-amber-700 dark:text-amber-300 sm:text-[10px]" style={{ opacity: verdictP }}>
                    {n.verdict}
                  </span>
                )}
                {n.buyer && !n.verdict && (
                  <span className="absolute left-1/2 top-full mt-0.5 -translate-x-1/2 whitespace-nowrap text-[9px] font-semibold text-rose-600 dark:text-rose-300 sm:text-[10px]" style={{ opacity: isMissed ? missed : 0 }}>
                    Missed
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="flex items-center gap-2 border-t border-slate-200 px-4 py-2.5 text-[12px] text-slate-600 dark:border-white/[0.06] dark:text-slate-300">
          {!harvin ? (
            <>
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
              {t >= K_MISSED ? (
                <span><span className="font-semibold text-slate-900 dark:text-white">{keywordHits} keyword matches</span> · 2 likely buyers missed</span>
              ) : (
                <span>Searching titles…</span>
              )}
            </>
          ) : (
            <>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              {hDone ? (
                <span><span className="font-semibold text-slate-900 dark:text-white">{matched} decision-makers matched</span>, in your priority order</span>
              ) : (
                <span>Matching on title, seniority and function…</span>
              )}
            </>
          )}
        </div>
      </div>

      {tab && <span style={{ opacity: cOpacity }}><DemoCursor x={cx} y={cy} clickAt={C_TAB} t={t} /></span>}
    </div>
  );
}

function DecisionMakers() {
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
      setT((v) => (v + dt >= D_DUR ? 0 : v + dt));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced]);

  const clock = reduced ? H_DONE + 300 : t;
  const seam = reduced ? 1 : dEase(clock / 350) * (1 - dEase((clock - (D_DUR - 350)) / 350));
  const phase = clock < C_TAB ? 0 : 1;
  const steps = [
    { title: 'Keyword title search', tag: 'Without Harvin', body: 'Title contains “Finance”', from: 0, to: C_TAB },
    { title: 'Searches your roles in priority order', tag: 'Target Profile', body: 'Matches on title, seniority and function, in your priority order.', from: C_TAB, to: H_DONE },
  ];

  return (
    <div ref={ref} className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
      <div>
        <div id="decision-makers" className="scroll-mt-28">
          <Eyebrow>Decision-makers</Eyebrow>
          <Heading>
            Finding the right company is <Accent>only half the job.</Accent>
          </Heading>
          <Lead>Finding the right person is where title searches get noisy.</Lead>
        </div>

        <ol className="mt-8 border-t border-slate-200 dark:border-white/[0.08]">
          {steps.map((s, i) => {
            const active = phase === i;
            const p = dClamp((clock - s.from) / (s.to - s.from));
            return (
              <li key={s.title} className="relative border-b border-slate-200 py-4 dark:border-white/[0.08]">
                <div className="flex items-start gap-4">
                  <span className={`pt-[3px] font-mono text-[12.5px] tabular-nums ${active ? 'text-ember-500 dark:text-ember-400' : 'text-slate-400 dark:text-white/30'}`}>0{i + 1}</span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`text-[16px] font-semibold transition-colors duration-300 ${active ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-white/45'}`}>{s.title}</span>
                      <Tag tone={i === 1 && active ? 'green' : 'plain'}>{s.tag}</Tag>
                    </div>
                    <p className={`mt-1 text-[13.5px] transition-colors duration-300 ${active ? 'text-slate-600 dark:text-slate-400' : 'text-slate-400 dark:text-slate-500'}`}>{s.body}</p>
                  </div>
                </div>
                <span aria-hidden="true" className="absolute inset-x-0 -bottom-px h-px">
                  <span className="block h-full bg-slate-900/60 dark:bg-white/70" style={{ width: `${(active ? p : 0) * 100}%` }} />
                </span>
              </li>
            );
          })}
        </ol>

        <p className="mt-7 text-[clamp(18px,1.7vw,22px)] font-semibold tracking-[-0.02em] text-slate-900 dark:text-white">
          <Accent>40% fewer irrelevant decision-maker matches.</Accent> Less manual title checking.
        </p>
      </div>

      <div>
        <div style={{ opacity: seam }} role="img" aria-label="A keyword search for Finance returns adjacent and junior roles and misses the CFO and Head of Payments; Harvin matches the Target Profile roles in priority order.">
          <OrgDemo t={clock} />
        </div>
        <p className="mt-3 text-[11px] text-slate-400 dark:text-slate-500">Illustrative org chart. Roles only; not real data.</p>
      </div>
    </div>
  );
}

/* ---------- Email & phone: two waterfalls ----------
 * A cursor clicks "Find email & phone" on the contact card; the email and
 * phone waterfalls then run side by side. A pulse walks down each column,
 * sources miss until the first qualifying result, later sources are skipped,
 * and the (masked) verified result lands on the card.
 */

const W_SOURCES = ['Source A', 'Source B', 'Source C', 'More sources'];
const W_DUR = 9200;
const W_CLICK = 900;
const W_TIER = 700;
const W_CHECK = 450;
const LANES = [
  { key: 'email', label: 'Email waterfall', icon: Mail, start: 1300, stopAt: 2, result: { k: 'Verified work email', v: '••••••@etsy.com' } },
  { key: 'phone', label: 'Phone waterfall', icon: Phone, start: 1500, stopAt: 1, result: { k: 'Direct/mobile phone', v: '+1 ••• ••• ••••' } },
];
const laneDone = (l: (typeof LANES)[number]) => l.start + l.stopAt * W_TIER + W_CHECK;
const ALL_FOUND = Math.max(...LANES.map(laneDone)) + 300;
const W_ROW = 40;
const W_GAP = 8;

type TierState = 'queued' | 'checking' | 'miss' | 'hit' | 'skip';
function tierState(l: (typeof LANES)[number], i: number, t: number): TierState {
  const at = l.start + i * W_TIER;
  if (i > l.stopAt) return t >= laneDone(l) ? 'skip' : 'queued';
  if (t >= at + W_CHECK) return i < l.stopAt ? 'miss' : 'hit';
  return t >= at ? 'checking' : 'queued';
}

function WaterfallDemo({ t }: { t: number }) {
  const wrap = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLSpanElement>(null);
  const [btn, setBtn] = useState<{ x: number; y: number; w: number; h: number } | null>(null);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const measure = () => {
      const box = el.getBoundingClientRect();
      const r = btnRef.current?.getBoundingClientRect();
      setBtn(r ? { x: r.left - box.left + r.width * 0.5, y: r.top - box.top + r.height * 0.6, w: box.width, h: box.height } : null);
    };
    measure();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    ro?.observe(el);
    return () => ro?.disconnect();
  }, []);

  const started = t >= W_CLICK;
  const found = t >= ALL_FOUND;
  let cx = 0;
  let cy = 0;
  let cOp = 0;
  if (btn) {
    const from = { x: btn.w * 0.55, y: btn.h - 60 };
    const f = dEaseInOut((t - 150) / 650);
    cx = from.x + (btn.x - from.x) * f;
    cy = from.y + (btn.y - from.y) * f;
    cOp = dEase((t - 100) / 250) * (1 - dEase((t - (W_CLICK + 500)) / 350));
  }

  return (
    <div ref={wrap} className="relative">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.10)] dark:border-white/[0.08] dark:bg-[#0E0D0B] dark:shadow-[0_24px_60px_rgba(0,0,0,0.55)]">
        {/* Contact card */}
        <div className="flex items-center gap-3 border-b border-slate-200 px-4 py-3.5 dark:border-white/[0.06]">
          <span className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-full bg-slate-100 p-[2px] dark:bg-white/[0.06]">
            <img src="/avatars/lead-1.svg" alt="" className="h-full w-full rounded-full bg-[#0B1A3A] object-cover" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[15px] font-semibold text-slate-900 dark:text-white">Head of Payments</span>
            <span className="mt-0.5 flex items-center gap-1.5 text-[12px] text-slate-500 dark:text-slate-400">
              <CompanyLogo name="Etsy" className="h-4 w-4 rounded" /> Etsy · Decision-maker
            </span>
          </span>
          <span
            ref={btnRef}
            className={`inline-flex flex-shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-1.5 text-[12px] font-semibold transition-colors duration-200
                        ${found ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300' : started ? 'bg-slate-100 text-slate-600 dark:bg-white/[0.06] dark:text-slate-300' : 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'}`}
            style={{ transform: `scale(${1 - 0.06 * Math.sin(Math.PI * dClamp((t - W_CLICK) / 200))})` }}
          >
            {found ? <ShieldCheck size={13} /> : started ? <Loader2 size={13} className="animate-spin" /> : <Search size={13} />}
            {found ? 'Verified' : started ? 'Finding…' : 'Find email & phone'}
          </span>
        </div>

        {/* Lanes */}
        <div className="grid grid-cols-2 gap-3 p-4">
          {LANES.map((l) => {
            const Icon = l.icon;
            const done = t >= laneDone(l);
            const idx = dClamp((t - l.start) / (l.stopAt * W_TIER + W_CHECK)) * l.stopAt;
            const pulseOn = started && t >= l.start && !done;
            const res = dEase((t - laneDone(l) - 150) / 380);
            return (
              <div key={l.key} className="min-w-0">
                <p className="mb-2 flex items-center gap-1.5 text-[12px] font-semibold text-slate-700 dark:text-slate-200">
                  <Icon size={13} className="text-slate-400" /> {l.label}
                </p>
                <div className="relative pl-5">
                  {/* rail */}
                  <span aria-hidden="true" className="absolute bottom-5 left-[7px] top-5 w-[2px] rounded-full bg-slate-200 dark:bg-white/[0.08]" />
                  <span
                    aria-hidden="true"
                    className="absolute left-[7px] top-5 w-[2px] rounded-full bg-emerald-500"
                    style={{ height: started ? idx * (W_ROW + W_GAP) : 0 }}
                  />
                  {pulseOn && (
                    <span
                      aria-hidden="true"
                      className="absolute left-[3px] h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.2)]"
                      style={{ top: 20 - 5 + idx * (W_ROW + W_GAP) }}
                    />
                  )}
                  <ol className="space-y-2">
                    {W_SOURCES.map((src, i) => {
                      const st = started ? tierState(l, i, t) : 'queued';
                      return (
                        <li
                          key={src}
                          className={`flex h-10 items-center justify-between gap-2 rounded-lg border px-2.5 text-[12.5px] transition-all duration-300
                                      ${st === 'hit'
                                        ? 'border-emerald-500/50 bg-emerald-500/[0.08] font-semibold text-slate-900 dark:text-white'
                                        : st === 'checking'
                                          ? 'border-slate-400 text-slate-900 dark:border-white/40 dark:text-white'
                                          : st === 'skip'
                                            ? 'border-dashed border-slate-200 text-slate-400 opacity-60 dark:border-white/[0.07] dark:text-slate-500'
                                            : 'border-slate-200 text-slate-600 dark:border-white/[0.07] dark:text-slate-300'}`}
                        >
                          <span className="truncate">{src}</span>
                          <span className="flex-shrink-0 text-[11px]">
                            {st === 'hit' && <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400"><Check size={11} strokeWidth={3} /> Found</span>}
                            {st === 'miss' && <span className="text-slate-400">No match</span>}
                            {st === 'skip' && <span className="text-slate-400">Not needed</span>}
                            {st === 'checking' && <Loader2 size={12} className="animate-spin text-slate-500" />}
                          </span>
                        </li>
                      );
                    })}
                  </ol>
                </div>
                {/* Result */}
                <div
                  className={`mt-3 rounded-lg border px-3 py-2 transition-colors duration-300 ${done ? 'border-emerald-500/40 bg-emerald-500/[0.06]' : 'border-dashed border-slate-200 dark:border-white/[0.08]'}`}
                >
                  <p className="text-[10.5px] text-slate-500 dark:text-slate-400">{l.result.k}</p>
                  <p className="mt-0.5 flex h-[18px] items-center gap-1.5 truncate text-[12.5px] font-semibold tabular-nums text-slate-900 dark:text-white" style={{ opacity: res, transform: `translateY(${(1 - res) * 6}px)` }}>
                    <ShieldCheck size={12} className="flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
                    {l.result.v}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center gap-2 border-t border-slate-200 px-4 py-2.5 text-[12px] text-slate-600 dark:border-white/[0.06] dark:text-slate-300" style={{ opacity: 0.35 + 0.65 * dEase((t - ALL_FOUND) / 400) }}>
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Each waterfall stopped at the first qualifying result
        </div>
      </div>

      {btn && <span style={{ opacity: cOp }}><DemoCursor x={cx} y={cy} clickAt={W_CLICK} t={t} /></span>}
    </div>
  );
}

function Contacts() {
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
      setT((v) => (v + dt >= W_DUR ? 0 : v + dt));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced]);

  const clock = reduced ? ALL_FOUND + 400 : t;
  const seam = reduced ? 1 : dEase(clock / 350) * (1 - dEase((clock - (W_DUR - 350)) / 350));

  const status = (l: (typeof LANES)[number]) => {
    if (clock < l.start) return 'Waiting';
    if (clock >= laneDone(l)) return `Found at ${W_SOURCES[l.stopAt]} · later sources skipped`;
    const i = Math.min(l.stopAt, Math.floor((clock - l.start) / W_TIER));
    return `Checking ${W_SOURCES[i]}…`;
  };

  return (
    <div ref={ref} className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
      <div className="order-2 lg:order-1">
        <div style={{ opacity: seam }} role="img" aria-label="Harvin runs an email waterfall and a phone waterfall for one decision-maker; each stops at the first source with a qualifying result.">
          <WaterfallDemo t={clock} />
        </div>
        <p className="mt-3 text-[11px] text-slate-400 dark:text-slate-500">Illustrative example. Contact details masked; not real data.</p>
      </div>

      <div className="order-1 lg:order-2">
        <div id="contacts" className="scroll-mt-28">
          <Eyebrow>Email &amp; phone</Eyebrow>
          <Heading>
            One person. <Accent>One verified result.</Accent>
          </Heading>
          <Lead>
            Harvin runs separate email and phone waterfalls and stops each one at the first qualifying result, so your team
            doesn’t jump between contact-data tools.
          </Lead>
        </div>

        <ul className="mt-8 border-t border-slate-200 dark:border-white/[0.08]">
          {LANES.map((l) => {
            const Icon = l.icon;
            const done = clock >= laneDone(l);
            return (
              <li key={l.key} className="flex items-center gap-4 border-b border-slate-200 py-4 dark:border-white/[0.08]">
                <span className={`grid h-9 w-9 flex-shrink-0 place-items-center rounded-lg transition-colors duration-300 ${done ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400' : 'bg-slate-100 text-slate-500 dark:bg-white/[0.05] dark:text-slate-400'}`}>
                  <Icon size={16} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[15.5px] font-semibold text-slate-900 dark:text-white">{l.label}</span>
                  <span className="block truncate text-[13px] text-slate-500 dark:text-slate-400">{status(l)}</span>
                </span>
                {done && <Check size={16} strokeWidth={3} className="text-emerald-600 dark:text-emerald-400" />}
              </li>
            );
          })}
        </ul>
        <p className="mt-6 text-[13.5px] text-slate-500 dark:text-slate-400">30+ sources across Harvin’s contact-data waterfall</p>
      </div>
    </div>
  );
}

export default function People() {
  return (
    <>
      <Section>
        <DecisionMakers />
      </Section>

      <Section>
        <Contacts />
      </Section>
    </>
  );
}
