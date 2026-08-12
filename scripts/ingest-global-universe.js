#!/usr/bin/env node
// ── Global company universe seeder (LOCAL FILE output) ─────────────────────
// Builds a local file of company domains sourced ONLY from open / licensed
// datasets. Nothing is written to any database — output is a plain local file
// you can grep, import, or process however you like.
//
// Legitimate sources (no scraping of third-party SaaS databases):
//   • tranco   — Tranco top-sites list (scripts/tranco-list.csv). Open, academic.
//                https://tranco-list.eu/
//   • file     — a newline/CSV file of domains you already own or generated from
//                an open registry (GLEIF, OpenCorporates, national registries).
//   • cc-hosts — a Common Crawl host-level list (one reversed host per line).
//                Common Crawl is an open crawl of the public web.
//
// Usage:
//   node scripts/ingest-global-universe.js tranco
//   node scripts/ingest-global-universe.js tranco --limit 200000 --out data/universe.csv
//   node scripts/ingest-global-universe.js file  domains.csv --source gleif
//   node scripts/ingest-global-universe.js cc-hosts cc-hosts.txt --format ndjson
//
// Output (default data/global-universe.csv):
//   default → one domain per line, no header (e.g. "freelance-interim.fr")
//   NDJSON with --format ndjson → {"domain":"...","sources":["tranco"]}
//
// Common Crawl host index (worldwide domains, tens of millions), open data:
//   curl -s https://data.commoncrawl.org/projects/hyperlinkgraph/cc-main-2024-may/host/cc-main-2024-may-host-vertices.txt.gz \
//     | gzip -dc | awk '{print $2}' > cc-hosts.txt
//   node scripts/ingest-global-universe.js cc-hosts cc-hosts.txt

const fs = require('fs');
const readline = require('readline');
const path = require('path');

// Infrastructure / non-company noise to skip (DNS, CDNs, trackers, TLD machinery).
const SKIP_SUFFIXES = [
  'gtld-servers.net', 'root-servers.net', 'in-addr.arpa', 'akamai.net',
  'akamaiedge.net', 'cloudfront.net', 'amazonaws.com', 'googleapis.com',
  'googleusercontent.com', 'gstatic.com', 'doubleclick.net', 'windows.net',
  'azureedge.net', 'fastly.net', 'cloudflare.net', 'edgekey.net', 'edgesuite.net',
];
const SKIP_EXACT = new Set(['localhost', 'example.com', 'example.org', 'example.net']);

function normalizeDomain(raw) {
  return String(raw || '')
    .trim()
    .replace(/^https?:\/\//i, '')
    .replace(/^www\d*\./i, '')
    .replace(/\/.*$/, '')
    .toLowerCase()
    .replace(/[,\s]+/g, '');
}

function isCompanyDomain(domain) {
  if (!domain || !domain.includes('.')) return false;
  if (SKIP_EXACT.has(domain)) return false;
  if (domain.length > 100) return false;
  if (/^\d+\.\d+\.\d+\.\d+$/.test(domain)) return false;
  for (const suf of SKIP_SUFFIXES) {
    if (domain === suf || domain.endsWith('.' + suf)) return false;
  }
  return true;
}

// Reverse a Common Crawl reversed host ("com.example.www") back to "example.com"
function fromReversedHost(h) {
  if (!h) return '';
  return h.split('.').reverse().join('.');
}

// Event-based line reader with backpressure. onLine may return `false` to stop
// early (used for --limit). Avoids the async-iterator teardown race that throws
// ERR_USE_AFTER_CLOSE on very large inputs under Node 24.
function forEachLine(filePath, onLine) {
  return new Promise((resolve, reject) => {
    const stream = fs.createReadStream(filePath);
    const rl = readline.createInterface({ input: stream, crlfDelay: Infinity });
    let stopped = false;
    const ctl = {
      pause: () => rl.pause(),
      resume: () => { if (!stopped) rl.resume(); },
      stop: () => { stopped = true; rl.close(); },
    };
    rl.on('line', (line) => {
      if (stopped) return;
      onLine(line, ctl);
    });
    rl.on('close', resolve);
    rl.on('error', reject);
    stream.on('error', reject);
  });
}

function parseArgs(argv) {
  const mode = argv[2];
  const rest = argv.slice(3);
  let filePath = null;
  const opts = { source: null, limit: Infinity, out: null, format: 'csv' };
  for (let i = 0; i < rest.length; i++) {
    const a = rest[i];
    if (a === '--limit') opts.limit = parseInt(rest[++i], 10) || Infinity;
    else if (a === '--source') opts.source = rest[++i];
    else if (a === '--out') opts.out = rest[++i];
    else if (a === '--format') opts.format = rest[++i];
    else if (!a.startsWith('--')) filePath = a;
  }
  return { mode, filePath, opts };
}

// Load already-seen domains from an existing output file into a Set so re-runs
// append/merge instead of duplicating. Streams the file (memory-safe for large
// universes) and keeps only the domain string, not per-source detail.
async function loadSeen(outPath, format) {
  const seen = new Set();
  if (!fs.existsSync(outPath)) return seen;
  await forEachLine(outPath, (line) => {
    if (!line) return;
    let domain;
    if (format === 'ndjson') { try { domain = JSON.parse(line).domain; } catch { return; } }
    else { if (line.startsWith('domain,')) return; domain = line.split(',')[0]; }
    if (domain) seen.add(domain);
  });
  return seen;
}

function openAppend(outPath) {
  return fs.createWriteStream(outPath, { flags: 'a' });
}

async function main() {
  const { mode, filePath, opts } = parseArgs(process.argv);

  const sourceLabel = {
    tranco: 'tranco',
    file: opts.source || 'file',
    'cc-hosts': 'commoncrawl',
  }[mode];

  if (!mode || !sourceLabel) {
    console.error('Usage: node scripts/ingest-global-universe.js <tranco|file|cc-hosts> [path] [--source name] [--limit N] [--out file] [--format csv|ndjson]');
    process.exit(1);
  }

  let input = filePath;
  if (mode === 'tranco') input = path.join(__dirname, 'tranco-list.csv');
  if (!input || !fs.existsSync(input)) {
    console.error(`Input file not found: ${input}`);
    process.exit(1);
  }

  const format = opts.format === 'ndjson' ? 'ndjson' : 'csv';
  const outPath = path.resolve(opts.out || path.join(__dirname, '..', 'data', `global-universe.${format === 'ndjson' ? 'ndjson' : 'csv'}`));
  fs.mkdirSync(path.dirname(outPath), { recursive: true });

  const seenSet = await loadSeen(outPath, format);
  const startCount = seenSet.size;
  const ws = openAppend(outPath);

  let read = 0, kept = 0;
  await forEachLine(input, (rawLine, ctl) => {
    if (read >= opts.limit) { ctl.stop(); return; }
    read++;
    let field = rawLine;
    if (mode === 'tranco') field = rawLine.split(',').pop();
    let domain = mode === 'cc-hosts' ? fromReversedHost(field.trim()) : field;
    domain = normalizeDomain(domain);
    if (!isCompanyDomain(domain) || seenSet.has(domain)) return;
    seenSet.add(domain);
    kept++;
    const ok = format === 'ndjson'
      ? ws.write(JSON.stringify({ domain, sources: [sourceLabel] }) + '\n')
      : ws.write(`${domain}\n`);
    if (!ok) { ctl.pause(); ws.once('drain', () => ctl.resume()); }
    if (kept && kept % 250000 === 0) console.log(`  …${kept} new domains`);
  });

  await new Promise((res, rej) => { ws.end(err => err ? rej(err) : res()); });

  console.log(`\nDone. read=${read} newDomains=${kept} total=${seenSet.size} (was ${startCount})`);
  console.log(`Output: ${outPath}  (${format}, source=${sourceLabel})`);
  process.exit(0);
}

main().catch(err => { console.error(err); process.exit(1); });
