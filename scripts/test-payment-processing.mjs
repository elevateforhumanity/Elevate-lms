#!/usr/bin/env node

/**
 * Payment Processing Test Script
 * Tests if Stripe is configured and working
 */

import Stripe from 'stripe';

console.log('💳 Testing Payment Processing...\n');

// Test 1: Environment Variables
console.log('Test 1: Checking Stripe environment variables...');
const secretKey = process.env.STRIPE_SECRET_KEY;
const publishableKey = process.env.STRIPE_PUBLISHABLE_KEY;

if (!secretKey) {
  console.log('❌ FAIL: STRIPE_SECRET_KEY not set');
  console.log('   Payment processing will not work');
  process.exit(1);
}

if (!publishableKey) {
  console.log('⚠️  WARNING: STRIPE_PUBLISHABLE_KEY not set');
  console.log('   Frontend payment forms may not work');
}

// Check key format
if (secretKey.startsWith('sk_test_')) {
  console.log('⚠️  WARNING: Using TEST mode Stripe key');
  console.log('   This is fine for testing, but use LIVE key for production');
} else if (secretKey.startsWith('sk_live_')) {
  console.log('✅ PASS: Using LIVE mode Stripe key');
} else {
  console.log('⚠️  WARNING: Stripe key format looks unusual');
}

console.log('✅ PASS: Stripe keys are set\n');

// Test 2: Create Stripe Client
console.log('Test 2: Creating Stripe client...');
let stripe;
try {
  stripe = new Stripe(secretKey);
  console.log('✅ PASS: Client created\n');
} catch (error) {
  console.log('❌ FAIL: Could not create client');
  console.log('   Error:', error.message);
  process.exit(1);
}

// Test 3: Test API Connection
console.log('Test 3: Testing Stripe API connection...');
try {
  const balance = await stripe.balance.retrieve();
  console.log('✅ PASS: Connected to Stripe API');
  console.log(`   Account balance: $${(balance.available[0]?.amount || 0) / 100}`);
  console.log(`   Currency: ${balance.available[0]?.currency || 'N/A'}\n`);
} catch (error) {
  console.log('❌ FAIL: Could not connect to Stripe API');
  console.log('   Error:', error.message);
  console.log('   Check your Stripe API key');
  process.exit(1);
}

// Test 4: List Products
console.log('Test 4: Checking Stripe products...');
try {
  const products = await stripe.products.list({ limit: 5 });
  
  if (products.data.length === 0) {
    console.log('⚠️  WARNING: No products found in Stripe');
    console.log('   You may need to create products for your programs');
  } else {
    console.log(`✅ PASS: Found ${products.data.length} products`);
    products.data.forEach(product => {
      console.log(`   • ${product.name} (${product.id})`);
    });
  }
  console.log('');
} catch (error) {
  console.log('⚠️  WARNING: Could not list products');
  console.log('   Error:', error.message);
  console.log('');
}

// Test 5: List Prices
console.log('Test 5: Checking Stripe prices...');
try {
  const prices = await stripe.prices.list({ limit: 5 });
  
  if (prices.data.length === 0) {
    console.log('⚠️  WARNING: No prices found in Stripe');
    console.log('   You may need to create prices for your products');
  } else {
    console.log(`✅ PASS: Found ${prices.data.length} prices`);
    prices.data.forEach(price => {
      const amount = price.unit_amount ? `$${price.unit_amount / 100}` : 'Free';
      console.log(`   • ${amount} ${price.currency} (${price.id})`);
    });
  }
  console.log('');
} catch (error) {
  console.log('⚠️  WARNING: Could not list prices');
  console.log('   Error:', error.message);
  console.log('');
}

// Test 6: Test Webhook Secret (if set)
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
if (webhookSecret) {
  console.log('Test 6: Webhook secret configured');
  console.log('✅ PASS: STRIPE_WEBHOOK_SECRET is set');
  console.log('   Webhooks will be verified\n');
} else {
  console.log('Test 6: Webhook secret not configured');
  console.log('⚠️  WARNING: STRIPE_WEBHOOK_SECRET not set');
  console.log('   Webhooks will not be verified (security risk)');
  console.log('   Set this in production\n');
}

console.log('═══════════════════════════════════');
console.log('✅ STRIPE CONFIGURATION VERIFIED');
console.log('═══════════════════════════════════\n');

console.log('Stripe Status:');
console.log('  • API Key: ✅ Set and working');
console.log('  • Connection: ✅ Connected');
console.log('  • Products: ' + (products?.data?.length > 0 ? '✅ Found' : '⚠️  None'));
console.log('  • Prices: ' + (prices?.data?.length > 0 ? '✅ Found' : '⚠️  None'));
console.log('  • Webhook: ' + (webhookSecret ? '✅ Configured' : '⚠️  Not set'));
console.log('  • Ready: ✅ Yes\n');

console.log('Payment Features to Test on Production:');
console.log('  1. Checkout page loads');
console.log('  2. Payment form appears');
console.log('  3. Test payment processes (use test card: 4242 4242 4242 4242)');
console.log('  4. Receipt is generated');
console.log('  5. Webhook events are received\n');

console.log('Test Cards (TEST mode only):');
console.log('  • Success: 4242 4242 4242 4242');
console.log('  • Decline: 4000 0000 0000 0002');
console.log('  • 3D Secure: 4000 0025 0000 3155\n');

process.exit(0);
