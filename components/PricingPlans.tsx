'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Building, Check, Coins, Users } from 'lucide-react';

import { BOOK_DEMO_HREF, startFreeHref } from '@/lib/site';
import { PLANS, type Plan } from '@/lib/pricing';

/**
 * Pricing §plans. Four self-serve plans as cards (Growth raised and dark),
 * Enterprise as a full-width band below so its custom price never has to
 * squeeze into a fifth column.
 */

function creditsLabel(plan: Plan) {
  if (plan.monthlyCredits) return { big: plan.monthlyCredits.toLocaleString('en-US'), small: 'credits / month' };
  if (plan.id === 'free') return { big: '250', small: 'credits, once' };
  return { big: 'Custom', small: 'credits, annual' };
}

export default function PricingPlans() {
  const [annual, setAnnual] = useState(false);
  const selfServe = PLANS.filter((p) => p.id !== 'enterprise');
  const enterprise = PLANS.find((p) => p.id === 'enterprise')!;

  return (
    <div id="plans">
      {/* Billing toggle */}
      <div className="flex justify-center">
        <div
          role="radiogroup"
          aria-label="Billing period"
          className="relative inline-flex rounded-full border border-slate-200 bg-white p-1 shadow-[0_1px_2px_rgba(0,0,0,0.04)] dark:border-white/[0.08] dark:bg-white/[0.04]"
        >
          {[
            { label: 'Monthly', value: false },
            { label: 'Annual', value: true },
          ].map((opt) => {
            const on = annual === opt.value;
            return (
              <button
                key={opt.label}
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() => setAnnual(opt.value)}
                className={[
                  'flex items-center gap-2 rounded-full px-5 py-2 text-[14px] font-semibold transition-all duration-200',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-500',
                  on
                    ? 'bg-slate-950 text-white shadow-sm dark:bg-white dark:text-slate-950'
                    : 'text-slate-600 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white',
                ].join(' ')}
              >
                {opt.label}
                {opt.value && (
                  <span
                    className={[
                      'rounded-full px-2 py-0.5 text-[11px] font-bold',
                      on ? 'bg-ember-500 text-white' : 'bg-ember-50 text-ember-600 dark:bg-ember-500/15 dark:text-ember-300',
                    ].join(' ')}
                  >
                    Save about 20%
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Self-serve plans */}
      <div className="mt-12 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {selfServe.map((plan) => {
          const dark = Boolean(plan.badge);
          const price = (annual ? plan.annual : plan.monthly) ?? 0;
          const credits = creditsLabel(plan);
          const href = startFreeHref(plan.id === 'free' ? undefined : plan.id);

          return (
            <div
              key={plan.id}
              className={[
                'relative flex flex-col rounded-modal border p-6 transition-all duration-200',
                dark
                  ? 'border-slate-950 bg-[#0C0B09] text-white shadow-[0_24px_60px_rgba(12,11,9,0.35)] lg:-my-4 lg:py-10 dark:border-ember-500/50 dark:shadow-[0_24px_60px_rgba(201,76,30,0.18)]'
                  : 'border-slate-200 bg-sand-50 shadow-[0_4px_32px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 hover:border-ember-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:border-white/[0.08] dark:bg-[#0F0E0C] dark:shadow-[0_4px_40px_rgba(0,0,0,0.35)] dark:hover:border-ember-500/40',
              ].join(' ')}
            >
              {dark && (
                <>
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 rounded-modal bg-[radial-gradient(80%_50%_at_50%_0%,rgba(201,76,30,0.28),transparent_70%)]"
                  />
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-ember-500 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-white shadow-[0_4px_14px_rgba(201,76,30,0.4)]">
                    {plan.badge}
                  </span>
                </>
              )}

              <div className="relative flex flex-1 flex-col">
                <h2 className={`font-instrument text-[22px] font-semibold ${dark ? 'text-white' : 'text-slate-950 dark:text-white'}`}>
                  {plan.name}
                </h2>
                <p className={`mt-2 min-h-[66px] text-[14px] leading-relaxed ${dark ? 'text-white/65' : 'text-slate-600 dark:text-slate-400'}`}>
                  {plan.oneLiner}
                </p>

                <div className="mt-5 flex items-baseline gap-1.5">
                  <span
                    className={`font-instrument text-[48px] font-semibold leading-none tracking-[-0.035em] tabular-nums ${dark ? 'text-white' : 'text-slate-950 dark:text-white'}`}
                  >
                    ${price}
                  </span>
                  {price > 0 && (
                    <span className={`text-[14px] ${dark ? 'text-white/60' : 'text-slate-500 dark:text-slate-400'}`}>/month</span>
                  )}
                </div>
                <p className={`mt-1.5 h-5 text-[12.5px] ${dark ? 'text-white/50' : 'text-slate-500 dark:text-slate-400'}`}>
                  {price === 0 ? 'No card needed' : annual ? (
                    <>
                      <span className="line-through opacity-70">${plan.monthly}</span> billed yearly
                    </>
                  ) : (
                    'billed monthly'
                  )}
                </p>

                {/* Credits + seats */}
                <div
                  className={[
                    'mt-5 grid grid-cols-[1fr_auto] items-center gap-3 rounded-card px-4 py-3',
                    dark ? 'bg-white/[0.07]' : 'bg-white dark:bg-white/[0.04]',
                  ].join(' ')}
                >
                  <span className="flex items-center gap-2.5">
                    <Coins size={16} aria-hidden="true" className={dark ? 'text-ember-300' : 'text-ember-500 dark:text-ember-400'} />
                    <span>
                      <span className={`block text-[16px] font-bold tabular-nums leading-tight ${dark ? 'text-white' : 'text-slate-950 dark:text-white'}`}>
                        {credits.big}
                      </span>
                      <span className={`block text-[11.5px] ${dark ? 'text-white/55' : 'text-slate-500 dark:text-slate-400'}`}>{credits.small}</span>
                    </span>
                  </span>
                  <span className={`flex items-center gap-1.5 text-[12.5px] ${dark ? 'text-white/70' : 'text-slate-600 dark:text-slate-400'}`}>
                    <Users size={14} aria-hidden="true" />
                    {plan.seats} {plan.seats === '1' ? 'seat' : 'seats'}
                  </span>
                </div>

                <a
                  href={href}
                  className={[
                    'group mt-5 flex w-full items-center justify-center gap-2 rounded-btn py-3 text-[14.5px] font-semibold transition-all duration-150',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-500 focus-visible:ring-offset-2',
                    dark
                      ? 'bg-ember-500 text-white shadow-[0_1px_4px_rgba(201,76,30,0.3)] hover:bg-ember-400 hover:shadow-[0_4px_14px_rgba(201,76,30,0.4)] focus-visible:ring-offset-[#0C0B09]'
                      : 'border border-slate-300 bg-white text-slate-950 hover:border-slate-950 hover:bg-slate-950 hover:text-white dark:border-white/[0.14] dark:bg-transparent dark:text-white dark:hover:border-white dark:hover:bg-white dark:hover:text-slate-950',
                  ].join(' ')}
                >
                  {plan.cta}
                  <ArrowRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
                </a>

                <p className={`mt-6 text-[11px] font-semibold uppercase tracking-[0.12em] ${dark ? 'text-white/45' : 'text-slate-400 dark:text-slate-500'}`}>
                  Best for: {plan.bestFor}
                </p>
                <ul className="mt-3 space-y-2.5">
                  {plan.inclusions.map((item) => {
                    const negative = item.startsWith('No ');
                    return (
                      <li
                        key={item}
                        className={`flex items-start gap-2.5 text-[14px] ${dark ? 'text-white/85' : 'text-slate-700 dark:text-slate-300'} ${negative ? 'opacity-60' : ''}`}
                      >
                        <span
                          className={[
                            'mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full',
                            negative
                              ? 'bg-slate-200 text-slate-500 dark:bg-white/[0.08] dark:text-slate-400'
                              : dark
                                ? 'bg-ember-500 text-white'
                                : 'bg-ember-500/10 text-ember-500 dark:text-ember-400',
                          ].join(' ')}
                        >
                          {negative ? (
                            <span aria-hidden="true" className="h-0.5 w-2 rounded-full bg-current" />
                          ) : (
                            <Check size={11} strokeWidth={3} aria-hidden="true" />
                          )}
                        </span>
                        <span>{item}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      {/* Enterprise band */}
      <div className="relative mt-10 overflow-hidden rounded-modal border border-slate-200 bg-white p-6 shadow-[0_4px_32px_rgba(0,0,0,0.06)] dark:border-white/[0.08] dark:bg-[#0F0E0C] dark:shadow-[0_4px_40px_rgba(0,0,0,0.35)] sm:p-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-ember-500/10 blur-3xl"
        />
        <div className="relative grid gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,5fr)_auto] lg:items-center">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-btn bg-slate-950 text-white dark:bg-white dark:text-slate-950">
                <Building size={18} aria-hidden="true" />
              </span>
              <h2 className="font-instrument text-[22px] font-semibold text-slate-950 dark:text-white">{enterprise.name}</h2>
            </div>
            <p className="mt-4 font-instrument text-[30px] font-semibold leading-none tracking-[-0.02em] text-slate-950 dark:text-white">
              {annual ? 'Custom' : enterprise.priceNote}
            </p>
            <p className="mt-3 text-[14px] leading-relaxed text-slate-600 dark:text-slate-400">{enterprise.oneLiner}</p>
          </div>

          <ul className="grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
            {enterprise.inclusions.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-[14px] text-slate-700 dark:text-slate-300">
                <span className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-ember-500/10 text-ember-500 dark:text-ember-400">
                  <Check size={11} strokeWidth={3} aria-hidden="true" />
                </span>
                {item}
              </li>
            ))}
          </ul>

          <Link
            href={BOOK_DEMO_HREF}
            className="group inline-flex items-center justify-center gap-2 rounded-btn bg-slate-950 px-6 py-3.5 text-[14.5px] font-semibold text-white transition-colors
                       hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-500 focus-visible:ring-offset-2
                       dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100"
          >
            {enterprise.cta}
            <ArrowRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>

      <p className="mt-6 text-center text-[13px] text-slate-500 dark:text-slate-400">
        Annual plans are billed yearly, with all credits available from day one.
      </p>
    </div>
  );
}
