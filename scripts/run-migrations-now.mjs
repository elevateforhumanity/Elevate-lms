#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://cuxzzpsyufcewtmicszk.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODE2MTA0NywiZXhwIjoyMDczNzM3MDQ3fQ.5JRYvJPzFzsVaZQkbZDLcohP7dq8LWQEFeFdVByyihE';

console.log('🚀 Running Database Migrations');
console.log('==============================\n');

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

console.log('✅ Supabase client created');
console.log(`📍 URL: ${SUPABASE_URL}\n`);

// Check if tables exist
async function checkTables() {
  console.log('🔍 Checking if tables exist...\n');
  
  try {
    const { data: programs, error: progError } = await supabase
      .from('programs')
      .select('count', { count: 'exact', head: true });
    
    const { data: courses, error: courseError } = await supabase
      .from('courses')
      .select('count', { count: 'exact', head: true });
    
    if (progError) {
      console.log('⚠️  Programs table:', progError.message);
      return false;
    }
    
    if (courseError) {
      console.log('⚠️  Courses table:', courseError.message);
      return false;
    }
    
    console.log('✅ Tables exist!');
    console.log(`   Programs: ${programs?.length || 0}`);
    console.log(`   Courses: ${courses?.length || 0}\n`);
    
    return true;
  } catch (error) {
    console.error('❌ Error checking tables:', error.message);
    return false;
  }
}

async function main() {
  const tablesExist = await checkTables();
  
  if (!tablesExist) {
    console.log('\n❌ Tables do not exist yet.');
    console.log('\n📋 You need to run the migration manually in Supabase SQL Editor:');
    console.log('   1. Open: https://app.supabase.com/project/cuxzzpsyufcewtmicszk/sql/new');
    console.log('   2. Copy: https://raw.githubusercontent.com/elevateforhumanity/fix2/main/supabase/COMPLETE_MIGRATION.sql');
    console.log('   3. Paste and click "Run"');
    console.log('   4. Wait 30 seconds\n');
    process.exit(1);
  }
  
  console.log('✅ Ready to insert data!');
  console.log('\n⚠️  Note: For complex SQL with multiple statements,');
  console.log('   it\'s best to run directly in Supabase SQL Editor.\n');
  
  console.log('📋 Please run manually:');
  console.log('   https://app.supabase.com/project/cuxzzpsyufcewtmicszk/sql/new\n');
}

main();
