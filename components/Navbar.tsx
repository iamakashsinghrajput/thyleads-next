import LegacyNavbar from '@/components/legacy-home/Navbar';
import { legacyFontVars } from '@/components/legacy-home/fonts';
import '@/components/legacy-home/legacy-home.css';

/**
 * The site-wide navbar. Every page renders the homepage's navbar
 * (components/legacy-home/Navbar.tsx) so the bar is identical everywhere.
 *
 * Its styles are scoped to `.legacy-home` (see tailwind.legacy-home.config.ts),
 * so it is wrapped in one here, with the original fonts on the wrapper.
 *
 * Props are kept for the existing call sites:
 * - `alwaysDark` — the page opens on a dark surface, so the bar floats
 *   transparent over it until you scroll, hover or open a menu.
 * - `startFree` — no longer used; the bar always offers Log in / Start free.
 *
 * The previous production navbar is in git history (components/Navbar.tsx
 * before this change) if it is ever needed again.
 */
export default function Navbar({ alwaysDark = false }: { alwaysDark?: boolean; startFree?: boolean } = {}) {
  return (
    <div className={`legacy-home ${legacyFontVars}`}>
      <LegacyNavbar darkTop={alwaysDark} />
    </div>
  );
}
