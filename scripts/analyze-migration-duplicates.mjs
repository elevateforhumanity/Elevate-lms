import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';

const migrationsDir = 'supabase/migrations';
const files = readdirSync(migrationsDir)
  .filter(f => f.endsWith('.sql'))
  .sort();


const tableCreations = {};
const duplicates = {};

for (const file of files) {
  const content = readFileSync(join(migrationsDir, file), 'utf8');

  // Find all CREATE TABLE statements
  const createMatches = content.matchAll(/CREATE TABLE (?:IF NOT EXISTS )?([a-z_]+)/gi);

  for (const match of createMatches) {
    const tableName = match[1].toLowerCase();

    if (!tableCreations[tableName]) {
      tableCreations[tableName] = [];
    }

    tableCreations[tableName].push(file);
  }
}

// Find duplicates
for (const [table, files] of Object.entries(tableCreations)) {
  if (files.length > 1) {
    duplicates[table] = files;
  }
}

const sortedDuplicates = Object.entries(duplicates).sort((a, b) => b[1].length - a[1].length);

for (const [table, files] of sortedDuplicates.slice(0, 20)) {
  files.slice(0, 3).forEach(f => console.log(`  - ${f}`));
  if (files.length > 3) console.log(`  ... and ${files.length - 3} more`);
}


// Save full report
import { writeFileSync } from 'fs';
writeFileSync('migration-duplicates-report.json', JSON.stringify({
  totalFiles: files.length,
  totalTables: Object.keys(tableCreations).length,
  duplicateTables: Object.keys(duplicates).length,
  duplicates: duplicates
}, null, 2));

