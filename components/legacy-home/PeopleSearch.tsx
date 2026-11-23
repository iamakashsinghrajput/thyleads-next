'use client';

import { ArrowDownWideNarrow, Briefcase, Check, Languages, Layers, Search, SkipForward, X } from 'lucide-react';
import { Accent, Eyebrow, Heading, Lead, Section } from './ui';
import { useReveal } from './useReveal';

/**
 * "Decision-makers & contacts", part one: once Harvin knows which companies
 * fit, it finds the people most likely to buy.
 *
 * Two searches side by side: a title-keyword search (thousands of results,
 * mostly the wrong person) and Harvin matching by what a role means, walking
 * your priority order — the CFO isn't there, so it moves on, then finds both
 * buyers. The walk plays once when the cards scroll into view. The four ways
 * Harvin judges a person close the section. ContactDetails follows.
 *
 * People and companies are fictional.
 */

const KEYWORD_RESULTS = [
  { title: 'Finance Manager', why: 'Too junior', buyer: false },
  { title: 'VP Finance Transformation', why: 'Adjacent role', buyer: false },
  { title: 'Finance Operations Lead', why: 'Not the buyer', buyer: false },
  { title: 'Head of Commercial Finance', why: 'Adjacent role', buyer: false },
  { title: 'VP Finance', why: 'Buried at row 38', buyer: true },
];

const PRIORITY = [
  { rank: 1, name: 'CFO', detail: 'Not at this company, moving to the next role', found: false },
  { rank: 2, name: 'Priya Nair, VP Finance', detail: 'Email and phone found', found: true },
  { rank: 3, name: 'Arjun Rao, Head of Payments', detail: 'Title: “Treasury & FX Lead, APAC”', found: true },
];

const CRITERIA = [
  { name: 'Role priority', desc: 'CFO first. VP Finance next. Head of Payments after that.', Icon: ArrowDownWideNarrow },
  { name: 'Function', desc: 'Finance, Operations, IT, Security, Marketing or whatever matters to you.', Icon: Briefcase },
  { name: 'Seniority', desc: 'Avoid people who are too junior for the conversation.', Icon: Layers },
  { name: 'Title meaning', desc: 'Harvin understands that similar roles can have very different titles.', Icon: Languages },
];

export default function PeopleSearch() {
  const { ref, step } = useReveal<HTMLDivElement>(PRIORITY.length, 650, 400);

  return (
    <Section>
      {/* Head: heading left, lead right, to keep the section to one screen */}
      <div className="grid items-end gap-6 lg:grid-cols-[1fr_1fr] lg:gap-14">
        <div>
          <Eyebrow>Decision-makers &amp; contacts</Eyebrow>
          <Heading>
            Find the right people inside <Accent>the right companies.</Accent>
          </Heading>
        </div>
        <Lead className="lg:mt-0">
          Once Harvin knows which companies fit, it looks for the people most likely to buy. You
          tell Harvin the roles, functions and seniority you care about. It searches for them in
          priority order and matches people by what their role actually means, not just by title
          keywords.
        </Lead>
      </div>

      <div ref={ref} className="mt-10 grid gap-4 short:mt-6 lg:grid-cols-2">
        {/* ── Without Harvin: title keyword search ─────────────────────── */}
        <div className="flex flex-col rounded-2xl border border-slate-200 bg-white/60 p-5 dark:border-white/[0.07] dark:bg-white/[0.015]">
          <div className="flex items-center justify-between gap-3">
            <p className="text-[16px] font-semibold tracking-[-0.01em] text-slate-700 dark:text-slate-300">Title keyword search</p>
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11.5px] font-semibold text-slate-500 dark:bg-white/[0.06] dark:text-slate-400">
              Without Harvin
            </span>
          </div>
          <div className="mt-3 flex items-center gap-2.5 rounded-lg border border-slate-200 bg-white px-3 py-2 dark:border-white/[0.08] dark:bg-white/[0.02]">
            <Search size={14} className="text-slate-400" />
            <span className="flex-1 text-[13px] text-slate-600 dark:text-slate-300">
              Title contains <span className="font-semibold text-slate-900 dark:text-white">“Finance”</span>
            </span>
            <span className="text-[12px] tabular-nums text-slate-400">2,418 results</span>
          </div>

          <ul className="mt-2 flex-1">
            {KEYWORD_RESULTS.map((r) => (
              <li key={r.title} className="flex items-center justify-between gap-3 border-b border-slate-200/70 py-2 short:py-1.5 last:border-b-0 dark:border-white/[0.05]">
                <span className="flex items-center gap-2">
                  {r.buyer ? (
                    <Check size={13} strokeWidth={2.6} className="text-slate-500" />
                  ) : (
                    <X size={13} strokeWidth={2.4} className="text-slate-300 dark:text-slate-600" />
                  )}
                  <span className={`text-[13.5px] ${r.buyer ? 'font-semibold text-slate-800 dark:text-slate-200' : 'text-slate-400 line-through decoration-slate-300 dark:text-slate-500 dark:decoration-slate-600'}`}>
                    {r.title}
                  </span>
                </span>
                <span className="text-[12px] text-slate-400 dark:text-slate-500">{r.why}</span>
              </li>
            ))}
          </ul>

          <div className="mt-3 flex items-center justify-between rounded-lg bg-slate-100/70 px-3 py-2 dark:bg-white/[0.03]">
            <span className="text-[12.5px] text-slate-500 dark:text-slate-400">Every result matches the keyword. Most aren&rsquo;t the buyer.</span>
            <span className="text-[13px] font-semibold tabular-nums text-slate-600 dark:text-slate-300">1 of 5</span>
          </div>
        </div>

        {/* ── With Harvin: matched by meaning, in your order ───────────── */}
        <div className="flex flex-col rounded-2xl border border-ember-500/60 bg-white p-5 shadow-[0_18px_44px_rgba(201,76,30,0.10)] dark:border-ember-400/40 dark:bg-[#0E0D0B] dark:shadow-[0_18px_44px_rgba(0,0,0,0.45)]">
          <div className="flex items-center justify-between gap-3">
            <p className="text-[16px] font-semibold tracking-[-0.01em] text-slate-900 dark:text-white">Matched by meaning</p>
            <span className="rounded-full bg-ember-500 px-2.5 py-1 text-[11.5px] font-semibold text-white">With Harvin</span>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-1.5 rounded-lg border border-slate-200 bg-sand-50 px-3 py-2 dark:border-white/[0.08] dark:bg-white/[0.03]">
            {['CFO', 'VP Finance', 'Head of Payments'].map((t, i) => (
              <span key={t} className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2 py-0.5 text-[12px] font-medium text-slate-700 dark:border-white/[0.1] dark:bg-white/[0.04] dark:text-slate-200">
                <span className="text-[10.5px] font-bold text-ember-500">{i + 1}</span>
                {t}
              </span>
            ))}
            <span className="ml-auto text-[12px] text-slate-500 dark:text-slate-400">Finance, head and above</span>
          </div>

          <ol className="mt-2 flex-1">
            {PRIORITY.map((p, i) => {
              const shown = step > i;
              return (
                <li
                  key={p.rank}
                  className={`flex items-center justify-between gap-3 border-b border-slate-200/70 py-2.5 short:py-2 transition-all duration-500 last:border-b-0 dark:border-white/[0.05] ${
                    shown ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-30'
                  }`}
                >
                  <span className="min-w-0">
                    <span className={`block text-[14px] ${p.found ? 'font-semibold text-slate-900 dark:text-white' : 'text-slate-400 line-through decoration-slate-300 dark:text-slate-500'}`}>
                      {p.rank}. {p.name}
                    </span>
                    <span className="block text-[12.5px] text-slate-500 dark:text-slate-400">{p.detail}</span>
                  </span>
                  {p.found ? (
                    <span className="inline-flex flex-shrink-0 items-center gap-1 rounded-full border border-ember-500/50 bg-ember-50 px-2.5 py-0.5 text-[12px] font-semibold text-ember-600 dark:bg-ember-500/10 dark:text-ember-300">
                      <Check size={12} strokeWidth={2.6} /> Buyer
                    </span>
                  ) : (
                    <span className="inline-flex flex-shrink-0 items-center gap-1 text-[12px] text-slate-400 dark:text-slate-500">
                      <SkipForward size={12} /> Skipped
                    </span>
                  )}
                </li>
              );
            })}
          </ol>

          <div className="mt-3 flex items-center justify-between rounded-lg bg-ember-50 px-3 py-2 dark:bg-ember-500/[0.08]">
            <span className="text-[12.5px] text-ember-700 dark:text-ember-300">Only people who match your target roles, in your order.</span>
            <span className="text-[13px] font-semibold tabular-nums text-ember-600 dark:text-ember-300">2 of 2</span>
          </div>
        </div>
      </div>

      {/* ── How Harvin judges a person ──────────────────────────────── */}
      <p className="mt-8 text-[13px] font-semibold uppercase tracking-[0.12em] text-slate-500 short:mt-5 dark:text-slate-400">
        Find the right decision-makers
      </p>
      <ul className="mt-3 grid gap-x-6 gap-y-4 short:mt-5 sm:grid-cols-2 lg:grid-cols-4">
        {CRITERIA.map(({ name, desc, Icon }) => (
          <li key={name} className="flex items-start gap-3">
            <span className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-lg bg-white text-ember-500 ring-1 ring-slate-200 dark:bg-white/[0.04] dark:ring-white/10">
              <Icon size={15} strokeWidth={2} />
            </span>
            <span>
              <span className="block text-[14.5px] font-semibold text-slate-900 dark:text-white">{name}</span>
              <span className="mt-0.5 block text-[13px] leading-[1.5] text-slate-500 dark:text-slate-400">{desc}</span>
            </span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
