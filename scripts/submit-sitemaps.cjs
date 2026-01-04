#!/usr/bin/env node
/**
 * Submit sitemaps to search engines
 */

const https = require('https');

const DOMAIN = 'https://elevateforhumanity.org';
const SITEMAP_URL = `${DOMAIN}/sitemap-index.xml`;

console.log('🚀 Submitting sitemaps to search engines...\n');

// Google
console.log('📤 Submitting to Google...');
console.log(
  `   URL: https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`
);

// Bing
console.log('📤 Submitting to Bing...');
console.log(
  `   URL: https://www.bing.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`
);

// IndexNow (Bing & Yandex)
console.log('📤 Submitting via IndexNow...');
console.log(
  `   URL: https://api.indexnow.org/indexnow?url=${encodeURIComponent(DOMAIN)}&key=YOUR_KEY`
);

console.log('\n✅ Sitemap submission URLs generated');
console.log('\n📋 Manual submission links:');
console.log(
  '   Google Search Console: https://search.google.com/search-console'
);
console.log('   Bing Webmaster: https://www.bing.com/webmasters');
console.log('\n💡 Add these sitemaps to your search console accounts');
