'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const styles = `
  @keyframes tsFill { from { transform: scaleX(0); } to { transform: scaleX(1); } }
  @keyframes tsRise { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
  .ts-rise { animation: tsRise 0.5s ease-out both; }
  @media (prefers-reduced-motion: reduce) { .ts-rise { animation: none; } }
`;

/**
 * Testimonials as a shuffling deck: the quotes are a physical stack of cards,
 * and advancing sends the front card to the back.
 *
 * Not a sliding track. A track moves everything sideways and the quotes read as
 * a list you are being dragged along; a deck keeps ONE quote at full attention
 * while the cards behind it show, honestly, how many are left. The stack is the
 * progress indicator — which is why it sits at three visible cards rather than
 * five: past three the fan stops reading as depth and starts reading as clutter.
 *
 * HOW THE STACK WORKS. Every card computes its offset from the active index,
 * wrapped, and maps that to one transform: down, right, smaller, rotated. Depth
 * is therefore a pure function of `offset`, so the deck can never get into a
 * state where two cards claim the same position — which is the usual failure of
 * hand-managed carousel stacks.
 *
 * The left column stays put and swaps its contents, so the eye has a fixed
 * place to read the speaker while the deck moves.
 *
 * CONTENT IS REAL — quotes, names and titles carried over from thyleads-project
 * (app/casestudies/*, components/Testimonial). Two notes:
 *
 *  1. The quotes were given when the company traded as Thyleads. The company
 *     name — and only the company name — has been updated to Harvin, which is
 *     the usual convention after a rebrand. Every other word is the speaker's,
 *     reproduced verbatim. Do not edit anything else in a quote.
 *  2. Companies show as logos, not names. MYND ships only a light-grey mark
 *     built for dark grounds, so /logos/mynd-dark.svg is a darkened copy. Dice
 *     has no logo asset — it falls back to its name in text, which is the only
 *     reason `org` is still carried on every entry.
 */
const TESTIMONIALS = [
  {
    quote:
      'Harvin brought a level of precision to our outbound that complemented our in-house SDR team well. Their signal-driven approach ensured we were reaching the right accounts at the right time, and some accounts they sourced now sit among our top revenue contributors.',
    name: 'Deepak Lamba',
    role: 'Chief Revenue Officer',
    org: 'CleverTap',
    logo: '/logos/clevertap.svg',
    image: '/testimonials/deepak-lamba.jpg',
  },
  {
    quote:
      'In over a decade in Strategy & Marketing I have worked with several lead agencies across a wide spectrum of price points. Harvin has outperformed them all in value for money, specifically on SaaS lead generation and connecting with relevant key decision makers.',
    name: 'Argha Karmakar',
    role: 'General Manager — Marketing',
    org: 'MYND',
    logo: '/logos/mynd-dark.svg',
    image: '/testimonials/argha-karmakar.jpg',
  },
  {
    quote:
      'Working with Harvin has significantly boosted our outbound efforts at Wingify. Their speed and ability to deliver qualified meetings from month one, even with minimal product training, were impressive.',
    name: 'Harsh Sharma',
    role: 'Senior Manager',
    org: 'VWO',
    logo: '/logos/vwo.svg',
    image: '/testimonials/vwo.png',
  },
  {
    quote:
      'We always believed outbound could work, but lacked a structured approach. Harvin changed that by building a repeatable system that delivers high-value meetings. Now we are having quality conversations with the right people with real buying intent.',
    name: 'Nitin Ravi',
    role: 'Head of Global Sales',
    org: 'Pazo',
    logo: '/logos/pazo.png',
    image: '/testimonials/pazo.png',
  },
  {
    quote:
      'Harvin gets highly sales-qualified leads within the provided target regions from the very first month of our partnership. Their working style, culture, and ethics are highly commendable.',
    name: 'Ishan Acharya',
    role: 'Director of Business Operations',
    org: 'Dice',
    logo: null,
    image: '/testimonials/dice.png',
  },
];

/** Cards visible in the fan, including the front one. */
const DEPTH = 3;
/** Sets the deck's height — see the spacer note in the markup below. */
const LONGEST = TESTIMONIALS.reduce((a, b) => (b.quote.length > a.quote.length ? b : a));
/** Long enough to read a 40-word quote before the deck moves on. */
const AUTO_MS = 5600;

export default function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const n = TESTIMONIALS.length;

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (paused || reduced) return;
    const t = setTimeout(() => setI((v) => (v + 1) % n), AUTO_MS);
    return () => clearTimeout(t);
  }, [i, paused, reduced, n]);

  const active = TESTIMONIALS[i];

  return (
    <section
      className="border-t border-slate-200 bg-sand-100 px-4 py-20 dark:border-white/[0.06] dark:bg-[#040404] sm:px-6 lg:px-8 lg:py-24"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <style>{styles}</style>

      <div className="mx-auto grid max-w-[1180px] items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        {/* ── Fixed column: heading, speaker, controls ─────────────────── */}
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ember-500">What teams say</p>
          <h2 className="mt-4 text-[clamp(27px,3.2vw,42px)] font-semibold leading-[1.09] tracking-[-0.025em] text-slate-900 dark:text-white">
            Revenue leaders who run outbound on Harvin
          </h2>

          {/* the speaker changes, the slot does not — a fixed place to read
              who is talking while the deck behind it moves */}
          <div key={active.name} className="ts-rise mt-9 flex items-center gap-4">
            <img src={active.image} alt="" aria-hidden="true" className="h-14 w-14 flex-shrink-0 rounded-full object-cover" />
            <div className="min-w-0">
              <p className="truncate text-[17px] font-bold tracking-[-0.01em] text-slate-900 dark:text-white">
                {active.name}
              </p>
              <p className="truncate text-[13.5px] text-slate-500 dark:text-slate-400">{active.role}</p>
            </div>
            <span aria-hidden="true" className="h-9 w-px flex-shrink-0 bg-slate-200 dark:bg-white/[0.12]" />
            {active.logo ? (
              <img src={active.logo} alt={active.org} className="h-7 w-auto flex-shrink-0 object-contain" />
            ) : (
              <span className="flex-shrink-0 text-[15px] font-bold text-slate-700 dark:text-slate-200">{active.org}</span>
            )}
          </div>

          <div className="mt-10 flex items-center gap-5">
            <div className="flex items-center gap-2">
              {([['Previous', -1, ChevronLeft], ['Next', 1, ChevronRight]] as const).map(([label, dir, Icon]) => (
                <button
                  key={label}
                  type="button"
                  aria-label={`${label} testimonial`}
                  onClick={() => setI((v) => (v + dir + n) % n)}
                  className="grid h-11 w-11 place-items-center rounded-full border border-slate-300 text-slate-700 transition-colors hover:border-ember-500 hover:text-ember-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-500 dark:border-white/15 dark:text-slate-300"
                >
                  <Icon size={18} strokeWidth={2.2} />
                </button>
              ))}
            </div>

            <p className="font-mono text-[13px] tabular-nums text-slate-400 dark:text-slate-500">
              <span className="font-bold text-slate-900 dark:text-white">{String(i + 1).padStart(2, '0')}</span>
              {' / '}
              {String(n).padStart(2, '0')}
            </p>

            {/* restarts on every change because it is keyed on the index */}
            <span className="h-[3px] min-w-0 flex-1 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
              {!paused && !reduced && (
                <span
                  key={i}
                  className="block h-full origin-left rounded-full bg-ember-500"
                  style={{ animation: `tsFill ${AUTO_MS}ms linear both` }}
                />
              )}
            </span>
          </div>
        </div>

        {/* ── The deck ─────────────────────────────────────────────────── */}
        <div className="relative">
          {/* An invisible copy of the LONGEST quote, left in normal flow, is
              what gives the deck its height — every real card is absolutely
              positioned and so contributes nothing. A fixed height instead
              would be a guess: too small and the longest quote overflows, too
              large and every shorter one sits in a pool of dead space. This
              way the deck is always exactly as tall as it needs to be, and a
              longer quote added later just works. */}
          <figure aria-hidden="true" className="invisible flex flex-col p-6 sm:p-8">
            <span className="mb-5 block h-6" />
            <blockquote className="text-[clamp(16px,1.5vw,19px)] leading-[1.6]">{LONGEST.quote}</blockquote>
          </figure>

          {TESTIMONIALS.map((t, idx) => {
            const offset = (idx - i + n) % n;
            const shown = offset < DEPTH;
            return (
              <figure
                key={t.name}
                aria-hidden={offset !== 0}
                className="absolute inset-0 flex flex-col justify-center rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_18px_44px_rgba(15,23,42,0.10)] transition-all duration-[650ms] ease-[cubic-bezier(0.33,1,0.68,1)] dark:border-white/[0.10] dark:bg-[#16130F] dark:shadow-[0_18px_44px_rgba(0,0,0,0.5)] sm:p-8"
                style={{
                  zIndex: DEPTH - offset,
                  opacity: shown ? 1 : 0,
                  transform: `translate3d(${offset * 26}px, ${offset * 18}px, 0) scale(${1 - offset * 0.05}) rotate(${offset * 1.4}deg)`,
                  pointerEvents: offset === 0 ? 'auto' : 'none',
                }}
              >
                <svg viewBox="0 0 60 40" className="mb-5 h-6 w-auto flex-shrink-0" aria-hidden="true">
                  <path
                    fill="#E56B2C"
                    d="M0 40V22.4C0 10 7.6 2 20 0l2.2 6.1c-6.6 1.8-10.4 5.8-10.4 11.4H21V40H0zm33 0V22.4C33 10 40.6 2 53 0l2.2 6.1c-6.6 1.8-10.4 5.8-10.4 11.4H54V40H33z"
                  />
                </svg>
                <blockquote className="text-[clamp(16px,1.5vw,19px)] leading-[1.6] text-slate-700 dark:text-slate-200">
                  {t.quote}
                </blockquote>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
