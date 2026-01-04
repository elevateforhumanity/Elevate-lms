import { createClient } from '@supabase/supabase-js';
import { writeFileSync } from 'fs';

const supabaseUrl = 'https://cuxzzpsyufcewtmicszk.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseKey) {
  console.error('❌ SUPABASE_SERVICE_ROLE_KEY environment variable required');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function querySchema() {
  console.log('🔍 Querying database schema...\n');
  
  const results = {};
  
  try {
    // Critical tables to check
    const tables = [
      'marketplace_creators',
      'marketplace_products', 
      'marketplace_sales',
      'program_holder_documents',
      'program_holder_banking',
      'program_holder_verification',
      'program_holders',
      'profiles',
      'applications'
    ];
    
    for (const table of tables) {
      const { data, error, count } = await supabase
        .from(table)
        .select('*', { count: 'exact', head: true });
      
      if (error) {
        console.log(`❌ ${table}: ${error.message}`);
        results[table] = { exists: false, error: error.message };
      } else {
        console.log(`✅ ${table}: ${count} rows`);
        results[table] = { exists: true, count };
        
        // Get first row to see structure
        const { data: sample } = await supabase
          .from(table)
          .select('*')
          .limit(1);
        
        if (sample && sample[0]) {
          results[table].columns = Object.keys(sample[0]);
        }
      }
    }
    
    console.log('\n📊 Summary saved to schema-audit-results.json');
    writeFileSync('schema-audit-results.json', JSON.stringify(results, null, 2));
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

querySchema();
