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


// Detect environment
const isProduction = process.env.VERCEL_ENV === 'production';
const gitBranch = process.env.VERCEL_GIT_COMMIT_REF || 'unknown';


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
    process.exit(0);
  }
}

// Build connection string from Supabase URL
const projectRef = supabaseUrl.match(/https:\/\/([^.]+)\.supabase\.co/)?.[1];
const connectionString = dbUrl;


// Get all migration files
const migrationsDir = join(rootDir, 'supabase/migrations');

if (!existsSync(migrationsDir)) {
  process.exit(0);
}

const migrationFiles = readdirSync(migrationsDir)
  .filter(f => f.endsWith('.sql'))
  .sort();

if (migrationFiles.length === 0) {
  process.exit(0);
}


// Parse connection string and force IPv4-compatible pooler if needed
let finalConnectionString = connectionString;

// If using direct db.*.supabase.co connection, convert to pooler for IPv4 compatibility
if (connectionString && connectionString.includes('db.') && connectionString.includes('.supabase.co:5432')) {

  // Extract project ref and password from connection string
  const match = connectionString.match(/postgresql:\/\/postgres(?:\.([^:]+))?:([^@]+)@db\.([^.]+)\.supabase\.co:5432\/postgres/);

  if (match) {
    const projectRef = match[3];
    const password = match[2];

    // Use connection pooler which supports IPv4
    // Format: postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres
    // Default to us-east-1 region
    finalConnectionString = `postgresql://postgres.${projectRef}:${password}@aws-0-us-east-1.pooler.supabase.com:6543/postgres`;
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

  // Run new migrations
  let successCount = 0;
  let skipCount = 0;

  for (const filename of migrationFiles) {
    if (executedSet.has(filename)) {
      skipCount++;
      continue;
    }


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

      successCount++;

    } catch (err) {
      await client.query('ROLLBACK');
      console.error(`❌ Error in ${filename}:`, err.message);

      // Continue with other migrations in production
      if (process.env.VERCEL) {
        continue;
      } else {
        throw err;
      }
    }
  }

  // Summary


} catch (err) {
  console.error('❌ Migration failed:', err.message);
  console.error('   Error code:', err.code);

  // Provide helpful error messages based on error type
  if (err.message.includes('Tenant or user not found') || err.code === '28P01') {
  } else if (err.message.includes('ENETUNREACH') || err.message.includes('2600:')) {
  } else if (err.code === 'ENOTFOUND') {
  }

  // Don't fail the build on Vercel - just warn
  if (process.env.VERCEL || process.env.VERCEL_ENV) {
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

