import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

/**
 * Crawl rules for search engines and AI answer engines.
 *
 * AI CRAWLERS ARE ALLOWED DELIBERATELY. GPTBot, ClaudeBot, PerplexityBot and
 * Google-Extended are what decide whether Harvin can be named when someone
 * asks an assistant "how do I manage an SDR team". Blocking them protects
 * nothing here — every page is public marketing copy — and costs the citation.
 * Reverse this only if the answer to "do we want to be quoted" changes.
 *
 * The disallow list matches the routes left out of app/sitemap.ts. Keep the
 * two in step: a URL that is crawlable but absent from the sitemap is merely
 * untidy, but one that is in the sitemap and disallowed is a reported error.
 */
/**
 * Only /api/ is blocked from crawling. /thankyou, /account/* and /scan/* are
 * kept OUT of this list on purpose: they carry `robots: { index: false }` in
 * their own layouts, and a Disallow would stop the crawler ever fetching them
 * to see that directive — leaving them eligible to be indexed as bare URLs if
 * anything links to them. noindex requires crawl access to work.
 */
const PRIVATE = ['/api/'];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: PRIVATE },
      { userAgent: ['GPTBot', 'ClaudeBot', 'Claude-Web', 'PerplexityBot', 'Google-Extended', 'CCBot', 'Applebot-Extended'], allow: '/', disallow: PRIVATE },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
