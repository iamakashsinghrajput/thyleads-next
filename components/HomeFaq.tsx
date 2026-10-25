'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const HOME_FAQS = [
  {
    q: 'How is Harvin different from a sales engagement platform?',
    a: 'Harvin connects account research, prospecting, outreach, meetings, and AE handoffs into one unified SDR operating layer while your CRM remains the central system of record.',
  },
  {
    q: 'How does Harvin help SDRs prioritize accounts?',
    a: 'Harvin calculates a weighted intent score for the buying signals around each account, helping SDRs quickly identify high-value accounts and determine their daily focus.',
  },
  {
    q: 'Does Harvin replace our CRM?',
    a: 'No. Your CRM stays the system of record. Harvin syncs CRM data: accounts, contacts, and deal history and connects it directly into the SDR operational workflow.',
  },
  {
    q: 'What sales tools does Harvin integrate with?',
    a: 'Harvin syncs with your CRM for data management, builds multichannel execution directly into the platform, and connects AE Digital Sales Rooms for post-meeting workflows.',
  },
  {
    q: 'What can SDRs, SDR Heads, and AEs do in Harvin?',
    bullets: [
      { role: 'SDRs', desc: 'Prioritize accounts, execute outreach, and track meetings.' },
      { role: 'SDR Heads', desc: 'Manage performance, campaigns, and coaching.' },
      { role: 'AEs', desc: 'Access discovery context, prepare for calls, and progress deals.' },
    ],
  },
  {
    q: 'How does Harvin support SDR-to-AE handoffs?',
    a: 'Harvin automatically transfers SDR discovery, account context, and meeting details directly into the AE workspace, enabling seamless call preparation and faster deal progression.',
  },
];

export default function HomeFaq() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="border-t border-slate-200 bg-sand-100 px-4 py-20 dark:border-white/[0.06] dark:bg-[#040404] sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-[1180px]">
        {/* ── Section header ────────────────────────────────────────────── */}
        <div className="mb-12 max-w-[720px]">
          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ember-500">
            FAQs
          </p>
          <h2 className="mt-3 font-bricolage text-[clamp(28px,3.4vw,44px)] font-bold tracking-[-0.025em] text-slate-900 dark:text-white">
            Need some clarity?
          </h2>
          <p className="mt-3 text-[16px] text-slate-600 dark:text-slate-400">
            Everything you need to know about how Harvin connects and powers your SDR operation.
          </p>
        </div>

        {/* ── Accordion list ────────────────────────────────────────────── */}
        <div className="divide-y divide-slate-200 border-y border-slate-200 dark:divide-white/[0.08] dark:border-white/[0.08]">
          {HOME_FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={faq.q} className="py-5 sm:py-6">
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="flex w-full items-start justify-between gap-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-ember-500 rounded-lg"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-center gap-3">
                    <span className="font-mono text-[13px] font-bold text-ember-500">
                      {String(idx + 1).padStart(2, '0')}.
                    </span>
                    <span className="text-[17px] sm:text-[18px] font-bold tracking-[-0.015em] text-slate-900 dark:text-white">
                      {faq.q}
                    </span>
                  </span>
                  <span
                    className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-slate-300 dark:border-white/20 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-ember-500 border-ember-500 text-white' : 'text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    <ChevronDown size={14} strokeWidth={2.5} />
                  </span>
                </button>

                {isOpen && (
                  <div className="mt-3.5 pl-8 pr-4 sm:pr-8 text-[15.5px] leading-[1.75] text-slate-600 dark:text-slate-300 animate-fade-up">
                    {faq.a && <p>{faq.a}</p>}
                    {faq.bullets && (
                      <ul className="space-y-2 mt-1">
                        {faq.bullets.map((b) => (
                          <li key={b.role} className="flex items-start gap-2">
                            <span className="font-bold text-slate-900 dark:text-white">
                              • {b.role}:
                            </span>
                            <span>{b.desc}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
