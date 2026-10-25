'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  BarChart3,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Headphones,
  Mail,
  MessageSquare,
  Phone,
  PhoneCall,
  Radio,
  Send,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Workflow,
  Zap,
} from 'lucide-react';
import { useModal } from '@/components/ModalContext';

/* ── Testimonials Data ────────────────────────────────────────────────────── */
const TESTIMONIALS = [
  {
    quote:
      'Harvin brought a level of precision to our outreach that complemented our in-house SDR team well. Their multi-channel sequencing and contextual calling ensured we reached the right accounts when intent was highest.',
    name: 'Deepak Lamba',
    role: 'Chief Revenue Officer',
    org: 'CleverTap',
    logo: '/logos/clevertap.svg',
    image: '/testimonials/deepak-lamba.jpg',
  },
  {
    quote:
      'Having email, calling, and previous prospect history unified in one workspace has eliminated context switching for our reps. Our team connects with relevant key decision-makers faster than ever before.',
    name: 'Argha Karmakar',
    role: 'General Manager — Marketing',
    org: 'MYND',
    logo: '/logos/mynd-dark.svg',
    image: '/testimonials/argha-karmakar.jpg',
  },
  {
    quote:
      'The ability to log call outcomes in one click and keep talking points shaped around live buying signals gives our SDRs tremendous confidence on cold calls.',
    name: 'Harsh Sharma',
    role: 'Senior Manager',
    org: 'VWO',
    logo: '/logos/vwo.svg',
    image: '/testimonials/vwo.png',
  },
];

/* ── FAQ Data ─────────────────────────────────────────────────────────────── */
const FAQS = [
  {
    q: "What is Harvin's sales engagement and outreach capability?",
    a: 'Harvin brings email, LinkedIn and calling into one SDR workspace, while keeping outreach connected to account signals, prospect context, conversations, tasks and meetings.',
  },
  {
    q: 'Can I run multichannel sales sequences in Harvin?',
    a: 'Yes. Harvin supports email and LinkedIn campaigns, reusable messaging and campaign management from the same workspace.',
  },
  {
    q: 'Does Harvin have a sales dialer?',
    a: "Yes. Harvin's dialer lets SDRs call prospects while viewing account and prospect context, previous interactions and relevant signals. Reps can capture call outcomes and next steps without leaving the workflow.",
  },
  {
    q: 'How is Harvin different from a sales engagement platform?',
    a: 'Harvin includes sales engagement capabilities but connects them to a broader SDR operating workflow. Outreach sits alongside account intelligence, prioritization, team management, meetings, AE handoffs and outcomes.',
  },
  {
    q: 'Does Harvin replace my CRM?',
    a: 'No. Harvin works alongside your CRM. The CRM remains the system of record, while Harvin connects the intelligence, outreach, tasks, meetings and workflows around the SDR operation.',
  },
];

export default function OutreachClient() {
  const { openModal } = useModal();
  const [emailInput, setEmailInput] = useState('');
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  const activeTestimonial = TESTIMONIALS[testimonialIdx];

  const handleCtaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    openModal('talk-to-sales');
  };

  return (
    <div className="text-slate-900 dark:text-white">
      {/* ═══ 1. HERO ═════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden border-b border-slate-200 dark:border-white/[0.08] px-6 pt-24 pb-20 lg:pt-32 lg:pb-28">
        {/* Ambient radial glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-[450px] w-full max-w-[1240px] bg-[radial-gradient(ellipse_at_top,rgba(201,76,30,0.10),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(201,76,30,0.18),transparent_70%)]"
        />

        <div className="relative mx-auto max-w-[1200px] text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-ember-200 bg-ember-50/70 px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-ember-600 dark:border-ember-500/30 dark:bg-ember-500/10 dark:text-ember-400 mb-6">
            <Radio size={13} className="text-ember-500 animate-pulse" />
            Sales Engagement
          </span>

          <h1 className="font-bricolage text-[clamp(34px,5vw,62px)] font-bold leading-[1.08] tracking-[-0.03em] text-slate-950 dark:text-white max-w-4xl mx-auto">
            Engage across channels.
            <br />
            <span className="text-ember-500">Keep every interaction connected</span> to the account.
          </h1>

          <p className="mt-6 text-[18px] sm:text-[20px] leading-[1.65] text-slate-600 dark:text-slate-300 max-w-3xl mx-auto font-normal">
            Run multi-channel outreach including email and call from one workspace, with the account context, conversation history and next steps you need at every stage of outreach.
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
              href="#campaigns"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 dark:border-white/15 bg-white dark:bg-white/5 px-6 py-3.5 text-[15px] font-semibold text-slate-800 dark:text-white transition-all duration-200 hover:bg-slate-100 dark:hover:bg-white/10 hover:border-slate-400 active:scale-95"
            >
              Explore the workflow
            </a>
          </div>
        </div>
      </section>

      {/* ═══ 2. CAMPAIGNS ════════════════════════════════════════════════════ */}
      <section id="campaigns" className="scroll-mt-24 px-6 py-16 lg:py-24 border-b border-slate-200 dark:border-white/[0.08] bg-white/50 dark:bg-black/20">
        <div className="mx-auto max-w-[1320px]">
          <div className="grid grid-cols-1 lg:grid-cols-[0.82fr_1.35fr] gap-10 lg:gap-14 items-center">
            {/* Copy side */}
            <div>
              <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ember-500">
                Campaigns
              </span>
              <h2 className="mt-2.5 font-bricolage text-[26px] sm:text-[34px] font-bold tracking-[-0.025em] leading-[1.18] text-slate-950 dark:text-white">
                From account signals to campaign execution.
              </h2>
              <p className="mt-3 text-[15px] sm:text-[16px] leading-relaxed text-slate-600 dark:text-slate-300">
                Everything from sequencing to replies to campaign performance stays connected to the account context your team already works with.
              </p>

              <div className="mt-6 space-y-3">
                {[
                  {
                    title: 'Email sequencing',
                    desc: 'Build personalized campaigns across email and LinkedIn from surfaced signals without switching tools.',
                  },
                  {
                    title: 'Reusable messaging templates',
                    desc: 'Save proven email, LinkedIn, and cold call scripts so reps move faster while keeping messaging consistent.',
                  },
                  {
                    title: 'Sales inbox reply management',
                    desc: 'Bring campaign conversations into one inbox so you respond without losing account or prospect context.',
                  },
                  {
                    title: 'Outcome & campaign analytics',
                    desc: 'Track campaign activity, reply rates, and booked meetings alongside the SDR workflows behind them.',
                  },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-ember-500/10 text-ember-500">
                      <Check size={11} strokeWidth={3} />
                    </span>
                    <p className="text-[14px] leading-relaxed text-slate-700 dark:text-slate-300">
                      <strong className="font-semibold text-slate-950 dark:text-white">{item.title}</strong> — {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual side: Sequences & Campaign Preview (Large) */}
            <div className="relative">
              <div className="overflow-hidden rounded-2xl border border-slate-200/90 dark:border-white/[0.12] bg-white dark:bg-[#0F0E0C] shadow-2xl transition-all duration-300 hover:shadow-[0_25px_60px_-12px_rgba(201,76,30,0.18)]">
                <div className="relative overflow-hidden bg-slate-50 dark:bg-[#110F0D]">
                  <img
                    src="/dashboard-preview.png"
                    alt="From account signals to campaign execution dashboard"
                    className="w-full object-cover object-top block dark:hidden"
                  />
                  <img
                    src="/dashboard-preview-dark.png"
                    alt="From account signals to campaign execution dashboard"
                    className="w-full object-cover object-top hidden dark:block"
                  />
                  <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 3. DIALER ═══════════════════════════════════════════════════════ */}
      <section id="dialer" className="scroll-mt-24 px-6 py-16 lg:py-24 border-b border-slate-200 dark:border-white/[0.08]">
        <div className="mx-auto max-w-[1320px]">
          <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_0.82fr] gap-10 lg:gap-14 items-center">
            {/* Visual side: Calling console (Large) */}
            <div className="order-2 lg:order-1 relative">
              <div className="overflow-hidden rounded-2xl border border-slate-200/90 dark:border-white/[0.12] bg-white dark:bg-[#0F0E0C] shadow-2xl transition-all duration-300 hover:shadow-[0_25px_60px_-12px_rgba(201,76,30,0.18)]">
                <div className="relative overflow-hidden bg-slate-50 dark:bg-[#110F0D]">
                  <img
                    src="/calling_page.png"
                    alt="AI Cold Call Dialer"
                    className="w-full object-cover"
                  />

                  {/* Floating queue badge */}
                  <div
                    className="absolute bottom-2.5 left-[12%] w-[33%] rounded-xl overflow-hidden
                               bg-white
                               border border-slate-200/90 dark:border-white/[0.16]
                               ring-1 ring-slate-900/10 dark:ring-white/20
                               shadow-[0_20px_45px_-8px_rgba(0,0,0,0.30)]
                               transition-all duration-300 hover:scale-[1.03] hover:-translate-y-1"
                  >
                    <img
                      src="/calling_quee.png"
                      alt="Today's calling queue"
                      className="w-full bg-white object-cover"
                    />
                  </div>

                  {/* Floating script overlay */}
                  <div
                    className="absolute bottom-6 right-3 w-[49%] rounded-xl overflow-hidden
                               bg-white
                               border border-slate-200/90 dark:border-white/[0.16]
                               ring-1 ring-slate-900/10 dark:ring-white/20
                               shadow-[0_22px_50px_-8px_rgba(0,0,0,0.35)]
                               transition-all duration-300 hover:scale-[1.03] hover:-translate-y-1"
                  >
                    <img
                      src="/script_calling.png"
                      alt="Suggested script talking points"
                      className="w-full bg-white object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Copy side */}
            <div className="order-1 lg:order-2">
              <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ember-500">
                Dialer
              </span>
              <h2 className="mt-2.5 font-bricolage text-[26px] sm:text-[34px] font-bold tracking-[-0.025em] leading-[1.18] text-slate-950 dark:text-white">
                Make every call with the full account story in view.
              </h2>
              <p className="mt-3 text-[15px] sm:text-[16px] leading-relaxed text-slate-600 dark:text-slate-300">
                Calling shouldn't mean starting from a blank screen. Harvin brings the account, prospect context and previous conversations into the dialer before reps speak.
              </p>

              <div className="mt-6 space-y-2.5">
                {[
                  {
                    title: 'Power dial through your list',
                    desc: 'Move from one call to the next without stopping to set up each one.',
                  },
                  {
                    title: 'Live account intelligence',
                    desc: 'See buying signals, prospect details, and recent activity before you dial.',
                  },
                  {
                    title: 'Previous conversations at hand',
                    desc: 'Review past emails, LinkedIn touches, and previous calls in one place.',
                  },
                  {
                    title: 'Contextual saved call scripts',
                    desc: 'Start with talking points shaped around account and prospect context.',
                  },
                  {
                    title: '1-click connected outcomes',
                    desc: 'Log outcomes, capture next steps, and keep call history attached to the contact.',
                  },
                  {
                    title: 'Transcripts & conversational analytics',
                    desc: 'Automated call recording and transcription to review patterns and improve outreach.',
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

      {/* ═══ 4. EMAIL ════════════════════════════════════════════════════════ */}
      <section id="email" className="scroll-mt-24 px-6 py-16 lg:py-24 border-b border-slate-200 dark:border-white/[0.08] bg-sand-50/50 dark:bg-white/[0.01]">
        <div className="mx-auto max-w-[1320px]">
          <div className="grid grid-cols-1 lg:grid-cols-[0.82fr_1.35fr] gap-10 lg:gap-14 items-center">
            {/* Copy side */}
            <div>
              <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ember-500">
                Email
              </span>
              <h2 className="mt-2.5 font-bricolage text-[26px] sm:text-[34px] font-bold tracking-[-0.025em] leading-[1.18] text-slate-950 dark:text-white">
                Manage sales email and replies from one inbox.
              </h2>
              <p className="mt-3 text-[15px] sm:text-[16px] leading-relaxed text-slate-600 dark:text-slate-300">
                Connect your campaign mailbox and personal email to Harvin. Prospect replies and everyday work email appear at one place, each with complete account history.
              </p>

              <div className="mt-6 space-y-3">
                {[
                  {
                    title: 'Campaign email',
                    desc: 'Manage replies from outbound campaigns alongside the account and contact they belong to.',
                  },
                  {
                    title: 'Personal inbox',
                    desc: 'Bring individual prospect conversations into Harvin so important replies and follow-ups never get buried.',
                  },
                  {
                    title: 'Move from reply to action',
                    desc: 'Turn conversations into follow-up tasks or booked meetings without breaking the workflow.',
                  },
                  {
                    title: 'Keep an eye on mailbox health',
                    desc: 'Check sending mailbox availability and deliverability before any campaign goes out.',
                  },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-ember-500/10 text-ember-500">
                      <Check size={11} strokeWidth={3} />
                    </span>
                    <p className="text-[14px] leading-relaxed text-slate-700 dark:text-slate-300">
                      <strong className="font-semibold text-slate-950 dark:text-white">{item.title}</strong> — {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual side: Inbox preview (Large) */}
            <div className="relative">
              <div className="overflow-hidden rounded-2xl border border-slate-200/90 dark:border-white/[0.12] bg-white dark:bg-[#0F0E0C] shadow-2xl transition-all duration-300 hover:shadow-[0_25px_60px_-12px_rgba(201,76,30,0.18)]">
                <div className="relative overflow-hidden bg-slate-50 dark:bg-[#110F0D]">
                  <img
                    src="/email_inbox2.png"
                    alt="Unified sales email inbox preview"
                    className="w-full object-cover"
                  />

                  {/* Floating overlay: Email Chat preview */}
                  <div
                    className="absolute bottom-4 right-3.5 w-[46%] rounded-xl overflow-hidden
                               bg-white
                               border border-slate-200/90 dark:border-white/[0.16]
                               ring-1 ring-slate-900/10 dark:ring-white/20
                               shadow-[0_22px_50px_-8px_rgba(0,0,0,0.35)]
                               transition-all duration-300 hover:scale-[1.03] hover:-translate-y-1"
                  >
                    <img
                      src="/email_chat.png"
                      alt="Campaign conversation and prospect reply preview"
                      className="w-full bg-white object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 5. VALUE FOR EVERY ROLE ════════════════════════════════════════ */}
      <section className="px-6 py-20 lg:py-28 border-b border-slate-200 dark:border-white/[0.08]">
        <div className="mx-auto max-w-[1200px]">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ember-500">
              Value for Every Role
            </span>
            <h2 className="mt-3 font-bricolage text-[32px] sm:text-[44px] font-bold tracking-[-0.025em] text-slate-950 dark:text-white">
              Built for how SDR teams actually work
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* SDR Card */}
            <div className="rounded-3xl border border-slate-200 bg-sand-50 p-8 dark:border-white/[0.08] dark:bg-white/[0.02] shadow-sm">
              <span className="inline-block rounded-full bg-ember-50 px-3 py-1 text-[12px] font-bold text-ember-600 dark:bg-ember-500/15 dark:text-ember-300">
                SDR
              </span>
              <h3 className="mt-3 font-bricolage text-[22px] font-bold text-slate-950 dark:text-white">
                Spend less time switching. More time engaging.
              </h3>
              <ul className="mt-6 space-y-3.5">
                {[
                  'Keep replies, calls and follow-ups connected.',
                  'Understand the campaign performance',
                  'Find the right time to reach a persona',
                ].map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2.5 text-[15px] text-slate-700 dark:text-slate-300">
                    <Check size={16} className="mt-1 shrink-0 text-ember-500" strokeWidth={2.8} />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* SDR Head Card */}
            <div className="rounded-3xl border border-slate-200 bg-sand-50 p-8 dark:border-white/[0.08] dark:bg-white/[0.02] shadow-sm">
              <span className="inline-block rounded-full bg-ember-50 px-3 py-1 text-[12px] font-bold text-ember-600 dark:bg-ember-500/15 dark:text-ember-300">
                SDR Head
              </span>
              <h3 className="mt-3 font-bricolage text-[22px] font-bold text-slate-950 dark:text-white">
                See how outreach is performing across the team.
              </h3>
              <ul className="mt-6 space-y-3.5">
                {[
                  'Analyze campaign reach and Lead stats.',
                  'Understand what template is working well',
                  'Track outcomes like open rate, reply rate, etc.',
                ].map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2.5 text-[15px] text-slate-700 dark:text-slate-300">
                    <Check size={16} className="mt-1 shrink-0 text-ember-500" strokeWidth={2.8} />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Central Callout Banner */}
          <div className="mt-12 rounded-2xl border border-ember-500/20 bg-gradient-to-r from-ember-500/[0.06] via-sand-50 to-ember-500/[0.06] p-7 text-center dark:from-ember-950/20 dark:via-white/[0.02] dark:to-ember-950/20 shadow-sm max-w-4xl mx-auto">
            <p className="text-[17px] sm:text-[19px] font-medium leading-[1.65] text-slate-900 dark:text-white">
              <strong className="text-ember-600 dark:text-ember-400 font-bold">
                See what changes when execution and context live together:
              </strong>{' '}
              Harvin connects outreach with the information around it, giving every role a clearer view of what happened, what matters and what comes next.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ 6. TESTIMONIALS ═════════════════════════════════════════════════ */}
      <section className="px-6 py-20 lg:py-28 border-b border-slate-200 dark:border-white/[0.08] bg-sand-50/50 dark:bg-white/[0.01]">
        <div className="mx-auto max-w-[1100px]">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ember-500">
              Testimonials
            </span>
            <h2 className="mt-3 font-bricolage text-[32px] sm:text-[42px] font-bold tracking-[-0.025em] text-slate-950 dark:text-white">
              What teams say about Harvin
            </h2>
          </div>

          <div className="rounded-3xl border border-slate-200/90 dark:border-white/[0.08] bg-white dark:bg-slate-900/60 p-8 sm:p-12 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b border-slate-100 dark:border-white/[0.06]">
              <div className="flex items-center gap-4">
                <img
                  src={activeTestimonial.image}
                  alt={activeTestimonial.name}
                  className="h-14 w-14 rounded-full object-cover border border-slate-200 dark:border-white/10"
                />
                <div>
                  <h3 className="text-[18px] font-bold text-slate-950 dark:text-white">
                    {activeTestimonial.name}
                  </h3>
                  <p className="text-[13.5px] text-slate-500 dark:text-slate-400">
                    {activeTestimonial.role}
                  </p>
                </div>
              </div>

              {activeTestimonial.logo && (
                <img
                  src={activeTestimonial.logo}
                  alt={activeTestimonial.org}
                  className="h-7 w-auto object-contain opacity-80"
                />
              )}
            </div>

            <p className="mt-8 text-[18px] sm:text-[21px] leading-[1.65] text-slate-700 dark:text-slate-200 font-normal italic">
              &ldquo;{activeTestimonial.quote}&rdquo;
            </p>

            <div className="mt-8 flex items-center justify-between pt-6 border-t border-slate-100 dark:border-white/[0.06]">
              <span className="text-[13px] font-medium text-slate-400">
                {testimonialIdx + 1} of {TESTIMONIALS.length}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Previous testimonial"
                  onClick={() =>
                    setTestimonialIdx((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1))
                  }
                  className="grid h-10 w-10 place-items-center rounded-full border border-slate-300 dark:border-white/15 text-slate-700 dark:text-slate-300 hover:border-ember-500 hover:text-ember-500 transition-colors"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  aria-label="Next testimonial"
                  onClick={() =>
                    setTestimonialIdx((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1))
                  }
                  className="grid h-10 w-10 place-items-center rounded-full border border-slate-300 dark:border-white/15 text-slate-700 dark:text-slate-300 hover:border-ember-500 hover:text-ember-500 transition-colors"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 7. FAQS ═════════════════════════════════════════════════════════ */}
      <section className="px-6 py-20 lg:py-28 border-b border-slate-200 dark:border-white/[0.08]">
        <div className="mx-auto max-w-[1100px]">
          <div className="mb-12 max-w-2xl">
            <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ember-500">
              FAQs
            </span>
            <h2 className="mt-3 font-bricolage text-[32px] sm:text-[42px] font-bold tracking-[-0.025em] text-slate-950 dark:text-white">
              A little more clarity
            </h2>
          </div>

          <div className="divide-y divide-slate-200 border-y border-slate-200 dark:divide-white/[0.08] dark:border-white/[0.08]">
            {FAQS.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div key={faq.q} className="py-5 sm:py-6">
                  <button
                    type="button"
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="flex w-full items-start justify-between gap-4 text-left focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="flex items-center gap-3">
                      <span className="font-mono text-[13px] font-bold text-ember-500">
                        {String(idx + 1).padStart(2, '0')}.
                      </span>
                      <span className="text-[17px] sm:text-[18px] font-bold text-slate-900 dark:text-white">
                        {faq.q}
                      </span>
                    </span>
                    <span
                      className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-slate-300 dark:border-white/20 transition-transform duration-200 ${
                        isOpen
                          ? 'rotate-180 bg-ember-500 border-ember-500 text-white'
                          : 'text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      <ChevronDown size={14} strokeWidth={2.5} />
                    </span>
                  </button>

                  {isOpen && (
                    <div className="mt-3.5 pl-8 pr-4 sm:pr-8 text-[15.5px] leading-[1.75] text-slate-600 dark:text-slate-300 animate-fade-up">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ 8. FINAL CTA ════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden px-6 py-20 lg:py-28 bg-[#0C0B09] text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-[350px] w-full max-w-[1000px] bg-[radial-gradient(ellipse_at_top,rgba(201,76,30,0.25),transparent_70%)]"
        />

        <div className="relative mx-auto max-w-[840px] text-center">
          <h2 className="font-bricolage text-[32px] sm:text-[46px] font-bold tracking-[-0.025em] leading-[1.12]">
            Give every outreach the context behind it.
          </h2>

          <p className="mt-5 text-[17px] sm:text-[19px] leading-relaxed text-white/70 max-w-2xl mx-auto">
            Bring account intelligence, previous interactions and prospect context into every email, message and call.
          </p>

          <form
            onSubmit={handleCtaSubmit}
            className="mt-9 flex w-full max-w-[480px] mx-auto items-center gap-2 rounded-full bg-white p-1.5 pl-5 shadow-2xl"
          >
            <input
              type="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="What's your work email?"
              className="min-w-0 flex-1 bg-transparent text-[14.5px] text-slate-800 placeholder:text-slate-400 outline-none"
            />
            <button
              type="submit"
              className="flex flex-shrink-0 items-center gap-1.5 rounded-full px-6 py-3 text-[14px] font-semibold text-white bg-ember-500 shadow-md hover:bg-ember-600 transition-colors whitespace-nowrap active:scale-95"
            >
              Book a demo
              <ArrowRight size={15} />
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
