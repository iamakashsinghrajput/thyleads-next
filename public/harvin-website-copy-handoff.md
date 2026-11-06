# Harvin.AI website copy: developer handoff

Version 2.0 · 5 November 2026 · Status: final copy, with launch-blocking approvals listed in section 9

Replaces the SDR Management Platform website and the Data Building handoff v1.0. Built from *Harvin: Competitive Research, Pricing and the Path to $1M* (source of truth), the Data Building deck, the developer handoff v1.0 and the live pages at harvin.ai/data-building and harvin.ai/account-intelligence (read 5 November 2026).

---

## 0. How to use this handoff

Every page below is final copy. Build it as written. Text inside these tags is not displayed as written:

| Tag | Meaning | What the developer does |
| --- | --- | --- |
| `[PENDING APPROVAL: ...]` | Copy is final but a fact or number needs sign-off | Build it; keep it behind a feature flag or hold the page until approved |
| `[NEEDS INPUT: ...]` | A fact Harvin must supply | Leave the slot; do not ship with the tag visible |
| `[PLACEHOLDER: ...]` | Social proof or media to collect | Hide the block until real content exists |
| `[VISUAL: ...]` | Note for design and build; never displayed | Use to brief design |
| `[PHASE 2]` | Drafted, not for launch | Keep the route unpublished (`noindex`, not in nav or sitemap) |

Conventions:
- Each section has a stable id in brackets, e.g. `[id: hero]`. Use it as the HTML anchor.
- CTAs are written `Label → /route`.
- **FAQPage JSON-LD** for each page is generated at build time from that page's FAQ block, word for word. Do not hand-edit FAQ text in schema.
- **BreadcrumbList** for inner pages follows the route: Home → Section → Page, using the page names in section 2.
- Global JSON-LD (Organization, WebSite) ships on every page. It is written once in section 3.
- The **entity sentence** is the same everywhere. If it changes, change it in every location at once:

> Harvin.AI is a B2B company discovery and research platform that finds the companies and buyers your database misses, shows why each one fits your business, and finds their work emails and phone numbers.

---

## 1. Source digest, decisions and assumptions

### Source digest
Harvin.AI helps B2B sales, RevOps and outbound teams find customers that databases miss. Teams describe their business once in a Company Profile: what they sell, who buys, which companies converted and which didn't. Harvin turns that into search themes, discovers companies by business need rather than industry code, researches each one (including fields databases lack, such as store count and monthly active users), and scores Company Fit with the reasons shown. It then finds the right buyer through multi-source waterfall people search, normalises titles, company names and first names, and finds work emails and phone numbers through an email and phone waterfall. Teams can build a new list or upload one. Signals flag changes at accounts worth watching. Harvin was built by the team behind Thyleads, an outbound agency, after nearly 80 client engagements. It targets sellers into India, Southeast Asia and the UAE, fintech and SaaS sellers with behaviour-defined customers, sellers to multi-location businesses, and outbound agencies.

### Decisions and conflicts
| Topic | Conflict | Decision |
| --- | --- | --- |
| Category | Earlier PDF used "B2B lead generation platform"; handoff v1.0 and research use "B2B company discovery and research" | Discovery and research in visible copy; "lead generation" in SEO metadata only |
| Big idea | Earlier PDF: "one place instead of three tools" | Not used. The wedge is miscategorised companies and buyers |
| Hero | v1.0: "Find the right companies. Know why they fit." | Replaced with a line only Harvin can say (see homepage) |
| Motion | v1.0 was demo-only | Start free is primary everywhere; Book a demo is secondary |
| Pricing | v1.0: "Talk to Sales"; owner's draft: research free, signals 20 credits | Published plans and the research's recommended credit menu, all `[PENDING APPROVAL]` |
| Stats | Live site shows 650M+ profiles, 30+ sources, 20+ signal types, 80% / 3× / 40% / 30% | Held. Copy works without them. The four percentages are removed until a methodology exists |
| "Verified" contacts | Live site says "verified" | Copy says "qualifying" until approved |
| Testimonials | Live Account Intelligence page shows named quotes and metrics (+48%, 3.2x) | Not carried over; no source supplied. Replace with real, permissioned quotes |
| Account Intelligence | Live page covers Account 360, intent scores, website visits, sequences | New /signals page covers confirmed signals only; the rest is `[NEEDS INPUT]` |
| Contact Finder | v1.0 name | Renamed **People Search & Contacts**, with multi-source waterfall people search and name normalization (both confirmed by the owner) |
| Comparison pages | Research: publish within 60 days | Drafted as `[PHASE 2]`, facts as checked 5 Nov 2026 |
| Old metadata | Live pages still carry SDR-platform keywords and Twitter titles | Replace all meta, OG and Twitter tags with section 4 values |
| Navigation | Live nav: Product, Roles, Pricing, Resources; "Get Early Access" | New nav in section 3; Roles pages retired with redirects (see checklist) |

### Assumptions (correct if wrong)
- Sign-up lives at `/signup`, log-in at `/login` (live site points both to `/dashboard`).
- The product supports a website-URL start to draft the Company Profile, and a free discovery preview of 25 companies. Both are in the recommended PLG flow but not yet confirmed `[NEEDS INPUT]`.
- Founder story (Rahul Dev, SDR → global SDR teams at Netcore Unbxd → Thyleads) comes from handoff v1.0 and is accurate.
- Legal entity: Thyleads Pvt. Ltd.; registered office 124 City Road, London EC1V 2NX, UK; India office in Hebbal, Bengaluru (from the live footer).

---

## 2. Site map and routes

| # | Route | Page | Status | Primary reader | Primary keyword | Page job |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | / | Homepage | Launch | Head of Sales, founder | B2B company discovery | Show the wedge and get a free start |
| 2 | /data-building | Data Building | Launch | RevOps, Head of Sales | build a B2B target list | Explain the full workflow end to end |
| 3 | /company-discovery | Company Discovery | Launch | Founder, SDR lead | find companies by business model | Show search by business need |
| 4 | /research-fields | Research Fields & Company Fit | Launch | RevOps | company research data | Show fields databases lack and how fit is scored |
| 5 | /people-search | People Search & Contacts | Launch | SDR lead, RevOps | waterfall people search | Show how Harvin finds the actual buyer and their contacts |
| 6 | /data-enrichment | Data Enrichment | Launch | RevOps | enrich a CSV of companies | Improve an existing list without starting over |
| 7 | /signals | Signals | Launch, subject to confirmation | Head of Sales | B2B buying signals | Fit before timing |
| 8 | /pricing | Pricing | Launch, numbers pending | All | Harvin pricing | Make cost and credits clear; drive Start free |
| 9 | /use-cases | Use cases hub | Launch | All | B2B prospecting use cases | Route to the right segment |
| 10 | /use-cases/fintech-payments | Fintech & payments | Launch | Fintech sellers | find fintech customers | Payment behaviour, not industry |
| 11 | /use-cases/b2b-saas | B2B SaaS & enterprise tech | Launch | SaaS sellers | SaaS lead generation | Shared workflow, not industry code |
| 12 | /use-cases/multi-location-consumer | Multi-location & consumer businesses | Launch | Vendors to retail, QSR, D2C, apps | find retail chains by store count | Store count, MAU, locations |
| 13 | /use-cases/new-markets | Entering new markets | Launch | Expansion leads | market entry lead list | Reuse what worked at home |
| 14 | /use-cases/outbound-agencies | Outbound & GTM agencies | Launch | Agency owners | lead generation for agencies | One process, many clients; partner program |
| 15 | /regions/india | India | Launch | Sellers into India | B2B data India | Find Indian companies global databases miss |
| 16 | /regions/southeast-asia | Southeast Asia | Launch | Sellers into SEA | B2B data Southeast Asia | Same, SEA |
| 17 | /regions/uae | UAE & Middle East | Launch | Sellers into the Gulf | B2B data UAE | Same, UAE |
| 18 | /integrations | Integrations | Launch | RevOps | Harvin integrations | What connects, how data moves |
| 19 | /data-sources-and-compliance | Data sources & compliance | Launch, legal review | RevOps, legal | B2B data compliance GDPR DPDP | Trust: where data comes from |
| 20 | /free-tools/missed-accounts | Free tool: missed accounts | Launch | Founder, SDR lead | find accounts my database misses | Top-of-funnel sign-up |
| 21 | /free-tools/title-normalizer | Free tool: title normalizer | [PHASE 2] | RevOps | job title normalizer | SEO and lead capture |
| 22 | /customers | Customers | Launch with placeholders | All | Harvin customers | Proof |
| 23 | /about | About | Launch | All | about Harvin.AI | Origin and principles |
| 24 | /faq | FAQ hub | Launch | All | Harvin FAQ | Canonical answers |
| 25 | /glossary | Glossary | Launch | All, answer engines | waterfall enrichment meaning | Definitions |
| 26 | /compare | Compare hub | [PHASE 2] | Evaluators | lead generation tools comparison | Fair comparisons |
| 27 | /compare/harvin-vs-clay | Harvin vs Clay | [PHASE 2] | Clay users | Clay alternative | When to choose each |
| 28 | /compare/harvin-vs-apollo | Harvin vs Apollo | [PHASE 2] | Apollo users | Apollo alternative | When to choose each |
| 29 | /compare/harvin-vs-sales-navigator | Harvin vs Sales Navigator | [PHASE 2] | Sales Navigator users | Sales Navigator alternative | When to choose each |
| 30 | /compare/harvin-vs-fullenrich | Harvin vs FullEnrich | [PHASE 2] | Contact-finder users | FullEnrich alternative | When to choose each |
| 31 | /book-demo | Book a demo | Launch | Sales-led buyers | Harvin demo | Qualified demo request |

Also built: /signup, /login, /reset-password, /onboarding (in-app), /book-demo/thanks, /signup/check-email, 404. See section 3.

---

## 3. Global components

### 3.1 Header navigation [id: header]
- Logo → /
- **Product** (menu)
  - Data Building — "The full workflow, from your business to the right buyer" → /data-building
  - Company Discovery — "Find companies by what they do, not their category" → /company-discovery
  - Research Fields & Company Fit — "The data that decides fit, and the reasons behind it" → /research-fields
  - People Search & Contacts — "The actual buyer, with work email and phone" → /people-search
  - Data Enrichment — "Improve the list you already have" → /data-enrichment
  - Signals — "Know when a good-fit account changes" → /signals
- **Use cases** (menu)
  - Fintech & payments → /use-cases/fintech-payments
  - B2B SaaS & enterprise tech → /use-cases/b2b-saas
  - Multi-location & consumer businesses → /use-cases/multi-location-consumer
  - Entering new markets → /use-cases/new-markets
  - Outbound & GTM agencies → /use-cases/outbound-agencies
  - Column heading "By region": India → /regions/india · Southeast Asia → /regions/southeast-asia · UAE & Middle East → /regions/uae
- **Pricing** → /pricing
- **Resources** (menu): FAQ → /faq · Glossary → /glossary · Free tool: find missed accounts → /free-tools/missed-accounts · Integrations → /integrations · Data sources & compliance → /data-sources-and-compliance · Customers → /customers
- **About** → /about
- Log in → /login
- Book a demo (secondary button) → /book-demo
- Start free (primary button) → /signup

Mobile: same items in an accordion; buttons pinned at the bottom of the menu: "Start free" (primary), "Book a demo" (secondary), "Log in" (text link).

### 3.2 Announcement bar [id: announcement] (optional, dismissible)
"New: Harvin now finds the companies and buyers your database misses. Start free with 250 credits →" → /signup `[PENDING APPROVAL: credit amount]`

### 3.3 Footer [id: footer]
Brand line: "Harvin.AI finds the companies and buyers your database misses, shows why each one fits, and finds their work emails and phone numbers."

Columns:
- **Product**: Data Building · Company Discovery · Research Fields & Company Fit · People Search & Contacts · Data Enrichment · Signals · Pricing · Integrations
- **Use cases**: Fintech & payments · B2B SaaS · Multi-location & consumer · New markets · Outbound agencies
- **Regions**: India · Southeast Asia · UAE & Middle East
- **Resources**: FAQ · Glossary · Free tool · Customers · Data sources & compliance
- **Company**: About · Contact (mailto:admin@harvin.ai) · Book a demo · Careers `[NEEDS INPUT: route or remove]`
- **Legal** (labels only; link to existing legal pages): Privacy Policy /privacy · Terms of Service /terms · Cookie Policy /cookies · Acceptable Use /acceptable-use · Refund Policy /refund · Data Processing Addendum /dpa · Subprocessors /subprocessors · Your Privacy Choices /privacy-choices

Offices: "Registered office: 124 City Road, London EC1V 2NX, United Kingdom · India office: #164, 1st Cross, 1st Main Road, AECS Layout, Hebbal, Bengaluru, Karnataka 560094"

Bottom row: "© 2026 Thyleads Pvt. Ltd. All rights reserved." · Privacy · Terms · Cookies · Do Not Sell or Share My Data · Cookie settings · LinkedIn icon → https://www.linkedin.com/company/harvin-ai/

"Ask AI about Harvin" strip (keep from live site): label "Ask an AI assistant about Harvin" with ChatGPT, Claude, Google AI Mode and Perplexity icons, each pre-filled with "Explain Harvin.AI using https://harvin.ai/about".

### 3.4 Cookie banner [id: cookie-banner]
"We use cookies to run this site and, with your permission, to understand how it's used. You can change this any time in Cookie settings."
Buttons: Accept all · Reject non-essential · Cookie settings
Settings panel headings: Strictly necessary (always on) · Analytics · Marketing. Save button: "Save choices".

### 3.5 Sign-up page [id: signup] → /signup
- H1: Start free. See the companies your database misses.
- Subhead: Create your account, tell Harvin what you sell, and get your first 25 companies with the reasons each one fits.
- Fields: Work email · Full name · Company website (helper: "We use this to draft your Company Profile.") · Password (helper: "At least 8 characters.")
- Consent: "By creating an account you agree to the Terms of Service and Privacy Policy."
- Button: Create free account
- Below button: "250 free credits. No card needed." `[PENDING APPROVAL]` · "Already have an account? Log in"
- Side panel bullets: "Draft your Company Profile from your website" · "See 25 companies with fit reasons" · "Reveal 10 free contacts on your best matches" `[PENDING APPROVAL: free contact count]`
- Error, personal email: "Please use your work email. Harvin builds your profile from your company's domain."
- Error, existing account: "There's already an account for this email. Log in or reset your password."
- Check-email screen (/signup/check-email): H1 "Check your inbox" · "We sent a link to {email}. Open it to finish setting up Harvin." · Link: "Resend email" · Link: "Use a different email"

### 3.6 Log-in and password reset [id: login]
- /login — H1: Log in to Harvin · Fields: Work email, Password · Button: Log in · Links: "Forgot password?" · "New to Harvin? Start free"
- /reset-password — H1: Reset your password · "Enter your work email and we'll send a reset link." · Button: Send reset link · Confirmation: "If an account exists for {email}, a reset link is on its way."
- Error: "That email and password don't match. Try again or reset your password."

### 3.7 First-run onboarding (in app) [id: onboarding]
Progress label: "Step {n} of 5"

1. **Your business** — H: "What do you sell?" · Helper: "We've drafted this from {website}. Edit anything that's off." · Fields: What does your company do? · What do you sell? · Who do you sell to? · Button: Continue
2. **Your customers** — H: "Who has bought from you, and who hasn't?" · Helper: "Add 3–5 customers and 2 deals you lost. Harvin learns what separates them." · Fields: Customers (domains) · Lost or not-converted (domains) · Upload a customer list (CSV, optional) · Link: "I'll add this later" · Button: Continue
3. **Your buyers** — H: "Who do you want to reach?" · Helper: "List roles in priority order. Harvin looks for the first, then the next." · Fields: Target roles (ordered list, drag to reorder) · Functions · Seniority · Regions · Exclusions (competitors, current customers, open deals, do-not-contact) · Button: Find companies
4. **Your first companies** — Loading: "Turning your profile into search themes…" → "Searching for companies that share your customers' need…" → "Researching and scoring the best matches…" · Result H: "25 companies that fit, with the reasons why" · Card labels: Company Fit · Why it fits · Category in most databases · Button per card: Find buyers
5. **Your first buyers** — H: "Reveal contacts on your best matches" · Helper: "Your first 10 contact reveals are free." `[PENDING APPROVAL]` · Button: Reveal contacts · Then: "Your list is ready. Export it, send it to your CRM, or keep building."

Empty states:
- No companies yet: "No companies here yet. Run a discovery search or upload a list to get started." Buttons: Discover companies · Upload a list
- No matches for a role: "No {role} found at {company}. Harvin tried every role in your list. Add another role or check back later."
- No contact found: "No qualifying email or phone found for this person. You weren't charged."

Paywall and credits:
- Export on Free plan: H "Export needs a paid plan" · "Upgrade to Starter to export lists to CSV or send them to your CRM." · Buttons: See plans → /pricing · Not now
- Low credits (20% left): "You have {n} credits left this month. Top up or upgrade so your next search doesn't stop."
- Out of credits: H "You're out of credits" · "Your saved lists and Company Profile are safe. Add credits to keep researching and revealing contacts." · Buttons: Buy a credit pack · Upgrade plan · Talk to sales

### 3.8 Book a demo [id: book-demo] → /book-demo
- SEO title: Book a Harvin.AI Demo | See Your Market (39 chars) · Meta: "Bring one market, a few of your best customers or a list you already use. We'll show you the companies and buyers Harvin finds." (127)
- H1: Bring one market. We'll show you what Harvin finds.
- Subhead: A 30-minute call with our team. We run Harvin on your market before or during the call, so you see real companies, not slides.
- "What to bring" list: Your targeting criteria, even if it's rough · A few of your best customers and a few deals you lost · Or the spreadsheet your SDR team is working from today
- Form: Work email · Full name · Company website · Job title · Team size (select: 1–5 / 6–20 / 21–50 / 51+) · "Which market do you want to see?" (helper: "e.g. fintechs in Singapore with customers in 10+ countries") · Button: Book my demo
- Note under button: "Prefer to try it yourself? Start free →" /signup
- Confirmation page (/book-demo/thanks): H1 "You're booked in" · "Pick a time below. If you shared a market, we'll start researching it before the call." · [VISUAL: embedded calendar] `[NEEDS INPUT: scheduling tool]`
- Confirmation email — Subject: "Your Harvin demo: what happens next" · Body: "Hi {first_name}, thanks for booking a demo. Before we meet, we'll run Harvin on the market you shared ({market}) so the call starts with real companies and buyers. If you'd like us to compare against a list you already use, reply with it attached. See you on {date}. — The Harvin team"

### 3.9 Reusable CTA blocks
- **[id: cta-start-free]** H2: "See the companies your database misses" · Body: "Tell Harvin what you sell and who has bought from you. Your first 25 companies come with the reasons each one fits." · Start free → /signup · Book a demo → /book-demo · Microcopy: "250 free credits. No card." `[PENDING APPROVAL]`
- **[id: cta-one-market]** H2: "Give Harvin one market" · Body: "Share your targeting criteria, your best customers, or the spreadsheet your SDR team is working from today. We'll show you what Harvin finds." · Book a demo → /book-demo · Start free → /signup
- **[id: cta-agency]** H2: "Bring one difficult client brief" · Body: "We'll show you the companies, fit reasons and buyers Harvin finds for it." · Talk to us → /book-demo · Start free → /signup

### 3.10 404 page [id: 404]
H1: This page isn't where we filed it. · Body: "Fitting, for a product about things filed in the wrong place. Try one of these:" · Links: Homepage → / · How Harvin works → /data-building · Pricing → /pricing · Start free → /signup

### 3.11 Global JSON-LD (every page)
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://harvin.ai/#organization",
      "name": "Harvin.AI",
      "legalName": "Thyleads Pvt. Ltd.",
      "url": "https://harvin.ai",
      "logo": "https://harvin.ai/harvin-logo.png",
      "description": "Harvin.AI is a B2B company discovery and research platform that finds the companies and buyers your database misses, shows why each one fits your business, and finds their work emails and phone numbers.",
      "email": "admin@harvin.ai",
      "sameAs": ["https://www.linkedin.com/company/harvin-ai/"],
      "address": {"@type": "PostalAddress", "streetAddress": "124 City Road", "addressLocality": "London", "postalCode": "EC1V 2NX", "addressCountry": "GB"}
    },
    {
      "@type": "WebSite",
      "@id": "https://harvin.ai/#website",
      "url": "https://harvin.ai",
      "name": "Harvin.AI",
      "publisher": {"@id": "https://harvin.ai/#organization"}
    }
  ]
}
```

---

## 4. Pages

## 4.1 Homepage

| Field | Value |
| --- | --- |
| Route | / |
| Status | Launch |
| Primary reader | Head of Sales or founder whose best customers don't fit database filters |
| Page job | Make the wedge obvious in 10 seconds and get a free start |
| Primary / secondary keywords | B2B company discovery / find B2B customers, B2B lead generation software, find companies not in databases |
| SEO title (54) | Harvin.AI: Find the B2B Customers Your Database Misses |
| Meta description (154) | Harvin finds companies and buyers that databases file under the wrong category, shows why each one fits, and finds their work email and phone. Start free. |
| OG title | Your best customers are filed under the wrong category |
| OG description | Harvin finds them, shows why they fit, and finds the right buyer's work email and phone. |
| llms.txt line | Harvin.AI homepage: what Harvin does, how it works, who it's for, and how to start free. |
| Schema | Organization + WebSite (global), SoftwareApplication, HowTo (how it works), FAQPage |

### Hero [id: hero]
- Eyebrow: B2B COMPANY DISCOVERY & RESEARCH
- H1: Your best customers are filed under the wrong category. Harvin finds them.
- Subhead: Tell Harvin what you sell and who has bought from you. Harvin finds the companies that share your customers' need, whatever industry they're listed under, shows why each one fits, and finds the right buyer's work email and phone.
- Start free → /signup
- Book a demo → /book-demo
- Microcopy: 250 free credits. No card. See 25 companies your database misses. `[PENDING APPROVAL: 250 credits, 25-company preview]`
- [VISUAL: product sequence, left to right: Company Profile card → a discovered company tagged "Listed as: Software" → its Company Fit score with three reasons → matched buyer with email and phone found. Real product UI, fictional company names.]
- Alt text: "Harvin finds a company listed as Software, scores it as a strong fit for a payments seller, and finds its Head of Payments."

### Entity strip [id: entity]
Harvin.AI is a B2B company discovery and research platform that finds the companies and buyers your database misses, shows why each one fits your business, and finds their work emails and phone numbers.

### Proof [id: proof]
Label: "Built from nearly 80 client engagements at Thyleads"
[PLACEHOLDER: 4–6 customer logos with permission; hide the logo row until confirmed]

### Problem [id: problem]
H2: Why do good-fit companies never show up in your database searches?

Body: Because databases search the label, not the business. Your team knows what makes a good customer: how a company makes money, the markets it serves, what it sells, the tools it runs on. A database reduces that to industry, headcount, revenue and location. A company that fits perfectly but is filed under "Software" or "Internet" never appears in your search.

The same thing happens with people. Search for titles containing "Finance" and you get a Finance Manager who is too junior, a VP Finance Transformation in an adjacent role, and a Finance Operations Lead who doesn't buy. The VP Finance you wanted is somewhere in the list.

So your team researches companies one by one, checks websites, builds spreadsheets and checks titles by hand. Harvin does that research for you, using the criteria that matter to your business.

### How it works [id: how-it-works]
H2: How does Harvin find the companies and buyers that fit?

Intro: Harvin works in five steps. It learns your business once, searches for companies by the need your customers share, researches each one, shows how well it fits and why, then finds the right buyer and their contact details.

1. **Teach Harvin your business once.** Add what you sell, who you sell to, a few customers and a few deals you lost. Harvin saves this as your Company Profile and uses it for every list.
2. **Discover companies by business need.** Harvin turns your Company Profile into search themes: the use cases, business models and product language your best customers share. It finds companies that match, in any industry.
3. **Research what matters to you.** Harvin checks each company for the details your targeting depends on, from business model to store count, monthly active users and tech stack.
4. **See Company Fit, with the reasons.** Every company gets a fit score and the factors behind it. Harvin recommends. Your team decides.
5. **Reach the actual buyer.** Harvin searches for your target roles in priority order, across several people-data sources, then runs an email and phone waterfall to find their work email and direct or mobile number.

Link: See the full workflow → /data-building
[VISUAL: five numbered steps in a row with small UI crops for each]

### Example [id: example]
H2: What does a miscategorised customer look like?

Intro: Here is a fictional example for a company that sells cross-border payments. Its best customers include software companies billing customers overseas, travel businesses collecting payments from abroad and marketplaces paying sellers in many countries. They sit in different industries but share one need.

Three-column comparison:
| In a typical database | After Harvin's research | Company Fit |
| --- | --- | --- |
| Northstar Software (fictional) · Industry: Software · 350 employees · India · Revenue: unknown | Subscription business · Customers in 18 countries · Recurring foreign-currency payments · Uses Stripe and AWS | 91, strong fit · Matches the patterns of companies that converted |

Caption: Nothing in the database record says "cross-border payments prospect". Harvin looks past the label to understand the business.

### People search [id: people-search]
H2: How does Harvin find the person who actually buys?

Body: Harvin searches for the roles in your Target Profile in the order you set, for example CFO, then VP Finance, then Head of Payments. If the first role isn't there, it moves to the next. It searches across several people-data sources, so a buyer missing from one dataset can still be found in another.

Harvin reads titles by meaning, not keywords. "Treasury & FX Lead, APAC" is understood as a payments buyer; "Finance Manager" is recognised as too junior. Company names and first names are cleaned too, so "ACME TECHNOLOGIES PVT LTD" becomes "Acme Technologies" and "SARAH" becomes "Sarah". Your list is ready to send without cleanup.

Then Harvin runs separate email and phone waterfalls, checking contact-data sources one after another and stopping at the first qualifying result. You pay only when a contact is found.

Link: How People Search works → /people-search
[VISUAL: left, a keyword search for "Finance" with mismatched titles tagged "Too junior", "Adjacent role"; right, Harvin's ordered role list with "Matched" against CFO, VP Finance and Head of Payments.]
Alt text: "Keyword title search returns the wrong people; Harvin matches target roles in priority order."

### Two ways to start [id: two-ways]
H2: Build a new list or improve the one you have

Card 1 — **Build a new list.** Start from your Company Profile. Harvin discovers companies, researches them, scores Company Fit and finds the buyers. → Explore Company Discovery → /company-discovery

Card 2 — **Improve the list you have.** Upload a CSV or XLSX of companies, contacts or both. Harvin cleans the names, fills missing details, scores fit and finds the buyers who are missing. → Explore Data Enrichment → /data-enrichment

### What you get [id: what-you-get]
H2: What you get on every Harvin list

Intro: Every Harvin list carries six things, so your team can act on it the same day.
- **Companies that fit.** Including ones outside your usual filters.
- **Research on each one.** Business model, customers, products, tech stack and the fields you choose.
- **Company Fit with reasons.** A score and the factors behind it, so anyone can check the logic.
- **The right buyers.** Matched to your Target Profile by role, function and seniority.
- **Work emails and phone numbers.** Found through an email and phone waterfall. Charged only when found.
- **Signals.** Changes at accounts you're watching, such as a new finance leader or a move into a new country.

### Research fields teaser [id: research-fields]
H2: The data that decides fit is often missing from the record

Body: A payments seller cares about currencies and countries. A vendor to retail chains cares about store count. A consumer-app tool cares about monthly active users. Harvin researches these fields for each company instead of relying on what a database happens to store. Field availability varies by company, and Harvin tells you when a value couldn't be found.

Chips: Store count · Location count · Monthly active users · Tech stack · Business model · Funding · Countries served
Link: See all research fields → /research-fields

### Who it's for [id: who-its-for]
H2: Built for teams whose customers are hard to find with filters

Intro: Harvin suits B2B teams whose ideal customers are defined by what companies do, not the industry label they carry.
- **Fintech and payments.** Find companies by how they collect, pay and move money. → /use-cases/fintech-payments
- **B2B SaaS and enterprise tech.** Find companies that share the workflow your product fixes. → /use-cases/b2b-saas
- **Vendors to multi-location and consumer businesses.** Find chains, D2C brands and apps by store count, locations and users. → /use-cases/multi-location-consumer
- **Teams entering new markets.** Reuse what worked at home to find accounts abroad. → /use-cases/new-markets
- **Outbound and GTM agencies.** One research process for every client's ideal customer. → /use-cases/outbound-agencies

Regions line: "Strong where global databases are thin: India → /regions/india · Southeast Asia → /regions/southeast-asia · UAE & Middle East → /regions/uae"

### Pricing teaser [id: pricing-teaser]
H2: Start free. Pay for what Harvin finds.
Body: Start with 250 free credits and see your first 25 companies with fit reasons. Paid plans start at $99 a month for 5,000 credits. Emails and phone numbers are charged only when found. `[PENDING APPROVAL: all numbers]`
Buttons: Start free → /signup · See pricing → /pricing

### Why we built Harvin [id: origin]
H2: Why did the team behind Thyleads build Harvin?

Body: Harvin was built by the team behind Thyleads, an outbound agency, after nearly 80 client engagements spent building prospect lists by hand. Every client could describe a great customer in a sentence, but not in database filters. The research happened one browser tab at a time, title searches returned the wrong people, and the reasons behind each targeting decision got lost between tools. Harvin is the tool that work needed.
Link: Read our story → /about

### FAQ [id: faq]
**What is Harvin.AI?**
Harvin.AI is a B2B company discovery and research platform. You describe your business once in a Company Profile: what you sell, who buys and which deals you won or lost. Harvin then finds companies that share your customers' need in any industry, researches each one, shows Company Fit with the reasons, and finds the right buyer's work email and phone number.

**How do I find B2B companies that don't fit industry filters?**
Search for the need your customers share instead of the category they're filed under. A cross-border payments seller, for example, looks for businesses that collect or pay money internationally, which includes software, travel and marketplace companies. Harvin turns that need into search themes, finds matching companies in any industry and researches each one to confirm the fit.

**How is Harvin different from a B2B contact database?**
A contact database answers searches you already know how to write: industry, size, location, title keywords. Harvin starts from your business, finds companies a filter would miss, researches the details that decide fit and explains every fit score. It then finds the right buyer and their contact details. Many teams use Harvin to decide who to target and why.

**How does Harvin decide Company Fit?**
Harvin compares each company's researched details with your Company Profile, including how closely it resembles companies that converted and how it differs from deals you lost. Every Company Fit score lists the factors behind it, such as business model, customer countries or technologies, so your team can check the reasoning. Harvin recommends; your team decides.

**Will Harvin find the actual buyer?**
Harvin searches for the roles in your Target Profile in the priority order you set, across several people-data sources, and matches on title, seniority and function together. It reads titles by meaning, so a junior Finance Manager or an adjacent VP Finance Transformation doesn't get passed off as your CFO or Head of Payments.

**I already have a list. Do I need to start over?**
No. Upload a CSV or XLSX of companies, contacts or both. Harvin cleans company names and first names, fills missing company details, researches the fields you care about, scores Company Fit and finds the decision-makers who are missing, with their work email and phone.

**How accurate is Harvin's contact data?**
Harvin checks contact-data sources one after another and returns a work email or phone number only when a source gives a qualifying result. You are charged only when a contact is found. Coverage varies by person and country. `[PENDING APPROVAL: add "Invalid contacts are refunded." once confirmed]`

**How much setup does Harvin need?**
About as long as it takes to describe your business. Paste your website and Harvin drafts your Company Profile; you add a few customers, a few lost deals and your target roles. There are no tables to build, prompts to write or APIs to connect, so a founder, Head of Sales or SDR lead can run Harvin without an operations specialist.

**How much does Harvin cost?**
Harvin starts free with 250 credits. Paid plans start at $99 a month for 5,000 credits, with Growth, Agency and Enterprise plans for larger teams. Credits pay for company research, research fields, emails, phone numbers and signal monitoring, and contacts are charged only when found. `[PENDING APPROVAL: all numbers]`

**Who built Harvin?**
Harvin was built by the team behind Thyleads, an outbound agency founded by Rahul Dev, after nearly 80 client engagements building B2B prospect lists by hand.

### Final CTA [id: final-cta]
Use block **cta-start-free** (section 3.9).

### Internal links
- See the full workflow → /data-building
- How People Search works → /people-search
- Explore Company Discovery → /company-discovery
- Explore Data Enrichment → /data-enrichment
- See all research fields → /research-fields
- See pricing → /pricing

### JSON-LD (page-specific; FAQPage generated from the FAQ block)
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "Harvin.AI",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web",
      "description": "Harvin.AI is a B2B company discovery and research platform that finds the companies and buyers your database misses, shows why each one fits your business, and finds their work emails and phone numbers.",
      "publisher": {"@id": "https://harvin.ai/#organization"},
      "url": "https://harvin.ai"
    },
    {
      "@type": "HowTo",
      "name": "How Harvin finds the companies and buyers that fit",
      "step": [
        {"@type": "HowToStep", "position": 1, "name": "Teach Harvin your business once", "text": "Add what you sell, who you sell to, a few customers and a few deals you lost. Harvin saves this as your Company Profile and uses it for every list."},
        {"@type": "HowToStep", "position": 2, "name": "Discover companies by business need", "text": "Harvin turns your Company Profile into search themes: the use cases, business models and product language your best customers share. It finds companies that match, in any industry."},
        {"@type": "HowToStep", "position": 3, "name": "Research what matters to you", "text": "Harvin checks each company for the details your targeting depends on, from business model to store count, monthly active users and tech stack."},
        {"@type": "HowToStep", "position": 4, "name": "See Company Fit, with the reasons", "text": "Every company gets a fit score and the factors behind it. Harvin recommends. Your team decides."},
        {"@type": "HowToStep", "position": 5, "name": "Reach the actual buyer", "text": "Harvin searches for your target roles in priority order, across several people-data sources, then runs an email and phone waterfall to find their work email and direct or mobile number."}
      ]
    }
  ]
}
```
Add an `offers` object (lowest price 0, USD) to SoftwareApplication only after pricing is approved.

### Flags on this page
- `[PENDING APPROVAL]` free credits, preview size, plan prices, refund line
- `[PLACEHOLDER]` customer logos

Self-critique (after rewrite): Specificity 9 · Wedge 9 · Mechanism 9 · PLG path 9 · Objections 9 · AEO 9 · Claims 9 · Voice 8

---

## 4.2 Data Building

| Field | Value |
| --- | --- |
| Route | /data-building |
| Status | Launch |
| Primary reader | RevOps lead or Head of Sales evaluating how Harvin works end to end |
| Page job | Explain the full workflow from Company Profile to contacts, and why each step exists |
| Primary / secondary keywords | build a B2B target list / targeted lead list, account research, ICP list building |
| SEO title (57) | Data Building: Build a B2B Target List That Fits | Harvin |
| Meta description (150) | See how Harvin builds a B2B target list: learn your business, find companies by need, research them, score fit with reasons and find the right buyers. |
| OG title / description | From your best customers to your next ones / The full Harvin workflow: Company Profile, discovery, research, Company Fit, people search and contacts. |
| llms.txt line | Harvin Data Building: the end-to-end workflow from Company Profile to discovered companies, research, Company Fit with reasons, multi-source people search and an email and phone waterfall. |
| Schema | BreadcrumbList, WebPage, HowTo, FAQPage |

### Hero [id: hero]
- Eyebrow: HARVIN DATA BUILDING
- H1: From your best customers to your next ones
- Subhead: Harvin learns what you sell, who bought and who didn't. Then it finds companies with the same need, researches each one, explains the fit and finds the right buyer's email and phone.
- Start free → /signup · Book a demo → /book-demo
- [VISUAL: the five steps as a horizontal flow: Company Profile → Discover → Research → Company Fit → People & contacts, with a progress bar counting companies found, researched, matched.]
- Alt text: "The Harvin Data Building workflow in five steps."

### Entity [id: entity]
(entity sentence)

### Definition [id: what-is]
H2: What is Harvin Data Building?
Harvin Data Building is the workflow that turns what you know about your customers into a list your team can sell to. It starts with your Company Profile, discovers companies that share your customers' need, researches them, scores Company Fit with the reasons shown, finds the right buyers through multi-source people search and finds their work emails and phone numbers. One setup drives every list.

### Why filters fall short [id: why-filters-fail]
H2: Why do database searches miss good-fit companies and return the wrong people?
A database search can only find what its fields describe. Good-fit companies get missed when they sit under a broad or wrong category, describe themselves in different words, have no revenue or funding data, or need research before the fit is clear. Title searches fail the other way: they return everyone whose title contains a keyword, and few of them are the buyer.

| Company search | Title search |
| --- | --- |
| Industry: Software · 200–2,000 employees · Revenue $10M–$100M · India · Series B+ | Title contains "Finance" |
| Missed: companies filed under another category, missing revenue data, or described differently | Returned: Finance Manager (too junior), VP Finance Transformation (adjacent role), Finance Operations Lead (doesn't buy) |

### Steps [id: steps]
H2: How Data Building works in five steps

1. **Company Profile: teach Harvin your business once.** Add what you do, what you sell and who you sell to; upload customers, companies that converted and companies that didn't; set target roles, functions, seniority, regions and exclusions (competitors, do-not-contact, open deals). Lost deals matter as much as wins: they show Harvin what separates a company that looks right on paper from one that buys.
2. **Discovery: find companies by what they do.** Harvin turns your profile into search themes grouped by use case, business model, customer type and product language. For a cross-border payments seller, themes include global payouts, international collections, marketplace payments, overseas subscriptions, FX workflows and global payroll.
3. **Research: add the data that decides fit.** Harvin researches category, business model, funding, revenue, monthly active users, store and location count, tech stack and any field you add with Enrich Column. Field availability varies by company.
4. **Company Fit: see the score and the reasons.** Each company is compared with your profile, including the companies that converted and those that didn't. The reasons are shown, so RevOps can audit them, an SDR can use them in a first email, and anyone can overrule them.
5. **People and contacts: reach the actual buyer.** Harvin searches your Target Profile roles in priority order across several people-data sources, normalises titles, company names and first names, then runs separate email and phone waterfalls that stop at the first qualifying result.

### Worked example [id: example]
H2: Example: one Company Profile, five steps (fictional)
| Step | What Harvin did for a cross-border payments seller |
| --- | --- |
| Company Profile | Sells cross-border payment infrastructure to finance teams at global businesses. Converted: Tripwise, Orbit Learn, Nomad Stays. Didn't convert: CornerMart, CityClinic. Roles: CFO, VP Finance, Head of Payments. Regions: India, Southeast Asia, UAE |
| Discovery | Found Northstar Software, Vela Commerce, Brightpath Learning, Atlas Digital and Kitecart. None would appear in a "Financial Services" filter |
| Research | Vela Commerce: online marketplace, Series C, 17 locations, Stripe, Shopify and AWS |
| Company Fit | Vela Commerce 88, strong fit: marketplace paying sellers across countries, like Nomad Stays |
| People & contacts | CFO matched, VP Finance matched, Head of Finance no match, Head of Payments matched; work email and mobile found for the Head of Payments |
Caption: All companies are fictional.

### What you get [id: what-you-get]
H2: What a Data Building list contains
- Companies that share your customers' need, including off-category ones
- Researched fields, with gaps marked rather than guessed
- Company Fit scores with reasons
- Decision-makers matched to your Target Profile
- Work emails and direct or mobile numbers, charged only when found
- Clean names, ready for your CRM or sequencer

### Manual work removed [id: work-removed]
H2: Which manual work does Data Building take over?
| Stage | Before | With Harvin |
| --- | --- | --- |
| Discovery | Trying filter combinations | Search themes from your Company Profile |
| Research | Opening websites one by one | Researched fields and Enrich Column |
| Fit | Gut feel or scoring formulas | Company Fit with reasons |
| People | Checking job titles by hand | Target Profile matching across sources |
| Contacts | Exporting to a separate contact tool | Email and phone waterfall |
| Cleanup | Fixing names before sequencing | Company and first-name normalization |
| Monitoring | Revisiting accounts manually | Signals |

### Credits used [id: credits]
H2: What does a Data Building list cost in credits?
Discovery previews are free. Each company researched and scored costs 2 credits, deep-research fields cost 3, emails cost 3 when found and phone numbers 20 when found. Matching up to three decision-makers per company is free. → See pricing /pricing `[PENDING APPROVAL: credit values]`

### Objections [id: objections]
H2: Common questions before teams switch
- **"We already have a database."** Keep it if it serves other jobs. Harvin's job is deciding which companies to target and why, including the ones your database files elsewhere.
- **"AI scores are a black box."** Company Fit shows its reasons. If a reason is wrong, your team can see it and overrule it.
- **"We don't have an ops person."** You don't need one. There are no tables, prompts or APIs to set up.

### Related [id: related]
Company Discovery → /company-discovery · Research Fields & Company Fit → /research-fields · People Search & Contacts → /people-search · Data Enrichment → /data-enrichment

### FAQ [id: faq]
**What is Harvin Data Building?**
Harvin Data Building is Harvin's end-to-end workflow for building B2B target lists from business context. It uses your Company Profile to discover companies by business need, research them, score Company Fit with visible reasons, match decision-makers to your Target Profile across several people-data sources, and find their work emails and phone numbers.

**What do I need to give Harvin to start?**
Your website, a short description of what you sell and who you sell to, a few customers, a few deals you lost, your target roles in priority order, and any regions or exclusions such as competitors, current customers, open deals or do-not-contact lists. A customer list can be uploaded as a CSV.

**Why does Harvin want my lost deals?**
Lost deals show what separates a company that looks right on paper from one that actually buys. Harvin compares discovered companies with both groups, so Company Fit rewards the traits your customers share and flags the traits your lost deals had in common.

**Does Data Building replace my B2B database?**
For deciding which companies to target and finding their buyers, it can. Teams that also use a database for other jobs, such as sequencing or territory planning, often keep it and use Harvin to build and qualify the lists that go into it.

**Can I add a field after a list is built?**
Yes. Enrich Column adds one researched field, such as monthly active users or store count, across the companies you select, without rebuilding the list.

**How long does a list take?**
A discovery preview of 25 companies appears in minutes. Larger lists take longer because each company is researched before it is scored. `[NEEDS INPUT: typical time for 500 companies]`

### Final CTA [id: final-cta]
Use block **cta-one-market**.

### Internal links
/company-discovery · /research-fields · /people-search · /data-enrichment · /pricing · /signals

### JSON-LD
WebPage + BreadcrumbList (Home → Product → Data Building) + HowTo built from the five steps in [id: steps] (name = bold step title, text = step body) + FAQPage from [id: faq].

### Flags
`[PENDING APPROVAL]` credit values · `[NEEDS INPUT]` list build time

Self-critique: Specificity 9 · Wedge 8 · Mechanism 10 · PLG 8 · Objections 9 · AEO 9 · Claims 9 · Voice 9

---

## 4.3 Company Discovery

| Field | Value |
| --- | --- |
| Route | /company-discovery |
| Status | Launch |
| Primary reader | Founder or SDR lead who can describe the ideal customer but can't express it in filters |
| Page job | Show how Harvin finds companies by business need, and that it finds ones filters miss |
| Primary / secondary keywords | find companies by business model / B2B company search, find companies not in databases, company search by description |
| SEO title (58) | Company Discovery: Find Companies by What They Do | Harvin |
| Meta description (147) | Harvin finds B2B companies by use case, business model and product language, not industry codes, then researches each one and explains why it fits. |
| OG title / description | Find companies by what they do, not how they're filed / Search by the need your customers share, in any industry. |
| llms.txt line | Harvin Company Discovery turns a Company Profile into search themes (use case, business model, customer type, product language) and finds companies that share that need in any industry. |
| Schema | BreadcrumbList, WebPage, HowTo, FAQPage |

### Hero [id: hero]
- Eyebrow: COMPANY DISCOVERY
- H1: Find companies by what they do, not how they're filed
- Subhead: Tell Harvin what you sell. It turns that into the words your market uses, then finds companies that share your customers' need, in any industry.
- Start free → /signup · Book a demo → /book-demo
- Microcopy: Your first 25 companies are free, with the reasons each one fits. `[PENDING APPROVAL]`
- [VISUAL: "What you sell" box branching into four theme groups, flowing into a list of found companies, one tagged "Listed as: Software".]
- Alt text: "Harvin turns what you sell into search themes and finds matching companies."

### Entity [id: entity]
(entity sentence)

### Definition [id: what-is]
H2: What is Company Discovery?
Company Discovery is how Harvin builds a new list from scratch. Harvin reads your Company Profile, turns it into search themes grouped by use case, business model, customer type and product language, and finds companies that match. Each company is then researched and scored for Company Fit, and your exclusions are removed automatically.

### Why filters fall short [id: why-filters-fail]
H2: Why do filter searches miss good-fit companies?
Filters only find companies whose records carry the fields you picked. A payments seller filtering for "Financial Services" never sees a 350-person software company billing customers in 18 countries, because that company is filed under "Software". Its need is identical. Companies also describe themselves in their own words, which rarely match a database's category list.

### Steps [id: steps]
H2: How Company Discovery works
1. **Start from your Company Profile.** What you sell, who buys, and which companies converted or didn't.
2. **Harvin builds search themes.** It groups the language of your customers' need into four types (table below).
3. **Harvin finds matching companies.** In any industry, in the regions you choose.
4. **Exclusions come off.** Current customers, open deals, competitors and do-not-contact companies are removed.
5. **Each company is researched and scored.** You see Company Fit and the reasons, then pick the ones to pursue.

| Theme type | What it captures | Example for a cross-border payments seller |
| --- | --- | --- |
| Use case | The job your product does | Global payouts, international collections |
| Business model | How the customer makes money | Marketplace payments, overseas subscriptions |
| Customer type | Who the customer serves | Cross-border sellers, global employers |
| Product language | Words on the customer's own site | FX workflows, global payroll |

`[NEEDS INPUT: can users view and edit search themes? If yes, add "You can see and edit every theme before Harvin searches."]`

### Worked example [id: example]
H2: Example results for a payments seller (fictional)
| Company | Listed in most databases as | Why Harvin found it |
| --- | --- | --- |
| Northstar Software | Software | Subscription revenue from 18 countries |
| Vela Commerce | Internet | Marketplace paying sellers across 17 locations |
| Brightpath Learning | EdTech | Overseas subscribers paying in several currencies |
None of these would appear in a "Financial Services" filter.

### Lookalikes [id: vs-lookalike]
H2: How is Company Discovery different from lookalike search?
Lookalike search copies the outline of your best customers: size, industry, location. Company Discovery looks for the reason they bought, and it also learns from the deals you lost. Lookalikes work when your best customers already look alike on paper. Company Discovery is built for markets where they don't.

### What you get [id: what-you-get]
H2: What a discovery search gives you
- Companies that share your customers' need, in any category
- The search themes that found them
- Research and Company Fit with reasons for each
- Exclusions already removed
- One click to find buyers and contacts

### Credits used [id: credits]
H2: What does discovery cost?
A discovery preview of up to 25 companies with fit reasons is free. Each company you research and score in full costs 2 credits. `[PENDING APPROVAL]` → /pricing

### Objections [id: objections]
- **"Our ICP is too niche."** Niche is where Company Discovery helps most: the narrower the need, the less it lines up with an industry code.
- **"We'll get noise."** Every company comes with fit reasons, and lost deals pull look-alike-but-wrong companies down.

### Related [id: related]
Research Fields & Company Fit → /research-fields · People Search & Contacts → /people-search · Data Building → /data-building

### FAQ [id: faq]
**How do I find companies that don't fit an industry category?**
Search for the need your customers share rather than the label they carry. Harvin expresses that need as search themes, such as "overseas subscriptions" or "global payroll" for a payments seller, and finds companies that describe themselves that way, whatever category a database files them under.

**What are search themes?**
Search themes are the words and phrases a company with your customers' need uses to describe itself. Harvin builds them from your Company Profile and groups them into use case, business model, customer type and product language.

**Is Company Discovery a lookalike tool?**
No. Lookalike tools match the size, industry and location of your best customers. Company Discovery matches the reason they bought and learns from the deals you lost, which matters most when your best customers don't look alike on paper.

**Which regions does Company Discovery cover?**
Company Discovery searches globally and is built for regions where global databases are thin, including India, Southeast Asia and the UAE. You choose the regions in your Company Profile. `[NEEDS INPUT: any regions excluded or weaker]`

**Do I need to write search queries?**
No. Harvin writes the search themes from your Company Profile. You describe your business and your customers; Harvin builds the search.

**Is there an API for Company Discovery?**
Company Discovery is used in the Harvin app, without code. `[NEEDS INPUT: confirm whether API access exists]`

### Final CTA [id: final-cta]
H2: Tell Harvin what you sell. See who else needs it.
Start free → /signup · Book a demo → /book-demo

### Internal links
/research-fields · /people-search · /data-building · /use-cases/fintech-payments · /pricing

### JSON-LD
WebPage + BreadcrumbList (Home → Product → Company Discovery) + HowTo from [id: steps] + FAQPage.

### Flags
`[NEEDS INPUT]` editable themes, region gaps, API · `[PENDING APPROVAL]` credits

Self-critique: Specificity 9 · Wedge 10 · Mechanism 9 · PLG 9 · Objections 8 · AEO 9 · Claims 9 · Voice 9

---

## 4.4 Research Fields & Company Fit

| Field | Value |
| --- | --- |
| Route | /research-fields |
| Status | Launch |
| Primary reader | RevOps lead who needs to trust why a company is on the list |
| Page job | Show the fields databases don't hold, and how Company Fit uses them |
| Primary / secondary keywords | company research data / store count data, monthly active users data, ICP fit score, Company Fit |
| SEO title (52) | Research Fields & Company Fit: Data That Decides Fit |
| Meta description (153) | Harvin researches the fields databases don't hold, like store count, monthly active users and tech stack, then scores Company Fit with the reasons shown. |
| OG title / description | The data that decides fit is rarely in the record / Researched fields and a Company Fit score you can check. |
| llms.txt line | Harvin Research Fields and Company Fit: researched company data (store count, MAU, location count, tech stack, business model, funding) and a fit score that shows its reasons. |
| Schema | BreadcrumbList, WebPage, FAQPage |

### Hero [id: hero]
- Eyebrow: RESEARCH FIELDS & COMPANY FIT
- H1: The data that decides fit is rarely in the record
- Subhead: Harvin researches what your targeting depends on, from store count to monthly active users, then scores each company against your best customers and shows the reasons.
- Start free → /signup · Book a demo → /book-demo
- [VISUAL: company record card for "Vela Commerce (fictional)": standard fields greyed (Industry: Internet, Size: 600, HQ: Singapore) and researched fields highlighted (Category: Online marketplace, Revenue $41M, Funding Series C, MAU 1.2M, 17 locations, Stripe · Shopify · AWS), with "88 · Strong fit" badge.]
- Alt text: "A company record with fields researched by Harvin and a Company Fit score of 88."

### Entity [id: entity]
(entity sentence)

### Definition [id: what-is]
H2: What are research fields?
Research fields are company details Harvin finds by researching each company, instead of relying on what a database happens to store. They include business model, category, funding, revenue, monthly active users, store or location count, countries served and tech stack. Harvin marks a field as not found rather than guessing.

### Field table [id: fields]
H2: Which fields can Harvin research?
| Field | Useful when you sell to | Credits `[PENDING APPROVAL]` |
| --- | --- | --- |
| Category and business model | Anyone whose ICP isn't an industry code | 1 |
| Funding stage | Startups and scale-ups | 1 |
| Tech stack | Companies using or replacing a tool | 1 |
| Revenue (estimate) | Size-sensitive offers | 1 |
| Monthly active users | Consumer apps, marketplaces | 3 |
| Store or location count | Retail chains, QSR, clinics, multi-site businesses | 3 |
| Countries served | Cross-border and expansion offers | 3 |
| Custom field (your question) | Anything specific to your offer | 3 `[NEEDS INPUT: confirm custom fields exist]` |
Note: Field availability varies by company. Values are researched at the time of the request; refresh any field from the list. `[NEEDS INPUT: confirm refresh behaviour]`

### Why filters fall short [id: why-filters-fail]
H2: Why don't databases hold these fields?
Databases store what's easy to collect across millions of records: industry, headcount, location, sometimes revenue. The details that decide fit for a specific offer, like how many stores a retailer runs or how many users an app has, change often and live on the company's own website, app listings and announcements. They have to be researched company by company.

### Company Fit [id: company-fit]
H2: How does Company Fit work?
Company Fit compares each company's researched details with your Company Profile. It looks at how closely the company resembles customers that converted and how it differs from deals you lost, then gives a score out of 100 and the reasons behind it. Harvin recommends; your team decides which companies to pursue.

Steps:
1. **Your profile sets the pattern.** Customers and lost deals show what a buyer looks like.
2. **Research fills in each company.** The fields that matter to your offer are checked.
3. **Fit is scored with reasons.** Example reasons: "Bills customers in 18 countries, like Tripwise" · "Uses Stripe, like 2 of 3 customers" · "Single-country revenue, like CornerMart (lost)".
4. **You review and decide.** Sort by fit, read the reasons, and overrule any score.

### Enrich Column [id: enrich-column]
H2: Need another field? Add a column.
Enrich Column adds one researched field across the companies you select, without rebuilding the list. Pick a field, such as monthly active users, and Harvin researches the missing values.

### What you get [id: what-you-get]
- Fields databases don't hold, researched per company
- "Not found" instead of guesses
- A Company Fit score with readable reasons
- Reasons your SDRs can use in a first message

### Objections [id: objections]
- **"How do I trust an AI score?"** Read the reasons. Each one points to a researched fact and to the customer or lost deal it resembles.
- **"What if a value is wrong?"** You can see where each value came from `[NEEDS INPUT: confirm source links per field]` and correct it.

### Related [id: related]
Company Discovery → /company-discovery · Data Enrichment → /data-enrichment · Multi-location & consumer → /use-cases/multi-location-consumer

### FAQ [id: faq]
**How does Harvin decide Company Fit?**
Harvin compares each company's researched details with your Company Profile, including how closely it resembles customers that converted and how it differs from deals you lost. Every score lists its reasons, such as business model, customer countries or technologies, so your team can check the logic. Harvin recommends; your team decides.

**Why should I trust an AI fit score?**
Because you don't have to take it on trust. Each Company Fit score shows the facts it used and the customers or lost deals the company resembles. If a reason is wrong or irrelevant, your team can see that immediately and overrule the score.

**Where does Harvin find store counts and monthly active users?**
Harvin researches public sources for each company, such as the company's website, store locators, app listings and announcements. Field availability varies by company, and Harvin marks a value as not found rather than guessing. `[NEEDS INPUT: confirm source types]`

**What does a research field cost?**
Standard fields such as category, funding and tech stack cost 1 credit per company. Deep-research fields such as store count, monthly active users and countries served cost 3 credits per company, because each needs research on that company. `[PENDING APPROVAL]`

**Can I add a field to a list I already built?**
Yes. Enrich Column adds one researched field across the companies you select without rebuilding the list.

**Does Company Fit change over time?**
Company Fit reflects your current Company Profile. When you add customers or lost deals, new scores use the updated pattern. `[NEEDS INPUT: confirm whether existing scores refresh automatically]`

### Final CTA [id: final-cta]
Use block **cta-start-free**.

### Internal links
/company-discovery · /data-enrichment · /pricing · /use-cases/multi-location-consumer · /data-building

### JSON-LD
WebPage + BreadcrumbList (Home → Product → Research Fields & Company Fit) + FAQPage.

### Flags
`[PENDING APPROVAL]` credit values · `[NEEDS INPUT]` custom fields, refresh, source links, score refresh

Self-critique: Specificity 9 · Wedge 9 · Mechanism 9 · PLG 8 · Objections 9 · AEO 9 · Claims 9 · Voice 9

---

## 4.5 People Search & Contacts

| Field | Value |
| --- | --- |
| Route | /people-search |
| Status | Launch |
| Primary reader | SDR lead or RevOps tired of keyword title searches and messy contact data |
| Page job | Show how Harvin finds the actual buyer across sources, cleans the data, and finds their email and phone |
| Primary / secondary keywords | waterfall people search / find decision-makers at a company, job title normalization, find work email and phone number |
| SEO title (58) | Waterfall People Search: Find the Actual Buyer | Harvin.AI |
| Meta description (154) | Harvin searches your target roles in priority order across several people sources, reads titles by meaning, cleans names and finds work emails and phones. |
| OG title / description | The person who buys, not everyone with "Finance" in their title / Multi-source waterfall people search, title and name normalization, email and phone waterfall. |
| llms.txt line | Harvin People Search & Contacts: multi-source waterfall people search in Target Profile priority order, meaning-based title normalization, company and first-name normalization, and separate email and phone waterfalls. |
| Schema | BreadcrumbList, WebPage, HowTo, FAQPage |

### Hero [id: hero]
- Eyebrow: PEOPLE SEARCH & CONTACTS
- H1: The person who buys, not everyone with "Finance" in their title
- Subhead: Harvin searches for your target roles in priority order, across several people-data sources. It reads titles by meaning, cleans names, and finds the work email and phone of the buyer it matches.
- Start free → /signup · Book a demo → /book-demo
- [VISUAL: split panel. Left "Keyword title search": Finance Manager — Too junior; VP Finance Transformation — Adjacent role; Finance Operations Lead — Not the buyer; Head of Commercial Finance — Adjacent role. Right "Harvin · Vela Commerce (fictional)": 1 CFO — Matched; 2 VP Finance — Matched; 3 Head of Finance — No match; 4 Head of Payments — Matched; 5 Treasury Director — No match.]
- Alt text: "Keyword search returns the wrong finance titles; Harvin matches the target roles in order."

### Entity [id: entity]
(entity sentence)

### Definition [id: what-is]
H2: What is waterfall people search?
Waterfall people search finds the best decision-maker at a company by working through a list of target roles in priority order. If the first role isn't there, it tries the next. Harvin's version also cascades across several people-data sources, so a buyer missing from one dataset can still be found in another, and it matches titles by meaning rather than keywords.

### Why keyword search falls short [id: why-filters-fail]
H2: Why do title searches return the wrong people?
A keyword search matches words, not roles. "Finance" returns Finance Managers who are too junior and VPs of Finance Transformation who don't own the budget. Meanwhile the real buyer may have a title the keyword misses, like "Treasury & FX Lead, APAC". And a role cascade that searches a single dataset can only find people that one dataset holds.

### Steps [id: steps]
H2: How Harvin finds the buyer and their contacts
1. **Set your Target Profile.** List roles in priority order, with functions, seniority, regions and titles to exclude (for example assistants and interns).
2. **Harvin cascades through your roles.** For each company it looks for role 1, then role 2, and so on.
3. **Across several people sources.** If one source doesn't have the person, Harvin checks the next.
4. **Titles are read by meaning.** Each title is normalised to a function and seniority, so unusual wording is matched correctly.
5. **Names are cleaned.** Company names and first names are normalised: "ACME TECHNOLOGIES PVT LTD" becomes "Acme Technologies", "SARAH" becomes "Sarah".
6. **Email and phone waterfalls run.** Separately for email and phone, Harvin checks contact-data sources one after another and stops at the first qualifying result.

### Contact waterfall example [id: contact-example]
H2: Example: one buyer, two waterfalls (fictional)
Priya Nair, Head of Payments, Vela Commerce
| Email waterfall | Phone waterfall |
| --- | --- |
| Source A: no match | Source A: no match |
| Source B: no match | Source B: match, stops here |
| Source C: match, stops here | Source C: not needed |
| Result: qualifying work email found | Result: direct/mobile number found |
Caption: Email and phone run separately, so one source can supply the email and another the phone. You're charged only for what's found.

### Title normalization [id: title-normalization]
H2: How does Harvin read job titles?
| Raw title | Function | Seniority | Matches a payments-buyer profile? |
| --- | --- | --- | --- |
| Treasury & FX Lead, APAC | Finance / Treasury | Head | Yes |
| Sr Mgr, Fin Ops – India | Finance operations | Manager | No (too junior) |
| VP Finance Transformation | Finance / Transformation | VP | No (adjacent role) |
| Chief Financial Officer | Finance | C-level | Yes |
Caption: Illustrative.

### What you get [id: what-you-get]
- Up to three matched decision-makers per company, in your priority order
- Normalised titles, functions and seniority
- Clean company names and first names, ready to send
- Work emails and direct or mobile numbers, charged only when found

### Credits used [id: credits]
H2: What do people and contacts cost?
Matching up to three decision-makers per company is free. A work email costs 3 credits and a phone number 20 credits, charged only when found. `[PENDING APPROVAL: values; add "Invalid contacts are refunded." once confirmed]` → /pricing

### Objections [id: objections]
- **"Will this be the actual buyer?"** It's the highest role on your list that Harvin found, matched on title, seniority and function together.
- **"Is the data accurate?"** Contacts are returned only when a source gives a qualifying result. Coverage varies by person and country.
- **"We already use a contact finder."** Contact finders enrich the people you bring. Harvin decides which people first.

### Related [id: related]
Company Discovery → /company-discovery · Data Enrichment → /data-enrichment · India → /regions/india

### FAQ [id: faq]
**What is waterfall people search?**
Waterfall people search finds the best decision-maker at a company by checking a list of target roles in priority order, moving to the next role when one isn't found. Harvin runs this cascade across several people-data sources and matches titles by meaning, so it finds buyers that a single dataset or a keyword search would miss.

**How do I find the right decision-maker at a company?**
List the roles that buy, in priority order, with their function and seniority. In Harvin that list is your Target Profile. Harvin searches each company for the first role, then the next, across several people sources, and returns up to three matched people with normalised titles.

**How does Harvin find work emails and phone numbers?**
Harvin runs separate email and phone waterfalls for each matched person. Each checks contact-data sources one after another and stops at the first qualifying result, so one source can supply the email and another the phone. You're charged only when a contact is found.

**What is job title normalization?**
Job title normalization maps a raw title to a standard function and seniority, so "Sr Mgr, Fin Ops – India" is read as a finance operations manager. Harvin normalises by meaning, which handles unusual wording, abbreviations and regional formats better than keyword rules.

**Why does Harvin clean company names and first names?**
So the list is ready to send. Names stored as "ACME TECHNOLOGIES PVT LTD" or "SARAH" break personalised emails and CRM matching. Harvin normalises them to "Acme Technologies" and "Sarah" before your team sees the list.

**Does Harvin find Indian mobile numbers?**
Harvin's phone waterfall covers India, Southeast Asia and the UAE as well as other regions. Coverage varies by person and country. `[NEEDS INPUT: confirm regional phone coverage and sources]`

### Final CTA [id: final-cta]
H2: Find the buyer before you pay for the contact
Start free → /signup · Book a demo → /book-demo

### Internal links
/company-discovery · /data-enrichment · /pricing · /regions/india · /glossary

### JSON-LD
WebPage + BreadcrumbList (Home → Product → People Search & Contacts) + HowTo from [id: steps] + FAQPage.

### Flags
`[PENDING APPROVAL]` credits, refunds · `[NEEDS INPUT]` regional phone coverage

Self-critique: Specificity 9 · Wedge 9 · Mechanism 10 · PLG 8 · Objections 9 · AEO 9 · Claims 9 · Voice 9

---

## 4.6 Data Enrichment

| Field | Value |
| --- | --- |
| Route | /data-enrichment |
| Status | Launch |
| Primary reader | RevOps lead with an inherited or messy list |
| Page job | Show that an existing list can be cleaned, researched, scored and completed without starting over |
| Primary / secondary keywords | enrich a CSV of companies / data enrichment tool, CRM data cleaning, data normalization |
| SEO title (58) | Data Enrichment: Clean, Research and Score a List | Harvin |
| Meta description (152) | Upload a CSV or XLSX of companies or contacts. Harvin cleans names, fills gaps, researches fields, scores Company Fit and finds missing decision-makers. |
| OG title / description | Improve the list you already have / Clean, research, score and complete it without starting over. |
| llms.txt line | Harvin Data Enrichment takes an uploaded CSV or XLSX of companies, contacts or both; normalises names, fills gaps, researches fields, scores Company Fit and finds missing decision-makers with email and phone. |
| Schema | BreadcrumbList, WebPage, HowTo, FAQPage |

### Hero [id: hero]
- Eyebrow: DATA ENRICHMENT
- H1: Improve the list you already have, without starting over
- Subhead: Upload companies, contacts or both. Harvin cleans the names, fills missing details, researches what your targeting needs, tells you which companies fit and why, and finds the buyers who are missing.
- Start free → /signup · Book a demo → /book-demo
- [VISUAL: an uploaded spreadsheet with messy rows on the left, the same rows on the right with clean names, filled fields, Company Fit scores and new contacts.]
- Alt text: "A messy uploaded list cleaned, researched and scored by Harvin."

### Entity [id: entity]
(entity sentence)

### Definition [id: what-is]
H2: What is Data Enrichment?
Data Enrichment is how Harvin improves a list you already have. Most enrichment fills empty fields. Harvin also asks whether each company belongs on the list: it runs against your Company Profile, so an inherited list comes back cleaned, researched, scored for Company Fit with reasons, and completed with the decision-makers who were missing.

### Why filling fields isn't enough [id: why-filters-fail]
H2: Why isn't filling empty fields enough?
A list can be complete and still wrong. Inherited lists mix good-fit companies with ones that only matched a filter years ago, and contact enrichment tools fill in emails for whoever is already on the list, fit or not. Before you pay for contacts, you need to know which companies deserve them.

### Steps [id: steps]
H2: How Data Enrichment works in five steps
1. **Upload.** A CSV or XLSX of companies, contacts or both. `[NEEDS INPUT: minimum columns, row limit]`
2. **Normalise.** Company names and first names are cleaned: "ACME TECHNOLOGIES PVT LTD" becomes "Acme Technologies", "SARAH" becomes "Sarah".
3. **Fill gaps and research.** Missing company details are filled and the research fields you choose are added.
4. **Score Company Fit.** Each company is compared with your Company Profile, with reasons shown.
5. **Find missing decision-makers.** People matching your Target Profile are added, with work email and phone from the email and phone waterfall.

### What you get [id: what-you-get]
- A clean list, ready for your CRM or sequencer
- Which companies fit, which don't, and why
- Filled company details and researched fields
- The buyers who were missing, with contacts

### Credits used [id: credits]
H2: What does enrichment cost?
Normalisation is included `[NEEDS INPUT: confirm free]`. Each company researched and scored costs 2 credits; research fields 1 or 3; emails 3 and phones 20 when found. Matching up to three decision-makers per company is free. `[PENDING APPROVAL]` → /pricing

### Objections [id: objections]
- **"Our list is a mess."** That's the point of step 2. Upload it as it is.
- **"We don't want to pay to enrich bad-fit rows."** Score fit first, then reveal contacts only for the companies worth it.

### Related [id: related]
Research Fields & Company Fit → /research-fields · People Search & Contacts → /people-search · Integrations → /integrations

### FAQ [id: faq]
**How do I enrich a CSV of companies?**
Upload the CSV or XLSX to Harvin Data Enrichment. Harvin cleans company names and first names, fills missing company details, researches the fields you choose, scores Company Fit against your Company Profile and finds the decision-makers who are missing, with their work email and phone.

**What does data normalization mean?**
Data normalization makes every record follow the same format, so "ACME TECHNOLOGIES PVT LTD" becomes "Acme Technologies" and "SARAH" becomes "Sarah". Normalised data matches correctly in your CRM, deduplicates cleanly and reads properly in personalised emails.

**How is Harvin different from a contact enrichment tool?**
A contact enrichment tool fills in emails and phone numbers for the people you already have. Harvin Data Enrichment also researches each company, scores Company Fit and finds missing decision-makers, so it tells you whether a company belongs on the list before you pay to reach it.

**Can I upload contacts only, without companies?**
Yes. Upload contacts and Harvin matches each to its company, cleans names and titles, and adds the company research and Company Fit. `[NEEDS INPUT: confirm contact-only upload]`

**Can I send the enriched list to my CRM?**
Yes, on plans that include CRM and sequencer sync, or by CSV export on any paid plan. See Integrations for what connects. `[PENDING APPROVAL: plan inclusions]`

### Final CTA [id: final-cta]
H2: Send us the list your team is working from today
Start free → /signup · Book a demo → /book-demo

### Internal links
/research-fields · /people-search · /integrations · /pricing · /data-building

### JSON-LD
WebPage + BreadcrumbList (Home → Product → Data Enrichment) + HowTo from [id: steps] + FAQPage.

### Flags
`[NEEDS INPUT]` upload limits, normalisation cost, contact-only upload · `[PENDING APPROVAL]` credits, plan inclusions

Self-critique: Specificity 8 · Wedge 8 · Mechanism 9 · PLG 8 · Objections 8 · AEO 9 · Claims 9 · Voice 9

---

## 4.7 Signals

| Field | Value |
| --- | --- |
| Route | /signals (301 from /account-intelligence) |
| Status | Launch, subject to signal-feature confirmation |
| Primary reader | Head of Sales deciding when to contact good-fit accounts |
| Page job | Fit before timing: watch the right accounts for reasons to act |
| Primary / secondary keywords | B2B buying signals / account monitoring, sales triggers, when to contact a prospect |
| SEO title (54) | Signals: Know When a Good-Fit Account Changes | Harvin |
| Meta description (154) | Harvin watches the good-fit companies you choose for changes like a new finance leader or a move into a new country, so your team knows when to reach out. |
| OG title / description | A signal only matters at a company that fits / Watch good-fit accounts for a reason to reach out. |
| llms.txt line | Harvin Signals monitors selected good-fit companies for changes such as leadership hires and expansion, and shows each signal next to Company Fit and matched buyers. |
| Schema | BreadcrumbList, WebPage, FAQPage |

### Hero [id: hero]
- Eyebrow: SIGNALS
- H1: A signal only matters at a company that fits
- Subhead: Harvin watches the accounts you choose for changes that give your team a reason to reach out, and shows each one next to Company Fit and the buyers to contact.
- Start free → /signup · Book a demo → /book-demo
- [VISUAL: account card "Vela Commerce (fictional) · Company Fit 88" with two signals: "Leadership change · New VP Finance joined · 4 days ago" and "Expansion · Opened operations in UAE · 11 days ago".]
- Alt text: "A good-fit account with two recent signals."

### Entity [id: entity]
(entity sentence)

### Definition [id: what-is]
H2: What are B2B buying signals?
Buying signals are changes at a company that suggest outreach may be timely, such as a new finance leader, a funding round, a hiring push or expansion into a new country. A signal doesn't mean a company is ready to buy. It means something changed that may make your message more relevant.

### Fit before timing [id: fit-before-timing]
H2: Why does fit come before timing?
Company Fit answers "should we sell to them?" Signals answer "is there a reason to act now?" A good-fit company may have no signal today, and a strong signal doesn't make a poor-fit company a good target.
| | Signal | No signal yet |
| --- | --- | --- |
| Good fit | Reach out now, with the signal as your reason | Keep watching |
| Poor fit | Don't chase it | Leave it off the list |

### Signal types [id: signal-types]
H2: Which signals does Harvin watch?
- Leadership changes (for example a new VP Finance)
- Expansion into new countries or cities
- Funding rounds
- Hiring for relevant roles
- Technology changes
- Events and announcements
`[NEEDS INPUT: confirm the full list; the "20+ signal types" figure stays off the page until confirmed]`

### Steps [id: steps]
H2: How Signals works
1. **Choose accounts to watch.** Usually your best-fit companies.
2. **Harvin monitors them.** For the signal types that matter to your offer.
3. **A signal arrives with context.** Company Fit, the reason it fits and the matched buyers are already there.
4. **Your team acts.** With a reason to reach out and the right person to reach.
`[NEEDS INPUT: confirm whether new leaders are matched and enriched automatically, and how alerts are delivered (in-app, email, Slack)]`

### Credits used [id: credits]
H2: What does monitoring cost?
Signal monitoring costs 5 credits per account per month. Watching 200 good-fit accounts costs 1,000 credits a month. `[PENDING APPROVAL]` → /pricing

### Objections [id: objections]
- **"We already have an intent tool."** Intent tools tell you who's active. Harvin tells you whether they're worth selling to first.
- **"Too many alerts."** You only watch the accounts you choose.

### Related [id: related]
Research Fields & Company Fit → /research-fields · People Search & Contacts → /people-search · Entering new markets → /use-cases/new-markets

### FAQ [id: faq]
**What are B2B buying signals?**
B2B buying signals are changes at a company that suggest outreach may be timely, such as a new finance leader, a funding round, a hiring push or expansion into a new country. Harvin watches the good-fit companies you choose and shows each signal next to Company Fit and the matched buyers.

**Does a signal mean a company is ready to buy?**
No. A signal means something changed that may make outreach timely. It doesn't confirm a buying decision. Harvin pairs each signal with Company Fit so your team can judge whether the change matters at a company worth selling to.

**Which accounts should I monitor?**
Your best-fit companies. Monitoring costs credits per account, so watching the companies with the highest Company Fit gives your team the most useful reasons to reach out for the least spend.

**How much does signal monitoring cost?**
Signal monitoring costs 5 credits per account per month, so watching 200 accounts uses 1,000 credits a month. `[PENDING APPROVAL]`

**Is Signals the same as Account Intelligence?**
Signals replaces the account-monitoring part of Harvin's earlier Account Intelligence product, now built around Company Fit. `[NEEDS INPUT: confirm what else from Account Intelligence, such as Account 360 and intent scores, remains available]`

### Final CTA [id: final-cta]
H2: Tell us which accounts matter most
Start free → /signup · Book a demo → /book-demo

### Internal links
/research-fields · /people-search · /pricing · /use-cases/new-markets · /glossary

### JSON-LD
WebPage + BreadcrumbList (Home → Product → Signals) + FAQPage.

### Flags
`[NEEDS INPUT]` signal list, delivery channels, Account Intelligence scope · `[PENDING APPROVAL]` credits

Self-critique: Specificity 8 · Wedge 9 · Mechanism 8 · PLG 8 · Objections 8 · AEO 9 · Claims 10 · Voice 9

---

## 4.8 Pricing

| Field | Value |
| --- | --- |
| Route | /pricing |
| Status | Launch; every number `[PENDING APPROVAL]` |
| Primary reader | Founder, SDR lead or RevOps deciding whether to try or buy |
| Page job | Make cost and credits obvious; drive Start free; route large teams to sales |
| Primary / secondary keywords | Harvin pricing / Harvin.AI cost, B2B data credits pricing |
| SEO title (45) | Harvin.AI Pricing: Start Free, Plans From $99 |
| Meta description (151) | Start free with 250 credits. Plans from $99 a month for 5,000 credits. Pay for company research and contacts, and only when an email or phone is found. |
| OG title / description | Start free. Pay for what Harvin finds. / Plans from $99 a month; contacts charged only when found. |
| llms.txt line | Harvin pricing: Free (250 credits), Starter $99/month, Growth $349/month, Agency $799/month, Enterprise from $12k/year; credits pay for research, fields, contacts and signals. |
| Schema | BreadcrumbList, WebPage, Product with Offers (only after approval), FAQPage |

### Hero [id: hero]
- Eyebrow: PRICING
- H1: Start free. Pay for what Harvin finds.
- Subhead: Every plan uses credits. You spend them on the companies Harvin researches and scores, the fields you add, and the emails and phone numbers it finds. Contacts are charged only when found.
- Toggle labels: Monthly · Annual (save about 20%)

### Plan cards [id: plans]
| | Free | Starter | Growth | Agency | Enterprise |
| --- | --- | --- | --- | --- | --- |
| Price, monthly billing | $0 | $99/month | $349/month | $799/month | From $12,000/year |
| Price, annual billing (per month) | $0 | $79 | $279 | $639 | Custom |
| Credits | 250, once | 5,000/month | 20,000/month | 50,000/month | Custom, annual |
| Seats | 1 | 1 | 3 | 5 | Custom |
| Company Profiles | 1 | 1 | 3 | Unlimited (one per client) | Custom |
| Best for | Seeing what Harvin finds | One SDR or founder | A small sales team | Agencies running many clients | Larger teams and annual commitments |
| Button | Start free → /signup | Start with Starter → /signup?plan=starter | Start with Growth → /signup?plan=growth | Start with Agency → /signup?plan=agency | Talk to sales → /book-demo |

Card one-liners:
- Free: "See 25 companies your database misses, with the reasons each one fits."
- Starter: "Everything one person needs to build and work a list each month."
- Growth: "Shared lists, CRM and sequencer sync, and room to research more." Badge: Most popular
- Agency: "A separate Company Profile and workspace for every client."
- Enterprise: "Annual credits, SSO, onboarding and your first list built with you."

Card inclusions:
- Free: Company Profile · Discovery previews (25 companies per search) · 10 free contact reveals · No CSV export `[PENDING APPROVAL: free reveals]`
- Starter: Everything in Free · Full research and Company Fit · People Search & Contacts · CSV export
- Growth: Everything in Starter · 3 seats · 3 Company Profiles · CRM and sequencer sync `[NEEDS INPUT: which integrations]` · Enrich Column · Signals
- Agency: Everything in Growth · 5 seats · Unlimited client profiles · Client workspaces
- Enterprise: Everything in Agency · Custom seats and credits · SSO `[NEEDS INPUT: confirm]` · Guided onboarding · First list built with you · Deal-outcome sync to improve Company Fit `[NEEDS INPUT: confirm]`

Annual note (under cards): "Annual plans are billed yearly, with all credits available from day one."

### Credit menu [id: credit-menu]
H2: What do credits pay for?
| Action | Credits |
| --- | --- |
| Discovery preview (up to 25 companies per search, with fit reasons) | Free |
| Company researched and scored for Company Fit | 2 per company |
| Standard research field (category, funding, tech stack, revenue estimate) | 1 per company |
| Deep-research field (store count, monthly active users, location count, countries served) | 3 per company |
| Decision-makers matched to your Target Profile | Free, up to 3 per company |
| Work email found | 3 |
| Phone number found | 20 |
| Signal monitoring | 5 per account per month |
| Email or phone with no qualifying result | Free |
| Invalid contact | Refunded `[PENDING APPROVAL]` |

### What $99 buys [id: worked-example]
H2: What does $99 a month buy?
On Starter, 5,000 credits cover a realistic month for one SDR:
| Work | Credits |
| --- | --- |
| 1,000 companies researched and scored | 2,000 |
| 600 work emails found | 1,800 |
| 60 phone numbers found | 1,200 |
| **Total** | **5,000** |

### Credit calculator [id: calculator]
H2: Estimate your credits
Field labels and helpers:
- "Companies to research each month" (default 1,000) — helper: "2 credits each"
- "Deep-research fields per company" (default 0) — helper: "Store count, MAU and similar: 3 credits each"
- "Work emails" (default 600) — helper: "3 credits each, only when found"
- "Phone numbers" (default 60) — helper: "20 credits each, only when found"
- "Accounts to monitor for signals" (default 0) — helper: "5 credits per account per month"
Result line: "About {total} credits a month. Recommended plan: {plan}." Button: Start with {plan} → /signup?plan={plan}
Logic: recommend the smallest plan whose monthly credits ≥ total; above 50,000 recommend Enterprise ("Talk to sales").

### Top-up packs [id: top-ups]
H2: Need more credits this month?
Add a credit pack any time: 2,500 credits for $59. Packs last 12 months. If you top up often, upgrading your plan costs less per credit. `[PENDING APPROVAL; NEEDS INPUT: other pack sizes]`

### Rules [id: rules]
H2: How credits work
- Contacts are charged only when found.
- Monthly plan credits roll over for one month, then expire.
- Annual plans receive all credits up front.
- Pack credits expire 12 months after purchase.
- Credits are shared by everyone on the account.
- You can change or cancel your plan at any time; changes apply from the next billing date. `[NEEDS INPUT: confirm cancellation and proration terms; link Refund Policy]`

### Plan feature table [id: feature-table]
| Feature | Free | Starter | Growth | Agency | Enterprise |
| --- | --- | --- | --- | --- | --- |
| Company Profile | 1 | 1 | 3 | Unlimited | Custom |
| Discovery previews | Yes | Yes | Yes | Yes | Yes |
| Research and Company Fit | Preview only | Yes | Yes | Yes | Yes |
| Research fields | – | Yes | Yes | Yes | Yes |
| Enrich Column | – | – | Yes | Yes | Yes |
| People Search (multi-source waterfall) | Yes | Yes | Yes | Yes | Yes |
| Email and phone waterfall | 10 free reveals | Yes | Yes | Yes | Yes |
| Name and title normalization | Yes | Yes | Yes | Yes | Yes |
| Data Enrichment (upload lists) | – | Yes | Yes | Yes | Yes |
| Signals | – | – | Yes | Yes | Yes |
| CSV export | – | Yes | Yes | Yes | Yes |
| CRM and sequencer sync | – | – | Yes | Yes | Yes |
| Client workspaces | – | – | – | Yes | Yes |
| SSO | – | – | – | – | Yes |
| Guided onboarding | – | – | – | – | Yes |
`[PENDING APPROVAL: every cell]`

### FAQ [id: faq]
**How much does Harvin cost?**
Harvin starts free with 250 credits. Paid plans are Starter at $99 a month for 5,000 credits, Growth at $349 for 20,000, Agency at $799 for 50,000, and Enterprise from $12,000 a year. Annual billing saves about 20%. Credits pay for research, fields, contacts and signal monitoring.

**What is a credit?**
A credit is the unit Harvin uses to charge for work. Researching and scoring a company costs 2 credits, a deep-research field 3, a work email 3 and a phone number 20 when found. Discovery previews and matching up to three decision-makers per company are free.

**Do I pay if Harvin doesn't find a contact?**
No. Emails and phone numbers are charged only when a source in the waterfall returns a qualifying result. If nothing qualifying is found, no credits are used for that lookup.

**Do unused credits roll over?**
Monthly plan credits roll over for one month, then expire. Annual plans receive all credits at the start of the year. Credit packs last 12 months from purchase.

**Is there a free trial?**
Yes. The Free plan gives you 250 credits once, discovery previews of 25 companies per search with fit reasons, and 10 free contact reveals. No card is needed.

**Which plan should I choose?**
Starter suits one SDR or founder. Growth suits a small team that wants shared lists, CRM sync and signals. Agency suits agencies running separate profiles for each client. Enterprise suits larger teams buying credits annually. The credit calculator recommends a plan from your expected monthly work.

**Why does Harvin charge for research and not only contacts?**
Because research is where Harvin does the work other tools don't: finding companies outside your filters, checking the details that decide fit and explaining every score. Charging for it keeps contact prices in line with the market and lets you score companies before paying to reach them.

**Can I cancel any time?**
`[NEEDS INPUT: cancellation terms]` Monthly plans can be cancelled before the next billing date. See the Refund Policy for details.

### Enterprise CTA [id: enterprise-cta]
H2: Buying for a larger team?
Enterprise gives you annual credits, SSO, guided onboarding and your first list built with our team. Bring one market and we'll show you what Harvin finds.
Talk to sales → /book-demo

### Internal links
/signup · /book-demo · /data-building · /people-search · /research-fields · /faq

### JSON-LD (publish only after approval)
```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Harvin.AI",
  "brand": {"@id": "https://harvin.ai/#organization"},
  "description": "Harvin.AI is a B2B company discovery and research platform that finds the companies and buyers your database misses, shows why each one fits your business, and finds their work emails and phone numbers.",
  "offers": [
    {"@type": "Offer", "name": "Free", "price": "0", "priceCurrency": "USD"},
    {"@type": "Offer", "name": "Starter", "price": "99", "priceCurrency": "USD", "priceSpecification": {"@type": "UnitPriceSpecification", "price": "99", "priceCurrency": "USD", "unitText": "MONTH"}},
    {"@type": "Offer", "name": "Growth", "price": "349", "priceCurrency": "USD", "priceSpecification": {"@type": "UnitPriceSpecification", "price": "349", "priceCurrency": "USD", "unitText": "MONTH"}},
    {"@type": "Offer", "name": "Agency", "price": "799", "priceCurrency": "USD", "priceSpecification": {"@type": "UnitPriceSpecification", "price": "799", "priceCurrency": "USD", "unitText": "MONTH"}}
  ]
}
```
Plus BreadcrumbList (Home → Pricing) and FAQPage.

### Flags
`[PENDING APPROVAL]` all prices, credits, annual rates, free reveals, refunds, pack price, feature table · `[NEEDS INPUT]` integrations in Growth, SSO, outcome sync, cancellation terms, other packs

Self-critique: Specificity 9 · Wedge 8 · Mechanism 9 · PLG 10 · Objections 9 · AEO 9 · Claims 8 (all pending) · Voice 9

---

## 4.9 Use cases hub

| Field | Value |
| --- | --- |
| Route | /use-cases |
| Status | Launch |
| SEO title (54) | Use Cases: Teams Whose Customers Defy Filters | Harvin |
| Meta description (141) | See how fintech, SaaS, multi-location vendors, expansion teams and outbound agencies use Harvin to find customers that database filters miss. |
| OG title / description | Built for teams whose customers are hard to find / Pick your market and see how Harvin finds it. |
| Primary keyword | B2B prospecting use cases |
| llms.txt line | Harvin use cases: fintech and payments, B2B SaaS, multi-location and consumer businesses, new markets, and outbound agencies. |
| Schema | BreadcrumbList, CollectionPage |

### Hero [id: hero]
- H1: Built for teams whose customers are hard to find with filters
- Subhead: If your best customers share a need rather than an industry code, Harvin was built for you. Pick the market closest to yours.
- Start free → /signup

### Entity [id: entity]
(entity sentence)

### Cards [id: use-case-cards]
- **Fintech & payments** — "Your customers share a payment problem, not an industry." → /use-cases/fintech-payments
- **B2B SaaS & enterprise tech** — "Your customers share a workflow, not an industry code." → /use-cases/b2b-saas
- **Multi-location & consumer businesses** — "Find chains, brands and apps by store count, locations and users." → /use-cases/multi-location-consumer
- **Entering new markets** — "Start a new country with what worked in the last one." → /use-cases/new-markets
- **Outbound & GTM agencies** — "A different ideal customer for every client. One process for all of them." → /use-cases/outbound-agencies

### Regions [id: regions]
H2: Where global databases are thin
India → /regions/india · Southeast Asia → /regions/southeast-asia · UAE & Middle East → /regions/uae

### Final CTA [id: final-cta]
Use block **cta-one-market**.

---

## 4.10 Fintech & payments

| Field | Value |
| --- | --- |
| Route | /use-cases/fintech-payments |
| Status | Launch |
| Primary reader | Head of Sales at a payments, FX, payroll or treasury company |
| Page job | Show that Harvin finds customers by payment behaviour, in any industry |
| Primary / secondary keywords | find fintech customers / cross-border payments leads, payments prospects, find companies that pay internationally |
| SEO title (59) | Find Payments Customers by Behaviour, Not Industry | Harvin |
| Meta description (155) | Find companies that collect, pay and move money across borders, whatever industry they're listed under. Harvin researches each and finds the finance buyer. |
| OG title / description | Your customers share a payment problem, not an industry / Find them by how they collect, pay and move money. |
| llms.txt line | Harvin for fintech and payments sellers: find companies by payment behaviour (overseas billing, international collections, multi-country payouts) and reach CFOs and Heads of Payments. |
| Schema | BreadcrumbList, WebPage, FAQPage |

### Hero [id: hero]
- Eyebrow: FINTECH & PAYMENTS
- H1: Your customers share a payment problem, not an industry
- Subhead: Harvin finds companies by how they collect, pay and move money: software companies billing overseas, travel businesses collecting from abroad, marketplaces paying sellers in many countries. Then it finds the finance and payments leaders who decide.
- Start free → /signup · Book a demo → /book-demo
- [VISUAL: three company cards from different industries (Software, Travel, Marketplace) connected to one label "Collects and pays across borders".]
- Alt text: "Companies from three industries share one cross-border payments need."

### Entity [id: entity]
(entity sentence)

### Why hard to find [id: why-hard]
H2: Why are payments customers hard to find in a B2B database?
A payments company's ideal customer is defined by behaviour: where its customers are, which currencies it collects, how it pays suppliers or sellers. Databases store industry, size, revenue and location instead. A "Financial Services" filter misses most companies that actually need cross-border payments, because they're filed as software, travel, education or e-commerce.

### Search themes [id: search-themes]
H2: Search themes Harvin uses for payments sellers
| Theme type | Examples |
| --- | --- |
| Use case | Global payouts · International collections · Multi-currency billing |
| Business model | Marketplace payments · Overseas subscriptions · Cross-border e-commerce |
| Customer type | Cross-border sellers · Global employers · Companies with overseas suppliers |
| Product language | FX workflows · Global payroll · Pay in local currency |

### Example [id: example]
H2: Example: a software company that turned out to be a payments prospect (fictional)
Northstar Software looks generic in a database: Software, 350 employees, India, revenue unknown. Harvin's research finds a subscription business with customers in 18 countries, recurring foreign-currency payments, and Stripe and AWS in its stack. Company Fit: 91, strong fit, because it matches the pattern of companies that converted.

### Target Profile [id: target-profile]
H2: Who to reach at a payments prospect
Roles in priority order: CFO → VP Finance → Head of Payments → Treasury Director · Functions: Finance, Treasury, Payments · Seniority: Head and above · Exclude: Finance Manager, Accounts Payable Executive.

### Fields and signals [id: fields-signals]
H2: Research fields and signals that matter for payments
- Fields: countries served · business model · payment providers in the tech stack · funding stage
- Signals: expansion into a new country · new finance leader · funding round

### FAQ [id: faq]
**How do I find leads for a cross-border payments product?**
Look for payment behaviour instead of industry. Companies that need cross-border payments include software businesses with overseas subscribers, travel companies collecting from abroad and marketplaces paying sellers in many countries. Harvin turns that behaviour into search themes, finds matching companies in any industry and researches each one to confirm the need.

**Who is the buyer for a payments product?**
Usually the CFO, VP Finance or Head of Payments, sometimes a Treasury Director at larger companies. Harvin searches for these roles in the priority order you set, across several people sources, and reads titles by meaning, so a "Treasury & FX Lead" is found and a junior Finance Manager is not.

**Can Harvin tell which payment providers a company uses?**
Harvin researches tech stack where it can be found publicly, which often shows payment providers such as Stripe. Field availability varies by company, and Harvin marks a field as not found rather than guessing.

**Does Harvin cover India, Southeast Asia and the UAE?**
Yes. These are regions where global databases are thin and where many cross-border payment flows start. Harvin searches and researches companies there and runs its email and phone waterfall for the buyers it finds. Coverage varies by country. `[NEEDS INPUT: confirm regional coverage]`

**What signals matter for payments sellers?**
Expansion into a new country, a new finance leader and a funding round are the most useful, because each often brings a new payment flow or a review of existing providers.

### Final CTA [id: final-cta]
H2: Show us who bought. We'll show you who else needs it.
Start free → /signup · Book a demo → /book-demo

### Internal links
/company-discovery · /people-search · /regions/india · /regions/southeast-asia · /signals

### JSON-LD
WebPage + BreadcrumbList (Home → Use cases → Fintech & payments) + FAQPage.

### Flags
`[NEEDS INPUT]` regional coverage

Self-critique: Specificity 10 · Wedge 10 · Mechanism 8 · PLG 8 · Objections 8 · AEO 9 · Claims 9 · Voice 9

---

## 4.11 B2B SaaS & enterprise tech

| Field | Value |
| --- | --- |
| Route | /use-cases/b2b-saas |
| Status | Launch |
| Primary reader | Head of Sales at a SaaS company with a problem-defined ICP |
| Page job | Show search by shared workflow and stack, not industry code |
| Primary / secondary keywords | SaaS lead generation / find SaaS customers, find companies using a technology, B2B SaaS target list |
| SEO title (56) | Find B2B SaaS Customers Beyond Industry Filters | Harvin |
| Meta description (149) | Find companies that share the problem your software solves, by workflow, stack and growth stage. Harvin researches each one and explains Company Fit. |
| OG title / description | Your customers share a workflow, not an industry code / Find them by the problem your product fixes. |
| llms.txt line | Harvin for B2B SaaS sellers: find companies by shared workflow, tech stack and stage, with Company Fit reasons and the right technical or business buyer. |
| Schema | BreadcrumbList, WebPage, FAQPage |

### Hero [id: hero]
- Eyebrow: B2B SAAS & ENTERPRISE TECH
- H1: Your customers share a workflow, not an industry code
- Subhead: Software is bought to fix a problem, and that problem rarely maps to one industry. Harvin searches for the problem, researches stack and stage, and finds the buyer who owns it.
- Start free → /signup · Book a demo → /book-demo
- [VISUAL: one problem card ("Enterprise customers asking for security reviews") linked to companies listed as Software, Healthcare IT and Insurance.]
- Alt text: "One shared problem across companies in three industry categories."

### Entity [id: entity]
(entity sentence)

### Why hard to find [id: why-hard]
H2: Why don't SaaS buyers line up with database filters?
A security compliance product sells to any software company with enterprise customers in regulated markets. Those companies are filed as "Software", "Healthcare IT" or "Insurance". A technology filter returns every company using a tool, whether or not it has your problem. Harvin uses technology as one signal among several and searches for the problem itself.

### Search themes [id: search-themes]
| Theme type | Examples for a security compliance product |
| --- | --- |
| Use case | Vendor security reviews · SOC 2 readiness · Customer security questionnaires |
| Business model | Selling to enterprise · Selling into healthcare or finance |
| Customer type | Software companies with enterprise plans |
| Product language | SSO · Audit logs · Trust centre |

### Example [id: example]
H2: Example (fictional): Ledgerly Analytics
Database view: Software, 120 employees, revenue unknown. Harvin's research: an enterprise plan with SSO and audit logs, customers in healthcare and insurance, a public security page. Company Fit: strong fit, like two of your three best customers.

### Target Profile [id: target-profile]
CTO → VP Engineering → Head of Security → Head of Compliance · Functions: Engineering, Security, Compliance · Seniority: Head and above.

### Fields and signals [id: fields-signals]
- Fields: tech stack · business model · funding stage · customer industries
- Signals: hiring for security or compliance roles · funding round · new technology adopted

### FAQ [id: faq]
**How is Harvin different from filtering by technology?**
A technology filter returns every company using a tool, whether or not it has your problem. Harvin uses technologies as one factor alongside business model, customers and similarity to companies that converted, and Company Fit shows all the factors, so you can see why a company is on the list.

**How do I find SaaS companies with a specific problem?**
Describe the problem and the companies that already bought from you. Harvin turns that into search themes such as "vendor security reviews" or "enterprise customers in healthcare", finds companies whose own words match, and researches stack and stage to confirm the fit.

**Who should I contact at a SaaS company?**
It depends on who owns the problem. Harvin searches your Target Profile roles in priority order, such as CTO, then VP Engineering, then Head of Security, across several people sources, and returns the highest-priority match with work email and phone.

**Can Harvin find companies by funding stage?**
Yes. Funding stage is a standard research field. Combine it with business need so you don't only see well-funded companies that don't have your problem.

**What signals help SaaS sellers?**
Hiring for the roles that feel your problem, a new funding round, and a change in technology are the most useful timing signals for software sellers.

### Final CTA [id: final-cta]
Use block **cta-start-free**.

### Internal links
/company-discovery · /research-fields · /people-search · /signals · /pricing

### JSON-LD
WebPage + BreadcrumbList (Home → Use cases → B2B SaaS) + FAQPage.

Self-critique: Specificity 9 · Wedge 9 · Mechanism 8 · PLG 8 · Objections 8 · AEO 9 · Claims 10 · Voice 9

---

## 4.12 Multi-location & consumer businesses

| Field | Value |
| --- | --- |
| Route | /use-cases/multi-location-consumer |
| Status | Launch |
| Primary reader | Vendor selling to retail chains, QSR, clinics, D2C brands or consumer apps |
| Page job | Show research fields databases don't hold: store count, locations, MAU |
| Primary / secondary keywords | find retail chains by store count / find restaurant chains, find D2C brands, find apps by monthly active users |
| SEO title (56) | Find Retail Chains, D2C Brands and Apps by Size | Harvin |
| Meta description (150) | Find multi-location businesses and consumer apps by store count, locations and monthly active users, fields most B2B databases don't hold. Start free. |
| OG title / description | Store count, locations and users: the size that matters to you / Find chains, brands and apps by the numbers your offer depends on. |
| llms.txt line | Harvin for vendors to multi-location and consumer businesses: find retail chains, QSR, clinics, D2C brands and apps by store count, location count and monthly active users. |
| Schema | BreadcrumbList, WebPage, FAQPage |

### Hero [id: hero]
- Eyebrow: MULTI-LOCATION & CONSUMER BUSINESSES
- H1: The size that matters to you isn't employee count
- Subhead: If you sell to retail chains, restaurant groups, clinics, D2C brands or apps, you size accounts by stores, locations or users. Harvin researches those numbers company by company and finds the person who buys.
- Start free → /signup · Book a demo → /book-demo
- [VISUAL: company cards showing "Employees: 120" crossed through and "Stores: 46" highlighted; an app card with "MAU: 1.2M".]
- Alt text: "Harvin shows store count and monthly active users instead of employee count."

### Entity [id: entity]
(entity sentence)

### Why hard to find [id: why-hard]
H2: Why are multi-location businesses hard to size in a database?
A retail chain with 46 stores can have 120 head-office employees and look small in a database. A consumer app with a million users may have 40 staff. Employee count and revenue estimates hide the number your offer depends on, and store counts and user numbers change too often for databases to keep current.

### Search themes [id: search-themes]
| Theme type | Examples for a POS or store-operations vendor |
| --- | --- |
| Use case | Multi-store operations · Inventory across locations · Franchise management |
| Business model | Retail chain · Quick-service restaurant group · Clinic network · D2C with offline stores |
| Customer type | Franchise operators · Regional chains |
| Product language | Store locator · "Visit our outlets" · Franchise enquiries |

### Example [id: example]
H2: Example (fictional): Kitecart
Database view: E-commerce, 85 employees. Harvin's research: D2C brand with 23 retail outlets across three cities, a store locator page and an app with about 310,000 monthly users. Company Fit: strong fit for a store-operations vendor.

### Target Profile [id: target-profile]
COO → Head of Retail Operations → Head of Expansion → CTO · Seniority: Head and above.

### Fields and signals [id: fields-signals]
- Fields: store or location count · monthly active users · cities or countries · tech stack
- Signals: new store or city openings · expansion into a new country · new operations leader

### FAQ [id: faq]
**How do I find retail chains by number of stores?**
Use a tool that researches store count rather than estimating size from headcount. Harvin checks each company's store locators, websites and announcements for store or location count, marks the value as not found when it can't be confirmed, and lets you filter and score by it.

**Can Harvin find apps by monthly active users?**
Harvin researches monthly active users where public sources show them, such as app listings and company announcements. Field availability varies by company, and deep-research fields like this cost 3 credits per company. `[PENDING APPROVAL: credit value]`

**What does a store-count lookup cost?**
Store count is a deep-research field at 3 credits per company, because it needs research on each company. Use Company Fit first to decide which companies are worth the lookup. `[PENDING APPROVAL]`

**Who buys at a multi-location business?**
Usually operations leaders, such as a COO or Head of Retail Operations, or a Head of Expansion for growth-related offers. Harvin searches your roles in priority order across several people sources.

**Does this work for franchises?**
Yes. Franchise language, such as franchise enquiry pages and outlet lists, is one of the search themes Harvin uses to find multi-location businesses.

### Final CTA [id: final-cta]
H2: Tell Harvin how you size an account. See who fits.
Start free → /signup · Book a demo → /book-demo

### Internal links
/research-fields · /company-discovery · /people-search · /regions/india · /pricing

### JSON-LD
WebPage + BreadcrumbList (Home → Use cases → Multi-location & consumer) + FAQPage.

### Flags
`[PENDING APPROVAL]` credit values · `[NEEDS INPUT]` confirm store-count and MAU source types

Self-critique: Specificity 10 · Wedge 9 · Mechanism 8 · PLG 8 · Objections 8 · AEO 9 · Claims 9 · Voice 9

---

## 4.13 Entering new markets

| Field | Value |
| --- | --- |
| Route | /use-cases/new-markets |
| Status | Launch |
| Primary reader | Founder or Head of Sales opening a new country |
| Page job | Show how home-market learning finds first accounts abroad |
| Primary / secondary keywords | market entry lead list / find customers in a new country, international expansion prospects |
| SEO title (56) | Entering a New Market? Find Your First Accounts | Harvin |
| Meta description (151) | Map a new country before your team knows its companies. Harvin uses what worked at home to find, research and score good-fit companies in a new market. |
| OG title / description | Start a new market with what you learned in the last one / Find your first good-fit accounts abroad. |
| llms.txt line | Harvin for market entry: reuse a home-market Company Profile to find, research and score good-fit companies in a new country. |
| Schema | BreadcrumbList, WebPage, HowTo, FAQPage |

### Hero [id: hero]
- Eyebrow: ENTERING NEW MARKETS
- H1: Start a new market with what you learned in the last one
- Subhead: Your team doesn't know the companies in a new country yet. Harvin does the research, using the customers and lost deals from your home market to find and score accounts there.
- Start free → /signup · Book a demo → /book-demo

### Entity [id: entity]
(entity sentence)

### Why hard to find [id: why-hard]
H2: Why is a new market hard to prospect?
Records are thinner, company names are unfamiliar, and the categories local companies use don't match your home market's. Databases built mainly around one region often have little on mid-size private companies elsewhere. Your team ends up guessing which accounts matter.

### How it works [id: steps]
H2: How Harvin builds a list in a new country
1. **Reuse your Company Profile.** Customers and lost deals from home already show what a buyer looks like.
2. **Add the new market.** Choose the country or region and add local competitors and partners to exclude.
3. **Harvin searches by business need.** Search themes find companies by what they do, so unfamiliar names don't matter.
4. **Research fills thin records.** Fields missing from local data are researched company by company.
5. **Fit and buyers.** Company Fit compares each company with what worked at home; Harvin finds the buyers with email and phone.
6. **Watch for expansion.** Signals flag good-fit companies moving into the same market.

### Example [id: example]
H2: Example (fictional)
A payroll provider with customers in India opens in the UAE. Harvin reuses its Company Profile, searches UAE companies for "employees in several countries" and "global payroll", and finds Atlas Digital, an IT services firm with staff in four countries, listed in databases as "IT services". Company Fit: strong fit, like two Indian customers.

### Target Profile [id: target-profile]
Keep your home-market roles; adjust titles to local usage (for example "Finance Director" may outrank "VP Finance").

### Fields and signals [id: fields-signals]
- Fields: countries served · location count · business model
- Signals: expansion into your target country · new regional leader

### FAQ [id: faq]
**How do I build a lead list for a new country?**
Start from what worked in your home market. Harvin uses your Company Profile, including customers and lost deals, to build search themes, finds companies in the new country that share the same need, researches each one and shows Company Fit with reasons, so your team can trust a list in a market it doesn't know yet.

**What if my target country has poor database coverage?**
That's where research matters most. Harvin researches each company from public sources instead of relying on a database record, and marks fields as not found rather than guessing. Coverage still varies by country. `[NEEDS INPUT: regions with weak coverage]`

**Do job titles differ by country?**
Often. A "Finance Director" can be the top finance role in one market and mid-level in another. Harvin normalises titles by meaning and seniority, and you can reorder your target roles for each market.

**Can I keep separate profiles for each market?**
Yes, on plans with more than one Company Profile. Growth includes three and Agency is unlimited. `[PENDING APPROVAL]`

**Which signals matter when entering a market?**
Expansion signals: good-fit companies opening in your target country or hiring a regional leader there are often looking for local partners and providers.

### Final CTA [id: final-cta]
Use block **cta-one-market**.

### Internal links
/regions/uae · /regions/southeast-asia · /regions/india · /company-discovery · /signals

### JSON-LD
WebPage + BreadcrumbList (Home → Use cases → Entering new markets) + HowTo from [id: steps] + FAQPage.

Self-critique: Specificity 8 · Wedge 9 · Mechanism 9 · PLG 8 · Objections 8 · AEO 9 · Claims 9 · Voice 9

---

## 4.14 Outbound & GTM agencies

| Field | Value |
| --- | --- |
| Route | /use-cases/outbound-agencies |
| Status | Launch |
| Primary reader | Agency founder or delivery lead running outbound for several clients |
| Page job | One research process for every client; partner program |
| Primary / secondary keywords | lead generation for agencies / outbound agency tools, client lead lists, agency partner program |
| SEO title (55) | Lead Generation for Outbound & GTM Agencies | Harvin.AI |
| Meta description (152) | Every client has a different ideal customer. Harvin keeps a Company Profile per client and turns each into researched companies, fit reasons and buyers. |
| OG title / description | A different ideal customer for every client. One process for all of them. / Built by an agency, for agencies. |
| llms.txt line | Harvin for outbound and GTM agencies: one Company Profile per client, client workspaces, fit reasons to show clients, and a partner program. |
| Schema | BreadcrumbList, WebPage, FAQPage |

### Hero [id: hero]
- Eyebrow: OUTBOUND & GTM AGENCIES
- H1: A different ideal customer for every client. One process for all of them.
- Subhead: Harvin keeps a Company Profile for each client and turns it into researched companies, Company Fit with reasons and the right buyers. Built by an agency, after nearly 80 client engagements.
- Start free → /signup · Talk to us → /book-demo

### Entity [id: entity]
(entity sentence)

### Why hard [id: why-hard]
H2: Why do agencies outgrow a stack of separate tools?
Every new client brings a new product, buyer and definition of a good account. Agencies rebuild filters, tables and enrichment steps for each one, across a database, a research tool and a contact tool. When a client asks "why is this company on the list?", the answer is usually buried in a spreadsheet.

### How it works [id: steps]
H2: How agencies run Harvin
1. **One Company Profile per client.** What the client sells, who bought, who didn't, target roles and exclusions.
2. **A workspace per client.** Lists, credits and exports stay separate. `[NEEDS INPUT: confirm client workspaces]`
3. **The same research process for every brief.** Discovery, research, Company Fit, people search and contacts.
4. **Reasons to show the client.** Company Fit explains every account.
5. **Clean lists, ready to send.** Names and titles normalised before they reach your sequencer.

### Example [id: example]
H2: Example (fictional)
An agency onboards two clients in one week: a payroll provider selling into the UAE and a POS vendor selling to Indian retail chains. Each gets its own Company Profile. The payroll list is built on "employees in several countries"; the POS list on store count. Same process, two very different lists, both with reasons.

### Partner program [id: partner-program]
H2: The Harvin agency partner program
Refer clients to Harvin and earn 20% of their subscription for as long as they stay. Partners get the Agency plan, a partner badge and early access to new features. `[PENDING APPROVAL: rev share %, duration, benefits]`
Apply → /book-demo?type=partner

### Target Profile [id: target-profile]
Set per client. Common starting points: Head of Sales, VP Marketing, CFO, COO, depending on the client's offer.

### FAQ [id: faq]
**How can an outbound agency build lead lists for many clients?**
Capture each client's business context once: what they sell, who buys, which companies converted and which didn't. Harvin uses that Company Profile to discover companies, research them, score Company Fit with reasons and find decision-makers with email and phone. The process stays the same for every client; only the profile changes.

**How do I show a client why an account is on the list?**
Share the Company Fit reasons. Each score lists the researched facts and the client's customers or lost deals the company resembles, so you can answer "why this account?" with evidence instead of judgement.

**Can I keep client data separate?**
Yes. The Agency plan includes unlimited Company Profiles and client workspaces, so lists, exports and credits stay separate for each client. `[PENDING APPROVAL; NEEDS INPUT: confirm credit separation]`

**Who built Harvin?**
The team behind Thyleads, an outbound agency, after nearly 80 client engagements building prospect lists by hand. Harvin is built around the problems agencies hit every week.

**Is there a partner program?**
Yes. Agencies that refer clients earn a recurring share of those clients' subscriptions and get partner benefits. `[PENDING APPROVAL: terms]`

### Final CTA [id: final-cta]
Use block **cta-agency**.

### Internal links
/pricing · /company-discovery · /people-search · /about · /book-demo

### JSON-LD
WebPage + BreadcrumbList (Home → Use cases → Outbound & GTM agencies) + FAQPage.

### Flags
`[PENDING APPROVAL]` partner terms, plan inclusions · `[NEEDS INPUT]` client workspaces, credit separation

Self-critique: Specificity 9 · Wedge 8 · Mechanism 9 · PLG 8 · Objections 9 · AEO 9 · Claims 9 · Voice 9

---

## 4.15 India

| Field | Value |
| --- | --- |
| Route | /regions/india |
| Status | Launch |
| Primary reader | Sellers targeting Indian companies, from India or abroad |
| Page job | Show Harvin finds Indian companies and buyers that global databases miss |
| Primary / secondary keywords | B2B data India / find Indian companies, Indian decision-makers contact, B2B leads India |
| SEO title (58) | Find B2B Customers in India Global Databases Miss | Harvin |
| Meta description (152) | Harvin finds Indian companies by what they do, researches the details records lack, scores fit and finds the right buyer's work email and mobile number. |
| OG title / description | Indian B2B customers that global databases miss / Find, research and reach them in one workflow. |
| llms.txt line | Harvin for India: discovery and research of Indian companies by business need, with buyers matched across sources and email and phone found. |
| Schema | BreadcrumbList, WebPage, FAQPage |

### Hero [id: hero]
- Eyebrow: INDIA
- H1: Find the Indian companies your global database doesn't know
- Subhead: Mid-size and private Indian companies are thinly covered in most global databases, and many are filed under the wrong category. Harvin researches them company by company, scores fit and finds the buyer's work email and mobile number.
- Start free → /signup · Book a demo → /book-demo

### Entity [id: entity]
(entity sentence)

### Why hard [id: why-hard]
H2: Why are Indian B2B customers hard to find in global databases?
Global databases are strongest on large and listed companies. Many fast-growing Indian companies are private, describe themselves differently from global category lists, and have little revenue or funding data on record. Titles vary too: "AVP", "GM" and "Head" can mean very different seniority from one company to the next.

### Search themes [id: search-themes]
Examples: "pan-India distribution" · "D2C with offline stores" · "exports to the US and EU" · "multi-city operations" · "GST-compliant invoicing at scale"

### Example [id: example]
H2: Example (fictional)
A logistics software seller searches for "pan-India distribution" and "multi-city warehouses". Harvin finds a consumer brand listed as "Food & Beverages" running 12 warehouses across 9 cities. Company Fit: strong fit. Harvin matches its Head of Supply Chain and finds a work email and +91 mobile.

### Target Profile [id: target-profile]
Note for Indian companies: include local seniority titles such as "AVP", "GM" and "Head" in your roles; Harvin normalises them by meaning.

### Fields and signals [id: fields-signals]
- Fields: location count · cities served · funding stage · tech stack
- Signals: funding round · new city or state expansion · new leadership hire

### FAQ [id: faq]
**How do I find B2B customers in India?**
Search for the business need your customers share, not the category they're filed under. Harvin turns your Company Profile into search themes, finds Indian companies that match in any industry, researches the details records lack, and scores Company Fit with reasons before finding the buyer.

**Does Harvin find Indian mobile numbers?**
Harvin's phone waterfall checks contact-data sources one after another for each matched buyer and returns a direct or mobile number when a source gives a qualifying result. Coverage varies by person and company. `[NEEDS INPUT: confirm Indian mobile coverage and sources]`

**How does Harvin handle Indian job titles?**
Harvin normalises titles by meaning and seniority, so "AVP Finance", "GM Finance" and "Head of Finance" are each mapped to a seniority level and compared with your Target Profile, rather than matched on keywords.

**Is Harvin's data handling compliant with India's DPDP Act?**
See Data sources & compliance for how Harvin collects business contact data and handles removal requests. `[PENDING APPROVAL: legal review before making any compliance statement]`

**Is Harvin built in India?**
Harvin has an office in Bengaluru and was built by the team behind Thyleads, which ran outbound programs for nearly 80 clients.

### Final CTA [id: final-cta]
Use block **cta-start-free**.

### Internal links
/people-search · /use-cases/multi-location-consumer · /data-sources-and-compliance · /regions/southeast-asia · /pricing

### JSON-LD
WebPage + BreadcrumbList (Home → Regions → India) + FAQPage.

Self-critique: Specificity 9 · Wedge 9 · Mechanism 8 · PLG 8 · Objections 8 · AEO 9 · Claims 9 · Voice 9

---

## 4.16 Southeast Asia

| Field | Value |
| --- | --- |
| Route | /regions/southeast-asia |
| Status | Launch |
| Primary reader | Sellers targeting Singapore, Indonesia, Malaysia, Vietnam, Thailand, Philippines |
| Page job | Same wedge for SEA |
| Primary / secondary keywords | B2B data Southeast Asia / find companies in Singapore, Indonesia B2B leads |
| SEO title (48) | Find B2B Customers in Southeast Asia | Harvin.AI |
| Meta description (150) | Harvin finds Southeast Asian companies by what they do across Singapore, Indonesia, Malaysia and more, researches each and finds the buyer's contacts. |
| OG title / description | Southeast Asian customers your database files elsewhere / Find, research and reach them across the region. |
| llms.txt line | Harvin for Southeast Asia: company discovery and research across SEA markets, with multi-source people search and contact waterfalls. |
| Schema | BreadcrumbList, WebPage, FAQPage |

### Hero [id: hero]
- Eyebrow: SOUTHEAST ASIA
- H1: One region, many markets, and most of them thinly covered
- Subhead: Southeast Asia's fastest-growing companies often operate across several countries from one hub, under categories that don't match global lists. Harvin finds them by what they do and finds the buyer in the right country.
- Start free → /signup · Book a demo → /book-demo

### Entity [id: entity]
(entity sentence)

### Why hard [id: why-hard]
H2: Why are Southeast Asian companies hard to find?
Many SEA companies are headquartered in Singapore but operate in Indonesia, Vietnam or the Philippines, so headquarters filters miss where they actually sell. Records for private companies are thin, and local-language websites describe the business in words a global category list doesn't use.

### Search themes [id: search-themes]
Examples: "operations in Indonesia and Vietnam" · "regional marketplace" · "super app" · "cross-border e-commerce" · "multi-currency payouts"

### Example [id: example]
H2: Example (fictional)
Vela Commerce: listed as "Internet", headquartered in Singapore, 600 employees. Harvin's research: online marketplace, Series C, 17 locations, Stripe, Shopify and AWS. Company Fit 88 for a payments seller. Head of Payments matched, work email and +65 mobile found.

### Target Profile [id: target-profile]
Set roles by country if needed; regional titles ("Regional Head, SEA") are normalised by meaning.

### Fields and signals [id: fields-signals]
- Fields: countries of operation · location count · funding stage · tech stack
- Signals: expansion into a new SEA country · funding round · new regional leader

### FAQ [id: faq]
**How do I find B2B customers in Southeast Asia?**
Search for the need your customers share and the countries they operate in, not only where they're headquartered. Harvin builds search themes from your Company Profile, finds SEA companies that match in any category, researches countries of operation and scores Company Fit with reasons.

**Can Harvin tell where a company operates, not just its headquarters?**
Harvin researches countries of operation as a deep-research field where public sources show it, such as the company's website and announcements. Field availability varies by company. `[PENDING APPROVAL: 3 credits]`

**Which SEA countries does Harvin cover?**
Harvin searches across Southeast Asia, including Singapore, Indonesia, Malaysia, Vietnam, Thailand and the Philippines. Coverage varies by country. `[NEEDS INPUT: confirm country coverage]`

**Does Harvin find contacts in Southeast Asia?**
Yes, through the email and phone waterfall for each matched buyer, charged only when a qualifying contact is found. Coverage varies by person and country.

**What signals matter in Southeast Asia?**
Expansion into a new country and funding rounds are the strongest, because regional companies often add providers when they enter a new market.

### Final CTA [id: final-cta]
Use block **cta-start-free**.

### Internal links
/regions/india · /regions/uae · /use-cases/fintech-payments · /use-cases/new-markets · /people-search

### JSON-LD
WebPage + BreadcrumbList (Home → Regions → Southeast Asia) + FAQPage.

Self-critique: Specificity 9 · Wedge 9 · Mechanism 8 · PLG 8 · Objections 8 · AEO 9 · Claims 9 · Voice 9

---

## 4.17 UAE & Middle East

| Field | Value |
| --- | --- |
| Route | /regions/uae |
| Status | Launch |
| Primary reader | Sellers targeting the UAE and wider Gulf |
| Page job | Same wedge for the UAE |
| Primary / secondary keywords | B2B data UAE / find companies in Dubai, UAE B2B leads, Middle East prospect list |
| SEO title (59) | Find B2B Customers in the UAE Your Database Misses | Harvin |
| Meta description (152) | Harvin finds UAE and Gulf companies by what they do, including free-zone and regional HQ firms, researches each one and finds the buyer's work contacts. |
| OG title / description | UAE customers that global databases file elsewhere / Find, research and reach them. |
| llms.txt line | Harvin for the UAE and Middle East: discovery and research of Gulf companies, including regional headquarters, with buyers and contacts. |
| Schema | BreadcrumbList, WebPage, FAQPage |

### Hero [id: hero]
- Eyebrow: UAE & MIDDLE EAST
- H1: Find the UAE companies your database files somewhere else
- Subhead: Regional headquarters, free-zone companies and fast-growing family businesses are easy to miss with global filters. Harvin finds them by what they do and finds the buyer to contact.
- Start free → /signup · Book a demo → /book-demo

### Entity [id: entity]
(entity sentence)

### Why hard [id: why-hard]
H2: Why are UAE companies hard to find in global databases?
Many companies run Middle East operations from a Dubai or Abu Dhabi regional headquarters, so their main record sits in another country. Free-zone entities and private groups often have little public financial data, and their category in a database rarely describes what the UAE entity actually does.

### Search themes [id: search-themes]
Examples: "regional headquarters in Dubai" · "GCC operations" · "free-zone company" · "serving Saudi Arabia and the UAE" · "expanding to the Middle East"

### Example [id: example]
H2: Example (fictional)
A payroll provider looks for "employees across GCC countries". Harvin finds Atlas Digital, filed as "IT services" with its main record in India, running a Dubai office with staff in three Gulf countries. Company Fit: strong fit. Finance Director matched with work email.

### Target Profile [id: target-profile]
"Finance Director" and "General Manager" often carry more seniority in Gulf companies; order roles accordingly.

### Fields and signals [id: fields-signals]
- Fields: countries of operation · location count · business model
- Signals: opened operations in the UAE · new regional leader · funding round

### FAQ [id: faq]
**How do I find B2B customers in the UAE?**
Search for the need your customers share and for UAE operations, not only UAE headquarters. Harvin builds search themes from your Company Profile, finds companies with UAE and GCC operations in any category, researches each one and scores Company Fit with reasons.

**Can Harvin find companies that recently opened in the UAE?**
Yes. Expansion into the UAE is a signal Harvin can watch for at the accounts you choose, and "expanding to the Middle East" can be used as a search theme in discovery.

**Does Harvin cover Saudi Arabia and other GCC countries?**
`[NEEDS INPUT: confirm GCC coverage]` Harvin searches the wider Gulf region; coverage varies by country.

**How does Harvin handle titles like "General Manager"?**
Harvin normalises titles by meaning and seniority, and you can put locally senior titles higher in your Target Profile so the most likely buyer is matched first.

**Does Harvin find UAE phone numbers?**
The phone waterfall searches for a direct or mobile number for each matched buyer and charges only when a qualifying result is found. Coverage varies by person.

### Final CTA [id: final-cta]
Use block **cta-start-free**.

### Internal links
/use-cases/new-markets · /regions/india · /regions/southeast-asia · /signals · /people-search

### JSON-LD
WebPage + BreadcrumbList (Home → Regions → UAE & Middle East) + FAQPage.

Self-critique: Specificity 9 · Wedge 9 · Mechanism 8 · PLG 8 · Objections 8 · AEO 9 · Claims 9 · Voice 9

---

## 4.18 Integrations

| Field | Value |
| --- | --- |
| Route | /integrations |
| Status | Launch; list only confirmed integrations |
| Primary reader | RevOps checking how lists get into the CRM and sequencer |
| Page job | Show what connects and how data moves |
| Primary / secondary keywords | Harvin integrations / Harvin HubSpot, Harvin Salesforce, export lead list to CRM |
| SEO title (46) | Integrations: Send Harvin Lists Where You Work |
| Meta description (138) | Send researched, scored lists with clean names and contacts from Harvin to your CRM and sequencer, or export them as CSV on any paid plan. |
| OG title / description | Send ready-to-use lists where your team works / CRM, sequencer and CSV. |
| llms.txt line | Harvin integrations: CRM and sequencer sync and CSV import/export. |
| Schema | BreadcrumbList, WebPage, FAQPage |

### Hero [id: hero]
- H1: Send ready-to-use lists where your team already works
- Subhead: Every Harvin list arrives with clean names, Company Fit, matched buyers and contacts. Sync it to your CRM or sequencer, or export it.
- Start free → /signup

### Entity [id: entity]
(entity sentence)

### Integration cards [id: integrations]
Card format: Name · What syncs · Direction · Plan
`[NEEDS INPUT: confirm each before showing the card]`
- HubSpot — Companies, contacts, Company Fit and reasons — Harvin → HubSpot — Growth and above
- Salesforce — Accounts, contacts, Company Fit and reasons — Harvin → Salesforce — Growth and above
- Smartlead — Contacts and personalisation fields — Harvin → Smartlead — Growth and above
- Instantly — Contacts and personalisation fields — Harvin → Instantly — Growth and above
- lemlist — Contacts and personalisation fields — Harvin → lemlist — Growth and above
- Outcome sync (Enterprise) — Meetings and deal outcomes back into Company Fit — CRM → Harvin `[NEEDS INPUT]`

### CSV [id: csv]
H2: Import and export by CSV
Upload companies or contacts as CSV or XLSX on any paid plan. Export any list to CSV with Company Fit, reasons, research fields and contacts in separate columns. `[NEEDS INPUT: export column list]`

### Request [id: request]
H2: Don't see your tool?
Tell us what you use and we'll let you know when it connects. → Request an integration (mailto:admin@harvin.ai?subject=Integration%20request)

### FAQ [id: faq]
**Can I send Harvin lists to my CRM?**
Yes, on Growth and higher plans, Harvin can sync companies, contacts, Company Fit and its reasons to your CRM. On any paid plan you can also export lists as CSV. `[PENDING APPROVAL; NEEDS INPUT: confirmed CRMs]`

**Can Harvin push contacts straight into a sequencer?**
Yes, for supported sequencers on Growth and higher plans, with clean first names and company names ready for personalisation. `[NEEDS INPUT: confirmed sequencers]`

**Does Harvin have an API?**
`[NEEDS INPUT: confirm API availability]`

### Final CTA [id: final-cta]
Use block **cta-start-free**.

### Internal links
/data-enrichment · /pricing · /people-search

### JSON-LD
WebPage + BreadcrumbList (Home → Integrations) + FAQPage.

Self-critique: Specificity 7→8 after adding "clean names ready for personalisation" · Wedge 7 (utility page; acceptable) · Claims 10 · Voice 9

---

## 4.19 Data sources & compliance

| Field | Value |
| --- | --- |
| Route | /data-sources-and-compliance |
| Status | Launch after legal review `[PENDING APPROVAL: legal]` |
| Primary reader | RevOps, security and legal reviewers |
| Page job | Explain plainly where data comes from, how contacts are found, and how people can opt out |
| Primary / secondary keywords | B2B data compliance GDPR DPDP / where does Harvin get its data, business contact data opt out |
| SEO title (48) | Data Sources & Compliance: How Harvin Finds Data |
| Meta description (154) | Where Harvin's company research and contact data come from, how accuracy is handled, and how anyone can ask for their business contact data to be removed. |
| OG title / description | Where Harvin's data comes from / Plain answers on sources, accuracy and opt-out. |
| llms.txt line | How Harvin researches companies, finds business contact data through waterfalls, handles accuracy, and processes removal requests. |
| Schema | BreadcrumbList, WebPage, FAQPage |

### Hero [id: hero]
- H1: Where Harvin's data comes from
- Subhead: Plain answers about how Harvin researches companies, how it finds business contact details, and how anyone can ask to be removed.

### Entity [id: entity]
(entity sentence)

### Company research [id: company-research]
H2: Where does company research come from?
Harvin researches companies from publicly available sources, such as company websites, store locators, app listings, job postings and public announcements, together with data from licensed data partners. `[NEEDS INPUT: confirm source categories and partner types]` Harvin marks a field as not found when it can't be confirmed rather than estimating it.

### Contact data [id: contact-data]
H2: How are business contacts found?
For each decision-maker a customer chooses to reach, Harvin runs separate email and phone waterfalls, checking contact-data providers one after another and stopping at the first qualifying result. Harvin only searches for business contact details of people in professional roles. `[NEEDS INPUT: list provider categories or link the Subprocessors page]`

### Accuracy [id: accuracy]
H2: How does Harvin handle accuracy?
Contacts are returned only when a source gives a qualifying result, and customers are charged only when a contact is found. `[PENDING APPROVAL: "Invalid contacts are refunded."]` Coverage varies by person and country, and Harvin doesn't claim complete or perfect accuracy.

### Privacy law [id: privacy-law]
H2: How does Harvin approach GDPR and India's DPDP Act?
`[PENDING APPROVAL: legal to write or approve this section.]` Draft for legal review: Harvin processes business contact data to help companies reach relevant professionals about their work. We publish our Privacy Policy, Data Processing Addendum and list of subprocessors, and we honour requests to access or remove personal data. Customers are responsible for using contact data in line with the laws that apply to their outreach, including GDPR in the EU and UK and the Digital Personal Data Protection Act in India.

### Opt-out [id: opt-out]
H2: How can someone ask to be removed?
Anyone can ask Harvin to remove their business contact details. Email privacy@harvin.ai `[NEEDS INPUT: confirm address]` or use the Your Privacy Choices page with the email address or profile you want removed. We confirm when the request is complete.
Button: Make a privacy request → /privacy-choices

### Security [id: security]
H2: Security
`[NEEDS INPUT: security practices to state, e.g. encryption, access controls, hosting region. Do not mention any certification that hasn't been awarded.]`

### Documents [id: documents]
Privacy Policy → /privacy · Data Processing Addendum → /dpa · Subprocessors → /subprocessors · Acceptable Use → /acceptable-use

### FAQ [id: faq]
**Where does Harvin get its data?**
Harvin researches companies from publicly available sources, such as company websites, store locators, app listings and announcements, together with licensed data partners. Business contact details are found through waterfalls across contact-data providers. `[NEEDS INPUT: confirm]`

**How can I remove my details from Harvin?**
Use the Your Privacy Choices page or email privacy@harvin.ai with the email address or profile you want removed. Harvin confirms when the request is complete. `[NEEDS INPUT: confirm address and process]`

**Is Harvin GDPR compliant?**
`[PENDING APPROVAL: legal answer only]`

### Internal links
/privacy · /dpa · /subprocessors · /people-search · /faq

### JSON-LD
WebPage + BreadcrumbList (Home → Data sources & compliance) + FAQPage (publish only approved answers).

Self-critique: Specificity 8 · Claims 10 · Voice 9 (wedge not applicable)

---

## 4.20 Free tool: find missed accounts

| Field | Value |
| --- | --- |
| Route | /free-tools/missed-accounts |
| Status | Launch |
| Primary reader | Founder or SDR lead curious what their database misses |
| Page job | Capture work-email sign-ups with an immediate, concrete result |
| Primary / secondary keywords | find accounts my database misses / find companies similar to my customers, ICP finder |
| SEO title (57) | Free Tool: Find 25 Accounts Your Database Misses | Harvin |
| Meta description (150) | Enter your website and three of your best customers. Harvin finds 25 companies with the same need, in any category, and shows why each one fits. Free. |
| OG title / description | Find 25 accounts your database misses / Free. Your website and three customers is all it takes. |
| llms.txt line | Free Harvin tool: enter your website and three customers to get 25 companies that share their need, with fit reasons. |
| Schema | BreadcrumbList, WebApplication, FAQPage |

### Hero [id: hero]
- Eyebrow: FREE TOOL
- H1: Find 25 accounts your database misses
- Subhead: Enter your website and three of your best customers. Harvin finds 25 companies with the same need, in any category, and tells you why each one fits.

### Inputs [id: inputs]
- "Your company website" (placeholder: yourcompany.com)
- "Three of your best customers" (three fields, placeholder: customer.com)
- "Where do you sell?" (multi-select: India, Southeast Asia, UAE & Middle East, Europe, North America, Other)
- "Work email" (helper: "We'll send your results here too.")
- Button: Find my 25 accounts
- Below: "Free. No card. Creates a free Harvin account so you can keep your results." `[PENDING APPROVAL]`

### What you get [id: what-you-get]
- 25 companies that share your customers' need
- The category most databases file each one under
- A Company Fit score with the top three reasons
- The search themes Harvin used

### Results screen [id: results]
- Loading: "Reading your website…" → "Learning what your customers have in common…" → "Searching for companies with the same need…" → "Scoring fit…"
- H2: "25 companies that look like your best customers"
- Column labels: Company · Listed as · Company Fit · Why it fits
- Banner when ≥ 5 companies are off-category: "{n} of these are filed under a category you probably wouldn't search."
- Upgrade CTA: H "Want their buyers and contacts?" · "Your free account includes 250 credits. Find the decision-makers at these companies now." · Button: Find the buyers → /onboarding `[PENDING APPROVAL]`

### FAQ [id: faq]
**How does the missed-accounts tool work?**
Harvin reads your website and three customers, works out the need they share, turns it into search themes and finds 25 companies with the same need, in any industry. Each comes with a Company Fit score and the top reasons. It runs on the same engine as Harvin's Company Discovery.

**Is it really free?**
Yes. The tool creates a free Harvin account with 250 credits so you can keep your results and, if you want, find the buyers at those companies. No card is needed. `[PENDING APPROVAL]`

**Why do you need a work email?**
Results are tied to your company's domain, and a work email lets Harvin draft your Company Profile and keep your results in your account.

### Final CTA [id: final-cta]
Use block **cta-start-free**.

### Internal links
/company-discovery · /signup · /pricing

### JSON-LD
WebApplication (name "Harvin missed-accounts finder", applicationCategory BusinessApplication, offers price 0) + BreadcrumbList + FAQPage.

Self-critique: Specificity 9 · Wedge 10 · PLG 10 · AEO 8 · Claims 9 · Voice 9

---

## 4.21 Free tool: job title normalizer [PHASE 2]

| Field | Value |
| --- | --- |
| Route | /free-tools/title-normalizer |
| Status | [PHASE 2] — build when the API supports anonymous normalisation |
| Primary keyword | job title normalizer |
| SEO title (58) | Free Job Title Normalizer: Function and Seniority | Harvin |
| Meta description (146) | Paste up to 50 job titles. Harvin maps each to a standard function and seniority level by meaning, so you can filter and route contacts correctly. |
| Schema | BreadcrumbList, WebApplication, FAQPage |

### Hero [id: hero]
- H1: Turn messy job titles into function and seniority
- Subhead: Paste up to 50 titles. Harvin reads each one by meaning and maps it to a standard function and seniority level.

### Tool [id: tool]
- Input label: "Paste job titles, one per line" (placeholder: "Sr Mgr, Fin Ops – India")
- Button: Normalize titles
- Output columns: Original title · Function · Seniority
- Below: "Want Harvin to find the right person at each company? Start free →" /signup

### FAQ [id: faq]
**What is job title normalization?**
Job title normalization maps a raw title to a standard function and seniority, so "Sr Mgr, Fin Ops – India" becomes Finance operations, Manager. It makes contact lists filterable and lets you match people to the roles you actually sell to.

**Why normalise by meaning instead of keywords?**
Keyword rules break on unusual wording, abbreviations and regional titles. Reading by meaning recognises that "Treasury & FX Lead, APAC" is a head-level finance role even though it contains none of the usual keywords.

---

## 4.22 Customers

| Field | Value |
| --- | --- |
| Route | /customers |
| Status | Launch with placeholders hidden until content exists |
| Primary keyword | Harvin customers |
| SEO title (54) | Customers: Accounts Found Outside the Filters | Harvin |
| Meta description (151) | How sales teams and agencies use Harvin to find customers their databases missed, and what changed when they did. Real stories, shared with permission. |
| Schema | BreadcrumbList, CollectionPage |

### Hero [id: hero]
- H1: The customers they almost didn't find
- Subhead: How teams use Harvin to find accounts outside their usual filters, and what happened next.

### Case study cards [id: cards]
[PLACEHOLDER: at least two case studies from Thyleads or Harvin clients, with written permission. Hide this page from navigation until two exist.]

### Case study template [id: case-study-template] (route /customers/{slug})
- Eyebrow: {Segment} · {Region}
- H1: How {Company} found {result in plain words}
- Summary box: Company · What they sell · Team size · Harvin plan · Region
- H2: The challenge — "{Company}'s best customers {shared need}. In their database, those companies were filed under {categories}."
- H2: What Harvin found — Company Profile used, search themes, number of companies found, share outside the usual categories, example off-category account (with permission), buyers matched
- H2: What changed — results with numbers and how they were measured `[PLACEHOLDER: only measured, approved numbers]`
- Quote block: "{quote}" — {Name}, {Title}, {Company} `[PLACEHOLDER]`
- CTA: "See what Harvin finds in your market" → /signup · Book a demo → /book-demo

Template 1 working title: "How a payments company found customers filed under Software" `[PLACEHOLDER]`
Template 2 working title: "How an outbound agency onboarded four clients in one week" `[PLACEHOLDER]`

---

## 4.23 About

| Field | Value |
| --- | --- |
| Route | /about |
| Status | Launch |
| Primary reader | Evaluators and answer engines asking "who built Harvin?" |
| Page job | Origin, credibility and principles |
| Primary / secondary keywords | about Harvin.AI / who built Harvin, Thyleads |
| SEO title (50) | About Harvin.AI: Built by the Team Behind Thyleads |
| Meta description (146) | Harvin was built by the team behind Thyleads after nearly 80 client engagements spent building B2B prospect lists by hand. Here's what we learned. |
| OG title / description | We built Harvin after doing this work by hand for nearly 80 clients / Our story and the principles behind the product. |
| llms.txt line | About Harvin.AI: built by the team behind Thyleads, an outbound agency, after nearly 80 client engagements; founder Rahul Dev. |
| Schema | BreadcrumbList, AboutPage, FAQPage |

### Hero [id: hero]
- Eyebrow: ABOUT HARVIN.AI
- H1: We built Harvin after doing this work by hand for nearly 80 clients
- Subhead: Before Harvin, there was Thyleads, an outbound agency. Every client brought a different product, buyer and market. The hardest part was always the same: finding the companies that truly fit.

### Entity [id: entity]
(entity sentence)

### Who built Harvin [id: who-built]
H2: Who built Harvin?
Harvin was built by the team behind Thyleads, an outbound agency founded by Rahul Dev. Rahul started his career as an SDR, went on to lead teams and managed global SDR teams at Netcore Unbxd, then started Thyleads to bring that discipline to outbound programs for other businesses. Over four years, Thyleads worked with nearly 80 clients. `[NEEDS INPUT: confirm bio details]`

### What we learned [id: what-we-learned]
H2: What we learned building prospect lists by hand
- **The ideal customer lived in people's heads.** Clients could describe a great customer in one sentence, but not in database filters.
- **The best accounts were often filed in the wrong place.** A payments prospect listed as "Software"; a retail chain sized by its head-office staff.
- **Research happened one tab at a time.** Someone opened every website to check what a company actually did.
- **Title searches returned the wrong people.** "Finance" matched Finance Managers, not the person who buys.
- **The reasons got lost.** Lists moved between a database, a research tool and a contact tool, and nobody could say why an account was on the list.

### Principles [id: principles]
H2: The principles behind Harvin
1. **Start with the business, not the filters.** What you sell and who bought from you comes first.
2. **Show the reasons.** Every Company Fit score explains itself.
3. **People decide; Harvin recommends.** Your team can overrule any score.
4. **Fit before timing.** A signal only matters at a company worth selling to.
5. **Be plain about data limits.** When Harvin can't find something, it says so.

### Team [id: team]
[PLACEHOLDER: founders and team with photos, names, roles and one line each on their outbound background]

### Offices [id: offices]
Registered office: 124 City Road, London EC1V 2NX, United Kingdom · India office: #164, 1st Cross, 1st Main Road, AECS Layout, Hebbal, Bengaluru, Karnataka 560094 · Contact: admin@harvin.ai

### FAQ [id: faq]
**Who built Harvin?**
Harvin was built by the team behind Thyleads, an outbound agency founded by Rahul Dev, after nearly 80 client engagements building B2B prospect lists by hand.

**What is Thyleads?**
Thyleads is the outbound agency where the Harvin team spent four years building prospect lists and outbound programs for nearly 80 clients across different markets and buyer groups. Harvin grew out of that work. `[NEEDS INPUT: confirm Thyleads' current status]`

**Where is Harvin based?**
Harvin's registered office is in London, United Kingdom, and its India office is in Bengaluru.

### Final CTA [id: final-cta]
Use block **cta-one-market**.

### Internal links
/data-building · /use-cases/outbound-agencies · /customers · /book-demo

### JSON-LD
AboutPage + BreadcrumbList (Home → About) + FAQPage. Add a Person object for Rahul Dev (jobTitle "Founder", worksFor Organization) once bio is confirmed.

Self-critique: Specificity 9 · Wedge 9 · Objections 8 · AEO 9 · Claims 9 · Voice 9

---

## 4.24 Compare hub [PHASE 2]

| Field | Value |
| --- | --- |
| Route | /compare |
| Status | [PHASE 2] — publish within 60 days after re-checking every competitor fact; add "Last checked" date |
| Primary keyword | lead generation tools comparison |
| SEO title (51) | How Harvin Compares to Clay, Apollo and Other Tools |
| Meta description (152) | Fair comparisons of Harvin with Clay, Apollo, LinkedIn Sales Navigator and FullEnrich: what each does best, when to choose it, and where Harvin differs. |
| Schema | BreadcrumbList, CollectionPage, FAQPage |

### Hero [id: hero]
- H1: How Harvin compares with the tools you already know
- Subhead: Each of these tools is good at its job. Here's what each does best, when to choose it, and where Harvin is different.

### Entity [id: entity]
(entity sentence)

### Summary table [id: summary]
H2: What's the difference between Harvin and other prospecting tools?
Most prospecting tools start from filters or from a list you bring. Harvin starts from your business, finds companies by the need your customers share, explains fit, and finds the right buyer before finding contacts.
| Tool | Best at | Choose it when | Where Harvin differs |
| --- | --- | --- | --- |
| Clay | Flexible enrichment and research workflows | You have someone to build and maintain workflows | Research, fit and buyers run from one Company Profile; nothing to build |
| Apollo | Large contact database plus email sequencing | Your ideal customer maps cleanly to filters and you want sending built in | Finds companies outside the filters and explains fit |
| LinkedIn Sales Navigator | Searching people and accounts on LinkedIn | You prospect mainly through LinkedIn | Researches companies, scores fit and finds email and phone |
| FullEnrich | Finding emails and mobiles for people you already have | You already know exactly who to contact | Decides which companies and people first, then finds contacts |
Line under table: "Last checked: 5 November 2026. Sources listed on each comparison page."

### FAQ [id: faq]
**Can Harvin replace Clay, Apollo or a contact finder?**
For deciding which companies to target, why they fit and who to contact, Harvin covers the work in one setup. Teams that use those tools for other jobs, such as custom automations, email sending or LinkedIn messaging, often keep them alongside Harvin.

---

## 4.25 Harvin vs Clay [PHASE 2]

| Field | Value |
| --- | --- |
| Route | /compare/harvin-vs-clay |
| Primary keyword | Clay alternative |
| SEO title (52) | Harvin vs Clay: A Clay Alternative Without the Build |
| Meta description (154) | Clay is a flexible workflow builder for enrichment and research. Harvin runs research, fit and buyer search from one Company Profile. When to choose each. |
| Schema | BreadcrumbList, WebPage, FAQPage |

### Hero [id: hero]
- H1: Harvin vs Clay
- Subhead: Both can research companies and find contacts. The difference is who builds the process.

### Difference [id: difference]
H2: What's the difference between Harvin and Clay?
Clay gives your team spreadsheet-style tables, a large marketplace of data providers and AI research columns to design almost any enrichment workflow. Harvin starts from a Company Profile you set once and runs discovery, research, Company Fit, multi-source people search and an email and phone waterfall around it. Clay is a toolkit; Harvin is the finished process for one job.

### Table [id: table]
| | Clay | Harvin |
| --- | --- | --- |
| Starting point | A table you build | Your Company Profile |
| Who designs the process | Your team, often a dedicated operator | Harvin, from your profile |
| Finding companies | Search and enrichment you configure | Search themes from your business need |
| Fit | Scoring logic you build | Company Fit with reasons, learned from wins and losses |
| Decision-makers | Lookups you configure | Target Profile roles in priority order, across several sources |
| Pricing model | Two meters since March 2026: data credits and actions; Launch $185/month, Growth $495/month; unlimited seats | One credit type; from $99/month `[PENDING APPROVAL]` |
| Best for | Teams that want full control and have someone to run it | Teams that want the list without building the workflow |

### Clay does well [id: competitor-strengths]
H2: What Clay does well
Clay is very flexible. Teams can combine many data providers, write their own research prompts, add custom logic and connect enrichment to CRMs, sequencers and webhooks. For a skilled operator, Clay can build almost any workflow, and unlimited seats make it easy to share.

### Choose Clay [id: choose-competitor]
H2: When to choose Clay instead
Choose Clay if you have someone who enjoys building and maintaining workflows, if your needs go well beyond prospect lists, or if you want to configure every provider and automation yourself.

### Choose Harvin [id: choose-harvin]
H2: When to choose Harvin instead
Choose Harvin if your best customers are defined by what companies do rather than by filters, if you want Company Fit with reasons out of the box, or if nobody on the team has time to build tables. Agencies that need the same process for every client also fit Harvin well.

### FAQ [id: faq]
**Is there a Clay alternative that doesn't need a GTM engineer?**
Harvin is built for that case. You describe what you sell, who buys and which deals you won or lost in a Company Profile, and Harvin runs company discovery, research, Company Fit, multi-source people search and an email and phone waterfall from it. There are no tables, prompts or workflow steps to build.

### Sources [id: sources]
Last checked 5 November 2026: Clay pricing after the March 2026 change (databar.ai/blog/article/clay-pricing-2026). Re-check clay.com/pricing before publishing.

---

## 4.26 Harvin vs Apollo [PHASE 2]

| Field | Value |
| --- | --- |
| Route | /compare/harvin-vs-apollo |
| Primary keyword | Apollo alternative |
| SEO title (53) | Harvin vs Apollo: Finding Customers Filters Can't See |
| Meta description (153) | Apollo pairs a large contact database with email sequencing. Harvin finds companies outside the filters and explains fit. When each is the better choice. |
| Schema | BreadcrumbList, WebPage, FAQPage |

### Hero [id: hero]
- H1: Harvin vs Apollo
- Subhead: Apollo is built for searching and sending at volume. Harvin is built for finding the companies your filters can't see.

### Difference [id: difference]
H2: What's the difference between Harvin and Apollo?
Apollo combines a large B2B contact database with filters and email sequencing, priced per user. Harvin starts from your business instead of filters: it finds companies by the need your customers share, researches each one, scores Company Fit with reasons, and finds the right buyer through multi-source people search before finding contacts.

### Table [id: table]
| | Apollo | Harvin |
| --- | --- | --- |
| How you search | Filters and keywords | Search themes from your Company Profile |
| Fit | Filters and intent topics | Company Fit with reasons, learned from wins and losses |
| People | Title and seniority filters | Target Profile roles in priority order, across several sources |
| Outreach | Built-in email sequencing | Export or sync to your sequencer |
| Pricing | Per user: $49, $79 or $119/month billed annually; mobile reveals use credits | Per account, credit-based; from $99/month `[PENDING APPROVAL]` |
| Best for | High-volume prospecting where customers fit filters | Customers defined by what companies do |

### Apollo does well [id: competitor-strengths]
Apollo gives teams a large contact database, a useful free plan and sequencing in the same tool, which makes it a fast way to start outbound when your market fits standard filters.

### Choose Apollo [id: choose-competitor]
Choose Apollo if your ideal customer maps cleanly to industry, size and location filters and you want data and email sending in one place.

### Choose Harvin [id: choose-harvin]
Choose Harvin if your best customers don't share an industry, if keyword title searches keep returning the wrong people, or if you need to know why each company is on the list.

### FAQ [id: faq]
**Can I use Harvin with Apollo?**
Yes. Many teams use Harvin to decide which companies and buyers to target, then send the list to the sequencer they already use. `[NEEDS INPUT: confirm export route into Apollo]`

### Sources [id: sources]
Last checked 5 November 2026: Apollo pricing (docket.io/resources/research/apollo-pricing). Re-check apollo.io/pricing before publishing.

---

## 4.27 Harvin vs LinkedIn Sales Navigator [PHASE 2]

| Field | Value |
| --- | --- |
| Route | /compare/harvin-vs-sales-navigator |
| Primary keyword | Sales Navigator alternative |
| SEO title (53) | Harvin vs Sales Navigator: Research, Fit and Contacts |
| Meta description (153) | Sales Navigator is strong for LinkedIn search and messaging. Harvin researches companies, scores fit and finds the buyer's email and phone. Compare them. |
| Schema | BreadcrumbList, WebPage, FAQPage |

### Hero [id: hero]
- H1: Harvin vs LinkedIn Sales Navigator
- Subhead: Sales Navigator helps you find and message people on LinkedIn. Harvin helps you decide which companies and people are worth it, and finds their email and phone.

### Difference [id: difference]
H2: What's the difference between Harvin and Sales Navigator?
Sales Navigator searches LinkedIn's member and company data with filters and lets you message people through InMail. It doesn't export emails or phone numbers. Harvin finds companies by business need, researches fields LinkedIn doesn't hold, scores Company Fit with reasons, and finds the buyer's work email and phone.

### Table [id: table]
| | Sales Navigator | Harvin |
| --- | --- | --- |
| Search | LinkedIn filters | Search themes from your business need |
| Company research | LinkedIn company pages | Researched fields such as store count, MAU, tech stack |
| Fit | Saved searches and lead recommendations | Company Fit with reasons |
| Contact data | InMail; no email or phone export | Email and phone waterfall |
| Price | Core about $90–120 per seat per month, depending on billing | From $99/month per account `[PENDING APPROVAL]` |
| Best for | LinkedIn-led prospecting | Finding and reaching customers filters miss |

### Sales Navigator does well [id: competitor-strengths]
Sales Navigator has the freshest view of job changes and titles on LinkedIn, alerts on saved leads, and InMail for reaching people outside your network.

### Choose Sales Navigator [id: choose-competitor]
Choose Sales Navigator if your team prospects mainly through LinkedIn messages and social selling.

### Choose Harvin [id: choose-harvin]
Choose Harvin if you need companies outside standard filters, research fields LinkedIn doesn't hold, reasons for fit, and email and phone for the buyer. Many teams use both.

### FAQ [id: faq]
**Does Harvin replace Sales Navigator?**
Not for LinkedIn messaging. Harvin decides which companies and people to target and finds their email and phone; Sales Navigator remains useful for engaging those people on LinkedIn.

### Sources [id: sources]
Last checked 5 November 2026: Sales Navigator pricing (overloop.com/blog/linkedin-sales-navigator-pricing). Re-check LinkedIn's plan page before publishing.

---

## 4.28 Harvin vs FullEnrich [PHASE 2]

| Field | Value |
| --- | --- |
| Route | /compare/harvin-vs-fullenrich |
| Primary keyword | FullEnrich alternative |
| SEO title (55) | Harvin vs FullEnrich: Contacts Plus the Right Companies |
| Meta description (138) | FullEnrich finds emails and mobiles for people you bring. Harvin also finds which companies fit and who the buyer is. When to choose each. |
| Schema | BreadcrumbList, WebPage, FAQPage |

### Hero [id: hero]
- H1: Harvin vs FullEnrich
- Subhead: FullEnrich finds contact details for the people you give it. Harvin also decides which companies and people to give it.

### Difference [id: difference]
H2: What's the difference between Harvin and FullEnrich?
FullEnrich is a contact enrichment tool: it checks many providers one after another to find work emails and mobile numbers for people you already have, and charges only when it finds them. Harvin does the steps before that: it finds the companies that fit, researches them, explains Company Fit and matches the buyer, then runs its own email and phone waterfall.

### Table [id: table]
| | FullEnrich | Harvin |
| --- | --- | --- |
| Starting point | People you bring | Your Company Profile |
| Finding companies | Not its focus | Search themes by business need |
| Research and fit | Not its focus | Researched fields and Company Fit with reasons |
| Choosing the buyer | You choose | Target Profile roles in priority order, across several sources |
| Contact pricing | Credits: work email 1, mobile 10; plans from $29 for 500 credits; charged only when found | Credits: email 3, phone 20, charged only when found; from $99 for 5,000 `[PENDING APPROVAL]` |
| Best for | Teams who already know exactly who to contact | Teams who need the list, the reasons and the contacts |

### FullEnrich does well [id: competitor-strengths]
FullEnrich focuses on one job and does it across many providers, with pay-only-when-found pricing, unlimited users and credits that roll over. At high volume its per-contact price is lower than Harvin's.

### Choose FullEnrich [id: choose-competitor]
Choose FullEnrich if you already have the list of people and only need their emails and phone numbers, especially at high volume.

### Choose Harvin [id: choose-harvin]
Choose Harvin if the hard part is the list itself: which companies to target, why they fit and who the buyer is. Harvin builds that list and then finds the contacts.

### FAQ [id: faq]
**Is Harvin a FullEnrich alternative?**
For teams that use a contact finder at the end of a longer research process, yes: Harvin covers finding companies, researching them, Company Fit and buyer matching, then runs its own email and phone waterfall. Teams that only need contacts for people they already have, at volume, may prefer FullEnrich.

### Sources [id: sources]
Last checked 5 November 2026: FullEnrich pricing summary (fullenrich.com/pricing.md) and plan breakdown (pipeline.zoominfo.com/sales/fullenrich-pricing). Re-check before publishing.

---

## 5. FAQ hub

| Field | Value |
| --- | --- |
| Route | /faq |
| Status | Launch |
| SEO title (51) | Harvin FAQ: Discovery, Company Fit, People, Pricing |
| Meta description (149) | Answers about how Harvin finds companies, decides Company Fit, finds the right buyer, finds emails and phones, what it costs and how it handles data. |
| Schema | BreadcrumbList, FAQPage |

H1: Questions about Harvin
Subhead: Short answers. Each links to the page that explains it in full.

Build rule: each answer is pulled at build time from the FAQ block on its home page, so the text is identical everywhere. Show a "Read more →" link to the home page under each answer. Only Launch pages feed the hub.

| Group | Question | Canonical source |
| --- | --- | --- |
| About Harvin | What is Harvin.AI? | / #faq |
| About Harvin | Who built Harvin? | / #faq |
| About Harvin | What is Thyleads? | /about #faq |
| About Harvin | Where is Harvin based? | /about #faq |
| Finding companies | How do I find B2B companies that don't fit industry filters? | / #faq |
| Finding companies | What are search themes? | /company-discovery #faq |
| Finding companies | Is Company Discovery a lookalike tool? | /company-discovery #faq |
| Finding companies | How is Harvin different from a B2B contact database? | / #faq |
| Research and fit | How does Harvin decide Company Fit? | /research-fields #faq |
| Research and fit | Why should I trust an AI fit score? | /research-fields #faq |
| Research and fit | Where does Harvin find store counts and monthly active users? | /research-fields #faq |
| Research and fit | Why does Harvin want my lost deals? | /data-building #faq |
| People and contacts | What is waterfall people search? | /people-search #faq |
| People and contacts | How do I find the right decision-maker at a company? | /people-search #faq |
| People and contacts | How does Harvin find work emails and phone numbers? | /people-search #faq |
| People and contacts | What is job title normalization? | /people-search #faq |
| People and contacts | How accurate is Harvin's contact data? | / #faq |
| Existing lists | I already have a list. Do I need to start over? | / #faq |
| Existing lists | How do I enrich a CSV of companies? | /data-enrichment #faq |
| Signals | What are B2B buying signals? | /signals #faq |
| Signals | Does a signal mean a company is ready to buy? | /signals #faq |
| Pricing | How much does Harvin cost? | /pricing #faq |
| Pricing | What is a credit? | /pricing #faq |
| Pricing | Do I pay if Harvin doesn't find a contact? | /pricing #faq |
| Pricing | Is there a free trial? | /pricing #faq |
| Setup | How much setup does Harvin need? | / #faq |
| Setup | What should I bring to a Harvin demo? | /faq (new, below) |
| Data | Where does Harvin get its data? | /data-sources-and-compliance #faq |
| Data | How can I remove my details from Harvin? | /data-sources-and-compliance #faq |

New canonical answer (lives on /faq):
**What should I bring to a Harvin demo?**
Bring one of three things: your targeting criteria, even if rough; a few of your best customers and a few deals you lost; or a list your team already uses. One market is enough. We'll show you the companies Harvin finds, the reasons behind each Company Fit score, and the buyers it matches with their contacts.

---

## 6. Glossary

| Field | Value |
| --- | --- |
| Route | /glossary |
| Status | Launch |
| SEO title (50) | B2B Prospecting Glossary: Fit, Waterfalls, Signals |
| Meta description (147) | Plain definitions of B2B prospecting terms: ICP, Company Fit, search themes, waterfall people search, title normalization, buying signals and more. |
| Schema | BreadcrumbList, DefinedTermSet (one DefinedTerm per row; name = term, description = definition) |

H1: B2B prospecting glossary
Subhead: Plain definitions of the terms you'll meet when building target lists, and how each one works in Harvin.

| Term [id] | Definition | In Harvin |
| --- | --- | --- |
| Ideal customer profile (ICP) [icp] | A description of the companies most likely to buy, based on traits shared by your best customers. | Stored as your Company Profile, including companies that converted and that didn't. |
| Company Profile [company-profile] | Harvin's saved description of your business: what you sell, who buys, customers, lost deals, target roles, regions and exclusions. | Set once and used for every list. |
| Target Profile [target-profile] | The roles you want to reach, in priority order, with functions and seniority. | Drives waterfall people search. |
| Company Fit [company-fit] | An assessment of how well a company matches a seller's ideal customer. | A score out of 100 with the reasons shown, learned from wins and losses. |
| Search themes [search-themes] | Phrases describing a customer need the way companies with that need describe themselves. | Grouped by use case, business model, customer type and product language. |
| Research fields [research-fields] | Company details found by researching each company rather than read from a database record. | Includes store count, monthly active users, location count and tech stack. |
| Miscategorised company [miscategorised-company] | A company that fits your offer but is filed under an industry you wouldn't search. | What Company Discovery is built to find. |
| Lookalike companies [lookalike-companies] | Companies that resemble example companies on industry, size and location. | Harvin searches for the need behind your customers instead. |
| Waterfall enrichment [waterfall-enrichment] | Checking several data sources in sequence until one returns a usable result. | Separate email and phone waterfalls. |
| Waterfall people search [waterfall-people-search] | Finding the best decision-maker by checking target roles in priority order. | Harvin's version also cascades across several people sources. |
| Job title normalization [title-normalization] | Mapping a raw job title to a standard function and seniority. | Done by meaning, not keywords. |
| Data normalization [data-normalization] | Making every record follow the same format. | "ACME TECHNOLOGIES PVT LTD" becomes "Acme Technologies"; "SARAH" becomes "Sarah". |
| Enrich Column [enrich-column] | Adding one researched field to an existing list. | Researches missing values across selected companies. |
| Buying signals [buying-signals] | Changes at a company that suggest outreach may be timely. | Paired with Company Fit; fit comes first. |
| Decision-maker [decision-maker] | The person who owns the buying decision for your offer. | Matched on title, seniority and function together. |
| Qualifying contact [qualifying-contact] | A work email or phone number a source returns as usable for outreach. | Charged only when found. |
| GTM engineering [gtm-engineering] | Building and maintaining data and automation workflows for sales and marketing. | Harvin removes most of this work for prospect lists. |
| Credit [credit] | The unit Harvin uses to charge for research, fields, contacts and monitoring. | See /pricing. |

CTA under table: use block **cta-start-free**.

---

## 7. llms.txt

Publish at https://harvin.ai/llms.txt as plain text. Update whenever a Launch page changes.

```
# Harvin.AI

> Harvin.AI is a B2B company discovery and research platform that finds the companies and buyers your database misses, shows why each one fits your business, and finds their work emails and phone numbers.

Teams describe their business once in a Company Profile: what they sell, who buys, which companies converted and which didn't. Harvin turns that into search themes and finds companies by business need in any industry, researches fields databases lack (such as store count and monthly active users), and scores Company Fit with the reasons shown. It finds the right buyer through multi-source waterfall people search in priority order, normalises titles, company names and first names, and finds work emails and phone numbers through an email and phone waterfall, charging only when a contact is found. Built by the team behind Thyleads after nearly 80 client engagements. Offices in London and Bengaluru.

## Product
- [Data Building](https://harvin.ai/data-building): the full workflow from Company Profile to contacts
- [Company Discovery](https://harvin.ai/company-discovery): find companies by business need, not industry code
- [Research Fields & Company Fit](https://harvin.ai/research-fields): researched company data and fit scores with reasons
- [People Search & Contacts](https://harvin.ai/people-search): multi-source waterfall people search, title and name normalization, email and phone
- [Data Enrichment](https://harvin.ai/data-enrichment): clean, research, score and complete an existing list
- [Signals](https://harvin.ai/signals): changes at good-fit accounts
- [Pricing](https://harvin.ai/pricing): free plan, paid plans from $99/month, credit menu

## Use cases
- [Fintech & payments](https://harvin.ai/use-cases/fintech-payments)
- [B2B SaaS & enterprise tech](https://harvin.ai/use-cases/b2b-saas)
- [Multi-location & consumer businesses](https://harvin.ai/use-cases/multi-location-consumer)
- [Entering new markets](https://harvin.ai/use-cases/new-markets)
- [Outbound & GTM agencies](https://harvin.ai/use-cases/outbound-agencies)

## Regions
- [India](https://harvin.ai/regions/india)
- [Southeast Asia](https://harvin.ai/regions/southeast-asia)
- [UAE & Middle East](https://harvin.ai/regions/uae)

## Reference
- [FAQ](https://harvin.ai/faq)
- [Glossary](https://harvin.ai/glossary)
- [Data sources & compliance](https://harvin.ai/data-sources-and-compliance)
- [Integrations](https://harvin.ai/integrations)
- [About](https://harvin.ai/about)
- [Free tool: find missed accounts](https://harvin.ai/free-tools/missed-accounts)
```
Remove the "$99/month" phrase from llms.txt until pricing is approved.

---

## 8. Claims register

| # | Claim | Where used | Source | Status |
| --- | --- | --- | --- | --- |
| C1 | Multi-source waterfall people search | /, /people-search, /data-building, use cases, glossary, llms.txt | Owner (doc comment, 5 Nov 2026) | Confirmed |
| C2 | Company-name and first-name normalization | /, /people-search, /data-enrichment, glossary | Owner; Data Building deck | Confirmed |
| C3 | Title normalization by meaning | /people-search, regions | Deck (title, seniority, function matching) | Use; "by meaning" to confirm |
| C4 | Company Fit learns from converted and lost companies and shows reasons | Product pages, FAQ | Deck | Use |
| C5 | Email and phone waterfall stops at first qualifying result; charged only when found | Throughout | Deck; research pricing | Use |
| C6 | "Verified" contacts | Not used | Live site | Held until approved |
| C7 | Invalid contacts refunded | Tagged lines on /, /pricing, /people-search, /data-sources | Research recommendation | PENDING APPROVAL |
| C8 | 650M+ B2B profiles, 30+ contact sources, 20+ signal types | Not used | Deck, live site | Held until confirmed |
| C9 | 80% less time, 3× faster, 40% fewer irrelevant matches, 30% outside filters | Not used | Deck, live site | Removed; no methodology |
| C10 | Nearly 80 Thyleads client engagements | /, /about, agencies, India | Brief, handoff v1.0 | Use; confirm current |
| C11 | Founder bio (Rahul Dev, Netcore Unbxd) | /about | Handoff v1.0 | NEEDS INPUT: confirm |
| C12 | Free plan: 250 credits, 25-company preview, 10 free reveals | Hero, sign-up, pricing, free tool | Research recommendation | PENDING APPROVAL |
| C13 | Plan prices $99 / $349 / $799 / from $12k; annual $79 / $279 / $639 | Pricing, teasers, FAQ | Research recommendation | PENDING APPROVAL |
| C14 | Credit menu (2 / 1 / 3 / free / 3 / 20 / 5) and $99 worked example | Pricing, product pages | Research recommendation | PENDING APPROVAL |
| C15 | Top-up pack 2,500 credits for $59; rollover rules | Pricing | Research recommendation | PENDING APPROVAL |
| C16 | Agency partner program, 20% recurring | Agencies page | Research recommendation | PENDING APPROVAL |
| C17 | Integrations (HubSpot, Salesforce, Smartlead, Instantly, lemlist) | /integrations, pricing | Research recommendation | NEEDS INPUT |
| C18 | Northstar Software, Vela Commerce, Kitecart, Atlas Digital, Ledgerly Analytics, Priya Nair and all example values | Examples | Deck (illustrative) and new illustrations | Fictional; labelled |
| C19 | Clay pricing: Launch $185, Growth $495, two meters since March 2026, unlimited seats | /compare/harvin-vs-clay | databar.ai, checked 5 Nov 2026 | Phase 2; re-check |
| C20 | Apollo pricing $49 / $79 / $119 per user/month annual | /compare/harvin-vs-apollo | docket.io, checked 5 Nov 2026 | Phase 2; re-check |
| C21 | Sales Navigator Core about $90–120 per seat/month; no email/phone export | /compare/harvin-vs-sales-navigator | overloop.com, checked 5 Nov 2026 | Phase 2; re-check |
| C22 | FullEnrich: email 1 credit, mobile 10, from $29 for 500 credits, pay when found, cheaper at volume | /compare/harvin-vs-fullenrich | fullenrich.com/pricing.md; zoominfo pipeline, checked 5 Nov 2026 | Phase 2; re-check |
| C23 | Legal entity, offices, contact email | Footer, about, schema | Live site footer | Use |
| C24 | Signal types (leadership, expansion, funding, hiring, tech change, events) | /signals | Deck; live Account Intelligence page | NEEDS INPUT: confirm list |

---

## 9. Developer checklist

### Approvals that block launch
1. Pricing: plans, annual rates, credit menu, free-plan allowances, top-up packs, rollover, refunds (C7, C12–C15). Blocks /pricing, homepage teaser, sign-up microcopy, product "Credits used" sections, Product/Offer schema.
2. Legal review of /data-sources-and-compliance, especially the privacy-law section and opt-out address.
3. Signals feature scope and signal list (C24). Blocks /signals; if not ready, remove Signals from nav and pricing tables.
4. Confirmed integrations (C17). Blocks integration cards and the Growth plan inclusion line.
5. Founder bio and Thyleads status (C10–C11).
6. PLG flow: website-URL Company Profile drafting, 25-company preview and free reveals exist in product (assumptions in section 1). Blocks Start-free promises.

### Inputs needed (non-blocking; hide the slot until supplied)
Search-theme editing · regional coverage gaps · API availability · list build time · custom research fields · field refresh and source links · Company Fit refresh behaviour · upload limits and minimum columns · contact-only uploads · normalisation cost · alert delivery channels · Account Intelligence features retained · cancellation terms · other credit-pack sizes · scheduling tool for demos · careers route · security practices · export column list · Apollo export route.

### Placeholders to collect
Customer logos (homepage proof) · two case studies with permission (/customers) · testimonial quotes · team photos and bios (/about). Hide each block until real content exists. Do not reuse the named testimonials on the current Account Intelligence page unless they are verified and permissioned.

### Build notes
- Redirects (301): /account-intelligence → /signals · /sdr, /sdr-head, /ae → / · /outreach-and-engagement → / · /product-tour → /data-building `[NEEDS INPUT: confirm whether these products remain]`
- Replace all old meta keywords ("SDR management platform"…) and the Twitter title/description on every page with section 4 values.
- Remove the stat counters (650M+, 30+, 20+, 80%, 3×, 40%, 30%) from the current /data-building until approved.
- Change "Verified work email" and "Verified contacts" UI labels on marketing pages to "Work email" and "Contacts" until C6 is approved.
- `[PHASE 2]` routes: build, set `noindex`, exclude from sitemap and nav.
- FAQPage schema built from page FAQ blocks; FAQ hub pulls answers from the same source.
- Signup links carry `?plan=` for plan pre-selection; keep UTM parameters through sign-up.
- Every visual slot needs the alt text given on its page.
- Keep the "Ask AI about Harvin" footer strip.

### QA log (run on this file)
- Entity sentence: identical in section 0, homepage entity strip, Organization schema, SoftwareApplication schema, Product schema and llms.txt; other pages reference it as "(entity sentence)" for the component to render.
- Product names checked: Company Profile, Target Profile, Company Fit, Company Discovery, Data Enrichment, Enrich Column, Research Fields, People Search & Contacts, Signals, Data Building.
- Banned-word scan: see result below.
- Every CTA written as Label → route.
- Every number used appears in the claims register.
