'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { BOOK_DEMO_HREF, startFreeHref } from '@/lib/site';
import { CREDIT_COSTS, PLANS, recommendPlan } from '@/lib/pricing';

/**
 * Pricing §calculator. A slider plus an exact number field per input; the
 * result panel recommends the smallest plan whose monthly credits cover the
 * estimate, and shows how much of that plan the estimate uses.
 */
const FIELDS = [
  { key: 'companies', label: 'Companies to research each month', helper: '2 credits each', initial: 1000, max: 10000, step: 100 },
  {
    key: 'deepFields',
    label: 'Deep-research fields per company',
    helper: 'Store count, MAU and similar: 3 credits each',
    initial: 0,
    max: 5,
    step: 1,
  },
  { key: 'emails', label: 'Work emails', helper: '3 credits each, only when found', initial: 600, max: 5000, step: 50 },
  { key: 'phones', label: 'Phone numbers', helper: '20 credits each, only when found', initial: 60, max: 1000, step: 10 },
  { key: 'accounts', label: 'Accounts to monitor for signals', helper: '5 credits per account per month', initial: 0, max: 2000, step: 50 },
] as const;

type Key = (typeof FIELDS)[number]['key'];

export default function CreditCalculator() {
  const [values, setValues] = useState<Record<Key, number>>(
    () => Object.fromEntries(FIELDS.map((f) => [f.key, f.initial])) as Record<Key, number>,
  );
  const set = (key: Key, n: number) => setValues((v) => ({ ...v, [key]: Math.max(0, Math.floor(n || 0)) }));

  const parts = [
    { label: 'Research', value: values.companies * CREDIT_COSTS.company, cls: 'bg-ember-500' },
    { label: 'Deep fields', value: values.companies * values.deepFields * CREDIT_COSTS.deepField, cls: 'bg-ember-300' },
    { label: 'Emails', value: values.emails * CREDIT_COSTS.email, cls: 'bg-amber-400' },
    { label: 'Phones', value: values.phones * CREDIT_COSTS.phone, cls: 'bg-white' },
    { label: 'Signals', value: values.accounts * CREDIT_COSTS.signalAccount, cls: 'bg-white/40' },
  ];
  const total = parts.reduce((s, p) => s + p.value, 0);
  const plan = recommendPlan(total);
  const isEnterprise = plan.id === 'enterprise';
  const capacity = plan.monthlyCredits ?? total;
  const usedPct = capacity > 0 ? Math.min(100, Math.round((total / capacity) * 100)) : 0;

  return (
    <div className="grid overflow-hidden rounded-modal border border-slate-200 bg-sand-50 shadow-[0_4px_32px_rgba(0,0,0,0.06)] dark:border-white/[0.08] dark:bg-[#0F0E0C] dark:shadow-[0_4px_40px_rgba(0,0,0,0.35)] lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
      <div className="space-y-7 p-6 sm:p-8">
        {FIELDS.map((f) => {
          const pct = Math.min(100, (values[f.key] / f.max) * 100);
          return (
            <div key={f.key}>
              <div className="flex items-baseline justify-between gap-4">
                <label htmlFor={`calc-${f.key}`} className="text-[14.5px] font-semibold text-slate-900 dark:text-white">
                  {f.label}
                </label>
                <input
                  type="number"
                  inputMode="numeric"
                  min={0}
                  value={values[f.key]}
                  aria-label={`${f.label} (exact value)`}
                  onChange={(e) => set(f.key, Number(e.target.value))}
                  className="w-24 rounded-btn border border-slate-200 bg-white px-2.5 py-1.5 text-right text-[14px] font-semibold tabular-nums text-slate-900
                             focus:border-ember-500 focus:outline-none focus:ring-2 focus:ring-ember-500/30
                             dark:border-white/[0.12] dark:bg-white/[0.04] dark:text-white"
                />
              </div>
              <input
                id={`calc-${f.key}`}
                type="range"
                min={0}
                max={f.max}
                step={f.step}
                value={Math.min(values[f.key], f.max)}
                onChange={(e) => set(f.key, Number(e.target.value))}
                style={{ backgroundSize: `${pct}% 100%` }}
                className="mt-3 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-slate-200 bg-gradient-to-r from-ember-500 to-ember-500 bg-no-repeat dark:bg-white/[0.1]
                           [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-ember-500
                           [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full
                           [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-ember-500
                           [&::-webkit-slider-thumb]:shadow-[0_1px_6px_rgba(201,76,30,0.5)]"
              />
              <p className="mt-2 text-[12.5px] text-slate-500 dark:text-slate-400">{f.helper}</p>
            </div>
          );
        })}
      </div>

      <div aria-live="polite" className="relative flex flex-col gap-8 overflow-hidden bg-[#0C0B09] p-6 text-white sm:p-8">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_50%_at_100%_0%,rgba(201,76,30,0.3),transparent_70%)]" />
        <div className="relative">
          <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-white/50">Your estimate</p>
          <p className="mt-3 text-[16px] leading-relaxed text-white/75">
            About{' '}
            <span className="block font-instrument text-[56px] font-semibold leading-none tracking-[-0.035em] tabular-nums text-white">
              {total.toLocaleString('en-US')}
            </span>
            credits a month. Recommended plan: <span className="font-semibold text-ember-300">{plan.name}</span>.
          </p>

          {/* breakdown bar */}
          <div className="mt-7 flex h-2.5 overflow-hidden rounded-full bg-white/10" aria-hidden="true">
            {total > 0 &&
              parts
                .filter((p) => p.value > 0)
                .map((p) => <span key={p.label} className={`${p.cls} h-full`} style={{ width: `${(p.value / total) * 100}%` }} />)}
          </div>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-[12.5px]">
            {parts.map((p) => (
              <li key={p.label} className={`flex items-center justify-between gap-2 ${p.value === 0 ? 'text-white/35' : 'text-white/75'}`}>
                <span className="flex items-center gap-2">
                  <span aria-hidden="true" className={`h-2 w-2 rounded-full ${p.cls}`} />
                  {p.label}
                </span>
                <span className="tabular-nums">{p.value.toLocaleString('en-US')}</span>
              </li>
            ))}
          </ul>

          {/* Where the estimate lands across plans */}
          <ul className="mt-8 space-y-2 border-t border-white/[0.08] pt-6">
            {PLANS.filter((p) => p.monthlyCredits).map((p) => {
              const fits = (p.monthlyCredits ?? 0) >= total;
              const current = p.id === plan.id;
              return (
                <li
                  key={p.id}
                  className={[
                    'flex items-center justify-between rounded-btn border px-3 py-2 text-[13px] transition-colors',
                    current
                      ? 'border-ember-400/60 bg-ember-500/15 text-white'
                      : fits
                        ? 'border-transparent text-white/70'
                        : 'border-transparent text-white/35',
                  ].join(' ')}
                >
                  <span className="font-semibold">{p.name}</span>
                  <span className="tabular-nums">{p.monthlyCredits?.toLocaleString('en-US')} credits / month</span>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="relative mt-auto">
          {!isEnterprise && (
            <div className="mb-5">
              <div className="flex justify-between text-[12.5px] text-white/60">
                <span>Uses {usedPct}% of {plan.name}</span>
                <span className="tabular-nums">{plan.monthlyCredits?.toLocaleString('en-US')} credits</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-ember-400 transition-all duration-300" style={{ width: `${usedPct}%` }} />
              </div>
            </div>
          )}
          {isEnterprise ? (
            <Link href={BOOK_DEMO_HREF} className={BUTTON}>
              Talk to sales
              <ArrowRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          ) : (
            <a href={startFreeHref(plan.id)} className={BUTTON}>
              Start with {plan.name}
              <ArrowRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

const BUTTON =
  'group flex w-full items-center justify-center gap-2 rounded-btn bg-ember-500 px-5 py-3.5 text-[15px] font-semibold text-white transition-all duration-150 ' +
  'shadow-[0_1px_4px_rgba(201,76,30,0.3)] hover:bg-ember-400 hover:shadow-[0_4px_14px_rgba(201,76,30,0.4)] ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300';
