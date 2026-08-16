'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Calendar, Clock, Search } from 'lucide-react';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CTA from '@/components/CTA';
import { blogPosts } from '@/data/blogs';

/**
 * Blog index, rebuilt on the Harvin palette.
 *
 * The 16 posts and their artwork are carried over from thyleads-project's
 * data/blogs.ts unchanged apart from the rebrand — every "Thyleads" in the
 * prose, author bylines and bios now reads "Harvin". The original page was
 * black-and-purple with a full-viewport hero; this is the beige ground, ember
 * accent and left-aligned header the rest of the site uses.
 *
 * Categories are derived from the posts rather than hardcoded, so a new post in
 * a new category filters correctly without touching this file. The original
 * kept a fixed list and silently dropped anything outside it — "Industry
 * Insights" and "Outreach" posts were unreachable by filter.
 */

const FALLBACK_IMG = '/blogs/the ultimate guide.webp';

function Meta({ date, readTime }: { date: string; readTime: string }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-slate-500 dark:text-slate-400">
      <span className="flex items-center gap-1.5">
        <Calendar size={12} strokeWidth={2} />
        {date}
      </span>
      <span className="flex items-center gap-1.5">
        <Clock size={12} strokeWidth={2} />
        {readTime}
      </span>
    </div>
  );
}

export default function BlogIndex() {
  const [category, setCategory] = useState('All');
  const [q, setQ] = useState('');

  /** Derived, so a post in a new category is never filtered into oblivion. */
  const categories = useMemo(
    () => ['All', ...Array.from(new Set(blogPosts.map((p) => p.category))).sort()],
    []
  );

  const featured = useMemo(() => blogPosts.find((p) => p.featured) ?? blogPosts[0], []);

  const posts = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return blogPosts.filter((p) => {
      if (category !== 'All' && p.category !== category) return false;
      if (!needle) return true;
      return (
        p.title.toLowerCase().includes(needle) ||
        p.excerpt.toLowerCase().includes(needle) ||
        p.category.toLowerCase().includes(needle)
      );
    });
  }, [category, q]);

  return (
    <div className="min-h-screen bg-sand-100 dark:bg-[#040404]">
      <Navbar />

      {/* ═══ HEADER ════════════════════════════════════════════════════════ */}
      <section className="border-b border-slate-200 px-4 pb-14 pt-28 dark:border-white/[0.06] sm:px-6 lg:px-8 lg:pt-32">
        <div className="mx-auto max-w-[1180px]">
          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ember-500">Blog</p>
          <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <h1 className="max-w-[720px] font-bricolage text-[clamp(31px,4.2vw,52px)] font-bold leading-[1.06] tracking-[-0.025em] text-slate-900 dark:text-white">
              The playbook for modern B2B growth
            </h1>

            <label className="flex w-full items-center gap-2.5 rounded-btn border border-slate-200 bg-white px-4 py-3 shadow-[0_4px_20px_rgba(15,23,42,0.05)] dark:border-white/[0.08] dark:bg-white/[0.03] lg:w-[300px]">
              <Search size={15} strokeWidth={2.2} className="flex-shrink-0 text-slate-400" />
              <input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search posts"
                aria-label="Search posts"
                className="min-w-0 flex-1 bg-transparent text-[14px] text-slate-900 outline-none placeholder:text-slate-400 dark:text-white"
              />
            </label>
          </div>

          <p className="mt-5 max-w-[620px] text-[16px] leading-[1.7] text-slate-600 dark:text-slate-400">
            Field notes on outbound, intent data and GTM — written from the campaigns we run, not
            from a keyword list.
          </p>

          {/* ── Category filter ────────────────────────────────────────── */}
          <div className="mt-9 flex flex-wrap gap-2">
            {categories.map((c) => {
              const on = c === category;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  aria-pressed={on}
                  className={`rounded-full px-3.5 py-1.5 text-[12.5px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-500 ${
                    on
                      ? 'bg-ember-500 text-white'
                      : 'border border-slate-200 bg-white text-slate-600 hover:border-slate-300 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-slate-300'
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ FEATURED — only on the unfiltered view ════════════════════════ */}
      {category === 'All' && !q && featured && (
        <section className="border-b border-slate-200 px-4 py-14 dark:border-white/[0.06] sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1180px]">
            <Link
              href={`/blog/${featured.slug}`}
              className="group grid overflow-hidden rounded-2xl border border-slate-200 bg-white transition-shadow hover:shadow-[0_18px_48px_rgba(15,23,42,0.10)] dark:border-white/[0.08] dark:bg-white/[0.02] lg:grid-cols-[1.05fr_1fr]"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-sand-200 lg:aspect-auto lg:min-h-[320px]">
                <img
                  src={featured.cardImage || featured.image || FALLBACK_IMG}
                  alt=""
                  aria-hidden="true"
                  loading="eager"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
                />
              </div>

              <div className="flex flex-col justify-center p-7 lg:p-10">
                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-ember-500/[0.10] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-ember-500">
                  Featured · {featured.category}
                </span>
                <h2 className="mt-4 text-[clamp(21px,2.4vw,30px)] font-bold leading-[1.2] tracking-[-0.02em] text-slate-900 dark:text-white">
                  {featured.title}
                </h2>
                <p className="mt-3 line-clamp-3 text-[15px] leading-[1.65] text-slate-500 dark:text-slate-400">
                  {featured.excerpt}
                </p>
                <div className="mt-6">
                  <Meta date={featured.date} readTime={featured.readTime} />
                </div>
                <span className="mt-6 inline-flex items-center gap-1.5 text-[14px] font-semibold text-slate-900 dark:text-white">
                  Read the post
                  <ArrowRight size={15} strokeWidth={2.4} className="text-ember-500 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* ═══ GRID ══════════════════════════════════════════════════════════ */}
      <section className="border-b border-slate-200 px-4 py-14 dark:border-white/[0.06] sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-[1180px]">
          <p className="mb-8 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500">
            {posts.length} {posts.length === 1 ? 'post' : 'posts'}
            {category !== 'All' && ` · ${category}`}
          </p>

          {posts.length === 0 ? (
            <p className="text-[15px] text-slate-500 dark:text-slate-400">
              Nothing matches that search. Try a different term or clear the filter.
            </p>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {posts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-shadow hover:shadow-[0_14px_40px_rgba(15,23,42,0.09)] dark:border-white/[0.08] dark:bg-white/[0.02]"
                >
                  <div className="relative aspect-[16/9] overflow-hidden bg-sand-200">
                    <img
                      src={p.cardImage || p.image || FALLBACK_IMG}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-ember-500">
                      {p.category}
                    </span>
                    <h3 className="mt-2.5 text-[17px] font-bold leading-[1.3] tracking-[-0.015em] text-slate-900 dark:text-white">
                      {p.title}
                    </h3>
                    <p className="mt-2.5 line-clamp-3 flex-1 text-[13.5px] leading-[1.6] text-slate-500 dark:text-slate-400">
                      {p.excerpt}
                    </p>
                    <div className="mt-5 border-t border-slate-200 pt-4 dark:border-white/[0.08]">
                      <Meta date={p.date} readTime={p.readTime} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <CTA />
      <Footer />
    </div>
  );
}
