import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Your Privacy Choices — Do Not Sell or Share My Personal Information',
  description:
    'Opt out of sale or sharing, targeted advertising, or request removal, access, correction or deletion of your personal information at Harvin.ai.',
  alternates: { canonical: '/privacy-choices' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
