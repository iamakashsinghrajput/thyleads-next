'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

import { PLANS, type PlanId } from '@/lib/pricing';

/**
 * Monthly/Annual billing state for the pricing page. The toggle lives in
 * PricingPlans, but the comparison-table header also switches price, so the
 * state sits above both.
 */
const BillingContext = createContext<{ annual: boolean; setAnnual: (v: boolean) => void }>({
  annual: false,
  setAnnual: () => {},
});

export default function BillingProvider({ children }: { children: ReactNode }) {
  const [annual, setAnnual] = useState(false);
  return <BillingContext.Provider value={{ annual, setAnnual }}>{children}</BillingContext.Provider>;
}

export function useBilling() {
  return useContext(BillingContext);
}

/** Per-month price for a plan under the current billing period ("$99/mo", "$0", "Custom"). */
export function BillingPrice({ planId }: { planId: PlanId }) {
  const { annual } = useBilling();
  const plan = PLANS.find((p) => p.id === planId)!;
  const price = annual ? plan.annual : plan.monthly;
  if (price === null) return <>Custom</>;
  if (price === 0) return <>$0</>;
  return <>${price}/mo</>;
}
