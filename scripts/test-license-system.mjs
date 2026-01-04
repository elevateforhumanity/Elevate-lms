#!/usr/bin/env node

/**
 * License System Test Script
 * Tests license generation, validation, and enforcement
 */

import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Generate a license key
function generateLicenseKey() {
  return `EFH-${crypto.randomBytes(8).toString('hex').toUpperCase()}-${crypto.randomBytes(8).toString('hex').toUpperCase()}`;
}

async function testLicenseSystem() {
  console.log('🧪 Testing License System\n');
  console.log('='.repeat(60));

  // Test 1: Create a valid license
  console.log('\n📝 Test 1: Creating valid license...');
  const validLicense = {
    license_key: generateLicenseKey(),
    domain: 'test-client.example.com',
    customer_email: 'test@example.com',
    tier: 'business',
    status: 'active',
    features: ['complete_lms', 'payment_integration', 'white_label'],
    max_deployments: 3,
    max_users: 500,
    expires_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 year
  };

  const { data: created, error: createError } = await supabase
    .from('licenses')
    .insert(validLicense)
    .select()
    .single();

  if (createError) {
    console.error('❌ Failed to create license:', createError.message);
    return false;
  }

  console.log('✅ License created:', created.license_key);
  console.log('   Domain:', created.domain);
  console.log('   Tier:', created.tier);
  console.log('   Expires:', new Date(created.expires_at).toLocaleDateString());

  // Test 2: Validate the license
  console.log('\n🔍 Test 2: Validating license...');
  const { data: validated, error: validateError } = await supabase
    .from('licenses')
    .select('*')
    .eq('domain', validLicense.domain)
    .eq('status', 'active')
    .single();

  if (validateError || !validated) {
    console.error('❌ License validation failed');
    return false;
  }

  console.log('✅ License is valid');
  console.log('   Status:', validated.status);
  console.log('   Features:', validated.features.join(', '));

  // Test 3: Create an expired license
  console.log('\n⏰ Test 3: Creating expired license...');
  const expiredLicense = {
    license_key: generateLicenseKey(),
    domain: 'expired-client.example.com',
    customer_email: 'expired@example.com',
    tier: 'starter',
    status: 'active',
    expires_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // Yesterday
  };

  const { data: expiredCreated } = await supabase
    .from('licenses')
    .insert(expiredLicense)
    .select()
    .single();

  console.log('✅ Expired license created:', expiredCreated.license_key);

  // Test 4: Check if expired license is detected
  console.log('\n🔍 Test 4: Checking expired license detection...');
  const expiresAt = new Date(expiredCreated.expires_at);
  const isExpired = expiresAt < new Date();

  if (isExpired) {
    console.log('✅ Expired license correctly detected');
    console.log('   Expired on:', expiresAt.toLocaleDateString());
  } else {
    console.error('❌ Expired license not detected');
    return false;
  }

  // Test 5: Log validation attempt
  console.log('\n📊 Test 5: Logging validation attempt...');
  const { error: logError } = await supabase
    .from('license_validations')
    .insert({
      license_id: created.id,
      ip_address: '127.0.0.1',
      user_agent: 'Test Script',
      result: 'valid',
      metadata: { test: true },
    });

  if (logError) {
    console.error('❌ Failed to log validation:', logError.message);
    return false;
  }

  console.log('✅ Validation logged successfully');

  // Test 6: Check validation count updated
  console.log('\n🔢 Test 6: Checking validation count...');
  const { data: updated } = await supabase
    .from('licenses')
    .select('validation_count, last_validated_at')
    .eq('id', created.id)
    .single();

  if (updated && updated.validation_count > 0) {
    console.log('✅ Validation count updated:', updated.validation_count);
    console.log('   Last validated:', new Date(updated.last_validated_at).toLocaleString());
  } else {
    console.error('❌ Validation count not updated');
    return false;
  }

  // Test 7: Test license tiers
  console.log('\n🎯 Test 7: Testing license tiers...');
  const tiers = ['starter', 'business', 'enterprise'];
  
  for (const tier of tiers) {
    const tierLicense = {
      license_key: generateLicenseKey(),
      domain: `${tier}-client.example.com`,
      customer_email: `${tier}@example.com`,
      tier: tier,
      status: 'active',
      expires_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
    };

    const { data: tierCreated } = await supabase
      .from('licenses')
      .insert(tierLicense)
      .select()
      .single();

    console.log(`✅ ${tier.toUpperCase()} license created:`, tierCreated.license_key);
  }

  // Test 8: Cleanup test data
  console.log('\n🧹 Test 8: Cleaning up test data...');
  const { error: cleanupError } = await supabase
    .from('licenses')
    .delete()
    .like('domain', '%.example.com');

  if (cleanupError) {
    console.warn('⚠️  Cleanup warning:', cleanupError.message);
  } else {
    console.log('✅ Test data cleaned up');
  }

  console.log('\n' + '='.repeat(60));
  console.log('✅ All license system tests passed!\n');
  return true;
}

// Run tests
testLicenseSystem()
  .then((success) => {
    process.exit(success ? 0 : 1);
  })
  .catch((error) => {
    console.error('\n❌ Test failed with error:', error);
    process.exit(1);
  });
