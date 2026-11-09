'use client';

import { Mail, Phone } from 'lucide-react';
import LegalPageLayout, { LegalSection, LegalList, LegalLink, LegalContact } from '@/components/LegalPageLayout';

const REQUEST_TYPES = [
  'Opt out of sale or sharing of personal information',
  'Opt out of targeted advertising',
  'Remove or suppress a business-contact record',
  'Access your personal information',
  'Correct inaccurate personal information',
  'Delete personal information',
  'Exercise another privacy right available under applicable law',
];

const REQUEST_MAILTO =
  'mailto:admin@harvin.ai?subject=' +
  encodeURIComponent('Privacy request') +
  '&body=' +
  encodeURIComponent(
    [
      'Full name:',
      'Business email address:',
      'Company name (if relevant):',
      'Country:',
      'State or province (if applicable):',
      'Request type (e.g. opt out of sale/sharing, remove business-contact record, access, correct, delete):',
      'Information to help us locate the record:',
    ].join('\n\n'),
  );

const link = 'text-ember-500 hover:text-ember-400 dark:text-ember-300 underline underline-offset-2';

export default function PrivacyChoices() {
  return (
    <LegalPageLayout
      type="privacy-choices"
      title="Your Privacy Choices"
      effectiveDate="2 November 2026"
      lastUpdated="2 November 2026"
      entity="Thyleads Private Limited, operating Harvin.ai"
      intro={
        <>
          This page explains how you may exercise applicable privacy choices, including opt-out, removal,
          deletion, access and correction rights.
        </>
      }
    >
      {/* Quick action — the request route described in § 6 */}
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-ember-500/25 dark:bg-[#0F0E0C] dark:bg-gradient-to-br dark:from-ember-500/[0.1] dark:to-transparent sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div>
          <p className="text-[16px] font-semibold text-slate-900 dark:text-white">Do Not Sell or Share My Personal Information</p>
          <p className="mt-1 text-[14px] text-slate-500 dark:text-white/50">
            No Harvin account needed. Send a request and tell us what you&apos;d like us to do.
          </p>
        </div>
        <div className="flex flex-shrink-0 flex-col gap-2 sm:flex-row">
          <a
            href={REQUEST_MAILTO}
            className="inline-flex items-center justify-center gap-2 rounded-btn bg-ember-500 px-4 py-2.5 text-[14px] font-semibold text-white shadow-[0_1px_4px_rgba(201,76,30,0.3)] transition-all hover:bg-ember-400 hover:shadow-[0_4px_14px_rgba(201,76,30,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#0F0E0C]"
          >
            <Mail size={16} aria-hidden="true" />
            Submit a request
          </a>
          <a
            href="tel:+918769673818"
            className="inline-flex items-center justify-center gap-2 rounded-btn border border-slate-200 bg-white px-4 py-2.5 text-[14px] font-semibold text-slate-700 transition-colors hover:bg-slate-100 dark:border-white/[0.12] dark:bg-transparent dark:text-white/80 dark:hover:bg-white/[0.06]"
          >
            <Phone size={16} aria-hidden="true" />
            Call us
          </a>
        </div>
      </div>

      <LegalSection title="1. Do Not Sell or Share My Personal Information">
        <p>Harvin does not sell Customer Data provided to us by our customers as a standalone commercial database.</p>
        <p>
          However, certain privacy laws define terms such as &lsquo;sale&rsquo; and &lsquo;sharing&rsquo; broadly
          and may treat certain disclosures, advertising technologies or data-related activities as a sale, sharing
          or targeted advertising even where money is not exchanged directly for personal information.
        </p>
        <p>
          Where applicable law gives you the right to opt out, you may ask us not to sell or share your personal
          information. You do not need to create a Harvin account to submit an applicable opt-out request.
        </p>
      </LegalSection>

      <LegalSection title="2. Business Contact Removal">
        <p>
          Harvin may process professional or business-contact information through customer workflows, account
          intelligence, research, enrichment or integrations with third-party business-data providers.
        </p>
        <p>
          If information relating to you appears in data controlled by Harvin and you would like it removed or
          suppressed where applicable, you may submit a request. We may retain a limited suppression record, such as
          a business email address or other identifier, solely to prevent re-addition.
        </p>
      </LegalSection>

      <LegalSection title="3. Targeted Advertising">
        <p>
          Where Harvin uses advertising technologies and applicable law gives you the right to opt out of targeted
          advertising or advertising-related sharing, you may exercise that choice through our{' '}
          <LegalLink href="/cookies">cookie controls</LegalLink> or by contacting us.
        </p>
      </LegalSection>

      <LegalSection title="4. Global Privacy Control">
        <p>
          Where required by applicable law, Harvin recognises qualifying browser-based opt-out preference signals
          such as Global Privacy Control. A browser signal may not contain enough information to identify a separate
          business-contact record. If you also want a business-contact record removed, please submit a request
          directly.
        </p>
      </LegalSection>

      <LegalSection title="5. Requests You Can Submit">
        <LegalList items={REQUEST_TYPES} />
      </LegalSection>

      <LegalSection title="6. Submit a Request">
        <p>
          Please provide your full name, business email address, company name if relevant, country, state or
          province if applicable, request type, and any information reasonably necessary to locate the relevant
          record. Requests may be sent to <a href={REQUEST_MAILTO} className={link}>admin@harvin.ai</a> or made by
          phone at <a href="tel:+918769673818" className={link}>+91 8769673818</a>.
        </p>
        <p>
          Harvin will not discriminate against you for exercising a privacy right available to you under applicable
          law.
        </p>
      </LegalSection>

      <LegalContact />
    </LegalPageLayout>
  );
}
