import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductTourClient from './ProductTourClient';

export const metadata: Metadata = {
  title: 'Product Tour — See How the SDR Operation Comes Together | Harvin',
  description:
    'See how work moves seamlessly between SDRs, SDR Heads, and AEs, from first signal to final outcome. Explore the 8 connected steps of Harvin.',
  alternates: { canonical: '/product-tour' },
  openGraph: {
    title: 'Product Tour — See How the SDR Operation Comes Together | Harvin',
    description:
      'See how work moves seamlessly between SDRs, SDR Heads, and AEs, from first signal to final outcome.',
    url: '/product-tour',
    images: ['/opengraph-image'],
  },
};

export default function ProductTourPage() {
  return (
    <div className="dark min-h-screen bg-slate-950 text-white [color-scheme:dark]">
      <Navbar alwaysDark />
      <main>
        <ProductTourClient />
      </main>
      <Footer />
    </div>
  );
}
