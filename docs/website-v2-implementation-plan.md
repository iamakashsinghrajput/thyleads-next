# Harvin.AI website v2: implementation plan

Source: `harvin-website-copy-handoff.md` v2.0 (5 Nov 2026). Branch: `feature/home-page`.

The handoff repositions the site from "SDR management platform" to **B2B company discovery and research**. Copy is final; numbers and some facts are gated on approvals (handoff §9).

---

## Ground rules for every page

- Copy is used word for word. Handoff tags are never rendered:
  - `[PENDING APPROVAL]`: build it; the branch stays unmerged (or the item stays flagged in `lib/pricing.ts`) until approved.
  - `[NEEDS INPUT]` / `[PLACEHOLDER]`: hide the slot until the content exists.
  - `[PHASE 2]`: build with `robots: { index: false }`, keep out of the nav and `app/sitemap.ts`.
- Each handoff section id (`[id: hero]`) becomes the section's `id` attribute.
- FAQ JSON-LD is generated from the same array the page renders (`faqSchema()` in `lib/schema.ts`), never hand-written.
- Every page sets `metadata.title`, `description`, `openGraph` and `twitter` from its handoff table, and drops the old SDR-platform keywords.
- Styling follows `CLAUDE.md`: Tailwind only, `ember`/`slate`/`sand` tokens, a `dark:` pair on every colour, `font-instrument` for headings, Lucide icons.

## CTA routing (interim)

The handoff assumes `/signup`, `/login` and `/book-demo`. None exist yet: sign-in goes through the portal (`lib/portal.ts`), and demo requests go through `/contact`. All CTA hrefs come from `startFreeHref()` / `BOOK_DEMO_HREF` in `lib/site.ts`, so switching to the real routes later is a one-line change:

| Handoff CTA | Interim target | Final target |
| --- | --- | --- |
| Start free → /signup?plan=x | portal URL + `?plan=x` | `/signup?plan=x` |
| Book a demo / Talk to sales → /book-demo | `/contact` | `/book-demo` |
| Log in → /login | portal URL | `/login` |

---

## Phases

### Phase 1: Homepage + Pricing (in progress)
| Item | Files |
| --- | --- |
| Pricing data (plans, credit menu, feature table, calculator logic) | `lib/pricing.ts` |
| CTA routes | `lib/site.ts` |
| Entity description in Organization / SoftwareApplication schema | `lib/schema.ts` |
| Generic FAQ accordion (takes items as props) | `components/Faq.tsx` |
| Homepage body: hero product mock, problem, tabbed how-it-works, dark example band, people search, bento sections (same visual language as `/data-building`) | `app/HomeClient.tsx` |
| Homepage copy that is also JSON-LD (steps, FAQ) | `app/home-content.ts` |
| Reusable start-free CTA block | `components/CtaStartFree.tsx` |
| Homepage + HowTo + FAQ schema | `app/page.tsx` |
| Plan cards with monthly/annual toggle | `components/PricingPlans.tsx` |
| Credit calculator | `components/CreditCalculator.tsx` |
| Pricing page (all sections in §4.8) | `app/pricing/page.tsx` |

Product/Offer JSON-LD on `/pricing`, and the `offers` object on the homepage SoftwareApplication, ship only when `PRICING_APPROVED` in `lib/pricing.ts` is set to `true`.

### Phase 2: Global shell
- `Navbar.tsx`: new menus (Product, Use cases + By region, Pricing, Resources, About), Log in / Book a demo / Start free. Remove "Get Early Access" modal trigger.
- `Footer.tsx`: new brand line, six columns, offices, "Ask AI about Harvin" strip kept.
- Cookie banner copy (`CookieConsent.tsx`), announcement bar (optional).
- `app/not-found.tsx` with the 404 copy.
- Reusable CTA blocks `cta-one-market`, `cta-agency`.

### Phase 3: Product pages
`/data-building` (rewrite, remove stat counters), `/company-discovery`, `/research-fields`, `/people-search`, `/data-enrichment`, `/signals` (blocked on C24). One shared layout component for the repeating structure: hero, entity, definition, why filters fail, steps, example, what you get, credits used, objections, related, FAQ, final CTA.

### Phase 4: Use cases, regions, trust
`/use-cases` hub plus 5 pages, `/regions/{india,southeast-asia,uae}`, `/integrations` (blocked on C17), `/data-sources-and-compliance` (blocked on legal), `/customers` (placeholders hidden), `/about`.

### Phase 5: Reference & acquisition
`/faq` hub (pulls answers from page FAQ arrays), `/glossary`, `/free-tools/missed-accounts`, `public/llms.txt` (drop "$99/month" until pricing approved), `/signup`, `/login`, `/reset-password`, `/book-demo` + `/thanks`.

### Phase 6: Phase-2 content (noindex)
`/compare` hub + 4 comparison pages, `/free-tools/title-normalizer`. Re-check competitor pricing (C19–C22) before publishing.

### Phase 7: Cleanup & redirects
- 301s in `next.config.ts`: `/account-intelligence → /signals`, `/sdr`, `/sdr-head`, `/ae`, `/outreach-and-engagement → /`, `/product-tour → /data-building` (confirm first).
- Delete retired components no longer imported (Hero, SdrProblem, WorkspacesSection, FeatureSection, SdrStory, Testimonials, HomeFaq, …) after checking each one for other importers.
- Update `app/sitemap.ts`.
- Replace "Verified" labels with "Work email" / "Contacts" on marketing pages.

---

## Open conflicts to resolve with the owner

1. **Legal entity.** The handoff says Thyleads Pvt. Ltd. `lib/site.ts` has `LEGAL_NAME = 'Harvin AI Ltd'` and the schema has UK company number 17080422; the footer copyright says Thyleads Pvt. Ltd. Left unchanged.
2. **Brand name.** The handoff uses "Harvin.AI" in schema `name`; the code uses "Harvin". Left unchanged pending confirmation.
3. **sameAs.** The handoff lists only `linkedin.com/company/harvin-ai/`; the code lists twitter/linkedin/github `harvinai`. One of the LinkedIn URLs is wrong.
4. **Handoff file location.** `public/harvin-website-copy-handoff.md` is served publicly once deployed (unapproved pricing, competitor notes). Move to `docs/` before merging.

## Launch blockers (handoff §9)
Pricing approval (C7, C12–C15) · legal review of compliance page · Signals scope (C24) · integrations list (C17) · founder bio (C10–C11) · PLG flow exists in product (website-URL profile drafting, 25-company preview, 10 free reveals).
