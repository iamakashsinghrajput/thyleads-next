'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  BarChart3,
  Check,
  ChevronDown,
  Compass,
  FileText,
  Flame,
  Layers,
  LineChart,
  Radio,
  Search,
  Sparkles,
  Target,
  Trophy,
  Users,
  Workflow,
  Zap,
} from 'lucide-react';
import { useModal } from '@/components/ModalContext';

export default function SdrHeadClient() {
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
            <BarChart3 size={13} className="text-ember-500" />
            For SDR Heads
          </span>

          <h1 className="font-bricolage text-[clamp(34px,5vw,62px)] font-bold leading-[1.08] tracking-[-0.03em] text-slate-950 dark:text-white max-w-4xl mx-auto">
            Know where your team <span className="text-ember-500">needs you.</span>
          </h1>

          <p className="mt-6 text-[18px] sm:text-[20px] leading-[1.65] text-slate-600 dark:text-slate-300 max-w-3xl mx-auto font-normal">
            Run your SDR team from one connected workspace for performance, accounts, meetings and coaching.
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
              href="#workspace"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 dark:border-white/15 bg-white dark:bg-white/5 px-6 py-3.5 text-[15px] font-semibold text-slate-800 dark:text-white transition-all duration-200 hover:bg-slate-100 dark:hover:bg-white/10 hover:border-slate-400 active:scale-95"
            >
              See how Harvin works
            </a>
          </div>
        </div>
      </section>

      {/* ═══ 2. THE GAP ═══════════════════════════════════════════════════════ */}
      <section className="px-6 py-16 lg:py-24 border-b border-slate-200 dark:border-white/[0.08] bg-white/50 dark:bg-black/20">
        <div className="mx-auto max-w-[1320px]">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ember-500">
              The Gap
            </span>
            <h2 className="mt-2.5 font-bricolage text-[28px] sm:text-[38px] font-bold tracking-[-0.025em] text-slate-950 dark:text-white">
              Running the team means connecting more than activity.
            </h2>
            <p className="mt-3 text-[16px] text-slate-600 dark:text-slate-300">
              Performance, account coverage, meetings and feedback each tell part of the story. Harvin brings them together so you can understand where the team needs attention and what to do next.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                num: '01',
                title: 'Activity tells you what happened, not always why.',
                desc: "Calls, emails and meetings show output. They don't always explain whether the issue is targeting, messaging, follow-up or execution.",
              },
              {
                num: '02',
                title: 'Coaching starts with finding the right problem.',
                desc: 'When an SDR falls behind, managers need the context behind the number before deciding what to change.',
              },
              {
                num: '03',
                title: 'Comparing SDR performance takes more work.',
                desc: 'Two SDRs can work similar accounts or territories and produce very different outcomes, but understanding why requires pulling together multiple pieces of data.',
              },
              {
                num: '04',
                title: 'Account prioritization becomes manual.',
                desc: 'Managers often have to research accounts themselves to identify which ones have meaningful signals and where SDR attention should go.',
              },
              {
                num: '05',
                title: 'Connecting meetings to real outcomes.',
                desc: 'Booked meetings are only one part of SDR performance. SDR Heads also need visibility into what happens after the meeting reaches the AE.',
              },
              {
                num: '✦',
                title: 'The Harvin solution',
                desc: 'A single command layer that unifies live signals, team performance, meeting qualification, and 1:1 coaching.',
                highlight: true,
              },
            ].map((card) => (
              <div
                key={card.title}
                className={`rounded-2xl border p-7 transition-colors ${
                  card.highlight
                    ? 'border-ember-300 bg-ember-50/70 dark:border-ember-500/30 dark:bg-ember-500/10'
                    : 'border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.02] shadow-xs hover:border-ember-300 dark:hover:border-ember-500/40'
                }`}
              >
                <span
                  className={`text-[12px] font-bold ${
                    card.highlight ? 'text-ember-600 dark:text-ember-400' : 'text-slate-400'
                  }`}
                >
                  {card.num}
                </span>
                <h3 className="mt-2 font-bricolage text-[18px] font-bold text-slate-950 dark:text-white leading-snug">
                  {card.title}
                </h3>
                <p className="mt-2.5 text-[14px] leading-relaxed text-slate-600 dark:text-slate-400">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 3. HOW HARVIN HELPS ══════════════════════════════════════════════ */}
      <section className="px-6 py-16 lg:py-24 border-b border-slate-200 dark:border-white/[0.08]">
        <div className="mx-auto max-w-[1320px]">
          <div className="grid grid-cols-1 lg:grid-cols-[0.82fr_1.35fr] gap-10 lg:gap-14 items-center">
            {/* Copy side */}
            <div>
              <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ember-500">
                How Harvin Helps
              </span>
              <h2 className="mt-2.5 font-bricolage text-[26px] sm:text-[34px] font-bold tracking-[-0.025em] leading-[1.18] text-slate-950 dark:text-white">
                From scattered data to clear action
              </h2>
              <p className="mt-3 text-[15px] sm:text-[16px] leading-relaxed text-slate-600 dark:text-slate-300">
                Harvin brings the context you need together, so you can understand performance, spot gaps, and act faster.
              </p>

              <div className="mt-6 space-y-3">
                {[
                  {
                    title: 'One view of team performance',
                    desc: 'See activities, meetings, and outcomes without pulling data from multiple platforms.',
                  },
                  {
                    title: 'Know where support is needed',
                    desc: 'Identify where performance is changing and where your coaching has the highest impact.',
                  },
                  {
                    title: 'Understand what drives the difference',
                    desc: 'Compare SDR performance across similar territories to uncover execution differences.',
                  },
                  {
                    title: 'Put account signals into action',
                    desc: 'Track account changes and prioritize accounts without manual research.',
                  },
                  {
                    title: 'See beyond meetings booked',
                    desc: 'Bring meeting outcomes and AE feedback into the picture to verify meeting quality.',
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

            {/* Visual side: Command Center Dashboard (Large) */}
            <div className="relative">
              <div className="overflow-hidden rounded-2xl border border-slate-200/90 dark:border-white/[0.12] bg-white dark:bg-[#0F0E0C] shadow-2xl transition-all duration-300 hover:shadow-[0_25px_60px_-12px_rgba(201,76,30,0.18)]">
                <div className="relative overflow-hidden bg-slate-50 dark:bg-[#110F0D]">
                  <img
                    src="/dashboard-preview.png"
                    alt="SDR Head Command Center Overview"
                    className="w-full object-cover object-top block dark:hidden"
                  />
                  <img
                    src="/dashboard-preview-dark.png"
                    alt="SDR Head Command Center Overview"
                    className="w-full object-cover object-top hidden dark:block"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 4. THE SDR HEAD WORKSPACE (7 CAPABILITIES) ═══════════════════════ */}
      <section id="workspace" className="scroll-mt-24 px-6 py-16 lg:py-24 border-b border-slate-200 dark:border-white/[0.08] bg-sand-50/50 dark:bg-white/[0.01]">
        <div className="mx-auto max-w-[1320px]">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ember-500">
              The SDR Head Workspace
            </span>
            <h2 className="mt-2.5 font-bricolage text-[28px] sm:text-[38px] font-bold tracking-[-0.025em] text-slate-950 dark:text-white">
              Everything you need to run the team with more clarity.
            </h2>
            <p className="mt-3 text-[16px] text-slate-600 dark:text-slate-300">
              Harvin brings your team&apos;s performance, account priorities, meetings, and outcomes in one connected workspace.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
            {[
              {
                step: '01',
                title: 'See what needs your attention',
                desc: 'Get a quick view of team health, goal attainment, meetings, performance and Needs Your Attention items, so you can start with the areas that need you most.',
                tags: ['Command Center', 'Live Signals', "Today's Schedule"],
              },
              {
                step: '02',
                title: 'Understand your team',
                desc: 'See team-wide performance, then open an SDR 360° profile to explore their activity, performance trends, meetings, feedback and history.',
                tags: ['Team Performance', 'SDR 360°'],
              },
              {
                step: '03',
                title: 'See Meeting Outcomes',
                desc: 'Track booked and completed meetings, outcomes, AE qualification and feedback to see what your SDRs are creating beyond meeting volume.',
                tags: ['Meetings', 'AE Feedback'],
              },
              {
                step: '04',
                title: 'Know where your team should focus',
                desc: 'See account intelligence with intent signals. Open Account 360° to understand the company, contacts, and account activity to mark them as priority for your SDRs.',
                tags: ['Account Intelligence', 'Account 360°'],
              },
              {
                step: '05',
                title: 'Keep execution visible',
                desc: "Stay connected to the operational workflows behind your team's outreach, including conversations, calling activity and mailbox health.",
                tags: ['Campaign', 'Dialer', 'Inbox', 'Mailboxes'],
              },
              {
                step: '06',
                title: 'Recognize performance with Leaderboard',
                desc: 'Give the team visibility into performance and recognition while keeping the focus on broader outcomes, not activity alone.',
                tags: ['Leaderboard'],
              },
              {
                step: '07',
                title: 'Coach from context, not just numbers',
                desc: 'When performance changes, open the SDR 360° view to see the activity, meetings, feedback and history behind the trend. Use the full picture to decide next steps.',
                tags: ['SDR 360°', '1:1 Coaching plans'],
              },
            ].map((cap) => (
              <div
                key={cap.step}
                className="flex flex-col justify-between rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#110F0D] p-7 shadow-xs hover:border-ember-300 dark:hover:border-ember-500/40 transition-colors"
              >
                <div>
                  <span className="text-[12px] font-bold text-ember-500">
                    {cap.step}.
                  </span>
                  <h3 className="mt-2 font-bricolage text-[19px] font-bold text-slate-950 dark:text-white leading-snug">
                    {cap.title}
                  </h3>
                  <p className="mt-2.5 text-[14px] leading-relaxed text-slate-600 dark:text-slate-400">
                    {cap.desc}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/10 flex flex-wrap gap-1.5">
                  {cap.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-sand-100 dark:bg-white/5 px-2.5 py-1 text-[11px] font-medium text-slate-600 dark:text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}

            {/* Visual showcase card for the 7 capabilities */}
            <div className="md:col-span-2 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#110F0D] p-6 shadow-xs flex flex-col justify-center">
              <p className="text-[12px] font-semibold uppercase tracking-wider text-ember-500 mb-2">
                Live Console
              </p>
              <h4 className="font-bricolage text-[20px] font-bold text-slate-900 dark:text-white mb-4">
                Territory Coverage &amp; Real-time Account Allocation
              </h4>
              <div className="relative rounded-xl overflow-hidden border border-slate-200/80 dark:border-white/10">
                <img
                  src="/Watchlist.png"
                  alt="Account allocation and territory prioritization"
                  className="w-full object-cover block dark:hidden"
                />
                <img
                  src="/Watchlist-dark.png"
                  alt="Account allocation and territory prioritization"
                  className="w-full object-cover hidden dark:block"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 5. TESTIMONIALS ═════════════════════════════════════════════════ */}
      <section className="px-6 py-16 lg:py-24 border-b border-slate-200 dark:border-white/[0.08]">
        <div className="mx-auto max-w-[1200px]">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ember-500">
              Testimonials
            </span>
            <h2 className="mt-2.5 font-bricolage text-[28px] sm:text-[38px] font-bold tracking-[-0.025em] text-slate-950 dark:text-white">
              What other SDR Heads say about Harvin
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Vikram Sethi',
                role: 'VP of Sales Development',
                company: 'Aura Data',
                quote:
                  'Before Harvin, 1:1 coaching was based on raw dials and gut feel. Now I open SDR 360, see the exact conversion friction on calls and emails, and our coaching sessions actually move pipeline.',
                metric: '+36% team quota attainment',
              },
              {
                name: 'Jessica Thorne',
                role: 'Global SDR Director',
                company: 'MetricPulse',
                quote:
                  'The Command Center gives me complete visibility across 25 SDRs. I know which accounts have live intent signals and whether our territory allocations are being properly worked without nagging managers.',
                metric: '4 hours saved per manager weekly',
              },
              {
                name: 'David Reynolds',
                role: 'Head of Outbound Revenue',
                company: 'CloudMatrix',
                quote:
                  'Connecting booked meetings directly to AE qualification feedback transformed our team. Our SDRs don’t just book meetings—they book high-quality meetings that convert.',
                metric: '92% AE meeting acceptance',
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

      {/* ═══ 6. FAQS ══════════════════════════════════════════════════════════ */}
      <section className="px-6 py-16 lg:py-24 border-b border-slate-200 dark:border-white/[0.08] bg-sand-50/50 dark:bg-white/[0.01]">
        <div className="mx-auto max-w-[900px]">
          <div className="text-center mb-12">
            <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ember-500">
              FAQs
            </span>
            <h2 className="mt-2.5 font-bricolage text-[28px] sm:text-[38px] font-bold tracking-[-0.025em] text-slate-950 dark:text-white">
              What SDR Heads ask us
            </h2>
          </div>

          <div className="space-y-3">
            {[
              {
                q: 'What does Harvin help an SDR Head see?',
                a: 'Harvin brings team health, goal attainment, meetings, account coverage, campaign performance and relevant attention areas into one workspace.',
              },
              {
                q: 'How does Harvin help me know where my team needs attention?',
                a: 'The Command Center surfaces goal attainment, team health and Needs Your Attention items, so you can identify where intervention may be needed without reviewing every SDR individually.',
              },
              {
                q: 'Can I see why an SDR is underperforming?',
                a: 'Yes. SDR 360° connects performance trends with activity, meetings, AE feedback and relevant history, giving you more context for coaching.',
              },
              {
                q: 'Can I manage account allocation from Harvin?',
                a: 'Yes. Harvin allows for you to do account allocation to your SDRs directly from the platform.',
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

      {/* ═══ 7. FINAL CTA ═════════════════════════════════════════════════════ */}
      <section className="relative px-6 py-20 lg:py-28 overflow-hidden bg-sand-100 dark:bg-slate-950">
        <div className="mx-auto max-w-[1100px] text-center">
          <h2 className="font-bricolage text-[32px] sm:text-[46px] font-bold tracking-[-0.03em] text-slate-950 dark:text-white">
            Start running your team with clarity.
          </h2>
          <p className="mt-4 text-[17px] sm:text-[19px] text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Give your SDR team a connected way to work, and give yourself a clearer path to coaching.
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
