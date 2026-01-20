#!/usr/bin/env node
/**
 * Link Integrity Check
 * 
 * Scans built Next.js output for internal links and verifies they resolve.
 * Fails CI if any broken links are found.
 * 
 * Output: reports/link_report.json
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '../..');
const reportsDir = path.join(rootDir, 'reports');

// Ensure reports directory exists
if (!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir, { recursive: true });
}

// Collect all page routes from app directory
function collectRoutes(dir, basePath = '') {
  const routes = [];
  
  if (!fs.existsSync(dir)) {
    return routes;
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    if (entry.name.startsWith('_') || entry.name.startsWith('.')) continue;
    
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      // Skip route groups (parentheses)
      const routeSegment = entry.name.startsWith('(') ? '' : `/${entry.name}`;
      routes.push(...collectRoutes(fullPath, basePath + routeSegment));
    } else if (entry.name === 'page.tsx' || entry.name === 'page.js') {
      routes.push(basePath || '/');
    }
  }
  
  return routes;
}

// Extract href values from source files
function extractLinks(dir) {
  const links = new Set();
  
  function scanFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    // Match href="/..." patterns
    const hrefMatches = content.matchAll(/href=["']([^"']+)["']/g);
    for (const match of hrefMatches) {
      const href = match[1];
      // Only internal links
      if (href.startsWith('/') && !href.startsWith('//')) {
        // Remove query strings and anchors for route matching
        const cleanHref = href.split('?')[0].split('#')[0];
        links.add(cleanHref);
      }
    }
  }
  
  function scanDir(dirPath) {
    if (!fs.existsSync(dirPath)) return;
    
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.name === 'node_modules' || entry.name.startsWith('.')) continue;
      
      const fullPath = path.join(dirPath, entry.name);
      if (entry.isDirectory()) {
        scanDir(fullPath);
      } else if (entry.name.endsWith('.tsx') || entry.name.endsWith('.jsx')) {
        scanFile(fullPath);
      }
    }
  }
  
  scanDir(dir);
  return Array.from(links);
}

// Main execution
const appDir = path.join(rootDir, 'app');
const routes = collectRoutes(appDir);
const links = extractLinks(appDir);

// Check which links don't have corresponding routes
const brokenLinks = [];
const validLinks = [];

for (const link of links) {
  // Handle dynamic routes - skip them for now (they need runtime data)
  if (link.includes('[') || link.includes(']')) {
    validLinks.push({ link, status: 'dynamic-skipped' });
    continue;
  }
  
  // Check if route exists
  const routeExists = routes.some(route => {
    // Exact match
    if (route === link) return true;
    // Handle trailing slashes
    if (route === link + '/' || route + '/' === link) return true;
    return false;
  });
  
  if (routeExists) {
    validLinks.push({ link, status: 'valid' });
  } else {
    brokenLinks.push({ link, status: 'broken' });
  }
}

// Generate report
const report = {
  timestamp: new Date().toISOString(),
  summary: {
    totalLinks: links.length,
    validLinks: validLinks.filter(l => l.status === 'valid').length,
    brokenLinks: brokenLinks.length,
    dynamicSkipped: validLinks.filter(l => l.status === 'dynamic-skipped').length,
  },
  brokenLinks,
  validLinks: validLinks.slice(0, 50), // Limit output size
};

fs.writeFileSync(
  path.join(reportsDir, 'link_report.json'),
  JSON.stringify(report, null, 2)
);

console.log('Link Integrity Report');
console.log('=====================');
console.log(`Total links scanned: ${report.summary.totalLinks}`);
console.log(`Valid links: ${report.summary.validLinks}`);
console.log(`Broken links: ${report.summary.brokenLinks}`);
console.log(`Dynamic (skipped): ${report.summary.dynamicSkipped}`);

if (brokenLinks.length > 0) {
  console.log('\nBroken links found:');
  brokenLinks.forEach(({ link }) => console.log(`  ❌ ${link}`));
  console.log('\nReport saved to: reports/link_report.json');
  process.exit(1);
}

console.log('\n✅ All links valid');
process.exit(0);
