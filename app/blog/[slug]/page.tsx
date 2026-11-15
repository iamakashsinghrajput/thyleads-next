import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Calendar, Clock } from 'lucide-react';

import JsonLd from '@/components/JsonLd';
import { articleSchema, breadcrumbSchema, graph } from '@/lib/schema';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CTA from '@/components/CTA';
import { blogPosts, type BlogPost, type ContentBlock } from '@/data/blogs';

/**
 * Article page, rebuilt on the Harvin palette.
 *
 * Content comes from data/blogs.ts, which stores each section as either a plain
 * string or an array of ContentBlocks (subheading / list / image / cta). Both
 * shapes are handled by `Blocks` below, so a post written either way renders.
 *
 * Prose carries inline **bold** markers rather than HTML, so `Rich` splits on
 * them instead of injecting markup — no dangerouslySetInnerHTML, which matters
 * because this content was authored elsewhere.
 */

const bySlug = (slug: string) => blogPosts.find((p) => p.slug === slug);

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const post = bySlug((await params).slug);
  if (!post) return {};
  return {
    /* the root template already appends the brand — repeating it here gives
       "Title | Harvin | Harvin" */
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    /* Names the site card explicitly for posts with no artwork of their own.
       A page-level generateMetadata that declares `openGraph` does NOT inherit
       the app/opengraph-image.tsx file convention the way a layout does, so
       omitting `images` here left those posts with no social card at all.
       `post.image` is '' (not undefined) on such posts, hence `||`. */
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image || '/opengraph-image'],
    },
  };
}

/** **bold** → <strong>. Splitting beats injecting HTML for foreign content. */
const RICH_LINK = /^\[([^\]]+)\]\(([^)]+)\)$/;

/**
 * Blog prose supports **bold** and [label](/path) links.
 *
 * The link form used to fall through as literal text — six of them were on
 * live posts, including a "[Contact us](…)" that readers saw as raw markdown —
 * so both forms are captured in one split. Internal targets go through Link so
 * they stay client-side navigations and read as internal links to a crawler;
 * external ones open in a new tab.
 */
function Rich({ text }: { text: string }) {
  const linkCls =
    'font-medium text-slate-900 underline decoration-slate-400 underline-offset-4 transition-colors hover:decoration-slate-900 dark:text-white dark:decoration-slate-400 dark:hover:decoration-white';

  return (
    <>
      {text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g).map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={i} className="font-semibold text-slate-900 dark:text-white">
              {part.slice(2, -2)}
            </strong>
          );
        }

        const link = RICH_LINK.exec(part);
        if (link) {
          const [, label, href] = link;
          return href.startsWith('/') ? (
            <Link key={i} href={href} className={linkCls}>
              {label}
            </Link>
          ) : (
            <a key={i} href={href} target="_blank" rel="noopener noreferrer" className={linkCls}>
              {label}
            </a>
          );
        }

        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

function Blocks({ content }: { content: string | ContentBlock[] }) {
  const blocks: ContentBlock[] = typeof content === 'string' ? [content] : content;

  return (
    <>
      {blocks.map((b, i) => {
        if (typeof b === 'string') {
          return (
            <p key={i} className="mt-5 text-[18px] leading-[1.6] text-slate-600 first:mt-0 dark:text-slate-300">
              <Rich text={b} />
            </p>
          );
        }

        if (b.type === 'subheading') {
          return (
            <h3
              key={i}
              className="mt-9 font-display font-medium text-[24px] leading-[1.25] text-slate-900 dark:text-white"
            >
              {b.text}
            </h3>
          );
        }

        if (b.type === 'list') {
          const List = b.ordered ? 'ol' : 'ul';
          return (
            <List key={i} className="mt-5 space-y-2.5">
              {b.items.map((it, n) => (
                <li key={n} className="flex gap-3 text-[18px] leading-[1.6] text-slate-600 dark:text-slate-300">
                  <span
                    aria-hidden="true"
                    className="mt-[12px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-400 dark:bg-slate-400"
                  />
                  <span className="min-w-0">
                    {b.ordered && <span className="mr-1.5 font-semibold text-slate-500 dark:text-slate-400">{n + 1}.</span>}
                    <Rich text={it} />
                  </span>
                </li>
              ))}
            </List>
          );
        }

        if (b.type === 'image') {
          return (
            <figure key={i} className="mt-8 overflow-hidden rounded-card border border-slate-200 dark:border-rule">
              <img src={b.src} alt={b.alt ?? ''} loading="lazy" className="h-auto w-full object-cover" />
            </figure>
          );
        }

        // cta
        return (
          <Link
            key={i}
            href={b.href ?? '/data-building' /* was /platform, now hidden */}
            className="mt-8 flex items-center gap-3 border-y border-slate-200 py-4 transition-colors hover:border-slate-400 dark:border-rule dark:hover:border-slate-400"
          >
            <span className="min-w-0 flex-1 text-[17px] font-medium leading-[1.5] text-slate-900 dark:text-white">
              {b.text}
            </span>
            <ArrowRight size={16} strokeWidth={2.4} className="flex-shrink-0 text-ember-600 dark:text-ember-400" />
          </Link>
        );
      })}
    </>
  );
}

function RelatedCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-card border border-slate-200 bg-white transition-colors hover:border-slate-300 dark:border-rule dark:bg-surface dark:hover:border-white/[0.16]"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-sand-200 dark:bg-white/[0.04]">
        <img
          src={post.cardImage || post.image}
          alt={post.title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
      <div className="p-5">
        <span className="text-[14px] font-medium text-slate-500 dark:text-slate-400">{post.category}</span>
        <h3 className="font-display font-medium mt-2 text-[22px] leading-[1.2] text-slate-900 underline-offset-4 group-hover:underline dark:text-white">
          {post.title}
        </h3>
      </div>
    </Link>
  );
}

export default async function BlogPostPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const post = bySlug((await params).slug);
  if (!post) notFound();

  /* Same category first, then anything — so a thin category still fills out. */
  const related = [
    ...blogPosts.filter((p) => p.slug !== post.slug && p.category === post.category),
    ...blogPosts.filter((p) => p.slug !== post.slug && p.category !== post.category),
  ].slice(0, 3);

  return (
    // Always dark (like /pricing, /data-building, /contact): the `dark` class switches every
    // dark: variant below (Navbar, cards, CTA, footer) regardless of the site theme toggle.
    <div className="dark min-h-screen bg-slate-950 text-white [color-scheme:dark]">
      <JsonLd
        data={graph(
          articleSchema({
            slug: post.slug,
            title: post.title,
            excerpt: post.excerpt,
            date: post.date,
            image: post.image || undefined,
            author: post.author.name,
          }),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Blog', path: '/blog' },
            { name: post.title, path: `/blog/${post.slug}` },
          ])
        )}
      />
      <Navbar alwaysDark />

      <article>
        {/* ═══ HEADER ══════════════════════════════════════════════════════ */}
        <header className="px-4 pb-10 pt-28 sm:px-6 lg:px-8 lg:pt-32">
          <div className="mx-auto max-w-[820px]">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-[14px] font-medium text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            >
              <ArrowLeft size={14} strokeWidth={2.4} />
              All posts
            </Link>

            <p className="mt-8 text-[14px] font-medium text-slate-500 dark:text-slate-400">
              {post.category}
            </p>
            <h1 className="font-display font-medium mt-4 text-[clamp(44px,5.6vw,72px)] leading-[1.02] text-slate-900 dark:text-white">
              {post.title}
            </h1>
            <p className="mt-5 text-[19px] leading-[1.5] text-slate-600 dark:text-slate-300">{post.excerpt}</p>

            <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-slate-200 pt-6 dark:border-rule">
              <img
                src={post.author.image}
                alt=""
                aria-hidden="true"
                className="h-11 w-11 flex-shrink-0 rounded-full object-cover"
              />
              <div className="min-w-0">
                <p className="text-[15px] font-semibold text-slate-900 dark:text-white">{post.author.name}</p>
                <p className="text-[14px] text-slate-500 dark:text-slate-400">{post.author.role}</p>
              </div>
              <span aria-hidden="true" className="hidden h-8 w-px bg-slate-200 dark:bg-rule sm:block" />
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[14px] text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Calendar size={12} strokeWidth={2} />
                  {post.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={12} strokeWidth={2} />
                  {post.readTime}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* ═══ HERO IMAGE ══════════════════════════════════════════════════ */}
        {/* Covers live in public/blogs/covers and are generated by
            scripts/blog-covers.js; a post with no image skips the hero. */}
        {!post.hideHeroImage && post.image && (
          <div className="px-4 sm:px-6 lg:px-8">
            <figure className="mx-auto max-w-[1000px] overflow-hidden rounded-card border border-slate-200 dark:border-rule">
              <img src={post.image} alt={post.title} loading="eager" className="h-auto w-full object-cover" />
            </figure>
          </div>
        )}

        {/* ═══ BODY ════════════════════════════════════════════════════════ */}
        <div className="px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
          <div className="mx-auto max-w-[1000px]">
            <Blocks content={post.content.introduction} />

            {post.content.sections.map((sec) => (
              <section key={sec.heading} className="mt-12">
                <h2 className="font-display font-medium text-[clamp(30px,3.2vw,40px)] leading-[1.1] text-slate-900 dark:text-white">
                  {sec.heading}
                </h2>
                <div className="mt-4">
                  <Blocks content={sec.content} />
                </div>
              </section>
            ))}

            {/* ── Author ─────────────────────────────────────────────────── */}
            <aside className="mt-14 flex flex-col gap-4 border-t border-slate-200 pt-8 dark:border-rule sm:flex-row sm:items-start">
              <img
                src={post.author.image}
                alt=""
                aria-hidden="true"
                className="h-14 w-14 flex-shrink-0 rounded-full object-cover"
              />
              <div className="min-w-0">
                <p className="text-[16px] font-semibold text-slate-900 dark:text-white">{post.author.name}</p>
                <p className="text-[14px] text-slate-500 dark:text-slate-400">{post.author.role}</p>
                <p className="mt-3 text-[16px] leading-[1.5] text-slate-600 dark:text-slate-300">
                  {post.author.bio}
                </p>
              </div>
            </aside>
          </div>
        </div>

        {/* ═══ RELATED ═════════════════════════════════════════════════════ */}
        {related.length > 0 && (
          <section className="border-t border-slate-200 px-4 py-14 dark:border-rule sm:px-6 lg:px-8 lg:py-20">
            <div className="mx-auto max-w-[1180px]">
              <h2 className="font-display font-medium mb-8 text-[clamp(36px,4.2vw,58px)] leading-[1.05] text-slate-900 dark:text-white">
                Keep reading
              </h2>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                {related.map((p) => (
                  <RelatedCard key={p.slug} post={p} />
                ))}
              </div>
            </div>
          </section>
        )}
      </article>

      <CTA />
      <Footer />
    </div>
  );
}
