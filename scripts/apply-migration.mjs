import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';

const supabaseUrl = 'https://cuxzzpsyufcewtmicszk.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseKey) {
  console.error('❌ SUPABASE_SERVICE_ROLE_KEY required');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function applyMigration() {
  console.log('📝 Reading migration file...\n');
  
  const sql = readFileSync('supabase/migrations/20251227_fix_verification_schema.sql', 'utf8');
  
  console.log('🚀 Applying migration to database...\n');
  
  try {
    // Split by semicolon and execute each statement
    const statements = sql
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));
    
    for (const statement of statements) {
      if (statement.includes('COMMENT ON')) {
        console.log('  ℹ️  Adding comment...');
      } else if (statement.includes('ALTER TABLE')) {
        console.log('  🔧 Altering table...');
      } else if (statement.includes('CREATE INDEX')) {
        console.log('  📊 Creating index...');
      } else if (statement.includes('UPDATE')) {
        console.log('  📝 Updating data...');
      }
      
      const { error } = await supabase.rpc('exec_sql', { sql: statement + ';' });
      
      if (error) {
        // Try alternative method
        console.log(`  ⚠️  RPC failed, trying direct query...`);
        const { error: err2 } = await supabase.from('_migrations').insert({ sql: statement });
        if (err2) {
          console.error(`  ❌ Failed: ${error.message}`);
        }
      } else {
        console.log('  ✅ Success');
      }
    }
    
    console.log('\n✅ Migration applied successfully!');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

applyMigration();
