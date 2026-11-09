'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Shield, FileText, RefreshCcw, AlertTriangle, Cookie, MapPin, Mail, Phone, ShieldCheck, FileLock2, Network } from 'lucide-react';

const ICONS: Record<string, React.ReactNode> = {
  privacy: <Shield size={18} />,
  terms: <FileText size={18} />,
  refund: <RefreshCcw size={18} />,
  'acceptable-use': <AlertTriangle size={18} />,
  cookies: <Cookie size={18} />,
  'privacy-choices': <ShieldCheck size={18} />,
  dpa: <FileLock2 size={18} />,
  subprocessors: <Network size={18} />,
};

export default function LegalPageLayout({
  type,
  title,
  lastUpdated,
  effectiveDate,
  entity,
  intro,
  children,
}: {
  type: string;
  title: string;
  lastUpdated: string;
  effectiveDate?: string;
  entity?: string;
  intro?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    // Legal pages are always dark (like /pricing, /contact, /blog): the `dark` class here switches
    // every dark: variant below (Navbar, sections, tables, footer) regardless of the site theme toggle.
    <div className="dark min-h-screen bg-slate-950 text-white [color-scheme:dark]">
      <Navbar alwaysDark />
      <div>
        {/* Hero */}
        <div className="relative overflow-hidden border-b border-slate-200 bg-slate-50 dark:border-white/[0.08] dark:bg-transparent">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(35,34,32,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(35,34,32,0.045)_1px,transparent_1px)] bg-[size:56px_56px]
                       [mask-image:radial-gradient(60%_70%_at_50%_20%,#000,transparent)]
                       dark:bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)]"
          />
          {/* Decorative gradient orbs */}
          <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-ember-500/10 dark:bg-ember-500/20 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-[-80px] right-[-100px] w-[300px] h-[300px] rounded-full bg-ember-500/5 dark:bg-ember-500/10 blur-[100px] pointer-events-none" />

          <div className="relative max-w-4xl mx-auto px-6 pt-32 pb-16 text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ember-50/80 dark:bg-ember-500/10 border border-ember-200 dark:border-ember-500/30 text-[13px] font-semibold text-ember-600 dark:text-ember-400 mb-6">
              {ICONS[type] || <FileText size={18} />}
              <span>Legal Document</span>
            </div>

            <h1 className="font-instrument font-semibold text-4xl sm:text-5xl text-slate-900 dark:text-white tracking-tight mb-4">
              {title}
            </h1>
            <p className="text-[15px] text-slate-400 dark:text-slate-400 font-medium">
              {effectiveDate && <>Effective: {effectiveDate}<span className="mx-2" aria-hidden="true">·</span></>}
              Last updated: {lastUpdated}
            </p>
            {entity && (
              <p className="mt-2 text-[13px] text-slate-400 dark:text-slate-500">
                Legal entity: <span className="font-medium text-slate-600 dark:text-white/70">{entity}</span>
              </p>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-6 pt-10 pb-24">
          <div className="space-y-6">
            {intro && (
              <p className="text-[16px] leading-relaxed text-slate-600 dark:text-slate-300">{intro}</p>
            )}
            {children}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-[#0F0E0C] border border-slate-200 dark:border-white/[0.08] rounded-2xl p-6 sm:p-8 shadow-sm dark:shadow-[0_4px_40px_rgba(0,0,0,0.35)]">
      <h2 className="font-instrument font-semibold text-[18px] sm:text-[20px] text-slate-900 dark:text-white mb-4">{title}</h2>
      <div className="text-[15px] text-slate-600 dark:text-slate-300 leading-relaxed space-y-3">
        {children}
      </div>
    </div>
  );
}

export function LegalSubsection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="pt-2">
      <h3 className="text-[15px] font-semibold text-slate-900 dark:text-white mb-1.5">{title}</h3>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

export function LegalList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 mt-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-ember-500 dark:bg-ember-400 mt-2 flex-shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Two-column label → description table (DPA processing details, subprocessor list). */
export function LegalTable({ rows, head }: { rows: { label: string; value: string }[]; head?: [string, string] }) {
  return (
    <div className="mt-2 overflow-hidden rounded-xl border border-slate-200 dark:border-white/[0.08]">
      <table className="w-full text-left text-[14px]">
        {head && (
          <thead className="hidden bg-slate-50 dark:bg-white/[0.04] sm:table-header-group">
            <tr>
              {head.map((h) => (
                <th
                  key={h}
                  scope="col"
                  className="px-4 py-3 text-[12px] font-semibold uppercase tracking-[0.08em] text-slate-500 dark:text-slate-400"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody className="divide-y divide-slate-200 dark:divide-white/[0.06]">
          {rows.map((r) => (
            <tr key={r.label} className="flex flex-col sm:table-row">
              <th
                scope="row"
                className="px-4 pt-3 align-top font-semibold text-slate-900 dark:text-white sm:w-[34%] sm:bg-slate-50/60 sm:py-3 sm:dark:bg-white/[0.02]"
              >
                {r.label}
              </th>
              <td className="px-4 pb-3 pt-1 align-top text-slate-600 dark:text-slate-300 sm:py-3">{r.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function LegalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className="text-ember-500 hover:text-ember-400 dark:text-ember-300 dark:hover:text-ember-200 underline underline-offset-2 transition-colors">
      {children}
    </a>
  );
}

export function LegalContact() {
  const row = 'flex items-center gap-3 text-ember-500 hover:text-ember-400 dark:text-ember-300 dark:hover:text-ember-200 transition-colors font-medium';
  const chip = 'w-9 h-9 rounded-lg bg-ember-500/10 dark:bg-ember-500/15 flex items-center justify-center flex-shrink-0';
  return (
    <div className="bg-gradient-to-br from-ember-500/5 to-ember-500/[0.02] dark:from-ember-500/10 dark:to-ember-500/5 border border-ember-500/15 dark:border-ember-500/20 rounded-2xl p-6 sm:p-8">
      <h2 className="font-instrument font-semibold text-[18px] sm:text-[20px] text-slate-900 dark:text-white mb-4">Contact</h2>
      <div className="text-[15px] text-slate-600 dark:text-slate-300 leading-relaxed">
        <p className="font-semibold text-slate-900 dark:text-white">Thyleads Private Limited, operating Harvin.ai</p>
        <div className="mt-4 space-y-2">
          <div className="flex items-start gap-3">
            <div className={`${chip} text-ember-500 dark:text-ember-300`}><MapPin size={16} aria-hidden="true" /></div>
            <address className="not-italic pt-1.5">
              #164, 1st Cross, 1st Main Road, AECS Layout, Hebbal, Bengaluru, Karnataka 560094, India
            </address>
          </div>
          <a href="mailto:admin@harvin.ai" className={row}>
            <div className={chip}><Mail size={16} aria-hidden="true" /></div>
            admin@harvin.ai
          </a>
          <a href="tel:+918769673818" className={row}>
            <div className={chip}><Phone size={16} aria-hidden="true" /></div>
            +91 8769673818
          </a>
        </div>
      </div>
    </div>
  );
}
