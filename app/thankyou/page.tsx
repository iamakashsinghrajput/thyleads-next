'use client';

import { useEffect, useState } from 'react';
import { signOut } from 'next-auth/react';
import { Check } from 'lucide-react';

import ThemeToggle from '@/components/ThemeToggle';

export default function ThankYouPage() {
  const [name, setName] = useState('');

  useEffect(() => {
    try {
      const u = localStorage.getItem('harvin_user');
      if (u) {
        const parsed = JSON.parse(u);
        setName(parsed.name?.split(' ')[0] || '');
      }
    } catch {}
  }, []);

  const handleLogout = () => {
    ['harvin_user', 'harvin_onboarding', 'harvin_dashboard_filters'].forEach(k => localStorage.removeItem(k));
    signOut({ callbackUrl: '/' });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4">
      <ThemeToggle />

      <div className="max-w-[560px] w-full">
        <div className="bg-white dark:bg-surface border border-slate-200 dark:border-rule rounded-panel p-8 sm:p-10">
          {/* Logo */}
          <div className="mb-10">
            <img src="/harvin-logo.png" alt="Harvin" loading="eager" className="block dark:hidden h-[30px] w-auto" />
            <img src="/harvin-logo-light.png" alt="Harvin" loading="eager" className="hidden dark:block h-[30px] w-auto" />
          </div>

          {/* Checkmark */}
          <Check size={24} strokeWidth={2.4} aria-hidden="true" className="mb-6 text-ember-600 dark:text-ember-400" />

          {/* Message */}
          <h1 className="font-display font-medium text-[clamp(36px,5vw,48px)] leading-[1.05] text-slate-900 dark:text-white mb-4">
            Thank you{name ? `, ${name}` : ''}!
          </h1>
          <p className="text-[18px] leading-[1.5] text-slate-600 dark:text-slate-300 mb-2">
            We appreciate your interest in Harvin.
          </p>
          <p className="text-[17px] leading-[1.5] text-slate-600 dark:text-slate-300 mb-8">
            Our platform is currently in early access. We&apos;ll review your account and notify you as soon as access is available for you.
          </p>

          {/* What to expect */}
          <div className="border-t border-slate-200 dark:border-rule pt-6 mb-8">
            <p className="text-[14px] font-medium text-slate-500 dark:text-slate-400 mb-4">What to expect</p>
            <ol className="space-y-3.5">
              {[
                { icon: '1', text: 'Your account is being reviewed by our team' },
                { icon: '2', text: 'You\'ll receive an email once your access is approved' },
                { icon: '3', text: 'Full access to brand intelligence, tech detection & more' },
              ].map(item => (
                <li key={item.icon} className="flex items-start gap-4">
                  <span className="font-display text-[18px] font-medium leading-[1.4] text-slate-500 dark:text-slate-400 w-4 flex-shrink-0">{item.icon}</span>
                  <p className="text-[16px] leading-[1.5] text-slate-700 dark:text-slate-300">{item.text}</p>
                </li>
              ))}
            </ol>
          </div>

          {/* Contact */}
          <p className="text-[15px] text-slate-500 dark:text-slate-400 mb-8">
            Questions? Reach us at{' '}
            <a href="mailto:admin@harvin.ai" className="font-medium text-slate-900 dark:text-white underline decoration-slate-400 underline-offset-4 hover:decoration-slate-900 dark:hover:decoration-white">admin@harvin.ai</a>
          </p>

          <div className="flex flex-wrap items-center gap-6">
            <a href="/"
              className="inline-flex items-center px-6 py-3 rounded-btn bg-ember-500 text-pure text-[15px] font-semibold hover:bg-ember-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-surface">
              Back to Homepage
            </a>
            <button onClick={handleLogout}
              className="text-[15px] font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
              Sign out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
