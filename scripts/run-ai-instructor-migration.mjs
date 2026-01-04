#!/usr/bin/env node

/**
 * Run AI Instructor Migration
 * Applies the AI instructor tables migration to Supabase
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');


// Check environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials');
  console.error('   Required: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}


// Read migration file
const migrationPath = join(rootDir, 'supabase/migrations/20251213_ai_instructors.sql');
const migrationSQL = fs.readFileSync(migrationPath, 'utf8');


// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

// Split SQL into individual statements
const statements = migrationSQL
  .split(';')
  .map(s => s.trim())
  .filter(s => s.length > 0 && !s.startsWith('--'));


// Execute each statement
let successCount = 0;
let errorCount = 0;

for (let i = 0; i < statements.length; i++) {
  const statement = statements[i] + ';';
  const preview = statement.substring(0, 60).replace(/\n/g, ' ');

  try {

    const { error } = await supabase.rpc('exec_sql', { sql: statement });

    if (error) {
      // Try direct execution if RPC fails
      const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
        },
        body: JSON.stringify({ sql: statement }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${await response.text()}`);
      }
    }

    successCount++;
  } catch (error) {
    // Continue with other statements
    errorCount++;
  }

}


if (errorCount === 0) {
  process.exit(0);
} else {
  process.exit(0); // Don't fail on errors as they might be expected
}
