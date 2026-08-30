import { LEGAL_NAME, SITE_URL } from '@/lib/site';

/**
 * The graph an answer engine reads to decide what Harvin *is*.
 *
 * Organization and WebSite are declared once, on the homepage, with stable
 * @ids that every other schema references rather than redeclaring — that is
 * what lets a crawler treat all the pages as one entity instead of several
 * unrelated ones with the same name.
 *
 * SoftwareApplication carries the category term. `applicationCategory` is a
 * fixed vocabulary, so the specific positioning lives in `applicationSubCategory`
 * and the description, which is where an LLM actually reads it from.
 */
export const ORG_ID = `${SITE_URL}/#organization`;
export const SITE_ID = `${SITE_URL}/#website`;

export const organizationSchema = {
  '@type': 'Organization',
  '@id': ORG_ID,
  name: 'Harvin',
  legalName: LEGAL_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/harvinlogo/logo.png`,
  description:
    'Harvin is an SDR management platform that gives sales leaders one place to run a sales development team — territories and account ownership, buying-signal prioritisation, execution across email, dialer and tasks, meeting handoffs, and reporting from accounts worked through to pipeline.',
  email: 'admin@harvin.ai',
  /* Company facts as published in components/Footer.tsx — keep the two in
     step; a registration number that disagrees with the footer is worse than
     one that is absent. */
  address: {
    '@type': 'PostalAddress',
    streetAddress: '124 City Road',
    addressLocality: 'London',
    postalCode: 'EC1V 2NX',
    addressCountry: 'GB',
  },
  identifier: { '@type': 'PropertyValue', name: 'Company number', value: '17080422' },
  /* sameAs is what lets a crawler collapse these profiles and the site into
     one entity instead of several with the same name. Only list profiles that
     genuinely exist — a dead sameAs weakens the link rather than adding one. */
  sameAs: [
    'https://twitter.com/harvinai',
    'https://linkedin.com/company/harvinai',
    'https://github.com/harvinai',
  ],
};

export const websiteSchema = {
  '@type': 'WebSite',
  '@id': SITE_ID,
  url: SITE_URL,
  name: 'Harvin',
  publisher: { '@id': ORG_ID },
};

export const softwareSchema = {
  '@type': 'SoftwareApplication',
  '@id': `${SITE_URL}/#software`,
  name: 'Harvin',
  applicationCategory: 'BusinessApplication',
  applicationSubCategory: 'SDR Management Platform',
  operatingSystem: 'Web',
  url: `${SITE_URL}/platform`,
  publisher: { '@id': ORG_ID },
  description:
    'SDR management platform for sales leaders: manage reps, territories and account ownership; prioritise each rep’s day from live buying signals; run email, dialer, tasks and a unified inbox; hand meetings to AEs with full context; and report from accounts worked through to pipeline generated.',
  featureList: [
    'Team and territory management',
    'Account and lead distribution',
    'Account intelligence',
    'AI buying-signal detection',
    'Watchlists',
    'Look-a-like accounts',
    'Campaign sequences across email, tasks and inbox',
    'Dialer with call recording and dispositions',
    'Meeting handoff and outcome tracking',
    'Pipeline reporting and AI coaching',
  ],
};

/** Wraps any set of nodes in the @graph envelope crawlers expect. */
export const graph = (...nodes: Record<string, unknown>[]) => ({
  '@context': 'https://schema.org',
  '@graph': nodes,
});

/**
 * FAQPage — the highest-leverage schema for answer engines, because the
 * question/answer shape is exactly what they are looking to lift. Only ever
 * emit it where the questions are genuinely on the page: marking up FAQs that
 * a visitor cannot see is a guidelines violation, not a shortcut.
 */
export const faqSchema = (faqs: { q: string; a: string }[]) => ({
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
});

/** BreadcrumbList — gives a crawler the hierarchy the URL implies. */
export const breadcrumbSchema = (trail: { name: string; path: string }[]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: trail.map((t, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: t.name,
    item: `${SITE_URL}${t.path}`,
  })),
});

export const articleSchema = (a: {
  slug: string; title: string; excerpt: string; date: string; image?: string; author: string;
}) => ({
  '@type': 'BlogPosting',
  '@id': `${SITE_URL}/blog/${a.slug}#article`,
  headline: a.title,
  description: a.excerpt,
  datePublished: a.date,
  image: a.image ? `${SITE_URL}${a.image}` : `${SITE_URL}/opengraph-image`,
  author: { '@type': 'Person', name: a.author },
  publisher: { '@id': ORG_ID },
  mainEntityOfPage: `${SITE_URL}/blog/${a.slug}`,
});
