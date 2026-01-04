// Usage:
//   node scripts/sitemap-partitioner.mjs \
//     --base=https://elevateforhumanity.org \
//     --in=all-urls.txt \
//     --out=sites/marketing/sitemaps \
//     --chunk=5000
//
// Input: one URL per line in all-urls.txt (use your crawler to generate it)
// Output: sectioned sitemap files + section indexes + master sitemap_index.xml

import fs from 'fs';
import path from 'path';

const arg = (k, d = null) => {
  const m = process.argv.find((a) => a.startsWith(`--${k}`));
  if (!m) return d;
  const [, v] = m.split('=');
  return v ?? d;
};

const BASE = (arg('base') || 'https://elevateforhumanity.org').replace(
  /\/$/,
  ''
);
const IN = arg('in', 'all-urls.txt');
const OUT = arg('out', 'sitemaps');
const CHUNK = parseInt(arg('chunk', '5000'), 10); // tiny chunks
const NOW = new Date().toISOString().slice(0, 10);

if (!fs.existsSync(IN)) {
  console.error(`Input list not found: ${IN}`);
  process.exit(1);
}
fs.mkdirSync(OUT, { recursive: true });

// 1) Load & normalize URLs (keep only same-origin)
const urls = fs
  .readFileSync(IN, 'utf8')
  .split('\n')
  .map((s) => s.trim())
  .filter(Boolean)
  .filter((u) => {
    try {
      return new URL(u).origin === new URL(BASE).origin;
    } catch {
      return false;
    }
  });

// 2) Classify into sections (customize rules as needed)
const sections = {
  marketing: [],
  programs: [],
  blog: [],
  employers: [],
  misc: [],
};

for (const u of urls) {
  const p = new URL(u).pathname;
  if (
    p === '/' ||
    p.startsWith('/about') ||
    p.startsWith('/contact') ||
    p.startsWith('/privacy') ||
    p.startsWith('/sitemap')
  ) {
    sections.marketing.push(u);
  } else if (p.startsWith('/programs/') || p === '/programs/') {
    sections.programs.push(u);
  } else if (p.startsWith('/blog/') || p === '/blog/') {
    sections.blog.push(u);
  } else if (p.startsWith('/employers/') || p === '/employers/') {
    sections.employers.push(u);
  } else {
    sections.misc.push(u);
  }
}

// 3) Write chunked sitemaps per section
const writeSitemap = (urls, filename) => {
  const body = urls
    .map((u) => `  <url><loc>${u}</loc><lastmod>${NOW}</lastmod></url>`)
    .join('\n');
  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
  fs.writeFileSync(path.join(OUT, filename), xml);
};

const writeIndex = (names, filename) => {
  const body = names
    .map(
      (n) =>
        `  <sitemap><loc>${BASE}/${OUT.replace(/^sites\/marketing\//, '')}/${n}</loc><lastmod>${NOW}</lastmod></sitemap>`
    )
    .join('\n');
  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</sitemapindex>\n`;
  fs.writeFileSync(path.join(path.dirname(OUT), filename), xml);
};

const masterEntries = [];
const sectionIndexes = [];

for (const [name, list] of Object.entries(sections)) {
  if (!list.length) continue;

  // chunk
  const partNames = [];
  for (let i = 0; i < list.length; i += CHUNK) {
    const slice = list.slice(i, i + CHUNK);
    const fname = `sitemap-${name}-${Math.floor(i / CHUNK) + 1}.xml`;
    writeSitemap(slice, fname);
    partNames.push(fname);
  }

  // index per section (only if >1 part; else link single file in master)
  if (partNames.length > 1) {
    const idxName = `sitemap-${name}-index.xml`;
    writeIndex(partNames, idxName); // writes next to OUT (one level up)
    masterEntries.push(idxName);
    sectionIndexes.push({ section: name, files: partNames, index: idxName });
  } else {
    masterEntries.push(partNames[0]);
    sectionIndexes.push({ section: name, files: partNames, index: null });
  }
}

// 4) Master index pointing to either section index or single-section files
const masterBody = masterEntries
  .map(
    (n) =>
      `  <sitemap><loc>${BASE}/${OUT.replace(/^sites\/marketing\//, '')}/${n}</loc><lastmod>${NOW}</lastmod></sitemap>`
  )
  .join('\n');
const masterXML =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${masterBody}\n</sitemapindex>\n`;
fs.writeFileSync(path.join(path.dirname(OUT), 'sitemap_index.xml'), masterXML);

// 5) Console summary
const count = Object.fromEntries(
  Object.entries(sections).map(([k, v]) => [k, v.length])
);
console.table(count);
