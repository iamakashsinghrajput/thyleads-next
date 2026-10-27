'use client';

import { useState, useEffect } from 'react';
import { Radar, Users, Mail, Phone, Calendar, type LucideIcon } from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════════════════════
   TAB DATA
   Each tab is one base screenshot plus optional floating detail cards.
   `className` on an overlay only positions/sizes it — the card styling is shared.
   ═══════════════════════════════════════════════════════════════════════════════ */
type Overlay = { src: string; alt: string; className: string };

type Tab = {
    id: string;
    icon: LucideIcon;
    label: string;
    description: string;
    image: { light: string; dark: string; alt: string };
    overlays: Overlay[];
};

const TABS: Tab[] = [
    {
        id: 'signals',
        icon: Radar,
        label: 'Your CRM',
        description:
            'Bring accounts, contacts, opportunities and relevant history into Harvin, while your CRM stays the system of record.',
        image: { light: '/signals-preview.png', dark: '/signals-preview.png', alt: 'CRM integration dashboard' },
        overlays: [],
    },
    {
        id: 'accounts',
        icon: Users,
        label: 'Your Digital Sales Room',
        description:
            'AEs continue the conversation with buyers after an SDR-booked meeting, without losing the opportunity context.',
        image: { light: '/dashboard-preview.png', dark: '/dashboard-preview-dark.png', alt: 'Digital Sales Room panel' },
        overlays: [],
    },
    {
        id: 'sequences',
        icon: Mail,
        label: 'Your Email and Mailboxes',
        description:
            'Run email outreach and manage conversations, with campaign activity connected to prospect and account context.',
        image: { light: '/email_inbox2.png', dark: '/email_inbox2.png', alt: 'Email inbox showing campaign and work email conversations' },
        overlays: [
            { src: '/email_chat.png', alt: 'Email conversation detail', className: 'bottom-4 right-4 w-[40%]' },
        ],
    },
    {
        id: 'reporting',
        icon: Calendar,
        label: 'Your Google Calendar',
        description:
            'SDRs and AEs manage their meeting workflow from Harvin while keeping their existing calendar setup.',
        image: { light: '/calender_page.png', dark: '/calender_page.png', alt: 'Google Calendar integration with meeting management' },
        overlays: [
            { src: '/calender2.png', alt: 'Upcoming meeting detail', className: 'bottom-4 right-4 w-[20%]' },
        ],
    },
    {
        id: 'calling',
        icon: Phone,
        label: 'Your Calling',
        description:
            'Set up calling numbers for your SDRs and keep calls, dispositions and next steps connected to the account. Need numbers? Get them through Harvin.',
        image: { light: '/calling_page.png', dark: '/calling_page.png', alt: 'AI cold call dialer with live script assistance' },
        overlays: [
            { src: '/script_calling.png', alt: 'Suggested cold call script and disposition', className: 'bottom-4 right-4 w-[42%]' },
        ],
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
                <img
                    src={tab.image.light}
                    alt={tab.image.alt}
                    loading="lazy"
                    className="block h-full w-full object-cover object-left-top dark:hidden"
                />
                <img
                    src={tab.image.dark}
                    alt={tab.image.alt}
                    loading="lazy"
                    className="hidden h-full w-full object-cover object-left-top dark:block"
                />
            </div>

            {tab.overlays.map((overlay, i) => (
                <div
                    key={overlay.src}
                    style={{ animationDelay: `${150 + i * 100}ms` }}
                    className={[
                        'absolute overflow-hidden rounded-card bg-white',
                        'border border-white/[0.12] shadow-[0_8px_30px_rgba(0,0,0,0.4)]',
                        'opacity-0 animate-fade-up motion-reduce:animate-none motion-reduce:opacity-100',
                        overlay.className,
                    ].join(' ')}
                >
                    <img src={overlay.src} alt={overlay.alt} loading="lazy" className="block w-full" />
                </div>
            ))}
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   MAIN SECTION COMPONENT
   ═══════════════════════════════════════════════════════════════════════════════ */
export default function FeatureSection() {
    const [activeId, setActiveId] = useState(TABS[0].id);
    const active = TABS.find((t) => t.id === activeId) ?? TABS[0];

    useEffect(() => {
        const handleHash = () => {
            const hash = window.location.hash.replace('#', '').toLowerCase();
            const id = HASH_ALIASES[hash] ?? hash;
            if (TABS.some((t) => t.id === id)) setActiveId(id);
        };

        handleHash();
        window.addEventListener('hashchange', handleHash);
        return () => window.removeEventListener('hashchange', handleHash);
    }, []);

    return (
        <section
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
                    <h2 className="font-bricolage text-[clamp(30px,3.5vw,46px)] font-bold leading-[1.08] tracking-[-0.025em] text-white">
                        Set up Harvin around the way your team works.
                    </h2>
                    <p className="mt-2 text-[16px] leading-relaxed text-slate-400">
                        Harvin connects with your CRM as the source of data, and fits around the channels your team
                        already uses — email, calling, calendar and Digital Sales Rooms for AEs.
                    </p>
                </div>

                <div className="flex flex-col items-start gap-8 lg:flex-row lg:gap-14">
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
                                    onClick={() => setActiveId(tab.id)}
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
                            key={activeId}
                            role="tabpanel"
                            aria-label={active.label}
                            className="animate-fade-up overflow-hidden rounded-modal border border-white/[0.08] bg-white/[0.03]
                                       shadow-[0_4px_40px_rgba(0,0,0,0.35)] motion-reduce:animate-none"
                        >
                            <Panel tab={active} />
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
