import Link from 'next/link';
import { ArrowRight, Check, SearchX } from 'lucide-react';
import { FREE_CREDITS, PREVIEW_COMPANIES } from '@/lib/pricing';
import { BOOK_DEMO_HREF, startFreeHref } from '@/lib/site';

/**
 * Closing CTA. Copy mirrors production's CtaStartFree ("See the companies your
 * database misses"); numbers come from lib/pricing.ts so they match /pricing.
 *
 * The visual shows exactly what the CTA promises: the first companies Harvin
 * returns, each with the reason it fits, and — overlapping it — the database
 * filter that returns none of them. Built in markup so it themes with the page.
 * Companies are the same fictional examples used in CompanyDiscovery.
 */

const PREVIEW = [
  { name: 'Northstar Software', listedAs: 'Software', reason: 'Bills customers in 18 countries', fit: 91 },
  { name: 'Vela Commerce', listedAs: 'Internet', reason: 'Marketplace that pays sellers', fit: 88 },
  { name: 'Brightpath Learning', listedAs: 'EdTech', reason: 'Collects tuition from abroad', fit: 84 },
  { name: 'Kitecart', listedAs: 'Social commerce', reason: 'Pays creators abroad', fit: 79 },
];

function initials(name: string) {
  return name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();
}

/** Small donut, matching the fit rings elsewhere on the page. */
function FitRing({ value }: { value: number }) {
  const R = 15;
  const C = 2 * Math.PI * R;
  return (
    <span className="relative grid h-[38px] w-[38px] flex-shrink-0 place-items-center" aria-label={`Company Fit ${value}`}>
      <svg viewBox="0 0 40 40" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden="true">
        <circle cx="20" cy="20" r={R} fill="none" strokeWidth="3.5" className="stroke-slate-200 dark:stroke-white/[0.12]" />
        <circle
          cx="20" cy="20" r={R} fill="none" strokeWidth="3.5" strokeLinecap="round"
          className="stroke-ember-500" strokeDasharray={C} strokeDashoffset={C * (1 - value / 100)}
        />
      </svg>
      <span className="relative text-[11.5px] font-bold tabular-nums text-slate-900 dark:text-white">{value}</span>
    </span>
  );
}

/** The preview Harvin returns: companies, each with its reason. */
function PreviewCard() {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-slate-200/80 bg-sand-50 shadow-[0_18px_44px_rgba(15,23,42,0.14)] dark:border-white/[0.08] dark:bg-[#16130F] dark:shadow-[0_18px_44px_rgba(0,0,0,0.5)]">
      <div className="flex items-center justify-between gap-3 border-b border-slate-200/70 bg-sand-100/70 px-4 py-3 dark:border-white/[0.06] dark:bg-white/[0.03]">
        <div className="min-w-0">
          <p className="truncate text-[13.5px] font-bold tracking-[-0.01em] text-slate-900 dark:text-white">
            Your first {PREVIEW_COMPANIES} companies
          </p>
          <p className="truncate text-[12px] text-slate-500 dark:text-slate-400">With the reasons each one fits</p>
        </div>
        <span className="flex-shrink-0 rounded-full bg-ember-50 px-2.5 py-0.5 text-[11px] font-semibold text-ember-600 dark:bg-ember-500/15 dark:text-ember-300">
          Free preview
        </span>
      </div>

      <div className="px-2 py-1">
        {PREVIEW.map((c, i) => (
          <div key={c.name} className={`flex items-center gap-3 px-1.5 py-2.5 ${i > 0 ? 'border-t border-slate-200/70 dark:border-white/[0.05]' : ''}`}>
            <span className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-lg border border-slate-200 bg-white text-[11px] font-bold text-slate-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300">
              {initials(c.name)}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-semibold text-slate-900 dark:text-white">{c.name}</p>
              <p className="mt-0.5 flex items-center gap-1.5 truncate text-[11.5px] text-slate-600 dark:text-slate-300">
                <Check size={11} strokeWidth={3} className="flex-shrink-0 text-ember-500" />
                <span className="truncate">{c.reason}</span>
              </p>
            </div>
            <FitRing value={c.fit} />
          </div>
        ))}
        <p className="border-t border-slate-200/70 px-1.5 py-2.5 text-[12px] text-slate-500 dark:border-white/[0.05] dark:text-slate-400">
          + {PREVIEW_COMPANIES - PREVIEW.length} more, each with its reasons
        </p>
      </div>
    </div>
  );
}

/** The miss: what a database filter returns for the same companies. */
function MissedCard() {
  return (
    <div
      className="absolute bottom-0 -left-3 w-[72%] rounded-2xl border border-slate-200 bg-white p-4
                 shadow-[0_18px_40px_rgba(15,23,42,0.18)]
                 dark:border-white/[0.1] dark:bg-[#1a1714] dark:shadow-[0_18px_40px_rgba(0,0,0,0.55)]
                 sm:-left-5"
    >
      <span className="flex items-center gap-1.5">
        <SearchX size={13} className="flex-shrink-0 text-slate-400" strokeWidth={2.4} />
        <span className="font-mono text-[9.5px] font-bold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
          Your database
        </span>
      </span>
      <p className="mt-2 text-[12.5px] text-slate-400 line-through decoration-slate-400 dark:text-slate-500">
        Industry = Fintech
      </p>
      <p className="mt-0.5 text-[15px] font-semibold text-slate-900 dark:text-white">
        Finds <span className="tabular-nums">0</span> of these
      </p>
      <div className="mt-2.5 flex flex-wrap gap-1.5">
        {PREVIEW.map((c) => (
          <span key={c.name} className="rounded-md border border-slate-200 px-1.5 py-px text-[11px] text-slate-500 dark:border-white/[0.1] dark:text-slate-400">
            Listed as {c.listedAs}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function CTA() {
  return (
    <section className="border-t border-slate-200 bg-sand-100 px-4 py-20 dark:border-white/[0.06] dark:bg-slate-950 sm:px-6 lg:px-8">
      <div
        className="mx-auto max-w-[1300px] overflow-hidden rounded-2xl border border-slate-200 bg-sand-100
                   shadow-[0_4px_32px_rgba(0,0,0,0.06)]
                   dark:border-white/[0.08] dark:bg-[#0F0E0C] dark:shadow-[0_4px_40px_rgba(0,0,0,0.35)]"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* ── Left: the ask ─────────────────────────────────────────────── */}
          <div className="flex flex-col justify-center px-6 py-10 sm:px-10 sm:py-14 lg:px-14">
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ember-500">Start free</p>

            <h2 className="mt-4 text-[clamp(30px,3.5vw,46px)] font-semibold leading-[1.06] tracking-[-0.03em] text-slate-900 dark:text-white">
              See the companies your database <span className="text-ember-500">misses</span>
            </h2>

            <p className="mt-4 max-w-[480px] text-[16px] leading-relaxed text-slate-600 dark:text-slate-400">
              Tell Harvin what you sell and who has bought from you. Your first {PREVIEW_COMPANIES} companies
              come with the reasons each one fits.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <a
                href={startFreeHref()}
                className="group inline-flex items-center gap-2 rounded-xl bg-ember-500 px-6 py-3.5 text-[15px] font-semibold text-white
                           shadow-[0_2px_8px_rgba(201,76,30,0.3)] transition-all duration-200
                           hover:bg-ember-400 hover:shadow-[0_4px_16px_rgba(201,76,30,0.45)]
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-500 focus-visible:ring-offset-2"
              >
                Start free
                <ArrowRight size={16} strokeWidth={2.4} className="transition-transform group-hover:translate-x-0.5" />
              </a>
              <Link
                href={BOOK_DEMO_HREF}
                className="text-[15px] font-semibold text-slate-900 underline decoration-slate-300 decoration-2 underline-offset-[6px] transition-colors hover:decoration-ember-500 dark:text-white dark:decoration-white/25"
              >
                Book a demo
              </Link>
            </div>

            <p className="mt-5 flex items-center gap-2 text-[13.5px] text-slate-500 dark:text-slate-400">
              <span className="grid h-[17px] w-[17px] flex-shrink-0 place-items-center rounded-full bg-ember-50 dark:bg-ember-500/15">
                <Check size={11} className="text-ember-600 dark:text-ember-300" strokeWidth={3} />
              </span>
              {FREE_CREDITS} free credits. No card.
            </p>
          </div>

          {/* ── Right: what you get when you start ────────────────────────── */}
          <div
            className="relative flex items-center overflow-hidden border-t border-slate-200 bg-sand-200/60 p-6
                       dark:border-white/[0.08] dark:bg-white/[0.02] sm:p-8
                       lg:border-l lg:border-t-0 lg:p-10"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_25%,rgba(201,76,30,0.10),transparent_55%)]"
            />
            {/* Layered: a dimmed card behind for depth, the preview, then the
                database's empty result overlapping its lower-left. */}
            <div className="relative w-full pb-32">
              <span
                aria-hidden="true"
                className="absolute -top-4 left-6 right-[-14px] h-full rounded-2xl border border-slate-200/70 bg-sand-50/60
                           dark:border-white/[0.06] dark:bg-white/[0.04]"
              />
              <div className="relative">
                <PreviewCard />
              </div>
              <MissedCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
