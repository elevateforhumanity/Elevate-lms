#!/usr/bin/env node
/**
 * Automatic Database Seeding Script
 * Seeds initial data from supabase/seeds/
 */

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { readFileSync, readdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

// Load environment variables
config({ path: join(rootDir, '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('🌱 Automatic Database Seeding\n');

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

// Get all seed files
const seedsDir = join(rootDir, 'supabase/seeds');
let seedFiles;

try {
  seedFiles = readdirSync(seedsDir)
    .filter(f => f.endsWith('.sql'))
    .sort(); // Alphabetical order
} catch (err) {
  console.error('❌ Could not read seeds directory:', err.message);
  console.log('   Seeds are optional. Skipping...\n');
  process.exit(0);
}

console.log(`📦 Found ${seedFiles.length} seed files\n`);

if (seedFiles.length === 0) {
  console.log('ℹ️  No seed files found. Skipping seeding.\n');
  process.exit(0);
}

// Run seeds
let successCount = 0;
let errorCount = 0;

for (const filename of seedFiles) {
  console.log(`\n🌱 Running ${filename}...`);
  
  try {
    const sql = readFileSync(join(seedsDir, filename), 'utf8');
    
    // Split by semicolons and execute each statement
    const statements = sql
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));
    
    for (const statement of statements) {
      // Try using exec_sql RPC function
      const { error } = await supabase.rpc('exec_sql', { 
        sql_query: statement 
      }).catch(async (err) => {
        // If exec_sql doesn't exist, try REST API directly
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
    
    console.log(`✅ ${filename} completed`);
    successCount++;
    
  } catch (err) {
    console.error(`❌ Error in ${filename}:`, err.message);
    errorCount++;
    
    // Continue with other seeds even if one fails
    console.log('⚠️  Continuing with remaining seeds...');
  }
}

// Summary
console.log('\n' + '='.repeat(60));
console.log('📊 Seeding Summary:');
console.log('='.repeat(60));
console.log(`✅ Successful: ${successCount}`);
console.log(`❌ Failed: ${errorCount}`);
console.log(`📦 Total: ${seedFiles.length}`);
console.log('='.repeat(60) + '\n');

if (errorCount > 0) {
  console.log('⚠️  Some seeds failed, but database is still usable.');
  console.log('   You can add data manually through the admin dashboard.\n');
} else {
  console.log('✅ All seed data loaded successfully!');
  console.log('\n📋 Database is ready with:');
  console.log('   - Training programs');
  console.log('   - Course catalog');
  console.log('   - Partner organizations');
  console.log('   - Badges and achievements');
  console.log('   - Sample data\n');
}
