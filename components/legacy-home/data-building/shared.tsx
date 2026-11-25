'use client';

import { useEffect, useRef, useState } from 'react';

/*
 * Small building blocks shared by the Data Building sections. Everything here
 * is drawn in markup (no screenshots), so it stays sharp at any size and
 * themes with the page. Examples use real company logos (never client logos) with roles only.
 */

/** Fit donut. `value` animates from 0 when `run` turns true. */
export function FitRing({
  value,
  run = true,
  size = 40,
  stroke = 3.5,
  label = true,
  className = '',
  numberClass = 'text-[12px]',
}: {
  value: number;
  run?: boolean;
  size?: number;
  stroke?: number;
  label?: boolean;
  className?: string;
  numberClass?: string;
}) {
  const r = (size - stroke) / 2 - 1;
  const c = 2 * Math.PI * r;
  const shown = run ? value : 0;
  return (
    <span
      className={`relative grid flex-shrink-0 place-items-center ${className}`}
      style={{ width: size, height: size }}
      aria-label={`Company Fit ${value}`}
    >
      <svg viewBox={`0 0 ${size} ${size}`} className="absolute inset-0 h-full w-full -rotate-90" aria-hidden="true">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth={stroke} className="stroke-slate-200 dark:stroke-white/[0.1]" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          className="stroke-ember-500 transition-[stroke-dashoffset] duration-[1400ms] ease-out"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - shown / 100)}
        />
      </svg>
      {label && (
        <span className={`relative font-bold tabular-nums text-slate-900 dark:text-white ${numberClass}`}>
          <Count to={value} run={run} />
        </span>
      )}
    </span>
  );
}

/** Counts 0 → `to` once `run` turns true (instantly under reduced motion). */
export function Count({ to, run, ms = 1100, format = (n: number) => String(n) }: { to: number; run: boolean; ms?: number; format?: (n: number) => string }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setN(to);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / ms);
      setN(Math.round(to * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, run, ms]);
  return <>{format(n)}</>;
}

/** Fades and lifts its children in the first time they scroll into view. */
export function Rise({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${shown ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/** A product window: title bar with traffic-light dots, then the body. */
export function Window({
  title,
  right,
  children,
  className = '',
}: {
  title: React.ReactNode;
  right?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.10)]
                  dark:border-white/[0.08] dark:bg-[#0E0D0B] dark:shadow-[0_24px_60px_rgba(0,0,0,0.55)] ${className}`}
    >
      <div className="flex items-center gap-3 border-b border-slate-200/80 bg-sand-50 px-4 py-2.5 dark:border-white/[0.06] dark:bg-white/[0.02]">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-slate-200 dark:bg-white/[0.12]" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-200 dark:bg-white/[0.12]" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-200 dark:bg-white/[0.12]" />
        </span>
        <span className="min-w-0 flex-1 truncate text-[12.5px] font-semibold text-slate-700 dark:text-slate-300">{title}</span>
        {right}
      </div>
      {children}
    </div>
  );
}

/** Small rounded label. */
export function Tag({ children, tone = 'plain', className = '' }: { children: React.ReactNode; tone?: 'plain' | 'ember' | 'struck' | 'green'; className?: string }) {
  const tones = {
    plain: 'border-slate-200 bg-white text-slate-700 dark:border-white/[0.1] dark:bg-white/[0.03] dark:text-slate-300',
    ember: 'border-ember-200 bg-ember-50 text-ember-700 dark:border-ember-500/30 dark:bg-ember-500/10 dark:text-ember-300',
    struck: 'border-slate-200 bg-transparent text-slate-400 line-through decoration-slate-400 dark:border-white/[0.08] dark:text-slate-500',
    green: 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/25 dark:bg-emerald-500/10 dark:text-emerald-300',
  };
  return (
    <span className={`inline-flex items-center gap-1 whitespace-nowrap rounded-md border px-2 py-0.5 text-[12px] font-medium ${tones[tone]} ${className}`}>
      {children}
    </span>
  );
}

/*
 * Logo marks for the fictional companies used in the page's examples. Each is
 * a simple glyph on its own brand colour, so rows read like a real product
 * list. Unknown names fall back to initials.
 */
const W = '#fff';
const LOGOS: Record<string, { bg: string; mark: React.ReactNode }> = {
  'Vela Commerce': {
    bg: 'linear-gradient(140deg,#3B6BF0,#1E3FB8)',
    mark: <><path d="M11.2 4.5v13H5.2z" fill={W} /><path d="M12.8 7.5l6 10h-6z" fill={W} opacity=".75" /><path d="M4.5 19h15" stroke={W} strokeWidth="1.6" strokeLinecap="round" /></>,
  },
  Tripwise: {
    bg: 'linear-gradient(140deg,#16B981,#0B7F5A)',
    mark: <><path d="M3.5 11.6L20 4.5l-6.6 15.4-2.3-6.4z" fill={W} /><path d="M11.1 13.5L20 4.5" stroke="#0B7F5A" strokeWidth="1.2" /></>,
  },
  'Orbit Learn': {
    bg: 'linear-gradient(140deg,#8B5CF6,#5B2BC4)',
    mark: <><circle cx="12" cy="12" r="3.4" fill={W} /><ellipse cx="12" cy="12" rx="9" ry="4" stroke={W} strokeWidth="1.6" fill="none" transform="rotate(-28 12 12)" /></>,
  },
  'Nomad Stays': {
    bg: 'linear-gradient(140deg,#F59E0B,#B45309)',
    mark: <><path d="M12 4.5l8.5 14h-17z" fill={W} /><path d="M12 11l2.6 7.5H9.4z" fill="#B45309" /></>,
  },
  'Lumen Pay': {
    bg: 'linear-gradient(140deg,#F43F5E,#BE123C)',
    mark: <><circle cx="12" cy="12" r="4" fill={W} />{[0, 45, 90, 135, 180, 225, 270, 315].map((a) => <path key={a} d="M12 3.2v2.6" stroke={W} strokeWidth="1.7" strokeLinecap="round" transform={`rotate(${a} 12 12)`} />)}</>,
  },
  CornerMart: {
    bg: 'linear-gradient(140deg,#64748B,#334155)',
    mark: <><path d="M5.5 5.5h9v3.2H8.7v9.8H5.5z" fill={W} /><rect x="11" y="11" width="7.5" height="7.5" rx="1.2" fill={W} opacity=".7" /></>,
  },
  'Mosaic Market': {
    bg: 'linear-gradient(140deg,#06B6D4,#0E7490)',
    mark: <><rect x="4.5" y="4.5" width="6.5" height="6.5" rx="1.4" fill={W} /><circle cx="16.25" cy="7.75" r="3.25" fill={W} opacity=".75" /><rect x="4.5" y="13" width="6.5" height="6.5" rx="1.4" fill={W} opacity=".75" /><rect x="13" y="13" width="6.5" height="6.5" rx="3.25" fill={W} /></>,
  },
  'Kite Learn': {
    bg: 'linear-gradient(140deg,#FB923C,#C2410C)',
    mark: <><path d="M12 3l6 7.5-6 10.5-6-10.5z" fill={W} /><path d="M6 10.5h12M12 3v18" stroke="#C2410C" strokeWidth="1.1" /></>,
  },
  'Brightpath Learning': {
    bg: 'linear-gradient(140deg,#EAB308,#A16207)',
    mark: <><path d="M4 18.5c6 0 7-3.5 8-7s2.5-6 8-6" stroke={W} strokeWidth="2.2" fill="none" strokeLinecap="round" /><circle cx="19.5" cy="5.5" r="2.2" fill={W} /></>,
  },
  Kitecart: {
    bg: 'linear-gradient(140deg,#A855F7,#7E22CE)',
    mark: <><path d="M5.5 9h13l-1.2 10.5H6.7z" fill={W} /><path d="M9 9V7.5a3 3 0 016 0V9" stroke={W} strokeWidth="1.7" fill="none" /></>,
  },
  'Lumora Health': {
    bg: 'linear-gradient(140deg,#10B981,#047857)',
    mark: <path d="M10 4.5h4v5.5h5.5v4H14v5.5h-4V14H4.5v-4H10z" fill={W} rx="1" />,
  },
  'Atlas Digital': {
    bg: 'linear-gradient(140deg,#14B8A6,#0F766E)',
    mark: <><circle cx="12" cy="12" r="7.5" stroke={W} strokeWidth="1.7" fill="none" /><ellipse cx="12" cy="12" rx="3.2" ry="7.5" stroke={W} strokeWidth="1.5" fill="none" /><path d="M4.5 12h15" stroke={W} strokeWidth="1.5" /></>,
  },
  CityClinic: {
    bg: 'linear-gradient(140deg,#38BDF8,#0369A1)',
    mark: <><circle cx="12" cy="12" r="7.5" stroke={W} strokeWidth="1.6" fill="none" /><path d="M10.6 7.5h2.8v3.1h3.1v2.8h-3.1v3.1h-2.8v-3.1H7.5v-2.8h3.1z" fill={W} /></>,
  },
  'Pantry Lane': {
    bg: 'linear-gradient(140deg,#84CC16,#4D7C0F)',
    mark: <><path d="M5 10.5h14l-1.4 8.5H6.4z" fill={W} /><path d="M8.5 10.5c0-3 1.6-5 3.5-5s3.5 2 3.5 5" stroke={W} strokeWidth="1.7" fill="none" /></>,
  },
  'Urban Thread': {
    bg: 'linear-gradient(140deg,#F472B6,#BE185D)',
    mark: <><path d="M8.5 5L4 8l2 3.5 2-1V19h8v-8.5l2 1L20 8l-4.5-3c-.6 1.6-1.9 2.5-3.5 2.5S9.1 6.6 8.5 5z" fill={W} /></>,
  },
  'Northstar Software': {
    bg: 'linear-gradient(140deg,#334155,#0F172A)',
    mark: <path d="M12 2.5l1.9 7.6 7.6 1.9-7.6 1.9-1.9 7.6-1.9-7.6L2.5 12l7.6-1.9z" fill={W} />,
  },
};

/** Company logo tile. Size it with h-/w- classes (default 32px). */
/** Real companies used in the page's illustrative examples → /public/logos file. */
const REAL_LOGOS: Record<string, string> = {
  Etsy: 'etsy.svg', eBay: 'ebay.svg', Twilio: 'twilio.svg', HubSpot: 'hubspot.svg', Mailchimp: 'mailchimp.svg',
  Instacart: 'instacart.svg', Gusto: 'gusto.svg', DoorDash: 'doordash.svg', Walmart: 'walmart.svg', Starbucks: 'starbucks.svg', Target: 'target.svg', Ford: 'ford.svg',
};

export function CompanyLogo({ name, className = '', style }: { name: string; className?: string; style?: React.CSSProperties }) {
  const real = REAL_LOGOS[name];
  if (real) {
    return (
      <span
        className={`grid h-8 w-8 flex-shrink-0 place-items-center overflow-hidden rounded-lg bg-white p-[3px] shadow-[inset_0_0_0_1px_rgba(15,23,42,0.08)] ${className}`}
        style={style}
      >
        <img src={`/logos/${real}`} alt={`${name} logo`} className="h-full w-full object-contain" />
      </span>
    );
  }
  const logo = LOGOS[name];
  if (!logo) {
    const initials = name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();
    return (
      <span
        className={`grid h-8 w-8 flex-shrink-0 place-items-center rounded-lg border border-slate-200 bg-sand-50 text-[11px] font-bold text-slate-600
                    dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300 ${className}`}
        style={style}
      >
        {initials}
      </span>
    );
  }
  return (
    <span
      className={`grid h-8 w-8 flex-shrink-0 place-items-center overflow-hidden rounded-lg shadow-[inset_0_0_0_1px_rgba(255,255,255,0.14)] ${className}`}
      style={{ background: logo.bg, ...style }}
      role="img"
      aria-label={`${name} logo`}
    >
      <svg viewBox="0 0 24 24" className="h-[64%] w-[64%]" aria-hidden="true">{logo.mark}</svg>
    </span>
  );
}

/** Kept for existing call sites: now renders the company's logo. */
export function Monogram({ name, className = '' }: { name: string; className?: string }) {
  return <CompanyLogo name={name} className={className} />;
}

/** Mono uppercase micro-label used inside product mocks. */
export function MicroLabel({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400 dark:text-slate-500 ${className}`}>
      {children}
    </p>
  );
}

/**
 * Theme variables for the product "film" stages (How it works, The problem).
 * Scenes paint with rgb(var(--ink)/a) and var(--panel…) so one set of scenes
 * renders as a light stage in light mode and a dark screen in dark mode.
 */
export const stageVars = (cls: string) => `
  .${cls} { --ink: 28 27 25; --panel: #FFFFFF; --panel2: #FBFAF7; --stage: #EFEADF; --sh: 0.10; }
  .dark .${cls} { --ink: 255 255 255; --panel: #141210; --panel2: #1A1714; --stage: #0A0908; --sh: 0.6; }
`;
