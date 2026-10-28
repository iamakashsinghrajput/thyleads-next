import Link from 'next/link';
import {
  ArrowRight,
  BarChart3,
  Briefcase,
  Check,
  Compass,
  Layers,
  Sparkles,
  Target,
  Users,
  Workflow,
  Zap,
} from 'lucide-react';

const WORKSPACES = [
  {
    role: 'For the SDR Head',
    title: 'SDR Team Management',
    anchor: '/sdr-head',
    icon: <BarChart3 className="w-5 h-5 text-ember-500" />,
    badge: 'Management & Visibility',
    bullets: [
      'See team activity and SDR performance',
      'Monitor account coverage and execution',
      'Track meetings, campaigns and outcomes',
      'Identify where team needs attention',
      'Coach reps with the right context',
    ],
  },
  {
    role: 'For the SDR',
    title: 'Sales Prospecting & Outreach',
    anchor: '/sdr',
    icon: <Target className="w-5 h-5 text-ember-500" />,
    badge: 'Daily Execution',
    bullets: [
      'Prioritize your accounts and prospects',
      'Understand buying intent behind an account',
      'Manage email, campaigns, calls and tasks',
      'Stay on top of follow-up and meetings',
      'Keep your day focused on the right work',
    ],
  },
  {
    role: 'For the AE',
    title: 'Collaborate & Move Forward',
    anchor: '/ae',
    icon: <Briefcase className="w-5 h-5 text-ember-500" />,
    badge: 'Handoff & Pipeline',
    bullets: [
      'See the full context behind every SDR-booked meeting',
      'Review SDR discovery and previous interactions',
      'Prepare with account and prospect intelligence',
      'Capture meeting outcomes and feedback',
      'Move opportunities forward with context',
    ],
  },
];

const WHY_HARVIN_POINTS = [
  {
    number: '01',
    title: 'Prioritized SDR days',
    description:
      'Account signals, research, and context come together to help SDRs prioritize accounts, know who to contact and decide what to do next.',
  },
  {
    number: '02',
    title: 'Complete SDR team visibility',
    description:
      'SDR Heads get visibility into team performance, activity, meetings, campaigns and coaching needs without stitching reports across tools.',
  },
  {
    number: '03',
    title: 'Context-rich SDR-to-AE handoffs',
    description:
      'AEs get the full SDR journey behind every meeting, from account intelligence and discovery to previous interactions and talking points.',
  },
  {
    number: '04',
    title: 'Continue the opportunity after the handoff',
    description:
      'AEs can take opportunities forward from the same platform, with integrated Digital Sales Room workflows.',
  },
  {
    number: '05',
    title: 'One connected SDR operation',
    description:
      'Every action, outcome, and piece of feedback stays connected across SDRs, SDR Heads, and AEs, creating one continuous workflow from signal to opportunity.',
  },
];

export default function WorkspacesSection() {
  return (
    <section className="border-t border-slate-200 bg-sand-100 px-4 py-20 dark:border-white/[0.06] dark:bg-[#040404] sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-[1200px]">
        {/* ── Section Header ────────────────────────────────────────────── */}
        <div className="mb-14 max-w-3xl">
          <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ember-500">
            Workspaces
          </span>
          <h2 className="font-instrument font-semibold mt-3 text-[clamp(30px,3.6vw,46px)] tracking-[-0.025em] text-slate-900 dark:text-white">
            Three Workspaces. One Platform.
          </h2>
          <p className="mt-4 text-[16.5px] leading-relaxed text-slate-600 dark:text-slate-400">
            Built around the people who run the SDR function. Harvin connects SDRs, SDR Heads, and
            AEs around the same continuous workflow.
          </p>
        </div>

        {/* ── 3 Workspace Cards Grid ────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {WORKSPACES.map((ws) => (
            <div
              key={ws.title}
              className="flex flex-col rounded-3xl border border-slate-200/90 bg-white p-7 sm:p-8 dark:border-white/[0.08] dark:bg-white/[0.02] shadow-sm transition-all duration-300 hover:border-ember-300 dark:hover:border-ember-500/30 hover:shadow-md"
            >
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-ember-50 dark:bg-ember-500/10 text-ember-500">
                  {ws.icon}
                </span>
                <span className="rounded-full bg-sand-100 px-3 py-1 text-[11px] font-semibold text-slate-600 dark:bg-white/[0.06] dark:text-slate-300">
                  {ws.badge}
                </span>
              </div>

              <p className="text-[12.5px] font-semibold uppercase tracking-[0.12em] text-ember-600 dark:text-ember-400">
                {ws.role}
              </p>

              <h3 className="font-instrument font-semibold mt-1 text-[20px] text-slate-900 dark:text-white">
                {ws.title}
              </h3>

              <ul className="mt-6 flex-1 space-y-3 border-t border-slate-100 dark:border-white/[0.06] pt-5">
                {ws.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-[14px] leading-relaxed text-slate-600 dark:text-slate-300">
                    <Check size={14} className="mt-1 shrink-0 text-ember-500" strokeWidth={2.6} />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-7 pt-4 border-t border-slate-100 dark:border-white/[0.06]">
                <Link
                  href={ws.anchor}
                  className="inline-flex items-center gap-1.5 text-[13.5px] font-bold text-ember-500 hover:text-ember-600 transition-colors group"
                >
                  <span>Know More</span>
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* ── Built around the people banner ────────────────────────────── */}
        <div className="mt-10 rounded-2xl border border-ember-500/20 bg-gradient-to-r from-ember-500/[0.06] via-sand-50 to-ember-500/[0.06] p-6 text-center dark:from-ember-950/20 dark:via-white/[0.02] dark:to-ember-950/20 shadow-sm">
          <p className="text-[16px] sm:text-[18px] font-semibold text-slate-900 dark:text-white">
            <span className="text-ember-600 dark:text-ember-400 font-bold">Built around the people who run the SDR function</span>
            {' — '}
            <span className="text-slate-600 dark:text-slate-300">
              SDRs know what to work on, SDR Heads know where team needs attention, and AEs get full context before the meeting.
            </span>
          </p>
        </div>

        {/* ── Why Harvin Section ────────────────────────────────────────── */}
        <div className="mt-24 pt-16 border-t border-slate-200 dark:border-white/[0.08]">
          <div className="max-w-3xl mb-14">
            <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ember-500">
              Why Harvin
            </span>
            <h3 className="font-instrument font-semibold mt-3 text-[clamp(28px,3.4vw,42px)] tracking-[-0.025em] text-slate-900 dark:text-white">
              Every role in sync with one connected workflow
            </h3>
            <p className="mt-4 text-[16.5px] leading-relaxed text-slate-600 dark:text-slate-400">
              From a prioritized SDR day to a contextual AE handoff and connected management,
              Harvin keeps the entire SDR workflow in view.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_HARVIN_POINTS.map((pt, idx) => (
              <div
                key={pt.number}
                className={`rounded-2xl border border-slate-200/90 bg-white p-7 dark:border-white/[0.08] dark:bg-white/[0.02] shadow-sm transition-all hover:border-slate-300 dark:hover:border-white/15 ${
                  idx === 4 ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-ember-500/10 font-mono text-[11px] font-bold text-ember-600 dark:text-ember-400">
                    {pt.number}
                  </span>
                  <h4 className="font-bricolage text-[18px] font-bold text-slate-900 dark:text-white">
                    {pt.title}
                  </h4>
                </div>
                <p className="text-[14.5px] leading-[1.7] text-slate-600 dark:text-slate-300">
                  {pt.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
