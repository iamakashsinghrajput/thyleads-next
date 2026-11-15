'use client';

import { useState } from 'react';
import { X, ArrowRight, CheckCircle } from 'lucide-react';

export type ModalType = 'early-access' | 'talk-to-sales';

interface Props {
  open: boolean;
  type: ModalType;
  onClose: () => void;
}

type FormState = { name: string; email: string; company: string; role: string; message: string };
const INITIAL: FormState = { name: '', email: '', company: '', role: '', message: '' };

export default function EarlyAccessModal({ open, type, onClose }: Props) {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const isSales = type === 'talk-to-sales';

  const handleSubmit = async (e: { preventDefault(): void }) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, type }),
      });
    } catch {
      // Silently fail — still show success to user
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => { setForm(INITIAL); setSubmitted(false); }, 300);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/55" onClick={handleClose} />

      {/* Card */}
      <div className="relative z-10 w-full max-w-[480px] rounded-modal bg-white dark:bg-surface border border-slate-200 dark:border-rule">

        <button
          onClick={handleClose}
          aria-label="Close"
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-btn text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.08] transition-colors"
        >
          <X size={16} />
        </button>

        <div className="px-8 py-8">
          {!submitted ? (
            <>
              <div className="mb-6">
                <h2 className="font-display font-medium text-[32px] leading-[1.1] text-slate-900 dark:text-white">
                  {isSales ? 'Talk to our sales team' : 'Get early access'}
                </h2>
                <p className="mt-2 text-[16px] leading-[1.5] text-slate-600 dark:text-slate-300">
                  {isSales
                    ? "Tell us about your team and we'll get back within 24 hours."
                    : 'Be among the first to find D2C opportunities with Harvin.'}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-3">
                  <label className="flex flex-col gap-1.5">
                    <span className="text-[14px] font-medium text-slate-600 dark:text-slate-300">Full name *</span>
                    <input
                      required
                      type="text"
                      placeholder="Rahul Sharma"
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      className="h-11 px-3.5 rounded-btn border border-slate-200 dark:border-rule bg-slate-50 dark:bg-slate-950 text-[15px] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-ember-500 dark:focus:border-ember-500 transition-colors"
                    />
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className="text-[14px] font-medium text-slate-600 dark:text-slate-300">Work email *</span>
                    <input
                      required
                      type="email"
                      placeholder="you@company.com"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      className="h-11 px-3.5 rounded-btn border border-slate-200 dark:border-rule bg-slate-50 dark:bg-slate-950 text-[15px] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-ember-500 dark:focus:border-ember-500 transition-colors"
                    />
                  </label>
                </div>

                <label className="flex flex-col gap-1.5">
                  <span className="text-[14px] font-medium text-slate-600 dark:text-slate-300">Company *</span>
                  <input
                    required
                    type="text"
                    placeholder="Acme Corp"
                    value={form.company}
                    onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                    className="h-11 px-3.5 rounded-btn border border-slate-200 dark:border-rule bg-slate-50 dark:bg-slate-950 text-[15px] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-ember-500 dark:focus:border-ember-500 transition-colors"
                  />
                </label>

                <label className="flex flex-col gap-1.5">
                  <span className="text-[14px] font-medium text-slate-600 dark:text-slate-300">Your role *</span>
                  <input
                    required
                    type="text"
                    placeholder="Head of Sales"
                    value={form.role}
                    onChange={e => setForm(f => ({ ...f, role: e.target.value }))}
                    className="h-11 px-3.5 rounded-btn border border-slate-200 dark:border-rule bg-slate-50 dark:bg-slate-950 text-[15px] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-ember-500 dark:focus:border-ember-500 transition-colors"
                  />
                </label>

                {isSales && (
                  <label className="flex flex-col gap-1.5">
                    <span className="text-[14px] font-medium text-slate-600 dark:text-slate-300">Message</span>
                    <textarea
                      rows={3}
                      placeholder="Tell us about your use case..."
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      className="px-3.5 py-2.5 rounded-btn border border-slate-200 dark:border-rule bg-slate-50 dark:bg-slate-950 text-[15px] text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-ember-500 dark:focus:border-ember-500 transition-colors resize-none"
                    />
                  </label>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-1 w-full h-11 rounded-btn bg-ember-500 hover:bg-ember-400 text-pure text-[15px] font-semibold flex items-center justify-center gap-2 transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-surface"
                >
                  {loading ? (
                    <span>Sending…</span>
                  ) : (
                    <>
                      {isSales ? 'Send message' : 'Request early access'}
                      <ArrowRight size={15} strokeWidth={2.5} />
                    </>
                  )}
                </button>

                <p className="text-[13px] text-slate-500 dark:text-slate-400">
                  No credit card required · We&apos;ll never spam you
                </p>
              </form>
            </>
          ) : (
            <div className="flex flex-col items-start py-4">
              <CheckCircle size={24} aria-hidden="true" className="mb-5 text-ember-600 dark:text-ember-400" strokeWidth={1.8} />
              <h2 className="font-display font-medium text-[32px] leading-[1.1] text-slate-900 dark:text-white mb-3">
                {isSales ? 'Message received!' : "You're on the list!"}
              </h2>
              <p className="text-[16px] leading-[1.5] text-slate-600 dark:text-slate-300 max-w-[360px]">
                {isSales
                  ? 'Our sales team will reach out within 24 hours.'
                  : "We'll send early access details to your email. Thanks for your interest in Harvin!"}
              </p>
              <button
                onClick={handleClose}
                className="mt-6 px-6 py-2.5 rounded-btn border border-slate-200 dark:border-rule text-[14px] font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/[0.05] transition-colors"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
