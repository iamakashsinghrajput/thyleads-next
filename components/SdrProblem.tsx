import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

/**
 * The problem and solution statement for Harvin.
 * Exactly matches Homepage Specification Page 1:
 * - The Problem: Your sales stack is connected. Your SDR operation isn't.
 * - The solution: Bring the whole SDR operation together with Harvin.
 */

const QUESTIONS = [
  'Who owns which accounts?',
  'Are the right accounts being worked?',
  'What is each SDR focused on?',
  'What’s generating conversations and meetings?',
  'Which reps need help?',
  'Is all of this activity actually creating pipeline?',
];

export default function SdrProblem() {
  return (
    <section className="border-t border-slate-200 bg-sand-100 px-4 py-20 dark:border-white/[0.06] dark:bg-[#040404] sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-[1180px]">
        {/* ── The Problem ────────────────────────────────────────────────── */}
        <div className="mb-12 max-w-[820px] lg:mb-14">
          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ember-500">
            The Problem
          </p>
          <h2 className="mt-4 font-bricolage text-[clamp(28px,3.4vw,44px)] font-bold leading-[1.09] tracking-[-0.025em] text-slate-900 dark:text-white">
            Your sales stack is connected. Your SDR operation isn&apos;t.
          </h2>
          <p className="mt-5 text-[16.5px] leading-[1.75] text-slate-600 dark:text-slate-400">
            Every part of the SDR workflow has its own tool. Your CRM holds the records. Your sales
            engagement platform runs outreach. Your sales intelligence tool surfaces buying
            signals. Your dialer handles calls. Your dashboards track performance.
          </p>
          <p className="mt-4 text-[17.5px] font-semibold leading-[1.6] text-slate-900 dark:text-white">
            Your team is left stitching the operation together.
          </p>
        </div>

        {/* ── Problem questions ──────────────────────────────────────────── */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {QUESTIONS.map((q) => (
            <div
              key={q}
              className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 dark:border-white/[0.08] dark:bg-white/[0.02] shadow-sm"
            >
              <span
                aria-hidden="true"
                className="mt-[3px] font-bricolage text-[15px] font-bold leading-none text-ember-500"
              >
                ?
              </span>
              <span className="text-[15px] font-semibold leading-[1.4] tracking-[-0.01em] text-slate-900 dark:text-white">
                {q}
              </span>
            </div>
          ))}
        </div>

        {/* ── The Solution ───────────────────────────────────────────────── */}
        <div className="mt-16 rounded-3xl border border-ember-500/25 bg-gradient-to-br from-ember-500/[0.07] via-sand-50 to-sand-100 p-8 dark:from-ember-950/30 dark:via-white/[0.02] dark:to-white/[0.04] sm:p-12 shadow-sm">
          <div className="max-w-[800px]">
            <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-ember-600 dark:text-ember-400">
              <Sparkles size={14} className="text-ember-500" />
              The solution
            </span>
            <h3 className="mt-3 font-bricolage text-[clamp(26px,3vw,38px)] font-bold leading-[1.14] tracking-[-0.02em] text-slate-900 dark:text-white">
              Bring the whole SDR operation together with Harvin.
            </h3>
            <p className="mt-4 text-[16.5px] leading-[1.75] text-slate-700 dark:text-slate-300">
              Harvin connects sales intelligence, prospecting, outreach, meetings, SDR management
              and AE handoffs in one workflow, so your team can move from account signal to
              qualified meeting without losing context.
            </p>
            <div className="mt-6">
              <Link
                href="/sdr-management-platform"
                className="inline-flex items-center gap-2 text-[15px] font-semibold text-ember-500 hover:text-ember-600 transition-colors group"
              >
                <span>Explore the connected SDR operating platform</span>
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
