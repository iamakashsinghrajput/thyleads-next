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
    <div className="min-h-screen bg-sand-100 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
      <Navbar />

      <main className="mx-auto max-w-[1200px] px-6 py-20 lg:py-28">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block mb-3 text-[12px] font-semibold uppercase tracking-[0.12em] text-ember-500">
            Transparent Pricing
          </span>
          <h1 className="text-[clamp(32px,4vw,52px)] font-bold tracking-[-0.025em] leading-[1.08]">
            Set up Harvin for your team.
          </h1>
          <p className="mt-4 text-[16.5px] leading-relaxed text-slate-600 dark:text-slate-400">
            One platform connecting account intelligence, multichannel execution, and reporting.
            Get access to our early pilot program today.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto items-stretch">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`flex flex-col rounded-2xl p-8 transition-all ${
                plan.highlight
                  ? 'border-2 border-ember-500 bg-white dark:bg-slate-900 shadow-xl relative'
                  : 'border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-white/[0.02] shadow-sm'
              }`}
            >
              {plan.highlight && (
                <span className="absolute -top-3 left-8 inline-flex items-center gap-1 rounded-full bg-ember-500 px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider text-white shadow-sm">
                  <Sparkles size={12} /> Recommended
                </span>
              )}

              <div className="mb-6">
                <h2 className="text-[22px] font-bold text-slate-900 dark:text-white">{plan.name}</h2>
                <p className="mt-2 text-[13.5px] leading-relaxed text-slate-600 dark:text-slate-400 min-h-[40px]">
                  {plan.tagline}
                </p>
              </div>

              <div className="mb-8 pb-6 border-b border-slate-100 dark:border-white/[0.06]">
                <span className="text-[36px] font-bold tracking-tight text-slate-900 dark:text-white">
                  {plan.price}
                </span>
                <span className="block text-[13px] text-slate-500 dark:text-slate-400 mt-1">{plan.sub}</span>
              </div>

              <ul className="flex-1 space-y-3.5 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-[14px] text-slate-700 dark:text-slate-300">
                    <Check size={16} className="text-ember-500 shrink-0 mt-0.5" strokeWidth={2.5} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/contact"
                className={`flex w-full items-center justify-center gap-2 rounded-xl py-3 text-[14.5px] font-semibold transition-all ${
                  plan.highlight
                    ? 'bg-ember-500 text-white hover:bg-ember-600 shadow-sm'
                    : 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100'
                }`}
              >
                <span>{plan.cta}</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
