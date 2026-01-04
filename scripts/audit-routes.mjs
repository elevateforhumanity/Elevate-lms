#!/usr/bin/env node
/**
 * Route Audit Script
 * Verifies all routes in the navigation registry have corresponding page files
 * Run daily in CI to catch missing pages
 */

import { readdir, access } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

// Navigation registry (inline for now - can import from lib/nav/registry.ts later)
const NAV = [
  // Students
  { group: 'Students', label: 'Apply', href: '/apply' },
  { group: 'Students', label: 'Contact', href: '/contact' },
  { group: 'Students', label: 'Login', href: '/login' },
  { group: 'Students', label: 'Sign Up', href: '/signup' },
  { group: 'Students', label: 'FAQ', href: '/faq' },

  // Programs
  { group: 'Programs', label: 'All Programs', href: '/programs' },
  { group: 'Programs', label: 'Apprenticeships', href: '/apprenticeships' },
  { group: 'Programs', label: 'Barber Apprenticeship', href: '/programs/barber-apprenticeship' },
  { group: 'Programs', label: 'Healthcare', href: '/programs/healthcare' },
  { group: 'Programs', label: 'Skilled Trades', href: '/programs/skilled-trades' },
  { group: 'Programs', label: 'CDL & Transportation', href: '/programs/cdl-transportation' },
  { group: 'Programs', label: 'Business & Financial', href: '/programs/business-financial' },
  { group: 'Programs', label: 'Tax & Entrepreneurship', href: '/programs/tax-entrepreneurship' },
  { group: 'Programs', label: 'JRI Programs', href: '/programs/jri' },

  // Employers
  { group: 'Employers', label: 'For Employers', href: '/employers' },
  { group: 'Employers', label: 'Partner With Us', href: '/partner-with-us' },

  // Tax Services
  { group: 'Tax', label: 'Tax Services', href: '/tax' },
  { group: 'Tax', label: 'Rise Up Foundation (Free)', href: '/vita' },
  { group: 'Tax', label: 'SupersonicFastCash (Paid)', href: '/tax/supersonicfastcash' },

  // About
  { group: 'About', label: 'About Us', href: '/about' },
];

async function pageExists(route) {
  const appDir = join(projectRoot, 'app');
  
  // Remove leading slash and convert to path
  const routePath = route.slice(1) || '';
  const pagePath = join(appDir, routePath, 'page.tsx');
  const pagePathJs = join(appDir, routePath, 'page.js');
  
  try {
    await access(pagePath);
    return { exists: true, path: pagePath };
  } catch {
    try {
      await access(pagePathJs);
      return { exists: true, path: pagePathJs };
    } catch {
      return { exists: false, path: pagePath };
    }
  }
}

async function checkRoutes() {
  console.log('='.repeat(80));
  console.log('ROUTE AUDIT - Checking Navigation Registry');
  console.log('='.repeat(80));
  console.log('');

  const results = [];
  const missing = [];

  for (const item of NAV) {
    const result = await pageExists(item.href);
    results.push({
      ...item,
      ...result,
    });

    if (!result.exists) {
      missing.push(item);
    }
  }

  // Report
  console.log(`Total Routes: ${NAV.length}`);
  console.log(`Found: ${results.filter(r => r.exists).length}`);
  console.log(`Missing: ${missing.length}`);
  console.log('');

  if (missing.length > 0) {
    console.log('❌ MISSING ROUTES:');
    console.log('');
    missing.forEach(item => {
      console.log(`  ${item.group.padEnd(15)} ${item.label.padEnd(30)} ${item.href}`);
    });
    console.log('');
    console.log('Action Required: Create these pages or update the navigation registry.');
    console.log('');
    process.exit(1);
  } else {
    console.log('✅ All routes have corresponding pages!');
    console.log('');
    process.exit(0);
  }
}

checkRoutes().catch(err => {
  console.error('Error running route audit:', err);
  process.exit(1);
});
