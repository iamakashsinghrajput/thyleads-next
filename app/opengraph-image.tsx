import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';

/**
 * The site-wide social card, rendered at build time by Satori.
 *
 * This replaces the old `/dashboard-preview.png`, which was a full product
 * screenshot: at the ~500px a chat client actually renders a preview at, every
 * label in it was illegible, and it froze one build of the UI into every link
 * ever shared. A typographic card stays readable at any preview size and never
 * goes stale.
 *
 * File-convention route: Next serves the rendered PNG at /opengraph-image.
 * The tags are NOT left to the convention though — app/layout.tsx names this
 * URL under `images:`, because a segment that declares its own `openGraph`
 * block (there are five) replaces the parent's wholesale and would otherwise
 * ship with no card at all.
 */
export const alt = 'Harvin — the SDR management platform for sales teams';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/* Brand tokens, mirrored from tailwind.config.ts. Satori has no Tailwind, so
   these are the one place the palette is repeated — keep them in sync. */
const SAND_100 = '#F7F3EB';
const SAND_300 = '#E0D7C5';
const SLATE_950 = '#0D0D0C';
const SLATE_500 = '#6E6B63';
const EMBER_500 = '#C94C1E';

const font = (name: string) => readFile(join(process.cwd(), 'public/fonts', name));

export default async function OpengraphImage() {
  const [bricolage, display, text, mark] = await Promise.all([
    font('BricolageGrotesque-Bold.ttf'),
    font('UniversalSans-Display600.ttf'),
    font('UniversalSans-Text400.ttf'),
    /* The same file the navbar and footer draw the mark from (Wordmark.tsx),
       so the card can never drift from the live header. 492×507 with alpha. */
    readFile(join(process.cwd(), 'public/harvinlogo/logo.png')),
  ]);

  const markSrc = `data:image/png;base64,${mark.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '68px 76px',
          backgroundColor: SAND_100,
          /* the same ember wash the sand sections carry, so the card reads as
             part of the site rather than a separate template */
          backgroundImage: `radial-gradient(circle at 12% 8%, rgba(201,76,30,0.13), transparent 46%)`,
        }}
      >
        {/* ── Wordmark ─────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <img src={markSrc} width={50} height={52} alt="" />
          <span
            style={{
              fontFamily: 'Bricolage',
              fontSize: 40,
              color: SLATE_950,
              letterSpacing: '-0.02em',
            }}
          >
            Harvin
          </span>
        </div>

        {/* ── Headline + supporting line ───────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              fontFamily: 'Display',
              fontSize: 66,
              lineHeight: 1.08,
              letterSpacing: '-0.028em',
              color: SLATE_950,
            }}
          >
            <span>Run a high-performing</span>
            {/* the accent falls on the same half the site's CTA accents */}
            <span style={{ color: EMBER_500 }}>SDR team from one place.</span>
          </div>

          <div
            style={{
              marginTop: 26,
              maxWidth: 840,
              fontFamily: 'Text',
              fontSize: 26,
              lineHeight: 1.5,
              color: SLATE_500,
            }}
          >
            Ownership, priorities, execution, meetings and pipeline reporting — for the whole
            sales development team.
          </div>
        </div>

        {/* ── Footer rule ──────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', height: 1, backgroundColor: SAND_300, marginBottom: 22 }} />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span
              style={{
                fontFamily: 'Text',
                fontSize: 19,
                letterSpacing: '0.16em',
                color: EMBER_500,
              }}
            >
              SDR MANAGEMENT PLATFORM
            </span>
            <span style={{ fontFamily: 'Display', fontSize: 22, color: SLATE_950 }}>harvin.ai</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Bricolage', data: bricolage, weight: 700, style: 'normal' },
        { name: 'Display', data: display, weight: 600, style: 'normal' },
        { name: 'Text', data: text, weight: 400, style: 'normal' },
      ],
    },
  );
}
