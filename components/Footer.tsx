'use client';

import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import { portalUrl } from '@/lib/portal';
import { openCookieSettings } from '@/components/CookieConsent';

/* ── Nav data ─────────────────────────────────────────────────────────────
   Every href below resolves to a real route in /app. The previous footer
   linked to /blog, which does not exist — a 404 on every page of the site.
   The legal column now also surfaces the cookie, refund and acceptable-use
   policies, which existed but were unreachable from anywhere.
   ─────────────────────────────────────────────────────────────────────── */
const NAV_COLS = [
  {
    heading: 'Product',
    links: [
      { label: 'Account Intelligence', href: '/account-intelligence' },
      { label: 'Outreach & Engagement', href: '/outreach-and-engagement' },
      { label: 'Performance & Insights', href: '/#sdr' },
      { label: 'Integrations', href: '/#signals' },
    ],
  },
  {
    heading: 'Roles',
    links: [
      { label: 'SDR', href: '/sdr' },
      { label: 'SDR Head', href: '/sdr-head' },
      { label: 'AE', href: '/ae' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Product Tour', href: '/product-tour' },
      { label: 'About Us', href: '/about' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'Blogs', href: '/blog' },
    ],
  },
  {
    heading: 'Account',
    links: [
      { label: 'Pricing', href: '/pricing' },
      { label: 'Log in', href: portalUrl(), external: true },
      { label: 'Sign up for free', href: portalUrl(), external: true },
      { label: 'Get a demo', href: portalUrl(), external: true },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
      { label: 'Acceptable Use', href: '/acceptable-use' },
      { label: 'Refund Policy', href: '/refund' },
    ],
  },
];

const REGISTRATION = [
  // { label: 'Registered company', lines: [{ value: 'Harvin AI Ltd', sub: '' }], mono: true },

  { label: 'Registered office', lines: [{ value: '124 City Road, London', sub: 'EC1V 2NX, United Kingdom' }], mono: false },

  {
    label: 'India office',
    lines: [{ value: '#164, 1st Cross, 1st Main Road', sub: 'AECS Layout, Hebbal, Bengaluru, Karnataka 560094, India' }],
    mono: false,
  },
];

/* ── Ask AI about Harvin ──────────────────────────────────────────────────
   Each link opens the assistant with the prompt pre-filled via its URL query
   param (Google's AI Mode is `udm=50` on a normal search). On click the
   prompt is also copied to the clipboard, in case an assistant drops it.
   ─────────────────────────────────────────────────────────────────────── */
const AI_PROMPT = 'Explain Harvin using https://harvin.ai/about';
const AI_Q = encodeURIComponent(AI_PROMPT);
/* Brand marks from Simple Icons (CC0), inlined as single-path SVGs. */
const AI_TOOLS = [
  { name: 'ChatGPT', href: `https://chatgpt.com/?q=${AI_Q}`, path: 'M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z' },
  { name: 'Claude', href: `https://claude.ai/new?q=${AI_Q}`, path: 'm4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z' },
  { name: 'Google AI Mode', href: `https://www.google.com/search?udm=50&q=${AI_Q}`, path: 'M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z' },
  { name: 'Perplexity', href: `https://www.perplexity.ai/search?q=${AI_Q}`, path: 'M22.3977 7.0896h-2.3106V.0676l-7.5094 6.3542V.1577h-1.1554v6.1966L4.4904 0v7.0896H1.6023v10.3976h2.8882V24l6.932-6.3591v6.2005h1.1554v-6.0469l6.9318 6.1807v-6.4879h2.8882V7.0896zm-3.4657-4.531v4.531h-5.355l5.355-4.531zm-13.2862.0676 4.8691 4.4634H5.6458V2.6262zM2.7576 16.332V8.245h7.8476l-6.1149 6.1147v1.9723H2.7576zm2.8882 5.0404v-3.8852h.0001v-2.6488l5.7763-5.7764v7.0111l-5.7764 5.2993zm12.7086.0248-5.7766-5.1509V9.0618l5.7766 5.7766v6.5588zm2.8882-5.0652h-1.733v-1.9723L13.3948 8.245h7.8478v8.087z' },
];

const copyPrompt = () => {
  navigator.clipboard?.writeText(AI_PROMPT).catch(() => {});
};

/* ── Social icons ─────────────────────────────────────────────────────────── */
// const TwitterIcon = () => (
//   <svg viewBox="0 0 24 24" className="h-[15px] w-[15px]" fill="currentColor">
//     <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.632 5.905-5.632Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
//   </svg>
// );
const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" className="h-[15px] w-[15px]" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
// const GitHubIcon = () => (
//   <svg viewBox="0 0 24 24" className="h-[15px] w-[15px]" fill="currentColor">
//     <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
//   </svg>
// );

const SOCIALS = [
  // { icon: <TwitterIcon />, href: 'https://www.linkedin.com/company/harvin-ai/home/', label: 'Twitter' },
  { icon: <LinkedInIcon />, href: 'https://www.linkedin.com/company/harvin-ai/home/', label: 'LinkedIn' },
  // { icon: <GitHubIcon />, href: 'https://github.com/harvinai', label: 'GitHub' },
];

/* ── Component ────────────────────────────────────────────────────────────── */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-[#0C0B09] text-white">
      {/* Ember hairline seam — ties the always-dark footer to the page above */}
      <div
        aria-hidden="true"
        className="h-px w-full bg-gradient-to-r from-transparent via-ember-500/40 to-transparent"
      />

      {/* ── Main grid (Brand + 5 Nav columns in single row on desktop) ──────── */}
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-x-6 gap-y-12 px-6 py-16 sm:grid-cols-3 md:grid-cols-[1.3fr_repeat(5,minmax(0,1fr))] lg:gap-x-8 lg:px-8 lg:py-20">
        {/* Brand column */}
        <div className="col-span-2 flex flex-col gap-6 sm:col-span-3 md:col-span-1 md:pr-4">
          <Link href="/" className="flex w-fit items-center rounded-xl bg-white px-4 py-3 shadow-sm">
            <img src="/harvin-logo.png" alt="Harvin" loading="lazy" className="h-[30px] w-auto" />
          </Link>

          <p className="max-w-[280px] text-[15px] font-normal leading-[1.65] text-white/55">
            The SDR management platform connecting your team &amp; workflows in one place.
          </p>

          <div className="flex items-center gap-2.5">
            {SOCIALS.map(({ icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.10] bg-white/[0.05]
                           text-white/50 transition-all duration-150
                           hover:border-white/25 hover:bg-white/[0.12] hover:text-white
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-500"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Nav columns */}
        {NAV_COLS.map((col) => (
          <nav key={col.heading} aria-label={col.heading} className="flex flex-col gap-4">
            <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-white/40">{col.heading}</p>
            <ul className="flex flex-col gap-3">
              {col.links.map((link) => {
                const cls = `w-fit text-[14px] text-white/60 transition-colors hover:text-white
                               focus-visible:outline-none focus-visible:text-white`;
                return (
                  <li key={link.label}>
                    {'external' in link && link.external ? (
                      <a href={link.href} className={cls}>{link.label}</a>
                    ) : (
                      <Link href={link.href} className={cls}>{link.label}</Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
        ))}
      </div>

      {/* ── Company registration ──────────────────────────────────────────── */}
      <div className="border-t border-white/[0.07]">
        <div className="mx-auto grid max-w-[1300px] grid-cols-1 items-start gap-8 px-6 py-10 sm:grid-cols-[1fr_auto] lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-12">
            {REGISTRATION.map((r) => (
              <div key={r.label} className={r.lines.length > 1 ? 'sm:col-span-2' : ''}>
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-white/35">{r.label}</p>
                <div className={`grid grid-cols-1 gap-5 ${r.lines.length > 1 ? 'sm:grid-cols-2 sm:gap-8' : ''}`}>
                  {r.lines.map((line) => (
                    <div key={line.value}>
                      <p className={`text-[13.5px] font-medium text-white/70 ${r.mono ? 'font-mono tracking-wide' : ''}`}>
                        {line.value}
                      </p>
                      {line.sub && <p className="mt-1 max-w-[230px] text-[12.5px] leading-relaxed text-white/40">{line.sub}</p>}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Ask AI — fills the third column of the address row */}
            <div>
              <p className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-white/35">
                <Sparkles size={12} className="text-ember-400" aria-hidden="true" />
                Ask AI about Harvin
              </p>
              <div className="flex items-center gap-2.5">
                {AI_TOOLS.map((tool) => (
                  <a
                    key={tool.name}
                    href={tool.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={copyPrompt}
                    aria-label={`Ask ${tool.name} about Harvin`}
                    title={`Ask ${tool.name}`}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.04]
                               text-white/65 transition-all duration-150
                               hover:-translate-y-0.5 hover:border-ember-500/60 hover:bg-white/[0.08] hover:text-white
                               focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-500"
                  >
                    <svg viewBox="0 0 24 24" className="h-[17px] w-[17px]" fill="currentColor" aria-hidden="true">
                      <path d={tool.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start gap-1 sm:items-end">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-white/35">Contact</p>
            <a
              href="mailto:admin@harvin.ai"
              className="text-[13.5px] text-white/70 transition-colors hover:text-ember-400"
            >
              admin@harvin.ai
            </a>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ────────────────────────────────────────────────────── */}
      <div className="border-t border-white/[0.07]">
        <div className="mx-auto flex max-w-[1300px] flex-col items-center justify-between gap-4 px-6 py-6 sm:flex-row lg:px-8">
          <p className="text-[12.5px] text-white/40">&copy; {year} Thyleads Pvt. Ltd. All rights reserved.</p>

          <div className="flex items-center gap-6">
            {[
              { label: 'Privacy', href: '/privacy' },
              { label: 'Terms', href: '/terms' },
              { label: 'Cookies', href: '/cookies' },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-[12.5px] text-white/40 transition-colors hover:text-white/75"
              >
                {item.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={openCookieSettings}
              className="text-[12.5px] text-white/40 transition-colors hover:text-white/75"
            >
              Cookie settings
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
