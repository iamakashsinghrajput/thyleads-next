import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SdrHeadClient from './SdrHeadClient';

export const metadata: Metadata = {
  title: 'For SDR Heads — Know Where Your Team Needs You | Harvin',
  description:
    'Run your SDR team from one connected workspace for performance, accounts, meetings, and coaching. Clear visibility into what happened, why, and where to coach.',
  alternates: { canonical: '/sdr-head' },
  openGraph: {
    title: 'For SDR Heads — Know Where Your Team Needs You | Harvin',
    description:
      'Run your SDR team from one connected workspace for performance, accounts, meetings and coaching.',
    url: '/sdr-head',
    images: ['/opengraph-image'],
  },
};

export default function SdrHeadPage() {
  return (
    <div className="min-h-screen bg-sand-100 dark:bg-slate-950 transition-colors duration-300">
      <Navbar />
      <main>
        <SdrHeadClient />
      </main>
      <Footer />
    </div>
  );
}
