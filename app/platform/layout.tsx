import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import { PLATFORM_FAQ } from '@/components/PlatformFaq';
import { faqSchema, graph, softwareSchema } from '@/lib/schema';

/**
 * /platform is a client component, so its metadata has to live in a layout —
 * `export const metadata` is ignored in any file marked 'use client'.
 */
export const metadata: Metadata = {
  title: 'SDR Management Platform — Every Module',
  description:
    'Every surface an SDR team runs on, sharing one account graph: team and territory management, account intelligence, buying signals, watchlists, look-a-like accounts, campaigns, dialer, meetings and reporting.',
  alternates: { canonical: '/platform' },
  openGraph: {
    title: 'Harvin — SDR Management Platform, module by module',
    description: 'Ownership, priorities, execution, meetings and pipeline reporting in one platform.',
    url: '/platform',
    images: ['/dashboard-preview.png'],
  },
};

export default function PlatformLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={graph(softwareSchema, faqSchema(PLATFORM_FAQ))} />
      {children}
    </>
  );
}
