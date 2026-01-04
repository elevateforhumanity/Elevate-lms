#!/usr/bin/env node

/**
 * Generate sitemap with dynamic routes from static data sources
 * Includes programs, courses, and other dynamic content
 */

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

// Read programs data
const programsPath = join(projectRoot, 'src/data/programs.ts');
const programsContent = readFileSync(programsPath, 'utf-8');

// Extract program slugs using regex
const programSlugs = [];
const slugMatches = programsContent.matchAll(/slug:\s*['"]([^'"]+)['"]/g);
for (const match of slugMatches) {
  programSlugs.push(match[1]);
}

console.log(`Found ${programSlugs.length} programs:`, programSlugs);

// Base URL
const baseUrl = 'https://elevateforhumanity.org';

// Static routes - only include main public-facing routes that exist in router.tsx
const staticRoutes = [
  '/',
  '/about',
  '/hub',
  '/programs',
  '/lms',
  '/lms/dashboard',
  '/lms/courses-index',
  '/privacy-policy',
  '/terms-of-service',
  '/accessibility',
  '/instructor',
  '/student-hub',
  '/educator-hub',
  '/business-hub',
  '/community-hub',
  '/support',
  '/connect',
  '/donate',
  '/get-started',
];

// Generate dynamic program routes
const programRoutes = programSlugs.flatMap((slug) => [
  `/programs/${slug}`,
  `/program/${slug}`, // Alternative route
]);

// Combine all routes
const allRoutes = [...staticRoutes, ...programRoutes];

// Generate sitemap XML
const generateSitemap = (routes) => {
  const urlEntries = routes
    .map((route) => {
      const loc = `${baseUrl}${route}`;
      const lastmod = new Date().toISOString().split('T')[0];

      // Determine priority based on route type
      let priority = '0.5';
      if (route === '/') priority = '1.0';
      else if (route === '/programs' || route === '/hub') priority = '0.9';
      else if (route.startsWith('/programs/') || route.startsWith('/program/'))
        priority = '0.8';
      else if (route.startsWith('/lms')) priority = '0.7';

      // Determine change frequency
      let changefreq = 'monthly';
      if (route === '/' || route === '/programs') changefreq = 'weekly';
      else if (route.startsWith('/programs/') || route.startsWith('/program/'))
        changefreq = 'monthly';

      return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
};

// Write sitemap
const sitemapPath = join(projectRoot, 'dist/sitemap.xml');
const sitemapContent = generateSitemap(allRoutes);
writeFileSync(sitemapPath, sitemapContent, 'utf-8');

console.log(`✅ Generated sitemap with ${allRoutes.length} URLs`);
console.log(`   - ${staticRoutes.length} static routes`);
console.log(`   - ${programRoutes.length} dynamic program routes`);
console.log(`   - Written to: dist/sitemap.xml`);

// Generate robots.txt
const robotsContent = `# Elevate for Humanity - Robots.txt
User-agent: *
Allow: /

# Sitemaps
Sitemap: ${baseUrl}/sitemap.xml

# Disallow admin and auth pages
Disallow: /admin/
Disallow: /login
Disallow: /signup
Disallow: /profile

# Allow program pages
Allow: /programs/
Allow: /program/

# Allow LMS public pages
Allow: /lms/courses
`;

const robotsPath = join(projectRoot, 'dist/robots.txt');
writeFileSync(robotsPath, robotsContent, 'utf-8');

console.log(`✅ Generated robots.txt`);
console.log(`   - Written to: dist/robots.txt`);

// Summary report
console.log('\n📊 Dynamic Routes Summary:');
console.log('==========================');
console.log('\nProgram Routes:');
programSlugs.forEach((slug) => {
  console.log(`  ✓ /programs/${slug}`);
  console.log(`  ✓ /program/${slug}`);
});

console.log('\n✅ All dynamic routes are now in sitemap!');
