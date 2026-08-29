import {
  Check, Mail, Phone, Radar, SlidersHorizontal, Target, TrendingUp, Users,
} from 'lucide-react';

/**
 * The SDR management layer — five stages, each as its own device screen.
 *
 * Same treatment as the Look-a-like Accounts module on /platform: a sand tray
 * holding a dark bezel that bleeds past the tray's padding, with the tray's
 * overflow-hidden doing the cropping. The console inside is deliberately
 * oversized for its frame — it reads as a zoom into a real dashboard, which is
 * the quality being copied. Scaling type down to fit the whole screen loses it.
 *
 * THE COPY IS FIXED. Manage / Prioritize / Execute / Convert / Improve are the
 * five stages of running an SDR team, taken from the positioning wireframe.
 * They are the section's argument — do not substitute feature names for them.
 *
 * Rows alternate sides, the device always bleeds right. Floating chips sit over
 * the bottom-left of each screen, as on the reference.
 *
 * Company marks are real assets from /public/logos. Rep names are fictional
 * staff in a product mock. Counts, scores and pipeline figures are illustrative
 * product output, not performance claims — keep them that way.
 */

/* ── Device shell ─────────────────────────────────────────────────────── */
function Device({ title, toolbar, chips, children }: {
  title: string;
  toolbar?: React.ReactNode;
  chips?: { label: string; solid?: boolean; Icon?: typeof Radar }[];
  children: React.ReactNode;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-sand-200 p-5 dark:bg-[#141210] sm:p-6">
      <div className="relative -mb-20 -mr-14 ml-[5%] rounded-l-[32px] bg-[#141414] py-[13px] pl-[13px] shadow-[0_26px_64px_rgba(15,23,42,0.3)]">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-[3px] rounded-l-[32px] bg-gradient-to-b from-white/30 via-white/[0.06] to-transparent"
        />

        <div className="overflow-hidden rounded-l-[22px] bg-white pt-5 dark:bg-[#16130F]">
          <h4 className="px-7 pb-3 text-[22px] font-bold tracking-[-0.025em] text-slate-900 dark:text-white">
            {title}
          </h4>
          {toolbar && <div className="px-7 pb-4">{toolbar}</div>}
          <div className="border-t border-slate-200/70 px-7 py-4 dark:border-white/[0.06]">{children}</div>
        </div>
      </div>

      {chips && (
        <div className="pointer-events-none absolute bottom-5 left-5 z-10 flex flex-col items-start gap-2 sm:left-6">
          {chips.map((c) => (
            <span
              key={c.label}
              className={`flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-[13px] font-semibold shadow-[0_10px_28px_rgba(15,23,42,0.16)] ${
                c.solid
                  ? 'bg-ember-500 text-white'
                  : 'border border-slate-200 bg-white text-slate-700 dark:border-white/10 dark:bg-[#16130F] dark:text-slate-200'
              }`}
            >
              {c.Icon && <c.Icon size={14} strokeWidth={2.4} className={c.solid ? 'text-white' : 'text-ember-500'} />}
              {c.label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function Mark({ slug }: { slug: string }) {
  return (
    <span className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-lg border border-slate-200 bg-white p-1.5 dark:border-white/10">
      <img src={`/logos/${slug}.svg`} alt="" aria-hidden="true" className="h-auto w-full object-contain" />
    </span>
  );
}

function Initials({ v }: { v: string }) {
  return (
    <span className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-full bg-ember-500/[0.14] text-[11px] font-bold text-ember-600 dark:text-ember-300">
      {v}
    </span>
  );
}

function Card({ title, meta, children, className = '' }: {
  title: string; meta?: string; children: React.ReactNode; className?: string;
}) {
  return (
    <div className={`rounded-2xl border border-slate-200/80 bg-sand-50 dark:border-white/[0.08] dark:bg-white/[0.03] ${className}`}>
      <div className="flex items-baseline justify-between gap-3 border-b border-slate-200/70 px-4 py-2.5 dark:border-white/[0.06]">
        <p className="truncate text-[15.5px] font-bold tracking-[-0.01em] text-slate-900 dark:text-white">{title}</p>
        {meta && <p className="flex-shrink-0 text-[13px] text-slate-400 dark:text-slate-500">{meta}</p>}
      </div>
      <div className="px-4 py-1.5">{children}</div>
    </div>
  );
}

function Bar({ pct, muted = false }: { pct: number; muted?: boolean }) {
  return (
    <span className="block h-1.5 w-full overflow-hidden rounded-full bg-sand-200 dark:bg-white/10">
      <span
        className={`block h-full rounded-full ${muted ? 'bg-slate-300 dark:bg-white/25' : 'bg-ember-500'}`}
        style={{ width: `${pct}%` }}
      />
    </span>
  );
}

function Score({ v }: { v: number }) {
  return (
    <span className="inline-flex h-[26px] w-[42px] flex-shrink-0 items-center justify-center rounded-lg border border-ember-500/30 bg-ember-500/[0.10] text-[13px] font-bold tabular-nums text-ember-600 dark:text-ember-300">
      {v}
    </span>
  );
}

/* ══ 01 · Manage ═════════════════════════════════════════════════════════ */
const TERRITORIES = [
  { name: 'West · Enterprise', owner: 'SW', worked: 79, total: 96 },
  { name: 'East · Enterprise', owner: 'MC', worked: 56, total: 88 },
  { name: 'Central · Mid-market', owner: 'PR', worked: 113, total: 124 },
  { name: 'Unassigned', owner: null, worked: 0, total: 41 },
];
const OWNED = TERRITORIES.reduce((n, t) => n + t.total, 0);
const UNOWNED = TERRITORIES.filter((t) => !t.owner).reduce((n, t) => n + t.total, 0);

function ManageScreen() {
  return (
    <Device
      title="Team & Territories"
      toolbar={
        <div className="flex flex-wrap items-center gap-2">
          <Users size={15} strokeWidth={2} className="flex-shrink-0 text-slate-400 dark:text-slate-500" />
          <span className="mr-1 text-[12.5px] text-slate-500 dark:text-slate-400">Ownership across</span>
          {['4 SDRs', `${TERRITORIES.length} territories`, `${OWNED} accounts`].map((t) => (
            <span
              key={t}
              className="rounded-full bg-ember-50 px-2.5 py-1 text-[12.5px] font-medium text-ember-600 ring-1 ring-ember-200 dark:bg-ember-500/15 dark:text-ember-300 dark:ring-ember-500/30"
            >
              {t}
            </span>
          ))}
        </div>
      }
      chips={[
        { label: `Assign ${UNOWNED} unowned accounts`, solid: true, Icon: Users },
        { label: 'Coverage updating live', Icon: Radar },
      ]}
    >
      <Card title="Territories" meta={`${OWNED} accounts`}>
        {TERRITORIES.map((t, i) => {
          const pct = Math.round((t.worked / t.total) * 100);
          return (
            <div
              key={t.name}
              className={`flex items-center gap-3 py-[9px] ${i > 0 ? 'border-t border-slate-200/70 dark:border-white/[0.05]' : ''}`}
            >
              {t.owner ? (
                <Initials v={t.owner} />
              ) : (
                <span className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-full border border-dashed border-slate-300 text-[13px] text-slate-400 dark:border-white/20 dark:text-slate-500">
                  ?
                </span>
              )}
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-2 text-[13.5px] font-semibold text-slate-900 dark:text-white">
                  <span className="truncate">{t.name}</span>
                  {!t.owner && (
                    <span className="flex-shrink-0 rounded-md bg-ember-500/[0.12] px-1.5 py-[2px] text-[11px] font-bold text-ember-600 dark:text-ember-300">
                      No owner
                    </span>
                  )}
                </p>
                <div className="mt-1.5 flex items-center gap-2.5">
                  <Bar pct={pct} muted={!t.owner} />
                  <span className="w-[54px] flex-shrink-0 text-right text-[12px] tabular-nums text-slate-500 dark:text-slate-400">
                    {t.worked}/{t.total}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </Card>
    </Device>
  );
}

/* ══ 02 · Prioritize ═════════════════════════════════════════════════════ */
const PRIORITIES = [
  { slug: 'nike', name: 'Nike', why: 'Hiring · 58 open GTM roles', score: 94 },
  { slug: 'peloton', name: 'Peloton', why: 'Scaling · headcount +14% QoQ', score: 89 },
  { slug: 'sonos', name: 'Sonos', why: 'Hiring · 26 open engineering roles', score: 81 },
  { slug: 'etsy', name: 'Etsy', why: 'Replied 2 days ago · follow up', score: 74 },
];
const FOCUS_COUNT = 12;

function PrioritizeScreen() {
  return (
    <Device
      title="Today’s Priorities"
      toolbar={
        <div className="flex flex-wrap items-center gap-2">
          <SlidersHorizontal size={15} strokeWidth={2} className="flex-shrink-0 text-slate-400 dark:text-slate-500" />
          <span className="mr-1 text-[12.5px] text-slate-500 dark:text-slate-400">Ranked by</span>
          {['Account fit', 'Live signals', 'Past performance'].map((t) => (
            <span
              key={t}
              className="flex items-center gap-1.5 rounded-full bg-ember-50 px-2.5 py-1 text-[12.5px] font-medium text-ember-600 ring-1 ring-ember-200 dark:bg-ember-500/15 dark:text-ember-300 dark:ring-ember-500/30"
            >
              <Check size={12} strokeWidth={3} />
              {t}
            </span>
          ))}
        </div>
      }
      chips={[
        { label: `${FOCUS_COUNT} accounts Sarah should focus on`, solid: true, Icon: Target },
        { label: 'Scanning signals now', Icon: Radar },
      ]}
    >
      <Card title="Work these first" meta={`of ${FOCUS_COUNT}`}>
        {PRIORITIES.map((p, i) => (
          <div
            key={p.name}
            className={`flex items-center gap-3 py-[9px] ${i > 0 ? 'border-t border-slate-200/70 dark:border-white/[0.05]' : ''}`}
          >
            <span className="w-4 flex-shrink-0 font-mono text-[12px] font-bold tabular-nums text-slate-300 dark:text-slate-600">
              {i + 1}
            </span>
            <Mark slug={p.slug} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13.5px] font-semibold text-slate-900 dark:text-white">{p.name}</p>
              <p className="truncate text-[12px] text-slate-500 dark:text-slate-400">{p.why}</p>
            </div>
            <Score v={p.score} />
          </div>
        ))}
      </Card>
    </Device>
  );
}

/* ══ 03 · Execute ════════════════════════════════════════════════════════ */
const SEQUENCE = [
  { Icon: Mail, label: 'Email · lead with the hiring signal', day: 'Day 0', done: true },
  { Icon: Phone, label: 'Call · same signal, spoken', day: 'Day 2', done: false },
  { Icon: Mail, label: 'Email · case study, same category', day: 'Day 5', done: false },
];
const CALL_QUEUE = [
  { slug: 'nike', name: 'Nike · VP Marketing', when: '9:40 AM' },
  { slug: 'peloton', name: 'Peloton · Head of Growth', when: '10:15 AM' },
  { slug: 'sonos', name: 'Sonos · Director of Ops', when: '10:50 AM' },
];

function ExecuteScreen() {
  return (
    <Device
      title="Sequences & Dialer"
      toolbar={
        <div className="flex flex-wrap items-center gap-2">
          {['Email', 'Dialer', 'Tasks', 'Inbox'].map((t, i) => (
            <span
              key={t}
              className={`rounded-full px-2.5 py-1 text-[12.5px] font-medium ${
                i === 0
                  ? 'bg-ember-50 text-ember-600 ring-1 ring-ember-200 dark:bg-ember-500/15 dark:text-ember-300 dark:ring-ember-500/30'
                  : 'text-slate-400 ring-1 ring-slate-200 dark:text-slate-500 dark:ring-white/10'
              }`}
            >
              {t}
            </span>
          ))}
        </div>
      }
      chips={[
        { label: '34 accounts in sequence', solid: true, Icon: Mail },
        { label: '8 calls before 11 AM', Icon: Phone },
      ]}
    >
      <div className="flex gap-4">
        <Card title="D2C hiring play" meta="3 steps" className="w-[62%] flex-shrink-0">
          {SEQUENCE.map((s, i) => (
            <div
              key={s.label}
              className={`flex items-center gap-3 py-[10px] ${i > 0 ? 'border-t border-slate-200/70 dark:border-white/[0.05]' : ''}`}
            >
              <span
                className={`grid h-[18px] w-[18px] flex-shrink-0 place-items-center rounded-full ${
                  s.done ? 'bg-ember-500 text-white' : 'ring-1 ring-slate-300 dark:ring-white/20'
                }`}
              >
                {s.done && <Check size={11} strokeWidth={3.4} />}
              </span>
              <s.Icon size={14} strokeWidth={2.2} className="flex-shrink-0 text-slate-400 dark:text-slate-500" />
              <span className="min-w-0 flex-1 truncate text-[13px] font-semibold text-slate-900 dark:text-white">
                {s.label}
              </span>
              <span className="flex-shrink-0 font-mono text-[11.5px] tabular-nums text-slate-400 dark:text-slate-500">
                {s.day}
              </span>
            </div>
          ))}
        </Card>

        <Card title="Call queue" meta="8 today" className="w-[52%] flex-shrink-0">
          {CALL_QUEUE.map((c, i) => (
            <div
              key={c.name}
              className={`flex items-center gap-2.5 py-[10px] ${i > 0 ? 'border-t border-slate-200/70 dark:border-white/[0.05]' : ''}`}
            >
              <Mark slug={c.slug} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-semibold text-slate-900 dark:text-white">{c.name}</p>
                <p className="truncate text-[11.5px] text-slate-500 dark:text-slate-400">{c.when}</p>
              </div>
            </div>
          ))}
        </Card>
      </div>
    </Device>
  );
}

/* ══ 04 · Convert ════════════════════════════════════════════════════════ */
const MEETINGS = [
  { slug: 'nike', name: 'Nike', ae: 'Assigned · AE Dana', outcome: 'Qualified' },
  { slug: 'peloton', name: 'Peloton', ae: 'Assigned · AE Rob', outcome: 'Opportunity' },
  { slug: 'etsy', name: 'Etsy', ae: 'Assigned · AE Dana', outcome: null },
];
const OUTCOMES = ['Qualified', 'Disqualified', 'Opportunity', 'Follow Up', 'No Show'];

function ConvertScreen() {
  return (
    <Device
      title="Meetings"
      toolbar={
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 text-[12.5px] text-slate-500 dark:text-slate-400">Handed off with</span>
          {['Account context', 'Previous conversations', 'Notes'].map((t) => (
            <span
              key={t}
              className="flex items-center gap-1.5 rounded-full bg-ember-50 px-2.5 py-1 text-[12.5px] font-medium text-ember-600 ring-1 ring-ember-200 dark:bg-ember-500/15 dark:text-ember-300 dark:ring-ember-500/30"
            >
              <Check size={12} strokeWidth={3} />
              {t}
            </span>
          ))}
        </div>
      }
      chips={[
        { label: '46 meetings booked', solid: true, Icon: Check },
        { label: '31 qualified so far', Icon: TrendingUp },
      ]}
    >
      <Card title="Booked this week" meta="46 total">
        {MEETINGS.map((m, i) => (
          <div
            key={m.name}
            className={`py-[10px] ${i > 0 ? 'border-t border-slate-200/70 dark:border-white/[0.05]' : ''}`}
          >
            <div className="flex items-center gap-3">
              <Mark slug={m.slug} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13.5px] font-semibold text-slate-900 dark:text-white">{m.name}</p>
                <p className="truncate text-[12px] text-slate-500 dark:text-slate-400">{m.ae}</p>
              </div>
              {m.outcome && (
                <span className="flex-shrink-0 rounded-lg bg-emerald-50 px-2.5 py-1 text-[12px] font-bold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                  {m.outcome}
                </span>
              )}
            </div>

            {/* the one without an outcome still needs recording — the row the
                AE actually acts on, so it carries the buttons */}
            {!m.outcome && (
              <div className="mt-2.5 flex flex-wrap gap-1.5 pl-11">
                {OUTCOMES.map((o, n) => (
                  <span
                    key={o}
                    className={`rounded-lg px-2.5 py-1.5 text-[12px] font-semibold ${
                      n === 0
                        ? 'bg-ember-500 text-white'
                        : 'border border-slate-200 bg-white text-slate-600 dark:border-white/10 dark:bg-white/[0.05] dark:text-slate-300'
                    }`}
                  >
                    {o}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </Card>
    </Device>
  );
}

/* ══ 05 · Improve ════════════════════════════════════════════════════════ */
/** Bar widths are each stage's share of the first, so the drawing cannot
 *  disagree with the counts beside it. */
const FUNNEL = [
  { stage: 'Accounts worked', n: 412 },
  { stage: 'Conversations', n: 138 },
  { stage: 'Meetings booked', n: 46 },
  { stage: 'Meetings qualified', n: 31 },
  { stage: 'Opportunities', n: 18 },
];
const FUNNEL_TOP = FUNNEL[0].n;
const COACHING = [
  { who: 'DL', name: 'Dan L.', flag: 'Activity high, few conversations' },
  { who: 'MC', name: 'Marcus C.', flag: 'Meetings rarely qualifying' },
];

function ImproveScreen() {
  return (
    <Device
      title="Performance & Coaching"
      toolbar={
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 text-[12.5px] text-slate-500 dark:text-slate-400">Break down by</span>
          {['SDR', 'Territory', 'Sequence', 'Channel'].map((t, i) => (
            <span
              key={t}
              className={`rounded-full px-2.5 py-1 text-[12.5px] font-medium ${
                i === 0
                  ? 'bg-ember-50 text-ember-600 ring-1 ring-ember-200 dark:bg-ember-500/15 dark:text-ember-300 dark:ring-ember-500/30'
                  : 'text-slate-400 ring-1 ring-slate-200 dark:text-slate-500 dark:ring-white/10'
              }`}
            >
              {t}
            </span>
          ))}
        </div>
      }
      chips={[
        { label: '$1.4M pipeline generated', solid: true, Icon: TrendingUp },
        { label: '2 reps need coaching', Icon: Target },
      ]}
    >
      <div className="flex gap-4">
        <Card title="Pipeline contribution" meta="This quarter" className="w-[64%] flex-shrink-0">
          <div className="space-y-2 py-2">
            {FUNNEL.map((f, i) => (
              <div key={f.stage} className="flex items-center gap-3">
                <span className="w-[122px] flex-shrink-0 truncate text-[12.5px] font-medium text-slate-600 dark:text-slate-300">
                  {f.stage}
                </span>
                <span className="h-5 min-w-0 flex-1 overflow-hidden rounded-md bg-sand-200 dark:bg-white/10">
                  <span
                    className={`block h-full rounded-md ${i === 0 ? 'bg-ember-500' : 'bg-ember-500/70'}`}
                    style={{ width: `${(f.n / FUNNEL_TOP) * 100}%` }}
                  />
                </span>
                <span className="w-[34px] flex-shrink-0 text-right text-[12.5px] font-bold tabular-nums text-slate-900 dark:text-white">
                  {f.n}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Needs coaching" meta="2 reps" className="w-[50%] flex-shrink-0">
          {COACHING.map((c, i) => (
            <div
              key={c.name}
              className={`flex items-start gap-2.5 py-[10px] ${i > 0 ? 'border-t border-slate-200/70 dark:border-white/[0.05]' : ''}`}
            >
              <Initials v={c.who} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-semibold text-slate-900 dark:text-white">{c.name}</p>
                <p className="text-[11.5px] leading-[1.4] text-slate-500 dark:text-slate-400">{c.flag}</p>
              </div>
            </div>
          ))}
        </Card>
      </div>
    </Device>
  );
}

/* ══ The five stages ═════════════════════════════════════════════════════ */
const STAGES = [
  {
    title: 'Manage',
    pill: `${OWNED} accounts owned`,
    desc: 'Bring your target accounts and leads into Harvin, organize them by territory and distribute them across your team. Know exactly who owns what — and whether those accounts are actually being worked.',
    details: [
      'Territory ownership across regions, segments or teams',
      'Assign and redistribute accounts across SDRs',
      'Coverage visibility on every account in the book',
      'Targets set per SDR and per team',
    ],
    Visual: ManageScreen,
  },
  {
    title: 'Prioritize',
    pill: `${FOCUS_COUNT} to focus on today`,
    desc: 'Decide where your SDRs should spend their time. Harvin ranks each rep’s book by account fit, live buying signals and how similar accounts have performed — so the day starts with a list, not a decision.',
    details: [
      'Ranked daily priorities for every rep',
      'Buying signals scored as they land',
      'The reason each account ranked, shown',
      'Recommendations a rep can act on directly',
    ],
    Visual: PrioritizeScreen,
  },
  {
    title: 'Execute',
    pill: '34 in sequence',
    desc: 'Run email, calls, tasks and prospecting workflows from the same place the account lives, so every action stays connected to the rep, the account and the eventual outcome.',
    details: [
      'Email sequences built from the signal that fired',
      'Prioritized call lists in the dialer',
      'Tasks and follow-ups kept visible',
      'Replies gathered into one inbox',
    ],
    Visual: ExecuteScreen,
  },
  {
    title: 'Convert',
    pill: '46 meetings booked',
    desc: 'Meeting booked shouldn’t be the end of the reporting funnel. Harvin carries the account context into the handoff and captures what happened after it, without an AE navigating a CRM workflow.',
    details: [
      'Meetings assigned with full account context',
      'Outcome recorded in one click',
      'Qualified, disqualified and no-shows tracked',
      'Feedback loops back to the SDR who booked it',
    ],
    Visual: ConvertScreen,
  },
  {
    title: 'Improve',
    pill: '$1.4M pipeline',
    desc: 'Understand performance, coach the team and decide what to do next — from accounts worked all the way through to the pipeline the SDR team actually generated.',
    details: [
      'The funnel from accounts worked to pipeline',
      'Break performance down by rep, territory or sequence',
      'Patterns that show who needs coaching, and why',
      'Outcomes that sharpen the next recommendation',
    ],
    Visual: ImproveScreen,
  },
];

const PIPELINE = ['Accounts', 'Conversations', 'Meetings', 'Pipeline'];

function StageRow({ stage, index }: { stage: typeof STAGES[0]; index: number }) {
  const flipped = index % 2 !== 0;

  return (
    <div
      className={`flex flex-col ${flipped ? 'md:flex-row-reverse' : 'md:flex-row'} mb-14 items-center gap-10 last:mb-0 md:gap-12 sm:mb-18 lg:mb-24 lg:gap-16`}
    >
      {/* ── Text side ── */}
      <div className="min-w-0 max-w-[540px] flex-1">
        <div className="mb-6 flex items-center gap-3.5">
          <span className="font-mono text-[13px] font-semibold tracking-[0.16em] text-ember-500">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span aria-hidden="true" className="h-px flex-1 bg-slate-200 dark:bg-white/[0.10]" />
          <span className="flex-shrink-0 rounded-full border border-slate-200 bg-sand-50 px-3 py-1.5 text-[11.5px] font-semibold uppercase tracking-[0.08em] text-slate-500 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-slate-400">
            {stage.pill}
          </span>
        </div>

        <h3 className="font-bricolage text-[30px] font-bold leading-[1.12] tracking-[-0.025em] text-slate-900 dark:text-white sm:text-[38px]">
          {stage.title}
        </h3>

        <p className="mt-5 text-[17px] leading-[1.72] text-slate-600 dark:text-slate-400">{stage.desc}</p>

        <ul className="mt-7 flex flex-col gap-3.5">
          {stage.details.map((d) => (
            <li key={d} className="flex items-start gap-2.5">
              <span className="mt-[3px] grid h-[19px] w-[19px] flex-shrink-0 place-items-center rounded-full bg-ember-50 dark:bg-ember-500/15">
                <Check size={12} className="text-ember-600 dark:text-ember-300" strokeWidth={3} />
              </span>
              <span className="text-[15.5px] leading-[1.55] text-slate-700 dark:text-slate-300">{d}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* ── Visual side ── */}
      <div className="w-full min-w-0 flex-1 md:max-w-[520px] lg:max-w-[640px]">
        <stage.Visual />
      </div>
    </div>
  );
}

export default function Convergence() {
  return (
    <section className="border-t border-slate-200 bg-sand-100 px-4 py-20 dark:border-white/[0.06] dark:bg-[#040404] sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-[1180px]">
        {/* ── Header ─────────────────────────────────────────────────── */}
        <div className="mb-14 grid gap-5 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-14">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ember-500">
              The SDR management layer
            </p>
            <h2 className="mt-3.5 text-[clamp(27px,3vw,40px)] font-semibold leading-[1.09] tracking-[-0.025em] text-slate-900 dark:text-white">
              The place where your SDR team gets run
            </h2>
          </div>
          <p className="max-w-[560px] text-[16px] leading-[1.7] text-slate-600 dark:text-slate-400 lg:pb-1">
            Harvin connects the work that usually sits across spreadsheets, sales engagement
            platforms, CRM reports and manager workflows — from deciding who should work an account
            to understanding whether that account eventually became pipeline.
          </p>
        </div>

        {/* ── The five stages ────────────────────────────────────────── */}
        {STAGES.map((stage, i) => (
          <StageRow key={stage.title} stage={stage} index={i} />
        ))}

        {/* ── The payoff ─────────────────────────────────────────────── */}
        <div className="relative mt-16 overflow-hidden rounded-2xl bg-[linear-gradient(135deg,#241F1A_0%,#141210_55%,#0C0B09_100%)] px-5 py-5 shadow-[0_18px_44px_rgba(15,23,42,0.24)] ring-1 ring-white/[0.08] sm:px-7">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:18px_18px]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-10 top-1/2 h-[220px] w-[380px] -translate-y-1/2 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(201,76,30,0.30),transparent_70%)]"
          />
          <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <img src="/logo1.png" alt="" aria-hidden="true" className="h-10 w-auto flex-shrink-0" />
              <div className="min-w-0">
                <p className="font-bricolage text-[19px] font-bold leading-none text-white">Harvin</p>
                <p className="mt-1.5 text-[13px] text-white/55">
                  One place to run the SDR operation behind it all
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

        <div className="mt-3 rounded-2xl border border-ember-500/30 bg-[linear-gradient(140deg,#FFFFFF,#F7F1E7)] px-5 py-4 shadow-[0_10px_26px_rgba(15,23,42,0.06)] dark:border-ember-500/30 dark:bg-[linear-gradient(140deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] dark:shadow-none sm:px-7">
          <div className="flex items-center gap-4">
            <Target size={32} className="flex-shrink-0 text-ember-500" strokeWidth={1.6} />
            <span aria-hidden="true" className="h-10 w-px flex-shrink-0 bg-ember-500/25" />
            <p className="text-[16px] leading-[1.35] text-slate-600 dark:text-slate-400 sm:text-[18px]">
              That&rsquo;s{' '}
              <span className="font-bold tracking-[-0.015em] text-slate-900 dark:text-white">SDR management.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
