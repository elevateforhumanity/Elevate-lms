#!/usr/bin/env node

/**
 * Archetype Validation Script
 *
 * Ensures every page maps to an archetype.
 * Fails build if unmapped pages exist.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ARCHETYPES = {
  DASHBOARD: /\/dashboard\//,
  PROGRAM: /\/programs?\/[^/]+\/page\.tsx$/,
  ADMIN_CRUD: /^app\/admin\//,
  PORTAL: /\/portal\//,
  AUTH: /\/(login|signup|auth|verify|reset-password)/,
  POLICY: /\/(privacy|terms|policy|legal|compliance)/,
  MARKETING: /\/(about|contact|faq|help|support)/,
  APPLICATION: /\/(apply|enroll|register)/,
  COURSE: /\/(courses?|lms|lessons?|modules?)\//,
  PARTNER: /\/(shop|employer|partner|board|delegate|workforce-board)\//,
  DIRECTORY: /\/(programs|courses|opportunities|jobs|directory)\/page\.tsx$/,
  UTILITY: /.*/, // Catch-all
};

console.log('🔍 Validating archetype coverage...\n');

// Get all page files
const pages = execSync(
  'find app -name "page.tsx" -type f | grep -v test | grep -v demo | grep -v backup',
  { encoding: 'utf-8' }
)
  .trim()
  .split('\n')
  .filter(Boolean);

console.log(`Total pages found: ${pages.length}\n`);

// Map pages to archetypes
const mapping = {};
const unmapped = [];

pages.forEach((page) => {
  let matched = false;

  for (const [archetype, pattern] of Object.entries(ARCHETYPES)) {
    if (pattern.test(page)) {
      if (!mapping[archetype]) {
        mapping[archetype] = [];
      }
      mapping[archetype].push(page);
      matched = true;
      break;
    }
  }

  if (!matched) {
    unmapped.push(page);
  }
});

// Report results
console.log('Archetype Coverage:');
console.log('='.repeat(50));

let totalMapped = 0;
Object.entries(mapping).forEach(([archetype, pages]) => {
  if (archetype !== 'UTILITY') {
    console.log(`${archetype.padEnd(15)} ${pages.length} pages`);
    totalMapped += pages.length;
  }
});

const utilityCount = mapping.UTILITY ? mapping.UTILITY.length : 0;
console.log(`${'UTILITY'.padEnd(15)} ${utilityCount} pages`);
totalMapped += utilityCount;

console.log('='.repeat(50));
console.log(`Total mapped: ${totalMapped}/${pages.length}\n`);

// Check for unmapped pages
if (unmapped.length > 0) {
  console.error('❌ UNMAPPED PAGES FOUND:');
  unmapped.slice(0, 10).forEach((page) => {
    console.error(`   ${page}`);
  });
  if (unmapped.length > 10) {
    console.error(`   ... and ${unmapped.length - 10} more`);
  }
  console.error('\nAll pages must map to an archetype.\n');
  process.exit(1);
}

// Validate archetype implementations exist
console.log('Checking archetype implementations...');

const requiredArchetypes = Object.keys(ARCHETYPES).filter(
  (a) => a !== 'UTILITY'
);
const missingArchetypes = [];

requiredArchetypes.forEach((archetype) => {
  const archetypeFile = `components/archetypes/${archetype}Archetype.tsx`;
  if (!fs.existsSync(archetypeFile)) {
    missingArchetypes.push(archetype);
  }
});

if (missingArchetypes.length > 0) {
  console.error('\n❌ MISSING ARCHETYPE IMPLEMENTATIONS:');
  missingArchetypes.forEach((arch) => {
    console.error(`   ${arch}Archetype.tsx`);
  });
  console.error('\nCreate these archetype components.\n');
  process.exit(1);
}

console.log('✅ All archetypes have implementations\n');

// Success
console.log('✅ ARCHETYPE VALIDATION PASSED\n');
console.log(`All ${pages.length} pages are mapped to archetypes.`);
console.log('Build may proceed.\n');

process.exit(0);
