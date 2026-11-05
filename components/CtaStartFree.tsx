import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { BOOK_DEMO_HREF, startFreeHref } from '@/lib/site';
import { FREE_CREDITS, PREVIEW_COMPANIES } from '@/lib/pricing';

/** Reusable CTA block `cta-start-free` (handoff §3.9). Always dark, like the footer it sits above. */
export default function CtaStartFree() {
  return (
    <section id="final-cta" className="relative overflow-hidden bg-[#0C0B09] px-6 py-24 text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_60%_at_50%_100%,rgba(201,76,30,0.22),transparent_70%)]"
      />
      <div className="relative mx-auto max-w-[760px] text-center">
        <h2 className="font-instrument text-[clamp(30px,3.5vw,48px)] font-semibold leading-[1.08] tracking-[-0.025em]">
          See the companies your database misses
        </h2>
        <p className="mx-auto mt-5 max-w-[600px] text-[17px] leading-relaxed text-white/70">
          Tell Harvin what you sell and who has bought from you. Your first {PREVIEW_COMPANIES} companies come with the
          reasons each one fits.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={startFreeHref()}
            className="group inline-flex w-full items-center justify-center gap-2 rounded-btn bg-ember-500 px-6 py-3.5 text-[15px] font-semibold text-white transition-all duration-150
                       shadow-[0_1px_4px_rgba(201,76,30,0.3)] hover:bg-ember-400 hover:shadow-[0_4px_14px_rgba(201,76,30,0.4)]
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 sm:w-auto"
          >
            Start free
            <ArrowRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
          </a>
          <Link
            href={BOOK_DEMO_HREF}
            className="inline-flex w-full items-center justify-center rounded-btn border border-white/[0.16] px-6 py-3.5 text-[15px] font-semibold text-white transition-colors
                       hover:bg-white/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 sm:w-auto"
          >
            Book a demo
          </Link>
        </div>
        <p className="mt-4 text-[13px] text-white/50">{FREE_CREDITS} free credits. No card.</p>
      </div>
    </section>
  );
}
