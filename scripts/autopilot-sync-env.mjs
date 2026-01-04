#!/usr/bin/env node

/**
 * Advanced Autopilot - Environment Sync CLI
 * Instructs the Vercel worker to sync all environment variables
 */

import { writeFileSync } from 'fs';
import { join } from 'path';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://fix2.vercel.app';
const AUTOPILOT_SECRET = process.env.AUTOPILOT_SECRET;

console.log('🤖 Advanced Autopilot - Environment Sync');
console.log('=========================================');
console.log('');

if (!AUTOPILOT_SECRET) {
  console.log('❌ AUTOPILOT_SECRET not set');
  console.log('');
  console.log('Set it with:');
  console.log('  gp env AUTOPILOT_SECRET="your-secret-here"');
  console.log('');
  console.log('Or generate one:');
  console.log('  openssl rand -base64 32');
  console.log('');
  process.exit(1);
}

console.log('✅ Autopilot secret found');
console.log('🎯 Target: ' + SITE_URL);
console.log('');

// Step 1: Verify worker is active
console.log('📡 Step 1: Verifying worker status...');
try {
  const statusResponse = await fetch(`${SITE_URL}/api/autopilot/sync-env`, {
    method: 'GET',
  });

  if (!statusResponse.ok) {
    console.log('❌ Worker not responding');
    console.log('   Deploy the worker first: vercel --prod');
    process.exit(1);
  }

  const status = await statusResponse.json();
  console.log('✅ Worker active:', status.worker);
  console.log('   Version:', status.version);
  console.log('');
} catch (error) {
  console.log('❌ Cannot reach worker');
  console.log('   Error:', error.message);
  console.log('');
  console.log('Make sure your app is deployed to Vercel');
  process.exit(1);
}

// Step 2: Instruct worker to sync
console.log('📥 Step 2: Instructing worker to sync environment variables...');
try {
  const syncResponse = await fetch(`${SITE_URL}/api/autopilot/sync-env`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${AUTOPILOT_SECRET}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      instruction: 'sync-all-env-vars',
      source: 'vercel-api',
      target: 'local-env',
    }),
  });

  if (!syncResponse.ok) {
    const error = await syncResponse.json();
    console.log('❌ Worker failed to sync');
    console.log('   Error:', error.error || 'Unknown error');
    
    if (syncResponse.status === 401) {
      console.log('');
      console.log('⚠️  Unauthorized - check your AUTOPILOT_SECRET');
    }
    
    process.exit(1);
  }

  const result = await syncResponse.json();
  
  console.log('✅ Worker synced successfully!');
  console.log('');
  console.log('📊 Results:');
  console.log('   Total variables:', result.variables.total);
  console.log('');
  console.log('📋 By category:');
  for (const [category, count] of Object.entries(result.variables.categories)) {
    if (count > 0) {
      console.log(`   ${category}: ${count} variables`);
    }
  }
  console.log('');

  // Step 3: Save to .env.local
  if (result.envContent) {
    console.log('💾 Step 3: Saving to .env.local...');
    
    const envPath = join(process.cwd(), '.env.local');
    
    // Backup existing file
    try {
      const { readFileSync } = await import('fs');
      const existing = readFileSync(envPath, 'utf-8');
      const backupPath = join(process.cwd(), `.env.local.backup.${Date.now()}`);
      writeFileSync(backupPath, existing);
      console.log('   Backup created:', backupPath);
    } catch (error) {
      // No existing file, that's okay
    }
    
    writeFileSync(envPath, result.envContent);
    console.log('✅ Saved to .env.local');
    console.log('');
    
    // Show variable names
    console.log('📝 Variables synced:');
    result.variables.keys.slice(0, 10).forEach(key => {
      console.log(`   - ${key}`);
    });
    if (result.variables.keys.length > 10) {
      console.log(`   ... and ${result.variables.keys.length - 10} more`);
    }
    console.log('');
  }

  console.log('🎉 Environment sync complete!');
  console.log('');
  console.log('Next steps:');
  console.log('1. Review .env.local');
  console.log('2. Start your app: pnpm run dev');
  console.log('');

} catch (error) {
  console.log('❌ Sync failed');
  console.log('   Error:', error.message);
  console.log('');
  process.exit(1);
}
