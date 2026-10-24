import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: 'About Harvin — Building a better way to run SDR teams',
  description:
    'Harvin is an SDR Management platform built from firsthand experience running and managing sales development teams. Connecting account intelligence, execution, management and AE collaboration.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Harvin — Building a better way to run SDR teams',
    description:
      'Harvin is an SDR Management platform built from firsthand experience running and managing sales development teams.',
    url: '/about',
    images: ['/opengraph-image'],
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-sand-100 dark:bg-slate-950 transition-colors duration-300">
      <Navbar />
      <main>
        <AboutClient />
      </main>
      <Footer />
    </div>
  );
}
