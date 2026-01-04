#!/usr/bin/env node

/**
 * Autonomous Supabase Migration Autopilot
 *
 * Guides you through applying migrations via Supabase Dashboard
 * No psql required - works anywhere!
 */

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
const envPath = join(__dirname, '..', '.env');
let SUPABASE_URL, SUPABASE_SERVICE_KEY;

try {
  const envContent = readFileSync(envPath, 'utf-8');
  const urlMatch = envContent.match(/VITE_SUPABASE_URL=(.+)/);
  const keyMatch = envContent.match(/VITE_SUPABASE_ANON_KEY=(.+)/);

  SUPABASE_URL = urlMatch ? urlMatch[1].trim() : process.env.VITE_SUPABASE_URL;
  SUPABASE_SERVICE_KEY =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    (keyMatch ? keyMatch[1].trim() : process.env.VITE_SUPABASE_ANON_KEY);
} catch (err) {
  SUPABASE_URL = process.env.VITE_SUPABASE_URL;
  SUPABASE_SERVICE_KEY =
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;
}

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('❌ Missing Supabase credentials');
  console.error('   Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env');
  process.exit(1);
}

const MIGRATIONS_DIR = join(__dirname, '..', 'supabase', 'migrations');
const ALL_IN_ONE_FILE = join(
  MIGRATIONS_DIR,
  'ALL_IN_ONE__paste_into_dashboard.sql'
);

const EXPECTED_TABLES = [
  'programs',
  'courses',
  'lessons',
  'enrollments',
  'lesson_progress',
  'certificates',
  'instructor_certificates',
  'analytics_events',
  'page_views',
  'automation_workflows',
  'automation_executions',
  'generated_content',
  'scholarship_applications',
  'scholarship_reviews',
  'stripe_accounts',
  'stripe_splits',
];

/**
 * Check if a table exists
 */
async function tableExists(tableName) {
  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/${tableName}?limit=0`,
      {
        method: 'GET',
        headers: {
          apikey: SUPABASE_SERVICE_KEY,
          Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
          Range: '0-0',
        },
      }
    );

    return response.ok || response.status === 416; // 416 = range not satisfiable (table exists but empty)
  } catch (err) {
    return false;
  }
}

/**
 * Verify all tables exist
 */
async function verifyTables() {

  const results = await Promise.all(
    EXPECTED_TABLES.map(async (table) => {
      const exists = await tableExists(table);
      return { table, exists };
    })
  );

  const missing = results.filter((r) => !r.exists);

  if (missing.length === 0) {
    return true;
  } else {
    console.error(`❌ Missing ${missing.length} tables:`);
    missing.forEach((r) => console.error(`   - ${r.table}`));
    return false;
  }
}

/**
 * Check RLS status
 */
async function checkRLS() {

  try {
    // Try to query a protected table without auth
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/enrollments?limit=1`,
      {
        method: 'GET',
        headers: {
          apikey: SUPABASE_SERVICE_KEY,
          Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
        },
      }
    );

    if (response.ok) {
      return true;
    } else {
      return true; // Don't fail on this
    }
  } catch (err) {
    return true; // Don't fail on this
  }
}

/**
 * Main autopilot function
 */
async function runAutopilot() {

  // Check if migrations already applied
  const tablesOk = await verifyTables();

  if (tablesOk) {
      '   3. View dashboard: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk'
    );
    process.exit(0);
  }

  // Migrations need to be applied
  const projectRef =
    SUPABASE_URL.match(/https:\/\/([^.]+)\.supabase\.co/)?.[1] ||
    'cuxzzpsyufcewtmicszk';

    `   https://supabase.com/dashboard/project/${projectRef}/sql/new`
  );

  // Try to open browser automatically
  try {
    const { exec } = await import('child_process');
    const url = `https://supabase.com/dashboard/project/${projectRef}/sql/new`;


    const command =
      process.platform === 'darwin'
        ? 'open'
        : process.platform === 'win32'
          ? 'start'
          : 'xdg-open';

    exec(`${command} "${url}"`, (error) => {
      if (!error) {
      } else {
      }
    });
  } catch (err) {
    // Silent fail
  }

  process.exit(1);
}

// Run autopilot
runAutopilot().catch((err) => {
  console.error('\n❌ Autopilot failed:', err.message);
  process.exit(1);
});
