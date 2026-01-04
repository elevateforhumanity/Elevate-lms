#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const migrationsDir = path.join(__dirname, '..', 'supabase', 'migrations');

console.log('Analyzing migrations...');

const files = fs.readdirSync(migrationsDir)
  .filter(f => f.endsWith('.sql'))
  .sort();

console.log(`Found ${files.length} migration files`);

const policyNames = new Set();
const duplicates = [];

files.forEach(file => {
  const content = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
  const policyMatches = content.matchAll(/CREATE POLICY "([^"]+)"/g);
  
  for (const match of policyMatches) {
    const policyName = match[1];
    if (policyNames.has(policyName)) {
      duplicates.push({ file, policy: policyName });
    }
    policyNames.add(policyName);
  }
});

if (duplicates.length > 0) {
  console.log('\n⚠️  Duplicate policies found:');
  duplicates.forEach(d => {
    console.log(`  - ${d.policy} in ${d.file}`);
  });
} else {
  console.log('\n✅ No duplicate policies found');
}

console.log(`\nTotal unique policies: ${policyNames.size}`);
console.log(`\nRecommendation: Use 20260102_consolidate_all.sql for fresh deployments`);
