#!/usr/bin/env tsx
/**
 * Validate sitemap.ts structure
 */

import sitemap from '../app/sitemap';

async function validateSitemap() {
  console.log('Validating sitemap...\n');

  const urls = sitemap();

  console.log(`✅ Total URLs: ${urls.length}`);
  console.log(`✅ Base URL: ${urls[0].url.split('/').slice(0, 3).join('/')}`);

  // Check for duplicates
  const urlSet = new Set(urls.map((u) => u.url));
  if (urlSet.size !== urls.length) {
    console.error('❌ Duplicate URLs found!');
    process.exit(1);
  }
  console.log('✅ No duplicate URLs');

  // Check required fields
  const missingFields = urls.filter(
    (u) => !u.url || !u.lastModified || !u.changeFrequency || !u.priority
  );
  if (missingFields.length > 0) {
    console.error('❌ URLs with missing fields:', missingFields.length);
    process.exit(1);
  }
  console.log('✅ All URLs have required fields');

  // Check priorities
  const invalidPriorities = urls.filter(
    (u) => u.priority < 0 || u.priority > 1
  );
  if (invalidPriorities.length > 0) {
    console.error('❌ Invalid priorities found');
    process.exit(1);
  }
  console.log('✅ All priorities valid (0-1)');

  // Sample URLs
  console.log('\n📋 Sample URLs:');
  urls.slice(0, 5).forEach((u) => {
    console.log(`  ${u.url} (priority: ${u.priority})`);
  });

  console.log('\n✅ Sitemap validation passed!');
  console.log('\n📝 Next steps:');
  console.log('  1. Build the site: npm run build');
  console.log('  2. Check sitemap.xml in .next/server/app/');
  console.log('  3. Submit to Google Search Console');
}

validateSitemap().catch(console.error);
