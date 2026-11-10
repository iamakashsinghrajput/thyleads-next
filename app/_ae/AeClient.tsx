'use client';

import { useState, type ReactNode } from 'react';
import {
  ArrowRight,
  Briefcase,
  Calendar,
  CalendarCheck,
  Check,
  Linkedin,
  Mail,
  Mic,
  Phone,
  PhoneOff,
  Plus,
  Star,
} from 'lucide-react';
import { useModal } from '@/components/ModalContext';
import { Avatar, CARD, Chip, Frame, LivePill, Mono, useTicker } from '@/components/ProductMocks';

/* ═══════════════════════════════════════════════════════════════════════════════
   PRODUCT MOCKS — coded look-alikes on a 640 × 400 canvas (see ProductMocks).
   Kept to two panels each and slow loops, so they read at a glance.
   ═══════════════════════════════════════════════════════════════════════════════ */
const W = 640;
const H = 400;

/* ─── Hero: before the meeting → after the meeting ───────────────────────── */
const AFTER = [
  { t: 'Outcome logged', s: 'Held · qualified' },
  { t: 'Opportunity created', s: 'Initech — $36,000 ARR' },
  { t: 'Next step scheduled', s: 'Security review · Tue' },
  { t: 'Feedback sent to Priya', s: '4 / 5 · great prep' },
];

function BeforeAfterMock() {
  const tick = useTicker(1600);
  const done = tick % (AFTER.length + 3);
  return (
    <div className="flex h-full gap-4 p-6">
      <div className="flex w-[290px] shrink-0 flex-col rounded-card bg-[#232220] p-5 text-white shadow-[0_4px_32px_rgba(0,0,0,0.12)]">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-ember-300">Up next · in 12 min</span>
          <span className="rounded-full bg-white/10 px-2 py-0.5 text-[9.5px] text-white/70">SDR-booked</span>
        </div>
        <p className="mt-3 text-[15px] font-semibold">Discovery · Initech Systems</p>
        <p className="text-[10.5px] text-white/50">11:00 – 11:30 AM · Priya Sharma, VP Sales</p>
        <div className="mt-4 space-y-3 border-t border-white/[0.08] pt-4 text-[10.5px]">
          {[
            ['Why now', 'Raised Series B · hiring 6 SDRs'],
            ['SDR discovery', 'Ramp time ~3 months is the pain'],
            ['Previous touches', '4 emails · 2 calls · LinkedIn'],
          ].map(([k, v]) => (
            <div key={k}>
              <p className="text-[9px] font-semibold uppercase tracking-[0.08em] text-white/40">{k}</p>
              <p className="mt-0.5 font-medium text-white/85">{v}</p>
            </div>
          ))}
        </div>
        <div className="mt-auto flex items-center gap-2 pt-4 text-[10px] text-white/50">
          <Avatar initials="PS" className="bg-ember-400" /> Booked by Priya (SDR)
        </div>
      </div>

      <div className={`flex flex-1 flex-col p-5 ${CARD}`}>
        <div className="flex items-center justify-between">
          <p className="text-[12.5px] font-semibold text-slate-900">After the meeting</p>
          <Chip tone={done >= AFTER.length ? 'emerald' : 'slate'}>{done >= AFTER.length ? 'All connected' : 'In progress'}</Chip>
        </div>
        <div className="mt-4 flex-1 space-y-2.5">
          {AFTER.map((a, i) => {
            const on = i < done;
            return (
              <div
                key={a.t}
                className={`flex items-center gap-3 rounded-btn border px-3 py-2.5 transition-all duration-700 ${on ? 'border-slate-200 bg-sand-50' : 'border-dashed border-slate-200 opacity-45'}`}
              >
                <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full transition-colors duration-700 ${on ? 'bg-emerald-500 text-white' : 'bg-slate-200'}`}>
                  {on && <Check size={11} strokeWidth={3} />}
                </span>
                <span>
                  <span className="block text-[11.5px] font-semibold text-slate-900">{a.t}</span>
                  <span className="block text-[10px] text-slate-500">{a.s}</span>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ─── How Harvin helps: SDR discovery + Account 360 ─────────────────────── */
const BRIEF = [
  { k: 'Why now', v: 'Raised $40M Series B · hiring 6 SDRs' },
  { k: 'Pain', v: 'New reps take ~3 months to ramp' },
  { k: 'Current stack', v: 'HubSpot · Outreach · spreadsheets' },
  { k: 'Talking point', v: 'Lead with the ramp-time benchmark' },
];

function HandoffMock() {
  const tick = useTicker(3000);
  const hot = tick % BRIEF.length;
  return (
    <div className="flex h-full flex-col gap-4 p-6">
      <div className={`flex items-center justify-between px-4 py-3 ${CARD}`}>
        <div className="flex items-center gap-3">
          <Mono name="Initech" className="h-9 w-9 bg-slate-800 text-[13px]" />
          <div>
            <p className="text-[13px] font-semibold text-slate-900">Initech Systems</p>
            <p className="text-[10px] text-slate-400">Priya Sharma · VP Sales · Discovery Thu 11:00</p>
          </div>
        </div>
        <div className="flex gap-1.5">
          <Chip tone="ember">Tier 1</Chip>
          <Chip tone="slate">ICP fit 92</Chip>
        </div>
      </div>

      <div className="grid flex-1 grid-cols-[1.3fr_1fr] gap-4">
        <div className={`p-4 ${CARD}`}>
          <p className="text-[11.5px] font-semibold text-slate-900">SDR discovery</p>
          <div className="mt-3 space-y-2">
            {BRIEF.map((b, i) => (
              <div key={b.k} className={`rounded-btn border px-3 py-2 transition-colors duration-700 ${i === hot ? 'border-ember-300 bg-ember-50' : 'border-slate-100 bg-sand-50'}`}>
                <p className="text-[9px] font-semibold uppercase tracking-[0.08em] text-slate-400">{b.k}</p>
                <p className="mt-0.5 text-[11px] font-medium text-slate-800">{b.v}</p>
              </div>
            ))}
          </div>
        </div>
        <div className={`p-4 ${CARD}`}>
          <p className="text-[11.5px] font-semibold text-slate-900">Account signals</p>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            <Chip tone="ember">Series B</Chip>
            <Chip tone="amber">Hiring SDRs</Chip>
            <Chip tone="emerald">New CRM</Chip>
          </div>
          <p className="mt-5 text-[11.5px] font-semibold text-slate-900">Previous interactions</p>
          {(
            [
              [Mail, '4 emails · 2 replies'],
              [Phone, '2 calls · 1 connected'],
              [Linkedin, 'Connected on LinkedIn'],
            ] as const
          ).map(([Icon, t]) => (
            <p key={t} className="mt-2 flex items-center gap-2 text-[10.5px] text-slate-600">
              <Icon size={12} className="text-slate-400" /> {t}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Console tab 1: calendar + meeting details ─────────────────────────── */
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const MEETINGS = [
  { d: 0, r: 1, n: 'Globex Cloud', sdr: true },
  { d: 1, r: 3, n: 'Northwind', sdr: true },
  { d: 2, r: 0, n: 'Pipeline review', sdr: false },
  { d: 3, r: 1, n: 'Initech Systems', sdr: true },
  { d: 4, r: 2, n: 'Umbrella Health', sdr: true },
];
const DETAILS = [
  { n: 'Globex Cloud', p: 'Kavya Agarwal · SDR Manager', why: 'New VP Sales', sdr: 'Arjun M.' },
  { n: 'Northwind', p: 'Rohan Mehta · Head of RevOps', why: 'Hiring 6 SDRs', sdr: 'Priya S.' },
  { n: 'Initech Systems', p: 'Priya Sharma · VP Sales', why: 'Raised Series B', sdr: 'Priya S.' },
  { n: 'Umbrella Health', p: 'Vikram Nair · CRO', why: 'Adopted HubSpot', sdr: 'Riya K.' },
];

function CalendarMock() {
  const tick = useTicker(3200);
  const sel = DETAILS[tick % DETAILS.length];
  return (
    <div className="flex h-full gap-4 p-6">
      <div className={`flex-1 p-4 ${CARD}`}>
        <div className="flex items-center justify-between">
          <p className="text-[12px] font-semibold text-slate-900">This week</p>
          <span className="flex items-center gap-1.5 text-[9.5px] text-slate-400">
            <span className="h-2 w-2 rounded-sm bg-ember-500" /> SDR-booked
          </span>
        </div>
        <div className="mt-3 grid grid-cols-5 gap-2">
          {DAYS.map((d, c) => (
            <div key={d} className="flex flex-col gap-1.5">
              <span className="text-center text-[9.5px] text-slate-400">{d}</span>
              {[0, 1, 2, 3].map((r) => {
                const m = MEETINGS.find((x) => x.d === c && x.r === r);
                const active = m?.n === sel.n;
                return (
                  <span
                    key={r}
                    className={`h-[52px] rounded-[6px] px-1.5 py-1.5 text-[9px] font-semibold leading-tight transition-all duration-700 ${
                      m
                        ? m.sdr
                          ? active
                            ? 'bg-ember-500 text-white ring-2 ring-ember-300 ring-offset-1'
                            : 'bg-ember-50 text-ember-600 shadow-[inset_3px_0_0_#E56B2C]'
                          : 'bg-slate-100 text-slate-500'
                        : 'bg-sand-50'
                    }`}
                  >
                    {m?.n}
                  </span>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="w-[210px] shrink-0 rounded-card bg-[#232220] p-4 text-white">
        <p className="text-[9.5px] font-semibold uppercase tracking-[0.08em] text-ember-300">Meeting details</p>
        <p className="mt-2 text-[14px] font-semibold">{sel.n}</p>
        <p className="text-[10px] text-white/50">{sel.p}</p>
        <div className="mt-4 space-y-3 border-t border-white/[0.08] pt-4 text-[10.5px]">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.08em] text-white/40">Why now</p>
            <p className="mt-0.5 font-medium text-white/85">{sel.why}</p>
          </div>
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.08em] text-white/40">Booked by</p>
            <p className="mt-0.5 font-medium text-white/85">{sel.sdr} (SDR)</p>
          </div>
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.08em] text-white/40">Context</p>
            <p className="mt-0.5 font-medium text-white/85">Discovery notes · Account 360°</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Console tab 2: integrated dialer + notes ──────────────────────────── */
const NOTES = ['Security review needs RevOps sign-off', 'Wants pricing for 10 seats', 'Follow up with case study Tuesday'];

function DialerNotesMock() {
  const sec = useTicker(1000) % 15;
  const lines = Math.min(NOTES.length, Math.floor(sec / 3));
  const secs = 212 + sec;
  return (
    <div className="flex h-full gap-4 p-6">
      <div className="flex w-[250px] shrink-0 flex-col rounded-card bg-[#232220] p-5 text-white">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-[10px] font-semibold text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Connected
          </span>
          <span className="font-mono text-[11px] text-white/70">
            {String(Math.floor(secs / 60)).padStart(2, '0')}:{String(secs % 60).padStart(2, '0')}
          </span>
        </div>
        <div className="mt-6 flex flex-col items-center text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-ember-500 text-[17px] font-semibold">PS</span>
          <p className="mt-3 text-[14px] font-semibold">Priya Sharma</p>
          <p className="text-[10px] text-white/50">VP Sales · Initech Systems</p>
        </div>
        <div className="mt-5 flex h-7 items-end gap-[3px]">
          {Array.from({ length: 28 }).map((_, i) => (
            <span
              key={i}
              className="flex-1 rounded-full bg-ember-400/80 animate-wave motion-reduce:animate-none"
              style={{ height: `${30 + ((i * 53) % 70)}%`, animationDelay: `${(i * 137) % 900}ms` }}
            />
          ))}
        </div>
        <div className="mt-auto flex justify-center gap-3 pt-4">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
            <Mic size={14} />
          </span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-red-500">
            <PhoneOff size={14} />
          </span>
        </div>
      </div>

      <div className={`flex flex-1 flex-col p-4 ${CARD}`}>
        <div className="flex items-center justify-between">
          <p className="text-[12px] font-semibold text-slate-900">Live notes</p>
          <LivePill>Saving to Initech</LivePill>
        </div>
        <div className="mt-3 flex-1 space-y-2">
          {NOTES.map((n, i) => (
            <p
              key={n}
              className={`flex items-start gap-2 rounded-btn px-3 py-2 text-[11px] transition-all duration-700 ${
                i < lines ? 'bg-sand-50 text-slate-800' : 'bg-transparent text-transparent'
              }`}
            >
              <span className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full ${i < lines ? 'bg-ember-500' : 'bg-transparent'}`} />
              {n}
            </p>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-2 border-t border-slate-100 pt-3">
          <span className="flex items-center gap-1.5 rounded-btn bg-ember-500 px-2.5 py-1.5 text-[10px] font-semibold text-white">
            <CalendarCheck size={11} /> Create task
          </span>
          <span className="flex items-center gap-1.5 rounded-btn border border-slate-200 px-2.5 py-1.5 text-[10px] font-semibold text-slate-700">
            <Star size={11} /> Feedback to SDR
          </span>
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
  {
    num: '1',
    title: 'Meeting prep takes up valuable time',
    desc: 'Before a meeting, you’re often piecing together what happened across email threads, account research, and previous conversations.',
  },
  {
    num: '2',
    title: 'What happens next gets lost',
    desc: 'Meeting outcomes, follow-ups, opportunities, feedback, and next steps can end up scattered across different workflows, making it harder to keep momentum after the conversation.',
  },
  {
    num: '3',
    title: 'The deal story is spread across systems',
    desc: 'Research on LinkedIn, calls on your phone, notes in a diary, CRM updates, and deal management in a separate sales room create more places to work and more context to keep track of.',
  },
];

const HELPS = [
  {
    num: '1',
    title: 'Start where the SDR left off',
    desc: 'When an SDR books a meeting, Harvin brings together the account, prospect, SDR discovery, previous interactions, relevant signals, and talking points in one place.',
  },
  {
    num: '2',
    title: 'Know the prospect before the conversation starts',
    desc: 'Move between prospect details, Account 360, previous interactions and relevant account signals without losing the thread of the conversation.',
  },
  {
    num: '3',
    title: 'Turn conversations into clear next steps',
    desc: 'Capture meeting outcomes, create tasks, and move relevant conversations into opportunities so the work continues after the meeting',
  },
  {
    num: '4',
    title: 'Keep the full deal in view',
    desc: 'Move from prospect to account to meeting to opportunity without losing the context built along the way.',
  },
  {
    num: '5',
    title: 'Continue the deal into your sales room',
    desc: 'Connect Harvin with your Digital Sales Room when you need to continue the deal there, while keeping the workflow connected.',
  },
  {
    num: '6',
    title: 'Close the loop with your SDRs',
    desc: 'Share structured feedback with the SDR after the meeting, so what you learn becomes part of the team’s next cycle.',
  },
];

const CAPABILITIES = [
  {
    step: '01',
    title: 'Your day, at a glance',
    desc: 'See upcoming meetings, tasks, opportunities, and activity from one place, so you know what needs your attention.',
    tags: ['Calendar', 'Meeting details', "Today's Schedule"],
  },
  {
    step: '02',
    title: 'Every meeting, with the context behind it',
    desc: 'Open a meeting to see the details of the prospect, account, previous interactions with the SDR, relevant signals, and talking points in one view.',
    tags: ['Meeting Details', 'Prospect Details', 'Account 360°'],
  },
  {
    step: '03',
    title: 'Keep every conversation moving',
    desc: 'Use the integrated dialer to make and manage calls from the workspace, while keeping communication connected to the rest of the workflow.',
    tags: ['Integrated Dialer', 'Call Queue', 'Live Notes'],
  },
  {
    step: '04',
    title: 'Move from meeting to opportunity',
    desc: 'Capture the meeting outcome, create next steps, and move relevant conversations into an opportunity without losing the context behind them.',
    tags: ['Tasks', 'Meeting Completed', 'Opportunities'],
  },
  {
    step: '05',
    title: 'Continue the deal into your sales room',
    desc: 'When a deal needs a Digital Sales Room, create and manage it through an integrated DSR platform and engage your buyers there without breaking the workflow.',
    tags: ['Opportunities', 'Dealroom', 'Buyer Engagement'],
  },
  {
    step: '06',
    title: 'Understand your performance',
    desc: 'Track your sales activity and outcomes from the workspace to understand how your execution is progressing.',
    tags: ['Performance', 'Outcomes', 'Conversion Trends'],
  },
  {
    step: '07',
    title: 'Close the feedback loop',
    desc: 'Share feedback with the SDR after the meeting, giving the team a connected view of what happened and what can be improved.',
    tags: ['Feedback', 'SDR 360°', 'Continuous Learning'],
  },
];

const TESTIMONIALS = [
  {
    name: 'Marcus Vance',
    role: 'Senior Enterprise Account Executive',
    company: 'CloudScale',
    logoBadge: 'CS',
    metric: 'Saves 3.5 hrs / week on meeting prep',
    quote:
      'I used to spend 25 minutes before every demo hunting down what the SDR said in Slack, what emails were opened, and what the prospect’s tech stack was. Harvin puts the entire SDR discovery and Account 360 in front of me the second I open the calendar invite.',
  },
  {
    name: 'Elena Rostova',
    role: 'Strategic Account Executive',
    company: 'Nexis AI',
    logoBadge: 'NX',
    metric: '100% connected meeting outcomes',
    quote:
      'The handoff from SDR to AE used to be a black hole. Now, not only do I get instant context on why they booked, but after the call I log the outcome, generate next-step tasks, and send structured feedback to my SDR in two clicks. The loop is truly closed.',
  },
  {
    name: 'David Cho',
    role: 'Mid-Market AE',
    company: 'PulsePoint Systems',
    logoBadge: 'PP',
    metric: '18% faster deal progression',
    quote:
      'Being able to move seamlessly from an SDR-booked meeting straight into our Digital Sales Room without re-entering notes or re-uploading collateral has cut our deal cycle down significantly. Prospects feel like we’ve been listening all along.',
  },
];

const FAQS = [
  {
    q: 'What does Harvin give an AE before a sales meeting?',
    a: 'Harvin brings together the account, prospect, SDR discovery, previous interactions, relevant signals, and talking points so AEs can prepare without reconstructing the conversation yourself.',
  },
  {
    q: 'How does Harvin improve SDR-to-AE handoffs?',
    a: 'When an SDR books a meeting, the relevant account context, discovery and previous interactions remain connected to the meeting so the AE can pick up where the SDR left off.',
  },
  {
    q: 'Can AEs manage meeting follow-ups in Harvin?',
    a: 'Yes. AEs can capture meeting outcomes, create follow-up tasks and move relevant conversations into opportunities while keeping the surrounding context connected.',
  },
  {
    q: 'Can I give feedback to the SDR?',
    a: "Yes. AEs can provide structured feedback in Harvin, which is shared with the SDR and becomes visible in the SDR Head's SDR 360° view.",
  },
  {
    q: 'Does Harvin replace my CRM?',
    a: 'No. Harvin is designed to work alongside your CRM, connecting the operational workflow around SDR-generated meetings, opportunities, and AE collaboration.',
  },
];

export function AeClient() {
  const { openModal } = useModal();
  const [email, setEmail] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeConsoleTab, setActiveConsoleTab] = useState<'calendar' | 'dealroom'>('calendar');

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
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_60%_at_80%_10%,rgba(201,76,30,0.12),transparent_70%)] dark:bg-[radial-gradient(55%_60%_at_80%_10%,rgba(201,76,30,0.2),transparent_70%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(35,34,32,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(35,34,32,0.045)_1px,transparent_1px)] bg-[size:56px_56px]
                     [mask-image:radial-gradient(60%_70%_at_30%_40%,#000,transparent)]
                     dark:bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)]"
        />

        <div className="relative mx-auto grid max-w-[1180px] items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-ember-200 bg-ember-50/80 px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-ember-600 dark:border-ember-500/30 dark:bg-ember-500/10 dark:text-ember-400">
              <Briefcase size={13} className="text-ember-500" aria-hidden="true" />
              For Account Executives
            </span>
            <h1 className="mt-7 font-instrument font-semibold text-[clamp(34px,4.6vw,60px)] leading-[1.04] tracking-[-0.035em] text-slate-950 dark:text-white">
              Walk in knowing what happened.{' '}
              <span className="text-ember-500">Walk out knowing what&apos;s next.</span>
            </h1>
            <p className="mt-6 text-[17px] leading-[1.65] text-slate-600 dark:text-slate-300 sm:text-[18px]">
              Harvin gives Account Executives the context behind every SDR-booked meeting, from prospect and account intelligence to discovery and previous interactions. Then it keeps outcomes, follow-ups, and opportunities connected after the conversation.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => openModal('talk-to-sales')}
                className="group inline-flex items-center gap-2 rounded-btn bg-ember-500 px-6 py-3.5 text-[15px] font-semibold text-white
                           shadow-[0_1px_4px_rgba(201,76,30,0.3)] transition-all duration-150
                           hover:bg-ember-400 hover:shadow-[0_4px_14px_rgba(201,76,30,0.4)]"
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

          <div className="relative">
            <div aria-hidden="true" className="absolute -inset-6 rounded-[40px] bg-ember-500/15 blur-3xl dark:bg-ember-500/20" />
            <div className="relative">
              <Frame w={W} h={H} label="An SDR-booked meeting before and after the conversation" aspect="aspect-[1.6/1]">
                <BeforeAfterMock />
              </Frame>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 2. THE GAP (3 CHALLENGES) ════════════════════════════════════════ */}
      <section className="border-b border-slate-200 px-6 py-20 dark:border-white/[0.08] lg:py-28">
        <div className="mx-auto max-w-[1180px]">
          <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
            <div>
              <Eyebrow>The gap</Eyebrow>
              <h2 className={`mt-5 ${H2}`}>The challenges you face with every deal</h2>
            </div>
            <p className="text-[17px] leading-relaxed text-slate-500 dark:text-slate-400 lg:pb-2">
              Keeping a deal moving means gathering context, managing multiple workflows, and staying on top of every next step.
            </p>
          </div>

          <ol className="mt-12 grid gap-px overflow-hidden rounded-modal border border-slate-200 bg-slate-200 dark:border-white/[0.08] dark:bg-white/[0.08] md:grid-cols-3">
            {CHALLENGES.map((item) => (
              <li key={item.num} className="bg-sand-50 p-8 transition-colors duration-200 hover:bg-white dark:bg-[#0A0908] dark:hover:bg-[#0F0E0C] lg:p-10">
                <span className="font-mono text-[13px] font-medium text-ember-500">{item.num.padStart(2, '0')}</span>
                <h3 className="mt-5 font-instrument font-semibold text-[21px] leading-snug text-slate-950 dark:text-white">{item.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-slate-600 dark:text-slate-400">{item.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ═══ 3. HOW HARVIN HELPS (6 PILLARS + VISUAL) ═════════════════════════ */}
      <section className="border-b border-slate-200 px-6 py-20 dark:border-white/[0.08] lg:py-28">
        <div className="mx-auto max-w-[1180px]">
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow center>How Harvin helps</Eyebrow>
            <h2 className={`mt-5 ${H2}`}>Everything you need to move the deal forward</h2>
            <p className="mt-4 text-[17px] text-slate-600 dark:text-slate-300">
              Harvin brings the context, conversations, and next steps around every deal into one connected workspace.
            </p>
          </div>

          <div className="mt-14 grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
            <ol className="divide-y divide-slate-200 border-y border-slate-200 dark:divide-white/[0.08] dark:border-white/[0.08]">
              {HELPS.map((item) => (
                <li key={item.num} className="flex items-start gap-4 py-4">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ember-500/10 font-mono text-[12px] font-semibold text-ember-600 dark:text-ember-400">
                    {item.num}
                  </span>
                  <div>
                    <h3 className="font-instrument font-semibold text-[16.5px] leading-snug text-slate-950 dark:text-white">{item.title}</h3>
                    <p className="mt-1.5 text-[14px] leading-relaxed text-slate-600 dark:text-slate-400">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="lg:sticky lg:top-28">
              <div className="mb-3 flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 text-[12.5px] font-semibold text-slate-700 dark:text-slate-300">
                  <span className="h-2.5 w-2.5 rounded-full bg-ember-500" />
                  Account 360 &amp; SDR Discovery Handoff
                </span>
                <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-400">
                  Context Synced
                </span>
              </div>
              <Frame w={W} h={H} label="Account 360 and SDR discovery handoff" aspect="aspect-[1.45/1]">
                <HandoffMock />
              </Frame>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 4. THE AE WORKSPACE (7 CAPABILITIES) ═════════════════════════════ */}
      <section id="workspace" className="scroll-mt-24 border-b border-slate-200 px-6 py-20 dark:border-white/[0.08] lg:py-28">
        <div className="mx-auto max-w-[1180px]">
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow center>The AE workspace</Eyebrow>
            <h2 className={`mt-5 ${H2}`}>Everything before, during, and after the meeting</h2>
            <p className="mt-4 text-[17px] text-slate-600 dark:text-slate-300">
              From your calendar to opportunity follow-up, Harvin keeps the work around every conversation in view.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map((cap) => (
              <div key={cap.step} className={`flex flex-col p-7 transition-colors hover:border-ember-300 dark:hover:border-ember-500/40 ${SURFACE}`}>
                <span className="font-mono text-[12px] font-medium text-ember-500">{cap.step}</span>
                <h3 className="mt-3 font-instrument font-semibold text-[19px] leading-snug text-slate-950 dark:text-white">{cap.title}</h3>
                <p className="mt-2.5 flex-1 text-[14.5px] leading-relaxed text-slate-600 dark:text-slate-400">{cap.desc}</p>
                <div className="mt-6 flex flex-wrap gap-1.5 border-t border-slate-200 pt-4 dark:border-white/[0.08]">
                  {cap.tags.map((tag) => (
                    <span key={tag} className="rounded-md bg-sand-200/70 px-2.5 py-1 text-[11px] font-medium text-slate-600 dark:bg-white/[0.06] dark:text-slate-300">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Console spotlight — copy + tabs beside a smaller mock */}
          <div className="mt-14 grid items-center gap-10 rounded-modal border border-white/[0.08] bg-[#0C0B09] p-6 text-white sm:p-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ember-400">Connected AE Workflows</span>
              <h4 className="mt-3 font-instrument text-[clamp(22px,2.4vw,30px)] font-semibold leading-[1.15] tracking-[-0.02em] text-white">
                From Calendar prep to live calling and deal closing
              </h4>
              <div role="tablist" aria-label="AE workflow" className="mt-8 flex flex-col gap-2">
                {(
                  [
                    ['calendar', Calendar, 'Meeting Details & Calendar'],
                    ['dealroom', Phone, 'Integrated Dialer & Notes'],
                  ] as const
                ).map(([id, Icon, label]) => (
                  <button
                    key={id}
                    type="button"
                    role="tab"
                    aria-selected={activeConsoleTab === id}
                    onClick={() => setActiveConsoleTab(id)}
                    className={`flex items-center gap-3 rounded-btn border px-4 py-3 text-left text-[14px] font-semibold transition-colors ${
                      activeConsoleTab === id
                        ? 'border-ember-500/50 bg-ember-500/15 text-white'
                        : 'border-white/[0.08] text-slate-400 hover:border-white/20 hover:text-white'
                    }`}
                  >
                    <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${activeConsoleTab === id ? 'bg-ember-500 text-white' : 'bg-white/[0.06]'}`}>
                      <Icon size={15} aria-hidden="true" />
                    </span>
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <Frame
              key={activeConsoleTab}
              w={W}
              h={H}
              label={activeConsoleTab === 'calendar' ? 'AE calendar with meeting details' : 'Integrated dialer with live notes'}
              aspect="aspect-[1.6/1]"
            >
              {activeConsoleTab === 'calendar' ? <CalendarMock /> : <DialerNotesMock />}
            </Frame>
          </div>
        </div>
      </section>

      {/* ═══ 5. TESTIMONIALS (3 STACKED FEEDBACK CARDS) ═══════════════════════ */}
      <section className="border-b border-slate-200 px-6 py-20 dark:border-white/[0.08] lg:py-28">
        <div className="mx-auto max-w-[1180px]">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow center>Testimonials</Eyebrow>
            <h2 className={`mt-5 ${H2}`}>What other AEs say about Harvin</h2>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <figure key={t.name} className={`flex flex-col p-7 ${SURFACE}`}>
                <span className="w-fit rounded-full border border-ember-200 bg-ember-50 px-3 py-1 text-[11.5px] font-semibold text-ember-600 dark:border-ember-500/30 dark:bg-ember-500/10 dark:text-ember-400">
                  {t.metric}
                </span>
                <blockquote className="mt-5 flex-1 text-[15px] leading-relaxed text-slate-700 dark:text-slate-300">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-slate-200 pt-5 dark:border-white/[0.08]">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-[12px] font-semibold text-white dark:bg-white/[0.1]">
                    {t.logoBadge}
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

      {/* ═══ 6. FAQS (5 QUESTIONS) ═════════════════════════════════════════════ */}
      <section className="border-b border-slate-200 px-6 py-20 dark:border-white/[0.08] lg:py-28">
        <div className="mx-auto grid max-w-[1180px] gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <Eyebrow>FAQs</Eyebrow>
            <h2 className={`mt-5 ${H2}`}>What AEs ask about Harvin</h2>
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
          <h2 className="font-instrument font-semibold text-[clamp(32px,4.4vw,52px)] leading-[1.08] tracking-[-0.03em]">Ready to make every deal easier to manage?</h2>
          <p className="mx-auto mt-5 max-w-2xl text-[17px] leading-relaxed text-white/65 sm:text-[19px]">
            Bring meetings, conversations, opportunities, and next steps together in one connected workspace.
          </p>
          <form onSubmit={handleDemoSubmit} className="mx-auto mt-10 flex max-w-lg flex-col gap-3 sm:flex-row">
            <label htmlFor="ae-email" className="sr-only">
              Work email
            </label>
            <input
              id="ae-email"
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

export default AeClient;
