import type { Metadata } from 'next';

/**
 * Not marketing surface — kept out of the index.
 *
 * These pages are either transactional or per-account output, so they carry no
 * search value and would dilute the site's topical signal. The rule is
 * duplicated in app/robots.ts; keep the two in step, and keep both out of
 * app/sitemap.ts, or Search Console reports "submitted URL marked noindex".
 */
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
