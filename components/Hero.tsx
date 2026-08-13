'use client';

import { useState } from 'react';
import { useModal } from '@/components/ModalContext';

const LOGOS = [
  { src: '/logos/clevertap.svg', h: 'h-9' },
  { src: '/logos/tazapay.svg', h: 'h-7' },
  { src: '/logos/vwo.svg', h: 'h-8' },
  { src: '/logos/increff.svg', h: 'h-8' },
  { src: '/logos/airmeet.svg', h: 'h-7' },
  { src: '/logos/nurix.svg', h: 'h-7' },
  { src: '/logos/mynd.svg', h: 'h-8' },
  { src: '/logos/venwiz.svg', h: 'h-8' },
  { src: '/logos/pazo.png', h: 'h-9' },
  { src: '/logos/cometchat.png', h: 'h-9' },
];

const styles = `
  @keyframes heroFadeUp { from { opacity: 0; transform: translateY(22px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes heroImageIn { from { opacity: 0; transform: scale(1.05); } to { opacity: 1; transform: scale(1); } }
  @keyframes heroMarqueeLeft { from { transform: translateX(0); } to { transform: translateX(-50%); } }
  @keyframes heroMarqueeRight { from { transform: translateX(-50%); } to { transform: translateX(0); } }
`;

function Star() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="#F6A11E" aria-hidden="true">
      <path d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.51L10 14.9l-4.94 2.6.94-5.5-4-3.9 5.53-.8L10 1.5z" />
    </svg>
  );
}

export default function Hero() {
  const { openModal } = useModal();
  const [email, setEmail] = useState('');

  return (
    <section className="relative isolate overflow-hidden bg-[#0d0703] text-white">
      <style>{styles}</style>

      {/* ── Base wash ───────────────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(75%_65%_at_50%_45%,#3a1f0c_0%,#20120a_45%,#0d0703_100%)]"
      />

      {/* ── Hero image — full-bleed on mobile, right panel from lg up ─────
          The panel is wider and the crop sits further right than the source
          framing, which pulls the subject leftward into the composition. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-full lg:w-[66%]"
        style={{ animation: 'heroImageIn 1.1s cubic-bezier(0.16,1,0.3,1) both' }}
      >
        <img
          src="/hero2.jpg"
          alt=""
          className="h-full w-full object-cover object-[68%_center] lg:object-[80%_center]"
          loading="eager"
        />
        {/* blend the image's left edge into the page background */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0703] via-[#0d0703]/72 to-[#0d0703]/20 lg:via-[#0d0703]/40 lg:to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#0d0703] to-transparent" />
      </div>

      {/* ── Copy scrim — holds the left third near-black so the headline,
             sub-copy and form stay legible, then clears before the subject. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0
                   bg-[linear-gradient(to_right,rgba(13,7,3,0.94)_0%,rgba(13,7,3,0.88)_45%,rgba(13,7,3,0.66)_100%)]
                   lg:bg-[linear-gradient(to_right,rgba(13,7,3,0.97)_0%,rgba(13,7,3,0.94)_22%,rgba(13,7,3,0.76)_38%,rgba(13,7,3,0.36)_50%,rgba(13,7,3,0.08)_62%,transparent_72%)]"
      />

      {/* ── Grain ───────────────────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
        }}
      />

      {/* ── Content ────────────────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1240px] flex-col px-6">

        <div className="flex flex-1 flex-col items-start justify-center pt-44 pb-8 text-left">
          <div className="flex w-full max-w-[560px] flex-col items-start lg:max-w-[520px]">
            <h1
              className="font-bricolage font-bold tracking-[-0.02em] leading-[1.05]
                         text-[clamp(32px,4.2vw,52px)] text-white"
              style={{ animation: 'heroFadeUp 0.7s cubic-bezier(0.16,1,0.3,1) both' }}
            >
              AI-native GTM platform that co-owns your pipeline
            </h1>

            <p
              className="mt-5 max-w-[480px] text-[14px] sm:text-[16px] leading-relaxed text-white/70"
              style={{ animation: 'heroFadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.12s both' }}
            >
              Move from scattered tools to account intelligence, AI buying signals, and
              intelligence-led outbound — on one platform.
            </p>

            <form
              onSubmit={(e) => { e.preventDefault(); openModal('early-access'); }}
              className="mt-9 flex w-full max-w-[460px] items-center gap-2 rounded-full
                         bg-white p-1.5 pl-6 shadow-[0_10px_40px_rgba(0,0,0,0.45)]"
              style={{ animation: 'heroFadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.24s both' }}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your work email"
                className="min-w-0 flex-1 bg-transparent text-[15px] text-slate-800 placeholder:text-slate-400 outline-none"
              />
              <button
                type="submit"
                className="flex flex-shrink-0 items-center gap-1.5 rounded-full px-6 py-3 text-[14px] font-semibold text-slate-950
                           bg-gradient-to-b from-amber-400 to-amber-500
                           shadow-[0_4px_14px_rgba(245,158,11,0.45)]
                           hover:from-amber-300 hover:to-amber-400 transition-colors whitespace-nowrap"
              >
                Get demo
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </button>
            </form>
          </div>
        </div>

        {/* ── Social proof strip ───────────────────────────────────────── */}
        <div className="relative pb-6 pt-2">
          <svg className="absolute left-1/2 top-6 h-[148px] w-screen -translate-x-1/2" viewBox="0 0 1000 148" preserveAspectRatio="none" aria-hidden="true">
            <path
              d="M0 16 H355 C400 16 389 124 438 124 H562 C600 124 611 16 640 16 H1000"
              fill="none" stroke="url(#dividerGrad)" strokeWidth="5" strokeOpacity="0.28" vectorEffect="non-scaling-stroke"
            />
            <path
              d="M0 16 H355 C400 16 389 124 438 124 H562 C600 124 611 16 640 16 H1000"
              fill="none" stroke="url(#dividerGrad)" strokeWidth="2" vectorEffect="non-scaling-stroke"
            />
            <defs>
              <linearGradient id="dividerGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0" />
                <stop offset="6%" stopColor="#38bdf8" stopOpacity="0.9" />
                <stop offset="27%" stopColor="#8b5cf6" stopOpacity="1" />
                <stop offset="50%" stopColor="#FF8A1E" stopOpacity="1" />
                <stop offset="73%" stopColor="#8b5cf6" stopOpacity="1" />
                <stop offset="94%" stopColor="#38bdf8" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>

          <div className="relative left-1/2 z-10 flex w-screen -translate-x-1/2 items-start justify-between gap-2 px-4">
            {/* Left logos — marquee scrolling left */}
            <div
              className="hidden min-w-0 flex-1 overflow-hidden pt-[74px] sm:block"
              style={{
                maskImage: 'linear-gradient(to right, transparent, #000 3%, #000 99%, transparent)',
                WebkitMaskImage: 'linear-gradient(to right, transparent, #000 3%, #000 99%, transparent)',
              }}
            >
              <div className="flex w-max items-center gap-16" style={{ animation: 'heroMarqueeLeft 20s linear infinite' }}>
                {[...LOGOS, ...LOGOS].map((logo, i) => (
                  <img key={`l-${i}`} src={logo.src} alt="" className={`${logo.h} w-auto flex-shrink-0 object-contain opacity-50 brightness-0 invert`} />
                ))}
              </div>
            </div>

            {/* Center review badge */}
            <div className="flex w-[300px] flex-shrink-0 flex-col items-center pt-[28px]">
              <span className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-white">Excellent</span>
              <span className="mt-1.5 text-[26px] font-bold leading-none tracking-tight">
                <span className="text-white">Customer</span> <span className="text-[#57a6ff]">Reviews</span>
              </span>
              <div className="mt-3.5 flex items-center gap-2">
                <span className="flex items-center gap-0.5"><Star /><Star /><Star /><Star /><Star /></span>
                <span className="text-[13px] font-bold text-white">4.7/5.0</span>
              </div>
            </div>

            {/* Right logos — marquee scrolling right */}
            <div
              className="hidden min-w-0 flex-1 overflow-hidden pt-[74px] sm:block"
              style={{
                maskImage: 'linear-gradient(to right, transparent, #000 10%, #000 99%, transparent)',
                WebkitMaskImage: 'linear-gradient(to right, transparent, #000 10%, #000 99%, transparent)',
              }}
            >
              <div className="flex w-max items-center gap-16" style={{ animation: 'heroMarqueeRight 20s linear infinite' }}>
                {[...LOGOS, ...LOGOS].map((logo, i) => (
                  <img key={`r-${i}`} src={logo.src} alt="" className={`${logo.h} w-auto flex-shrink-0 object-contain opacity-50 brightness-0 invert`} />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 items-center gap-x-6 gap-y-5 sm:hidden">
            {LOGOS.slice(0, 6).map((logo, i) => (
              <img key={i} src={logo.src} alt="" className={`${logo.h} mx-auto w-auto object-contain opacity-50 brightness-0 invert`} />
            ))}
          </div>

          <p className="mt-9 text-center text-[13px] font-medium">
            <span className="text-white/60">Trusted by</span>{' '}
            <span className="font-bold text-[#F2841C]">growing</span>{' '}
            <span className="text-white/60">revenue teams</span>
          </p>
        </div>
      </div>
    </section>
  );
}
