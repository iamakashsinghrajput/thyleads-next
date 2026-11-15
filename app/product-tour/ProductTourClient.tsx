'use client';

import { useEffect, useState, type ReactNode } from 'react';
import {
  ArrowRight,
  BarChart3,
  Briefcase,
  CalendarCheck,
  Check,
  CheckCircle2,
  Clock,
  Compass,
  Inbox,
  Layers,
  Linkedin,
  Mail,
  MessageSquare,
  Mic,
  Phone,
  PhoneOff,
  Plus,
  Radar,
  RefreshCw,
  Send,
  Sparkles,
  Star,
  Target,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { useModal } from '@/components/ModalContext';
import { Account360Mock, Avatar, CARD, Chip, Frame, LivePill, PriorityMock, useTicker } from '@/components/ProductMocks';

/* ═══════════════════════════════════════════════════════════════════════════════
   STEP MOCKS — coded look-alikes on a 760 × 420 canvas (see ProductMocks)
   ═══════════════════════════════════════════════════════════════════════════════ */
const W = 760;
const H = 420;

/* ─── 03a · Email step with account context ──────────────────────────────── */
const EMAIL_BODY =
  'Hi Priya — congrats on the Series B. Teams scaling from 4 to 10 SDRs usually hit the same wall: reps spend the morning researching instead of reaching out. Worth 20 minutes next week to compare notes?';

function EmailMock() {
  const tick = useTicker(40);
  const shown = EMAIL_BODY.slice(0, Math.min(EMAIL_BODY.length, (tick % 160) * 2));
  return (
    <div className="flex h-full gap-4 p-6">
      <div className={`flex flex-1 flex-col ${CARD}`}>
        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
          <span className="flex items-center gap-2 text-[11px] font-semibold text-slate-900">
            <Mail size={13} className="text-ember-500" /> Series B outreach · Step 2 of 4
          </span>
          <Chip tone="ember">Email</Chip>
        </div>
        <div className="space-y-2 border-b border-slate-100 px-4 py-3 text-[10.5px]">
          <p>
            <span className="inline-block w-14 text-slate-400">To</span>
            <span className="font-medium text-slate-800">Priya Sharma</span> <span className="text-slate-400">· VP Sales, Initech</span>
          </p>
          <p>
            <span className="inline-block w-14 text-slate-400">Subject</span>
            <span className="font-medium text-slate-800">Scaling the SDR team after the raise</span>
          </p>
        </div>
        <p className="flex-1 px-4 py-3 text-[11.5px] leading-[1.65] text-slate-700">
          {shown}
          {shown.length < EMAIL_BODY.length && <span className="ml-px inline-block h-3 w-px translate-y-0.5 bg-ember-500" />}
        </p>
        <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3">
          <div className="flex items-center gap-1.5 text-[9.5px] text-slate-400">
            {[Mail, Linkedin, Phone, Mail].map((Icon, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <span className={`flex h-5 w-5 items-center justify-center rounded-full ${i < 2 ? 'bg-ember-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
                  <Icon size={10} />
                </span>
                {i < 3 && <span className="h-px w-3 bg-slate-200" />}
              </span>
            ))}
          </div>
          <span className="flex items-center gap-1.5 rounded-btn bg-ember-500 px-3 py-1.5 text-[10.5px] font-semibold text-pure">
            <Send size={11} /> Send
          </span>
        </div>
      </div>

      <div className="flex w-[210px] shrink-0 flex-col gap-3">
        <div className={`p-3.5 ${CARD}`}>
          <p className="text-[10px] font-semibold text-slate-400">Why now</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <Chip tone="ember">Raised Series B</Chip>
            <Chip tone="slate">Hiring 6 SDRs</Chip>
          </div>
        </div>
        <div className={`p-3.5 ${CARD}`}>
          <p className="text-[10px] font-semibold text-slate-400">Previous touches</p>
          {[
            ['Email 1 · opened twice', '3 days ago'],
            ['Visited pricing page', 'Yesterday'],
          ].map(([t, s]) => (
            <p key={t} className="mt-2 flex justify-between text-[10px]">
              <span className="font-medium text-slate-700">{t}</span>
              <span className="text-slate-400">{s}</span>
            </p>
          ))}
        </div>
        <div className="flex-1 rounded-card bg-slate-800 p-3.5 text-white">
          <p className="flex items-center gap-1.5 text-[10px] font-semibold text-ember-300">
            <Sparkles size={11} /> Personalised from
          </p>
          <p className="mt-2 text-[10px] leading-relaxed text-white/70">Funding signal · hiring signal · team size · last email engagement</p>
        </div>
      </div>
    </div>
  );
}

/* ─── 03b · Dialer ───────────────────────────────────────────────────────── */
const TALK_TRACK = ['Open with the Series B', 'Ask how SDR ramp is going', 'Share the ramp-time benchmark', 'Propose a 20-min working session'];

function DialerMock() {
  const tick = useTicker(1000);
  const t = tick % 12;
  const secs = 40 + t * 6;
  return (
    <div className="flex h-full gap-4 p-6">
      <div className="flex w-[250px] shrink-0 flex-col rounded-card bg-slate-800 p-5 text-white">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-[10px] font-semibold text-ember-300">
            <span className="h-1.5 w-1.5 rounded-full bg-ember-400" /> Connected
          </span>
          <span className="font-mono text-[11px] text-white/70">
            {String(Math.floor(secs / 60)).padStart(2, '0')}:{String(secs % 60).padStart(2, '0')}
          </span>
        </div>
        <div className="mt-6 flex flex-col items-center text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-ember-500 text-[18px] font-semibold">PS</span>
          <p className="mt-3 text-[14px] font-semibold">Priya Sharma</p>
          <p className="text-[10px] text-white/50">VP Sales · Initech Systems</p>
          <p className="mt-1 font-mono text-[10px] text-white/40">+91 98450 ••• 21</p>
        </div>
        <div className="mt-5 flex h-8 items-end justify-center gap-[3px]">
          {Array.from({ length: 22 }).map((_, i) => (
            <span key={i} className="w-[3px] origin-bottom rounded-full bg-ember-400 motion-safe:animate-wave" style={{ height: `${30 + ((i * 37) % 70)}%`, animationDelay: `${(i % 7) * 0.11}s` }} />
          ))}
        </div>
        <div className="mt-auto flex justify-center gap-3 pt-4">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
            <Mic size={14} />
          </span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-grey">
            <PhoneOff size={14} />
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3">
        <div className={`p-4 ${CARD}`}>
          <p className="text-[11px] font-semibold text-slate-900">Talk track</p>
          <div className="mt-2.5 space-y-1.5">
            {TALK_TRACK.map((line, i) => {
              const active = i === Math.min(3, Math.floor(t / 3));
              const done = i < Math.floor(t / 3);
              return (
                <div key={line} className={`flex items-center gap-2 rounded-btn px-2.5 py-1.5 text-[10.5px] transition-colors ${active ? 'bg-ember-50 font-semibold text-ember-600' : 'text-slate-600'}`}>
                  <span className={`flex h-4 w-4 items-center justify-center rounded-full ${done ? 'bg-slate-700 text-white' : active ? 'bg-ember-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
                    {done ? <Check size={9} strokeWidth={3} /> : <span className="text-[8px]">{i + 1}</span>}
                  </span>
                  {line}
                </div>
              );
            })}
          </div>
        </div>
        <div className={`p-4 ${CARD}`}>
          <p className="text-[11px] font-semibold text-slate-900">Disposition</p>
          <div className="mt-2.5 grid grid-cols-2 gap-1.5">
            {['Connected', 'Voicemail', 'Call back', 'Meeting booked'].map((d) => (
              <span
                key={d}
                className={`rounded-btn border px-2.5 py-1.5 text-center text-[10px] font-medium ${
                  d === 'Meeting booked' && t > 8 ? 'border-ember-500 bg-ember-500 text-white' : 'border-slate-200 text-slate-600'
                }`}
              >
                {d}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-card border border-dashed border-slate-300 px-4 py-3 text-[10.5px] text-slate-500">
          <CalendarCheck size={13} className="text-ember-500" />
          Next step logged to the account automatically
        </div>
      </div>
    </div>
  );
}

/* ─── 04 · Replies, follow-ups and tasks ─────────────────────────────────── */
const TODAY = [
  { icon: MessageSquare, t: 'Reply from Priya Sharma', s: '“Timing is good — Thursday?”', tag: 'Interested', tone: 'ember' },
  { icon: Phone, t: 'Call Rohan Mehta', s: 'Opened email twice · Initech', tag: 'Due 11:00', tone: 'ember' },
  { icon: Mail, t: 'Follow up: Northwind Analytics', s: 'Step 3 · no reply in 4 days', tag: 'Follow-up', tone: 'slate' },
  { icon: Linkedin, t: 'Connect with Kavya Agarwal', s: 'SDR Manager · Initech', tag: 'LinkedIn', tone: 'slate' },
  { icon: CalendarCheck, t: 'Confirm Globex discovery', s: 'Tomorrow · 3:00 PM', tag: 'Meeting', tone: 'ember' },
] as const;

function TasksMock() {
  const tick = useTicker(1300);
  const done = tick % (TODAY.length + 2);
  return (
    <div className="flex h-full gap-4 p-6">
      <div className={`flex flex-1 flex-col ${CARD}`}>
        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
          <p className="text-[13px] font-semibold text-slate-900">Today</p>
          <div className="flex gap-1">
            {[
              ['Replies', 3],
              ['Follow-ups', 5],
              ['Tasks', 4],
            ].map(([l, n], i) => (
              <span key={l} className={`rounded-full px-2.5 py-1 text-[9.5px] font-semibold ${i === 0 ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-500'}`}>
                {l} {n}
              </span>
            ))}
          </div>
        </div>
        <div className="flex-1 divide-y divide-slate-100">
          {TODAY.map(({ icon: Icon, t, s, tag, tone }, i) => {
            const isDone = i < done;
            return (
              <div key={t} className="flex items-center gap-3 px-4 py-2.5">
                <span className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-md border transition-colors ${isDone ? 'border-slate-700 bg-slate-700 text-white' : 'border-slate-300'}`}>
                  {isDone && <Check size={10} strokeWidth={3} />}
                </span>
                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-sand-100 text-slate-500">
                  <Icon size={13} />
                </span>
                <span className={`min-w-0 flex-1 transition-opacity ${isDone ? 'opacity-45' : ''}`}>
                  <span className={`block text-[11px] font-semibold text-slate-900 ${isDone ? 'line-through' : ''}`}>{t}</span>
                  <span className="block truncate text-[9.5px] text-slate-400">{s}</span>
                </span>
                <Chip tone={tone}>{tag}</Chip>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex w-[220px] shrink-0 flex-col gap-3">
        <div className="rounded-card bg-slate-800 p-4 text-white">
          <p className="text-[10px] font-semibold text-white/50">Progress today</p>
          <p className="mt-2 text-[26px] font-semibold leading-none">
            {Math.min(done, TODAY.length)}
            <span className="text-[14px] text-white/40"> / {TODAY.length}</span>
          </p>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-ember-400 transition-all duration-500" style={{ width: `${(Math.min(done, TODAY.length) / TODAY.length) * 100}%` }} />
          </div>
        </div>
        <div className={`flex-1 p-4 ${CARD}`}>
          <p className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-900">
            <Inbox size={12} className="text-ember-500" /> Latest reply
          </p>
          <p className="mt-2 text-[10.5px] leading-relaxed text-slate-600">“Timing is good — can we talk Thursday? Loop in Rohan from RevOps.”</p>
          <span className="mt-3 inline-flex items-center gap-1.5 rounded-btn bg-ember-500 px-2.5 py-1.5 text-[10px] font-semibold text-pure">
            <CalendarCheck size={11} /> Book meeting
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─── 05 · SDR → AE handoff ──────────────────────────────────────────────── */
const BRIEF = [
  { k: 'Why now', v: 'Raised $40M Series B · hiring 6 SDRs' },
  { k: 'Pain', v: 'New reps take ~3 months to ramp' },
  { k: 'Current stack', v: 'HubSpot · Outreach · spreadsheets' },
  { k: 'Decision process', v: 'Priya decides · RevOps evaluates' },
];

function HandoffMock() {
  const tick = useTicker(900);
  const ready = tick % (BRIEF.length + 3);
  return (
    <div className="flex h-full flex-col gap-4 p-6">
      <div className={`flex items-center justify-between px-5 py-4 ${CARD}`}>
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 flex-col items-center justify-center rounded-btn bg-ember-500 text-pure">
            <span className="text-[8px] font-semibold">Thu</span>
            <span className="text-[15px] font-semibold leading-none">14</span>
          </span>
          <div>
            <p className="text-[14px] font-semibold text-slate-900">Discovery · Initech Systems</p>
            <p className="text-[10px] text-slate-400">11:00 – 11:30 AM · Google Meet · 3 attendees</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-slate-500">
          <Avatar initials="PS" className="bg-ember-400" />
          <span>
            Booked by <b className="text-slate-800">Priya (SDR)</b>
          </span>
          <ArrowRight size={12} className="text-ember-500" />
          <Avatar initials="AR" className="bg-slate-700" />
          <span>
            <b className="text-slate-800">Arjun (AE)</b>
          </span>
        </div>
      </div>

      <div className="grid flex-1 grid-cols-[1.25fr_1fr] gap-4">
        <div className={`p-4 ${CARD}`}>
          <div className="flex items-center justify-between">
            <p className="text-[11.5px] font-semibold text-slate-900">SDR discovery brief</p>
            <Chip tone={ready >= BRIEF.length ? 'ember' : 'slate'}>{ready >= BRIEF.length ? 'Ready for AE' : 'Filling in'}</Chip>
          </div>
          <div className="mt-3 space-y-2">
            {BRIEF.map((b, i) => (
              <div key={b.k} className={`flex items-start gap-3 rounded-btn border px-3 py-2 transition-all duration-500 ${i < ready ? 'border-slate-200 bg-sand-50' : 'border-dashed border-slate-200 opacity-40'}`}>
                <span className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${i < ready ? 'bg-slate-700 text-white' : 'bg-slate-200'}`}>
                  {i < ready && <Check size={9} strokeWidth={3} />}
                </span>
                <span>
                  <span className="block text-[9.5px] font-semibold text-slate-400">{b.k}</span>
                  <span className="block text-[11px] font-medium text-slate-800">{i < ready ? b.v : '—'}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className={`p-4 ${CARD}`}>
            <p className="text-[11.5px] font-semibold text-slate-900">Previous interactions</p>
            {[
              [Mail, '4 emails · 2 replies'],
              [Phone, '2 calls · 1 connected'],
              [Linkedin, 'Connected on LinkedIn'],
            ].map(([Icon, t]) => {
              const I = Icon as LucideIcon;
              return (
                <p key={t as string} className="mt-2 flex items-center gap-2 text-[10.5px] text-slate-600">
                  <I size={12} className="text-slate-400" /> {t as string}
                </p>
              );
            })}
          </div>
          <div className="flex-1 rounded-card bg-slate-800 p-4 text-white">
            <p className="text-[11.5px] font-semibold">Attendees</p>
            {[
              ['PS', 'Priya Sharma', 'VP Sales', 'bg-ember-400'],
              ['RM', 'Rohan Mehta', 'Head of RevOps', 'bg-slate-500'],
            ].map(([i, n, r, c]) => (
              <p key={n} className="mt-2.5 flex items-center gap-2 text-[10.5px]">
                <Avatar initials={i} className={c} />
                <span className="font-medium">{n}</span>
                <span className="text-white/45">{r}</span>
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── 06 · Meeting → opportunity ─────────────────────────────────────────── */
const OPP = [
  ['Opportunity', 'Initech — SDR platform'],
  ['Stage', 'Discovery → Evaluation'],
  ['Amount', '$36,000 ARR'],
  ['Close date', 'Aug 30'],
  ['Next step', 'Security review with RevOps'],
];

function OpportunityMock() {
  const tick = useTicker(800);
  const filled = Math.min(OPP.length, Math.max(0, (tick % (OPP.length + 5)) - 1));
  const created = filled === OPP.length;
  return (
    <div className="flex h-full gap-4 p-6">
      <div className={`flex w-[250px] shrink-0 flex-col p-4 ${CARD}`}>
        <p className="text-[11.5px] font-semibold text-slate-900">Meeting outcome</p>
        <p className="text-[10px] text-slate-400">Discovery · Initech · Thu 11:00</p>
        <div className="mt-3 grid grid-cols-3 gap-1">
          {['Held', 'No-show', 'Moved'].map((o) => (
            <span key={o} className={`rounded-btn border py-1.5 text-center text-[10px] font-medium ${o === 'Held' ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 text-slate-500'}`}>
              {o}
            </span>
          ))}
        </div>
        <p className="mt-4 text-[10px] font-semibold text-slate-400">Qualified?</p>
        <div className="mt-1.5 flex gap-1.5">
          <span className="flex-1 rounded-btn border border-ember-500 bg-ember-50 py-1.5 text-center text-[10px] font-semibold text-ember-600">Yes</span>
          <span className="flex-1 rounded-btn border border-slate-200 py-1.5 text-center text-[10px] text-slate-500">Not yet</span>
        </div>
        <p className="mt-4 text-[10px] font-semibold text-slate-400">Notes</p>
        <p className="mt-1.5 flex-1 rounded-btn bg-sand-50 p-2.5 text-[10px] leading-relaxed text-slate-600">
          Strong fit. Wants to cut SDR ramp time before Q3 hiring. RevOps to run security review.
        </p>
      </div>

      <div className="flex flex-1 flex-col">
        <div className="flex flex-1 flex-col rounded-card border border-ember-300 bg-white p-4">
          <div className="flex items-center justify-between">
            <p className="flex items-center gap-1.5 text-[12px] font-semibold text-slate-900">
              <Briefcase size={13} className="text-ember-500" /> New opportunity
            </p>
            <Chip tone="slate">Prefilled from meeting</Chip>
          </div>
          <div className="mt-3 flex-1 space-y-2">
            {OPP.map(([k, v], i) => (
              <div key={k} className="grid grid-cols-[110px_1fr] items-center gap-3 border-b border-slate-100 pb-2">
                <span className="text-[10px] text-slate-400">{k}</span>
                <span className={`rounded-btn px-2.5 py-1.5 text-[11px] font-medium transition-all duration-300 ${i < filled ? 'bg-sand-50 text-slate-800' : 'bg-slate-50 text-transparent'}`}>
                  {v}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div
          className={`mt-3 flex items-center gap-2 rounded-card px-4 py-3 text-[11px] font-semibold transition-all duration-500 ${
            created ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-400'
          }`}
        >
          <CheckCircle2 size={14} />
          {created ? 'Opportunity created · synced to CRM' : 'Waiting for details…'}
        </div>
      </div>
    </div>
  );
}

/* ─── 07 · Feedback loop ─────────────────────────────────────────────────── */
function FeedbackMock() {
  const tick = useTicker(1600);
  const at = tick % 3;
  const node = (i: number) =>
    `transition-all duration-500 ${i === at ? 'border-ember-400' : 'border-slate-200'}`;
  return (
    <div className="relative flex h-full flex-col justify-center p-6">
      <div className="grid grid-cols-3 gap-5">
        <div className={`rounded-card border bg-white p-4 ${node(0)}`}>
          <div className="flex items-center gap-2">
            <Avatar initials="AR" className="bg-slate-700" />
            <span className="text-[11px] font-semibold text-slate-900">AE feedback</span>
          </div>
          <div className="mt-3 flex gap-0.5 text-ember-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={13} fill={i < 4 ? 'currentColor' : 'none'} />
            ))}
          </div>
          <div className="mt-3">
            <Chip tone="ember">Qualified &amp; accepted</Chip>
          </div>
          <p className="mt-3 text-[10px] leading-relaxed text-slate-600">“Great prep. Budget came up late — worth asking earlier.”</p>
        </div>
        <div className={`rounded-card border bg-white p-4 ${node(1)}`}>
          <div className="flex items-center gap-2">
            <Avatar initials="PS" className="bg-ember-400" />
            <span className="text-[11px] font-semibold text-slate-900">SDR · Priya</span>
          </div>
          <p className="mt-3 text-[9.5px] font-semibold text-slate-400">Coaching point</p>
          <p className="mt-1 text-[10.5px] font-medium text-slate-800">Ask about budget in discovery</p>
          <p className="mt-3 text-[9.5px] font-semibold text-slate-400">This month</p>
          <p className="mt-1 text-[10.5px] text-slate-600">9 of 11 meetings accepted</p>
        </div>
        <div className={`rounded-card border bg-slate-800 p-4 text-white ${node(2)}`}>
          <div className="flex items-center gap-2">
            <Avatar initials="SH" className="bg-ember-500" />
            <span className="text-[11px] font-semibold">SDR Head</span>
          </div>
          <p className="mt-3 text-[24px] font-semibold leading-none">82%</p>
          <p className="text-[9.5px] text-white/50">AE acceptance rate</p>
          <div className="mt-3 flex items-end gap-1">
            {[50, 62, 58, 70, 76, 82].map((v, i) => (
              <span key={i} className={`w-full rounded-sm ${i === 5 ? 'bg-ember-400' : 'bg-white/15'}`} style={{ height: v * 0.45 }} />
            ))}
          </div>
        </div>
      </div>
      <div className="mt-5 flex items-center justify-center gap-3 text-[10px] font-medium text-slate-500">
        {['Meeting outcome', 'Coaching', 'Better execution'].map((l, i) => (
          <span key={l} className="flex items-center gap-3">
            <span className={`rounded-full border px-3 py-1 ${i === at ? 'border-ember-300 bg-ember-50 text-ember-600' : 'border-slate-200 bg-white'}`}>{l}</span>
            {i < 2 && <ArrowRight size={12} className="text-ember-500" />}
          </span>
        ))}
        <RefreshCw size={12} className="text-ember-500" />
      </div>
    </div>
  );
}

/* ─── 08 · Command center ────────────────────────────────────────────────── */
const REPS = [
  { i: 'PS', n: 'Priya S.', m: 14, acc: 92, cov: 88, flag: '' },
  { i: 'AM', n: 'Arjun M.', m: 11, acc: 81, cov: 74, flag: '' },
  { i: 'RK', n: 'Riya K.', m: 6, acc: 58, cov: 41, flag: 'Low coverage' },
  { i: 'DV', n: 'Dev V.', m: 9, acc: 64, cov: 69, flag: 'Acceptance dip' },
];

function CommandMock() {
  const tick = useTicker(2000);
  const booked = 40 + (tick % 7);
  return (
    <div className="flex h-full flex-col gap-4 p-6">
      <div className="grid grid-cols-4 gap-3">
        {[
          { l: 'Meetings booked', v: `${booked}`, s: 'Goal 60', p: (booked / 60) * 100 },
          { l: 'AE acceptance', v: '82%', s: '+6 pts vs last month', p: 82 },
          { l: 'Account coverage', v: '74%', s: '1,240 of 1,680 worked', p: 74 },
          { l: 'Meeting quality', v: '4.3', s: 'Avg AE rating', p: 86 },
        ].map((k, i) => (
          <div key={k.l} className={`p-3.5 ${i === 0 ? 'rounded-card bg-slate-800 text-white' : CARD}`}>
            <p className={`text-[9.5px] font-semibold ${i === 0 ? 'text-white/50' : 'text-slate-400'}`}>{k.l}</p>
            <p className={`mt-1.5 text-[22px] font-semibold leading-none ${i === 0 ? '' : 'text-slate-900'}`}>{k.v}</p>
            <div className={`mt-2.5 h-1 overflow-hidden rounded-full ${i === 0 ? 'bg-white/10' : 'bg-slate-100'}`}>
              <div className="h-full rounded-full bg-ember-400 transition-all duration-700" style={{ width: `${k.p}%` }} />
            </div>
            <p className={`mt-1.5 text-[9px] ${i === 0 ? 'text-white/45' : 'text-slate-400'}`}>{k.s}</p>
          </div>
        ))}
      </div>

      <div className={`flex-1 ${CARD}`}>
        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-2.5">
          <p className="text-[11.5px] font-semibold text-slate-900">Team · this month</p>
          <LivePill>Live</LivePill>
        </div>
        <div className="grid grid-cols-[1.3fr_0.8fr_1fr_1fr_1.1fr] gap-3 border-b border-slate-100 bg-sand-50 px-4 py-2 text-[9px] font-semibold text-slate-400">
          <span>SDR</span>
          <span>Meetings</span>
          <span>AE acceptance</span>
          <span>Coverage</span>
          <span>Attention</span>
        </div>
        {REPS.map((r) => (
          <div key={r.n} className={`grid grid-cols-[1.3fr_0.8fr_1fr_1fr_1.1fr] items-center gap-3 border-b border-slate-100 px-4 py-2 last:border-0 ${r.flag ? 'bg-slate-50' : ''}`}>
            <span className="flex items-center gap-2 text-[11px] font-semibold text-slate-900">
              <Avatar initials={r.i} className={r.flag ? 'bg-grey' : 'bg-slate-700'} /> {r.n}
            </span>
            <span className="text-[11px] font-semibold text-slate-700">{r.m}</span>
            {[r.acc, r.cov].map((v, j) => (
              <span key={j} className="flex items-center gap-2">
                <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                  <span className={`block h-full rounded-full ${v < 60 ? 'bg-grey' : 'bg-ember-400'}`} style={{ width: `${v}%` }} />
                </span>
                <span className="w-7 text-[10px] text-slate-500">{v}%</span>
              </span>
            ))}
            <span>{r.flag ? <Chip tone="slate">{r.flag}</Chip> : <Chip tone="ember">On track</Chip>}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════════════════════════ */

type Step = { id: string; short: string; icon: LucideIcon; role: string; title: string; body: ReactNode[] };

const STEPS: Step[] = [
  {
    id: 'step-01',
    short: 'Prioritize',
    icon: Target,
    role: 'SDR',
    title: 'Prioritize accounts using buying signals.',
    body: [
      'Harvin brings account signals, context and activity together so SDRs can see which accounts deserve attention and why.',
      'Funding, hiring, technology changes and other relevant signals help turn a large account pool into a focused workday. SDR Heads can also push accounts into this priority list based on their judgement.',
    ],
  },
  {
    id: 'step-02',
    short: 'Account 360°',
    icon: Radar,
    role: 'SDR',
    title: 'Understand every account with Account 360°',
    body: [
      'Account 360° brings company context, buying signals, relevant people and previous interactions together in one place.',
      'Understand why the account matters now, who to contact and what has already happened before you reach out.',
    ],
  },
  {
    id: 'step-03',
    short: 'Outreach',
    icon: Send,
    role: 'SDR',
    title: 'Run multichannel sales outreach.',
    body: [
      'Reach out without losing the context you just built. Email, LinkedIn and calling stay connected to the account and contact, so you can execute outreach and capture the next step without jumping between disconnected workflows.',
    ],
  },
  {
    id: 'step-04',
    short: 'Replies & tasks',
    icon: Inbox,
    role: 'SDR',
    title: 'Manage replies, follow-ups and tasks in one workflow.',
    body: [
      'Replies, follow-ups, meetings and tasks stay connected to the daily workflow. Harvin keeps the next action visible so important work does not disappear between conversations, reminders and meetings.',
    ],
  },
  {
    id: 'step-05',
    short: 'AE handoff',
    icon: Users,
    role: 'SDR → AE',
    title: 'Seamless SDR-to-AE Handoff',
    body: [
      'The AE does not start from a calendar invite. They start with the work the SDR has already done.',
      'Account context, prospect information, why now, SDR discovery and previous interactions travel directly with the booked meeting.',
    ],
  },
  {
    id: 'step-06',
    short: 'Opportunity',
    icon: Briefcase,
    role: 'AE',
    title: 'Turn the meeting into an opportunity.',
    body: [
      'Capture the meeting outcome, move relevant conversations into an opportunity workflow and keep follow-up actions visible. Harvin helps the AE carry momentum from the meeting into the next stage.',
    ],
  },
  {
    id: 'step-07',
    short: 'Feedback loop',
    icon: RefreshCw,
    role: 'AE → SDR Head',
    title: 'Close the SDR-AE feedback loop',
    body: [
      'What happens after the meeting shouldn’t disappear. AE feedback flows back to the SDR and SDR Head, connecting meeting outcomes to coaching, learning and future execution.',
    ],
  },
  {
    id: 'step-08',
    short: 'Command center',
    icon: BarChart3,
    role: 'SDR Head',
    title: 'Run the SDR team from one command center.',
    body: [
      'SDR Heads get a connected view of team health, goal attainment, meeting quality, AE acceptance, account coverage and performance.',
      'Instead of checking multiple dashboards to find an issue, managers can see where attention is needed and open the relevant SDR, account or meeting context directly.',
    ],
  },
];

const ROLES = [
  {
    role: 'SDR Head',
    q: 'Where does my team need me?',
    body: 'Get full visibility into team performance, account coverage, meeting quality, and where coaching moves the needle.',
    step: 'step-08',
    icon: BarChart3,
  },
  {
    role: 'SDR',
    q: 'What should I do next?',
    body: 'Prioritize high-fit accounts, see why now, and execute phone, email, and LinkedIn outreach with complete context.',
    step: 'step-01',
    icon: Target,
  },
  {
    role: 'AE',
    q: 'What happened, and how do I move it forward?',
    body: 'Start meetings with SDR discovery, signals, and past conversations in view, and convert discussions into opportunities.',
    step: 'step-05',
    icon: Briefcase,
  },
];

const FAQS = [
  {
    q: 'What is Harvin?',
    a: 'Harvin is an SDR management platform that brings account intelligence, outreach, meetings, team management, and AE collaboration into one connected workflow.',
  },
  {
    q: 'Who is Harvin built for?',
    a: 'Harvin is built for SDRs, SDR Heads, and AEs, connecting their workflows while giving sales leadership visibility into SDR operations.',
  },
  {
    q: 'How is Harvin different from a sales engagement platform?',
    a: 'Harvin goes beyond outreach by connecting account intelligence, SDR execution, management, AE handoffs, meeting outcomes, and feedback in one workflow.',
  },
  {
    q: 'Is Harvin a CRM?',
    a: 'No. Harvin works alongside your CRM, acting as the operating layer for SDR prioritization, execution, management, and AE collaboration.',
  },
];

const H2 = 'font-display font-medium text-[clamp(36px,4.2vw,58px)] leading-[1.05] text-slate-950 dark:text-white';

/** Small sentence-case label above a headline: plain stone text, no ember. */
function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="text-[14px] font-medium text-slate-500 dark:text-slate-400">{children}</p>;
}

function OutreachVisual() {
  const [channel, setChannel] = useState<'email' | 'dialer'>('email');
  return (
    <div>
      <div role="tablist" aria-label="Outreach channel" className="mb-4 inline-flex rounded-btn border border-slate-200 bg-sand-50 p-1 dark:border-rule dark:bg-surface">
        {(
          [
            ['email', Mail, 'Email sequence'],
            ['dialer', Phone, 'Cold call dialer'],
          ] as const
        ).map(([id, Icon, label]) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={channel === id}
            onClick={() => setChannel(id)}
            className={`inline-flex items-center gap-2 rounded-btn px-3.5 py-2 text-[13px] font-semibold transition-colors ${
              channel === id ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950' : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            <Icon size={15} aria-hidden="true" /> {label}
          </button>
        ))}
      </div>
      <Frame key={channel} w={W} h={H} label={channel === 'email' ? 'Email sequence step' : 'Cold call dialer'} aspect="aspect-[1.72/1]">
        {channel === 'email' ? <EmailMock /> : <DialerMock />}
      </Frame>
    </div>
  );
}

function StepVisual({ id }: { id: string }) {
  switch (id) {
    case 'step-01':
      return (
        <Frame w={980} h={440} label="Prioritised accounts" aspect="aspect-[1.95/1]">
          <PriorityMock />
        </Frame>
      );
    case 'step-02':
      return (
        <Frame w={980} h={500} label="Account 360" aspect="aspect-[1.8/1]">
          <Account360Mock />
        </Frame>
      );
    case 'step-03':
      return <OutreachVisual />;
    default: {
      const Mock = { 'step-04': TasksMock, 'step-05': HandoffMock, 'step-06': OpportunityMock, 'step-07': FeedbackMock, 'step-08': CommandMock }[id]!;
      return (
        <Frame w={W} h={H} label={STEPS.find((s) => s.id === id)!.short} aspect="aspect-[1.72/1]">
          <Mock />
        </Frame>
      );
    }
  }
}

export default function ProductTourClient() {
  const { openModal } = useModal();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [active, setActive] = useState(STEPS[0].id);

  // Highlight the step currently in the middle of the viewport in the rail.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    STEPS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const activeIdx = STEPS.findIndex((s) => s.id === active);

  return (
    // Always dark, like the other marketing pages: the `dark` class switches every dark: variant below.
    <div className="dark relative w-full bg-slate-950 text-white [color-scheme:dark]">
      {/* ═══ 1. HERO ══════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden border-b border-slate-200 px-6 pb-20 pt-28 dark:border-rule lg:pb-24 lg:pt-36">

        <div className="relative mx-auto max-w-[1180px]">
          <p className="flex items-center gap-2 text-[14px] font-medium text-slate-500 dark:text-slate-400">
            <Compass size={14} aria-hidden="true" />
            Product tour
          </p>
          <h1 className="mt-5 max-w-[900px] font-display font-medium text-[clamp(44px,6vw,80px)] leading-[1.02] text-slate-950 dark:text-white">
            See how the SDR operation <span className="italic text-ember-600 dark:text-ember-400">comes together</span>
          </h1>
          <p className="mt-6 max-w-[640px] text-[18px] leading-[1.5] text-slate-600 dark:text-slate-300 sm:text-[20px]">
            See how work moves seamlessly between SDRs, SDR Heads, and AEs, from first signal to final outcome.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <a
              href="#how-harvin-works"
              className="group inline-flex items-center gap-2 rounded-btn bg-ember-500 px-6 py-3.5 text-[15px] font-semibold text-pure transition-colors duration-150 hover:bg-ember-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
            >
              Take the tour
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </a>
            <button
              type="button"
              onClick={() => openModal('talk-to-sales')}
              className="inline-flex items-center gap-2 text-[15px] font-medium text-slate-800 underline decoration-slate-400 underline-offset-4 transition-colors hover:decoration-slate-900 dark:text-white dark:hover:decoration-white"
            >
              Book a Demo
            </button>
          </div>

          {/* The journey at a glance */}
          <ol className="relative mt-16 grid max-w-[1080px] grid-cols-4 gap-x-1 gap-y-3 lg:grid-cols-8 lg:gap-0">
            <span aria-hidden="true" className="absolute left-[6%] right-[6%] top-[28px] hidden border-t border-dashed border-slate-300 dark:border-rule lg:block" />
            {STEPS.map(({ id, short, icon: Icon }, i) => (
              <li key={id} className="relative">
                <a href={`#${id}`} className="group flex flex-col items-center gap-2.5 rounded-card p-2 text-center transition-colors hover:bg-white/60 dark:hover:bg-white/[0.04]">
                  <span className="relative flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-sand-50 text-slate-500 transition-colors group-hover:border-slate-500 group-hover:text-slate-900 dark:border-rule dark:bg-slate-950 dark:text-slate-400 dark:group-hover:border-slate-400 dark:group-hover:text-white">
                    <Icon size={16} aria-hidden="true" />
                  </span>
                  <span className="font-mono text-[12px] text-slate-500 dark:text-slate-400">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-[13px] font-medium leading-tight text-slate-700 dark:text-slate-300 sm:text-[14px]">{short}</span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ═══ 2. WHO IS IT FOR ═════════════════════════════════════════════════ */}
      <section className="border-b border-slate-200 px-6 py-20 dark:border-rule lg:py-28">
        <div className="mx-auto max-w-[1180px]">
          <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
            <div>
              <Eyebrow>Who is it for</Eyebrow>
              <h2 className={`mt-5 ${H2}`}>Every role starts with a different question.</h2>
            </div>
            <p className="text-[18px] leading-[1.5] text-slate-600 dark:text-slate-300 lg:pb-2">Pick your role to jump to where your part of the tour begins.</p>
          </div>

          <div className="mt-12 grid gap-x-10 gap-y-12 md:grid-cols-3">
            {ROLES.map(({ role, q, body, step, icon: Icon }) => (
              <a
                key={role}
                href={`#${step}`}
                className="group relative flex flex-col border-t border-slate-300 pt-6 transition-colors hover:border-slate-500 dark:border-rule dark:hover:border-slate-400"
              >
                <div className="flex items-center gap-2.5 text-slate-500 dark:text-slate-400">
                  <Icon size={16} aria-hidden="true" />
                  <span className="text-[14px] font-medium">{role}</span>
                </div>
                <h3 className="mt-5 font-display font-medium text-[28px] leading-[1.15] text-slate-950 dark:text-white">&ldquo;{q}&rdquo;</h3>
                <p className="mt-3 flex-1 text-[17px] leading-[1.5] text-slate-600 dark:text-slate-300">{body}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-[15px] font-medium text-slate-900 dark:text-white">
                  Start at Step {step.slice(-2)}
                  <ArrowRight size={15} className="text-slate-500 transition-transform group-hover:translate-x-1 dark:text-slate-400" aria-hidden="true" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 3. HOW HARVIN WORKS (8 STEPS) ════════════════════════════════════ */}
      <section id="how-harvin-works" className="scroll-mt-24 border-b border-slate-200 px-6 py-20 dark:border-rule lg:py-28">
        <div className="mx-auto max-w-[1240px]">
          <div className="max-w-3xl">
            <Eyebrow>How Harvin works</Eyebrow>
            <h2 className={`mt-5 ${H2}`}>One connected workspace brings the answers together.</h2>
            <p className="mt-5 text-[18px] leading-[1.5] text-slate-600 dark:text-slate-300">
              Follow the steps below to understand how every step is connected as an account moves through the sales process inside Harvin.
            </p>
          </div>

          <div className="mt-16 grid gap-10 lg:grid-cols-[210px_1fr] lg:gap-14">
            {/* Sticky step rail */}
            <nav aria-label="Tour steps" className="hidden lg:block">
              <div className="sticky top-28">
                <div className="mb-4 h-px overflow-hidden bg-slate-200 dark:bg-rule">
                  <div className="h-full bg-ember-500 transition-all duration-500" style={{ width: `${((activeIdx + 1) / STEPS.length) * 100}%` }} />
                </div>
                <ol className="space-y-1">
                  {STEPS.map(({ id, short }, i) => (
                    <li key={id}>
                      <a
                        href={`#${id}`}
                        aria-current={active === id ? 'step' : undefined}
                        className={`flex items-center gap-3 rounded-btn px-3 py-2 text-[14px] transition-colors ${
                          active === id
                            ? 'bg-slate-100 font-semibold text-slate-950 dark:bg-white/[0.05] dark:text-white'
                            : i < activeIdx
                              ? 'text-slate-700 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white'
                              : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'
                        }`}
                      >
                        <span className="font-mono text-[11px]">{String(i + 1).padStart(2, '0')}</span>
                        {short}
                        {i < activeIdx && <Check size={13} className="ml-auto text-slate-500 dark:text-slate-400" aria-hidden="true" />}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            </nav>

            <div className="space-y-24 lg:space-y-32">
              {STEPS.map((s, i) => (
                <article key={s.id} id={s.id} className="scroll-mt-28">
                  <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:gap-12">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="font-display text-[44px] font-medium leading-none text-slate-300 dark:text-slate-600">{String(i + 1).padStart(2, '0')}</span>
                        <span className="text-[14px] font-medium text-slate-500 dark:text-slate-400">
                          {s.role}
                        </span>
                      </div>
                      <h3 className="mt-4 font-display font-medium text-[clamp(28px,3vw,40px)] leading-[1.1] text-slate-950 dark:text-white">{s.title}</h3>
                    </div>
                    <div className="space-y-3 lg:pt-14">
                      {s.body.map((p, j) => (
                        <p key={j} className="text-[18px] leading-[1.5] text-slate-600 dark:text-slate-300">
                          {p}
                        </p>
                      ))}
                      {s.id === 'step-07' && (
                        <div className="flex flex-wrap gap-2 pt-2">
                          {[
                            [CheckCircle2, 'Qualified & Accepted', 'border-slate-300 text-ember-600 dark:border-rule dark:text-ember-400'],
                            [Sparkles, 'Coaching Point Logged', 'border-slate-300 text-slate-700 dark:border-rule dark:text-slate-300'],
                            [Layers, 'Stage Advanced in CRM', 'border-slate-300 text-slate-700 dark:border-rule dark:text-slate-300'],
                          ].map(([Icon, label, cls]) => {
                            const I = Icon as LucideIcon;
                            return (
                              <span key={label as string} className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[14px] font-medium ${cls as string}`}>
                                <I size={13} aria-hidden="true" /> {label as string}
                              </span>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mt-8">
                    <StepVisual id={s.id} />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 4. FAQS ══════════════════════════════════════════════════════════ */}
      <section className="border-b border-slate-200 px-6 py-20 dark:border-rule lg:py-28">
        <div className="mx-auto grid max-w-[1180px] gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <Eyebrow>FAQs</Eyebrow>
            <h2 className={`mt-5 ${H2}`}>Get to know Harvin better.</h2>
          </div>
          <div className="divide-y divide-slate-200 border-y border-slate-200 dark:divide-rule dark:border-rule">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={faq.q}>
                  <button type="button" aria-expanded={isOpen} onClick={() => setOpenFaq(isOpen ? null : idx)} className="group flex w-full items-center gap-4 py-5 text-left">
                    <span className="font-mono text-[13px] text-slate-500 dark:text-slate-400">{String(idx + 1).padStart(2, '0')}</span>
                    <span className="flex-1 text-[18px] font-medium text-slate-900 underline-offset-4 group-hover:underline dark:text-white">{faq.q}</span>
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-200 ${
                        isOpen ? 'rotate-45 border-slate-900 text-slate-900 dark:border-white dark:text-white' : 'border-slate-300 text-slate-500 dark:border-rule dark:text-slate-400'
                      }`}
                    >
                      <Plus size={14} strokeWidth={2.5} aria-hidden="true" />
                    </span>
                  </button>
                  {isOpen && <p className="pb-6 pl-9 pr-11 text-[17px] leading-[1.5] text-slate-600 dark:text-slate-300">{faq.a}</p>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ 5. FINAL CTA ═════════════════════════════════════════════════════ */}
      {/* The page's one warm-paper band. */}
      <section className="bg-paper px-6 py-24 text-slate-950 lg:py-32">
        <div className="mx-auto max-w-[1180px]">
          <h2 className="max-w-[840px] font-display font-medium text-[clamp(36px,4.2vw,58px)] leading-[1.05] text-slate-950">
            One operation. <span className="italic text-ember-600">One connected workspace.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-[18px] leading-[1.5] text-stone-dark sm:text-[19px]">
            See what changes when your SDR team, managers, and AEs work from the same connected workflow.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <button
              type="button"
              onClick={() => openModal('talk-to-sales')}
              className="group inline-flex items-center gap-2 rounded-btn bg-ember-500 px-7 py-4 text-[16px] font-semibold text-pure transition-colors duration-150 hover:bg-ember-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-500 focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
            >
              Book a Demo
              <ArrowRight size={17} className="transition-transform group-hover:translate-x-0.5" />
            </button>
            <a
              href="#how-harvin-works"
              className="inline-flex items-center gap-2 text-[16px] font-medium text-slate-950 underline decoration-paper-rule underline-offset-4 transition-colors hover:decoration-slate-950"
            >
              <Clock size={16} aria-hidden="true" /> Replay the tour
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
