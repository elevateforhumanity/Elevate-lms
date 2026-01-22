#!/usr/bin/env node
/**
 * Media Integrity Check
 * 
 * Scans source files for image/video references and verifies they exist.
 * Fails CI if any broken media references are found.
 * 
 * Output: reports/media_report.json
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '../..');
const reportsDir = path.join(rootDir, 'reports');
const publicDir = path.join(rootDir, 'public');

// Ensure reports directory exists
if (!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir, { recursive: true });
}

// Extract media URLs from source files
function extractMediaUrls(dir) {
  const mediaUrls = new Set();
  
  function scanFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Match src="/images/..." or src="/videos/..." patterns
    const srcMatches = content.matchAll(/src=["'](\/(images|videos)[^"']+)["']/g);
    for (const match of srcMatches) {
      mediaUrls.add(match[1]);
    }
    
    // Match videoUrl: "/videos/..." patterns
    const videoUrlMatches = content.matchAll(/videoUrl:\s*["']([^"']+)["']/g);
    for (const match of videoUrlMatches) {
      if (match[1].startsWith('/')) {
        mediaUrls.add(match[1]);
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
      } else if (
        entry.name.endsWith('.tsx') || 
        entry.name.endsWith('.jsx') ||
        entry.name.endsWith('.ts') ||
        entry.name.endsWith('.js')
      ) {
        scanFile(fullPath);
      }
    }
  }
  
  // Scan app directory
  scanDir(path.join(rootDir, 'app'));
  // Scan lms-data directory
  scanDir(path.join(rootDir, 'lms-data'));
  // Scan components directory
  scanDir(path.join(rootDir, 'components'));
  
  return Array.from(mediaUrls);
}

// Check if media file exists
function checkMediaExists(url) {
  const filePath = path.join(publicDir, url);
  return fs.existsSync(filePath);
}

// Main execution
const mediaUrls = extractMediaUrls(rootDir);

const brokenMedia = [];
const validMedia = [];

for (const url of mediaUrls) {
  if (checkMediaExists(url)) {
    validMedia.push({ url, status: 'valid' });
  } else {
    brokenMedia.push({ url, status: 'missing' });
  }
}

// Generate report
const report = {
  timestamp: new Date().toISOString(),
  summary: {
    totalMedia: mediaUrls.length,
    validMedia: validMedia.length,
    brokenMedia: brokenMedia.length,
  },
  brokenMedia,
  validMedia: validMedia.slice(0, 50), // Limit output size
};

fs.writeFileSync(
  path.join(reportsDir, 'media_report.json'),
  JSON.stringify(report, null, 2)
);

console.log('Media Integrity Report');
console.log('======================');
console.log(`Total media references: ${report.summary.totalMedia}`);
console.log(`Valid media: ${report.summary.validMedia}`);
console.log(`Broken media: ${report.summary.brokenMedia}`);

if (brokenMedia.length > 0) {
  console.log('\nBroken media found:');
  brokenMedia.forEach(({ url }) => console.log(`  ❌ ${url}`));
  console.log('\nReport saved to: reports/media_report.json');
  process.exit(1);
}

console.log('\n✅ All media valid');
process.exit(0);
