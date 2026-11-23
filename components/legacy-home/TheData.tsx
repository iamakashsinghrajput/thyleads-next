'use client';

import { useEffect, useRef, useState } from 'react';
import { Check } from 'lucide-react';

/**
 * Onboarding timeline — what actually happens in a client's first month.
 *
 * Scroll-driven: the section is pinned while the rail fills, phases activate in
 * turn and the sending-volume chart builds left to right. One scroll position
 * drives all three, so they can never disagree.
 *
 * The week labels live in PHASES and nowhere else — adjust them there.
 */

type Phase = {
  week: string;
  title: string;
  desc: string;
};

const PHASES: Phase[] = [
  {
    week: 'Week 1',
    title: 'Domains & mailboxes',
    desc: 'We procure dedicated sending domains and mailboxes for you and configure SPF, DKIM and DMARC, so every message is authenticated before a single email goes out.',
  },
  {
    week: 'Week 2',
    title: 'Inbox warm-up',
    desc: 'Sending volume ramps gradually to build sender reputation. This is the step that keeps you out of the spam folder — and stops recipients marking you as spam once real campaigns start.',
  },
  {
    week: 'Week 3',
    title: 'Campaigns live',
    desc: 'Intelligence-led sequences go out to accounts showing real buying signals — the right personas, the right angle, and the right week to reach them.',
  },
  {
    week: 'Week 4+',
    title: 'Meetings booked',
    desc: 'Qualified meetings start landing in your calendar. Harvin keeps sourcing, scoring and sequencing in the background so the pipeline keeps compounding.',
  },
];

/**
 * Daily sending volume, as a % of full throughput — the shape IS the argument.
 * Flat through setup, a deliberately slow climb through warm-up, then real
 * volume only once reputation is built. Five bars per phase.
 */
const VOLUME = [
  2, 3, 4, 5, 6,
  11, 17, 24, 32, 41,
  54, 61, 67, 72, 77,
  84, 88, 92, 95, 98,
];
const BARS_PER_PHASE = VOLUME.length / PHASES.length;

export default function TheData() {
  const containerRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      if (scrollable <= 0) {
        setProgress(0);
        return;
      }
      setProgress(Math.min(Math.max(-rect.top, 0), scrollable) / scrollable);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const active = Math.min(PHASES.length - 1, Math.floor(progress * PHASES.length));
  const current = PHASES[active];
  const revealed = progress * VOLUME.length;

  return (
    <section
      ref={containerRef}
      className="relative border-t border-slate-200 bg-sand-100 dark:border-white/[0.06] dark:bg-[#040404]"
      style={{ height: '300vh' }}
    >
      <div className="sticky top-[64px] flex h-[calc(100vh-64px)] flex-col justify-center overflow-hidden px-4 py-8 sm:px-6 md:px-10 lg:px-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_24%,rgba(201,76,30,0.07),transparent_45%)] dark:bg-[radial-gradient(circle_at_18%_24%,rgba(201,76,30,0.14),transparent_45%)]" />

        <div className="relative mx-auto w-full max-w-[1240px]">
          {/* ── Header ──────────────────────────────────────────────────── */}
          <div className="max-w-[720px]">
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ember-500">Onboarding</p>
            <h2 className="mt-3 text-[clamp(26px,3.4vw,44px)] font-semibold leading-[1.06] tracking-[-0.025em] text-slate-900 dark:text-white">
              Live in three weeks.<br className="hidden sm:block" /> Meetings from week four.
            </h2>
            <p className="mt-4 max-w-[620px] text-[15px] leading-relaxed text-slate-600 dark:text-white/45 sm:text-[17px]">
              We handle the unglamorous part — domains, mailboxes and deliverability — so your first
              campaign lands in the inbox instead of the spam folder.
            </p>
          </div>

          {/* ── Timeline rail ───────────────────────────────────────────── */}
          <div className="relative mt-10 sm:mt-14">
            {/* track + fill, threaded behind the nodes */}
            <div
              aria-hidden="true"
              className="absolute left-0 right-0 top-[11px] hidden h-px bg-slate-300 dark:bg-white/[0.12] sm:block"
            />
            <div
              aria-hidden="true"
              className="absolute left-0 top-[11px] hidden h-px bg-ember-500 transition-[width] duration-150 ease-out sm:block"
              style={{ width: `${progress * 100}%` }}
            />

            <ol className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 sm:gap-x-6">
              {PHASES.map((p, i) => {
                const done = i < active;
                const isCurrent = i === active;
                return (
                  <li key={p.week} className="relative">
                    <span
                      aria-hidden="true"
                      className={[
                        'relative z-10 mb-4 hidden h-[23px] w-[23px] place-items-center rounded-full border-2 transition-colors duration-300 sm:grid',
                        done || isCurrent
                          ? 'border-ember-500 bg-ember-500 text-white'
                          : 'border-slate-300 bg-sand-100 text-transparent dark:border-white/20 dark:bg-[#040404]',
                      ].join(' ')}
                    >
                      {done ? <Check size={13} strokeWidth={3} /> : <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                    </span>

                    <p
                      className={`font-mono text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors duration-300 ${
                        isCurrent ? 'text-ember-500' : 'text-slate-400 dark:text-white/35'
                      }`}
                    >
                      {p.week}
                    </p>
                    <p
                      className={`mt-1.5 text-[15px] font-semibold leading-[1.3] tracking-[-0.01em] transition-colors duration-300 sm:text-[17px] ${
                        isCurrent || done ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-white/35'
                      }`}
                    >
                      {p.title}
                    </p>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* ── Detail + volume chart ───────────────────────────────────── */}
          <div
            className="mt-10 grid gap-6 rounded-[18px] border border-slate-200 bg-sand-50 p-5 shadow-[0_12px_40px_rgba(0,0,0,0.05)]
                       dark:border-white/[0.08] dark:bg-white/[0.02] dark:shadow-[0_12px_40px_rgba(0,0,0,0.35)]
                       sm:mt-12 sm:rounded-[24px] sm:p-7 md:grid-cols-2 md:items-center md:gap-10"
          >
            <div key={active} className="min-w-0">
              <p className="text-[13px] font-semibold text-ember-500">{current.week}</p>
              <h3 className="mt-1.5 text-[20px] font-semibold leading-[1.2] tracking-[-0.015em] text-slate-900 dark:text-white sm:text-[24px]">
                {current.title}
              </h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-slate-600 dark:text-white/50 sm:text-[15.5px]">
                {current.desc}
              </p>
            </div>

            {/* Sending volume — flat, then a slow warm-up climb, then real
                throughput. Bars fill in as the reader scrolls. */}
            <div className="min-w-0">
              <div className="flex items-baseline justify-between">
                <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-slate-400 dark:text-white/35">
                  Daily sending volume
                </p>
                <p className="font-mono text-[11px] tabular-nums text-slate-400 dark:text-white/35">
                  {Math.round(Math.min(100, (revealed / VOLUME.length) * 100))}%
                </p>
              </div>

              <div className="mt-3 flex h-[120px] items-end gap-[3px] sm:h-[150px] sm:gap-1">
                {VOLUME.map((v, i) => {
                  // leading bar grows partially, so the chart builds smoothly
                  const fill = Math.min(1, Math.max(0, revealed - i));
                  const inPhase = Math.floor(i / BARS_PER_PHASE) === active;
                  return (
                    <span
                      key={i}
                      className={`flex-1 rounded-t-[2px] transition-colors duration-300 ${
                        inPhase ? 'bg-ember-500' : 'bg-sand-300 dark:bg-white/[0.13]'
                      }`}
                      style={{ height: `${v * fill}%` }}
                    />
                  );
                })}
              </div>

              <div
                aria-hidden="true"
                className="mt-2 grid grid-cols-4 gap-[3px] border-t border-slate-200 pt-2 dark:border-white/[0.08] sm:gap-1"
              >
                {PHASES.map((p, i) => (
                  <span
                    key={p.week}
                    className={`text-center font-mono text-[9.5px] uppercase tracking-[0.1em] transition-colors duration-300 ${
                      i === active ? 'text-ember-500' : 'text-slate-400 dark:text-white/30'
                    }`}
                  >
                    {p.week}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
