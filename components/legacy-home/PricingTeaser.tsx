import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { portalUrl } from '@/lib/portal';
import { FREE_CREDITS, PLANS, PREVIEW_COMPANIES } from '@/lib/pricing';
import { Section } from './ui';

/**
 * Pricing teaser — the close of the product story. A dark panel in both themes
 * so it reads as the ask. Every number comes from lib/pricing.ts (the source
 * /pricing uses), so this can't drift from the pricing page.
 */

const PORTAL = portalUrl();
const STARTER = PLANS.find((p) => p.id === 'starter');
const fmt = (n: number) => n.toLocaleString('en-US');

const STEPS = [
  { step: 'Start', value: fmt(FREE_CREDITS), label: 'free credits, no card' },
  { step: 'See', value: String(PREVIEW_COMPANIES), label: 'companies, with fit reasons' },
  {
    step: 'Scale',
    value: STARTER?.monthly != null ? `$${STARTER.monthly}` : 'Custom',
    label: STARTER?.monthlyCredits ? `a month for ${fmt(STARTER.monthlyCredits)} credits` : 'a month',
  },
];

export default function PricingTeaser() {
  return (
    <Section>
      <div className="relative overflow-hidden rounded-[28px] bg-[#0E0D0B] px-6 py-10 text-white ring-1 ring-white/[0.06] sm:px-10 lg:px-12 lg:py-12 short:py-9">
        {/* Warm glow behind the numbers */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full bg-ember-500/20 blur-[110px]"
        />

        <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ember-400">Pricing</p>
            <h2 className="mt-3 text-[clamp(27px,3vw,40px)] font-semibold leading-[1.09] tracking-[-0.025em] short:text-[34px]">
              Start free. <span className="text-ember-400">Pay for what Harvin finds.</span>
            </h2>
            <p className="mt-4 max-w-[480px] text-[15.5px] leading-[1.65] text-white/65">
              Start with {fmt(FREE_CREDITS)} free credits and see your first {PREVIEW_COMPANIES} companies
              with fit reasons. Paid plans start at {STEPS[2].value} a month
              {STARTER?.monthlyCredits ? ` for ${fmt(STARTER.monthlyCredits)} credits` : ''}. Emails and
              phone numbers are charged only when found.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a
                href={PORTAL}
                className="group inline-flex items-center gap-2 rounded-full bg-ember-500 px-6 py-3 text-[14.5px] font-semibold text-white shadow-[0_8px_24px_rgba(201,76,30,0.35)] transition-colors hover:bg-ember-400"
              >
                Start free
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </a>
              <Link
                href="/pricing"
                className="text-[14.5px] font-semibold text-white underline decoration-white/30 underline-offset-[6px] transition-colors hover:decoration-white"
              >
                See pricing
              </Link>
            </div>
          </div>

          {/* Start → See → Scale */}
          <ol className="grid gap-3 sm:grid-cols-3">
            {STEPS.map((s, i) => (
              <li
                key={s.step}
                className={`relative rounded-2xl border p-5 ${
                  i === 0 ? 'border-ember-400/40 bg-ember-500/[0.1]' : 'border-white/[0.08] bg-white/[0.03]'
                }`}
              >
                <span className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/45">
                  <span className={`grid h-5 w-5 place-items-center rounded-full text-[10px] ${i === 0 ? 'bg-ember-500 text-white' : 'bg-white/10 text-white/70'}`}>
                    {i + 1}
                  </span>
                  {s.step}
                </span>
                <span className="mt-5 block text-[clamp(38px,4vw,52px)] font-semibold leading-none tracking-[-0.04em] tabular-nums">
                  {s.value}
                </span>
                <span className="mt-2 block text-[13px] leading-[1.45] text-white/60">{s.label}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}
