#!/usr/bin/env tsx
/**
 * Validate sitemap.ts structure
 */

import sitemap from '../app/sitemap';

async function validateSitemap() {

  const urls = sitemap();


  // Check for duplicates
  const urlSet = new Set(urls.map((u) => u.url));
  if (urlSet.size !== urls.length) {
    process.exit(1);
  }

  // Check required fields
  const missingFields = urls.filter(
    (u) => !u.url || !u.lastModified || !u.changeFrequency || !u.priority
  );
  if (missingFields.length > 0) {
    process.exit(1);
  }

  // Check priorities
  const invalidPriorities = urls.filter(
    (u) => u.priority < 0 || u.priority > 1
  );
  if (invalidPriorities.length > 0) {
    process.exit(1);
  }

  // Sample URLs
  urls.slice(0, 5).forEach((u) => {
  });

}

validateSitemap().catch(console.error);
