#!/usr/bin/env node

/**
 * 5-MINUTE SPOT-CHECK — DOES THIS SYSTEM ACTUALLY WORK?
 * 
 * Randomly samples pages to verify archetype system integrity
 * Detects rushed work, fake completeness, or archetype bypassing
 */

import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const ROOT = process.cwd();
const APP_DIR = path.join(ROOT, 'app');

// Sample categories
const CATEGORIES = {
  program: ['/programs/', '/courses/', '/lms/', '/apprenticeships/'],
  dashboard: ['/dashboard', '/student/', '/instructor/', '/admin/', '/portal/'],
  policy: ['/privacy', '/terms', '/accessibility', '/ferpa', '/legal/'],
  directory: ['/directory', '/search', '/opportunities', '/all-pages'],
  marketing: ['/', '/about', '/contact', '/blog/', '/faq', '/impact']
};

function getAllPages() {
  const pages = [];
  
  function walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.name === 'page.tsx') {
        pages.push(fullPath);
      }
    }
  }
  
  walk(APP_DIR);
  return pages;
}

function fileToRoute(file) {
  const rel = path.relative(APP_DIR, file);
  const parts = rel.split(path.sep);
  parts.pop(); // Remove page.tsx
  
  const cleaned = parts
    .filter(seg => !seg.startsWith('(') || !seg.endsWith(')'))
    .filter(seg => !seg.startsWith('@'));
  
  return '/' + cleaned.join('/');
}

function matchesCategory(route, patterns) {
  return patterns.some(pattern => route.includes(pattern));
}

function samplePages(pages, count = 10) {
  const samples = {
    program: [],
    dashboard: [],
    policy: [],
    directory: [],
    marketing: []
  };
  
  // Categorize all pages
  for (const page of pages) {
    const route = fileToRoute(page);
    for (const [category, patterns] of Object.entries(CATEGORIES)) {
      if (matchesCategory(route, patterns)) {
        samples[category].push({ file: page, route });
        break;
      }
    }
  }
  
  // Sample 2 from each category
  const selected = [];
  for (const [category, items] of Object.entries(samples)) {
    if (items.length > 0) {
      const shuffled = items.sort(() => Math.random() - 0.5);
      selected.push(...shuffled.slice(0, 2));
    }
  }
  
  return selected.slice(0, count);
}

function checkArchetypeIntegrity(file) {
  const content = fs.readFileSync(file, 'utf8');
  
  const checks = {
    hasArchetypeImport: /import.*from.*archetype/i.test(content),
    hasInlineLayout: /<div[^>]*className="[^"]*hero[^"]*"/.test(content) && !/<Hero/.test(content),
    hasInlineCopy: content.split('\n').filter(line => 
      line.includes('className=') && 
      line.includes('>') && 
      !line.includes('import') &&
      !line.includes('//')
    ).length > 20
  };
  
  return checks;
}

function checkForbiddenPhrases(file) {
  const content = fs.readFileSync(file, 'utf8').toLowerCase();
  const forbidden = [
    'coming soon',
    'placeholder',
    'tbd',
    'lorem ipsum',
    'under development',
    'work in progress'
  ];
  
  const found = [];
  for (const phrase of forbidden) {
    if (content.includes(phrase)) {
      found.push(phrase);
    }
  }
  
  return found;
}

function checkMetadata(file) {
  const content = fs.readFileSync(file, 'utf8');
  
  const hasMetadata = /export\s+(const\s+metadata|async\s+function\s+generateMetadata)/.test(content);
  
  let title = null;
  const titleMatch = content.match(/title:\s*['"`]([^'"`]+)['"`]/);
  if (titleMatch) {
    title = titleMatch[1];
  }
  
  return { hasMetadata, title };
}

console.log('🔍 5-MINUTE SPOT-CHECK\n');
console.log('Sampling 10 random pages across archetypes...\n');

const allPages = getAllPages();
const samples = samplePages(allPages);

console.log(`Total pages: ${allPages.length}`);
console.log(`Sampled: ${samples.length}\n`);

let failures = 0;

for (let i = 0; i < samples.length; i++) {
  const { file, route } = samples[i];
  console.log(`\n[${i + 1}/${samples.length}] ${route}`);
  console.log('─'.repeat(60));
  
  // Check 1: Forbidden phrases
  const forbidden = checkForbiddenPhrases(file);
  if (forbidden.length > 0) {
    console.log(`❌ FAIL: Contains forbidden phrases: ${forbidden.join(', ')}`);
    failures++;
    continue;
  } else {
    console.log('✓ No forbidden phrases');
  }
  
  // Check 2: Archetype integrity
  const integrity = checkArchetypeIntegrity(file);
  if (integrity.hasInlineLayout && !integrity.hasArchetypeImport) {
    console.log('⚠️  WARNING: Has inline layout without archetype import');
  } else if (integrity.hasArchetypeImport) {
    console.log('✓ Uses archetype system');
  } else {
    console.log('○ No archetype import detected (may be valid for simple pages)');
  }
  
  // Check 3: Metadata
  const metadata = checkMetadata(file);
  if (!metadata.hasMetadata) {
    console.log('❌ FAIL: Missing metadata export');
    failures++;
  } else {
    console.log(`✓ Has metadata: "${metadata.title}"`);
  }
  
  // Check 4: File size (proxy for content)
  const stats = fs.statSync(file);
  const sizeKB = (stats.size / 1024).toFixed(1);
  if (stats.size < 500) {
    console.log(`⚠️  WARNING: Very small file (${sizeKB}KB) - may lack content`);
  } else {
    console.log(`✓ File size: ${sizeKB}KB`);
  }
}

console.log('\n' + '='.repeat(60));
console.log('\nSTEP 5: AUTOMATION PROOF\n');
console.log('Running: npm run archetype:check\n');

try {
  execSync('npm run archetype:check', { 
    encoding: 'utf8',
    stdio: 'inherit'
  });
  console.log('\n✅ Archetype check passed');
} catch (error) {
  console.log('\n❌ Archetype check failed');
  failures++;
}

console.log('\n' + '='.repeat(60));
console.log('\nRESULTS\n');

if (failures === 0) {
  console.log('✅ SPOT-CHECK PASSED');
  console.log('\nAll sampled pages meet quality standards.');
  console.log('Archetype system is enforcing correctness.');
} else {
  console.log('❌ SPOT-CHECK FAILED');
  console.log(`\n${failures} issue(s) detected in sampled pages.`);
  console.log('\nArchetype system is not preventing bad pages.');
  console.log('Delivery is NOT ACCEPTED.');
  process.exit(1);
}

console.log('\n' + '='.repeat(60));
console.log('\nONE-LINE DECISION RULE:');
console.log('If any sampled page fails, the delivery is not accepted.');
console.log('Archetypes must guarantee correctness everywhere.\n');
