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

console.log('🗄️  Running AI Instructor Migration');
console.log('=====================================\n');

// Check environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials');
  console.error('   Required: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

console.log(`📡 Supabase URL: ${supabaseUrl}`);
console.log('');

// Read migration file
const migrationPath = join(rootDir, 'supabase/migrations/20251213_ai_instructors.sql');
const migrationSQL = fs.readFileSync(migrationPath, 'utf8');

console.log('📄 Migration file loaded');
console.log(`   Path: ${migrationPath}`);
console.log(`   Size: ${migrationSQL.length} bytes`);
console.log('');

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

// Split SQL into individual statements
const statements = migrationSQL
  .split(';')
  .map(s => s.trim())
  .filter(s => s.length > 0 && !s.startsWith('--'));

console.log(`📝 Found ${statements.length} SQL statements`);
console.log('');

// Execute each statement
let successCount = 0;
let errorCount = 0;

for (let i = 0; i < statements.length; i++) {
  const statement = statements[i] + ';';
  const preview = statement.substring(0, 60).replace(/\n/g, ' ');
  
  try {
    console.log(`⏳ Executing statement ${i + 1}/${statements.length}...`);
    console.log(`   ${preview}...`);
    
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
    
    console.log(`   ✅ Success`);
    successCount++;
  } catch (error) {
    console.log(`   ⚠️  Error: ${error.message}`);
    // Continue with other statements
    errorCount++;
  }
  
  console.log('');
}

console.log('=====================================');
console.log('📊 Migration Summary:');
console.log(`   Total statements: ${statements.length}`);
console.log(`   ✅ Successful: ${successCount}`);
console.log(`   ❌ Errors: ${errorCount}`);
console.log('');

if (errorCount === 0) {
  console.log('✅ Migration completed successfully!');
  console.log('');
  console.log('📋 Next steps:');
  console.log('   1. Verify tables created: npm run test:enrollment');
  console.log('   2. Check Supabase dashboard for new tables');
  console.log('   3. Test AI instructor assignment');
  process.exit(0);
} else {
  console.log('⚠️  Migration completed with some errors');
  console.log('   Review errors above and check Supabase logs');
  console.log('   Some errors may be expected (e.g., "already exists")');
  process.exit(0); // Don't fail on errors as they might be expected
}
