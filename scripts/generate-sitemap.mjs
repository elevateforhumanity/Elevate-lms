import { writeFile, mkdir, readFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
const argv = Object.fromEntries(
  process.argv.slice(2).map((p) => {
    const [k, ...r] = p.replace(/^--/, '').split('=');
    return [k, r.join('=') || true];
  })
);
const SEED = argv.seed || null,
  ROUTES_FILE = argv.routes || null,
  OUT_DIR = argv.out || 'public';
const BASE =
  argv.base ||
  SEED ||
  process.env.DOMAIN ||
  'https://elevateproduction.netlify.app';
const MAX = parseInt(argv.max || '120000', 10),
  CONC = Math.max(1, parseInt(argv.concurrency || '8', 10));
const INCLUDE_HASH = !!argv.includeHash,
  VERBOSE = !!argv.verbose;
if (!SEED && !ROUTES_FILE) {
  console.error('Provide --seed=<url> or --routes=<file.json>');
  process.exit(1);
}
const sameOrigin = (u, b) => {
  try {
    const a = new URL(u, b),
      c = new URL(b);
    return a.origin === c.origin;
  } catch {
    return false;
  }
};
const normalize = (u, b) => {
  try {
    const x = new URL(u, b);
    if (!INCLUDE_HASH) x.hash = '';
    if (x.pathname.endsWith('/') && x.pathname !== '/')
      x.pathname = x.pathname.slice(0, -1);
    return x.toString();
  } catch {
    return null;
  }
};
const extractLinks = (html, base) => {
  const out = new Set();
  let m;
  const aHref = /<a[^>]+href=["']([^"']+)["']/gi;
  while ((m = aHref.exec(html))) {
    const n = normalize(m[1], base);
    if (n) out.add(n);
  }
  const linkRel =
    /<link[^>]+rel=["'](?:next|prev|canonical)["'][^>]*href=["']([^"']+)["']/gi;
  while ((m = linkRel.exec(html))) {
    const n = normalize(m[1], base);
    if (n) out.add(n);
  }
  return [...out];
};
async function crawl(seed, limit, conc) {
  const base = new URL(seed).origin;
  const q = [normalize(seed, base)].filter(Boolean);
  const seen = new Set(q);
  const results = new Set();
  async function worker() {
    while (q.length && results.size < limit) {
      const cur = q.shift();
      if (!cur) continue;
      try {
        const res = await fetch(cur, { redirect: 'follow' });
        const ct = res.headers.get('content-type') || '';
        if (!ct.includes('text/html')) {
          results.add(cur);
          continue;
        }
        const html = await res.text();
        results.add(cur);
        for (const n of extractLinks(html, cur)
          .filter((u) => sameOrigin(u, base))
          .map((u) => normalize(u, base))
          .filter(Boolean)) {
          if (!seen.has(n) && results.size + q.length < limit) {
            seen.add(n);
            q.push(n);
          }
        }
      } catch (e) {
        if (VERBOSE) console.warn('Fetch error:', cur, e?.message);
      }
    }
  }
  await Promise.all(Array.from({ length: conc }, () => worker()));
  return [...results].filter((u) => sameOrigin(u, base));
}
const chunk = (a, n) =>
  Array.from({ length: Math.ceil(a.length / n) }, (_, i) =>
    a.slice(i * n, (i + 1) * n)
  );
const urlset = (urls) =>
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${u.replace(/&/g, '&amp;')}</loc><lastmod>${new Date().toISOString()}</lastmod></url>`).join('\n')}\n</urlset>\n`;
const sitemapIndex = (files, base) =>
  `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${files.map((f) => `  <sitemap><loc>${new URL(f, base).toString()}</loc><lastmod>${new Date().toISOString()}</lastmod></sitemap>`).join('\n')}\n</sitemapindex>\n`;
async function writeSafe(p, c) {
  await mkdir(dirname(p), { recursive: true });
  await writeFile(p, c, 'utf8');
  console.log('📝 wrote', p);
}
async function ensureRobots(path, siteUrl) {
  let content = '';
  try {
    content = await readFile(path, 'utf8');
  } catch {
    content = 'User-agent: *\nAllow: /\n';
  }
  const lines = content
    .split(/\r?\n/)
    .filter(Boolean)
    .filter((l) => !/^Sitemap:/i.test(l));
  lines.push(`Sitemap: ${siteUrl}`);
  await writeSafe(path, lines.join('\n') + '\n');
}
async function main() {
  let urls = [];
  if (ROUTES_FILE) {
    const raw = await readFile(ROUTES_FILE, 'utf8');
    let routes = JSON.parse(raw);
    if (!Array.isArray(routes)) routes = routes.paths || [];
    urls = routes.map((r) => normalize(r, BASE)).filter(Boolean);
  } else {
    console.log(`🕷️ Crawling ${SEED} (limit=${MAX}, concurrency=${CONC})`);
    urls = await crawl(SEED, MAX, CONC);
  }
  const home = normalize('/', BASE);
  if (home) urls.unshift(home);
  const origin = new URL(BASE).origin;
  urls = [...new Set(urls)].filter((u) => sameOrigin(u, origin));
  const chunks = chunk(urls, 50000);
  const publicUrls = [];
  for (let i = 0; i < chunks.length; i++) {
    const name = chunks.length > 1 ? `sitemap-${i + 1}.xml` : 'sitemap.xml';
    await writeSafe(resolve(OUT_DIR, name), urlset(chunks[i]));
    publicUrls.push(new URL(`/${name}`, BASE).toString());
  }
  if (chunks.length > 1) {
    await writeSafe(
      resolve(OUT_DIR, 'sitemap-index.xml'),
      sitemapIndex(publicUrls, BASE)
    );
    await ensureRobots(
      resolve(OUT_DIR, 'robots.txt'),
      new URL('/sitemap-index.xml', BASE).toString()
    );
    console.log('✅ Multi-file sitemap ready');
  } else {
    await ensureRobots(
      resolve(OUT_DIR, 'robots.txt'),
      new URL('/sitemap.xml', BASE).toString()
    );
    console.log('✅ Single-file sitemap ready');
  }
}
main().catch((e) => {
  console.error(e);
  process.exit(1);
});
