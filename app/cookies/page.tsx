'use client';

import LegalPageLayout, { LegalSection, LegalSubsection, LegalContact } from '@/components/LegalPageLayout';

export default function CookiePolicy() {
  return (
    <LegalPageLayout
      type="cookies"
      title="Cookie Policy"
      effectiveDate="2 November 2026"
      lastUpdated="2 November 2026"
      entity="Thyleads Private Limited, operating Harvin.ai"
      intro={
        <>
          Harvin.ai uses cookies and similar technologies on our website and services. This policy explains how
          those technologies may be used and what choices may be available to you.
        </>
      }
    >
      <LegalSection title="1. What Are Cookies?">
        <p>
          Cookies are small data files placed on your browser or device when you visit a website. Similar
          technologies may include pixels, local storage, SDKs and other technologies that allow websites and
          applications to remember information or understand how they are used.
        </p>
      </LegalSection>

      <LegalSection title="2. Cookies We May Use">
        <LegalSubsection title="Strictly Necessary Cookies">
          <p>
            These cookies may be used for authentication, account sessions, security, fraud prevention, load
            balancing and remembering essential settings.
          </p>
        </LegalSubsection>
        <LegalSubsection title="Functional Cookies">
          <p>
            These cookies help remember choices or provide additional functionality, such as interface, language
            or account preferences.
          </p>
        </LegalSubsection>
        <LegalSubsection title="Analytics and Performance Cookies">
          <p>
            These cookies help us understand how visitors use Harvin and may collect information such as pages
            visited, session duration, interactions, device type, browser, approximate location and referral
            source.
          </p>
        </LegalSubsection>
        <LegalSubsection title="Advertising or Marketing Cookies">
          <p>
            Where enabled, these technologies may be used to measure campaigns, understand conversions or provide
            more relevant advertising. Depending on jurisdiction, these technologies may require consent or create
            a right to opt out.
          </p>
        </LegalSubsection>
      </LegalSection>

      <LegalSection title="3. Managing Cookies">
        <p>
          You can manage non-essential cookies through our cookie preference tool where available and can also
          configure your browser to block or delete cookies. Blocking certain cookies may affect website
          functionality.
        </p>
        <p>
          Where required by applicable law, Harvin will recognise qualifying browser-based opt-out preference
          signals such as Global Privacy Control.
        </p>
      </LegalSection>

      <LegalSection title="4. Changes to this Cookie Policy">
        <p>
          We may update this Cookie Policy as our website or technologies change. The updated version will be
          posted on this page.
        </p>
      </LegalSection>

      <LegalContact />
    </LegalPageLayout>
  );
}
