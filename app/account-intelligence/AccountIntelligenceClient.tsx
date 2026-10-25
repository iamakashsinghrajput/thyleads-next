'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Building2,
  Check,
  ChevronDown,
  Filter,
  Layers,
  LineChart,
  Radio,
  Search,
  Sparkles,
  Target,
  Users,
  Zap,
} from 'lucide-react';
import { useModal } from '@/components/ModalContext';

export default function AccountIntelligenceClient() {
  const { openModal } = useModal();
  const [email, setEmail] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    openModal('talk-to-sales');
  };

  const toggleFaq = (idx: number) => {
    setOpenFaq((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className="relative w-full">
      {/* ═══ 1. HERO ══════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden border-b border-slate-200 dark:border-white/[0.08] px-6 pt-24 pb-20 lg:pt-32 lg:pb-28">
        {/* Ambient radial glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-[460px] w-full max-w-[1240px] bg-[radial-gradient(ellipse_at_top,rgba(201,76,30,0.12),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(201,76,30,0.20),transparent_70%)]"
        />

        <div className="relative mx-auto max-w-[1200px] text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-ember-200 bg-ember-50/70 px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-ember-600 dark:border-ember-500/30 dark:bg-ember-500/10 dark:text-ember-400 mb-6">
            <Radio size={13} className="text-ember-500 animate-pulse" />
            Account Intelligence
          </span>

          <h1 className="font-bricolage text-[clamp(34px,5vw,62px)] font-bold leading-[1.08] tracking-[-0.03em] text-slate-950 dark:text-white max-w-4xl mx-auto">
            Turn account signals into <span className="text-ember-500">your next move</span>
          </h1>

          <p className="mt-6 text-[18px] sm:text-[20px] leading-[1.65] text-slate-600 dark:text-slate-300 max-w-3xl mx-auto font-normal">
            See the signals, activity and context behind every account, so your team knows what matters, why now and who to engage.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => openModal('talk-to-sales')}
              className="inline-flex items-center gap-2 rounded-xl bg-ember-500 px-6 py-3.5 text-[15px] font-semibold text-white shadow-sm transition-all duration-200 hover:bg-ember-600 hover:shadow-md active:scale-95"
            >
              Book a demo <ArrowRight size={16} />
            </button>

            <a
              href="#account-360"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 dark:border-white/15 bg-white dark:bg-white/5 px-6 py-3.5 text-[15px] font-semibold text-slate-800 dark:text-white transition-all duration-200 hover:bg-slate-100 dark:hover:bg-white/10 hover:border-slate-400 active:scale-95"
            >
              Explore Account Intelligence
            </a>
          </div>
        </div>
      </section>

      {/* ═══ 2. WHAT IS ACCOUNT INTELLIGENCE? ════════════════════════════════ */}
      <section className="px-6 py-16 lg:py-24 border-b border-slate-200 dark:border-white/[0.08] bg-white/50 dark:bg-black/20">
        <div className="mx-auto max-w-[1320px]">
          <div className="grid grid-cols-1 lg:grid-cols-[0.82fr_1.35fr] gap-10 lg:gap-14 items-center">
            {/* Copy side */}
            <div>
              <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ember-500">
                What is Account Intelligence?
              </span>
              <h2 className="mt-2.5 font-bricolage text-[26px] sm:text-[34px] font-bold tracking-[-0.025em] leading-[1.18] text-slate-950 dark:text-white">
                An account is more than a company profile.
              </h2>
              <p className="mt-3 text-[15px] sm:text-[16px] leading-relaxed text-slate-600 dark:text-slate-300">
                A company name and a few firmographic details tell you who an account is. Account intelligence helps you understand what is happening there right now.
              </p>
              <p className="mt-3 text-[14.5px] leading-relaxed text-slate-500 dark:text-slate-400">
                Harvin brings together company information, buying signals, contacts, previous interactions and recent activity into one unified account view.
              </p>

              {/* 3 Core Questions */}
              <div className="mt-6 space-y-2.5">
                {[
                  { q: 'Why does this account matter?', sub: 'Fit & ICP alignment score' },
                  { q: 'Why now?', sub: 'Live buying & intent triggers' },
                  { q: 'Who should we engage?', sub: 'Target personas & verified contacts' },
                ].map((item) => (
                  <div
                    key={item.q}
                    className="flex items-center justify-between rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] px-4 py-3 shadow-xs transition-colors hover:border-ember-300 dark:hover:border-ember-500/30"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ember-500/10 text-ember-500">
                        <Check size={12} strokeWidth={3} />
                      </span>
                      <span className="text-[14.5px] font-semibold text-slate-900 dark:text-white">
                        {item.q}
                      </span>
                    </div>
                    <span className="text-[12px] font-medium text-slate-400 dark:text-slate-500">
                      {item.sub}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual side: Market & Account Intelligence preview */}
            <div className="relative">
              <div className="overflow-hidden rounded-2xl border border-slate-200/90 dark:border-white/[0.12] bg-white dark:bg-[#0F0E0C] shadow-2xl transition-all duration-300 hover:shadow-[0_25px_60px_-12px_rgba(201,76,30,0.18)]">
                <div className="relative overflow-hidden bg-slate-50 dark:bg-[#110F0D]">
                  <img
                    src="/Marketintell.png"
                    alt="Harvin Market & Account Intelligence"
                    className="w-full object-cover object-top block dark:hidden"
                  />
                  <img
                    src="/marketintell-dark.png"
                    alt="Harvin Market & Account Intelligence"
                    className="w-full object-cover object-top hidden dark:block"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/20 to-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 3. WHY IT MATTERS? ═══════════════════════════════════════════════ */}
      <section className="px-6 py-16 lg:py-24 border-b border-slate-200 dark:border-white/[0.08]">
        <div className="mx-auto max-w-[1320px]">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ember-500">
              Why it matters?
            </span>
            <h2 className="mt-2.5 font-bricolage text-[28px] sm:text-[38px] font-bold tracking-[-0.025em] text-slate-950 dark:text-white">
              Good outreach starts with knowing where the account stands.
            </h2>
            <p className="mt-3 text-[16px] text-slate-600 dark:text-slate-300">
              Your team already has account data. The challenge is understanding what deserves attention within that data.
            </p>
          </div>

          {/* 3 Value Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.02] p-7 shadow-xs hover:border-ember-300 dark:hover:border-ember-500/40 transition-colors">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-ember-500/10 text-ember-500 mb-5">
                <Target size={20} />
              </span>
              <h3 className="font-bricolage text-[20px] font-bold text-slate-950 dark:text-white">
                Prioritize the right accounts
              </h3>
              <p className="mt-2.5 text-[14.5px] leading-relaxed text-slate-600 dark:text-slate-400">
                See the signals and account activity behind your priorities, so attention goes to accounts with a reason to engage.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.02] p-7 shadow-xs hover:border-ember-300 dark:hover:border-ember-500/40 transition-colors">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-ember-500/10 text-ember-500 mb-5">
                <Search size={20} />
              </span>
              <h3 className="font-bricolage text-[20px] font-bold text-slate-950 dark:text-white">
                Research without the tab switching
              </h3>
              <p className="mt-2.5 text-[14.5px] leading-relaxed text-slate-600 dark:text-slate-400">
                Find company information, contacts, signals and previous activity in the same account view.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.02] p-7 shadow-xs hover:border-ember-300 dark:hover:border-ember-500/40 transition-colors">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-ember-500/10 text-ember-500 mb-5">
                <Users size={20} />
              </span>
              <h3 className="font-bricolage text-[20px] font-bold text-slate-950 dark:text-white">
                Keep the whole team aligned
              </h3>
              <p className="mt-2.5 text-[14.5px] leading-relaxed text-slate-600 dark:text-slate-400">
                Give SDRs, SDR Heads and AEs the same account context, so the account story doesn&apos;t have to be rebuilt at every stage.
              </p>
            </div>
          </div>

          {/* Connected insight statement */}
          <div className="mt-10 rounded-2xl border border-ember-200/80 bg-ember-50/60 dark:border-ember-500/20 dark:bg-ember-500/5 p-6 text-center">
            <p className="text-[16px] text-slate-700 dark:text-slate-200 font-medium max-w-3xl mx-auto">
              <span className="font-semibold text-ember-600 dark:text-ember-400">
                Harvin brings the relevant pieces together
              </span>{' '}
              so your team can spend less time piecing together an account&apos;s story and more time acting on it.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ 4. ACCOUNT 360° ═════════════════════════════════════════════════ */}
      <section id="account-360" className="scroll-mt-24 px-6 py-16 lg:py-24 border-b border-slate-200 dark:border-white/[0.08] bg-sand-50/50 dark:bg-white/[0.01]">
        <div className="mx-auto max-w-[1320px]">
          <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_0.82fr] gap-10 lg:gap-14 items-center">
            {/* Visual side: Watchlist & Account 360 (Large) */}
            <div className="order-2 lg:order-1 relative">
              <div className="overflow-hidden rounded-2xl border border-slate-200/90 dark:border-white/[0.12] bg-white dark:bg-[#0F0E0C] shadow-2xl transition-all duration-300 hover:shadow-[0_25px_60px_-12px_rgba(201,76,30,0.18)]">
                <div className="relative overflow-hidden bg-slate-50 dark:bg-[#110F0D]">
                  <img
                    src="/Watchlist.png"
                    alt="Account 360 Watchlist and Intent Signals"
                    className="w-full object-cover block dark:hidden"
                  />
                  <img
                    src="/Watchlist-dark.png"
                    alt="Account 360 Watchlist and Intent Signals"
                    className="w-full object-cover hidden dark:block"
                  />

                  {/* Floating Tech Scanner Badge */}
                  <div
                    className="absolute bottom-4 right-4 w-[48%] rounded-xl overflow-hidden
                               bg-white
                               border border-slate-200/90 dark:border-white/[0.16]
                               ring-1 ring-slate-900/10 dark:ring-white/20
                               shadow-[0_22px_50px_-8px_rgba(0,0,0,0.35)]
                               transition-all duration-300 hover:scale-[1.03] hover:-translate-y-1"
                  >
                    <img
                      src="/tech-scanner.png"
                      alt="Tech stack scanner and buying signals"
                      className="w-full bg-white object-cover block dark:hidden"
                    />
                    <img
                      src="/tech-scanner-dark.png"
                      alt="Tech stack scanner and buying signals"
                      className="w-full bg-white object-cover hidden dark:block"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Copy side */}
            <div className="order-1 lg:order-2">
              <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ember-500">
                Account 360°
              </span>
              <h2 className="mt-2.5 font-bricolage text-[26px] sm:text-[34px] font-bold tracking-[-0.025em] leading-[1.18] text-slate-950 dark:text-white">
                Everything you need to understand an account, at a glance.
              </h2>
              <p className="mt-3 text-[15px] sm:text-[16px] leading-relaxed text-slate-600 dark:text-slate-300">
                Account 360° brings the information your team needs to understand an account into one connected view. Instead of opening multiple tools to piece together the story, your team can see the account, its signals, people and activity together.
              </p>

              <div className="mt-6 space-y-2.5">
                {[
                  {
                    title: 'Intent & Fit',
                    desc: 'Understand relevance and priority based on ICP fit, intent signals, and score.',
                  },
                  {
                    title: 'Buying Signals',
                    desc: 'See funding, hiring, technology changes, and events that create reasons to engage.',
                  },
                  {
                    title: 'Key Contacts',
                    desc: 'Find decision-makers with direct roles and verified contact details.',
                  },
                  {
                    title: 'Recent Activity',
                    desc: 'Track website visits, email engagement, and latest company news.',
                  },
                  {
                    title: 'Account Context',
                    desc: 'View ownership, revenue, campaigns, and tech stack alongside account history.',
                  },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-ember-500/10 text-ember-500">
                      <Check size={11} strokeWidth={3} />
                    </span>
                    <p className="text-[13.5px] leading-relaxed text-slate-700 dark:text-slate-300">
                      <strong className="font-semibold text-slate-950 dark:text-white">{item.title}</strong> — {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 5. VALUE FOR EVERY ROLE ════════════════════════════════════════ */}
      <section className="px-6 py-16 lg:py-24 border-b border-slate-200 dark:border-white/[0.08]">
        <div className="mx-auto max-w-[1320px]">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ember-500">
              Value for Every Role
            </span>
            <h2 className="mt-2.5 font-bricolage text-[28px] sm:text-[38px] font-bold tracking-[-0.025em] text-slate-950 dark:text-white">
              One account. Three workflows. One shared context.
            </h2>
            <p className="mt-3 text-[15.5px] text-slate-600 dark:text-slate-300">
              Account Intelligence gives every role the same account story, while helping each person make a different decision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* SDR Card */}
            <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.02] p-7 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[12px] font-bold uppercase tracking-wider text-ember-500">
                  SDR
                </span>
                <span className="rounded-full bg-ember-50 dark:bg-ember-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-ember-600 dark:text-ember-400">
                  Execution
                </span>
              </div>
              <h3 className="font-bricolage text-[20px] font-bold text-slate-950 dark:text-white">
                Know why you&apos;re reaching out
              </h3>
              <ul className="mt-5 space-y-3">
                {[
                  'See why an account is being prioritized',
                  'Understand the signals behind the account',
                  'Find relevant contacts',
                  'Personalize outreach with account context',
                ].map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2.5 text-[14px] text-slate-600 dark:text-slate-300">
                    <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-ember-500/10 text-ember-500">
                      <Check size={10} strokeWidth={3} />
                    </span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* SDR Head Card */}
            <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.02] p-7 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[12px] font-bold uppercase tracking-wider text-ember-500">
                  SDR Head
                </span>
                <span className="rounded-full bg-ember-50 dark:bg-ember-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-ember-600 dark:text-ember-400">
                  Strategy &amp; Focus
                </span>
              </div>
              <h3 className="font-bricolage text-[20px] font-bold text-slate-950 dark:text-white">
                Know where your team should focus
              </h3>
              <ul className="mt-5 space-y-3">
                {[
                  'See which accounts show high intent',
                  'Understand signals driving account priority',
                  'Complete visibility into each account engagement stage',
                ].map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2.5 text-[14px] text-slate-600 dark:text-slate-300">
                    <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-ember-500/10 text-ember-500">
                      <Check size={10} strokeWidth={3} />
                    </span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* AE Card */}
            <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.02] p-7 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[12px] font-bold uppercase tracking-wider text-ember-500">
                  AE
                </span>
                <span className="rounded-full bg-ember-50 dark:bg-ember-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-ember-600 dark:text-ember-400">
                  Handoff &amp; Meeting
                </span>
              </div>
              <h3 className="font-bricolage text-[20px] font-bold text-slate-950 dark:text-white">
                Know the account before the call
              </h3>
              <ul className="mt-5 space-y-3">
                {[
                  'Understand the broader account story',
                  'See relevant signals and recent activity',
                  'Use account and prospect context to make the conversation more relevant',
                ].map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2.5 text-[14px] text-slate-600 dark:text-slate-300">
                    <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-ember-500/10 text-ember-500">
                      <Check size={10} strokeWidth={3} />
                    </span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 6. TESTIMONIALS ═════════════════════════════════════════════════ */}
      <section className="px-6 py-16 lg:py-24 border-b border-slate-200 dark:border-white/[0.08] bg-sand-50/50 dark:bg-white/[0.01]">
        <div className="mx-auto max-w-[1200px]">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ember-500">
              Testimonials
            </span>
            <h2 className="mt-2.5 font-bricolage text-[28px] sm:text-[38px] font-bold tracking-[-0.025em] text-slate-950 dark:text-white">
              What teams say about Harvin
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Elena Rostova',
                role: 'Head of Sales Development',
                company: 'HyperScale Cloud',
                quote:
                  'Before Harvin, our SDRs spent 40% of their day digging through 5 different tabs for hiring signals and tech changes. Now Account 360 gives them the full context in seconds before dialing.',
                metric: '+48% faster prospect research',
              },
              {
                name: 'Marcus Vance',
                role: 'Senior SDR Specialist',
                company: 'FinStack Systems',
                quote:
                  "Having intent signals, tech changes, and previous conversation history right inside the account view is a game changer. I know exactly why I'm reaching out and which persona to contact.",
                metric: '3.2x higher reply rate',
              },
              {
                name: 'Claire Beauchamp',
                role: 'Director of Revenue Operations',
                company: 'Nexus AI',
                quote:
                  'Our AEs finally walk into SDR-booked meetings knowing the full background. The handoff friction between SDR and AE disappeared because both look at the exact same account story.',
                metric: 'Zero lost context in handoffs',
              },
            ].map((t) => (
              <div
                key={t.name}
                className="relative flex flex-col justify-between rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#110F0D] p-7 shadow-xs hover:border-ember-300 dark:hover:border-ember-500/40 transition-colors"
              >
                <div>
                  <span className="inline-block rounded-full bg-ember-50 text-ember-600 dark:bg-ember-500/10 dark:text-ember-400 px-3 py-1 text-[11px] font-semibold mb-4">
                    {t.metric}
                  </span>
                  <p className="text-[14.5px] leading-relaxed text-slate-700 dark:text-slate-300 italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>
                <div className="mt-6 pt-5 border-t border-slate-100 dark:border-white/10">
                  <p className="text-[14px] font-bold text-slate-900 dark:text-white">
                    {t.name}
                  </p>
                  <p className="text-[12px] text-slate-500 dark:text-slate-400">
                    {t.role} · <span className="text-slate-700 dark:text-slate-300 font-medium">{t.company}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 7. FAQS ══════════════════════════════════════════════════════════ */}
      <section className="px-6 py-16 lg:py-24 border-b border-slate-200 dark:border-white/[0.08]">
        <div className="mx-auto max-w-[900px]">
          <div className="text-center mb-12">
            <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ember-500">
              FAQs
            </span>
            <h2 className="mt-2.5 font-bricolage text-[28px] sm:text-[38px] font-bold tracking-[-0.025em] text-slate-950 dark:text-white">
              We thought you might ask
            </h2>
          </div>

          <div className="space-y-3">
            {[
              {
                q: 'What is Account Intelligence in Harvin?',
                a: 'Account Intelligence brings together company information, buying signals, contacts, previous interactions and recent activity so your team can understand an account before taking action.',
              },
              {
                q: 'How does Harvin decide which accounts deserve attention?',
                a: 'Harvin tracks relevant intent signals for each account and combines them into a weighted intent score. The score helps prioritize accounts, while the underlying signals provide the context behind that priority.',
              },
              {
                q: 'What signals does Harvin track?',
                a: 'Harvin can track signals such as funding, hiring and technology changes, along with other relevant changes associated with an account.',
              },
              {
                q: 'What is Account 360?',
                a: 'Account 360 is the consolidated view of an account in Harvin. It brings together the company profile, account signals, contacts, previous interactions and recent activity so users can understand the account in one place.',
              },
              {
                q: 'Who can use Account Intelligence?',
                a: 'Account Intelligence is available across the SDR, SDR Head and AE workflows. Each role uses the same account context for a different purpose, from prioritizing outreach to managing account coverage and preparing for meetings.',
              },
            ].map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={faq.q}
                  className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.02] overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="flex w-full items-center justify-between p-5 text-left transition-colors hover:text-ember-500"
                  >
                    <span className="text-[15.5px] font-bold text-slate-900 dark:text-white pr-4">
                      {idx + 1}. {faq.q}
                    </span>
                    <ChevronDown
                      size={18}
                      className={`shrink-0 text-slate-400 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-ember-500' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-[14.5px] leading-relaxed text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-white/5 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ 8. FINAL CTA ═════════════════════════════════════════════════════ */}
      <section className="relative px-6 py-20 lg:py-28 overflow-hidden bg-sand-100 dark:bg-slate-950">
        <div className="mx-auto max-w-[1100px] text-center">
          <h2 className="font-bricolage text-[32px] sm:text-[46px] font-bold tracking-[-0.03em] text-slate-950 dark:text-white">
            Start every conversation with the full picture.
          </h2>
          <p className="mt-4 text-[17px] sm:text-[19px] text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Bring signals, context and account activity together with Harvin.
          </p>

          <form onSubmit={handleDemoSubmit} className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-lg mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="What's your work email?"
              className="w-full sm:flex-1 rounded-xl border border-slate-300 dark:border-white/20 bg-white dark:bg-white/10 px-4 py-3.5 text-[15px] text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-ember-500"
            />
            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-ember-500 px-6 py-3.5 text-[15px] font-semibold text-white shadow-sm transition-all duration-200 hover:bg-ember-600 active:scale-95 shrink-0"
            >
              Book a demo <ArrowRight size={16} />
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
