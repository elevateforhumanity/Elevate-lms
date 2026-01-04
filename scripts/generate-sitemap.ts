import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { resolve } from 'path';
import { SitemapStream, streamToPromise } from 'sitemap';
import dotenv from 'dotenv';
dotenv.config();

const DOMAIN = process.env.SITE_URL || 'http://localhost:3000';
const outDir = resolve(process.cwd(), 'dist');

async function main() {
  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

  const stream = new SitemapStream({ hostname: DOMAIN });
  ['/'].forEach((p) =>
    stream.write({
      url: p,
      changefreq: 'weekly',
      priority: p === '/' ? 1.0 : 0.8,
    })
  );
  stream.end();

  const xml = await streamToPromise(stream);
  writeFileSync(resolve(outDir, 'sitemap.xml'), xml.toString(), 'utf8');

  const today = new Date().toISOString().split('T')[0];
  const indexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap><loc>${DOMAIN}/sitemap.xml</loc><lastmod>${today}</lastmod></sitemap>
</sitemapindex>`;
  writeFileSync(resolve(outDir, 'sitemap-index.xml'), indexXml, 'utf8');

  const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${DOMAIN}/sitemap-index.xml
`;
  writeFileSync(resolve(outDir, 'robots.txt'), robotsTxt, 'utf8');
}

main().catch((e) => {
  console.error('Sitemap generation failed:', e);
  process.exit(1);
});
