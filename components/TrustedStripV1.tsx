'use client';

/**
 * TrustedStripV1 — the original hero social-proof strip, preserved verbatim.
 *
 * Superseded by TrustedStrip.tsx. Kept as a self-contained snapshot so the
 * old treatment can be dropped back into Hero.tsx at any time:
 *
 *   import TrustedStripV1 from '@/components/TrustedStripV1';
 *   …
 *   <TrustedStripV1 />
 *
 * Design notes on what this was: a curved SVG divider carrying a
 * blue→purple→orange gradient, two logo marquees running in opposite
 * directions off the same ten logos, and a centred "Customer Reviews"
 * rating badge between them.
 *
 * Self-contained on purpose — it carries its own LOGOS list, Star glyph and
 * marquee keyframes so it does not depend on anything in Hero.tsx.
 */

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
  @keyframes trustedV1MarqueeLeft { from { transform: translateX(0); } to { transform: translateX(-50%); } }
  @keyframes trustedV1MarqueeRight { from { transform: translateX(-50%); } to { transform: translateX(0); } }
`;

function Star() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="#F6A11E" aria-hidden="true">
      <path d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.51L10 14.9l-4.94 2.6.94-5.5-4-3.9 5.53-.8L10 1.5z" />
    </svg>
  );
}

export default function TrustedStripV1() {
  return (
    <div className="relative pb-1.5 pt-[3px]">
      <style>{styles}</style>

      <svg className="absolute left-1/2 top-6 h-[148px] w-screen -translate-x-1/2" viewBox="0 0 1000 148" preserveAspectRatio="none" aria-hidden="true">
        <path
          d="M0 16 H355 C400 16 389 124 438 124 H562 C600 124 611 16 640 16 H1000"
          fill="none" stroke="url(#dividerGradV1)" strokeWidth="5" strokeOpacity="0.28" vectorEffect="non-scaling-stroke"
        />
        <path
          d="M0 16 H355 C400 16 389 124 438 124 H562 C600 124 611 16 640 16 H1000"
          fill="none" stroke="url(#dividerGradV1)" strokeWidth="2" vectorEffect="non-scaling-stroke"
        />
        <defs>
          <linearGradient id="dividerGradV1" x1="0" y1="0" x2="1" y2="0">
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
          <div className="flex w-max items-center gap-16" style={{ animation: 'trustedV1MarqueeLeft 20s linear infinite' }}>
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
          <div className="flex w-max items-center gap-16" style={{ animation: 'trustedV1MarqueeRight 20s linear infinite' }}>
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
  );
}
