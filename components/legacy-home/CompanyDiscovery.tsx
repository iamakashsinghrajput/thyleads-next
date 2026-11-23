'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ChartColumn, Cpu, Globe, Search, Sparkles, Target, Users, Wallet } from 'lucide-react';

/**
 * "Company discovery" — follows CompanyProfile: once Harvin has your profile,
 * this is what it finds with it.
 *
 * Left: the pitch and the six dimensions Harvin searches by. Right: a worked
 * example — a database filter that finds none of these companies against the
 * four Harvin found, each with the reasons it matched and its Company Fit.
 * Every reason is tagged with one of the six dimensions, so hovering or
 * focusing a dimension lights up the reasons it produced.
 *
 * The example is illustrative and the company names are fictional (the note
 * under the panel says so — keep it).
 */

type Dim = 'model' | 'useCase' | 'customer' | 'tech' | 'geo' | 'traits';

const DIMENSIONS: { key: Dim; name: string; desc: string; Icon: typeof Target }[] = [
  { key: 'model', name: 'Business model', desc: 'How the company makes money.', Icon: Wallet },
  { key: 'useCase', name: 'Use case', desc: 'Why the company may need what you sell.', Icon: Target },
  { key: 'customer', name: 'Customer type', desc: 'Who they sell to or serve.', Icon: Users },
  { key: 'tech', name: 'Technology', desc: 'The tools and systems they use.', Icon: Cpu },
  { key: 'geo', name: 'Geography', desc: 'Where they operate, not just where they are headquartered.', Icon: Globe },
  { key: 'traits', name: 'Company characteristics', desc: 'Stores, locations, users, funding, revenue or other important criteria.', Icon: ChartColumn },
];

const DIM_LABEL: Record<Dim, string> = Object.fromEntries(
  DIMENSIONS.map((d) => [d.key, d.name]),
) as Record<Dim, string>;

const RESULTS: { name: string; listedAs: string; fit: number; reasons: { dim: Dim; text: string }[] }[] = [
  {
    name: 'Northstar Software',
    listedAs: 'Software',
    fit: 91,
    reasons: [
      { dim: 'useCase', text: 'Bills customers in 18 countries' },
      { dim: 'tech', text: 'Uses Stripe' },
    ],
  },
  {
    name: 'Vela Commerce',
    listedAs: 'Internet',
    fit: 88,
    reasons: [
      { dim: 'model', text: 'Marketplace that pays sellers' },
      { dim: 'geo', text: 'Operates in 22 countries' },
    ],
  },
  {
    name: 'Brightpath Learning',
    listedAs: 'EdTech',
    fit: 84,
    reasons: [
      { dim: 'customer', text: 'Students overseas' },
      { dim: 'useCase', text: 'Collects tuition from abroad' },
    ],
  },
  {
    name: 'Kitecart',
    listedAs: 'Social commerce',
    fit: 79,
    reasons: [
      { dim: 'traits', text: '1.2M users' },
      { dim: 'useCase', text: 'Pays creators abroad' },
    ],
  },
];

export default function CompanyDiscovery() {
  const [focus, setFocus] = useState<Dim | null>(null);

  return (
    <section className="border-t border-slate-200 bg-sand-100 px-4 py-16 dark:border-white/[0.06] dark:bg-[#040404] sm:px-6 lg:px-8 lg:py-14 short:py-7">
      <div className="mx-auto grid max-w-[1180px] items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
        {/* ── Left: pitch + the six dimensions ───────────────────────── */}
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ember-500">
            Company discovery
          </p>
          <h2 className="mt-3 text-[clamp(27px,3vw,40px)] font-semibold leading-[1.09] tracking-[-0.025em] text-slate-900 short:text-[34px] dark:text-white">
            Discover companies that traditional databases can&rsquo;t find.
          </h2>
          <p className="mt-4 text-[15.5px] leading-[1.65] short:text-[14.5px] short:leading-[1.55] text-slate-600 dark:text-slate-400">
            Harvin uses your Company Profile to look beyond industry, employee count and revenue. It
            searches for the things your best customers actually have in common — how they operate,
            what they sell, who they serve, the tools they use and the problems they may have.
          </p>

          <h3 className="mt-8 text-[13px] font-semibold uppercase tracking-[0.12em] text-slate-500 short:mt-5 dark:text-slate-400">
            Search by what matters to your business
          </h3>
          <ul
            className="mt-3 grid gap-2 sm:grid-cols-2"
            onMouseLeave={() => setFocus(null)}
          >
            {DIMENSIONS.map(({ key, name, desc, Icon }) => {
              const on = focus === key;
              return (
                <li key={key}>
                  <button
                    type="button"
                    onMouseEnter={() => setFocus(key)}
                    onFocus={() => setFocus(key)}
                    onBlur={() => setFocus(null)}
                    aria-pressed={on}
                    className={`flex h-full w-full items-start gap-3 rounded-xl border px-3.5 py-2.5 short:py-2 text-left transition-colors duration-200 focus-visible:outline-none ${
                      on
                        ? 'border-ember-500/60 bg-white dark:border-ember-400/50 dark:bg-white/[0.04]'
                        : 'border-slate-200/80 bg-sand-50/60 hover:bg-white dark:border-white/[0.07] dark:bg-white/[0.015]'
                    }`}
                  >
                    <span
                      className={`grid h-8 w-8 flex-shrink-0 place-items-center rounded-lg transition-colors duration-200 ${
                        on
                          ? 'bg-ember-500 text-white'
                          : 'bg-white text-slate-500 ring-1 ring-slate-200 dark:bg-white/[0.04] dark:text-slate-400 dark:ring-white/10'
                      }`}
                    >
                      <Icon size={15} strokeWidth={2} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[14.5px] font-semibold text-slate-900 dark:text-white">{name}</span>
                      <span className="mt-0.5 block text-[13px] leading-[1.45] text-slate-500 dark:text-slate-400">
                        {desc}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <p className="mt-7 text-[18px] font-semibold leading-[1.35] tracking-[-0.015em] text-slate-900 short:mt-4 dark:text-white">
            That helps surface relevant companies{' '}
            <span className="text-ember-500 dark:text-ember-400">your usual searches may not.</span>
          </p>
          <Link
            href="/data-building#discovery"
            className="group mt-3 inline-flex items-center gap-2 text-[14.5px] font-semibold text-slate-900 underline decoration-slate-300 underline-offset-[6px] transition-colors hover:text-ember-600 hover:decoration-ember-500 dark:text-white dark:decoration-white/25 dark:hover:text-ember-400"
          >
            Explore Company Discovery
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* ── Right: the worked example, as a search console ──────────── */}
        <div>
          <ResultsConsole focus={focus} />
          <p className="mt-3 text-[12px] text-slate-400 dark:text-slate-500">
            Illustrative example. Company names are fictional.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ── Results console ──────────────────────────────────────────────────────
   An app window on the sand tray the other homepage visuals use. A search bar
   carries the ask; a toggle flips between what Harvin found and what the
   database filter found (nothing — with the reason it missed each company). */

const DIM_ICON: Record<Dim, typeof Target> = Object.fromEntries(
  DIMENSIONS.map((d) => [d.key, d.Icon]),
) as Record<Dim, typeof Target>;

function ResultsConsole({ focus }: { focus: Dim | null }) {
  const [view, setView] = useState<'harvin' | 'filter'>('harvin');

  return (
    <div className="rounded-2xl bg-sand-200 p-3 dark:bg-[#141210] sm:p-4">
      <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-[0_18px_44px_rgba(15,23,42,0.12)] dark:border-white/[0.08] dark:bg-[#16130F] dark:shadow-[0_18px_44px_rgba(0,0,0,0.5)]">
        {/* Search bar */}
        <div className="flex items-center gap-3 border-b border-slate-200/70 px-4 py-3 dark:border-white/[0.06]">
          <Search size={16} strokeWidth={2} className="flex-shrink-0 text-slate-400" />
          <div className="min-w-0 flex-1">
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-slate-400 dark:text-slate-500">
              You sell
            </p>
            <p className="truncate text-[14.5px] font-semibold tracking-[-0.01em] text-slate-900 dark:text-white">
              Cross-border payment infrastructure
            </p>
          </div>
          <span className="hidden flex-shrink-0 items-center gap-1.5 rounded-full bg-ember-50 px-2.5 py-1 text-[11.5px] font-semibold text-ember-600 dark:bg-ember-500/15 dark:text-ember-300 sm:inline-flex">
            <Sparkles size={12} strokeWidth={2.2} />
            Company Profile
          </span>
        </div>

        {/* Harvin vs database filter */}
        <div className="flex items-center gap-1 border-b border-slate-200/70 bg-sand-50 p-1.5 dark:border-white/[0.06] dark:bg-white/[0.02]" role="tablist">
          <ViewTab on={view === 'harvin'} onClick={() => setView('harvin')} label="Harvin" count={RESULTS.length} accent />
          <ViewTab on={view === 'filter'} onClick={() => setView('filter')} label="Industry = Fintech" count={0} />
        </div>

        {view === 'harvin' ? (
          <div className="grid gap-2.5 p-3 sm:grid-cols-2" role="tabpanel">
            {RESULTS.map((r) => (
              <article
                key={r.name}
                className="rounded-xl border border-slate-200/80 bg-white p-3 dark:border-white/[0.07] dark:bg-white/[0.02]"
              >
                <div className="flex items-start gap-2.5">
                  <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-lg bg-sand-100 text-[12px] font-bold text-slate-700 ring-1 ring-slate-200 dark:bg-white/[0.05] dark:text-slate-200 dark:ring-white/10">
                    {initials(r.name)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[14px] font-semibold tracking-[-0.01em] text-slate-900 dark:text-white">{r.name}</p>
                    <p className="mt-0.5 truncate text-[11.5px] text-slate-400 dark:text-slate-500">
                      Listed as <span className="line-through decoration-slate-400">{r.listedAs}</span>
                    </p>
                  </div>
                  <FitRing value={r.fit} />
                </div>

                <ul className="mt-3 flex flex-col gap-1">
                  {r.reasons.map((reason) => {
                    const Icon = DIM_ICON[reason.dim];
                    const lit = focus === reason.dim;
                    const dimmed = focus !== null && !lit;
                    return (
                      <li
                        key={reason.text}
                        className={`flex items-start gap-2 rounded-lg px-2 py-1.5 transition-all duration-200 ${
                          lit ? 'bg-ember-50 ring-1 ring-ember-500/30 dark:bg-ember-500/[0.1]' : 'bg-sand-50 dark:bg-white/[0.03]'
                        } ${dimmed ? 'opacity-35' : 'opacity-100'}`}
                      >
                        <Icon
                          size={13}
                          strokeWidth={2.1}
                          className={`mt-[2px] flex-shrink-0 ${lit ? 'text-ember-600 dark:text-ember-400' : 'text-slate-400'}`}
                        />
                        <span className="min-w-0 text-[12.5px] leading-[1.35]">
                          <span className={`block text-[10.5px] font-semibold uppercase tracking-[0.08em] ${lit ? 'text-ember-600 dark:text-ember-400' : 'text-slate-400 dark:text-slate-500'}`}>
                            {DIM_LABEL[reason.dim]}
                          </span>
                          <span className="text-slate-800 dark:text-slate-200">{reason.text}</span>
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </article>
            ))}
          </div>
        ) : (
          <div className="p-3" role="tabpanel">
            <div className="rounded-xl border border-dashed border-slate-300 px-4 py-5 text-center dark:border-white/15">
              <p className="text-[28px] font-semibold leading-none tracking-[-0.02em] tabular-nums text-slate-300 dark:text-slate-600">0</p>
              <p className="mt-1.5 text-[13.5px] font-semibold text-slate-700 dark:text-slate-300">companies match Industry = Fintech</p>
              <p className="mt-1 text-[12.5px] text-slate-500 dark:text-slate-400">Every one of Harvin&rsquo;s matches is filed under something else.</p>
            </div>
            <ul className="mt-2.5 flex flex-col">
              {RESULTS.map((r) => (
                <li key={r.name} className="flex items-center justify-between gap-3 border-b border-slate-200/70 px-1 py-2.5 last:border-b-0 dark:border-white/[0.05]">
                  <span className="flex min-w-0 items-center gap-2.5">
                    <span className="grid h-7 w-7 flex-shrink-0 place-items-center rounded-md bg-sand-100 text-[10.5px] font-bold text-slate-400 ring-1 ring-slate-200 dark:bg-white/[0.04] dark:ring-white/10">
                      {initials(r.name)}
                    </span>
                    <span className="truncate text-[13.5px] font-medium text-slate-500 dark:text-slate-400">{r.name}</span>
                  </span>
                  <span className="flex flex-shrink-0 items-center gap-1.5 text-[12px] text-slate-400 dark:text-slate-500">
                    {r.listedAs}
                    <span aria-hidden="true" className="font-semibold text-ember-500">≠</span>
                    <span className="sr-only">is not</span>
                    Fintech
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

function ViewTab({ on, onClick, label, count, accent = false }: {
  on: boolean; onClick: () => void; label: string; count: number; accent?: boolean;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={on}
      onClick={onClick}
      className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-1.5 text-[12.5px] font-semibold transition-colors duration-200 ${
        on
          ? 'bg-white text-slate-900 shadow-[0_1px_3px_rgba(15,23,42,0.12)] dark:bg-white/[0.08] dark:text-white'
          : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
      }`}
    >
      <span className={accent ? '' : 'line-through decoration-slate-400'}>{label}</span>
      <span
        className={`rounded-full px-1.5 py-px text-[11px] tabular-nums ${
          accent ? 'bg-ember-500 text-white' : 'bg-slate-200 text-slate-500 dark:bg-white/10 dark:text-slate-400'
        }`}
      >
        {count}
      </span>
    </button>
  );
}

function initials(name: string) {
  return name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();
}

/** Company Fit as a ring: the arc is the score out of 100. */
function FitRing({ value }: { value: number }) {
  const r = 15;
  const c = 2 * Math.PI * r;
  return (
    <span className="relative grid h-10 w-10 flex-shrink-0 place-items-center" aria-label={`Company Fit ${value} out of 100`}>
      <svg viewBox="0 0 40 40" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden="true">
        <circle cx="20" cy="20" r={r} fill="none" strokeWidth="3" className="stroke-sand-200 dark:stroke-white/10" />
        <circle
          cx="20" cy="20" r={r} fill="none" strokeWidth="3" strokeLinecap="round"
          className="stroke-ember-500"
          strokeDasharray={`${(value / 100) * c} ${c}`}
        />
      </svg>
      <span className="text-[12.5px] font-bold tabular-nums text-slate-900 dark:text-white">{value}</span>
    </span>
  );
}
