/**
 * Verify Migration: Creator Rejection Fields
 * 
 * This script verifies that the migration was successful by checking
 * if the new columns exist in the marketplace_creators table.
 * 
 * Usage: npx tsx scripts/verify-migration.ts
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials');
  console.error('Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function verifyMigration() {
  console.log('🔍 Verifying migration: Creator Rejection Fields\n');

  try {
    // Check if we can query the table with new columns
    const { data, error } = await supabase
      .from('marketplace_creators')
      .select('id, status, rejection_reason, rejected_at, rejected_by, approved_at, approved_by')
      .limit(1);

    if (error) {
      if (error.message.includes('column') && error.message.includes('does not exist')) {
        console.error('❌ Migration NOT run - columns do not exist');
        console.error('Error:', error.message);
        console.log('\n📋 To run migration:');
        console.log('1. Go to: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/sql/new');
        console.log('2. Copy SQL from: supabase/migrations/20260110_add_creator_rejection_fields.sql');
        console.log('3. Paste and run in SQL editor');
        process.exit(1);
      } else {
        throw error;
      }
    }

    console.log('✅ Migration verified successfully!');
    console.log('\nNew columns exist:');
    console.log('  ✓ rejection_reason');
    console.log('  ✓ rejected_at');
    console.log('  ✓ rejected_by');
    console.log('  ✓ approved_at');
    console.log('  ✓ approved_by');

    // Check if there are any rejected creators
    const { data: rejectedCreators, error: rejectedError } = await supabase
      .from('marketplace_creators')
      .select('id, status, rejection_reason, rejected_at')
      .eq('status', 'rejected')
      .limit(5);

    if (rejectedError) {
      console.warn('\n⚠️  Could not query rejected creators:', rejectedError.message);
    } else {
      console.log(`\n📊 Found ${rejectedCreators?.length || 0} rejected creators`);
      if (rejectedCreators && rejectedCreators.length > 0) {
        console.log('\nSample rejected creator:');
        console.log(JSON.stringify(rejectedCreators[0], null, 2));
      }
    }

    console.log('\n✅ Migration verification complete!');
    process.exit(0);

  } catch (error) {
    console.error('❌ Verification failed:', error);
    process.exit(1);
  }
}

verifyMigration();
