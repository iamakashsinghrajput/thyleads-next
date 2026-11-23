'use client';

import { ArrowRight, FileSpreadsheet, TriangleAlert } from 'lucide-react';
import { portalUrl } from '@/lib/portal';
import { Accent, Card, Eyebrow, Footnote, Heading, Lead, Section } from './ui';
import { useReveal } from './useReveal';

/**
 * "Already have a list?" — the on-ramp for teams who don't start from scratch.
 *
 * Left: the spreadsheet you upload and what's wrong with it. Right: what comes
 * back, each outcome landing in turn when the panel scrolls into view, ending
 * with the companies found beyond your list. Numbers are illustrative for a
 * 500-company upload (the footnote says so).
 */

const PORTAL = portalUrl();

const PROBLEMS = [
  { name: 'Inconsistent names', value: '“ACME TECHNOLOGIES PVT LTD”' },
  { name: 'Revenue missing', value: '214 of 500' },
  { name: 'No decision-maker', value: '357 of 500' },
  { name: 'Fit unknown', value: '500 of 500' },
];

const OUTCOMES = [
  { value: '500', unit: 'records cleaned', name: 'Clean your data', desc: 'Fix company names, contact names and inconsistent records.' },
  { value: '186', unit: 'companies that fit', name: 'Check company fit', desc: 'See which companies actually match what you are looking for.' },
  { value: '1,240', unit: 'research fields filled', name: 'Fill missing research', desc: 'Add the company information your targeting depends on.' },
  { value: '143', unit: 'decision-makers found', name: 'Find missing decision-makers', desc: 'See who your team should be reaching inside each company.' },
  { value: '+38', unit: 'new companies beyond your list', name: 'Discover more companies', desc: 'Find relevant companies beyond the list you started with.' },
];

export default function UploadList() {
  const { ref, step } = useReveal<HTMLDivElement>(OUTCOMES.length, 260, 200);

  return (
    <Section>
      <div className="grid items-start gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
        {/* ── Left: what you upload ───────────────────────────────────── */}
        <div>
          <Eyebrow>Already have a list?</Eyebrow>
          <Heading>
            Start with the companies <Accent>you already know.</Accent>
          </Heading>
          <Lead>
            Upload the account list your team is working from today. Harvin can clean it, research
            the companies, check which ones fit, find missing decision-makers and help uncover
            relevant companies your current targeting hasn&rsquo;t surfaced.
          </Lead>

          <Card className="mt-7 overflow-hidden short:mt-5">
            <div className="flex items-center gap-3 border-b border-slate-200/80 px-5 py-3.5 dark:border-white/[0.06]">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                <FileSpreadsheet size={17} strokeWidth={2} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500">What you upload</p>
                <p className="text-[15px] font-semibold text-slate-900 dark:text-white">accounts.xlsx</p>
              </div>
              <span className="text-[12.5px] tabular-nums text-slate-500 dark:text-slate-400">500 companies</span>
            </div>
            <ul className="px-5 py-1.5">
              {PROBLEMS.map((p) => (
                <li key={p.name} className="flex items-center justify-between gap-3 border-b border-slate-200/70 py-2.5 last:border-b-0 dark:border-white/[0.05]">
                  <span className="flex items-center gap-2 text-[13.5px] text-slate-700 dark:text-slate-300">
                    <TriangleAlert size={13} strokeWidth={2.2} className="text-amber-500" />
                    {p.name}
                  </span>
                  <span className="truncate text-[12.5px] tabular-nums text-slate-500 dark:text-slate-400">{p.value}</span>
                </li>
              ))}
            </ul>
            <p className="border-t border-slate-200/80 bg-sand-50 px-5 py-2.5 text-[12.5px] text-slate-500 dark:border-white/[0.06] dark:bg-white/[0.02] dark:text-slate-400">
              Hard to tell who to work first.
            </p>
          </Card>

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
            <a
              href={PORTAL}
              className="group inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-[14px] font-semibold text-white transition-colors hover:bg-ember-500 dark:bg-white dark:text-slate-900 dark:hover:bg-ember-500 dark:hover:text-white"
            >
              Upload your list
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </a>
            <span className="text-[13.5px] text-slate-500 dark:text-slate-400">
              Or start from scratch and let Harvin build the list for you.
            </span>
          </div>
        </div>

        {/* ── Right: what you get back ────────────────────────────────── */}
        <div ref={ref}>
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500">What you get back</p>
              <p className="mt-1 text-[20px] font-semibold tracking-[-0.02em] text-slate-900 dark:text-white">Improve what you already have</p>
            </div>
            <span
              className={`rounded-full px-2.5 py-1 text-[11.5px] font-semibold transition-colors duration-300 ${
                step >= OUTCOMES.length
                  ? 'bg-ember-500 text-white'
                  : 'bg-slate-100 text-slate-400 dark:bg-white/[0.06] dark:text-slate-500'
              }`}
            >
              Ready to work
            </span>
          </div>

          <ul className="mt-4 flex flex-col gap-2">
            {OUTCOMES.map((o, i) => {
              const shown = step > i;
              const last = i === OUTCOMES.length - 1;
              return (
                <li
                  key={o.name}
                  className={`grid grid-cols-[112px_1fr] items-center gap-4 rounded-xl border px-4 py-3 transition-all duration-500 ${
                    last
                      ? 'border-ember-500/50 bg-ember-50 dark:border-ember-400/40 dark:bg-ember-500/[0.08]'
                      : 'border-slate-200 bg-white dark:border-white/[0.07] dark:bg-white/[0.02]'
                  } ${shown ? 'translate-x-0 opacity-100' : 'translate-x-3 opacity-0'}`}
                >
                  <span>
                    <span className={`block text-[26px] font-semibold leading-none tracking-[-0.03em] tabular-nums ${last ? 'text-ember-500 dark:text-ember-400' : 'text-slate-900 dark:text-white'}`}>
                      {o.value}
                    </span>
                    <span className="mt-1 block text-[11.5px] leading-[1.3] text-slate-500 dark:text-slate-400">{o.unit}</span>
                  </span>
                  <span>
                    <span className="block text-[14.5px] font-semibold text-slate-900 dark:text-white">{o.name}</span>
                    <span className="mt-0.5 block text-[13px] leading-[1.45] text-slate-500 dark:text-slate-400">{o.desc}</span>
                  </span>
                </li>
              );
            })}
          </ul>
          <Footnote>Illustrative numbers for a 500-company upload.</Footnote>
        </div>
      </div>
    </Section>
  );
}
