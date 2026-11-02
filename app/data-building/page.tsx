import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DataBuildingClient from './DataBuildingClient';

export const metadata: Metadata = {
  title: 'Data Building — Find the Companies and Decision-Makers That Fit | Harvin',
  description:
    'Harvin learns what you sell, who converts and who doesn’t, then discovers, researches and enriches a market around that context — high-fit companies, the right decision-makers, verified contacts and signals.',
  alternates: { canonical: '/data-building' },
  openGraph: {
    title: 'Data Building — Find the Companies and Decision-Makers That Fit | Harvin',
    description:
      'Turn your business context into a sales-ready market: company discovery, research, Company Fit, decision-maker matching and verified email and phone.',
    url: '/data-building',
    images: ['/opengraph-image'],
  },
};

export default function DataBuildingPage() {
  return (
    <div className="min-h-screen bg-sand-100 dark:bg-slate-950 transition-colors duration-300">
      <Navbar />
      <main>
        <DataBuildingClient />
      </main>
      <Footer />
    </div>
  );
}
