import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';

console.log('🔍 Checking which database tables are actively used in code...\n');

// Get all tables from archived migrations
const archiveDir = 'supabase/migrations/archive-legacy';
const migrationFiles = readdirSync(archiveDir).filter(f => f.endsWith('.sql'));

const allTables = new Set();
migrationFiles.forEach(file => {
  const content = readFileSync(join(archiveDir, file), 'utf8');
  const matches = content.matchAll(/CREATE TABLE (?:IF NOT EXISTS )?([a-z_]+)/gi);
  for (const match of matches) {
    allTables.add(match[1].toLowerCase());
  }
});

console.log(`📊 Found ${allTables.size} tables in migrations\n`);

// Check which tables are referenced in code
const codeFiles = [];
function scanDir(dir) {
  try {
    const items = readdirSync(dir, { withFileTypes: true });
    for (const item of items) {
      const path = join(dir, item.name);
      if (item.isDirectory()) {
        if (!item.name.startsWith('.') && 
            item.name !== 'node_modules' && 
            item.name !== 'archive-legacy') {
          scanDir(path);
        }
      } else if (item.name.match(/\.(tsx?|jsx?)$/)) {
        codeFiles.push(path);
      }
    }
  } catch (e) {}
}

scanDir('app');
scanDir('lib');
scanDir('utils');

console.log(`📁 Scanning ${codeFiles.length} code files...\n`);

const usedTables = new Map();
const tableArray = Array.from(allTables);

for (const file of codeFiles) {
  const content = readFileSync(file, 'utf8');
  
  for (const table of tableArray) {
    // Look for .from('table') or .from("table")
    if (content.includes(`.from('${table}')`) || 
        content.includes(`.from("${table}")`)) {
      if (!usedTables.has(table)) {
        usedTables.set(table, []);
      }
      usedTables.get(table).push(file.replace(/^.*\/app\//, 'app/'));
    }
  }
}

// Categorize tables
const categories = {
  active: [],
  unused: []
};

for (const table of tableArray) {
  if (usedTables.has(table)) {
    categories.active.push({
      table,
      usedIn: usedTables.get(table).length,
      files: usedTables.get(table).slice(0, 3)
    });
  } else {
    categories.unused.push(table);
  }
}

// Sort by usage
categories.active.sort((a, b) => b.usedIn - a.usedIn);

console.log('✅ ACTIVE FEATURES (used in code):\n');
categories.active.slice(0, 30).forEach(({ table, usedIn, files }) => {
  console.log(`   ${table} (${usedIn} files)`);
  files.forEach(f => console.log(`      - ${f}`));
});

console.log(`\n   ... and ${categories.active.length - 30} more active tables\n`);

console.log(`❌ UNUSED TABLES (not referenced in code): ${categories.unused.length}\n`);
console.log('   Examples:');
categories.unused.slice(0, 20).forEach(table => {
  console.log(`   - ${table}`);
});

console.log(`\n📊 Summary:`);
console.log(`   Total tables: ${allTables.size}`);
console.log(`   Active (used in code): ${categories.active.length}`);
console.log(`   Unused (not in code): ${categories.unused.length}`);
console.log(`   Usage rate: ${((categories.active.length / allTables.size) * 100).toFixed(1)}%`);
