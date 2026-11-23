import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

/*
 * Shared pieces for the homepage's product sections (CompanyProfile onwards),
 * so every section opens and closes the same way: section shell, eyebrow,
 * heading, lead copy and the underlined "Explore …" link.
 */

export function Section({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <section
      className={`border-t border-slate-200 bg-sand-100 px-4 py-16 dark:border-white/[0.06] dark:bg-[#040404] sm:px-6 lg:px-8 lg:py-16 short:py-8 ${className}`}
    >
      <div className="mx-auto max-w-[1180px]">{children}</div>
    </section>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ember-500">{children}</p>;
}

export function Heading({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <h2
      className={`mt-3 text-[clamp(27px,3vw,40px)] font-semibold leading-[1.09] tracking-[-0.025em] text-slate-900 short:text-[34px] dark:text-white ${className}`}
    >
      {children}
    </h2>
  );
}

/** Orange accent for the key phrase of a heading or closing line. */
export function Accent({ children }: { children: React.ReactNode }) {
  return <span className="text-ember-500 dark:text-ember-400">{children}</span>;
}

export function Lead({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <p
      className={`mt-4 max-w-[560px] text-[15.5px] leading-[1.65] text-slate-600 short:text-[14.5px] short:leading-[1.55] dark:text-slate-400 ${className}`}
    >
      {children}
    </p>
  );
}

export function TextLink({ href, children, className = '' }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 text-[14.5px] font-semibold text-slate-900 underline decoration-slate-300 underline-offset-[6px] transition-colors hover:text-ember-600 hover:decoration-ember-500 dark:text-white dark:decoration-white/25 dark:hover:text-ember-400 ${className}`}
    >
      {children}
      <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}

/** White card on the sand page (near-black in dark mode). */
export function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-2xl border border-slate-200 bg-white shadow-[0_18px_44px_rgba(15,23,42,0.06)] dark:border-white/[0.08] dark:bg-[#0E0D0B] dark:shadow-[0_18px_44px_rgba(0,0,0,0.45)] ${className}`}
    >
      {children}
    </div>
  );
}

/** "Illustrative example" footnote that sits under example visuals. */
export function Footnote({ children }: { children: React.ReactNode }) {
  return <p className="mt-3 text-[12px] text-slate-400 dark:text-slate-500">{children}</p>;
}
