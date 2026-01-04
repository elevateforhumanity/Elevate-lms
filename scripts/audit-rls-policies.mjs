import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cuxzzpsyufcewtmicszk.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseKey) {
  console.error('❌ SUPABASE_SERVICE_ROLE_KEY required');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

console.log('🔒 Auditing RLS Policies and Seeding...\n');

async function auditRLS() {
  // Critical tables that MUST have RLS
  const criticalTables = [
    'profiles',
    'applications', 
    'enrollments',
    'marketplace_creators',
    'marketplace_products',
    'marketplace_sales',
    'program_holders',
    'program_holder_documents',
    'program_holder_verification',
    'program_holder_banking'
  ];
  
  console.log('📋 Checking critical tables...\n');
  
  for (const table of criticalTables) {
    // Check if table exists and has data
    const { data, error, count } = await supabase
      .from(table)
      .select('*', { count: 'exact', head: true });
    
    if (error) {
      console.log(`❌ ${table}: ${error.message}`);
    } else {
      const rowCount = count || 0;
      console.log(`✅ ${table}: ${rowCount} rows`);
      
      // Try to query without auth (should fail if RLS is working)
      const publicClient = createClient(supabaseUrl, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgxNjEwNDcsImV4cCI6MjA3MzczNzA0N30.placeholder');
      
      const { data: publicData, error: publicError } = await publicClient
        .from(table)
        .select('*')
        .limit(1);
      
      if (publicError && publicError.message.includes('row-level security')) {
        console.log(`   🔒 RLS enabled and working`);
      } else if (!publicError && publicData) {
        console.log(`   ⚠️  WARNING: Public access allowed (${publicData.length} rows visible)`);
      }
    }
    console.log();
  }
}

auditRLS();
