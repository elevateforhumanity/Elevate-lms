import { writeFileSync } from 'node:fs';

const txt = `User-agent: *
Allow: /

Sitemap: https://elevateforhumanity.pages.dev/sitemap.xml
`;

writeFileSync('dist/client/robots.txt', txt);
console.log('✅ robots.txt generated');
