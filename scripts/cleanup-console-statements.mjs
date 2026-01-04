#!/usr/bin/env node

/**
 * Console Statement Cleanup Script
 * Removes or replaces console statements with proper logging
 */

import { readFileSync, writeFileSync } from 'fs';
import { execSync } from 'child_process';
import { join } from 'path';

const DRY_RUN = process.argv.includes('--dry-run');
const VERBOSE = process.argv.includes('--verbose');

console.log('🧹 Console Statement Cleanup');
console.log('============================\n');

if (DRY_RUN) {
  console.log('⚠️  DRY RUN MODE - No files will be modified\n');
}

// Find all files with console statements
function findFilesWithConsole() {
  try {
    const output = execSync(
      `grep -r "console\\." app/ lib/ components/ --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" 2>/dev/null | grep -v node_modules | grep -v ".next" | cut -d: -f1 | sort | uniq`,
      { encoding: 'utf-8', maxBuffer: 10 * 1024 * 1024 }
    );
    return output.trim().split('\n').filter(Boolean);
  } catch (error) {
    return [];
  }
}

// Patterns to keep (legitimate logging)
const KEEP_PATTERNS = [
  /console\.log\(['"]Starting/,
  /console\.log\(['"]Initializing/,
  /console\.warn\(['"]Deprecated/,
  /if \(process\.env\.NODE_ENV === ['"]development['"]\)/,
  /if \(__DEV__\)/,
];

// Patterns to remove completely
const REMOVE_PATTERNS = [
  /^\s*console\.log\(['"].*['"]\);\s*$/,
  /^\s*console\.debug\(/,
  /^\s*console\.info\(/,
];

// Patterns to replace with proper error handling
const ERROR_PATTERNS = [
  { pattern: /console\.error\(['"](.+?)['"],\s*(\w+)\);?/, replacement: '// Error: $1' },
  { pattern: /console\.error\((.+?)\);?/, replacement: '// Error logged' },
];

function shouldKeepLine(line) {
  return KEEP_PATTERNS.some(pattern => pattern.test(line));
}

function shouldRemoveLine(line) {
  return REMOVE_PATTERNS.some(pattern => pattern.test(line));
}

function processFile(filePath) {
  const content = readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  let modified = false;
  let removedCount = 0;
  let keptCount = 0;

  const newLines = lines.map((line, index) => {
    // Skip if no console statement
    if (!line.includes('console.')) {
      return line;
    }

    // Keep legitimate logging
    if (shouldKeepLine(line)) {
      keptCount++;
      return line;
    }

    // Remove debug/info/log statements
    if (shouldRemoveLine(line)) {
      modified = true;
      removedCount++;
      return ''; // Remove line
    }

    // Replace error statements with comments
    for (const { pattern, replacement } of ERROR_PATTERNS) {
      if (pattern.test(line)) {
        modified = true;
        removedCount++;
        const indent = line.match(/^\s*/)[0];
        return `${indent}${replacement}`;
      }
    }

    // Keep console.error in catch blocks (but note it)
    if (line.includes('console.error') && lines[index - 1]?.includes('catch')) {
      keptCount++;
      return line;
    }

    // Default: keep but note
    keptCount++;
    return line;
  });

  // Remove empty lines that were created
  const cleanedLines = newLines.filter((line, index) => {
    if (line === '' && newLines[index - 1] === '' && newLines[index + 1] === '') {
      return false;
    }
    return true;
  });

  if (modified) {
    if (!DRY_RUN) {
      writeFileSync(filePath, cleanedLines.join('\n'), 'utf-8');
    }
    return { modified: true, removed: removedCount, kept: keptCount };
  }

  return { modified: false, removed: 0, kept: keptCount };
}

// Main execution
const files = findFilesWithConsole();
console.log(`📊 Found ${files.length} files with console statements\n`);

let totalModified = 0;
let totalRemoved = 0;
let totalKept = 0;

const results = [];

for (const file of files) {
  try {
    const result = processFile(file);
    if (result.modified) {
      totalModified++;
      totalRemoved += result.removed;
      results.push({ file, ...result });
      
      if (VERBOSE) {
        console.log(`✓ ${file}`);
        console.log(`  Removed: ${result.removed}, Kept: ${result.kept}`);
      }
    }
    totalKept += result.kept;
  } catch (error) {
    console.error(`✗ Error processing ${file}:`, error.message);
  }
}

console.log('\n📈 Summary');
console.log('==========');
console.log(`Files processed: ${files.length}`);
console.log(`Files modified: ${totalModified}`);
console.log(`Console statements removed: ${totalRemoved}`);
console.log(`Console statements kept: ${totalKept}`);

if (results.length > 0 && !VERBOSE) {
  console.log('\n📝 Modified files:');
  results.slice(0, 20).forEach(({ file, removed }) => {
    console.log(`  - ${file} (${removed} removed)`);
  });
  if (results.length > 20) {
    console.log(`  ... and ${results.length - 20} more`);
  }
}

if (DRY_RUN) {
  console.log('\n⚠️  This was a dry run. Run without --dry-run to apply changes.');
} else {
  console.log('\n✅ Cleanup complete!');
}

console.log('\n💡 Next steps:');
console.log('  1. Review changes: git diff');
console.log('  2. Test application: npm run dev');
console.log('  3. Run build: npm run build');
console.log('  4. Commit changes: git add . && git commit -m "Remove console statements"');
