import type { Metadata } from 'next';
import Link from 'next/link';
import { Check, ArrowRight, Sparkles } from 'lucide-react';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Pricing — Harvin.ai',
  description: 'Simple, transparent pricing built around the way high-velocity SDR teams operate.',
  alternates: { canonical: '/pricing' },
};

const PLANS = [
  {
    name: 'Early Access Pilot',
    tagline: 'For fast-growing SDR teams looking to consolidate their outbound stack into one unified system.',
    price: 'Custom',
    sub: 'billed quarterly or annually',
    highlight: true,
    features: [
      'Account Intelligence & buying signal detection',
      'Unified multi-channel outreach (Email, Tasks, Phone)',
      'Built-in calling dialer with AI script assistance',
      'Two-way sync with your CRM (Salesforce / HubSpot)',
      'Digital Sales Rooms for AE handoff continuity',
      'Team health, coaching analytics & funnel leak reports',
      'Dedicated onboarding & pilot migration support',
    ],
    cta: 'Get Early Access',
  },
  {
    name: 'Enterprise',
    tagline: 'For established revenue organizations requiring dedicated security, custom models, and enterprise SLA.',
    price: 'Contact Us',
    sub: 'custom deployment & governance',
    highlight: false,
    features: [
      'Everything in Early Access Pilot',
      'Custom LLM fine-tuning on your won deals & ICP history',
      'Granular territory, rep quota & access permissions',
      'Enterprise SSO & custom security reviews',
      'Dedicated Customer Success Manager & weekly strategy calls',
      'Custom data provider connectors & bespoke CRM webhooks',
      '99.9% uptime SLA and priority engineering support',
    ],
    cta: 'Contact Sales',
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-sand-100 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white">
      <Navbar />

      <main className="relative overflow-hidden px-6 pb-24 pt-28 lg:pb-32 lg:pt-36">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_40%_at_50%_0%,rgba(201,76,30,0.13),transparent_70%)] dark:bg-[radial-gradient(55%_40%_at_50%_0%,rgba(201,76,30,0.2),transparent_70%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(35,34,32,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(35,34,32,0.045)_1px,transparent_1px)] bg-[size:56px_56px]
                     [mask-image:radial-gradient(60%_35%_at_50%_15%,#000,transparent)]
                     dark:bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)]"
        />

        <div className="relative mx-auto max-w-[1080px]">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-ember-200 bg-ember-50/80 px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-ember-600 dark:border-ember-500/30 dark:bg-ember-500/10 dark:text-ember-400">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-ember-500" />
              Transparent Pricing
            </span>
            <h1 className="mt-7 font-instrument font-semibold text-[clamp(36px,5vw,64px)] leading-[1.04] tracking-[-0.035em] text-slate-950 dark:text-white">
              Set up Harvin <span className="text-ember-500">for your team.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-[560px] text-[17px] leading-relaxed text-slate-600 dark:text-slate-400 sm:text-[18px]">
              One platform connecting account intelligence, multichannel execution, and reporting.
              Get access to our early pilot program today.
            </p>
          </div>

          <div className="mt-16 grid items-stretch gap-6 md:grid-cols-2 lg:gap-8">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`relative flex flex-col rounded-modal border bg-sand-50 p-8 shadow-[0_4px_32px_rgba(0,0,0,0.06)] dark:bg-[#0F0E0C] dark:shadow-[0_4px_40px_rgba(0,0,0,0.35)] sm:p-10 ${
                  plan.highlight ? 'border-ember-300 dark:border-ember-500/40' : 'border-slate-200 dark:border-white/[0.08]'
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <h2 className="font-instrument font-semibold text-[24px] text-slate-950 dark:text-white">{plan.name}</h2>
                  {plan.highlight && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-ember-500 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">
                      <Sparkles size={12} aria-hidden="true" /> Recommended
                    </span>
                  )}
                </div>
                <p className="mt-3 min-h-[48px] text-[14.5px] leading-relaxed text-slate-600 dark:text-slate-400">{plan.tagline}</p>

                <div className="mt-8 border-b border-slate-200 pb-8 dark:border-white/[0.08]">
                  <span className="font-instrument text-[44px] font-semibold leading-none tracking-[-0.03em] text-slate-950 dark:text-white">{plan.price}</span>
                  <span className="mt-2 block text-[13.5px] text-slate-500 dark:text-slate-400">{plan.sub}</span>
                </div>

                <ul className="my-8 flex-1 space-y-3.5">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-[14.5px] text-slate-700 dark:text-slate-300">
                      <span className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-ember-500/10 text-ember-500">
                        <Check size={11} strokeWidth={3} aria-hidden="true" />
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className={`group flex w-full items-center justify-center gap-2 rounded-btn py-3.5 text-[15px] font-semibold transition-all duration-150 ${
                    plan.highlight
                      ? 'bg-ember-500 text-white shadow-[0_1px_4px_rgba(201,76,30,0.3)] hover:bg-ember-400 hover:shadow-[0_4px_14px_rgba(201,76,30,0.4)]'
                      : 'bg-slate-800 text-white hover:bg-slate-700 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100'
                  }`}
                >
                  {plan.cta}
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
