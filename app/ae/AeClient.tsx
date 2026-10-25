'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Briefcase,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Clock,
  Compass,
  FileCheck,
  FileText,
  HelpCircle,
  Layers,
  MessageSquare,
  Phone,
  Radio,
  Send,
  Share2,
  Sparkles,
  Target,
  TrendingUp,
  UserCheck,
  Users,
  Workflow,
  Zap,
} from 'lucide-react';
import { useModal } from '@/components/ModalContext';

export function AeClient() {
  const { openModal } = useModal();
  const [email, setEmail] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeConsoleTab, setActiveConsoleTab] = useState<'calendar' | 'dealroom'>('calendar');

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
          className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-[480px] w-full max-w-[1280px] bg-[radial-gradient(ellipse_at_top,rgba(201,76,30,0.12),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(201,76,30,0.22),transparent_70%)]"
        />

        <div className="relative mx-auto max-w-[1200px] text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-ember-200 bg-ember-50/70 px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-ember-600 dark:border-ember-500/30 dark:bg-ember-500/10 dark:text-ember-400 mb-6">
            <Briefcase size={13} className="text-ember-500" />
            For Account Executives
          </span>

          <h1 className="font-bricolage text-[clamp(34px,5vw,62px)] font-bold leading-[1.08] tracking-[-0.03em] text-slate-950 dark:text-white max-w-4xl mx-auto">
            Walk in knowing what happened.{' '}
            <span className="text-ember-500">Walk out knowing what&apos;s next.</span>
          </h1>

          <p className="mt-6 text-[18px] sm:text-[20px] leading-[1.65] text-slate-600 dark:text-slate-300 max-w-3xl mx-auto font-normal">
            Harvin gives Account Executives the context behind every SDR-booked meeting, from prospect and account intelligence to discovery and previous interactions. Then it keeps outcomes, follow-ups, and opportunities connected after the conversation.
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

          {/* Hero Visual Preview */}
          <div className="mt-14 relative mx-auto max-w-[1100px] overflow-hidden rounded-2xl border border-slate-200/90 dark:border-white/[0.12] bg-white dark:bg-[#0F0E0C] p-3 sm:p-5 shadow-2xl">
            <div className="relative rounded-xl overflow-hidden border border-slate-200/70 dark:border-white/10 bg-slate-50 dark:bg-[#12100E]">
              <img
                src="/calender_page.png"
                alt="Harvin AE Calendar and Meeting Context Hub"
                className="w-full object-cover"
              />
              {/* Floating Up-Next Overlay Preview */}
              <div className="hidden md:block absolute bottom-6 right-6 max-w-[340px] rounded-xl border border-slate-200 dark:border-white/15 bg-white/95 dark:bg-[#181512]/95 backdrop-blur-md p-4 shadow-xl text-left">
                <div className="flex items-center gap-2 text-ember-500 text-[11px] font-bold uppercase tracking-wider">
                  <span className="h-2 w-2 rounded-full bg-ember-500 animate-pulse" />
                  Up Next · SDR Handoff Connected
                </div>
                <div className="mt-2 text-[14px] font-bold text-slate-900 dark:text-white">
                  VP of Engineering · Stripe Core Infra
                </div>
                <p className="mt-1 text-[12px] text-slate-600 dark:text-slate-400 line-clamp-2">
                  Discovery notes: Expanding Kubernetes clusters in Q3. Previous touchpoints: 3 emails, 1 intro call.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 2. THE GAP (3 CHALLENGES) ════════════════════════════════════════ */}
      <section className="px-6 py-16 lg:py-24 border-b border-slate-200 dark:border-white/[0.08] bg-white/50 dark:bg-black/20">
        <div className="mx-auto max-w-[1320px]">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ember-500">
              The Gap
            </span>
            <h2 className="mt-2.5 font-bricolage text-[28px] sm:text-[38px] font-bold tracking-[-0.025em] text-slate-950 dark:text-white">
              The challenges you face with every deal
            </h2>
            <p className="mt-3 text-[16px] text-slate-600 dark:text-slate-300">
              Keeping a deal moving means gathering context, managing multiple workflows, and staying on top of every next step.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                num: '1',
                title: 'Meeting prep takes up valuable time',
                desc: 'Before a meeting, you\u2019re often piecing together what happened across email threads, account research, and previous conversations.',
              },
              {
                num: '2',
                title: 'What happens next gets lost',
                desc: 'Meeting outcomes, follow-ups, opportunities, feedback, and next steps can end up scattered across different workflows, making it harder to keep momentum after the conversation.',
              },
              {
                num: '3',
                title: 'The deal story is spread across systems',
                desc: 'Research on LinkedIn, calls on your phone, notes in a diary, CRM updates, and deal management in a separate sales room create more places to work and more context to keep track of.',
              },
            ].map((item) => (
              <div
                key={item.num}
                className="relative rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#110F0D] p-7 sm:p-8 shadow-xs hover:border-ember-300 dark:hover:border-ember-500/40 transition-colors"
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-ember-50 text-ember-600 dark:bg-ember-500/10 dark:text-ember-400 text-[13px] font-bold mb-4">
                  {item.num}
                </span>
                <h3 className="font-bricolage text-[19px] sm:text-[20px] font-bold text-slate-950 dark:text-white leading-snug">
                  {item.title}
                </h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-slate-600 dark:text-slate-400">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 3. HOW HARVIN HELPS (6 PILLARS + VISUAL) ═════════════════════════ */}
      <section className="px-6 py-16 lg:py-24 border-b border-slate-200 dark:border-white/[0.08]">
        <div className="mx-auto max-w-[1320px]">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ember-500">
              How Harvin helps
            </span>
            <h2 className="mt-2.5 font-bricolage text-[28px] sm:text-[38px] font-bold tracking-[-0.025em] text-slate-950 dark:text-white">
              Everything you need to move the deal forward
            </h2>
            <p className="mt-3 text-[16px] text-slate-600 dark:text-slate-300">
              Harvin brings the context, conversations, and next steps around every deal into one connected workspace.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[0.88fr_1.32fr] gap-10 lg:gap-12 items-center">
            {/* Left: 6 sequential steps */}
            <div className="space-y-4">
              {[
                {
                  num: '1',
                  title: 'Start where the SDR left off',
                  desc: 'When an SDR books a meeting, Harvin brings together the account, prospect, SDR discovery, previous interactions, relevant signals, and talking points in one place.',
                },
                {
                  num: '2',
                  title: 'Know the prospect before the conversation starts',
                  desc: 'Move between prospect details, Account 360, previous interactions and relevant account signals without losing the thread of the conversation.',
                },
                {
                  num: '3',
                  title: 'Turn conversations into clear next steps',
                  desc: 'Capture meeting outcomes, create tasks, and move relevant conversations into opportunities so the work continues after the meeting',
                },
                {
                  num: '4',
                  title: 'Keep the full deal in view',
                  desc: 'Move from prospect to account to meeting to opportunity without losing the context built along the way.',
                },
                {
                  num: '5',
                  title: 'Continue the deal into your sales room',
                  desc: 'Connect Harvin with your Digital Sales Room when you need to continue the deal there, while keeping the workflow connected.',
                },
                {
                  num: '6',
                  title: 'Close the loop with your SDRs',
                  desc: 'Share structured feedback with the SDR after the meeting, so what you learn becomes part of the team\u2019s next cycle.',
                },
              ].map((item) => (
                <div
                  key={item.num}
                  className="group rounded-xl border border-slate-200/90 dark:border-white/10 bg-white/70 dark:bg-white/[0.02] p-4.5 sm:p-5 transition-all hover:border-ember-300 dark:hover:border-ember-500/40 hover:bg-white dark:hover:bg-[#12100E] shadow-2xs"
                >
                  <div className="flex items-start gap-3.5">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ember-500/10 text-[12px] font-bold text-ember-600 dark:text-ember-400 mt-0.5">
                      {item.num}
                    </span>
                    <div>
                      <h3 className="font-bricolage text-[16px] font-bold text-slate-950 dark:text-white leading-snug">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-[13.5px] leading-relaxed text-slate-600 dark:text-slate-400">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: High-Fidelity Visual */}
            <div className="relative">
              <div className="overflow-hidden rounded-2xl border border-slate-200/90 dark:border-white/[0.12] bg-white dark:bg-[#0F0E0C] shadow-2xl transition-all duration-300 hover:shadow-[0_25px_60px_-12px_rgba(201,76,30,0.18)]">
                <div className="border-b border-slate-100 dark:border-white/10 px-5 py-3.5 flex items-center justify-between bg-slate-50/80 dark:bg-white/[0.02]">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-ember-500" />
                    <span className="text-[12px] font-semibold text-slate-700 dark:text-slate-300">
                      Account 360 &amp; SDR Discovery Handoff
                    </span>
                  </div>
                  <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded-full">
                    Context Synced
                  </span>
                </div>
                <div className="relative overflow-hidden bg-slate-50 dark:bg-[#110F0D]">
                  <img
                    src="/signals-preview.png"
                    alt="Harvin AE Account 360 and Signals View"
                    className="w-full object-cover object-top"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 4. THE AE WORKSPACE (7 CAPABILITIES) ═════════════════════════════ */}
      <section
        id="workspace"
        className="scroll-mt-24 px-6 py-16 lg:py-24 border-b border-slate-200 dark:border-white/[0.08] bg-sand-50/50 dark:bg-white/[0.01]"
      >
        <div className="mx-auto max-w-[1320px]">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ember-500">
              The AE Workspace
            </span>
            <h2 className="mt-2.5 font-bricolage text-[28px] sm:text-[38px] font-bold tracking-[-0.025em] text-slate-950 dark:text-white">
              Everything before, during, and after the meeting
            </h2>
            <p className="mt-3 text-[16px] text-slate-600 dark:text-slate-300">
              From your calendar to opportunity follow-up, Harvin keeps the work around every conversation in view.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
            {[
              {
                step: '01',
                title: 'Your day, at a glance',
                desc: 'See upcoming meetings, tasks, opportunities, and activity from one place, so you know what needs your attention.',
                tags: ['Calendar', 'Meeting details', "Today's Schedule"],
              },
              {
                step: '02',
                title: 'Every meeting, with the context behind it',
                desc: 'Open a meeting to see the details of the prospect, account, previous interactions with the SDR, relevant signals, and talking points in one view.',
                tags: ['Meeting Details', 'Prospect Details', 'Account 360°'],
              },
              {
                step: '03',
                title: 'Keep every conversation moving',
                desc: 'Use the integrated dialer to make and manage calls from the workspace, while keeping communication connected to the rest of the workflow.',
                tags: ['Integrated Dialer', 'Call Queue', 'Live Notes'],
              },
              {
                step: '04',
                title: 'Move from meeting to opportunity',
                desc: 'Capture the meeting outcome, create next steps, and move relevant conversations into an opportunity without losing the context behind them.',
                tags: ['Tasks', 'Meeting Completed', 'Opportunities'],
              },
              {
                step: '05',
                title: 'Continue the deal into your sales room',
                desc: 'When a deal needs a Digital Sales Room, create and manage it through an integrated DSR platform and engage your buyers there without breaking the workflow.',
                tags: ['Opportunities', 'Dealroom', 'Buyer Engagement'],
              },
              {
                step: '06',
                title: 'Understand your performance',
                desc: 'Track your sales activity and outcomes from the workspace to understand how your execution is progressing.',
                tags: ['Performance', 'Outcomes', 'Conversion Trends'],
              },
              {
                step: '07',
                title: 'Close the feedback loop',
                desc: 'Share feedback with the SDR after the meeting, giving the team a connected view of what happened and what can be improved.',
                tags: ['Feedback', 'SDR 360°', 'Continuous Learning'],
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
          </div>

          {/* Interactive Console Spotlight */}
          <div className="mt-12 rounded-2xl border border-slate-200/90 dark:border-white/[0.12] bg-white dark:bg-[#0F0E0C] p-5 sm:p-7 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 dark:border-white/10 pb-5">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-ember-500">
                  Connected AE Workflows
                </span>
                <h4 className="mt-1 font-bricolage text-[22px] font-bold text-slate-900 dark:text-white">
                  From Calendar prep to live calling and deal closing
                </h4>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-sand-100 dark:bg-white/5 p-1 border border-slate-200 dark:border-white/10">
                <button
                  type="button"
                  onClick={() => setActiveConsoleTab('calendar')}
                  className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-[13px] font-semibold transition-all ${
                    activeConsoleTab === 'calendar'
                      ? 'bg-white dark:bg-[#1A1815] text-ember-600 dark:text-ember-400 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Calendar size={14} /> Meeting Details &amp; Calendar
                </button>
                <button
                  type="button"
                  onClick={() => setActiveConsoleTab('dealroom')}
                  className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-[13px] font-semibold transition-all ${
                    activeConsoleTab === 'dealroom'
                      ? 'bg-white dark:bg-[#1A1815] text-ember-600 dark:text-ember-400 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Phone size={14} /> Integrated Dialer &amp; Notes
                </button>
              </div>
            </div>

            <div className="mt-6 relative rounded-xl overflow-hidden border border-slate-200 dark:border-white/10">
              {activeConsoleTab === 'calendar' ? (
                <img
                  src="/calender2.png"
                  alt="AE Calendar and Up Next Meeting Detail View"
                  className="w-full object-cover max-h-[500px]"
                />
              ) : (
                <img
                  src="/calling_page.png"
                  alt="AE Integrated Calling and Note Taking Workspace"
                  className="w-full object-cover max-h-[500px]"
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 5. TESTIMONIALS (3 STACKED FEEDBACK CARDS) ═══════════════════════ */}
      <section className="px-6 py-16 lg:py-24 border-b border-slate-200 dark:border-white/[0.08]">
        <div className="mx-auto max-w-[1200px]">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ember-500">
              Testimonials
            </span>
            <h2 className="mt-2.5 font-bricolage text-[28px] sm:text-[38px] font-bold tracking-[-0.025em] text-slate-950 dark:text-white">
              What other AEs say about Harvin
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Marcus Vance',
                role: 'Senior Enterprise Account Executive',
                company: 'CloudScale',
                logoBadge: 'CS',
                metric: 'Saves 3.5 hrs / week on meeting prep',
                quote:
                  'I used to spend 25 minutes before every demo hunting down what the SDR said in Slack, what emails were opened, and what the prospect\u2019s tech stack was. Harvin puts the entire SDR discovery and Account 360 in front of me the second I open the calendar invite.',
              },
              {
                name: 'Elena Rostova',
                role: 'Strategic Account Executive',
                company: 'Nexis AI',
                logoBadge: 'NX',
                metric: '100% connected meeting outcomes',
                quote:
                  'The handoff from SDR to AE used to be a black hole. Now, not only do I get instant context on why they booked, but after the call I log the outcome, generate next-step tasks, and send structured feedback to my SDR in two clicks. The loop is truly closed.',
              },
              {
                name: 'David Cho',
                role: 'Mid-Market AE',
                company: 'PulsePoint Systems',
                logoBadge: 'PP',
                metric: '18% faster deal progression',
                quote:
                  'Being able to move seamlessly from an SDR-booked meeting straight into our Digital Sales Room without re-entering notes or re-uploading collateral has cut our deal cycle down significantly. Prospects feel like we\u2019ve been listening all along.',
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
                <div className="mt-6 pt-5 border-t border-slate-100 dark:border-white/10 flex items-center justify-between">
                  <div>
                    <p className="text-[14px] font-bold text-slate-900 dark:text-white">
                      {t.name}
                    </p>
                    <p className="text-[12px] text-slate-500 dark:text-slate-400">
                      {t.role} ·{' '}
                      <span className="text-slate-700 dark:text-slate-300 font-medium">
                        {t.company}
                      </span>
                    </p>
                  </div>
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sand-200 dark:bg-white/10 text-[12px] font-bold text-slate-700 dark:text-white">
                    {t.logoBadge}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 6. FAQS (5 QUESTIONS) ═════════════════════════════════════════════ */}
      <section className="px-6 py-16 lg:py-24 border-b border-slate-200 dark:border-white/[0.08] bg-sand-50/50 dark:bg-white/[0.01]">
        <div className="mx-auto max-w-[900px]">
          <div className="text-center mb-12">
            <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ember-500">
              FAQs
            </span>
            <h2 className="mt-2.5 font-bricolage text-[28px] sm:text-[38px] font-bold tracking-[-0.025em] text-slate-950 dark:text-white">
              What AEs ask about Harvin
            </h2>
          </div>

          <div className="space-y-3">
            {[
              {
                q: 'What does Harvin give an AE before a sales meeting?',
                a: 'Harvin brings together the account, prospect, SDR discovery, previous interactions, relevant signals, and talking points so AEs can prepare without reconstructing the conversation yourself.',
              },
              {
                q: 'How does Harvin improve SDR-to-AE handoffs?',
                a: 'When an SDR books a meeting, the relevant account context, discovery and previous interactions remain connected to the meeting so the AE can pick up where the SDR left off.',
              },
              {
                q: 'Can AEs manage meeting follow-ups in Harvin?',
                a: 'Yes. AEs can capture meeting outcomes, create follow-up tasks and move relevant conversations into opportunities while keeping the surrounding context connected.',
              },
              {
                q: 'Can I give feedback to the SDR?',
                a: "Yes. AEs can provide structured feedback in Harvin, which is shared with the SDR and becomes visible in the SDR Head's SDR 360° view.",
              },
              {
                q: 'Does Harvin replace my CRM?',
                a: 'No. Harvin is designed to work alongside your CRM, connecting the operational workflow around SDR-generated meetings, opportunities, and AE collaboration.',
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

      {/* ═══ 7. FINAL CTA CARD ═════════════════════════════════════════════════ */}
      <section className="relative px-6 py-20 lg:py-28 overflow-hidden bg-sand-100 dark:bg-slate-950">
        <div className="mx-auto max-w-[1100px] text-center">
          <div className="rounded-3xl border border-slate-200/90 dark:border-white/[0.12] bg-white/80 dark:bg-[#110F0D]/90 p-8 sm:p-14 shadow-xl backdrop-blur-xs">
            <h2 className="font-bricolage text-[30px] sm:text-[44px] font-bold tracking-[-0.03em] text-slate-950 dark:text-white">
              Ready to make every deal easier to manage?
            </h2>
            <p className="mt-4 text-[16px] sm:text-[19px] text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Bring meetings, conversations, opportunities, and next steps together in one connected workspace.
            </p>

            <form
              onSubmit={handleDemoSubmit}
              className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-lg mx-auto"
            >
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
        </div>
      </section>
    </div>
  );
}

export default AeClient;
