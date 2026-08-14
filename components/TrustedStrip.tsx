'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * TrustedStrip — "flip board".
 *
 * Four logos, no tile chrome, all flipping in unison to reveal the next four.
 * The roster is 10 and the board is 4, so the set that comes back is never the
 * set you just saw and the cycle doesn't land on an obvious loop.
 *
 * Two properties worth keeping if this gets edited:
 *
 *  1. NO DUPLICATES WITHIN A SET. Each turn deals TILES consecutive entries
 *     from a single moving cursor over a 10-long ring. TILES < LOGOS.length
 *     guarantees the four on screen are always distinct — it falls out of the
 *     structure, so there is nothing to check at runtime.
 *  2. NO MID-FLIP FLASH. The board carries two face-sets and rotates 180° per
 *     turn; the set being rewritten is the one about to become visible, and it
 *     stays backface-hidden until the tiles pass edge-on.
 *
 * Lives inside the always-dark hero, so — like Footer.tsx — no `dark:` pairs.
 */

const LOGOS = [
  { src: '/logos/clevertap.svg', name: 'CleverTap', h: 'h-8' },
  { src: '/logos/tazapay.svg', name: 'Tazapay', h: 'h-6' },
  { src: '/logos/vwo.svg', name: 'VWO', h: 'h-7' },
  { src: '/logos/increff.svg', name: 'Increff', h: 'h-7' },
  { src: '/logos/airmeet.svg', name: 'Airmeet', h: 'h-6' },
  { src: '/logos/nurix.svg', name: 'Nurix', h: 'h-6' },
  { src: '/logos/mynd.svg', name: 'Mynd', h: 'h-7' },
  { src: '/logos/venwiz.svg', name: 'Venwiz', h: 'h-7' },
  { src: '/logos/pazo.png', name: 'Pazo', h: 'h-8' },
  { src: '/logos/cometchat.png', name: 'CometChat', h: 'h-8' },
];

const TILES = 5;      // must stay < LOGOS.length — see note 1 above
const HOLD_MS = 3400; // time a set rests before the board turns

/**
 * How far the cursor walks per turn. NOT simply TILES: with 5 tiles over a
 * 10-logo ring, a stride of 5 partitions the roster into exactly two halves
 * and the board just toggles [0-4] ↔ [5-9] forever — every tile alternating
 * between the same two marks. A stride of 6 walks the window to 5 distinct
 * board states (starts 0,6,2,8,4) before repeating, and no tile ever lands on
 * the logo it was already showing.
 */
const DEAL = TILES + 1;

function Face({ logo, back }: { logo: (typeof LOGOS)[number]; back?: boolean }) {
  return (
    <span
      className="absolute inset-0 grid place-items-center [backface-visibility:hidden]"
      style={back ? { transform: 'rotateX(180deg)' } : undefined}
    >
      <img
        src={logo.src}
        alt=""
        loading="lazy"
        className={`${logo.h} w-auto object-contain opacity-60 brightness-0 invert`}
      />
    </span>
  );
}

function Star() {
  return (
    <svg viewBox="0 0 20 20" className="h-[15px] w-[15px]" fill="#F6A11E" aria-hidden="true">
      <path d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.51L10 14.9l-4.94 2.6.94-5.5-4-3.9 5.53-.8L10 1.5z" />
    </svg>
  );
}

const setFrom = (start: number) =>
  Array.from({ length: TILES }, (_, k) => (start + k) % LOGOS.length);

export default function TrustedStrip() {
  const [board, setBoard] = useState({ step: 0, a: setFrom(0), b: setFrom(DEAL) });
  const cursor = useRef(DEAL);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | undefined;

    const turn = () => {
      // advance the cursor OUTSIDE the updater — StrictMode runs updaters
      // twice in dev and would otherwise deal two sets per turn
      const start = cursor.current;
      cursor.current = (start + DEAL) % LOGOS.length;
      const next = setFrom(start);

      setBoard((prev) => {
        const showingA = prev.step % 2 === 0;
        return {
          step: prev.step + 1,
          a: showingA ? prev.a : next,
          b: showingA ? next : prev.b,
        };
      });
    };

    const stop = () => {
      if (timer) clearInterval(timer);
      timer = undefined;
    };
    const play = () => {
      stop();
      timer = setInterval(turn, HOLD_MS);
    };

    /**
     * Pause while the tab is hidden.
     *
     * `step` only ever grows, and the tiles render `rotateX(step * 180deg)`.
     * A hidden tab stops painting but keeps running the (throttled) timer, so
     * a board left in the background piles up hundreds of degrees of unpainted
     * rotation. The moment the tab is shown again, one transition unwinds the
     * whole backlog at once and the board appears to spin.
     *
     * Not advancing while hidden means there is no backlog to unwind: the
     * board is exactly where it was left, and resumes at its normal cadence.
     */
    const onVisibility = () => (document.hidden ? stop() : play());

    if (!document.hidden) play();
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      stop();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <div className="relative pb-8 pt-6">
      <p className="text-center text-[11.5px] font-semibold uppercase tracking-[0.2em] text-white/40">
        Trusted by revenue teams at
      </p>

      <div className="relative mx-auto mt-6 max-w-[860px]">
        {/* ember bed under the board */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[150px] w-[600px] -translate-x-1/2 -translate-y-1/2
                     bg-[radial-gradient(50%_60%_at_50%_50%,rgba(242,132,28,0.13),transparent_72%)]"
        />

        {/* Decorative motion; the full roster is listed statically below so a
            flip never re-announces anything to a screen reader. */}
        {/* flex-wrap rather than a grid: five items over three columns leaves a
            trailing row of two on mobile, and wrap centres it where a grid
            would strand it on the left. */}
        <div
          aria-hidden="true"
          className="relative flex flex-wrap items-center justify-center gap-x-6 gap-y-6 [perspective:1200px] sm:flex-nowrap sm:gap-x-10"
        >
          {Array.from({ length: TILES }, (_, i) => (
            <div
              key={i}
              className="relative h-[64px] w-[26%] transition-transform duration-[1200ms] ease-[cubic-bezier(0.62,0,0.34,1)] [transform-style:preserve-3d] sm:w-auto sm:flex-1"
              style={{ transform: `rotateX(${board.step * 180}deg)` }}
            >
              <Face logo={LOGOS[board.a[i]]} />
              <Face logo={LOGOS[board.b[i]]} back />
            </div>
          ))}
        </div>

        <ul className="sr-only">
          {LOGOS.map((l) => (
            <li key={l.name}>{l.name}</li>
          ))}
        </ul>
      </div>

      <div className="mt-7 flex items-center justify-center gap-3.5">
        <span className="flex items-center gap-0.5"><Star /><Star /><Star /><Star /><Star /></span>
        <span className="text-[14px] leading-none">
          <span className="font-bold text-white">4.7</span>
          <span className="text-white/40">/5</span>
        </span>
        <span aria-hidden="true" className="h-3.5 w-px bg-white/15" />
        <span className="text-[13px] font-medium">
          <span className="text-white/55">Trusted by</span>{' '}
          <span className="font-bold text-[#F2841C]">growing</span>{' '}
          <span className="text-white/55">revenue teams</span>
        </span>
      </div>
    </div>
  );
}
