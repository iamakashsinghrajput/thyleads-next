// The dashboard lives in the portal app, not on this site. Every "Sign in" /
// "Dashboard" link points there. Override per-environment with NEXT_PUBLIC_PORTAL_URL.
export const PORTAL_URL =
  process.env.NEXT_PUBLIC_PORTAL_URL ||
  'https://portal-thyleads.com';

export function portalUrl(path = ''): string {
  const base = PORTAL_URL.replace(/\/+$/, '');
  if (!path) return base;
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

// The portal opens a tab via ?tab=<key> on its client workspace.
export function portalTab(tab: string): string {
  return portalUrl(`/?tab=${encodeURIComponent(tab)}`);
}
