#!/usr/bin/env npx tsx
/**
 * CI Token Gate
 * 
 * Fails the build if banned tokens appear in user-facing code.
 * Run as part of CI pipeline before deploy.
 * 
 * Usage: npx tsx scripts/ci-token-gate.ts
 * Exit code: 0 = pass, 1 = fail
 */

import * as fs from 'fs';
import * as path from 'path';
import { BANNED_TOKENS } from '../lib/banned-tokens';

const SCAN_DIRS = ['app', 'components'];
const EXCLUDE_PATTERNS = [
  /node_modules/,
  /\.test\./,
  /\.spec\./,
  /__tests__/,
  /\.stories\./,
  /storybook/i,
  /scripts\//,
  /banned-tokens\.ts$/,
];

const FILE_EXTENSIONS = ['.tsx', '.jsx'];

// Only check these high-signal tokens in CI
const CI_BANNED_TOKENS = [
  'coming soon',
  'lorem ipsum',
  'lorem',
  'tbd',
  'fake',
];

interface Violation {
  file: string;
  line: number;
  token: string;
  context: string;
}

function shouldExclude(filePath: string): boolean {
  return EXCLUDE_PATTERNS.some((pattern) => pattern.test(filePath));
}

// Patterns that are acceptable uses of banned tokens
const ACCEPTABLE_PATTERNS = [
  /fake\s+(student|record|enrollment|data|engagement)/i, // Policy/legal text about fake data
  /no\s+fake/i, // "no fake data" comments
  /Schedule\s+TBD/i, // Legitimate fallback for missing schedule
  /TBD\s*\)/i, // TBD in fallback expressions
  /\/\*.*\*\//i, // Inline comments
  /\/\//i, // Line comments
  /{\/\*.*\*\/}/i, // JSX comments
];

function isAcceptableUse(line: string, token: string): boolean {
  // Check if this is in a comment
  if (/^\s*\/\//.test(line) || /^\s*\/\*/.test(line) || /^\s*\*/.test(line)) {
    return true;
  }
  
  // Check if it's a JSX comment
  if (/{\/\*.*\*\/}/.test(line)) {
    return true;
  }
  
  // Check acceptable patterns
  return ACCEPTABLE_PATTERNS.some((pattern) => pattern.test(line));
}

function scanFile(filePath: string): Violation[] {
  const violations: Violation[] = [];
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  
  const pattern = new RegExp(
    CI_BANNED_TOKENS.map((t) => `\\b${t.replace(/\s+/g, '\\s+')}\\b`).join('|'),
    'gi'
  );
  
  lines.forEach((line, lineIndex) => {
    // Skip imports
    if (/^\s*import\s/.test(line)) return;
    
    pattern.lastIndex = 0;
    let match;
    
    while ((match = pattern.exec(line)) !== null) {
      const token = match[0].toLowerCase();
      
      // Skip acceptable uses
      if (isAcceptableUse(line, token)) continue;
      
      violations.push({
        file: filePath,
        line: lineIndex + 1,
        token,
        context: line.trim().substring(0, 100),
      });
    }
  });
  
  return violations;
}

function walkDir(dir: string): string[] {
  const files: string[] = [];
  
  if (!fs.existsSync(dir)) {
    return files;
  }
  
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (shouldExclude(fullPath)) {
      continue;
    }
    
    if (entry.isDirectory()) {
      files.push(...walkDir(fullPath));
    } else if (entry.isFile() && FILE_EXTENSIONS.some((ext) => entry.name.endsWith(ext))) {
      files.push(fullPath);
    }
  }
  
  return files;
}

function main() {
  console.log('🔍 CI Token Gate - Scanning for banned tokens...\n');
  
  const rootDir = process.cwd();
  const allViolations: Violation[] = [];
  
  for (const scanDir of SCAN_DIRS) {
    const dirPath = path.join(rootDir, scanDir);
    const files = walkDir(dirPath);
    
    for (const file of files) {
      const relativePath = path.relative(rootDir, file);
      const violations = scanFile(file).map((v) => ({ ...v, file: relativePath }));
      allViolations.push(...violations);
    }
  }
  
  if (allViolations.length === 0) {
    console.log('✅ No banned tokens found. Build can proceed.\n');
    process.exit(0);
  }
  
  console.log(`❌ Found ${allViolations.length} banned token(s):\n`);
  
  // Group by file
  const byFile: Record<string, Violation[]> = {};
  allViolations.forEach((v) => {
    if (!byFile[v.file]) byFile[v.file] = [];
    byFile[v.file].push(v);
  });
  
  Object.entries(byFile).forEach(([file, violations]) => {
    console.log(`📄 ${file}`);
    violations.forEach((v) => {
      console.log(`   Line ${v.line}: "${v.token}"`);
      console.log(`   → ${v.context}`);
    });
    console.log('');
  });
  
  console.log('Build failed. Remove placeholder content before deploying.\n');
  console.log('Banned tokens:', CI_BANNED_TOKENS.join(', '));
  
  process.exit(1);
}

main();
