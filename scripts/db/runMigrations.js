// scripts/db/runMigrations.js
// Run ALL SQL files in supabase/migrations in alphabetical order

const fs = require('fs');
const path = require('path');
const { Client } = require('pg');

async function runMigrations() {
  const connectionString = process.env.SUPABASE_DB_URL;

  if (!connectionString) {
    console.error('❌ SUPABASE_DB_URL is not set in .env.local');
    process.exit(1);
  }

  const client = new Client({ connectionString });

  try {
    await client.connect();

    const migrationsDir = path.join(process.cwd(), 'supabase', 'migrations');

    if (!fs.existsSync(migrationsDir)) {
      console.error(`❌ Migrations folder not found: ${migrationsDir}`);
      process.exit(1);
    }

    const files = fs
      .readdirSync(migrationsDir)
      .filter((f) => f.endsWith('.sql'))
      .sort();

    if (files.length === 0) {
      return;
    }


    // optional: create a table to track which migrations ran
    await client.query(`
      CREATE TABLE IF NOT EXISTS efh_migrations (
        id SERIAL PRIMARY KEY,
        filename TEXT UNIQUE NOT NULL,
        executed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    for (const file of files) {
      const filePath = path.join(migrationsDir, file);

      // skip if already applied
      const { rows } = await client.query(
        'SELECT 1 FROM efh_migrations WHERE filename = $1 LIMIT 1;',
        [file]
      );
      if (rows.length > 0) {
        continue;
      }

      const sql = fs.readFileSync(filePath, 'utf8');

      try {
        await client.query('BEGIN');
        await client.query(sql);
        await client.query(
          'INSERT INTO efh_migrations (filename) VALUES ($1);',
          [file]
        );
        await client.query('COMMIT');
      } catch (err) {
        await client.query('ROLLBACK');
        console.error(`❌ Migration failed: ${file}`);
        console.error(err.message);
        process.exit(1);
      }
    }

  } catch (err) {
    console.error('❌ Migration runner error:', err.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

if (require.main === module) {
  runMigrations();
}

module.exports = { runMigrations };
