#!/usr/bin/env node
/**
 * Automatic Supabase Migration Runner
 * Runs all migrations in order from supabase/migrations/
 */

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { readFileSync, readdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

// Load environment variables (try .env.local for local dev, fallback to process.env for Vercel)
config({ path: join(rootDir, '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('🚀 Automatic Supabase Migration Runner\n');

// Check credentials
if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials!');
  console.error('   Required: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
  console.error('   Add them to .env.local\n');
  process.exit(1);
}

console.log(`📡 Connecting to: ${supabaseUrl}`);

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Get all migration files
const migrationsDir = join(rootDir, 'supabase/migrations');
let migrationFiles;

try {
  migrationFiles = readdirSync(migrationsDir)
    .filter(f => f.endsWith('.sql'))
    .sort(); // Alphabetical order ensures chronological execution
} catch (err) {
  console.error('❌ Could not read migrations directory:', err.message);
  process.exit(1);
}

console.log(`📦 Found ${migrationFiles.length} migration files\n`);

// Create migrations tracking table if it doesn't exist
const createTrackingTable = `
CREATE TABLE IF NOT EXISTS _migrations (
  id SERIAL PRIMARY KEY,
  filename TEXT UNIQUE NOT NULL,
  executed_at TIMESTAMPTZ DEFAULT NOW(),
  success BOOLEAN DEFAULT TRUE,
  error_message TEXT
);
`;

console.log('📋 Setting up migration tracking...');
const { error: trackingError } = await supabase.rpc('exec_sql', { 
  sql_query: createTrackingTable 
}).catch(() => {
  // If exec_sql doesn't exist, try direct execution
  return supabase.from('_migrations').select('id').limit(1);
});

// Get already executed migrations
const { data: executedMigrations } = await supabase
  .from('_migrations')
  .select('filename')
  .eq('success', true)
  .catch(() => ({ data: [] }));

const executedSet = new Set(
  (executedMigrations || []).map(m => m.filename)
);

console.log(`✅ ${executedSet.size} migrations already executed\n`);

// Run migrations
let successCount = 0;
let skipCount = 0;
let errorCount = 0;

for (const filename of migrationFiles) {
  // Skip if already executed
  if (executedSet.has(filename)) {
    console.log(`⏭️  Skipping ${filename} (already executed)`);
    skipCount++;
    continue;
  }

  console.log(`\n📄 Running ${filename}...`);
  
  try {
    const sql = readFileSync(join(migrationsDir, filename), 'utf8');
    
    // Split by semicolons and execute each statement
    const statements = sql
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));
    
    for (const statement of statements) {
      const { error } = await supabase.rpc('exec_sql', { 
        sql_query: statement 
      }).catch(async (err) => {
        // If exec_sql doesn't exist, try using the REST API directly
        const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`
          },
          body: JSON.stringify({ sql_query: statement })
        });
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${await response.text()}`);
        }
        
        return { error: null };
      });
      
      if (error) {
        throw error;
      }
    }
    
    // Record successful migration
    await supabase.from('_migrations').insert({
      filename,
      success: true
    }).catch(() => {
      // Ignore tracking errors
    });
    
    console.log(`✅ ${filename} completed`);
    successCount++;
    
  } catch (err) {
    console.error(`❌ Error in ${filename}:`, err.message);
    
    // Record failed migration
    await supabase.from('_migrations').insert({
      filename,
      success: false,
      error_message: err.message
    }).catch(() => {
      // Ignore tracking errors
    });
    
    errorCount++;
    
    // Ask if we should continue
    if (process.env.CI !== 'true') {
      console.log('\n⚠️  Migration failed. Continue with remaining migrations? (y/n)');
      // In automated environments, stop on error
      break;
    }
  }
}

// Summary
console.log('\n' + '='.repeat(60));
console.log('📊 Migration Summary:');
console.log('='.repeat(60));
console.log(`✅ Successful: ${successCount}`);
console.log(`⏭️  Skipped: ${skipCount}`);
console.log(`❌ Failed: ${errorCount}`);
console.log(`📦 Total: ${migrationFiles.length}`);
console.log('='.repeat(60) + '\n');

if (errorCount > 0) {
  console.error('❌ Some migrations failed. Check the errors above.');
  process.exit(1);
} else {
  console.log('✅ All migrations completed successfully!');
  console.log('\n📋 Next steps:');
  console.log('   1. Run seed files: npm run db:seed');
  console.log('   2. Verify tables: node check-database.mjs');
  console.log('   3. Start dev server: npm run dev\n');
}
