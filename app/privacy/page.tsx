'use client';

import LegalPageLayout, {
  LegalSection,
  LegalSubsection,
  LegalList,
  LegalLink,
  LegalContact,
} from '@/components/LegalPageLayout';

const mail = 'text-ember-500 hover:text-ember-400 dark:text-ember-300 underline underline-offset-2';

export default function PrivacyPolicy() {
  return (
    <LegalPageLayout
      type="privacy"
      title="Privacy Policy"
      effectiveDate="2 November 2026"
      lastUpdated="2 November 2026"
      entity="Thyleads Private Limited, operating Harvin.ai"
      intro={
        <>
          This Privacy Policy explains how Thyleads Private Limited, operating the Harvin.ai product
          (&lsquo;Harvin&rsquo;, &lsquo;we&rsquo;, &lsquo;us&rsquo; or &lsquo;our&rsquo;), collects, uses,
          discloses and protects personal information when you visit Harvin.ai, create or use a Harvin account,
          communicate with us, or otherwise interact with our services.
        </>
      }
    >
      <LegalSection title="1. Information We Collect">
        <LegalSubsection title="Account and User Information">
          <LegalList
            items={[
              'Name',
              'Business email address',
              'Business phone number',
              'Company name',
              'Job title',
              'Account credentials',
              'Profile information',
              'User role and permissions',
              'Authentication information',
              'Account activity',
            ]}
          />
        </LegalSubsection>

        <LegalSubsection title="Customer and Prospect Information">
          <p>
            Customers may upload, connect, import or otherwise process information relating to their customers,
            prospects, employees or business contacts through Harvin.
          </p>
          <LegalList
            items={[
              'Names',
              'Business email addresses',
              'Business phone numbers',
              'Job titles',
              'Company information',
              'Professional profile information',
              'CRM records',
              'Account and contact information',
              'Prospect research',
              'Engagement history',
              'Campaign information',
              'Notes',
              'Intent or account signals',
              'Information obtained through permitted enrichment services',
            ]}
          />
        </LegalSubsection>

        <LegalSubsection title="Email and Mailbox Information">
          <p>
            Where a user connects an email account, Harvin may access information required to provide connected
            inbox, campaign, drafting and related functionality. This may include mailbox address, sender and
            recipient details, subject lines, email metadata, message content, attachments, labels or folder
            status, and authentication tokens required to maintain the connection.
          </p>
        </LegalSubsection>

        <LegalSubsection title="Calendar and Meeting Information">
          <p>
            Where supported calendar functionality is connected, Harvin may process meeting title, participants,
            date and time, meeting description, scheduling information, meeting notes and related CRM or account
            context.
          </p>
        </LegalSubsection>

        <LegalSubsection title="Calling Information">
          <p>
            Where calling functionality is enabled, Harvin may process telephone numbers, caller and recipient
            details, call date and duration, call status, recording identifiers and links, and call recordings
            where recording is enabled. Customers are responsible for ensuring their use of call recording complies
            with applicable notice, consent and other legal requirements.
          </p>
        </LegalSubsection>

        <LegalSubsection title="AI-Assisted Features">
          <p>
            Harvin may use third-party model providers, including Anthropic, to power features such as email
            drafting, meeting preparation, account research, prospect research, account prioritisation, call
            preparation, task suggestions, classification, signal analysis and sales recommendations. Information
            provided to such services depends on the feature being used. Users remain responsible for reviewing
            and deciding whether to use generated content or recommendations.
          </p>
        </LegalSubsection>

        <LegalSubsection title="Website and Technical Information">
          <LegalList
            items={[
              'IP address',
              'Browser and device information',
              'Operating system',
              'Pages visited',
              'Referring pages',
              'Timestamps',
              'Product usage information',
              'Diagnostic information',
              'Application logs',
              'Security events',
              'Cookie and similar technology identifiers',
            ]}
          />
        </LegalSubsection>
      </LegalSection>

      <LegalSection title="2. Information We Receive From Third Parties">
        <p>
          Harvin may receive information from customers, CRM platforms, Google Workspace, Microsoft services, email
          providers, calendar providers, telephony providers, business-data and enrichment providers, professional
          and publicly available sources, integration partners, analytics providers and other services connected
          by customers.
        </p>
      </LegalSection>

      <LegalSection title="3. How We Use Personal Information">
        <LegalList
          items={[
            'Provide and operate Harvin',
            'Create and manage accounts',
            'Authenticate users',
            'Provide email, calling, calendar and CRM functionality',
            'Provide account intelligence and enrichment',
            'Generate recommendations and drafts',
            'Provide customer support',
            'Maintain security',
            'Investigate abuse or misuse',
            'Monitor and improve product performance',
            'Communicate about the service',
            'Process billing and subscriptions',
            'Comply with legal obligations',
            'Enforce agreements and protect rights',
          ]}
        />
      </LegalSection>

      <LegalSection title="4. Customer Data and Our Role">
        <p>
          Harvin may act in different legal capacities depending on the processing activity. For information
          relating to our own website visitors, customer contacts, account administration, billing, security and
          our own business operations, Thyleads Private Limited generally determines the purposes of processing.
        </p>
        <p>
          Where a customer uses Harvin to process CRM records, prospect information, email information, campaign
          information, call information or other personal information on its behalf, the customer generally
          determines the purposes of that processing and Harvin acts as its service provider or processor, subject
          to our Data Processing Addendum.
        </p>
        <p>
          Customers are responsible for ensuring they have an appropriate legal basis, permission or other
          authority to provide personal information to Harvin and to use Harvin for their intended activities.
        </p>
      </LegalSection>

      <LegalSection title="5. How We Share Information">
        <p>
          Harvin may disclose information to service providers that support cloud infrastructure, email
          infrastructure, communications, calling, data enrichment, analytics, security, AI/model APIs,
          business-data services, search services, payment or billing, and customer support.
        </p>
        <p>
          We may also disclose information when instructed by a customer, as part of a customer-enabled
          integration, where required by law, to protect Harvin or others, in connection with a corporate
          transaction, or with consent.
        </p>
      </LegalSection>

      <LegalSection title="6. International Processing">
        <p>
          Harvin&apos;s primary production infrastructure is currently located in India. Some service providers and
          integrations may process information in other countries, including the United States, European Union and
          other jurisdictions. Where required by applicable law, appropriate contractual or other transfer
          mechanisms will be used.
        </p>
      </LegalSection>

      <LegalSection title="7. Data Retention">
        <p>
          Harvin retains personal information only for as long as reasonably necessary for the purpose for which it
          was collected, to provide the service, satisfy contractual requirements, maintain security, resolve
          disputes or meet legal obligations. Retention periods vary by data type and system.
        </p>
        <p>
          Certain limited information may be retained where necessary for legal, security, fraud-prevention or
          suppression purposes.
        </p>
      </LegalSection>

      <LegalSection title="8. Security">
        <p>
          Harvin uses technical and organisational measures intended to protect information against unauthorised
          access, alteration, disclosure or destruction. No internet service or method of electronic storage can be
          guaranteed to be completely secure.
        </p>
      </LegalSection>

      <LegalSection title="9. Cookies">
        <p>
          Harvin uses cookies and similar technologies for essential functionality, authentication, security,
          preferences, analytics, performance measurement and, where enabled, marketing or advertising. See our{' '}
          <LegalLink href="/cookies">Cookie Policy</LegalLink> for more information.
        </p>
      </LegalSection>

      <LegalSection title="10. Your Privacy Rights">
        <p>
          Depending on where you live and applicable law, you may have rights to access, correct, delete, restrict
          or object to certain processing, obtain a copy of information, withdraw consent where applicable, opt out
          of certain targeted advertising, or opt out of certain sale or sharing of personal information.
        </p>
        <p>Where Harvin processes information solely on behalf of a customer, we may direct your request to that customer.</p>
        <p>
          Requests may be submitted by email to <a href="mailto:admin@harvin.ai" className={mail}>admin@harvin.ai</a>{' '}
          or by phone at <a href="tel:+918769673818" className={mail}>+91 8769673818</a>.
        </p>
      </LegalSection>

      <LegalSection title="11. Business Contact Removal and Suppression">
        <p>
          If business-contact information relating to you is available through Harvin and applicable law gives you
          a right to request removal, you may submit a request through our{' '}
          <LegalLink href="/privacy-choices">Privacy Choices page</LegalLink>. Where appropriate,
          Harvin may retain limited suppression information to help prevent reintroduction through future
          enrichment.
        </p>
      </LegalSection>

      <LegalSection title="12. Children">
        <p>Harvin is intended for business users and is not designed for children. We do not knowingly offer Harvin to children.</p>
      </LegalSection>

      <LegalSection title="13. Changes to this Privacy Policy">
        <p>
          We may update this Privacy Policy from time to time to reflect changes to Harvin, our processing practices
          or applicable law. The updated version will be posted with a revised Last Updated date.
        </p>
      </LegalSection>

      <LegalContact />
    </LegalPageLayout>
  );
}
