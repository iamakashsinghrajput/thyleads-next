'use client';

import { useEffect, useRef, useState } from 'react';
import { startFreeHref } from '@/lib/site';
import { FREE_CREDITS } from '@/lib/pricing';
import TrustedStrip from '@/components/TrustedStrip';

/**
 * Homepage hero, per the Harvin AI brand guidelines (12 Nov 2026):
 * black canvas, a Newsreader headline, one "Start free" button, and the paper
 * record as the hero — "a file card on a dark desk". No photograph.
 *
 * The record tells the brand idea in one loop: the database label is struck
 * (grey = missed/wrong), Harvin's findings appear with ember marks, and the
 * Company Fit numeral counts up while the card's border turns ember
 * (ember = found/right). The loop starts and ends on the complete graphic,
 * and holds it under prefers-reduced-motion.
 *
 * Copy: "Harvin Home Page Content .md". Company and figures in the record are
 * an illustrative example.
 */

const FACTS = ['Bills customers in 18 countries', 'Recurring foreign-currency payments', 'Uses Stripe'];

/* Phases of the loop: 0 plain record → 1 label struck → 2–4 facts appear → 5 fit lands (complete). */
const PHASE_MS = [900, 1100, 700, 700, 1200, 5200];
const COMPLETE = PHASE_MS.length - 1;

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function useRecordLoop() {
  // Server render and reduced motion both show the complete graphic.
  const [phase, setPhase] = useState(COMPLETE);
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => setPhase((p) => (p + 1) % PHASE_MS.length), PHASE_MS[phase]);
    return () => clearTimeout(t);
  }, [phase, visible]);

  return [ref, phase] as const;
}

function FitNumber({ run, to }: { run: boolean; to: number }) {
  const [n, setN] = useState(to);
  useEffect(() => {
    if (!run || prefersReducedMotion()) {
      setN(to);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / 900, 1);
      setN(Math.round(to * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    setN(0);
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, to]);
  return <span className="tabular-nums">{n}</span>;
}

/** The paper record: one company, looked at properly. */
function PaperRecord() {
  const [ref, phase] = useRecordLoop();
  const struck = phase >= 1;
  const done = phase === COMPLETE;

  return (
    <div
      ref={ref}
      role="img"
      aria-label="Illustrative company record: a database files Northstar Software under Software; Harvin AI finds it bills customers in 18 countries, has recurring foreign-currency payments and uses Stripe, and scores its Company Fit at 91."
    >
      <div
        aria-hidden="true"
        className={[
          'rounded-card border-2 bg-paper px-[30px] pb-[26px] pt-[30px] text-slate-950 transition-colors duration-700',
          done ? 'border-ember-500' : 'border-paper',
        ].join(' ')}
      >
        <div className="flex items-baseline justify-between gap-4">
          <p className="text-[14px] font-medium text-stone-dark">Company record</p>
          <p className="text-[14px] text-stone-dark">Illustrative example</p>
        </div>
        <p className="mt-3 font-display text-[clamp(30px,3vw,40px)] font-medium leading-[1.05]">Northstar Software</p>

        {/* How a database files it: the label tag, struck */}
        <div className="mt-5 flex flex-wrap items-center gap-3 border-b border-paper-rule pb-5">
          <span className="text-[14px] font-medium text-stone-dark">Listed in databases as</span>
          {/* label tag; the strike draws across it */}
          <span className="relative inline-flex items-center rounded-[7px] border border-paper-rule px-[11px] pb-2 pt-[7px] text-[14px] font-semibold leading-none text-stone-dark">
            Software
            <span
              className={`absolute left-2 right-2 top-1/2 h-[2px] origin-left bg-grey transition-transform duration-500 ease-out ${struck ? 'scale-x-100' : 'scale-x-0'}`}
            />
          </span>
        </div>

        {/* What Harvin AI found: ruled rows with ember marks */}
        <p className="mt-5 text-[14px] font-medium text-stone-dark">What the business actually does</p>
        <ul className="mt-2 divide-y divide-paper-rule border-b border-paper-rule">
          {FACTS.map((f, i) => {
            const shown = phase >= 2 + i;
            return (
              <li
                key={f}
                className={`flex items-center gap-3 py-3 text-[18px] font-medium text-slate-950 transition-opacity duration-500 ${shown ? 'opacity-100' : 'opacity-0'}`}
              >
                <span className="h-[9px] w-[9px] shrink-0 rounded-full bg-ember-500" />
                {f}
              </li>
            );
          })}
        </ul>

        <div className="mt-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-[14px] text-stone-dark">Company Fit</p>
            <p className="mt-1 text-[15px] text-slate-600">Matches the customers who converted</p>
          </div>
          <p
            className={`font-display text-[clamp(72px,8vw,110px)] font-medium leading-[0.85] text-ember-500 transition-opacity duration-500 ${phase >= 5 ? 'opacity-100' : 'opacity-0'}`}
          >
            <FitNumber run={phase === COMPLETE} to={91} />
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="hero" className="relative border-b border-rule bg-slate-950 px-6 pb-10 pt-32 text-white lg:pt-40">
      <div className="mx-auto grid max-w-[1200px] items-center gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-16">
        <div className="motion-safe:animate-fade-up">
          <p className="text-[15px] text-slate-400">B2B company discovery &amp; research</p>
          <h1 className="mt-5 max-w-[13ch] font-display text-[clamp(44px,6.2vw,80px)] font-medium leading-[1.02] text-white">
            Find companies traditional database searches <em className="text-ember-400">miss.</em>
          </h1>
          <p className="mt-7 max-w-[34em] text-[19px] leading-[1.5] text-slate-300">
            Tell Harvin what you sell, who buys and what makes a company relevant to your business.
          </p>
          <p className="mt-3 max-w-[34em] text-[19px] leading-[1.5] text-slate-300">
            Harvin uses that context to discover and research companies and then finds the right decision-makers inside them.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-[22px] gap-y-3.5">
            <a
              href={startFreeHref()}
              className="inline-flex min-h-[52px] items-center justify-center rounded-[10px] bg-ember-500 px-7 text-[17px] font-semibold text-pure transition-colors hover:bg-ember-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              Start free
            </a>
            <span className="text-[16px] text-stone">{FREE_CREDITS} free credits. No card.</span>
          </div>
          <p className="mt-5 text-[15px] text-slate-400">
            Already have a target list?{' '}
            <a href="#your-list" className="text-slate-300 underline decoration-rule underline-offset-4 hover:text-white">
              Upload it
            </a>{' '}
            and see what Harvin finds beyond it.
          </p>
        </div>

        <PaperRecord />
      </div>

      <div className="mx-auto mt-16 max-w-[1200px] border-t border-rule">
        <TrustedStrip />
      </div>
    </section>
  );
}
