import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SdrClient from './SdrClient';

export const metadata: Metadata = {
  title: 'For SDRs — Start Your Day Knowing What Matters | Harvin',
  description:
    'Start your day knowing what matters, why, and what to do next. Harvin gives SDRs one connected workspace for priorities, research, outreach, and AE handoffs.',
  alternates: { canonical: '/sdr' },
  openGraph: {
    title: 'For SDRs — Start Your Day Knowing What Matters | Harvin',
    description:
      'Prioritize accounts, understand buying signals, run multi-channel outreach, and pass context forward to AEs.',
    url: '/sdr',
    images: ['/opengraph-image'],
  },
};

export default function SdrPage() {
  return (
    <div className="min-h-screen bg-sand-100 dark:bg-slate-950 transition-colors duration-300">
      <Navbar />
      <main>
        <SdrClient />
      </main>
      <Footer />
    </div>
  );
}
