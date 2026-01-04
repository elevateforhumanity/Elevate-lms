#!/usr/bin/env node

import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const DIST_DIR = 'dist';
const SITEMAPS_DIR = join(DIST_DIR, 'sitemaps');

console.log('🕷️  Testing Page Crawlability\n');

// Parse sitemap to get all URLs
function parseSitemap(content) {
  const urls = [];
  const matches = content.matchAll(/<loc>(.*?)<\/loc>/g);
  for (const match of matches) {
    urls.push(match[1]);
  }
  return urls;
}

// Get all URLs from sitemaps
const sitemapFiles = ['sitemap-1.xml', 'sitemap-2.xml', 'sitemap-3.xml'];
let allUrls = [];

sitemapFiles.forEach((file) => {
  try {
    const content = readFileSync(join(SITEMAPS_DIR, file), 'utf8');
    const urls = parseSitemap(content);
    allUrls = allUrls.concat(urls);
  } catch (error) {
    console.log(`⚠️  Could not read ${file}`);
  }
});

console.log(`📊 Found ${allUrls.length} URLs in sitemaps\n`);

// Check robots.txt
console.log('🤖 Robots.txt Analysis:');
const robotsContent = readFileSync(join(DIST_DIR, 'robots.txt'), 'utf8');

const disallowRules = robotsContent
  .split('\n')
  .filter((line) => line.trim().startsWith('Disallow:'))
  .map((line) => line.split(':')[1].trim());

console.log(`   Found ${disallowRules.length} Disallow rules:`);
disallowRules.forEach((rule) => {
  console.log(`   - ${rule}`);
});

// Check if any sitemap URLs are blocked
console.log('\n🚫 Checking for blocked URLs:');
let blockedCount = 0;

allUrls.forEach((url) => {
  const path = new URL(url).pathname;
  const isBlocked = disallowRules.some((rule) => {
    if (rule.endsWith('*')) {
      return path.startsWith(rule.slice(0, -1));
    }
    return path.startsWith(rule);
  });

  if (isBlocked) {
    console.log(`   ❌ ${path} (blocked by robots.txt)`);
    blockedCount++;
  }
});

if (blockedCount === 0) {
  console.log('   ✅ No sitemap URLs are blocked');
} else {
  console.log(`   ⚠️  ${blockedCount} URLs are blocked!`);
}

// Check for common SEO issues
console.log('\n🔍 SEO Checks:');

// Check for duplicate URLs
const uniqueUrls = new Set(allUrls);
if (uniqueUrls.size < allUrls.length) {
  console.log(
    `   ⚠️  Found ${allUrls.length - uniqueUrls.size} duplicate URLs`
  );
} else {
  console.log('   ✅ No duplicate URLs');
}

// Check URL structure
const issues = {
  tooLong: [],
  hasQuery: [],
  hasFragment: [],
  notHttps: [],
};

allUrls.forEach((url) => {
  if (url.length > 100) issues.tooLong.push(url);
  if (url.includes('?')) issues.hasQuery.push(url);
  if (url.includes('#')) issues.hasFragment.push(url);
  if (!url.startsWith('https://')) issues.notHttps.push(url);
});

if (issues.tooLong.length > 0) {
  console.log(
    `   ⚠️  ${issues.tooLong.length} URLs are very long (>100 chars)`
  );
}
if (issues.hasQuery.length > 0) {
  console.log(`   ⚠️  ${issues.hasQuery.length} URLs contain query parameters`);
}
if (issues.hasFragment.length > 0) {
  console.log(`   ⚠️  ${issues.hasFragment.length} URLs contain fragments (#)`);
}
if (issues.notHttps.length > 0) {
  console.log(`   ❌ ${issues.notHttps.length} URLs are not HTTPS!`);
} else {
  console.log('   ✅ All URLs use HTTPS');
}

if (
  issues.tooLong.length === 0 &&
  issues.hasQuery.length === 0 &&
  issues.hasFragment.length === 0
) {
  console.log('   ✅ All URLs have clean structure');
}

// Priority distribution
console.log('\n📊 Priority Distribution:');
const priorities = {
  '1.0': 0,
  0.9: 0,
  0.8: 0,
  0.7: 0,
  0.5: 0,
};

sitemapFiles.forEach((file) => {
  try {
    const content = readFileSync(join(SITEMAPS_DIR, file), 'utf8');
    Object.keys(priorities).forEach((priority) => {
      const matches = content.match(
        new RegExp(`<priority>${priority}</priority>`, 'g')
      );
      if (matches) priorities[priority] += matches.length;
    });
  } catch (error) {}
});

Object.entries(priorities).forEach(([priority, count]) => {
  if (count > 0) {
    const bar = '█'.repeat(Math.ceil(count / 5));
    console.log(`   ${priority}: ${bar} (${count} pages)`);
  }
});

// Crawl recommendations
console.log('\n💡 Recommendations:');
console.log('   1. Submit sitemap to Google Search Console');
console.log('   2. Submit sitemap to Bing Webmaster Tools');
console.log('   3. Monitor crawl stats in search console');
console.log('   4. Check for crawl errors weekly');
console.log('   5. Update sitemap after major content changes');

console.log('\n✨ Crawlability test complete!\n');
