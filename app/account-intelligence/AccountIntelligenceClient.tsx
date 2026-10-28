'use client';

import { useState, type ReactNode } from 'react';
import {
  ArrowRight,
  Banknote,
  Building2,
  Check,
  Globe,
  MapPin,
  Plus,
  Radio,
  Search,
  Target,
  Users,
} from 'lucide-react';
import { useModal } from '@/components/ModalContext';
import { Account360Mock, CARD, Chip, Frame, LivePill, Mono, PriorityMock, useTicker } from '@/components/ProductMocks';

/* ═══ Page-specific mock ═══════════════════════════════════════════════════════ */

/* ─── "More than a company profile" ───────────────────────────────────────── */
const PROFILE = [
  { icon: Building2, k: 'Industry', v: 'B2B SaaS' },
  { icon: Users, k: 'Employees', v: '420' },
  { icon: MapPin, k: 'HQ', v: 'Bengaluru, India' },
  { icon: Banknote, k: 'Revenue', v: '$40–60M' },
  { icon: Globe, k: 'Website', v: 'initech.io' },
];

const QUESTIONS = [
  { q: 'Why does this account matter?', a: 'ICP fit 92 · mid-market SaaS, sales-led', chip: <Chip tone="slate">Fit A</Chip> },
  { q: 'Why now?', a: 'Raised Series B · hiring 6 SDRs', chip: <Chip tone="ember">2 signals</Chip> },
  { q: 'Who should we engage?', a: 'Priya Sharma, VP Sales · verified', chip: <Chip tone="emerald">Contact ready</Chip> },
];

function ProfileMock() {
  const tick = useTicker(1100);
  const shown = Math.min(tick % 6, 3); // reveal 1→3, hold, restart

  return (
    <div className="flex h-full items-stretch gap-4 p-6">
      <div className={`w-[200px] shrink-0 p-4 ${CARD}`}>
        <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-slate-400">Company profile</p>
        <div className="mt-3 flex items-center gap-2.5">
          <Mono name="Initech" className="h-8 w-8 bg-slate-800 text-[12px]" />
          <span>
            <span className="block text-[12.5px] font-semibold text-slate-900">Initech Systems</span>
            <span className="block text-[9.5px] text-slate-400">Who the account is</span>
          </span>
        </div>
        <div className="mt-4 space-y-2.5">
          {PROFILE.map(({ icon: Icon, k, v }) => (
            <div key={k} className="flex items-center gap-2 text-[10.5px]">
              <Icon size={12} className="text-slate-400" />
              <span className="w-[62px] text-slate-400">{k}</span>
              <span className="font-medium text-slate-700">{v}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex w-6 shrink-0 items-center justify-center text-ember-500">
        <ArrowRight size={18} strokeWidth={2.5} />
      </div>

      <div className="flex-1 rounded-card border border-ember-300 bg-white p-4 shadow-[0_0_0_4px_rgba(201,76,30,0.06),0_4px_32px_rgba(0,0,0,0.06)]">
        <div className="flex items-center justify-between">
          <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-ember-500">Account intelligence</p>
          <LivePill>Updated now</LivePill>
        </div>
        <p className="mt-2 text-[12.5px] font-semibold text-slate-900">What&apos;s happening right now</p>
        <div className="mt-3 space-y-2.5">
          {QUESTIONS.map((item, i) => (
            <div
              key={item.q}
              className={`rounded-btn border px-3 py-2.5 transition-all duration-500 ${
                i < shown ? 'border-slate-200 bg-sand-50 opacity-100' : 'translate-y-1 border-dashed border-slate-200 opacity-40'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-2 text-[11px] font-semibold text-slate-900">
                  <span className={`flex h-4 w-4 items-center justify-center rounded-full ${i < shown ? 'bg-ember-500 text-white' : 'bg-slate-200 text-transparent'}`}>
                    <Check size={9} strokeWidth={3} />
                  </span>
                  {item.q}
                </span>
                {i < shown && item.chip}
              </div>
              <p className="mt-1 pl-6 text-[10px] text-slate-500">{i < shown ? item.a : '—'}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════════════════════════ */

function Eyebrow({ children, center }: { children: ReactNode; center?: boolean }) {
  return (
    <p className={`flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-ember-500 ${center ? 'justify-center' : ''}`}>
      <span aria-hidden="true" className="h-px w-6 bg-ember-500" />
      {children}
    </p>
  );
}

const H2 = 'font-instrument font-semibold text-[clamp(30px,3.6vw,46px)] leading-[1.08] tracking-[-0.025em] text-slate-950 dark:text-white';
const SURFACE =
  'rounded-modal border border-slate-200 bg-sand-50 shadow-[0_4px_32px_rgba(0,0,0,0.06)] dark:border-white/[0.08] dark:bg-[#0F0E0C] dark:shadow-[0_4px_40px_rgba(0,0,0,0.35)]';

const PILLARS = [
  { icon: Target, title: 'Prioritize the right accounts', body: 'See the signals and account activity behind your priorities, so attention goes to accounts with a reason to engage.' },
  { icon: Search, title: 'Research without the tab switching', body: 'Find company information, contacts, signals and previous activity in the same account view.' },
  { icon: Users, title: 'Keep the whole team aligned', body: 'Give SDRs, SDR Heads and AEs the same account context, so the account story doesn’t have to be rebuilt at every stage.' },
];

const FEATURES_360 = [
  { title: 'Intent & Fit', desc: 'Understand relevance and priority based on ICP fit, intent signals, and score.' },
  { title: 'Buying Signals', desc: 'See funding, hiring, technology changes, and events that create reasons to engage.' },
  { title: 'Key Contacts', desc: 'Find decision-makers with direct roles and verified contact details.' },
  { title: 'Recent Activity', desc: 'Track website visits, email engagement, and latest company news.' },
  { title: 'Account Context', desc: 'View ownership, revenue, campaigns, and tech stack alongside account history.' },
];

const ROLES = [
  {
    role: 'SDR',
    tag: 'Execution',
    title: 'Know why you’re reaching out',
    bullets: ['See why an account is being prioritized', 'Understand the signals behind the account', 'Find relevant contacts', 'Personalize outreach with account context'],
  },
  {
    role: 'SDR Head',
    tag: 'Strategy & Focus',
    title: 'Know where your team should focus',
    bullets: ['See which accounts show high intent', 'Understand signals driving account priority', 'Complete visibility into each account engagement stage'],
  },
  {
    role: 'AE',
    tag: 'Handoff & Meeting',
    title: 'Know the account before the call',
    bullets: ['Understand the broader account story', 'See relevant signals and recent activity', 'Use account and prospect context to make the conversation more relevant'],
  },
];

const TESTIMONIALS = [
  {
    name: 'Elena Rostova',
    role: 'Head of Sales Development',
    company: 'HyperScale Cloud',
    quote:
      'Before Harvin, our SDRs spent 40% of their day digging through 5 different tabs for hiring signals and tech changes. Now Account 360 gives them the full context in seconds before dialing.',
    metric: '+48% faster prospect research',
  },
  {
    name: 'Marcus Vance',
    role: 'Senior SDR Specialist',
    company: 'FinStack Systems',
    quote:
      "Having intent signals, tech changes, and previous conversation history right inside the account view is a game changer. I know exactly why I'm reaching out and which persona to contact.",
    metric: '3.2x higher reply rate',
  },
  {
    name: 'Claire Beauchamp',
    role: 'Director of Revenue Operations',
    company: 'Nexus AI',
    quote:
      'Our AEs finally walk into SDR-booked meetings knowing the full background. The handoff friction between SDR and AE disappeared because both look at the exact same account story.',
    metric: 'Zero lost context in handoffs',
  },
];

const FAQS = [
  {
    q: 'What is Account Intelligence in Harvin?',
    a: 'Account Intelligence brings together company information, buying signals, contacts, previous interactions and recent activity so your team can understand an account before taking action.',
  },
  {
    q: 'How does Harvin decide which accounts deserve attention?',
    a: 'Harvin tracks relevant intent signals for each account and combines them into a weighted intent score. The score helps prioritize accounts, while the underlying signals provide the context behind that priority.',
  },
  {
    q: 'What signals does Harvin track?',
    a: 'Harvin can track signals such as funding, hiring and technology changes, along with other relevant changes associated with an account.',
  },
  {
    q: 'What is Account 360?',
    a: 'Account 360 is the consolidated view of an account in Harvin. It brings together the company profile, account signals, contacts, previous interactions and recent activity so users can understand the account in one place.',
  },
  {
    q: 'Who can use Account Intelligence?',
    a: 'Account Intelligence is available across the SDR, SDR Head and AE workflows. Each role uses the same account context for a different purpose, from prioritizing outreach to managing account coverage and preparing for meetings.',
  },
];

export default function AccountIntelligenceClient() {
  const { openModal } = useModal();
  const [email, setEmail] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    openModal('talk-to-sales');
  };

  return (
    <div className="relative w-full">
      {/* ═══ 1. HERO ══════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden border-b border-slate-200 px-6 pb-20 pt-28 dark:border-white/[0.08] lg:pb-24 lg:pt-36">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_50%_at_50%_0%,rgba(201,76,30,0.12),transparent_70%)] dark:bg-[radial-gradient(55%_50%_at_50%_0%,rgba(201,76,30,0.2),transparent_70%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(35,34,32,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(35,34,32,0.045)_1px,transparent_1px)] bg-[size:56px_56px]
                     [mask-image:radial-gradient(60%_45%_at_50%_20%,#000,transparent)]
                     dark:bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)]"
        />

        <div className="relative mx-auto max-w-[1180px]">
          <div className="mx-auto max-w-[900px] text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-ember-200 bg-ember-50/80 px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-ember-600 dark:border-ember-500/30 dark:bg-ember-500/10 dark:text-ember-400">
              <Radio size={13} className="text-ember-500 motion-safe:animate-pulse" aria-hidden="true" />
              Account Intelligence
            </span>
            <h1 className="mt-7 font-instrument font-semibold text-[clamp(36px,5.6vw,72px)] leading-[1.03] tracking-[-0.035em] text-slate-950 dark:text-white">
              Turn account signals into <span className="text-ember-500">your next move</span>
            </h1>
            <p className="mx-auto mt-6 max-w-[680px] text-[18px] leading-[1.65] text-slate-600 dark:text-slate-300 sm:text-[20px]">
              See the signals, activity and context behind every account, so your team knows what matters, why now and who to engage.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => openModal('talk-to-sales')}
                className="group inline-flex items-center gap-2 rounded-btn bg-ember-500 px-6 py-3.5 text-[15px] font-semibold text-white
                           shadow-[0_1px_4px_rgba(201,76,30,0.3)] transition-all duration-150
                           hover:bg-ember-400 hover:shadow-[0_4px_14px_rgba(201,76,30,0.4)]
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-500 focus-visible:ring-offset-2"
              >
                Book a demo
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </button>
              <a
                href="#account-360"
                className="inline-flex items-center gap-2 rounded-btn border border-slate-300 bg-white px-6 py-3.5 text-[15px] font-semibold text-slate-800 transition-colors
                           hover:border-slate-400 hover:bg-slate-50
                           dark:border-white/15 dark:bg-white/[0.04] dark:text-white dark:hover:bg-white/[0.08]"
              >
                Explore Account Intelligence
              </a>
            </div>
          </div>

          <div className="relative mt-16">
            <div aria-hidden="true" className="absolute -inset-x-10 -bottom-10 top-10 rounded-[40px] bg-ember-500/15 blur-3xl dark:bg-ember-500/20" />
            <div className="relative">
              <Frame w={980} h={440} label="Prioritised accounts" aspect="aspect-[1.95/1]">
                <PriorityMock />
              </Frame>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 2. WHAT IS ACCOUNT INTELLIGENCE? ════════════════════════════════ */}
      <section className="border-b border-slate-200 px-6 py-20 dark:border-white/[0.08] lg:py-28">
        <div className="mx-auto grid max-w-[1180px] items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <Eyebrow>What is Account Intelligence?</Eyebrow>
            <h2 className={`mt-5 ${H2}`}>An account is more than a company profile.</h2>
            <p className="mt-5 text-[17px] leading-relaxed text-slate-600 dark:text-slate-300">
              A company name and a few firmographic details tell you who an account is. Account intelligence helps you understand what is happening there right now.
            </p>
            <p className="mt-3 text-[15.5px] leading-relaxed text-slate-500 dark:text-slate-400">
              Harvin brings together company information, buying signals, contacts, previous interactions and recent activity into one unified account view.
            </p>

            <ol className="mt-8 space-y-2.5">
              {[
                { q: 'Why does this account matter?', sub: 'Fit & ICP alignment score' },
                { q: 'Why now?', sub: 'Live buying & intent triggers' },
                { q: 'Who should we engage?', sub: 'Target personas & verified contacts' },
              ].map((item, i) => (
                <li
                  key={item.q}
                  className="flex items-center gap-4 rounded-card border border-slate-200 bg-sand-50 px-4 py-3.5 transition-colors hover:border-ember-300 dark:border-white/[0.08] dark:bg-white/[0.03] dark:hover:border-ember-500/40"
                >
                  <span className="font-mono text-[12px] font-medium text-ember-500">{String(i + 1).padStart(2, '0')}</span>
                  <span className="flex-1 text-[15px] font-semibold text-slate-900 dark:text-white">{item.q}</span>
                  <span className="hidden text-[12.5px] text-slate-400 dark:text-slate-500 sm:block">{item.sub}</span>
                </li>
              ))}
            </ol>
          </div>

          <Frame w={640} h={330} label="Company profile versus account intelligence" aspect="aspect-[1.75/1]">
            <ProfileMock />
          </Frame>
        </div>
      </section>

      {/* ═══ 3. WHY IT MATTERS? ═══════════════════════════════════════════════ */}
      <section className="border-b border-slate-200 px-6 py-20 dark:border-white/[0.08] lg:py-28">
        <div className="mx-auto max-w-[1180px]">
          <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
            <div>
              <Eyebrow>Why it matters?</Eyebrow>
              <h2 className={`mt-5 ${H2}`}>Good outreach starts with knowing where the account stands.</h2>
            </div>
            <p className="text-[17px] leading-relaxed text-slate-500 dark:text-slate-400 lg:pb-2">
              Your team already has account data. The challenge is understanding what deserves attention within that data.
            </p>
          </div>

          <ol className="mt-12 grid gap-px overflow-hidden rounded-modal border border-slate-200 bg-slate-200 dark:border-white/[0.08] dark:bg-white/[0.08] md:grid-cols-3">
            {PILLARS.map(({ icon: Icon, title, body }, i) => (
              <li key={title} className="group bg-sand-50 p-8 transition-colors duration-200 hover:bg-white dark:bg-[#0A0908] dark:hover:bg-[#0F0E0C] lg:p-10">
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-ember-500/10 text-ember-500 transition-colors group-hover:bg-ember-500 group-hover:text-white">
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <span className="font-mono text-[13px] text-slate-300 dark:text-slate-600">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="mt-7 font-instrument font-semibold text-[21px] text-slate-950 dark:text-white">{title}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-slate-600 dark:text-slate-400">{body}</p>
              </li>
            ))}
          </ol>

          <div className="relative mt-8 overflow-hidden rounded-modal border border-white/[0.08] bg-[#0C0B09] px-8 py-7 text-center">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_120%_at_50%_0%,rgba(201,76,30,0.3),transparent_70%)]" />
            <p className="relative mx-auto max-w-3xl text-[17px] font-medium leading-relaxed text-white/80">
              <span className="font-semibold text-ember-400">Harvin brings the relevant pieces together</span> so your team can spend less time piecing
              together an account&apos;s story and more time acting on it.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ 4. ACCOUNT 360° ═════════════════════════════════════════════════ */}
      <section id="account-360" className="relative scroll-mt-24 overflow-hidden border-b border-white/[0.06] bg-[#0C0B09] px-6 py-20 text-white lg:py-28">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_60%_at_50%_0%,rgba(201,76,30,0.22),transparent_70%)]" />
        <div className="relative mx-auto max-w-[1180px]">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-end lg:gap-16">
            <div>
              <p className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-ember-400">
                <span aria-hidden="true" className="h-px w-6 bg-ember-400" />
                Account 360°
              </p>
              <h2 className="mt-5 font-instrument font-semibold text-[clamp(30px,3.6vw,46px)] leading-[1.08] tracking-[-0.025em] text-white">
                Everything you need to understand an account, at a glance.
              </h2>
            </div>
            <p className="text-[16.5px] leading-relaxed text-slate-400">
              Account 360° brings the information your team needs to understand an account into one connected view. Instead of opening multiple tools to
              piece together the story, your team can see the account, its signals, people and activity together.
            </p>
          </div>

          <div className="mt-12">
            <Frame w={980} h={500} label="Account 360" aspect="aspect-[1.8/1]">
              <Account360Mock />
            </Frame>
          </div>

          <ul className="mt-10 grid gap-px overflow-hidden rounded-modal border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2 lg:grid-cols-5">
            {FEATURES_360.map((f) => (
              <li key={f.title} className="bg-[#0C0B09] p-5">
                <span className="flex items-center gap-2 text-[14px] font-semibold text-white">
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-ember-500 text-white">
                    <Check size={10} strokeWidth={3} aria-hidden="true" />
                  </span>
                  {f.title}
                </span>
                <p className="mt-2 text-[13px] leading-relaxed text-slate-400">{f.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ═══ 5. VALUE FOR EVERY ROLE ════════════════════════════════════════ */}
      <section className="border-b border-slate-200 px-6 py-20 dark:border-white/[0.08] lg:py-28">
        <div className="mx-auto max-w-[1180px]">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow center>Value for every role</Eyebrow>
            <h2 className={`mt-5 ${H2}`}>One account. Three workflows. One shared context.</h2>
            <p className="mt-4 text-[16.5px] text-slate-600 dark:text-slate-300">
              Account Intelligence gives every role the same account story, while helping each person make a different decision.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {ROLES.map((r, i) => (
              <div key={r.role} className={`relative flex flex-col overflow-hidden p-7 ${SURFACE}`}>
                <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-ember-500 to-ember-300" style={{ opacity: 1 - i * 0.25 }} />
                <div className="flex items-center justify-between">
                  <span className="font-instrument text-[28px] font-semibold tracking-[-0.02em] text-slate-950 dark:text-white">{r.role}</span>
                  <span className="rounded-full border border-ember-200 bg-ember-50 px-2.5 py-1 text-[11px] font-semibold text-ember-600 dark:border-ember-500/30 dark:bg-ember-500/10 dark:text-ember-400">
                    {r.tag}
                  </span>
                </div>
                <h3 className="mt-4 font-instrument font-semibold text-[19px] text-slate-900 dark:text-white">{r.title}</h3>
                <ul className="mt-5 space-y-3 border-t border-slate-200 pt-5 dark:border-white/[0.08]">
                  {r.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-[14.5px] leading-snug text-slate-600 dark:text-slate-300">
                      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-ember-500/10 text-ember-500">
                        <Check size={10} strokeWidth={3} aria-hidden="true" />
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 6. TESTIMONIALS ═════════════════════════════════════════════════ */}
      <section className="border-b border-slate-200 px-6 py-20 dark:border-white/[0.08] lg:py-28">
        <div className="mx-auto max-w-[1180px]">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow center>Testimonials</Eyebrow>
            <h2 className={`mt-5 ${H2}`}>What teams say about Harvin</h2>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <figure key={t.name} className={`flex flex-col p-7 ${SURFACE}`}>
                <p className="font-instrument text-[30px] font-semibold leading-none tracking-[-0.02em] text-ember-500">{t.metric.split(' ')[0]}</p>
                <p className="mt-1 text-[12.5px] font-medium text-slate-500 dark:text-slate-400">{t.metric.split(' ').slice(1).join(' ')}</p>
                <blockquote className="mt-5 flex-1 text-[15px] leading-relaxed text-slate-700 dark:text-slate-300">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-slate-200 pt-5 dark:border-white/[0.08]">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-[12px] font-semibold text-white dark:bg-white/[0.1]">
                    {t.name
                      .split(' ')
                      .map((p) => p[0])
                      .join('')}
                  </span>
                  <span>
                    <span className="block text-[14px] font-semibold text-slate-900 dark:text-white">{t.name}</span>
                    <span className="block text-[12px] text-slate-500 dark:text-slate-400">
                      {t.role} · {t.company}
                    </span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 7. FAQS ══════════════════════════════════════════════════════════ */}
      <section className="border-b border-slate-200 px-6 py-20 dark:border-white/[0.08] lg:py-28">
        <div className="mx-auto grid max-w-[1180px] gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <Eyebrow>FAQs</Eyebrow>
            <h2 className={`mt-5 ${H2}`}>We thought you might ask</h2>
          </div>

          <div className="divide-y divide-slate-200 border-y border-slate-200 dark:divide-white/[0.08] dark:border-white/[0.08]">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={faq.q}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="group flex w-full items-center gap-4 py-5 text-left"
                  >
                    <span className="font-mono text-[12px] text-ember-500">{String(idx + 1).padStart(2, '0')}</span>
                    <span className="flex-1 text-[16px] font-semibold text-slate-900 transition-colors group-hover:text-ember-500 dark:text-white">{faq.q}</span>
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-200 ${
                        isOpen
                          ? 'rotate-45 border-ember-500 bg-ember-500 text-white'
                          : 'border-slate-300 text-slate-500 dark:border-white/15 dark:text-slate-400'
                      }`}
                    >
                      <Plus size={14} strokeWidth={2.5} aria-hidden="true" />
                    </span>
                  </button>
                  {isOpen && <p className="pb-6 pl-9 pr-11 text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">{faq.a}</p>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ 8. FINAL CTA ═════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#0C0B09] px-6 py-24 text-white lg:py-32">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_80%_at_50%_0%,rgba(201,76,30,0.3),transparent_70%)]" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(60%_70%_at_50%_30%,#000,transparent)]"
        />
        <div className="relative mx-auto max-w-[840px] text-center">
          <h2 className="font-instrument font-semibold text-[clamp(32px,4.4vw,52px)] leading-[1.08] tracking-[-0.03em]">
            Start every conversation with <span className="text-ember-400">the full picture.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-[17px] leading-relaxed text-white/65 sm:text-[19px]">
            Bring signals, context and account activity together with Harvin.
          </p>

          <form onSubmit={handleDemoSubmit} className="mx-auto mt-10 flex max-w-lg flex-col gap-3 sm:flex-row">
            <label htmlFor="ai-email" className="sr-only">
              Work email
            </label>
            <input
              id="ai-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="What's your work email?"
              className="w-full rounded-btn border border-white/15 bg-white/[0.06] px-4 py-3.5 text-[15px] text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-ember-500 sm:flex-1"
            />
            <button
              type="submit"
              className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-btn bg-ember-500 px-6 py-3.5 text-[15px] font-semibold text-white
                         shadow-[0_1px_4px_rgba(201,76,30,0.3)] transition-all duration-150 hover:bg-ember-400 hover:shadow-[0_4px_14px_rgba(201,76,30,0.4)]"
            >
              Book a demo
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
