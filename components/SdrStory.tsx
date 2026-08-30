import {
  ArrowRight, Check, Mail, MessageSquare, Phone, Radar, Target, TrendingDown, TrendingUp,
} from 'lucide-react';

import SdrExecution from '@/components/SdrExecution';

/**
 * The rest of the positioning narrative, in wireframe order.
 *
 * All copy is taken verbatim from harvin_homepage_wireframe_v2 — headings,
 * ledes, card titles and list items. Where the wireframe left a block as a bare
 * list, it is rendered as a list; where it described a product surface, a built
 * panel stands in for it, in the same treatment as the Account Intelligence and
 * Look-a-like cards on /platform: a sand tray holding a white app panel with a
 * header bar and real rows.
 *
 * WHY BUILT PANELS, NOT SCREENSHOTS. None of these surfaces has an export in
 * /public, and a section that showed a screenshot for one claim and an icon for
 * the next reads as though only the first exists. Building them keeps every
 * claim at the same weight.
 *
 * Rep names are fictional and marked as such by context (they are staff in a
 * product mock, not customers). Company marks are real assets from
 * /public/logos; counts, rates and pipeline figures are illustrative product
 * output, not performance claims about Harvin — keep them that way.
 */

/* ── shared shell ─────────────────────────────────────────────────────── */
function Section({ dark = false, children }: { dark?: boolean; children: React.ReactNode }) {
  return (
    <section
      className={`border-t px-4 py-20 sm:px-6 lg:px-8 lg:py-24 ${
        dark
          ? 'border-white/[0.08] bg-[#0C0B09]'
          : 'border-slate-200 bg-sand-100 dark:border-white/[0.06] dark:bg-[#040404]'
      }`}
    >
      <div className="mx-auto max-w-[1180px]">{children}</div>
    </section>
  );
}

/**
 * `rawEyebrow` skips the CSS uppercase transform. text-transform capitalises
 * every letter, which turns an acronym like "CROs" into "CROS" — so an eyebrow
 * containing one is typed in caps at the call site and passed through as-is.
 */
function Head({ eyebrow, title, body, dark = false, center = false, rawEyebrow = false }: {
  eyebrow: string; title: React.ReactNode; body?: string[]; dark?: boolean; center?: boolean; rawEyebrow?: boolean;
}) {
  return (
    <div className={`mb-11 max-w-[760px] ${center ? 'mx-auto text-center' : ''}`}>
      <p className={`text-[12px] font-semibold tracking-[0.16em] ${rawEyebrow ? '' : 'uppercase'} ${dark ? 'text-ember-300' : 'text-ember-500'}`}>
        {eyebrow}
      </p>
      <h2 className={`mt-4 text-[clamp(27px,3.2vw,42px)] font-semibold leading-[1.09] tracking-[-0.025em] ${dark ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
        {title}
      </h2>
      {body?.map((p) => (
        <p key={p} className={`mt-4 text-[16px] leading-[1.7] ${dark ? 'text-white/60' : 'text-slate-600 dark:text-slate-400'}`}>
          {p}
        </p>
      ))}
    </div>
  );
}

/**
 * Sand tray + white app panel — the treatment used on /platform.
 *
 * `fill` makes the tray and the panel inside it stretch to the row's height,
 * which only does anything when the row is `items-stretch`. Use it where the
 * copy column is taller than the panel would otherwise be; the panel's own
 * content has to have a flex-1 region for the extra height to land somewhere.
 */
function Frame({ title, sub, right, fill = false, children }: {
  title: string; sub: string; right?: React.ReactNode; fill?: boolean; children: React.ReactNode;
}) {
  return (
    <div className={`rounded-2xl bg-sand-200 p-4 dark:bg-[#141210] sm:p-5 ${fill ? 'flex h-full flex-col' : ''}`}>
      <div className={`overflow-hidden rounded-2xl border border-slate-200/80 bg-sand-50 shadow-[0_18px_44px_rgba(15,23,42,0.14)] dark:border-white/[0.08] dark:bg-[#16130F] dark:shadow-[0_18px_44px_rgba(0,0,0,0.5)] ${fill ? 'flex min-h-0 flex-1 flex-col' : ''}`}>
        <div className="flex items-center justify-between gap-3 border-b border-slate-200/70 bg-sand-100/70 px-4 py-3 dark:border-white/[0.06] dark:bg-white/[0.03]">
          <div className="min-w-0">
            <p className="truncate text-[13.5px] font-bold tracking-[-0.01em] text-slate-900 dark:text-white">{title}</p>
            <p className="truncate text-[12px] text-slate-500 dark:text-slate-400">{sub}</p>
          </div>
          {right}
        </div>
        {children}
      </div>
    </div>
  );
}

function Mark({ slug }: { slug: string }) {
  return (
    <span className="grid h-7 w-7 flex-shrink-0 place-items-center rounded-lg border border-slate-200 bg-white p-1 dark:border-white/10">
      <img src={`/logos/${slug}.svg`} alt="" aria-hidden="true" className="h-auto w-full object-contain" />
    </span>
  );
}

function Initials({ v }: { v: string }) {
  return (
    <span className="grid h-7 w-7 flex-shrink-0 place-items-center rounded-full bg-ember-500/[0.14] text-[10px] font-bold text-ember-600 dark:text-ember-300">
      {v}
    </span>
  );
}

function Bar({ pct, tone = 'ember' }: { pct: number; tone?: 'ember' | 'slate' }) {
  return (
    <span className="block h-1.5 w-full overflow-hidden rounded-full bg-sand-200 dark:bg-white/10">
      <span
        className={`block h-full rounded-full ${tone === 'ember' ? 'bg-ember-500' : 'bg-slate-300 dark:bg-white/30'}`}
        style={{ width: `${pct}%` }}
      />
    </span>
  );
}

function Chip({ children, tone = 'slate' }: { children: React.ReactNode; tone?: 'slate' | 'ember' | 'green' }) {
  const tones = {
    slate: 'bg-sand-100 text-slate-600 dark:bg-white/[0.07] dark:text-slate-300',
    ember: 'bg-ember-500/[0.12] text-ember-500 dark:text-ember-300',
    green: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
  };
  return (
    <span className={`inline-flex items-center gap-1 rounded-md px-1.5 py-[3px] text-[10.5px] font-semibold ${tones[tone]}`}>
      {children}
    </span>
  );
}

/** Bordered list used wherever the wireframe wrote a plain check-list. */
function CheckList({ items, tint = false }: { items: string[]; tint?: boolean }) {
  return (
    <ul
      className={`divide-y rounded-2xl border ${
        tint
          ? 'divide-ember-500/15 border-ember-500/30 bg-ember-500/[0.06]'
          : 'divide-slate-200 border-slate-200 bg-white dark:divide-white/[0.08] dark:border-white/[0.08] dark:bg-white/[0.02]'
      }`}
    >
      {items.map((it) => (
        <li key={it} className="flex items-center gap-3 px-5 py-3.5">
          <Check size={14} strokeWidth={2.8} className="flex-shrink-0 text-ember-500" />
          <span className="text-[15px] font-semibold tracking-[-0.01em] text-slate-900 dark:text-white">{it}</span>
        </li>
      ))}
    </ul>
  );
}

/* ══ 01 · For SDR leaders & managers ═════════════════════════════════════ */
/**
 * A manager's cockpit rather than another copy-beside-a-panel row.
 *
 * Every other section on this page is a two-column split, so this one is built
 * the other way round: the console runs the full width with a rail of what
 * needs attention beside it, and the four "Know…" points sit underneath as a
 * numbered row. That gives the table room for the columns a manager actually
 * scans — coverage, conversations, meetings and direction of travel — instead
 * of squeezing them into half a page.
 *
 * The rail is derived, not written: the rep flagged is whoever has the lowest
 * coverage, and the unassigned figure comes from the territory data used by the
 * next section. Nothing in it can contradict the table beside it.
 */
const TEAM = [
  { who: 'SW', name: 'Sarah W.', territory: 'West · Enterprise', coverage: 82, convos: 24, meetings: 7, trend: 1 },
  { who: 'MC', name: 'Marcus C.', territory: 'East · Enterprise', coverage: 64, convos: 18, meetings: 5, trend: -1 },
  { who: 'PR', name: 'Priya R.', territory: 'Central · Mid-market', coverage: 91, convos: 31, meetings: 9, trend: 1 },
  { who: 'DL', name: 'Dan L.', territory: 'Mid-market · Inbound', coverage: 38, convos: 9, meetings: 2, trend: -1 },
];
const WEAKEST = TEAM.reduce((a, b) => (b.coverage < a.coverage ? b : a));
const TEAM_MEETINGS = TEAM.reduce((n, t) => n + t.meetings, 0);
const TEAM_CONVOS = TEAM.reduce((n, t) => n + t.convos, 0);

const MANAGER_CARDS = [
  { t: 'Know what’s happening', d: 'See what each SDR is working on, which accounts are being covered and where activity is falling behind.' },
  { t: 'Know what’s working', d: 'Compare performance across reps, territories, sequences, channels and account segments.' },
  { t: 'Know where to intervene', d: 'Spot weak account coverage, missed follow-ups, declining conversion and reps who need coaching.' },
  { t: 'Know what to do next', d: 'Use Harvin’s intelligence to identify the accounts, prospects, plays and actions your team should prioritize.' },
];

function ForManagers() {
  return (
    /* Own wrapper rather than <Section>: this one is sized to land inside a
       viewport, so it centres its content in a min-h-screen block instead of
       running on fixed vertical padding. Everything below is budgeted for that
       height — the console shows four rows, the rail two flags, and the "Know"
       points run as a list rather than a second full-width band. */
    <section className="flex min-h-screen items-center border-t border-white/[0.08] bg-[#0C0B09] px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-[1180px]">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16">
          {/* ── Left: the claim, then what it lets you know ──────────── */}
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ember-300">
              For SDR leaders &amp; managers
            </p>
            <h2 className="mt-3.5 text-[clamp(26px,2.9vw,38px)] font-semibold leading-[1.09] tracking-[-0.025em] text-white">
              See the whole team.
              <br />
              Know where to focus.
            </h2>
            <p className="mt-4 max-w-[460px] text-[15px] leading-[1.65] text-white/55">
              A live view of your SDR organization across reps, territories, accounts, campaigns,
              conversations, meetings and pipeline — without maintaining another spreadsheet or
              chasing your team for updates.
            </p>

            <ul className="mt-7 space-y-3.5">
              {MANAGER_CARDS.map((c, i) => (
                <li key={c.t} className="flex gap-3.5">
                  <span className="mt-[3px] font-mono text-[11px] font-bold tabular-nums text-ember-300">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[14.5px] font-bold leading-[1.3] tracking-[-0.015em] text-white">
                      {c.t}
                    </span>
                    <span className="mt-1 block text-[12.5px] leading-[1.5] text-white/45">{c.d}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Right: the console, layered the way the Account Intelligence
                 record is — a ghost card behind, the live one offset over it,
                 both inside a tray. One card floating alone reads as a
                 diagram; two layered read as a screen with more behind it. ── */}
          <div className="relative overflow-hidden rounded-2xl bg-white/[0.04] p-4 ring-1 ring-white/[0.06] sm:p-5">
            {/* the card behind — territories, blurred to placeholder rows so it
                reads as depth rather than competing for attention */}
            <div
              aria-hidden="true"
              className="absolute bottom-5 left-4 top-14 w-[56%] overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.03]"
            >
              <div className="flex items-center gap-2.5 px-4 pb-3 pt-4">
                <span className="h-7 w-7 flex-shrink-0 rounded-lg bg-white/[0.07]" />
                <span className="h-2 w-16 rounded-full bg-white/[0.07]" />
              </div>
              {[64, 48, 72, 40, 56].map((w, i) => (
                <div key={i} className="flex items-center gap-2.5 px-4 py-[9px]">
                  <span className="h-6 w-6 flex-shrink-0 rounded-full bg-white/[0.05]" />
                  <span className="h-2 flex-1 rounded-full bg-white/[0.05]" />
                  <span className="h-2 rounded-full bg-white/[0.05]" style={{ width: `${w / 3}px` }} />
                </div>
              ))}
            </div>

            <div className="relative ml-[12%] overflow-hidden rounded-2xl border border-white/[0.12] bg-[#161311] shadow-[0_18px_44px_rgba(0,0,0,0.55)]">
              <div className="flex items-center justify-between gap-3 border-b border-white/[0.10] px-4 py-3">
                <div className="min-w-0">
                  <p className="text-[14px] font-bold tracking-[-0.01em] text-white">Team</p>
                  <p className="text-[11.5px] tabular-nums text-white/40">
                    {TEAM.length} SDRs · {TEAM_CONVOS} convos · {TEAM_MEETINGS} meetings
                  </p>
                </div>
                <span className="flex flex-shrink-0 items-center gap-1.5 rounded-full bg-ember-500/[0.16] px-2.5 py-1 text-[11px] font-semibold text-ember-200 ring-1 ring-ember-400/25">
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-ember-400" />
                  Live
                </span>
              </div>

              {/* one grid template shared by the header and every row, so the
                  columns cannot drift out of alignment */}
              <div className="grid grid-cols-[1.5fr_1fr_auto_auto] gap-x-3 border-b border-white/[0.08] px-4 py-2">
                {['Rep', 'Coverage', 'Convos', 'Mtgs'].map((h, i) => (
                  <p
                    key={h}
                    className={`font-mono text-[9.5px] font-semibold uppercase tracking-[0.1em] text-white/35 ${i > 1 ? 'w-[42px] text-right' : ''}`}
                  >
                    {h}
                  </p>
                ))}
              </div>

              <div className="divide-y divide-white/[0.06]">
                {TEAM.map((t) => {
                  const weak = t.name === WEAKEST.name;
                  return (
                    <div key={t.name} className="grid grid-cols-[1.5fr_1fr_auto_auto] items-center gap-x-3 px-4 py-2.5">
                      <div className="flex min-w-0 items-center gap-2.5">
                        <span className="grid h-7 w-7 flex-shrink-0 place-items-center rounded-full bg-ember-500/[0.16] text-[10.5px] font-bold text-ember-200">
                          {t.who}
                        </span>
                        <div className="min-w-0">
                          <p className="truncate text-[13px] font-semibold text-white">{t.name}</p>
                          <p className="truncate text-[11px] text-white/40">{t.territory}</p>
                        </div>
                      </div>

                      <div className="flex min-w-0 items-center gap-2">
                        <span className="block h-1.5 min-w-0 flex-1 overflow-hidden rounded-full bg-white/10">
                          <span
                            className={`block h-full rounded-full ${weak ? 'bg-white/30' : 'bg-ember-400'}`}
                            style={{ width: `${t.coverage}%` }}
                          />
                        </span>
                        <span className="flex-shrink-0 text-[11px] tabular-nums text-white/45">{t.coverage}%</span>
                      </div>

                      <p className="w-[42px] text-right text-[13.5px] font-bold tabular-nums text-white">{t.convos}</p>
                      <p className="flex w-[42px] items-center justify-end gap-1.5">
                        <span className="text-[13.5px] font-bold tabular-nums text-white">{t.meetings}</span>
                        {t.trend > 0 ? (
                          <TrendingUp size={12} strokeWidth={2.6} className="text-emerald-400" />
                        ) : (
                          <TrendingDown size={12} strokeWidth={2.6} className="text-ember-300" />
                        )}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* the two things a manager should act on — derived from the rows
                  above, so the strip can never contradict the table */}
              <div className="grid gap-px border-t border-white/[0.10] bg-white/[0.06] sm:grid-cols-2">
                <div className="bg-[#1B1714] px-4 py-2.5">
                  <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-ember-300">
                    Needs attention
                  </p>
                  <p className="mt-1 text-[12px] leading-[1.4] text-white/70">
                    <span className="font-bold text-white">{WEAKEST.name}</span> — lowest coverage at{' '}
                    {WEAKEST.coverage}%
                  </p>
                </div>
                <div className="bg-[#1B1714] px-4 py-2.5">
                  <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-ember-300">
                    Unassigned
                  </p>
                  <p className="mt-1 text-[12px] leading-[1.4] text-white/70">
                    <span className="font-bold text-white">41 accounts</span> in no rep&rsquo;s book
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══ 02 · Plan & assign ══════════════════════════════════════════════════ */
const TERRITORIES = [
  { name: 'West · Enterprise', owner: 'SW', accounts: 96, worked: 79 },
  { name: 'East · Enterprise', owner: 'MC', accounts: 88, worked: 56 },
  { name: 'Central · Mid-market', owner: 'PR', accounts: 124, worked: 113 },
  { name: 'Unassigned', owner: '—', accounts: 41, worked: 0 },
];

function TerritoryBoard() {
  const untouched = TERRITORIES.reduce((n, t) => n + (t.accounts - t.worked), 0);
  return (
    <Frame
      title="Territories"
      sub="Ownership and coverage across the book"
      right={<Chip tone="ember">{untouched} untouched</Chip>}
    >
      <div className="divide-y divide-slate-200/70 dark:divide-white/[0.06]">
        {TERRITORIES.map((t) => {
          const pct = Math.round((t.worked / t.accounts) * 100);
          const orphan = t.owner === '—';
          return (
            <div key={t.name} className="flex items-center gap-3 px-4 py-3">
              {orphan ? (
                <span className="grid h-7 w-7 flex-shrink-0 place-items-center rounded-full border border-dashed border-slate-300 text-[11px] text-slate-400 dark:border-white/20 dark:text-slate-500">
                  ?
                </span>
              ) : (
                <Initials v={t.owner} />
              )}
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-2 text-[13px] font-bold text-slate-900 dark:text-white">
                  <span className="truncate">{t.name}</span>
                  {orphan && <Chip tone="ember">No owner</Chip>}
                </p>
                <div className="mt-1.5 flex items-center gap-2">
                  <Bar pct={pct} tone={orphan ? 'slate' : 'ember'} />
                  <span className="w-[64px] flex-shrink-0 text-right text-[10.5px] tabular-nums text-slate-500 dark:text-slate-400">
                    {t.worked}/{t.accounts}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Frame>
  );
}

const PLAN_CARDS = [
  { t: 'Territory Management', d: 'Set clear ownership across regions, segments or teams.' },
  { t: 'Account Distribution', d: 'Assign and redistribute accounts across SDRs.' },
  { t: 'Lead Management', d: 'Keep prospects connected to the accounts your team owns.' },
  { t: 'Coverage Visibility', d: 'See which accounts are active, untouched or falling through the cracks.' },
  { t: 'Targets', d: 'Set performance expectations across SDRs and teams.' },
];

function PlanAssign() {
  return (
    <Section>
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <TerritoryBoard />
        <div>
          <Head
            eyebrow="Plan & assign"
            title="Give every SDR the right book of business."
            body={[
              'Bring your target accounts and leads into Harvin, organize them by territory and distribute them across your team.',
              'Know exactly who owns what and whether those accounts are actually being worked.',
            ]}
          />
          <div className="-mt-5 grid gap-3 sm:grid-cols-2">
            {PLAN_CARDS.map((c) => (
              <div key={c.t} className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/[0.08] dark:bg-white/[0.02]">
                <h3 className="text-[15px] font-bold leading-[1.3] tracking-[-0.015em] text-slate-900 dark:text-white">{c.t}</h3>
                <p className="mt-1.5 text-[13px] leading-[1.55] text-slate-500 dark:text-slate-400">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ══ 03 · For your SDRs ══════════════════════════════════════════════════ */
const REP_QUEUE = [
  { icon: Phone, label: 'Call before 11 AM', count: 8, tone: 'ember' as const },
  { icon: MessageSquare, label: 'Replies waiting', count: 3, tone: 'green' as const },
  { icon: Mail, label: 'Follow-ups due today', count: 12, tone: 'slate' as const },
];
const REP_ACCOUNTS = [
  { slug: 'nike', name: 'Nike', why: 'Hiring · 58 open GTM roles', score: 94 },
  { slug: 'peloton', name: 'Peloton', why: 'Scaling · headcount +14% QoQ', score: 89 },
  { slug: 'sonos', name: 'Sonos', why: 'Hiring · 26 open engineering roles', score: 81 },
  { slug: 'etsy', name: 'Etsy', why: 'Replied 2d ago · follow up', score: 74 },
  { slug: 'target', name: 'Target', why: 'Stack change · 9 new tools', score: 68 },
];
/** The replies pane — the other half of a rep's morning, and what lets the
 *  panel fill a taller column with content rather than whitespace. */
const REP_REPLIES = [
  { slug: 'nike', who: 'Dana W. · VP Marketing', line: 'Happy to take a look — what does onboarding involve?', when: '18m' },
  { slug: 'etsy', who: 'Alex T. · Director of Data', line: 'Can you send the case study first?', when: '2h' },
];

function RepDay() {
  return (
    <Frame
      fill
      title="Sarah’s day"
      sub="Her accounts, her prospects, her next actions"
      right={<Chip tone="ember">Today</Chip>}
    >
      <div className="grid grid-cols-3 gap-2 border-b border-slate-200/70 px-4 py-3 dark:border-white/[0.06]">
        {REP_QUEUE.map((q) => (
          <div key={q.label} className="min-w-0 rounded-lg bg-white px-3 py-2.5 ring-1 ring-slate-200/80 dark:bg-white/[0.05] dark:ring-white/10">
            <p className="flex items-center gap-1.5">
              <q.icon size={11} strokeWidth={2.4} className="flex-shrink-0 text-ember-500" />
              <span className="text-[15px] font-bold tabular-nums text-slate-900 dark:text-white">{q.count}</span>
            </p>
            <p className="mt-0.5 truncate text-[10.5px] text-slate-500 dark:text-slate-400">{q.label}</p>
          </div>
        ))}
      </div>

      {/* flex-1 is where the row's extra height lands */}
      <div className="flex min-h-0 flex-1 flex-col">
        <p className="px-4 pt-3 font-mono text-[9.5px] font-semibold uppercase tracking-[0.1em] text-slate-400 dark:text-slate-500">
          Work these first
        </p>
        <div className="flex flex-1 flex-col justify-around divide-y divide-slate-200/70 px-1 dark:divide-white/[0.06]">
          {REP_ACCOUNTS.map((a) => (
            <div key={a.name} className="flex items-center gap-3 px-3 py-2.5">
              <Mark slug={a.slug} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-bold text-slate-900 dark:text-white">{a.name}</p>
                <p className="truncate text-[11px] text-slate-500 dark:text-slate-400">{a.why}</p>
              </div>
              <span className="inline-flex h-[24px] w-[38px] flex-shrink-0 items-center justify-center rounded-lg border border-ember-500/30 bg-ember-500/[0.10] text-[11.5px] font-bold tabular-nums text-ember-500 dark:text-ember-300">
                {a.score}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-slate-200/70 bg-sand-100/60 px-4 py-3 dark:border-white/[0.06] dark:bg-white/[0.03]">
        <p className="font-mono text-[9.5px] font-semibold uppercase tracking-[0.1em] text-slate-400 dark:text-slate-500">
          Replies waiting
        </p>
        <div className="mt-2 space-y-2">
          {REP_REPLIES.map((r) => (
            <div key={r.who} className="flex items-start gap-2.5 rounded-lg bg-white px-3 py-2 ring-1 ring-slate-200/80 dark:bg-white/[0.05] dark:ring-white/10">
              <Mark slug={r.slug} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[12px] font-bold text-slate-900 dark:text-white">{r.who}</p>
                <p className="truncate text-[11px] text-slate-500 dark:text-slate-400">{r.line}</p>
              </div>
              <span className="flex-shrink-0 font-mono text-[10px] tabular-nums text-slate-400 dark:text-slate-500">
                {r.when}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

const REP_QUESTIONS = [
  'Who should I contact today?',
  'Why is this account worth my time?',
  'Who should I call?',
  'Who replied?',
  'What do I need to follow up on?',
  'What should I do next?',
];

function ForSdrs() {
  return (
    <Section>
      <div className="grid gap-12 lg:grid-cols-2 lg:items-stretch lg:gap-16">
        <div>
          <Head
            eyebrow="For your SDRs"
            title="Give every SDR a clear place to work."
            body={[
              'Management visibility works better when SDRs get something genuinely useful in return.',
              'Harvin gives every rep a focused workspace around their own accounts, prospects, conversations, tasks and meetings.',
              'Instead of starting the day wondering what to work on, your SDR can open Harvin and answer:',
            ]}
          />
          <div className="-mt-5">
            <CheckList items={REP_QUESTIONS} tint />
            <p className="mt-5 text-[15px] leading-[1.6] text-slate-600 dark:text-slate-400">
              Your SDR stays focused on their book of business.
            </p>
            <p className="mt-1.5 text-[15px] font-bold tracking-[-0.01em] text-slate-900 dark:text-white">
              You get visibility without asking them to report every move.
            </p>
          </div>
        </div>
        <RepDay />
      </div>
    </Section>
  );
}

/* ══ 04 · Harvin intelligence ════════════════════════════════════════════ */
const RECOMMENDATIONS = [
  { t: '12 accounts Sarah should focus on today', d: 'Based on account fit, current signals and how similar accounts have performed.' },
  { t: 'Call these 8 prospects before 11 AM', d: 'Their profile and your team’s past performance suggest a stronger chance of connecting during this window.' },
  { t: 'These 5 prospects are showing the strongest buying signals', d: 'Move them higher in today’s priorities.' },
  { t: 'This sequence is outperforming your team’s baseline by 31%', d: 'See what’s working and apply the learning across the team.' },
  { t: 'Move this account from email to call', d: 'The current outreach pattern isn’t progressing. Harvin recommends changing the approach.' },
];

function Intelligence() {
  return (
    <Section>
      <Head
        center
        eyebrow="Harvin intelligence"
        title="Turn team data into the next best action."
        body={[
          'Another dashboard only tells you what already happened.',
          'Harvin is designed to help your team decide what should happen next.',
          'Instead of showing an SDR an AI score, Harvin can surface recommendations they can actually use.',
        ]}
      />

      <Frame
        title="Recommendations"
        sub="What Harvin suggests the team does next"
        right={<Chip tone="ember"><Radar size={10} strokeWidth={2.6} />Live</Chip>}
      >
        <div className="divide-y divide-slate-200/70 dark:divide-white/[0.06]">
          {RECOMMENDATIONS.map((r) => (
            <div key={r.t} className="flex items-start gap-3.5 px-5 py-4">
              <span className="mt-[3px] grid h-6 w-6 flex-shrink-0 place-items-center rounded-lg bg-ember-500/[0.12]">
                <ArrowRight size={13} strokeWidth={2.6} className="text-ember-500" />
              </span>
              <div className="min-w-0">
                <p className="text-[15px] font-bold leading-[1.35] tracking-[-0.01em] text-slate-900 dark:text-white">{r.t}</p>
                <p className="mt-1 text-[13.5px] leading-[1.6] text-slate-500 dark:text-slate-400">{r.d}</p>
              </div>
            </div>
          ))}
        </div>
      </Frame>

      <p className="mx-auto mt-8 max-w-[760px] text-center text-[15px] leading-[1.7] text-slate-500 dark:text-slate-400">
        AI should make the SDR team better at deciding what to do, not give managers another
        collection of AI features to configure.
      </p>
    </Section>
  );
}

/* ══ 06 · From meeting to outcome ════════════════════════════════════════ */
const OUTCOMES = ['Qualified', 'Disqualified', 'Opportunity Created', 'Follow Up', 'No Show'];

/**
 * One array drives both halves of this section: the checklist beside the panel
 * lists the labels, and the panel shows each of those same six with its content
 * filled in. Add a seventh field and it appears on both sides — the list can
 * never promise something the screen does not show.
 */
const MEETING_VIEW = [
  { k: 'Assigned meetings', v: 'Nike · discovery call — assigned to AE Dana' },
  { k: 'Account context', v: 'D2C retail · 2.1M employees · Harvin score 94' },
  { k: 'Prospect information', v: 'Dana Whitfield · VP Marketing · dana.whitfield@nike.com' },
  { k: 'Previous conversations', v: '2 emails opened · 1 call connected · booked by Sarah W.' },
  { k: 'Meeting notes', v: '“Consolidating three vendors this quarter.”' },
  { k: 'Next steps', v: 'Security review · owner AE Dana · due in 5 days' },
];
const MEETING_FIELDS = MEETING_VIEW.map((m) => m.k);

/** The sidebar half: the AE's assigned meetings, first one open. */
const MEETING_LIST = [
  { slug: 'nike', name: 'Nike · discovery', when: 'Yesterday · 32 min', on: true },
  { slug: 'peloton', name: 'Peloton · intro', when: 'Tuesday · 25 min', on: false },
  { slug: 'etsy', name: 'Etsy · follow-up', when: 'Today · 3:30 PM', on: false },
];
/** The detail pane shows the rest — the first field is what the sidebar IS,
 *  so rendering it again in the pane would say the same thing twice. */
const MEETING_DETAIL = MEETING_VIEW.slice(1);

function MeetingOutcome() {
  return (
    <div className="relative h-full overflow-hidden rounded-2xl bg-sand-200 p-5 dark:bg-[#141210] sm:p-6">
      <div className="relative -mb-20 -mr-14 ml-[5%] rounded-l-[32px] bg-[#141414] py-[13px] pl-[13px] shadow-[0_26px_64px_rgba(15,23,42,0.3)]">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-[3px] rounded-l-[32px] bg-gradient-to-b from-white/30 via-white/[0.06] to-transparent"
        />

        <div className="overflow-hidden rounded-l-[22px] bg-white dark:bg-[#16130F]">
          <div className="flex items-center justify-between gap-4 px-6 py-4">
            <h4 className="truncate text-[22px] font-bold tracking-[-0.03em] text-slate-900 dark:text-white">
              Meetings
            </h4>
            <span className="flex-shrink-0 whitespace-nowrap rounded-full bg-ember-50 px-3.5 py-1.5 text-[13.5px] font-bold text-ember-600 dark:bg-ember-500/15 dark:text-ember-300">
              46 booked
            </span>
          </div>

          <div className="grid grid-cols-[188px_1fr] border-t border-slate-200/70 dark:border-white/[0.06]">
            {/* ── Assigned meetings ─────────────────────────────────── */}
            <div className="border-r border-slate-200/70 px-4 py-3.5 dark:border-white/[0.06]">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400 dark:text-slate-500">
                Assigned to me
              </p>
              <div className="mt-2.5 space-y-1.5">
                {MEETING_LIST.map((m) => (
                  <div
                    key={m.name}
                    className={`flex items-center gap-2 rounded-lg px-2 py-2 ${
                      m.on ? 'bg-ember-500/[0.10] ring-1 ring-ember-500/25' : ''
                    }`}
                  >
                    <span className="grid h-7 w-7 flex-shrink-0 place-items-center rounded-md border border-slate-200 bg-white p-1 dark:border-white/10">
                      <img src={`/logos/${m.slug}.svg`} alt="" aria-hidden="true" className="h-auto w-full object-contain" />
                    </span>
                    <div className="min-w-0">
                      <p className={`truncate text-[12px] font-semibold ${m.on ? 'text-ember-600 dark:text-ember-300' : 'text-slate-600 dark:text-slate-300'}`}>
                        {m.name}
                      </p>
                      <p className="truncate text-[10px] text-slate-400 dark:text-slate-500">{m.when}</p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-4 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400 dark:text-slate-500">
                Status
              </p>
              <div className="mt-2 space-y-1.5">
                {[{ l: 'Awaiting outcome', on: true }, { l: 'Recorded', on: false }].map((f) => (
                  <p key={f.l} className="flex items-center gap-2">
                    <span
                      className={`grid h-[15px] w-[15px] flex-shrink-0 place-items-center rounded-[4px] ${
                        f.on ? 'bg-ember-500 text-white' : 'ring-1 ring-slate-300 dark:ring-white/20'
                      }`}
                    >
                      {f.on && <Check size={10} strokeWidth={3.4} />}
                    </span>
                    <span className={`truncate text-[12px] ${f.on ? 'font-medium text-slate-900 dark:text-white' : 'text-slate-400 dark:text-slate-500'}`}>
                      {f.l}
                    </span>
                  </p>
                ))}
              </div>
            </div>

            {/* ── What the AE opens the meeting with ────────────────── */}
            <div className="min-w-0 divide-y divide-slate-200/70 dark:divide-white/[0.06]">
              {MEETING_DETAIL.map((r, i) => {
                const last = i === MEETING_DETAIL.length - 1;
                return (
                  <div key={r.k} className={`px-5 py-2.5 ${last ? 'bg-ember-500/[0.06]' : ''}`}>
                    <p
                      className={`font-mono text-[10px] font-semibold uppercase tracking-[0.12em] ${
                        last ? 'text-ember-500' : 'text-slate-400 dark:text-slate-500'
                      }`}
                    >
                      {r.k}
                    </p>
                    <p className="mt-1 text-[13.5px] font-semibold leading-[1.4] text-slate-900 dark:text-white">
                      {r.v}
                    </p>
                  </div>
                );
              })}

              <div className="px-5 py-3">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500">
                  Record what happened
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {OUTCOMES.map((o, i) => (
                    <span
                      key={o}
                      className={`rounded-lg px-2.5 py-1.5 text-[12px] font-semibold ${
                        i === 0
                          ? 'bg-ember-500 text-white'
                          : 'border border-slate-200 bg-white text-slate-600 dark:border-white/10 dark:bg-white/[0.05] dark:text-slate-300'
                      }`}
                    >
                      {o}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MeetingToOutcome() {
  return (
    <Section>
      <div className="grid gap-12 lg:grid-cols-2 lg:items-stretch lg:gap-16">
        <div>
          <Head
            eyebrow="From meeting to outcome"
            title="Don’t lose visibility when the SDR books the meeting."
            body={[
              'Meeting booked shouldn’t be the end of the SDR reporting funnel.',
              'Harvin keeps the feedback loop going. AEs get a simple place to see:',
            ]}
          />
          <div className="-mt-5">
            <CheckList items={MEETING_FIELDS} />
            <p className="mt-5 text-[15px] leading-[1.6] text-slate-600 dark:text-slate-400">
              Your SDR manager gets the feedback needed to understand the quality of pipeline being
              created — without relying on AEs to navigate a complicated CRM workflow every time.
            </p>
          </div>
        </div>
        <MeetingOutcome />
      </div>
    </Section>
  );
}

/* ══ 07 · AI coaching ════════════════════════════════════════════════════ */
const COACHING = [
  'SDRs creating activity but few conversations',
  'Reps booking meetings that rarely qualify',
  'Accounts repeatedly missing follow-up',
  'Common objections appearing across the team',
  'Segments where certain SDRs perform unusually well',
  'Sequences beginning to lose effectiveness',
  'Areas where manager coaching could have the greatest impact',
];

function Coaching() {
  return (
    <Section dark>
      <Head
        dark
        eyebrow="AI coaching"
        title="Know who needs coaching and why."
        body={[
          'Managers shouldn’t have to inspect every activity or listen to every call to find opportunities to improve the team.',
          'Harvin surfaces patterns that deserve attention. See:',
        ]}
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {COACHING.map((c) => (
          <div key={c} className="flex items-start gap-3 rounded-2xl border border-white/[0.10] bg-white/[0.04] px-5 py-4">
            <Target size={14} strokeWidth={2.2} className="mt-[3px] flex-shrink-0 text-ember-300" />
            <span className="text-[14.5px] font-semibold leading-[1.45] tracking-[-0.01em] text-white">{c}</span>
          </div>
        ))}
      </div>

      <p className="mt-8 text-[16px] text-white/60">Spend less time finding the coaching opportunity.</p>
      <p className="mt-1.5 text-[18px] font-bold tracking-[-0.015em] text-white">Spend more time coaching.</p>
    </Section>
  );
}

/* ══ 08 · For CROs, sales leaders & founders ═════════════════════════════ */
const LEADER_VIEW = [
  'Where your team is spending its time',
  'Which territories are producing',
  'Which SDRs are creating quality meetings',
  'Which channels and sequences are working',
  'Which accounts are progressing',
  'Where conversion is breaking',
  'How much qualified pipeline the SDR team is generating',
];

function ForLeaders() {
  return (
    <Section>
      <Head
        rawEyebrow
        eyebrow="FOR CROs, SALES LEADERS & FOUNDERS"
        title="See what your SDR investment is producing."
        body={[
          'You shouldn’t need three dashboards and a spreadsheet to understand whether sales development is working.',
          'Harvin gives revenue leadership visibility from SDR effort to pipeline outcome. See:',
        ]}
      />

      <div className="grid gap-3 sm:grid-cols-2">
        {LEADER_VIEW.map((l) => (
          <div
            key={l}
            className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 dark:border-white/[0.08] dark:bg-white/[0.02]"
          >
            <Check size={14} strokeWidth={2.8} className="flex-shrink-0 text-ember-500" />
            <span className="text-[15px] font-semibold tracking-[-0.01em] text-slate-900 dark:text-white">{l}</span>
          </div>
        ))}
      </div>

      <p className="mt-8 text-[16px] text-slate-600 dark:text-slate-400">The goal isn’t more SDR activity.</p>
      <p className="mt-1.5 text-[18px] font-bold tracking-[-0.015em] text-slate-900 dark:text-white">
        It’s a better-performing SDR organization.
      </p>
    </Section>
  );
}

/* ── The narrative, in wireframe order ────────────────────────────────── */
/**
 * Ordered as a persona arc, widening one tier at a time: the rep's own day
 * first, then the manager reading across the team, then the exec reading the
 * investment. The two always-dark blocks (ForManagers, Coaching) land on the
 * tier boundaries, so the ground changing under the reader IS the handoff.
 */
export default function SdrStory() {
  return (
    <>
      {/* ── The SDR: their workspace, their execution, their booked meeting ── */}
      <ForSdrs />
      <SdrExecution />
      <MeetingToOutcome />

      {/* ── The manager: the whole team, the book of business, the coaching ── */}
      <ForManagers />
      <PlanAssign />
      <Intelligence />
      <Coaching />

      {/* ── The leader: what the whole investment produced ── */}
      <ForLeaders />
    </>
  );
}
