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
        {/* Hero — left-aligned, a thin rule below instead of a box */}
        <div className="border-b border-slate-200 dark:border-rule">
          <div className="max-w-[860px] mx-auto px-6 pt-32 pb-14">
            <p className="flex items-center gap-2 text-[14px] font-medium text-slate-500 dark:text-slate-400 mb-6">
              <span aria-hidden="true" className="[&>svg]:w-4 [&>svg]:h-4">{ICONS[type] || <FileText size={16} />}</span>
              <span>Legal document</span>
            </p>

            <h1 className="font-display font-medium text-[clamp(44px,6vw,80px)] leading-[1.02] text-slate-900 dark:text-white mb-6">
              {title}
            </h1>
            <p className="text-[15px] text-slate-500 dark:text-slate-400">
              {effectiveDate && <>Effective: {effectiveDate}<span className="mx-2" aria-hidden="true">·</span></>}
              Last updated: {lastUpdated}
            </p>
            {entity && (
              <p className="mt-2 text-[15px] text-slate-500 dark:text-slate-400">
                Legal entity: <span className="font-medium text-slate-700 dark:text-slate-300">{entity}</span>
              </p>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="max-w-[860px] mx-auto px-6 pt-12 pb-24">
          <div className="space-y-12">
            {intro && (
              <p className="text-[19px] leading-[1.5] text-slate-600 dark:text-slate-300">{intro}</p>
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
    <section className="border-t border-slate-200 dark:border-rule pt-8">
      <h2 className="font-display font-medium text-[clamp(28px,3vw,36px)] leading-[1.1] text-slate-900 dark:text-white mb-5">{title}</h2>
      <div className="text-[17px] text-slate-600 dark:text-slate-300 leading-[1.6] space-y-4">
        {children}
      </div>
    </section>
  );
}

export function LegalSubsection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="pt-2">
      <h3 className="font-display font-medium text-[22px] leading-[1.2] text-slate-900 dark:text-white mb-2">{title}</h3>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

export function LegalList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 mt-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <div aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-400 mt-[11px] flex-shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Two-column label → description table (DPA processing details, subprocessor list). */
export function LegalTable({ rows, head }: { rows: { label: string; value: string }[]; head?: [string, string] }) {
  return (
    <div className="mt-2 border-y border-slate-200 dark:border-rule">
      <table className="w-full text-left text-[15px]">
        {head && (
          <thead className="hidden border-b border-slate-200 dark:border-rule sm:table-header-group">
            <tr>
              {head.map((h) => (
                <th
                  key={h}
                  scope="col"
                  className="px-4 py-3 text-[14px] font-medium text-slate-500 dark:text-slate-400"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody className="divide-y divide-slate-200 dark:divide-rule">
          {rows.map((r) => (
            <tr key={r.label} className="flex flex-col sm:table-row">
              <th
                scope="row"
                className="px-4 pt-3 align-top font-semibold text-slate-900 dark:text-white sm:w-[34%] sm:py-3"
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
    <a href={href} className="font-medium text-slate-900 dark:text-white underline decoration-slate-400 dark:decoration-slate-400 underline-offset-4 hover:decoration-slate-900 dark:hover:decoration-white transition-colors">
      {children}
    </a>
  );
}

export function LegalContact() {
  const row = 'flex items-center gap-3 text-slate-900 dark:text-white underline decoration-slate-400 underline-offset-4 hover:decoration-slate-900 dark:hover:decoration-white transition-colors font-medium';
  const chip = 'w-5 flex items-center justify-center flex-shrink-0 text-slate-500 dark:text-slate-400';
  return (
    <section className="border-t border-slate-200 dark:border-rule pt-8">
      <h2 className="font-display font-medium text-[clamp(28px,3vw,36px)] leading-[1.1] text-slate-900 dark:text-white mb-5">Contact</h2>
      <div className="text-[17px] text-slate-600 dark:text-slate-300 leading-[1.6]">
        <p className="font-semibold text-slate-900 dark:text-white">Thyleads Private Limited, operating Harvin AI</p>
        <div className="mt-4 space-y-2">
          <div className="flex items-start gap-3">
            <div className={`${chip} pt-1.5`}><MapPin size={16} aria-hidden="true" /></div>
            <address className="not-italic">
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
    </section>
  );
}
