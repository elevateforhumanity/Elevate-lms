#!/usr/bin/env node

import { execSync } from 'child_process';
import { writeFileSync } from 'fs';

console.log('Categorizing lint issues...\n');

const lintOutput = execSync('npm run lint 2>&1', { encoding: 'utf-8', maxBuffer: 10 * 1024 * 1024 });

const categories = {
  parsingErrors: [],
  activeAppFiles: [],
  componentsFiles: [],
  scriptsFiles: [],
  libFiles: [],
  testFiles: [],
  archiveFiles: []
};

const lines = lintOutput.split('\n');
let currentFile = null;

lines.forEach(line => {
  if (line.startsWith('/workspaces/fix2/')) {
    currentFile = line.trim();
  } else if (line.includes('Parsing error') && currentFile) {
    const category = currentFile.includes('/.archive/') || currentFile.includes('-old') || currentFile.includes('-backup')
      ? 'archiveFiles'
      : currentFile.includes('/app/')
      ? 'activeAppFiles'
      : currentFile.includes('/components/')
      ? 'componentsFiles'
      : currentFile.includes('/scripts/')
      ? 'scriptsFiles'
      : currentFile.includes('/lib/')
      ? 'libFiles'
      : currentFile.includes('/test')
      ? 'testFiles'
      : 'other';
    
    if (!categories[category].includes(currentFile)) {
      categories[category].push(currentFile);
    }
    
    if (!categories.parsingErrors.includes(currentFile)) {
      categories.parsingErrors.push(currentFile);
    }
  }
});

console.log('=== PARSING ERRORS BY CATEGORY ===\n');
console.log(`Active App Files: ${categories.activeAppFiles.length}`);
console.log(`Components: ${categories.componentsFiles.length}`);
console.log(`Scripts: ${categories.scriptsFiles.length}`);
console.log(`Lib Files: ${categories.libFiles.length}`);
console.log(`Test Files: ${categories.testFiles.length}`);
console.log(`Archive Files: ${categories.archiveFiles.length}`);
console.log(`Total Parsing Errors: ${categories.parsingErrors.length}\n`);

if (categories.activeAppFiles.length > 0) {
  console.log('CRITICAL - Active app files with parsing errors:');
  categories.activeAppFiles.forEach(f => console.log(`  ${f}`));
  console.log('');
}

writeFileSync('reports/lint-categorization.json', JSON.stringify(categories, null, 2));
console.log('Full report saved to: reports/lint-categorization.json');
