'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Compass,
  Sparkles,
  Users,
  Target,
  BarChart3,
  Layers,
  HelpCircle,
  Briefcase,
  CheckCircle2,
  Workflow,
  Search,
  MessageSquare,
  Network,
} from 'lucide-react';
import { useModal } from '@/components/ModalContext';

export default function AboutClient() {
  const { openModal } = useModal();

  return (
    <div className="text-slate-900 dark:text-white">
      {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-slate-200 dark:border-white/[0.08] px-6 pt-24 pb-20 lg:pt-32 lg:pb-28">
        {/* Soft background ambient gradient */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-[420px] w-full max-w-[1200px] bg-[radial-gradient(ellipse_at_top,rgba(201,76,30,0.08),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(201,76,30,0.15),transparent_70%)]"
        />

        <div className="relative mx-auto max-w-[1200px] text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-ember-200 bg-ember-50/70 px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-ember-600 dark:border-ember-500/30 dark:bg-ember-500/10 dark:text-ember-400 mb-6">
            <Sparkles size={13} className="text-ember-500" />
            About Harvin
          </span>

          <h1 className="font-bricolage text-[clamp(36px,5.2vw,64px)] font-bold leading-[1.06] tracking-[-0.03em] text-slate-950 dark:text-white max-w-4xl mx-auto">
            Building a better way to run SDR teams
          </h1>

          <p className="mt-6 text-[18px] sm:text-[20px] leading-[1.65] text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-normal">
            Harvin is an SDR Management platform built from firsthand experience running and managing sales development teams.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/sdr-management-platform"
              className="inline-flex items-center gap-2 rounded-xl bg-ember-500 px-6 py-3.5 text-[15px] font-semibold text-white shadow-sm transition-all duration-200 hover:bg-ember-600 hover:shadow-md active:scale-95"
            >
              See Harvin <ArrowRight size={16} />
            </Link>

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

      {/* ── 2. THE STORY BEHIND ────────────────────────────────────────── */}
      <section className="px-6 py-20 lg:py-28 border-b border-slate-200 dark:border-white/[0.08] bg-white/40 dark:bg-black/20">
        <div className="mx-auto max-w-[1000px]">
          <div className="text-center mb-14">
            <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ember-500">
              Origin Story
            </span>
            <h2 className="mt-3 font-bricolage text-[32px] sm:text-[42px] font-bold tracking-[-0.025em] text-slate-950 dark:text-white">
              The Story Behind
            </h2>
          </div>

          <div className="space-y-8 text-[17px] sm:text-[18px] leading-[1.75] text-slate-700 dark:text-slate-300">
            <p className="text-[20px] sm:text-[22px] font-medium leading-[1.6] text-slate-900 dark:text-white">
              Harvin started with a problem Rahul experienced firsthand.
            </p>

            <div className="rounded-2xl border border-slate-200/90 dark:border-white/[0.08] bg-sand-50/70 dark:bg-white/[0.02] p-7 sm:p-9 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-ember-100 dark:bg-ember-500/20 text-ember-600 dark:text-ember-400 font-bold text-xs">
                  01
                </span>
                <h3 className="text-[17px] font-semibold text-slate-900 dark:text-white">
                  Starting as an SDR
                </h3>
              </div>
              <p>
                Rahul started his career as an SDR, where the work was simple to describe but difficult to manage. Find the right accounts. Understand what is happening inside them. Reach the right people. Follow up. Book meetings.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200/90 dark:border-white/[0.08] bg-sand-50/70 dark:bg-white/[0.02] p-7 sm:p-9 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-ember-100 dark:bg-ember-500/20 text-ember-600 dark:text-ember-400 font-bold text-xs">
                  02
                </span>
                <h3 className="text-[17px] font-semibold text-slate-900 dark:text-white">
                  Stepping into the SDR Head Role
                </h3>
              </div>
              <p>
                As he moved into an SDR Head role, the problem changed.
              </p>
              <p className="mt-3">
                Now he wasn&apos;t just managing his own pipeline. He had to understand what dozens of accounts, reps, conversations, meetings and campaigns were doing at once. The information existed, but it lived across different tools, dashboards and spreadsheets.
              </p>
            </div>

            <div className="pt-4 space-y-4">
              <p className="text-[19px] font-medium text-slate-900 dark:text-white">
                The challenge wasn&apos;t a lack of data.
              </p>
              <p className="text-[19px] font-medium text-slate-900 dark:text-white">
                It was making sense of all of it quickly enough to act.
              </p>
              <p className="text-slate-600 dark:text-slate-400">
                That experience became the starting point for Harvin.
              </p>
            </div>

            {/* Core Question Highlight Box */}
            <div className="relative overflow-hidden rounded-2xl border-2 border-ember-500/30 bg-gradient-to-br from-ember-50/90 via-sand-50 to-sand-100 dark:from-ember-950/20 dark:via-slate-900/40 dark:to-slate-900/80 p-8 sm:p-10 shadow-sm mt-8">
              <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-ember-600 dark:text-ember-400 mb-2">
                A product built around one question
              </p>
              <p className="font-bricolage text-[22px] sm:text-[28px] font-bold leading-[1.3] text-slate-950 dark:text-white">
                &ldquo;How can we make the SDR operation easier to run, easier to understand and easier to improve?&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. WHY WE BUILT HARVIN ─────────────────────────────────────── */}
      <section className="px-6 py-20 lg:py-28 border-b border-slate-200 dark:border-white/[0.08]">
        <div className="mx-auto max-w-[1100px]">
          <div className="rounded-3xl border border-slate-200/90 dark:border-white/[0.08] bg-sand-50 dark:bg-white/[0.02] p-8 sm:p-12 lg:p-16">
            <div className="max-w-3xl">
              <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ember-500">
                Our Purpose
              </span>
              <h2 className="mt-3 font-bricolage text-[30px] sm:text-[40px] font-bold tracking-[-0.02em] text-slate-950 dark:text-white">
                Why we built Harvin
              </h2>

              <p className="mt-6 text-[18px] sm:text-[20px] font-medium leading-[1.65] text-slate-800 dark:text-slate-200">
                We didn&apos;t start with a product idea. We started with a problem.
              </p>

              <p className="mt-4 text-[16px] sm:text-[17px] leading-[1.75] text-slate-600 dark:text-slate-300">
                Sales teams already had the tools they needed. What was missing was the layer connecting the work between them.
              </p>

              <div className="mt-8 pt-8 border-t border-slate-200 dark:border-white/[0.08]">
                <p className="text-[20px] sm:text-[22px] font-semibold text-slate-950 dark:text-white">
                  So we built the platform we wished we had.
                </p>

                <p className="mt-3 text-[16px] sm:text-[17px] leading-[1.75] text-slate-600 dark:text-slate-300">
                  Harvin brings account intelligence, execution, management and AE collaboration into one connected operating environment, built around the way SDR teams actually work.
                </p>

                <div className="mt-8">
                  <Link
                    href="/sdr-management-platform"
                    className="inline-flex items-center gap-2 text-[16px] font-semibold text-ember-500 hover:text-ember-600 transition-colors group"
                  >
                    <span>Explore Harvin</span>
                    <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. HARVIN.AI — FOR THE PEOPLE WHO MOVE THE PIPELINE FORWARD ── */}
      <section className="px-6 py-20 lg:py-28 border-b border-slate-200 dark:border-white/[0.08] bg-sand-50/50 dark:bg-white/[0.01]">
        <div className="mx-auto max-w-[1200px]">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[12px] font-bold uppercase tracking-[0.18em] text-ember-500">
              HARVIN.AI
            </span>
            <h2 className="mt-3 font-bricolage text-[32px] sm:text-[44px] font-bold tracking-[-0.025em] text-slate-950 dark:text-white">
              Built for the people who move the pipeline forward
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* SDRs Card */}
            <div className="rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-slate-900/60 p-8 shadow-sm transition-all hover:border-ember-300 dark:hover:border-ember-500/30">
              <div className="flex items-center gap-3.5 mb-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-ember-50 dark:bg-ember-500/10 text-ember-500">
                  <Target size={22} strokeWidth={2.2} />
                </span>
                <div>
                  <h3 className="text-[20px] font-bold text-slate-900 dark:text-white">
                    SDRs
                  </h3>
                  <span className="text-[12px] font-medium text-ember-600 dark:text-ember-400">
                    Day-to-day execution
                  </span>
                </div>
              </div>
              <p className="text-[16px] leading-[1.65] text-slate-600 dark:text-slate-300">
                Know what to work on, who to contact and what needs to happen next.
              </p>
            </div>

            {/* SDR Heads Card */}
            <div className="rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-slate-900/60 p-8 shadow-sm transition-all hover:border-ember-300 dark:hover:border-ember-500/30">
              <div className="flex items-center gap-3.5 mb-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-ember-50 dark:bg-ember-500/10 text-ember-500">
                  <BarChart3 size={22} strokeWidth={2.2} />
                </span>
                <div>
                  <h3 className="text-[20px] font-bold text-slate-900 dark:text-white">
                    SDR Heads
                  </h3>
                  <span className="text-[12px] font-medium text-ember-600 dark:text-ember-400">
                    Team visibility &amp; coaching
                  </span>
                </div>
              </div>
              <p className="text-[16px] leading-[1.65] text-slate-600 dark:text-slate-300">
                Understand where the team needs attention and where they can make a difference.
              </p>
            </div>

            {/* Central Unifying Workflow Connector */}
            <div className="md:col-span-2 rounded-2xl border-2 border-ember-500/20 bg-gradient-to-r from-ember-50/80 via-sand-50 to-ember-50/80 dark:from-ember-950/20 dark:via-slate-900/60 dark:to-ember-950/20 p-6 sm:p-8 text-center shadow-sm">
              <div className="inline-flex items-center gap-2 mb-2">
                <Workflow size={18} className="text-ember-500" />
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-ember-600 dark:text-ember-400">
                  Connected Operating System
                </span>
              </div>
              <p className="text-[18px] sm:text-[21px] font-semibold text-slate-950 dark:text-white max-w-2xl mx-auto">
                Harvin connects the people involved in the SDR operation around the same workflow.
              </p>
            </div>

            {/* Sales Leaders & RevOps Card */}
            <div className="rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-slate-900/60 p-8 shadow-sm transition-all hover:border-ember-300 dark:hover:border-ember-500/30">
              <div className="flex items-center gap-3.5 mb-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-ember-50 dark:bg-ember-500/10 text-ember-500">
                  <Layers size={22} strokeWidth={2.2} />
                </span>
                <div>
                  <h3 className="text-[20px] font-bold text-slate-900 dark:text-white">
                    Sales Leaders &amp; RevOps
                  </h3>
                  <span className="text-[12px] font-medium text-ember-600 dark:text-ember-400">
                    Funnel health &amp; ROI
                  </span>
                </div>
              </div>
              <p className="text-[16px] leading-[1.65] text-slate-600 dark:text-slate-300">
                See how the SDR operation is performing and contributing to pipeline.
              </p>
            </div>

            {/* AEs Card */}
            <div className="rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-slate-900/60 p-8 shadow-sm transition-all hover:border-ember-300 dark:hover:border-ember-500/30">
              <div className="flex items-center gap-3.5 mb-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-ember-50 dark:bg-ember-500/10 text-ember-500">
                  <Briefcase size={22} strokeWidth={2.2} />
                </span>
                <div>
                  <h3 className="text-[20px] font-bold text-slate-900 dark:text-white">
                    AEs
                  </h3>
                  <span className="text-[12px] font-medium text-ember-600 dark:text-ember-400">
                    Meeting continuity &amp; handoff
                  </span>
                </div>
              </div>
              <p className="text-[16px] leading-[1.65] text-slate-600 dark:text-slate-300">
                Walk into SDR-booked meetings with the context behind the conversation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. WHAT WE BELIEVE IN ──────────────────────────────────────── */}
      <section className="px-6 py-20 lg:py-28 border-b border-slate-200 dark:border-white/[0.08]">
        <div className="mx-auto max-w-[1200px]">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ember-500">
              Core Principles
            </span>
            <h2 className="mt-3 font-bricolage text-[32px] sm:text-[42px] font-bold tracking-[-0.025em] text-slate-950 dark:text-white">
              What we believe in
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Belief 1 */}
            <div className="rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-sand-50 dark:bg-white/[0.02] p-8 sm:p-9">
              <div className="mb-4 inline-flex p-3 rounded-xl bg-ember-500/10 text-ember-500">
                <CheckCircle2 size={24} />
              </div>
              <h3 className="text-[20px] font-bold text-slate-900 dark:text-white mb-2">
                Clarity over complexity
              </h3>
              <p className="text-[15.5px] leading-[1.7] text-slate-600 dark:text-slate-300">
                Sales teams already have enough systems to manage. The job should become clearer, not harder, as the stack grows.
              </p>
            </div>

            {/* Belief 2 */}
            <div className="rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-sand-50 dark:bg-white/[0.02] p-8 sm:p-9">
              <div className="mb-4 inline-flex p-3 rounded-xl bg-ember-500/10 text-ember-500">
                <Network size={24} />
              </div>
              <h3 className="text-[20px] font-bold text-slate-900 dark:text-white mb-2">
                Keeping Context Together
              </h3>
              <p className="text-[15.5px] leading-[1.7] text-slate-600 dark:text-slate-300">
                Every interaction, signal, insight, and piece of work should stay connected to the account as it moves forward.
              </p>
            </div>

            {/* Belief 3 */}
            <div className="rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-sand-50 dark:bg-white/[0.02] p-8 sm:p-9">
              <div className="mb-4 inline-flex p-3 rounded-xl bg-ember-500/10 text-ember-500">
                <Search size={24} />
              </div>
              <h3 className="text-[20px] font-bold text-slate-900 dark:text-white mb-2">
                Less effort, more outreach
              </h3>
              <p className="text-[15.5px] leading-[1.7] text-slate-600 dark:text-slate-300">
                Leave the account research to us and execute your outreach from one connected workspace.
              </p>
            </div>

            {/* Belief 4 */}
            <div className="rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-sand-50 dark:bg-white/[0.02] p-8 sm:p-9">
              <div className="mb-4 inline-flex p-3 rounded-xl bg-ember-500/10 text-ember-500">
                <Workflow size={24} />
              </div>
              <h3 className="text-[20px] font-bold text-slate-900 dark:text-white mb-2">
                Connecting the Workflow
              </h3>
              <p className="text-[15.5px] leading-[1.7] text-slate-600 dark:text-slate-300">
                Keep the work connected across SDRs, managers, AEs, and every stage of the sales process.
              </p>
            </div>
          </div>

          <div className="mt-14 text-center">
            <p className="text-[19px] sm:text-[21px] font-semibold text-slate-900 dark:text-white">
              Today, Harvin is building a better way to run the SDR operation.
            </p>
          </div>
        </div>
      </section>

      {/* ── 6. THE TEAM ────────────────────────────────────────────────── */}
      <section className="px-6 py-20 lg:py-28 border-b border-slate-200 dark:border-white/[0.08] bg-sand-50/40 dark:bg-white/[0.01]">
        <div className="mx-auto max-w-[1000px]">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ember-500">
              Leadership &amp; Engineering
            </span>
            <h2 className="mt-3 font-bricolage text-[32px] sm:text-[42px] font-bold tracking-[-0.025em] text-slate-950 dark:text-white">
              The Team
            </h2>
            <p className="mt-3 text-[16px] text-slate-600 dark:text-slate-400">
              Meet the people building Harvin
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-[780px] mx-auto">
            {/* Rahul Dev */}
            <div className="group rounded-2xl border border-slate-200/90 dark:border-white/[0.08] bg-white dark:bg-slate-900/60 p-8 text-center shadow-sm transition-all hover:border-ember-300 dark:hover:border-ember-500/30 hover:shadow-md">
              <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-ember-500 to-amber-600 text-white font-bricolage text-2xl font-bold shadow-md shadow-ember-500/20">
                RD
              </div>
              <h3 className="text-[20px] font-bold text-slate-950 dark:text-white">
                Rahul Dev
              </h3>
              <p className="mt-1 text-[14px] font-medium text-ember-600 dark:text-ember-400">
                CEO &amp; Founder
              </p>
              <p className="mt-4 text-[14px] leading-relaxed text-slate-500 dark:text-slate-400">
                Former SDR and SDR Head who experienced the fragmentation of the outbound sales stack firsthand.
              </p>
            </div>

            {/* Akash Singh */}
            <div className="group rounded-2xl border border-slate-200/90 dark:border-white/[0.08] bg-white dark:bg-slate-900/60 p-8 text-center shadow-sm transition-all hover:border-ember-300 dark:hover:border-ember-500/30 hover:shadow-md">
              <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 text-white font-bricolage text-2xl font-bold shadow-md shadow-slate-900/20">
                AS
              </div>
              <h3 className="text-[20px] font-bold text-slate-950 dark:text-white">
                Akash Singh
              </h3>
              <p className="mt-1 text-[14px] font-medium text-ember-600 dark:text-ember-400">
                Product Developer
              </p>
              <p className="mt-4 text-[14px] leading-relaxed text-slate-500 dark:text-slate-400">
                Architecting high-performance web systems and the connected SDR workflow engine.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. CLOSING CTA BANNER ──────────────────────────────────────── */}
      <section className="relative overflow-hidden px-6 py-20 lg:py-28 bg-[#0C0B09] text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-[350px] w-full max-w-[1000px] bg-[radial-gradient(ellipse_at_top,rgba(201,76,30,0.25),transparent_70%)]"
        />

        <div className="relative mx-auto max-w-[840px] text-center">
          <h2 className="font-bricolage text-[32px] sm:text-[46px] font-bold tracking-[-0.025em] leading-[1.12]">
            The SDR operation deserves a place of its own.
          </h2>

          <p className="mt-5 text-[17px] sm:text-[19px] leading-relaxed text-white/70 max-w-2xl mx-auto">
            Harvin brings intelligence, execution, management and AE collaboration into one connected operating platform.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/sdr-management-platform"
              className="inline-flex items-center gap-2 rounded-xl bg-ember-500 px-6 py-3.5 text-[15px] font-semibold text-white shadow-sm transition-all duration-200 hover:bg-ember-600 hover:shadow-lg active:scale-95"
            >
              Explore Harvin <ArrowRight size={16} />
            </Link>

            <button
              type="button"
              onClick={() => openModal('talk-to-sales')}
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-[15px] font-semibold text-white transition-all duration-200 hover:bg-white/10 hover:border-white/30 active:scale-95"
            >
              Book a Demo <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
