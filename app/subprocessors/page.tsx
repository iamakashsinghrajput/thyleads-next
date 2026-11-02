'use client';

import LegalPageLayout, { LegalSection, LegalTable, LegalLink, LegalContact } from '@/components/LegalPageLayout';

const SUBPROCESSORS = [
  {
    label: 'Google Cloud Platform',
    value:
      'Application infrastructure, compute, storage and related cloud services. Primary Harvin production region: Mumbai, India.',
  },
  {
    label: 'Google',
    value:
      'Google sign-in, Gmail integrations, Calendar integrations and related Google Workspace functionality where enabled by the customer.',
  },
  {
    label: 'Microsoft',
    value: 'Microsoft sign-in, Outlook/email functionality and related Microsoft services where enabled by the customer.',
  },
  { label: 'Smartlead', value: 'Email sequencing, sending, campaign management and connected inbox functionality.' },
  { label: 'Instantly', value: 'Email sequencing and sending where used.' },
  { label: 'HeyReach', value: 'LinkedIn outreach functionality where enabled.' },
  { label: 'Twilio', value: 'Voice calling and related telephony infrastructure.' },
  { label: 'FreJun', value: 'Calling functionality and related telephony infrastructure.' },
  {
    label: 'Anthropic',
    value: 'Generated drafts, recommendations, research, meeting preparation and related model-assisted functionality.',
  },
  { label: 'Google Gemini', value: 'Classification and related model-assisted functions.' },
  { label: 'Groq', value: 'Model-assisted classification and related functionality.' },
  { label: 'Apollo', value: 'Business-data enrichment.' },
  {
    label: 'Apify',
    value: 'Collection and processing of permitted public web or professional information for supported workflows.',
  },
  { label: 'SerpAPI', value: 'Search-engine data and research functionality.' },
];

export default function SubprocessorList() {
  return (
    <LegalPageLayout
      type="subprocessors"
      title="Subprocessor List"
      effectiveDate="2 November 2026"
      lastUpdated="2 November 2026"
      entity="Thyleads Private Limited, operating Harvin.ai"
      intro={
        <>
          Harvin uses third-party service providers to support certain features of the service. Where those providers
          process Customer Personal Data on behalf of Harvin, they may act as Subprocessors.
        </>
      }
    >
      <LegalSection title="Current Subprocessors and Service Providers">
        <LegalTable head={['Provider', 'Purpose']} rows={SUBPROCESSORS} />
      </LegalSection>

      <LegalSection title="Changes to Subprocessors">
        <p>
          Harvin may update this Subprocessor List as its infrastructure and service providers change. Where required
          by an applicable <LegalLink href="/dpa">Data Processing Addendum</LegalLink> or applicable law, customers
          will receive appropriate notice of material new Subprocessors.
        </p>
      </LegalSection>

      <LegalContact />
    </LegalPageLayout>
  );
}
