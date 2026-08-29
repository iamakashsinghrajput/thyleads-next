/**
 * The Harvin wordmark, in the three forms that were asked for.
 *
 *   'caps'  →  [mark] Harvin.ai      — capital H, mark beside the word
 *   'lower' →  [mark] harvin.ai      — lowercase h, mark beside the word
 *   'mark'  →  [mark]arvin.ai        — the mark IS the H, so the word starts
 *                                       at "arvin.ai" and no separate H is set
 *
 * SWITCH THE WHOLE SITE BY EDITING `BRAND_VARIANT` BELOW. The navbar and the
 * footer both read it, so they can never end up showing different wordmarks.
 *
 * The `.ai` is set at the same size and weight as the name, so the whole thing
 * reads as one wordmark rather than a name with a suffix bolted on.
 *
 * `MARK_SCALE` is deliberately two numbers. Beside the word the mark is a logo
 * and wants to be larger than the type it sits next to; standing in for the H
 * it is a letterform and has to match cap height, or the word looks like it
 * slid off the mark.
 *
 * The 'mark' form has a real constraint: the logo has to sit on the text
 * baseline and match cap height, or the word looks like it fell off the mark.
 * That is what `MARK_NUDGE` is for — it is tuned against Bricolage's cap
 * height, so it needs re-checking if the display face ever changes.
 */

export type WordmarkVariant = 'caps' | 'lower' | 'mark';

/** The form the site uses. Change this one value to switch navbar + footer. */
export const BRAND_VARIANT: WordmarkVariant = 'mark';

/**
 * Mark height as a multiple of the font size.
 *
 * Optical, not arithmetic: the artwork carries its own padding inside the PNG,
 * so the visible mark is always shorter than the number suggests. Beside the
 * word the mark is a logo and is meant to outweigh the type; standing in for
 * the H it still has to read as a letter, so it stays the smaller of the two.
 */
const MARK_SCALE: Record<WordmarkVariant, number> = { caps: 1.62, lower: 1.62, mark: 1.34 };

/**
 * The word sits optically high against a mark this much taller than it, so it
 * is dropped a touch. Centring is geometric; this is the optical correction.
 */
const TEXT_NUDGE = 'translate-y-[0.06em]';

/**
 * The mark stands in for a capital H, which sits on the baseline while the
 * following lowercase letters do not — this drops it to match. It carries
 * TEXT_NUDGE's 0.06em too, so it keeps the same relationship to the word after
 * the correction above; change one and change the other.
 */
const MARK_NUDGE = 'translate-y-[0.09em]';

export default function Wordmark({
  variant = BRAND_VARIANT,
  size = 26,
  className = '',
  markClassName = '',
}: {
  variant?: WordmarkVariant;
  /** Font size in px; the mark and the `.ai` both scale from it. */
  size?: number;
  className?: string;
  markClassName?: string;
}) {
  const mark = (
    <img
      src="/logo1.png"
      alt=""
      aria-hidden="true"
      className={`w-auto flex-shrink-0 object-contain ${markClassName}`}
      style={{ height: `${size * MARK_SCALE[variant]}px` }}
    />
  );

  /* One accessible name whatever the form — a screen reader should never hear
     "arvin.ai" just because the H is drawn rather than typed. */
  return (
    <span
      className={`inline-flex items-center ${variant === 'mark' ? 'gap-[0.02em]' : 'gap-[0.16em]'}`}
      aria-label="Harvin.ai"
    >
      <span className={`inline-flex ${variant === 'mark' ? MARK_NUDGE : ''}`}>{mark}</span>
      <span
        aria-hidden="true"
        className={`font-bricolage font-bold leading-none tracking-[-0.01em] ${TEXT_NUDGE} ${className}`}
        style={{ fontSize: `${size}px` }}
      >
        {variant === 'caps' && 'Harvin'}
        {variant === 'lower' && 'harvin'}
        {variant === 'mark' && 'arvin'}
        .ai
      </span>
    </span>
  );
}
