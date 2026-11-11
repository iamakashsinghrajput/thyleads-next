/**
 * Homepage copy that is also emitted as JSON-LD (FAQPage). Kept out of
 * the 'use client' HomeClient so the server page can read the same arrays —
 * schema text must match the visible text word for word.
 *
 * Source: harvin-website-copy-handoff.md §4.1.
 */

export const HOME_FAQ = [
  {
    q: 'What is Harvin.AI?',
    a: "Harvin.AI is a B2B company discovery and research platform. You describe your business once in a Company Profile: what you sell, who buys and which deals you won or lost. Harvin then finds companies that share your customers' need in any industry, researches each one, shows Company Fit with the reasons, and finds the right buyer's work email and phone number.",
  },
  {
    q: "How do I find B2B companies that don't fit industry filters?",
    a: "Search for the need your customers share instead of the category they're filed under. A cross-border payments seller, for example, looks for businesses that collect or pay money internationally, which includes software, travel and marketplace companies. Harvin turns that need into search themes, finds matching companies in any industry and researches each one to confirm the fit.",
  },
  {
    q: 'How is Harvin different from a B2B contact database?',
    a: 'A contact database answers searches you already know how to write: industry, size, location, title keywords. Harvin starts from your business, finds companies a filter would miss, researches the details that decide fit and explains every fit score. It then finds the right buyer and their contact details. Many teams use Harvin to decide who to target and why.',
  },
  {
    q: 'How does Harvin decide Company Fit?',
    a: "Harvin compares each company's researched details with your Company Profile, including how closely it resembles companies that converted and how it differs from deals you lost. Every Company Fit score lists the factors behind it, such as business model, customer countries or technologies, so your team can check the reasoning. Harvin recommends; your team decides.",
  },
  {
    q: 'Will Harvin find the actual buyer?',
    a: "Harvin searches for the roles in your Target Profile in the priority order you set, across several people-data sources, and matches on title, seniority and function together. It reads titles by meaning, so a junior Finance Manager or an adjacent VP Finance Transformation doesn't get passed off as your CFO or Head of Payments.",
  },
  {
    q: 'I already have a list. Do I need to start over?',
    a: 'No. Upload a CSV or XLSX of companies, contacts or both. Harvin cleans company names and first names, fills missing company details, researches the fields you care about, scores Company Fit and finds the decision-makers who are missing, with their work email and phone.',
  },
  {
    // PENDING APPROVAL (C7): append "Invalid contacts are refunded." once confirmed.
    q: "How accurate is Harvin's contact data?",
    a: 'Harvin checks contact-data sources one after another and returns a work email or phone number only when a source gives a qualifying result. You are charged only when a contact is found. Coverage varies by person and country.',
  },
  {
    q: 'How much setup does Harvin need?',
    a: 'About as long as it takes to describe your business. Paste your website and Harvin drafts your Company Profile; you add a few customers, a few lost deals and your target roles. There are no tables to build, prompts to write or APIs to connect, so a founder, Head of Sales or SDR lead can run Harvin without an operations specialist.',
  },
  {
    // PENDING APPROVAL (C12–C14): all numbers.
    q: 'How much does Harvin cost?',
    a: 'Harvin starts free with 250 credits. Paid plans start at $99 a month for 5,000 credits, with Growth, Agency and Enterprise plans for larger teams. Credits pay for company research, research fields, emails, phone numbers and signal monitoring, and contacts are charged only when found.',
  },
  {
    q: 'Who built Harvin?',
    a: 'Harvin was built by the team behind Thyleads, an outbound agency founded by Rahul Dev, after nearly 80 client engagements building B2B prospect lists by hand.',
  },
];
