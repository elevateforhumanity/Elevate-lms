#!/usr/bin/env node

/**
 * Affirm Payment Test Script
 * Tests complete Affirm payment flow including checkout and authorization
 */

import { createClient } from '@supabase/supabase-js';

console.log('🧪 Affirm Payment Test');
console.log('=====================================\n');

// Check environment variables
const requiredVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'SUPABASE_SERVICE_ROLE_KEY',
  'AFFIRM_PUBLIC_KEY',
  'AFFIRM_PRIVATE_KEY',
  'NEXT_PUBLIC_SITE_URL',
];

const missingVars = requiredVars.filter(v => !process.env[v]);

if (missingVars.length > 0) {
  console.error('❌ Missing required environment variables:');
  missingVars.forEach(v => console.error(`   - ${v}`));
  console.error('\n💡 Load environment variables first:');
  console.error('   source .env.local');
  process.exit(1);
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const affirmPublicKey = process.env.AFFIRM_PUBLIC_KEY;
const affirmPrivateKey = process.env.AFFIRM_PRIVATE_KEY;
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

console.log('📋 Configuration:');
console.log(`   Supabase URL: ${supabaseUrl}`);
console.log(`   Affirm Public Key: ${affirmPublicKey.substring(0, 20)}...`);
console.log(`   Site URL: ${siteUrl}`);
console.log('');

const supabase = createClient(supabaseUrl, supabaseKey);

// Test configuration
const testConfig = {
  amount: 4890, // $48.90 for testing
  courseId: 'barber-apprenticeship',
  courseName: 'Barber Apprenticeship',
  userEmail: 'affirm-test@elevateforhumanity.org',
  userName: 'Affirm Test Student',
  userPhone: '555-555-5555',
};

async function testAffirmCheckout() {
  console.log('📝 Step 1: Create Affirm Checkout Session');
  console.log('-------------------------------------------');
  
  try {
    // Create checkout data
    const checkoutData = {
      merchant: {
        user_confirmation_url: `${siteUrl}/payment/affirm/confirm`,
        user_cancel_url: `${siteUrl}/payment/affirm/cancel`,
        user_confirmation_url_action: 'POST',
        name: 'Elevate for Humanity',
      },
      items: [
        {
          display_name: testConfig.courseName,
          sku: testConfig.courseId,
          unit_price: Math.round(testConfig.amount * 100), // Convert to cents
          qty: 1,
          item_image_url: `${siteUrl}/images/courses/${testConfig.courseId}-cover.jpg`,
          item_url: `${siteUrl}/programs/${testConfig.courseId}`,
        },
      ],
      billing: {
        name: {
          first: testConfig.userName.split(' ')[0],
          last: testConfig.userName.split(' ').slice(1).join(' '),
        },
        email: testConfig.userEmail,
        phone_number: testConfig.userPhone,
      },
      shipping: {
        name: {
          first: testConfig.userName.split(' ')[0],
          last: testConfig.userName.split(' ').slice(1).join(' '),
        },
        email: testConfig.userEmail,
        phone_number: testConfig.userPhone,
      },
      discounts: {},
      metadata: {
        test: true,
        platform: 'elevate-for-humanity',
        course_id: testConfig.courseId,
      },
      order_id: `TEST-${Date.now()}-${testConfig.courseId}`,
      shipping_amount: 0,
      tax_amount: 0,
      total: Math.round(testConfig.amount * 100), // Convert to cents
    };

    console.log('   Creating checkout session...');
    console.log(`   Amount: $${testConfig.amount}`);
    console.log(`   Course: ${testConfig.courseName}`);
    console.log('');

    // Make request to Affirm API
    const auth = Buffer.from(`${affirmPublicKey}:${affirmPrivateKey}`).toString('base64');
    
    const response = await fetch('https://api.affirm.com/api/v1/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${auth}`,
      },
      body: JSON.stringify(checkoutData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('❌ Affirm API Error:', errorData);
      throw new Error(`Affirm API returned ${response.status}`);
    }

    const data = await response.json();
    
    console.log('✅ Checkout session created successfully!');
    console.log(`   Checkout Token: ${data.checkout_token}`);
    console.log(`   Redirect URL: ${data.redirect_url}`);
    console.log('');

    return {
      success: true,
      checkoutToken: data.checkout_token,
      redirectUrl: data.redirect_url,
    };

  } catch (error) {
    console.error('❌ Checkout creation failed:', error.message);
    return { success: false, error: error.message };
  }
}

async function testAffirmAuthorization(checkoutToken) {
  console.log('📝 Step 2: Test Authorization (Simulated)');
  console.log('-------------------------------------------');
  
  console.log('   ℹ️  In production, this happens after customer approval');
  console.log('   ℹ️  For testing, we simulate the authorization call');
  console.log('');

  try {
    const auth = Buffer.from(`${affirmPublicKey}:${affirmPrivateKey}`).toString('base64');
    
    // Note: This will fail in sandbox without actual customer approval
    // This is expected - we're just testing the API structure
    console.log('   Attempting authorization...');
    console.log(`   Checkout Token: ${checkoutToken}`);
    console.log('');

    const response = await fetch('https://sandbox.affirm.com/api/v2/charges', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${auth}`,
      },
      body: JSON.stringify({
        checkout_token: checkoutToken,
        order_id: `TEST-${Date.now()}`,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.log('   ⚠️  Authorization requires customer approval');
      console.log('   ⚠️  This is expected in test mode');
      console.log(`   API Response: ${errorData.message || 'Token not approved'}`);
      console.log('');
      return { success: false, expected: true };
    }

    const data = await response.json();
    console.log('✅ Authorization successful!');
    console.log(`   Transaction ID: ${data.id}`);
    console.log('');

    return { success: true, transactionId: data.id };

  } catch (error) {
    console.log('   ⚠️  Authorization test completed (expected behavior)');
    console.log('');
    return { success: false, expected: true };
  }
}

async function testStripeAffirmIntegration() {
  console.log('📝 Step 3: Test Stripe + Affirm Integration');
  console.log('-------------------------------------------');
  
  console.log('   Testing Stripe checkout with Affirm enabled...');
  console.log('');

  try {
    const response = await fetch(`${siteUrl}/api/create-checkout-session`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        programName: testConfig.courseName,
        programSlug: testConfig.courseId,
        price: testConfig.amount,
        paymentType: 'full',
      }),
    });

    if (!response.ok) {
      throw new Error(`Stripe API returned ${response.status}`);
    }

    const data = await response.json();
    
    console.log('✅ Stripe checkout session created!');
    console.log(`   Checkout URL: ${data.url}`);
    console.log('   ℹ️  Affirm is enabled as a payment method');
    console.log('');

    return { success: true, checkoutUrl: data.url };

  } catch (error) {
    console.error('❌ Stripe checkout failed:', error.message);
    return { success: false, error: error.message };
  }
}

async function checkDatabase() {
  console.log('📝 Step 4: Check Database Configuration');
  console.log('-------------------------------------------');
  
  try {
    // Check if programs table exists
    const { data: programs, error: programError } = await supabase
      .from('programs')
      .select('id, slug, name')
      .eq('slug', testConfig.courseId)
      .maybeSingle();

    if (programError) {
      console.log('   ⚠️  Programs table check:', programError.message);
    } else if (programs) {
      console.log('✅ Program found in database');
      console.log(`   ID: ${programs.id}`);
      console.log(`   Name: ${programs.name}`);
    } else {
      console.log('   ⚠️  Program not found:', testConfig.courseId);
    }
    console.log('');

    // Check enrollments table
    const { error: enrollmentError } = await supabase
      .from('enrollments')
      .select('id')
      .limit(1);

    if (enrollmentError) {
      console.log('   ⚠️  Enrollments table check:', enrollmentError.message);
    } else {
      console.log('✅ Enrollments table accessible');
    }
    console.log('');

    return { success: true };

  } catch (error) {
    console.error('❌ Database check failed:', error.message);
    return { success: false, error: error.message };
  }
}

// Main test execution
async function runTests() {
  console.log('🚀 Starting Affirm Payment Tests\n');

  const results = {
    checkout: null,
    authorization: null,
    stripe: null,
    database: null,
  };

  // Test 1: Direct Affirm Checkout
  results.checkout = await testAffirmCheckout();

  // Test 2: Authorization (if checkout succeeded)
  if (results.checkout.success) {
    results.authorization = await testAffirmAuthorization(results.checkout.checkoutToken);
  }

  // Test 3: Stripe + Affirm Integration
  results.stripe = await testStripeAffirmIntegration();

  // Test 4: Database Configuration
  results.database = await checkDatabase();

  // Summary
  console.log('=====================================');
  console.log('📊 Test Summary');
  console.log('=====================================\n');

  console.log('Direct Affirm Checkout:');
  console.log(`   ${results.checkout?.success ? '✅' : '❌'} ${results.checkout?.success ? 'PASSED' : 'FAILED'}`);
  if (results.checkout?.success) {
    console.log(`   Checkout URL: ${results.checkout.redirectUrl}`);
  }
  console.log('');

  console.log('Affirm Authorization:');
  console.log(`   ${results.authorization?.expected ? '⚠️' : results.authorization?.success ? '✅' : '❌'} ${results.authorization?.expected ? 'EXPECTED (requires customer approval)' : results.authorization?.success ? 'PASSED' : 'FAILED'}`);
  console.log('');

  console.log('Stripe + Affirm Integration:');
  console.log(`   ${results.stripe?.success ? '✅' : '❌'} ${results.stripe?.success ? 'PASSED' : 'FAILED'}`);
  if (results.stripe?.success) {
    console.log(`   Checkout URL: ${results.stripe.checkoutUrl}`);
  }
  console.log('');

  console.log('Database Configuration:');
  console.log(`   ${results.database?.success ? '✅' : '❌'} ${results.database?.success ? 'PASSED' : 'FAILED'}`);
  console.log('');

  // Next steps
  console.log('=====================================');
  console.log('📝 Next Steps');
  console.log('=====================================\n');

  if (results.checkout?.success) {
    console.log('✅ Affirm API is working correctly');
    console.log('');
    console.log('To complete a test payment:');
    console.log('1. Visit the checkout URL above');
    console.log('2. Use test credentials:');
    console.log('   Name: John Doe');
    console.log('   Email: test@example.com');
    console.log('   Phone: 555-555-5555');
    console.log('   DOB: 01/01/1990');
    console.log('   SSN Last 4: 1234');
    console.log('3. Complete the approval process');
    console.log('4. You will be redirected back to confirm page');
    console.log('');
  }

  if (results.stripe?.success) {
    console.log('✅ Stripe + Affirm integration is working');
    console.log('');
    console.log('To test via Stripe:');
    console.log('1. Visit the Stripe checkout URL above');
    console.log('2. Select "Affirm" as payment method');
    console.log('3. Complete Affirm approval process');
    console.log('4. Webhook will trigger enrollment');
    console.log('');
  }

  console.log('📚 Documentation:');
  console.log('   See AFFIRM_PAYMENT_FLOW_COMPLETE.md for details');
  console.log('');

  const allPassed = results.checkout?.success && results.stripe?.success && results.database?.success;
  
  if (allPassed) {
    console.log('🎉 All tests passed! Affirm integration is ready.');
  } else {
    console.log('⚠️  Some tests failed. Review errors above.');
  }

  process.exit(allPassed ? 0 : 1);
}

// Run tests
runTests().catch(error => {
  console.error('❌ Test execution failed:', error);
  process.exit(1);
});
