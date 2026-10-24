'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  BarChart3,
  Calendar,
  Check,
  ChevronDown,
  Compass,
  Layers,
  Mail,
  MessageSquare,
  Phone,
  Radio,
  Search,
  Sparkles,
  Target,
  Users,
  Workflow,
  Zap,
} from 'lucide-react';
import { useModal } from '@/components/ModalContext';

export default function ProductTourClient() {
  const { openModal } = useModal();
  const [activeChannel, setActiveChannel] = useState<'email' | 'dialer'>('email');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaq((prev) => (prev === idx ? null : idx));
  };

  const scrollToStep = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
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
            <Compass size={13} className="text-ember-500" />
            Product Tour
          </span>

          <h1 className="font-bricolage text-[clamp(34px,5vw,62px)] font-bold leading-[1.08] tracking-[-0.03em] text-slate-950 dark:text-white max-w-4xl mx-auto">
            See how the SDR operation <span className="text-ember-500">comes together</span>
          </h1>

          <p className="mt-6 text-[18px] sm:text-[20px] leading-[1.65] text-slate-600 dark:text-slate-300 max-w-3xl mx-auto font-normal">
            See how work moves seamlessly between SDRs, SDR Heads, and AEs, from first signal to final outcome.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#how-harvin-works"
              className="inline-flex items-center gap-2 rounded-xl bg-ember-500 px-6 py-3.5 text-[15px] font-semibold text-white shadow-sm transition-all duration-200 hover:bg-ember-600 hover:shadow-md active:scale-95"
            >
              Take the tour <ArrowRight size={16} />
            </a>

            <button
              type="button"
              onClick={() => openModal('talk-to-sales')}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 dark:border-white/15 bg-white dark:bg-white/5 px-6 py-3.5 text-[15px] font-semibold text-slate-800 dark:text-white transition-all duration-200 hover:bg-slate-100 dark:hover:bg-white/10 hover:border-slate-400 active:scale-95"
            >
              Book a Demo
            </button>
          </div>
        </div>
      </section>

      {/* ═══ 2. WHO IS IT FOR ═════════════════════════════════════════════════ */}
      <section className="px-6 py-16 lg:py-24 border-b border-slate-200 dark:border-white/[0.08] bg-white/50 dark:bg-black/20">
        <div className="mx-auto max-w-[1320px]">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ember-500">
              Who is it for
            </span>
            <h2 className="mt-2.5 font-bricolage text-[28px] sm:text-[38px] font-bold tracking-[-0.025em] text-slate-950 dark:text-white">
              Every role starts with a different question.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* SDR Head */}
            <div className="flex flex-col justify-between rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#110F0D] p-7 shadow-xs hover:border-ember-300 dark:hover:border-ember-500/40 transition-colors">
              <div>
                <span className="text-[12px] font-bold uppercase tracking-wider text-ember-500">
                  SDR Head
                </span>
                <h3 className="mt-3 font-bricolage text-[22px] font-bold text-slate-950 dark:text-white leading-snug">
                  Where does my team need me?
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-slate-600 dark:text-slate-400">
                  Get full visibility into team performance, account coverage, meeting quality, and where coaching moves the needle.
                </p>
              </div>
              <div className="mt-6 pt-5 border-t border-slate-100 dark:border-white/10">
                <button
                  type="button"
                  onClick={() => scrollToStep('step-08')}
                  className="inline-flex items-center gap-2 text-[14px] font-semibold text-ember-500 hover:text-ember-600 transition-colors"
                >
                  Explore <ArrowRight size={14} />
                </button>
              </div>
            </div>

            {/* SDR */}
            <div className="flex flex-col justify-between rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#110F0D] p-7 shadow-xs hover:border-ember-300 dark:hover:border-ember-500/40 transition-colors">
              <div>
                <span className="text-[12px] font-bold uppercase tracking-wider text-ember-500">
                  SDR
                </span>
                <h3 className="mt-3 font-bricolage text-[22px] font-bold text-slate-950 dark:text-white leading-snug">
                  What should I do next?
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-slate-600 dark:text-slate-400">
                  Prioritize high-fit accounts, see why now, and execute phone, email, and LinkedIn outreach with complete context.
                </p>
              </div>
              <div className="mt-6 pt-5 border-t border-slate-100 dark:border-white/10">
                <button
                  type="button"
                  onClick={() => scrollToStep('step-01')}
                  className="inline-flex items-center gap-2 text-[14px] font-semibold text-ember-500 hover:text-ember-600 transition-colors"
                >
                  Explore <ArrowRight size={14} />
                </button>
              </div>
            </div>

            {/* AE */}
            <div className="flex flex-col justify-between rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#110F0D] p-7 shadow-xs hover:border-ember-300 dark:hover:border-ember-500/40 transition-colors">
              <div>
                <span className="text-[12px] font-bold uppercase tracking-wider text-ember-500">
                  AE
                </span>
                <h3 className="mt-3 font-bricolage text-[22px] font-bold text-slate-950 dark:text-white leading-snug">
                  What happened, and how do I move it forward?
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-slate-600 dark:text-slate-400">
                  Start meetings with SDR discovery, signals, and past conversations in view, and convert discussions into opportunities.
                </p>
              </div>
              <div className="mt-6 pt-5 border-t border-slate-100 dark:border-white/10">
                <button
                  type="button"
                  onClick={() => scrollToStep('step-05')}
                  className="inline-flex items-center gap-2 text-[14px] font-semibold text-ember-500 hover:text-ember-600 transition-colors"
                >
                  Explore <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 3. HOW HARVIN WORKS (8 STEPS) ════════════════════════════════════ */}
      <section id="how-harvin-works" className="scroll-mt-24 px-6 py-20 lg:py-28 border-b border-slate-200 dark:border-white/[0.08]">
        <div className="mx-auto max-w-[1320px]">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ember-500">
              How Harvin Works
            </span>
            <h2 className="mt-2.5 font-bricolage text-[32px] sm:text-[44px] font-bold tracking-[-0.03em] text-slate-950 dark:text-white">
              One connected workspace brings the answers together.
            </h2>
            <p className="mt-3 text-[16px] sm:text-[18px] text-slate-600 dark:text-slate-300">
              Follow the steps below to understand how every step is connected as an account moves through the sales process inside Harvin.
            </p>
          </div>

          <div className="space-y-24 lg:space-y-32">
            {/* ── STEP 01 ───────────────────────────────────────────────────── */}
            <div id="step-01" className="scroll-mt-28 grid grid-cols-1 lg:grid-cols-[0.82fr_1.35fr] gap-10 lg:gap-14 items-center">
              <div>
                <span className="inline-block rounded-full bg-ember-50 dark:bg-ember-500/10 px-3 py-1 text-[11px] font-bold text-ember-600 dark:text-ember-400 mb-3">
                  Step 01
                </span>
                <h3 className="font-bricolage text-[26px] sm:text-[34px] font-bold text-slate-950 dark:text-white leading-[1.18]">
                  Prioritize accounts using buying signals.
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">
                  Harvin brings account signals, context and activity together so SDRs can see which accounts deserve attention and why.
                </p>
                <p className="mt-3 text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">
                  Funding, hiring, technology changes and other relevant signals help turn a large account pool into a focused workday. SDR Heads can also push accounts into this priority list based on their judgement.
                </p>
              </div>

              {/* Visual */}
              <div className="relative">
                <div className="overflow-hidden rounded-2xl border border-slate-200/90 dark:border-white/[0.12] bg-white dark:bg-[#0F0E0C] shadow-2xl transition-all duration-300 hover:shadow-[0_25px_60px_-12px_rgba(201,76,30,0.18)]">
                  <div className="relative overflow-hidden bg-slate-50 dark:bg-[#110F0D]">
                    <img
                      src="/Watchlist.png"
                      alt="SDR Priority Accounts and Buying Signals"
                      className="w-full object-cover block dark:hidden"
                    />
                    <img
                      src="/Watchlist-dark.png"
                      alt="SDR Priority Accounts and Buying Signals"
                      className="w-full object-cover hidden dark:block"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* ── STEP 02 ───────────────────────────────────────────────────── */}
            <div id="step-02" className="scroll-mt-28 grid grid-cols-1 lg:grid-cols-[1.35fr_0.82fr] gap-10 lg:gap-14 items-center">
              {/* Visual */}
              <div className="order-2 lg:order-1 relative">
                <div className="overflow-hidden rounded-2xl border border-slate-200/90 dark:border-white/[0.12] bg-white dark:bg-[#0F0E0C] shadow-2xl transition-all duration-300 hover:shadow-[0_25px_60px_-12px_rgba(201,76,30,0.18)]">
                  <div className="relative overflow-hidden bg-slate-50 dark:bg-[#110F0D]">
                    <img
                      src="/Marketintell.png"
                      alt="Account 360 view"
                      className="w-full object-cover block dark:hidden"
                    />
                    <img
                      src="/marketintell-dark.png"
                      alt="Account 360 view"
                      className="w-full object-cover hidden dark:block"
                    />
                  </div>
                </div>
              </div>

              {/* Copy */}
              <div className="order-1 lg:order-2">
                <span className="inline-block rounded-full bg-ember-50 dark:bg-ember-500/10 px-3 py-1 text-[11px] font-bold text-ember-600 dark:text-ember-400 mb-3">
                  Step 02
                </span>
                <h3 className="font-bricolage text-[26px] sm:text-[34px] font-bold text-slate-950 dark:text-white leading-[1.18]">
                  Understand every account with Account 360°
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">
                  Account 360° brings company context, buying signals, relevant people and previous interactions together in one place.
                </p>
                <p className="mt-3 text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">
                  Understand why the account matters now, who to contact and what has already happened before you reach out.
                </p>
              </div>
            </div>

            {/* ── STEP 03 ───────────────────────────────────────────────────── */}
            <div id="step-03" className="scroll-mt-28 grid grid-cols-1 lg:grid-cols-[0.82fr_1.35fr] gap-10 lg:gap-14 items-center">
              <div>
                <span className="inline-block rounded-full bg-ember-50 dark:bg-ember-500/10 px-3 py-1 text-[11px] font-bold text-ember-600 dark:text-ember-400 mb-3">
                  Step 03
                </span>
                <h3 className="font-bricolage text-[26px] sm:text-[34px] font-bold text-slate-950 dark:text-white leading-[1.18]">
                  Run multichannel sales outreach.
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">
                  Reach out without losing the context you just built. Email, LinkedIn and calling stay connected to the account and contact, so you can execute outreach and capture the next step without jumping between disconnected workflows.
                </p>

                {/* Interactive Channel Switcher */}
                <div className="mt-6 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveChannel('email')}
                    className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-[13px] font-semibold transition-all ${
                      activeChannel === 'email'
                        ? 'bg-ember-500 text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    <Mail size={15} /> Email Sequence
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveChannel('dialer')}
                    className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-[13px] font-semibold transition-all ${
                      activeChannel === 'dialer'
                        ? 'bg-ember-500 text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    <Phone size={15} /> Cold Call Dialer
                  </button>
                </div>
              </div>

              {/* Visual with interactive toggle */}
              <div className="relative">
                <div className="overflow-hidden rounded-2xl border border-slate-200/90 dark:border-white/[0.12] bg-white dark:bg-[#0F0E0C] shadow-2xl transition-all duration-300 hover:shadow-[0_25px_60px_-12px_rgba(201,76,30,0.18)]">
                  <div className="relative overflow-hidden bg-slate-50 dark:bg-[#110F0D]">
                    {activeChannel === 'email' ? (
                      <img
                        src="/email_inbox2.png"
                        alt="Email outreach execution"
                        className="w-full object-cover animate-in fade-in duration-300"
                      />
                    ) : (
                      <img
                        src="/calling_page.png"
                        alt="Sales dialer outreach execution"
                        className="w-full object-cover animate-in fade-in duration-300"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* ── STEP 04 ───────────────────────────────────────────────────── */}
            <div id="step-04" className="scroll-mt-28 grid grid-cols-1 lg:grid-cols-[1.35fr_0.82fr] gap-10 lg:gap-14 items-center">
              {/* Visual */}
              <div className="order-2 lg:order-1 relative">
                <div className="overflow-hidden rounded-2xl border border-slate-200/90 dark:border-white/[0.12] bg-white dark:bg-[#0F0E0C] shadow-2xl transition-all duration-300 hover:shadow-[0_25px_60px_-12px_rgba(201,76,30,0.18)]">
                  <div className="relative overflow-hidden bg-slate-50 dark:bg-[#110F0D]">
                    <img
                      src="/email_inbox2.png"
                      alt="Unified replies and workflow tasks"
                      className="w-full object-cover"
                    />
                    <div
                      className="absolute bottom-4 right-4 w-[48%] rounded-xl overflow-hidden
                                 bg-white
                                 border border-slate-200/90 dark:border-white/[0.16]
                                 ring-1 ring-slate-900/10 dark:ring-white/20
                                 shadow-[0_22px_50px_-8px_rgba(0,0,0,0.35)]
                                 transition-all duration-300 hover:scale-[1.03]"
                    >
                      <img
                        src="/email_chat.png"
                        alt="Reply detail conversation view"
                        className="w-full bg-white object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Copy */}
              <div className="order-1 lg:order-2">
                <span className="inline-block rounded-full bg-ember-50 dark:bg-ember-500/10 px-3 py-1 text-[11px] font-bold text-ember-600 dark:text-ember-400 mb-3">
                  Step 04
                </span>
                <h3 className="font-bricolage text-[26px] sm:text-[34px] font-bold text-slate-950 dark:text-white leading-[1.18]">
                  Manage replies, follow-ups and tasks in one workflow.
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">
                  Replies, follow-ups, meetings and tasks stay connected to the daily workflow. Harvin keeps the next action visible so important work does not disappear between conversations, reminders and meetings.
                </p>
              </div>
            </div>

            {/* ── STEP 05 ───────────────────────────────────────────────────── */}
            <div id="step-05" className="scroll-mt-28 grid grid-cols-1 lg:grid-cols-[0.82fr_1.35fr] gap-10 lg:gap-14 items-center">
              <div>
                <span className="inline-block rounded-full bg-ember-50 dark:bg-ember-500/10 px-3 py-1 text-[11px] font-bold text-ember-600 dark:text-ember-400 mb-3">
                  Step 05
                </span>
                <h3 className="font-bricolage text-[26px] sm:text-[34px] font-bold text-slate-950 dark:text-white leading-[1.18]">
                  Seamless SDR-to-AE Handoff
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">
                  The AE does not start from a calendar invite. They start with the work the SDR has already done.
                </p>
                <p className="mt-3 text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">
                  Account context, prospect information, why now, SDR discovery and previous interactions travel directly with the booked meeting.
                </p>
              </div>

              {/* Visual: Calendar & AE Handoff */}
              <div className="relative">
                <div className="overflow-hidden rounded-2xl border border-slate-200/90 dark:border-white/[0.12] bg-white dark:bg-[#0F0E0C] shadow-2xl transition-all duration-300 hover:shadow-[0_25px_60px_-12px_rgba(201,76,30,0.18)]">
                  <div className="relative overflow-hidden bg-slate-50 dark:bg-[#110F0D]">
                    <img
                      src="/calender_page.png"
                      alt="AE Meeting Calendar with context"
                      className="w-full object-cover"
                    />
                    {/* Floating UP NEXT meeting card */}
                    <div
                      className="absolute bottom-3 right-4 w-[28%] rounded-xl overflow-hidden
                                 bg-white
                                 border border-slate-200/90 dark:border-white/[0.16]
                                 ring-1 ring-slate-900/10 dark:ring-white/20
                                 shadow-[0_22px_50px_-8px_rgba(0,0,0,0.35)]
                                 transition-all duration-300 hover:scale-[1.03]"
                    >
                      <img
                        src="/calender2.png"
                        alt="Upcoming SDR-booked meeting details"
                        className="w-full bg-white object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── STEP 06 ───────────────────────────────────────────────────── */}
            <div id="step-06" className="scroll-mt-28 grid grid-cols-1 lg:grid-cols-[1.35fr_0.82fr] gap-10 lg:gap-14 items-center">
              {/* Visual */}
              <div className="order-2 lg:order-1 relative">
                <div className="overflow-hidden rounded-2xl border border-slate-200/90 dark:border-white/[0.12] bg-white dark:bg-[#0F0E0C] shadow-2xl transition-all duration-300 hover:shadow-[0_25px_60px_-12px_rgba(201,76,30,0.18)]">
                  <div className="relative overflow-hidden bg-slate-50 dark:bg-[#110F0D]">
                    <img
                      src="/calender_page.png"
                      alt="Turn meetings into opportunities"
                      className="w-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Copy */}
              <div className="order-1 lg:order-2">
                <span className="inline-block rounded-full bg-ember-50 dark:bg-ember-500/10 px-3 py-1 text-[11px] font-bold text-ember-600 dark:text-ember-400 mb-3">
                  Step 06
                </span>
                <h3 className="font-bricolage text-[26px] sm:text-[34px] font-bold text-slate-950 dark:text-white leading-[1.18]">
                  Turn the meeting into an opportunity.
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">
                  Capture the meeting outcome, move relevant conversations into an opportunity workflow and keep follow-up actions visible. Harvin helps the AE carry momentum from the meeting into the next stage.
                </p>
              </div>
            </div>

            {/* ── STEP 07 ───────────────────────────────────────────────────── */}
            <div id="step-07" className="scroll-mt-28 grid grid-cols-1 lg:grid-cols-[0.82fr_1.35fr] gap-10 lg:gap-14 items-center">
              <div>
                <span className="inline-block rounded-full bg-ember-50 dark:bg-ember-500/10 px-3 py-1 text-[11px] font-bold text-ember-600 dark:text-ember-400 mb-3">
                  Step 07
                </span>
                <h3 className="font-bricolage text-[26px] sm:text-[34px] font-bold text-slate-950 dark:text-white leading-[1.18]">
                  Close the SDR-AE feedback loop
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">
                  What happens after the meeting shouldn&apos;t disappear. AE feedback flows back to the SDR and SDR Head, connecting meeting outcomes to coaching, learning and future execution.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 px-3 py-1.5 text-[12px] font-semibold">
                    ✓ Qualified &amp; Accepted
                  </span>
                  <span className="rounded-lg bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 px-3 py-1.5 text-[12px] font-semibold">
                    ⚡ Coaching Point Logged
                  </span>
                  <span className="rounded-lg bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400 px-3 py-1.5 text-[12px] font-semibold">
                    🎯 Stage Advanced in CRM
                  </span>
                </div>
              </div>

              {/* Visual */}
              <div className="relative">
                <div className="overflow-hidden rounded-2xl border border-slate-200/90 dark:border-white/[0.12] bg-white dark:bg-[#0F0E0C] shadow-2xl transition-all duration-300 hover:shadow-[0_25px_60px_-12px_rgba(201,76,30,0.18)]">
                  <div className="relative overflow-hidden bg-slate-50 dark:bg-[#110F0D]">
                    <img
                      src="/signals-preview.png"
                      alt="AE feedback loop and meeting outcomes"
                      className="w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* ── STEP 08 ───────────────────────────────────────────────────── */}
            <div id="step-08" className="scroll-mt-28 grid grid-cols-1 lg:grid-cols-[1.35fr_0.82fr] gap-10 lg:gap-14 items-center">
              {/* Visual: SDR Head Command Center */}
              <div className="order-2 lg:order-1 relative">
                <div className="overflow-hidden rounded-2xl border border-slate-200/90 dark:border-white/[0.12] bg-white dark:bg-[#0F0E0C] shadow-2xl transition-all duration-300 hover:shadow-[0_25px_60px_-12px_rgba(201,76,30,0.18)]">
                  <div className="relative overflow-hidden bg-slate-50 dark:bg-[#110F0D]">
                    <img
                      src="/dashboard-preview.png"
                      alt="SDR Head Command Center"
                      className="w-full object-cover block dark:hidden"
                    />
                    <img
                      src="/dashboard-preview-dark.png"
                      alt="SDR Head Command Center"
                      className="w-full object-cover hidden dark:block"
                    />
                  </div>
                </div>
              </div>

              {/* Copy */}
              <div className="order-1 lg:order-2">
                <span className="inline-block rounded-full bg-ember-50 dark:bg-ember-500/10 px-3 py-1 text-[11px] font-bold text-ember-600 dark:text-ember-400 mb-3">
                  Step 08
                </span>
                <h3 className="font-bricolage text-[26px] sm:text-[34px] font-bold text-slate-950 dark:text-white leading-[1.18]">
                  Run the SDR team from one command center.
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">
                  SDR Heads get a connected view of team health, goal attainment, meeting quality, AE acceptance, account coverage and performance.
                </p>
                <p className="mt-3 text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">
                  Instead of checking multiple dashboards to find an issue, managers can see where attention is needed and open the relevant SDR, account or meeting context directly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 4. FAQS ══════════════════════════════════════════════════════════ */}
      <section className="px-6 py-16 lg:py-24 border-b border-slate-200 dark:border-white/[0.08] bg-sand-50/50 dark:bg-white/[0.01]">
        <div className="mx-auto max-w-[900px]">
          <div className="text-center mb-12">
            <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ember-500">
              FAQs
            </span>
            <h2 className="mt-2.5 font-bricolage text-[28px] sm:text-[38px] font-bold tracking-[-0.025em] text-slate-950 dark:text-white">
              Get to know Harvin better.
            </h2>
          </div>

          <div className="space-y-3">
            {[
              {
                q: 'What is Harvin?',
                a: 'Harvin is an SDR management platform that brings account intelligence, outreach, meetings, team management, and AE collaboration into one connected workflow.',
              },
              {
                q: 'Who is Harvin built for?',
                a: 'Harvin is built for SDRs, SDR Heads, and AEs, connecting their workflows while giving sales leadership visibility into SDR operations.',
              },
              {
                q: 'How is Harvin different from a sales engagement platform?',
                a: 'Harvin goes beyond outreach by connecting account intelligence, SDR execution, management, AE handoffs, meeting outcomes, and feedback in one workflow.',
              },
              {
                q: 'Is Harvin a CRM?',
                a: 'No. Harvin works alongside your CRM, acting as the operating layer for SDR prioritization, execution, management, and AE collaboration.',
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

      {/* ═══ 5. FINAL CTA ═════════════════════════════════════════════════════ */}
      <section className="relative px-6 py-20 lg:py-28 overflow-hidden bg-sand-100 dark:bg-slate-950">
        <div className="mx-auto max-w-[1100px] text-center">
          <h2 className="font-bricolage text-[32px] sm:text-[46px] font-bold tracking-[-0.03em] text-slate-950 dark:text-white">
            One operation. One connected workspace.
          </h2>
          <p className="mt-4 text-[17px] sm:text-[19px] text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            See what changes when your SDR team, managers, and AEs work from the same connected workflow.
          </p>

          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => openModal('talk-to-sales')}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-ember-500 px-8 py-4 text-[16px] font-semibold text-white shadow-sm transition-all duration-200 hover:bg-ember-600 active:scale-95"
            >
              Book a Demo <ArrowRight size={17} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
