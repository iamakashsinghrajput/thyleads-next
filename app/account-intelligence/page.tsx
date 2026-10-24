import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AccountIntelligenceClient from './AccountIntelligenceClient';

export const metadata: Metadata = {
  title: 'Account Intelligence Platform — Harvin',
  description:
    'Turn account signals into your next move. See the signals, activity and context behind every account, so your team knows what matters, why now and who to engage.',
  alternates: { canonical: '/account-intelligence' },
  openGraph: {
    title: 'Account Intelligence Platform — Harvin',
    description:
      'Turn account signals into your next move. See the signals, activity and context behind every account with Account 360.',
    url: '/account-intelligence',
    images: ['/opengraph-image'],
  },
};

export default function AccountIntelligencePage() {
  return (
    <div className="min-h-screen bg-sand-100 dark:bg-slate-950 transition-colors duration-300">
      <Navbar />
      <main>
        <AccountIntelligenceClient />
      </main>
      <Footer />
    </div>
  );
}
