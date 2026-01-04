#!/usr/bin/env node

// Usage:
//   node scripts/verify-redirects.mjs --base=http://localhost:8080
//   node scripts/verify-redirects.mjs --base=https://elevateforhumanity.org

import fs from 'fs';
import http from 'http';
import https from 'https';

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, '').split('=');
    return [k, v ?? true];
  })
);
const BASE = (args.base || 'http://localhost:8000').replace(/\/$/, '');

console.log(`🔍 Verifying redirects against: ${BASE}`);

// Read redirects CSV
let csv;
try {
  csv = fs
    .readFileSync('redirects.csv', 'utf8')
    .trim()
    .split('\n')
    .filter((l) => l && !l.startsWith('#'))
    .map((l) => l.split(',').map((s) => s.trim()));
} catch (error) {
  console.error('❌ Could not read redirects.csv');
  process.exit(1);
}

const fetchHead = (url) =>
  new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : http;
    const req = mod.request(
      url,
      {
        method: 'HEAD',
        timeout: 5000,
        headers: {
          'User-Agent': 'ElevateForHumanity-RedirectChecker/1.0',
        },
      },
      (res) => {
        // We want to see the 301/308 and Location
        resolve({ statusCode: res.statusCode, headers: res.headers });
        res.resume();
      }
    );
    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
    req.end();
  });

const fetchFollow = (url) =>
  new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : http;
    const req = mod.request(
      url,
      {
        method: 'HEAD',
        timeout: 5000,
        headers: {
          'User-Agent': 'ElevateForHumanity-RedirectChecker/1.0',
        },
      },
      (res) => {
        resolve({ statusCode: res.statusCode, headers: res.headers });
        res.resume();
      }
    );
    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
    req.end();
  });

let pass = 0,
  fail = 0;
console.log(`\n📋 Testing ${csv.length} redirects...\n`);

const pad = (s, n) => (s + ' '.repeat(n)).slice(0, n);

for (const [from, to] of csv) {
  const src = BASE + from;
  const expected = new URL(to, BASE).toString();

  try {
    const r = await fetchHead(src);
    const loc = r.headers.location
      ? new URL(r.headers.location, BASE).toString()
      : '';
    const isRedirect = [301, 302, 307, 308].includes(r.statusCode);
    const matches = isRedirect && loc === expected;

    // Optionally follow once to ensure the target returns 200
    let final200 = false;
    if (matches) {
      try {
        const f = await fetchFollow(loc);
        final200 = f.statusCode >= 200 && f.statusCode < 400;
      } catch (followError) {
        final200 = false;
      }
    }

    if (matches && final200) {
      pass++;
      console.log(`✅ ${pad(from, 50)} → ${to}  [${r.statusCode} → 200]`);
    } else if (matches && !final200) {
      fail++;
      console.log(
        `⚠️  ${pad(from, 50)} → ${to}  [${r.statusCode} → target error]`
      );
    } else if (isRedirect && !matches) {
      fail++;
      console.log(
        `❌ ${pad(from, 50)} → ${to}  [${r.statusCode} → "${r.headers.location || ''}"]`
      );
    } else {
      fail++;
      console.log(
        `❌ ${pad(from, 50)} → ${to}  [got ${r.statusCode}, expected redirect]`
      );
    }
  } catch (e) {
    fail++;
    console.log(`💥 ${pad(from, 50)} → ${to}  [error: ${e.message}]`);
  }

  // Small delay to be nice to the server
  await new Promise((resolve) => setTimeout(resolve, 100));
}

console.log(`\n📊 Results: ${pass} passed, ${fail} failed`);

if (fail > 0) {
  console.log('\n💡 Tips:');
  console.log('   - Check your _redirects file syntax');
  console.log('   - Ensure your server supports redirects');
  console.log('   - For Netlify, use: npx netlify dev');
  console.log('   - For production, wait for deployment to complete');
}

process.exit(fail ? 1 : 0);
