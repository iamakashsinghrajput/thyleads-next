'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { AnimatePresence, motion } from 'framer-motion';
import { Cookie, X } from 'lucide-react';

/* ── Consent storage ──────────────────────────────────────────────────────
   The choice lives in a first-party cookie (not localStorage) so the server
   can read it too if it ever needs to. Essential cookies (session, CSRF,
   auth) are always allowed; the choice only governs analytics — the
   Google Analytics cookies listed on /cookies. GA is only ever loaded after
   an explicit Accept, and only when NEXT_PUBLIC_GA_ID is configured.
   ─────────────────────────────────────────────────────────────────────── */
type Consent = 'accepted' | 'declined';

const CONSENT_COOKIE = 'harvin_cookie_consent';
const MAX_AGE = 60 * 60 * 24 * 365; // 1 year
const OPEN_EVENT = 'harvin:cookie-settings';
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

function readConsent(): Consent | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${CONSENT_COOKIE}=(accepted|declined)`));
  return match ? (match[1] as Consent) : null;
}

function writeConsent(value: Consent) {
  const secure = location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${CONSENT_COOKIE}=${value}; Max-Age=${MAX_AGE}; Path=/; SameSite=Lax${secure}`;
}

/* GA sets its cookies on the registrable domain, so clear on every parent
   domain of the current host as well as host-only. */
function clearAnalyticsCookies() {
  const names = document.cookie
    .split('; ')
    .map((c) => c.split('=')[0])
    .filter((n) => n === '_ga' || n === '_gid' || n.startsWith('_ga_') || n === '_gat');
  const parts = location.hostname.split('.');
  const domains = [''];
  for (let i = 0; i < parts.length - 1; i++) domains.push(`; Domain=.${parts.slice(i).join('.')}`);
  for (const n of names) for (const d of domains) document.cookie = `${n}=; Max-Age=0; Path=/${d}`;
}

/** Re-opens the banner — wire to any "Cookie settings" link. */
export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export default function CookieConsent() {
  const [consent, setConsent] = useState<Consent | null>(null);
  const [open, setOpen] = useState(false);

  /* Read after mount: the server has no access to document.cookie, so
     rendering the banner during SSR would mismatch on hydration. */
  useEffect(() => {
    const saved = readConsent();
    setConsent(saved);
    // Let the page settle before asking — the banner slides in after 1.5s.
    const timer = saved ? undefined : setTimeout(() => setOpen(true), 1500);

    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, reopen);
    return () => {
      clearTimeout(timer);
      window.removeEventListener(OPEN_EVENT, reopen);
    };
  }, []);

  const choose = (value: Consent) => {
    writeConsent(value);
    setConsent(value);
    setOpen(false);
    if (value === 'declined') {
      // Stops an already-loaded gtag from writing again this page view.
      if (GA_ID) (window as unknown as Record<string, boolean>)[`ga-disable-${GA_ID}`] = true;
      clearAnalyticsCookies();
    } else if (GA_ID) {
      (window as unknown as Record<string, boolean>)[`ga-disable-${GA_ID}`] = false;
    }
  };

  return (
    <>
      {GA_ID && consent === 'accepted' && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
          </Script>
        </>
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="false"
            aria-labelledby="cookie-consent-title"
            aria-describedby="cookie-consent-desc"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
            exit={{ opacity: 0, y: 12, transition: { duration: 0.18 } }}
            className="fixed inset-x-4 bottom-4 z-[60] mx-auto max-w-8xl
                       flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-8
                       rounded-modal border border-slate-200 bg-white p-5
                       shadow-[0_8px_30px_rgba(0,0,0,0.08)]
                       dark:border-white/[0.08] dark:bg-[#0F0E0C] dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)]"
          >
            {/* Only closable once a choice exists — a first visit must answer. */}
            {consent && (
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close cookie settings"
                className="absolute right-3 top-3 rounded-btn p-1 text-slate-400 transition-colors
                           hover:bg-slate-100 hover:text-slate-700
                           dark:text-slate-500 dark:hover:bg-white/[0.06] dark:hover:text-slate-200"
              >
                <X size={16} />
              </button>
            )}

            <div className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-btn bg-ember-50 text-ember-500 dark:bg-ember-500/10 dark:text-ember-300">
                <Cookie size={18} aria-hidden="true" />
              </span>
              <div className="min-w-0 pr-6 md:pr-0">
                <p id="cookie-consent-title" className="text-[14.5px] font-semibold text-slate-900 dark:text-white">
                  We use cookies
                </p>
                <p id="cookie-consent-desc" className="mt-1 text-[13px] leading-relaxed text-slate-500 dark:text-slate-400">
                  Essential cookies keep the site working. With your OK we also use analytics cookies to
                  understand how the site is used.{' '}
                  <Link href="/cookies" className="font-medium text-ember-500 underline-offset-2 hover:underline dark:text-ember-300">
                    Cookie policy
                  </Link>
                </p>
                {consent && (
                  <p className="mt-2 text-[12px] text-slate-400 dark:text-slate-500">
                    Current choice:{' '}
                    <span className="font-medium text-slate-600 dark:text-slate-300">
                      {consent === 'accepted' ? 'Accepted' : 'Declined'}
                    </span>
                  </p>
                )}
              </div>
            </div>

            <div className={`grid shrink-0 grid-cols-2 gap-2 md:flex ${consent ? 'md:pr-6' : ''}`}>
              <button
                type="button"
                onClick={() => choose('declined')}
                className="rounded-btn border border-slate-200 bg-white px-5 py-2 text-[13.5px] font-semibold text-slate-700 transition-colors
                           hover:bg-slate-50
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-500
                           dark:border-white/[0.12] dark:bg-transparent dark:text-slate-200 dark:hover:bg-white/[0.05]"
              >
                Decline
              </button>
              <button
                type="button"
                onClick={() => choose('accepted')}
                className="rounded-btn bg-ember-500 px-5 py-2 text-[13.5px] font-semibold text-white transition-all duration-150
                           shadow-[0_1px_4px_rgba(201,76,30,0.3)]
                           hover:bg-ember-400 hover:shadow-[0_4px_14px_rgba(201,76,30,0.4)]
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-500
                           dark:bg-ember-500 dark:hover:bg-ember-400"
              >
                Accept
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
