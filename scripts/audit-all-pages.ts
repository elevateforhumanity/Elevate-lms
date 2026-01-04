#!/usr/bin/env tsx

/**
 * Comprehensive audit of all pages in the application
 * Checks for:
 * - Supabase integration
 * - Form submissions
 * - Authentication requirements
 * - API route connections
 * - Database queries
 */

import * as fs from 'fs';
import * as path from 'path';

interface AuditResult {
  file: string;
  type: 'page' | 'api';
  issues: string[];
  hasSupabase: boolean;
  hasAuth: boolean;
  hasForms: boolean;
  hasApiCalls: boolean;
  status: 'ok' | 'warning' | 'error';
}

const results: AuditResult[] = [];

function getAllFiles(dir: string, fileList: string[] = []): string[] {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      if (file === 'node_modules' || file === '.next' || file === '.git') continue;
      getAllFiles(filePath, fileList);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      fileList.push(filePath);
    }
  }
  
  return fileList;
}

function auditFile(filePath: string): AuditResult {
  const content = fs.readFileSync(filePath, 'utf-8');
  const relativePath = filePath.replace(process.cwd() + '/', '');
  
  const result: AuditResult = {
    file: relativePath,
    type: filePath.includes('/api/') ? 'api' : 'page',
    issues: [],
    hasSupabase: false,
    hasAuth: false,
    hasForms: false,
    hasApiCalls: false,
    status: 'ok',
  };
  
  // Check for Supabase usage
  if (content.includes('createClient') || content.includes('supabase')) {
    result.hasSupabase = true;
  }
  
  // Check for authentication
  if (content.includes('auth.getUser') || content.includes('getSession')) {
    result.hasAuth = true;
  }
  
  // Check for forms
  if (content.includes('<form') || content.includes('onSubmit') || content.includes('handleSubmit')) {
    result.hasForms = true;
  }
  
  // Check for API calls
  if (content.includes('fetch(') || content.includes('axios')) {
    result.hasApiCalls = true;
  }
  
  // Check for common issues
  
  // Issue 1: Forms without submit handlers
  if (content.includes('<form') && !content.includes('onSubmit') && !content.includes('action=')) {
    result.issues.push('Form without submit handler');
    result.status = 'warning';
  }
  
  // Issue 2: API routes without error handling
  if (result.type === 'api' && !content.includes('try') && !content.includes('catch')) {
    result.issues.push('API route without error handling');
    result.status = 'error';
  }
  
  // Issue 3: Database queries without error handling
  if (result.hasSupabase && content.includes('.from(') && !content.includes('error')) {
    result.issues.push('Database query without error handling');
    result.status = 'warning';
  }
  
  // Issue 4: Wrong Supabase import
  if (content.includes("from '@supabase/supabase-js'") && !filePath.includes('/api/')) {
    result.issues.push('Using @supabase/supabase-js instead of @/lib/supabase/client');
    result.status = 'warning';
  }
  
  // Issue 5: Wrong table names (common mistakes)
  const wrongTables = [
    { wrong: 'tax_appointments', correct: 'appointments' },
    { wrong: 'tax-documents', correct: 'documents' },
  ];
  
  for (const { wrong, correct } of wrongTables) {
    if (content.includes(`'${wrong}'`) || content.includes(`"${wrong}"`)) {
      result.issues.push(`Using wrong table/bucket name '${wrong}', should be '${correct}'`);
      result.status = 'error';
    }
  }
  
  // Issue 6: user_id instead of email in tax_documents
  if (content.includes('tax_documents') && content.includes('user_id')) {
    result.issues.push('Using user_id with tax_documents table (should use email)');
    result.status = 'error';
  }
  
  // Issue 7: Missing authentication on protected pages
  if (filePath.includes('/portal/') && !result.hasAuth) {
    result.issues.push('Portal page without authentication check');
    result.status = 'error';
  }
  
  // Issue 8: Fetch without error handling
  if (content.includes('fetch(') && !content.includes('.catch') && !content.includes('try')) {
    result.issues.push('Fetch call without error handling');
    result.status = 'warning';
  }
  
  // Issue 9: Missing environment variables check
  if (content.includes('process.env.') && !content.includes('!') && result.type === 'api') {
    const envVars = content.match(/process\.env\.\w+/g);
    if (envVars && !content.includes('if (!')) {
      result.issues.push('Environment variables used without validation');
      result.status = 'warning';
    }
  }
  
  return result;
}

function generateReport(results: AuditResult[]) {
  const errors = results.filter(r => r.status === 'error');
  const warnings = results.filter(r => r.status === 'warning');
  const ok = results.filter(r => r.status === 'ok');
  
  console.log('\n' + '='.repeat(80));
  console.log('📊 COMPREHENSIVE PAGE AUDIT REPORT');
  console.log('='.repeat(80) + '\n');
  
  console.log(`Total files audited: ${results.length}`);
  console.log(`✅ OK: ${ok.length}`);
  console.log(`⚠️  Warnings: ${warnings.length}`);
  console.log(`❌ Errors: ${errors.length}\n`);
  
  console.log('='.repeat(80));
  console.log('📈 STATISTICS');
  console.log('='.repeat(80) + '\n');
  
  const withSupabase = results.filter(r => r.hasSupabase).length;
  const withAuth = results.filter(r => r.hasAuth).length;
  const withForms = results.filter(r => r.hasForms).length;
  const withApiCalls = results.filter(r => r.hasApiCalls).length;
  
  console.log(`Files with Supabase integration: ${withSupabase}`);
  console.log(`Files with authentication: ${withAuth}`);
  console.log(`Files with forms: ${withForms}`);
  console.log(`Files with API calls: ${withApiCalls}\n`);
  
  if (errors.length > 0) {
    console.log('='.repeat(80));
    console.log('❌ CRITICAL ERRORS (Must Fix)');
    console.log('='.repeat(80) + '\n');
    
    errors.forEach(result => {
      console.log(`📄 ${result.file}`);
      result.issues.forEach(issue => {
        console.log(`   ❌ ${issue}`);
      });
      console.log('');
    });
  }
  
  if (warnings.length > 0) {
    console.log('='.repeat(80));
    console.log('⚠️  WARNINGS (Should Fix)');
    console.log('='.repeat(80) + '\n');
    
    warnings.forEach(result => {
      console.log(`📄 ${result.file}`);
      result.issues.forEach(issue => {
        console.log(`   ⚠️  ${issue}`);
      });
      console.log('');
    });
  }
  
  // SupersonicFastCash specific audit
  console.log('='.repeat(80));
  console.log('🚀 SUPERSONIC FAST CASH AUDIT');
  console.log('='.repeat(80) + '\n');
  
  const supersonicFiles = results.filter(r => r.file.includes('supersonic-fast-cash'));
  const supersonicErrors = supersonicFiles.filter(r => r.status === 'error');
  const supersonicWarnings = supersonicFiles.filter(r => r.status === 'warning');
  
  console.log(`Total SupersonicFastCash files: ${supersonicFiles.length}`);
  console.log(`Errors: ${supersonicErrors.length}`);
  console.log(`Warnings: ${supersonicWarnings.length}`);
  console.log(`OK: ${supersonicFiles.length - supersonicErrors.length - supersonicWarnings.length}\n`);
  
  supersonicFiles.forEach(result => {
    if (result.issues.length > 0) {
      console.log(`📄 ${result.file}`);
      console.log(`   Supabase: ${result.hasSupabase ? '✅' : '❌'}`);
      console.log(`   Auth: ${result.hasAuth ? '✅' : 'N/A'}`);
      console.log(`   Forms: ${result.hasForms ? '✅' : 'N/A'}`);
      console.log(`   API Calls: ${result.hasApiCalls ? '✅' : 'N/A'}`);
      result.issues.forEach(issue => {
        console.log(`   ${result.status === 'error' ? '❌' : '⚠️'} ${issue}`);
      });
      console.log('');
    }
  });
  
  // Save detailed report to file
  const reportPath = path.join(process.cwd(), 'audit-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
  console.log(`\n📝 Detailed report saved to: audit-report.json\n`);
  
  console.log('='.repeat(80));
  console.log(errors.length === 0 ? '✅ AUDIT COMPLETE - NO CRITICAL ERRORS' : '❌ AUDIT COMPLETE - ERRORS FOUND');
  console.log('='.repeat(80) + '\n');
  
  return errors.length === 0;
}

// Main execution
console.log('🔍 Starting comprehensive page audit...\n');

const appDir = path.join(process.cwd(), 'app');
const allFiles = getAllFiles(appDir);

console.log(`Found ${allFiles.length} files to audit\n`);

for (const file of allFiles) {
  const result = auditFile(file);
  results.push(result);
}

const success = generateReport(results);
process.exit(success ? 0 : 1);
