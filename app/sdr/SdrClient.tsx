'use client';

import { useState, type ReactNode } from 'react';
import { ArrowRight, CalendarCheck, Check, ListChecks, Mic, PhoneOff, Plus, Quote, Target } from 'lucide-react';
import { useModal } from '@/components/ModalContext';
import { Avatar, CARD, Chip, Frame, LivePill, Mono, useTicker } from '@/components/ProductMocks';

/* ═══════════════════════════════════════════════════════════════════════════════
   PAGE-SPECIFIC MOCKS — kept simple (two panels, slow loops), 760 × 430 canvas
   ═══════════════════════════════════════════════════════════════════════════════ */

/* ─── Meet Harvin: an SDR's day at a glance ──────────────────────────────── */
const PRIORITIES = [
  { name: 'Initech Systems', why: 'Raised Series B', tone: 'ember', score: 92, mono: 'bg-slate-800' },
  { name: 'Northwind Analytics', why: 'Hiring 6 SDRs', tone: 'amber', score: 87, mono: 'bg-ember-500' },
  { name: 'Globex Cloud', why: 'New VP Sales', tone: 'ember', score: 81, mono: 'bg-sky-700' },
  { name: 'Umbrella Health', why: 'Adopted HubSpot', tone: 'emerald', score: 74, mono: 'bg-emerald-700' },
] as const;

function MyDayMock() {
  const tick = useTicker(3000);
  const hot = tick % PRIORITIES.length;
  return (
    <div className="flex h-full gap-4 p-6">
      <div className={`flex flex-1 flex-col ${CARD}`}>
        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
          <div>
            <p className="text-[10px] text-slate-400">Good morning, Priya</p>
            <p className="text-[13px] font-semibold text-slate-900">Priority accounts</p>
          </div>
          <LivePill>Updated now</LivePill>
        </div>
        <div className="flex-1 divide-y divide-slate-100">
          {PRIORITIES.map((a, i) => (
            <div key={a.name} className={`flex items-center gap-3 px-4 py-3 transition-colors duration-700 ${i === hot ? 'bg-ember-50/70' : ''}`}>
              <Mono name={a.name} className={`h-8 w-8 text-[12px] ${a.mono}`} />
              <span className="min-w-0 flex-1">
                <span className="block text-[11.5px] font-semibold text-slate-900">{a.name}</span>
                <span className="mt-1 block">
                  <Chip tone={a.tone}>{a.why}</Chip>
                </span>
              </span>
              <span className="text-right">
                <span className={`block text-[15px] font-semibold ${i === hot ? 'text-ember-600' : 'text-slate-800'}`}>{a.score}</span>
                <span className="block text-[8.5px] text-slate-400">Intent</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex w-[230px] shrink-0 flex-col gap-4">
        <div className="rounded-card bg-[#232220] p-4 text-white">
          <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-white/50">Today&apos;s schedule</p>
          {[
            ['11:00', 'Discovery · Initech'],
            ['15:30', 'Demo · Globex Cloud'],
          ].map(([t, m]) => (
            <p key={t} className="mt-3 flex items-center gap-2.5 text-[11px]">
              <span className="font-mono text-ember-300">{t}</span>
              <span className="font-medium">{m}</span>
            </p>
          ))}
        </div>
        <div className={`flex-1 p-4 ${CARD}`}>
          <p className="flex items-center gap-1.5 text-[11.5px] font-semibold text-slate-900">
            <ListChecks size={13} className="text-ember-500" /> Tasks
          </p>
          {['Reply to Priya Sharma', 'Call Rohan Mehta', 'Follow up: Northwind'].map((t, i) => (
            <p key={t} className="mt-2.5 flex items-center gap-2 text-[10.5px] text-slate-700">
              <span className={`flex h-4 w-4 items-center justify-center rounded border ${i === 0 ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-slate-300'}`}>
                {i === 0 && <Check size={9} strokeWidth={3} />}
              </span>
              <span className={i === 0 ? 'text-slate-400 line-through' : ''}>{t}</span>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Dialer: queue + call with talking points ───────────────────────────── */
const QUEUE = [
  { i: 'PS', n: 'Priya Sharma', c: 'Initech Systems' },
  { i: 'RM', n: 'Rohan Mehta', c: 'Northwind Analytics' },
  { i: 'KA', n: 'Kavya Agarwal', c: 'Globex Cloud' },
  { i: 'VN', n: 'Vikram Nair', c: 'Umbrella Health' },
];

const TALKING_POINTS = ['Reference the SDR hiring', 'Ask about ramp time', 'Share the benchmark', 'Ask for 20 minutes'];

function DialerMock() {
  const sec = useTicker(1000) % 16;
  const beat = Math.min(3, Math.floor(sec / 3.5));
  const secs = 64 + sec;
  return (
    <div className="flex h-full gap-4 p-6">
      <div className={`w-[200px] shrink-0 p-4 ${CARD}`}>
        <div className="flex items-center justify-between">
          <p className="text-[11.5px] font-semibold text-slate-900">Today&apos;s queue</p>
          <span className="text-[9.5px] text-slate-400">2 / 24</span>
        </div>
        <div className="mt-3 space-y-1.5">
          {QUEUE.map((q, i) => (
            <div key={q.n} className={`flex items-center gap-2.5 rounded-btn px-2.5 py-2 ${i === 1 ? 'bg-ember-50 ring-1 ring-ember-300' : ''}`}>
              {i === 0 ? (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white">
                  <Check size={10} strokeWidth={3} />
                </span>
              ) : (
                <Avatar initials={q.i} className={i === 1 ? 'bg-ember-500' : 'bg-slate-300'} />
              )}
              <span className="min-w-0">
                <span className={`block truncate text-[10.5px] font-semibold ${i === 0 ? 'text-slate-400 line-through' : 'text-slate-900'}`}>{q.n}</span>
                <span className="block truncate text-[9px] text-slate-400">{q.c}</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4">
        <div className="rounded-card bg-[#232220] p-5 text-white">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-[10.5px] font-semibold text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Connected
            </span>
            <span className="font-mono text-[12px] text-white/70">
              {String(Math.floor(secs / 60)).padStart(2, '0')}:{String(secs % 60).padStart(2, '0')}
            </span>
          </div>
          <div className="mt-4 flex items-center gap-4">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ember-500 text-[14px] font-semibold">RM</span>
            <div className="flex-1">
              <p className="text-[14px] font-semibold">Rohan Mehta</p>
              <p className="text-[10px] text-white/50">Head of RevOps · Northwind Analytics</p>
            </div>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
              <Mic size={13} />
            </span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500">
              <PhoneOff size={13} />
            </span>
          </div>
          <div className="mt-4 flex h-6 items-end gap-[3px]">
            {Array.from({ length: 44 }).map((_, i) => (
              <span
                key={i}
                className="flex-1 rounded-full bg-ember-400/80 animate-wave motion-reduce:animate-none"
                style={{ height: `${30 + ((i * 53) % 70)}%`, animationDelay: `${(i * 137) % 900}ms` }}
              />
            ))}
          </div>
        </div>

        <div className={`flex-1 p-4 ${CARD}`}>
          <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-400">Talking points</p>
          <div className="mt-2.5 grid grid-cols-2 gap-2">
            {TALKING_POINTS.map((p, i) => (
              <span
                key={p}
                className={`flex items-center gap-2 rounded-btn border px-2.5 py-2 text-[10.5px] transition-colors duration-700 ${
                  i === beat ? 'border-ember-300 bg-ember-50 font-semibold text-ember-600' : i < beat ? 'border-slate-200 text-slate-500' : 'border-slate-200 text-slate-400'
                }`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${i === beat ? 'bg-ember-500' : i < beat ? 'bg-emerald-500' : 'bg-slate-200'}`} />
                {p}
              </span>
            ))}
          </div>
          <p className="mt-3 flex items-center gap-1.5 text-[10px] text-slate-500">
            <CalendarCheck size={12} className="text-ember-500" /> Disposition logs to the account in one click
          </p>
        </div>
      </div>
    </div>
  );
}

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

const CHALLENGES = [
  { num: '01', title: 'Too many accounts, no clear priority.', desc: 'It’s hard to know which accounts deserve your attention first when signals are spread everywhere.' },
  { num: '02', title: 'Research takes time away from outreach.', desc: 'One email means jumping between LinkedIn, CRM, websites, and news just to find the right context.' },
  { num: '03', title: 'Switching between tools slows everything down.', desc: 'Email, LinkedIn, and calling live in separate windows, so context resets every time you switch channels.' },
  { num: '04', title: 'Follow-ups are easy to lose.', desc: 'With campaigns, replies, and meetings scattered around, important next steps can slip through.' },
  { num: '05', title: 'Manual SDR-to-AE handoffs take time.', desc: 'You compile emails, LinkedIn conversations, and call context just to prepare your AE for one meeting.' },
  { num: '✦', title: 'Built for how you actually work.', desc: 'Harvin connects signals, cadences, dialer, and AE handoff directly into a single unified SDR workflow.', highlight: true },
];

const MEET = [
  { title: 'Know what matters', desc: 'See the accounts and signals worth your attention, all prioritized based on intent scoring.' },
  { title: 'Understand why', desc: 'Get company details, buying signals, and latest news before you reach out.' },
  { title: 'Turn context into outreach', desc: 'Create multi-channel cadences with our inbuilt campaign launcher and dialer.' },
  { title: 'Keep the conversation moving', desc: 'Track replies, handle tasks, schedule meetings, and stay on top of every follow-up.' },
  { title: 'Pass the context forward', desc: 'When you book a meeting, relevant context is shared automatically with the AE.' },
];

const CAPABILITIES = [
  {
    step: '01',
    title: 'Start with the right accounts',
    desc: 'Harvin tracks relevant account signals and combines them into a weighted intent score. Your priority view gives you a clear starting point so you spend less time deciding and more time engaging.',
    tags: ['Priority Accounts', 'Recent Activities', "Today's Schedule", 'Tasks'],
  },
  {
    step: '02',
    title: 'Understand the account before you reach out',
    desc: 'See company information, buying signals, key contacts, recent activity and previous interactions in one place so your outreach starts with a reason, not a guess.',
    tags: ['Account Intelligence', 'Live Signals', 'Intent Score', 'Watchlists', 'Account 360'],
  },
  {
    step: '03',
    title: 'Turn account research into relevant outreach',
    desc: 'Move from account context to action without switching tools. Reach out through email, LinkedIn and calling while keeping previous interactions and next steps connected.',
    tags: ['Email', 'Dialer', 'Campaigns'],
  },
  {
    step: '04',
    title: 'Keep every next step moving',
    desc: 'Replies, tasks, meetings and follow-ups stay connected to the work you are already doing. Know what needs action, what is waiting, and what comes next.',
    tags: ['Tasks', 'Follow-ups', 'Meetings'],
  },
  {
    step: '05',
    title: 'Book the meeting. The context follows',
    desc: 'When a meeting is booked, Harvin carries account context, SDR discovery, past interactions and meeting details into the AE workflow so conversations don’t disappear.',
    tags: ['Hands Off AE Handoff'],
  },
  {
    step: '06',
    title: 'Learn from what happens next',
    desc: 'See more than how much you did. Understand campaign performance, channel patterns, meeting outcomes and AE feedback to learn what works and adjust.',
    tags: ['Performance Analytics', 'Campaign Insights', 'Meeting Outcomes', 'AE Feedback'],
  },
];

const TESTIMONIALS = [
  {
    name: 'Jordan Keller',
    role: 'Outbound SDR',
    company: 'Vanguard Tech',
    quote:
      'I used to waste the first hour of every morning deciding who to call and looking up news. Harvin gives me a prioritized list with the exact buying reason. I start dialing in 5 minutes.',
    metric: '2.5x more accounts engaged daily',
  },
  {
    name: 'Samantha Wu',
    role: 'Enterprise BDR',
    company: 'Cognitive Flow',
    quote:
      'Having email, dialer, and prospect history in the same screen means I never lose context. When someone picks up, I already see their recent email clicks and talking points.',
    metric: '+42% connect-to-meeting rate',
  },
  {
    name: 'Tyler Morris',
    role: 'Senior Sales Development Rep',
    company: 'DataPulse',
    quote:
      'My AEs love our handoffs now. Everything from my discovery notes to the recording and why now travels right into their calendar invite. Zero complaints about meeting prep.',
    metric: '100% clean AE handoffs',
  },
];

const FAQS = [
  {
    q: 'What does Harvin help me do as an SDR?',
    a: 'Harvin helps you prioritize the right accounts, understand the context behind them, reach out across channels, manage follow-ups, and move qualified meetings forward without jumping between disconnected tools.',
  },
  {
    q: 'How does Harvin help me decide which accounts to work on?',
    a: 'Harvin tracks multiple intent signals for each account and combines them into a weighted intent score. It uses that score to prioritize your day, so you know which accounts deserve your attention first.',
  },
  {
    q: 'How does Harvin help with SDR-to-AE handoff?',
    a: "Once you schedule a meeting, Harvin automatically carries the relevant account context, previous conversations, SDR discovery and meeting details into the AE's workspace. You don't need to create a separate handoff email or compile the context yourself.",
  },
  {
    q: 'Can I manage my outreach and follow-ups in Harvin?',
    a: 'Yes. You can work across email, LinkedIn and calling, track replies, manage tasks and follow-ups, and schedule meetings while keeping the conversation context connected.',
  },
];

export default function SdrClient() {
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

        <div className="relative mx-auto max-w-[1180px] text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-ember-200 bg-ember-50/80 px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-ember-600 dark:border-ember-500/30 dark:bg-ember-500/10 dark:text-ember-400">
            <Target size={13} className="text-ember-500" aria-hidden="true" />
            For the SDRs
          </span>
          <h1 className="mx-auto mt-7 max-w-[960px] font-instrument font-semibold text-[clamp(36px,5.6vw,72px)] leading-[1.03] tracking-[-0.035em] text-slate-950 dark:text-white">
            Start your day knowing what matters, <span className="text-ember-500">why and what to do next.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-[700px] text-[18px] leading-[1.65] text-slate-600 dark:text-slate-300 sm:text-[20px]">
            Harvin gives SDRs one workspace to prioritize accounts, understand buying signals, run outreach, manage follow-ups, and move qualified meetings to AEs with the right context.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#workspace"
              className="group inline-flex items-center gap-2 rounded-btn bg-ember-500 px-6 py-3.5 text-[15px] font-semibold text-white
                         shadow-[0_1px_4px_rgba(201,76,30,0.3)] transition-all duration-150
                         hover:bg-ember-400 hover:shadow-[0_4px_14px_rgba(201,76,30,0.4)]"
            >
              See how Harvin works
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </a>
            <button
              type="button"
              onClick={() => openModal('talk-to-sales')}
              className="inline-flex items-center gap-2 rounded-btn border border-slate-300 bg-white px-6 py-3.5 text-[15px] font-semibold text-slate-800 transition-colors
                         hover:border-slate-400 hover:bg-slate-50
                         dark:border-white/15 dark:bg-white/[0.04] dark:text-white dark:hover:bg-white/[0.08]"
            >
              Book a demo
            </button>
          </div>
        </div>
      </section>

      {/* ═══ 2. SOUNDS FAMILIAR? (5 CHALLENGES) ═══════════════════════════════ */}
      <section className="border-b border-slate-200 px-6 py-20 dark:border-white/[0.08] lg:py-28">
        <div className="mx-auto max-w-[1180px]">
          <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
            <div>
              <Eyebrow>Sounds familiar?</Eyebrow>
              <h2 className={`mt-5 ${H2}`}>The five challenges slowing down SDR outreach</h2>
            </div>
            <p className="text-[17px] leading-relaxed text-slate-500 dark:text-slate-400 lg:pb-2">
              You spend too much time moving between tools, deciding which accounts matter, conducting account research, tracking follow-ups, and making sure AEs have the right context.
            </p>
          </div>

          <ol className="mt-12 grid gap-px overflow-hidden rounded-modal border border-slate-200 bg-slate-200 dark:border-white/[0.08] dark:bg-white/[0.08] md:grid-cols-2 lg:grid-cols-3">
            {CHALLENGES.map((c) => (
              <li
                key={c.title}
                className={
                  c.highlight
                    ? 'relative overflow-hidden bg-[#0C0B09] p-8'
                    : 'bg-sand-50 p-8 transition-colors duration-200 hover:bg-white dark:bg-[#0A0908] dark:hover:bg-[#0F0E0C]'
                }
              >
                {c.highlight && <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_80%_at_100%_0%,rgba(201,76,30,0.35),transparent_70%)]" />}
                <span className={`relative font-mono text-[13px] font-medium ${c.highlight ? 'text-ember-400' : 'text-ember-500'}`}>{c.num}</span>
                <h3 className={`relative mt-4 font-instrument font-semibold text-[20px] leading-snug ${c.highlight ? 'text-white' : 'text-slate-950 dark:text-white'}`}>{c.title}</h3>
                <p className={`relative mt-2.5 text-[15px] leading-relaxed ${c.highlight ? 'text-slate-400' : 'text-slate-600 dark:text-slate-400'}`}>{c.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ═══ 3. MEET HARVIN ═══════════════════════════════════════════════════ */}
      <section className="border-b border-slate-200 px-6 py-20 dark:border-white/[0.08] lg:py-28">
        <div className="mx-auto grid max-w-[1180px] items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <Eyebrow>Meet Harvin</Eyebrow>
            <h2 className={`mt-5 ${H2}`}>A workspace built around your day, not around your tools.</h2>
            <p className="mt-5 text-[16.5px] leading-relaxed text-slate-600 dark:text-slate-300">
              Harvin connects the information and actions around your SDR workflow, so you can move from account signal to outreach to meeting without constantly switching context.
            </p>
            <ul className="mt-7 space-y-3.5">
              {MEET.map((item) => (
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
          <Frame w={760} h={430} label="Harvin SDR daily priorities and intent scores" aspect="aspect-[1.6/1]">
            <MyDayMock />
          </Frame>
        </div>
      </section>

      {/* ═══ 4. YOUR SDR WORKSPACE (6 CAPABILITIES) ═══════════════════════════ */}
      <section id="workspace" className="scroll-mt-24 border-b border-slate-200 px-6 py-20 dark:border-white/[0.08] lg:py-28">
        <div className="mx-auto max-w-[1180px]">
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow center>Your SDR workspace</Eyebrow>
            <h2 className={`mt-5 ${H2}`}>Everything you need for the day, connected to the work you&apos;ve already done.</h2>
            <p className="mt-4 text-[17px] text-slate-600 dark:text-slate-300">
              The tools you need to prospect, engage, follow up and move accounts forward, connected around the way you actually work.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map((cap) => (
              <div key={cap.step} className={`group flex flex-col p-7 transition-colors hover:border-ember-300 dark:hover:border-ember-500/40 ${SURFACE}`}>
                <span className="font-instrument text-[36px] font-semibold leading-none tracking-[-0.03em] text-ember-500/30">{cap.step}</span>
                <h3 className="mt-4 font-instrument font-semibold text-[20px] leading-snug text-slate-950 dark:text-white">{cap.title}</h3>
                <p className="mt-2.5 flex-1 text-[14.5px] leading-relaxed text-slate-600 dark:text-slate-400">{cap.desc}</p>
                <div className="mt-6 flex flex-wrap gap-1.5 border-t border-slate-200 pt-4 dark:border-white/[0.08]">
                  {cap.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-medium text-slate-600 dark:border-white/[0.1] dark:bg-white/[0.04] dark:text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Connected visual console below the cards */}
          <div className="relative mt-10 overflow-hidden rounded-modal border border-white/[0.08] bg-[#0C0B09] p-6 text-white sm:p-10">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_80%_at_0%_100%,rgba(201,76,30,0.3),transparent_70%)]" />
            <div className="relative grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
              <div>
                <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-ember-400">Execution &amp; Calling Console</span>
                <h4 className="mt-3 font-instrument text-[clamp(24px,2.6vw,32px)] font-semibold leading-[1.15] tracking-[-0.02em] text-white">
                  Built-in Dialer with Talking Points &amp; Queue
                </h4>
                <p className="mt-4 text-[15.5px] leading-relaxed text-slate-400">
                  Dial straight from your daily queue with live talking points and automatically log dispositions back to the account history in one click.
                </p>
              </div>
              <Frame w={760} h={430} label="SDR cold call dialer console" aspect="aspect-[1.6/1]">
                <DialerMock />
              </Frame>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 5. TESTIMONIALS ═════════════════════════════════════════════════ */}
      <section className="border-b border-slate-200 px-6 py-20 dark:border-white/[0.08] lg:py-28">
        <div className="mx-auto max-w-[1180px]">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow center>Testimonials</Eyebrow>
            <h2 className={`mt-5 ${H2}`}>What other SDRs say about Harvin</h2>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <figure key={t.name} className={`relative flex flex-col p-7 ${SURFACE}`}>
                <Quote aria-hidden="true" size={40} className="absolute right-6 top-6 rotate-180 text-ember-500/10" />
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
                    <span className="block text-[14px] font-semibold text-slate-950 dark:text-white">{t.name}</span>
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
            <h2 className={`mt-5 ${H2}`}>Got a few questions?</h2>
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
          <h2 className="font-instrument font-semibold text-[clamp(32px,4.4vw,52px)] leading-[1.08] tracking-[-0.03em]">Give your day a clear starting point.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-[17px] leading-relaxed text-white/65 sm:text-[19px]">
            See how Harvin brings your accounts, outreach and meetings into one workspace.
          </p>
          <form onSubmit={handleDemoSubmit} className="mx-auto mt-10 flex max-w-lg flex-col gap-3 sm:flex-row">
            <label htmlFor="sdr-email" className="sr-only">
              Work email
            </label>
            <input
              id="sdr-email"
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
