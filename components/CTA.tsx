'use client';

import { useState } from 'react';
import { ArrowRight, Check, Zap } from 'lucide-react';
import { useModal } from '@/components/ModalContext';

/**
 * The signals the CTA promises to show on the call. Built in markup rather than
 * a screenshot so it stays sharp, themes with the page, and can't drift out of
 * date the way a captured PNG does.
 *
 * Signals are phrased as computed metrics, never named events — see the same
 * note in Platform.tsx. Companies are real; the tallies are illustrative.
 */
const LIVE_SIGNALS = [
  { name: 'Snowflake',  logo: '/logos/snowflake.svg',  signal: '42 open GTM roles',    when: '2h' },
  { name: 'Stripe',     logo: '/logos/stripe.svg',     signal: '9 new tools in stack', when: '5h' },
  { name: 'MongoDB',    logo: '/logos/mongodb.svg',    signal: 'Headcount +18% QoQ',   when: '1d' },
  { name: 'Databricks', logo: '/logos/databricks.svg', signal: '23 open eng roles',    when: '1d' },
];

/** Small donut, matching the score rings in the Platform section. */
function ScoreRing({ value }: { value: number }) {
  const R = 15;
  const C = 2 * Math.PI * R;
  return (
    <span className="relative grid h-[40px] w-[40px] flex-shrink-0 place-items-center">
      <svg viewBox="0 0 40 40" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden="true">
        <circle cx="20" cy="20" r={R} fill="none" strokeWidth="3.5" className="stroke-slate-200 dark:stroke-white/[0.12]" />
        <circle
          cx="20" cy="20" r={R} fill="none" strokeWidth="3.5" strokeLinecap="round"
          className="stroke-ember-500" strokeDasharray={C} strokeDashoffset={C * (1 - value / 100)}
        />
      </svg>
      <span className="relative text-[12px] font-bold tabular-nums text-slate-900 dark:text-white">{value}</span>
    </span>
  );
}

/**
 * The payoff card, overlapping the feed's lower-left.
 *
 * The feed alone says "we detect things"; this says what that is worth — a
 * named account, a score, and a window that closes. It is the one element on
 * the page that states the offer's actual promise, so it gets the focal
 * treatment rather than another row in a list.
 */
function BuyingWindowCard() {
  return (
    <div
      className="absolute -bottom-5 -left-3 w-[76%] rounded-2xl border border-ember-200 bg-white p-4
                 shadow-[0_18px_40px_rgba(15,23,42,0.18)]
                 dark:border-ember-500/30 dark:bg-[#1a1512] dark:shadow-[0_18px_40px_rgba(0,0,0,0.55)]
                 sm:-left-5"
    >
      <span className="flex items-center gap-1.5">
        <Zap size={12} className="flex-shrink-0 text-ember-500" strokeWidth={2.8} />
        <span className="font-mono text-[9.5px] font-bold uppercase tracking-[0.14em] text-ember-500">
          Buying window open
        </span>
      </span>

      <div className="mt-2.5 flex items-center gap-3">
        <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-lg border border-slate-200 bg-white p-1.5 dark:border-white/10">
          <img src="/logos/snowflake.svg" alt="" aria-hidden="true" className="h-auto w-full object-contain" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[14px] font-bold text-slate-900 dark:text-white">Snowflake</p>
          <p className="truncate text-[11.5px] text-slate-500 dark:text-slate-400">Hiring + stack expansion</p>
        </div>
        <ScoreRing value={93} />
      </div>

      {/* A window that closes is the reason to book the call now. */}
      <div className="mt-3">
        <span className="block h-1.5 w-full overflow-hidden rounded-full bg-sand-200 dark:bg-white/10">
          <span className="block h-full w-[62%] rounded-full bg-ember-500" />
        </span>
        <p className="mt-1.5 text-[11px] text-slate-500 dark:text-slate-400">
          Best reached in the next <span className="font-semibold text-slate-900 dark:text-white">14 days</span>
        </p>
      </div>
    </div>
  );
}

const PROMISES = [
  'No credit card required — free for the first 14 days',
  'We pull live signals on your own account list',
  '30 minutes, no slide deck',
];

function LiveSignalsCard() {
  return (
    <div
      className="w-full overflow-hidden rounded-2xl border border-slate-200/80 bg-sand-50
                 shadow-[0_18px_44px_rgba(15,23,42,0.14)]
                 dark:border-white/[0.08] dark:bg-[#16130F] dark:shadow-[0_18px_44px_rgba(0,0,0,0.5)]"
    >
      <div className="flex items-center justify-between gap-3 border-b border-slate-200/70 bg-sand-100/70 px-4 py-3 dark:border-white/[0.06] dark:bg-white/[0.03]">
        <div className="min-w-0">
          <p className="truncate text-[13.5px] font-bold tracking-[-0.01em] text-slate-900 dark:text-white">
            Live buying signals
          </p>
          <p className="truncate text-[12px] text-slate-500 dark:text-slate-400">Your accounts · today</p>
        </div>
        <span className="flex flex-shrink-0 items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-ember-500" />
          <span className="text-[11px] text-slate-500 dark:text-slate-400">4 new</span>
        </span>
      </div>

      <div className="px-2 py-1">
        {LIVE_SIGNALS.map((a, i) => (
          <div
            key={a.name}
            className={`flex items-center gap-3 px-1.5 py-2.5 ${
              i > 0 ? 'border-t border-slate-200/70 dark:border-white/[0.05]' : ''
            }`}
          >
            <span className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-lg border border-slate-200 bg-white p-1.5 dark:border-white/10">
              <img src={a.logo} alt="" aria-hidden="true" className="h-auto w-full object-contain" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-semibold text-slate-900 dark:text-white">{a.name}</p>
              <div className="mt-0.5 flex items-baseline gap-1.5">
                <Zap size={10} className="translate-y-[1px] flex-shrink-0 text-ember-500" strokeWidth={2.6} />
                <span className="min-w-0 truncate text-[11.5px] text-slate-600 dark:text-slate-300">{a.signal}</span>
              </div>
            </div>
            <span className="flex-shrink-0 text-[11px] tabular-nums text-slate-400 dark:text-slate-500">{a.when}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CTA() {
  const { openModal } = useModal();
  const [email, setEmail] = useState('');

  return (
    <section className="border-t border-slate-200 bg-sand-100 px-4 py-20 dark:border-white/[0.06] dark:bg-slate-950 sm:px-6 lg:px-8">
      <div
        className="mx-auto max-w-[1300px] overflow-hidden rounded-2xl border border-slate-200 bg-sand-100
                   shadow-[0_4px_32px_rgba(0,0,0,0.06)]
                   dark:border-white/[0.08] dark:bg-[#0F0E0C] dark:shadow-[0_4px_40px_rgba(0,0,0,0.35)]"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* ── Left: headline + form ─────────────────────────────────────── */}
          <div className="flex flex-col justify-center px-6 py-10 sm:px-10 sm:py-14 lg:px-14">
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ember-500">Get started</p>

            <h2 className="mt-4 font-bricolage text-[clamp(30px,3.5vw,46px)] font-bold leading-[1.06] tracking-[-0.03em] text-slate-900 dark:text-white">
              See it working
              <br />
              <span className="text-ember-500">on your target market</span>
            </h2>

            <p className="mt-4 max-w-[480px] text-[16px] leading-relaxed text-slate-600 dark:text-slate-400">
              A 30-minute call where we pull live signals for the accounts you actually sell to — and
              show you the buying windows you haven&rsquo;t found yet.
            </p>

            <form
              onSubmit={(e) => { e.preventDefault(); openModal('early-access'); }}
              className="mt-8 flex w-full max-w-[470px] flex-col overflow-hidden rounded-xl border border-slate-200 bg-sand-50
                         shadow-sm transition-colors focus-within:border-ember-400
                         dark:border-white/[0.12] dark:bg-white/[0.04] dark:focus-within:border-ember-500/60 sm:flex-row"
            >
              <input
                type="email"
                placeholder="What's your work email?"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="min-w-0 flex-1 border-none bg-transparent px-4 py-3.5 text-[14.5px] text-slate-800 outline-none placeholder:text-slate-400 dark:text-white"
              />
              <button
                type="submit"
                className="m-1 flex flex-shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-lg bg-ember-500 px-5 py-3
                           text-[14px] font-semibold text-white shadow-[0_2px_8px_rgba(201,76,30,0.3)] transition-all duration-200
                           hover:bg-ember-400 hover:shadow-[0_4px_16px_rgba(201,76,30,0.45)]
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-500 focus-visible:ring-offset-2"
              >
                Book a demo
                <ArrowRight size={15} strokeWidth={2.4} />
              </button>
            </form>

            {/* Three specifics beat one line of fine print. */}
            <ul className="mt-6 flex flex-col gap-2.5">
              {PROMISES.map((p) => (
                <li key={p} className="flex items-start gap-2.5">
                  <span className="mt-[3px] grid h-[17px] w-[17px] flex-shrink-0 place-items-center rounded-full bg-ember-50 dark:bg-ember-500/15">
                    <Check size={11} className="text-ember-600 dark:text-ember-300" strokeWidth={3} />
                  </span>
                  <span className="text-[13.5px] leading-[1.5] text-slate-600 dark:text-slate-400">{p}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Right: what the call actually shows you ───────────────────── */}
          <div
            className="relative flex items-center overflow-hidden border-t border-slate-200 bg-sand-200/60 p-6
                       dark:border-white/[0.08] dark:bg-white/[0.02] sm:p-8
                       lg:border-l lg:border-t-0 lg:p-10"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_25%,rgba(201,76,30,0.10),transparent_55%)]"
            />
            {/* Layered: a dimmed card behind for depth, the live feed, then the
                buying-window callout overlapping its lower-left. */}
            <div className="relative w-full pb-8">
              <span
                aria-hidden="true"
                className="absolute -top-4 left-6 right-[-14px] h-full rounded-2xl border border-slate-200/70 bg-sand-50/60
                           dark:border-white/[0.06] dark:bg-white/[0.04]"
              />
              <div className="relative">
                <LiveSignalsCard />
              </div>
              <BuyingWindowCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
