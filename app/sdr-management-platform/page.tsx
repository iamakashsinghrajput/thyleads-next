import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CTA from '@/components/CTA';
import JsonLd from '@/components/JsonLd';
import { breadcrumbSchema, faqSchema, graph } from '@/lib/schema';

/**
 * The category page — the one query this site can realistically win first.
 *
 * "SDR management platform" returns nothing but third-party listicles today.
 * A vendor homepage cannot displace those, but a page that actually DEFINES
 * the category can, because no listicle answers "what is one" directly and the
 * query is informational rather than commercial.
 *
 * WHY THIS IS NOT THIN SEO FILLER. It is written to be genuinely useful to
 * someone evaluating the category, including the parts that do not flatter
 * Harvin: when a CRM is enough, when a sales engagement platform is the right
 * purchase instead, and what to ask a vendor. A page that only argues for the
 * product gets treated as a landing page and ranks like one.
 *
 * ON NAMING COMPETITORS. The comparisons here are between CATEGORIES — CRM,
 * sales engagement platform, SDR management platform — not between named
 * products. Publishing a feature matrix asserting what Outreach or Salesloft
 * do or do not support would mean stating specifics about someone else's
 * roadmap that we cannot verify and that change without notice. Category
 * comparison captures the same search intent without that exposure.
 */

export const metadata: Metadata = {
  title: 'What Is an SDR Management Platform?',
  description:
    'An SDR management platform is the software a sales leader uses to run a sales development team — territories and account ownership, daily priorities, execution, meeting handoff and pipeline reporting. How it differs from a CRM and a sales engagement platform, and what to look for.',
  alternates: { canonical: '/sdr-management-platform' },
  openGraph: {
    title: 'What Is an SDR Management Platform?',
    description:
      'The category explained: what it covers, how it differs from a CRM and a sales engagement platform, and what to evaluate.',
    url: '/sdr-management-platform',
  },
};

const STACK = [
  {
    layer: 'CRM',
    answers: 'What happened, and what is the deal worth?',
    holds: 'Accounts, contacts, opportunities, closed revenue. The system of record.',
    gap: 'Records outcomes after the fact. It does not decide who works which account today, and reporting on SDR activity means building it yourself.',
  },
  {
    layer: 'Sales engagement platform',
    answers: 'How does a rep send this?',
    holds: 'Sequences, email, dialer, cadences. The system of execution.',
    gap: 'Built around the individual rep’s workflow. It does not hold territory ownership, does not decide priorities across a team, and stops at the meeting.',
  },
  {
    layer: 'SDR management platform',
    answers: 'Who should work what, and is it producing pipeline?',
    holds: 'Ownership, prioritisation, execution, handoff and reporting as one loop.',
    gap: 'Newer category. Overkill for a team of one or two reps, where a CRM and a sequencing tool genuinely are enough.',
  },
];

const CAPABILITIES = [
  {
    t: 'Territory and account ownership',
    d: 'Every target account has a named owner, and coverage — which accounts are being worked, which are untouched — is visible without anyone assembling a spreadsheet.',
  },
  {
    t: 'Prioritisation',
    d: 'Each rep starts the day with a ranked list rather than a decision. Ranking comes from account fit and live buying signals: hiring activity, headcount growth, funding, tech-stack change, M&A.',
  },
  {
    t: 'Execution across channels',
    d: 'Email sequences, a dialer, tasks and a shared inbox, with every action attached to the account and the rep who took it rather than living in a separate tool.',
  },
  {
    t: 'Meeting handoff',
    d: 'The account context, prior conversations and notes travel with the meeting to the AE, and the outcome — qualified, disqualified, opportunity, no-show — is recorded against the account.',
  },
  {
    t: 'Reporting and coaching',
    d: 'The funnel from accounts worked through conversations, meetings and opportunities to pipeline generated, broken down by rep, territory, sequence and channel — and the patterns that show who needs coaching.',
  },
];

const EVALUATE = [
  'Can it tell you which accounts have no owner, without an export?',
  'Does it explain why an account was prioritised, or only give you a score?',
  'Does the reporting reach pipeline, or stop at activity counts?',
  'Does the SDR get something useful in return for the visibility, or is it surveillance?',
  'Does meeting-booked end the reporting funnel, or does the outcome come back?',
  'Does it replace tools you already pay for, or become a sixth one?',
];

const FAQ = [
  {
    q: 'What is an SDR management platform?',
    a: 'An SDR management platform is the software a sales development leader uses to run a team, rather than the software an individual rep uses to send outreach. It holds territories and account ownership, decides what each rep should work on, runs execution across email, calls and tasks, tracks meetings through to the AE handoff, and reports on the pipeline the team produced.',
  },
  {
    q: 'How is it different from a sales engagement platform?',
    a: 'A sales engagement platform is built around the individual rep executing outreach — sequences, email, dialing. An SDR management platform sits a level above: it decides who should work which accounts, sets the priorities each rep starts the day with, and connects that work to the pipeline it created. Most SDR management platforms include the execution channels, but the management layer is the reason they exist.',
  },
  {
    q: 'Is a CRM not enough?',
    a: 'A CRM is a system of record: it captures what happened. It does not decide who works which account today, does not rank a rep’s book by buying signal, and does not report on sales development activity without custom work. For a team of one or two SDRs a CRM plus a sequencing tool is genuinely enough; the case for a management layer appears when there are enough reps and accounts that coverage and prioritisation stop being obvious.',
  },
  {
    q: 'Who uses one?',
    a: 'SDR leaders and SDR managers who own a team’s output, CROs and sales leaders who need to know what the sales development investment is producing, and the SDRs themselves, who get a prioritised workspace around their own accounts in return for the visibility their manager gains.',
  },
  {
    q: 'When is it the wrong purchase?',
    a: 'When the team is small enough that ownership and priorities are obvious without software, when there is no defined ICP for signals to be scored against, or when the real problem is message quality rather than coverage and prioritisation. A management layer makes an operation legible; it does not fix an offer nobody wants.',
  },
];

export default function SdrManagementPlatformPage() {
  return (
    <div className="min-h-screen bg-sand-100 dark:bg-[#040404]">
      <JsonLd
        data={graph(
          faqSchema(FAQ),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            {
              name: 'What is an SDR management platform',
              path: '/sdr-management-platform',
            },
          ]),
        )}
      />
      <Navbar />

      {/* ═══ DEFINITION ═══════════════════════════════════════════════════ */}
      <section className="border-b border-slate-200 px-4 pb-16 pt-28 dark:border-white/[0.06] sm:px-6 lg:px-8 lg:pt-32">
        {/* The outer container matches every section below it (1180) so the H1
            shares a left edge with the rest of the page; the inner cap keeps the
            measure readable. Centring an 820 container here instead put the
            headline ~180px right of every heading under it. */}
        <div className="mx-auto max-w-[1180px]">
          <div className="max-w-[820px]">
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ember-500">Guide</p>
            <h1 className="mt-4 font-bricolage text-[clamp(31px,4.2vw,50px)] font-bold leading-[1.07] tracking-[-0.025em] text-slate-900 dark:text-white">
              What is an SDR management platform?
            </h1>

            {/* The extractable answer, first thing after the H1 — an answer
              engine quoting one paragraph from this page should get this one. */}
            <p className="mt-6 text-[18px] leading-[1.7] text-slate-700 dark:text-slate-200">
              An SDR management platform is the software a sales development leader uses to{' '}
              <strong className="font-bold text-slate-900 dark:text-white">run a team</strong>, rather than
              the software an individual rep uses to send outreach. It holds territories and account
              ownership, decides what each rep should work on today, runs execution across email, calls and
              tasks, carries meetings through to the AE handoff, and reports on the pipeline the team
              produced.
            </p>

            <p className="mt-5 text-[16.5px] leading-[1.75] text-slate-600 dark:text-slate-400">
              The category exists because of a gap. SDR teams already own a CRM and a sales engagement tool,
              and neither answers the questions a manager is actually asked: who owns which accounts, whether
              the right ones are being worked, what each rep is focused on, which reps need help, and whether
              any of the activity is creating pipeline. Those answers get assembled by hand, every week, from
              exports.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ THE STACK ════════════════════════════════════════════════════ */}
      <section className="border-b border-slate-200 px-4 py-16 dark:border-white/[0.06] sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-[1180px]">
          <h2 className="max-w-[720px] text-[clamp(25px,3vw,36px)] font-semibold leading-[1.12] tracking-[-0.025em] text-slate-900 dark:text-white">
            How it differs from a CRM and a sales engagement platform
          </h2>
          <p className="mt-4 max-w-[720px] text-[16px] leading-[1.7] text-slate-600 dark:text-slate-400">
            These are three layers, not three competitors. Most teams running sales development end up with
            all three; the question is which layer a given problem belongs to.
          </p>

          <div className="mt-10 border-t border-slate-200 dark:border-white/[0.08]">
            {STACK.map((s) => (
              <div
                key={s.layer}
                className="grid gap-4 border-b border-slate-200 py-7 dark:border-white/[0.08] lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-10"
              >
                <div>
                  <h3 className="text-[18px] font-bold leading-[1.3] tracking-[-0.015em] text-slate-900 dark:text-white">
                    {s.layer}
                  </h3>
                  <p className="mt-2 text-[13.5px] italic leading-[1.5] text-ember-600 dark:text-ember-300">
                    {s.answers}
                  </p>
                </div>
                <p className="text-[15px] leading-[1.65] text-slate-600 dark:text-slate-400">{s.holds}</p>
                <p className="text-[15px] leading-[1.65] text-slate-500 dark:text-slate-500">{s.gap}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ WHAT IT COVERS ═══════════════════════════════════════════════ */}
      <section className="border-b border-slate-200 px-4 py-16 dark:border-white/[0.06] sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-[1180px]">
          <h2 className="max-w-[720px] text-[clamp(25px,3vw,36px)] font-semibold leading-[1.12] tracking-[-0.025em] text-slate-900 dark:text-white">
            What an SDR management platform covers
          </h2>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:gap-6">
            {CAPABILITIES.map((c, i) => (
              <div
                key={c.t}
                className="rounded-2xl border border-slate-200 bg-white p-7 dark:border-white/[0.08] dark:bg-white/[0.02]"
              >
                <span className="font-mono text-[11px] font-bold tabular-nums text-ember-500">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 text-[18px] font-bold leading-[1.3] tracking-[-0.015em] text-slate-900 dark:text-white">
                  {c.t}
                </h3>
                <p className="mt-2.5 text-[15px] leading-[1.65] text-slate-500 dark:text-slate-400">{c.d}</p>
              </div>
            ))}
          </div>

          <p className="mt-8 text-[16px] leading-[1.7] text-slate-600 dark:text-slate-400">
            Harvin is built to this shape.{' '}
            <Link
              href="/platform"
              className="font-semibold text-ember-600 underline underline-offset-4 dark:text-ember-300"
            >
              See every module on the platform page
            </Link>
            , or read how the same loop looks for{' '}
            <Link
              href="/solutions/fintech"
              className="font-semibold text-ember-600 underline underline-offset-4 dark:text-ember-300"
            >
              FinTech
            </Link>
            ,{' '}
            <Link
              href="/solutions/martech"
              className="font-semibold text-ember-600 underline underline-offset-4 dark:text-ember-300"
            >
              MarTech
            </Link>{' '}
            and{' '}
            <Link
              href="/solutions/hrtech"
              className="font-semibold text-ember-600 underline underline-offset-4 dark:text-ember-300"
            >
              HRTech
            </Link>{' '}
            teams.
          </p>
        </div>
      </section>

      {/* ═══ EVALUATING ═══════════════════════════════════════════════════ */}
      <section className="border-b border-slate-200 px-4 py-16 dark:border-white/[0.06] sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-[1180px]">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <h2 className="text-[clamp(25px,3vw,36px)] font-semibold leading-[1.12] tracking-[-0.025em] text-slate-900 dark:text-white">
                What to ask when you evaluate one
              </h2>
              <p className="mt-4 text-[16px] leading-[1.7] text-slate-600 dark:text-slate-400">
                Most of these separate a genuine management layer from a sequencing tool with a dashboard
                bolted on.
              </p>
            </div>

            <ul className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white dark:divide-white/[0.08] dark:border-white/[0.08] dark:bg-white/[0.02]">
              {EVALUATE.map((q) => (
                <li key={q} className="flex items-start gap-3 px-6 py-4">
                  <Check size={15} strokeWidth={2.8} className="mt-[3px] flex-shrink-0 text-ember-500" />
                  <span className="text-[15.5px] leading-[1.55] text-slate-700 dark:text-slate-300">{q}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ═══ FAQ ══════════════════════════════════════════════════════════ */}
      <section className="border-b border-slate-200 px-4 py-16 dark:border-white/[0.06] sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-[1180px]">
          <h2 className="mb-10 max-w-[720px] text-[clamp(25px,3vw,36px)] font-semibold leading-[1.12] tracking-[-0.025em] text-slate-900 dark:text-white">
            Common questions
          </h2>

          <div className="border-t border-slate-200 dark:border-white/[0.08]">
            {FAQ.map((f) => (
              <div
                key={f.q}
                className="grid gap-3 border-b border-slate-200 py-7 dark:border-white/[0.08] md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] md:gap-12"
              >
                <h3 className="text-[17px] font-bold leading-[1.35] tracking-[-0.015em] text-slate-900 dark:text-white">
                  {f.q}
                </h3>
                <p className="text-[15.5px] leading-[1.7] text-slate-600 dark:text-slate-400">{f.a}</p>
              </div>
            ))}
          </div>

          <Link
            href="/platform"
            className="mt-10 inline-flex items-center gap-2 rounded-btn bg-ember-500 px-5 py-3 text-[14px] font-semibold text-white shadow-[0_1px_4px_rgba(201,76,30,0.3)] transition-all hover:bg-ember-400"
          >
            See how Harvin does it
            <ArrowRight size={15} strokeWidth={2.4} />
          </Link>
        </div>
      </section>

      <CTA />
      <Footer />
    </div>
  );
}
