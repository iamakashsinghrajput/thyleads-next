'use client';

import { Check, Mail, Phone, X } from 'lucide-react';
import { Accent, Card, Eyebrow, Footnote, Heading, Lead, Section, TextLink } from './ui';
import { useReveal } from './useReveal';

/**
 * "Decision-makers & contacts", part two (follows PeopleSearch): once the right
 * person is matched, Harvin finds how to reach them.
 *
 * Right: Priya Nair's contact card. Her work email is looked up source by
 * source when the card scrolls into view — A and B miss, C finds it, the rest
 * aren't needed — which is the point of "charged only when found". Person and
 * company are fictional; the phone number is masked.
 */

const SOURCES = [
  { name: 'Source A', found: false },
  { name: 'Source B', found: false },
  { name: 'Source C', found: true },
];

const CHANNELS = [
  { name: 'Work email', Icon: Mail },
  { name: 'Direct or mobile phone number', Icon: Phone },
];

export default function ContactDetails() {
  // Steps: A checked, B checked, C found (email shows), phone shows.
  const { ref, step } = useReveal<HTMLDivElement>(4, 600, 300);
  const emailFound = step >= 3;
  const phoneFound = step >= 4;

  return (
    <Section>
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
        {/* ── Left ─────────────────────────────────────────────────────── */}
        <div>
          <Eyebrow>People Search</Eyebrow>
          <Heading>
            Then find their <Accent>contact details.</Accent>
          </Heading>
          <Lead>Once the right person is matched, Harvin finds their:</Lead>

          <ul className="mt-6 flex flex-col gap-3">
            {CHANNELS.map(({ name, Icon }) => (
              <li key={name} className="flex items-center gap-3.5 rounded-xl border border-slate-200 bg-white px-4 py-3 dark:border-white/[0.08] dark:bg-white/[0.02]">
                <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-lg bg-ember-50 text-ember-500 dark:bg-ember-500/10 dark:text-ember-400">
                  <Icon size={16} strokeWidth={2} />
                </span>
                <span className="text-[15px] font-semibold text-slate-900 dark:text-white">{name}</span>
              </li>
            ))}
          </ul>

          <p className="mt-5 flex items-start gap-2 text-[14px] leading-[1.55] text-slate-600 dark:text-slate-400">
            <Check size={15} strokeWidth={2.4} className="mt-[3px] flex-shrink-0 text-ember-500" />
            Contact details are searched across multiple sources and charged only when found.
          </p>

          <TextLink href="/data-building#decision-makers" className="mt-6">
            Explore People Search
          </TextLink>
        </div>

        {/* ── Right: the contact card ─────────────────────────────────── */}
        <div ref={ref}>
          <div className="rounded-2xl bg-sand-200 p-4 dark:bg-[#141210] sm:p-6">
          <Card className="p-5 sm:p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400 dark:text-slate-500">Decision-maker</p>
            <div className="mt-3 flex items-center gap-4">
              <span className="grid h-14 w-14 flex-shrink-0 place-items-center rounded-full bg-ember-500/[0.14] text-[17px] font-bold text-ember-600 dark:text-ember-300">
                PN
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[20px] font-semibold tracking-[-0.02em] text-slate-900 dark:text-white">Priya Nair</p>
                <p className="text-[13.5px] text-slate-500 dark:text-slate-400">VP Finance · Vela Commerce</p>
              </div>
              <span className="hidden rounded-full border border-ember-500/50 bg-ember-50 px-2.5 py-0.5 text-[12px] font-semibold text-ember-600 dark:bg-ember-500/10 dark:text-ember-300 sm:inline-flex">
                Buyer · priority 2
              </span>
            </div>

            {/* Work email: source-by-source lookup */}
            <div className="mt-5 border-t border-slate-200/80 pt-4 dark:border-white/[0.06]">
              <div className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 text-[13px] text-slate-500 dark:text-slate-400">
                  <Mail size={14} /> Work email
                </span>
                <span className={`text-[14.5px] font-semibold transition-opacity duration-500 ${emailFound ? 'opacity-100 text-slate-900 dark:text-white' : 'opacity-40 text-slate-400'}`}>
                  {emailFound ? 'priya@velacommerce.co' : 'Searching…'}
                </span>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {SOURCES.map((s, i) => {
                  const checked = step > i;
                  return (
                    <span
                      key={s.name}
                      className={`inline-flex items-center gap-1 rounded-md border px-2 py-1 text-[12px] font-medium transition-colors duration-300 ${
                        !checked
                          ? 'border-slate-200 text-slate-300 dark:border-white/[0.08] dark:text-slate-600'
                          : s.found
                            ? 'border-ember-500/60 bg-ember-50 text-ember-600 dark:bg-ember-500/10 dark:text-ember-300'
                            : 'border-slate-200 text-slate-500 dark:border-white/[0.1] dark:text-slate-400'
                      }`}
                    >
                      {checked && (s.found ? <Check size={11} strokeWidth={2.8} /> : <X size={11} strokeWidth={2.6} />)}
                      {s.name}: {checked ? (s.found ? 'found' : 'no match') : 'waiting'}
                    </span>
                  );
                })}
                <span
                  className={`inline-flex items-center rounded-md border border-dashed px-2 py-1 text-[12px] transition-colors duration-300 ${
                    emailFound ? 'border-slate-300 text-slate-500 dark:border-white/15 dark:text-slate-400' : 'border-slate-200 text-slate-300 dark:border-white/[0.08] dark:text-slate-600'
                  }`}
                >
                  More sources: not needed
                </span>
              </div>
            </div>

            {/* Phone */}
            <div className="mt-4 flex items-center justify-between gap-3 border-t border-slate-200/80 pt-4 dark:border-white/[0.06]">
              <span className="flex items-center gap-2 text-[13px] text-slate-500 dark:text-slate-400">
                <Phone size={14} /> Direct or mobile
              </span>
              <span className={`text-[14.5px] font-semibold tabular-nums transition-opacity duration-500 ${phoneFound ? 'opacity-100 text-slate-900 dark:text-white' : 'opacity-40 text-slate-400'}`}>
                {phoneFound ? '+65 9XXX X412' : 'Searching…'}
              </span>
            </div>

            <div className={`mt-4 flex items-center justify-between rounded-lg px-3 py-2 transition-colors duration-500 ${phoneFound ? 'bg-emerald-50 dark:bg-emerald-500/10' : 'bg-sand-50 dark:bg-white/[0.03]'}`}>
              <span className={`text-[12.5px] ${phoneFound ? 'text-emerald-700 dark:text-emerald-300' : 'text-slate-500 dark:text-slate-400'}`}>
                {phoneFound ? 'Both found — charged only because they were found' : 'Nothing charged until found'}
              </span>
              {phoneFound && <Check size={14} strokeWidth={2.6} className="text-emerald-600 dark:text-emerald-400" />}
            </div>
          </Card>
          </div>
          <Footnote>Illustrative example. Person and company are fictional.</Footnote>
        </div>
      </div>
    </Section>
  );
}
