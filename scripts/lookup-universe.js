#!/usr/bin/env node
// ── Local universe lookup ──────────────────────────────────────────────────
// Checks whether a company/domain exists in the local global-universe file.
// No database — streams the local CSV/NDJSON produced by ingest-global-universe.js.
//
// Usage:
//   node scripts/lookup-universe.js nike.com
//   node scripts/lookup-universe.js https://www.mamaearth.in/
//   node scripts/lookup-universe.js zomato --file data/global-universe.csv
//
// Exit code: 0 if found, 1 if not found (handy in shell pipelines).

const fs = require('fs');
const readline = require('readline');
const path = require('path');

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
  const opts = { file: null };
  for (let i = 0; i < rest.length; i++) {
    const a = rest[i];
    if (a === '--file') opts.file = rest[++i];
    else if (!a.startsWith('--')) query = a;
  }
  return { query, opts };
}

function parseRow(line, isNdjson) {
  if (isNdjson) {
    try { const o = JSON.parse(line); return { domain: o.domain }; }
    catch { return null; }
  }
  const domain = line.split(',')[0];
  return domain ? { domain } : null;
}

async function main() {
  const { query, opts } = parseArgs(process.argv);
  if (!query) { console.error('Usage: node scripts/lookup-universe.js <domain> [--file path]'); process.exit(2); }

  const file = path.resolve(opts.file || path.join(__dirname, '..', 'data', 'global-universe.csv'));
  if (!fs.existsSync(file)) { console.error(`Universe file not found: ${file}`); process.exit(2); }
  const isNdjson = file.endsWith('.ndjson');

  const target = normalizeDomain(query);
  const brand = target.split('.')[0];
  // Fallbacks: exact, then same-brand on any TLD (e.g. "nike" → nike.com, nike.in)
  const brandRe = new RegExp('^' + brand.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\.');

  let exact = null;
  const brandMatches = [];
  const rl = readline.createInterface({ input: fs.createReadStream(file), crlfDelay: Infinity });
  for await (const line of rl) {
    const row = parseRow(line, isNdjson);
    if (!row) continue;
    if (row.domain === target) { exact = row; break; }
    if (brand.length >= 3 && brandRe.test(row.domain)) brandMatches.push(row);
  }
  rl.close();

  if (exact) {
    console.log(`FOUND  ${exact.domain}`);
    process.exit(0);
  }
  if (brandMatches.length) {
    console.log(`NOT EXACT — ${brandMatches.length} same-brand match(es):`);
    for (const m of brandMatches.slice(0, 10)) console.log(`  ~ ${m.domain}`);
    process.exit(0);
  }
  console.log(`NOT FOUND  ${target}`);
  process.exit(1);
}

main().catch(err => { console.error(err); process.exit(2); });
