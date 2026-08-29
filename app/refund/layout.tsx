import type { Metadata } from 'next';

/**
 * Without this the page inherits the ROOT metadata wholesale — including
 * `alternates.canonical: '/'`. Next does not recompute a canonical per
 * segment, so five legal pages would each tell Google the homepage is the
 * authoritative version of their content, and each would carry the homepage's
 * title and description too. That is a duplicate-content report waiting to
 * happen, not a cosmetic gap.
 */
export const metadata: Metadata = {
  title: 'Refund Policy',
  description: 'How refunds and cancellations work for Harvin subscriptions.',
  alternates: { canonical: '/refund' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
