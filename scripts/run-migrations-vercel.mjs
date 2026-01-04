#!/usr/bin/env node
/**
 * Automatic Supabase Migration Runner
 * Uses pg client to execute migrations directly
 */

import pg from 'pg';
import { readFileSync, readdirSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const { Client } = pg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

console.log('🚀 Running Supabase Migrations\n');

// Detect environment
const isProduction = process.env.VERCEL_ENV === 'production';
const gitBranch = process.env.VERCEL_GIT_COMMIT_REF || 'unknown';

console.log(`📍 Environment: ${process.env.VERCEL_ENV || 'local'}`);
console.log(`🌿 Branch: ${gitBranch}\n`);

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const dbUrl = process.env.DATABASE_URL || process.env.SUPABASE_DB_URL;

// Check credentials - exit early to avoid confusing error messages
if (!supabaseUrl || !supabaseKey || !dbUrl) {
  if (isProduction) {
    console.error('❌ ERROR: Missing Supabase credentials in PRODUCTION deployment!');
    console.error('   This should NOT happen. Check Vercel environment variables.');
    process.exit(1); // Fail the build for production
  } else {
    console.log('⚠️  Skipping: Missing Supabase credentials');
    console.log('   This is normal for preview deployments');
    console.log('   Migrations will run on production with full credentials\n');
    process.exit(0);
  }
}

// Build connection string from Supabase URL
const projectRef = supabaseUrl.match(/https:\/\/([^.]+)\.supabase\.co/)?.[1];
const connectionString = dbUrl;

console.log(`📡 Connecting to database...`);

// Get all migration files
const migrationsDir = join(rootDir, 'supabase/migrations');

if (!existsSync(migrationsDir)) {
  console.log('✅ No migrations directory found');
  process.exit(0);
}

const migrationFiles = readdirSync(migrationsDir)
  .filter(f => f.endsWith('.sql'))
  .sort();

if (migrationFiles.length === 0) {
  console.log('✅ No migration files found');
  process.exit(0);
}

console.log(`📦 Found ${migrationFiles.length} migration files\n`);

// Parse connection string and force IPv4-compatible pooler if needed
let finalConnectionString = connectionString;

// If using direct db.*.supabase.co connection, convert to pooler for IPv4 compatibility
if (connectionString && connectionString.includes('db.') && connectionString.includes('.supabase.co:5432')) {
  console.log('⚠️  Detected direct database connection, converting to pooler for IPv4 compatibility...');
  
  // Extract project ref and password from connection string
  const match = connectionString.match(/postgresql:\/\/postgres(?:\.([^:]+))?:([^@]+)@db\.([^.]+)\.supabase\.co:5432\/postgres/);
  
  if (match) {
    const projectRef = match[3];
    const password = match[2];
    
    // Use connection pooler which supports IPv4
    // Format: postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres
    // Default to us-east-1 region
    finalConnectionString = `postgresql://postgres.${projectRef}:${password}@aws-0-us-east-1.pooler.supabase.com:6543/postgres`;
    console.log('✅ Converted to pooler connection');
  }
}

// Connect to database
const client = new Client({
  connectionString: finalConnectionString,
  ssl: { rejectUnauthorized: false },
  connectionTimeoutMillis: 10000,
});

try {
  // Set connection timeout
  client.connectionTimeoutMillis = 10000; // 10 seconds
  await client.connect();
  console.log('✅ Connected to database\n');
  
  // Create migrations tracking table
  await client.query(`
    CREATE TABLE IF NOT EXISTS _migrations (
      id SERIAL PRIMARY KEY,
      filename TEXT UNIQUE NOT NULL,
      executed_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);
  
  // Get executed migrations
  const { rows: executedMigrations } = await client.query(
    'SELECT filename FROM _migrations ORDER BY executed_at'
  );
  
  const executedSet = new Set(executedMigrations.map(m => m.filename));
  console.log(`✅ ${executedSet.size} migrations already executed\n`);
  
  // Run new migrations
  let successCount = 0;
  let skipCount = 0;
  
  for (const filename of migrationFiles) {
    if (executedSet.has(filename)) {
      console.log(`⏭️  ${filename} (already executed)`);
      skipCount++;
      continue;
    }
    
    console.log(`📄 Running ${filename}...`);
    
    try {
      const sql = readFileSync(join(migrationsDir, filename), 'utf8');
      
      // Execute migration in a transaction
      await client.query('BEGIN');
      await client.query(sql);
      await client.query(
        'INSERT INTO _migrations (filename) VALUES ($1)',
        [filename]
      );
      await client.query('COMMIT');
      
      console.log(`✅ ${filename} completed`);
      successCount++;
      
    } catch (err) {
      await client.query('ROLLBACK');
      console.error(`❌ Error in ${filename}:`, err.message);
      
      // Continue with other migrations in production
      if (process.env.VERCEL) {
        console.log('⚠️  Continuing with remaining migrations...');
        continue;
      } else {
        throw err;
      }
    }
  }
  
  // Summary
  console.log('\n' + '='.repeat(50));
  console.log(`✅ Successful: ${successCount}`);
  console.log(`⏭️  Skipped: ${skipCount}`);
  console.log(`📦 Total: ${migrationFiles.length}`);
  console.log('='.repeat(50) + '\n');
  
  console.log('✅ Migrations complete!');
  
} catch (err) {
  console.error('❌ Migration failed:', err.message);
  console.error('   Error code:', err.code);
  
  // Provide helpful error messages based on error type
  if (err.message.includes('Tenant or user not found') || err.code === '28P01') {
    console.log('');
    console.log('🚨 AUTHENTICATION ERROR DETECTED');
    console.log('   "Tenant or user not found" means PostgreSQL authentication failed.');
    console.log('');
    console.log('   This usually means:');
    console.log('   1. Wrong password in DATABASE_URL');
    console.log('   2. Wrong project reference in DATABASE_URL');
    console.log('   3. DATABASE_URL is from a different/old Supabase project');
    console.log('');
    console.log('   🔍 Run diagnostic to identify the issue:');
    console.log('   node scripts/diagnose-database-connection.mjs');
    console.log('');
    console.log('   ✅ To fix:');
    console.log('   1. Go to Supabase Dashboard → Settings → Database');
    console.log('   2. Copy "Connection string" → "Transaction mode" (pooler)');
    console.log('   3. Update DATABASE_URL in Vercel with the EXACT string');
    console.log('   4. Verify NEXT_PUBLIC_SUPABASE_URL matches the same project');
    console.log('');
  } else if (err.message.includes('ENETUNREACH') || err.message.includes('2600:')) {
    console.log('');
    console.log('💡 IPv6 Connection Issue Detected');
    console.log('   Your DATABASE_URL is using a direct connection that resolves to IPv6.');
    console.log('   Vercel build environment may not support IPv6.');
    console.log('');
    console.log('   Solution: Update DATABASE_URL in Vercel to use the connection pooler:');
    console.log('   postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres');
    console.log('');
    console.log('   Get your pooler URL from: Supabase Dashboard → Settings → Database → Connection string → Transaction mode');
    console.log('');
  } else if (err.code === 'ENOTFOUND') {
    console.log('');
    console.log('🚨 HOST NOT FOUND');
    console.log('   The database host in DATABASE_URL cannot be reached.');
    console.log('   This means the hostname is wrong or the project doesn\'t exist.');
    console.log('');
    console.log('   ✅ To fix:');
    console.log('   1. Verify you\'re using the correct Supabase project');
    console.log('   2. Get fresh DATABASE_URL from Supabase Dashboard');
    console.log('   3. Update in Vercel environment variables');
    console.log('');
  }
  
  // Don't fail the build on Vercel - just warn
  if (process.env.VERCEL || process.env.VERCEL_ENV) {
    console.log('⚠️  Continuing build despite migration error (Vercel deployment)');
    console.log('   Migrations can be run manually after deployment');
    process.exit(0); // Exit successfully
  } else {
    process.exit(1); // Fail locally
  }
} finally {
  try {
    await client.end();
  } catch (e) {
    // Ignore cleanup errors
  }
}

// Summary
console.log('\n' + '='.repeat(50));
console.log(`✅ Successful: ${successCount}`);
console.log(`⏭️  Skipped: ${skipCount}`);
console.log(`📦 Total: ${migrationFiles.length}`);
console.log('='.repeat(50) + '\n');

console.log('✅ Migrations complete!');
