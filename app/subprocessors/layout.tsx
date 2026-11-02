import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Subprocessor List',
  description:
    'The third-party service providers Harvin.ai uses that may process Customer Personal Data as Subprocessors.',
  alternates: { canonical: '/subprocessors' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
