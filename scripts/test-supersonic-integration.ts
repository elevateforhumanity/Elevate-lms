#!/usr/bin/env tsx

/**
 * Integration test for SupersonicFastCash features
 * Tests database connections, API routes, and Supabase storage
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function testDatabaseConnection() {
  console.log('\n🔍 Testing database connection...');
  
  try {
    const { data, error } = await supabase
      .from('appointments')
      .select('count')
      .limit(1);
    
    if (error) {
      console.error('❌ Database connection failed:', error.message);
      return false;
    }
    
    console.log('✅ Database connection successful');
    return true;
  } catch (error) {
    console.error('❌ Database connection error:', error);
    return false;
  }
}

async function testAppointmentsTable() {
  console.log('\n🔍 Testing appointments table...');
  
  try {
    // Test insert
    const testAppointment = {
      service_type: 'test',
      appointment_type: 'video',
      appointment_date: '2025-01-20',
      appointment_time: '10:00:00',
      first_name: 'Test',
      last_name: 'User',
      email: 'test@example.com',
      phone: '555-0123',
      status: 'pending',
    };
    
    const { data, error } = await supabase
      .from('appointments')
      .insert(testAppointment)
      .select()
      .single();
    
    if (error) {
      console.error('❌ Appointments table error:', error.message);
      return false;
    }
    
    console.log('✅ Appointments table working');
    
    // Clean up test data
    if (data) {
      await supabase.from('appointments').delete().eq('id', data.id);
      console.log('✅ Test data cleaned up');
    }
    
    return true;
  } catch (error) {
    console.error('❌ Appointments table error:', error);
    return false;
  }
}

async function testTaxDocumentsTable() {
  console.log('\n🔍 Testing tax_documents table...');
  
  try {
    const testDocument = {
      file_name: 'test.pdf',
      file_path: 'test/test.pdf',
      file_size: 1024,
      file_type: 'application/pdf',
      email: 'test@example.com',
      phone: '555-0123',
      status: 'pending_review',
    };
    
    const { data, error } = await supabase
      .from('tax_documents')
      .insert(testDocument)
      .select()
      .single();
    
    if (error) {
      console.error('❌ Tax documents table error:', error.message);
      return false;
    }
    
    console.log('✅ Tax documents table working');
    
    // Clean up test data
    if (data) {
      await supabase.from('tax_documents').delete().eq('id', data.id);
      console.log('✅ Test data cleaned up');
    }
    
    return true;
  } catch (error) {
    console.error('❌ Tax documents table error:', error);
    return false;
  }
}

async function testStorageBucket() {
  console.log('\n🔍 Testing storage bucket...');
  
  try {
    const { data: buckets, error } = await supabase.storage.listBuckets();
    
    if (error) {
      console.error('❌ Storage bucket error:', error.message);
      return false;
    }
    
    const documentsBucket = buckets?.find(b => b.id === 'documents');
    
    if (!documentsBucket) {
      console.error('❌ Documents bucket not found');
      console.log('Available buckets:', buckets?.map(b => b.id).join(', '));
      return false;
    }
    
    console.log('✅ Storage bucket exists');
    return true;
  } catch (error) {
    console.error('❌ Storage bucket error:', error);
    return false;
  }
}

async function testEmailConfiguration() {
  console.log('\n🔍 Testing email configuration...');
  
  const resendKey = process.env.RESEND_API_KEY;
  
  if (!resendKey) {
    console.error('❌ RESEND_API_KEY not configured');
    return false;
  }
  
  if (!resendKey.startsWith('re_')) {
    console.error('❌ Invalid RESEND_API_KEY format');
    return false;
  }
  
  console.log('✅ Email configuration valid');
  return true;
}

async function runTests() {
  console.log('🚀 Starting SupersonicFastCash Integration Tests\n');
  console.log('='.repeat(50));
  
  const results = {
    database: await testDatabaseConnection(),
    appointments: await testAppointmentsTable(),
    documents: await testTaxDocumentsTable(),
    storage: await testStorageBucket(),
    email: await testEmailConfiguration(),
  };
  
  console.log('\n' + '='.repeat(50));
  console.log('\n📊 Test Results:');
  console.log('='.repeat(50));
  
  Object.entries(results).forEach(([test, passed]) => {
    console.log(`${passed ? '✅' : '❌'} ${test}: ${passed ? 'PASSED' : 'FAILED'}`);
  });
  
  const allPassed = Object.values(results).every(r => r);
  
  console.log('\n' + '='.repeat(50));
  console.log(allPassed ? '✅ All tests passed!' : '❌ Some tests failed');
  console.log('='.repeat(50) + '\n');
  
  process.exit(allPassed ? 0 : 1);
}

runTests();
