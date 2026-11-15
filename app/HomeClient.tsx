'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import Link from 'next/link';

import Hero from '@/components/Hero';
import { startFreeHref } from '@/lib/site';
import { FREE_CREDITS, PLANS, PREVIEW_COMPANIES } from '@/lib/pricing';

/**
 * Homepage body (below the hero). Copy: "Harvin Home Page Content .md".
 *
 * Visual language: Harvin AI brand guidelines (12 Nov 2026), read through the
 * client's reference mockup (public/harvin-ai-homepage.html) — used as a
 * reference, not copied. The devices:
 *   - ruled rows and tables instead of boxed card grids
 *   - label tags: struck (grey line) = how a database files a company / what
 *     was missed; ember outline = found or right
 *   - ember dots beside true facts
 *   - Newsreader numerals for scores and counts
 *   - the warm-paper "record" card on black, and one warm-paper band
 *
 * The home page is always dark (app/page.tsx), so — like the footer — these
 * sections use the brand tokens directly rather than light/dark pairs.
 * Company and person names in the examples are fictional.
 */

/* ═══ Motion ═════════════════════════════════════════════════════════════════
   Brand: only the parts that carry the point move. Here that is the counts. */

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function useInView<T extends Element>(threshold = 0.3) {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, seen] as const;
}

function CountUp({ to, prefix = '' }: { to: number; prefix?: string }) {
  const [ref, seen] = useInView<HTMLSpanElement>(0.4);
  const [n, setN] = useState(to);
  useEffect(() => {
    if (!seen || prefersReducedMotion()) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / 1100, 1);
      setN(Math.round(to * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    setN(0);
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, to]);
  return (
    <span ref={ref}>
      <span className="sr-only">{`${prefix}${to.toLocaleString('en-US')}`}</span>
      <span aria-hidden="true" className="tabular-nums">
        {prefix}
        {n.toLocaleString('en-US')}
      </span>
    </span>
  );
}

/* ═══ Brand devices ══════════════════════════════════════════════════════════ */

const WRAP = 'mx-auto max-w-[1200px] px-6 sm:px-8';
const SECTION = 'scroll-mt-20 border-t border-rule py-[clamp(72px,9vw,128px)]';
const H2 = 'max-w-[17em] font-display text-[clamp(34px,4.2vw,58px)] font-medium leading-[1.06] [text-wrap:balance]';
const H3 = 'font-display text-[clamp(26px,2.6vw,34px)] font-medium leading-[1.12]';
const LEAD = 'max-w-[34em] text-[clamp(18px,1.5vw,20px)] leading-[1.5]';
const TAKE = 'font-display text-[clamp(22px,2.2vw,30px)] font-normal italic leading-[1.25]';
const CARD = 'rounded-card border border-rule bg-surface p-7';
const RECORD = 'rounded-card bg-paper px-[30px] pb-[26px] pt-[30px] text-slate-950';
const BTN =
  'inline-flex min-h-[52px] items-center justify-center rounded-[10px] bg-ember-500 px-7 text-[17px] font-semibold text-pure transition-colors hover:bg-ember-600 ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950';

type Tone = 'plain' | 'struck' | 'found';

/** Label tag. `paper` when it sits on warm paper (inside a record or the paper band). */
function Tag({ children, tone = 'plain', paper = false }: { children: ReactNode; tone?: Tone; paper?: boolean }) {
  const look = paper
    ? {
        plain: 'border-paper-rule text-slate-600',
        struck: 'border-paper-rule text-stone-dark line-through decoration-grey decoration-2',
        found: 'border-ember-500 text-ember-600',
      }[tone]
    : {
        plain: 'border-rule text-paper-soft',
        struck: 'border-rule text-stone line-through decoration-grey decoration-2',
        found: 'border-ember-500 text-ember-400',
      }[tone];
  return (
    <span className={`inline-flex items-center whitespace-nowrap rounded-[7px] border px-[11px] pb-2 pt-[7px] text-[14px] font-semibold leading-none ${look}`}>
      {children}
    </span>
  );
}

/** Ember mark beside a true fact; `off` = grey, for things that were missed. */
function Dot({ off = false }: { off?: boolean }) {
  return <span aria-hidden="true" className={`h-[9px] w-[9px] shrink-0 rounded-full ${off ? 'bg-grey' : 'bg-ember-500'}`} />;
}

function Kicker({ children, paper = false }: { children: ReactNode; paper?: boolean }) {
  return <p className={`mb-[18px] text-[15px] font-medium ${paper ? 'text-stone-dark' : 'text-stone'}`}>{children}</p>;
}

function Lbl({ children, paper = false, className = '' }: { children: ReactNode; paper?: boolean; className?: string }) {
  return <div className={`text-[14px] font-medium ${paper ? 'text-stone-dark' : 'text-stone'} ${className}`}>{children}</div>;
}

/** Section head: kicker, headline, up to two lead paragraphs. */
function Head({ kicker, title, leads, paper = false }: { kicker: string; title: ReactNode; leads: ReactNode[]; paper?: boolean }) {
  return (
    <div className="mb-[clamp(40px,5vw,64px)]">
      <Kicker paper={paper}>{kicker}</Kicker>
      <h2 className={H2}>{title}</h2>
      {leads.map((l, i) => (
        <p key={i} className={`${LEAD} ${i === 0 ? 'mt-[22px]' : 'mt-3'} ${paper ? 'text-slate-600' : 'text-paper-soft'}`}>
          {l}
        </p>
      ))}
    </div>
  );
}

function TextLink({ href, children, paper = false }: { href: string; children: ReactNode; paper?: boolean }) {
  return (
    <Link
      href={href}
      className={`font-semibold underline decoration-2 underline-offset-[5px] transition-colors ${paper ? 'decoration-paper-rule hover:decoration-ember-600' : 'decoration-rule hover:decoration-ember-400'}`}
    >
      {children}
    </Link>
  );
}

/** Ruled grid of title + one line (the six criteria, the four people rules). */
function RuledGrid({ items, cols }: { items: { t: string; d: string }[]; cols: string }) {
  return (
    <div className={`mt-7 grid gap-x-10 ${cols}`}>
      {items.map((it) => (
        <div key={it.t} className="border-t border-rule py-5">
          <div className="font-semibold">{it.t}</div>
          <p className="mt-1 text-[16px] text-paper-soft">{it.d}</p>
        </div>
      ))}
    </div>
  );
}

const TH = 'border-b border-white pb-3 pr-4 text-left align-bottom text-[14px] font-medium text-stone last:pr-0';
const TD = 'border-b border-rule py-[18px] pr-4 align-top last:pr-0';
const TH_PAPER = 'border-b border-slate-950 pb-3 pr-4 text-left align-bottom text-[14px] font-medium text-stone-dark last:pr-0';
const TD_PAPER = 'border-b border-paper-rule py-[18px] pr-4 align-top last:pr-0';

/* ═══ Content ════════════════════════════════════════════════════════════════ */

const EXAMPLES = [
  { who: 'A payments company', rest: 'may care about who receives money internationally.', filter: 'Industry: Fintech', matters: 'Who receives money internationally' },
  { who: 'A retail software company', rest: 'may care about store count.', filter: 'Industry: Retail', matters: 'Store count' },
  { who: 'A SaaS company', rest: 'may care about the tools a business uses.', filter: 'Employees: 50–500', matters: 'The tools a business uses' },
];

const INPUTS = [
  { t: 'What you sell', d: 'What your product does, the problems it solves and who needs it.' },
  { t: 'Who already buys', d: 'Add a few customers that converted and companies that didn’t.' },
  { t: 'Who you want to reach', d: 'Tell Harvin the roles, functions and seniority you usually sell to.' },
  { t: 'What matters when judging fit', d: 'Industry, geography, business model, technologies, locations, users or anything else important to your business.' },
];

const CRITERIA = [
  { t: 'Business model', d: 'How the company makes money.' },
  { t: 'Use case', d: 'Why the company may need what you sell.' },
  { t: 'Customer type', d: 'Who they sell to or serve.' },
  { t: 'Technology', d: 'The tools and systems they use.' },
  { t: 'Geography', d: 'Where they operate, not just where they are headquartered.' },
  { t: 'Company characteristics', d: 'Stores, locations, users, funding, revenue or other important criteria.' },
];

const DISCOVERY_EXAMPLE = [
  { name: 'Northstar Software', listed: 'Software', fit: 91, why: [['Use case', 'Bills customers in 18 countries'], ['Technology', 'Uses Stripe']] },
  { name: 'Vela Commerce', listed: 'Internet', fit: 88, why: [['Business model', 'Marketplace that pays sellers'], ['Geography', 'Operates in 22 countries']] },
  { name: 'Brightpath Learning', listed: 'EdTech', fit: 84, why: [['Customer type', 'Students overseas'], ['Use case', 'Collects tuition from abroad']] },
  { name: 'Kitecart', listed: 'Social commerce', fit: 79, why: [['Company characteristics', '1.2M users'], ['Use case', 'Pays creators abroad']] },
];

const STANDARD = [
  { k: 'Industry', v: 'Internet' },
  { k: 'Employees', v: '600' },
  { k: 'HQ', v: 'Singapore' },
];

const RESEARCH = [
  { k: 'Business model', d: 'Understand how the company operates and makes money.', v: 'Online marketplace' },
  { k: 'Technology', d: 'See the tools and systems relevant to your offer.', v: 'Stripe, Shopify, AWS' },
  { k: 'Locations or stores', d: 'Know the size of a physical business beyond employee count.', v: '17 locations' },
  { k: 'Countries served', d: 'Understand where the company actually operates.', v: '22' },
  { k: 'Users, funding and revenue', d: 'Add the numbers that help you judge fit.', v: '1.2M MAU, Series C' },
  { k: 'Your own criteria', d: 'Ask Harvin to research other information important to your business.', v: 'Pays sellers weekly' },
];

const PEOPLE_RULES = [
  { t: 'Role priority', d: 'CFO first. VP Finance next. Head of Payments after that.' },
  { t: 'Function', d: 'Finance, Operations, IT, Security, Marketing or whatever matters to you.' },
  { t: 'Seniority', d: 'Avoid people who are too junior for the conversation.' },
  { t: 'Title meaning', d: 'Harvin understands that similar roles can have very different titles.' },
];

const KEYWORD_RESULTS = [
  { title: 'Finance Manager', verdict: 'Too junior' },
  { title: 'VP Finance Transformation', verdict: 'Adjacent role' },
  { title: 'Finance Operations Lead', verdict: 'Not the buyer' },
  { title: 'Head of Commercial Finance', verdict: 'Adjacent role' },
];

const SOURCES = [
  { s: 'Source A', r: 'no match' },
  { s: 'Source B', r: 'no match' },
  { s: 'Source C', r: 'found', ok: true },
  { s: 'More sources', r: 'not needed' },
];

const IMPROVE = [
  { to: 500, prefix: '', unit: 'records cleaned', t: 'Clean your data', d: 'Fix company names, contact names and inconsistent records.' },
  { to: 186, prefix: '', unit: 'companies that fit', t: 'Check company fit', d: 'See which companies actually match what you are looking for.' },
  { to: 1240, prefix: '', unit: 'research fields filled', t: 'Fill missing research', d: 'Add the company information your targeting depends on.' },
  { to: 143, prefix: '', unit: 'decision-makers found', t: 'Find missing decision-makers', d: 'See who your team should be reaching inside each company.' },
  { to: 38, prefix: '+', unit: 'new companies beyond your list', t: 'Discover more companies', d: 'Find relevant companies beyond the list you started with.' },
];

const UPLOAD_ISSUES = [
  { k: 'Inconsistent names', v: '“ACME TECHNOLOGIES PVT LTD”' },
  { k: 'Revenue missing', v: '214 of 500' },
  { k: 'No decision-maker', v: '357 of 500' },
  { k: 'Fit unknown', v: '500 of 500' },
];

const CHANGE_STATS = [
  { to: 34, prefix: '+', l: 'New companies' },
  { to: 51, prefix: '+', l: 'New people' },
  { to: 12, prefix: '', l: 'Fit changes' },
  { to: 7, prefix: '', l: 'Removed' },
];

const CHANGES = [
  { t: 'New companies', d: 'See newly discovered companies that now fit your criteria.' },
  { t: 'New decision-makers', d: 'Find relevant people who joined or moved into target roles.' },
  { t: 'Fit changes', d: 'See when new information makes a company more or less relevant.' },
  { t: 'Company changes', d: 'Track expansion, leadership moves, funding and other useful updates.' },
  { t: 'Fresh contact data', d: 'Refresh emails and phone numbers when needed.' },
];

/* ═══ Sections ═══════════════════════════════════════════════════════════════ */

function Problem() {
  return (
    <section id="problem" className={SECTION}>
      <div className={WRAP}>
        <Head
          kicker="The problem"
          title="B2B company discovery that starts with your business, not a filter."
          leads={['Your best-fit customers are rarely defined by industry, size and location alone.']}
        />
        <div className="overflow-x-auto">
          <table className="w-full min-w-[620px] border-collapse text-[16px]">
            <thead>
              <tr>
                <th scope="col" className={TH}>If you sell</th>
                <th scope="col" className={TH}>A database filter sees</th>
                <th scope="col" className={TH}>What decides fit</th>
              </tr>
            </thead>
            <tbody>
              {EXAMPLES.map((e) => (
                <tr key={e.who}>
                  <td className={`${TD} text-paper-soft`}>
                    <span className="font-semibold text-white">{e.who}</span> {e.rest}
                  </td>
                  <td className={TD}>
                    <Tag tone="struck">{e.filter}</Tag>
                  </td>
                  <td className={TD}>
                    <Tag tone="found">{e.matters}</Tag>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-11 max-w-[40em]">
          <p className="text-stone">That context is hard to fit into a few database filters.</p>
          <p className={`mt-3.5 ${TAKE}`}>
            So teams still spend hours researching companies, checking whether they actually fit, and finding the right people
            inside them. <span className="text-ember-400">Harvin was built to do that work.</span>
          </p>
        </div>
      </div>
    </section>
  );
}

/** The Company Profile as a paper record. The field for the input the visitor is on is marked. */
function ProfileRecord({ active }: { active: number }) {
  const field = (i: number, label: string, children: ReactNode) => (
    <div className="border-t border-paper-rule py-4 first-of-type:mt-[18px]">
      <div className={`flex items-center gap-2 text-[14px] font-medium transition-colors ${i === active ? 'text-ember-600' : 'text-stone-dark'}`}>
        <span aria-hidden="true" className={`h-[7px] w-[7px] rounded-full bg-ember-500 transition-opacity ${i === active ? 'opacity-100' : 'opacity-0'}`} />
        {label}
      </div>
      {children}
    </div>
  );
  return (
    <div className={RECORD} role="img" aria-label="Example Company Profile for a cross-border payments company">
      <div aria-hidden="true">
        <div className="flex items-center justify-between gap-3">
          <span className="font-display text-[28px] font-medium">Company Profile</span>
          <Tag tone="found" paper>
            Saved
          </Tag>
        </div>
        {field(
          0,
          'What you sell',
          <>
            <div className="mt-1.5 text-[17px] font-semibold">Cross-border payment infrastructure</div>
            <div className="mt-2 flex flex-wrap gap-2">
              <Tag paper>Global payouts</Tag>
              <Tag paper>FX</Tag>
            </div>
          </>,
        )}
        {field(
          1,
          'Who already buys',
          <>
            <div className="mb-1.5 mt-2.5 text-[13px] text-stone-dark">Converted</div>
            <div className="flex flex-wrap gap-2">
              <Tag paper>Tripwise</Tag>
              <Tag paper>Orbit Learn</Tag>
            </div>
            <div className="mb-1.5 mt-2.5 text-[13px] text-stone-dark">Didn’t convert</div>
            <div className="flex flex-wrap gap-2">
              <Tag tone="struck" paper>
                CornerMart
              </Tag>
            </div>
          </>,
        )}
        {field(
          2,
          'Who you want to reach',
          <>
            <div className="mt-2 flex flex-wrap gap-2">
              <Tag paper>CFO</Tag>
              <Tag paper>VP Finance</Tag>
              <Tag paper>Head of Payments</Tag>
            </div>
            <div className="mt-2.5 text-[13px] text-stone-dark">Finance, head and above</div>
          </>,
        )}
        {field(
          3,
          'What matters',
          <div className="mt-2 flex flex-wrap gap-2">
            <Tag paper>Pays sellers abroad</Tag>
            <Tag paper>10+ countries</Tag>
            <Tag paper>Uses Stripe</Tag>
            <Tag paper>India, SEA, UAE</Tag>
          </div>,
        )}
      </div>
    </div>
  );
}

function StartWithBusiness() {
  // Visitor-driven (hover, focus or click): the record marks the field for the input they are on.
  const [active, setActive] = useState(0);
  return (
    <section id="company-profile" className={SECTION}>
      <div className={WRAP}>
        <Head
          kicker="Start with your business"
          title="Tell Harvin what a good customer looks like."
          leads={[
            'You already know more about your best customers than any database filter can capture. Give Harvin that context once. It uses it every time it finds and researches companies for you.',
          ]}
        />
        <div className="grid items-start gap-[clamp(28px,4vw,64px)] lg:grid-cols-2">
          <div>
            <ul className="grid gap-x-10 sm:grid-cols-2">
              {INPUTS.map((inp, i) => {
                const on = i === active;
                return (
                  <li key={inp.t}>
                    <button
                      type="button"
                      aria-pressed={on}
                      onClick={() => setActive(i)}
                      onMouseEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      className={`w-full border-t py-[22px] text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-400 ${on ? 'border-ember-500' : 'border-rule'}`}
                    >
                      <span className="block text-[19px] font-semibold text-white">{inp.t}</span>
                      <span className="mt-1.5 block text-[16px] text-paper-soft">{inp.d}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
            <div className="mt-11 max-w-[40em]">
              <p className={TAKE}>Harvin turns this into your Company Profile.</p>
              <p className={`mt-3.5 ${LEAD} text-paper-soft`}>
                From there, it knows what to look for — without asking you to rebuild the same filters every time.
              </p>
            </div>
          </div>
          <ProfileRecord active={active} />
        </div>
      </div>
    </section>
  );
}

function Discovery() {
  return (
    <section id="discovery" className={SECTION}>
      <div className={WRAP}>
        <Head
          kicker="Company discovery"
          title={<>Discover companies that traditional databases can&rsquo;t find</>}
          leads={[
            'Harvin uses your Company Profile to look beyond industry, employee count and revenue.',
            'It searches for the things your best customers actually have in common — how they operate, what they sell, who they serve, the tools they use and the problems they may have.',
          ]}
        />

        <div className="mb-[18px] flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
          <div>
            <Lbl>Example</Lbl>
            <div className="text-[19px] font-semibold">You sell cross-border payment infrastructure</div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Tag tone="struck">Database filter: Industry = Fintech</Tag>
            <Tag>Finds 0 of these</Tag>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[620px] border-collapse text-[16px]">
            <thead>
              <tr>
                <th scope="col" className={TH}>Company Harvin found</th>
                <th scope="col" className={TH}>Why it matches your Company Profile</th>
                <th scope="col" className={`${TH} text-right`}>Company Fit</th>
              </tr>
            </thead>
            <tbody>
              {DISCOVERY_EXAMPLE.map((c) => (
                <tr key={c.name}>
                  <td className={TD}>
                    <div className="text-[18px] font-semibold">{c.name}</div>
                    <div className="mt-2 flex items-center gap-2 text-[14px] text-stone">
                      Listed as <Tag tone="struck">{c.listed}</Tag>
                    </div>
                  </td>
                  <td className={TD}>
                    <div className="flex flex-col gap-2">
                      {c.why.map(([k, v]) => (
                        <span key={k + v} className="flex items-baseline gap-2.5">
                          <Dot />
                          <span>
                            <span className="text-[13px] text-stone">{k}</span> {v}
                          </span>
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className={`${TD} text-right font-display text-[34px] font-medium leading-none tabular-nums text-ember-400`}>{c.fit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-[14px] text-stone">Illustrative example. Company names are fictional.</p>

        <h3 className={`${H3} mt-[clamp(56px,6vw,80px)]`}>Search by what matters to your business</h3>
        <RuledGrid items={CRITERIA} cols="sm:grid-cols-2 lg:grid-cols-3" />

        <p className={`${TAKE} mt-11 max-w-[24em]`}>That helps surface relevant companies your usual searches may not.</p>
        <p className="mt-10">
          <TextLink href="/data-building#discovery">Explore Company Discovery</TextLink>
        </p>
      </div>
    </section>
  );
}

/** The page's one warm-paper band. */
function ResearchFit() {
  return (
    <section id="research" className="scroll-mt-20 bg-paper py-[clamp(72px,9vw,128px)] text-slate-950">
      <div className={WRAP}>
        <Head
          paper
          kicker="Research & Company Fit"
          title={
            <>
              Find out which companies <span className="text-ember-600">actually fit.</span>
            </>
          }
          leads={[
            'Finding a company is only the first step.',
            'Harvin researches the details that matter to your business, then shows how well each company matches what you are looking for.',
          ]}
        />

        <div className="mb-3.5 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <div>
            <div className="font-display text-[28px] font-medium">Vela Commerce</div>
            <div className="mt-0.5 text-[15px] text-stone-dark">Research what your targeting depends on</div>
          </div>
          <span className="text-[14px] text-stone-dark">Illustrative example</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[620px] border-collapse text-[16px]">
            <thead>
              <tr>
                <th scope="col" className={TH_PAPER}>Field</th>
                <th scope="col" className={TH_PAPER}>Before: database record</th>
                <th scope="col" className={TH_PAPER}>After Harvin research</th>
              </tr>
            </thead>
            <tbody>
              {STANDARD.map((f) => (
                <tr key={f.k}>
                  <td className={`${TD_PAPER} font-semibold`}>{f.k}</td>
                  <td className={TD_PAPER}>{f.v}</td>
                  <td className={TD_PAPER}>{f.v}</td>
                </tr>
              ))}
              {RESEARCH.map((r) => (
                <tr key={r.k}>
                  <td className={TD_PAPER}>
                    <span className="block font-semibold">{r.k}</span>
                    <span className="mt-0.5 block max-w-[26em] text-[14px] text-stone-dark">{r.d}</span>
                  </td>
                  <td className={`${TD_PAPER} text-stone-dark`}>Not in record</td>
                  <td className={TD_PAPER}>
                    <span className="flex items-center gap-2.5 font-semibold">
                      <Dot />
                      {r.v}
                    </span>
                  </td>
                </tr>
              ))}
              <tr>
                <td className={`${TD_PAPER} font-semibold`}>Company Fit</td>
                <td className={`${TD_PAPER} text-stone-dark`}>Unknown</td>
                <td className={TD_PAPER}>
                  <span className="font-display text-[24px] font-medium text-ember-600">
                    88 <span className="text-[18px]">Strong fit</span>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Company Fit: a black card on the paper band */}
        <div className="mt-12 grid items-center gap-x-11 gap-y-7 rounded-modal bg-slate-950 p-[clamp(28px,4vw,44px)] text-white lg:grid-cols-[auto_minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <div className="font-display text-[clamp(88px,9vw,112px)] font-medium leading-[0.9] text-ember-400">
              <CountUp to={88} />
            </div>
            <div className="mt-1.5 text-[15px] text-stone">/ 100</div>
            <div className="mt-1.5 text-[15px] font-semibold">Strong fit</div>
          </div>
          <div>
            <h3 className={H3}>See why every company fits</h3>
            <p className="mt-2.5 text-paper-soft">Harvin brings that research together into Company Fit.</p>
            <p className="mt-2.5 text-paper-soft">
              You see the score and the reasons behind it, so your team can decide which companies deserve attention.
            </p>
          </div>
          <div>
            <ul className="flex flex-col gap-3 font-medium">
              {['Marketplace model, like your converted customers', 'Pays sellers in 22 countries', 'Uses Stripe'].map((t) => (
                <li key={t} className="flex items-baseline gap-3">
                  <Dot />
                  {t}
                </li>
              ))}
            </ul>
            <p className="mt-[18px] font-display text-[22px] italic leading-[1.25]">Harvin recommends. Your team decides.</p>
          </div>
        </div>
        <p className="mt-10">
          <TextLink href="/data-building#research" paper>
            Explore Research &amp; Company Fit
          </TextLink>
        </p>
      </div>
    </section>
  );
}

function DecisionMakers() {
  return (
    <section id="decision-makers" className="scroll-mt-20 py-[clamp(72px,9vw,128px)]">
      <div className={WRAP}>
        <Head
          kicker="Decision-makers & contacts"
          title="Find the right people inside the right companies."
          leads={[
            'Once Harvin knows which companies fit, it looks for the people most likely to buy.',
            'You tell Harvin the roles, functions and seniority you care about. It searches for them in priority order and matches people by what their role actually means, not just by title keywords.',
          ]}
        />

        <div className="grid items-start gap-[clamp(28px,4vw,64px)] lg:grid-cols-2">
          {/* Without Harvin */}
          <div className={CARD}>
            <div className="mb-[18px] flex items-center justify-between gap-3">
              <h4 className="text-[19px] font-semibold">Title keyword search</h4>
              <Tag>Without Harvin</Tag>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-[10px] border border-rule px-4 py-3 text-[15px] text-paper-soft">
              <span>
                Title contains <span className="font-semibold">“Finance”</span>
              </span>
              <span className="text-[14px] text-stone">2,418 results</span>
            </div>
            <ul className="mt-2.5">
              {KEYWORD_RESULTS.map((r) => (
                <li key={r.title} className="flex items-center justify-between gap-3.5 border-t border-rule py-[13px] text-[16px] first:border-t-0">
                  <span className="font-medium text-stone line-through decoration-grey decoration-2">{r.title}</span>
                  <span className="whitespace-nowrap text-[14px] text-stone">{r.verdict}</span>
                </li>
              ))}
              <li className="flex items-center justify-between gap-3.5 border-t border-rule py-[13px] text-[16px]">
                <span className="font-semibold">VP Finance</span>
                <span className="whitespace-nowrap text-[14px] text-stone">Buried at row 38</span>
              </li>
            </ul>
            <div className="mt-4 flex justify-between gap-3 border-t border-rule pt-4 text-[15px]">
              <span className="text-stone">Right buyers in the results</span>
              <span className="font-semibold">1 of 5</span>
            </div>
            <p className="mt-3.5 text-[15px] text-paper-soft">Every result matches the keyword. Most aren’t the buyer.</p>
          </div>

          {/* With Harvin */}
          <div className="rounded-card border-2 border-ember-500 bg-surface p-7">
            <div className="mb-[18px] flex items-center justify-between gap-3">
              <h4 className="text-[19px] font-semibold">Matched by meaning</h4>
              <Tag tone="found">With Harvin</Tag>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-[10px] border border-rule px-4 py-3 text-[15px] text-paper-soft">
              <span className="flex flex-wrap gap-2">
                <Tag>CFO</Tag>
                <Tag>VP Finance</Tag>
                <Tag>Head of Payments</Tag>
              </span>
              <span className="text-[14px] text-stone">Finance, head and above</span>
            </div>
            <ul className="mt-2.5">
              <li className="flex items-center justify-between gap-3.5 py-[13px] text-[16px]">
                <span>
                  <span className="font-medium text-stone line-through decoration-grey decoration-2">1. CFO</span>
                  <span className="mt-0.5 block text-[14px] text-stone">Not at this company, moving to the next role</span>
                </span>
                <span className="text-[14px] text-stone">Skipped</span>
              </li>
              <li className="flex items-center justify-between gap-3.5 border-t border-rule py-[13px] text-[16px]">
                <span className="font-semibold">
                  2. Priya Nair, VP Finance
                  <span className="mt-0.5 block text-[14px] font-normal text-stone">Email and phone found</span>
                </span>
                <Tag tone="found">Buyer</Tag>
              </li>
              <li className="flex items-center justify-between gap-3.5 border-t border-rule py-[13px] text-[16px]">
                <span className="font-semibold">
                  3. Arjun Rao, Head of Payments
                  <span className="mt-0.5 block text-[14px] font-normal text-stone">Title: “Treasury &amp; FX Lead, APAC”</span>
                </span>
                <Tag tone="found">Buyer</Tag>
              </li>
            </ul>
            <div className="mt-4 flex justify-between gap-3 border-t border-rule pt-4 text-[15px]">
              <span className="text-stone">Right buyers in the results</span>
              <span className="font-semibold text-ember-400">2 of 2</span>
            </div>
            <p className="mt-3.5 text-[15px] text-paper-soft">Only people who match your target roles, in your order.</p>
          </div>
        </div>

        <h3 className={`${H3} mt-[clamp(56px,6vw,80px)]`}>Find the right decision-makers</h3>
        <RuledGrid items={PEOPLE_RULES} cols="sm:grid-cols-2 lg:grid-cols-4" />

        {/* Then find their contact details */}
        <div className="mt-[clamp(56px,6vw,80px)] grid items-center gap-[clamp(28px,4vw,64px)] lg:grid-cols-2">
          <div>
            <h3 className={H3}>Then find their contact details</h3>
            <p className={`${LEAD} mt-4 text-paper-soft`}>Once the right person is matched, Harvin can find their:</p>
            <ul className="mt-6">
              {['Work email', 'Direct or mobile phone number'].map((t) => (
                <li key={t} className="border-t border-rule py-[18px] font-semibold last:border-b">
                  {t}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[14px] text-stone">Contact details are searched across multiple sources and charged only when found.</p>
            <p className="mt-10">
              <TextLink href="/data-building#decision-makers">Explore People Search</TextLink>
            </p>
          </div>

          <div className={RECORD} role="img" aria-label="Example decision-maker with contact details found">
            <div aria-hidden="true">
              <Lbl paper>Decision-maker</Lbl>
              <div className="mt-3 flex items-center gap-3.5">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-sand-200 font-semibold text-slate-600">PN</span>
                <div>
                  <div className="font-display text-[26px] font-medium leading-[1.1]">Priya Nair</div>
                  <Lbl paper>VP Finance</Lbl>
                  <Lbl paper>Vela Commerce</Lbl>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-paper-rule py-4">
                <Lbl paper>Work email</Lbl>
                <span className="font-semibold tabular-nums">priya@velacommerce.co</span>
                <div className="flex w-full flex-wrap gap-1.5">
                  {SOURCES.map((s) => (
                    <span
                      key={s.s}
                      className={`rounded-md border px-[9px] pb-1.5 pt-[5px] text-[13px] ${s.ok ? 'border-ember-500 font-semibold text-ember-600' : 'border-paper-rule text-stone-dark'}`}
                    >
                      {s.s}: {s.r}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-paper-rule py-4">
                <Lbl paper>Direct or mobile phone number</Lbl>
                <span className="font-semibold tabular-nums">+65 9XXX X412</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function YourList() {
  return (
    <section id="your-list" className={SECTION}>
      <div className={WRAP}>
        <Head
          kicker="Already have a list?"
          title="Start with the companies you already know."
          leads={[
            'Upload the account list your team is working from today.',
            'Harvin can clean it, research the companies, check which ones fit, find missing decision-makers and help uncover relevant companies your current targeting hasn’t surfaced.',
          ]}
        />
        <div className="grid items-start gap-[clamp(28px,4vw,64px)] lg:grid-cols-2">
          <div className={CARD}>
            <Lbl className="mb-2.5">What you upload</Lbl>
            <div className="flex items-baseline justify-between gap-3 text-[18px] font-semibold">
              <span>accounts.xlsx</span>
              <span className="text-[14px] font-medium text-stone">500 companies</span>
            </div>
            <ul className="mt-4">
              {UPLOAD_ISSUES.map((u) => (
                <li key={u.k} className="flex justify-between gap-4 border-t border-rule py-3.5 text-[16px]">
                  <span className="flex items-center gap-2.5">
                    <Dot off />
                    {u.k}
                  </span>
                  <span className="text-right tabular-nums text-stone">{u.v}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[14px] text-stone">Hard to tell who to work first.</p>
          </div>

          <div>
            <div className="mb-1.5 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
              <div>
                <Lbl className="mb-1.5">What you get back</Lbl>
                <h3 className={H3}>Improve what you already have</h3>
              </div>
              <Tag tone="found">Ready to work</Tag>
            </div>
            <ul>
              {IMPROVE.map((it, i) => {
                const last = i === IMPROVE.length - 1;
                return (
                  <li
                    key={it.t}
                    className="grid grid-cols-[96px_minmax(0,1fr)] items-baseline gap-x-7 gap-y-1.5 border-t border-rule py-5 last:border-b sm:grid-cols-[150px_minmax(0,1fr)]"
                  >
                    <div>
                      <span className={`block font-display text-[46px] font-medium leading-none ${last ? 'text-ember-400' : ''}`}>
                        <CountUp to={it.to} prefix={it.prefix} />
                      </span>
                      <span className="mt-1.5 block text-[14px] text-stone">{it.unit}</span>
                    </div>
                    <div>
                      <div className="font-semibold">{it.t}</div>
                      <p className="mt-1 text-[16px] text-paper-soft">{it.d}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
            <p className="mt-4 text-[14px] text-stone">Illustrative numbers for a 500-company upload.</p>
          </div>
        </div>
        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
          <a href={startFreeHref()} className={BTN}>
            Upload your list
          </a>
          <span className="text-stone">Or start from scratch and let Harvin build the list for you.</span>
        </div>
      </div>
    </section>
  );
}

function KeepCurrent() {
  const feed = [
    {
      k: 'New company',
      n: 'Vela Commerce',
      d: 'Operates across 12 countries',
      r: (
        <span className="whitespace-nowrap font-display text-[22px] font-medium text-ember-600">
          91 <span className="text-[16px]">Strong fit</span>
        </span>
      ),
    },
    {
      k: 'New decision-maker',
      n: 'Priya Nair, VP Finance',
      d: 'Email and phone found',
      r: (
        <Tag tone="found" paper>
          New
        </Tag>
      ),
    },
    {
      k: 'Fit changed',
      n: 'Brightpath Learning',
      d: 'Expanded into 3 new countries',
      r: <span className="whitespace-nowrap font-display text-[22px] font-medium text-ember-600">72 → 86</span>,
    },
    {
      k: 'No longer fits',
      n: 'Orbit Retail',
      d: 'Store count below your criteria',
      r: <span className="text-[14px] font-medium text-stone-dark">Removed</span>,
      gone: true,
    },
  ];
  return (
    <section id="keep-current" className={SECTION}>
      <div className={WRAP}>
        <Head
          kicker="Keep your list current"
          title="Your target companies keep changing. Harvin keeps up."
          leads={[
            'New companies appear. Decision-makers change roles. Businesses expand. Priorities shift.',
            'Harvin keeps checking the companies you care about and helps surface what changed, so your team is not working from an outdated list.',
          ]}
        />
        <div className="grid items-start gap-[clamp(28px,4vw,64px)] lg:grid-cols-2">
          <div>
            <div className="mb-2 grid grid-cols-2 gap-x-7 sm:grid-cols-4">
              {CHANGE_STATS.map((s) => (
                <div key={s.l} className="border-t border-white pb-5 pt-4">
                  <div className="font-display text-[44px] font-medium leading-none">
                    <CountUp to={s.to} prefix={s.prefix} />
                  </div>
                  <div className="mt-1.5 text-[14px] text-stone">{s.l}</div>
                </div>
              ))}
            </div>
            <h3 className={`${H3} mb-[18px] mt-9`}>Stay on top of changes</h3>
            <ul>
              {CHANGES.map((c) => (
                <li key={c.t} className="border-t border-rule py-[18px] last:border-b">
                  <div className="font-semibold">{c.t}</div>
                  <p className="mt-[3px] text-[16px] text-paper-soft">{c.d}</p>
                </li>
              ))}
            </ul>
            <p className="mt-10">
              <TextLink href="/account-intelligence">Review what changed</TextLink>
            </p>
          </div>

          <div className={RECORD} role="img" aria-label="Example list of changes to a target list">
            <div aria-hidden="true">
              <Lbl paper>Your target list</Lbl>
              <div className="mt-1 flex items-baseline justify-between gap-3">
                <span className="font-display text-[26px] font-medium">What changed</span>
                <Lbl paper>Last checked 7d ago</Lbl>
              </div>
              <ul className="mt-4">
                {feed.map((f) => (
                  <li key={f.k} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-1 border-t border-paper-rule py-[18px]">
                    <div>
                      <div className="text-[13px] text-stone-dark">{f.k}</div>
                      <div className={`text-[18px] font-semibold ${f.gone ? 'text-stone-dark line-through decoration-grey' : ''}`}>{f.n}</div>
                      <div className="text-[15px] text-slate-600">{f.d}</div>
                    </div>
                    {f.r}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PricingTeaser() {
  const starter = PLANS.find((p) => p.id === 'starter');
  const nums = [
    { v: String(FREE_CREDITS), k: 'free credits, no card' },
    { v: String(PREVIEW_COMPANIES), k: 'companies, with fit reasons' },
    { v: `$${starter?.monthly}`, k: `a month for ${starter?.monthlyCredits?.toLocaleString('en-US')} credits` },
  ];
  return (
    <section id="pricing-teaser" className={SECTION}>
      <div className={WRAP}>
        <Head
          kicker="Pricing"
          title="Start free. Pay for what Harvin finds."
          leads={[
            `Start with ${FREE_CREDITS} free credits and see your first ${PREVIEW_COMPANIES} companies with fit reasons. Paid plans start at $${starter?.monthly} a month for ${starter?.monthlyCredits?.toLocaleString('en-US')} credits. Emails and phone numbers are charged only when found.`,
          ]}
        />
        <div className="mt-2 grid gap-x-12 gap-y-7 sm:grid-cols-3">
          {nums.map((s) => (
            <div key={s.k} className="border-t border-white pt-[22px]">
              <div className="font-display text-[clamp(72px,9vw,128px)] font-medium leading-[0.9] tabular-nums">{s.v}</div>
              <div className="mt-3 text-paper-soft">{s.k}</div>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap items-center gap-x-[22px] gap-y-3.5">
          <a href={startFreeHref()} className={BTN}>
            Start free
          </a>
          <TextLink href="/pricing">See pricing</TextLink>
        </div>
      </div>
    </section>
  );
}

export default function HomeClient() {
  return (
    <>
      <Hero />
      <Problem />
      <StartWithBusiness />
      <Discovery />
      <ResearchFit />
      <DecisionMakers />
      <YourList />
      <KeepCurrent />
      <PricingTeaser />
    </>
  );
}
