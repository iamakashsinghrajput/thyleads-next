'use client';

import { useState, type ReactNode } from 'react';
import { ArrowRight, BarChart3, Check, Plus, UserPlus } from 'lucide-react';
import { useModal } from '@/components/ModalContext';
import { Avatar, CARD, Chip, Frame, LivePill, Mono, useTicker } from '@/components/ProductMocks';

/* ═══════════════════════════════════════════════════════════════════════════════
   PRODUCT MOCKS — kept simple (two panels each) and slow-moving
   ═══════════════════════════════════════════════════════════════════════════════ */

/* ─── Command center: KPIs + team with attention flags ───────────────────── */
const REPS = [
  { i: 'PS', n: 'Priya S.', m: 14, acc: 92, flag: '' },
  { i: 'AM', n: 'Arjun M.', m: 11, acc: 81, flag: '' },
  { i: 'RK', n: 'Riya K.', m: 6, acc: 58, flag: 'Low coverage' },
  { i: 'DV', n: 'Dev V.', m: 9, acc: 64, flag: 'Acceptance dip' },
];

function CommandCenterMock() {
  const tick = useTicker(3000);
  const booked = 44 + (tick % 4);
  return (
    <div className="flex h-full flex-col gap-4 p-6">
      <div className="grid grid-cols-3 gap-3">
        {[
          { l: 'Meetings booked', v: String(booked), s: 'Goal 60', p: (booked / 60) * 100, dark: true },
          { l: 'AE acceptance', v: '82%', s: '+6 pts vs last month', p: 82 },
          { l: 'Team health', v: 'Good', s: '2 SDRs need attention', p: 70 },
        ].map((k) => (
          <div key={k.l} className={`p-4 ${k.dark ? 'rounded-card bg-[#232220] text-white' : CARD}`}>
            <p className={`text-[9.5px] font-semibold uppercase tracking-[0.06em] ${k.dark ? 'text-white/50' : 'text-slate-400'}`}>{k.l}</p>
            <p className={`mt-1.5 text-[24px] font-semibold leading-none ${k.dark ? '' : 'text-slate-900'}`}>{k.v}</p>
            <div className={`mt-3 h-1 overflow-hidden rounded-full ${k.dark ? 'bg-white/10' : 'bg-slate-100'}`}>
              <div className="h-full rounded-full bg-ember-400 transition-all duration-700" style={{ width: `${k.p}%` }} />
            </div>
            <p className={`mt-1.5 text-[9.5px] ${k.dark ? 'text-white/45' : 'text-slate-400'}`}>{k.s}</p>
          </div>
        ))}
      </div>

      <div className={`flex-1 ${CARD}`}>
        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
          <p className="text-[12px] font-semibold text-slate-900">Team · this month</p>
          <LivePill>Live</LivePill>
        </div>
        <div className="grid grid-cols-[1.4fr_0.8fr_1.4fr_1.2fr] gap-3 border-b border-slate-100 bg-sand-50 px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.06em] text-slate-400">
          <span>SDR</span>
          <span>Meetings</span>
          <span>AE acceptance</span>
          <span>Needs your attention</span>
        </div>
        {REPS.map((r) => (
          <div key={r.n} className={`grid grid-cols-[1.4fr_0.8fr_1.4fr_1.2fr] items-center gap-3 border-b border-slate-100 px-4 py-2.5 last:border-0 ${r.flag ? 'bg-amber-50/50' : ''}`}>
            <span className="flex items-center gap-2 text-[11px] font-semibold text-slate-900">
              <Avatar initials={r.i} className={r.flag ? 'bg-amber-500' : 'bg-slate-700'} /> {r.n}
            </span>
            <span className="text-[11px] font-semibold text-slate-700">{r.m}</span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                <span className={`block h-full rounded-full ${r.acc < 60 ? 'bg-amber-400' : 'bg-ember-400'}`} style={{ width: `${r.acc}%` }} />
              </span>
              <span className="w-7 text-[10px] text-slate-500">{r.acc}%</span>
            </span>
            <span>{r.flag ? <Chip tone="amber">{r.flag}</Chip> : <Chip tone="emerald">On track</Chip>}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Territory coverage + account allocation ───────────────────────────── */
const ACCOUNTS = [
  { name: 'Initech Systems', signal: 'Raised Series B', tone: 'ember', mono: 'bg-slate-800' },
  { name: 'Northwind Analytics', signal: 'Hiring 6 SDRs', tone: 'amber', mono: 'bg-ember-500' },
  { name: 'Globex Cloud', signal: 'New VP Sales', tone: 'ember', mono: 'bg-sky-700' },
  { name: 'Umbrella Health', signal: 'Adopted HubSpot', tone: 'emerald', mono: 'bg-emerald-700' },
] as const;

const OWNERS = [
  { i: 'PS', n: 'Priya S.', cov: 88, c: 'bg-ember-400' },
  { i: 'AM', n: 'Arjun M.', cov: 74, c: 'bg-slate-700' },
  { i: 'RK', n: 'Riya K.', cov: 41, c: 'bg-amber-500' },
];

function CoverageMock() {
  const tick = useTicker(2800);
  const assigned = tick % (ACCOUNTS.length + 1); // accounts allocated so far this loop
  return (
    <div className="flex h-full gap-4 p-6">
      <div className={`flex flex-1 flex-col ${CARD}`}>
        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
          <p className="text-[12px] font-semibold text-slate-900">Unassigned · high intent</p>
          <Chip tone="ember">{ACCOUNTS.length - assigned} left</Chip>
        </div>
        <div className="flex-1 divide-y divide-slate-100">
          {ACCOUNTS.map((a, i) => {
            const done = i < assigned;
            return (
              <div key={a.name} className="flex items-center gap-3 px-4 py-3">
                <Mono name={a.name} className={`h-7 w-7 text-[11px] ${a.mono}`} />
                <span className="min-w-0 flex-1">
                  <span className="block text-[11.5px] font-semibold text-slate-900">{a.name}</span>
                  <span className="mt-0.5 inline-block">
                    <Chip tone={a.tone}>{a.signal}</Chip>
                  </span>
                </span>
                {done ? (
                  <span className="flex items-center gap-1.5 rounded-btn bg-emerald-50 px-2.5 py-1.5 text-[10px] font-semibold text-emerald-700">
                    <Check size={11} strokeWidth={3} /> Riya K.
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 rounded-btn border border-slate-200 px-2.5 py-1.5 text-[10px] font-semibold text-slate-600">
                    <UserPlus size={11} /> Assign
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className={`w-[230px] shrink-0 p-4 ${CARD}`}>
        <p className="text-[12px] font-semibold text-slate-900">Territory coverage</p>
        <p className="text-[9.5px] text-slate-400">Priority accounts worked this week</p>
        <div className="mt-4 space-y-4">
          {OWNERS.map((o) => {
            const cov = o.i === 'RK' ? Math.min(100, o.cov + assigned * 8) : o.cov;
            return (
              <div key={o.i}>
                <div className="flex items-center gap-2">
                  <Avatar initials={o.i} className={o.c} />
                  <span className="flex-1 text-[11px] font-semibold text-slate-800">{o.n}</span>
                  <span className={`text-[11px] font-semibold ${cov < 60 ? 'text-amber-600' : 'text-slate-700'}`}>{cov}%</span>
                </div>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-100">
                  <div className={`h-full rounded-full transition-all duration-700 ${cov < 60 ? 'bg-amber-400' : 'bg-ember-400'}`} style={{ width: `${cov}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   CONTENT
   ═══════════════════════════════════════════════════════════════════════════════ */

const GAPS = [
  {
    num: '01',
    title: 'Activity tells you what happened, not always why.',
    desc: "Calls, emails and meetings show output. They don't always explain whether the issue is targeting, messaging, follow-up or execution.",
  },
  {
    num: '02',
    title: 'Coaching starts with finding the right problem.',
    desc: 'When an SDR falls behind, managers need the context behind the number before deciding what to change.',
  },
  {
    num: '03',
    title: 'Comparing SDR performance takes more work.',
    desc: 'Two SDRs can work similar accounts or territories and produce very different outcomes, but understanding why requires pulling together multiple pieces of data.',
  },
  {
    num: '04',
    title: 'Account prioritization becomes manual.',
    desc: 'Managers often have to research accounts themselves to identify which ones have meaningful signals and where SDR attention should go.',
  },
  {
    num: '05',
    title: 'Connecting meetings to real outcomes.',
    desc: 'Booked meetings are only one part of SDR performance. SDR Heads also need visibility into what happens after the meeting reaches the AE.',
  },
  {
    num: '✦',
    title: 'The Harvin solution',
    desc: 'A single command layer that unifies live signals, team performance, meeting qualification, and 1:1 coaching.',
    highlight: true,
  },
];

const HELPS = [
  { title: 'One view of team performance', desc: 'See activities, meetings, and outcomes without pulling data from multiple platforms.' },
  { title: 'Know where support is needed', desc: 'Identify where performance is changing and where your coaching has the highest impact.' },
  { title: 'Understand what drives the difference', desc: 'Compare SDR performance across similar territories to uncover execution differences.' },
  { title: 'Put account signals into action', desc: 'Track account changes and prioritize accounts without manual research.' },
  { title: 'See beyond meetings booked', desc: 'Bring meeting outcomes and AE feedback into the picture to verify meeting quality.' },
];

const CAPABILITIES = [
  {
    step: '01',
    title: 'See what needs your attention',
    desc: 'Get a quick view of team health, goal attainment, meetings, performance and Needs Your Attention items, so you can start with the areas that need you most.',
    tags: ['Command Center', 'Live Signals', "Today's Schedule"],
  },
  {
    step: '02',
    title: 'Understand your team',
    desc: 'See team-wide performance, then open an SDR 360° profile to explore their activity, performance trends, meetings, feedback and history.',
    tags: ['Team Performance', 'SDR 360°'],
  },
  {
    step: '03',
    title: 'See Meeting Outcomes',
    desc: 'Track booked and completed meetings, outcomes, AE qualification and feedback to see what your SDRs are creating beyond meeting volume.',
    tags: ['Meetings', 'AE Feedback'],
  },
  {
    step: '04',
    title: 'Know where your team should focus',
    desc: 'See account intelligence with intent signals. Open Account 360° to understand the company, contacts, and account activity to mark them as priority for your SDRs.',
    tags: ['Account Intelligence', 'Account 360°'],
  },
  {
    step: '05',
    title: 'Keep execution visible',
    desc: "Stay connected to the operational workflows behind your team's outreach, including conversations, calling activity and mailbox health.",
    tags: ['Campaign', 'Dialer', 'Inbox', 'Mailboxes'],
  },
  {
    step: '06',
    title: 'Recognize performance with Leaderboard',
    desc: 'Give the team visibility into performance and recognition while keeping the focus on broader outcomes, not activity alone.',
    tags: ['Leaderboard'],
  },
  {
    step: '07',
    title: 'Coach from context, not just numbers',
    desc: 'When performance changes, open the SDR 360° view to see the activity, meetings, feedback and history behind the trend. Use the full picture to decide next steps.',
    tags: ['SDR 360°', '1:1 Coaching plans'],
  },
];

const TESTIMONIALS = [
  {
    name: 'Vikram Sethi',
    role: 'VP of Sales Development',
    company: 'Aura Data',
    quote:
      'Before Harvin, 1:1 coaching was based on raw dials and gut feel. Now I open SDR 360, see the exact conversion friction on calls and emails, and our coaching sessions actually move pipeline.',
    metric: '+36% team quota attainment',
  },
  {
    name: 'Jessica Thorne',
    role: 'Global SDR Director',
    company: 'MetricPulse',
    quote:
      'The Command Center gives me complete visibility across 25 SDRs. I know which accounts have live intent signals and whether our territory allocations are being properly worked without nagging managers.',
    metric: '4 hours saved per manager weekly',
  },
  {
    name: 'David Reynolds',
    role: 'Head of Outbound Revenue',
    company: 'CloudMatrix',
    quote:
      'Connecting booked meetings directly to AE qualification feedback transformed our team. Our SDRs don’t just book meetings—they book high-quality meetings that convert.',
    metric: '92% AE meeting acceptance',
  },
];

const FAQS = [
  {
    q: 'What does Harvin help an SDR Head see?',
    a: 'Harvin brings team health, goal attainment, meetings, account coverage, campaign performance and relevant attention areas into one workspace.',
  },
  {
    q: 'How does Harvin help me know where my team needs attention?',
    a: 'The Command Center surfaces goal attainment, team health and Needs Your Attention items, so you can identify where intervention may be needed without reviewing every SDR individually.',
  },
  {
    q: 'Can I see why an SDR is underperforming?',
    a: 'Yes. SDR 360° connects performance trends with activity, meetings, AE feedback and relevant history, giving you more context for coaching.',
  },
  {
    q: 'Can I manage account allocation from Harvin?',
    a: 'Yes. Harvin allows for you to do account allocation to your SDRs directly from the platform.',
  },
];

/* ═══════════════════════════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════════════════════════ */

const H2 = 'font-instrument font-semibold text-[clamp(30px,3.6vw,46px)] leading-[1.08] tracking-[-0.025em] text-slate-950 dark:text-white';
const SURFACE =
  'rounded-modal border border-slate-200 bg-sand-50 shadow-[0_4px_32px_rgba(0,0,0,0.06)] dark:border-white/[0.08] dark:bg-[#0F0E0C] dark:shadow-[0_4px_40px_rgba(0,0,0,0.35)]';

function Eyebrow({ children, center }: { children: ReactNode; center?: boolean }) {
  return (
    <p className={`flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-ember-500 ${center ? 'justify-center' : ''}`}>
      <span aria-hidden="true" className="h-px w-6 bg-ember-500" />
      {children}
    </p>
  );
}

export default function SdrHeadClient() {
  const { openModal } = useModal();
  const [email, setEmail] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    openModal('talk-to-sales');
  };

  return (
    <div className="relative w-full">
      {/* ═══ 1. HERO ══════════════════════════════════════════════════════════ */}
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

        <div className="relative mx-auto max-w-[960px] text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-ember-200 bg-ember-50/80 px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-ember-600 dark:border-ember-500/30 dark:bg-ember-500/10 dark:text-ember-400">
            <BarChart3 size={13} className="text-ember-500" aria-hidden="true" />
            For SDR Heads
          </span>
          <h1 className="mx-auto mt-7 max-w-4xl font-instrument font-semibold text-[clamp(38px,5.8vw,74px)] leading-[1.03] tracking-[-0.035em] text-slate-950 dark:text-white">
            Know where your team <span className="text-ember-500">needs you.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-[640px] text-[18px] leading-[1.65] text-slate-600 dark:text-slate-300 sm:text-[20px]">
            Run your SDR team from one connected workspace for performance, accounts, meetings and coaching.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => openModal('talk-to-sales')}
              className="group inline-flex items-center gap-2 rounded-btn bg-ember-500 px-6 py-3.5 text-[15px] font-semibold text-white
                         shadow-[0_1px_4px_rgba(201,76,30,0.3)] transition-all duration-150
                         hover:bg-ember-400 hover:shadow-[0_4px_14px_rgba(201,76,30,0.4)]
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-500 focus-visible:ring-offset-2"
            >
              Book a demo
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </button>
            <a
              href="#workspace"
              className="inline-flex items-center gap-2 rounded-btn border border-slate-300 bg-white px-6 py-3.5 text-[15px] font-semibold text-slate-800 transition-colors
                         hover:border-slate-400 hover:bg-slate-50
                         dark:border-white/15 dark:bg-white/[0.04] dark:text-white dark:hover:bg-white/[0.08]"
            >
              See how Harvin works
            </a>
          </div>
        </div>
      </section>

      {/* ═══ 2. THE GAP ═══════════════════════════════════════════════════════ */}
      <section className="border-b border-slate-200 px-6 py-20 dark:border-white/[0.08] lg:py-28">
        <div className="mx-auto max-w-[1180px]">
          <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
            <div>
              <Eyebrow>The gap</Eyebrow>
              <h2 className={`mt-5 ${H2}`}>Running the team means connecting more than activity.</h2>
            </div>
            <p className="text-[17px] leading-relaxed text-slate-500 dark:text-slate-400 lg:pb-2">
              Performance, account coverage, meetings and feedback each tell part of the story. Harvin brings them together so you can understand where the team needs attention and what to do next.
            </p>
          </div>

          <ol className="mt-12 grid gap-px overflow-hidden rounded-modal border border-slate-200 bg-slate-200 dark:border-white/[0.08] dark:bg-white/[0.08] md:grid-cols-2 lg:grid-cols-3">
            {GAPS.map((card) => (
              <li
                key={card.title}
                className={
                  card.highlight
                    ? 'relative overflow-hidden bg-[#0C0B09] p-8'
                    : 'bg-sand-50 p-8 transition-colors duration-200 hover:bg-white dark:bg-[#0A0908] dark:hover:bg-[#0F0E0C]'
                }
              >
                {card.highlight && (
                  <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_80%_at_100%_0%,rgba(201,76,30,0.35),transparent_70%)]" />
                )}
                <span className={`relative font-mono text-[12px] font-medium ${card.highlight ? 'text-ember-400' : 'text-ember-500'}`}>{card.num}</span>
                <h3 className={`relative mt-4 font-instrument font-semibold text-[19px] leading-snug ${card.highlight ? 'text-white' : 'text-slate-950 dark:text-white'}`}>{card.title}</h3>
                <p className={`relative mt-2.5 text-[14.5px] leading-relaxed ${card.highlight ? 'text-slate-400' : 'text-slate-600 dark:text-slate-400'}`}>{card.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ═══ 3. HOW HARVIN HELPS ══════════════════════════════════════════════ */}
      <section className="border-b border-slate-200 px-6 py-20 dark:border-white/[0.08] lg:py-28">
        <div className="mx-auto grid max-w-[1180px] items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <Eyebrow>How Harvin helps</Eyebrow>
            <h2 className={`mt-5 ${H2}`}>From scattered data to clear action</h2>
            <p className="mt-5 text-[16.5px] leading-relaxed text-slate-600 dark:text-slate-300">
              Harvin brings the context you need together, so you can understand performance, spot gaps, and act faster.
            </p>
            <ul className="mt-7 space-y-3.5">
              {HELPS.map((item) => (
                <li key={item.title} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-ember-500 text-white">
                    <Check size={11} strokeWidth={3} aria-hidden="true" />
                  </span>
                  <p className="text-[14.5px] leading-relaxed text-slate-600 dark:text-slate-400">
                    <strong className="font-semibold text-slate-950 dark:text-white">{item.title}</strong> — {item.desc}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <Frame w={760} h={430} label="SDR Head Command Center Overview" aspect="aspect-[1.6/1]">
            <CommandCenterMock />
          </Frame>
        </div>
      </section>

      {/* ═══ 4. THE SDR HEAD WORKSPACE (7 CAPABILITIES) ═══════════════════════ */}
      <section id="workspace" className="scroll-mt-24 border-b border-slate-200 px-6 py-20 dark:border-white/[0.08] lg:py-28">
        <div className="mx-auto max-w-[1180px]">
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow center>The SDR Head workspace</Eyebrow>
            <h2 className={`mt-5 ${H2}`}>Everything you need to run the team with more clarity.</h2>
            <p className="mt-4 text-[17px] text-slate-600 dark:text-slate-300">
              Harvin brings your team&apos;s performance, account priorities, meetings, and outcomes in one connected workspace.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map((cap) => (
              <div key={cap.step} className={`group flex flex-col p-7 transition-colors hover:border-ember-300 dark:hover:border-ember-500/40 ${SURFACE}`}>
                <span className="font-mono text-[12px] font-medium text-ember-500">{cap.step}</span>
                <h3 className="mt-3 font-instrument font-semibold text-[19px] leading-snug text-slate-950 dark:text-white">{cap.title}</h3>
                <p className="mt-2.5 flex-1 text-[14.5px] leading-relaxed text-slate-600 dark:text-slate-400">{cap.desc}</p>
                <div className="mt-6 flex flex-wrap gap-1.5 border-t border-slate-200 pt-4 dark:border-white/[0.08]">
                  {cap.tags.map((tag) => (
                    <span key={tag} className="rounded-md bg-sand-100 px-2.5 py-1 text-[11px] font-medium text-slate-600 dark:bg-white/[0.05] dark:text-slate-300">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}

            {/* Live console — the 7 capabilities in action */}
            <div className={`p-6 md:col-span-2 ${SURFACE}`}>
              <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-ember-500">Live Console</p>
              <h4 className="mt-2 font-instrument text-[20px] font-semibold text-slate-950 dark:text-white">Territory Coverage &amp; Real-time Account Allocation</h4>
              <div className="mt-5">
                <Frame w={760} h={380} label="Account allocation and territory prioritization" aspect="aspect-[1.85/1]">
                  <CoverageMock />
                </Frame>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 5. TESTIMONIALS ═════════════════════════════════════════════════ */}
      <section className="border-b border-slate-200 px-6 py-20 dark:border-white/[0.08] lg:py-28">
        <div className="mx-auto max-w-[1180px]">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow center>Testimonials</Eyebrow>
            <h2 className={`mt-5 ${H2}`}>What other SDR Heads say about Harvin</h2>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <figure key={t.name} className={`flex flex-col p-7 ${SURFACE}`}>
                <p className="font-instrument text-[30px] font-semibold leading-none tracking-[-0.02em] text-ember-500">{t.metric.split(' ')[0]}</p>
                <p className="mt-1 text-[12.5px] font-medium text-slate-500 dark:text-slate-400">{t.metric.split(' ').slice(1).join(' ')}</p>
                <blockquote className="mt-5 flex-1 text-[15px] leading-relaxed text-slate-700 dark:text-slate-300">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-slate-200 pt-5 dark:border-white/[0.08]">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-[12px] font-semibold text-white dark:bg-white/[0.1]">
                    {t.name
                      .split(' ')
                      .map((p) => p[0])
                      .join('')}
                  </span>
                  <span>
                    <span className="block text-[14px] font-semibold text-slate-900 dark:text-white">{t.name}</span>
                    <span className="block text-[12px] text-slate-500 dark:text-slate-400">
                      {t.role} · {t.company}
                    </span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 6. FAQS ══════════════════════════════════════════════════════════ */}
      <section className="border-b border-slate-200 px-6 py-20 dark:border-white/[0.08] lg:py-28">
        <div className="mx-auto grid max-w-[1180px] gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <Eyebrow>FAQs</Eyebrow>
            <h2 className={`mt-5 ${H2}`}>What SDR Heads ask us</h2>
          </div>
          <div className="divide-y divide-slate-200 border-y border-slate-200 dark:divide-white/[0.08] dark:border-white/[0.08]">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={faq.q}>
                  <button type="button" aria-expanded={isOpen} onClick={() => setOpenFaq(isOpen ? null : idx)} className="group flex w-full items-center gap-4 py-5 text-left">
                    <span className="font-mono text-[12px] text-ember-500">{String(idx + 1).padStart(2, '0')}</span>
                    <span className="flex-1 text-[16px] font-semibold text-slate-900 transition-colors group-hover:text-ember-500 dark:text-white">{faq.q}</span>
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-200 ${
                        isOpen ? 'rotate-45 border-ember-500 bg-ember-500 text-white' : 'border-slate-300 text-slate-500 dark:border-white/15 dark:text-slate-400'
                      }`}
                    >
                      <Plus size={14} strokeWidth={2.5} aria-hidden="true" />
                    </span>
                  </button>
                  {isOpen && <p className="pb-6 pl-9 pr-11 text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">{faq.a}</p>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ 7. FINAL CTA ═════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#0C0B09] px-6 py-24 text-white lg:py-32">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_80%_at_50%_0%,rgba(201,76,30,0.3),transparent_70%)]" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(60%_70%_at_50%_30%,#000,transparent)]"
        />
        <div className="relative mx-auto max-w-[840px] text-center">
          <h2 className="font-instrument font-semibold text-[clamp(32px,4.4vw,52px)] leading-[1.08] tracking-[-0.03em]">Start running your team with clarity.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-[17px] leading-relaxed text-white/65 sm:text-[19px]">
            Give your SDR team a connected way to work, and give yourself a clearer path to coaching.
          </p>
          <form onSubmit={handleDemoSubmit} className="mx-auto mt-10 flex max-w-lg flex-col gap-3 sm:flex-row">
            <label htmlFor="sh-email" className="sr-only">
              Work email
            </label>
            <input
              id="sh-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="What's your work email?"
              className="w-full rounded-btn border border-white/15 bg-white/[0.06] px-4 py-3.5 text-[15px] text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-ember-500 sm:flex-1"
            />
            <button
              type="submit"
              className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-btn bg-ember-500 px-6 py-3.5 text-[15px] font-semibold text-white
                         shadow-[0_1px_4px_rgba(201,76,30,0.3)] transition-all duration-150 hover:bg-ember-400 hover:shadow-[0_4px_14px_rgba(201,76,30,0.4)]"
            >
              Book a demo
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
