'use client';

import { ArrowRight, FileSpreadsheet, Mail, Phone, Radar, SlidersHorizontal, Star, Users } from 'lucide-react';
import { useModal } from '@/components/ModalContext';
import { useReveal } from '../useReveal';
import { Count, FitRing, MicroLabel, Monogram } from './shared';

/**
 * Closing CTA, in the homepage CTA's frame. The right side shows the offer:
 * the three things you can bring (left chips) feeding the market Harvin hands
 * back (the card), which assembles row by row when it scrolls into view.
 */

const INPUTS = [
  { l: 'Your targeting criteria', icon: SlidersHorizontal },
  { l: 'Your best customers', icon: Star },
  { l: 'Your current spreadsheet', icon: FileSpreadsheet },
];

const ROWS = [
  { name: 'Etsy', who: 'Head of Payments', fit: 91 },
  { name: 'eBay', who: 'VP Finance', fit: 88 },
  { name: 'Mailchimp', who: 'Head of Finance', fit: 84 },
];

function MarketCard() {
  const { ref, step } = useReveal<HTMLDivElement>(ROWS.length + 2, 420);
  return (
    <div ref={ref} className="relative w-full">
      <div className="mb-4 flex flex-wrap gap-2">
        {INPUTS.map(({ l, icon: Icon }, i) => (
          <span
            key={l}
            className={`inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[12.5px] font-medium text-slate-700 transition-all duration-500
                        dark:border-white/[0.1] dark:bg-white/[0.04] dark:text-slate-300 ${step >= 1 ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0'}`}
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            <Icon size={13} className="text-ember-500" /> {l}
          </span>
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-sand-50 shadow-[0_18px_44px_rgba(15,23,42,0.14)] dark:border-white/[0.08] dark:bg-[#16130F] dark:shadow-[0_18px_44px_rgba(0,0,0,0.5)]">
        <div className="flex items-center justify-between gap-3 border-b border-slate-200/70 bg-sand-100/70 px-4 py-3 dark:border-white/[0.06] dark:bg-white/[0.03]">
          <div className="min-w-0">
            <p className="truncate text-[13.5px] font-bold tracking-[-0.01em] text-slate-900 dark:text-white">Your sales-ready market</p>
            <p className="truncate text-[12px] text-slate-500 dark:text-slate-400">
              <Count to={1284} run={step >= 1} format={(n) => n.toLocaleString('en-US')} /> companies · researched and scored
            </p>
          </div>
          <span className="flex-shrink-0 rounded-full bg-ember-50 px-2.5 py-0.5 text-[11px] font-semibold text-ember-600 dark:bg-ember-500/15 dark:text-ember-300">
            Ready
          </span>
        </div>

        <div className="px-2 py-1">
          {ROWS.map((r, i) => (
            <div
              key={r.name}
              className={`flex items-center gap-3 px-1.5 py-2.5 transition-all duration-500 ${i > 0 ? 'border-t border-slate-200/70 dark:border-white/[0.05]' : ''}
                          ${step > i + 1 ? 'translate-x-0 opacity-100' : 'translate-x-2 opacity-0'}`}
            >
              <Monogram name={r.name} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-semibold text-slate-900 dark:text-white">{r.name}</p>
                <p className="mt-0.5 flex items-center gap-1.5 truncate text-[11.5px] text-slate-600 dark:text-slate-300">
                  <Users size={11} className="flex-shrink-0 text-ember-500" />
                  <span className="truncate">{r.who}</span>
                </p>
              </div>
              <span className="hidden items-center gap-1 sm:flex">
                <span className="grid h-6 w-6 place-items-center rounded-md bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"><Mail size={12} /></span>
                <span className="grid h-6 w-6 place-items-center rounded-md bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"><Phone size={12} /></span>
              </span>
              <FitRing value={r.fit} run={step > i + 1} size={38} />
            </div>
          ))}
        </div>

        <div className={`flex items-center gap-2 border-t border-slate-200/70 px-4 py-2.5 text-[12px] transition-opacity duration-500 dark:border-white/[0.05] ${step >= ROWS.length + 2 ? 'opacity-100' : 'opacity-0'}`}>
          <Radar size={13} className="text-ember-500" />
          <span className="text-slate-600 dark:text-slate-300">Signals monitored on every account</span>
        </div>
      </div>
      <MicroLabel className="mt-3">Illustrative example · logos belong to their owners; scores are not real data</MicroLabel>
    </div>
  );
}

export default function DbCta() {
  const { openModal } = useModal();
  return (
    <section className="border-t border-slate-200 bg-sand-100 px-4 py-20 dark:border-white/[0.06] dark:bg-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1300px] overflow-hidden rounded-2xl border border-slate-200 bg-sand-100 shadow-[0_4px_32px_rgba(0,0,0,0.06)] dark:border-white/[0.08] dark:bg-[#0F0E0C] dark:shadow-[0_4px_40px_rgba(0,0,0,0.35)]">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="flex flex-col justify-center px-6 py-10 sm:px-10 sm:py-14 lg:px-14">
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ember-500">See it on your market</p>
            <h2 className="mt-4 text-[clamp(30px,3.5vw,46px)] font-semibold leading-[1.06] tracking-[-0.03em] text-slate-900 dark:text-white">
              Give Harvin <span className="text-ember-500">one market.</span>
            </h2>
            <p className="mt-4 max-w-[500px] text-[16px] leading-relaxed text-slate-600 dark:text-slate-400">
              Share your targeting criteria, your best customers, or the spreadsheet your SDR team is working today. We’ll
              show you what Harvin finds.
            </p>
            <div className="mt-8">
              <button
                type="button"
                onClick={() => openModal('talk-to-sales')}
                className="group inline-flex items-center gap-2 rounded-xl bg-ember-500 px-6 py-3.5 text-[15px] font-semibold text-white
                           shadow-[0_2px_8px_rgba(201,76,30,0.3)] transition-all duration-200
                           hover:bg-ember-400 hover:shadow-[0_4px_16px_rgba(201,76,30,0.45)]
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-500 focus-visible:ring-offset-2"
              >
                See Harvin on your market
                <ArrowRight size={16} strokeWidth={2.4} className="transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>

          <div className="relative flex items-center overflow-hidden border-t border-slate-200 bg-sand-200/60 p-6 dark:border-white/[0.08] dark:bg-white/[0.02] sm:p-8 lg:border-l lg:border-t-0 lg:p-10">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_25%,rgba(201,76,30,0.10),transparent_55%)]" />
            <MarketCard />
          </div>
        </div>
      </div>
    </section>
  );
}
