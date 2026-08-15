'use client';

import { useEffect, useState } from 'react';

/**
 * The quote is the hero; the portraits are the navigation.
 *
 * Different structure from a portrait-beside-quote carousel: the words run
 * large and centred, and the five faces sit beneath as a selectable filmstrip —
 * the active one enlarges and rings in ember. That does three jobs with one
 * element (shows who is speaking, shows how many there are, and lets you jump
 * straight to any of them), which is why the prev/next arrows are gone.
 *
 * The quote still slides VERTICALLY on change. Its slide height must clear the
 * LONGEST quote at the largest type size, or the overflow-hidden crops it.
 *
 * CONTENT IS REAL — quotes, names and titles carried over verbatim from
 * thyleads-project (app/casestudies/*, components/Testimonial). Two notes:
 *
 *  1. The quotes say "Thyleads", not "Harvin". They are attributed statements
 *     from named people, so they are reproduced word for word. Renaming the
 *     company inside someone's quote would falsify it.
 *  2. Companies show as logos, not names. MYND ships only a light-grey mark
 *     built for dark grounds, so /logos/mynd-dark.svg is a darkened copy. Dice
 *     has no logo asset — it falls back to its name in text, which is the only
 *     reason `org` is still carried on every entry.
 */
const TESTIMONIALS = [
  {
    quote:
      'Thyleads brought a level of precision to our outbound that complemented our in-house SDR team well. Their signal-driven approach ensured we were reaching the right accounts at the right time, and some accounts they sourced now sit among our top revenue contributors.',
    name: 'Deepak Lamba',
    role: 'Chief Revenue Officer',
    org: 'CleverTap',
    logo: '/logos/clevertap.svg',
    image: '/testimonials/deepak-lamba.jpg',
  },
  {
    quote:
      'In over a decade in Strategy & Marketing I have worked with several lead agencies across a wide spectrum of price points. Thyleads has outperformed them all in value for money, specifically on SaaS lead generation and connecting with relevant key decision makers.',
    name: 'Argha Karmakar',
    role: 'General Manager — Marketing',
    org: 'MYND',
    logo: '/logos/mynd-dark.svg',
    image: '/testimonials/argha-karmakar.jpg',
  },
  {
    quote:
      'Working with Thyleads has significantly boosted our outbound efforts at Wingify. Their speed and ability to deliver qualified meetings from month one, even with minimal product training, were impressive.',
    name: 'Harsh Sharma',
    role: 'Senior Manager',
    org: 'VWO',
    logo: '/logos/vwo.svg',
    image: '/testimonials/vwo.png',
  },
  {
    quote:
      'We always believed outbound could work, but lacked a structured approach. Thyleads changed that by building a repeatable system that delivers high-value meetings. Now we are having quality conversations with the right people with real buying intent.',
    name: 'Nitin Ravi',
    role: 'Head of Global Sales',
    org: 'Pazo',
    logo: '/logos/pazo.png',
    image: '/testimonials/pazo.png',
  },
  {
    quote:
      'Thyleads gets highly sales-qualified leads within the provided target regions from the very first month of our partnership. Their working style, culture, and ethics are highly commendable.',
    name: 'Ishan Acharya',
    role: 'Director of Business Operations',
    org: 'Dice',
    logo: null,
    image: '/testimonials/dice.png',
  },
];

/** Must clear the longest quote at the largest type size. */
const QUOTE_H = 260;
/** Long enough to read a ~40-word quote, short enough that the section
 *  never feels stalled. Drives both the timer and the progress bar. */
const AUTO_MS = 4200;

const styles = `
  @keyframes tsFill { from { transform: scaleX(0); } to { transform: scaleX(1); } }
  @keyframes tsRise { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
  @media (prefers-reduced-motion: reduce) { .ts-rise { animation: none !important; } }
`;

export default function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);   // pointer or focus is inside
  const [hidden, setHidden] = useState(false);   // tab is in the background
  const [reduced, setReduced] = useState(false); // prefers-reduced-motion

  useEffect(() => {
    const onVis = () => setHidden(document.hidden);
    document.addEventListener('visibilitychange', onVis);
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => {
      document.removeEventListener('visibilitychange', onVis);
      mq.removeEventListener('change', sync);
    };
  }, []);

  const running = !paused && !hidden && !reduced;

  /**
   * Keyed on `i`, so every change — auto OR manual — restarts the clock. That
   * is what lets picking a face pause the rotation without killing it: you get
   * a full interval to read before it moves on. Previously a click set autoplay
   * false for good, so the section never advanced again.
   */
  useEffect(() => {
    if (!running) return;
    const t = setTimeout(() => setI((v) => (v + 1) % TESTIMONIALS.length), AUTO_MS);
    return () => clearTimeout(t);
  }, [i, running]);

  const active = TESTIMONIALS[i];

  return (
    <section
      className="sticky top-0 z-0 flex min-h-screen items-center overflow-hidden border-t border-slate-200
                 bg-sand-100 py-20 dark:border-white/[0.06] dark:bg-[#040404] lg:py-24"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <style>{styles}</style>
      <svg width="0" height="0" aria-hidden="true" className="absolute">
        <defs>
          <linearGradient id="tsQuote" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#F48E56" />
            <stop offset="1" stopColor="#C94C1E" stopOpacity="0.4" />
          </linearGradient>
        </defs>
      </svg>

      {/* one warm wash behind the words */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[1000px] -translate-x-1/2 -translate-y-1/2
                   bg-[radial-gradient(50%_50%_at_50%_50%,rgba(201,76,30,0.09),transparent_70%)]"
      />

      <div className="relative mx-auto w-full max-w-[1000px] px-6 text-center">
        <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ember-500">What teams say</p>


        {/* ── The quote, running large ─────────────────────────────────── */}
        <div className="mt-9 overflow-hidden" style={{ height: QUOTE_H }}>
          <div
            className="transition-transform duration-[750ms] ease-[cubic-bezier(0.33,1,0.68,1)]"
            style={{ transform: `translateY(${-i * QUOTE_H}px)` }}
          >
            {TESTIMONIALS.map((t) => (
              <div key={t.quote} className="flex items-center justify-center" style={{ height: QUOTE_H }}>
                <p className="mx-auto max-w-[880px] text-[clamp(20px,2.6vw,33px)] font-medium leading-[1.4] tracking-[-0.02em] text-slate-900 dark:text-white">
                  {/* inline, so it sits against the first word instead of
                      floating in its own band above the quote */}
                  <svg
                    viewBox="0 0 60 40"
                    className="mr-2.5 inline-block h-[0.72em] w-auto align-[0.06em]"
                    aria-hidden="true"
                  >
                    <path
                      fill="url(#tsQuote)"
                      d="M0 40V22.4C0 10 7.6 2 20 0l2.2 6.1c-6.6 1.8-10.4 5.8-10.4 11.4H21V40H0zm33 0V22.4C33 10 40.6 2 53 0l2.2 6.1c-6.6 1.8-10.4 5.8-10.4 11.4H54V40H33z"
                    />
                  </svg>
                  {t.quote}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Attribution — name, role, mark. No company name in text. ──── */}
        <div
          key={i}
          className="ts-rise mt-8 flex flex-col items-center gap-3"
          style={{ animation: 'tsRise 0.6s ease-out both' }}
        >
          <p className="text-[17px] font-semibold tracking-[-0.01em] text-slate-900 dark:text-white">{active.name}</p>
          <div className="flex items-center gap-3">
            <span className="text-[13.5px] text-slate-500 dark:text-slate-400">{active.role}</span>
            <span aria-hidden="true" className="h-3.5 w-px bg-slate-300 dark:bg-white/20" />
            {active.logo ? (
              <img src={active.logo} alt={active.org} className="h-[26px] w-auto object-contain" />
            ) : (
              <span className="text-[13.5px] font-semibold text-slate-700 dark:text-slate-300">{active.org}</span>
            )}
          </div>
        </div>

        {/* ── Filmstrip: who, how many, and the picker — all in one row ─── */}
        <div className="mt-10 flex items-end justify-center gap-3 sm:gap-4">
          {TESTIMONIALS.map((t, n) => {
            const on = n === i;
            return (
              <button
                key={t.image}
                type="button"
                onClick={() => setI(n)}
                aria-label={`${t.name}, ${t.role}`}
                aria-current={on}
                className={`relative overflow-hidden rounded-2xl transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)]
                            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-500 focus-visible:ring-offset-2 ${
                              on
                                ? 'h-[86px] w-[86px] shadow-[0_14px_30px_rgba(201,76,30,0.28)] ring-2 ring-ember-500'
                                : 'h-[60px] w-[60px] opacity-45 grayscale hover:opacity-80 hover:grayscale-0'
                            }`}
              >
                <img src={t.image} alt="" aria-hidden="true" className="h-full w-full object-cover" />
                {on && running && (
                  <span
                    key={i}
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-[3px] origin-left bg-ember-500"
                    style={{ animation: `tsFill ${AUTO_MS}ms linear both` }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
