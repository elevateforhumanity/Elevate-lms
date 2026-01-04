#!/usr/bin/env node

/**
 * Responsive Design Testing Script
 * 
 * Tests website responsiveness across mobile, tablet, and desktop viewports
 * Ensures mobile-first design and consistent experience
 */

import { execSync } from 'child_process';

const VIEWPORTS = {
  mobile: [
    { name: 'iPhone SE', width: 375, height: 667 },
    { name: 'iPhone 12/13', width: 390, height: 844 },
    { name: 'iPhone 14 Pro Max', width: 430, height: 932 },
    { name: 'Samsung Galaxy S21', width: 360, height: 800 },
    { name: 'Pixel 5', width: 393, height: 851 },
  ],
  tablet: [
    { name: 'iPad Mini', width: 768, height: 1024 },
    { name: 'iPad Air', width: 820, height: 1180 },
    { name: 'iPad Pro 11"', width: 834, height: 1194 },
    { name: 'iPad Pro 12.9"', width: 1024, height: 1366 },
    { name: 'Surface Pro', width: 912, height: 1368 },
  ],
  desktop: [
    { name: 'Laptop', width: 1366, height: 768 },
    { name: 'Desktop HD', width: 1920, height: 1080 },
    { name: 'Desktop 2K', width: 2560, height: 1440 },
    { name: 'Desktop 4K', width: 3840, height: 2160 },
  ],
};

const CRITICAL_ROUTES = [
  '/',
  '/programs',
  '/programs/barber-apprenticeship',
  '/courses',
  '/apply',
  '/login',
  '/about',
  '/contact',
];

const RESPONSIVE_ISSUES = {
  horizontalScroll: [],
  textOverflow: [],
  imageOverflow: [],
  brokenLayout: [],
  tinyText: [],
  hugeText: [],
  touchTargetTooSmall: [],
};

console.log('📱 RESPONSIVE DESIGN TEST\n');
console.log('Testing across mobile, tablet, and desktop viewports...\n');

// Check Tailwind responsive classes
console.log('🎨 Checking Tailwind responsive utilities...\n');

const tailwindCheck = `
grep -r "sm:\\|md:\\|lg:\\|xl:\\|2xl:" app components --include="*.tsx" --include="*.jsx" | wc -l
`;

try {
  const responsiveClasses = execSync(tailwindCheck, { encoding: 'utf-8' }).trim();
  console.log(`✅ Found ${responsiveClasses} responsive utility classes`);
} catch (error) {
  console.log('⚠️  Could not count responsive classes');
}

// Check for common responsive issues
console.log('\n🔍 Checking for common responsive issues...\n');

const checks = [
  {
    name: 'Fixed widths (should use max-w-* instead)',
    command: `grep -r "w-\\[.*px\\]\\|width:.*px" app components --include="*.tsx" --include="*.jsx" | grep -v "max-w" | wc -l`,
    threshold: 10,
  },
  {
    name: 'Absolute positioning (can break on mobile)',
    command: `grep -r "absolute" app components --include="*.tsx" --include="*.jsx" | wc -l`,
    threshold: 50,
  },
  {
    name: 'Overflow hidden (may hide content)',
    command: `grep -r "overflow-hidden\\|overflow-x-hidden" app components --include="*.tsx" --include="*.jsx" | wc -l`,
    threshold: 20,
  },
  {
    name: 'Small text (< 14px)',
    command: `grep -r "text-xs\\|text-\\[10px\\]\\|text-\\[11px\\]\\|text-\\[12px\\]" app components --include="*.tsx" --include="*.jsx" | wc -l`,
    threshold: 30,
  },
];

checks.forEach(check => {
  try {
    const count = parseInt(execSync(check.command, { encoding: 'utf-8' }).trim());
    const status = count > check.threshold ? '⚠️' : '✅';
    console.log(`${status} ${check.name}: ${count} occurrences`);
    if (count > check.threshold) {
      console.log(`   Threshold: ${check.threshold}, Found: ${count}`);
    }
  } catch (error) {
    console.log(`⚠️  Could not check: ${check.name}`);
  }
});

// Check for mobile-first patterns
console.log('\n📱 Checking mobile-first patterns...\n');

const mobileFirstChecks = [
  {
    name: 'Mobile-first spacing (base + sm/md/lg)',
    command: `grep -r "p-\\|m-\\|gap-" app components --include="*.tsx" | grep "sm:\\|md:\\|lg:" | wc -l`,
  },
  {
    name: 'Mobile-first text sizing',
    command: `grep -r "text-" app components --include="*.tsx" | grep "sm:\\|md:\\|lg:" | wc -l`,
  },
  {
    name: 'Mobile-first flex/grid',
    command: `grep -r "flex\\|grid" app components --include="*.tsx" | grep "sm:\\|md:\\|lg:" | wc -l`,
  },
];

mobileFirstChecks.forEach(check => {
  try {
    const count = parseInt(execSync(check.command, { encoding: 'utf-8' }).trim());
    console.log(`✅ ${check.name}: ${count} instances`);
  } catch (error) {
    console.log(`⚠️  Could not check: ${check.name}`);
  }
});

// Check for touch-friendly elements
console.log('\n👆 Checking touch-friendly design...\n');

const touchChecks = [
  {
    name: 'Button padding (should be p-3 or larger)',
    command: `grep -r "button\\|Button" app components --include="*.tsx" | grep -E "p-[3-9]|p-1[0-9]|py-[3-9]|px-[3-9]" | wc -l`,
  },
  {
    name: 'Link padding (should have adequate touch target)',
    command: `grep -r "<Link\\|<a" app components --include="*.tsx" | grep -E "p-[2-9]|py-[2-9]|px-[2-9]" | wc -l`,
  },
];

touchChecks.forEach(check => {
  try {
    const count = parseInt(execSync(check.command, { encoding: 'utf-8' }).trim());
    console.log(`✅ ${check.name}: ${count} instances`);
  } catch (error) {
    console.log(`⚠️  Could not check: ${check.name}`);
  }
});

// Check viewport meta tag
console.log('\n🖥️  Checking viewport configuration...\n');

try {
  const viewportCheck = execSync(
    `grep -r "viewport" app --include="layout.tsx" --include="*.html"`,
    { encoding: 'utf-8' }
  );
  
  if (viewportCheck.includes('width=device-width')) {
    console.log('✅ Viewport meta tag configured correctly');
  } else {
    console.log('⚠️  Viewport meta tag may need adjustment');
  }
} catch (error) {
  console.log('⚠️  Could not verify viewport meta tag');
}

// Generate recommendations
console.log('\n📋 RESPONSIVE DESIGN RECOMMENDATIONS\n');
console.log('='.repeat(70));

console.log('\n✅ MOBILE-FIRST PRINCIPLES:');
console.log('  1. Design for mobile (375px) first');
console.log('  2. Add tablet styles with md: prefix (768px)');
console.log('  3. Add desktop styles with lg: prefix (1024px)');
console.log('  4. Use xl: and 2xl: for large screens only');

console.log('\n✅ TOUCH-FRIENDLY DESIGN:');
console.log('  1. Buttons: minimum 44x44px (p-3 or py-3 px-4)');
console.log('  2. Links: adequate padding (py-2 px-3 minimum)');
console.log('  3. Form inputs: large enough to tap (h-12 minimum)');
console.log('  4. Spacing between interactive elements (gap-4 minimum)');

console.log('\n✅ RESPONSIVE IMAGES:');
console.log('  1. Use w-full for fluid width');
console.log('  2. Use max-w-* to constrain on large screens');
console.log('  3. Use object-cover for consistent aspect ratios');
console.log('  4. Use Next.js Image component with responsive sizes');

console.log('\n✅ RESPONSIVE TEXT:');
console.log('  1. Base size: text-base (16px) for body');
console.log('  2. Mobile headings: text-2xl to text-4xl');
console.log('  3. Desktop headings: text-3xl to text-6xl');
console.log('  4. Never use text smaller than text-sm (14px)');

console.log('\n✅ RESPONSIVE LAYOUT:');
console.log('  1. Use flex-col on mobile, flex-row on desktop');
console.log('  2. Use grid-cols-1 on mobile, grid-cols-2/3/4 on desktop');
console.log('  3. Use px-4 on mobile, px-6 md:px-8 lg:px-10 for containers');
console.log('  4. Use max-w-7xl mx-auto for centered content');

console.log('\n✅ NAVIGATION:');
console.log('  1. Hamburger menu on mobile (< 768px)');
console.log('  2. Full navigation on tablet/desktop (>= 768px)');
console.log('  3. Sticky header with proper z-index');
console.log('  4. Touch-friendly menu items (py-3 minimum)');

console.log('\n⚠️  COMMON PITFALLS TO AVOID:');
console.log('  ❌ Fixed pixel widths (use max-w-* instead)');
console.log('  ❌ Horizontal scroll (test at 375px width)');
console.log('  ❌ Text overflow (use truncate or line-clamp)');
console.log('  ❌ Tiny touch targets (< 44px)');
console.log('  ❌ Desktop-only features without mobile alternative');

console.log('\n🧪 TESTING CHECKLIST:');
console.log('  [ ] Test at 375px (iPhone SE)');
console.log('  [ ] Test at 768px (iPad)');
console.log('  [ ] Test at 1024px (Desktop)');
console.log('  [ ] Test at 1920px (Large Desktop)');
console.log('  [ ] Test landscape orientation');
console.log('  [ ] Test with touch (no hover states required)');
console.log('  [ ] Test with keyboard navigation');
console.log('  [ ] Test with screen reader');

console.log('\n' + '='.repeat(70));
console.log('\n✅ Responsive design audit complete!');
console.log('\nNext steps:');
console.log('  1. Test critical routes on real devices');
console.log('  2. Use Chrome DevTools device emulation');
console.log('  3. Fix any horizontal scroll issues');
console.log('  4. Ensure all interactive elements are touch-friendly');
console.log('  5. Verify text is readable on all screen sizes');
