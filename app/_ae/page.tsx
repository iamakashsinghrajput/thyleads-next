import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { AeClient } from './AeClient';

export const metadata: Metadata = {
  title: 'For Account Executives — Walk in Knowing What Happened | Harvin',
  description:
    'Harvin gives Account Executives the context behind every SDR-booked meeting. Walk in knowing what happened. Walk out knowing what\'s next.',
  alternates: { canonical: '/ae' },
  openGraph: {
    title: 'For Account Executives — Walk in Knowing What Happened | Harvin',
    description:
      'Keep outcomes, follow-ups, opportunities, and Digital Sales Rooms connected to every SDR-booked meeting.',
    url: '/ae',
    images: ['/opengraph-image'],
  },
};

export default function AePage() {
  return (
    <div className="min-h-screen bg-sand-100 dark:bg-slate-950 transition-colors duration-300">
      <Navbar />
      <main>
        <AeClient />
      </main>
      <Footer />
    </div>
  );
}
