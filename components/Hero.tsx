'use client';

import { useEffect, useState } from 'react';
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
  @keyframes heroCardIn { from { opacity: 0; transform: translateY(28px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
  @keyframes heroFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-9px); } }
  @keyframes heroBarGrow { from { transform: scaleY(0); } to { transform: scaleY(1); } }
  @keyframes heroDraw { to { stroke-dashoffset: 0; } }
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

function ScoreRing() {
  const [n, setN] = useState(0);
  useEffect(() => {
    let x = 0;
    const t = setInterval(() => { x += 4; setN(Math.min(x, 92)); if (x >= 92) clearInterval(t); }, 34);
    return () => clearInterval(t);
  }, []);
  const C = 150.8;
  return (
    <div className="relative h-[60px] w-[60px] flex-shrink-0">
      <svg viewBox="0 0 56 56" className="h-[60px] w-[60px] -rotate-90">
        <circle cx="28" cy="28" r="24" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="4.5" />
        <circle
          cx="28" cy="28" r="24" fill="none" stroke="#F79127" strokeWidth="4.5" strokeLinecap="round"
          strokeDasharray={C} strokeDashoffset={C * (1 - n / 100)}
          style={{ transition: 'stroke-dashoffset 0.05s linear' }}
        />
      </svg>
      <span className="absolute inset-0 grid place-items-center text-[16px] font-bold text-white">{n}</span>
    </div>
  );
}

/** Shuffles through what Harvin does: detect a signal, score the account, launch outbound, book the meeting. */
function UpliftCard() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setStep((s) => (s + 1) % 4), 2600);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="hidden lg:block absolute right-[3%] top-[24%] w-[344px]" style={{ animation: 'heroCardIn 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s both' }}>
      <div style={{ animation: 'heroFloat 6s ease-in-out infinite' }}>
        <div className="rounded-2xl border border-[#F2841C]/45 bg-[#1c1206]/90 p-5 backdrop-blur-md
                        shadow-[0_0_44px_rgba(242,132,28,0.26),0_22px_54px_rgba(0,0,0,0.55)]">
          {/* header: live badge + step dots */}
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-[10.5px] font-bold uppercase tracking-[0.16em] text-white/60">
              <span className="h-2 w-2 rounded-full bg-[#F2841C] animate-pulse" />
              Harvin, live
            </span>
            <span className="flex gap-1.5">
              {[0, 1, 2, 3].map((i) => (
                <span key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === step ? 'w-5 bg-[#F2841C]' : 'w-1.5 bg-white/20'}`} />
              ))}
            </span>
          </div>
          <div className="my-3.5 h-px w-full bg-white/10" />

          {/* step body — re-mounts each step for the transition */}
          <div key={step} className="min-h-[132px]" style={{ animation: 'heroFadeUp 0.45s cubic-bezier(0.16,1,0.3,1) both' }}>
            {step === 0 && (
              <>
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#F79127]">Signal detected</p>
                <div className="mt-3 flex items-center gap-3">
                  <span className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl bg-[#F2841C]/15 text-[15px] font-bold text-[#F7a94a]">W</span>
                  <div className="min-w-0">
                    <p className="truncate text-[15px] font-semibold text-white">Wonka Industries</p>
                    <p className="text-[11.5px] text-white/45">CPG · Global</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <span className="rounded bg-emerald-400/15 px-2 py-0.5 text-[10px] font-bold text-emerald-300">FUNDING</span>
                  <span className="text-[13px] text-white/80">Raised $60M Series C</span>
                </div>
                <p className="mt-2.5 text-[11px] text-white/35">Detected 2m ago · from live sources</p>
              </>
            )}
            {step === 1 && (
              <>
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#F79127]">Account scored</p>
                <div className="mt-3 flex items-center gap-4">
                  <ScoreRing />
                  <div>
                    <p className="text-[15px] font-semibold text-white">High priority</p>
                    <p className="text-[11.5px] text-white/45">Good fit · ready to buy</p>
                  </div>
                </div>
                <ul className="mt-3 flex flex-col gap-1.5">
                  {['6.8M monthly active users', '3 decision-makers mapped', 'Clear category fit'].map((r) => (
                    <li key={r} className="flex items-center gap-2 text-[12px] text-white/60">
                      <span className="text-emerald-400">✓</span>{r}
                    </li>
                  ))}
                </ul>
              </>
            )}
            {step === 2 && (
              <>
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#F79127]">Outbound launched</p>
                <p className="mt-3 text-[15px] font-semibold text-white">AI campaign generated</p>
                <p className="text-[11.5px] text-white/45">Intelligence-led · 3 personas</p>
                <div className="mt-3 rounded-lg border border-white/10 bg-white/[0.04] p-3">
                  <p className="text-[9.5px] font-bold uppercase tracking-wide text-white/40">Recommended angle</p>
                  <p className="mt-1 text-[13px] text-white/85">Lead with the funding signal</p>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-[12px] text-white/50">Projected reply rate</span>
                  <span className="font-bricolage text-[18px] font-bold text-[#F2841C]">5.4%</span>
                </div>
              </>
            )}
            {step === 3 && (
              <>
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#F79127]">Meeting booked</p>
                <div className="mt-3 flex items-center gap-3">
                  <span className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl bg-emerald-400/15 text-[16px] font-bold text-emerald-300">✓</span>
                  <div className="min-w-0">
                    <p className="truncate text-[15px] font-semibold text-white">Nina Alvarez replied</p>
                    <p className="text-[11.5px] text-white/45">Brand Director · Interested</p>
                  </div>
                </div>
                <div className="mt-3 rounded-lg border border-white/10 bg-white/[0.04] p-3">
                  <p className="text-[12.5px] italic leading-snug text-white/80">&ldquo;This is timely — happy to chat.&rdquo;</p>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-[12px] text-white/50">Meeting scheduled</span>
                  <span className="text-[12.5px] font-semibold text-emerald-300">Thu, 2:30 PM</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const { openModal } = useModal();
  const [email, setEmail] = useState('');

  return (
    <section className="relative isolate overflow-hidden bg-[#0d0703] text-white">
      <style>{styles}</style>

      {/* ── Animated signal-trace background (like thyleads-project) ─────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(75%_65%_at_50%_45%,#3a1f0c_0%,#20120a_45%,#0d0703_100%)]"
      />
      <video
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        src="/video/hero.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-black/45" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(75%_65%_at_50%_52%,rgba(0,0,0,0.62)_0%,rgba(0,0,0,0.34)_55%,rgba(0,0,0,0.12)_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#0d0703] via-[#0d0703]/60 to-transparent"
      />
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

        <div className="flex flex-1 flex-col items-center justify-center pt-44 pb-8 text-center">
          <div className="flex w-full flex-col items-center">
            <h1
              className="mx-auto max-w-[880px] font-bricolage font-bold tracking-[-0.02em] leading-[1.04]
                         text-[clamp(36px,5.2vw,66px)] text-white"
              style={{ animation: 'heroFadeUp 0.7s cubic-bezier(0.16,1,0.3,1) both' }}
            >
              AI-native GTM platform<br />that co-owns your pipeline
            </h1>

            <p
              className="mt-6 max-w-[500px] text-[16px] sm:text-[19px] leading-relaxed text-white/70"
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
                className="flex flex-shrink-0 items-center gap-1.5 rounded-full px-6 py-3 text-[14px] font-semibold text-white
                           bg-gradient-to-b from-[#F2841C] to-[#D95B12]
                           shadow-[0_4px_14px_rgba(217,91,18,0.45)]
                           hover:from-[#F79127] hover:to-[#E56B2C] transition-colors whitespace-nowrap"
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
