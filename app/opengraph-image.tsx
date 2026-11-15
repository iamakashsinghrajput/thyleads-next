import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';

/**
 * The site-wide social card, rendered at build time by Satori.
 *
 * A typographic card stays readable at any preview size and never goes stale.
 *
 * File-convention route: Next serves the rendered PNG at /opengraph-image.
 * The tags are NOT left to the convention though — app/layout.tsx names this
 * URL under `images:`, because a segment that declares its own `openGraph`
 * block (there are five) replaces the parent's wholesale and would otherwise
 * ship with no card at all.
 *
 * Harvin AI brand guidelines (12 Nov 2026): black canvas, warm-paper
 * Newsreader headline, one ember-light accent phrase in italic, Instrument Sans
 * for everything else, and the logo as a small signature bottom-left — never
 * the hero. The headline is the brand idea, from "Lines to reuse".
 */
export const alt = 'Harvin AI — databases search the label. Harvin AI looks at the business.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/* Brand tokens, mirrored from tailwind.config.ts. Satori has no Tailwind, so
   these are the one place the palette is repeated — keep them in sync. */
const BLACK = '#0D0D0C';
const PAPER = '#F7F3EB';
const PAPER_SOFT = '#CFC8BA';
const STONE = '#A8A294';
const RULE = '#2E2B27';
const EMBER_LIGHT = '#E56B2C';

/* Static instances of the brand faces (Satori can't read woff2 or variable fonts). */
const font = (name: string) => readFile(join(process.cwd(), 'public/fonts/brand', name));

export default async function OpengraphImage() {
  const [newsreader, newsreaderItalic, instrument, logo] = await Promise.all([
    font('newsreader-latin-500-normal.woff'),
    font('newsreader-latin-400-italic.woff'),
    font('instrument-sans-latin-400-normal.woff'),
    /* The on-black lockup the navbar and footer use: ember mark + warm-paper "Harvin AI". 704×120. */
    readFile(join(process.cwd(), 'public/harvin-logo-light.png')),
  ]);

  const logoSrc = `data:image/png;base64,${logo.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 76px 60px',
          backgroundColor: BLACK,
        }}
      >
        {/* ── Headline + supporting line ───────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              fontFamily: 'Newsreader',
              fontSize: 92,
              lineHeight: 1.02,
              letterSpacing: '-0.02em',
              color: PAPER,
            }}
          >
            Databases search the label.
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: 14,
              fontFamily: 'Newsreader Italic',
              fontSize: 58,
              lineHeight: 1.1,
              color: EMBER_LIGHT,
            }}
          >
            Harvin AI looks at the business.
          </div>
          <div
            style={{
              marginTop: 30,
              maxWidth: 900,
              fontFamily: 'Instrument Sans',
              fontSize: 27,
              lineHeight: 1.5,
              color: PAPER_SOFT,
            }}
          >
            Tell Harvin what you sell and who buys. It finds the companies that fit, and shows why.
          </div>
        </div>

        {/* ── Signature band ───────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', height: 1, backgroundColor: RULE, marginBottom: 26 }} />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <img src={logoSrc} width={211} height={36} alt="" />
            <span style={{ fontFamily: 'Instrument Sans', fontSize: 24, color: STONE }}>harvin.ai</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Newsreader', data: newsreader, weight: 500, style: 'normal' },
        { name: 'Newsreader Italic', data: newsreaderItalic, weight: 400, style: 'italic' },
        { name: 'Instrument Sans', data: instrument, weight: 400, style: 'normal' },
      ],
    },
  );
}
