'use client';

import { useState } from 'react';
import { Mail, Plus } from 'lucide-react';
import { HOME_FAQ } from '@/app/home-content';
import { BOOK_DEMO_HREF } from '@/lib/site';
import { Eyebrow, Heading, Section, TextLink } from './ui';

/**
 * Homepage FAQ. The questions and answers are production's HOME_FAQ — the same
 * array app/page.tsx emits as FAQPage JSON-LD, so the visible text and the
 * schema stay word-for-word identical. Edit the copy in app/home-content.ts.
 *
 * One answer open at a time; answers expand with a grid-rows transition so the
 * height animates without measuring.
 */
export default function HomeFaq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section>
      <div id="faq" className="grid scroll-mt-24 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        {/* ── Left ─────────────────────────────────────────────────────── */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Eyebrow>FAQ</Eyebrow>
          <Heading>Frequently asked questions</Heading>
          <p className="mt-4 max-w-[420px] text-[15.5px] leading-[1.65] text-slate-600 dark:text-slate-400">
            How Harvin finds, researches and scores companies, and what it costs.
          </p>

          <div className="mt-8 flex items-start gap-3.5 rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/[0.08] dark:bg-white/[0.02]">
            <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-lg bg-ember-50 text-ember-500 dark:bg-ember-500/10 dark:text-ember-400">
              <Mail size={16} strokeWidth={2} />
            </span>
            <div>
              <p className="text-[15px] font-semibold text-slate-900 dark:text-white">Still have a question?</p>
              <p className="mt-0.5 text-[13.5px] text-slate-500 dark:text-slate-400">
                Talk to the team and see Harvin on your own market.
              </p>
              <TextLink href={BOOK_DEMO_HREF} className="mt-3 text-[13.5px]">
                Book a demo
              </TextLink>
            </div>
          </div>
        </div>

        {/* ── Right: the questions ─────────────────────────────────────── */}
        <ul className="flex flex-col gap-1.5">
          {HOME_FAQ.map((item, i) => {
            const isOpen = open === i;
            const panelId = `faq-panel-${i}`;
            const buttonId = `faq-button-${i}`;
            return (
              <li
                key={item.q}
                className={`rounded-xl border transition-colors duration-200 ${
                  isOpen
                    ? 'border-ember-500/40 bg-white dark:border-ember-400/30 dark:bg-white/[0.03]'
                    : 'border-slate-200/80 bg-white/50 hover:bg-white dark:border-white/[0.07] dark:bg-white/[0.01] dark:hover:bg-white/[0.03]'
                }`}
              >
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center gap-4 px-5 py-2.5 short:py-2 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-500 focus-visible:ring-offset-2 rounded-xl"
                  >
                    <span className={`w-6 flex-shrink-0 font-mono text-[12px] font-semibold tabular-nums ${isOpen ? 'text-ember-500' : 'text-slate-400 dark:text-slate-500'}`}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="flex-1 text-[15px] font-semibold tracking-[-0.01em] text-slate-900 dark:text-white">
                      {item.q}
                    </span>
                    <span
                      className={`grid h-7 w-7 flex-shrink-0 place-items-center rounded-full transition-all duration-300 ${
                        isOpen
                          ? 'rotate-45 bg-ember-500 text-white'
                          : 'bg-slate-100 text-slate-500 dark:bg-white/[0.06] dark:text-slate-400'
                      }`}
                    >
                      <Plus size={14} strokeWidth={2.4} />
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                >
                  <div className="overflow-hidden">
                    <p className="pb-4 pl-[60px] pr-14 text-[14px] leading-[1.65] text-slate-600 dark:text-slate-400">
                      {item.a}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
