'use client';

import LegalPageLayout, { LegalSection, LegalContact } from '@/components/LegalPageLayout';

export default function RefundPolicy() {
  return (
    <LegalPageLayout
      type="refund"
      title="Refund Policy"
      effectiveDate="2 November 2026"
      lastUpdated="2 November 2026"
      entity="Thyleads Private Limited, operating Harvin.ai"
      intro={
        <>
          This Refund Policy applies to Harvin.ai, a business-to-business software service operated by
          Thyleads Private Limited, unless different terms are stated in an Order Form or other agreement
          signed with the customer.
        </>
      }
    >
      <LegalSection title="1. Subscription Fees">
        <p>
          Subscription fees are generally non-refundable once a billing period has started. Customers remain
          responsible for fees incurred during the applicable subscription period. Cancellation prevents future
          renewal but does not ordinarily result in a refund for an already-paid subscription period.
        </p>
      </LegalSection>

      <LegalSection title="2. Usage and Credit Purchases">
        <p>
          Credits, usage balances, data purchases or other consumption-based amounts are non-refundable once
          used or consumed. Unused credits are not redeemable for cash unless expressly stated otherwise in the
          applicable commercial agreement.
        </p>
      </LegalSection>

      <LegalSection title="3. Billing Errors">
        <p>
          If you believe you were charged incorrectly or charged more than once, contact us promptly. Where
          Harvin confirms a billing error, we will correct the charge or issue an appropriate refund or credit.
        </p>
      </LegalSection>

      <LegalSection title="4. Service-Specific Agreements">
        <p>
          Enterprise customers or customers purchasing through an Order Form may have separate refund,
          cancellation or commercial terms. Where those terms conflict with this Refund Policy, the signed Order
          Form or agreement controls.
        </p>
      </LegalSection>

      <LegalSection title="5. Legal Rights">
        <p>
          Nothing in this Refund Policy limits any refund or remedy that cannot legally be excluded under
          applicable law.
        </p>
      </LegalSection>

      <LegalSection title="6. Requesting Billing Assistance">
        <p>
          Contact <a href="mailto:admin@harvin.ai" className="text-ember-500 hover:text-ember-400 dark:text-ember-300 underline underline-offset-2">admin@harvin.ai</a>{' '}
          or <a href="tel:+918769673818" className="text-ember-500 hover:text-ember-400 dark:text-ember-300 underline underline-offset-2">+91 8769673818</a>{' '}
          and provide your company name, account email and relevant invoice or transaction information.
        </p>
      </LegalSection>

      <LegalContact />
    </LegalPageLayout>
  );
}
