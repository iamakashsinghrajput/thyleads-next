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
  @keyframes heroImageIn { from { opacity: 0; transform: scale(1.05); } to { opacity: 1; transform: scale(1); } }
  @keyframes heroMarqueeLeft { from { transform: translateX(0); } to { transform: translateX(-50%); } }
  @keyframes heroMarqueeRight { from { transform: translateX(-50%); } to { transform: translateX(0); } }
  /* Card 1 rises from behind the laptop lid: starts tiny and pushed down onto
     the lid, then grows upward (origin is the card's own bottom edge, which
     rests just above the screen). */
  @keyframes heroCardEmerge { 0% { opacity: 0; transform: translateY(52px) scale(0.2); } 25% { opacity: 0.45; } 55% { opacity: 0.9; } 100% { opacity: 1; transform: translateY(0) scale(1); } }
  @keyframes heroCardIn { from { opacity: 0; transform: translateY(18px) scale(0.985); } to { opacity: 1; transform: translateY(0) scale(1); } }
  @keyframes heroCardFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
  @keyframes heroCaret { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }
`;

/** Prompts the Co-Marketer card cycles through. Card 0 is the one that
 *  emerges from the laptop; the rest slide up in place. */
const CARDS: { lines: [string, string] }[] = [
  { lines: ['How do I get my first meeting?', "What's my next move?"] },
  { lines: ['Which accounts are ready to buy?', "Show me today's signals."] },
  { lines: ['Who should I reach out to first?', 'Map the buying committee.'] },
  { lines: ['Write my outbound sequence.', 'Lead with the funding news.'] },
  { lines: ['Why did this deal go quiet?', 'What changed last week?'] },
  { lines: ['Which vendor are they using?', 'Show me where I can win.'] },
];

const CARD_MS = 8200;

function Star() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="#F6A11E" aria-hidden="true">
      <path d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.51L10 14.9l-4.94 2.6.94-5.5-4-3.9 5.53-.8L10 1.5z" />
    </svg>
  );
}

function Sparkle() {
  return (
    <svg viewBox="0 0 26 26" className="h-[22px] w-[22px] flex-shrink-0" fill="currentColor" aria-hidden="true">
      <path d="M15.4 1.6l1.75 4.9 4.9 1.75-4.9 1.75-1.75 4.9-1.75-4.9-4.9-1.75 4.9-1.75 1.75-4.9z" />
      <path d="M6.6 13.9l1.05 2.95 2.95 1.05-2.95 1.05-1.05 2.95-1.05-2.95-2.95-1.05 2.95-1.05 1.05-2.95z" />
    </svg>
  );
}

/** Types both lines out as one stream so line 2 starts only once line 1 lands. */
function TypedLines({ lines, delay }: { lines: [string, string]; delay: number }) {
  const full = `${lines[0]}\n${lines[1]}`;
  const [n, setN] = useState(0);

  useEffect(() => {
    setN(0);
    let i = 0;
    let tick: ReturnType<typeof setTimeout>;
    // uneven cadence — a fixed interval reads as a machine, not a person
    const step = () => {
      i += 1;
      setN(i);
      if (i >= full.length) return;
      const ch = full[i - 1];
      const pause =
        ch === '\n' ? 420 :        // beat before the second line
        '?.,'.includes(ch) ? 260 : // settle on punctuation
        ch === ' ' ? 70 :
        40 + Math.random() * 60;
      tick = setTimeout(step, pause);
    };
    const start = setTimeout(step, delay);
    return () => { clearTimeout(start); clearTimeout(tick); };
  }, [full, delay]);

  const out = full.slice(0, n).split('\n');
  const done = n >= full.length;

  return (
    // min-height reserves both lines so the card doesn't grow mid-type
    <p className="min-h-[47px] text-[15px] font-medium leading-[1.55] text-white">
      {out.map((line, i) => (
        <span key={i} className="block">
          {line}
          {i === out.length - 1 && !done && (
            <span
              className="ml-0.5 inline-block h-[14px] w-[1.5px] translate-y-[2px] bg-[#F2841C]"
              style={{ animation: 'heroCaret 1s steps(1) infinite' }}
            />
          )}
        </span>
      ))}
    </p>
  );
}

function CoMarketerCard({ card, emerge }: { card: (typeof CARDS)[number]; emerge: boolean }) {
  return (
    <div
      className="w-[360px]"
      style={
        emerge
          ? // grows upward off its own bottom edge, which sits on the laptop lid
            { animation: 'heroCardEmerge 2s cubic-bezier(0.33,1,0.68,1) both', transformOrigin: '50% 100%' }
          : { animation: 'heroCardIn 0.9s cubic-bezier(0.33,1,0.68,1) both' }
      }
    >
      <div style={{ animation: 'heroCardFloat 9s ease-in-out infinite', animationDelay: '2.1s' }}>
        {/* 2px gradient border: ember at the left edge resolving to blue across */}
        <div className="rounded-[20px] bg-[linear-gradient(103deg,#F2841C_0%,#E9701B_14%,#6455C8_46%,#2F6AE8_72%,#3F7DF5_100%)] p-[1.5px] shadow-[0_0_38px_rgba(47,106,232,0.22),0_18px_46px_rgba(0,0,0,0.55)]">
          <div className="flex items-center gap-4 rounded-[19px] bg-[linear-gradient(118deg,#0B1A3A_0%,#101F49_48%,#0A1631_100%)] px-5 py-4">
            <div className="min-w-0 flex-1">
              <span className="flex items-center gap-1.5 text-[#F2841C]">
                <Sparkle />
                <span className="font-bricolage text-[16.5px] font-bold tracking-[-0.01em]">Co-Marketer</span>
              </span>
              <div className="mt-2.5">
                <TypedLines lines={card.lines} delay={emerge ? 1550 : 500} />
              </div>
            </div>

            <span aria-hidden="true" className="h-[52px] w-px flex-shrink-0 bg-white/15" />
            <span
              aria-hidden="true"
              className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full border border-[#4F86F7]/70 text-[#6C9BFF]"
            >
              <svg viewBox="0 0 24 24" className="h-[13px] w-[13px] translate-x-[1px]" fill="currentColor">
                <path d="M8 4.5l11.5 7.5L8 19.5v-15z" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const { openModal } = useModal();
  const [email, setEmail] = useState('');
  const [cardIdx, setCardIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCardIdx((i) => (i + 1) % CARDS.length), CARD_MS);
    return () => clearInterval(t);
  }, []);

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

      {/* ── Co-Marketer card — parked just above the laptop lid. The lid's top
             edge lands at ~62% of viewport height and its centre at ~75.5%
             width; because the image crop scales by height, those hold steady
             from 1440 through 1920. Keyed on cardIdx so each card remounts and
             replays its entrance + typewriter. ───────────────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[28%] left-[87%] z-20 hidden -translate-x-1/2 xl:block"
      >
        <CoMarketerCard key={cardIdx} card={CARDS[cardIdx]} emerge={cardIdx === 0} />
      </div>

      {/* ── Content ────────────────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1240px] flex-col px-6 lg:max-w-[1340px]">

        <div className="flex flex-1 flex-col items-start justify-center pt-44 pb-8 text-left">
          <div className="flex w-full max-w-[560px] flex-col items-start lg:max-w-[620px]">
            <h1
              className="font-bricolage font-bold tracking-[-0.02em] leading-[1.05]
                         text-[clamp(32px,4.2vw,52px)] text-white"
              style={{ animation: 'heroFadeUp 0.7s cubic-bezier(0.16,1,0.3,1) both' }}
            >
              AI-native GTM platform that co-owns your pipeline
            </h1>

            <p
              className="mt-5 max-w-[540px] text-[14px] sm:text-[16px] leading-relaxed text-white/70"
              style={{ animation: 'heroFadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.12s both' }}
            >
              Move from scattered tools to account intelligence, AI buying signals, and
              intelligence-led outbound — on one platform.
            </p>

            <form
              onSubmit={(e) => { e.preventDefault(); openModal('early-access'); }}
              className="mt-9 flex w-full max-w-[500px] items-center gap-2 rounded-full
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
                           bg-gradient-to-b from-amber-500 to-amber-600
                           shadow-[0_4px_14px_rgba(217,119,6,0.45)]
                           hover:from-amber-400 hover:to-amber-500 transition-colors whitespace-nowrap"
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
        <div className="relative pb-1.5 pt-[3px]">
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
