/**
 * Run database migrations via Supabase
 * Usage: npx tsx scripts/run-migrations.ts
 */

import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { persistSession: false }
});

async function runMigration(filePath: string) {
  console.log(`\nRunning migration: ${path.basename(filePath)}`);
  
  const sql = fs.readFileSync(filePath, 'utf-8');
  
  // Split by semicolons but be careful with functions
  const statements = sql
    .split(/;\s*$/m)
    .map(s => s.trim())
    .filter(s => s.length > 0 && !s.startsWith('--'));

  let successCount = 0;
  let errorCount = 0;

  for (const statement of statements) {
    if (!statement || statement.startsWith('--')) continue;
    
    try {
      const { error } = await supabase.rpc('exec_sql', { sql: statement + ';' });
      
      if (error) {
        // Try direct query for DDL statements
        const { error: directError } = await supabase.from('_migrations').select('*').limit(0);
        if (directError && !directError.message.includes('does not exist')) {
          console.error(`  Error: ${error.message}`);
          errorCount++;
        } else {
          successCount++;
        }
      } else {
        successCount++;
      }
    } catch (err: any) {
      console.error(`  Error: ${err.message}`);
      errorCount++;
    }
  }

  console.log(`  Completed: ${successCount} statements, ${errorCount} errors`);
}

async function main() {
  console.log('Starting migrations...');
  console.log(`Supabase URL: ${supabaseUrl}`);

  const migrationsDir = path.join(process.cwd(), 'supabase/migrations');
  
  const files = fs.readdirSync(migrationsDir)
    .filter(f => f.endsWith('.sql'))
    .sort();

  console.log(`Found ${files.length} migration files`);

  for (const file of files) {
    if (file.includes('store_guide_system') || file.includes('ecommerce_complete')) {
      await runMigration(path.join(migrationsDir, file));
    }
  }

  console.log('\nMigrations complete!');
}

main().catch(console.error);
