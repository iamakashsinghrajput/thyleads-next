'use client';

import Link from 'next/link';
import { ArrowRight, Building, Check, Coins, Users } from 'lucide-react';

import { useBilling } from '@/components/BillingProvider';

import { BOOK_DEMO_HREF, startFreeHref } from '@/lib/site';
import { PLANS, type Plan } from '@/lib/pricing';

/**
 * Pricing plans (Developer Handoff, Nov 2026). Four self-serve plans as cards (the recommended plan carries the only ember button),
 * Enterprise as a full-width band below so its custom price never has to
 * squeeze into a fifth column.
 */

function creditsLabel(plan: Plan, annual: boolean) {
  if (plan.monthlyCredits) {
    return annual
      ? { big: (plan.monthlyCredits * 12).toLocaleString('en-US'), small: 'credits / year, all up front' }
      : { big: plan.monthlyCredits.toLocaleString('en-US'), small: 'credits / month' };
  }
  if (plan.id === 'free') return { big: '250', small: 'credits, once' };
  return { big: 'Custom', small: 'credits, annual' };
}

export default function PricingPlans() {
  const { annual, setAnnual } = useBilling();
  const selfServe = PLANS.filter((p) => p.id !== 'enterprise');
  const enterprise = PLANS.find((p) => p.id === 'enterprise')!;

  return (
    <div id="plans">
      {/* Billing toggle */}
      <div className="flex">
        <div
          role="radiogroup"
          aria-label="Billing period"
          className="relative inline-flex rounded-full border border-slate-200 bg-white p-1 dark:border-rule dark:bg-surface"
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
                  'flex items-center gap-2 rounded-full px-5 py-2 text-[14px] font-semibold transition-colors duration-200',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-500',
                  on
                    ? 'bg-slate-950 text-white dark:bg-white/[0.1] dark:text-white'
                    : 'text-slate-600 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white',
                ].join(' ')}
              >
                {opt.label}
                {opt.value && (
                  <span className="text-[13px] font-medium text-slate-500 dark:text-slate-400">
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
          const credits = creditsLabel(plan, annual);
          const href = startFreeHref(plan.id === 'free' ? undefined : plan.id);

          return (
            <div
              key={plan.id}
              className={[
                'relative flex flex-col rounded-card border p-6 transition-colors duration-200',
                dark
                  ? 'border-ember-500 bg-sand-50 dark:border-ember-500 dark:bg-surface'
                  : 'border-slate-200 bg-sand-50 hover:border-slate-300 dark:border-rule dark:bg-surface dark:hover:border-white/[0.16]',
              ].join(' ')}
            >
              <div className="relative flex flex-1 flex-col">
                <div className="flex items-baseline justify-between gap-3">
                  <h2 className="font-display text-[24px] font-medium text-slate-950 dark:text-white">{plan.name}</h2>
                  {dark && (
                    <span className="text-[13px] font-medium text-ember-600 dark:text-ember-400">{plan.badge}</span>
                  )}
                </div>
                <p className="mt-2 min-h-[66px] text-[14px] leading-relaxed text-slate-600 dark:text-slate-300">
                  {plan.oneLiner}
                </p>

                <div className="mt-5 flex items-baseline gap-1.5">
                  <span
                    className="font-display text-[48px] font-medium leading-none tabular-nums text-slate-950 dark:text-white"
                  >
                    ${price}
                  </span>
                  {price > 0 && (
                    <span className="text-[14px] text-slate-500 dark:text-slate-400">/month</span>
                  )}
                </div>
                <p className="mt-1.5 h-5 text-[13px] text-slate-500 dark:text-slate-400">
                  {price === 0 ? 'No card needed' : annual ? (
                    <>
                      ${((plan.annual ?? 0) * 12).toLocaleString('en-US')} billed yearly
                    </>
                  ) : (
                    'billed monthly'
                  )}
                </p>

                {/* Credits + seats */}
                <div
                  className={[
                    'mt-5 grid grid-cols-[1fr_auto] items-center gap-3 border-y px-0 py-3',
                    'border-slate-200 dark:border-rule',
                  ].join(' ')}
                >
                  <span className="flex items-center gap-2.5">
                    <Coins size={16} aria-hidden="true" className="text-slate-500 dark:text-slate-400" />
                    <span>
                      <span className="block text-[16px] font-semibold tabular-nums leading-tight text-slate-950 dark:text-white">
                        {credits.big}
                      </span>
                      <span className="block text-[12.5px] text-slate-500 dark:text-slate-400">{credits.small}</span>
                    </span>
                  </span>
                  <span className="flex items-center gap-1.5 text-[13px] text-slate-600 dark:text-slate-300">
                    <Users size={14} aria-hidden="true" />
                    {plan.seats}
                  </span>
                </div>

                <a
                  href={href}
                  className={[
                    'group mt-5 flex w-full items-center justify-center gap-2 rounded-btn py-3 text-[14.5px] font-semibold transition-colors duration-150',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-surface',
                    dark
                      ? 'bg-ember-500 text-pure hover:bg-ember-400 dark:bg-ember-500 dark:text-pure dark:hover:bg-ember-400'
                      : 'border border-slate-300 text-slate-950 hover:border-slate-950 dark:border-rule dark:text-white dark:hover:border-slate-400',
                  ].join(' ')}
                >
                  {plan.cta}
                  <ArrowRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
                </a>
                {plan.id === 'free' && (
                  // [DECISION A] Recommended variant: phone code sent at the first contact reveal.
                  <p className="mt-3 text-[12.5px] leading-relaxed text-slate-500 dark:text-slate-400">
                    Sign up with your work email. We&rsquo;ll verify your phone with a one-time code before your first
                    contact reveal.
                  </p>
                )}

                <p className="mt-6 text-[13px] text-slate-500 dark:text-slate-400">
                  Best for: {plan.bestFor}
                </p>
                <ul className="mt-3 space-y-2.5">
                  {plan.inclusions.map((item) => {
                    const negative = item.startsWith('No ');
                    return (
                      <li
                        key={item}
                        className={[
                          'flex items-start gap-2.5 text-[14px]',
                          negative ? 'text-slate-500 dark:text-slate-400' : 'text-slate-700 dark:text-slate-300',
                        ].join(' ')}
                      >
                        <span
                          className={[
                            'mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center',
                            negative ? 'text-grey' : 'text-ember-600 dark:text-ember-400',
                          ].join(' ')}
                        >
                          {negative ? (
                            <span aria-hidden="true" className="h-0.5 w-2 rounded-full bg-current" />
                          ) : (
                            <Check size={14} strokeWidth={2.5} aria-hidden="true" />
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
      <div className="relative mt-10 rounded-card border border-slate-200 bg-sand-50 p-6 dark:border-rule dark:bg-surface sm:p-8">
        <div className="relative grid gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,5fr)_auto] lg:items-center">
          <div>
            <div className="flex items-center gap-3">
              <Building size={18} aria-hidden="true" className="text-slate-500 dark:text-slate-400" />
              <h2 className="font-display text-[24px] font-medium text-slate-950 dark:text-white">{enterprise.name}</h2>
            </div>
            <p className="mt-4 font-display text-[30px] font-medium leading-none text-slate-950 dark:text-white">
              {enterprise.priceNote}
            </p>
            <p className="mt-3 inline-flex items-center gap-1.5 text-[14px] text-slate-600 dark:text-slate-300">
              <Users size={13} aria-hidden="true" />
              {enterprise.seats}
            </p>
            <p className="mt-3 text-[14px] leading-relaxed text-slate-600 dark:text-slate-300">{enterprise.oneLiner}</p>
          </div>

          <ul className="grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
            {enterprise.inclusions.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-[14px] text-slate-700 dark:text-slate-300">
                <span className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center text-ember-600 dark:text-ember-400">
                  <Check size={14} strokeWidth={2.5} aria-hidden="true" />
                </span>
                {item}
              </li>
            ))}
          </ul>

          <Link
            href={BOOK_DEMO_HREF}
            className="group inline-flex items-center justify-center gap-2 rounded-btn border border-slate-300 px-6 py-3.5 text-[14.5px] font-semibold text-slate-950 transition-colors hover:border-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-500 focus-visible:ring-offset-2 dark:border-rule dark:text-white dark:hover:border-slate-400 dark:focus-visible:ring-offset-surface"
          >
            {enterprise.cta}
            <ArrowRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>

      <p className="mt-6 text-[14px] text-slate-500 dark:text-slate-400">
        Every paid plan includes unlimited seats for people at your company. Annual plans are billed yearly, with all
        credits available from day one.
      </p>
    </div>
  );
}
