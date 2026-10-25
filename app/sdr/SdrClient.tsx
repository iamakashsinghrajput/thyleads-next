'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Calendar,
  Check,
  ChevronDown,
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

export default function SdrClient() {
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
            <Target size={13} className="text-ember-500" />
            For the SDRs
          </span>

          <h1 className="font-bricolage text-[clamp(34px,5vw,62px)] font-bold leading-[1.08] tracking-[-0.03em] text-slate-950 dark:text-white max-w-4xl mx-auto">
            Start your day knowing what matters, <span className="text-ember-500">why and what to do next.</span>
          </h1>

          <p className="mt-6 text-[18px] sm:text-[20px] leading-[1.65] text-slate-600 dark:text-slate-300 max-w-3xl mx-auto font-normal">
            Harvin gives SDRs one workspace to prioritize accounts, understand buying signals, run outreach, manage follow-ups, and move qualified meetings to AEs with the right context.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#workspace"
              className="inline-flex items-center gap-2 rounded-xl bg-ember-500 px-6 py-3.5 text-[15px] font-semibold text-white shadow-sm transition-all duration-200 hover:bg-ember-600 hover:shadow-md active:scale-95"
            >
              See how Harvin works <ArrowRight size={16} />
            </a>

            <button
              type="button"
              onClick={() => openModal('talk-to-sales')}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 dark:border-white/15 bg-white dark:bg-white/5 px-6 py-3.5 text-[15px] font-semibold text-slate-800 dark:text-white transition-all duration-200 hover:bg-slate-100 dark:hover:bg-white/10 hover:border-slate-400 active:scale-95"
            >
              Book a demo
            </button>
          </div>
        </div>
      </section>

      {/* ═══ 2. SOUNDS FAMILIAR? (5 CHALLENGES) ═══════════════════════════════ */}
      <section className="px-6 py-16 lg:py-24 border-b border-slate-200 dark:border-white/[0.08] bg-white/50 dark:bg-black/20">
        <div className="mx-auto max-w-[1320px]">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ember-500">
              Sounds familiar?
            </span>
            <h2 className="mt-2.5 font-bricolage text-[28px] sm:text-[38px] font-bold tracking-[-0.025em] text-slate-950 dark:text-white">
              The five challenges slowing down SDR outreach
            </h2>
            <p className="mt-3 text-[16px] text-slate-600 dark:text-slate-300">
              You spend too much time moving between tools, deciding which accounts matter, conducting account research, tracking follow-ups, and making sure AEs have the right context.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                num: '01',
                title: 'Too many accounts, no clear priority.',
                desc: 'It’s hard to know which accounts deserve your attention first when signals are spread everywhere.',
              },
              {
                num: '02',
                title: 'Research takes time away from outreach.',
                desc: 'One email means jumping between LinkedIn, CRM, websites, and news just to find the right context.',
              },
              {
                num: '03',
                title: 'Switching between tools slows everything down.',
                desc: 'Email, LinkedIn, and calling live in separate windows, so context resets every time you switch channels.',
              },
              {
                num: '04',
                title: 'Follow-ups are easy to lose.',
                desc: 'With campaigns, replies, and meetings scattered around, important next steps can slip through.',
              },
              {
                num: '05',
                title: 'Manual SDR-to-AE handoffs take time.',
                desc: 'You compile emails, LinkedIn conversations, and call context just to prepare your AE for one meeting.',
              },
              {
                num: '✦',
                title: 'Built for how you actually work.',
                desc: 'Harvin connects signals, cadences, dialer, and AE handoff directly into a single unified SDR workflow.',
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

      {/* ═══ 3. MEET HARVIN ═══════════════════════════════════════════════════ */}
      <section className="px-6 py-16 lg:py-24 border-b border-slate-200 dark:border-white/[0.08]">
        <div className="mx-auto max-w-[1320px]">
          <div className="grid grid-cols-1 lg:grid-cols-[0.82fr_1.35fr] gap-10 lg:gap-14 items-center">
            {/* Copy side */}
            <div>
              <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ember-500">
                Meet Harvin
              </span>
              <h2 className="mt-2.5 font-bricolage text-[26px] sm:text-[34px] font-bold tracking-[-0.025em] leading-[1.18] text-slate-950 dark:text-white">
                A workspace built around your day, not around your tools.
              </h2>
              <p className="mt-3 text-[15px] sm:text-[16px] leading-relaxed text-slate-600 dark:text-slate-300">
                Harvin connects the information and actions around your SDR workflow, so you can move from account signal to outreach to meeting without constantly switching context.
              </p>

              <div className="mt-6 space-y-3">
                {[
                  {
                    title: 'Know what matters',
                    desc: 'See the accounts and signals worth your attention, all prioritized based on intent scoring.',
                  },
                  {
                    title: 'Understand why',
                    desc: 'Get company details, buying signals, and latest news before you reach out.',
                  },
                  {
                    title: 'Turn context into outreach',
                    desc: 'Create multi-channel cadences with our inbuilt campaign launcher and dialer.',
                  },
                  {
                    title: 'Keep the conversation moving',
                    desc: 'Track replies, handle tasks, schedule meetings, and stay on top of every follow-up.',
                  },
                  {
                    title: 'Pass the context forward',
                    desc: 'When you book a meeting, relevant context is shared automatically with the AE.',
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

            {/* Visual side: Priority Accounts & SDR Workspace (Large) */}
            <div className="relative">
              <div className="overflow-hidden rounded-2xl border border-slate-200/90 dark:border-white/[0.12] bg-white dark:bg-[#0F0E0C] shadow-2xl transition-all duration-300 hover:shadow-[0_25px_60px_-12px_rgba(201,76,30,0.18)]">
                <div className="relative overflow-hidden bg-slate-50 dark:bg-[#110F0D]">
                  <img
                    src="/Watchlist.png"
                    alt="Harvin SDR Daily Priorities and Intent Scores"
                    className="w-full object-cover object-top block dark:hidden"
                  />
                  <img
                    src="/Watchlist-dark.png"
                    alt="Harvin SDR Daily Priorities and Intent Scores"
                    className="w-full object-cover object-top hidden dark:block"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 4. YOUR SDR WORKSPACE (6 CAPABILITIES) ═══════════════════════════ */}
      <section id="workspace" className="scroll-mt-24 px-6 py-16 lg:py-24 border-b border-slate-200 dark:border-white/[0.08] bg-sand-50/50 dark:bg-white/[0.01]">
        <div className="mx-auto max-w-[1320px]">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ember-500">
              Your SDR Workspace
            </span>
            <h2 className="mt-2.5 font-bricolage text-[28px] sm:text-[38px] font-bold tracking-[-0.025em] text-slate-950 dark:text-white">
              Everything you need for the day, connected to the work you&apos;ve already done.
            </h2>
            <p className="mt-3 text-[16px] text-slate-600 dark:text-slate-300">
              The tools you need to prospect, engage, follow up and move accounts forward, connected around the way you actually work.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
            {[
              {
                step: '01',
                title: 'Start with the right accounts',
                desc: 'Harvin tracks relevant account signals and combines them into a weighted intent score. Your priority view gives you a clear starting point so you spend less time deciding and more time engaging.',
                tags: ['Priority Accounts', 'Recent Activities', "Today's Schedule", 'Tasks'],
              },
              {
                step: '02',
                title: 'Understand the account before you reach out',
                desc: 'See company information, buying signals, key contacts, recent activity and previous interactions in one place so your outreach starts with a reason, not a guess.',
                tags: ['Account Intelligence', 'Live Signals', 'Intent Score', 'Watchlists', 'Account 360'],
              },
              {
                step: '03',
                title: 'Turn account research into relevant outreach',
                desc: 'Move from account context to action without switching tools. Reach out through email, LinkedIn and calling while keeping previous interactions and next steps connected.',
                tags: ['Email', 'Dialer', 'Campaigns'],
              },
              {
                step: '04',
                title: 'Keep every next step moving',
                desc: 'Replies, tasks, meetings and follow-ups stay connected to the work you are already doing. Know what needs action, what is waiting, and what comes next.',
                tags: ['Tasks', 'Follow-ups', 'Meetings'],
              },
              {
                step: '05',
                title: 'Book the meeting. The context follows',
                desc: 'When a meeting is booked, Harvin carries account context, SDR discovery, past interactions and meeting details into the AE workflow so conversations don’t disappear.',
                tags: ['Hands Off AE Handoff'],
              },
              {
                step: '06',
                title: 'Learn from what happens next',
                desc: 'See more than how much you did. Understand campaign performance, channel patterns, meeting outcomes and AE feedback to learn what works and adjust.',
                tags: ['Performance Analytics', 'Campaign Insights', 'Meeting Outcomes', 'AE Feedback'],
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

          {/* Connected visual console below the cards */}
          <div className="mt-10 rounded-2xl border border-slate-200/90 dark:border-white/[0.12] bg-white dark:bg-[#0F0E0C] p-4 sm:p-6 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6 items-center">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-ember-500">
                  Execution &amp; Calling Console
                </span>
                <h4 className="mt-1 font-bricolage text-[22px] font-bold text-slate-900 dark:text-white">
                  Built-in Dialer with Talking Points &amp; Queue
                </h4>
                <p className="mt-2 text-[14px] leading-relaxed text-slate-600 dark:text-slate-400">
                  Dial straight from your daily queue with live talking points and automatically log dispositions back to the account history in one click.
                </p>
              </div>
              <div className="relative rounded-xl overflow-hidden border border-slate-200 dark:border-white/10">
                <img
                  src="/calling_page.png"
                  alt="SDR Cold Call Dialer Console"
                  className="w-full object-cover"
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
              What other SDRs say about Harvin
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Jordan Keller',
                role: 'Outbound SDR',
                company: 'Vanguard Tech',
                quote:
                  'I used to waste the first hour of every morning deciding who to call and looking up news. Harvin gives me a prioritized list with the exact buying reason. I start dialing in 5 minutes.',
                metric: '2.5x more accounts engaged daily',
              },
              {
                name: 'Samantha Wu',
                role: 'Enterprise BDR',
                company: 'Cognitive Flow',
                quote:
                  'Having email, dialer, and prospect history in the same screen means I never lose context. When someone picks up, I already see their recent email clicks and talking points.',
                metric: '+42% connect-to-meeting rate',
              },
              {
                name: 'Tyler Morris',
                role: 'Senior Sales Development Rep',
                company: 'DataPulse',
                quote:
                  'My AEs love our handoffs now. Everything from my discovery notes to the recording and why now travels right into their calendar invite. Zero complaints about meeting prep.',
                metric: '100% clean AE handoffs',
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
              Got a few questions?
            </h2>
          </div>

          <div className="space-y-3">
            {[
              {
                q: 'What does Harvin help me do as an SDR?',
                a: 'Harvin helps you prioritize the right accounts, understand the context behind them, reach out across channels, manage follow-ups, and move qualified meetings forward without jumping between disconnected tools.',
              },
              {
                q: 'How does Harvin help me decide which accounts to work on?',
                a: 'Harvin tracks multiple intent signals for each account and combines them into a weighted intent score. It uses that score to prioritize your day, so you know which accounts deserve your attention first.',
              },
              {
                q: 'How does Harvin help with SDR-to-AE handoff?',
                a: "Once you schedule a meeting, Harvin automatically carries the relevant account context, previous conversations, SDR discovery and meeting details into the AE's workspace. You don't need to create a separate handoff email or compile the context yourself.",
              },
              {
                q: 'Can I manage my outreach and follow-ups in Harvin?',
                a: 'Yes. You can work across email, LinkedIn and calling, track replies, manage tasks and follow-ups, and schedule meetings while keeping the conversation context connected.',
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
            Give your day a clear starting point.
          </h2>
          <p className="mt-4 text-[17px] sm:text-[19px] text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            See how Harvin brings your accounts, outreach and meetings into one workspace.
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
