/**
 * Pricing from "Harvin AI Pricing Page: Developer Handoff" (9 Nov 2026).
 * The homepage teaser, pricing page and calculator all read from this file so
 * an approved change lands in one place.
 *
 * The handoff is the final, approved copy, so the Product/Offer JSON-LD is on.
 * Open launch decisions (A: when the phone code is sent, B: who can buy packs,
 * C: export-charge wording) use the handoff's recommended options.
 */
export const PRICING_APPROVED = true;

export const FREE_CREDITS = 250;
export const PREVIEW_COMPANIES = 25;
export const FREE_REVEALS = 10;

/** Credit pack — paid plans only [DECISION B]. */
export const CREDIT_PACK = { credits: 2500, price: 59 } as const;

export type PlanId = 'free' | 'starter' | 'growth' | 'agency' | 'enterprise';

export type Plan = {
  id: PlanId;
  name: string;
  /** USD per month, monthly billing. null = custom. */
  monthly: number | null;
  /** USD per month, billed annually. null = custom. */
  annual: number | null;
  priceNote?: string;
  /** Monthly credit allowance, used by the plan cards and the calculator. */
  monthlyCredits?: number;
  /** Seat chip text. Paid plans are never differentiated by seats. */
  seats: string;
  bestFor: string;
  oneLiner: string;
  inclusions: string[];
  cta: string;
  badge?: string;
};

export const PLANS: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    monthly: 0,
    annual: 0,
    seats: '1 seat',
    bestFor: 'Seeing what Harvin AI finds',
    oneLiner: 'See 25 companies your database misses, with the reasons each one fits.',
    inclusions: ['Company Profile', 'Discovery previews (25 companies per search)', '10 free contact reveals', 'No CSV export'],
    cta: 'Start free',
  },
  {
    id: 'starter',
    name: 'Starter',
    monthly: 99,
    annual: 79,
    monthlyCredits: 5000,
    seats: 'Unlimited seats',
    bestFor: 'One SDR or founder, or a small team working one market',
    oneLiner: 'Everything one person needs to build and work a list each month.',
    inclusions: ['Everything in Free', 'Unlimited seats', 'Full research and Company Fit', 'People Search & Contacts', 'CSV export'],
    cta: 'Start with Starter',
  },
  {
    id: 'growth',
    name: 'Growth',
    monthly: 349,
    annual: 279,
    monthlyCredits: 20000,
    seats: 'Unlimited seats',
    bestFor: 'A sales team with a CRM and sequencer',
    oneLiner: 'Shared lists, CRM and sequencer sync, and room to research more.',
    inclusions: ['Everything in Starter', '3 Company Profiles', 'CRM and sequencer sync', 'Enrich Column', 'Signals'],
    cta: 'Start with Growth',
    badge: 'Most popular',
  },
  {
    id: 'agency',
    name: 'Agency',
    monthly: 799,
    annual: 639,
    monthlyCredits: 50000,
    seats: 'Unlimited seats',
    bestFor: 'Agencies running many clients',
    oneLiner: 'A separate Company Profile and workspace for every client.',
    inclusions: ['Everything in Growth', 'Unlimited client profiles', 'Client workspaces', 'Guest seats for client teams'],
    cta: 'Start with Agency',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    monthly: null,
    annual: null,
    priceNote: 'From $12,000/year',
    seats: 'Unlimited seats',
    bestFor: 'Larger teams and annual commitments',
    oneLiner: 'Annual credits, SSO, onboarding and your first list built with you.',
    inclusions: [
      'Everything in Agency',
      'Custom credits',
      'SSO',
      'Guided onboarding',
      'First list built with you',
      'Deal-outcome sync to improve Company Fit',
    ],
    cta: 'Talk to sales',
  },
];

/** Credit menu, grouped for display. Row text is the handoff's, word for word. */
export const CREDIT_MENU_GROUPS: {
  id: 'free' | 'research' | 'contacts' | 'exports' | 'signals';
  title: string;
  rows: { action: string; credits: string }[];
}[] = [
  {
    id: 'free',
    title: 'Free',
    rows: [
      { action: 'Discovery preview (up to 25 companies per search, with fit reasons)', credits: 'Free' },
      { action: 'Decision-makers matched to your Target Profile', credits: 'Free, up to 3 per company' },
      { action: 'Email or phone with no qualifying result', credits: 'Free' },
      { action: 'Invalid contact', credits: 'Refunded as credits, automatically' },
    ],
  },
  {
    id: 'research',
    title: 'Company research',
    rows: [
      { action: 'Company researched and scored for Company Fit', credits: '2 per company' },
      { action: 'Standard research field (category, funding, tech stack, revenue estimate)', credits: '1 per company' },
      { action: 'Deep-research field (store count, monthly active users, location count, countries served)', credits: '3 per company' },
    ],
  },
  {
    id: 'contacts',
    title: 'Contacts',
    rows: [
      { action: 'Work email found', credits: '3' },
      { action: 'Phone number found', credits: '20' },
    ],
  },
  {
    id: 'exports',
    title: 'Exports',
    rows: [
      { action: 'Researched companies, and people with a revealed email or phone', credits: 'Free, always' },
      { action: 'Person exported without a revealed email or phone', credits: '1, charged once per person' },
    ],
  },
  {
    id: 'signals',
    title: 'Signals',
    rows: [{ action: 'Signal monitoring', credits: '5 per account per month' }],
  },
];

export const CREDIT_COSTS = {
  company: 2,
  standardField: 1,
  deepField: 3,
  email: 3,
  phone: 20,
  signalAccount: 5,
  exportPerson: 1,
} as const;

export const WORKED_EXAMPLE: { work: string; credits: number }[] = [
  { work: '1,000 companies researched and scored', credits: 2000 },
  { work: '600 work emails found', credits: 1800 },
  { work: '60 phone numbers found', credits: 1200 },
];

/** '–' renders as "Not included", 'Yes' as "Included"; anything else is shown as text. */
type Cell = string;
export const FEATURE_TABLE: { feature: string; cells: [Cell, Cell, Cell, Cell, Cell] }[] = [
  { feature: 'Credits', cells: ['250 once', '5,000 / month', '20,000 / month', '50,000 / month', 'Custom, annual'] },
  { feature: 'Seats', cells: ['1', 'Unlimited', 'Unlimited', 'Unlimited', 'Unlimited'] },
  { feature: 'Company Profiles', cells: ['1', '1', '3', 'Unlimited', 'Custom'] },
  { feature: 'Discovery previews', cells: ['Yes', 'Yes', 'Yes', 'Yes', 'Yes'] },
  { feature: 'Research and Company Fit', cells: ['Preview only', 'Yes', 'Yes', 'Yes', 'Yes'] },
  { feature: 'Research fields', cells: ['–', 'Yes', 'Yes', 'Yes', 'Yes'] },
  { feature: 'Enrich Column', cells: ['–', '–', 'Yes', 'Yes', 'Yes'] },
  { feature: 'People Search (multi-source waterfall)', cells: ['Yes', 'Yes', 'Yes', 'Yes', 'Yes'] },
  { feature: 'Email and phone waterfall', cells: ['10 free reveals', 'Yes', 'Yes', 'Yes', 'Yes'] },
  { feature: 'Name and title normalization', cells: ['Yes', 'Yes', 'Yes', 'Yes', 'Yes'] },
  { feature: 'Data Enrichment (upload lists)', cells: ['–', 'Yes', 'Yes', 'Yes', 'Yes'] },
  { feature: 'CSV export (pay once per record)', cells: ['–', 'Yes', 'Yes', 'Yes', 'Yes'] },
  { feature: 'CRM and sequencer sync', cells: ['–', '–', 'Yes', 'Yes', 'Yes'] },
  { feature: 'Signals', cells: ['–', '–', 'Yes', 'Yes', 'Yes'] },
  { feature: 'Client workspaces and guest seats', cells: ['–', '–', '–', 'Yes', 'Yes'] },
  { feature: 'Per-person credit limits', cells: ['–', 'Yes', 'Yes', 'Yes', 'Yes'] },
  { feature: 'SSO', cells: ['–', '–', '–', '–', 'Yes'] },
  { feature: 'Guided onboarding', cells: ['–', '–', '–', '–', 'Yes'] },
];

export type Recommendation =
  | { kind: 'none' }
  | { kind: 'enterprise'; plan: Plan }
  | {
      kind: 'plan';
      plan: Plan;
      packs: number;
      /** Plan credits plus pack credits. */
      credits: number;
      /** USD this month. */
      price: number;
      /** Next plan up, shown when packs are part of the option. */
      next?: Plan;
    };

/**
 * Calculator recommendation (handoff "Recommendation logic"):
 * candidates are each paid plan alone or plus 1–2 credit packs; any signal
 * accounts remove Starter; the cheapest option that covers the total wins;
 * nothing covers it → Enterprise; total 0 → no recommendation.
 */
export function recommendPlan(totalCredits: number, usesSignals: boolean): Recommendation {
  if (totalCredits <= 0) return { kind: 'none' };
  const paid = PLANS.filter((p) => p.monthlyCredits !== undefined && p.monthly !== null);
  const eligible = usesSignals ? paid.filter((p) => p.id !== 'starter') : paid;

  const options = eligible.flatMap((plan) =>
    [0, 1, 2].map((packs) => ({
      plan,
      packs,
      credits: (plan.monthlyCredits ?? 0) + packs * CREDIT_PACK.credits,
      price: (plan.monthly ?? 0) + packs * CREDIT_PACK.price,
    })),
  );
  const best = options
    .filter((o) => o.credits >= totalCredits)
    .sort((a, b) => a.price - b.price || a.packs - b.packs)[0];

  if (!best) return { kind: 'enterprise', plan: PLANS.find((p) => p.id === 'enterprise')! };
  const next = best.packs > 0 ? PLANS[PLANS.indexOf(best.plan) + 1] : undefined;
  return { kind: 'plan', ...best, next };
}
