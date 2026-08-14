'use client';

import { useEffect, useRef, useState } from 'react';
import {
  Building2, Check, Clock, Gauge, Layers, MapPin, TrendingUp, UserRound, Users, Zap,
} from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';

/* ── Scroll fade-in hook ─────────────────────────────────────────────────── */
function useFadeIn(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ── Account record card ─────────────────────────────────────────────────
   Built in markup rather than shipped as an image: it stays sharp at any
   width, themes with the rest of the site, and the fields can be edited
   without round-tripping through a design file.
   ─────────────────────────────────────────────────────────────────────── */

/**
 * A real account, using a real logo from /public/logos.
 *
 * The first four rows are public facts about the company; the rest are Harvin's
 * own computed outputs (score, signal counts, recency) and are illustrative.
 * VERIFY the factual four before shipping — they describe a third party and go
 * stale as the company raises and grows.
 */
const ACCOUNT_FIELDS: {
  Icon: typeof Building2;
  label: string;
  value: string;
  badge?: boolean;
}[] = [
  { Icon: Building2,  label: 'Industry',        value: 'MarTech · Engagement' },
  { Icon: Users,      label: 'Employees',       value: '1,000+' },
  { Icon: MapPin,     label: 'Headquarters',    value: 'Mountain View, US' },
  { Icon: TrendingUp, label: 'Funding',         value: 'Series D · $105M' },
  { Icon: Layers,     label: 'Tech stack',      value: '68', badge: true },
  { Icon: Zap,        label: 'Buying signals',  value: '3', badge: true },
  { Icon: Gauge,      label: 'Harvin score',    value: '92 / 100' },
  { Icon: UserRound,  label: 'Decision makers', value: '14', badge: true },
  { Icon: Clock,      label: 'Last signal',     value: '2 days ago' },
];

/** Dimmed record peeking out behind the front card — depth without repeating
 *  readable content, which would just compete with the card in focus. */
function GhostCard() {
  return (
    <div
      aria-hidden="true"
      className="absolute bottom-5 left-4 top-16 w-[58%] overflow-hidden rounded-2xl border border-slate-200/70 bg-sand-50/60
                 dark:border-white/[0.06] dark:bg-white/[0.03]"
    >
      <div className="flex items-center gap-3 px-4 pb-4 pt-4">
        <span className="h-9 w-9 flex-shrink-0 rounded-lg bg-slate-200/70 dark:bg-white/[0.07]" />
        <span className="h-2.5 w-20 rounded-full bg-slate-200/70 dark:bg-white/[0.07]" />
      </div>
      {ACCOUNT_FIELDS.slice(0, 8).map((f, i) => (
        <div key={i} className="flex items-center gap-3 px-4 py-[9px]">
          <span className="grid h-7 w-7 flex-shrink-0 place-items-center rounded-md bg-slate-100 dark:bg-white/[0.05]">
            <f.Icon size={13} className="text-slate-300 dark:text-white/20" strokeWidth={1.8} />
          </span>
          <span className="h-2 flex-1 rounded-full bg-slate-200/60 dark:bg-white/[0.05]" />
        </div>
      ))}
    </div>
  );
}

function AccountRecordVisual() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-sand-200 p-4 dark:bg-[#141210] sm:p-5">
      <GhostCard />

      <div
        className="relative ml-[12%] overflow-hidden rounded-2xl border border-slate-200/80 bg-sand-50
                   shadow-[0_18px_44px_rgba(15,23,42,0.14)]
                   dark:border-white/[0.08] dark:bg-[#16130F] dark:shadow-[0_18px_44px_rgba(0,0,0,0.5)]"
      >
        {/* Header — the account, standing in for the reference's person */}
        <div className="flex items-center gap-3 border-b border-slate-200/70 bg-sand-100/70 px-4 py-3.5 dark:border-white/[0.06] dark:bg-white/[0.03]">
          {/* Real mark, on a white tile so the brand colours read correctly in
              both themes — the trusted strip inverts this same file to white,
              which would be wrong on a light card. */}
          <span className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-xl border border-slate-200/80 bg-white p-1.5 dark:border-white/10">
            <img src="/logos/clevertap.svg" alt="CleverTap" className="h-auto w-full object-contain" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-[15px] font-bold tracking-[-0.01em] text-slate-900 dark:text-white">
              CleverTap
            </p>
            <p className="truncate text-[12.5px] text-slate-500 dark:text-slate-400">clevertap.com · High priority</p>
          </div>
        </div>

        <div className="px-4 py-1.5">
          {ACCOUNT_FIELDS.map((f) => (
            <div key={f.label} className="flex items-center gap-3 py-[7px]">
              <span className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-lg bg-sand-100 dark:bg-white/[0.05]">
                <f.Icon size={15} className="text-slate-500 dark:text-slate-400" strokeWidth={1.8} />
              </span>
              <span className="min-w-0 flex-1 truncate text-[13.5px] text-slate-700 dark:text-slate-300">
                {f.label}
              </span>
              {f.badge ? (
                <span className="flex-shrink-0 rounded-full bg-ember-50 px-2 py-0.5 text-[12px] font-semibold text-ember-600 dark:bg-ember-500/15 dark:text-ember-300">
                  {f.value}
                </span>
              ) : (
                <span className="flex-shrink-0 text-[13.5px] font-medium text-slate-900 dark:text-white">
                  {f.value}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Module data ─────────────────────────────────────────────────────────── */
type Module = {
  title: string;
  desc: string;
  details: string[];
  stat: string;
  statLabel: string;
  screenshot: string;
  screenshotDark: string;
  /** Rendered instead of the screenshot when present. */
  Visual?: () => React.JSX.Element;
};

const MODULES: Module[] = [
  {
    title: 'Account Intelligence',
    Visual: AccountRecordVisual,
    desc: 'Every account is a living intelligence entity. Search and filter your account universe by geography, category, employee size, funding stage, business motion, or priority score.',
    details: ['Living intelligence per account', 'Multi-dimension filters', 'Dynamic priority score'],
    stat: 'Live',
    statLabel: 'scoring',
    screenshot: '/dashboard-preview.png',
    screenshotDark: '/dashboard-preview-dark.png',
  },
  {
    title: 'AI Signal Detection',
    desc: 'Score accounts from live signals — funding, hiring, scaling & expansion, M&A and layoffs. Every score is backed by evidence so you know exactly why an account is hot.',
    details: ['Funding · Hiring · Scaling', 'M&A · Firing', 'Evidence for every signal'],
    stat: '5',
    statLabel: 'signal types',
    screenshot: '/tech-scanner.png',
    screenshotDark: '/tech-scanner-dark.png',
  },
  {
    title: 'Watchlists',
    desc: 'Group accounts into shortlists — recently funded, greenfield targets, competitor customers. Get alerted the second something changes.',
    details: ['Filters, manual, or CSV import', 'Slack & email alerts', 'Aggregate trends per list'],
    stat: 'Real-time',
    statLabel: 'alerts',
    screenshot: '/Watchlist.png',
    screenshotDark: '/Watchlist-dark.png',
  },
  {
    title: 'Look-a-like Accounts',
    desc: 'Find accounts similar to your best customers. Enter a domain and discover lookalike companies by category, signals, scale, and region.',
    details: ['AI-powered matching', 'Category & signal overlap', 'Scale-aware suggestions'],
    stat: 'Smart',
    statLabel: 'matching',
    screenshot: '/Look-a-Like.png',
    screenshotDark: '/Look-a-Like-dark.png',
  },
];

export default function Platform() {
  const header = useFadeIn();
  const { isDark } = useTheme();

  return (
    <section className="relative py-28 bg-sand-100 dark:bg-slate-950 border-t border-slate-200 dark:border-white/[0.06] overflow-hidden">

      {/* ── Header ─────────────────────────────────────────────────── */}
      <div
        ref={header.ref}
        className={`px-6 pb-20 transition-all duration-700 ${header.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      >
        <div className="max-w-[720px] mx-auto text-center">
          <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500 mb-5">
            The Platform
          </p>
          <h2 className="text-[clamp(28px,4.2vw,48px)] font-semibold leading-[1.08] tracking-[-0.025em] text-slate-900 dark:text-white mb-4">
            What&rsquo;s inside
          </h2>
          <p className="text-[16px] leading-relaxed text-slate-500 dark:text-slate-400 max-w-[480px] mx-auto">
            Four modules. One platform. Built for GTM teams running intelligence-led outbound.
          </p>
        </div>
      </div>

      {/* ── Modules ──────────────────────────────────────────────── */}
      <div className="max-w-[1100px] mx-auto px-6">
        {MODULES.map((mod, i) => (
          <ModuleRow key={mod.title} mod={mod} index={i} flipped={i % 2 !== 0} isDark={isDark} />
        ))}
      </div>
    </section>
  );
}

/* ── Single module row — alternates text left / screenshot right ──────── */
function ModuleRow({ mod, index, flipped, isDark }: {
  mod: typeof MODULES[number];
  index: number;
  flipped: boolean;
  isDark: boolean;
}) {
  const row = useFadeIn(0.15);

  return (
    <div
      ref={row.ref}
      className={`flex flex-col ${flipped ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-10 md:gap-12 lg:gap-16 mb-14 sm:mb-18 lg:mb-24 last:mb-0
                   transition-all duration-700 ${row.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* ── Text side ── */}
      <div className="min-w-0 max-w-lg flex-1">
        {/* Index, rule and stat on one line — the old oversized ghost numeral
            competed with the heading for first read. */}
        <div className="mb-5 flex items-center gap-3.5">
          <span className="font-mono text-[12px] font-semibold tracking-[0.16em] text-ember-500">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span aria-hidden="true" className="h-px flex-1 bg-slate-200 dark:bg-white/[0.10]" />
          <span
            className="flex-shrink-0 rounded-full border border-slate-200 bg-sand-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500
                       dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-slate-400"
          >
            {mod.stat} {mod.statLabel}
          </span>
        </div>

        {/* Display face + tighter tracking: at this size the body sans reads
            flat, and negative tracking is what stops large type looking loose. */}
        <h3 className="font-bricolage text-[27px] font-bold leading-[1.1] tracking-[-0.025em] text-slate-900 dark:text-white sm:text-[33px]">
          {mod.title}
        </h3>

        <p className="mt-4 text-[16px] leading-[1.65] text-slate-600 dark:text-slate-400">
          {mod.desc}
        </p>

        {/* Checklist reads as substance; the old pills read as tags. */}
        <ul className="mt-6 flex flex-col gap-2.5">
          {mod.details.map((d) => (
            <li key={d} className="flex items-start gap-2.5">
              <span className="mt-[3px] grid h-[17px] w-[17px] flex-shrink-0 place-items-center rounded-full bg-ember-50 dark:bg-ember-500/15">
                <Check size={11} className="text-ember-600 dark:text-ember-300" strokeWidth={3} />
              </span>
              <span className="text-[14.5px] leading-[1.5] text-slate-700 dark:text-slate-300">{d}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* ── Visual side — a built component when the module supplies one,
             otherwise the screenshot pair ── */}
      <div className="flex-1 min-w-0 w-full md:max-w-[440px] lg:max-w-[520px]">
        {mod.Visual ? (
          <mod.Visual />
        ) : (
          <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-white/[0.08] shadow-[0_8px_40px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.3)] bg-sand-100 dark:bg-white/[0.02]">
            <img
              src={isDark ? mod.screenshotDark : mod.screenshot}
              alt={`${mod.title} — HarvinAI`}
              className="w-full h-auto block"
              loading="lazy"
            />
          </div>
        )}
      </div>
    </div>
  );
}
