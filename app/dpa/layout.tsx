import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Data Processing Addendum',
  description:
    'The Harvin.ai Data Processing Addendum: how Thyleads Private Limited processes Customer Personal Data on behalf of customers.',
  alternates: { canonical: '/dpa' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
