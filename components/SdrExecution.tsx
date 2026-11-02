import {
  Building2, CalendarDays, Check, ClipboardList, Clock, Home, Inbox, Mail, Megaphone, MessageSquare,
  Phone, PhoneOff, Radar, Radio, Send, Sparkles, Target,
} from 'lucide-react';

/**
 * Execution — the four channels as full-height panels, each one covering the
 * last as you scroll, with the copy and the screen swapping sides.
 *
 * THE SCREENS ARE THE REAL HARVIN SDR APP, not a generic console. Each one sits
 * inside the product's own shell — the dark sidebar with its actual navigation
 * (Home, Inbox, Meetings, Data Building, Active TAL, Intelligence, Tasks,
 * Campaigns, Dialer) — with the item for that channel active, and the work area
 * drawn from the product screenshots in /public (calling_page.png,
 * email_inbox2.png): the Dialer's call brief / script tabs and disposition
 * chips, the inbox's Campaign / Work Email split and intent tags.
 *
 * The bezel is kept from the rest of the page: the screen is oversized for its
 * frame and runs off the right and bottom edges, which is what implies an app
 * continuing past the crop, with two floating chips over the bottom-left.
 *
 * Contacts and accounts are the product's own B2B demo data (Finlytics,
 * Shipnest, Datavine, CloudNest…), shown as initials as the app shows them.
 * Phone numbers are masked; rates and counts are illustrative product output,
 * not performance claims.
 */

/* ── The app shell: Harvin's sidebar + a work area ────────────────────── */
type NavKey = 'inbox-email' | 'campaigns-email' | 'dialer' | 'tasks';

const NAV: { icon: typeof Home; label: string; key?: string; subs?: { label: string; key?: NavKey }[] }[] = [
  { icon: Home, label: 'Home' },
  { icon: Inbox, label: 'Inbox', key: 'inbox', subs: [{ label: 'Email', key: 'inbox-email' }, { label: 'LinkedIn' }] },
  { icon: CalendarDays, label: 'Meetings' },
  { icon: Building2, label: 'Data Building' },
  { icon: Target, label: 'Active TAL' },
  { icon: Radio, label: 'Intelligence' },
  { icon: ClipboardList, label: 'Tasks', key: 'tasks' },
  { icon: Megaphone, label: 'Campaigns', key: 'campaigns', subs: [{ label: 'Email', key: 'campaigns-email' }, { label: 'LinkedIn' }] },
  { icon: Phone, label: 'Dialer', key: 'dialer' },
];

function Sidebar({ active }: { active: NavKey }) {
  return (
    <aside aria-hidden="true" className="hidden w-[158px] flex-shrink-0 flex-col bg-[#1A1A1A] sm:flex">
      <div className="flex items-center gap-2 px-4 pb-4 pt-5">
        <img src="/harvinlogo/logo.png" alt="" className="h-6 w-auto" />
        <div className="leading-none">
          <p className="text-[14px] font-bold tracking-[-0.01em] text-white">Harvin</p>
          <p className="mt-0.5 text-[10px] text-white/45">SDR</p>
        </div>
      </div>
      <nav className="space-y-0.5 px-2">
        {NAV.map((n) => {
          const on = n.key === active || (!!n.key && active.startsWith(`${n.key}-`));
          return (
            <div key={n.label}>
              <p
                className={`flex items-center gap-2.5 rounded-lg px-2.5 py-[7px] text-[12.5px] ${
                  on ? 'bg-ember-900/70 font-semibold text-white' : 'text-white/60'
                }`}
              >
                <n.icon size={14} strokeWidth={2} className={on ? 'text-ember-300' : 'text-white/45'} />
                {n.label}
              </p>
              {on && n.subs && (
                <div className="mb-1 mt-0.5 space-y-0.5 pl-8">
                  {n.subs.map((s) => (
                    <p
                      key={s.label}
                      className={`flex items-center gap-2 py-1 text-[11.5px] ${s.key === active ? 'font-semibold text-ember-400' : 'text-white/50'}`}
                    >
                      <span className={`h-1 w-1 rounded-full ${s.key === active ? 'bg-ember-400' : 'bg-white/30'}`} />
                      {s.label}
                    </p>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}

/** Initials avatar, the way the product renders contacts. */
function Who({ v, tone = 'amber', size = 'h-9 w-9 text-[12px]' }: { v: string; tone?: 'amber' | 'violet' | 'sky' | 'ember'; size?: string }) {
  const tones = {
    amber: 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300',
    violet: 'bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300',
    sky: 'bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300',
    ember: 'bg-ember-100 text-ember-700 dark:bg-ember-500/15 dark:text-ember-300',
  };
  return <span className={`grid flex-shrink-0 place-items-center rounded-full font-bold ${size} ${tones[tone]}`}>{v}</span>;
}

/** Status tags in the product's style: tinted fill with a matching ring. */
const TAG = {
  green: 'bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-500/20',
  sky: 'bg-sky-50 text-sky-700 ring-sky-200 dark:bg-sky-500/10 dark:text-sky-400 dark:ring-sky-500/20',
  amber: 'bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:ring-amber-500/20',
  red: 'bg-red-50 text-red-600 ring-red-200 dark:bg-red-500/10 dark:text-red-400 dark:ring-red-500/20',
  slate: 'bg-slate-100 text-slate-600 ring-slate-200 dark:bg-white/[0.06] dark:text-slate-300 dark:ring-white/10',
  ember: 'bg-ember-50 text-ember-600 ring-ember-200 dark:bg-ember-500/15 dark:text-ember-300 dark:ring-ember-500/25',
} as const;

function Tag({ tone, children }: { tone: keyof typeof TAG; children: React.ReactNode }) {
  return (
    <span className={`inline-flex flex-shrink-0 items-center whitespace-nowrap rounded-md px-2 py-0.5 text-[11px] font-semibold ring-1 ${TAG[tone]}`}>
      {children}
    </span>
  );
}

/**
 * The device: bezel running off the crop, the app shell inside it, floating
 * chips over the bottom-left corner.
 */
function ChannelScreen({ active, title, sub, right, chips, children }: {
  active: NavKey;
  title: string;
  sub: string;
  right?: React.ReactNode;
  chips: { label: string; solid?: boolean; Icon?: typeof Radar }[];
  children: React.ReactNode;
}) {
  return (
    <div className="relative h-full overflow-hidden rounded-2xl bg-sand-200 p-5 dark:bg-[#141210] sm:p-6">
      <div className="relative -mb-20 -mr-6 ml-[5%] rounded-l-[32px] bg-[#141414] py-[13px] pl-[13px] shadow-[0_26px_64px_rgba(15,23,42,0.3)] sm:-mr-14">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-[3px] rounded-l-[32px] bg-gradient-to-b from-white/30 via-white/[0.06] to-transparent"
        />

        <div className="flex min-h-[720px] overflow-hidden rounded-l-[22px]">
          <Sidebar active={active} />

          {/* the right padding matches the bezel's bleed (-mr-6 / sm:-mr-14), so right-aligned tags stop before the crop */}
          <div className="min-w-0 flex-1 bg-white pr-6 dark:bg-[#16130F] sm:pr-14">
            <div className="flex items-start justify-between gap-4 px-4 pb-4 pt-5 sm:px-6">
              <div className="min-w-0">
                <h4 className="truncate text-[22px] font-bold tracking-[-0.03em] text-slate-900 dark:text-white">{title}</h4>
                <p className="mt-0.5 truncate text-[12.5px] text-slate-500 dark:text-slate-400">{sub}</p>
              </div>
              {right}
            </div>
            {children}
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-5 left-5 z-10 flex flex-col items-start gap-2 sm:bottom-6 sm:left-6">
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
    </div>
  );
}

const LINE = 'border-slate-200/70 dark:border-white/[0.06]';
const CARD = 'rounded-xl border border-slate-200 bg-white dark:border-white/[0.08] dark:bg-white/[0.03]';
const MICRO = 'text-[10.5px] font-semibold uppercase tracking-[0.14em] text-slate-400 dark:text-slate-500';

/* ── Email: a sequence, its steps, and the verified contacts in it ────── */
const SEQ_STEPS = [
  { n: 1, t: 'Intro', when: 'Day 0', stat: '34 sent', on: true },
  { n: 2, t: 'Follow-up', when: 'Day 3', stat: '21 sent', on: true },
  { n: 3, t: 'Break-up', when: 'Day 7', stat: 'Queued', on: false },
];
const SEQ_CONTACTS = [
  { v: 'RM', tone: 'amber' as const, name: 'Ritika Malhotra', email: 'ritika@finlytics.io', tag: ['Replied', 'green'] as const },
  { v: 'RD', tone: 'violet' as const, name: 'Rohan Desai', email: 'rohan.desai@shipnest.in', tag: ['Opened ×3', 'sky'] as const },
  { v: 'JN', tone: 'sky' as const, name: 'Jessica Nguyen', email: 'jessica@datavine.ai', tag: ['Opened', 'sky'] as const },
  { v: 'AM', tone: 'ember' as const, name: 'Arjun Mehra', email: 'arjun.m@cloudnest.io', tag: ['Step 2 today', 'amber'] as const },
  { v: 'AI', tone: 'amber' as const, name: 'Ananya Iyer', email: 'ananya@ledgerly.in', tag: ['Verified', 'green'] as const },
];

function EmailBody() {
  return (
    <div className={`border-t ${LINE} px-4 py-5 sm:px-6`}>
      <div className={`${CARD} p-4`}>
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className={MICRO}>Sequence</p>
            <p className="mt-1 truncate text-[15px] font-bold text-slate-900 dark:text-white">Fintech · Heads of Sales · Hiring surge</p>
          </div>
          <Tag tone="green">Active</Tag>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {SEQ_STEPS.map((s) => (
            <div
              key={s.n}
              className={`min-w-0 rounded-lg px-2 py-2.5 sm:px-3 ${
                s.on ? 'bg-ember-50 ring-1 ring-ember-200 dark:bg-ember-500/10 dark:ring-ember-500/25' : 'border border-dashed border-slate-300 dark:border-white/15'
              }`}
            >
              <p className="flex min-w-0 items-center gap-1.5 text-[12.5px] font-bold text-slate-900 dark:text-white">
                <span className="grid h-4 w-4 flex-shrink-0 place-items-center rounded-full bg-ember-500 text-[9px] text-white">{s.n}</span>
                <span className="truncate">{s.t}</span>
              </p>
              <p className="mt-1 truncate text-[11px] text-slate-500 dark:text-slate-400">
                {s.when} · {s.stat}
              </p>
            </div>
          ))}
        </div>
        <div className={`mt-4 grid grid-cols-3 border-t ${LINE} pt-3`}>
          {[
            ['Opened', '62%'],
            ['Replied', '14%'],
            ['Meetings', '4'],
          ].map(([k, v]) => (
            <div key={k}>
              <p className="text-[18px] font-bold tabular-nums text-slate-900 dark:text-white">{v}</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">{k}</p>
            </div>
          ))}
        </div>
      </div>

      <p className={`${MICRO} mt-6`}>Contacts in sequence</p>
      <div className={`mt-2 divide-y ${LINE} divide-slate-200/70 dark:divide-white/[0.06]`}>
        {SEQ_CONTACTS.map((c) => (
          <div key={c.email} className="flex items-center gap-3 py-3">
            <Who v={c.v} tone={c.tone} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[14px] font-bold text-slate-900 dark:text-white">{c.name}</p>
              <p className="flex items-center gap-1.5 truncate text-[12px] text-slate-500 dark:text-slate-400">
                <Check size={11} strokeWidth={3} className="flex-shrink-0 text-emerald-500" />
                {c.email}
              </p>
            </div>
            <Tag tone={c.tag[1]}>{c.tag[0]}</Tag>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Dialer: live call, call brief tabs, script, disposition ──────────── */
const DISPOSITIONS: [string, keyof typeof TAG][] = [
  ['Connected', 'green'],
  ['Left Voicemail', 'amber'],
  ['No Answer', 'slate'],
  ['Not Interested', 'red'],
  ['Meeting Booked', 'green'],
];

function DialerBody() {
  return (
    <div className={`border-t ${LINE} px-4 py-5 sm:px-6`}>
      <div className={`${CARD} flex items-center gap-3 p-4`}>
        <Who v="RM" tone="amber" size="h-11 w-11 text-[13px]" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[15px] font-bold text-slate-900 dark:text-white">Ritika Malhotra</p>
          <p className="truncate text-[12px] text-slate-500 dark:text-slate-400">Head of Sales · Finlytics</p>
          <p className="mt-0.5 flex items-center gap-1.5 whitespace-nowrap text-[11.5px] text-emerald-600 dark:text-emerald-400">
            <Check size={11} strokeWidth={3} />
            Direct dial verified
          </p>
        </div>
        <div className="flex flex-shrink-0 items-center gap-2.5">
          <span className="flex items-center gap-1.5 font-mono text-[13px] font-semibold tabular-nums text-slate-900 dark:text-white">
            <span className="h-2 w-2 rounded-full bg-red-500 motion-safe:animate-pulse" />
            02:14
          </span>
          <span className="grid h-9 w-9 place-items-center rounded-full bg-red-500 text-white">
            <PhoneOff size={15} strokeWidth={2.4} />
          </span>
        </div>
      </div>

      <div className={`mt-5 flex gap-4 overflow-hidden border-b ${LINE} text-[12.5px] font-semibold`}>
        {/* Relevant Info is left out of the strip so the active tab fits the crop */}
        {['Call Brief', 'Previous Interactions', 'Suggested Script'].map((t) => (
          <span
            key={t}
            className={`whitespace-nowrap pb-2.5 ${
              t === 'Suggested Script' ? 'border-b-2 border-ember-500 text-ember-600 dark:text-ember-400' : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            {t}
          </span>
        ))}
      </div>

      <div className="mt-4 rounded-xl bg-sand-50 p-4 text-[12.5px] leading-[1.65] text-slate-700 dark:bg-white/[0.03] dark:text-slate-300">
        <p className="mb-2 text-[13px] font-bold text-slate-900 dark:text-white">Cold call opener</p>
        <p>Hi Ritika, this is Sarah from Harvin. Did I catch you at a bad time?</p>
        <p className="mt-2">
          I noticed Finlytics is hiring six SDRs this quarter. Most heads of sales I speak with say their reps spend too much time
          researching and too little time talking to buyers…
        </p>
      </div>

      <p className="mt-5 text-[13px] font-bold text-slate-900 dark:text-white">Disposition</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {DISPOSITIONS.map(([d, tone]) => (
          <span
            key={d}
            className={`rounded-lg px-2.5 py-1.5 text-[11.5px] font-semibold ring-1 ${TAG[tone]} ${d === 'Connected' ? 'ring-2' : ''}`}
          >
            {d}
          </span>
        ))}
      </div>

      <div className={`${CARD} mt-5 flex items-center gap-3 p-3.5`}>
        <Who v="RD" tone="violet" />
        <div className="min-w-0 flex-1">
          <p className={MICRO}>Up next in your queue</p>
          <p className="mt-0.5 truncate text-[13.5px] font-bold text-slate-900 dark:text-white">Rohan Desai</p>
          <p className="truncate text-[11.5px] text-slate-500 dark:text-slate-400">VP Ops | Shipnest · +91 98XXX X4127</p>
        </div>
        <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full bg-emerald-500 text-white">
          <Phone size={15} strokeWidth={2.4} />
        </span>
      </div>
    </div>
  );
}

/* ── Tasks: today's manual work, each tied to an account ──────────────── */
const TASKS = [
  { t: 'Send pricing one-pager', who: 'Ritika Malhotra · Finlytics', due: ['10:00', 'slate'] as const, Icon: Send, auto: true, done: true },
  { t: 'Call back after no answer', who: 'Rohan Desai · Shipnest', due: ['11:30', 'slate'] as const, Icon: Phone, auto: true, done: false },
  { t: 'Confirm Wednesday’s meeting', who: 'Jessica Nguyen · Datavine', due: ['14:00', 'slate'] as const, Icon: CalendarDays, auto: false, done: false },
  { t: 'Re-sequence after no reply', who: 'Arjun Mehra · CloudNest', due: ['16:15', 'slate'] as const, Icon: Mail, auto: true, done: false },
  { t: 'Log outcome from Tuesday’s call', who: 'Ananya Iyer · Ledgerly', due: ['Overdue', 'red'] as const, Icon: ClipboardList, auto: false, done: false },
  { t: 'Add new contacts from careers page', who: 'Kabir Shah · Paystream', due: ['Overdue', 'red'] as const, Icon: Sparkles, auto: false, done: false },
];

function TasksBody() {
  return (
    <div className={`border-t ${LINE} px-4 py-5 sm:px-6`}>
      <div className="flex gap-2">
        {[
          ['Today', '6', true],
          ['Overdue', '2', false],
          ['This week', '14', false],
        ].map(([l, n, on]) => (
          <span
            key={l as string}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12.5px] font-semibold ${
              on ? 'bg-ember-50 text-ember-700 ring-1 ring-ember-200 dark:bg-ember-500/15 dark:text-ember-300 dark:ring-ember-500/25' : 'text-slate-500 ring-1 ring-slate-200 dark:text-slate-400 dark:ring-white/10'
            }`}
          >
            {l}
            <span className="tabular-nums opacity-70">{n}</span>
          </span>
        ))}
      </div>

      <div className="mt-4 space-y-2">
        {TASKS.map((k) => (
          <div key={k.t} className={`${CARD} flex items-center gap-3 px-3.5 py-3`}>
            <span
              className={`grid h-[18px] w-[18px] flex-shrink-0 place-items-center rounded-[5px] ${
                k.done ? 'bg-ember-500 text-white' : 'ring-1 ring-slate-300 dark:ring-white/20'
              }`}
            >
              {k.done && <Check size={12} strokeWidth={3.2} />}
            </span>
            <span className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-lg bg-ember-50 text-ember-500 dark:bg-ember-500/15">
              <k.Icon size={14} strokeWidth={2.2} />
            </span>
            <div className="min-w-0 flex-1">
              <p className={`truncate text-[13.5px] font-bold ${k.done ? 'text-slate-400 line-through dark:text-slate-500' : 'text-slate-900 dark:text-white'}`}>
                {k.t}
              </p>
              <p className="flex items-center gap-2 truncate text-[11.5px] text-slate-500 dark:text-slate-400">
                {k.who}
                {k.auto && (
                  <span className="inline-flex items-center gap-1 text-ember-600 dark:text-ember-400">
                    <Sparkles size={10} strokeWidth={2.4} />
                    Auto
                  </span>
                )}
              </p>
            </div>
            <Tag tone={k.due[1]}>
              {k.due[1] !== 'red' && <Clock size={10} strokeWidth={2.4} className="mr-1" />}
              {k.due[0]}
            </Tag>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Unified inbox: Campaign / Work email, intent-tagged threads ──────── */
const THREADS = [
  { v: 'RM', tone: 'amber' as const, name: 'Ritika Malhotra', when: 'Oct 18', subj: 'Re: Finlytics × Harvin: more qualified meetings', line: 'Thanks, these are helpful. Wednesday afternoon works for me.', tag: ['Interested', 'green'] as const, on: true },
  { v: 'RD', tone: 'violet' as const, name: 'Rohan Desai', when: 'Oct 18', subj: 'Re: Shipnest × Harvin', line: 'Let’s talk. Can we do 30 min next week?', tag: ['Meeting Request', 'green'] as const, on: false },
  { v: 'JN', tone: 'sky' as const, name: 'Jessica Nguyen', when: 'Oct 17', subj: 'Re: Datavine × Harvin', line: 'Could you send the case study first?', tag: ['Information Request', 'sky'] as const, on: false },
  { v: 'AM', tone: 'ember' as const, name: 'Arjun Mehra', when: 'Oct 17', subj: 'Re: CloudNest × Harvin', line: 'Not right now — circle back next quarter.', tag: ['Not Now', 'slate'] as const, on: false },
];

function InboxBody() {
  return (
    <div className={`border-t ${LINE} px-4 py-5 sm:px-6`}>
      <div className="grid grid-cols-2 gap-2.5">
        <div className="flex items-center gap-2.5 rounded-xl bg-ember-50 px-3.5 py-3 ring-1 ring-ember-200 dark:bg-ember-500/10 dark:ring-ember-500/25">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-ember-100 text-ember-600 dark:bg-ember-500/20 dark:text-ember-300">
            <Megaphone size={14} strokeWidth={2.2} />
          </span>
          <div className="min-w-0">
            <p className="truncate text-[13px] font-bold text-slate-900 dark:text-white">Campaign Inbox</p>
            <p className="truncate text-[11px] text-slate-500 dark:text-slate-400">All campaign replies</p>
          </div>
        </div>
        <div className="flex items-center gap-2.5 rounded-xl px-3.5 py-3 ring-1 ring-slate-200 dark:ring-white/10">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-slate-100 text-slate-500 dark:bg-white/[0.06] dark:text-slate-400">
            <Mail size={14} strokeWidth={2.2} />
          </span>
          <div className="min-w-0">
            <p className="truncate text-[13px] font-bold text-slate-900 dark:text-white">Work Email</p>
            <p className="truncate text-[11px] text-slate-500 dark:text-slate-400">Your company inbox</p>
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        {THREADS.map((t) => (
          <div
            key={t.name}
            className={`flex gap-3 rounded-xl px-3.5 py-3 ${
              t.on ? 'bg-ember-50/70 ring-1 ring-ember-200 dark:bg-ember-500/[0.08] dark:ring-ember-500/25' : `border ${LINE}`
            }`}
          >
            <Who v={t.v} tone={t.tone} />
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="truncate text-[13.5px] font-bold text-slate-900 dark:text-white">{t.name}</p>
                <p className="flex-shrink-0 text-[11px] text-slate-400 dark:text-slate-500">{t.when}</p>
              </div>
              <p className="truncate text-[12px] font-semibold text-slate-700 dark:text-slate-300">{t.subj}</p>
              <p className="truncate text-[11.5px] text-slate-500 dark:text-slate-400">{t.line}</p>
              <div className="mt-2 flex items-center gap-2">
                <Tag tone={t.tag[1]}>{t.tag[0]}</Tag>
                {t.on && (
                  <span className="inline-flex items-center gap-1 rounded-md bg-white px-2 py-0.5 text-[11px] font-semibold text-ember-600 ring-1 ring-ember-200 dark:bg-transparent dark:text-ember-400 dark:ring-ember-500/25">
                    <Phone size={10} strokeWidth={2.4} />
                    Call Lead
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── The four channels ────────────────────────────────────────────────── */
const CHANNELS = [
  {
    t: 'Email',
    d: 'Create and manage outbound sequences from the same place the account lives. The signal that fired decides the angle, and the address is found and verified before anything sends.',
    d2: 'Every send, open and reply is written straight back to the account record — so the manager sees what went out without asking, and the next rep to open the account sees the whole history.',
    points: [
      'Sequences built from the signal that fired',
      'Addresses found and verified before the send',
      'Sending domains warmed and authenticated',
      'Every send written back to the account record',
    ],
    Icon: Mail,
    screen: (
      <ChannelScreen
        active="campaigns-email"
        title="Email Campaigns"
        sub="Sequences, steps and the contacts in them."
        right={<Tag tone="ember">34 contacts</Tag>}
        chips={[
          { label: 'ritika@finlytics.io · verified', solid: true, Icon: Mail },
          { label: 'Verifying 34 addresses now', Icon: Radar },
        ]}
      >
        <EmailBody />
      </ChannelScreen>
    ),
  },
  {
    t: 'Dialer',
    d: 'Work prioritized call lists without building them. Harvin orders the day by ICP tier and live signal, and opens each contact with the reason they ranked already on screen.',
    d2: 'The direct dial is verified on the same record the email came from, and the recording, transcript and disposition are saved against the account the moment the call ends.',
    points: [
      'Call lists ordered by ICP tier and priority',
      'Direct dials verified on the account record',
      'The reason to call on screen while it runs',
      'Recording, transcript and disposition saved',
    ],
    Icon: Phone,
    screen: (
      <ChannelScreen
        active="dialer"
        title="Dialer"
        sub="Make calls and keep track of every conversation."
        right={
          <span className="flex flex-shrink-0 items-center gap-1.5 text-[13px] font-bold text-ember-600 dark:text-ember-400">
            <Radio size={14} strokeWidth={2.4} />
            AutoDial
          </span>
        }
        chips={[
          { label: '+91 98XXX X4120 · on call', solid: true, Icon: Phone },
          { label: 'Recording · 02:14', Icon: Radar },
        ]}
      >
        <DialerBody />
      </ChannelScreen>
    ),
  },
  {
    t: 'Tasks',
    d: 'Keep the manual half of the job visible. Not every next step is a sequence — one-pagers to send, meetings to confirm, accounts to re-work after a no-reply.',
    d2: 'Each task carries the account it belongs to and the rep who owns it, so a follow-up that slips shows up on the manager’s screen rather than disappearing into someone’s notebook.',
    points: [
      'Today, overdue and this week in one list',
      'Every task tied to its account and owner',
      'Created automatically from replies and calls',
      'Follow-ups that stop slipping between tools',
    ],
    Icon: Check,
    screen: (
      <ChannelScreen
        active="tasks"
        title="Tasks"
        sub="Every next step, tied to its account."
        right={<Tag tone="ember">6 due today</Tag>}
        chips={[
          { label: '6 tasks due today', solid: true, Icon: Check },
          { label: '2 overdue', Icon: Radar },
        ]}
      >
        <TasksBody />
      </ChannelScreen>
    ),
  },
  {
    t: 'Unified Inbox',
    d: 'Bring prospect replies and conversations together. Email, calls and tasks sit in one thread per prospect, in the order they happened.',
    d2: 'Nobody reconstructs a conversation from four tools before a handoff — the AE opens the thread and sees every touch, who owns it and what the next step is.',
    points: [
      'Replies, calls and tasks in one thread',
      'Owner and next step on every conversation',
      'Threads attached to the account, not a mailbox',
      'Nothing reconstructed from four tools later',
    ],
    Icon: MessageSquare,
    screen: (
      <ChannelScreen
        active="inbox-email"
        title="Email Inbox"
        sub="Every campaign and work-email conversation in one place."
        right={<Tag tone="ember">3 new</Tag>}
        chips={[
          { label: '3 new replies', solid: true, Icon: MessageSquare },
          { label: 'One thread per prospect', Icon: Radar },
        ]}
      >
        <InboxBody />
      </ChannelScreen>
    ),
  },
];

function Copy() {
  return (
    <>
      <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ember-500">Execution</p>
      <h2 className="font-instrument font-semibold mt-4 max-w-[820px] text-[clamp(27px,3.2vw,42px)] leading-[1.09] tracking-[-0.025em] text-slate-900 dark:text-white">
        Give your team the channels they need without losing management visibility.
      </h2>
      <p className="mt-4 text-[16px] leading-[1.7] text-slate-600 dark:text-slate-400">
        Run prospecting activity from the same SDR workflow.
      </p>
    </>
  );
}

/** The copy half of a channel: index, name, description, three points. */
function ChannelCopy({ c, i, last }: { c: typeof CHANNELS[0]; i: number; last: boolean }) {
  return (
    <div className="min-w-0 max-w-[520px]">
      <div className="mb-6 flex items-center gap-3.5">
        <span className="font-mono text-[13px] font-semibold tracking-[0.16em] text-ember-500">
          {String(i + 1).padStart(2, '0')}
        </span>
        <span aria-hidden="true" className="h-px w-16 bg-slate-200 dark:bg-white/[0.10]" />
        <c.Icon size={16} strokeWidth={2.1} className="flex-shrink-0 text-ember-500" />
      </div>

      <h3 className="font-instrument font-semibold text-[30px] leading-[1.12] tracking-[-0.025em] text-slate-900 dark:text-white sm:text-[38px]">
        {c.t}
      </h3>

      <p className="mt-5 text-[17px] leading-[1.72] text-slate-600 dark:text-slate-400">{c.d}</p>
      <p className="mt-3.5 text-[15.5px] leading-[1.72] text-slate-500 dark:text-slate-400">{c.d2}</p>

      <ul className="mt-7 flex flex-col gap-3.5">
        {c.points.map((p) => (
          <li key={p} className="flex items-start gap-2.5">
            <span className="mt-[3px] grid h-[19px] w-[19px] flex-shrink-0 place-items-center rounded-full bg-ember-50 dark:bg-ember-500/15">
              <Check size={12} className="text-ember-600 dark:text-ember-300" strokeWidth={3} />
            </span>
            <span className="text-[15.5px] leading-[1.55] text-slate-700 dark:text-slate-300">{p}</span>
          </li>
        ))}
      </ul>

      {last && (
        <p className="mt-8 border-t border-slate-200 pt-5 text-[15px] font-bold tracking-[-0.01em] text-slate-900 dark:border-white/[0.10] dark:text-white">
          Harvin keeps the activity connected to the account, rep and eventual outcome.
        </p>
      )}
    </div>
  );
}

/**
 * The channels as full-height panels that stack.
 *
 * Each is `sticky top-0 h-screen` over an OPAQUE ground, so the next panel
 * rises and covers the previous one outright rather than sitting beside it —
 * one channel on screen at a time, no card chrome, nothing showing through.
 * The occlusion depends entirely on that background being opaque; make it
 * transparent and every panel shows through the one above it.
 *
 * Sides alternate — Email's copy left, Dialer's right, and so on — via grid
 * `order`, which keeps the DOM in reading order while the layout mirrors.
 *
 * No JavaScript: position sticky does all of it, so there is nothing to
 * desynchronise and it degrades to a plain stack wherever sticky is
 * unavailable. Below `lg` the pinning is dropped — stacked full-height panels
 * on a phone leave no room for the screen inside them.
 */
export default function SdrExecution() {
  return (
    <section className="border-t border-slate-200 bg-sand-100 dark:border-white/[0.06] dark:bg-[#040404]">
      <div className="mx-auto max-w-[1280px] px-4 pb-4 pt-16 sm:px-6 lg:px-8 lg:pb-6 lg:pt-20">
        <Copy />
      </div>

      {/* ═══ DESKTOP — one panel at a time, each covering the last ═══════ */}
      <div className="hidden lg:block">
        {CHANNELS.map((c, i) => (
          <div key={c.t} className="sticky top-0 h-screen">
            <div className="flex h-full items-center bg-sand-100 px-8 dark:bg-[#040404]">
              <div className="mx-auto grid w-full max-w-[1280px] items-center gap-14 lg:grid-cols-2 xl:gap-20">
                <div className={i % 2 === 1 ? 'lg:order-2 lg:justify-self-end' : ''}>
                  <ChannelCopy c={c} i={i} last={i === CHANNELS.length - 1} />
                </div>
                {/* viewport-relative rather than a fixed ratio, so the screen
                    takes the height the panel actually has */}
                <div className={`h-[min(74vh,680px)] w-full ${i % 2 === 1 ? 'lg:order-1' : ''}`}>{c.screen}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ═══ MOBILE — plain stack, no pinning ════════════════════════════ */}
      <div className="space-y-16 px-4 pb-16 pt-8 sm:px-6 lg:hidden">
        {CHANNELS.map((c, i) => (
          <div key={c.t}>
            <div className="h-[440px]">{c.screen}</div>
            <div className="mt-6">
              <ChannelCopy c={c} i={i} last={i === CHANNELS.length - 1} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
