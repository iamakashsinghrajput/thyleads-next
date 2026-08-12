#!/usr/bin/env node
// ── Local on-demand enrich ─────────────────────────────────────────────────
// Runs the existing Harvin scanner (lib/scan/scanSingleUrl) for ONE domain and
// prints its category / sub-category / region. Local-only: it loads .env.local
// for the classifier API keys but strips MONGO_URI first, so the scanner's cache
// falls back to in-memory and NOTHING is written to the Harvin database.
//
// Optionally appends the result to a local CSV with --save.
//
// Usage:
//   node scripts/enrich-domain.js mamaearth.in
//   node scripts/enrich-domain.js https://www.nike.com/ --save data/enriched.csv
//   node scripts/enrich-domain.js zomato.com --json

const path = require('path');
const fs = require('fs');

// Load classifier keys but force the scanner off the real DB (in-memory cache).
try { require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') }); } catch {}
delete process.env.MONGO_URI;
delete process.env.MONGO_URL;

const { scanSingleUrl } = require('../lib/scan/scan');

function normalizeDomain(raw) {
  return String(raw || '')
    .trim()
    .replace(/^https?:\/\//i, '')
    .replace(/^www\d*\./i, '')
    .replace(/\/.*$/, '')
    .toLowerCase()
    .replace(/[,\s]+/g, '');
}

function parseArgs(argv) {
  const rest = argv.slice(2);
  let query = null;
  const opts = { save: null, json: false, force: false };
  for (let i = 0; i < rest.length; i++) {
    const a = rest[i];
    if (a === '--save') opts.save = rest[++i];
    else if (a === '--json') opts.json = true;
    else if (a === '--force') opts.force = true;
    else if (!a.startsWith('--')) query = a;
  }
  return { query, opts };
}

function csvCell(v) {
  const s = String(v == null ? '' : v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

async function main() {
  const { query, opts } = parseArgs(process.argv);
  if (!query) { console.error('Usage: node scripts/enrich-domain.js <domain> [--save file] [--json] [--force]'); process.exit(2); }

  const domain = normalizeDomain(query);
  const result = await scanSingleUrl(domain, { forceRefresh: opts.force });

  // scanSingleUrl returns { url, technologies, count, companyMeta:{ category, subCategory, region, ... } }
  const meta = result.companyMeta || {};
  const row = {
    domain,
    category: meta.category || 'Unknown',
    subCategory: meta.subCategory || 'General',
    region: meta.region || 'Global',
    offlineStores: meta.offlineStores ?? '',
    businessModel: meta.businessModel ?? '',
    appPresence: meta.appPresence ?? '',
    technologies: typeof result.count === 'number' ? result.count : (Array.isArray(result.technologies) ? result.technologies.length : ''),
    blocked: result.blocked ? 'yes' : '',
  };

  if (opts.json) {
    console.log(JSON.stringify(result, null, 2));
  } else {
    console.log(`domain:        ${row.domain}`);
    console.log(`category:      ${row.category}`);
    console.log(`subCategory:   ${row.subCategory}`);
    console.log(`region:        ${row.region}`);
    if (row.offlineStores !== '') console.log(`offlineStores: ${row.offlineStores}`);
    if (row.businessModel !== '') console.log(`businessModel: ${row.businessModel}`);
    if (row.appPresence !== '')   console.log(`appPresence:   ${row.appPresence}`);
    if (row.technologies !== '')  console.log(`technologies:  ${row.technologies}`);
    if (row.blocked)              console.log(`blocked:       yes (site has bot protection — use the extension for full results)`);
  }

  if (opts.save) {
    const outPath = path.resolve(opts.save);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    const header = 'domain,category,subCategory,region,offlineStores,businessModel,appPresence,technologies\n';
    if (!fs.existsSync(outPath)) fs.writeFileSync(outPath, header);
    const line = [row.domain, row.category, row.subCategory, row.region, row.offlineStores, row.businessModel, row.appPresence, row.technologies]
      .map(csvCell).join(',') + '\n';
    fs.appendFileSync(outPath, line);
    console.log(`\nsaved → ${outPath}`);
  }

  process.exit(0);
}

main().catch(err => { console.error(err.message || err); process.exit(1); });
