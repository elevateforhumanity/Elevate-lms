#!/usr/bin/env node

import { readFileSync, existsSync, statSync, readdirSync } from 'fs';
import { join } from 'path';

console.log('🔍 Checking Integration Status\n');
console.log('============================================================\n');

// Helper to count files in directory
function countFiles(dir, extension) {
  try {
    if (!existsSync(dir)) return 0;
    return readdirSync(dir).filter((f) => f.endsWith(extension)).length;
  } catch {
    return 0;
  }
}

// Helper to count directories
function countDirs(dir) {
  try {
    if (!existsSync(dir)) return 0;
    return readdirSync(dir).filter((f) => {
      try {
        return statSync(join(dir, f)).isDirectory();
      } catch {
        return false;
      }
    }).length;
  } catch {
    return 0;
  }
}

// Check Build System
console.log('🏗️  Build System:');
try {
  const packageJson = JSON.parse(readFileSync('package.json', 'utf-8'));
  const viteConfig =
    existsSync('vite.config.ts') || existsSync('vite.config.js');

  console.log(viteConfig ? '  ✅ Vite configured' : '  ❌ Vite not configured');
  console.log(
    packageJson.scripts?.build
      ? '  ✅ Build script present'
      : '  ❌ Build script missing'
  );
  console.log(
    `  Status: ${viteConfig && packageJson.scripts?.build ? 'CONFIGURED' : 'INCOMPLETE'}\n`
  );
} catch (error) {
  console.log('  ❌ Error:', error.message, '\n');
}

// Check Supabase
console.log('🗄️  Supabase:');
try {
  const envContent = existsSync('.env') ? readFileSync('.env', 'utf-8') : '';
  const hasUrl = envContent.includes('VITE_SUPABASE_URL=');
  const hasKey = envContent.includes('VITE_SUPABASE_ANON_KEY=');

  console.log(hasUrl ? '  ✅ URL configured' : '  ❌ URL not configured');
  console.log(
    hasKey ? '  ✅ Anon key configured' : '  ❌ Anon key not configured'
  );

  const migrations = countFiles('supabase/migrations', '.sql');
  console.log(`  ✅ ${migrations} migrations found`);

  const functions = countDirs('supabase/functions');
  console.log(`  ✅ ${functions} edge functions found`);

  console.log(`  Status: ${hasUrl && hasKey ? 'CONFIGURED' : 'INCOMPLETE'}\n`);
} catch (error) {
  console.log('  ❌ Error:', error.message, '\n');
}

// Check Netlify
console.log('🌐 Netlify:');
try {
  const netlifyToml = existsSync('netlify.toml')
    ? readFileSync('netlify.toml', 'utf-8')
    : '';
  const hasBuildCommand = netlifyToml.includes('run build');

  console.log(
    hasBuildCommand
      ? '  ✅ Build command configured'
      : '  ❌ Build command not configured'
  );

  const functions =
    countFiles('netlify/functions', '.js') +
    countFiles('netlify/functions', '.ts');
  console.log(`  ✅ ${functions} serverless functions found`);

  const redirects = (netlifyToml.match(/\[\[redirects\]\]/g) || []).length;
  console.log(`  ✅ ${redirects} redirect rules configured`);

  console.log(`  Status: ${hasBuildCommand ? 'CONFIGURED' : 'INCOMPLETE'}\n`);
} catch (error) {
  console.log('  ❌ Error:', error.message, '\n');
}

// Check Cloudflare Workers
console.log('☁️  Cloudflare Workers:');
try {
  const wranglerToml = existsSync('wrangler.toml')
    ? readFileSync('wrangler.toml', 'utf-8')
    : '';
  const hasWorker = wranglerToml.includes('name = ');
  const hasAccountId = wranglerToml.includes('account_id = ');

  // Check for worker file in multiple locations
  const workerFile =
    existsSync('src/worker.js') ||
    existsSync('workers/autopilot-deploy-worker.ts') ||
    wranglerToml.includes('main = ');

  console.log(
    hasWorker ? '  ✅ Worker configured' : '  ❌ Worker not configured'
  );
  console.log(
    hasAccountId ? '  ✅ Account ID present' : '  ❌ Account ID missing'
  );
  console.log(
    workerFile ? '  ✅ Worker file exists' : '  ❌ Worker file missing'
  );

  console.log(
    `  Status: ${hasWorker && hasAccountId && workerFile ? 'CONFIGURED' : 'INCOMPLETE'}\n`
  );
} catch (error) {
  console.log('  ❌ Error:', error.message, '\n');
}

// Check Environment Variables
console.log('🔑 Environment Variables:');
try {
  const envContent = existsSync('.env') ? readFileSync('.env', 'utf-8') : '';

  const requiredVars = [
    'VITE_SUPABASE_URL',
    'VITE_SUPABASE_ANON_KEY',
    'JWT_SECRET',
  ];

  const optionalVars = [
    'STRIPE_SECRET_KEY',
    'VITE_STRIPE_PUBLISHABLE_KEY',
    'OPENAI_API_KEY',
    'CLOUDFLARE_API_TOKEN',
  ];

  console.log('  Required:');
  requiredVars.forEach((varName) => {
    const hasVar = envContent.includes(`${varName}=`);
    console.log(`    ${hasVar ? '✅' : '❌'} ${varName}`);
  });

  console.log('\n  Optional:');
  optionalVars.forEach((varName) => {
    const hasVar = envContent.includes(`${varName}=`);
    console.log(`    ${hasVar ? '✅' : '⚪'} ${varName}`);
  });

  const allRequired = requiredVars.every((v) => envContent.includes(`${v}=`));
  console.log(`\n  Status: ${allRequired ? 'CONFIGURED' : 'INCOMPLETE'}\n`);
} catch (error) {
  console.log('  ❌ Error:', error.message, '\n');
}

// Final Summary
console.log('============================================================');
console.log('📊 Integration Summary:\n');

try {
  const packageJson = JSON.parse(readFileSync('package.json', 'utf-8'));
  const viteConfig =
    existsSync('vite.config.ts') || existsSync('vite.config.js');
  const buildConfigured = viteConfig && packageJson.scripts?.build;

  const envContent = existsSync('.env') ? readFileSync('.env', 'utf-8') : '';
  const supabaseConfigured =
    envContent.includes('VITE_SUPABASE_URL=') &&
    envContent.includes('VITE_SUPABASE_ANON_KEY=');

  const netlifyToml = existsSync('netlify.toml')
    ? readFileSync('netlify.toml', 'utf-8')
    : '';
  const netlifyConfigured = netlifyToml.includes('run build');

  const wranglerToml = existsSync('wrangler.toml')
    ? readFileSync('wrangler.toml', 'utf-8')
    : '';
  const workerFile =
    existsSync('src/worker.js') ||
    existsSync('workers/autopilot-deploy-worker.ts') ||
    wranglerToml.includes('main = ');
  const cloudflareConfigured =
    wranglerToml.includes('name = ') &&
    wranglerToml.includes('account_id = ') &&
    workerFile;

  const requiredVars = [
    'VITE_SUPABASE_URL',
    'VITE_SUPABASE_ANON_KEY',
    'JWT_SECRET',
  ];
  const envConfigured = requiredVars.every((v) => envContent.includes(`${v}=`));

  console.log(
    `${buildConfigured ? '✅' : '❌'} Build System: ${buildConfigured ? 'CONFIGURED' : 'INCOMPLETE'}`
  );
  console.log(
    `${supabaseConfigured ? '✅' : '❌'} Supabase: ${supabaseConfigured ? 'CONFIGURED' : 'INCOMPLETE'}`
  );
  console.log(
    `${netlifyConfigured ? '✅' : '❌'} Netlify: ${netlifyConfigured ? 'CONFIGURED' : 'INCOMPLETE'}`
  );
  console.log(
    `${cloudflareConfigured ? '✅' : '❌'} Cloudflare Workers: ${cloudflareConfigured ? 'CONFIGURED' : 'INCOMPLETE'}`
  );
  console.log(
    `${envConfigured ? '✅' : '❌'} Environment Variables: ${envConfigured ? 'CONFIGURED' : 'INCOMPLETE'}`
  );

  const allConfigured =
    buildConfigured &&
    supabaseConfigured &&
    netlifyConfigured &&
    cloudflareConfigured &&
    envConfigured;

  console.log('\n============================================================');
  if (allConfigured) {
    console.log('✅ All integrations are properly configured!');
    console.log('\nFor detailed information, see: INTEGRATION_STATUS.md');
    process.exit(0);
  } else {
    console.log('⚠️  Some integrations need attention. Please review above.');
    process.exit(1);
  }
} catch (error) {
  console.log('❌ Error generating summary:', error.message);
  process.exit(1);
}
