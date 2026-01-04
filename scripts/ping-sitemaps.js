#!/usr/bin/env node
/**
 * Ping major search engines with the sitemap index URL.
 * Usage: CANONICAL_DOMAIN=https://example.com node scripts/ping-sitemaps.js
 */
const https = require('https');

const CANONICAL = process.env.CANONICAL_DOMAIN || 'https://example.com';
const INDEX_URL = `${CANONICAL}/sitemap-index.xml`;

function ping(label, url) {
  return new Promise((resolve) => {
    https
      .get(url, (res) => {
        const chunks = [];
        res.on('data', (c) => chunks.push(c));
        res.on('end', () => {
          const body = Buffer.concat(chunks).toString();
          resolve({ label, status: res.statusCode, body: body.slice(0, 200) });
        });
      })
      .on('error', (e) => {
        console.error(`[sitemap-ping] ${label} error:`, e.message);
        resolve({ label, error: e.message });
      });
  });
}

(async () => {
  const targets = [
    {
      label: 'Google',
      url: `https://www.google.com/ping?sitemap=${encodeURIComponent(INDEX_URL)}`,
    },
    {
      label: 'Bing',
      url: `https://www.bing.com/ping?sitemap=${encodeURIComponent(INDEX_URL)}`,
    },
  ];
  const results = await Promise.all(targets.map((t) => ping(t.label, t.url)));
  const failed = results.filter((r) => r.status && r.status >= 400);
  if (failed.length) {
    process.exitCode = 1;
    console.error('[sitemap-ping] Some pings returned non-200 status');
  }
})();
