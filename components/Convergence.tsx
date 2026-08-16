import { Brain, Building2, CalendarDays, ChartColumn, Mail, Network, Phone, Radar, Target } from 'lucide-react';

/**
 * Six systems converging into one — drawn as a flow, because that is the claim.
 *
 * The six run across the top as their own small screens, six strands gather
 * them into the Harvin core, and one line falls out the bottom. Earlier passes
 * showed the six as a grid or a scroll tour; both listed the parts without
 * showing the joining, which is the only thing this section is arguing.
 *
 * THE COPY IS FIXED. These are the six systems a GTM team buys separately —
 * do not substitute Harvin's module names, which are the answer, not the
 * problem being described.
 *
 * GEOMETRY. The strands are drawn in a 1200-wide viewBox with `preserveAspect
 * Ratio="none"`, and each starts at the centre of its column: (i + 0.5) * 1200
 * / CAPABILITIES.length. That expression is what keeps the strands under their
 * cards — add a seventh capability and the strands re-space with the grid
 * instead of drifting off it. The cards use grid-cols with NO gap for the same
 * reason: a gap shifts column centres away from the SVG's exact sixths.
 *
 * Marks are real assets from /public/logos. Counts and scores are Harvin's own
 * output and illustrative; signals stay metric-shaped rather than named events,
 * so nothing invented is asserted about a real company.
 */

const styles = `
  @keyframes cvDraw { from { stroke-dashoffset: 300; } to { stroke-dashoffset: 0; } }
  @keyframes cvPulse { 0%, 100% { opacity: 0.35; } 50% { opacity: 1; } }
  @media (prefers-reduced-motion: reduce) {
    .cv-draw { animation: none !important; stroke-dashoffset: 0 !important; }
    .cv-pulse { animation: none !important; }
  }
`;

/* ── The six mini screens ─────────────────────────────────────────────── */
function Chrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-[104px] overflow-hidden rounded-lg border border-slate-200 bg-white p-2 dark:border-white/10 dark:bg-white/[0.05]">
      {children}
    </div>
  );
}

function Row({ a, b, dim }: { a: string; b: string; dim?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-2 py-[3px]">
      <span className="min-w-0 truncate text-[9px] text-slate-400 dark:text-slate-500">{a}</span>
      <span className={`flex-shrink-0 text-[9.5px] font-bold tabular-nums ${dim ? 'text-slate-400 dark:text-slate-500' : 'text-slate-900 dark:text-white'}`}>
        {b}
      </span>
    </div>
  );
}

function LogoRow({ slug, name, score }: { slug: string; name: string; score: number }) {
  return (
    <div className="flex items-center gap-1.5 py-[3px]">
      <span className="grid h-4 w-4 flex-shrink-0 place-items-center rounded border border-slate-200 bg-white p-[2px] dark:border-white/10">
        <img src={`/logos/${slug}.svg`} alt="" aria-hidden="true" className="h-auto w-full object-contain" />
      </span>
      <span className="min-w-0 flex-1 truncate text-[9.5px] font-semibold text-slate-900 dark:text-white">{name}</span>
      <span className="flex-shrink-0 rounded bg-ember-500/[0.12] px-1 text-[9px] font-bold tabular-nums text-ember-500 dark:text-ember-300">
        {score}
      </span>
    </div>
  );
}

const MINI = {
  account: (
    <Chrome>
      <div className="flex items-center gap-1.5 border-b border-slate-200/70 pb-1.5 dark:border-white/[0.06]">
        <span className="grid h-4 w-4 place-items-center rounded border border-slate-200 bg-white p-[2px] dark:border-white/10">
          <img src="/logos/walmart.svg" alt="" aria-hidden="true" className="h-auto w-full object-contain" />
        </span>
        <span className="text-[9.5px] font-bold text-slate-900 dark:text-white">Walmart</span>
        <span className="ml-auto rounded bg-ember-500/[0.12] px-1 text-[9px] font-bold text-ember-500 dark:text-ember-300">96</span>
      </div>
      <div className="pt-1">
        <Row a="Employees" b="2.1M" />
        <Row a="Tech stack" b="240" />
        <Row a="Contacts" b="38" />
      </div>
    </Chrome>
  ),
  signals: (
    <Chrome>
      <p className="border-b border-slate-200/70 pb-1.5 text-[9px] font-semibold uppercase tracking-[0.08em] text-slate-400 dark:border-white/[0.06] dark:text-slate-500">
        12 today
      </p>
      <div className="pt-1">
        <LogoRow slug="nike" name="Nike" score={94} />
        <LogoRow slug="peloton" name="Peloton" score={89} />
        <LogoRow slug="etsy" name="Etsy" score={74} />
      </div>
    </Chrome>
  ),
  motion: (
    <Chrome>
      <p className="text-[9px] font-semibold uppercase tracking-[0.08em] text-slate-400 dark:text-slate-500">Cycle · 14 wks</p>
      {/* widths are the stage weeks, so the bar is the data */}
      <div className="mt-1.5 flex gap-[3px]">
        {[3, 6, 4, 1].map((w, i) => (
          <span
            key={i}
            style={{ flex: w }}
            className={`h-2 rounded-[2px] ${i === 1 ? 'bg-ember-500' : 'bg-ember-500/25 dark:bg-ember-500/30'}`}
          />
        ))}
      </div>
      <div className="mt-2 flex flex-wrap gap-[3px]">
        {['CFO', 'CIO', 'VP Mktg', 'Legal'].map((c, i) => (
          <span
            key={c}
            className={`rounded px-1 py-[1px] text-[8.5px] font-semibold ${
              i < 2 ? 'bg-ember-500/[0.12] text-ember-500 dark:text-ember-300' : 'bg-sand-100 text-slate-500 dark:bg-white/[0.07] dark:text-slate-400'
            }`}
          >
            {c}
          </span>
        ))}
      </div>
    </Chrome>
  ),
  campaign: (
    <Chrome>
      {[
        { Icon: Mail, l: 'Email', d: 'Day 0', on: true },
        { Icon: Phone, l: 'Call', d: 'Day 2', on: false },
        { Icon: Mail, l: 'Email', d: 'Day 5', on: false },
      ].map((s, i) => (
        <div key={i} className="flex items-center gap-1.5 py-[3px]">
          <span className={`h-1.5 w-1.5 flex-shrink-0 rounded-full ${s.on ? 'bg-ember-500' : 'bg-slate-300 dark:bg-white/20'}`} />
          <s.Icon size={9} strokeWidth={2.4} className="flex-shrink-0 text-slate-400 dark:text-slate-500" />
          <span className="min-w-0 flex-1 truncate text-[9.5px] font-semibold text-slate-900 dark:text-white">{s.l}</span>
          <span className="flex-shrink-0 font-mono text-[8.5px] text-slate-400 dark:text-slate-500">{s.d}</span>
        </div>
      ))}
    </Chrome>
  ),
  meeting: (
    <Chrome>
      <p className="text-[9px] font-semibold uppercase tracking-[0.08em] text-slate-400 dark:text-slate-500">32 min · 4 people</p>
      <p className="mt-1.5 text-[9.5px] leading-[1.35] text-slate-500 dark:text-slate-400">
        Consolidating three vendors this quarter
      </p>
      <div className="mt-1.5 rounded border border-ember-500/35 bg-ember-500/[0.07] px-1.5 py-1">
        <p className="text-[8.5px] font-semibold uppercase tracking-[0.08em] text-ember-500">Next step</p>
        <p className="text-[9.5px] font-semibold text-slate-900 dark:text-white">Security review · 5d</p>
      </div>
    </Chrome>
  ),
  learning: (
    <Chrome>
      <div className="flex items-baseline justify-between">
        <p className="text-[9px] font-semibold uppercase tracking-[0.08em] text-slate-400 dark:text-slate-500">Accuracy</p>
        <p className="text-[9.5px] font-bold text-ember-500">83%</p>
      </div>
      <div className="mt-1.5 flex h-[34px] items-end gap-[3px]">
        {[58, 63, 67, 71, 74, 79, 83].map((v, i, a) => (
          <span
            key={i}
            style={{ height: `${(v / Math.max(...a)) * 100}%` }}
            className={`flex-1 rounded-t-[2px] ${i === a.length - 1 ? 'bg-ember-500' : 'bg-ember-500/25 dark:bg-ember-500/30'}`}
          />
        ))}
      </div>
      <Row a="Hiring velocity" b="+3" />
    </Chrome>
  ),
};

const CAPABILITIES = [
  { label: 'Account\nintelligence', note: 'Living record per account', Icon: Building2, mini: MINI.account },
  { label: 'AI signal\ndetection', note: 'Funding, hiring, M&A', Icon: Radar, mini: MINI.signals },
  { label: 'Business motion\nanalysis', note: 'How they actually buy', Icon: ChartColumn, mini: MINI.motion },
  { label: 'Campaign\norchestration', note: 'Sequences off the signal', Icon: Network, mini: MINI.campaign },
  { label: 'Meeting\nintelligence', note: 'What was said, and next', Icon: CalendarDays, mini: MINI.meeting },
  { label: 'Learning\nsystems', note: 'Scoring sharpens over time', Icon: Brain, mini: MINI.learning },
];

const PIPELINE = ['Ingest', 'Score', 'List', 'Orchestrate'];

/** SVG space for the strands. Column centres are derived from the count, so
 *  the drawing and the grid above it cannot drift apart. */
const VB_W = 1200;
const VB_H = 96;
const COL_X = (i: number) => ((i + 0.5) * VB_W) / CAPABILITIES.length;

function Strands() {
  const cx = VB_W / 2;
  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      preserveAspectRatio="none"
      className="h-[88px] w-full"
      aria-hidden="true"
      fill="none"
    >
      {CAPABILITIES.map((_, i) => {
        const x = COL_X(i);
        return (
          <path
            key={i}
            d={`M ${x} 0 C ${x} ${VB_H * 0.58}, ${cx} ${VB_H * 0.42}, ${cx} ${VB_H}`}
            stroke="#C94C1E"
            strokeOpacity={0.5}
            strokeWidth="1.25"
            vectorEffect="non-scaling-stroke"
            className="cv-draw"
            strokeDasharray="300"
            style={{ animation: `cvDraw 1.1s ${0.06 * i}s ease-out both` }}
          />
        );
      })}
      <circle cx={cx} cy={VB_H} r="4" fill="#C94C1E" className="cv-pulse" style={{ animation: 'cvPulse 2.6s ease-in-out infinite' }} />
    </svg>
  );
}

export default function Convergence() {
  return (
    <section className="border-t border-slate-200 bg-sand-100 px-4 py-16 dark:border-white/[0.06] dark:bg-[#040404] sm:px-6 lg:px-8 lg:py-20">
      <style>{styles}</style>

      <div className="mx-auto max-w-[1280px]">
        {/* ── Header, split so it costs little height ─────────────────── */}
        <div className="mb-10 grid gap-5 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-14">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ember-500">One layer</p>
            <h2 className="mt-3.5 text-[clamp(27px,3vw,40px)] font-semibold leading-[1.09] tracking-[-0.025em] text-slate-900 dark:text-white">
              Six systems your team runs separately
            </h2>
          </div>
          <p className="max-w-[560px] text-[16px] leading-[1.7] text-slate-600 dark:text-slate-400 lg:pb-1">
            Most GTM teams buy these one at a time and spend the rest of the year wiring them
            together. Harvin runs them on a single account graph, so a signal detected in one place
            is already scored, listed and actionable in the next.
          </p>
        </div>

        {/* ── The six, as their own screens ───────────────────────────── */}
        {/* gap-x-0 on lg: a gap moves the column centres off the SVG's
            exact sixths and the strands stop landing under their cards */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 lg:gap-x-0 lg:gap-y-0">
          {CAPABILITIES.map(({ label, note, Icon, mini }) => (
            <div key={label} className="min-w-0 lg:px-1.5">
              {mini}
              <p className="mt-2.5 flex items-start gap-1.5">
                <Icon size={13} strokeWidth={2.2} className="mt-[2px] flex-shrink-0 text-ember-500" />
                <span className="whitespace-pre-line text-[12.5px] font-bold leading-[1.25] tracking-[-0.01em] text-slate-900 dark:text-white">
                  {label}
                </span>
              </p>
              <p className="mt-1 pl-[19px] text-[10.5px] leading-[1.35] text-slate-400 dark:text-slate-500">{note}</p>
            </div>
          ))}
        </div>

        {/* ── They gather ─────────────────────────────────────────────── */}
        <Strands />

        {/* ── Into one core ───────────────────────────────────────────── */}
        <div className="relative overflow-hidden rounded-2xl bg-[linear-gradient(135deg,#241F1A_0%,#141210_55%,#0C0B09_100%)] px-5 py-5 shadow-[0_18px_44px_rgba(15,23,42,0.24)] ring-1 ring-white/[0.08] sm:px-7">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:18px_18px]" />
          <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 h-[240px] w-[520px] -translate-x-1/2 -translate-y-1/3 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(201,76,30,0.32),transparent_70%)]" />

          <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <img src="/logo1.png" alt="" aria-hidden="true" className="h-10 w-auto flex-shrink-0" />
              <div className="min-w-0">
                <p className="font-bricolage text-[19px] font-bold leading-none text-white">Harvin</p>
                <p className="mt-1.5 text-[13px] text-white/55">
                  One account graph, shared by all {CAPABILITIES.length}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
              {PIPELINE.map((step, i) => (
                <span key={step} className="flex items-center gap-2.5">
                  {i > 0 && <span aria-hidden="true" className="h-1 w-1 rounded-full bg-ember-400/50" />}
                  <span className="rounded-full bg-ember-500/[0.14] px-3 py-1 text-[12px] font-semibold text-ember-200 ring-1 ring-ember-400/25">
                    {step}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── And one thing falls out ─────────────────────────────────── */}
        <div className="mx-auto h-6 w-px bg-ember-500/35" />
        <div className="rounded-2xl border border-ember-500/30 bg-[linear-gradient(140deg,#FFFFFF,#F7F1E7)] px-5 py-4 shadow-[0_10px_26px_rgba(15,23,42,0.06)] dark:border-ember-500/30 dark:bg-[linear-gradient(140deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] dark:shadow-none sm:px-7">
          <div className="flex items-center gap-4">
            <Target size={32} className="flex-shrink-0 text-ember-500" strokeWidth={1.6} />
            <span aria-hidden="true" className="h-10 w-px flex-shrink-0 bg-ember-500/25" />
            <p className="text-[16px] leading-[1.35] text-slate-600 dark:text-slate-400 sm:text-[18px]">
              Into one unified{' '}
              <span className="font-bold tracking-[-0.015em] text-slate-900 dark:text-white">GTM infrastructure.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
