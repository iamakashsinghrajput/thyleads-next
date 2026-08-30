import type { Metadata, Viewport } from 'next';
import { SITE_URL } from '@/lib/site';
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
/**
 * The site's SEO spine.
 *
 * `metadataBase` is what makes every relative OG/canonical URL in the app
 * resolve to an absolute one — without it Next emits relative og:image paths,
 * which most crawlers and every social unfurler ignore.
 *
 * The title template appends the brand to child pages, so a page only ever
 * declares its own subject. The default is the one exception, written out in
 * full for the homepage.
 *
 * PRIMARY TERM: "SDR management platform". It leads the title, the description
 * and the H1 (components/Hero.tsx), because a term that appears in only one of
 * the three reads as incidental rather than as what the page is about.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Harvin — SDR Management Platform for Sales Teams',
    template: '%s | Harvin',
  },
  description:
    'Harvin is the SDR management platform that gives sales leaders one place to run the team — territories and account ownership, buying signals that set daily priorities, email, dialer and tasks, meeting handoffs, and reporting from accounts worked through to pipeline.',
  applicationName: 'Harvin',
  keywords: [
    'SDR management platform',
    'sales development platform',
    'SDR team management software',
    'account ownership and territory management',
    'buying signals',
    'sales engagement platform',
    'SDR performance reporting',
    'AI sales coaching',
  ],
  authors: [{ name: 'Harvin' }],
  creator: 'Harvin',
  publisher: 'Harvin',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: 'Harvin',
    url: SITE_URL,
    title: 'Harvin — SDR Management Platform for Sales Teams',
    description:
      'One place to run a high-performing SDR team: ownership, priorities, execution, meetings and pipeline reporting.',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Harvin — the SDR management platform for sales teams' }],
  },
  /* Points at app/opengraph-image.tsx (the generated card) rather than relying
     on the file convention alone. The convention only reaches segments that do
     not declare an `openGraph` block of their own — /platform, /contact,
     /sdr-management-platform and /solutions/[vertical] all do, and would end up
     with no card at all. Declared here, it inherits down to every one of them. */
  twitter: {
    card: 'summary_large_image',
    title: 'Harvin — SDR Management Platform for Sales Teams',
    description:
      'One place to run a high-performing SDR team: ownership, priorities, execution, meetings and pipeline reporting.',
    images: ['/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  /* No `icons` field on purpose: app/icon.svg and app/favicon.ico are
     file-convention icons that Next serves and links automatically. Declaring
     them here as well emits a second <link rel="icon"> for the same asset. */
};

/**
 * Next separates viewport from metadata; without this export the framework
 * default applies but themeColor is never set, so mobile browser chrome does
 * not pick up the brand colour.
 */
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F7F3EB' },
    { media: '(prefers-color-scheme: dark)', color: '#0D0D0C' },
  ],
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
