import { createClient } from '@supabase/supabase-js';
import { writeFileSync } from 'fs';

const supabaseUrl = 'https://cuxzzpsyufcewtmicszk.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseKey) {
  console.error('❌ SUPABASE_SERVICE_ROLE_KEY required');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

console.log('🔍 Exporting current database schema...\n');

async function exportSchema() {
  try {
    // Get all tables
    const { data: tables, error } = await supabase
      .rpc('exec_sql', {
        sql: `
          SELECT table_name 
          FROM information_schema.tables 
          WHERE table_schema = 'public' 
            AND table_type = 'BASE TABLE'
          ORDER BY table_name
        `
      });

    if (error) {
      console.log('⚠️  RPC not available, using alternative method...\n');
      
      // Alternative: Query known tables
      const knownTables = [
        'profiles', 'applications', 'programs', 'enrollments',
        'marketplace_creators', 'marketplace_products', 'marketplace_sales',
        'program_holders', 'program_holder_documents', 'program_holder_verification',
        'program_holder_banking'
      ];
      
      const schemaDoc = {
        exported_at: new Date().toISOString(),
        method: 'sample_query',
        tables: {}
      };
      
      for (const tableName of knownTables) {
        const { data, error: err } = await supabase
          .from(tableName)
          .select('*')
          .limit(1);
        
        if (!err && data && data[0]) {
          schemaDoc.tables[tableName] = {
            exists: true,
            columns: Object.keys(data[0])
          };
          console.log(`✅ ${tableName}: ${Object.keys(data[0]).length} columns`);
        } else if (!err) {
          schemaDoc.tables[tableName] = {
            exists: true,
            columns: []
          };
          console.log(`✅ ${tableName}: exists (empty)`);
        } else {
          console.log(`❌ ${tableName}: ${err.message}`);
        }
      }
      
      writeFileSync('current-schema-export.json', JSON.stringify(schemaDoc, null, 2));
      console.log('\n✅ Schema exported to current-schema-export.json');
      
      return schemaDoc;
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

exportSchema();
