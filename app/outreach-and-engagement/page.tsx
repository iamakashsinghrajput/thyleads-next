import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import OutreachClient from './OutreachClient';

export const metadata: Metadata = {
  title: 'Sales Engagement & Outreach — Harvin',
  description:
    'Engage across channels. Keep every interaction connected to the account. Run multi-channel outreach including email, dialer and LinkedIn with full context and conversation history.',
  alternates: { canonical: '/outreach-and-engagement' },
  openGraph: {
    title: 'Sales Engagement & Outreach — Harvin',
    description:
      'Run multi-channel outreach including email and call from one workspace, with the account context, conversation history and next steps you need at every stage of outreach.',
    url: '/outreach-and-engagement',
    images: ['/opengraph-image'],
  },
};

export default function OutreachAndEngagementPage() {
  return (
    <div className="min-h-screen bg-sand-100 dark:bg-slate-950 transition-colors duration-300">
      <Navbar />
      <main>
        <OutreachClient />
      </main>
      <Footer />
    </div>
  );
}
