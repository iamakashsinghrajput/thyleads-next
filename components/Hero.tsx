'use client';

import { useEffect, useState } from 'react';
import { Clock, Mail, Phone, Zap } from 'lucide-react';
import { useModal } from '@/components/ModalContext';
import TrustedStrip from '@/components/TrustedStrip';

const styles = `
  @keyframes heroFadeUp { from { opacity: 0; transform: translateY(22px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes heroImageIn { from { opacity: 0; transform: scale(1.05); } to { opacity: 1; transform: scale(1); } }
  /* Card 1 rises from behind the laptop lid: starts tiny and pushed down onto
     the lid, then grows upward (origin is the card's own bottom edge, which
     rests just above the screen). */
  @keyframes heroCardEmerge { 0% { opacity: 0; transform: translateY(52px) scale(0.2); } 25% { opacity: 0.45; } 55% { opacity: 0.9; } 100% { opacity: 1; transform: translateY(0) scale(1); } }
  @keyframes heroCardIn { from { opacity: 0; transform: translateY(18px) scale(0.985); } to { opacity: 1; transform: translateY(0) scale(1); } }
  @keyframes heroCardFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
  @keyframes heroCaret { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }
  @keyframes heroBarGrow { from { transform: scaleY(0); } to { transform: scaleY(1); } }
`;

/** Card 1's prompt — typed out on screen. */
const PROMPT: [string, string] = ['How do I get my first meeting?', "What's my next move?"];

/**
 * Shared by background-1920.jpg AND heroman-1600.png. Both plates share the
 * same aspect ratio and framing, so an
 * identical box + object-position is what re-registers the cut-out onto the
 * scene. Edit this in one place only — divergent crops slide the man off his
 * own chair.
 */
const SCENE_IMG = 'h-full w-full object-cover object-[68%_center] lg:object-[52%_center]';

/**
 * The cut-out is framed much larger than the room plate wants him, so he gets
 * this on TOP of SCENE_IMG.
 *
 * The origin does double duty: `bottom` keeps his laptop planted on the table
 * as he shrinks (scaling about the centre would lift him off it), and `right`
 * makes him shrink TOWARD the right edge rather than toward the middle — which
 * is what walks him over to the right side without a separate translate.
 * Lower the scale to shrink him further; he'll drift further right as he goes.
 *
 * The translates then place him: -y lifts him clear of the table, +x walks him
 * further right than the origin alone takes him. Because CSS applies the scale
 * first and the translates after, these are flat offsets — they are NOT
 * multiplied by the scale — so the values read as the actual distance he moves
 * (percentages are of the panel, which is 66% of the viewport at lg).
 * Lift too far and his laptop floats off the table.
 */
const MAN_TRANSFORM = 'translate-x-[14%] -translate-y-[12%] scale-[0.60] origin-bottom-right';

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

/** Card 1 — the Harvin Intelligence prompt, rising from behind the laptop lid. */
function HarvinIntelligenceCard() {
  return (
    <div
      className="w-[360px]"
      // grows upward off its own bottom edge, which sits on the laptop lid
      style={{ animation: 'heroCardEmerge 2s cubic-bezier(0.33,1,0.68,1) both', transformOrigin: '50% 100%' }}
    >
      <div style={{ animation: 'heroCardFloat 9s ease-in-out infinite', animationDelay: '2.1s' }}>
        {/* 2px gradient border: ember at the left edge resolving to blue across */}
        <div className="rounded-[20px] bg-[linear-gradient(103deg,#F2841C_0%,#E9701B_14%,#6455C8_46%,#2F6AE8_72%,#3F7DF5_100%)] p-[1.5px] shadow-[0_0_38px_rgba(47,106,232,0.22),0_18px_46px_rgba(0,0,0,0.55)]">
          <div className="flex items-center gap-4 rounded-[19px] bg-[linear-gradient(118deg,#0B1A3A_0%,#101F49_48%,#0A1631_100%)] px-5 py-4">
            <div className="min-w-0 flex-1">
              <span className="flex items-center gap-1.5 text-[#F2841C]">
                <Sparkle />
                <span className="font-bricolage text-[16.5px] font-bold tracking-[-0.01em]">Harvin Intelligence</span>
              </span>
              <div className="mt-2.5">
                <TypedLines lines={PROMPT} delay={1550} />
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

/**
 * Uplift series, as a % of the plot height. Deliberately NOT a clean ramp —
 * the dip at index 2 is what makes it read as measured data rather than
 * decoration. The final bar is the projection and carries the only accent.
 */
const BARS = [24, 33, 27, 44, 52, 63, 88];
// tracks the figure's cap height so the plot reads as its peer, not its label
const PLOT_H = 56;

function Bars() {
  return (
    <span className="relative flex items-end gap-[5px]" style={{ height: PLOT_H }} aria-hidden="true">
      {BARS.map((pct, i) => {
        const projected = i === BARS.length - 1;
        return (
          <span
            key={i}
            className={`w-[6px] origin-bottom rounded-t-[2px] ${
              // one accent, everything else recedes — a rainbow ramp here says
              // nothing about the data
              projected ? 'bg-[#F2841C] shadow-[0_0_12px_rgba(242,132,28,0.5)]' : 'bg-[#3B4C7D]'
            }`}
            style={{
              height: (pct / 100) * PLOT_H,
              animation: 'heroBarGrow 0.5s cubic-bezier(0.33,1,0.68,1) both',
              // history fills quickly, the projection lands last and alone
              animationDelay: `${0.7 + i * 0.06 + (projected ? 0.12 : 0)}s`,
            }}
          />
        );
      })}
      <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-white/[0.11]" />
    </span>
  );
}

function CountUp({ to, delay }: { to: number; delay: number }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    setN(0);
    let tick: ReturnType<typeof setInterval>;
    const start = setTimeout(() => {
      let v = 0;
      tick = setInterval(() => {
        v += 1;
        setN(v);
        if (v >= to) clearInterval(tick);
      }, 60);
    }, delay);
    return () => { clearTimeout(start); clearInterval(tick); };
  }, [to, delay]);
  return <>{n}</>;
}

/**
 * Card 2 — Harvin answering card 1's question: the recommended next move and
 * what it should return. Parked low so the man reads as being in front of it.
 *
 * The figures here are illustrative product UI, in the same spirit as the
 * reference — not claims about Harvin's results.
 */
function PlaybookCard() {
  return (
    <div className="w-[312px]" style={{ animation: 'heroCardIn 0.9s cubic-bezier(0.33,1,0.68,1) both' }}>
      <div style={{ animation: 'heroCardFloat 9s ease-in-out infinite', animationDelay: '1.2s' }}>
        <div className="rounded-[24px] bg-[linear-gradient(152deg,#F2841C_0%,#E9701B_11%,#6455C8_40%,#2F6AE8_70%,#3F7DF5_100%)] p-[1.5px] shadow-[0_0_38px_rgba(47,106,232,0.22),0_18px_46px_rgba(0,0,0,0.55)]">
          <div className="rounded-[23px] bg-[linear-gradient(158deg,#0B1A3A_0%,#101F49_50%,#0A1631_100%)] px-[21px] py-[19px] shadow-[inset_0_1px_0_rgba(255,255,255,0.07)]">
            {/* Salutation is context, not the message — it recedes so the offer
                is the first thing read. Both at one weight read as a wall. */}
            <p className="text-[13.5px] font-medium text-white/50">Hi Sophia,</p>
            <p className="mt-1.5 text-[18px] font-semibold leading-[1.26] tracking-[-0.015em] text-white">
              Start with the 38 accounts showing buying intent this week.
            </p>

            {/* Metric gets its own inset surface rather than being fenced by two
                rules — structure instead of dividers. */}
            <div className="mt-[18px] rounded-[15px] border border-white/[0.07] bg-white/[0.035] px-4 py-3.5">
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#8FA3D8]">
                Projected reply rate
              </p>
              <div className="mt-2.5 flex items-end justify-between gap-3">
                <span className="font-bricolage text-[60px] font-bold leading-[0.8] tracking-[-0.045em] text-[#F2841C]">
                  <CountUp to={32} delay={620} />
                  {/* smaller, lighter, raised — the unit shouldn't carry the
                      same weight as the figure, and the gap widens as the
                      figure grows */}
                  <span className="relative -top-[17px] ml-[1px] text-[25px] font-semibold text-[#F2841C]/65">%</span>
                </span>
                <Bars />
              </div>
            </div>

            <div className="mt-[18px] flex flex-col gap-2.5">
              <span
                className="block rounded-[12px] bg-[linear-gradient(180deg,#F79138_0%,#E4700F_100%)] py-[12px]
                           text-center text-[13.5px] font-semibold tracking-[-0.005em] text-white
                           shadow-[inset_0_1px_0_rgba(255,255,255,0.28),0_6px_16px_rgba(228,112,15,0.32)]"
              >
                Launch sequence
              </span>
              <span
                className="block rounded-[12px] border border-white/[0.14] bg-white/[0.05] py-[11px]
                           text-center text-[12.5px] font-medium text-white/85"
              >
                Ask a Harvin Growth Engineer
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const Rule = () => <div aria-hidden="true" className="my-[11px] h-px bg-white/[0.10]" />;
const Meta = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[10.5px] text-white/45">{children}</p>
);

/**
 * Placeholder lead portraits. These are generated silhouette SVGs in
 * /public/avatars, not photographs — they read as stand-ins rather than
 * pretending to be real people, which is the point: putting invented faces
 * next to named "leads" on a live marketing page would be fabricated social
 * proof. Drop real headshots in at the same paths to swap them; no markup
 * change needed.
 */
const COHORT = [
  { name: 'Avery Park', img: '/avatars/lead-1.svg', ring: 'linear-gradient(140deg,#F2841C,#C94C1E)' },
  { name: 'Liam Alexander', img: '/avatars/lead-2.svg', ring: 'linear-gradient(140deg,#6455C8,#2F6AE8)' },
  { name: 'Olivia Grace', img: '/avatars/lead-3.svg', ring: 'linear-gradient(140deg,#E9701B,#6455C8)' },
  { name: 'Dylan Thomas', img: '/avatars/lead-4.svg', ring: 'linear-gradient(140deg,#3F7DF5,#6455C8)' },
];

/**
 * Card 3 — the lead-generation readout: who Harvin surfaced, how to reach them,
 * how warm they are and how fresh the signal is.
 *
 * Reframed from the reference's win-back cohort, because Email + Cold Calling
 * are prospecting channels — "dormant", "At risk" and a 47-day-old engagement
 * describe a customer you are losing, not a lead you are working.
 */
function CohortCard() {
  return (
    <div className="w-[282px]" style={{ animation: 'heroCardIn 0.9s cubic-bezier(0.33,1,0.68,1) both' }}>
      <div style={{ animation: 'heroCardFloat 9s ease-in-out infinite', animationDelay: '1.2s' }}>
        <div className="rounded-[22px] bg-[linear-gradient(152deg,#F2841C_0%,#E9701B_11%,#6455C8_40%,#2F6AE8_70%,#3F7DF5_100%)] p-[1.5px] shadow-[0_0_38px_rgba(47,106,232,0.22),0_18px_46px_rgba(0,0,0,0.55)]">
          <div className="rounded-[21px] bg-[linear-gradient(158deg,#0B1A3A_0%,#101F49_50%,#0A1631_100%)] px-[18px] py-[16px] shadow-[inset_0_1px_0_rgba(255,255,255,0.07)]">
            <h3 className="font-bricolage text-[19px] font-bold leading-[1.18] tracking-[-0.02em] text-white">
              High-Intent,
              <br />
              Untouched Leads
            </h3>

            <Rule />

            {/* Channel accents are drawn from the card's own gradient rather
                than each vendor's brand colour — these are outbound motions,
                not logos. */}
            <Meta>Preferred Channels</Meta>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <span className="flex items-center justify-center gap-1.5 rounded-[10px] border border-[#3F7DF5]/55 bg-[#3F7DF5]/[0.10] py-[7px]">
                <Mail size={14} className="flex-shrink-0 text-[#6C9BFF]" strokeWidth={2.2} />
                <span className="text-[12px] font-bold text-white">Email</span>
              </span>
              <span className="flex items-center justify-center gap-1.5 rounded-[10px] border border-[#F2841C]/55 bg-[#F2841C]/[0.10] py-[7px]">
                <Phone size={14} className="flex-shrink-0 text-[#F79127]" strokeWidth={2.2} />
                <span className="text-[12px] font-bold text-white">Cold Calling</span>
              </span>
            </div>

            <Rule />

            <Meta>Lead stage</Meta>
            <div className="mt-1.5 flex items-center gap-2">
              <Zap size={16} className="flex-shrink-0 text-[#F2841C]" strokeWidth={2.2} fill="#F2841C" />
              <span className="text-[13.5px] font-bold text-[#F2841C]">Ready to engage</span>
            </div>

            <Rule />

            <Meta>Last buying signal</Meta>
            <div className="mt-1.5 flex items-center gap-2">
              <Clock size={16} className="flex-shrink-0 text-[#3F7DF5]" strokeWidth={2.2} />
              <span className="text-[13.5px] font-bold text-white">3 days ago</span>
            </div>

            <Rule />

            <Meta>Selected Leads</Meta>
            <div className="mt-2.5 grid grid-cols-4 gap-1.5">
              {COHORT.map((c) => (
                <span key={c.name} className="flex flex-col items-center gap-1.5">
                  <span
                    className="grid h-[42px] w-[42px] flex-shrink-0 place-items-center rounded-full p-[2px]"
                    style={{ background: c.ring }}
                  >
                    <img
                      src={c.img}
                      alt=""
                      loading="lazy"
                      className="h-full w-full rounded-full bg-[#0B1A3A] object-cover"
                    />
                  </span>
                  <span className="text-center text-[8.5px] leading-[1.25] text-white/50">{c.name}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * The card sequence. Each slide owns its artwork, its position, its dwell time
 * and — now that the man is a separate cut-out — which side of him it sits on.
 *
 *   behind: true  → drawn between the background and the man plate, so the man
 *                   physically covers any part of the card that overlaps him.
 *   behind: false → floats over the entire scene.
 */
const SLIDES: { key: string; pos: string; ms: number; behind: boolean; node: React.ReactNode }[] = [
  { key: 'harvin-intelligence', pos: 'bottom-[60%] left-[65%] -translate-x-1/2', ms: 8200, behind: false, node: <HarvinIntelligenceCard /> },
  // Sits to the man's LEFT, with its right edge inside his silhouette so his
  // arm crops that corner. It used to sit on his right, but once he moved over
  // there was less viewport left of the edge than the card is wide — it would
  // have been buried. Tracks MAN_TRANSFORM: every nudge right pushes his left
  // edge along too, so this follows or the overlap is lost.
  { key: 'playbook', pos: 'bottom-[37%] left-[68%] -translate-x-1/2', ms: 6400, behind: true, node: <PlaybookCard /> },
  // taller than card 2, so it sits lower to keep its top off the headline
  // while its foot stays clear of the trusted strip
  { key: 'cohort', pos: 'bottom-[37%] left-[68%] -translate-x-1/2', ms: 7000, behind: true, node: <CohortCard /> },
];

export default function Hero() {
  const { openModal } = useModal();
  const [email, setEmail] = useState('');
  const [cardIdx, setCardIdx] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setCardIdx((i) => (i + 1) % SLIDES.length), SLIDES[cardIdx].ms);
    return () => clearTimeout(t);
  }, [cardIdx]);

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
        {/* The LCP element. The 2730px source was a 5.8 MB PNG of opaque
            photography — re-encoded to JPEG at display width it is 156 KB,
            which is the single biggest load-time win on the site. Explicit
            width/height reserve the box so the hero does not shift while it
            decodes. fetchPriority tells the browser this is the one image
            worth fetching first. */}
        <img
          src="/background-1920.jpg"
          alt=""
          width={1920}
          height={1080}
          fetchPriority="high"
          className={SCENE_IMG}
          loading="eager"
        />
        {/* blend the image's left edge into the page background */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0703] via-[#0d0703]/72 to-[#0d0703]/20 lg:via-[#0d0703]/40 lg:to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#0d0703] to-transparent" />
      </div>

      {/* ── BEHIND-THE-MAN card stage — drawn after the plate but before the
             cut-out, so the man genuinely covers whatever overlaps him. ──── */}
      {SLIDES[cardIdx].behind && (
        <div
          key={cardIdx}
          aria-hidden="true"
          className={`pointer-events-none absolute z-[6] hidden xl:block ${SLIDES[cardIdx].pos}`}
        >
          {SLIDES[cardIdx].node}
        </div>
      )}

      {/* ── The man, cut out and laid back over the plate. Same panel box and
             same SCENE_IMG crop as the background — that shared value is the
             whole registration; changing one without the other slides him off
             his own chair. ─────────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-[7] w-full lg:w-[66%]"
        style={{ animation: 'heroImageIn 1.1s cubic-bezier(0.16,1,0.3,1) both' }}
      >
        {/* stays PNG — it is a cut-out and needs its alpha; downscaled from
            2730px to 1600, which is still above its rendered size */}
        <img
          src="/heroman-1600.png"
          alt=""
          width={1600}
          height={900}
          className={`${SCENE_IMG} ${MAN_TRANSFORM}`}
          loading="eager"
        />
      </div>

      {/* ── Copy scrim — holds the left third near-black so the headline,
             sub-copy and form stay legible, then clears before the subject.
             Sits ABOVE the cut-out so his far edge falls away into the copy
             side instead of cutting a hard silhouette across the headline. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[8]
                   bg-[linear-gradient(to_right,rgba(13,7,3,0.94)_0%,rgba(13,7,3,0.88)_45%,rgba(13,7,3,0.66)_100%)]
                   lg:bg-[linear-gradient(to_right,rgba(13,7,3,0.97)_0%,rgba(13,7,3,0.94)_22%,rgba(13,7,3,0.76)_38%,rgba(13,7,3,0.36)_50%,rgba(13,7,3,0.08)_62%,transparent_72%)]"
      />

      {/* ── Grain ───────────────────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[9] opacity-[0.18] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
        }}
      />

      {/* ── IN-FRONT card stage — for slides that should float over the whole
             scene, the man included. ────────────────────────────────────── */}
      {!SLIDES[cardIdx].behind && (
        <div
          key={cardIdx}
          aria-hidden="true"
          className={`pointer-events-none absolute z-20 hidden xl:block ${SLIDES[cardIdx].pos}`}
        >
          {SLIDES[cardIdx].node}
        </div>
      )}

      {/* ── Content ────────────────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1240px] flex-col px-6 lg:max-w-[1340px]">

        <div className="flex flex-1 flex-col items-start justify-center pt-44 pb-8 text-left">
          <div className="flex w-full max-w-[560px] flex-col items-start lg:max-w-[620px]">
            <p
              className="mb-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-ember-400"
              style={{ animation: 'heroFadeUp 0.7s cubic-bezier(0.16,1,0.3,1) both' }}
            >
              SDR Management Platform
            </p>

            <h1
              className="font-bricolage font-bold tracking-[-0.02em] leading-[1.05]
                         text-[clamp(32px,4.2vw,52px)] text-white"
              style={{ animation: 'heroFadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.06s both' }}
            >
              Run a high-performing SDR team from one place.
            </h1>

            <p
              className="mt-5 max-w-[540px] text-[14px] sm:text-[16px] leading-relaxed text-white/70"
              style={{ animation: 'heroFadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.12s both' }}
            >
              Manage your team, territories, accounts, outreach, conversations, meetings and
              performance with a clear view of what is happening and where your SDRs should focus
              next.
            </p>

            <p
              className="mt-4 text-[13px] italic text-white/45"
              style={{ animation: 'heroFadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.18s both' }}
            >
              Built for SDR Leaders, SDR Managers, CROs and Sales Leaders
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
                className="flex flex-shrink-0 items-center gap-1.5 rounded-full px-6 py-3 text-[14px] font-semibold text-white
                           bg-ember-500
                           shadow-[0_4px_14px_rgba(201,76,30,0.45)]
                           hover:bg-ember-400 transition-colors whitespace-nowrap"
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
        <TrustedStrip />
      </div>
    </section>
  );
}
