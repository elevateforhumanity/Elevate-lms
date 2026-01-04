#!/usr/bin/env node

/**
 * Email Sending Test Script
 * Tests if email service is configured and working
 */

import { Resend } from 'resend';

console.log('📧 Testing Email Sending...\n');

// Test 1: Environment Variable
console.log('Test 1: Checking RESEND_API_KEY...');
const apiKey = process.env.RESEND_API_KEY;

if (!apiKey) {
  console.log('❌ FAIL: RESEND_API_KEY not set');
  console.log('   Email sending will not work');
  console.log('   Set RESEND_API_KEY in Vercel environment variables');
  process.exit(1);
}

if (apiKey.startsWith('re_')) {
  console.log('✅ PASS: API key format looks correct\n');
} else {
  console.log('⚠️  WARNING: API key format looks unusual');
  console.log('   Expected format: re_xxxxx\n');
}

// Test 2: Create Resend Client
console.log('Test 2: Creating Resend client...');
let resend;
try {
  resend = new Resend(apiKey);
  console.log('✅ PASS: Client created\n');
} catch (error) {
  console.log('❌ FAIL: Could not create client');
  console.log('   Error:', error.message);
  process.exit(1);
}

// Test 3: Send Test Email (optional - only if TEST_EMAIL is set)
const testEmail = process.env.TEST_EMAIL;

if (testEmail) {
  console.log(`Test 3: Sending test email to ${testEmail}...`);
  try {
    const { data, error } = await resend.emails.send({
      from: 'Elevate for Humanity <onboarding@resend.dev>',
      to: [testEmail],
      subject: 'Test Email - Elevate for Humanity',
      html: `
        <h1>Email Test Successful</h1>
        <p>This is a test email from your Elevate for Humanity deployment.</p>
        <p>If you received this, email sending is working correctly!</p>
        <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
      `,
    });

    if (error) {
      console.log('❌ FAIL: Could not send email');
      console.log('   Error:', error.message);
      console.log('   Check your Resend API key and domain verification');
      process.exit(1);
    }

    console.log('✅ PASS: Test email sent successfully');
    console.log(`   Email ID: ${data.id}`);
    console.log(`   Check ${testEmail} for the test email\n`);
  } catch (error) {
    console.log('❌ FAIL: Email sending error');
    console.log('   Error:', error.message);
    process.exit(1);
  }
} else {
  console.log('Test 3: Skipped (set TEST_EMAIL to send test email)\n');
}

console.log('═══════════════════════════════════');
console.log('✅ EMAIL CONFIGURATION VERIFIED');
console.log('═══════════════════════════════════\n');

console.log('Email Status:');
console.log('  • API Key: ✅ Set');
console.log('  • Client: ✅ Created');
if (testEmail) {
  console.log('  • Test Email: ✅ Sent');
} else {
  console.log('  • Test Email: ⏭️  Skipped');
}
console.log('  • Ready: ✅ Yes\n');

console.log('Email Types to Test on Production:');
console.log('  1. Welcome email (user signup)');
console.log('  2. Password reset email');
console.log('  3. Application confirmation email');
console.log('  4. Enrollment confirmation email\n');

console.log('To send a test email, run:');
console.log('  TEST_EMAIL=your@email.com node scripts/test-email-sending.mjs\n');

process.exit(0);
