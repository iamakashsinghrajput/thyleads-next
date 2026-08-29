/**
 * One canonical origin for the whole site.
 *
 * Every absolute URL — metadataBase, canonicals, sitemap entries, JSON-LD @id
 * — derives from this, so the site can never end up half on one host and half
 * on another. Override with NEXT_PUBLIC_SITE_URL for previews.
 */
/**
 * APEX, NOT www. Verified against the live deployment on 2026-08-30:
 * https://www.harvin.ai/ 307-redirects to https://harvin.ai/, and its
 * certificate expired on 2026-07-27 — so every canonical, sitemap entry, OG
 * URL and JSON-LD @id pointing at www would name a host that fails TLS before
 * it redirects. Crawlers abandon a request at a certificate error; they do not
 * follow the redirect behind it.
 *
 * If www is ever made the canonical host, fix the certificate FIRST, then
 * change this one value.
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://harvin.ai';

/** Legal entity name, as it appears in Terms and Privacy. */
export const LEGAL_NAME = 'Harvin AI Ltd';
