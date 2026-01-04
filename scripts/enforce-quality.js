#!/usr/bin/env node

/**
 * Quality Enforcement Script
 *
 * Fails CI if forbidden content patterns are detected.
 * Run this in pre-commit hooks and CI pipelines.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const FORBIDDEN_PHRASES = [
  'coming soon',
  'placeholder',
  'lorem ipsum',
  'tbd',
  'todo:',
  'under development',
  'will be available',
  'planned feature',
];

const VAGUE_CTAS = ['learn more', 'get started', 'click here', 'read more'];

const GENERIC_TITLES = [
  'empowering',
  'supporting your journey',
  'helping you succeed',
  'innovative solutions',
];

let errors = 0;

console.log('🔍 Running quality enforcement checks...\n');

// Check for forbidden phrases
console.log('1. Checking for forbidden phrases...');
FORBIDDEN_PHRASES.forEach((phrase) => {
  try {
    const result = execSync(
      `grep -ri "${phrase}" app --include="*.tsx" --include="*.ts" || true`,
      { encoding: 'utf-8' }
    );
    if (result.trim()) {
      console.error(`   ❌ Found forbidden phrase: "${phrase}"`);
      console.error(`      ${result.split('\n')[0]}`);
      errors++;
    }
  } catch (e) {
    // grep returns non-zero if no matches, which is what we want
  }
});

// Check for vague CTAs
console.log('\n2. Checking for vague CTAs...');
VAGUE_CTAS.forEach((cta) => {
  try {
    const result = execSync(
      `grep -ri "${cta}" app --include="*.tsx" | grep -E "button|link|href" || true`,
      { encoding: 'utf-8' }
    );
    if (result.trim()) {
      console.error(`   ❌ Found vague CTA: "${cta}"`);
      errors++;
    }
  } catch (e) {}
});

// Check for generic titles
console.log('\n3. Checking for generic titles...');
GENERIC_TITLES.forEach((title) => {
  try {
    const result = execSync(
      `grep -ri "${title}" app --include="*.tsx" | grep -E "title|h1|heading" || true`,
      { encoding: 'utf-8' }
    );
    if (result.trim()) {
      console.error(`   ❌ Found generic title pattern: "${title}"`);
      errors++;
    }
  } catch (e) {}
});

// Check for gradient overlays
console.log('\n4. Checking for gradient overlays...');
try {
  const result = execSync(
    `grep -r "from-.*-900/90\\|bg-gradient-to" app --include="*.tsx" | wc -l`,
    { encoding: 'utf-8' }
  );
  const count = parseInt(result.trim());
  if (count > 0) {
    console.error(`   ❌ Found ${count} gradient overlays (forbidden)`);
    errors++;
  }
} catch (e) {}

// Check for missing alt text
console.log('\n5. Checking for images without alt text...');
try {
  const result = execSync(
    `grep -r "<Image\\|<img" app --include="*.tsx" | grep -v "alt=" | wc -l`,
    { encoding: 'utf-8' }
  );
  const count = parseInt(result.trim());
  if (count > 50) {
    console.error(
      `   ⚠️  Warning: ${count} images potentially missing alt text`
    );
  }
} catch (e) {}

// Summary
console.log('\n' + '='.repeat(50));
if (errors > 0) {
  console.error(`\n❌ QUALITY CHECK FAILED: ${errors} violations found\n`);
  console.error('Fix these issues before committing.\n');
  process.exit(1);
} else {
  console.log('\n✅ QUALITY CHECK PASSED\n');
  process.exit(0);
}
