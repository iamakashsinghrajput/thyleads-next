<!--
  Chatbot knowledge curated from the v2 website copy handoff
  (harvin-website-copy-handoff.md, 5 Nov 2026) for topics whose pages are not
  built yet. scripts/build-chat-knowledge.mjs appends this file after the
  scraped live pages. Sections use the same format: "### Title", "URL: /route",
  then "## heading" blocks. URLs must be routes that exist on the site: product
  topics point at /data-building (the live page covering the whole workflow),
  everything else at / until its own page is built.

  Left out on purpose: answers still marked NEEDS INPUT, Signals (scope not
  confirmed, C24), Data sources & compliance (pending legal review), comparison
  pages (Phase 2), free tools (not built), partner program and DPDP answers
  (pending approval).
-->

### Data Building — Harvin.AI
URL: /data-building
## Data Building: overview
Harvin Data Building is the workflow that turns what you know about your customers into a list your team can sell to. It starts with your Company Profile, discovers companies that share your customers' need, researches them, scores Company Fit with the reasons shown, finds the right buyers through multi-source people search and finds their work emails and phone numbers. One setup drives every list.
## What is Harvin Data Building?
Harvin Data Building is Harvin's end-to-end workflow for building B2B target lists from business context. It uses your Company Profile to discover companies by business need, research them, score Company Fit with visible reasons, match decision-makers to your Target Profile across several people-data sources, and find their work emails and phone numbers.
## What do I need to give Harvin to start?
Your website, a short description of what you sell and who you sell to, a few customers, a few deals you lost, your target roles in priority order, and any regions or exclusions such as competitors, current customers, open deals or do-not-contact lists. A customer list can be uploaded as a CSV.
## Why does Harvin want my lost deals?
Lost deals show what separates a company that looks right on paper from one that actually buys. Harvin compares discovered companies with both groups, so Company Fit rewards the traits your customers share and flags the traits your lost deals had in common.
## Does Data Building replace my B2B database?
For deciding which companies to target and finding their buyers, it can. Teams that also use a database for other jobs, such as sequencing or territory planning, often keep it and use Harvin to build and qualify the lists that go into it.
## Can I add a field after a list is built?
Yes. Enrich Column adds one researched field, such as monthly active users or store count, across the companies you select, without rebuilding the list.

---

### Company Discovery — Harvin.AI
URL: /data-building
## Company Discovery: overview
Company Discovery is how Harvin builds a new list from scratch. Harvin reads your Company Profile, turns it into search themes grouped by use case, business model, customer type and product language, and finds companies that match. Each company is then researched and scored for Company Fit, and your exclusions are removed automatically.
## How do I find companies that don't fit an industry category?
Search for the need your customers share rather than the label they carry. Harvin expresses that need as search themes, such as "overseas subscriptions" or "global payroll" for a payments seller, and finds companies that describe themselves that way, whatever category a database files them under.
## What are search themes?
Search themes are the words and phrases a company with your customers' need uses to describe itself. Harvin builds them from your Company Profile and groups them into use case, business model, customer type and product language.
## Is Company Discovery a lookalike tool?
No. Lookalike tools match the size, industry and location of your best customers. Company Discovery matches the reason they bought and learns from the deals you lost, which matters most when your best customers don't look alike on paper.
## Do I need to write search queries?
No. Harvin writes the search themes from your Company Profile. You describe your business and your customers; Harvin builds the search.

---

### Research Fields & Company Fit — Harvin.AI
URL: /data-building
## Research Fields & Company Fit: overview
Research fields are company details Harvin finds by researching each company, instead of relying on what a database happens to store. They include business model, category, funding, revenue, monthly active users, store or location count, countries served and tech stack. Harvin marks a field as not found rather than guessing.
## How does Harvin decide Company Fit?
Harvin compares each company's researched details with your Company Profile, including how closely it resembles customers that converted and how it differs from deals you lost. Every score lists its reasons, such as business model, customer countries or technologies, so your team can check the logic. Harvin recommends; your team decides.
## Why should I trust an AI fit score?
Because you don't have to take it on trust. Each Company Fit score shows the facts it used and the customers or lost deals the company resembles. If a reason is wrong or irrelevant, your team can see that immediately and overrule the score.
## What does a research field cost?
Standard fields such as category, funding and tech stack cost 1 credit per company. Deep-research fields such as store count, monthly active users and countries served cost 3 credits per company, because each needs research on that company.
## Can I add a field to a list I already built?
Yes. Enrich Column adds one researched field across the companies you select without rebuilding the list.

---

### People Search & Contacts — Harvin.AI
URL: /data-building
## People Search & Contacts: overview
Waterfall people search finds the best decision-maker at a company by working through a list of target roles in priority order. If the first role isn't there, it tries the next. Harvin's version also cascades across several people-data sources, so a buyer missing from one dataset can still be found in another, and it matches titles by meaning rather than keywords.
## What is waterfall people search?
Waterfall people search finds the best decision-maker at a company by checking a list of target roles in priority order, moving to the next role when one isn't found. Harvin runs this cascade across several people-data sources and matches titles by meaning, so it finds buyers that a single dataset or a keyword search would miss.
## How do I find the right decision-maker at a company?
List the roles that buy, in priority order, with their function and seniority. In Harvin that list is your Target Profile. Harvin searches each company for the first role, then the next, across several people sources, and returns up to three matched people with normalised titles.
## How does Harvin find work emails and phone numbers?
Harvin runs separate email and phone waterfalls for each matched person. Each checks contact-data sources one after another and stops at the first qualifying result, so one source can supply the email and another the phone. You're charged only when a contact is found.
## What is job title normalization?
Job title normalization maps a raw title to a standard function and seniority, so "Sr Mgr, Fin Ops – India" is read as a finance operations manager. Harvin normalises by meaning, which handles unusual wording, abbreviations and regional formats better than keyword rules.
## Why does Harvin clean company names and first names?
So the list is ready to send. Names stored as "ACME TECHNOLOGIES PVT LTD" or "SARAH" break personalised emails and CRM matching. Harvin normalises them to "Acme Technologies" and "Sarah" before your team sees the list.

---

### Data Enrichment — Harvin.AI
URL: /data-building
## Data Enrichment: overview
Data Enrichment is how Harvin improves a list you already have. Most enrichment fills empty fields. Harvin also asks whether each company belongs on the list: it runs against your Company Profile, so an inherited list comes back cleaned, researched, scored for Company Fit with reasons, and completed with the decision-makers who were missing.
## How do I enrich a CSV of companies?
Upload the CSV or XLSX to Harvin Data Enrichment. Harvin cleans company names and first names, fills missing company details, researches the fields you choose, scores Company Fit against your Company Profile and finds the decision-makers who are missing, with their work email and phone.
## What does data normalization mean?
Data normalization makes every record follow the same format, so "ACME TECHNOLOGIES PVT LTD" becomes "Acme Technologies" and "SARAH" becomes "Sarah". Normalised data matches correctly in your CRM, deduplicates cleanly and reads properly in personalised emails.
## How is Harvin different from a contact enrichment tool?
A contact enrichment tool fills in emails and phone numbers for the people you already have. Harvin Data Enrichment also researches each company, scores Company Fit and finds missing decision-makers, so it tells you whether a company belongs on the list before you pay to reach it.
## Can I send the enriched list to my CRM?
Yes, on plans that include CRM and sequencer sync, or by CSV export on any paid plan. See Integrations for what connects.

---

### Use case: Fintech & payments — Harvin.AI
URL: /
## How do I find leads for a cross-border payments product?
Look for payment behaviour instead of industry. Companies that need cross-border payments include software businesses with overseas subscribers, travel companies collecting from abroad and marketplaces paying sellers in many countries. Harvin turns that behaviour into search themes, finds matching companies in any industry and researches each one to confirm the need.
## Who is the buyer for a payments product?
Usually the CFO, VP Finance or Head of Payments, sometimes a Treasury Director at larger companies. Harvin searches for these roles in the priority order you set, across several people sources, and reads titles by meaning, so a "Treasury & FX Lead" is found and a junior Finance Manager is not.
## Can Harvin tell which payment providers a company uses?
Harvin researches tech stack where it can be found publicly, which often shows payment providers such as Stripe. Field availability varies by company, and Harvin marks a field as not found rather than guessing.
## What signals matter for payments sellers?
Expansion into a new country, a new finance leader and a funding round are the most useful, because each often brings a new payment flow or a review of existing providers.

---

### Use case: B2B SaaS & enterprise tech — Harvin.AI
URL: /
## How is Harvin different from filtering by technology?
A technology filter returns every company using a tool, whether or not it has your problem. Harvin uses technologies as one factor alongside business model, customers and similarity to companies that converted, and Company Fit shows all the factors, so you can see why a company is on the list.
## How do I find SaaS companies with a specific problem?
Describe the problem and the companies that already bought from you. Harvin turns that into search themes such as "vendor security reviews" or "enterprise customers in healthcare", finds companies whose own words match, and researches stack and stage to confirm the fit.
## Who should I contact at a SaaS company?
It depends on who owns the problem. Harvin searches your Target Profile roles in priority order, such as CTO, then VP Engineering, then Head of Security, across several people sources, and returns the highest-priority match with work email and phone.
## Can Harvin find companies by funding stage?
Yes. Funding stage is a standard research field. Combine it with business need so you don't only see well-funded companies that don't have your problem.
## What signals help SaaS sellers?
Hiring for the roles that feel your problem, a new funding round, and a change in technology are the most useful timing signals for software sellers.

---

### Use case: Multi-location & consumer businesses — Harvin.AI
URL: /
## How do I find retail chains by number of stores?
Use a tool that researches store count rather than estimating size from headcount. Harvin checks each company's store locators, websites and announcements for store or location count, marks the value as not found when it can't be confirmed, and lets you filter and score by it.
## Can Harvin find apps by monthly active users?
Harvin researches monthly active users where public sources show them, such as app listings and company announcements. Field availability varies by company, and deep-research fields like this cost 3 credits per company.
## What does a store-count lookup cost?
Store count is a deep-research field at 3 credits per company, because it needs research on each company. Use Company Fit first to decide which companies are worth the lookup.
## Who buys at a multi-location business?
Usually operations leaders, such as a COO or Head of Retail Operations, or a Head of Expansion for growth-related offers. Harvin searches your roles in priority order across several people sources.
## Does this work for franchises?
Yes. Franchise language, such as franchise enquiry pages and outlet lists, is one of the search themes Harvin uses to find multi-location businesses.

---

### Use case: Entering new markets — Harvin.AI
URL: /
## How do I build a lead list for a new country?
Start from what worked in your home market. Harvin uses your Company Profile, including customers and lost deals, to build search themes, finds companies in the new country that share the same need, researches each one and shows Company Fit with reasons, so your team can trust a list in a market it doesn't know yet.
## Do job titles differ by country?
Often. A "Finance Director" can be the top finance role in one market and mid-level in another. Harvin normalises titles by meaning and seniority, and you can reorder your target roles for each market.
## Can I keep separate profiles for each market?
Yes, on plans with more than one Company Profile. Growth includes three and Agency is unlimited.
## Which signals matter when entering a market?
Expansion signals: good-fit companies opening in your target country or hiring a regional leader there are often looking for local partners and providers.

---

### Use case: Outbound & GTM agencies — Harvin.AI
URL: /
## How can an outbound agency build lead lists for many clients?
Capture each client's business context once: what they sell, who buys, which companies converted and which didn't. Harvin uses that Company Profile to discover companies, research them, score Company Fit with reasons and find decision-makers with email and phone. The process stays the same for every client; only the profile changes.
## How do I show a client why an account is on the list?
Share the Company Fit reasons. Each score lists the researched facts and the client's customers or lost deals the company resembles, so you can answer "why this account?" with evidence instead of judgement.
## Who built Harvin?
The team behind Thyleads, an outbound agency, after nearly 80 client engagements building prospect lists by hand. Harvin is built around the problems agencies hit every week.

---

### Region: India — Harvin.AI
URL: /
## How do I find B2B customers in India?
Search for the business need your customers share, not the category they're filed under. Harvin turns your Company Profile into search themes, finds Indian companies that match in any industry, researches the details records lack, and scores Company Fit with reasons before finding the buyer.
## How does Harvin handle Indian job titles?
Harvin normalises titles by meaning and seniority, so "AVP Finance", "GM Finance" and "Head of Finance" are each mapped to a seniority level and compared with your Target Profile, rather than matched on keywords.
## Is Harvin built in India?
Harvin has an office in Bengaluru and was built by the team behind Thyleads, which ran outbound programs for nearly 80 clients.

---

### Region: Southeast Asia — Harvin.AI
URL: /
## How do I find B2B customers in Southeast Asia?
Search for the need your customers share and the countries they operate in, not only where they're headquartered. Harvin builds search themes from your Company Profile, finds SEA companies that match in any category, researches countries of operation and scores Company Fit with reasons.
## Can Harvin tell where a company operates, not just its headquarters?
Harvin researches countries of operation as a deep-research field where public sources show it, such as the company's website and announcements. Field availability varies by company.
## Does Harvin find contacts in Southeast Asia?
Yes, through the email and phone waterfall for each matched buyer, charged only when a qualifying contact is found. Coverage varies by person and country.
## What signals matter in Southeast Asia?
Expansion into a new country and funding rounds are the strongest, because regional companies often add providers when they enter a new market.

---

### Region: UAE & Middle East — Harvin.AI
URL: /
## How do I find B2B customers in the UAE?
Search for the need your customers share and for UAE operations, not only UAE headquarters. Harvin builds search themes from your Company Profile, finds companies with UAE and GCC operations in any category, researches each one and scores Company Fit with reasons.
## Can Harvin find companies that recently opened in the UAE?
Yes. Expansion into the UAE is a signal Harvin can watch for at the accounts you choose, and "expanding to the Middle East" can be used as a search theme in discovery.
## How does Harvin handle titles like "General Manager"?
Harvin normalises titles by meaning and seniority, and you can put locally senior titles higher in your Target Profile so the most likely buyer is matched first.
## Does Harvin find UAE phone numbers?
The phone waterfall searches for a direct or mobile number for each matched buyer and charges only when a qualifying result is found. Coverage varies by person.

---

### About Harvin — Harvin.AI
URL: /
## Who built Harvin?
Harvin was built by the team behind Thyleads, an outbound agency founded by Rahul Dev, after nearly 80 client engagements building B2B prospect lists by hand.
## Where is Harvin based?
Harvin's registered office is in London, United Kingdom, and its India office is in Bengaluru.

---

### B2B prospecting glossary — Harvin.AI
URL: /
## Ideal customer profile (ICP)
A description of the companies most likely to buy, based on traits shared by your best customers. In Harvin: Stored as your Company Profile, including companies that converted and that didn't.
## Company Profile
Harvin's saved description of your business: what you sell, who buys, customers, lost deals, target roles, regions and exclusions. In Harvin: Set once and used for every list.
## Target Profile
The roles you want to reach, in priority order, with functions and seniority. In Harvin: Drives waterfall people search.
## Company Fit
An assessment of how well a company matches a seller's ideal customer. In Harvin: A score out of 100 with the reasons shown, learned from wins and losses.
## Search themes
Phrases describing a customer need the way companies with that need describe themselves. In Harvin: Grouped by use case, business model, customer type and product language.
## Research fields
Company details found by researching each company rather than read from a database record. In Harvin: Includes store count, monthly active users, location count and tech stack.
## Miscategorised company
A company that fits your offer but is filed under an industry you wouldn't search. In Harvin: What Company Discovery is built to find.
## Lookalike companies
Companies that resemble example companies on industry, size and location. In Harvin: Harvin searches for the need behind your customers instead.
## Waterfall enrichment
Checking several data sources in sequence until one returns a usable result. In Harvin: Separate email and phone waterfalls.
## Waterfall people search
Finding the best decision-maker by checking target roles in priority order. In Harvin: Harvin's version also cascades across several people sources.
## Job title normalization
Mapping a raw job title to a standard function and seniority. In Harvin: Done by meaning, not keywords.
## Data normalization
Making every record follow the same format. In Harvin: "ACME TECHNOLOGIES PVT LTD" becomes "Acme Technologies"; "SARAH" becomes "Sarah".
## Enrich Column
Adding one researched field to an existing list. In Harvin: Researches missing values across selected companies.
## Buying signals
Changes at a company that suggest outreach may be timely. In Harvin: Paired with Company Fit; fit comes first.
## Decision-maker
The person who owns the buying decision for your offer. In Harvin: Matched on title, seniority and function together.
## Qualifying contact
A work email or phone number a source returns as usable for outreach. In Harvin: Charged only when found.
## GTM engineering
Building and maintaining data and automation workflows for sales and marketing. In Harvin: Harvin removes most of this work for prospect lists.
## Credit
The unit Harvin uses to charge for research, fields, contacts and monitoring. In Harvin: See [Pricing](/pricing).

---

### Book a Harvin demo
URL: /contact
## What should I bring to a Harvin demo?
Bring one of three things: your targeting criteria, even if rough; a few of your best customers and a few deals you lost; or a list your team already uses. One market is enough. We'll show you the companies Harvin finds, the reasons behind each Company Fit score, and the buyers it matches with their contacts.
## What happens on the demo?
A 30-minute call with our team. We run Harvin on your market before or during the call, so you see real companies, not slides.
