import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog — Outbound, Intent Data and GTM',
  description:
    'Field notes on running a sales development team: intent data, outbound sequences, territory coverage, enrichment and pipeline reporting — written from the campaigns we run.',
  alternates: { canonical: '/blog' },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
