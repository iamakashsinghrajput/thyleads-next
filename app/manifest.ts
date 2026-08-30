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
    name: 'Harvin — SDR Management Platform',
    short_name: 'Harvin',
    description:
      'One place to run a high-performing SDR team: ownership, priorities, execution, meetings and pipeline reporting.',
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
