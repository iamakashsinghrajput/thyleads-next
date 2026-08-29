'use client';

import { useState } from 'react';
import { ArrowRight, Check, AlertCircle } from 'lucide-react';

/**
 * The contact form posts to the same /api/notify handler the early-access
 * modal uses, with type 'talk-to-sales' — which is what makes the admin mail
 * and the auto-reply come out worded for a sales enquiry.
 *
 * UNLIKE THE MODAL, a failure here is shown. The modal swallows the error and
 * renders success regardless, which is survivable for a waitlist signup and is
 * not survivable on a contact page: someone who believes they have reached us
 * and has not will simply never follow up. On failure the email address is put
 * in front of them instead.
 */

const FIELD =
  'h-11 w-full rounded-btn border border-slate-200 bg-white px-3.5 text-[14.5px] text-slate-900 transition-colors placeholder:text-slate-400 focus:border-ember-500 focus:outline-none focus:ring-2 focus:ring-ember-500/20 dark:border-white/[0.12] dark:bg-white/[0.04] dark:text-white dark:placeholder:text-slate-500';

const LABEL = 'text-[12.5px] font-medium text-slate-600 dark:text-slate-400';

type Form = { name: string; email: string; company: string; role: string; message: string };
const EMPTY: Form = { name: '', email: '', company: '', role: '', message: '' };

export default function ContactForm() {
  const [form, setForm] = useState<Form>(EMPTY);
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const set =
    (key: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState('sending');

    try {
      const res = await fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, type: 'talk-to-sales' }),
      });
      if (!res.ok) throw new Error(`notify responded ${res.status}`);
      setState('sent');
    } catch {
      setState('error');
    }
  }

  if (state === 'sent') {
    return (
      <div className="rounded-card border border-emerald-500/30 bg-emerald-500/[0.06] p-8">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/15">
          <Check size={18} strokeWidth={2.6} className="text-emerald-600 dark:text-emerald-400" />
        </div>
        <h2 className="mt-5 text-[19px] font-bold tracking-[-0.015em] text-slate-900 dark:text-white">
          Message sent
        </h2>
        <p className="mt-2.5 text-[15px] leading-[1.7] text-slate-600 dark:text-slate-400">
          Thanks {form.name.split(' ')[0]} — a confirmation is on its way to {form.email}. We reply
          within one working day. If it has not landed, check your spam folder or write to{' '}
          <a
            href="mailto:admin@harvin.ai"
            className="font-semibold text-ember-600 underline underline-offset-4 dark:text-ember-300"
          >
            admin@harvin.ai
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className={LABEL}>Full name *</span>
          <input
            required
            type="text"
            autoComplete="name"
            placeholder="Rahul Sharma"
            value={form.name}
            onChange={set('name')}
            className={FIELD}
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className={LABEL}>Work email *</span>
          <input
            required
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            value={form.email}
            onChange={set('email')}
            className={FIELD}
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className={LABEL}>Company *</span>
          <input
            required
            type="text"
            autoComplete="organization"
            placeholder="Acme Corp"
            value={form.company}
            onChange={set('company')}
            className={FIELD}
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className={LABEL}>Your role *</span>
          <input
            required
            type="text"
            autoComplete="organization-title"
            placeholder="Head of Sales"
            value={form.role}
            onChange={set('role')}
            className={FIELD}
          />
        </label>
      </div>

      <label className="flex flex-col gap-1.5">
        <span className={LABEL}>What would you like to talk about?</span>
        <textarea
          rows={5}
          placeholder="How big is your SDR team, what are you using today, and what is not working?"
          value={form.message}
          onChange={set('message')}
          className={`${FIELD} h-auto resize-y py-3 leading-[1.6]`}
        />
      </label>

      {state === 'error' && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-btn border border-red-500/30 bg-red-500/[0.06] px-4 py-3"
        >
          <AlertCircle
            size={16}
            strokeWidth={2.2}
            aria-hidden="true"
            className="mt-0.5 flex-shrink-0 text-red-600 dark:text-red-400"
          />
          <p className="text-[13.5px] leading-[1.6] text-slate-700 dark:text-slate-300">
            That did not go through. Please email{' '}
            <a
              href="mailto:admin@harvin.ai"
              className="font-semibold text-ember-600 underline underline-offset-4 dark:text-ember-300"
            >
              admin@harvin.ai
            </a>{' '}
            directly and we will pick it up from there.
          </p>
        </div>
      )}

      <div className="mt-1 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={state === 'sending'}
          className="inline-flex items-center gap-2 rounded-btn bg-ember-500 px-5 py-3 text-[14px] font-semibold text-white shadow-[0_1px_4px_rgba(201,76,30,0.3)] transition-all hover:bg-ember-400 hover:shadow-[0_4px_14px_rgba(201,76,30,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {state === 'sending' ? 'Sending…' : 'Send message'}
          {state !== 'sending' && <ArrowRight size={15} strokeWidth={2.4} aria-hidden="true" />}
        </button>
        <p className="text-[12.5px] text-slate-500 dark:text-slate-500">
          We reply within one working day.
        </p>
      </div>
    </form>
  );
}
