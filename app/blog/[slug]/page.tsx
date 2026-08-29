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
    openGraph: { title: post.title, description: post.excerpt, images: post.image ? [post.image] : undefined },
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
    'font-semibold text-ember-600 underline underline-offset-4 transition-colors hover:text-ember-500 dark:text-ember-300 dark:hover:text-ember-200';

  return (
    <>
      {text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g).map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={i} className="font-bold text-slate-900 dark:text-white">
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
            <p key={i} className="mt-5 text-[16.5px] leading-[1.75] text-slate-600 first:mt-0 dark:text-slate-300">
              <Rich text={b} />
            </p>
          );
        }

        if (b.type === 'subheading') {
          return (
            <h3
              key={i}
              className="mt-9 text-[19px] font-bold leading-[1.3] tracking-[-0.015em] text-slate-900 dark:text-white"
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
                <li key={n} className="flex gap-3 text-[16px] leading-[1.7] text-slate-600 dark:text-slate-300">
                  <span
                    aria-hidden="true"
                    className="mt-[9px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-ember-500"
                  />
                  <span className="min-w-0">
                    {b.ordered && <span className="mr-1.5 font-bold text-ember-500">{n + 1}.</span>}
                    <Rich text={it} />
                  </span>
                </li>
              ))}
            </List>
          );
        }

        if (b.type === 'image') {
          return (
            <figure key={i} className="mt-8 overflow-hidden rounded-2xl border border-slate-200 dark:border-white/[0.08]">
              <img src={b.src} alt={b.alt ?? ''} loading="lazy" className="h-auto w-full object-cover" />
            </figure>
          );
        }

        // cta
        return (
          <Link
            key={i}
            href={b.href ?? '/platform'}
            className="mt-8 flex items-center gap-3 rounded-2xl border border-ember-500/30 bg-ember-500/[0.06] px-5 py-4 transition-colors hover:border-ember-500/50"
          >
            <span className="min-w-0 flex-1 text-[15px] font-semibold leading-[1.5] text-slate-900 dark:text-white">
              {b.text}
            </span>
            <ArrowRight size={16} strokeWidth={2.4} className="flex-shrink-0 text-ember-500" />
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
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-shadow hover:shadow-[0_14px_40px_rgba(15,23,42,0.09)] dark:border-white/[0.08] dark:bg-white/[0.02]"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-sand-200">
        <img
          src={post.cardImage || post.image}
          alt={post.title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
        />
      </div>
      <div className="p-5">
        <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-ember-500">{post.category}</span>
        <h3 className="mt-2 text-[16px] font-bold leading-[1.3] tracking-[-0.015em] text-slate-900 dark:text-white">
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
    <div className="min-h-screen bg-sand-100 dark:bg-[#040404]">
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
      <Navbar />

      <article>
        {/* ═══ HEADER ══════════════════════════════════════════════════════ */}
        <header className="px-4 pb-10 pt-28 sm:px-6 lg:px-8 lg:pt-32">
          <div className="mx-auto max-w-[820px]">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-slate-500 transition-colors hover:text-ember-500 dark:text-slate-400"
            >
              <ArrowLeft size={14} strokeWidth={2.4} />
              All posts
            </Link>

            <p className="mt-8 text-[12px] font-semibold uppercase tracking-[0.16em] text-ember-500">
              {post.category}
            </p>
            <h1 className="mt-4 font-bricolage text-[clamp(28px,4vw,46px)] font-bold leading-[1.09] tracking-[-0.025em] text-slate-900 dark:text-white">
              {post.title}
            </h1>
            <p className="mt-5 text-[17px] leading-[1.7] text-slate-600 dark:text-slate-400">{post.excerpt}</p>

            <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-slate-200 pt-6 dark:border-white/[0.08]">
              <img
                src={post.author.image}
                alt=""
                aria-hidden="true"
                className="h-11 w-11 flex-shrink-0 rounded-full object-cover"
              />
              <div className="min-w-0">
                <p className="text-[14px] font-bold text-slate-900 dark:text-white">{post.author.name}</p>
                <p className="text-[12.5px] text-slate-500 dark:text-slate-400">{post.author.role}</p>
              </div>
              <span aria-hidden="true" className="hidden h-8 w-px bg-slate-200 dark:bg-white/10 sm:block" />
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[12.5px] text-slate-500 dark:text-slate-400">
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
        {/* `image` is empty on the intent-data post — its artwork was already a
            broken path in the source repo — so the hero is simply skipped. */}
        {!post.hideHeroImage && post.image && (
          <div className="px-4 sm:px-6 lg:px-8">
            <figure className="mx-auto max-w-[1000px] overflow-hidden rounded-2xl border border-slate-200 dark:border-white/[0.08]">
              <img src={post.image} alt={post.title} loading="eager" className="h-auto w-full object-cover" />
            </figure>
          </div>
        )}

        {/* ═══ BODY ════════════════════════════════════════════════════════ */}
        <div className="px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
          <div className="mx-auto max-w-[820px]">
            <Blocks content={post.content.introduction} />

            {post.content.sections.map((sec) => (
              <section key={sec.heading} className="mt-12">
                <h2 className="text-[clamp(21px,2.4vw,28px)] font-bold leading-[1.2] tracking-[-0.02em] text-slate-900 dark:text-white">
                  {sec.heading}
                </h2>
                <div className="mt-4">
                  <Blocks content={sec.content} />
                </div>
              </section>
            ))}

            {/* ── Author ─────────────────────────────────────────────────── */}
            <aside className="mt-14 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/[0.08] dark:bg-white/[0.02] sm:flex-row sm:items-start">
              <img
                src={post.author.image}
                alt=""
                aria-hidden="true"
                className="h-14 w-14 flex-shrink-0 rounded-full object-cover"
              />
              <div className="min-w-0">
                <p className="text-[15px] font-bold text-slate-900 dark:text-white">{post.author.name}</p>
                <p className="text-[13px] text-slate-500 dark:text-slate-400">{post.author.role}</p>
                <p className="mt-3 text-[14.5px] leading-[1.65] text-slate-600 dark:text-slate-300">
                  {post.author.bio}
                </p>
              </div>
            </aside>
          </div>
        </div>

        {/* ═══ RELATED ═════════════════════════════════════════════════════ */}
        {related.length > 0 && (
          <section className="border-t border-slate-200 px-4 py-14 dark:border-white/[0.06] sm:px-6 lg:px-8 lg:py-20">
            <div className="mx-auto max-w-[1180px]">
              <h2 className="mb-8 text-[clamp(21px,2.4vw,30px)] font-semibold tracking-[-0.02em] text-slate-900 dark:text-white">
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
