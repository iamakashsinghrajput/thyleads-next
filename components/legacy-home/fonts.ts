import { JetBrains_Mono, Bricolage_Grotesque } from 'next/font/google';
import localFont from 'next/font/local';

/*
 * The original homepage typefaces. Loaded here (not in the root layout) and
 * exposed only on `.legacy-home` wrappers — the homepage itself and the shared
 * navbar (components/Navbar.tsx) — so the rest of the site keeps the brand
 * fonts from app/layout.tsx.
 */
const universalSans = localFont({
  src: [
    { path: '../../public/fonts/universalfont/74452ea3ef0f9101-s.p.woff2', weight: '400', style: 'normal' },
    { path: '../../public/fonts/universalfont/3d4419af2cf8609b-s.p.woff2', weight: '400', style: 'italic' },
    { path: '../../public/fonts/universalfont/904ef0a86fe32a00-s.p.woff2', weight: '600', style: 'normal' },
    { path: '../../public/fonts/universalfont/4dec29efcaeb336c-s.p.woff2', weight: '600', style: 'italic' },
    { path: '../../public/fonts/universalfont/d886a03bcda7ad8f-s.p.woff2', weight: '400', style: 'normal' },
    { path: '../../public/fonts/universalfont/f5a90156f8995c8c-s.p.woff2', weight: '600', style: 'normal' },
  ],
  variable: '--font-sans',
  display: 'swap',
});
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });
const bricolageGrotesque = Bricolage_Grotesque({ subsets: ['latin'], variable: '--font-bricolage', display: 'swap' });

/** Class names that define the legacy font CSS variables on a wrapper. */
export const legacyFontVars = `${universalSans.variable} ${jetbrainsMono.variable} ${bricolageGrotesque.variable}`;
