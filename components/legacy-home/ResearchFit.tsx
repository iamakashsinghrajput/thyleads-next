'use client';

import { Check, Loader2 } from 'lucide-react';
import { Accent, Card, Eyebrow, Footnote, Heading, Lead, Section, TextLink } from './ui';
import { useReveal } from './useReveal';

/**
 * "Research & Company Fit" — follows CompanyDiscovery: finding a company is the
 * first step, knowing whether it fits is the second.
 *
 * Right: one company's record, database vs Harvin. The firmographics a
 * database already holds are the same on both sides; the fields targeting
 * actually depends on are empty in the database and get researched in, one
 * after another, when the card scrolls into view — ending in Company Fit.
 * Left: what that score is and why it is explainable.
 *
 * Vela Commerce is fictional (see the footnote).
 */

const BASICS = [
  { field: 'Industry', value: 'Internet' },
  { field: 'Employees', value: '600' },
  { field: 'HQ', value: 'Singapore' },
];

const RESEARCHED = [
  { field: 'Business model', desc: 'Understand how the company operates and makes money.', value: 'Online marketplace' },
  { field: 'Technology', desc: 'See the tools and systems relevant to your offer.', value: 'Stripe, Shopify, AWS' },
  { field: 'Locations or stores', desc: 'Know the size of a physical business beyond employee count.', value: '17 locations' },
  { field: 'Countries served', desc: 'Understand where the company actually operates.', value: '22' },
  { field: 'Users, funding and revenue', desc: 'Add the numbers that help you judge fit.', value: '1.2M MAU, Series C' },
  { field: 'Your own criteria', desc: 'Ask Harvin to research other information important to your business.', value: 'Pays sellers weekly' },
];

const FIT = 88;

const REASONS = [
  'Marketplace model, like your converted customers',
  'Pays sellers in 22 countries',
  'Uses Stripe',
];

export default function ResearchFit() {
  // One step per researched field, then one for Company Fit.
  const { ref, step } = useReveal<HTMLDivElement>(RESEARCHED.length + 1, 380);
  const fitShown = step > RESEARCHED.length;

  return (
    <Section>
      <div className="grid items-center gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14">
        {/* ── Left ─────────────────────────────────────────────────────── */}
        <div>
          <Eyebrow>Research &amp; Company Fit</Eyebrow>
          <Heading>
            Find out which companies <Accent>actually fit.</Accent>
          </Heading>
          <Lead>
            Finding a company is only the first step. Harvin researches the details that matter to
            your business, then shows how well each company matches what you are looking for.
          </Lead>

          {/* Company Fit, explained — dark in both themes so the score reads as the outcome. */}
          <div className="mt-8 rounded-2xl bg-[#0E0D0B] p-6 text-white ring-1 ring-white/[0.06] short:mt-5 short:p-5">
            <div className="flex items-center gap-5">
              <ScoreRing value={FIT} />
              <div>
                <p className="text-[18px] font-semibold tracking-[-0.015em]">See why every company fits</p>
                <p className="mt-1 text-[13.5px] leading-[1.55] text-white/60">
                  Harvin brings that research together into Company Fit. You see the score and the
                  reasons behind it, so your team can decide which companies deserve attention.
                </p>
              </div>
            </div>
            <ul className="mt-5 flex flex-col gap-2 border-t border-white/[0.08] pt-4 short:mt-4 short:gap-1.5 short:pt-3">
              {REASONS.map((r) => (
                <li key={r} className="flex items-start gap-2.5 text-[14px] text-white/85">
                  <Check size={15} strokeWidth={2.4} className="mt-[3px] flex-shrink-0 text-ember-400" />
                  {r}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[13.5px] font-semibold text-ember-400 short:mt-3">
              Harvin recommends. Your team decides.
            </p>
          </div>

          <TextLink href="/data-building#research" className="mt-6 short:mt-4">
            Explore Research &amp; Company Fit
          </TextLink>
        </div>

        {/* ── Right: the record, before and after research ────────────── */}
        <div ref={ref}>
          <Card className="overflow-hidden">
            <div className="flex items-start justify-between gap-4 border-b border-slate-200/80 bg-sand-50 px-5 py-4 dark:border-white/[0.06] dark:bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-white text-[13px] font-bold text-slate-700 ring-1 ring-slate-200 dark:bg-white/[0.05] dark:text-slate-200 dark:ring-white/10">
                  VC
                </span>
                <div>
                  <p className="text-[17px] font-semibold tracking-[-0.015em] text-slate-900 dark:text-white">Vela Commerce</p>
                  <p className="text-[12.5px] text-slate-500 dark:text-slate-400">Research what your targeting depends on</p>
                </div>
              </div>
              <span
                className={`mt-1 inline-flex flex-shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[11.5px] font-semibold transition-colors duration-300 ${
                  fitShown
                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300'
                    : 'bg-ember-50 text-ember-600 dark:bg-ember-500/15 dark:text-ember-300'
                }`}
              >
                {fitShown ? <Check size={12} strokeWidth={2.6} /> : <Loader2 size={12} strokeWidth={2.4} className="animate-spin" />}
                {fitShown ? 'Research complete' : 'Researching'}
              </span>
            </div>

            {/* Column heads */}
            <div className="grid grid-cols-[1.25fr_0.8fr_1fr] gap-3 border-b border-slate-200/80 px-5 py-2.5 text-[11.5px] font-medium text-slate-400 dark:border-white/[0.06] dark:text-slate-500">
              <span>Field</span>
              <span>Database record</span>
              <span>After Harvin research</span>
            </div>

            {/* What a database already has: identical on both sides */}
            <div className="grid grid-cols-[1.25fr_0.8fr_1fr] gap-3 border-b border-slate-200/70 px-5 py-2.5 text-[13px] dark:border-white/[0.05]">
              <span className="font-semibold text-slate-900 dark:text-white">Industry · Employees · HQ</span>
              <span className="text-slate-500 dark:text-slate-400">{BASICS.map((b) => b.value).join(' · ')}</span>
              <span className="text-slate-500 dark:text-slate-400">{BASICS.map((b) => b.value).join(' · ')}</span>
            </div>

            {/* What targeting depends on: empty in the database, researched by Harvin */}
            <ul>
              {RESEARCHED.map((row, i) => {
                const done = step > i;
                const working = step === i && step > 0;
                return (
                  <li
                    key={row.field}
                    className={`grid grid-cols-[1.25fr_0.8fr_1fr] items-start gap-3 border-b border-slate-200/70 px-5 py-2.5 short:py-[7px] transition-colors duration-500 dark:border-white/[0.05] ${
                      done ? 'bg-transparent' : 'bg-sand-50/50 dark:bg-white/[0.01]'
                    }`}
                  >
                    <span className="min-w-0">
                      <span className="block text-[13.5px] font-semibold text-slate-900 dark:text-white">{row.field}</span>
                      <span className="block text-[11.5px] leading-[1.4] text-slate-400 short:hidden dark:text-slate-500">{row.desc}</span>
                    </span>
                    <span className="text-[13px] text-slate-400 dark:text-slate-500">Not in record</span>
                    <span className="flex items-center gap-2 text-[13.5px]">
                      {done ? (
                        <>
                          <span aria-hidden="true" className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-ember-500" />
                          <span className="font-semibold text-slate-900 dark:text-white">{row.value}</span>
                        </>
                      ) : (
                        <span className={`h-2 rounded-full bg-slate-200 dark:bg-white/10 ${working ? 'w-20 animate-pulse' : 'w-14'}`} aria-hidden="true" />
                      )}
                      {!done && <span className="sr-only">{row.value}</span>}
                    </span>
                  </li>
                );
              })}
            </ul>

            {/* The outcome */}
            <div className="grid grid-cols-[1.25fr_0.8fr_1fr] items-center gap-3 bg-sand-50 px-5 py-3 dark:bg-white/[0.02]">
              <span className="text-[14px] font-semibold text-slate-900 dark:text-white">Company Fit</span>
              <span className="text-[13px] text-slate-400 dark:text-slate-500">Unknown</span>
              <span className={`flex items-baseline gap-2 transition-opacity duration-500 ${fitShown ? 'opacity-100' : 'opacity-30'}`}>
                <span className="text-[24px] font-semibold leading-none tracking-[-0.02em] tabular-nums text-ember-500 dark:text-ember-400">
                  {fitShown ? FIT : '—'}
                </span>
                <span className="text-[13px] font-semibold text-ember-600 dark:text-ember-400">{fitShown ? 'Strong fit' : ''}</span>
              </span>
            </div>
          </Card>
          <Footnote>Illustrative example. Vela Commerce is fictional.</Footnote>
        </div>
      </div>
    </Section>
  );
}

function ScoreRing({ value }: { value: number }) {
  const r = 30;
  const c = 2 * Math.PI * r;
  return (
    <span className="relative grid h-[76px] w-[76px] flex-shrink-0 place-items-center" aria-label={`Company Fit ${value} out of 100, strong fit`}>
      <svg viewBox="0 0 76 76" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden="true">
        <circle cx="38" cy="38" r={r} fill="none" strokeWidth="5" className="stroke-white/10" />
        <circle cx="38" cy="38" r={r} fill="none" strokeWidth="5" strokeLinecap="round" className="stroke-ember-500" strokeDasharray={`${(value / 100) * c} ${c}`} />
      </svg>
      <span className="text-center leading-none">
        <span className="block text-[24px] font-semibold tabular-nums">{value}</span>
        <span className="mt-0.5 block text-[10px] text-white/50">/ 100</span>
      </span>
    </span>
  );
}
