'use client';

import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useModal } from '@/components/ModalContext';
import DbPromptFunnel from './DbPromptFunnel';

/**
 * Data Building hero, laid out like the old product page hero
 * (app/_platform/page.tsx): copy on the left, the scanning prompt funnel on
 * the right, both entering in a short stagger. Follows the site theme: sand
 * in light mode, near-black with the ember radial wash in dark.
 */

const JUMP = [
  { href: '#company-profile', label: 'Company Profile' },
  { href: '#discovery', label: 'Discovery' },
  { href: '#research', label: 'Research' },
  { href: '#decision-makers', label: 'Decision-makers' },
  { href: '#contacts', label: 'Email & phone' },
  { href: '#signals', label: 'Signals' },
];

const STATS = [
  { v: '650M+', l: 'B2B profiles' },
  { v: '30+', l: 'contact-data sources' },
  { v: '20+', l: 'signal types' },
];

export default function DbHero() {
  const { openModal } = useModal();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Delays are literal classes at each call site so Tailwind can see them.
  const enter = () => `transition-all duration-700 ${ready ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`;

  return (
    <section className="relative isolate overflow-hidden border-b border-slate-200 bg-sand-100 text-slate-900 dark:border-white/[0.06] dark:bg-[#040404] dark:text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_24%,rgba(201,76,30,0.07),transparent_45%),radial-gradient(circle_at_78%_55%,rgba(201,76,30,0.05),transparent_50%)] dark:bg-[radial-gradient(circle_at_18%_24%,rgba(201,76,30,0.16),transparent_45%),radial-gradient(circle_at_78%_55%,rgba(201,76,30,0.10),transparent_50%)]"
      />
      {/* faint grid behind the funnel */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.6] [background-image:linear-gradient(rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.05)_1px,transparent_1px)] dark:opacity-[0.35] dark:[background-image:linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_60%_70%_at_75%_50%,black,transparent)]"
      />

      <div className="relative z-10 mx-auto max-w-[1340px] px-6 pt-36 lg:pt-40">
        <div className="grid grid-cols-1 items-center gap-12 pb-14 lg:grid-cols-[1.08fr_1fr] lg:gap-10 lg:pb-20">
          {/* Copy */}
          <div className="text-left">
            <p className={`mb-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-ember-500 dark:text-ember-400 ${enter()}`}>
              Harvin Data Building
            </p>

            <h1 className="font-sans text-[clamp(30px,3.6vw,48px)] font-semibold leading-[1.07] tracking-[-0.02em] text-slate-900 dark:text-white">
              <span className={`inline-block delay-[150ms] ${enter()}`}>Find the companies and decision-makers</span>{' '}
              <span className={`inline-block text-ember-500 delay-[300ms] dark:text-ember-400 ${enter()}`}>that fit your business best.</span>
            </h1>

            <p className={`mt-5 max-w-[560px] text-[14px] leading-relaxed text-slate-600 delay-[500ms] dark:text-white/70 sm:text-[16px] ${enter()}`}>
              Harvin learns what you sell, who converts and who doesn’t, then discovers, researches and enriches a market
              around that context.
            </p>

            <div className={`mt-9 flex flex-wrap items-center gap-x-6 gap-y-4 delay-[650ms] ${enter()}`}>
              <button
                type="button"
                onClick={() => openModal('talk-to-sales')}
                className="group inline-flex items-center gap-2 rounded-full bg-ember-500 px-6 py-3.5 text-[14.5px] font-semibold text-white
                           shadow-[0_4px_14px_rgba(201,76,30,0.45)] transition-colors hover:bg-ember-400
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-400 focus-visible:ring-offset-2 focus-visible:ring-offset-sand-100 dark:focus-visible:ring-offset-[#040404]"
              >
                See Harvin on your market
                <ArrowRight size={16} strokeWidth={2.4} className="transition-transform group-hover:translate-x-0.5" />
              </button>
              <a
                href="#how-it-works"
                className="text-[14.5px] font-semibold text-slate-900 underline decoration-slate-300 decoration-2 underline-offset-[6px] transition-colors hover:decoration-ember-500 dark:text-white dark:decoration-white/25 dark:hover:decoration-ember-400"
              >
                How it works
              </a>
            </div>

            <dl className={`mt-12 grid w-full max-w-[460px] grid-cols-3 divide-x divide-slate-200 border-t border-slate-200 pt-5 dark:divide-white/10 dark:border-white/10 delay-[800ms] ${enter()}`}>
              {STATS.map((s, i) => (
                <div key={s.l} className={i === 0 ? 'pr-4' : 'px-4'}>
                  <dt className="sr-only">{s.l}</dt>
                  <dd className="text-[26px] font-semibold leading-none tracking-[-0.02em] text-slate-900 dark:text-white">{s.v}</dd>
                  <dd className="mt-1.5 text-[12.5px] text-slate-500 dark:text-white/50">{s.l}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Scanning funnel */}
          <div
            className={`transition-all duration-[900ms] delay-[600ms] ${ready ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
          >
            <DbPromptFunnel />
          </div>
        </div>

        <nav aria-label="On this page" className="border-t border-slate-200 py-5 dark:border-white/10">
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <li className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400 dark:text-white/40">Jump to</li>
            {JUMP.map((j) => (
              <li key={j.href}>
                <a href={j.href} className="text-[13.5px] font-medium text-slate-600 transition-colors hover:text-ember-500 dark:text-white/70 dark:hover:text-ember-400">
                  {j.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
