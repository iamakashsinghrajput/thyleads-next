import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';
import { blogPosts } from '@/data/blogs';

/**
 * Generated, not hand-maintained.
 *
 * Blog posts and vertical pages come from the same arrays the pages render
 * from, so a new post or vertical is in the sitemap the moment it exists —
 * a hand-written list is the kind that silently goes stale.
 *
 * Gated and transactional routes are deliberately absent: signin, signup,
 * dashboard, onboarding, syncing, thankyou, auth-redirect, account/* and
 * scan/*. They are also noindex (see app/robots.ts and their own metadata) —
 * the sitemap and the robots rules have to agree, or Search Console reports
 * "submitted URL marked noindex" for every one of them.
 */
const VERTICALS = ['fintech', 'martech', 'hrtech'];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const core: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/platform`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/sdr-management-platform`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: 'yearly', priority: 0.5 },
  ];

  const verticals: MetadataRoute.Sitemap = VERTICALS.map((v) => ({
    url: `${SITE_URL}/solutions/${v}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const posts: MetadataRoute.Sitemap = blogPosts.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: now,
    changeFrequency: 'yearly',
    priority: 0.6,
  }));

  const legal: MetadataRoute.Sitemap = ['privacy', 'terms', 'acceptable-use', 'cookies', 'refund'].map((r) => ({
    url: `${SITE_URL}/${r}`,
    lastModified: now,
    changeFrequency: 'yearly',
    priority: 0.2,
  }));

  return [...core, ...verticals, ...posts, ...legal];
}
