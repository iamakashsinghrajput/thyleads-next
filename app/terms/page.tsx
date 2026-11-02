'use client';

import LegalPageLayout, { LegalSection, LegalList, LegalLink, LegalContact } from '@/components/LegalPageLayout';

export default function TermsOfService() {
  return (
    <LegalPageLayout
      type="terms"
      title="Terms of Service"
      effectiveDate="2 November 2026"
      lastUpdated="2 November 2026"
      entity="Thyleads Private Limited, operating Harvin.ai"
      intro={
        <>
          These Terms of Service govern your use of Harvin.ai, a product operated by Thyleads Private Limited. By
          creating an account, executing an Order Form, purchasing a subscription or otherwise using Harvin, you
          agree to these Terms.
        </>
      }
    >
      <LegalSection title="1. Harvin Service">
        <p>
          Harvin provides software for sales development, account intelligence, sales engagement, communications,
          workflow management and related revenue operations activities. Features may include email, CRM
          workflows, calling, calendar functionality, enrichment, account research, campaigns, reporting,
          recommendations and third-party integrations.
        </p>
      </LegalSection>

      <LegalSection title="2. Accounts">
        <p>
          You are responsible for maintaining the confidentiality of your login credentials and for activity
          occurring through your account. Customers are responsible for managing authorised users and permissions.
        </p>
      </LegalSection>

      <LegalSection title="3. Permitted Use">
        <LegalList
          items={[
            'Use Harvin only for lawful business purposes',
            'Follow these Terms and applicable law',
            'Stay within the usage limits of your subscription or Order Form',
          ]}
        />
      </LegalSection>

      <LegalSection title="4. Prohibited Use">
        <LegalList
          items={[
            'Violate applicable law',
            'Send unlawful spam or unsolicited communications',
            'Engage in harassment, fraud or deception',
            'Unlawfully collect or process personal information',
            'Violate marketing, calling or messaging rules',
            'Record calls unlawfully',
            'Upload malware',
            'Attempt unauthorised access',
            'Interfere with platform security',
            'Reverse engineer Harvin except where law expressly permits',
            'Misuse third-party integrations',
            'Infringe intellectual property rights',
            'Use Harvin for illegal, discriminatory or abusive activities',
          ]}
        />
      </LegalSection>

      <LegalSection title="5. Customer Data">
        <p>
          Customer retains ownership of Customer Data. Customer grants Harvin the limited rights necessary to host,
          process, transmit and otherwise handle Customer Data to provide, secure, support and operate the service
          in accordance with these Terms and the Data Processing Addendum.
        </p>
      </LegalSection>

      <LegalSection title="6. Privacy and Data Protection">
        <p>
          Our <LegalLink href="/privacy">Privacy Policy</LegalLink> explains how we process personal information
          for our own purposes. Where Harvin processes Customer Personal Data on behalf of Customer, the Data
          Processing Addendum applies.
        </p>
      </LegalSection>

      <LegalSection title="7. Third-Party Services">
        <p>
          Harvin integrates with third-party services. Use of a third-party service may be subject to that
          provider&apos;s terms and privacy practices. Harvin is not responsible for third-party services outside
          our reasonable control.
        </p>
      </LegalSection>

      <LegalSection title="8. Email, Calling and Outreach">
        <p>
          Customer is responsible for ensuring that communications conducted through Harvin comply with applicable
          laws governing commercial email, telemarketing, telephone calls, SMS, messaging, call recording, privacy,
          consent, suppression and opt-out requirements.
        </p>
      </LegalSection>

      <LegalSection title="9. AI-Assisted Features">
        <p>
          Harvin may provide generated content, research, scoring, recommendations or other automated assistance.
          Outputs may be incomplete or inaccurate. Users must review outputs before relying on or using them.
          Unless expressly agreed otherwise, Harvin does not make legally binding or employment decisions on behalf
          of customers based solely on generated recommendations.
        </p>
      </LegalSection>

      <LegalSection title="10. Intellectual Property">
        <p>
          Harvin and its licensors retain all rights in the Harvin platform, software, design, documentation,
          trademarks and underlying technology. Customer retains ownership of Customer Data.
        </p>
      </LegalSection>

      <LegalSection title="11. Fees and Payment">
        <p>
          Fees, billing cycles, usage allowances and payment terms are stated on the applicable pricing page,
          checkout page or Order Form. Fees are exclusive of applicable taxes unless expressly stated otherwise.
        </p>
      </LegalSection>

      <LegalSection title="12. Suspension">
        <p>
          Harvin may suspend access where reasonably necessary due to non-payment, security threat, suspected
          fraud, unlawful use, material breach, or conduct creating material risk to Harvin, another customer or a
          third party.
        </p>
      </LegalSection>

      <LegalSection title="13. Termination">
        <p>
          Either party may terminate as permitted by the applicable Order Form or subscription terms. Upon
          termination, Customer&apos;s right to use the service ends. Data return and deletion are governed by the
          applicable agreement and DPA.
        </p>
      </LegalSection>

      <LegalSection title="14. Warranty Disclaimer">
        <p>
          Harvin is provided on an &lsquo;as available&rsquo; basis. To the maximum extent permitted by applicable
          law, Harvin does not warrant that the service will be uninterrupted, error-free or suitable for every
          particular purpose.
        </p>
      </LegalSection>

      <LegalSection title="15. Limitation of Liability">
        <p>
          To the maximum extent permitted by applicable law, neither party will be liable for indirect,
          incidental, special, punitive or consequential damages, or loss of profits, revenue, goodwill or
          anticipated savings arising from use of the service.
        </p>
        <p>
          Unless an Order Form or negotiated agreement provides otherwise, each party&apos;s aggregate liability
          arising from the service will not exceed the fees paid or payable by Customer to Harvin during the twelve
          months immediately preceding the event giving rise to the claim. This limitation does not apply where
          liability cannot legally be limited.
        </p>
      </LegalSection>

      <LegalSection title="16. Indemnity">
        <p>
          Customer will defend and indemnify Harvin against third-party claims arising from Customer&apos;s
          unlawful use of Harvin, Customer Data or Customer communications, to the extent caused by
          Customer&apos;s violation of applicable law or these Terms.
        </p>
      </LegalSection>

      <LegalSection title="17. Governing Law">
        <p>
          These Terms are governed by the laws of India, without regard to conflict-of-law principles. The courts
          having jurisdiction over the registered office of Thyleads Private Limited will have jurisdiction, unless
          the parties agree otherwise in an Order Form or negotiated agreement.
        </p>
      </LegalSection>

      <LegalSection title="18. Changes">
        <p>
          Harvin may update these Terms from time to time. Material changes will become effective as stated in the
          updated Terms or as otherwise communicated where required.
        </p>
      </LegalSection>

      <LegalContact />
    </LegalPageLayout>
  );
}
