import Link from 'next/link';

import { BOOK_DEMO_HREF, startFreeHref } from '@/lib/site';
import { FREE_CREDITS, PREVIEW_COMPANIES } from '@/lib/pricing';

/** Reusable CTA block `cta-start-free` (handoff §3.9). Always dark, like the footer it sits above.
 *  Brand: one ember button per screen — "Book a demo" is a text link. */
export default function CtaStartFree() {
  return (
    <section id="final-cta" className="border-t border-rule bg-slate-950 px-6 py-[clamp(72px,9vw,128px)] text-white">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-end justify-between gap-x-16 gap-y-9 sm:px-2">
        <div className="min-w-0 flex-[1_1_520px]">
          <h2 className="max-w-[17em] font-display text-[clamp(34px,4.2vw,58px)] font-medium leading-[1.06]">
            See the companies your database <em className="text-ember-400">misses</em>
          </h2>
          <p className="mt-[22px] max-w-[34em] text-[clamp(18px,1.5vw,20px)] leading-[1.5] text-slate-300">
            Tell Harvin what you sell and who has bought from you. Your first {PREVIEW_COMPANIES} companies come with the
            reasons each one fits.
          </p>
        </div>
        <div className="flex flex-col items-start gap-3.5">
          <a
            href={startFreeHref()}
            className="inline-flex min-h-[52px] items-center justify-center rounded-[10px] bg-ember-500 px-7 text-[17px] font-semibold text-pure transition-colors hover:bg-ember-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          >
            Start free
          </a>
          <span className="text-[14px] text-slate-400">{FREE_CREDITS} free credits. No card.</span>
          <Link
            href={BOOK_DEMO_HREF}
            className="font-semibold underline decoration-rule decoration-2 underline-offset-[5px] transition-colors hover:decoration-ember-400"
          >
            Book a demo
          </Link>
        </div>
      </div>
    </section>
  );
}
