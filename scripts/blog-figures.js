/**
 * Renders the in-article comparison figures for the blog
 * (public/blogs/figures/*.webp) in the Harvin look. Same data as the original
 * Thyleads-era images, rebranded. Competitor names are set as text with a
 * neutral monogram, not their logos.
 *
 *   node scripts/blog-figures.js        (needs network for Google Fonts)
 */
const path = require('path');
const fs = require('fs');
const puppeteer = require('puppeteer');
const sharp = require('sharp');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'public/blogs/figures');
const CHROME = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const MARK = 'data:image/png;base64,' + fs.readFileSync(path.join(ROOT, 'public/harvin-mark.png')).toString('base64');
const FONT = (f) => 'file://' + path.join(ROOT, 'public/fonts/universalfont', f);

const stars = (n) => `<span class="stars">${'★'.repeat(n)}<i>${'★'.repeat(5 - n)}</i></span>`;
const yes = `<span class="yes">✓</span>`;
const tags = (arr) => `<span class="tags">${arr.map((t) => `<b>${t}</b>`).join('')}</span>`;
const list = (arr) => `<span class="list">${arr.map((t) => `<em>${t}</em>`).join('')}</span>`;
const provider = (name) =>
  name === 'Harvin'
    ? `<span class="prov"><img class="mark" src="${MARK}">Harvin</span>`
    : `<span class="prov"><span class="mono">${name[0]}</span>${name}</span>`;

function table({ eyebrow, title, sub, cols, widths, rows, foot }) {
  return `
  <div class="fig">
    <p class="eyebrow">${eyebrow}</p>
    <h1>${title}</h1>
    ${sub ? `<p class="sub">${sub}</p>` : ''}
    <div class="table" style="--cols:${widths}">
      <div class="row head">${cols.map((c) => `<span>${c}</span>`).join('')}</div>
      ${rows.map((r) => `<div class="row ${r[0] === 'Harvin' ? 'hl' : ''}">${[provider(r[0]), ...r.slice(1)].map((c) => `<span>${c}</span>`).join('')}</div>`).join('')}
    </div>
    <div class="foot" style="--n:${foot.length}">${foot.map(([k, v]) => `<div><small>${k}</small><b>${v}</b></div>`).join('')}</div>
  </div>`;
}

const FIGURES = {
  'email-outreach-providers-compared': table({
    eyebrow: 'Quick reference guide for B2B SaaS teams',
    title: 'Email outreach service providers <em>compared</em>',
    cols: ['Provider', 'Best for', 'Personalization depth', 'Multi-channel', 'Contract length'],
    widths: '1.3fr 1fr 1.2fr 1fr 1fr',
    rows: [
      ['Harvin', 'SaaS &amp; B2B Tech', stars(5), yes, '3–4 Months'],
      ['Mailshake', 'SMB Outreach', stars(2), '<span class="muted">Limited</span>', 'Monthly'],
      ['Belkins', 'Enterprise Sales', stars(5), yes, '3–6 Months'],
      ['Sopro', 'EU / UK Markets', stars(4), '<span class="muted">Email Only</span>', 'Quarterly+'],
      ['CIENCE', 'High-Volume Scale', stars(3), yes, 'Long-Term'],
    ],
    foot: [
      ['Fastest setup', 'Mailshake'],
      ['Deepest personalization', 'Harvin &amp; Belkins'],
      ['Largest scale', 'CIENCE'],
    ],
  }),

  'lead-generation-companies-2026': table({
    eyebrow: 'Lead generation',
    title: 'Top 5 lead generation companies <em>for 2026</em>',
    cols: ['Provider', 'Best for', 'Channel focus', 'Minimum commitment', 'Deal size sweet spot'],
    widths: '1.25fr 1.15fr 1.15fr 0.95fr 1.1fr',
    rows: [
      ['Harvin', 'SaaS Outbound Pipeline', 'Email + LinkedIn', '3–4 Months', '<span class="pill">SaaS ACVs of all sizes</span>'],
      ['CIENCE', 'Enterprise Scale Outreach', 'Email + Phone + Social', '3 Months', '<span class="pill">Mid-Market &amp; Enterprise</span>'],
      ['Belkins', 'Personalized Enterprise Outreach', 'Email + LinkedIn', '3–6 Months', '<span class="pill">$10K+ Deals</span>'],
      ['Martal Group', 'Market Expansion', 'Multi-Channel + SDR Teams', '6 Months', '<span class="pill">$15K+ Deals</span>'],
      ['SalesRoads', 'Appointment Setting via Phone', 'Phone + Email Follow-Up', '3 Months', '<span class="pill">Complex B2B Sales</span>'],
    ],
    foot: [
      ['Best SaaS focus', 'Harvin'],
      ['Best enterprise scale', 'CIENCE'],
      ['Best personalization', 'Belkins'],
      ['Best market expansion', 'Martal'],
      ['Best phone outreach', 'SalesRoads'],
    ],
  }),

  'data-enrichment-tools-compared': table({
    eyebrow: 'Data enrichment',
    title: 'Top 5 data enrichment tools <em>compared</em>',
    cols: ['Provider', 'Primary use case', 'Data type strengths', 'CRM integrations', 'Best team size'],
    widths: '1.15fr 1.1fr 1.7fr 1.2fr 0.8fr',
    rows: [
      ['Harvin', 'SaaS Outbound Enrichment', tags(['Direct Emails', 'LinkedIn Data', 'Firmographics', 'ICP Lists']), list(['CRM-Agnostic Workflow']), '<strong>5–50 SDRs</strong>'],
      ['Clearbit', 'Inbound Lead Qualification', tags(['Firmographics', 'Revenue Data', 'Tech Stack']), list(['HubSpot', 'Salesforce']), '<strong>10–100 SDRs</strong>'],
      ['Apollo.io', 'Enrichment + Outreach', tags(['Contact Data', 'Emails', 'Phones', 'Intent Signals']), list(['Salesforce', 'HubSpot', 'Pipedrive']), '<strong>1–20 SDRs</strong>'],
      ['ZoomInfo', 'Enterprise Data Intelligence', tags(['Firmographics', 'Org Charts', 'Intent Data', 'Technographics']), list(['Enterprise Sales Stack Integrations']), '<strong>20+ SDRs</strong>'],
      ['Lusha', 'Phone &amp; LinkedIn Prospecting', tags(['Mobile Numbers', 'Emails', 'LinkedIn Contacts']), list(['Salesforce', 'HubSpot']), '<strong>1–15 SDRs</strong>'],
    ],
    foot: [],
  }),

  'waterfall-enrichment-engine': `
  <div class="fig">
    <p class="eyebrow">How it works</p>
    <h1>Waterfall <em>enrichment engine</em></h1>
    <p class="sub">Multiple sources. Cross-verified. High-quality contacts.</p>
    <div class="flow">
      <div class="sources">
        ${[
          ['Source 1', 'Premium Databases (e.g., ZoomInfo)', '1'],
          ['Source 2', 'Public &amp; Proprietary Web Data', '2'],
          ['Source 3', 'Community &amp; Partner Networks', '3'],
        ].map(([k, v, g]) => `<div class="node"><span class="g">${g}</span><span><small>${k}</small><b>${v}</b></span></div>`).join('')}
      </div>
      <svg class="lines" viewBox="0 0 120 300" preserveAspectRatio="none">
        <path d="M0 50 C60 50 60 150 120 150" /><path d="M0 150 L120 150" /><path d="M0 250 C60 250 60 150 120 150" />
      </svg>
      <div class="node center"><span class="g big">✓</span><small>Cross-verification</small><b>De-duplicate, validate, and verify across all sources</b></div>
      <svg class="lines short" viewBox="0 0 80 300" preserveAspectRatio="none"><path d="M0 150 L80 150" /></svg>
      <div class="node out">
        <small>Verified contact list</small>
        <b>Accurate, up-to-date, and ready for outreach</b>
        <ul>${['High Deliverability', 'Low Bounce Rates', 'Better Campaign Results'].map((t) => `<li>${yes}${t}</li>`).join('')}</ul>
      </div>
    </div>
  </div>`,
};

const CSS = `
@font-face{font-family:U;src:url(${FONT('74452ea3ef0f9101-s.p.woff2')});font-weight:400}
@font-face{font-family:U;src:url(${FONT('904ef0a86fe32a00-s.p.woff2')});font-weight:600}
*{box-sizing:border-box;margin:0}
body{width:1600px;font-family:U,system-ui,sans-serif;color:#232220;background:#F7F3EB}
.fig{padding:72px 80px 80px;background:#F7F3EB;position:relative;overflow:hidden}
.fig:before{content:'';position:absolute;inset:0;background:radial-gradient(45% 60% at 100% 0%,rgba(201,76,30,.12),transparent 70%)}
.fig>*{position:relative}
.eyebrow{display:flex;align-items:center;gap:12px;color:#C94C1E;font-size:17px;font-weight:600;letter-spacing:.14em;text-transform:uppercase}
.eyebrow:before{content:'';width:30px;height:2px;background:#C94C1E}
h1{margin-top:18px;font-family:'Instrument Sans';font-weight:600;font-size:56px;letter-spacing:-.025em;line-height:1.05;color:#0D0D0C}
h1 em{font-style:normal;color:#C94C1E}
.sub{margin-top:14px;font-size:22px;color:#6E6B63}
.table{margin-top:44px;border:1px solid #DDDCD8;border-radius:20px;overflow:hidden;background:#FDFBF6;box-shadow:0 4px 32px rgba(0,0,0,.06)}
.row{display:grid;grid-template-columns:var(--cols);align-items:center;border-top:1px solid #EEE8DB}
.row span{padding:22px 24px;font-size:19px;color:#4A4842}
.row.head{border-top:0;background:#232220}
.row.head span{color:rgba(255,255,255,.75);font-size:15px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;padding:18px 24px}
.row.hl{background:#FEF3EE;box-shadow:inset 4px 0 0 #C94C1E}
.prov{display:flex !important;align-items:center;gap:14px;font-weight:600;color:#0D0D0C !important;font-size:20px !important}
.mono{width:36px;height:36px;border-radius:9px;background:#EFEFED;color:#6E6B63;display:flex;align-items:center;justify-content:center;font-weight:600;font-size:16px;padding:0 !important}
.mark{width:36px;height:36px;object-fit:contain}
.stars{color:#C94C1E;letter-spacing:3px;font-size:22px}.stars i{color:#DDDCD8;font-style:normal}
.yes{display:inline-flex;width:30px;height:30px;border-radius:99px;background:#C94C1E;color:#fff;align-items:center;justify-content:center;font-size:16px;font-weight:700;padding:0 !important}
.muted{color:#9A978F;padding:0 !important}
.pill{display:inline-block;padding:7px 14px !important;border-radius:99px;background:#FEF3EE;border:1px solid #FBBA93;color:#A93D18 !important;font-size:16px !important;font-weight:600}
.tags{display:flex !important;flex-wrap:wrap;gap:8px}
.tags b{font-weight:600;font-size:14.5px;padding:6px 11px;border-radius:99px;background:#F7F3EB;border:1px solid #E0D7C5;color:#4A4842}
.hl .tags b{background:#fff;border-color:#FBBA93;color:#A93D18}
.list{display:flex !important;flex-direction:column;gap:6px}
.list em{font-style:normal;font-size:16.5px;padding-left:20px;position:relative}
.list em:before{content:'';position:absolute;left:0;top:7px;width:9px;height:9px;border-radius:99px;background:#C94C1E}
strong{font-weight:600;color:#0D0D0C;font-size:21px}
.hl strong{color:#C94C1E}
.foot{margin-top:24px;display:grid;grid-template-columns:repeat(var(--n),1fr);gap:1px;border-radius:16px;overflow:hidden;background:rgba(255,255,255,.08)}
.foot:empty{display:none}
.foot div{background:#0C0B09;padding:22px 26px}
.foot small{display:block;font-size:14px;color:rgba(255,255,255,.5);letter-spacing:.06em;text-transform:uppercase;font-weight:600}
.foot b{display:block;margin-top:6px;font-size:21px;font-weight:600;color:#F48E56}
.flow{margin-top:52px;display:flex;align-items:center}
.sources{display:flex;flex-direction:column;gap:24px;width:470px}
.node{background:#FDFBF6;border:1px solid #DDDCD8;border-radius:18px;padding:24px 26px;box-shadow:0 4px 32px rgba(0,0,0,.06)}
.sources .node{display:flex;align-items:center;gap:20px}
.node small{display:block;font-size:14px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:#C94C1E}
.node b{display:block;margin-top:6px;font-size:21px;font-weight:600;line-height:1.3;color:#0D0D0C}
.g{width:54px;height:54px;flex-shrink:0;border-radius:14px;background:#FEF3EE;color:#C94C1E;display:flex;align-items:center;justify-content:center;font-size:24px;font-weight:600}
.lines{width:120px;height:330px;flex-shrink:0}.lines.short{width:70px}
.lines path{fill:none;stroke:#E56B2C;stroke-width:2.5;stroke-dasharray:7 7;vector-effect:non-scaling-stroke}
.center{width:330px;text-align:center;background:#232220;border-color:#232220;color:#fff}
.center b{color:#fff}.center small{color:#F48E56;margin-top:16px}
.g.big{margin:0 auto;background:#C94C1E;color:#fff;border-radius:99px;width:64px;height:64px;font-size:30px}
.out{flex:1;border:2px solid #F48E56;box-shadow:0 0 0 6px rgba(201,76,30,.08),0 4px 32px rgba(0,0,0,.06)}
.out ul{list-style:none;padding:0;margin-top:18px;display:flex;flex-direction:column;gap:12px}
.out li{display:flex;align-items:center;gap:12px;font-size:19px;color:#4A4842}
`;

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await puppeteer.launch({ executablePath: CHROME });
  const page = await browser.newPage();
  await page.setViewport({ width: 1600, height: 900 });
  for (const [name, body] of Object.entries(FIGURES)) {
    await page.setContent(
      `<!doctype html><html><head><meta charset="utf-8"><link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@600&display=block" rel="stylesheet"><style>${CSS}</style></head><body>${body}</body></html>`,
      { waitUntil: 'load', timeout: 60000 },
    );
    await page.evaluate(() => document.fonts.ready);
    const el = await page.$('.fig');
    const png = await el.screenshot({ type: 'png' });
    await sharp(png).webp({ quality: 88 }).toFile(path.join(OUT, name + '.webp'));
    console.log('✓', name);
  }
  await browser.close();
})();
