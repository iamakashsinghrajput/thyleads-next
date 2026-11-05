'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

/**
 * FAQ accordion. Items come from the page (a server component) so the same
 * array also feeds that page's FAQPage JSON-LD — the schema must match the
 * visible text word for word.
 */
export default function Faq({
  items,
  title = 'Frequently asked questions',
  id = 'faq',
}: {
  items: { q: string; a: string }[];
  title?: string;
  id?: string;
}) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section
      id={id}
      className="scroll-mt-20 border-b border-slate-200 bg-white/60 px-6 py-20 dark:border-white/[0.08] dark:bg-white/[0.015] lg:py-28"
    >
      <div className="mx-auto grid max-w-[1180px] gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-ember-500 dark:text-ember-400">
            <span aria-hidden="true" className="h-px w-6 bg-ember-500 dark:bg-ember-400" />
            FAQ
          </p>
          <h2 className="mt-5 font-instrument text-[clamp(30px,3.6vw,46px)] font-semibold leading-[1.08] tracking-[-0.025em] text-slate-950 dark:text-white">
            {title}
          </h2>
        </div>

        <div className="divide-y divide-slate-200 border-y border-slate-200 dark:divide-white/[0.08] dark:border-white/[0.08]">
          {items.map((faq, idx) => {
            const isOpen = openIdx === idx;
            const panelId = `${id}-panel-${idx}`;
            return (
              <div key={faq.q} className="py-5 sm:py-6">
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    id={`${panelId}-q`}
                    className="flex w-full items-start justify-between gap-4 rounded-lg text-left
                               focus:outline-none focus-visible:ring-2 focus-visible:ring-ember-500"
                  >
                    <span className="text-[17px] font-bold tracking-[-0.015em] text-slate-900 dark:text-white sm:text-[18px]">
                      {faq.q}
                    </span>
                    <span
                      aria-hidden="true"
                      className={[
                        'mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-transform duration-200',
                        isOpen
                          ? 'rotate-180 border-ember-500 bg-ember-500 text-white'
                          : 'border-slate-300 text-slate-500 dark:border-white/20 dark:text-slate-400',
                      ].join(' ')}
                    >
                      <ChevronDown size={14} strokeWidth={2.5} />
                    </span>
                  </button>
                </h3>
                {/* Collapsed by height, not removed, so crawlers and find-in-page still see the answer. */}
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={`${panelId}-q`}
                  className={`grid transition-all duration-300 ease-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                >
                  <div className="min-h-0 overflow-hidden">
                    <p className="pr-10 pt-3.5 text-[15.5px] leading-[1.75] text-slate-600 dark:text-slate-300">{faq.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
