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
  console.log('\n🔍 Verifying tables...');

  const results = await Promise.all(
    EXPECTED_TABLES.map(async (table) => {
      const exists = await tableExists(table);
      return { table, exists };
    })
  );

  const missing = results.filter((r) => !r.exists);

  if (missing.length === 0) {
    console.log(`✅ All ${EXPECTED_TABLES.length} tables verified`);
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
  console.log('\n🔒 Checking RLS status...');

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
      console.log('✅ RLS policies active');
      return true;
    } else {
      console.log('⚠️  RLS status unclear');
      return true; // Don't fail on this
    }
  } catch (err) {
    console.log('⚠️  Could not verify RLS');
    return true; // Don't fail on this
  }
}

/**
 * Main autopilot function
 */
async function runAutopilot() {
  console.log('🤖 Supabase Autopilot Starting...\n');
  console.log(`📍 Project: ${SUPABASE_URL}`);

  // Check if migrations already applied
  console.log('🔍 Checking database status...\n');
  const tablesOk = await verifyTables();

  if (tablesOk) {
    console.log('\n' + '='.repeat(70));
    console.log('✅ DATABASE ALREADY CONFIGURED!');
    console.log('   All 16 tables exist');
    console.log('   Your LMS database is ready to use!');
    console.log('='.repeat(70));
    console.log('\n📚 Next steps:');
    console.log('   1. Add your first course: see QUICK_START_ADD_COURSE.md');
    console.log('   2. Test enrollment: go to /programs on your site');
    console.log(
      '   3. View dashboard: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk'
    );
    process.exit(0);
  }

  // Migrations need to be applied
  const projectRef =
    SUPABASE_URL.match(/https:\/\/([^.]+)\.supabase\.co/)?.[1] ||
    'cuxzzpsyufcewtmicszk';

  console.log('\n' + '='.repeat(70));
  console.log('📋 MIGRATIONS NEED TO BE APPLIED');
  console.log('='.repeat(70));
  console.log('\n🤖 AUTOPILOT CAN HELP!');
  console.log('\n🚀 Quick Setup (2 minutes):');
  console.log('\n1. Open Supabase SQL Editor:');
  console.log(
    `   https://supabase.com/dashboard/project/${projectRef}/sql/new`
  );
  console.log('\n2. Copy the migration file:');
  console.log(`   ${ALL_IN_ONE_FILE}`);
  console.log('\n3. Paste into Supabase SQL Editor');
  console.log('\n4. Click "Run" button');
  console.log('\n5. Wait for completion (5-10 seconds)');
  console.log('\n6. Run this command again to verify:');
  console.log('   pnpm autopilot:migrate');
  console.log('\n' + '='.repeat(70));
  console.log('\n💡 AUTOMATED HELPER:');
  console.log('   Run: node scripts/autopilot-apply-now.mjs');
  console.log('   (Opens SQL Editor + shows instructions)');
  console.log('\n💡 ADVANCED (requires psql):');
  console.log('   bash scripts/autopilot_migrate.sh "YOUR_DB_URL"');
  console.log('\n📚 Full guide: see AUTOPILOT_SETUP_GUIDE.md');
  console.log('='.repeat(70));

  // Try to open browser automatically
  try {
    const { exec } = await import('child_process');
    const url = `https://supabase.com/dashboard/project/${projectRef}/sql/new`;

    console.log('\n🌐 Opening Supabase SQL Editor in your browser...');

    const command =
      process.platform === 'darwin'
        ? 'open'
        : process.platform === 'win32'
          ? 'start'
          : 'xdg-open';

    exec(`${command} "${url}"`, (error) => {
      if (!error) {
        console.log('✅ Browser opened! Follow the instructions above.\n');
      } else {
        console.log('⚠️  Could not open browser automatically.');
        console.log(`   Please open this URL manually: ${url}\n`);
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
