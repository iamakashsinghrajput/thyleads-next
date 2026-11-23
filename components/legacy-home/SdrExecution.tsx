import { Check, Mail, MessageSquare, Phone, Radar, SlidersHorizontal } from 'lucide-react';

/**
 * Execution — the four channels as full-height panels, each one covering the
 * last as you scroll, with the copy and the screen swapping sides.
 *
 * THE SCREENS ARE BUILT TO THE ACCOUNT-EXPLORER ANATOMY, not merely to its
 * bezel. That visual works because of four things together, and dropping any
 * one of them loses the effect:
 *
 *   1. The console is OVERSIZED for its frame — a zoom into a dashboard, so
 *      the title is 24px and result rows 15px, not shrunk to fit.
 *   2. A fixed 212px rail of grouped checkbox filters under a FILTERS label,
 *      with the ticked ones filled ember.
 *   3. A results pane that runs off the crop, which is what implies a screen
 *      continuing past the edge.
 *   4. Floating chips overlapping the bottom-left corner — one solid, one white.
 *
 * Email and Dialer deliberately show the SAME contact from two angles: the
 * point of both is enrichment landing on one account record — the address in
 * one, the direct dial in the other, each verified and written back.
 *
 * The stacking is documented on the component at the bottom of this file.
 *
 * Numbers use the 555 range, reserved for fiction. Contact names are fictional;
 * company marks are real assets from /public/logos.
 */

/* ── The device: filter rail on the left, results on the right ────────── */
/**
 * Built to the Account-explorer anatomy — the console is a zoom, so the title
 * is 24px and result rows are 15px rather than shrunk to fit; the rail is a
 * fixed 212px of grouped checkbox filters under a FILTERS label; and the
 * results pane runs off the crop, which is what implies a screen continuing
 * past the edge.
 */
function ChannelScreen({ title, pill, groups, rows, chips }: {
  title: string;
  pill: string;
  groups: { label: string; items: { label: string; on: boolean }[] }[];
  rows: { slug: string; title: string; sub: string }[];
  chips: { label: string; solid?: boolean; Icon?: typeof Radar }[];
}) {
  return (
    <div className="relative h-full overflow-hidden rounded-2xl bg-sand-200 p-5 dark:bg-[#141210] sm:p-6">
      <div className="relative -mb-20 -mr-14 ml-[5%] rounded-l-[32px] bg-[#141414] py-[13px] pl-[13px] shadow-[0_26px_64px_rgba(15,23,42,0.3)]">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-[3px] rounded-l-[32px] bg-gradient-to-b from-white/30 via-white/[0.06] to-transparent"
        />

        <div className="overflow-hidden rounded-l-[22px] bg-white dark:bg-[#16130F]">
          <div className="flex items-center justify-between gap-4 px-7 py-5">
            <h4 className="truncate text-[24px] font-bold tracking-[-0.03em] text-slate-900 dark:text-white">
              {title}
            </h4>
            <span className="flex-shrink-0 whitespace-nowrap rounded-full bg-ember-50 px-4 py-2 text-[15px] font-bold text-ember-600 dark:bg-ember-500/15 dark:text-ember-300">
              {pill}
            </span>
          </div>

          <div className="grid grid-cols-[212px_1fr] border-t border-slate-200/70 dark:border-white/[0.06]">
            {/* ── Filter rail ─────────────────────────────────────────── */}
            <div className="border-r border-slate-200/70 px-5 py-4 dark:border-white/[0.06]">
              <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400 dark:text-slate-500">
                <SlidersHorizontal size={13} strokeWidth={2.2} />
                Filters
              </p>

              {groups.map((g) => (
                <div key={g.label} className="mt-4">
                  <p className="text-[13.5px] font-bold text-slate-900 dark:text-white">{g.label}</p>
                  <div className="mt-2 space-y-2">
                    {g.items.map((it) => (
                      <p key={it.label} className="flex items-center gap-2.5">
                        <span
                          className={`grid h-[18px] w-[18px] flex-shrink-0 place-items-center rounded-[5px] ${
                            it.on ? 'bg-ember-500 text-white' : 'ring-1 ring-slate-300 dark:ring-white/20'
                          }`}
                        >
                          {it.on && <Check size={12} strokeWidth={3.2} />}
                        </span>
                        <span
                          className={`truncate text-[13.5px] ${
                            it.on ? 'font-medium text-slate-900 dark:text-white' : 'text-slate-400 dark:text-slate-500'
                          }`}
                        >
                          {it.label}
                        </span>
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* ── Results, running off the crop ───────────────────────── */}
            <div className="min-w-0 px-6">
              {rows.map((r, i) => (
                <div
                  key={r.title}
                  className={`flex items-center gap-4 py-3.5 ${i > 0 ? 'border-t border-slate-200/70 dark:border-white/[0.05]' : ''}`}
                >
                  <span className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-xl border border-slate-200 bg-white p-2 dark:border-white/10">
                    <img src={`/logos/${r.slug}.svg`} alt="" aria-hidden="true" className="h-auto w-full object-contain" />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-[15px] font-bold tracking-[-0.01em] text-slate-900 dark:text-white">
                      {r.title}
                    </p>
                    <p className="truncate text-[13px] text-slate-400 dark:text-slate-500">{r.sub}</p>
                  </div>
                </div>
              ))}
            </div>
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
        title="Email sequences"
        pill="34 contacts"
        groups={[
          { label: 'Step', items: [{ label: 'Intro', on: true }, { label: 'Follow-up', on: true }, { label: 'Break-up', on: false }] },
          { label: 'Address', items: [{ label: 'Verified', on: true }, { label: 'Guessed', on: false }] },
          { label: 'Persona', items: [{ label: 'VP and above', on: true }, { label: 'Director', on: true }, { label: 'Manager', on: false }] },
          { label: 'Engagement', items: [{ label: 'Opened', on: true }, { label: 'Replied', on: true }, { label: 'No activity', on: false }] },
        ]}
        rows={[
          { slug: 'nike', title: 'Dana Whitfield', sub: 'dana.whitfield@nike.com' },
          { slug: 'peloton', title: 'Marcus Hale', sub: 'marcus.hale@onepeloton.com' },
          { slug: 'bose', title: 'Ivy Chen', sub: 'ivy.chen@bose.com' },
          { slug: 'sonos', title: 'Priya Raman', sub: 'priya.raman@sonos.com' },
          { slug: 'target', title: 'Jordan Blake', sub: 'jordan.blake@target.com' },
          { slug: 'underarmour', title: 'Nina Osei', sub: 'nina.osei@underarmour.com' },
        ]}
        chips={[
          { label: 'dana.whitfield@nike.com', solid: true, Icon: Mail },
          { label: 'Verifying 34 addresses now', Icon: Radar },
        ]}
      />
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
        title="Dialer"
        pill="8 queued"
        groups={[
          { label: 'ICP tier', items: [{ label: 'Tier A', on: true }, { label: 'Tier B', on: true }, { label: 'Tier C', on: false }] },
          { label: 'Line type', items: [{ label: 'Direct dial', on: true }, { label: 'Switchboard', on: false }] },
          { label: 'Best window', items: [{ label: '9 – 11 AM', on: true }, { label: '2 – 4 PM', on: true }, { label: 'Any time', on: false }] },
          { label: 'Last outcome', items: [{ label: 'No answer', on: true }, { label: 'Voicemail', on: true }, { label: 'Connected', on: false }] },
        ]}
        rows={[
          { slug: 'nike', title: 'Dana Whitfield', sub: '+1 (503) 555-0184 · on the call' },
          { slug: 'peloton', title: 'Marcus Hale', sub: '+1 (212) 555-0143 · 9:40 AM' },
          { slug: 'sonos', title: 'Priya Raman', sub: '+1 (805) 555-0176 · 10:15 AM' },
          { slug: 'etsy', title: 'Alex Turner', sub: '+1 (718) 555-0119 · 10:50 AM' },
          { slug: 'fitbit', title: 'Ruth Delgado', sub: '+1 (415) 555-0132 · 11:20 AM' },
          { slug: 'newbalance', title: 'Tom Reyes', sub: '+1 (617) 555-0167 · 11:45 AM' },
        ]}
        chips={[
          { label: '+1 (503) 555-0184', solid: true, Icon: Phone },
          { label: 'Recording · 02:14', Icon: Radar },
        ]}
      />
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
        title="Tasks"
        pill="6 due today"
        groups={[
          { label: 'Due', items: [{ label: 'Today', on: true }, { label: 'Overdue', on: true }, { label: 'This week', on: false }] },
          { label: 'Type', items: [{ label: 'Follow-up', on: true }, { label: 'Send asset', on: true }, { label: 'Confirm meeting', on: false }] },
          { label: 'Source', items: [{ label: 'Auto-created', on: true }, { label: 'Added by rep', on: true }] },
          { label: 'Owner', items: [{ label: 'Sarah W.', on: true }, { label: 'Whole team', on: false }] },
        ]}
        rows={[
          { slug: 'nike', title: 'Follow up on pricing', sub: 'Nike · Dana W. · 9:00' },
          { slug: 'peloton', title: 'Send security one-pager', sub: 'Peloton · Marcus H. · 11:30' },
          { slug: 'sonos', title: 'Re-sequence after no reply', sub: 'Sonos · Priya R. · 14:00' },
          { slug: 'etsy', title: 'Confirm tomorrow’s meeting', sub: 'Etsy · Alex T. · 16:15' },
          { slug: 'bose', title: 'Add new contacts from careers page', sub: 'Bose · Ivy C. · 16:40' },
          { slug: 'target', title: 'Log outcome from Tuesday’s call', sub: 'Target · Jordan B. · overdue' },
        ]}
        chips={[
          { label: '6 tasks due today', solid: true, Icon: Check },
          { label: '2 overdue', Icon: Radar },
        ]}
      />
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
        title="Unified inbox"
        pill="3 new"
        groups={[
          { label: 'Channel', items: [{ label: 'Email', on: true }, { label: 'Calls', on: true }, { label: 'Tasks', on: true }] },
          { label: 'Status', items: [{ label: 'Unread', on: true }, { label: 'Replied', on: true }, { label: 'Archived', on: false }] },
          { label: 'Sentiment', items: [{ label: 'Positive', on: true }, { label: 'Neutral', on: true }, { label: 'Negative', on: false }] },
          { label: 'Owner', items: [{ label: 'Sarah W.', on: true }, { label: 'Whole team', on: false }] },
        ]}
        rows={[
          { slug: 'nike', title: 'Dana Whitfield', sub: 'Happy to take a look — what does onboarding involve?' },
          { slug: 'peloton', title: 'Marcus Hale', sub: 'Not right now, circle back next quarter.' },
          { slug: 'etsy', title: 'Alex Turner', sub: 'Call scheduled · 2:30 PM' },
          { slug: 'sonos', title: 'Priya Raman', sub: 'Task due · send the one-pager' },
          { slug: 'bose', title: 'Ivy Chen', sub: 'Who else should be on the call?' },
          { slug: 'target', title: 'Jordan Blake', sub: 'Forwarded to our head of ops.' },
        ]}
        chips={[
          { label: '3 new replies', solid: true, Icon: MessageSquare },
          { label: 'One thread per prospect', Icon: Radar },
        ]}
      />
    ),
  },
];

function Copy() {
  return (
    <>
      <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ember-500">Execution</p>
      <h2 className="mt-4 max-w-[820px] text-[clamp(27px,3.2vw,42px)] font-semibold leading-[1.09] tracking-[-0.025em] text-slate-900 dark:text-white">
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

      <h3 className="font-bricolage text-[30px] font-bold leading-[1.12] tracking-[-0.025em] text-slate-900 dark:text-white sm:text-[38px]">
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
