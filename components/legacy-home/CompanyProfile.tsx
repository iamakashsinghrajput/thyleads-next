'use client';

import { useEffect, useState } from 'react';

/**
 * "Start with your business" — sits directly under SdrProblem and answers it:
 * the context a database filter can't hold is what Harvin asks for up front.
 *
 * Built to fit one desktop screen. Left: the four things you tell Harvin, as a
 * numbered step list where only the active step shows its description. Right:
 * the Company Profile those steps fill in, drawn in the same bezelled device as
 * the Account explorer visual (ProductSteps' DiscoverPanel).
 *
 * The steps advance on their own (STEP_MS) and highlight the matching part of
 * the profile; hovering or focusing the list takes over and pauses it, and
 * visitors who prefer reduced motion get no auto-advance. Company names in the
 * profile are illustrative, not customers.
 */

type Key = 'sell' | 'buys' | 'reach' | 'matters';

const STEP_MS = 4500;

const INPUTS: { key: Key; title: string; body: string }[] = [
  {
    key: 'sell',
    title: 'What you sell',
    body: 'What your product does, the problems it solves and who needs it.',
  },
  {
    key: 'buys',
    title: 'Who already buys',
    body: 'Add a few customers that converted and companies that didn’t.',
  },
  {
    key: 'reach',
    title: 'Who you want to reach',
    body: 'Tell Harvin the roles, functions and seniority you usually sell to.',
  },
  {
    key: 'matters',
    title: 'What matters when judging fit',
    body: 'Industry, geography, business model, technologies, locations, users or anything else important to your business.',
  },
];

export default function CompanyProfile() {
  const [index, setIndex] = useState(1);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const active = INPUTS[index].key;
  const auto = !paused && !reduceMotion;

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (!auto) return;
    const t = setTimeout(() => setIndex((i) => (i + 1) % INPUTS.length), STEP_MS);
    return () => clearTimeout(t);
  }, [auto, index]);

  return (
    <section className="border-t border-slate-200 bg-sand-100 px-4 py-16 dark:border-white/[0.06] dark:bg-[#040404] sm:px-6 lg:px-8 lg:py-16 short:py-8">
      <div className="mx-auto grid max-w-[1180px] items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        {/* ── Left: what you tell Harvin ─────────────────────────────── */}
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ember-500">
            Start with your business
          </p>
          <h2 className="mt-3 text-[clamp(27px,3vw,40px)] short:text-[34px] font-semibold leading-[1.09] tracking-[-0.025em] text-slate-900 dark:text-white">
            Tell Harvin what a good customer looks like.
          </h2>
          <p className="mt-4 max-w-[520px] text-[15.5px] leading-[1.65] text-slate-600 dark:text-slate-400">
            You already know more about your best customers than any database filter can capture.
            Give Harvin that context once. It uses it every time it finds and researches companies
            for you.
          </p>

          <ol
            className="mt-8 short:mt-5 border-l border-slate-200 dark:border-white/[0.08]"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
          >
            {INPUTS.map((item, i) => {
              const on = i === index;
              return (
                <li key={item.key} className="relative">
                  {/* Accent on the shared rail: full when paused, filling while auto-advancing. */}
                  <span
                    aria-hidden="true"
                    className={`absolute -left-px top-0 h-full w-[2px] origin-top bg-ember-500 transition-opacity duration-300 ${
                      on ? 'opacity-100' : 'opacity-0'
                    }`}
                    key={on && auto ? `run-${index}` : 'still'}
                    style={on && auto ? { animation: `lh-step-progress ${STEP_MS}ms linear both` } : undefined}
                  />
                  <button
                    type="button"
                    onMouseEnter={() => setIndex(i)}
                    onFocus={() => setIndex(i)}
                    onClick={() => setIndex(i)}
                    aria-expanded={on}
                    className="group flex w-full items-start gap-4 py-3 short:py-2 pl-5 text-left focus-visible:outline-none"
                  >
                    <span
                      className={`mt-[3px] w-6 flex-shrink-0 font-mono text-[12px] font-semibold tabular-nums transition-colors duration-300 ${
                        on ? 'text-ember-500' : 'text-slate-400 dark:text-slate-500'
                      }`}
                    >
                      0{i + 1}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span
                        className={`block text-[17px] font-semibold tracking-[-0.01em] transition-colors duration-300 ${
                          on
                            ? 'text-slate-900 dark:text-white'
                            : 'text-slate-500 group-hover:text-slate-800 dark:text-slate-400 dark:group-hover:text-slate-200'
                        }`}
                      >
                        {item.title}
                      </span>
                      {/* Collapses to zero height when inactive; grid rows animate smoothly. */}
                      <span
                        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                          on ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                        }`}
                      >
                        <span className="overflow-hidden">
                          <span className="block pt-1.5 text-[14.5px] leading-[1.6] text-slate-600 dark:text-slate-400">
                            {item.body}
                          </span>
                        </span>
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>

          <div className="mt-8 short:mt-5 rounded-2xl border border-slate-200 bg-white px-5 py-4 dark:border-white/[0.08] dark:bg-white/[0.02]">
            <p className="text-[17px] font-semibold leading-[1.35] tracking-[-0.015em] text-slate-900 dark:text-white">
              Harvin turns this into your{' '}
              <span className="text-ember-500 dark:text-ember-400">Company Profile.</span>
            </p>
            <p className="mt-1.5 text-[14.5px] leading-[1.6] text-slate-600 dark:text-slate-400">
              From there, it knows what to look for — without asking you to rebuild the same
              filters every time.
            </p>
          </div>
        </div>

        {/* ── Right: the profile it becomes ──────────────────────────── */}
        <ProfileDevice active={active} />
      </div>
    </section>
  );
}

/* ── Device: same chrome as the Account explorer visual ─────────────────── */
function ProfileDevice({ active }: { active: Key }) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-sand-200 p-5 dark:bg-[#141210] sm:p-6">
      {/* Dark bezel, screen bleeding off the right and bottom */}
      <div className="relative -mb-10 -mr-14 ml-[5%] rounded-l-[32px] bg-[#141414] py-[13px] pl-[13px] shadow-[0_26px_64px_rgba(15,23,42,0.3)]">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-[3px] rounded-l-[32px] bg-gradient-to-b from-white/30 via-white/[0.06] to-transparent"
        />

        <div className="overflow-hidden rounded-l-[22px] bg-white pt-4 dark:bg-[#16130F]">
          <div className="flex items-baseline justify-between gap-4 pb-3 pl-6 pr-16">
            <h4 className="text-[20px] font-bold tracking-[-0.025em] text-slate-900 dark:text-white">
              Company Profile
            </h4>
            <span className="flex-shrink-0 rounded-full bg-ember-50 px-3 py-1 text-[12.5px] font-bold text-ember-600 dark:bg-ember-500/15 dark:text-ember-300">
              Saved
            </span>
          </div>

          <div className="border-t border-slate-200/70 pb-8 pl-6 pr-16 dark:border-white/[0.06]">
            <Group label="What you sell" on={active === 'sell'}>
              <p className="text-[14.5px] font-semibold tracking-[-0.01em] text-slate-900 dark:text-white">
                Cross-border payment infrastructure
              </p>
              <Chips items={['Global payouts', 'FX']} className="mt-2" />
            </Group>

            <Group label="Who already buys" on={active === 'buys'}>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                <div>
                  <SubLabel>Converted</SubLabel>
                  <Chips items={['Tripwise', 'Orbit Learn']} />
                </div>
                <div>
                  <SubLabel>Didn&rsquo;t convert</SubLabel>
                  <Chips items={['CornerMart']} struck />
                </div>
              </div>
            </Group>

            <Group label="Who you want to reach" on={active === 'reach'}>
              <Chips items={['CFO', 'VP Finance', 'Head of Payments']} />
              <p className="mt-1.5 text-[12px] text-slate-500 dark:text-slate-400">
                Finance, head and above
              </p>
            </Group>

            <Group label="What matters" on={active === 'matters'}>
              <Chips items={['Pays sellers abroad', '10+ countries', 'Uses Stripe', 'India, SEA, UAE']} />
            </Group>
          </div>
        </div>
      </div>
    </div>
  );
}

function Group({ label, on, children }: { label: string; on: boolean; children: React.ReactNode }) {
  return (
    <div
      className={`-mx-3 my-1 rounded-xl px-3 py-2.5 transition-colors duration-300 ${
        on ? 'bg-ember-50/70 dark:bg-ember-500/[0.07]' : ''
      }`}
    >
      <p
        className={`mb-2 flex items-center gap-2 text-[12px] font-semibold transition-colors duration-300 ${
          on ? 'text-ember-600 dark:text-ember-400' : 'text-slate-500 dark:text-slate-400'
        }`}
      >
        {on && <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-ember-500" />}
        {label}
      </p>
      {children}
    </div>
  );
}

function SubLabel({ children }: { children: React.ReactNode }) {
  return <p className="mb-1.5 text-[11.5px] text-slate-400 dark:text-slate-500">{children}</p>;
}

function Chips({ items, struck = false, className = '' }: { items: string[]; struck?: boolean; className?: string }) {
  return (
    <div className={`flex flex-wrap gap-1.5 ${className}`}>
      {items.map((t) => (
        <span
          key={t}
          className={`rounded-lg border px-2.5 py-[3px] text-[12.5px] font-medium ${
            struck
              ? 'border-slate-200 bg-slate-50 text-slate-400 line-through decoration-slate-400 dark:border-white/[0.08] dark:bg-white/[0.02] dark:text-slate-500'
              : 'border-slate-200 bg-sand-50 text-slate-700 dark:border-white/[0.1] dark:bg-white/[0.04] dark:text-slate-200'
          }`}
        >
          {struck && <span className="sr-only">Did not convert: </span>}
          {t}
        </span>
      ))}
    </div>
  );
}
