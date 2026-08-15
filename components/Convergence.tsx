import { Brain, Building2, CalendarDays, ChartColumn, Network, Radar, Target } from 'lucide-react';

/**
 * Six capabilities, the platform they run on, and what comes out — three
 * stacked bands, full width.
 *
 * Full width rather than a half-column so the capability band holds all six in
 * ONE row; wrapping them to 3×2 broke the read, because the point is that six
 * separate things sit on one continuous layer. Three bands stay short, so the
 * section still lands inside a viewport despite the width.
 *
 * No connectors by design: the platform band physically sits under the six and
 * carries them, and the output falls out the bottom. Adjacency does the work
 * that routed lines were doing badly.
 */

const CAPABILITIES = [
  { label: 'Account\nintelligence',     note: 'Living record per account', Icon: Building2 },
  { label: 'AI signal\ndetection',      note: 'Funding, hiring, M&A',      Icon: Radar },
  { label: 'Business motion\nanalysis', note: 'How they actually buy',     Icon: ChartColumn },
  { label: 'Campaign\norchestration',   note: 'Sequences off the signal',  Icon: Network },
  { label: 'Meeting\nintelligence',     note: 'What was said, and next',   Icon: CalendarDays },
  { label: 'Learning\nsystems',         note: 'Scoring sharpens over time',Icon: Brain },
];

const PIPELINE = ['Ingest', 'Score', 'List', 'Orchestrate'];

function BandLabel({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-center gap-2.5">
      <span className="font-mono text-[10px] font-semibold tabular-nums text-ember-500">{n}</span>
      <span className="font-mono text-[9.5px] font-semibold uppercase tracking-[0.16em] text-slate-400 dark:text-slate-500">
        {children}
      </span>
      <span className="h-px flex-1 bg-slate-200 dark:bg-white/[0.08]" />
    </div>
  );
}

export default function Convergence() {
  return (
    <section className="border-t border-slate-200 bg-sand-100 px-4 py-14 dark:border-white/[0.06] dark:bg-[#040404] sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-[1280px]">
        {/* ── Header, split across the width so it costs little height ──── */}
        <div className="mb-9 grid gap-5 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-14">
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

        {/* ── The stack ──────────────────────────────────────────────────── */}
        <div className="flex flex-col gap-3">
          {/* 01 — what your team runs */}
          <div className="rounded-2xl border border-slate-200 bg-sand-50 px-5 py-5 shadow-[0_10px_30px_rgba(15,23,42,0.05)] dark:border-white/[0.08] dark:bg-white/[0.02] dark:shadow-none sm:px-6">
            <BandLabel n="01">Capabilities</BandLabel>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {CAPABILITIES.map(({ label, note, Icon }) => (
                <div
                  key={label}
                  className="rounded-xl border border-slate-200 bg-white px-3.5 py-3.5 dark:border-white/[0.08] dark:bg-white/[0.04]"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-ember-50 dark:bg-ember-500/15">
                    <Icon size={18} className="text-ember-500" strokeWidth={1.9} />
                  </span>
                  <p className="mt-3 whitespace-pre-line text-[13px] font-semibold leading-[1.28] text-slate-900 dark:text-white">
                    {label}
                  </p>
                  <p className="mt-1.5 text-[11px] leading-[1.4] text-slate-400 dark:text-slate-500">{note}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 02 — the layer underneath. Deliberately the heaviest band, but
                 dark rather than a flood of ember: a full-width orange slab
                 shouted louder than the content and left the accent colour
                 nowhere to go. Ember now appears as accent, against near-black
                 borrowed from the footer. */}
          <div className="relative overflow-hidden rounded-2xl bg-[linear-gradient(135deg,#241F1A_0%,#141210_55%,#0C0B09_100%)] px-5 py-5 shadow-[0_14px_36px_rgba(15,23,42,0.22)] ring-1 ring-white/[0.08] sm:px-7">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:18px_18px]"
            />
            {/* a single ember bloom, so the band still belongs to the palette */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-10 top-1/2 h-[220px] w-[380px] -translate-y-1/2 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(201,76,30,0.30),transparent_70%)]"
            />
            <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <img src="/logo1.png" alt="" aria-hidden="true" className="h-10 w-auto flex-shrink-0" />
                <div className="min-w-0">
                  <p className="font-bricolage text-[19px] font-bold leading-none text-white">Harvin</p>
                  <p className="mt-1.5 text-[13px] text-white/55">One account graph, shared by all six</p>
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

          {/* 03 — what falls out */}
          <div className="rounded-2xl border border-ember-500/30 bg-[linear-gradient(140deg,#FFFFFF,#F7F1E7)] px-5 py-4 shadow-[0_10px_26px_rgba(15,23,42,0.06)] dark:border-ember-500/30 dark:bg-[linear-gradient(140deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] dark:shadow-none sm:px-7">
            <div className="flex items-center gap-4">
              <Target size={34} className="flex-shrink-0 text-ember-500" strokeWidth={1.6} />
              <span aria-hidden="true" className="h-10 w-px flex-shrink-0 bg-ember-500/25" />
              <p className="text-[16px] leading-[1.35] text-slate-600 dark:text-slate-400 sm:text-[18px]">
                Into one unified{' '}
                <span className="font-bold tracking-[-0.015em] text-slate-900 dark:text-white">GTM infrastructure.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
