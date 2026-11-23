'use client';

import { useState } from 'react';
import { ArrowRight, Building2, RefreshCw, TrendingUp, UserPlus, Contact, Trash2 } from 'lucide-react';
import { portalUrl } from '@/lib/portal';
import { Accent, Card, Eyebrow, Footnote, Heading, Lead, Section, TextLink } from './ui';

/**
 * "Keep your list current" — targets change; Harvin keeps checking them.
 *
 * Left: this week's tallies and the five kinds of change Harvin watches.
 * Right: the "What changed" feed for your target list. Its tallies double as
 * filters — click one to narrow the feed to that kind of change. Companies and
 * people are fictional.
 */

type Kind = 'company' | 'person' | 'fit' | 'removed';

const TALLIES: { value: string; label: string; kind: Kind }[] = [
  { value: '+34', label: 'New companies', kind: 'company' },
  { value: '+51', label: 'New people', kind: 'person' },
  { value: '12', label: 'Fit changes', kind: 'fit' },
  { value: '7', label: 'Removed', kind: 'removed' },
];

const WATCHES = [
  { name: 'New companies', desc: 'See newly discovered companies that now fit your criteria.', Icon: Building2 },
  { name: 'New decision-makers', desc: 'Find relevant people who joined or moved into target roles.', Icon: UserPlus },
  { name: 'Fit changes', desc: 'See when new information makes a company more or less relevant.', Icon: TrendingUp },
  { name: 'Company changes', desc: 'Track expansion, leadership moves, funding and other useful updates.', Icon: RefreshCw },
  { name: 'Fresh contact data', desc: 'Refresh emails and phone numbers when needed.', Icon: Contact },
];

const FEED: { kind: Kind; label: string; title: string; detail: string }[] = [
  { kind: 'company', label: 'New company', title: 'Vela Commerce', detail: 'Operates across 12 countries' },
  { kind: 'person', label: 'New decision-maker', title: 'Priya Nair, VP Finance', detail: 'Email and phone found' },
  { kind: 'fit', label: 'Fit changed', title: 'Brightpath Learning', detail: 'Expanded into 3 new countries' },
  { kind: 'removed', label: 'No longer fits', title: 'Orbit Retail', detail: 'Store count below your criteria' },
];

export default function KeepCurrent() {
  const [filter, setFilter] = useState<Kind | null>(null);
  const toggle = (k: Kind) => setFilter((f) => (f === k ? null : k));

  return (
    <Section>
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
        {/* ── Left ─────────────────────────────────────────────────────── */}
        <div>
          <Eyebrow>Keep your list current</Eyebrow>
          <Heading>
            Your target companies keep changing. <Accent>Harvin keeps up.</Accent>
          </Heading>
          <Lead>
            New companies appear. Decision-makers change roles. Businesses expand. Priorities shift.
            Harvin keeps checking the companies you care about and helps surface what changed, so your
            team is not working from an outdated list.
          </Lead>

          <p className="mt-7 text-[13px] font-semibold uppercase tracking-[0.12em] text-slate-500 short:mt-5 dark:text-slate-400">
            Stay on top of changes
          </p>
          <ul className="mt-3 flex flex-col">
            {WATCHES.map(({ name, desc, Icon }) => (
              <li key={name} className="flex items-start gap-3 border-t border-slate-200/80 py-2.5 dark:border-white/[0.06] short:py-2">
                <span className="grid h-7 w-7 flex-shrink-0 place-items-center rounded-lg bg-white text-ember-500 ring-1 ring-slate-200 dark:bg-white/[0.04] dark:ring-white/10">
                  <Icon size={14} strokeWidth={2} />
                </span>
                <span>
                  <span className="block text-[14px] font-semibold text-slate-900 dark:text-white">{name}</span>
                  <span className="block text-[13px] leading-[1.45] text-slate-500 dark:text-slate-400">{desc}</span>
                </span>
              </li>
            ))}
          </ul>

          <TextLink href={PORTAL_HREF} className="mt-6">
            Review what changed
          </TextLink>
        </div>

        {/* ── Right: the change feed ──────────────────────────────────── */}
        <div>
          <Card className="overflow-hidden">
            <div className="flex items-end justify-between gap-4 border-b border-slate-200/80 bg-sand-50 px-5 py-4 dark:border-white/[0.06] dark:bg-white/[0.02]">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500">Your target list</p>
                <p className="mt-0.5 text-[19px] font-semibold tracking-[-0.02em] text-slate-900 dark:text-white">What changed</p>
              </div>
              <span className="flex items-center gap-1.5 text-[12px] text-slate-500 dark:text-slate-400">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:animate-none" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                Last checked 7d ago
              </span>
            </div>

            {/* Tallies double as filters */}
            <div className="grid grid-cols-4 border-b border-slate-200/80 dark:border-white/[0.06]" role="group" aria-label="Filter changes">
              {TALLIES.map((t) => {
                const on = filter === t.kind;
                return (
                  <button
                    key={t.kind}
                    type="button"
                    aria-pressed={on}
                    onClick={() => toggle(t.kind)}
                    className={`border-r px-3 py-3 text-left transition-colors last:border-r-0 dark:border-white/[0.06] ${
                      on ? 'bg-ember-50 dark:bg-ember-500/[0.1]' : 'border-slate-200/80 hover:bg-sand-50 dark:hover:bg-white/[0.03]'
                    }`}
                  >
                    <span className={`block text-[22px] font-semibold leading-none tracking-[-0.03em] tabular-nums ${on ? 'text-ember-600 dark:text-ember-400' : 'text-slate-900 dark:text-white'}`}>
                      {t.value}
                    </span>
                    <span className="mt-1 block text-[11.5px] text-slate-500 dark:text-slate-400">{t.label}</span>
                  </button>
                );
              })}
            </div>

            <ul>
              {FEED.map((f) => {
                const hidden = filter !== null && filter !== f.kind;
                return (
                  <li
                    key={f.title}
                    className={`flex items-center justify-between gap-4 border-b border-slate-200/70 px-5 py-3 transition-opacity duration-300 last:border-b-0 dark:border-white/[0.05] ${
                      hidden ? 'opacity-25' : 'opacity-100'
                    }`}
                  >
                    <span className="min-w-0">
                      <span className="block text-[11.5px] text-slate-400 dark:text-slate-500">{f.label}</span>
                      <span className={`block text-[15px] font-semibold tracking-[-0.01em] ${f.kind === 'removed' ? 'text-slate-400 line-through decoration-slate-300 dark:text-slate-500' : 'text-slate-900 dark:text-white'}`}>
                        {f.title}
                      </span>
                      <span className="block text-[13px] text-slate-500 dark:text-slate-400">{f.detail}</span>
                    </span>
                    <FeedBadge kind={f.kind} />
                  </li>
                );
              })}
            </ul>
          </Card>
          <Footnote>Illustrative example. Companies and people are fictional.</Footnote>
        </div>
      </div>
    </Section>
  );
}

/** Changes are reviewed in the app. */
const PORTAL_HREF = portalUrl();

function FeedBadge({ kind }: { kind: Kind }) {
  if (kind === 'company') {
    return (
      <span className="flex flex-shrink-0 items-baseline gap-1.5">
        <span className="text-[20px] font-semibold tabular-nums text-ember-500 dark:text-ember-400">91</span>
        <span className="text-[12px] font-semibold text-ember-600 dark:text-ember-400">Strong fit</span>
      </span>
    );
  }
  if (kind === 'person') {
    return (
      <span className="flex-shrink-0 rounded-full border border-ember-500/50 bg-ember-50 px-2.5 py-0.5 text-[12px] font-semibold text-ember-600 dark:bg-ember-500/10 dark:text-ember-300">
        New
      </span>
    );
  }
  if (kind === 'fit') {
    return (
      <span className="flex flex-shrink-0 items-center gap-1.5 text-[18px] font-semibold tabular-nums">
        <span className="text-slate-400 dark:text-slate-500">72</span>
        <ArrowRight size={15} className="text-ember-500" />
        <span className="text-ember-500 dark:text-ember-400">86</span>
      </span>
    );
  }
  return (
    <span className="flex flex-shrink-0 items-center gap-1 text-[12.5px] text-slate-400 dark:text-slate-500">
      <Trash2 size={13} /> Removed
    </span>
  );
}
