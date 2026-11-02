'use client';

import LegalPageLayout, {
  LegalSection,
  LegalList,
  LegalTable,
  LegalLink,
  LegalContact,
} from '@/components/LegalPageLayout';

const PROCESSING_DETAILS = [
  {
    label: 'Subject Matter',
    value: 'Provision of the Harvin sales development, sales engagement and revenue operations platform.',
  },
  {
    label: 'Duration',
    value: "For the duration of Customer's use of Harvin and any limited retention period following termination.",
  },
  {
    label: 'Nature and Purpose',
    value:
      'Account/contact management; CRM workflows; email; campaigns; calling; calendar and meeting workflows; account research and intelligence; enrichment; recommendations; reporting; analytics; support and security.',
  },
  {
    label: 'Categories of Personal Data',
    value:
      'Names; work emails; business phone numbers; job titles; employer/company information; professional profile information; CRM information; prospect information; email content and metadata; calendar/meeting information; campaign information; engagement information; call information and recordings where enabled; notes; SDR/user activity; authentication information; technical logs; generated recommendations.',
  },
  {
    label: 'Categories of Data Subjects',
    value:
      'Customer employees and contractors; customer administrators; SDRs and sales representatives; customer prospects; business contacts; customer customers; meeting participants; and other persons whose information Customer processes through Harvin.',
  },
];

export default function DataProcessingAddendum() {
  return (
    <LegalPageLayout
      type="dpa"
      title="Data Processing Addendum"
      effectiveDate="2 November 2026"
      lastUpdated="2 November 2026"
      entity="Thyleads Private Limited, operating Harvin.ai"
      intro={
        <>
          This Data Processing Addendum (&lsquo;DPA&rsquo;) forms part of the agreement governing use of Harvin.ai
          between Thyleads Private Limited, operating Harvin.ai (&lsquo;Harvin&rsquo;), and the customer using the
          Harvin service (&lsquo;Customer&rsquo;).
        </>
      }
    >
      <LegalSection title="1. Scope and Definitions">
        <p>
          This Data Processing Addendum forms part of the agreement governing use of Harvin.ai between Thyleads Private
          Limited, operating Harvin.ai (&lsquo;Harvin&rsquo;), and the customer using the Harvin service
          (&lsquo;Customer&rsquo;). It applies where Harvin processes Personal Data on behalf of Customer.
        </p>
        <p>
          &lsquo;Customer Personal Data&rsquo; means Personal Data processed by Harvin on behalf of Customer in
          connection with the Harvin service. &lsquo;Data Protection Laws&rsquo; means privacy and data protection laws
          applicable to the relevant processing. &lsquo;Subprocessor&rsquo; means a third party engaged by Harvin to
          process Customer Personal Data on behalf of Customer.
        </p>
      </LegalSection>

      <LegalSection title="2. Roles of the Parties">
        <p>
          Customer determines the purposes for which Customer Personal Data is processed through Harvin. To the extent
          Harvin processes Customer Personal Data solely on behalf of Customer, Customer acts as Controller or
          equivalent responsible party and Harvin acts as Processor or service provider.
        </p>
        <p>
          Harvin may separately act as Controller or equivalent responsible party for information processed for its own
          business purposes, such as account administration, billing, security, legal compliance and operation of its
          business.
        </p>
      </LegalSection>

      <LegalSection title="3. Customer Instructions">
        <p>
          Harvin will process Customer Personal Data only to provide the service, in accordance with Customer&rsquo;s
          documented instructions, as described in the applicable agreement, or where required by applicable law.
          Customer&rsquo;s configuration and use of Harvin constitute documented instructions.
        </p>
      </LegalSection>

      <LegalSection title="4. Customer Responsibilities">
        <LegalList
          items={[
            'Determine whether its use of Harvin complies with applicable law',
            'Provide required privacy notices',
            'Establish an appropriate legal basis for processing',
            'Obtain required permissions or consents',
            'Ensure Personal Data submitted to Harvin is collected lawfully',
            'Configure the service appropriately',
            'Comply with laws governing email, calling, recording, SMS, marketing and other communications',
          ]}
        />
      </LegalSection>

      <LegalSection title="5. Confidentiality">
        <p>
          Harvin will ensure that personnel authorised to process Customer Personal Data are subject to confidentiality
          obligations.
        </p>
      </LegalSection>

      <LegalSection title="6. Security">
        <p>
          Harvin will maintain technical and organisational measures designed to protect Customer Personal Data against
          accidental or unlawful destruction, loss, alteration, unauthorised disclosure or access. Harvin does not
          represent that any system can provide absolute security.
        </p>
      </LegalSection>

      <LegalSection title="7. Subprocessors">
        <p>
          Customer authorises Harvin to engage Subprocessors necessary to provide the service. Harvin will require
          Subprocessors processing Customer Personal Data to be subject to appropriate data protection obligations and
          will maintain a current <LegalLink href="/subprocessors">Subprocessor List</LegalLink>.
        </p>
      </LegalSection>

      <LegalSection title="8. Data Subject Requests">
        <p>
          Taking into account the nature of processing, Harvin will provide reasonable assistance to Customer in
          responding to valid Data Subject requests relating to Customer Personal Data. Where a Data Subject contacts
          Harvin regarding Personal Data controlled by Customer, Harvin may direct that person to Customer unless
          applicable law requires otherwise.
        </p>
      </LegalSection>

      <LegalSection title="9. Security Incidents">
        <p>
          Harvin will notify Customer without undue delay after becoming aware of a confirmed Personal Data breach
          affecting Customer Personal Data where notification is required by applicable Data Protection Laws.
          Notification is not an admission of fault or liability.
        </p>
      </LegalSection>

      <LegalSection title="10. Compliance Assistance">
        <p>
          Taking into account the nature of processing and information available to Harvin, Harvin will provide
          reasonable assistance with processing security, data protection impact assessments, regulatory
          consultations, Personal Data breaches and Data Subject rights where required by applicable law.
        </p>
      </LegalSection>

      <LegalSection title="11. International Transfers">
        <p>
          Harvin and its Subprocessors may process Customer Personal Data in countries other than the country in which
          Customer or the Data Subject is located. Where applicable Data Protection Laws require a transfer mechanism,
          the parties will use an appropriate lawful mechanism.
        </p>
      </LegalSection>

      <LegalSection title="12. Return and Deletion">
        <p>
          Upon termination or expiry of the applicable service agreement, Harvin will, subject to applicable law and
          technical limitations, return or make available Customer Personal Data where agreed and/or delete Customer
          Personal Data processed on behalf of Customer. Certain information may remain temporarily in backups,
          provider systems, security records or legally required records until expiration or deletion in accordance
          with applicable retention processes.
        </p>
      </LegalSection>

      <LegalSection title="13. Audit and Information Rights">
        <p>
          Harvin will make available information reasonably necessary to demonstrate compliance with applicable
          processor obligations. Any audit must be reasonably necessary, protect confidential information and other
          customers, avoid unreasonable disruption, and be subject to reasonable prior notice.
        </p>
      </LegalSection>

      <LegalSection title="14. Processing Details">
        <LegalTable rows={PROCESSING_DETAILS} />
      </LegalSection>

      <LegalSection title="15. Order of Precedence">
        <p>
          If this DPA conflicts with another agreement between Harvin and Customer regarding processing of Customer
          Personal Data, this DPA controls solely with respect to that processing issue.
        </p>
      </LegalSection>

      <LegalContact />
    </LegalPageLayout>
  );
}
