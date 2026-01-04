#!/usr/bin/env node

import { readFileSync, existsSync, statSync, readdirSync } from 'fs';
import { join } from 'path';


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
try {
  const packageJson = JSON.parse(readFileSync('package.json', 'utf-8'));
  const viteConfig =
    existsSync('vite.config.ts') || existsSync('vite.config.js');

    packageJson.scripts?.build
      ? '  ✅ Build script present'
      : '  ❌ Build script missing'
  );
    `  Status: ${viteConfig && packageJson.scripts?.build ? 'CONFIGURED' : 'INCOMPLETE'}\n`
  );
} catch (error) {
}

// Check Supabase
try {
  const envContent = existsSync('.env') ? readFileSync('.env', 'utf-8') : '';
  const hasUrl = envContent.includes('VITE_SUPABASE_URL=');
  const hasKey = envContent.includes('VITE_SUPABASE_ANON_KEY=');

    hasKey ? '  ✅ Anon key configured' : '  ❌ Anon key not configured'
  );

  const migrations = countFiles('supabase/migrations', '.sql');

  const functions = countDirs('supabase/functions');

} catch (error) {
}

// Check Netlify
try {
  const netlifyToml = existsSync('netlify.toml')
    ? readFileSync('netlify.toml', 'utf-8')
    : '';
  const hasBuildCommand = netlifyToml.includes('run build');

    hasBuildCommand
      ? '  ✅ Build command configured'
      : '  ❌ Build command not configured'
  );

  const functions =
    countFiles('netlify/functions', '.js') +
    countFiles('netlify/functions', '.ts');

  const redirects = (netlifyToml.match(/\[\[redirects\]\]/g) || []).length;

} catch (error) {
}

// Check Cloudflare Workers
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

    hasWorker ? '  ✅ Worker configured' : '  ❌ Worker not configured'
  );
    hasAccountId ? '  ✅ Account ID present' : '  ❌ Account ID missing'
  );
    workerFile ? '  ✅ Worker file exists' : '  ❌ Worker file missing'
  );

    `  Status: ${hasWorker && hasAccountId && workerFile ? 'CONFIGURED' : 'INCOMPLETE'}\n`
  );
} catch (error) {
}

// Check Environment Variables
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

  requiredVars.forEach((varName) => {
    const hasVar = envContent.includes(`${varName}=`);
  });

  optionalVars.forEach((varName) => {
    const hasVar = envContent.includes(`${varName}=`);
  });

  const allRequired = requiredVars.every((v) => envContent.includes(`${v}=`));
} catch (error) {
}

// Final Summary

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

    `${buildConfigured ? '✅' : '❌'} Build System: ${buildConfigured ? 'CONFIGURED' : 'INCOMPLETE'}`
  );
    `${supabaseConfigured ? '✅' : '❌'} Supabase: ${supabaseConfigured ? 'CONFIGURED' : 'INCOMPLETE'}`
  );
    `${netlifyConfigured ? '✅' : '❌'} Netlify: ${netlifyConfigured ? 'CONFIGURED' : 'INCOMPLETE'}`
  );
    `${cloudflareConfigured ? '✅' : '❌'} Cloudflare Workers: ${cloudflareConfigured ? 'CONFIGURED' : 'INCOMPLETE'}`
  );
    `${envConfigured ? '✅' : '❌'} Environment Variables: ${envConfigured ? 'CONFIGURED' : 'INCOMPLETE'}`
  );

  const allConfigured =
    buildConfigured &&
    supabaseConfigured &&
    netlifyConfigured &&
    cloudflareConfigured &&
    envConfigured;

  if (allConfigured) {
    process.exit(0);
  } else {
    process.exit(1);
  }
} catch (error) {
  process.exit(1);
}
