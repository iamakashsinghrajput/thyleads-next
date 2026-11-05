/**
 * Builds the chatbot's knowledge base from the live site.
 *
 *   node scripts/build-chat-knowledge.mjs [baseUrl]
 *
 * Visits every public marketing page (default base: http://localhost:3000, so
 * run `npm run dev` first), keeps only the page's own text (no navbar, footer,
 * cookie banner or the chat widget itself) and writes it to
 * app/api/chat/knowledge.ts, which app/api/chat/route.ts sends to the model.
 *
 * After the scraped pages it appends scripts/chat-knowledge-extra.md: answers
 * curated from the v2 website copy handoff for topics whose pages are not built
 * yet (Company Discovery, People Search, use cases, regions, glossary…).
 *
 * Re-run whenever site copy changes, then commit the regenerated file.
 */
import fs from 'node:fs';
import path from 'node:path';
import puppeteer from 'puppeteer';

const BASE = (process.argv[2] || 'http://localhost:3000').replace(/\/$/, '');
const OUT = path.join(process.cwd(), 'app/api/chat/knowledge.ts');

/* Only pages written for the v2 positioning (B2B company discovery and
   research). Blog posts are left out on purpose — they are long, change often
   and are not product facts; the bot links to /blog instead.

   Left out until their copy is rewritten for v2, because it still describes
   the SDR management platform: /sdr-management-platform, /product-tour,
   /account-intelligence, /sdr, /sdr-head, /ae, /about, /solutions/*.
   (/platform and /outreach-and-engagement are hidden routes.) */
const PAGES = [
  '/', '/data-building', '/pricing', '/contact',
  '/privacy', '/terms', '/acceptable-use', '/cookies', '/refund', '/privacy-choices', '/dpa', '/subprocessors',
];

/* Claims the v2 handoff's claims register holds or removes until approved
   (C6 "verified" contacts, C8 650M+ / 30+ / 20+ counts, C9 the 80% / 3× / 40% /
   30% stats). /data-building still renders them; any scraped line carrying one
   is dropped so the bot never repeats it. Remove a pattern once the claim is
   approved. */
const HELD_CLAIMS = [
  /650M/i,
  /\b30\+/,
  /\b20\+/,
  /\b80%/,
  /\b3×/,
  /\b40%/,
  /\b30%/,
  /less time building and researching lists/i,
  /faster from targeting brief/i,
  /fewer irrelevant decision-maker matches/i,
  /discovered outside the/i,
  /\bverified\b/i,
];

/* Handoff-sourced sections appended after the scraped pages. */
const EXTRA = path.join(process.cwd(), 'scripts/chat-knowledge-extra.md');

/* Legal pages are summarised to their headings: the full text would triple the
   prompt, and the bot should point people to the page rather than paraphrase law. */
const HEADINGS_ONLY = new Set([
  '/privacy', '/terms', '/acceptable-use', '/cookies', '/refund', '/privacy-choices', '/dpa',
]);

function launch() {
  const mac = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  return puppeteer.launch({ headless: 'new', ...(fs.existsSync(mac) ? { executablePath: mac } : {}) });
}

const browser = await launch();
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });

const sections = [];
const seen = new Set();
for (const route of PAGES) {
  const res = await page.goto(BASE + route, { waitUntil: 'networkidle2', timeout: 120000 });
  if (!res || !res.ok()) {
    console.warn(`skip ${route} (${res?.status()})`);
    continue;
  }
  const { title, lines } = await page.evaluate((headingsOnly) => {
    /* Keep marketing copy, drop product-mock UI: the mocks are built from real
       DOM but with made-up names and numbers, all set below 14px. Headings are
       always kept. */
    const SKIP = 'nav, header, footer, [aria-hidden="true"], .sr-only, [data-chatbot], [role="dialog"], script, style';
    const BLOCK = headingsOnly ? 'h1, h2, h3' : 'h1, h2, h3, h4, p, li, blockquote, dt, dd, summary, td, th';
    const root = document.querySelector('main') || document.body;
    const out = [];
    for (const el of root.querySelectorAll(BLOCK)) {
      if (el.closest(SKIP)) continue;
      if (el.querySelector(BLOCK)) continue; // the innermost block carries the text
      const heading = /^H[1-4]$/.test(el.tagName);
      if (!heading && parseFloat(getComputedStyle(el).fontSize) < 14) continue;
      const t = el.textContent.replace(/\s+/g, ' ').trim();
      if (!t) continue;
      out.push(heading ? `## ${t}` : el.tagName === 'LI' ? `- ${t}` : t);
    }
    return { title: document.title, lines: out };
  }, HEADINGS_ONLY.has(route));

  // drop held claims, then lines already said on an earlier page (shared sections, CTAs, marquees)
  const clean = lines
    .filter((l) => !HELD_CLAIMS.some((re) => re.test(l)))
    .filter((l) => !seen.has(l) && seen.add(l))
    .join('\n');
  sections.push(`### ${title}\nURL: ${route}\n${HEADINGS_ONLY.has(route) ? '(Legal page — section headings only; send people to the page for the full text.)\n' : ''}${clean}`);
  console.log(`${route.padEnd(28)} ${clean.split(/\s+/).length} words`);
}
await browser.close();

if (fs.existsSync(EXTRA)) {
  const extra = fs
    .readFileSync(EXTRA, 'utf8')
    .replace(/<!--[\s\S]*?-->/g, '') // drop the file's own header comment
    .trim()
    .split(/\n\n---\n\n/)
    // same de-duplication as the scraped pages: skip lines already said
    .map((sec) => sec.split('\n').filter((l, i) => i < 2 || l.startsWith('## ') || (!seen.has(l) && seen.add(l))).join('\n'));
  sections.push(...extra);
  console.log(`+ ${extra.length} handoff sections from ${path.relative(process.cwd(), EXTRA)}`);
}

const body = sections.join('\n\n---\n\n');
fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(
  OUT,
  `/* Generated by scripts/build-chat-knowledge.mjs on ${new Date().toISOString().slice(0, 10)} — do not edit by hand. */\n` +
    `export const SITE_KNOWLEDGE = ${JSON.stringify(body)};\n`,
);
console.log(`\nwrote ${OUT} — ${body.split(/\s+/).length} words (~${Math.round(body.length / 4)} tokens)`);
