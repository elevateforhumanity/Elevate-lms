/*
  Copyright (c) 2025 Elevate for Humanity
  Commercial License. No resale, sublicensing, or redistribution allowed.
  See LICENSE file for details.
*/

const fs = require('fs');
const path = require('path');

// Configuration for canonical domain
const CANONICAL_DOMAIN = 'https://elevateforhumanity.org';

// Page priority and frequency configuration
const pageConfig = {
  // High priority pages
  'index.html': { priority: 1.0, changefreq: 'daily' },
  'programs.html': { priority: 0.9, changefreq: 'weekly' },
  'hub.html': { priority: 0.9, changefreq: 'weekly' },

  // Training and education
  'lms.html': { priority: 0.8, changefreq: 'weekly' },
  'lms-advanced.html': { priority: 0.8, changefreq: 'weekly' },
  'connect.html': { priority: 0.8, changefreq: 'weekly' },

  // Student resources
  'student-dashboard.html': { priority: 0.7, changefreq: 'weekly' },
  'skills-assessment.html': { priority: 0.6, changefreq: 'monthly' },
  'compliance.html': { priority: 0.7, changefreq: 'monthly' },

  // Partners and employers
  'partners.html': { priority: 0.6, changefreq: 'monthly' },
  'employer-dashboard.html': { priority: 0.6, changefreq: 'monthly' },

  // Account management
  'account.html': { priority: 0.5, changefreq: 'monthly' },
  'user-dashboard.html': { priority: 0.5, changefreq: 'weekly' },

  // Administrative (lower priority)
  'admin-dashboard.html': { priority: 0.4, changefreq: 'monthly' },
  'monitor-dashboard.html': { priority: 0.4, changefreq: 'weekly' },
  'audit-compliance.html': { priority: 0.4, changefreq: 'monthly' },

  // Support pages
  'blog.html': { priority: 0.6, changefreq: 'weekly' },
  '404.html': { priority: 0.1, changefreq: 'yearly' },
};

// Pages to exclude from sitemap
const excludePages = [
  'google-search-console-setup.html',
  'google-search-console-submit.html',
  'google-analytics-setup.html',
  'google-site-verification.html',
  'bing-site-verification.html',
  'demo-site.html',
  'working-demo.html',
  'protected-site.html',
  'READY_FOR_TRANSFER_index.html',
  'EMERGENCY_SALE_BUY_NOW.html',
  'emergency-buy-now.html',
  'index.react.html', // React version handled by main index
  'auth-login.html', // Private page
];

function generateSitemap() {
    '🗺️  Generating comprehensive sitemap for www.elevateforhumanity.org...'
  );

  // Get all HTML files in root directory
  const htmlFiles = fs
    .readdirSync('.')
    .filter((file) => file.endsWith('.html'))
    .filter((file) => !excludePages.includes(file))
    .sort();

  const currentDate = new Date().toISOString().split('T')[0];

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Generated automatically for www.elevateforhumanity.org -->
  <!-- Last updated: ${currentDate} -->
  
`;

  // Add each page
  htmlFiles.forEach((file) => {
    const config = pageConfig[file] || { priority: 0.5, changefreq: 'monthly' };
    const urlPath =
      file === 'index.html' ? '/' : `/${file.replace('.html', '')}`;

    sitemap += `  <url>
    <loc>${CANONICAL_DOMAIN}${urlPath}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${config.changefreq}</changefreq>
    <priority>${config.priority}</priority>
  </url>
  
`;
  });

  // Add important API endpoints
  sitemap += `  <!-- API Endpoints -->
  <url>
    <loc>${CANONICAL_DOMAIN}/api/readiness</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>hourly</changefreq>
    <priority>0.3</priority>
  </url>
  
  <url>
    <loc>${CANONICAL_DOMAIN}/api/metrics</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>hourly</changefreq>
    <priority>0.3</priority>
  </url>
  
`;

  sitemap += `</urlset>`;

  // Write the sitemap
  fs.writeFileSync('sitemap.xml', sitemap);

  htmlFiles.forEach((file) => {
    const config = pageConfig[file] || { priority: 0.5, changefreq: 'monthly' };
    const urlPath =
      file === 'index.html' ? '/' : `/${file.replace('.html', '')}`;
      `   • ${urlPath} (priority: ${config.priority}, freq: ${config.changefreq})`
    );
  });

  // Also update robots.txt to ensure it references correct domain
  updateRobotsTxt();

  return sitemap;
}

function updateRobotsTxt() {
  try {
    let robots = fs.readFileSync('robots.txt', 'utf8');

    // Update sitemap URLs to use canonical domain
    robots = robots.replace(
      /Sitemap: .*$/gm,
      `Sitemap: ${CANONICAL_DOMAIN}/sitemap.xml`
    );

    fs.writeFileSync('robots.txt', robots);
  } catch (error) {
    console.error('⚠️  Could not update robots.txt:', error.message);
  }
}

// Run if called directly
if (require.main === module) {
  generateSitemap();
}

module.exports = { generateSitemap, CANONICAL_DOMAIN };
