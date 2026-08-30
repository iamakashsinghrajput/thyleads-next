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
 * ── How the mark is positioned ──────────────────────────────────────────────
 *
 * The mark is sized against the font's CAP HEIGHT, and its artwork is CENTRED
 * on the word's cap-centre. The word itself is never nudged.
 *
 * That inverts what this file used to do: the mark was sized as a multiple of
 * the font size, ended up towering over the word, and the word was then
 * translated down to chase it — which left the two only ever approximately
 * related and needed re-tuning by eye after every change.
 *
 * Two details make the centring exact rather than approximate:
 *
 *   · It centres on the CAP-CENTRE, not the line box. "Harvin.ai" carries no
 *     descenders, so its visual mass runs cap-top → baseline; centring on the
 *     line box would sit the mark low by half the descender depth.
 *
 *   · It centres the ARTWORK, not the image. The PNG's padding is uneven
 *     (see BOTTOM_PAD), so centring the file would sit the mark low again.
 *
 * `items-baseline` is what makes that measurable: a replaced element's baseline
 * is its bottom margin edge, so the image's bottom starts on the text baseline
 * — a known anchor — and MARK_OFFSET moves it from there.
 */

export type WordmarkVariant = 'caps' | 'lower' | 'mark';

/** The form the site uses. Change this one value to switch navbar + footer. */
export const BRAND_VARIANT: WordmarkVariant = 'caps';

/**
 * Cap height of Bricolage Grotesque Bold, as a fraction of the font size.
 * Read from the font, not guessed: OS/2.sCapHeight = 660 against unitsPerEm
 * 1000, and the 'H' and 'N' glyphs both run yMin=0 → yMax=660. Re-read this if
 * the display face ever changes.
 */
const CAP_HEIGHT = 0.66;

/**
 * The mark artwork's geometry inside its own PNG, as fractions of the file's
 * height. /harvinlogo/logo.png is 492×507 with the shape occupying y 37..460,
 * so it carries transparent padding on both sides — and unevenly: 7.30% above,
 * 9.07% below.
 *
 * ART is what lets the mark be sized by its VISIBLE height rather than its file
 * height. BOTTOM_PAD is what lets it be positioned by its visible edge rather
 * than its file edge. Re-measure both if the mark is ever re-exported.
 */
const ART = 0.8363;
const BOTTOM_PAD = 0.09073;

/**
 * Mark height as a multiple of cap height.
 *
 * 'mark' is pinned to 1.0 because there the logo IS the capital H — at any
 * other size the drawn letter stops matching the set ones beside it. (At 1.0
 * the centring below resolves to sitting on the baseline, which is exactly
 * what that form needs, so it needs no special case.)
 */
const MARK_CAP_MULTIPLE: Record<WordmarkVariant, number> = { caps: 1.6, lower: 1.6, mark: 1.0 };

/** Beside the word the mark needs air; standing in for the H it must not. */
const GAP: Record<WordmarkVariant, string> = {
  caps:  'gap-[0.20em]',
  lower: 'gap-[0.20em]',
  mark:  'gap-[0.02em]',
};

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
  /* Resolved in px, not em: the image inherits the surrounding font size rather
     than `size`, so em units here would measure against the wrong thing. */
  const capHeight = size * CAP_HEIGHT;
  const visibleHeight = capHeight * MARK_CAP_MULTIPLE[variant];
  const imageHeight = visibleHeight / ART;

  /* From the baseline anchor: clear the transparent strip under the artwork,
     then lift by half the amount the mark overshoots the capital, which lands
     the artwork's centre on the cap-centre. */
  const markOffset = imageHeight * BOTTOM_PAD + (visibleHeight - capHeight) / 2;

  const mark = (
    <img
      src="/harvinlogo/logo.png"
      alt=""
      aria-hidden="true"
      className={`w-auto flex-shrink-0 object-contain ${markClassName}`}
      style={{ height: `${imageHeight}px`, transform: `translateY(${markOffset}px)` }}
    />
  );

  /* One accessible name whatever the form — a screen reader should never hear
     "arvin.ai" just because the H is drawn rather than typed. */
  return (
    <span className={`inline-flex items-baseline ${GAP[variant]}`} aria-label="Harvin.ai">
      {mark}
      <span
        aria-hidden="true"
        className={`font-bricolage font-bold leading-none tracking-[-0.01em] ${className}`}
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
