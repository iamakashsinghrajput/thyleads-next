/**
 * Renders the blog cover images (public/blogs/covers/<slug>.webp) in the
 * Harvin look: warm black ground, ember accents, the Harvin logo, Instrument
 * Sans headline and a small product-style illustration per topic.
 *
 *   node scripts/blog-covers.js            (needs network for Google Fonts)
 *
 * Edit COVERS below to change a headline or illustration, then re-run.
 */
const path = require('path');
const fs = require('fs');
const puppeteer = require('puppeteer');
const sharp = require('sharp');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'public/blogs/covers');
const CHROME = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const b64 = (f) => 'data:image/png;base64,' + fs.readFileSync(path.join(ROOT, 'public', f)).toString('base64');
const LOGO = b64('harvin-logo-light.png');
const LOGO_DARK = b64('harvin-logo.png');
const FONT = (f) => 'file://' + path.join(ROOT, 'public/fonts/universalfont', f);

/* ── illustration helpers (return HTML for the right-hand window) ───────── */
const bar = (w, c = '#E7E1D4', h = 10) => `<span class="bar" style="width:${w}px;height:${h}px;background:${c}"></span>`;
const pill = (t, tone = 'ember') => `<span class="pill ${tone}">${t}</span>`;
const check = `<span class="chk">✓</span>`;
const MAIL = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg>`;

const win = (title, body, right = '') => `
  <div class="win">
    <div class="win-h"><i></i><i></i><i></i><span>${title}</span><em>${right}</em></div>
    <div class="win-b">${body}</div>
  </div>`;

function ranking(title, metric, scores) {
  const rows = scores.map((s, i) => `
    <div class="rank ${i === 0 ? 'top' : ''}">
      <span class="no">${i + 1}</span>
      <span class="mono-l"></span>
      <span style="flex:1">${bar(150 - i * 14, i === 0 ? '#3A2A20' : '#D9D2C3', 11)}<br>${bar(96 - i * 8, '#ECE6DA', 8)}</span>
      <span class="meter"><span style="width:${s}%"></span></span>
      <b>${s}</b>
    </div>`).join('');
  return win(title, `<div class="cap"><span>Provider</span><span>${metric}</span></div>${rows}`, pill('Compared', 'slate'));
}

const ILL = {
  intent: () => ranking('Intent data providers', 'Signal strength', [94, 88, 81, 76, 70, 63, 58]),
  leadgen: () => ranking('Lead generation partners', 'Pipeline score', [92, 85, 79, 72, 66]),
  email: () => win('Sequence · Q3 outbound', `
    ${[['Step 1', 'Intro', '68%', '12%'], ['Step 2', 'Case study', '61%', '9%'], ['Step 3', 'Signal follow-up', '57%', '14%'], ['Step 4', 'Break-up', '49%', '7%']].map(([s, n, o, r], i) => `
      <div class="seq ${i === 2 ? 'hot' : ''}"><span class="env">${MAIL}</span><span style="flex:1"><small>${s}</small><br><b>${n}</b></span>
      <span class="kv"><small>Opened</small><b>${o}</b></span><span class="kv"><small>Replied</small><b>${r}</b></span></div>`).join('')}
    <div class="reply"><span class="av">PS</span><span style="flex:1"><b>Priya S.</b> replied<br><small>“Timing is good — can we talk Thursday?”</small></span>${pill('Interested', 'green')}</div>`, pill('Live', 'green')),
  enrich: () => win('Contact record', `
    <div class="person"><span class="av lg">AR</span><span><b class="big">Arjun Rao</b><br><small>Head of Sales · Initech Systems</small></span></div>
    ${[['Work email', 'arjun@initech.io'], ['Direct dial', '+91 98450 ••• 21'], ['LinkedIn', '/in/arjunrao'], ['Company size', '201–500'], ['Tech stack', 'Salesforce · Outreach']].map(([k, v]) => `
      <div class="field"><small>${k}</small><span class="v">${v}</span>${check}</div>`).join('')}
    <div class="cov"><small>Profile completeness</small><span class="meter wide"><span style="width:96%"></span></span><b>96%</b></div>`, pill('Enriched', 'green')),
  calendar: () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
    const blocks = [[0, 1, 'g'], [0, 4, 'e'], [1, 0, 'e'], [1, 3, 'g'], [2, 2, 'e'], [2, 5, 'e'], [3, 1, 'g'], [3, 3, 'e'], [4, 0, 'e'], [4, 4, 'g']];
    return win('Meetings booked · This week', `
      <div class="cal">${days.map((d, c) => `<div class="col"><small>${d}</small>${[0, 1, 2, 3, 4, 5].map((r) => {
        const b = blocks.find(([x, y]) => x === c && y === r);
        return `<span class="slot ${b ? 'b-' + b[2] : ''}">${b ? (b[2] === 'e' ? 'Discovery' : 'Demo') : ''}</span>`;
      }).join('')}</div>`).join('')}</div>
      <div class="cap" style="margin-top:18px"><span>10 meetings booked</span><span style="color:#C94C1E">+4 vs last week</span></div>`, pill('Synced', 'green'));
  },
  hiring: () => win('Hiring signals · Last 30 days', `
    ${[['Initech Systems', 'VP Sales, EMEA', 'Expansion', 'ember'], ['Northwind Analytics', '6 × SDR roles', 'Team build-out', 'amber'], ['Globex Cloud', 'Head of RevOps', 'New process owner', 'ember'], ['Umbrella Health', 'Country Manager, India', 'New market', 'green']].map(([c, r, t, tone], i) => `
      <div class="job"><span class="mono-l">${c[0]}</span><span style="flex:1"><b>${c}</b><br><small>Hiring · ${r}</small></span>${pill(t, tone)}</div>`).join('')}`, pill('4 new', 'ember')),
  waterfall: () => win('Waterfall enrichment', `
    ${[['Provider 1', 38], ['+ Provider 2', 62], ['+ Provider 3', 81], ['+ Provider 4', 94]].map(([n, v], i) => `
      <div class="wf" style="margin-left:${i * 26}px"><small>${n}</small><span class="meter wide"><span style="width:${v}%;opacity:${0.55 + i * 0.15}"></span></span><b>${v}%</b></div>`).join('')}
    <div class="cov" style="margin-top:22px"><small>Email coverage</small><b class="big ember">38% → 94%</b></div>`, pill('4 sources', 'slate')),
  reddit: () => win('r/sales · Hot', `
    ${[['412', 'How are you finding accounts that are actually in-market?', '86 comments'], ['268', 'Cold email is dead? Here is what replaced it for us', '54 comments'], ['193', 'Best way to research a prospect in 5 minutes', '31 comments']].map(([v, t, c], i) => `
      <div class="thread ${i === 0 ? 'hot' : ''}"><span class="vote">▲<b>${v}</b></span><span style="flex:1"><b>${t}</b><br><small>${c} · ${pill(i === 0 ? 'Buying intent' : 'Discussion', i === 0 ? 'ember' : 'slate')}</small></span></div>`).join('')}`, pill('3 leads', 'green')),
  campaigns: () => win('Outbound campaigns', `
    <div class="tiles">${[['Funding', '14%'], ['Hiring', '11%'], ['New exec', '17%'], ['Tech change', '9%'], ['Expansion', '12%'], ['Competitor', '8%'], ['Event', '10%'], ['Content', '7%'], ['Review', '9%'], ['Lookalike', '13%']].map(([n, r], i) => `
      <div class="tile ${i === 2 ? 'hot' : ''}"><small>${String(i + 1).padStart(2, '0')}</small><b>${n}</b><span>${r}<i> reply</i></span></div>`).join('')}</div>`, pill('10 live', 'green')),
  retail: () => win('US RetailTech · Pipeline', chart([22, 30, 28, 41, 47, 45, 58, 66, 72, 84], ['Q1', 'Q2', 'Q3', 'Q4'], '$4.2M', 'Pipeline sourced')),
  martech: () => win('India martech · Market size', bars([[`'22`, 38], [`'23`, 47], [`'24`, 59], [`'25`, 72], [`'26`, 92]], 4, '2.4×', 'Growth since 2022'), pill('2026', 'ember')),
  lessons: () => win('What actually works', `
    ${['Lead with the signal, not the pitch', 'Three lines beat three paragraphs', 'Follow up with something new', 'Call the accounts that opened twice', 'Ask one question, not five'].map((t, i) => `
      <div class="lesson"><span class="no">${String(i + 1).padStart(2, '0')}</span><span style="flex:1">${t}</span>${check}</div>`).join('')}
    <div class="cap" style="margin-top:14px"><span>+ 5 more lessons</span><span></span></div>`, pill('2024', 'slate')),
  automation: () => win('Workflow · News-triggered outreach', `
    <div class="flow">${[['RSS', 'News feed', 'Funding announced'], ['+', 'Enrich', 'Contact + context'], ['92', 'Score', 'Fit 92 · Intent high'], [MAIL, 'Send', 'Personalised email']].map(([g, t, s], i) => `
      <div class="node ${i === 3 ? 'hot' : ''}"><span class="glyph">${g}</span><span><b>${t}</b><br><small>${s}</small></span></div>${i < 3 ? '<span class="arrow"></span>' : ''}`).join('')}</div>`, pill('Running', 'green')),
  india: () => win('Pipeline from zero', `
    <div class="path">${[['Pick ICP', 'Mid-market SaaS'], ['Find accounts', '1,200 matched'], ['Engage', '18% reply rate'], ['Pipeline', '₹3.1 Cr sourced']].map(([t, s], i) => `
      <div class="step"><span class="dot ${i === 3 ? 'on' : ''}">${i + 1}</span><span><b>${t}</b><br><small>${s}</small></span></div>`).join('')}</div>`, pill('India', 'ember')),
  versus: () => win('Cost & performance · India', `
    <div class="vs"><div class="side"><small>Outsourced SDR</small>${[['Ramp time', '2 wks'], ['Monthly cost', '₹2.8L'], ['Meetings / mo', '14']].map(([k, v]) => `<div class="kv2"><span>${k}</span><b>${v}</b></div>`).join('')}</div>
    <div class="vsb">VS</div>
    <div class="side hot"><small>In-house team</small>${[['Ramp time', '3 mo'], ['Monthly cost', '₹4.5L'], ['Meetings / mo', '18']].map(([k, v]) => `<div class="kv2"><span>${k}</span><b>${v}</b></div>`).join('')}</div></div>`, pill('Compared', 'slate')),
  fintech: () => win('Enterprise deal · Northwind Bank', `
    <div class="stages">${['Discovery', 'Security', 'Pilot', 'Procurement', 'Signed'].map((s, i) => `<div class="stage ${i < 4 ? 'done' : ''} ${i === 3 ? 'now' : ''}"><span></span><small>${s}</small></div>`).join('')}</div>
    ${[['CISO sign-off', 'Security review passed'], ['Pilot results', '32% faster onboarding'], ['Champion', 'VP Digital Banking']].map(([k, v]) => `<div class="field"><small>${k}</small><span class="v">${v}</span>${check}</div>`).join('')}
    <div class="cov"><small>Deal value</small><b class="big ember">₹1.8 Cr ARR</b></div>`, pill('Late stage', 'ember')),
};

function chart(pts, labels, big, cap) {
  const W = 520, H = 230, max = Math.max(...pts) * 1.1;
  const xy = pts.map((v, i) => [Math.round((i / (pts.length - 1)) * W), Math.round(H - (v / max) * H)]);
  const line = xy.map((p) => p.join(',')).join(' ');
  return `<div class="cov"><small>${cap}</small><b class="big ember">${big}</b></div>
    <svg width="${W}" height="${H + 10}" viewBox="0 -5 ${W} ${H + 10}" style="margin-top:14px;overflow:visible">
      <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#C94C1E" stop-opacity=".28"/><stop offset="1" stop-color="#C94C1E" stop-opacity="0"/></linearGradient></defs>
      ${[0, 1, 2, 3].map((i) => `<line x1="0" x2="${W}" y1="${(H / 3) * i}" y2="${(H / 3) * i}" stroke="#E7E1D4" stroke-dasharray="4 6"/>`).join('')}
      <polygon points="0,${H} ${line} ${W},${H}" fill="url(#g)"/>
      <polyline points="${line}" fill="none" stroke="#C94C1E" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"/>
      <circle cx="${xy.at(-1)[0]}" cy="${xy.at(-1)[1]}" r="9" fill="#fff" stroke="#C94C1E" stroke-width="4"/>
    </svg>
    <div class="cap" style="margin-top:8px">${labels.map((l) => `<span>${l}</span>`).join('')}</div>`;
}

function bars(data, hot, big, cap) {
  return `<div class="cov"><small>${cap}</small><b class="big ember">${big}</b></div>
    <div class="bars">${data.map(([l, v], i) => `<div><span class="${i === hot ? 'hot' : ''}" style="height:${v * 2.4}px"></span><small>${l}</small></div>`).join('')}</div>`;
}

/* ── one entry per post (slug must match data/blogs.ts) ──────────────────
   [slug, category, headline (<em> = ember), subline, illustration, layout]
   Layouts — same palette, different composition, rotated so neighbouring
   cards on /blog never match:
     side   dark, text left, window right
     stage  dark, centred headline, window rising from the bottom edge
     sand   light sand ground, window tilted on a dark offset card
     ember  ember gradient ground, logo on a white pill, tilted window
     bleed  dark, oversized window bleeding off the bottom-left, text right */
const COVERS = [
  ['7-best-intent-data-providers-that-sales-teams-trust-in-2026', 'Sales Intelligence', '7 best <em>intent data</em> providers', 'What sales teams trust in 2026', 'intent', 'stage'],
  ['5-best-email-outreach-service-providers-2026-edition', 'Email Outreach', '5 best <em>email outreach</em> service providers', '2026 edition, compared', 'email', 'sand'],
  ['top-5-lead-generation-companies-for-2026', 'Lead Generation', 'Top 5 <em>lead generation</em> companies', 'Who to shortlist for 2026', 'leadgen', 'ember'],
  ['5-best-data-enrichment-service-providers-2026-edition', 'Data Enrichment', '5 best <em>data enrichment</em> providers', '2026 edition, compared', 'enrich', 'bleed'],
  ['5-best-appointment-scheduling-service-agencies-2026', 'Appointment Setting', '5 best <em>appointment setting</em> agencies', '2026 edition, compared', 'calendar', 'side'],
  ['every-job-posting-hiring-signals-gtm-pro', 'GTM Strategy', 'Every job posting is a <em>hiring signal</em>', 'Read them like a GTM pro', 'hiring', 'sand'],
  ['waterfall-enrichment-2026-playbook', 'Data Enrichment', '<em>Waterfall</em> enrichment', 'The playbook for maximum lead coverage', 'waterfall', 'stage'],
  ['reddit-for-b2b-lead-generation-untapped-goldmine', 'Lead Generation', 'Reddit for <em>B2B lead generation</em>', 'The untapped goldmine', 'reddit', 'ember'],
  ['10-data-driven-outbound-campaigns-gtm-strategy', 'Outbound Sales', '10 data-driven <em>outbound campaigns</em>', 'To sharpen your GTM strategy', 'campaigns', 'bleed'],
  ['winning-in-us-retailtech-2024', 'Industry Insights', 'Winning in <em>US RetailTech</em>', 'A data-driven playbook', 'retail', 'sand'],
  ['10-hard-earned-outreach-lessons-2024', 'Outreach', '10 hard-earned <em>outreach lessons</em>', 'What actually works', 'lessons', 'side'],
  ['ultimate-guide-automated-hyper-targeted-outreach-clay-rss', 'Automation', 'Automated, <em>hyper-targeted</em> outreach', 'Using Clay and RSS feeds', 'automation', 'ember'],
  ['india-gtm-playbook-how-saas-companies-like-clevertap-and-vwo-built-pipeline-from-zero', 'GTM Strategy', 'The <em>India GTM</em> playbook', 'How SaaS companies built pipeline from zero', 'india', 'bleed'],
  ['outsourced-sdr-vs-in-house-sales-team-in-india-cost-and-performance-comparison', 'Outbound Sales', 'Outsourced SDR <em>vs in-house</em>', 'Cost and performance in India', 'versus', 'stage'],
  ['how-fintech-saas-companies-are-winning-enterprise-deals-in-india', 'Lead Generation', 'How fintech SaaS wins <em>enterprise deals</em>', 'Lessons from India', 'fintech', 'sand'],
  ['the-martech-opportunity-in-india-why-2026-is-the-year-to-move', 'Lead Generation', 'The <em>martech opportunity</em> in India', 'Why 2026 is the year to move', 'martech', 'side'],
];

const CSS = `
@font-face{font-family:U;src:url(${FONT('74452ea3ef0f9101-s.p.woff2')});font-weight:400}
@font-face{font-family:U;src:url(${FONT('904ef0a86fe32a00-s.p.woff2')});font-weight:600}
*{box-sizing:border-box;margin:0}
body{width:1600px;height:900px;overflow:hidden;font-family:U,system-ui,sans-serif;color:#232220}
.cover{position:relative;width:1600px;height:900px;background:#0C0B09;overflow:hidden}
.glow{position:absolute;inset:0;background:
  radial-gradient(55% 75% at 100% 100%,rgba(201,76,30,.42),transparent 70%),
  radial-gradient(40% 50% at 0% 0%,rgba(201,76,30,.16),transparent 70%)}
.grid{position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.035) 1px,transparent 1px);background-size:56px 56px;-webkit-mask-image:radial-gradient(70% 80% at 30% 50%,#000,transparent)}
.left{position:absolute;left:104px;top:96px;bottom:96px;width:720px;display:flex;flex-direction:column}
.logo{height:42px;width:auto;align-self:flex-start}
.eyebrow{margin-top:auto;display:inline-flex;align-items:center;gap:12px;color:#F48E56;font-size:20px;font-weight:600;letter-spacing:.14em;text-transform:uppercase}
.eyebrow:before{content:'';width:34px;height:2px;background:#E56B2C}
h1{margin-top:26px;font-family:'Instrument Sans';font-weight:600;font-size:76px;line-height:1.04;letter-spacing:-.025em;color:#fff}
h1 em{font-style:normal;color:#E56B2C}
.sub{margin-top:26px;font-size:28px;color:rgba(255,255,255,.55)}
.foot{margin-top:auto;display:flex;align-items:center;gap:14px;font-size:18px;color:rgba(255,255,255,.35)}
.foot span{width:8px;height:8px;border-radius:99px;background:#C94C1E}
.right{position:absolute;right:88px;top:50%;transform:translateY(-50%);width:620px}
.win{background:#FDFBF6;border-radius:22px;box-shadow:0 0 0 1px rgba(255,255,255,.08),0 30px 80px rgba(0,0,0,.55),0 0 120px rgba(201,76,30,.18);overflow:hidden}
.win-h{display:flex;align-items:center;gap:8px;padding:18px 24px;border-bottom:1px solid #EEE8DB;background:#F7F3EB}
.win-h i{width:11px;height:11px;border-radius:99px;background:#E0D7C5}
.win-h span{margin-left:10px;font-size:17px;font-weight:600;color:#343330}
.win-h em{margin-left:auto;font-style:normal}
.win-b{padding:24px}
small{font-size:14px;color:#9A978F}
b{font-weight:600}
.bar{display:inline-block;border-radius:99px}
.pill{display:inline-flex;align-items:center;padding:5px 12px;border-radius:99px;font-size:13.5px;font-weight:600;white-space:nowrap}
.pill.ember{background:#FEF3EE;color:#C94C1E;box-shadow:inset 0 0 0 1px #FBBA93}
.pill.green{background:#ECFDF5;color:#047857;box-shadow:inset 0 0 0 1px #A7F3D0}
.pill.amber{background:#FFFBEB;color:#B45309;box-shadow:inset 0 0 0 1px #FDE68A}
.pill.slate{background:#EFEFED;color:#6E6B63}
.chk{width:24px;height:24px;border-radius:99px;background:#10B981;color:#fff;font-size:13px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.cap{display:flex;justify-content:space-between;font-size:14px;color:#9A978F;padding:0 4px 10px}
.rank{display:flex;align-items:center;gap:14px;padding:11px 12px;border-radius:12px}
.rank+.rank{margin-top:4px}
.rank.top{background:#FEF3EE;box-shadow:inset 0 0 0 1.5px #F48E56}
.rank .no{width:30px;height:30px;border-radius:9px;background:#EFEFED;color:#6E6B63;font-weight:600;font-size:15px;display:flex;align-items:center;justify-content:center}
.rank.top .no{background:#C94C1E;color:#fff}
.mono-l{width:38px;height:38px;border-radius:10px;background:#232220;color:#fff;font-weight:600;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.rank:not(.top) .mono-l{background:#DDDCD8}
.meter{width:120px;height:9px;border-radius:99px;background:#EEE8DB;overflow:hidden;display:inline-block}
.meter.wide{flex:1;width:auto}
.meter span{display:block;height:100%;background:linear-gradient(90deg,#F48E56,#C94C1E);border-radius:99px}
.rank b{width:30px;text-align:right;font-size:16px;color:#343330}
.seq{display:flex;align-items:center;gap:16px;padding:14px 16px;border-radius:12px;border:1px solid #EEE8DB;background:#fff}
.seq+.seq{margin-top:10px}
.seq.hot{box-shadow:inset 0 0 0 1.5px #F48E56;background:#FEF3EE}
.env{width:38px;height:38px;border-radius:10px;background:#F7F3EB;color:#C94C1E;display:flex;align-items:center;justify-content:center;font-size:18px}
.kv{text-align:right;min-width:72px}.kv b{display:block;font-size:19px}
.reply{display:flex;align-items:center;gap:14px;margin-top:16px;padding:16px;border-radius:12px;background:#232220;color:#fff}
.reply small{color:rgba(255,255,255,.6)}
.av{width:38px;height:38px;border-radius:99px;background:#E56B2C;color:#fff;font-weight:600;font-size:14px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.av.lg{width:58px;height:58px;font-size:19px}
.person{display:flex;align-items:center;gap:16px;padding-bottom:18px;border-bottom:1px solid #EEE8DB;margin-bottom:8px}
.big{font-size:24px}.ember{color:#C94C1E}
.field{display:flex;align-items:center;gap:14px;padding:11px 4px;border-bottom:1px dashed #EEE8DB;font-size:16px}
.field small{width:140px}.field .v{flex:1;color:#343330;font-weight:600}
.cov{display:flex;align-items:center;gap:16px;margin-top:16px}
.cov small{white-space:nowrap}.cov .big{margin-left:auto}
.cal{display:grid;grid-template-columns:repeat(5,1fr);gap:10px}
.col{display:flex;flex-direction:column;gap:8px}.col small{text-align:center;padding-bottom:4px}
.slot{height:52px;border-radius:9px;background:#F7F3EB;font-size:13px;font-weight:600;padding:8px 9px}
.b-e{background:#C94C1E;color:#fff}.b-g{background:#FEF3EE;color:#C94C1E;box-shadow:inset 3px 0 0 #E56B2C}
.job,.thread{display:flex;align-items:center;gap:14px;padding:14px;border-radius:12px;border:1px solid #EEE8DB;background:#fff;font-size:16px}
.job+.job,.thread+.thread{margin-top:10px}
.thread.hot{box-shadow:inset 0 0 0 1.5px #F48E56;background:#FEF3EE}
.thread b{font-size:16.5px;line-height:1.35}
.thread small .pill{margin-left:6px;padding:2px 9px;font-size:12px}
.vote{display:flex;flex-direction:column;align-items:center;color:#C94C1E;font-size:15px;min-width:52px}.vote b{color:#343330;font-size:16px}
.wf{display:flex;align-items:center;gap:14px;padding:12px 0}.wf small{width:120px}.wf b{width:52px;text-align:right;font-size:18px}
.tiles{display:grid;grid-template-columns:repeat(5,1fr);gap:10px}
.tile{border-radius:12px;border:1px solid #EEE8DB;background:#fff;padding:12px;height:118px;display:flex;flex-direction:column}
.tile b{font-size:15px;margin-top:6px;line-height:1.2}.tile span{margin-top:auto;font-size:22px;font-weight:600;color:#343330}.tile i{font-style:normal;font-size:12px;color:#9A978F}
.tile.hot{background:#C94C1E;border-color:#C94C1E}.tile.hot *{color:#fff!important}
.bars{display:flex;align-items:flex-end;gap:22px;height:250px;margin-top:20px;padding:0 10px}
.bars div{flex:1;display:flex;flex-direction:column;align-items:center;gap:10px}
.bars span{width:100%;border-radius:10px 10px 4px 4px;background:#EEE8DB}.bars span.hot{background:linear-gradient(#E56B2C,#C94C1E)}
.lesson{display:flex;align-items:center;gap:16px;padding:13px 6px;border-bottom:1px solid #EEE8DB;font-size:17.5px;font-weight:600;color:#343330}
.lesson .no{font-family:monospace;color:#C94C1E;font-size:15px}
.flow{display:flex;flex-direction:column;align-items:stretch}
.node{display:flex;align-items:center;gap:16px;padding:14px 16px;border-radius:12px;border:1px solid #EEE8DB;background:#fff;font-size:16.5px}
.node.hot{background:#232220;border-color:#232220;color:#fff}.node.hot small{color:rgba(255,255,255,.6)}
.glyph{width:42px;height:42px;border-radius:10px;background:#FEF3EE;color:#C94C1E;font-weight:700;font-size:15px;display:flex;align-items:center;justify-content:center}
.node.hot .glyph{background:#C94C1E;color:#fff}
.arrow{align-self:center;width:2px;height:22px;background:#E56B2C;position:relative}
.arrow:after{content:'';position:absolute;left:-5px;bottom:-2px;border:6px solid transparent;border-top-color:#E56B2C}
.path{position:relative;padding-left:4px}
.path:before{content:'';position:absolute;left:25px;top:30px;bottom:30px;border-left:2.5px dashed #F48E56}
.step{position:relative;display:flex;align-items:center;gap:20px;padding:16px 0;font-size:18px}
.step small{font-size:15px}
.dot{width:44px;height:44px;border-radius:99px;background:#fff;border:2.5px solid #F48E56;color:#C94C1E;font-weight:600;display:flex;align-items:center;justify-content:center;z-index:1}
.dot.on{background:#C94C1E;border-color:#C94C1E;color:#fff;box-shadow:0 0 0 8px rgba(201,76,30,.15)}
.vs{display:flex;align-items:stretch;gap:14px}
.side{flex:1;border-radius:14px;border:1px solid #EEE8DB;background:#fff;padding:18px}
.side.hot{background:#232220;border-color:#232220}.side.hot small{color:#F48E56}.side.hot .kv2{color:#fff;border-color:rgba(255,255,255,.1)}
.side small{font-weight:600;font-size:15px;color:#C94C1E}
.kv2{display:flex;justify-content:space-between;padding:13px 0;border-bottom:1px solid #EEE8DB;font-size:16px}
.kv2:last-child{border:0}.kv2 b{font-size:19px}
.vsb{align-self:center;width:44px;height:44px;border-radius:99px;background:#C94C1E;color:#fff;font-weight:700;font-size:14px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.stages{display:flex;gap:8px;margin-bottom:12px}
.stage{flex:1;display:flex;flex-direction:column;gap:8px}
.stage span{height:8px;border-radius:99px;background:#EEE8DB}.stage.done span{background:#E56B2C}.stage.now span{background:#C94C1E;box-shadow:0 0 0 4px rgba(201,76,30,.18)}
.stage.now small{color:#C94C1E;font-weight:600}
`;

const LAYOUT_CSS = `
/* stage */
.L-stage .glow{background:radial-gradient(60% 70% at 50% 100%,rgba(201,76,30,.5),transparent 70%),radial-gradient(30% 40% at 50% 0%,rgba(201,76,30,.12),transparent 70%)}
.L-stage .left{left:0;right:0;top:72px;bottom:auto;width:auto;align-items:center;text-align:center}
.L-stage .logo{align-self:center}
.L-stage .eyebrow{margin-top:40px}
.L-stage h1{font-size:68px;margin-top:18px;max-width:1300px}
.L-stage .sub{margin-top:14px;font-size:24px}
.L-stage .foot{display:none}
.L-stage .right{left:50%;right:auto;top:452px;transform:translateX(-50%) scale(1.22);transform-origin:top center}
/* sand */
.L-sand .cover,.cover.L-sand{background:#F7F3EB}
.L-sand .glow{background:radial-gradient(50% 70% at 100% 100%,rgba(201,76,30,.2),transparent 70%)}
.L-sand .grid{background-image:linear-gradient(rgba(35,34,32,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(35,34,32,.05) 1px,transparent 1px)}
.L-sand h1{color:#232220}
.L-sand .eyebrow{color:#C94C1E}.L-sand .eyebrow:before{background:#C94C1E}
.L-sand .sub{color:#6E6B63}.L-sand .foot{color:#9A978F}
.L-sand .right{transform:translateY(-50%) rotate(-3deg)}
.L-sand .right:before{content:'';position:absolute;inset:0;border-radius:22px;background:#232220;transform:translate(26px,26px)}
.L-sand .win{position:relative;box-shadow:0 0 0 1px #E0D7C5,0 24px 60px rgba(35,34,32,.18)}
/* ember */
.cover.L-ember{background:linear-gradient(135deg,#E56B2C 0%,#C94C1E 45%,#832F13 100%)}
.L-ember .glow{background:radial-gradient(55% 70% at 100% 100%,rgba(12,11,9,.45),transparent 70%)}
.L-ember .grid{background-image:linear-gradient(rgba(255,255,255,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.08) 1px,transparent 1px)}
.logo-pill{align-self:flex-start;background:#fff;border-radius:14px;padding:12px 18px;box-shadow:0 8px 24px rgba(61,22,10,.25)}
.logo-pill img{height:34px;display:block}
.L-ember h1 em{color:#3D160A}
.L-ember .eyebrow{color:#FDDECB}.L-ember .eyebrow:before{background:#FDDECB}
.L-ember .sub{color:rgba(255,255,255,.78)}.L-ember .foot{color:rgba(255,255,255,.6)}.L-ember .foot span{background:#fff}
.L-ember .right{transform:translateY(-50%) rotate(3deg)}
.L-ember .right:before{content:'';position:absolute;inset:0;border-radius:22px;background:rgba(255,255,255,.16);border:1px solid rgba(255,255,255,.25);transform:rotate(-6deg) translate(-30px,10px)}
.L-ember .win{position:relative;box-shadow:0 30px 80px rgba(61,22,10,.45)}
/* bleed */
.L-bleed .glow{background:radial-gradient(55% 75% at 0% 100%,rgba(201,76,30,.45),transparent 70%),radial-gradient(35% 45% at 100% 0%,rgba(201,76,30,.14),transparent 70%)}
.L-bleed .left{left:auto;right:88px;width:560px}
.L-bleed h1{font-size:62px}
.L-bleed .right{left:84px;right:auto;top:auto;bottom:-70px;transform:scale(1.18);transform-origin:bottom left}
`;

const html = ([, cat, title, sub, ill, layout]) => `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@600&display=block" rel="stylesheet">
<style>${CSS}${LAYOUT_CSS}</style></head><body><div class="cover L-${layout}"><div class="glow"></div><div class="grid"></div>
<div class="left">${layout === 'ember' ? `<span class="logo-pill"><img src="${LOGO_DARK}"></span>` : `<img class="logo" src="${layout === 'sand' ? LOGO_DARK : LOGO}">`}<p class="eyebrow">${cat}</p><h1>${title}</h1><p class="sub">${sub}</p>
<p class="foot"><span></span>harvin.ai/blog</p></div>
<div class="right">${ILL[ill]()}</div></div></body></html>`;

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const only = process.argv[2];
  const browser = await puppeteer.launch({ executablePath: CHROME });
  const page = await browser.newPage();
  await page.setViewport({ width: 1600, height: 900 });
  for (const c of COVERS) {
    if (only && c[0] !== only) continue;
    await page.setContent(html(c), { waitUntil: 'load', timeout: 60000 });
    await page.evaluate(() => document.fonts.ready);
    const png = await page.screenshot({ type: 'png' });
    await sharp(png).webp({ quality: 86 }).toFile(path.join(OUT, c[0] + '.webp'));
    console.log('✓', c[0]);
  }
  await browser.close();
})();
