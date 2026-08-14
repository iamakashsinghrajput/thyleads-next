import type { Metadata } from 'next';
import { JetBrains_Mono, Bricolage_Grotesque } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import ThemeProvider from '@/components/ThemeProvider';
import { ModalProvider } from '@/components/ModalContext';
import SessionWrapper from '@/components/SessionWrapper';

/* ── Universal Sans (primary font) ────────────────────────────────────────── */
const universalSans = localFont({
  src: [
    { path: '../public/fonts/universalfont/74452ea3ef0f9101-s.p.woff2', weight: '400', style: 'normal'  },
    { path: '../public/fonts/universalfont/3d4419af2cf8609b-s.p.woff2', weight: '400', style: 'italic'  },
    { path: '../public/fonts/universalfont/904ef0a86fe32a00-s.p.woff2', weight: '600', style: 'normal'  },
    { path: '../public/fonts/universalfont/4dec29efcaeb336c-s.p.woff2', weight: '600', style: 'italic'  },
    { path: '../public/fonts/universalfont/d886a03bcda7ad8f-s.p.woff2', weight: '400', style: 'normal'  },
    { path: '../public/fonts/universalfont/f5a90156f8995c8c-s.p.woff2', weight: '600', style: 'normal'  },
  ],
  variable: '--font-sans',
  display:  'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets:  ['latin'],
  variable: '--font-mono',
  display:  'swap',
});

const bricolageGrotesque = Bricolage_Grotesque({
  subsets:  ['latin'],
  variable: '--font-bricolage',
  display:  'swap',
});

/* ── Metadata ─────────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title:       'HarvinAI — The AI-Native GTM Intelligence Platform',
  description: 'Detect buying signals, prioritize accounts dynamically, and launch intelligence-led outbound campaigns — from one continuously learning GTM operating system.',
};

/* ── Root layout ──────────────────────────────────────────────────────────── */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className=""
      suppressHydrationWarning
    >
      <head>
        {/*
          Applies the saved theme before first paint. ThemeProvider only sets
          the class in an effect, which runs after hydration — so without this
          a returning dark-mode visitor gets a flash of the light page first.
          That flash was invisible while the default matched their OS; making
          light the default is what exposes it. Mirrors the provider's logic:
          no stored value => light.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var m=localStorage.getItem('harvin_theme');var d=m==='dark'||(m==='system'&&window.matchMedia('(prefers-color-scheme: dark)').matches);if(d)document.documentElement.classList.add('dark');}catch(e){}})();`,
          }}
        />
      </head>
      <body
        className={`${universalSans.variable} ${jetbrainsMono.variable} ${bricolageGrotesque.variable}`}
      >
        <SessionWrapper>
          <ThemeProvider>
            <ModalProvider>
              {children}
            </ModalProvider>
          </ThemeProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
