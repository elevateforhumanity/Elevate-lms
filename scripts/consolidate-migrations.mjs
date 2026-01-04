#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const migrationsDir = path.join(__dirname, '..', 'supabase', 'migrations');


const files = fs.readdirSync(migrationsDir)
  .filter(f => f.endsWith('.sql'))
  .sort();


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
  duplicates.forEach(d => {
  });
} else {
}

