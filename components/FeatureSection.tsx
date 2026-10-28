'use client';

import { useState, useEffect, useRef, type ReactNode } from 'react';
import {
    Radar,
    Users,
    Mail,
    Phone,
    Calendar,
    Database,
    Check,
    CalendarCheck,
    FileText,
    UserCheck,
    Mic,
    Grid3x3,
    Pause,
    PhoneOff,
    Sparkles,
    Plus,
    Video,
    ChevronLeft,
    ChevronRight,
    type LucideIcon,
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════════════════════
   TAB DATA
   Every tab renders a coded look-alike of the product (the HowItWorks approach)
   instead of a screenshot — see LOOK-ALIKE MOCKS below.
   ═══════════════════════════════════════════════════════════════════════════════ */
type Tab = { id: string; icon: LucideIcon; label: string; description: string; Mock: () => ReactNode };

const TABS: Tab[] = [
    {
        id: 'signals',
        icon: Radar,
        label: 'Your CRM',
        description:
            'Bring accounts, contacts, opportunities and relevant history into Harvin, while your CRM stays the system of record.',
        Mock: CrmMock,
    },
    {
        id: 'accounts',
        icon: Users,
        label: 'Your Digital Sales Room',
        description:
            'AEs continue the conversation with buyers after an SDR-booked meeting, without losing the opportunity context.',
        Mock: SalesRoomMock,
    },
    {
        id: 'sequences',
        icon: Mail,
        label: 'Your Email and Mailboxes',
        description:
            'Run email outreach and manage conversations, with campaign activity connected to prospect and account context.',
        Mock: EmailMock,
    },
    {
        id: 'reporting',
        icon: Calendar,
        label: 'Your Google Calendar',
        description:
            'SDRs and AEs manage their meeting workflow from Harvin while keeping their existing calendar setup.',
        Mock: CalendarMock,
    },
    {
        id: 'calling',
        icon: Phone,
        label: 'Your Calling',
        description:
            'Set up calling numbers for your SDRs and keep calls, dispositions and next steps connected to the account. Need numbers? Get them through Harvin.',
        Mock: CallingMock,
    },
];

/* Hash aliases (nav/footer links) → tab id. Unlisted hashes that match a tab id work too. */
const HASH_ALIASES: Record<string, string> = {
    integrations: 'signals',
    campaign: 'sequences',
    email: 'sequences',
    'email-inbox': 'sequences',
    dialer: 'calling',
    'ae-room': 'accounts',
    calendar: 'reporting',
};

const ANCHORS = ['signals', 'integrations', 'campaign', 'sequences', 'email-inbox', 'dialer', 'calling'];

/* ═══════════════════════════════════════════════════════════════════════════════
   PANEL — one screenshot frame shared by every tab.
   The screenshot is inset from the top/left so a skeleton UI shows behind it
   (and stands in for the image while it loads); it bleeds off the right/bottom.
   ═══════════════════════════════════════════════════════════════════════════════ */
function Skeleton() {
    return (
        <div aria-hidden="true" className="absolute inset-0">
            {/* colour wash — strong ember glow top-left, softer warm glow bottom-right */}
            <div className="absolute inset-0 bg-[radial-gradient(70%_90%_at_0%_0%,rgba(201,76,30,0.45)_0%,rgba(201,76,30,0.12)_45%,transparent_75%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(60%_80%_at_100%_100%,rgba(244,142,86,0.18)_0%,transparent_70%)]" />

            <div className="absolute inset-0 motion-safe:animate-pulse">
                {/* top bar — sits in the top margin */}
                <div className="absolute inset-x-0 top-0 flex h-8 items-center gap-3 pl-3 pr-6 sm:h-10 sm:pl-4">
                    <div className="flex gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-ember-300/60" />
                        <span className="h-2 w-2 rounded-full bg-white/[0.18]" />
                        <span className="h-2 w-2 rounded-full bg-white/[0.12]" />
                    </div>
                    <span className="ml-6 h-2 w-16 rounded-full bg-gradient-to-r from-ember-400/60 to-white/[0.08] sm:ml-10" />
                    <span className="h-2 w-24 rounded-full bg-gradient-to-r from-white/[0.14] to-white/[0.04]" />
                    <span className="h-2 w-12 rounded-full bg-white/[0.06]" />
                    <span className="ml-auto h-2 w-20 rounded-full bg-gradient-to-r from-white/[0.04] to-ember-300/30" />
                </div>

                {/* left rail — sits in the left margin, fading from ember down to white */}
                <div className="absolute bottom-0 left-0 top-8 flex w-8 flex-col items-center gap-3 pt-3 sm:top-10 sm:w-10 sm:pt-4">
                    <span className="h-3.5 w-3.5 rounded-[4px] bg-gradient-to-br from-ember-300 to-ember-500" />
                    {Array.from({ length: 6 }).map((_, i) => (
                        <span key={i} className="h-3.5 w-3.5 rounded-[4px] bg-white/[0.08]" style={{ opacity: 1 - i * 0.12 }} />
                    ))}
                </div>

                {/* body rows — visible under the screenshot while it loads */}
                <div className="absolute bottom-0 left-8 right-0 top-8 space-y-3 p-6 sm:left-10 sm:top-10">
                    <span className="block h-3 w-1/3 rounded-full bg-gradient-to-r from-ember-400/50 to-white/[0.06]" />
                    <span className="block h-2 w-1/2 rounded-full bg-white/[0.05]" />
                    <span className="block h-24 w-full rounded-card bg-gradient-to-br from-ember-500/20 via-white/[0.04] to-white/[0.02]" />
                    <span className="block h-2 w-2/3 rounded-full bg-white/[0.05]" />
                    <span className="block h-2 w-1/2 rounded-full bg-white/[0.05]" />
                </div>
            </div>
        </div>
    );
}

function Panel({ tab }: { tab: Tab }) {
    return (
        <div className="relative aspect-[2/1] overflow-hidden">
            <Skeleton />

            <div className="absolute bottom-0 left-8 right-0 top-8 overflow-hidden rounded-tl-card border-l border-t border-white/[0.1] sm:left-10 sm:top-10">
                {/* focus in */}
                <div className="relative h-full w-full animate-focus-in motion-reduce:animate-none">
                    <FitCanvas label={tab.label}>
                        <tab.Mock />
                    </FitCanvas>
                </div>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   LOOK-ALIKE MOCKS
   Coded product UI for tabs without a screenshot, in the spirit of HowItWorks:
   fictional accounts, small type, and a loop that keeps it feeling live.
   Each is laid out on a fixed MOCK_W × MOCK_H canvas and scaled to the frame's
   width, so it reads the same on a phone as on desktop (the bottom crops first).
   ═══════════════════════════════════════════════════════════════════════════════ */
const MOCK_W = 760;
const MOCK_H = 360;

function FitCanvas({ label, children }: { label: string; children: ReactNode }) {
    const ref = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const ro = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / MOCK_W));
        ro.observe(el);
        return () => ro.disconnect();
    }, []);

    return (
        <div ref={ref} role="img" aria-label={`${label} preview`} className="absolute inset-0 overflow-hidden bg-sand-50">
            <div style={{ width: MOCK_W, height: MOCK_H, transform: `scale(${scale})` }} className="origin-top-left">
                {children}
            </div>
        </div>
    );
}

/* Counts up every `ms` while mounted — drives the mocks' loops. Frozen for reduced motion. */
function useTicker(ms: number) {
    const [tick, setTick] = useState(0);
    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const t = setInterval(() => setTick((n) => n + 1), ms);
        return () => clearInterval(t);
    }, [ms]);
    return tick;
}

function Monogram({ name, className = '' }: { name: string; className?: string }) {
    return (
        <span className={`flex shrink-0 items-center justify-center rounded-md font-bold text-white ${className}`}>
            {name[0]}
        </span>
    );
}

/* ─── Your CRM — two-way sync, CRM stays the system of record ─────────────── */
const CRM_RECORDS = [
    { type: 'Account', name: 'Initech Systems', detail: 'Owner · Priya S. · Tier 1', toHarvin: true },
    { type: 'Contact', name: 'Bill Lumbergh', detail: 'VP Sales · Initech Systems', toHarvin: true },
    { type: 'Activity', name: 'Call logged · Connected', detail: 'Northwind Analytics · Arjun M.', toHarvin: false },
    { type: 'Opportunity', name: 'Globex Cloud — Expansion', detail: 'Discovery · $48,000', toHarvin: true },
    { type: 'Meeting', name: 'Discovery call booked', detail: 'Hooli · Thu 11:00 AM', toHarvin: false },
    { type: 'History', name: '14 past emails', detail: 'Wonka Industries · last 90 days', toHarvin: true },
    { type: 'Account', name: 'Umbrella Health', detail: 'Owner · Sam K. · Tier 2', toHarvin: true },
    { type: 'Activity', name: 'Disposition · Meeting booked', detail: 'Initech Systems · Umang', toHarvin: false },
];

const RECORD_TONE: Record<string, string> = {
    Account: 'border-ember-200 bg-ember-50 text-ember-600',
    Contact: 'border-slate-200 bg-slate-100 text-slate-600',
    Opportunity: 'border-amber-200 bg-amber-50 text-amber-700',
    History: 'border-slate-200 bg-slate-100 text-slate-600',
    Activity: 'border-emerald-200 bg-emerald-50 text-emerald-700',
    Meeting: 'border-emerald-200 bg-emerald-50 text-emerald-700',
};

function SyncTrack({ label, reverse }: { label: string; reverse?: boolean }) {
    const tone = reverse ? 'text-emerald-500' : 'text-ember-500';
    return (
        <div>
            <p className={`mb-1.5 text-[9.5px] font-medium text-slate-400 ${reverse ? 'text-right' : ''}`}>{label}</p>
            {/* static arrow: line + head, pointing into Harvin (→) or back to the CRM (←) */}
            <div className={`flex items-center ${tone} ${reverse ? 'flex-row-reverse' : ''}`}>
                <span className="h-[1.5px] flex-1 rounded-full bg-current" />
                {reverse ? (
                    <ChevronLeft size={14} strokeWidth={2.5} className="-mr-[7px] shrink-0" />
                ) : (
                    <ChevronRight size={14} strokeWidth={2.5} className="-ml-[7px] shrink-0" />
                )}
            </div>
        </div>
    );
}

function CrmMock() {
    const tick = useTicker(1800);
    const rows = [0, 1, 2, 3].map((j) => CRM_RECORDS[(tick + j) % CRM_RECORDS.length]);

    return (
        <div className="flex h-full flex-col p-5 font-sans text-slate-900">
            {/* header */}
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-[10px] font-medium text-slate-400">Settings / Integrations</p>
                    <p className="text-[15px] font-bold tracking-[-0.01em]">CRM sync</p>
                </div>
                <span className="flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 motion-safe:animate-pulse" />
                    Live · two-way sync
                </span>
            </div>

            {/* CRM ⇄ Harvin */}
            <div className="mt-4 grid grid-cols-[200px_1fr_200px] items-center gap-5">
                <div className="rounded-card border border-slate-200 bg-white p-3.5 shadow-[0_4px_32px_rgba(0,0,0,0.06)]">
                    <div className="flex items-center gap-2.5">
                        <span className="flex h-8 w-8 items-center justify-center rounded-btn bg-slate-800 text-white">
                            <Database size={15} strokeWidth={2} />
                        </span>
                        <div>
                            <p className="text-[13px] font-bold leading-tight">Your CRM</p>
                            <p className="text-[9.5px] font-semibold uppercase tracking-[0.08em] text-ember-500">System of record</p>
                        </div>
                    </div>
                    <div className="mt-3 grid grid-cols-3 gap-1 border-t border-slate-100 pt-2.5 text-center">
                        {[
                            ['2,418', 'Accounts'],
                            ['9,730', 'Contacts'],
                            ['312', 'Opps'],
                        ].map(([n, l]) => (
                            <div key={l}>
                                <p className="font-mono text-[11.5px] font-semibold">{n}</p>
                                <p className="text-[8.5px] text-slate-400">{l}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-5">
                    <SyncTrack label="Accounts · contacts · opportunities · history" />
                    <SyncTrack label="Calls · meetings · dispositions · outcomes" reverse />
                </div>

                <div className="rounded-card border border-ember-500/30 bg-white p-3.5 shadow-[0_0_0_4px_rgba(201,76,30,0.06),0_4px_32px_rgba(0,0,0,0.06)]">
                    <img src="/harvin-logo.png" alt="" className="h-[18px] w-auto" />
                    <p className="mt-1 text-[9.5px] text-slate-400">SDR workspace</p>
                    <div className="mt-3 flex items-center gap-1.5 border-t border-slate-100 pt-2.5 text-[10px] text-slate-500">
                        <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-500 text-white">
                            <Check size={9} strokeWidth={3} />
                        </span>
                        Up to date · synced just now
                    </div>
                </div>
            </div>

            {/* sync log */}
            <div className="mt-4 flex-1 rounded-card border border-slate-200 bg-white px-4 pb-1 pt-3 shadow-[0_4px_32px_rgba(0,0,0,0.06)]">
                <div className="mb-1.5 flex items-center justify-between">
                    <p className="text-[12px] font-bold">Recently synced</p>
                    <p className="font-mono text-[10px] text-slate-400">{(1284 + tick).toLocaleString('en-US')} records today</p>
                </div>
                {rows.map((r, i) => (
                    <div
                        key={`${tick}-${i}`}
                        className={`flex items-center gap-3 border-t border-slate-100 py-[7px] ${i === 0 ? 'opacity-0 animate-fade-up motion-reduce:opacity-100 motion-reduce:animate-none' : ''}`}
                    >
                        <span className={`w-[74px] shrink-0 rounded border px-1.5 py-0.5 text-center text-[9px] font-semibold ${RECORD_TONE[r.type]}`}>
                            {r.type}
                        </span>
                        <div className="min-w-0 flex-1">
                            <p className="truncate text-[11.5px] font-semibold leading-tight">{r.name}</p>
                            <p className="truncate text-[9.5px] text-slate-400">{r.detail}</p>
                        </div>
                        <span className="w-[70px] shrink-0 text-[9.5px] font-medium text-slate-500">
                            {r.toHarvin ? 'CRM → Harvin' : 'Harvin → CRM'}
                        </span>
                        <span className="w-[48px] shrink-0 text-right text-[9.5px] text-slate-400">{i === 0 ? 'just now' : `${i * 3}m ago`}</span>
                        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
                            <Check size={10} strokeWidth={3} />
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ─── Your Digital Sales Room — the AE picks up where the SDR left off ────── */
const HANDOFF = [
    { Icon: CalendarCheck, title: 'Meeting booked', sub: 'Thu 11:00 AM · booked by Umang (SDR)' },
    { Icon: Radar, title: '3 buying signals', sub: 'Series B · hiring in GTM · new VP Sales' },
    { Icon: FileText, title: 'Discovery notes', sub: 'Reps spend ~40% of their week researching' },
    { Icon: Mail, title: 'Email thread', sub: '6 messages · last reply 2 days ago' },
    { Icon: UserCheck, title: 'Opportunity owner', sub: 'Arjun Mehta (AE)' },
];

const PLAN = ['Discovery', 'Demo', 'Security', 'Pricing', 'Contract'];

const BUYER_ACTIVITY = [
    { who: 'Priya', what: 'viewed', item: 'Proposal.pdf', tone: 'bg-emerald-500' },
    { who: 'Rahul', what: 'commented on', item: 'Pricing options', tone: 'bg-amber-500' },
    { who: 'Priya', what: 'shared the room with', item: 'their CFO', tone: 'bg-emerald-500' },
    { who: 'Rahul', what: 'downloaded', item: 'Security pack', tone: 'bg-amber-500' },
    { who: 'Priya', what: 'replayed', item: 'Demo recording', tone: 'bg-emerald-500' },
];

const PEOPLE = [
    { n: 'Umang', c: 'bg-ember-500' },
    { n: 'Arjun', c: 'bg-slate-700' },
    { n: 'Priya', c: 'bg-emerald-500' },
    { n: 'Rahul', c: 'bg-amber-500' },
];

function SalesRoomMock() {
    const tick = useTicker(700);
    // Handoff items check off one by one, hold, then replay (16 ticks ≈ 11s).
    const handed = Math.min(tick % 16, HANDOFF.length);
    const done = 2 + (Math.floor(tick / 4) % 3); // plan steps: 2 → 3 → 4
    const feed = Math.floor(tick / 3);
    const activity = [0, 1, 2].map((j) => BUYER_ACTIVITY[(feed + j) % BUYER_ACTIVITY.length]);

    return (
        <div className="flex h-full flex-col p-5 font-sans text-slate-900">
            {/* room header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Monogram name="Initech" className="h-9 w-9 bg-slate-800 text-[15px]" />
                    <div>
                        <p className="text-[14px] font-bold leading-tight tracking-[-0.01em]">Initech Systems × Harvin</p>
                        <p className="text-[10px] text-slate-400">Digital Sales Room · Opportunity $48,000 · Evaluation</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 motion-safe:animate-pulse" />
                        Priya is viewing
                    </span>
                    <div className="flex -space-x-1.5">
                        {PEOPLE.map((p) => (
                            <span
                                key={p.n}
                                className={`flex h-6 w-6 items-center justify-center rounded-full text-[9px] font-bold text-white ring-2 ring-sand-50 ${p.c}`}
                            >
                                {p.n[0]}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-4 grid flex-1 grid-cols-[300px_1fr] gap-3.5">
                {/* SDR → AE handoff */}
                <div className="rounded-card border border-slate-200 bg-white p-3.5 shadow-[0_4px_32px_rgba(0,0,0,0.06)]">
                    <div className="mb-2 flex items-center justify-between">
                        <p className="text-[12px] font-bold">Handed off from SDR</p>
                        <span className="rounded-full border border-ember-200 bg-ember-50 px-2 py-0.5 text-[9px] font-semibold text-ember-600">
                            Umang → Arjun
                        </span>
                    </div>
                    {HANDOFF.map(({ Icon, title, sub }, i) => {
                        const isIn = i < handed;
                        return (
                            <div key={title} className="flex items-center gap-2.5 border-t border-slate-100 py-[7px]">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-btn bg-slate-100 text-slate-500">
                                    <Icon size={12} strokeWidth={2} />
                                </span>
                                <div className="min-w-0 flex-1">
                                    <p className="text-[11px] font-semibold leading-tight">{title}</p>
                                    <p className="truncate text-[9.5px] text-slate-400">{sub}</p>
                                </div>
                                <span
                                    className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                                        isIn ? 'scale-100 bg-emerald-500 text-white' : 'scale-75 bg-slate-100 text-transparent'
                                    }`}
                                >
                                    <Check size={10} strokeWidth={3} />
                                </span>
                            </div>
                        );
                    })}
                </div>

                <div className="flex min-w-0 flex-col gap-3.5">
                    {/* mutual action plan */}
                    <div className="rounded-card border border-slate-200 bg-white p-3.5 shadow-[0_4px_32px_rgba(0,0,0,0.06)]">
                        <div className="flex items-center justify-between">
                            <p className="text-[12px] font-bold">Mutual action plan</p>
                            <p className="font-mono text-[10px] text-slate-400">{done}/{PLAN.length} steps</p>
                        </div>
                        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
                            <div
                                className="h-full rounded-full bg-gradient-to-r from-ember-300 to-ember-500 transition-[width] duration-700 ease-out"
                                style={{ width: `${(done / PLAN.length) * 100}%` }}
                            />
                        </div>
                        <div className="mt-2.5 flex gap-1.5">
                            {PLAN.map((step, i) => (
                                <span
                                    key={step}
                                    className={`flex flex-1 items-center justify-center gap-1 rounded-btn border px-1 py-1 text-[9px] font-semibold transition-colors duration-500 ${
                                        i < done
                                            ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                                            : i === done
                                              ? 'border-ember-200 bg-ember-50 text-ember-600'
                                              : 'border-slate-200 bg-white text-slate-400'
                                    }`}
                                >
                                    {i < done && <Check size={9} strokeWidth={3} />}
                                    {step}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* buyer activity */}
                    <div className="flex-1 rounded-card border border-slate-200 bg-white px-3.5 pt-3 shadow-[0_4px_32px_rgba(0,0,0,0.06)]">
                        <div className="mb-1 flex items-center justify-between">
                            <p className="text-[12px] font-bold">Buyer activity</p>
                            <span className="flex items-center gap-1.5 text-[9.5px] text-slate-400">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 motion-safe:animate-pulse" />
                                Live
                            </span>
                        </div>
                        {activity.map((a, i) => (
                            <div
                                key={`${feed}-${i}`}
                                className={`flex items-center gap-2.5 border-t border-slate-100 py-[7px] ${i === 0 ? 'opacity-0 animate-fade-up motion-reduce:opacity-100 motion-reduce:animate-none' : ''}`}
                            >
                                <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[9px] font-bold text-white ${a.tone}`}>
                                    {a.who[0]}
                                </span>
                                <p className="min-w-0 flex-1 truncate text-[11px] text-slate-500">
                                    <span className="font-semibold text-slate-900">{a.who}</span> {a.what}{' '}
                                    <span className="font-semibold text-slate-900">{a.item}</span>
                                </p>
                                <span className="shrink-0 text-[9.5px] text-slate-400">{i === 0 ? 'just now' : `${i * 4}m ago`}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

/* Small shared bits for the mocks below. */
const CARD = 'rounded-card border border-slate-200 bg-white shadow-[0_4px_32px_rgba(0,0,0,0.06)]';

const PILL_TONE = {
    emerald: 'border-emerald-200 bg-emerald-50 text-emerald-700',
    ember: 'border-ember-200 bg-ember-50 text-ember-600',
    amber: 'border-amber-200 bg-amber-50 text-amber-700',
    slate: 'border-slate-200 bg-slate-100 text-slate-600',
} as const;

function LivePill({ children }: { children: ReactNode }) {
    return (
        <span className="flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 motion-safe:animate-pulse" />
            {children}
        </span>
    );
}

function Tick({ size = 16 }: { size?: number }) {
    return (
        <span style={{ width: size, height: size }} className="flex shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
            <Check size={size * 0.62} strokeWidth={3} />
        </span>
    );
}

/* Types `text` out a few characters at a time; remount (via key) to replay. */
function TypedText({ text }: { text: string }) {
    const tick = useTicker(30);
    const shown = text.slice(0, tick * 2);
    return (
        <>
            {shown}
            {shown.length < text.length && <span className="ml-px inline-block h-3 w-px translate-y-0.5 bg-ember-500 motion-safe:animate-pulse" />}
        </>
    );
}

/* ─── Your Email and Mailboxes — replies triaged, with campaign + account context ── */
const THREADS = [
    {
        name: 'Ritika Malhotra',
        role: 'Head of Sales',
        company: 'Finlytics',
        avatar: 'bg-amber-500',
        subject: 'Re: more qualified meetings',
        body: 'Thanks, these are helpful. Wednesday afternoon works for me — please send over an invite.',
        label: 'Interested',
        tone: 'emerald',
        campaign: 'Q4 · Series B fintech',
        step: 'Step 2 of 4',
        context: 'Series B · hiring 6 SDRs · owner Umang',
        reply: 'Great — sending an invite for Wednesday at 3 PM. I’ll bring a short walkthrough of how teams like yours cut research time.',
    },
    {
        name: 'Rohan Desai',
        role: 'VP Revenue',
        company: 'Shipnest',
        avatar: 'bg-slate-700',
        subject: 'Re: Shipnest x Harvin',
        body: "Let's talk. Can we do 30 minutes sometime next week?",
        label: 'Meeting request',
        tone: 'ember',
        campaign: 'Logistics · new VP Sales',
        step: 'Step 3 of 4',
        context: 'New VP Sales · expanding to EU · owner Priya',
        reply: 'Absolutely — does Tuesday at 11 AM or Thursday at 2 PM work better for you?',
    },
    {
        name: 'Jessica Nguyen',
        role: 'Sales Ops Lead',
        company: 'Datavine',
        avatar: 'bg-emerald-500',
        subject: 'Re: Datavine x Harvin',
        body: 'Could you share pricing, and how the CRM sync works with our setup?',
        label: 'Info request',
        tone: 'amber',
        campaign: 'RevOps · CRM migration',
        step: 'Step 2 of 3',
        context: 'Migrating CRM · 40-person sales team · owner Sam',
        reply: 'Of course — attaching our pricing overview and a two-minute walkthrough of the CRM sync.',
    },
    {
        name: 'Arjun Mehra',
        role: 'Sales Manager',
        company: 'CloudNest',
        avatar: 'bg-ember-500',
        subject: 'Re: CloudNest x Harvin',
        body: 'Forwarding this to our CRO, who owns the SDR team. They’ll be in touch.',
        label: 'Referral',
        tone: 'slate',
        campaign: 'SaaS · Series C',
        step: 'Step 1 of 4',
        context: 'Series C · CRO joined last month · owner Umang',
        reply: 'Thanks Arjun — I’ll send your CRO a short note and keep you copied.',
    },
] as const;

function EmailMock() {
    const tick = useTicker(5200);
    const active = tick % THREADS.length;
    const t = THREADS[active];

    return (
        <div className="flex h-full flex-col p-5 font-sans text-slate-900">
            {/* header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <p className="text-[15px] font-bold tracking-[-0.01em]">Inbox</p>
                    <div className="flex rounded-btn border border-slate-200 bg-white p-0.5 text-[10px] font-semibold">
                        <span className="rounded-[6px] bg-ember-50 px-2 py-1 text-ember-600">Campaign inbox · {12 + tick}</span>
                        <span className="px-2 py-1 text-slate-400">Work email</span>
                    </div>
                </div>
                <LivePill>4 mailboxes connected</LivePill>
            </div>

            <div className="mt-3.5 grid flex-1 grid-cols-[262px_1fr] gap-3.5">
                {/* conversation list */}
                <div className={`${CARD} overflow-hidden`}>
                    {THREADS.map((th, i) => (
                        <div
                            key={th.name}
                            className={`flex gap-2.5 border-b border-l-2 border-b-slate-100 px-3 py-2.5 transition-colors duration-300 ${
                                i === active ? 'border-l-ember-500 bg-ember-50/60' : 'border-l-transparent'
                            }`}
                        >
                            <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white ${th.avatar}`}>
                                {th.name.split(' ').map((w) => w[0]).join('')}
                            </span>
                            <div className="min-w-0 flex-1">
                                <div className="flex items-center justify-between">
                                    <p className="truncate text-[11px] font-semibold">{th.name}</p>
                                    <span className="text-[9px] text-slate-400">{i === active ? 'now' : `${i + 1}h`}</span>
                                </div>
                                <p className="truncate text-[9.5px] text-slate-500">{th.subject}</p>
                                <span className={`mt-1 inline-block rounded border px-1.5 py-px text-[8.5px] font-semibold ${PILL_TONE[th.tone]}`}>
                                    {th.label}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* open thread */}
                <div key={active} className={`${CARD} flex flex-col p-3.5 opacity-0 animate-fade-up motion-reduce:opacity-100 motion-reduce:animate-none`}>
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-[12.5px] font-bold leading-tight">{t.name}</p>
                            <p className="text-[9.5px] text-slate-400">
                                {t.role} · {t.company}
                            </p>
                        </div>
                        <span className={`rounded border px-1.5 py-0.5 text-[9px] font-semibold ${PILL_TONE[t.tone]}`}>{t.label}</span>
                    </div>

                    {/* campaign + account context */}
                    <div className="mt-2 flex flex-wrap gap-1.5 text-[9px] font-medium text-slate-500">
                        <span className="rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5">Campaign · {t.campaign}</span>
                        <span className="rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5">{t.step}</span>
                        <span className="flex items-center gap-1 rounded border border-ember-200 bg-ember-50 px-1.5 py-0.5 text-ember-600">
                            <Radar size={9} strokeWidth={2.5} />
                            {t.context}
                        </span>
                    </div>

                    <p className="mt-3 text-[11.5px] leading-relaxed text-slate-600">{t.body}</p>

                    {/* suggested reply */}
                    <div className="mt-auto rounded-btn border border-slate-200 bg-slate-50 p-2.5">
                        <p className="flex items-center gap-1 text-[9px] font-semibold uppercase tracking-[0.08em] text-ember-500">
                            <Sparkles size={10} strokeWidth={2.5} />
                            Suggested reply
                        </p>
                        <p className="mt-1 min-h-[32px] text-[10.5px] leading-relaxed text-slate-700">
                            <TypedText text={t.reply} />
                        </p>
                        <div className="mt-1.5 flex justify-end">
                            <span className="rounded-[6px] bg-ember-500 px-3 py-1 text-[10px] font-semibold text-white">Send</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ─── Your Google Calendar — meetings run from Harvin, calendar stays yours ── */
const DAYS = [
    ['Mon', 26],
    ['Tue', 27],
    ['Wed', 28],
    ['Thu', 29],
    ['Fri', 30],
] as const;
const HOURS = ['9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM'];
const SLOT_H = 32;

const MEETINGS = [
    { day: 0, start: 0.5, len: 1, title: 'Flipkart', sub: 'Discovery', sdr: true },
    { day: 1, start: 2, len: 1, title: 'Northwind', sub: 'Demo', sdr: false },
    { day: 2, start: 0, len: 1.5, title: 'Globex Cloud', sub: 'Security review', sdr: false },
    { day: 3, start: 3, len: 1, title: 'Umbrella', sub: 'Follow-up', sdr: true },
    { day: 4, start: 1, len: 1, title: 'Wonka', sub: 'Pricing', sdr: false },
];

/* A new SDR-booked meeting lands in one of these slots each loop. */
const NEW_BOOKINGS = [
    { day: 1, start: 4, len: 1, title: 'Hooli', sub: 'Booked by Umang' },
    { day: 3, start: 1, len: 1, title: 'Initech', sub: 'Booked by Priya' },
    { day: 4, start: 3.5, len: 1, title: 'Soylent', sub: 'Booked by Sam' },
];

const OUTCOMES = ['Held', 'No-show', 'Rescheduled'];

function CalendarMock() {
    const tick = useTicker(2600);
    const booking = NEW_BOOKINGS[tick % NEW_BOOKINGS.length];
    const outcomePhase = tick % 3; // 0 waiting · 1 "Held" picked · 2 logged

    return (
        <div className="flex h-full flex-col p-5 font-sans text-slate-900">
            {/* header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <p className="text-[15px] font-bold tracking-[-0.01em]">Meetings</p>
                    <span className="text-[10.5px] font-medium text-slate-500">Oct 26 – 30</span>
                </div>
                <LivePill>Google Calendar · synced</LivePill>
            </div>

            <div className="mt-3.5 grid flex-1 grid-cols-[1fr_222px] gap-3.5">
                {/* week grid */}
                <div className={`${CARD} relative overflow-hidden`}>
                    <div className="grid grid-cols-[44px_repeat(5,1fr)] border-b border-slate-100 text-center">
                        <span />
                        {DAYS.map(([d, n], i) => (
                            <div key={d} className="py-1.5">
                                <p className="text-[8.5px] font-semibold uppercase tracking-[0.08em] text-slate-400">{d}</p>
                                <p className={`text-[12px] font-bold ${i === 2 ? 'text-ember-500' : ''}`}>{n}</p>
                            </div>
                        ))}
                    </div>

                    <div className="relative grid grid-cols-[44px_repeat(5,1fr)]">
                        {/* hour rows */}
                        <div>
                            {HOURS.map((h) => (
                                <p key={h} style={{ height: SLOT_H }} className="pr-1.5 pt-0.5 text-right text-[8.5px] text-slate-400">
                                    {h}
                                </p>
                            ))}
                        </div>
                        {DAYS.map(([d]) => (
                            <div key={d} className="border-l border-slate-100">
                                {HOURS.map((h) => (
                                    <div key={h} style={{ height: SLOT_H }} className="border-t border-slate-100" />
                                ))}
                            </div>
                        ))}

                        {/* events — placed in the 5 day columns after the 44px gutter */}
                        {[...MEETINGS, { ...booking, isNew: true }].map((m) => {
                            const isNew = 'isNew' in m;
                            return (
                                <div
                                    key={isNew ? `new-${tick}` : m.title}
                                    style={{
                                        left: `calc(44px + (100% - 44px) * ${m.day} / 5 + 3px)`,
                                        width: 'calc((100% - 44px) / 5 - 6px)',
                                        top: m.start * SLOT_H + 2,
                                        height: m.len * SLOT_H - 4,
                                    }}
                                    className={[
                                        'absolute overflow-hidden rounded-[5px] border-l-2 px-1.5 py-1',
                                        isNew
                                            ? 'border-ember-500 bg-ember-500 text-white shadow-[0_4px_14px_rgba(201,76,30,0.4)] opacity-0 animate-fade-up motion-reduce:opacity-100 motion-reduce:animate-none'
                                            : 'sdr' in m && m.sdr
                                              ? 'border-ember-500 bg-ember-50 text-slate-900'
                                              : 'border-slate-400 bg-slate-100 text-slate-900',
                                    ].join(' ')}
                                >
                                    <p className="truncate text-[9.5px] font-bold leading-tight">{m.title}</p>
                                    <p className={`truncate text-[8.5px] ${isNew ? 'text-white/80' : 'text-slate-500'}`}>{m.sub}</p>
                                </div>
                            );
                        })}

                        {/* now line on Wednesday */}
                        <div
                            aria-hidden="true"
                            style={{ left: 'calc(44px + (100% - 44px) * 2 / 5)', width: 'calc((100% - 44px) / 5)', top: 2.3 * SLOT_H }}
                            className="absolute h-px bg-ember-500"
                        >
                            <span className="absolute -left-1 -top-[3px] h-[7px] w-[7px] rounded-full bg-ember-500" />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    {/* up next */}
                    <div className="rounded-card bg-[#0D0D0C] p-3 text-white shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
                        <div className="flex items-center justify-between">
                            <p className="text-[8.5px] font-semibold uppercase tracking-[0.12em] text-white/50">Up next</p>
                            <span className="rounded-full bg-white/10 px-1.5 py-0.5 text-[8.5px] text-white/70">in 18 min</span>
                        </div>
                        <p className="mt-1.5 text-[12.5px] font-bold">Hooli · Discovery</p>
                        <p className="text-[9.5px] text-white/50">Wed · 11:30 AM – 12:00 PM</p>
                        <div className="mt-2 space-y-1">
                            {['Account brief', '3 buying signals', 'Last email thread'].map((x) => (
                                <p key={x} className="flex items-center gap-1.5 text-[9.5px] text-white/75">
                                    <Tick size={11} />
                                    {x}
                                </p>
                            ))}
                        </div>
                        <div className="mt-2.5 grid grid-cols-2 gap-1.5 text-[10px] font-semibold">
                            <span className="flex items-center justify-center gap-1 rounded-[6px] bg-ember-500 py-1.5">
                                <Video size={11} strokeWidth={2.5} />
                                Join
                            </span>
                            <span className="flex items-center justify-center rounded-[6px] bg-white/10 py-1.5">Prepare</span>
                        </div>
                    </div>

                    {/* outcome logging */}
                    <div className={`${CARD} flex-1 p-3`}>
                        <p className="text-[11px] font-bold">Awaiting outcome</p>
                        <p className="text-[9.5px] text-slate-400">Northwind · Demo · yesterday</p>
                        <div className="mt-2 flex gap-1">
                            {OUTCOMES.map((o, i) => (
                                <span
                                    key={o}
                                    className={`flex-1 rounded-[6px] border py-1 text-center text-[9px] font-semibold transition-colors duration-300 ${
                                        outcomePhase > 0 && i === 0 ? PILL_TONE.emerald : 'border-slate-200 text-slate-500'
                                    }`}
                                >
                                    {o}
                                </span>
                            ))}
                        </div>
                        <p
                            className={`mt-2 flex items-center gap-1.5 text-[9.5px] font-medium text-emerald-700 transition-opacity duration-300 ${
                                outcomePhase === 2 ? 'opacity-100' : 'opacity-0'
                            }`}
                        >
                            <Tick size={12} />
                            Logged · next step created
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ─── Your Calling — your numbers, with calls and outcomes tied to the account ── */
const SCRIPT = [
    'Hi Bill, this is Umang from Harvin — did I catch you at a bad time?',
    'Teams like Initech tell us reps spend too long researching before every call.',
    'We put signals, emails and call history in one place, so every call starts warm.',
    'Would 20 minutes on Thursday be worth it to see how that works for you?',
];

const DISPOSITIONS = ['Connected', 'Voicemail', 'No answer', 'Meeting booked'];

const QUEUE = [
    { name: 'Rohan Desai', company: 'Shipnest', c: 'bg-slate-700' },
    { name: 'Jessica Nguyen', company: 'Datavine', c: 'bg-emerald-500' },
];

const fmt = (secs: number) => `${String(Math.floor(secs / 60)).padStart(2, '0')}:${String(secs % 60).padStart(2, '0')}`;

function CallingMock() {
    const tick = useTicker(1000);
    const t = tick % 14; // 0–1 dialing · 2–10 connected · 11–13 wrapped up
    const phase = t < 2 ? 'dialing' : t < 11 ? 'live' : 'done';
    const line = phase === 'dialing' ? -1 : phase === 'live' ? Math.min(SCRIPT.length - 1, Math.floor((t - 2) / 2)) : SCRIPT.length;

    return (
        <div className="flex h-full flex-col p-5 font-sans text-slate-900">
            {/* header — the team's numbers */}
            <div className="flex items-center justify-between">
                <p className="text-[15px] font-bold tracking-[-0.01em]">Dialer</p>
                <div className="flex items-center gap-1.5 text-[9.5px] font-semibold">
                    <span className="rounded-full border border-slate-200 bg-white px-2 py-1 font-mono text-slate-600">+1 415 555 0142 · Primary</span>
                    <span className="rounded-full border border-slate-200 bg-white px-2 py-1 font-mono text-slate-600">+44 20 7946 0958</span>
                    <span className="flex items-center gap-1 rounded-full border border-ember-200 bg-ember-50 px-2 py-1 text-ember-600">
                        <Plus size={10} strokeWidth={3} />
                        Get a number
                    </span>
                </div>
            </div>

            <div className="mt-3.5 grid flex-1 grid-cols-[262px_1fr] gap-3.5">
                {/* live call */}
                <div className="flex flex-col gap-3">
                    <div className="rounded-card bg-[#0D0D0C] p-3.5 text-white shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
                        <div className="flex items-center gap-2.5">
                            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ember-500 text-[12px] font-bold">BL</span>
                            <div className="min-w-0">
                                <p className="text-[12.5px] font-bold leading-tight">Bill Lumbergh</p>
                                <p className="truncate text-[9.5px] text-white/50">VP Sales · Initech Systems</p>
                            </div>
                        </div>

                        <p
                            className={`mt-2.5 flex items-center gap-1.5 text-[10px] font-semibold ${
                                phase === 'dialing' ? 'text-amber-400' : phase === 'live' ? 'text-emerald-400' : 'text-white/50'
                            }`}
                        >
                            <span className={`h-1.5 w-1.5 rounded-full bg-current ${phase !== 'done' ? 'motion-safe:animate-pulse' : ''}`} />
                            {phase === 'dialing' ? 'Dialing…' : phase === 'live' ? `Connected · ${fmt((t - 2) * 17 + 4)}` : 'Call ended · 02:41'}
                        </p>

                        {/* audio levels */}
                        <div aria-hidden="true" className="mt-2 flex h-6 items-center gap-[3px]">
                            {Array.from({ length: 30 }, (_, i) => (
                                <span
                                    key={i}
                                    style={{ animationDelay: `${(i * 137) % 900}ms`, height: `${30 + ((i * 53) % 70)}%` }}
                                    className={`w-[3px] rounded-full ${
                                        phase === 'live' ? 'bg-emerald-400/80 animate-wave motion-reduce:animate-none' : 'scale-y-[0.2] bg-white/20'
                                    }`}
                                />
                            ))}
                        </div>

                        <div className="mt-2.5 flex items-center justify-between">
                            <div className="flex gap-1.5">
                                {[Mic, Grid3x3, Pause].map((Icon, i) => (
                                    <span key={i} className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white/70">
                                        <Icon size={12} strokeWidth={2} />
                                    </span>
                                ))}
                            </div>
                            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-red-500">
                                <PhoneOff size={12} strokeWidth={2} />
                            </span>
                        </div>
                        <p className="mt-2 text-[8.5px] text-white/40">Calling from +1 415 555 0142</p>
                    </div>

                    {/* queue */}
                    <div className={`${CARD} flex-1 px-3 py-2`}>
                        <p className="text-[9px] font-semibold uppercase tracking-[0.08em] text-slate-400">Up next · 2 in queue</p>
                        {QUEUE.map((q) => (
                            <div key={q.name} className="mt-1.5 flex items-center gap-2">
                                <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[8px] font-bold text-white ${q.c}`}>
                                    {q.name[0]}
                                </span>
                                <p className="flex-1 truncate text-[10px] font-semibold">
                                    {q.name} <span className="font-normal text-slate-400">· {q.company}</span>
                                </p>
                                <Phone size={10} className="text-slate-400" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* script + wrap-up */}
                <div className="flex min-w-0 flex-col gap-3">
                    <div className={`${CARD} p-3`}>
                        <p className="flex items-center gap-1 text-[9px] font-semibold uppercase tracking-[0.08em] text-ember-500">
                            <Sparkles size={10} strokeWidth={2.5} />
                            Suggested script · Initech
                        </p>
                        <div className="mt-1.5 space-y-1">
                            {SCRIPT.map((l, i) => (
                                <p
                                    key={l}
                                    className={`rounded-[5px] border-l-2 px-2 py-1 text-[10px] leading-snug transition-colors duration-300 ${
                                        i === line
                                            ? 'border-ember-500 bg-ember-50 text-slate-900'
                                            : i < line
                                              ? 'border-transparent text-slate-400'
                                              : 'border-transparent text-slate-600'
                                    }`}
                                >
                                    {l}
                                </p>
                            ))}
                        </div>
                    </div>

                    <div className={`${CARD} flex-1 p-3`}>
                        <p className="text-[11px] font-bold">Disposition</p>
                        <div className="mt-1.5 flex gap-1">
                            {DISPOSITIONS.map((d) => (
                                <span
                                    key={d}
                                    className={`flex-1 rounded-[6px] border py-1 text-center text-[9px] font-semibold transition-colors duration-300 ${
                                        phase === 'done' && d === 'Meeting booked' ? PILL_TONE.emerald : 'border-slate-200 text-slate-500'
                                    }`}
                                >
                                    {d}
                                </span>
                            ))}
                        </div>
                        <div className={`mt-2 space-y-1 transition-opacity duration-300 ${phase === 'done' ? 'opacity-100' : 'opacity-0'}`}>
                            <p className="flex items-center gap-1.5 text-[9.5px] font-medium text-slate-600">
                                <CalendarCheck size={11} className="text-ember-500" />
                                Next step · send invite for Thu 11:00 AM
                            </p>
                            <p className="flex items-center gap-1.5 text-[9.5px] font-medium text-emerald-700">
                                <Tick size={11} />
                                Call, recording and outcome logged to Initech
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   MAIN SECTION COMPONENT
   ═══════════════════════════════════════════════════════════════════════════════ */
export default function FeatureSection() {
    const [activeId, setActiveId] = useState(TABS[0].id);
    const active = TABS.find((t) => t.id === activeId) ?? TABS[0];

    // Auto-advance: each tab plays for the length of `animate-progress` (7s), then the
    // progress bar's animationend moves on. It pauses on hover and while the section is
    // off screen, and stops for good once the visitor picks a tab themselves.
    const sectionRef = useRef<HTMLElement>(null);
    const [autoplay, setAutoplay] = useState(true);
    const [hovering, setHovering] = useState(false);
    const [inView, setInView] = useState(false);
    // Remount the panel the first time it scrolls into view so its intro plays on screen.
    const [seen, setSeen] = useState(false);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;
        const io = new IntersectionObserver(
            ([entry]) => {
                setInView(entry.isIntersecting);
                if (entry.isIntersecting) setSeen(true);
            },
            { threshold: 0.35 },
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);

    const selectTab = (id: string) => {
        setAutoplay(false);
        setActiveId(id);
    };

    const advance = () => {
        const i = TABS.findIndex((t) => t.id === activeId);
        setActiveId(TABS[(i + 1) % TABS.length].id);
    };

    useEffect(() => {
        const handleHash = () => {
            const hash = window.location.hash.replace('#', '').toLowerCase();
            const id = HASH_ALIASES[hash] ?? hash;
            if (TABS.some((t) => t.id === id)) selectTab(id);
        };

        handleHash();
        window.addEventListener('hashchange', handleHash);
        return () => window.removeEventListener('hashchange', handleHash);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <section
            ref={sectionRef}
            id="platform-capabilities"
            className="relative scroll-mt-20 border-t border-white/[0.06] bg-[#0C0B09] py-20 sm:py-28"
        >
            {/* Nav anchor targets */}
            {ANCHORS.map((id) => (
                <div key={id} id={id} className="pointer-events-none relative -top-24" />
            ))}

            <div className="mx-auto max-w-[1200px] px-6">
                {/* Section header */}
                <div className="mb-12 max-w-2xl lg:mb-8">
                    <span className="mb-3 inline-block text-[12px] font-semibold uppercase tracking-[0.12em] text-ember-500">
                        Integrations
                    </span>
                    <h2 className="font-instrument font-semibold text-[clamp(30px,3.5vw,46px)] leading-[1.08] tracking-[-0.025em] text-white">
                        Set up Harvin around the way your team works.
                    </h2>
                    <p className="mt-2 text-[16px] leading-relaxed text-slate-400">
                        Harvin connects with your CRM as the source of data, and fits around the channels your team
                        already uses — email, calling, calendar and Digital Sales Rooms for AEs.
                    </p>
                </div>

                <div
                    onMouseEnter={() => setHovering(true)}
                    onMouseLeave={() => setHovering(false)}
                    className="flex flex-col items-start gap-8 lg:flex-row lg:gap-14"
                >
                    {/* Tab list — horizontal pills on mobile, vertical rail on desktop */}
                    <div
                        role="tablist"
                        aria-label="Integrations"
                        className="flex w-full shrink-0 gap-2 overflow-x-auto pb-1
                                   lg:w-[300px] lg:flex-col lg:gap-0 lg:overflow-visible lg:border-l lg:border-white/[0.08] lg:pb-0"
                    >
                        {TABS.map((tab) => {
                            const TabIcon = tab.icon;
                            const isActive = tab.id === activeId;
                            return (
                                <button
                                    key={tab.id}
                                    type="button"
                                    role="tab"
                                    aria-selected={isActive}
                                    onClick={() => selectTab(tab.id)}
                                    className={[
                                        'group relative shrink-0 text-left transition-colors duration-200',
                                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-500',
                                        // mobile pill
                                        'rounded-full border px-4 py-2',
                                        // desktop rail item
                                        'lg:-ml-px lg:rounded-none lg:border-0 lg:border-l-2 lg:px-5 lg:py-4',
                                        isActive
                                            ? 'border-ember-500 bg-ember-500 text-white lg:bg-transparent'
                                            : 'border-white/[0.12] text-slate-400 hover:text-white lg:border-transparent',
                                    ].join(' ')}
                                >
                                    <span className="flex items-center gap-2.5 whitespace-nowrap text-[14px] font-semibold lg:text-[15px]">
                                        <TabIcon
                                            size={16}
                                            strokeWidth={2}
                                            aria-hidden="true"
                                            className={[
                                                'hidden lg:block',
                                                isActive ? 'text-ember-500' : 'text-slate-500',
                                            ].join(' ')}
                                        />
                                        {tab.label}
                                    </span>
                                    {isActive && (
                                        <span className="mt-2 hidden pl-[26px] text-[13.5px] leading-relaxed text-slate-400 lg:block">
                                            {tab.description}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* Screenshot */}
                    <div className="w-full min-w-0 flex-1">
                        <div
                            key={`${activeId}-${seen}`}
                            role="tabpanel"
                            aria-label={active.label}
                            className="relative overflow-hidden rounded-modal border border-white/[0.08] bg-white/[0.03]
                                       shadow-[0_4px_40px_rgba(0,0,0,0.35)]"
                        >
                            <Panel tab={active} />

                            {/* autoplay progress — its animationend advances to the next tab */}
                            {autoplay && (
                                <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-0.5 bg-white/[0.06] motion-reduce:hidden">
                                    <div
                                        onAnimationEnd={advance}
                                        style={{ animationPlayState: hovering || !inView ? 'paused' : 'running' }}
                                        className="h-full origin-left bg-ember-500 animate-progress"
                                    />
                                </div>
                            )}
                        </div>
                        <p className="mt-4 text-[14px] leading-relaxed text-slate-400 lg:hidden">
                            {active.description}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
