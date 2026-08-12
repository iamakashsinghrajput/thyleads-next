/* ── Hero.tsx ─────────────────────────────────────────────────────────────── */
'use client';

import { useModal } from '@/components/ModalContext';
import TechScanner from '@/components/TechScanner';

const TICKER: { brand: string; signal: string }[] = [
  { brand: 'Wonka Industries',   signal: 'raised $60M Series C led by Nexus Venture Partners' },
  { brand: 'Pied Piper',         signal: 'raised $33M Series A'                          },
  { brand: 'Northwind Analytics',signal: 'is hiring 30+ across GTM'                      },
  { brand: 'Umbrella Health',    signal: 'expanded telemedicine into 12 new states'      },
  { brand: 'Soylent Foods',      signal: 'raised $45M Series D'                          },
  { brand: 'Hooli',              signal: 'is scaling its data-center footprint'          },
  { brand: 'Initech Systems',    signal: 'shipped a new payments product'               },
  { brand: 'Globex Cloud',       signal: 'is expanding infrastructure across Europe'     },
  { brand: 'Stark Robotics',     signal: 'opened a new automation facility'             },
  { brand: 'Pied Piper',         signal: 'acquired an analytics startup for $15M'        },
];


export default function Hero() {
  const { openModal } = useModal();
  return (
    <>
      {/* ── Ticker ──────────────────────────────────────────────────────── */}
      <div className="border-b border-slate-200 dark:border-white/[0.06]
                      bg-white/70 dark:bg-white/[0.02] overflow-hidden h-10 flex items-center">
        <div className="flex animate-marquee whitespace-nowrap hover:[animation-play-state:paused]">
          {[...TICKER, ...TICKER].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-1.5 px-5 text-[12.5px] font-sans">
              <span className="font-semibold text-ember-500">{item.brand}</span>
              <span className="text-slate-500 dark:text-slate-400">{item.signal}</span>
              <span className="text-slate-300 dark:text-slate-700 mx-2">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <main>
        {/* Headline + Scanner */}
        <div className="text-center px-6 pt-14 sm:pt-20 pb-4">
          <h1 className="font-sans font-bold tracking-[-0.02em] leading-[1.08] mb-4
                         text-[clamp(28px,5.5vw,64px)]
                         text-slate-900 dark:text-slate-50">
            Know which <em className="not-italic text-ember-500">accounts</em><br/>
            <em className="not-italic text-ember-500">to sell to</em> and when
          </h1>
          <p className="mx-auto max-w-lg text-[16px] text-slate-500 dark:text-slate-400 leading-relaxed mb-7">
            HarvinAI detects buying signals, scores every account dynamically, and launches intelligence-led outbound — so your team knows who to reach and when. Try scanning a company below.
          </p>

          {/* ── Scanner ──────────────────────────────────────────────── */}
          <div className="max-w-xl mx-auto">
            <TechScanner />
          </div>

          {/* Secondary CTA */}
          <div className="mt-8 sm:mt-14 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
            <button
              onClick={() => openModal('early-access')}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-[14px] font-semibold
                         text-white bg-ember-500 shadow-[0_2px_8px_rgba(201,76,30,0.35)]
                         hover:bg-ember-400 hover:shadow-[0_6px_20px_rgba(201,76,30,0.45)]
                         transition-all duration-200"
            >
              Get early access
            </button>
            <a
              href="/product"
              className="text-[14px] font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              See how it works →
            </a>
          </div>
        </div>

        {/* ── Product Screenshot ─────────────────────────────────────────── */}
        <div className="px-4 pb-12 sm:pb-20 pt-2 sm:pt-4">
          <div className="relative max-w-[1100px] mx-auto">
            {/*
              Replace this with a real screenshot of your dashboard.
              Take a screenshot at /dashboard, save as /public/dashboard-preview.png
              For dark mode, save a second one as /public/dashboard-preview-dark.png
            */}
            <div className="rounded-xl rounded-b-none overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.5)] border border-b-0 border-slate-200/60 dark:border-white/[0.08]">
              <img
                src="/dashboard-preview.png"
                alt="HarvinAI Accounts — every account is a living intelligence entity"
                className="w-full h-auto block dark:hidden"
                loading="eager"
              />
              <img
                src="/dashboard-preview-dark.png"
                alt="HarvinAI Accounts — every account is a living intelligence entity"
                className="w-full h-auto hidden dark:block"
                loading="eager"
              />
            </div>

            {/* Bottom fade */}
            <div className="pointer-events-none absolute -bottom-1 left-0 right-0 h-32 z-10 bg-gradient-to-t from-slate-50 dark:from-slate-950 to-transparent" />
          </div>

          {/* Stats */}
          <div className="relative z-20 max-w-[900px] mx-auto mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 text-center">
            {[
              { value: '6-in-1',    label: 'GTM systems, unified'  },
              { value: '5',         label: 'Live signal types'     },
              { value: '5',         label: 'Regions covered'       },
              { value: 'Real-time', label: 'Signal refresh'        },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="font-sans font-normal leading-none text-slate-900 dark:text-slate-100
                               text-[clamp(28px,4vw,40px)]">
                  {value}
                </p>
                <p className="mt-1 text-[13px] font-sans text-slate-400 dark:text-slate-500">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

      </main>
    </>
  );
}
