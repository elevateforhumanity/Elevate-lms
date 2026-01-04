import { writeFileSync } from 'node:fs';

const base = 'https://elevateforhumanity.pages.dev';
const routes = ['/', '/lms', '/programs', '/about', '/contact', '/get-started'];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) => `  <url>
    <loc>${base}${r}</loc>
    <changefreq>weekly</changefreq>
    <priority>${r === '/' ? '1.0' : '0.8'}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

writeFileSync('dist/client/sitemap.xml', xml);
console.log('✅ sitemap.xml generated');
