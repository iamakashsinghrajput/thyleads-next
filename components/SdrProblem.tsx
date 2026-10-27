import Link from 'next/link';
import { ArrowRight, BarChart3, Database, Phone, Radar, Send, Sparkles, type LucideIcon } from 'lucide-react';
import Wordmark from '@/components/Wordmark';

/**
 * The problem and solution statement for Harvin.
 * Copy matches Homepage Specification Page 1:
 * - The Problem: Your sales stack is connected. Your SDR operation isn't.
 * - The solution: Bring the whole SDR operation together with Harvin.
 */

/* The five tools named in the problem paragraph — shown as a disconnected strip,
   then again converging into Harvin in the solution card. */
const STACK: { icon: LucideIcon; name: string; role: string }[] = [
  { icon: Database, name: 'CRM', role: 'Holds the records' },
  { icon: Send, name: 'Sales engagement', role: 'Runs outreach' },
  { icon: Radar, name: 'Sales intelligence', role: 'Surfaces buying signals' },
  { icon: Phone, name: 'Dialer', role: 'Handles calls' },
  { icon: BarChart3, name: 'Dashboards', role: 'Track performance' },
];

const QUESTIONS = [
  'Who owns which accounts?',
  'Are the right accounts being worked?',
  'What is each SDR focused on?',
  'What’s generating conversations and meetings?',
  'Which reps need help?',
  'Is all of this activity actually creating pipeline?',
];

/* Geometry for the convergence diagram — chip height + gap must match the classes below. */
const CHIP_H = 40;
const CHIP_GAP = 12;
const DIAGRAM_H = STACK.length * CHIP_H + (STACK.length - 1) * CHIP_GAP;

export default function SdrProblem() {
  return (
    <section className="border-t border-slate-200 bg-sand-100 px-4 py-20 dark:border-white/[0.06] dark:bg-[#040404] sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-[1180px]">
        {/* ── The Problem ────────────────────────────────────────────────── */}
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-7">
            <p className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-ember-500">
              <span aria-hidden="true" className="h-px w-6 bg-ember-500" />
              The Problem
            </p>
            <h2 className="mt-5 font-bricolage text-[clamp(30px,3.6vw,48px)] font-bold leading-[1.06] tracking-[-0.025em] text-slate-900 dark:text-white">
              Your sales stack is connected.{' '}
              <span className="text-slate-400 dark:text-slate-500">Your SDR operation isn&apos;t.</span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-[16px] leading-relaxed text-slate-500 dark:text-slate-400">
              Every part of the SDR workflow has its own tool. Your CRM holds the records. Your sales
              engagement platform runs outreach. Your sales intelligence tool surfaces buying
              signals. Your dialer handles calls. Your dashboards track performance.
            </p>
            <p className="mt-4 border-l-2 border-ember-500 pl-4 text-[16px] font-semibold leading-snug text-slate-900 dark:text-white">
              Your team is left stitching the operation together.
            </p>
          </div>
        </div>

        {/* ── Disconnected stack ─────────────────────────────────────────── */}
        <div className="relative mt-14">
          {/* broken line running behind the cards */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-1/2 hidden h-px -translate-y-1/2 lg:block
                       bg-[repeating-linear-gradient(90deg,rgb(194_192_186)_0_6px,transparent_6px_14px)]
                       dark:bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.15)_0_6px,transparent_6px_14px)]"
          />
          <ul className="relative grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-6">
            {STACK.map(({ icon: Icon, name, role }, i) => (
              <li
                key={name}
                className={`${i === STACK.length - 1 ? 'col-span-2 sm:col-span-1' : ''} flex items-center gap-3 rounded-card border border-slate-200 bg-sand-50 p-4
                           shadow-[0_4px_32px_rgba(0,0,0,0.06)]
                           dark:border-white/[0.08] dark:bg-[#0F0E0C] dark:shadow-[0_4px_40px_rgba(0,0,0,0.35)]`}
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-btn bg-slate-100 text-slate-500 dark:bg-white/[0.06] dark:text-slate-400">
                  <Icon size={16} strokeWidth={2} aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[13.5px] font-semibold leading-snug text-slate-900 dark:text-white">{name}</span>
                  <span className="block text-[12px] leading-snug text-slate-500 dark:text-slate-400">{role}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Problem questions ──────────────────────────────────────────── */}
        <div className="mt-20">
          <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
            The questions nobody can answer in one place
          </p>
          <ol className="mt-6 grid gap-px overflow-hidden rounded-card border border-slate-200 bg-slate-200 dark:border-white/[0.08] dark:bg-white/[0.08] sm:grid-cols-2 lg:grid-cols-3">
            {QUESTIONS.map((q, i) => (
              <li
                key={q}
                className="group bg-sand-50 p-6 transition-colors duration-200 hover:bg-white dark:bg-[#0A0908] dark:hover:bg-[#0F0E0C] lg:p-7"
              >
                <span className="font-mono text-[12px] font-medium text-ember-500">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="mt-3 text-[17px] font-semibold leading-snug tracking-[-0.01em] text-slate-900 dark:text-white">
                  {q}
                </p>
              </li>
            ))}
          </ol>
        </div>

        {/* ── The Solution ───────────────────────────────────────────────── */}
        <div
          className="relative mt-20 overflow-hidden rounded-modal border border-white/[0.08] bg-[#0C0B09] p-8
                     shadow-[0_4px_40px_rgba(0,0,0,0.35)] sm:p-12 lg:p-14"
        >
          {/* ember glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_80%_at_100%_0%,rgba(201,76,30,0.28)_0%,transparent_70%)]"
          />

          <div className="relative grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-ember-400">
                <Sparkles size={14} aria-hidden="true" />
                The solution
              </span>
              <h3 className="mt-4 font-bricolage text-[clamp(26px,3vw,40px)] font-bold leading-[1.1] tracking-[-0.02em] text-white">
                Bring the whole SDR operation together with Harvin.
              </h3>
              <p className="mt-5 text-[16px] leading-relaxed text-slate-400">
                Harvin connects sales intelligence, prospecting, outreach, meetings, SDR management
                and AE handoffs in one workflow, so your team can move from account signal to
                qualified meeting without losing context.
              </p>
              <Link
                href="/sdr-management-platform"
                className="group mt-8 inline-flex items-center gap-2 rounded-btn bg-ember-500 px-5 py-3 text-[14px] font-semibold text-white
                           shadow-[0_1px_4px_rgba(201,76,30,0.3)] transition-all duration-150
                           hover:bg-ember-400 hover:shadow-[0_4px_14px_rgba(201,76,30,0.4)]
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C0B09]"
              >
                Explore the connected SDR operating platform
                <ArrowRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Convergence diagram — the same five tools feeding one platform */}
            <div aria-hidden="true" className="hidden items-center sm:flex lg:col-span-6 lg:justify-end">
              <ul className="flex shrink-0 flex-col gap-3">
                {STACK.map(({ icon: Icon, name }) => (
                  <li
                    key={name}
                    className="flex h-10 items-center gap-2.5 rounded-btn border border-white/[0.08] bg-white/[0.04] px-3 text-[13px] font-medium text-slate-300"
                  >
                    <Icon size={14} strokeWidth={2} className="text-slate-400" />
                    {name}
                  </li>
                ))}
              </ul>

              <svg
                viewBox={`0 0 100 ${DIAGRAM_H}`}
                preserveAspectRatio="none"
                className="h-[248px] w-20 shrink-0 lg:w-28"
                fill="none"
              >
                <defs>
                  <linearGradient id="sdr-converge" x1="0" x2="1" y1="0" y2="0">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
                    <stop offset="100%" stopColor="#E56B2C" />
                  </linearGradient>
                </defs>
                {STACK.map((_, i) => {
                  const y = i * (CHIP_H + CHIP_GAP) + CHIP_H / 2;
                  const mid = DIAGRAM_H / 2;
                  return (
                    <path
                      key={i}
                      d={`M0 ${y} C 55 ${y}, 45 ${mid}, 100 ${mid}`}
                      stroke="url(#sdr-converge)"
                      strokeWidth="1.5"
                      vectorEffect="non-scaling-stroke"
                    />
                  );
                })}
              </svg>

              <div className="flex shrink-0 items-center rounded-card border border-ember-500/40 bg-ember-500/[0.08] px-5 py-4 shadow-[0_0_40px_rgba(201,76,30,0.25)]">
                <Wordmark size={20} className="text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
