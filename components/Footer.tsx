'use client';

import Link from 'next/link';

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
      { label: 'Overview', href: '/product' },
      { label: 'Platform', href: '/platform' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Tech Scanner', href: '/dashboard?tab=tech-scanner' },
    ],
  },
  {
    heading: 'Account',
    links: [
      { label: 'Sign in', href: '/signin' },
      { label: 'Create account', href: '/signup' },
      { label: 'Dashboard', href: '/dashboard' },
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
  { label: 'Registered company', value: 'Harvin AI Ltd', sub: 'Registered in England and Wales' },
  { label: 'Company number', value: '17080422', mono: true },
  { label: 'Registered office', value: '124 City Road, London', sub: 'EC1V 2NX, United Kingdom' },
];

/* ── Social icons ─────────────────────────────────────────────────────────── */
const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" className="h-[15px] w-[15px]" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.632 5.905-5.632Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" className="h-[15px] w-[15px]" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" className="h-[15px] w-[15px]" fill="currentColor">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const SOCIALS = [
  { icon: <TwitterIcon />,  href: 'https://twitter.com/harvinai',          label: 'Twitter'  },
  { icon: <LinkedInIcon />, href: 'https://linkedin.com/company/harvinai', label: 'LinkedIn' },
  { icon: <GitHubIcon />,   href: 'https://github.com/harvinai',           label: 'GitHub'   },
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

      {/* ── Main grid ─────────────────────────────────────────────────────── */}
      <div className="mx-auto grid max-w-[1300px] grid-cols-2 gap-x-8 gap-y-12 px-6 py-20 md:grid-cols-[1.6fr_1fr_1fr_1fr] lg:px-8 lg:py-24">
        {/* Brand column */}
        <div className="col-span-2 flex flex-col gap-7 md:col-span-1 md:pr-8">
          <Link href="/" className="flex w-fit items-center gap-0.5">
            <span className="h-9 w-10 flex-shrink-0 overflow-hidden">
              <img src="/logo1.png" alt="" aria-hidden="true" className="h-9 w-auto max-w-none" />
            </span>
            <span className="font-bricolage text-[31px] font-bold leading-none tracking-normal text-white">
              Harvin
            </span>
          </Link>

          <p className="max-w-[300px] text-[15px] leading-[1.7] text-white/55">
            An AI-native GTM platform — account intelligence, live buying signals and
            intelligence-led outbound, in one place.
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
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="w-fit text-[14px] text-white/60 transition-colors hover:text-white
                               focus-visible:outline-none focus-visible:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      {/* ── Company registration ──────────────────────────────────────────── */}
      <div className="border-t border-white/[0.07]">
        <div className="mx-auto grid max-w-[1300px] grid-cols-1 items-start gap-8 px-6 py-10 sm:grid-cols-[1fr_auto] lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-12">
            {REGISTRATION.map((r) => (
              <div key={r.label}>
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-white/35">{r.label}</p>
                <p className={`text-[13.5px] font-medium text-white/70 ${r.mono ? 'font-mono tracking-wide' : ''}`}>
                  {r.value}
                </p>
                {r.sub && <p className="mt-1 text-[12.5px] leading-relaxed text-white/40">{r.sub}</p>}
              </div>
            ))}
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
          <p className="text-[12.5px] text-white/40">&copy; {year} Harvin AI Ltd. All rights reserved.</p>

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
          </div>
        </div>
      </div>
    </footer>
  );
}
