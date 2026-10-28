'use client';

import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Briefcase,
  CheckCircle2,
  Database,
  FileSpreadsheet,
  Layers,
  LineChart,
  Network,
  Phone,
  Quote,
  Search,
  Send,
  Target,
  Workflow,
  type LucideIcon,
} from 'lucide-react';
import { useModal } from '@/components/ModalContext';

/* ── Content ──────────────────────────────────────────────────────────────── */

const STORY: { title: string; body: string[] }[] = [
  {
    title: 'Starting as an SDR',
    body: [
      'Rahul started his career as an SDR, where the work was simple to describe but difficult to manage. Find the right accounts. Understand what is happening inside them. Reach the right people. Follow up. Book meetings.',
    ],
  },
  {
    title: 'Stepping into the SDR Head role',
    body: [
      'As he moved into an SDR Head role, the problem changed.',
      'Now he wasn’t just managing his own pipeline. He had to understand what dozens of accounts, reps, conversations, meetings and campaigns were doing at once. The information existed, but it lived across different tools, dashboards and spreadsheets.',
    ],
  },
];

/* The scattered stack in "Why we built Harvin". */
const TOOLS: { icon: LucideIcon; name: string }[] = [
  { icon: Database, name: 'CRM' },
  { icon: Send, name: 'Sales engagement' },
  { icon: Phone, name: 'Dialer' },
  { icon: LineChart, name: 'Dashboards' },
  { icon: FileSpreadsheet, name: 'Spreadsheets' },
];

const ROLES: { icon: LucideIcon; title: string; tag: string; body: string; href?: string }[] = [
  { icon: Target, title: 'SDRs', tag: 'Day-to-day execution', body: 'Know what to work on, who to contact and what needs to happen next.', href: '/sdr' },
  { icon: BarChart3, title: 'SDR Heads', tag: 'Team visibility & coaching', body: 'Understand where the team needs attention and where they can make a difference.', href: '/sdr-head' },
  { icon: Layers, title: 'Sales Leaders & RevOps', tag: 'Funnel health & ROI', body: 'See how the SDR operation is performing and contributing to pipeline.' },
  { icon: Briefcase, title: 'AEs', tag: 'Meeting continuity & handoff', body: 'Walk into SDR-booked meetings with the context behind the conversation.', href: '/ae' },
];

const BELIEFS: { icon: LucideIcon; title: string; body: string }[] = [
  { icon: CheckCircle2, title: 'Clarity over complexity', body: 'Sales teams already have enough systems to manage. The job should become clearer, not harder, as the stack grows.' },
  { icon: Network, title: 'Keeping context together', body: 'Every interaction, signal, insight, and piece of work should stay connected to the account as it moves forward.' },
  { icon: Search, title: 'Less effort, more outreach', body: 'Leave the account research to us and execute your outreach from one connected workspace.' },
  { icon: Workflow, title: 'Connecting the workflow', body: 'Keep the work connected across SDRs, managers, AEs, and every stage of the sales process.' },
];

/* ── Shared bits ──────────────────────────────────────────────────────────── */

function Eyebrow({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <p
      className={`flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] ${
        dark ? 'text-ember-400' : 'text-ember-500'
      }`}
    >
      <span aria-hidden="true" className={`h-px w-6 ${dark ? 'bg-ember-400' : 'bg-ember-500'}`} />
      {children}
    </p>
  );
}

const H2 = 'font-instrument font-semibold text-[clamp(30px,3.6vw,46px)] leading-[1.08] tracking-[-0.025em]';

/* ── Page ─────────────────────────────────────────────────────────────────── */

export default function AboutClient() {
  const { openModal } = useModal();

  return (
    <div className="text-slate-900 dark:text-white">
      {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-slate-200 px-6 pb-20 pt-28 dark:border-white/[0.08] lg:pb-28 lg:pt-36">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_60%_at_50%_0%,rgba(201,76,30,0.12),transparent_70%)] dark:bg-[radial-gradient(55%_60%_at_50%_0%,rgba(201,76,30,0.2),transparent_70%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(35,34,32,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(35,34,32,0.045)_1px,transparent_1px)] bg-[size:56px_56px]
                     [mask-image:radial-gradient(60%_70%_at_50%_35%,#000,transparent)]
                     dark:bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)]"
        />

        <div className="relative mx-auto flex max-w-[960px] flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-ember-200 bg-ember-50/80 px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-ember-600 dark:border-ember-500/30 dark:bg-ember-500/10 dark:text-ember-400">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-ember-500" />
            About Harvin
          </span>
          <h1 className="mt-7 font-instrument font-semibold text-[clamp(38px,5.8vw,74px)] leading-[1.02] tracking-[-0.035em] text-slate-950 dark:text-white">
            Building a better way to run <span className="text-ember-500">SDR teams</span>
          </h1>
          <p className="mt-6 max-w-[620px] text-[18px] leading-[1.65] text-slate-600 dark:text-slate-300 sm:text-[20px]">
            Harvin is an SDR Management platform built from firsthand experience running and managing sales
            development teams.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/sdr-management-platform"
              className="group inline-flex items-center gap-2 rounded-btn bg-ember-500 px-6 py-3.5 text-[15px] font-semibold text-white
                         shadow-[0_1px_4px_rgba(201,76,30,0.3)] transition-all duration-150
                         hover:bg-ember-400 hover:shadow-[0_4px_14px_rgba(201,76,30,0.4)]
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-500 focus-visible:ring-offset-2"
            >
              See Harvin
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <button
              type="button"
              onClick={() => openModal('talk-to-sales')}
              className="inline-flex items-center gap-2 rounded-btn border border-slate-300 bg-white px-6 py-3.5 text-[15px] font-semibold text-slate-800 transition-colors
                         hover:border-slate-400 hover:bg-slate-50
                         dark:border-white/15 dark:bg-white/[0.04] dark:text-white dark:hover:bg-white/[0.08]"
            >
              Book a Demo
            </button>
          </div>

          {/* Who it's for — the same four roles as section 4 */}
          <ul className="mt-14 flex flex-wrap items-center justify-center gap-2.5">
            {ROLES.map(({ icon: Icon, title }) => (
              <li
                key={title}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-sand-50/80 px-3.5 py-2 text-[13.5px] font-medium text-slate-700
                           dark:border-white/[0.1] dark:bg-white/[0.04] dark:text-slate-300"
              >
                <Icon size={15} aria-hidden="true" className="text-ember-500" />
                {title}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 2. THE STORY BEHIND ──────────────────────────────────────────── */}
      <section className="border-b border-slate-200 px-6 py-20 dark:border-white/[0.08] lg:py-28">
        <div className="mx-auto grid max-w-[1180px] gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Eyebrow>Origin story</Eyebrow>
            <h2 className={`mt-5 ${H2} text-slate-950 dark:text-white`}>The story behind Harvin</h2>
            <p className="mt-5 max-w-[420px] text-[19px] leading-[1.6] text-slate-600 dark:text-slate-300">
              Harvin started with a problem Rahul experienced firsthand.
            </p>
          </div>

          <div>
            <ol className="relative space-y-6 border-l border-dashed border-ember-300 pl-8 dark:border-ember-500/40 sm:pl-10">
              {STORY.map((s, i) => (
                <li key={s.title} className="relative">
                  <span className="absolute -left-[49px] top-6 flex h-8 w-8 items-center justify-center rounded-full border-2 border-ember-300 bg-sand-100 font-mono text-[11px] font-semibold text-ember-600 dark:border-ember-500/50 dark:bg-slate-950 dark:text-ember-400 sm:-left-[57px]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="rounded-card border border-slate-200 bg-sand-50 p-7 shadow-[0_4px_32px_rgba(0,0,0,0.06)] dark:border-white/[0.08] dark:bg-[#0F0E0C] dark:shadow-[0_4px_40px_rgba(0,0,0,0.35)] sm:p-8">
                    <h3 className="font-instrument font-semibold text-[20px] text-slate-900 dark:text-white">{s.title}</h3>
                    {s.body.map((b) => (
                      <p key={b} className="mt-3 text-[16px] leading-[1.75] text-slate-600 dark:text-slate-300">
                        {b}
                      </p>
                    ))}
                  </div>
                </li>
              ))}

              <li className="relative">
                <span className="absolute -left-[49px] top-1 flex h-8 w-8 items-center justify-center rounded-full bg-ember-500 font-mono text-[11px] font-semibold text-white shadow-[0_0_0_6px_rgba(201,76,30,0.15)] sm:-left-[57px]">
                  03
                </span>
                <p className="text-[21px] font-semibold leading-snug text-slate-900 dark:text-white">
                  The challenge wasn&apos;t a lack of data.
                  <br />
                  <span className="text-ember-500">It was making sense of all of it quickly enough to act.</span>
                </p>
                <p className="mt-3 text-[16px] text-slate-500 dark:text-slate-400">That experience became the starting point for Harvin.</p>
              </li>
            </ol>

            {/* The question */}
            <div className="relative mt-12 overflow-hidden rounded-modal border border-white/[0.08] bg-[#0C0B09] p-8 shadow-[0_4px_40px_rgba(0,0,0,0.35)] sm:p-10">
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_90%_at_100%_0%,rgba(201,76,30,0.3),transparent_70%)]" />
              <Quote aria-hidden="true" size={64} className="absolute -right-2 -top-2 rotate-180 text-white/[0.05]" />
              <p className="relative text-[12px] font-semibold uppercase tracking-[0.14em] text-ember-400">
                A product built around one question
              </p>
              <p className="relative mt-4 font-instrument text-[24px] font-semibold leading-[1.3] tracking-[-0.01em] text-white sm:text-[30px]">
                &ldquo;How can we make the SDR operation easier to run, easier to understand and easier to improve?&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. WHY WE BUILT HARVIN ───────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-white/[0.06] bg-[#0C0B09] px-6 py-20 text-white lg:py-28">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_70%_at_0%_100%,rgba(201,76,30,0.22),transparent_70%)]" />
        <div className="relative mx-auto grid max-w-[1180px] items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <Eyebrow dark>Our purpose</Eyebrow>
            <h2 className={`mt-5 ${H2} text-white`}>Why we built Harvin</h2>
            <p className="mt-6 text-[20px] font-medium leading-[1.55] text-white">
              We didn&apos;t start with a product idea. We started with a problem.
            </p>
            <p className="mt-4 text-[16.5px] leading-[1.75] text-slate-400">
              Sales teams already had the tools they needed. What was missing was the layer connecting the work
              between them.
            </p>
            <div className="mt-8 border-t border-white/[0.08] pt-8">
              <p className="text-[21px] font-semibold text-white">So we built the platform we wished we had.</p>
              <p className="mt-3 text-[16.5px] leading-[1.75] text-slate-400">
                Harvin brings account intelligence, execution, management and AE collaboration into one connected
                operating environment, built around the way SDR teams actually work.
              </p>
              <Link
                href="/sdr-management-platform"
                className="group mt-8 inline-flex items-center gap-2 text-[16px] font-semibold text-ember-400 transition-colors hover:text-ember-300"
              >
                Explore Harvin
                <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* The tools existed — the connecting layer didn't */}
          <div aria-hidden="true" className="relative">
            <div className="rounded-modal border border-white/[0.08] bg-white/[0.02] p-6 sm:p-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">The tools teams already had</p>
              <div className="mt-5 flex flex-wrap gap-2.5">
                {TOOLS.map(({ icon: Icon, name }, i) => (
                  <span
                    key={name}
                    className={`inline-flex items-center gap-2 rounded-btn border border-white/[0.1] bg-white/[0.04] px-3.5 py-2.5 text-[13.5px] font-medium text-slate-300 ${
                      i % 2 ? 'translate-y-1.5' : ''
                    }`}
                  >
                    <Icon size={15} className="text-slate-500" />
                    {name}
                  </span>
                ))}
              </div>

              <div className="relative my-7 flex items-center gap-3">
                <span className="h-px flex-1 bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.18)_0_6px,transparent_6px_12px)]" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">What was missing</span>
                <span className="h-px flex-1 bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.18)_0_6px,transparent_6px_12px)]" />
              </div>

              <div className="relative overflow-hidden rounded-card border border-ember-500/40 bg-ember-500/[0.08] p-5 shadow-[0_0_40px_rgba(201,76,30,0.2)]">
                <div className="flex items-center gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white">
                    <img src="/harvin-mark.png" alt="" className="h-6 w-auto" />
                  </span>
                  <div>
                    <p className="text-[15px] font-semibold text-white">The layer connecting the work</p>
                    <p className="text-[13px] text-slate-400">Intelligence · execution · management · AE collaboration</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. BUILT FOR THE PEOPLE WHO MOVE THE PIPELINE FORWARD ─────────── */}
      <section className="border-b border-slate-200 px-6 py-20 dark:border-white/[0.08] lg:py-28">
        <div className="mx-auto max-w-[1180px]">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-ember-500">Harvin.AI</p>
            <h2 className={`mt-4 ${H2} text-slate-950 dark:text-white`}>
              Built for the people who move the pipeline forward
            </h2>
          </div>

          <div className="relative mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-[1fr_300px_1fr] lg:gap-6">
            {/* Hub — sits in the middle column on desktop */}
            <div className="relative order-first flex flex-col items-center justify-center overflow-hidden rounded-modal border border-white/[0.08] bg-[#0C0B09] p-8 text-center md:col-span-2 lg:order-none lg:col-span-1 lg:col-start-2 lg:row-span-2 lg:row-start-1">
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_100%,rgba(201,76,30,0.35),transparent_70%)]" />
              <span className="relative rounded-xl bg-white px-4 py-3 shadow-[0_0_40px_rgba(201,76,30,0.3)]">
                <img src="/harvin-logo.png" alt="Harvin" className="h-[24px] w-auto" />
              </span>
              <span className="relative mt-6 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-ember-400">
                <Workflow size={14} aria-hidden="true" />
                Connected operating system
              </span>
              <p className="relative mt-3 text-[17px] font-semibold leading-snug text-white">
                Harvin connects the people involved in the SDR operation around the same workflow.
              </p>
            </div>

            {ROLES.map(({ icon: Icon, title, tag, body, href }, i) => {
              const inner = (
                <>
                  <div className="flex items-start justify-between gap-4">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-ember-50 text-ember-500 dark:bg-ember-500/10">
                      <Icon size={21} strokeWidth={2.1} aria-hidden="true" />
                    </span>
                    {href && (
                      <ArrowUpRight
                        size={18}
                        aria-hidden="true"
                        className="text-slate-300 transition-colors group-hover:text-ember-500 dark:text-slate-600"
                      />
                    )}
                  </div>
                  <h3 className="mt-6 font-instrument font-semibold text-[21px] text-slate-900 dark:text-white">{title}</h3>
                  <p className="mt-1 text-[12.5px] font-semibold uppercase tracking-[0.08em] text-ember-600 dark:text-ember-400">{tag}</p>
                  <p className="mt-3 text-[15.5px] leading-[1.65] text-slate-600 dark:text-slate-300">{body}</p>
                </>
              );
              const cls = `group rounded-modal border border-slate-200 bg-sand-50 p-7 transition-all duration-200
                           shadow-[0_4px_32px_rgba(0,0,0,0.06)] dark:border-white/[0.08] dark:bg-[#0F0E0C] dark:shadow-[0_4px_40px_rgba(0,0,0,0.35)]
                           ${href ? 'hover:-translate-y-0.5 hover:border-ember-300 dark:hover:border-ember-500/40' : ''}
                           ${i % 2 === 0 ? 'lg:col-start-1' : 'lg:col-start-3'}`;
              return href ? (
                <Link key={title} href={href} className={cls}>
                  {inner}
                </Link>
              ) : (
                <div key={title} className={cls}>
                  {inner}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 5. WHAT WE BELIEVE IN ────────────────────────────────────────── */}
      <section className="border-b border-slate-200 px-6 py-20 dark:border-white/[0.08] lg:py-28">
        <div className="mx-auto max-w-[1180px]">
          <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
            <div>
              <Eyebrow>Core principles</Eyebrow>
              <h2 className={`mt-5 ${H2} text-slate-950 dark:text-white`}>What we believe in</h2>
            </div>
            <p className="text-[17px] leading-relaxed text-slate-500 dark:text-slate-400 lg:text-right">
              Four ideas that shape every part of the product.
            </p>
          </div>

          <ol className="mt-12 grid gap-px overflow-hidden rounded-modal border border-slate-200 bg-slate-200 dark:border-white/[0.08] dark:bg-white/[0.08] sm:grid-cols-2">
            {BELIEFS.map(({ icon: Icon, title, body }, i) => (
              <li
                key={title}
                className="group relative bg-sand-50 p-8 transition-colors duration-200 hover:bg-white dark:bg-[#0A0908] dark:hover:bg-[#0F0E0C] sm:p-10"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-ember-500/10 text-ember-500 transition-colors group-hover:bg-ember-500 group-hover:text-white">
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <span className="font-mono text-[13px] font-medium text-slate-300 dark:text-slate-600">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="mt-7 font-instrument font-semibold text-[22px] text-slate-900 dark:text-white">{title}</h3>
                <p className="mt-2.5 max-w-[440px] text-[15.5px] leading-[1.7] text-slate-600 dark:text-slate-300">{body}</p>
              </li>
            ))}
          </ol>

          <p className="mx-auto mt-14 max-w-2xl text-center font-instrument text-[clamp(22px,2.4vw,30px)] font-semibold leading-snug tracking-[-0.015em] text-slate-900 dark:text-white">
            Today, Harvin is building a better way to run the <span className="text-ember-500">SDR operation</span>.
          </p>
        </div>
      </section>

      {/* ── 6. THE TEAM ──────────────────────────────────────────────────── */}
      <section className="border-b border-slate-200 px-6 py-20 dark:border-white/[0.08] lg:py-28">
        <div className="mx-auto max-w-[1180px]">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-ember-500">Leadership &amp; engineering</p>
            <h2 className={`mt-4 ${H2} text-slate-950 dark:text-white`}>The team</h2>
            <p className="mt-4 text-[17px] text-slate-500 dark:text-slate-400">Meet the people building Harvin</p>
          </div>

          <div className="mx-auto mt-14 grid max-w-[880px] gap-6 md:grid-cols-2">
            {/* Rahul Dev */}
            <article className="flex flex-col rounded-modal border border-slate-200 bg-sand-50 p-7 shadow-[0_4px_32px_rgba(0,0,0,0.06)] dark:border-white/[0.08] dark:bg-[#0F0E0C] dark:shadow-[0_4px_40px_rgba(0,0,0,0.35)] sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <img
                  src="/team/rahul-dev.webp"
                  alt="Rahul Dev"
                  loading="lazy"
                  className="h-20 w-20 rounded-2xl object-cover object-top shadow-[0_8px_30px_rgba(0,0,0,0.15)]"
                />
                <span className="rounded-full bg-ember-500/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-ember-600 dark:text-ember-400">
                  Founder
                </span>
              </div>
              <div className="flex flex-1 flex-col">
                <h3 className="mt-6 font-instrument font-semibold text-[24px] text-slate-950 dark:text-white">Rahul Dev</h3>
                <p className="text-[14px] font-medium text-ember-600 dark:text-ember-400">CEO &amp; Founder</p>
                <p className="mt-4 text-[15px] leading-relaxed text-slate-600 dark:text-slate-400">
                  Former SDR and SDR Head who experienced the fragmentation of the outbound sales stack firsthand.
                </p>
                <div className="mt-auto flex flex-wrap items-center gap-2 pt-6 text-[12px] font-medium text-slate-500 dark:text-slate-400">
                  <span className="rounded-full border border-slate-200 px-2.5 py-1 dark:border-white/[0.1]">SDR</span>
                  <ArrowRight size={12} aria-hidden="true" className="text-slate-300 dark:text-slate-600" />
                  <span className="rounded-full border border-slate-200 px-2.5 py-1 dark:border-white/[0.1]">SDR Head</span>
                  <ArrowRight size={12} aria-hidden="true" className="text-slate-300 dark:text-slate-600" />
                  <span className="rounded-full border border-ember-300 bg-ember-50 px-2.5 py-1 text-ember-600 dark:border-ember-500/40 dark:bg-ember-500/10 dark:text-ember-400">
                    Harvin
                  </span>
                </div>
              </div>
            </article>

            {/* Akash Singh */}
            <article className="flex flex-col rounded-modal border border-slate-200 bg-sand-50 p-7 shadow-[0_4px_32px_rgba(0,0,0,0.06)] dark:border-white/[0.08] dark:bg-[#0F0E0C] dark:shadow-[0_4px_40px_rgba(0,0,0,0.35)] sm:p-8">
              <img
                src="/team/akash-singh.webp"
                alt="Akash Singh"
                loading="lazy"
                className="h-20 w-20 rounded-2xl object-cover shadow-[0_8px_30px_rgba(0,0,0,0.15)]"
              />
              <h3 className="mt-6 font-instrument font-semibold text-[24px] text-slate-950 dark:text-white">Akash Singh</h3>
              <p className="text-[14px] font-medium text-ember-600 dark:text-ember-400">Product Developer</p>
              <p className="mt-4 text-[15px] leading-relaxed text-slate-600 dark:text-slate-400">
                Architecting high-performance web systems and the connected SDR workflow engine.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* ── 7. CLOSING CTA ───────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#0C0B09] px-6 py-24 text-white lg:py-32">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_80%_at_50%_0%,rgba(201,76,30,0.3),transparent_70%)]" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(60%_70%_at_50%_30%,#000,transparent)]"
        />

        <div className="relative mx-auto max-w-[840px] text-center">
          <h2 className="font-instrument font-semibold text-[clamp(32px,4.4vw,52px)] leading-[1.08] tracking-[-0.03em]">
            The SDR operation deserves a place <span className="text-ember-400">of its own.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-[17px] leading-relaxed text-white/65 sm:text-[19px]">
            Harvin brings intelligence, execution, management and AE collaboration into one connected operating platform.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/sdr-management-platform"
              className="group inline-flex items-center gap-2 rounded-btn bg-ember-500 px-6 py-3.5 text-[15px] font-semibold text-white
                         shadow-[0_1px_4px_rgba(201,76,30,0.3)] transition-all duration-150
                         hover:bg-ember-400 hover:shadow-[0_4px_14px_rgba(201,76,30,0.4)]
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C0B09]"
            >
              Explore Harvin
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <button
              type="button"
              onClick={() => openModal('talk-to-sales')}
              className="inline-flex items-center gap-2 rounded-btn border border-white/20 bg-white/[0.05] px-6 py-3.5 text-[15px] font-semibold text-white transition-colors hover:border-white/30 hover:bg-white/10"
            >
              Book a Demo
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
