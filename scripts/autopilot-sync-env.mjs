#!/usr/bin/env node

/**
 * Advanced Autopilot - Environment Sync CLI
 * Instructs the Vercel worker to sync all environment variables
 */

import { writeFileSync } from 'fs';
import { join } from 'path';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://fix2.vercel.app';
const AUTOPILOT_SECRET = process.env.AUTOPILOT_SECRET;


if (!AUTOPILOT_SECRET) {
  process.exit(1);
}


// Step 1: Verify worker is active
try {
  const statusResponse = await fetch(`${SITE_URL}/api/autopilot/sync-env`, {
    method: 'GET',
  });

  if (!statusResponse.ok) {
    process.exit(1);
  }

  const status = await statusResponse.json();
} catch (error) {
  process.exit(1);
}

// Step 2: Instruct worker to sync
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

    if (syncResponse.status === 401) {
    }

    process.exit(1);
  }

  const result = await syncResponse.json();

  for (const [category, count] of Object.entries(result.variables.categories)) {
    if (count > 0) {
    }
  }

  // Step 3: Save to .env.local
  if (result.envContent) {

    const envPath = join(process.cwd(), '.env.local');

    // Backup existing file
    try {
      const { readFileSync } = await import('fs');
      const existing = readFileSync(envPath, 'utf-8');
      const backupPath = join(process.cwd(), `.env.local.backup.${Date.now()}`);
      writeFileSync(backupPath, existing);
    } catch (error) {
      // No existing file, that's okay
    }

    writeFileSync(envPath, result.envContent);

    // Show variable names
    result.variables.keys.slice(0, 10).forEach(key => {
    });
    if (result.variables.keys.length > 10) {
    }
  }


} catch (error) {
  process.exit(1);
}
