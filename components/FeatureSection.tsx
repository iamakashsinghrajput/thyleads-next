'use client';

import { useState, useEffect } from 'react';
import {
    Radar,
    Users,
    Mail,
    BarChart3,
    ArrowRight,
    Phone,
    Calendar,
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════════════════════
   TAB PANEL COMPONENTS
   Each tab has its own dedicated panel component below.
   Edit each one independently — they share no rendering logic with each other.
   ═══════════════════════════════════════════════════════════════════════════════ */

/* ─── 1. Your CRM ────────────────────────────────────────────────────────────── */
function CrmPanel() {
    return (
        <div className="relative bg-slate-100 dark:bg-[#0F0E0C] border-b border-slate-200 dark:border-white/[0.08] overflow-hidden" style={{ aspectRatio: '16/9' }}>
            <style>{`
                @keyframes crmCardIn {
                    0%   { opacity: 0; transform: translateY(36px) scale(0.86); filter: brightness(1.12); }
                    15%  { opacity: 1; }
                    60%  { opacity: 1; transform: translateY(-8px) scale(1.03); filter: brightness(1.02); }
                    82%  { transform: translateY(2px) scale(0.995); }
                    100% { opacity: 1; transform: translateY(0px) scale(1); filter: brightness(1); }
                }
            `}</style>

            {/* Base image — full size */}
            <img
                src="/signals-preview.png"
                alt="CRM integration dashboard"
                loading="lazy"
                className="w-full h-full object-cover object-top block dark:hidden"
            />
            <img
                src="/signals-preview.png"
                alt="CRM integration dashboard"
                loading="lazy"
                className="w-full h-full object-cover object-top hidden dark:block"
            />

            {/* Floating overlay card — smaller copy of the same image */}
            <div
                className="absolute top-5 right-5 w-[52%] rounded-card overflow-hidden
                           bg-white
                           border border-slate-200/90 dark:border-white/[0.14]
                           ring-1 ring-slate-900/10 dark:ring-white/20
                           shadow-[0_22px_45px_-8px_rgba(0,0,0,0.30),0_8px_18px_-4px_rgba(0,0,0,0.18)]
                           dark:shadow-[0_25px_60px_-10px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.12)]
                           transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1"
                style={{ animation: 'crmCardIn 0.65s cubic-bezier(0.16,1,0.3,1) 0.22s both' }}
            >
                <img
                    src="/signals-preview.png"
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="w-full object-cover object-top block dark:hidden bg-white"
                />
                <img
                    src="/signals-preview.png"
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="w-full object-cover object-top hidden dark:block bg-white"
                />
            </div>

            <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-50/80 dark:from-[#0F0E0C]/80 to-transparent" />
        </div>
    );
}

/* ─── 2. Your Digital Sales Room ─────────────────────────────────────────────── */
function DigitalSalesRoomPanel() {
    return (
        <div className="relative bg-slate-100 dark:bg-[#0F0E0C] border-b border-slate-200 dark:border-white/[0.08] overflow-hidden" style={{ aspectRatio: '16/9' }}>
            <img
                src="/dashboard-preview.png"
                alt="Digital Sales Room panel"
                loading="lazy"
                className="w-full h-full object-cover object-top block dark:hidden"
            />
            <img
                src="/dashboard-preview-dark.png"
                alt="Digital Sales Room panel"
                loading="lazy"
                className="w-full h-full object-cover object-top hidden dark:block"
            />
            <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-50/80 dark:from-[#0F0E0C]/80 to-transparent" />
        </div>
    );
}

/* ─── 3. Your Email and Mailboxes ────────────────────────────────────────────── */
function EmailPanel() {
    return (
        <div className="relative flex border-b border-slate-200 dark:border-white/[0.08] overflow-hidden">
            <style>{`
                @keyframes emailCardIn {
                    0%   { opacity: 0; transform: translateY(40px) scale(0.85); filter: brightness(1.12); }
                    15%  { opacity: 1; }
                    60%  { opacity: 1; transform: translateY(-8px) scale(1.03); filter: brightness(1.02); }
                    82%  { transform: translateY(2px) scale(0.995); }
                    100% { opacity: 1; transform: translateY(0px) scale(1); filter: brightness(1); }
                }
            `}</style>

            {/* Base image — full inbox view */}
            <img
                src="/email_inbox2.png"
                alt="Email inbox showing campaign and work email conversations"
                loading="lazy"
                className="w-full"
            />

            {/* Floating overlay — email chat/reply detail */}
            <div
                className="absolute bottom-0 right-2 w-[42%] rounded-card overflow-hidden
                           bg-white
                           border border-slate-200/90 dark:border-white/[0.14]
                           ring-1 ring-slate-900/10 dark:ring-white/20
                           shadow-[0_22px_45px_-8px_rgba(0,0,0,0.30),0_8px_18px_-4px_rgba(0,0,0,0.18)]
                           dark:shadow-[0_25px_60px_-10px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.12)]
                           transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1"
                style={{ animation: 'emailCardIn 0.65s cubic-bezier(0.16,1,0.3,1) 0.22s both' }}
            >
                <img
                    src="/email_chat.png"
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="w-full bg-white"
                />
            </div>
        </div>
    );
}

/* ─── 4. Your Google Calendar ────────────────────────────────────────────────── */
function CalendarPanel() {
    return (
        <div className="relative flex border-b border-slate-200 dark:border-white/[0.08] overflow-hidden">
            <style>{`
                @keyframes calendarCardIn {
                    0%   { opacity: 0; transform: translateY(36px) scale(0.84); filter: brightness(1.12); }
                    15%  { opacity: 1; }
                    60%  { opacity: 1; transform: translateY(-8px) scale(1.035); filter: brightness(1.02); }
                    82%  { transform: translateY(2px) scale(0.995); }
                    100% { opacity: 1; transform: translateY(0px) scale(1); filter: brightness(1); }
                }
            `}</style>

            {/* Base image — full calendar page */}
            <img
                src="/calender_page.png"
                alt="Google Calendar integration with meeting management"
                loading="lazy"
                className="w-full"
            />

            {/* Floating overlay — UP NEXT meeting detail card */}
            <div
                className="absolute bottom-0 right-4 w-[20%] rounded-xl overflow-hidden
                           bg-white
                           border border-slate-200/90 dark:border-white/[0.14]
                           ring-1 ring-slate-900/10 dark:ring-white/20
                           shadow-[0_22px_45px_-8px_rgba(0,0,0,0.30),0_8px_18px_-4px_rgba(0,0,0,0.18)]
                           dark:shadow-[0_25px_60px_-10px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.12)]
                           transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1"
                style={{ animation: 'calendarCardIn 0.65s cubic-bezier(0.16,1,0.3,1) 0.24s both' }}
            >
                <img
                    src="/calender2.png"
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="w-full bg-white"
                />
            </div>
        </div>
    );
}

/* ─── 5. Calling ─────────────────────────────────────────────────────────────── */
function CallingPanel() {
    return (
        <div className="relative flex border-b border-slate-200 dark:border-white/[0.08] overflow-hidden">
            <style>{`
                @keyframes callingCardIn {
                    0%   { opacity: 0; transform: translateY(38px) scale(0.86); filter: brightness(1.12); }
                    15%  { opacity: 1; }
                    60%  { opacity: 1; transform: translateY(-8px) scale(1.03); filter: brightness(1.02); }
                    82%  { transform: translateY(2px) scale(0.995); }
                    100% { opacity: 1; transform: translateY(0px) scale(1); filter: brightness(1); }
                }
            `}</style>

            {/* Base image — full calling/dialer page */}
            <img
                src="/calling_page.png"
                alt="AI cold call dialer with live script assistance"
                loading="lazy"
                className="w-full"
            />

            {/* Floating overlay 1 — calling queue card */}
            <div
                className="absolute bottom-2 left-[18%] w-[32%] rounded-xl overflow-hidden
                           bg-white
                           border border-slate-200/90 dark:border-white/[0.14]
                           ring-1 ring-slate-900/10 dark:ring-white/20
                           shadow-[0_22px_45px_-8px_rgba(0,0,0,0.30),0_8px_18px_-4px_rgba(0,0,0,0.18)]
                           dark:shadow-[0_25px_60px_-10px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.12)]
                           transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1"
                style={{ animation: 'callingCardIn 0.65s cubic-bezier(0.16,1,0.3,1) 0.32s both' }}
            >
                <img
                    src="/calling_quee.png"
                    alt="Today's calling queue"
                    loading="lazy"
                    className="w-full bg-white"
                />
            </div>

            {/* Floating overlay 2 — suggested script & call outcome card */}
            <div
                className="absolute bottom-8 right-4 w-[48%] rounded-card overflow-hidden
                           bg-white
                           border border-slate-200/90 dark:border-white/[0.14]
                           ring-1 ring-slate-900/10 dark:ring-white/20
                           shadow-[0_22px_45px_-8px_rgba(0,0,0,0.30),0_8px_18px_-4px_rgba(0,0,0,0.18)]
                           dark:shadow-[0_25px_60px_-10px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.12)]
                           transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1"
                style={{ animation: 'callingCardIn 0.65s cubic-bezier(0.16,1,0.3,1) 0.18s both' }}
            >
                <img
                    src="/script_calling.png"
                    alt="Suggested cold call script and disposition"
                    loading="lazy"
                    className="w-full bg-white"
                />
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   TAB PANEL MAP  —  maps each tab id to its panel component
   ═══════════════════════════════════════════════════════════════════════════════ */
const PANEL_MAP: Record<string, () => React.ReactNode> = {
    signals: () => <CrmPanel />,
    accounts: () => <DigitalSalesRoomPanel />,
    sequences: () => <EmailPanel />,
    reporting: () => <CalendarPanel />,
    calling: () => <CallingPanel />,
};

/* ═══════════════════════════════════════════════════════════════════════════════
   TAB DATA
   ═══════════════════════════════════════════════════════════════════════════════ */
const TABS = [
    {
        id: 'signals',
        icon: Radar,
        label: 'Your CRM',
        tagline: 'to bring accounts, contacts, opportunities and relevant history into Harvin, while keeping your CRM as the system of record.',
        description:
            'Harvin connects with your CRM as the source of data to bring accounts, contacts, opportunities and relevant history into Harvin, while keeping your CRM as the system of record.',
    },
    {
        id: 'accounts',
        icon: Users,
        label: 'Your Digital Sales Room',
        tagline: 'so AEs can continue the conversation with buyers after an SDR-booked meeting, without losing the opportunity context.',
        description:
            'Enable AEs to inherit all discovery signals, notes, and previous buyer interactions seamlessly in a collaborative digital sales room.',
    },
    {
        id: 'sequences',
        icon: Mail,
        label: 'Your Email and Mailboxes',
        tagline: 'to run email outreach, manage conversations and keep campaign activity connected to your prospect and account context.',
        description:
            'Build multi-step sequences across email, tasks, and unified inbox, keeping campaign activity connected to prospect and account context.',
    },
    {
        id: 'reporting',
        icon: Calendar,
        label: 'Your Google Calendar',
        tagline: 'so SDRs and AEs can manage their meeting workflow from Harvin while keeping their existing calendar setup.',
        description:
            'Sync seamlessly with Google Calendar so SDRs and AEs manage their meeting workflow from Harvin while keeping their existing calendar setup.',
    },
    {
        id: 'calling',
        icon: Phone,
        label: 'Your Calling',
        tagline: 'Set up calling numbers for your SDRs and keep calls, dispositions and next steps connected to the prospect and account context. Need numbers? Get them through Harvin.',
        description:
            'Set up calling numbers for your SDRs and keep calls, dispositions and next steps connected to the prospect and account context. Need numbers? Get them through Harvin.',
    },
];

/* ═══════════════════════════════════════════════════════════════════════════════
   MAIN SECTION COMPONENT
   ═══════════════════════════════════════════════════════════════════════════════ */
export default function FeatureSection() {
    const [activeId, setActiveId] = useState(TABS[0].id);
    const active = TABS.find((t) => t.id === activeId) ?? TABS[0];
    const Icon = active.icon;
    const renderPanel = PANEL_MAP[active.id];

    useEffect(() => {
        const handleHash = () => {
            const rawHash = window.location.hash.replace('#', '').toLowerCase();
            if (!rawHash) return;
            if (rawHash === 'signals' || rawHash === 'integrations') {
                setActiveId('signals');
            } else if (rawHash === 'sequences' || rawHash === 'campaign' || rawHash === 'email' || rawHash === 'email-inbox') {
                setActiveId('sequences');
            } else if (rawHash === 'calling' || rawHash === 'dialer') {
                setActiveId('calling');
            } else if (rawHash === 'accounts' || rawHash === 'ae-room') {
                setActiveId('accounts');
            } else if (rawHash === 'reporting' || rawHash === 'calendar') {
                setActiveId('reporting');
            }
        };

        handleHash();
        window.addEventListener('hashchange', handleHash);
        return () => window.removeEventListener('hashchange', handleHash);
    }, []);

    return (
        <section id="platform-capabilities" className="relative py-20 sm:py-28 bg-white dark:bg-slate-950 overflow-hidden scroll-mt-20">
            {/* Nav anchor targets */}
            <div id="signals" className="relative -top-24 pointer-events-none" />
            <div id="integrations" className="relative -top-24 pointer-events-none" />
            <div id="campaign" className="relative -top-24 pointer-events-none" />
            <div id="sequences" className="relative -top-24 pointer-events-none" />
            <div id="email-inbox" className="relative -top-24 pointer-events-none" />
            <div id="dialer" className="relative -top-24 pointer-events-none" />
            <div id="calling" className="relative -top-24 pointer-events-none" />
            {/* Subtle grid backdrop */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0
          [background-image:linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)]
          dark:[background-image:linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)]
          [background-size:48px_48px]"
            />

            <div className="relative max-w-[1200px] mx-auto px-6">
                {/* Section header */}
                <div className="mb-14 max-w-5xl">
                    <span className="inline-block mb-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-ember-500">
                        Integrations
                    </span>
                    <h2 className="max-w-2xl font-bricolage text-[clamp(30px,3.5vw,46px)] font-bold tracking-[-0.025em] leading-[1.08] text-slate-900 dark:text-white">
                        Set up Harvin around the way your team works.
                    </h2>
                    <p className="mt-4 text-[16px] leading-relaxed text-slate-600 dark:text-slate-400 max-w-3xl">
                        Harvin connects with your CRM as the source of data, while giving your team the flexibility to configure the channels and tools they use every day,
                        from email and mailboxes to calling, calendar and Digital Sales Rooms for AEs to
                        continue opportunities beyond the meeting.
                    </p>
                </div>

                {/* Tabs layout */}
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-start">

                    {/* Left: vertical tab list */}
                    <div className="flex flex-row lg:flex-col gap-2 w-full lg:w-[320px] shrink-0 overflow-x-auto lg:overflow-x-visible pb-1 lg:pb-0">
                        {TABS.map((tab) => {
                            const TabIcon = tab.icon;
                            const isActive = tab.id === activeId;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveId(tab.id)}
                                    className={[
                                        'group flex items-start gap-3 text-left w-full shrink-0 lg:shrink',
                                        'rounded-card px-4 py-3.5 transition-all duration-200',
                                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-500',
                                        isActive
                                            ? 'bg-ember-500/[0.07] dark:bg-ember-500/[0.1] border border-ember-500/20 dark:border-ember-500/20'
                                            : 'border border-transparent hover:bg-slate-50 dark:hover:bg-white/[0.04]',
                                    ].join(' ')}
                                    aria-pressed={isActive}
                                >
                                    <span
                                        className={[
                                            'mt-0.5 flex-shrink-0 p-1.5 rounded-btn transition-colors duration-200',
                                            isActive
                                                ? 'bg-ember-500 text-white'
                                                : 'bg-slate-100 dark:bg-white/[0.07] text-slate-500 dark:text-slate-400 group-hover:bg-slate-200 dark:group-hover:bg-white/[0.1]',
                                        ].join(' ')}
                                    >
                                        <TabIcon size={14} strokeWidth={2} />
                                    </span>
                                    <span className="min-w-0">
                                        <span
                                            className={[
                                                'block text-[14px] font-semibold leading-snug',
                                                isActive
                                                    ? 'text-ember-500'
                                                    : 'text-slate-700 dark:text-slate-300',
                                            ].join(' ')}
                                        >
                                            {tab.label}
                                        </span>
                                        <span className="hidden lg:block mt-0.5 text-[12px] leading-snug text-slate-500 dark:text-slate-400 line-clamp-2">
                                            {tab.tagline}
                                        </span>
                                    </span>
                                    {isActive && (
                                        <ArrowRight
                                            size={14}
                                            strokeWidth={2}
                                            className="hidden lg:block ml-auto mt-1 flex-shrink-0 text-ember-500"
                                        />
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* Right: tab content panel */}
                    <div
                        key={activeId}
                        className="flex-1 min-w-0 flex flex-col rounded-modal border border-slate-200 dark:border-white/[0.08]
              bg-slate-50/60 dark:bg-white/[0.03]
              shadow-[0_4px_32px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_40px_rgba(0,0,0,0.35)]
              overflow-hidden animate-fade-up"
                    >
                        {/* Panel header bar */}
                        <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#0F0E0C]">
                            <span className="flex items-center justify-center w-7 h-7 rounded-btn bg-ember-500 text-white">
                                <Icon size={14} strokeWidth={2} />
                            </span>
                            <span className="text-[14px] font-semibold text-slate-900 dark:text-white">
                                {active.label}
                            </span>
                            <div className="ml-auto flex items-center gap-1.5" aria-hidden="true">
                                <span className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
                                <span className="w-2.5 h-2.5 rounded-full bg-amber-400/60" />
                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/60" />
                            </div>
                        </div>

                        {/* ── Tab-specific panel renders here ── */}
                        {renderPanel?.()}

                        {/* Copy */}
                        <div className="px-6 py-6">
                            <p className="text-[15px] font-semibold text-slate-900 dark:text-white mb-1">
                                {active.tagline}
                            </p>
                            <p className="text-[14px] leading-relaxed text-slate-500 dark:text-slate-400">
                                {active.description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
