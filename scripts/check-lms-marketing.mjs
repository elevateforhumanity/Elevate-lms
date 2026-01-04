#!/usr/bin/env node
import { readdir, readFile, access } from 'fs/promises';
import { join } from 'path';

console.log('='.repeat(80));
console.log('LMS & MARKETING SITE - COMPLETENESS CHECK');
console.log('='.repeat(80));
console.log('');

// Check LMS pages
console.log('📚 LMS PORTAL PAGES');
console.log('-'.repeat(80));

const lmsPages = [
  'app/lms/(app)/dashboard/page.tsx',
  'app/lms/(app)/courses/page.tsx',
  'app/lms/(app)/analytics/page.tsx',
  'app/lms/(app)/social/page.tsx',
  'app/lms/(app)/collaborate/page.tsx',
  'app/lms/(app)/builder/page.tsx',
  'app/lms/(app)/integrations/page.tsx',
];

let lmsComplete = 0;
const lmsTotal = lmsPages.length;

for (const page of lmsPages) {
  try {
    const content = await readFile(page, 'utf-8');
    const lines = content.split('\n').length;
    const hasMetadata = content.includes('export const metadata') || content.includes('generateMetadata');
    const hasExport = content.includes('export default');
    
    const status = hasExport && lines > 20 ? '✅' : '⚠️';
    const metaStatus = hasMetadata ? '✅' : '❌';
    
    if (hasExport && lines > 20) lmsComplete++;
    
    const pageName = page.split('/').pop().replace('.tsx', '');
    console.log(`${status} ${pageName.padEnd(20)} ${lines.toString().padStart(4)} lines  Meta: ${metaStatus}`);
  } catch (err) {
    console.log(`❌ ${page.split('/').pop().padEnd(20)} NOT FOUND`);
  }
}

console.log('');
console.log(`LMS Completeness: ${lmsComplete}/${lmsTotal} (${Math.round(lmsComplete/lmsTotal*100)}%)`);
console.log('');

// Check marketing pages
console.log('📢 MARKETING SITE PAGES');
console.log('-'.repeat(80));

const marketingPages = [
  { path: 'app/page.tsx', name: 'Homepage' },
  { path: 'app/about/page.tsx', name: 'About' },
  { path: 'app/programs/page.tsx', name: 'Programs' },
  { path: 'app/employers/page.tsx', name: 'Employers' },
  { path: 'app/apprenticeships/page.tsx', name: 'Apprenticeships' },
  { path: 'app/apply/page.tsx', name: 'Apply' },
  { path: 'app/contact/page.tsx', name: 'Contact' },
  { path: 'app/vita/page.tsx', name: 'VITA (Free Tax)' },
  { path: 'app/tax/supersonicfastcash/page.tsx', name: 'SupersonicFastCash' },
];

let marketingComplete = 0;
const marketingTotal = marketingPages.length;

for (const { path, name } of marketingPages) {
  try {
    const content = await readFile(path, 'utf-8');
    const lines = content.split('\n').length;
    const hasMetadata = content.includes('export const metadata') || content.includes('generateMetadata');
    const hasExport = content.includes('export default');
    
    const status = hasExport && lines > 20 ? '✅' : '⚠️';
    const metaStatus = hasMetadata ? '✅' : '❌';
    
    if (hasExport && lines > 20) marketingComplete++;
    
    console.log(`${status} ${name.padEnd(25)} ${lines.toString().padStart(4)} lines  Meta: ${metaStatus}`);
  } catch (err) {
    console.log(`❌ ${name.padEnd(25)} NOT FOUND`);
  }
}

console.log('');
console.log(`Marketing Completeness: ${marketingComplete}/${marketingTotal} (${Math.round(marketingComplete/marketingTotal*100)}%)`);
console.log('');

// Check for missing features
console.log('🔍 FEATURE COMPLETENESS');
console.log('-'.repeat(80));

const features = [
  { name: 'LMS Dashboard', path: 'app/lms/(app)/dashboard/page.tsx', category: 'LMS' },
  { name: 'Course Catalog', path: 'app/lms/(app)/courses/page.tsx', category: 'LMS' },
  { name: 'Student Analytics', path: 'app/lms/(app)/analytics/page.tsx', category: 'LMS' },
  { name: 'Social Learning', path: 'app/lms/(app)/social/page.tsx', category: 'LMS' },
  { name: 'Course Builder', path: 'app/lms/(app)/builder/page.tsx', category: 'LMS' },
  { name: 'Blog/News', path: 'app/blog/page.tsx', category: 'Marketing' },
  { name: 'Success Stories', path: 'app/success-stories/page.tsx', category: 'Marketing' },
  { name: 'FAQ', path: 'app/faq/page.tsx', category: 'Marketing' },
  { name: 'Pricing', path: 'app/pricing/page.tsx', category: 'Marketing' },
];

let featuresPresent = 0;
const featuresTotal = features.length;

for (const { name, path, category } of features) {
  try {
    await access(path);
    console.log(`✅ ${name.padEnd(25)} [${category}]`);
    featuresPresent++;
  } catch (err) {
    console.log(`❌ ${name.padEnd(25)} [${category}] - MISSING`);
  }
}

console.log('');
console.log(`Feature Completeness: ${featuresPresent}/${featuresTotal} (${Math.round(featuresPresent/featuresTotal*100)}%)`);
console.log('');

// Overall assessment
console.log('='.repeat(80));
console.log('OVERALL ASSESSMENT');
console.log('='.repeat(80));
console.log('');

const lmsScore = Math.round(lmsComplete/lmsTotal*100);
const marketingScore = Math.round(marketingComplete/marketingTotal*100);
const featureScore = Math.round(featuresPresent/featuresTotal*100);
const overallScore = Math.round((lmsScore + marketingScore + featureScore) / 3);

console.log(`LMS Portal:      ${lmsScore}/100 ${lmsScore >= 90 ? '✅' : '⚠️'}`);
console.log(`Marketing Site:  ${marketingScore}/100 ${marketingScore >= 90 ? '✅' : '⚠️'}`);
console.log(`Features:        ${featureScore}/100 ${featureScore >= 90 ? '✅' : '⚠️'}`);
console.log('');
console.log(`Overall:         ${overallScore}/100 ${overallScore >= 90 ? '✅' : '⚠️'}`);
console.log('');

// Recommendations
console.log('='.repeat(80));
console.log('RECOMMENDATIONS');
console.log('='.repeat(80));
console.log('');

if (lmsScore < 100) {
  console.log('LMS Portal:');
  console.log('  • Add metadata to all LMS pages');
  console.log('  • Ensure all pages have 20+ lines of content');
  console.log('  • Add loading states and error handling');
  console.log('');
}

if (marketingScore < 100) {
  console.log('Marketing Site:');
  console.log('  • Expand short pages (apply, contact)');
  console.log('  • Add more detailed content');
  console.log('  • Ensure all pages have proper metadata');
  console.log('');
}

if (featureScore < 100) {
  console.log('Missing Features:');
  console.log('  • Add blog/news section');
  console.log('  • Create success stories page');
  console.log('  • Add comprehensive FAQ');
  console.log('  • Consider pricing page if needed');
  console.log('');
}

console.log('='.repeat(80));

process.exit(overallScore >= 90 ? 0 : 1);
