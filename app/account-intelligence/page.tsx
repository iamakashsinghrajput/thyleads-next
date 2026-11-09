import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AccountIntelligenceClient from './AccountIntelligenceClient';

export const metadata: Metadata = {
  title: 'Account Intelligence — Know Which Accounts to Work, and Why Now | Harvin',
  description:
    'Harvin combines Company Fit with 20+ signal types, then puts company research, decision-makers and verified email and phone for every account in one view.',
  alternates: { canonical: '/account-intelligence' },
  openGraph: {
    title: 'Account Intelligence — Know Which Accounts to Work, and Why Now | Harvin',
    description:
      'Company Fit tells you who. Signals tell you when. Account 360 shows why it fits, what changed and who to reach.',
    url: '/account-intelligence',
    images: ['/opengraph-image'],
  },
};

export default function AccountIntelligencePage() {
  return (
    // This page is always dark (like /pricing and /data-building): the `dark` class here
    // switches every dark: variant below (Navbar, sections, footer) regardless of the site theme toggle.
    <div className="dark min-h-screen bg-slate-950 text-white [color-scheme:dark]">
      <Navbar alwaysDark />
      <main>
        <AccountIntelligenceClient />
      </main>
      <Footer />
    </div>
  );
}
