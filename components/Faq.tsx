'use client';

import { useState } from 'react';

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
      className="scroll-mt-20 border-b border-slate-200 px-6 py-24 dark:border-rule lg:py-32"
    >
      <div className="mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="text-[15px] font-medium text-slate-500 dark:text-stone">FAQ</p>
          <h2 className="mt-4 font-display text-[clamp(36px,4.2vw,58px)] font-medium leading-[1.05] text-slate-950 dark:text-white">
            {title}
          </h2>
        </div>

        <div className="divide-y divide-slate-200 border-y border-slate-200 dark:divide-rule dark:border-rule">
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
                    className="flex w-full items-center justify-between gap-6 rounded-lg text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-ember-500"
                  >
                    <span className="text-[18px] font-semibold text-slate-900 dark:text-white sm:text-[21px]">
                      {faq.q}
                    </span>
                    {/* Newsreader + / − (brand: no icon chrome); ember light when open */}
                    <span
                      aria-hidden="true"
                      className={`w-6 shrink-0 text-center font-display text-[30px] leading-none ${isOpen ? 'text-ember-500 dark:text-ember-400' : 'text-slate-400 dark:text-stone'}`}
                    >
                      {isOpen ? '\u2212' : '+'}
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
                    <p className="pr-10 pt-3.5 text-[17px] leading-[1.5] text-slate-600 dark:text-slate-300">{faq.a}</p>
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
