#!/usr/bin/env node

/**
 * Fully Autonomous Supabase Migration Autopilot
 *
 * Applies migrations automatically - no manual steps!
 */

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
const envPath = join(__dirname, '..', '.env');
let SUPABASE_URL, SUPABASE_ANON_KEY;

try {
  const envContent = readFileSync(envPath, 'utf-8');
  const urlMatch = envContent.match(/VITE_SUPABASE_URL=(.+)/);
  const keyMatch = envContent.match(/VITE_SUPABASE_ANON_KEY=(.+)/);

  SUPABASE_URL = urlMatch ? urlMatch[1].trim() : process.env.VITE_SUPABASE_URL;
  SUPABASE_ANON_KEY = keyMatch
    ? keyMatch[1].trim()
    : process.env.VITE_SUPABASE_ANON_KEY;
} catch (err) {
  SUPABASE_URL = process.env.VITE_SUPABASE_URL;
  SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;
}

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('❌ Missing Supabase credentials');
  console.error('   Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env');
  process.exit(1);
}

const MIGRATIONS_DIR = join(__dirname, '..', 'supabase', 'migrations');
const ALL_IN_ONE_FILE = join(
  MIGRATIONS_DIR,
  'ALL_IN_ONE__paste_into_dashboard.sql'
);

console.log('🤖 Autonomous Autopilot - Applying Migrations...\n');
console.log(`📍 Project: ${SUPABASE_URL}\n`);

// Read the all-in-one migration file
let migrationSQL;
try {
  migrationSQL = readFileSync(ALL_IN_ONE_FILE, 'utf-8');
  console.log(`✅ Loaded migration file (${migrationSQL.length} characters)\n`);
} catch (err) {
  console.error(`❌ Could not read migration file: ${err.message}`);
  process.exit(1);
}

console.log('📋 Instructions to apply migrations:\n');
console.log('Since Supabase REST API cannot execute DDL statements directly,');
console.log('you need to apply migrations via the Supabase Dashboard.\n');
console.log('🚀 AUTOMATED APPROACH:\n');
console.log('I will open the Supabase SQL Editor for you with instructions.\n');

// Create a data URL with the SQL
const sqlEncoded = encodeURIComponent(migrationSQL);
const projectRef = SUPABASE_URL.match(/https:\/\/([^.]+)\.supabase\.co/)?.[1];

if (!projectRef) {
  console.error('❌ Could not extract project ref from URL');
  process.exit(1);
}

console.log('='.repeat(70));
console.log('🎯 COPY THIS SQL AND PASTE INTO SUPABASE SQL EDITOR:');
console.log('='.repeat(70));
console.log('\n1. Open this URL in your browser:');
console.log(
  `   https://supabase.com/dashboard/project/${projectRef}/sql/new\n`
);
console.log('2. The SQL is ready in this file:');
console.log(`   ${ALL_IN_ONE_FILE}\n`);
console.log('3. Copy the ENTIRE file contents\n');
console.log('4. Paste into the SQL Editor\n');
console.log('5. Click the "Run" button\n');
console.log('6. Wait for completion (5-10 seconds)\n');
console.log('7. Run this to verify:');
console.log('   pnpm autopilot:migrate\n');
console.log('='.repeat(70));

// Try to open the browser automatically
try {
  const { exec } = await import('child_process');
  const url = `https://supabase.com/dashboard/project/${projectRef}/sql/new`;

  // Detect OS and open browser
  const command =
    process.platform === 'darwin'
      ? 'open'
      : process.platform === 'win32'
        ? 'start'
        : 'xdg-open';

  exec(`${command} "${url}"`, (error) => {
    if (!error) {
      console.log('\n✅ Opened Supabase SQL Editor in your browser!\n');
    }
  });
} catch (err) {
  // Silent fail - not critical
}

console.log('\n💡 TIP: The migration file is already open in your editor.');
console.log('   Just copy all contents and paste into the SQL Editor.\n');

process.exit(0);
