const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabaseUrl = 'https://cuxzzpsyufcewtmicszk.supabase.co';
// Need service role key - check env or ask user
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseKey) {
  console.error('❌ SUPABASE_SERVICE_ROLE_KEY environment variable required');
  console.error('\nGet it from: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/settings/api');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function querySchema() {
  console.log('🔍 Querying database schema...\n');
  
  try {
    // Query marketplace tables to verify they exist
    const tables = ['marketplace_creators', 'marketplace_products', 'marketplace_sales'];
    
    for (const table of tables) {
      const { data, error, count } = await supabase
        .from(table)
        .select('*', { count: 'exact', head: true });
      
      if (error) {
        console.log(`❌ ${table}: ${error.message}`);
      } else {
        console.log(`✅ ${table}: ${count} rows`);
      }
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

querySchema();
