/**
 * Pricing from the v2 copy handoff (§4.8). Every number here is
 * PENDING APPROVAL (claims C7, C12–C15) — the homepage teaser, pricing page
 * and calculator all read from this file so an approved change lands in one
 * place.
 *
 * Offer/Product JSON-LD is only emitted once PRICING_APPROVED is true.
 */
export const PRICING_APPROVED = false;

export const FREE_CREDITS = 250;
export const PREVIEW_COMPANIES = 25;
export const FREE_REVEALS = 10;

export type PlanId = 'free' | 'starter' | 'growth' | 'agency' | 'enterprise';

export type Plan = {
  id: PlanId;
  name: string;
  /** USD per month, monthly billing. null = custom. */
  monthly: number | null;
  /** USD per month, billed annually. null = custom. */
  annual: number | null;
  priceNote?: string;
  credits: string;
  /** Monthly credit allowance, used by the calculator. */
  monthlyCredits?: number;
  seats: string;
  profiles: string;
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
    credits: '250, once',
    seats: '1',
    profiles: '1',
    bestFor: 'Seeing what Harvin finds',
    oneLiner: 'See 25 companies your database misses, with the reasons each one fits.',
    inclusions: ['Company Profile', 'Discovery previews (25 companies per search)', '10 free contact reveals', 'No CSV export'],
    cta: 'Start free',
  },
  {
    id: 'starter',
    name: 'Starter',
    monthly: 99,
    annual: 79,
    credits: '5,000/month',
    monthlyCredits: 5000,
    seats: '1',
    profiles: '1',
    bestFor: 'One SDR or founder',
    oneLiner: 'Everything one person needs to build and work a list each month.',
    inclusions: ['Everything in Free', 'Full research and Company Fit', 'People Search & Contacts', 'CSV export'],
    cta: 'Start with Starter',
  },
  {
    id: 'growth',
    name: 'Growth',
    monthly: 349,
    annual: 279,
    credits: '20,000/month',
    monthlyCredits: 20000,
    seats: '3',
    profiles: '3',
    bestFor: 'A small sales team',
    oneLiner: 'Shared lists, CRM and sequencer sync, and room to research more.',
    // NEEDS INPUT: which integrations
    inclusions: ['Everything in Starter', '3 seats', '3 Company Profiles', 'CRM and sequencer sync', 'Enrich Column', 'Signals'],
    cta: 'Start with Growth',
    badge: 'Most popular',
  },
  {
    id: 'agency',
    name: 'Agency',
    monthly: 799,
    annual: 639,
    credits: '50,000/month',
    monthlyCredits: 50000,
    seats: '5',
    profiles: 'Unlimited (one per client)',
    bestFor: 'Agencies running many clients',
    oneLiner: 'A separate Company Profile and workspace for every client.',
    inclusions: ['Everything in Growth', '5 seats', 'Unlimited client profiles', 'Client workspaces'],
    cta: 'Start with Agency',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    monthly: null,
    annual: null,
    priceNote: 'From $12,000/year',
    credits: 'Custom, annual',
    seats: 'Custom',
    profiles: 'Custom',
    bestFor: 'Larger teams and annual commitments',
    oneLiner: 'Annual credits, SSO, onboarding and your first list built with you.',
    // NEEDS INPUT: confirm SSO and deal-outcome sync
    inclusions: [
      'Everything in Agency',
      'Custom seats and credits',
      'SSO',
      'Guided onboarding',
      'First list built with you',
      'Deal-outcome sync to improve Company Fit',
    ],
    cta: 'Talk to sales',
  },
];

/** Handoff §4.8 credit menu, grouped for display. Row text is the handoff's, word for word. */
export const CREDIT_MENU_GROUPS: {
  id: 'free' | 'research' | 'contacts' | 'signals';
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
      { action: 'Invalid contact', credits: 'Refunded' },
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
    id: 'signals',
    title: 'Signals',
    rows: [{ action: 'Signal monitoring', credits: '5 per account per month' }],
  },
];

export const CREDIT_COSTS = {
  company: 2,
  deepField: 3,
  email: 3,
  phone: 20,
  signalAccount: 5,
} as const;

export const WORKED_EXAMPLE: { work: string; credits: number }[] = [
  { work: '1,000 companies researched and scored', credits: 2000 },
  { work: '600 work emails found', credits: 1800 },
  { work: '60 phone numbers found', credits: 1200 },
];

type Cell = string;
export const FEATURE_TABLE: { feature: string; cells: [Cell, Cell, Cell, Cell, Cell] }[] = [
  { feature: 'Company Profile', cells: ['1', '1', '3', 'Unlimited', 'Custom'] },
  { feature: 'Discovery previews', cells: ['Yes', 'Yes', 'Yes', 'Yes', 'Yes'] },
  { feature: 'Research and Company Fit', cells: ['Preview only', 'Yes', 'Yes', 'Yes', 'Yes'] },
  { feature: 'Research fields', cells: ['–', 'Yes', 'Yes', 'Yes', 'Yes'] },
  { feature: 'Enrich Column', cells: ['–', '–', 'Yes', 'Yes', 'Yes'] },
  { feature: 'People Search (multi-source waterfall)', cells: ['Yes', 'Yes', 'Yes', 'Yes', 'Yes'] },
  { feature: 'Email and phone waterfall', cells: ['10 free reveals', 'Yes', 'Yes', 'Yes', 'Yes'] },
  { feature: 'Name and title normalization', cells: ['Yes', 'Yes', 'Yes', 'Yes', 'Yes'] },
  { feature: 'Data Enrichment (upload lists)', cells: ['–', 'Yes', 'Yes', 'Yes', 'Yes'] },
  { feature: 'Signals', cells: ['–', '–', 'Yes', 'Yes', 'Yes'] },
  { feature: 'CSV export', cells: ['–', 'Yes', 'Yes', 'Yes', 'Yes'] },
  { feature: 'CRM and sequencer sync', cells: ['–', '–', 'Yes', 'Yes', 'Yes'] },
  { feature: 'Client workspaces', cells: ['–', '–', '–', 'Yes', 'Yes'] },
  { feature: 'SSO', cells: ['–', '–', '–', '–', 'Yes'] },
  { feature: 'Guided onboarding', cells: ['–', '–', '–', '–', 'Yes'] },
];

/** Smallest paid plan whose monthly credits cover the total; above Agency, Enterprise. */
export function recommendPlan(totalCredits: number): Plan {
  const paid = PLANS.filter((p) => p.monthlyCredits !== undefined);
  return paid.find((p) => (p.monthlyCredits ?? 0) >= totalCredits) ?? PLANS[PLANS.length - 1];
}
