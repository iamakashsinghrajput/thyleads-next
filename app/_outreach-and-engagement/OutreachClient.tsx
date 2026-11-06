'use client';

import React, { useState, type ReactNode } from 'react';
import {
  ArrowRight,
  CalendarCheck,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  FileText,
  Inbox,
  Linkedin,
  ListChecks,
  Mail,
  Mic,
  Phone,
  PhoneOff,
  Plus,
  Quote,
  Radio,
  Send,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';
import { useModal } from '@/components/ModalContext';
import { Avatar, CARD, Chip, Frame, LivePill, Mono, useTicker } from '@/components/ProductMocks';

/* ── Testimonials Data ────────────────────────────────────────────────────── */
const TESTIMONIALS = [
  {
    quote:
      'Harvin brought a level of precision to our outreach that complemented our in-house SDR team well. Their multi-channel sequencing and contextual calling ensured we reached the right accounts when intent was highest.',
    name: 'Deepak Lamba',
    role: 'Chief Revenue Officer',
    org: 'CleverTap',
    logo: '/logos/clevertap.svg',
    image: '/testimonials/deepak-lamba.jpg',
  },
  {
    quote:
      'Having email, calling, and previous prospect history unified in one workspace has eliminated context switching for our reps. Our team connects with relevant key decision-makers faster than ever before.',
    name: 'Argha Karmakar',
    role: 'General Manager — Marketing',
    org: 'MYND',
    logo: '/logos/mynd-dark.svg',
    image: '/testimonials/argha-karmakar.jpg',
  },
  {
    quote:
      'The ability to log call outcomes in one click and keep talking points shaped around live buying signals gives our SDRs tremendous confidence on cold calls.',
    name: 'Harsh Sharma',
    role: 'Senior Manager',
    org: 'VWO',
    logo: '/logos/vwo.svg',
    // /testimonials/vwo.png doesn't exist in /public — initials are shown instead.
    image: '',
  },
];

/* ── FAQ Data ─────────────────────────────────────────────────────────────── */
const FAQS = [
  {
    q: "What is Harvin's sales engagement and outreach capability?",
    a: 'Harvin brings email, LinkedIn and calling into one SDR workspace, while keeping outreach connected to account signals, prospect context, conversations, tasks and meetings.',
  },
  {
    q: 'Can I run multichannel sales sequences in Harvin?',
    a: 'Yes. Harvin supports email and LinkedIn campaigns, reusable messaging and campaign management from the same workspace.',
  },
  {
    q: 'Does Harvin have a sales dialer?',
    a: "Yes. Harvin's dialer lets SDRs call prospects while viewing account and prospect context, previous interactions and relevant signals. Reps can capture call outcomes and next steps without leaving the workflow.",
  },
  {
    q: 'How is Harvin different from a sales engagement platform?',
    a: 'Harvin includes sales engagement capabilities but connects them to a broader SDR operating workflow. Outreach sits alongside account intelligence, prioritization, team management, meetings, AE handoffs and outcomes.',
  },
  {
    q: 'Does Harvin replace my CRM?',
    a: 'No. Harvin works alongside your CRM. The CRM remains the system of record, while Harvin connects the intelligence, outreach, tasks, meetings and workflows around the SDR operation.',
  },
];

const CAMPAIGN_FEATURES = [
  { title: 'Email sequencing', desc: 'Build personalized campaigns across email and LinkedIn from surfaced signals without switching tools.' },
  { title: 'Reusable messaging templates', desc: 'Save proven email, LinkedIn, and cold call scripts so reps move faster while keeping messaging consistent.' },
  { title: 'Sales inbox reply management', desc: 'Bring campaign conversations into one inbox so you respond without losing account or prospect context.' },
  { title: 'Outcome & campaign analytics', desc: 'Track campaign activity, reply rates, and booked meetings alongside the SDR workflows behind them.' },
];

const DIALER_FEATURES = [
  { title: 'Power dial through your list', desc: 'Move from one call to the next without stopping to set up each one.' },
  { title: 'Live account intelligence', desc: 'See buying signals, prospect details, and recent activity before you dial.' },
  { title: 'Previous conversations at hand', desc: 'Review past emails, LinkedIn touches, and previous calls in one place.' },
  { title: 'Contextual saved call scripts', desc: 'Start with talking points shaped around account and prospect context.' },
  { title: '1-click connected outcomes', desc: 'Log outcomes, capture next steps, and keep call history attached to the contact.' },
  { title: 'Transcripts & conversational analytics', desc: 'Automated call recording and transcription to review patterns and improve outreach.' },
];

const EMAIL_FEATURES = [
  { title: 'Campaign email', desc: 'Manage replies from outbound campaigns alongside the account and contact they belong to.' },
  { title: 'Personal inbox', desc: 'Bring individual prospect conversations into Harvin so important replies and follow-ups never get buried.' },
  { title: 'Move from reply to action', desc: 'Turn conversations into follow-up tasks or booked meetings without breaking the workflow.' },
  { title: 'Keep an eye on mailbox health', desc: 'Check sending mailbox availability and deliverability before any campaign goes out.' },
];

/* ═══════════════════════════════════════════════════════════════════════════════
   PRODUCT MOCKS — coded look-alikes (see components/ProductMocks)
   ═══════════════════════════════════════════════════════════════════════════════ */

/* ─── Hero: one account, every channel, one timeline ─────────────────────── */
const TOUCHES: { icon: LucideIcon; ch: string; t: string; s: string; tone: 'ember' | 'emerald' | 'amber' | 'slate' }[] = [
  { icon: Mail, ch: 'Email', t: 'Step 1 sent · “Scaling the SDR team after the raise”', s: 'Opened 2× · Mon', tone: 'slate' },
  { icon: Linkedin, ch: 'LinkedIn', t: 'Connection request accepted', s: 'Tue', tone: 'slate' },
  { icon: Phone, ch: 'Call', t: 'Connected · 02:41 · talked ramp time', s: 'Wed', tone: 'amber' },
  { icon: Mail, ch: 'Reply', t: '“Timing is good — can we talk Thursday?”', s: 'Wed', tone: 'emerald' },
  { icon: CalendarCheck, ch: 'Meeting', t: 'Discovery booked · Thu 11:00', s: 'Today', tone: 'ember' },
];

function EngagementMock() {
  const tick = useTicker(1300);
  const shown = Math.min(TOUCHES.length, 2 + (tick % (TOUCHES.length + 2)));
  return (
    <div className="flex h-full gap-4 p-6">
      <div className={`flex flex-1 flex-col ${CARD}`}>
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3.5">
          <div className="flex items-center gap-3">
            <Mono name="Initech" className="h-9 w-9 bg-slate-800 text-[13px]" />
            <div>
              <p className="text-[14px] font-semibold text-slate-900">Initech Systems</p>
              <p className="text-[10px] text-slate-400">Priya Sharma · VP Sales · Series B outreach</p>
            </div>
          </div>
          <div className="flex gap-1.5">
            <Chip tone="ember">Raised Series B</Chip>
            <Chip tone="amber">Hiring 6 SDRs</Chip>
          </div>
        </div>
        <div className="relative flex-1 px-5 py-4 before:absolute before:bottom-6 before:left-[34px] before:top-6 before:w-px before:bg-slate-200">
          {TOUCHES.map(({ icon: Icon, ch, t, s, tone }, i) => {
            const on = i < shown;
            return (
              <div key={t} className={`relative flex items-center gap-3 py-2 transition-all duration-500 ${on ? 'opacity-100' : 'translate-y-1 opacity-0'}`}>
                <span
                  className={`relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border ${
                    tone === 'ember' ? 'border-ember-500 bg-ember-500 text-white' : tone === 'emerald' ? 'border-emerald-200 bg-emerald-50 text-emerald-600' : tone === 'amber' ? 'border-amber-200 bg-amber-50 text-amber-600' : 'border-slate-200 bg-white text-slate-500'
                  }`}
                >
                  <Icon size={13} />
                </span>
                <span className="w-[62px] text-[9.5px] font-semibold uppercase tracking-[0.06em] text-slate-400">{ch}</span>
                <span className="flex-1 text-[11.5px] font-medium text-slate-800">{t}</span>
                <span className="text-[9.5px] text-slate-400">{s}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex w-[240px] shrink-0 flex-col gap-4">
        <div className="rounded-card bg-[#232220] p-4 text-white">
          <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-white/50">Next step</p>
          <p className="mt-2 text-[13px] font-semibold">{shown >= TOUCHES.length ? 'Send AE handoff brief' : 'Follow up on the call'}</p>
          <p className="mt-1 text-[10px] text-white/50">{shown >= TOUCHES.length ? 'Before Thu 11:00' : 'Due today · Email step 2'}</p>
          <span className="mt-3 inline-flex items-center gap-1.5 rounded-btn bg-ember-500 px-2.5 py-1.5 text-[10px] font-semibold">
            <Check size={11} strokeWidth={3} /> Mark done
          </span>
        </div>
        <div className={`flex-1 p-4 ${CARD}`}>
          <p className="text-[11.5px] font-semibold text-slate-900">Touches by channel</p>
          {[
            [Mail, 'Email', 4, 'bg-ember-500'],
            [Linkedin, 'LinkedIn', 2, 'bg-ember-300'],
            [Phone, 'Calls', 3, 'bg-slate-700'],
          ].map(([Icon, l, n, c]) => {
            const I = Icon as LucideIcon;
            return (
              <div key={l as string} className="mt-3 flex items-center gap-2 text-[10.5px]">
                <I size={12} className="text-slate-400" />
                <span className="w-14 text-slate-600">{l as string}</span>
                <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                  <span className={`block h-full rounded-full ${c as string}`} style={{ width: `${(n as number) * 22}%` }} />
                </span>
                <span className="w-3 text-right font-semibold text-slate-700">{n as number}</span>
              </div>
            );
          })}
          <p className="mt-4 border-t border-slate-100 pt-3 text-[10px] text-slate-400">All touches synced to the account</p>
        </div>
      </div>
    </div>
  );
}

/* ─── Campaigns ──────────────────────────────────────────────────────────── */
const SEQUENCE = [
  { day: 'Day 1', icon: Mail, ch: 'Email', name: 'Congrats on the raise', tpl: 'Funding · v3', stat: '61% opened' },
  { day: 'Day 3', icon: Linkedin, ch: 'LinkedIn', name: 'Connect + short note', tpl: 'LI connect · v2', stat: '38% accepted' },
  { day: 'Day 5', icon: Phone, ch: 'Call', name: 'Ramp-time talk track', tpl: 'Call script · v4', stat: '22% connected' },
  { day: 'Day 8', icon: Mail, ch: 'Email', name: 'Benchmark follow-up', tpl: 'Follow-up · v1', stat: '14% replied' },
];

function CampaignMock() {
  const tick = useTicker(1500);
  const active = tick % SEQUENCE.length;
  const meetings = 17 + (tick % 4);
  return (
    <div className="flex h-full flex-col gap-4 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] font-medium text-slate-400">Campaigns / Series B outreach</p>
          <p className="mt-0.5 text-[16px] font-semibold text-slate-900">Funded SaaS · VP Sales</p>
        </div>
        <div className="flex items-center gap-2">
          <Chip tone="slate">Email + LinkedIn + Call</Chip>
          <LivePill>Live</LivePill>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {[
          ['Enrolled', '248'],
          ['Open rate', '61%'],
          ['Reply rate', '14%'],
          ['Meetings booked', String(meetings)],
        ].map(([l, v], i) => (
          <div key={l} className={`px-3.5 py-3 ${i === 3 ? 'rounded-card bg-[#232220] text-white' : CARD}`}>
            <p className={`text-[9.5px] font-semibold uppercase tracking-[0.06em] ${i === 3 ? 'text-white/50' : 'text-slate-400'}`}>{l}</p>
            <p className={`mt-1 text-[20px] font-semibold leading-none ${i === 3 ? '' : 'text-slate-900'}`}>{v}</p>
          </div>
        ))}
      </div>

      <div className="grid flex-1 grid-cols-[1.4fr_1fr] gap-4">
        <div className={`p-4 ${CARD}`}>
          <p className="text-[11.5px] font-semibold text-slate-900">Sequence</p>
          <div className="mt-3 space-y-2">
            {SEQUENCE.map(({ day, icon: Icon, ch, name, tpl, stat }, i) => (
              <div key={day} className={`flex items-center gap-3 rounded-btn border px-3 py-2 transition-colors duration-500 ${i === active ? 'border-ember-300 bg-ember-50' : 'border-slate-100'}`}>
                <span className="w-10 text-[9.5px] font-semibold text-slate-400">{day}</span>
                <span className={`flex h-6 w-6 items-center justify-center rounded-md ${i === active ? 'bg-ember-500 text-white' : 'bg-sand-100 text-slate-500'}`}>
                  <Icon size={12} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[11px] font-semibold text-slate-900">{name}</span>
                  <span className="block text-[9px] text-slate-400">
                    {ch} · {tpl}
                  </span>
                </span>
                <span className="text-[10px] font-semibold text-slate-600">{stat}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={`p-4 ${CARD}`}>
          <div className="flex items-center justify-between">
            <p className="text-[11.5px] font-semibold text-slate-900">Templates</p>
            <span className="text-[9.5px] text-slate-400">Reply rate</span>
          </div>
          {[
            ['Funding · v3', 18],
            ['Hiring signal · v2', 15],
            ['New exec · v1', 12],
            ['Follow-up · v1', 9],
          ].map(([n, r], i) => (
            <div key={n as string} className="mt-3 flex items-center gap-2">
              <FileText size={12} className={i === 0 ? 'text-ember-500' : 'text-slate-400'} />
              <span className="w-[98px] text-[10.5px] font-medium text-slate-700">{n as string}</span>
              <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                <span className={`block h-full rounded-full ${i === 0 ? 'bg-ember-500' : 'bg-ember-300'}`} style={{ width: `${(r as number) * 5}%` }} />
              </span>
              <span className="w-7 text-right text-[10px] font-semibold text-slate-700">{r as number}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Dialer ─────────────────────────────────────────────────────────────── */
const QUEUE = [
  { i: 'PS', n: 'Priya Sharma', c: 'Initech Systems' },
  { i: 'RM', n: 'Rohan Mehta', c: 'Northwind Analytics' },
  { i: 'KA', n: 'Kavya Agarwal', c: 'Globex Cloud' },
  { i: 'VN', n: 'Vikram Nair', c: 'Umbrella Health' },
  { i: 'SD', n: 'Sneha Das', c: 'Stark Retail' },
];

/* Kept deliberately simple: the queue, the live call with its context, and a
   one-click outcome that logs itself near the end of each 16s loop. */
function DialerConsoleMock() {
  const sec = useTicker(1000) % 16;
  const secs = 64 + sec;
  const logged = sec >= 11;
  return (
    <div className="flex h-full gap-5 p-7">
      <div className={`w-[220px] shrink-0 p-4 ${CARD}`}>
        <div className="flex items-center justify-between">
          <p className="text-[12px] font-semibold text-slate-900">Today&apos;s queue</p>
          <span className="text-[10px] text-slate-400">2 / 24</span>
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
                <span className={`block truncate text-[11px] font-semibold ${i === 0 ? 'text-slate-400 line-through' : 'text-slate-900'}`}>{q.n}</span>
                <span className="block truncate text-[9.5px] text-slate-400">{q.c}</span>
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
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ember-500 text-[15px] font-semibold">RM</span>
            <div className="flex-1">
              <p className="text-[15px] font-semibold">Rohan Mehta</p>
              <p className="text-[10.5px] text-white/50">Head of RevOps · Northwind Analytics</p>
            </div>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
              <Mic size={14} />
            </span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-red-500">
              <PhoneOff size={14} />
            </span>
          </div>
          <div className="mt-4 flex h-7 items-end gap-[3px]">
            {Array.from({ length: 48 }).map((_, i) => (
              <span
                key={i}
                className="flex-1 rounded-full bg-ember-400/80 animate-wave motion-reduce:animate-none"
                style={{ height: `${30 + ((i * 53) % 70)}%`, animationDelay: `${(i * 137) % 900}ms` }}
              />
            ))}
          </div>
        </div>

        <div className={`p-4 ${CARD}`}>
          <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-400">Before you speak</p>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            <Chip tone="amber">Hiring 6 SDRs</Chip>
            <Chip tone="slate">Opened email 2×</Chip>
            <Chip tone="slate">Last call: voicemail</Chip>
          </div>
        </div>

        <div className={`flex-1 p-4 ${CARD}`}>
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-400">Outcome</p>
            <p className={`flex items-center gap-1 text-[10px] font-medium text-emerald-600 transition-opacity duration-500 ${logged ? 'opacity-100' : 'opacity-0'}`}>
              <Check size={11} strokeWidth={3} /> Logged to Rohan
            </p>
          </div>
          <div className="mt-2.5 grid grid-cols-4 gap-2">
            {['Connected', 'Voicemail', 'Call back', 'Meeting'].map((o) => (
              <span
                key={o}
                className={`rounded-btn border py-2 text-center text-[10.5px] font-medium transition-colors duration-500 ${
                  o === 'Meeting' && logged ? 'border-ember-500 bg-ember-500 text-white' : 'border-slate-200 text-slate-600'
                }`}
              >
                {o}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Email inbox ────────────────────────────────────────────────────────── */
const THREADS = [
  { i: 'PS', n: 'Priya Sharma', c: 'Initech Systems', sub: 'Re: Scaling the SDR team', prev: 'Timing is good — can we talk Thursday?', box: 'Campaign', label: 'Interested', tone: 'emerald' },
  { i: 'RM', n: 'Rohan Mehta', c: 'Northwind Analytics', sub: 'Re: Ramp-time benchmark', prev: 'Can you send the benchmark deck?', box: 'Personal', label: 'Info request', tone: 'amber' },
  { i: 'KA', n: 'Kavya Agarwal', c: 'Globex Cloud', sub: 'Re: Quick question', prev: 'Looping in our Head of Sales, Arjun.', box: 'Campaign', label: 'Referral', tone: 'ember' },
  { i: 'VN', n: 'Vikram Nair', c: 'Umbrella Health', sub: 'Re: SDR coverage', prev: 'Not this quarter — try us in October.', box: 'Campaign', label: 'Not now', tone: 'slate' },
] as const;

function InboxMock() {
  const tick = useTicker(2600);
  const sel = tick % THREADS.length;
  const th = THREADS[sel];
  return (
    <div className="flex h-full flex-col gap-3 p-6">
      <div className="flex items-center gap-2">
        <p className="mr-auto flex items-center gap-1.5 text-[14px] font-semibold text-slate-900">
          <Inbox size={14} className="text-ember-500" /> Inbox
        </p>
        {[
          ['outreach@initech-harvin.io', 'Healthy'],
          ['priya@harvin.ai', 'Healthy'],
        ].map(([m, s]) => (
          <span key={m} className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[9.5px] text-slate-600">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            {m} · <b className="text-emerald-600">{s}</b>
          </span>
        ))}
        <span className="flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[9.5px] font-semibold text-emerald-700">
          <ShieldCheck size={11} /> 98% deliverability
        </span>
      </div>

      <div className="grid flex-1 grid-cols-[250px_1fr] gap-3">
        <div className={`overflow-hidden ${CARD}`}>
          <div className="flex gap-1 border-b border-slate-100 px-3 py-2">
            {['All', 'Campaign', 'Personal'].map((f, i) => (
              <span key={f} className={`rounded-full px-2 py-0.5 text-[9.5px] font-semibold ${i === 0 ? 'bg-slate-900 text-white' : 'text-slate-500'}`}>
                {f}
              </span>
            ))}
          </div>
          {THREADS.map((x, i) => (
            <div key={x.n} className={`border-b border-slate-100 px-3 py-2.5 transition-colors duration-500 last:border-0 ${i === sel ? 'bg-ember-50' : ''}`}>
              <div className="flex items-center gap-2">
                <Avatar initials={x.i} className={i === sel ? 'bg-ember-500' : 'bg-slate-400'} />
                <span className="flex-1 text-[10.5px] font-semibold text-slate-900">{x.n}</span>
                <span className="text-[8.5px] text-slate-400">{x.box}</span>
              </div>
              <p className="mt-1 truncate pl-7 text-[9.5px] text-slate-500">{x.prev}</p>
            </div>
          ))}
        </div>

        <div className={`flex flex-col ${CARD}`}>
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
            <div>
              <p className="text-[12.5px] font-semibold text-slate-900">{th.sub}</p>
              <p className="text-[9.5px] text-slate-400">
                {th.n} · {th.c}
              </p>
            </div>
            <Chip tone={th.tone}>{th.label}</Chip>
          </div>
          <div className="flex gap-1.5 border-b border-slate-100 bg-sand-50 px-4 py-2 text-[9.5px] text-slate-500">
            <span className="font-semibold text-slate-700">Account history:</span> 4 emails · 2 calls · LinkedIn connected · Series B outreach
          </div>
          <div className="flex-1 space-y-2.5 px-4 py-3">
            <div className="max-w-[85%] rounded-card rounded-tl-sm bg-sand-100 px-3 py-2 text-[10.5px] leading-relaxed text-slate-700">
              {th.prev} Happy to share more on how the team is set up.
            </div>
            <div className="ml-auto max-w-[80%] rounded-card rounded-tr-sm bg-[#232220] px-3 py-2 text-[10.5px] leading-relaxed text-white/85">
              Thanks — sharing a couple of options below.
            </div>
          </div>
          <div className="flex items-center gap-2 border-t border-slate-100 px-4 py-3">
            <span className="flex items-center gap-1.5 rounded-btn bg-ember-500 px-3 py-1.5 text-[10px] font-semibold text-white">
              <CalendarCheck size={11} /> Book meeting
            </span>
            <span className="flex items-center gap-1.5 rounded-btn border border-slate-200 px-3 py-1.5 text-[10px] font-semibold text-slate-700">
              <ListChecks size={11} /> Create follow-up task
            </span>
            <span className="ml-auto flex items-center gap-1 text-[9.5px] text-slate-400">
              <Clock size={11} /> Replied 4 min ago
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════════════════════════ */

const H2 = 'font-instrument font-semibold text-[clamp(30px,3.6vw,46px)] leading-[1.08] tracking-[-0.025em]';

function Eyebrow({ children, center, dark }: { children: ReactNode; center?: boolean; dark?: boolean }) {
  return (
    <p className={`flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] ${dark ? 'text-ember-400' : 'text-ember-500'} ${center ? 'justify-center' : ''}`}>
      <span aria-hidden="true" className={`h-px w-6 ${dark ? 'bg-ember-400' : 'bg-ember-500'}`} />
      {children}
    </p>
  );
}

function FeatureList({ items, dark }: { items: { title: string; desc: string }[]; dark?: boolean }) {
  return (
    <ul className="mt-7 space-y-3.5">
      {items.map((f) => (
        <li key={f.title} className="flex items-start gap-3">
          <span className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-ember-500 text-white">
            <Check size={11} strokeWidth={3} aria-hidden="true" />
          </span>
          <p className={`text-[14.5px] leading-relaxed ${dark ? 'text-slate-400' : 'text-slate-600 dark:text-slate-400'}`}>
            <strong className={`font-semibold ${dark ? 'text-white' : 'text-slate-950 dark:text-white'}`}>{f.title}</strong> — {f.desc}
          </p>
        </li>
      ))}
    </ul>
  );
}

export default function OutreachClient() {
  const { openModal } = useModal();
  const [emailInput, setEmailInput] = useState('');
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  const activeTestimonial = TESTIMONIALS[testimonialIdx];

  const handleCtaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    openModal('talk-to-sales');
  };

  return (
    <div className="text-slate-900 dark:text-white">
      {/* ═══ 1. HERO ═════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden border-b border-slate-200 px-6 pb-20 pt-28 dark:border-white/[0.08] lg:pb-24 lg:pt-36">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_50%_at_50%_0%,rgba(201,76,30,0.12),transparent_70%)] dark:bg-[radial-gradient(55%_50%_at_50%_0%,rgba(201,76,30,0.2),transparent_70%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(35,34,32,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(35,34,32,0.045)_1px,transparent_1px)] bg-[size:56px_56px]
                     [mask-image:radial-gradient(60%_45%_at_50%_20%,#000,transparent)]
                     dark:bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)]"
        />

        <div className="relative mx-auto max-w-[1180px]">
          <div className="mx-auto max-w-[920px] text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-ember-200 bg-ember-50/80 px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-ember-600 dark:border-ember-500/30 dark:bg-ember-500/10 dark:text-ember-400">
              <Radio size={13} className="text-ember-500 motion-safe:animate-pulse" aria-hidden="true" />
              Sales Engagement
            </span>
            <h1 className="mt-7 font-instrument font-semibold text-[clamp(34px,5.2vw,66px)] leading-[1.04] tracking-[-0.035em] text-slate-950 dark:text-white">
              Engage across channels.
              <br />
              <span className="text-ember-500">Keep every interaction connected</span> to the account.
            </h1>
            <p className="mx-auto mt-6 max-w-[700px] text-[18px] leading-[1.65] text-slate-600 dark:text-slate-300 sm:text-[20px]">
              Run multi-channel outreach including email and call from one workspace, with the account context, conversation history and next steps you need at every stage of outreach.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
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
                href="#campaigns"
                className="inline-flex items-center gap-2 rounded-btn border border-slate-300 bg-white px-6 py-3.5 text-[15px] font-semibold text-slate-800 transition-colors
                           hover:border-slate-400 hover:bg-slate-50
                           dark:border-white/15 dark:bg-white/[0.04] dark:text-white dark:hover:bg-white/[0.08]"
              >
                Explore the workflow
              </a>
            </div>
          </div>

          <div className="relative mt-16">
            <div aria-hidden="true" className="absolute -inset-x-10 -bottom-10 top-10 rounded-[40px] bg-ember-500/15 blur-3xl dark:bg-ember-500/20" />
            <div className="relative">
              <Frame w={980} h={420} label="One account's outreach across email, LinkedIn and calls" aspect="aspect-[2.05/1]">
                <EngagementMock />
              </Frame>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 2. CAMPAIGNS ════════════════════════════════════════════════════ */}
      <section id="campaigns" className="scroll-mt-24 border-b border-slate-200 px-6 py-20 dark:border-white/[0.08] lg:py-28">
        <div className="mx-auto grid max-w-[1180px] items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <Eyebrow>Campaigns</Eyebrow>
            <h2 className={`mt-5 ${H2} text-slate-950 dark:text-white`}>From account signals to campaign execution.</h2>
            <p className="mt-5 text-[16.5px] leading-relaxed text-slate-600 dark:text-slate-300">
              Everything from sequencing to replies to campaign performance stays connected to the account context your team already works with.
            </p>
            <FeatureList items={CAMPAIGN_FEATURES} />
          </div>
          <Frame w={760} h={440} label="Campaign sequence and analytics" aspect="aspect-[1.6/1]">
            <CampaignMock />
          </Frame>
        </div>
      </section>

      {/* ═══ 3. DIALER ═══════════════════════════════════════════════════════ */}
      <section id="dialer" className="relative scroll-mt-24 overflow-hidden border-b border-white/[0.06] bg-[#0C0B09] px-6 py-20 text-white lg:py-28">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_60%_at_100%_0%,rgba(201,76,30,0.22),transparent_70%)]" />
        <div className="relative mx-auto grid max-w-[1180px] items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div className="order-2 lg:order-1">
            <Frame w={760} h={430} label="Power dialer with call queue and live call" aspect="aspect-[1.6/1]">
              <DialerConsoleMock />
            </Frame>
          </div>
          <div className="order-1 lg:order-2">
            <Eyebrow dark>Dialer</Eyebrow>
            <h2 className={`mt-5 ${H2} text-white`}>Make every call with the full account story in view.</h2>
            <p className="mt-5 text-[16.5px] leading-relaxed text-slate-400">
              Calling shouldn&apos;t mean starting from a blank screen. Harvin brings the account, prospect context and previous conversations into the dialer before reps speak.
            </p>
            <FeatureList items={DIALER_FEATURES} dark />
          </div>
        </div>
      </section>

      {/* ═══ 4. EMAIL ════════════════════════════════════════════════════════ */}
      <section id="email" className="scroll-mt-24 border-b border-slate-200 px-6 py-20 dark:border-white/[0.08] lg:py-28">
        <div className="mx-auto grid max-w-[1180px] items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <Eyebrow>Email</Eyebrow>
            <h2 className={`mt-5 ${H2} text-slate-950 dark:text-white`}>Manage sales email and replies from one inbox.</h2>
            <p className="mt-5 text-[16.5px] leading-relaxed text-slate-600 dark:text-slate-300">
              Connect your campaign mailbox and personal email to Harvin. Prospect replies and everyday work email appear at one place, each with complete account history.
            </p>
            <FeatureList items={EMAIL_FEATURES} />
          </div>
          <Frame w={760} h={430} label="Unified sales inbox with account history" aspect="aspect-[1.6/1]">
            <InboxMock />
          </Frame>
        </div>
      </section>

      {/* ═══ 5. VALUE FOR EVERY ROLE ════════════════════════════════════════ */}
      <section className="border-b border-slate-200 px-6 py-20 dark:border-white/[0.08] lg:py-28">
        <div className="mx-auto max-w-[1180px]">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow center>Value for every role</Eyebrow>
            <h2 className={`mt-5 ${H2} text-slate-950 dark:text-white`}>Built for how SDR teams actually work</h2>
          </div>

          <div className="mx-auto mt-14 grid max-w-[980px] gap-6 md:grid-cols-2">
            {[
              {
                role: 'SDR',
                icon: Send,
                title: 'Spend less time switching. More time engaging.',
                bullets: ['Keep replies, calls and follow-ups connected.', 'Understand the campaign performance', 'Find the right time to reach a persona'],
              },
              {
                role: 'SDR Head',
                icon: Sparkles,
                title: 'See how outreach is performing across the team.',
                bullets: ['Analyze campaign reach and Lead stats.', 'Understand what template is working well', 'Track outcomes like open rate, reply rate, etc.'],
              },
            ].map(({ role, icon: Icon, title, bullets }, i) => (
              <div
                key={role}
                className="relative flex flex-col overflow-hidden rounded-modal border border-slate-200 bg-sand-50 p-8 shadow-[0_4px_32px_rgba(0,0,0,0.06)] dark:border-white/[0.08] dark:bg-[#0F0E0C] dark:shadow-[0_4px_40px_rgba(0,0,0,0.35)]"
              >
                <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-ember-500 to-ember-300" style={{ opacity: 1 - i * 0.3 }} />
                <div className="flex items-center justify-between">
                  <span className="font-instrument text-[28px] font-semibold tracking-[-0.02em] text-slate-950 dark:text-white">{role}</span>
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-ember-500/10 text-ember-500">
                    <Icon size={18} aria-hidden="true" />
                  </span>
                </div>
                <h3 className="mt-4 font-instrument font-semibold text-[20px] leading-snug text-slate-900 dark:text-white">{title}</h3>
                <ul className="mt-5 space-y-3 border-t border-slate-200 pt-5 dark:border-white/[0.08]">
                  {bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-[15px] text-slate-700 dark:text-slate-300">
                      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-ember-500/10 text-ember-500">
                        <Check size={10} strokeWidth={3} aria-hidden="true" />
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="relative mx-auto mt-8 max-w-[980px] overflow-hidden rounded-modal border border-white/[0.08] bg-[#0C0B09] px-8 py-8 text-center">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_120%_at_50%_0%,rgba(201,76,30,0.3),transparent_70%)]" />
            <p className="relative text-[17px] font-medium leading-[1.65] text-white/80 sm:text-[19px]">
              <strong className="font-semibold text-ember-400">See what changes when execution and context live together:</strong> Harvin connects outreach with the information around
              it, giving every role a clearer view of what happened, what matters and what comes next.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ 6. TESTIMONIALS ═════════════════════════════════════════════════ */}
      <section className="border-b border-slate-200 px-6 py-20 dark:border-white/[0.08] lg:py-28">
        <div className="mx-auto max-w-[1100px]">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow center>Testimonials</Eyebrow>
            <h2 className={`mt-5 ${H2} text-slate-950 dark:text-white`}>What teams say about Harvin</h2>
          </div>

          <figure className="relative mt-14 overflow-hidden rounded-modal border border-slate-200 bg-sand-50 p-8 shadow-[0_4px_32px_rgba(0,0,0,0.06)] dark:border-white/[0.08] dark:bg-[#0F0E0C] dark:shadow-[0_4px_40px_rgba(0,0,0,0.35)] sm:p-12">
            <Quote aria-hidden="true" size={120} className="absolute -right-4 -top-6 rotate-180 text-ember-500/[0.07]" />
            <blockquote key={testimonialIdx} className="relative animate-fade-up sm:pr-16 font-instrument text-[clamp(20px,2.3vw,28px)] font-semibold leading-[1.4] tracking-[-0.01em] text-slate-900 dark:text-white">
              &ldquo;{activeTestimonial.quote}&rdquo;
            </blockquote>

            <figcaption className="relative mt-10 flex flex-col gap-6 border-t border-slate-200 pt-8 dark:border-white/[0.08] sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                {activeTestimonial.image ? (
                  <img src={activeTestimonial.image} alt={activeTestimonial.name} className="h-14 w-14 rounded-full border border-slate-200 object-cover dark:border-white/10" />
                ) : (
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-800 text-[16px] font-semibold text-white">
                    {activeTestimonial.name
                      .split(' ')
                      .map((p) => p[0])
                      .join('')}
                  </span>
                )}
                <div>
                  <p className="text-[17px] font-semibold text-slate-950 dark:text-white">{activeTestimonial.name}</p>
                  <p className="text-[13.5px] text-slate-500 dark:text-slate-400">
                    {activeTestimonial.role} · {activeTestimonial.org}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Previous testimonial"
                  onClick={() => setTestimonialIdx((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1))}
                  className="grid h-10 w-10 place-items-center rounded-full border border-slate-300 text-slate-700 transition-colors hover:border-ember-500 hover:text-ember-500 dark:border-white/15 dark:text-slate-300"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  aria-label="Next testimonial"
                  onClick={() => setTestimonialIdx((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1))}
                  className="grid h-10 w-10 place-items-center rounded-full border border-slate-300 text-slate-700 transition-colors hover:border-ember-500 hover:text-ember-500 dark:border-white/15 dark:text-slate-300"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </figcaption>
          </figure>

          {/* Logo selector */}
          <div className="mt-6 grid grid-cols-3 gap-3">
            {TESTIMONIALS.map((t, i) => (
              <button
                key={t.org}
                type="button"
                onClick={() => setTestimonialIdx(i)}
                aria-label={`Show ${t.org} testimonial`}
                aria-pressed={i === testimonialIdx}
                className={`flex h-16 items-center justify-center rounded-card border transition-all ${
                  i === testimonialIdx
                    ? 'border-ember-300 bg-white shadow-[0_4px_32px_rgba(0,0,0,0.06)] dark:border-ember-500/40 dark:bg-white/[0.06]'
                    : 'border-slate-200 opacity-50 grayscale hover:opacity-100 hover:grayscale-0 dark:border-white/[0.08]'
                }`}
              >
                <img src={t.logo} alt={t.org} className="h-6 w-auto max-w-[70%] object-contain dark:brightness-0 dark:invert" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 7. FAQS ═════════════════════════════════════════════════════════ */}
      <section className="border-b border-slate-200 px-6 py-20 dark:border-white/[0.08] lg:py-28">
        <div className="mx-auto grid max-w-[1180px] gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <Eyebrow>FAQs</Eyebrow>
            <h2 className={`mt-5 ${H2} text-slate-950 dark:text-white`}>A little more clarity</h2>
          </div>
          <div className="divide-y divide-slate-200 border-y border-slate-200 dark:divide-white/[0.08] dark:border-white/[0.08]">
            {FAQS.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div key={faq.q}>
                  <button type="button" aria-expanded={isOpen} onClick={() => setActiveFaq(isOpen ? null : idx)} className="group flex w-full items-center gap-4 py-5 text-left">
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

      {/* ═══ 8. FINAL CTA ════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#0C0B09] px-6 py-24 text-white lg:py-32">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_80%_at_50%_0%,rgba(201,76,30,0.3),transparent_70%)]" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(60%_70%_at_50%_30%,#000,transparent)]"
        />
        <div className="relative mx-auto max-w-[840px] text-center">
          <h2 className="font-instrument font-semibold text-[clamp(32px,4.4vw,52px)] leading-[1.08] tracking-[-0.03em]">Give every outreach the context behind it.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-[17px] leading-relaxed text-white/65 sm:text-[19px]">
            Bring account intelligence, previous interactions and prospect context into every email, message and call.
          </p>
          <form onSubmit={handleCtaSubmit} className="mx-auto mt-10 flex max-w-lg flex-col gap-3 sm:flex-row">
            <label htmlFor="oe-email" className="sr-only">
              Work email
            </label>
            <input
              id="oe-email"
              type="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
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
