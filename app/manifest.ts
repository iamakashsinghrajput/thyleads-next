import type { MetadataRoute } from 'next';

/**
 * Replaces the generator's site.webmanifest, which shipped with placeholder
 * copy ("Your Application Name", "App") and generic #ffffff theme colours.
 *
 * As a file convention Next serves this at /manifest.webmanifest and emits the
 * <link rel="manifest"> itself — so, like the icons, it must not also be
 * declared in the metadata export.
 *
 * The colours match `viewport.themeColor` in app/layout.tsx: sand-100 is the
 * page ground the site actually opens on, so the Android chrome and the page
 * meet without a seam.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Harvin.AI — B2B Company Discovery & Research',
    short_name: 'Harvin',
    description:
      'Harvin.AI finds the companies and buyers your database misses, shows why each one fits, and finds their work emails and phone numbers.',
    start_url: '/',
    display: 'standalone',
    orientation: 'portrait-primary',
    background_color: '#F7F3EB',
    theme_color: '#F7F3EB',
    lang: 'en',
    dir: 'ltr',
    categories: ['business', 'productivity'],
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
