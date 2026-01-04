#!/usr/bin/env node

import { readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const results = {
  authGuards: [],
  publicRoutes: [],
  protectedRoutes: [],
  apiRoutes: [],
  rlsPolicies: [],
  securityIssues: [],
  copyrightNotices: [],
};

// Scan for auth patterns
function scanFile(filePath, content) {
  const relativePath = filePath.replace(process.cwd() + '/', '');
  
  // Auth guards
  if (content.includes('requireRole') || content.includes('requireAuth')) {
    results.authGuards.push(relativePath);
  }
  
  // Public routes (no auth check)
  if (filePath.includes('app/') && filePath.endsWith('page.tsx')) {
    const hasAuth = content.includes('getUser()') || 
                    content.includes('getSession()') ||
                    content.includes('requireRole') ||
                    content.includes('requireAuth');
    
    if (!hasAuth && !filePath.includes('(auth)') && !filePath.includes('login') && !filePath.includes('signup')) {
      results.publicRoutes.push(relativePath);
    } else if (hasAuth) {
      results.protectedRoutes.push(relativePath);
    }
  }
  
  // API routes
  if (filePath.includes('app/api/') && filePath.endsWith('route.ts')) {
    results.apiRoutes.push(relativePath);
  }
  
  // Security issues
  if (content.includes('console.log') && filePath.includes('app/')) {
    results.securityIssues.push({
      file: relativePath,
      issue: 'console.log found (potential info leak)',
      severity: 'LOW'
    });
  }
  
  if (content.includes('process.env') && !content.includes('NEXT_PUBLIC_')) {
    const isClientComponent = content.includes("'use client'");
    if (isClientComponent) {
      results.securityIssues.push({
        file: relativePath,
        issue: 'Server-only env var in client component',
        severity: 'HIGH'
      });
    }
  }
  
  // Copyright notices
  if (content.includes('© 2024') || content.includes('© 2025') || content.includes('Elevate for Humanity')) {
    if (content.toLowerCase().includes('copyright') || content.toLowerCase().includes('all rights reserved')) {
      results.copyrightNotices.push(relativePath);
    }
  }
}

function scanDirectory(dir) {
  const items = readdirSync(dir);
  
  for (const item of items) {
    const fullPath = join(dir, item);
    const stat = statSync(fullPath);
    
    if (stat.isDirectory()) {
      if (!item.startsWith('.') && item !== 'node_modules') {
        scanDirectory(fullPath);
      }
    } else if (item.endsWith('.tsx') || item.endsWith('.ts')) {
      const content = readFileSync(fullPath, 'utf-8');
      scanFile(fullPath, content);
    }
  }
}

console.log('Scanning repository for security patterns...\n');
scanDirectory('app');

// Check for RLS policies in migrations
try {
  const migrations = readdirSync('supabase/migrations');
  for (const file of migrations) {
    const content = readFileSync(join('supabase/migrations', file), 'utf-8');
    if (content.includes('ROW LEVEL SECURITY') || content.includes('CREATE POLICY')) {
      results.rlsPolicies.push(file);
    }
  }
} catch (e) {
  console.log('Note: Could not scan migrations directory');
}

// Output results
console.log('=== SECURITY AUDIT RESULTS ===\n');
console.log(`Auth Guards Found: ${results.authGuards.length}`);
console.log(`Public Routes: ${results.publicRoutes.length}`);
console.log(`Protected Routes: ${results.protectedRoutes.length}`);
console.log(`API Routes: ${results.apiRoutes.length}`);
console.log(`RLS Policy Files: ${results.rlsPolicies.length}`);
console.log(`Security Issues: ${results.securityIssues.length}`);
console.log(`Copyright Notices: ${results.copyrightNotices.length}\n`);

if (results.securityIssues.length > 0) {
  console.log('=== SECURITY ISSUES ===');
  const highSeverity = results.securityIssues.filter(i => i.severity === 'HIGH');
  console.log(`HIGH severity: ${highSeverity.length}`);
  highSeverity.slice(0, 5).forEach(issue => {
    console.log(`  - ${issue.file}: ${issue.issue}`);
  });
  if (highSeverity.length > 5) {
    console.log(`  ... and ${highSeverity.length - 5} more`);
  }
}

console.log('\n=== SAMPLE PUBLIC ROUTES (first 10) ===');
results.publicRoutes.slice(0, 10).forEach(route => {
  console.log(`  ${route}`);
});

console.log('\n=== SAMPLE PROTECTED ROUTES (first 10) ===');
results.protectedRoutes.slice(0, 10).forEach(route => {
  console.log(`  ${route}`);
});

// Save full results
import { writeFileSync } from 'fs';
writeFileSync('reports/security-audit.json', JSON.stringify(results, null, 2));
console.log('\nFull results saved to: reports/security-audit.json');
