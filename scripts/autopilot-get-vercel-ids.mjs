#!/usr/bin/env node
// Autopilot worker: Automatically fetch Vercel IDs and configure environment

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const VERCEL_TOKEN = process.env.VERCEL_TOKEN || process.argv[2];

if (!VERCEL_TOKEN) {
  console.error('❌ VERCEL_TOKEN is required');
  console.error('Usage: node autopilot-get-vercel-ids.mjs YOUR_VERCEL_TOKEN');
  console.error('Or set VERCEL_TOKEN environment variable');
  process.exit(1);
}

console.log('🤖 Autopilot Worker: Fetching Vercel Configuration');
console.log('');

async function fetchVercelData(endpoint) {
  const response = await fetch(`https://api.vercel.com${endpoint}`, {
    headers: {
      Authorization: `Bearer ${VERCEL_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(
      `Vercel API error: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

async function setVercelEnv(
  projectId,
  envName,
  envValue,
  target = ['production', 'preview', 'development']
) {
  const response = await fetch(
    `https://api.vercel.com/v10/projects/${projectId}/env`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${VERCEL_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        key: envName,
        value: envValue,
        type: 'encrypted',
        target: target,
      }),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    // If variable already exists, update it
    if (error.error?.code === 'ENV_ALREADY_EXISTS') {
      return updateVercelEnv(projectId, envName, envValue, target);
    }
    throw new Error(`Failed to set ${envName}: ${JSON.stringify(error)}`);
  }

  return response.json();
}

async function updateVercelEnv(projectId, envName, envValue, target) {
  // Get existing env var ID
  const envs = await fetch(
    `https://api.vercel.com/v9/projects/${projectId}/env`,
    {
      headers: {
        Authorization: `Bearer ${VERCEL_TOKEN}`,
      },
    }
  ).then((r) => r.json());

  const existingEnv = envs.envs?.find((e) => e.key === envName);
  if (!existingEnv) {
    throw new Error(`Environment variable ${envName} not found`);
  }

  // Update it
  const response = await fetch(
    `https://api.vercel.com/v9/projects/${projectId}/env/${existingEnv.id}`,
    {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${VERCEL_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        value: envValue,
        target: target,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to update ${envName}`);
  }

  return response.json();
}

async function main() {
  try {
    // Step 1: Get user/team info
    console.log('📋 Step 1: Fetching Vercel account info...');
    const user = await fetchVercelData('/v2/user');
    console.log(`✅ Logged in as: ${user.user.username || user.user.email}`);
    console.log(`✅ User ID: ${user.user.id}`);
    console.log('');

    // Step 2: Get team info if applicable
    let teamId = null;
    try {
      const teams = await fetchVercelData('/v2/teams');
      if (teams.teams && teams.teams.length > 0) {
        teamId = teams.teams[0].id;
        console.log(`✅ Team ID: ${teamId}`);
        console.log(`✅ Team Name: ${teams.teams[0].name}`);
      }
    } catch (e) {
      console.log('ℹ️  No team found (using personal account)');
    }
    console.log('');

    // Step 3: Get projects
    console.log('📋 Step 2: Fetching Vercel projects...');
    const projectsEndpoint = teamId
      ? `/v9/projects?teamId=${teamId}`
      : '/v9/projects';
    const projectsData = await fetchVercelData(projectsEndpoint);

    if (!projectsData.projects || projectsData.projects.length === 0) {
      console.error('❌ No projects found');
      process.exit(1);
    }

    console.log(`✅ Found ${projectsData.projects.length} project(s)`);
    console.log('');

    // Find fix2 project
    let project = projectsData.projects.find(
      (p) => p.name.includes('fix2') || p.name.includes('elevate')
    );

    if (!project) {
      console.log('Available projects:');
      projectsData.projects.forEach((p, i) => {
        console.log(`  ${i + 1}. ${p.name} (${p.id})`);
      });
      project = projectsData.projects[0];
      console.log('');
      console.log(`⚠️  Using first project: ${project.name}`);
    } else {
      console.log(`✅ Found project: ${project.name}`);
    }

    console.log(`✅ Project ID: ${project.id}`);
    console.log('');

    // Step 4: Prepare environment variables
    console.log('📋 Step 3: Preparing environment variables...');
    const envVars = {
      NEXT_PUBLIC_SUPABASE_URL: 'https://cuxzzpsyufcewtmicszk.supabase.co',
      NEXT_PUBLIC_SUPABASE_ANON_KEY:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgxNjEwNDcsImV4cCI6MjA3MzczNzA0N30.DyFtzoKha_tuhKiSIPoQlKonIpaoSYrlhzntCUvLUnA',
      SUPABASE_SERVICE_ROLE_KEY:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODE2MTA0NywiZXhwIjoyMDczNzM3MDQ3fQ.5JRYvJPzFzsVaZQkbZDLcohP7dq8LWQEFeFdVByyihE',
      NEXT_PUBLIC_APP_URL: 'https://elevateconnectsdirectory.org',
      NEXT_PUBLIC_SITE_URL: 'https://elevateconnectsdirectory.org',
      NEXT_PUBLIC_BASE_URL: 'https://elevateconnectsdirectory.org',
      NODE_ENV: 'production',
    };

    console.log(
      `✅ Prepared ${Object.keys(envVars).length} environment variables`
    );
    console.log('');

    // Step 5: Set environment variables
    console.log('📋 Step 4: Setting environment variables in Vercel...');
    let setCount = 0;
    let updateCount = 0;

    for (const [key, value] of Object.entries(envVars)) {
      try {
        const target =
          key === 'NODE_ENV'
            ? ['production']
            : ['production', 'preview', 'development'];
        await setVercelEnv(project.id, key, value, target);
        console.log(`✅ Set ${key}`);
        setCount++;
      } catch (error) {
        if (error.message.includes('already exists')) {
          console.log(`🔄 Updated ${key}`);
          updateCount++;
        } else {
          console.error(`❌ Failed to set ${key}: ${error.message}`);
        }
      }
    }

    console.log('');
    console.log(`✅ Set ${setCount} new variables`);
    console.log(`🔄 Updated ${updateCount} existing variables`);
    console.log('');

    // Step 6: Trigger deployment
    console.log('📋 Step 5: Triggering Vercel deployment...');
    const deployEndpoint = teamId
      ? `/v13/deployments?teamId=${teamId}`
      : '/v13/deployments';

    const deployment = await fetch(`https://api.vercel.com${deployEndpoint}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${VERCEL_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: project.name,
        project: project.id,
        target: 'production',
        gitSource: {
          type: 'github',
          ref: 'main',
          repoId:
            project.link?.repoId ||
            project.latestDeployments?.[0]?.meta?.githubRepoId,
        },
      }),
    }).then((r) => r.json());

    if (deployment.error) {
      console.log('⚠️  Could not trigger deployment automatically');
      console.log('   Go to Vercel dashboard and click "Redeploy"');
    } else {
      console.log(`✅ Deployment triggered: ${deployment.url}`);
    }
    console.log('');

    // Step 7: Save configuration
    console.log('📋 Step 6: Saving configuration...');
    const config = {
      vercel_org_id: teamId || user.user.id,
      vercel_project_id: project.id,
      vercel_project_name: project.name,
      configured_at: new Date().toISOString(),
    };

    fs.writeFileSync(
      path.join(process.cwd(), '.vercel-autopilot-config.json'),
      JSON.stringify(config, null, 2)
    );
    console.log('✅ Configuration saved to .vercel-autopilot-config.json');
    console.log('');

    // Step 8: Summary
    console.log('═'.repeat(60));
    console.log('🎉 AUTOPILOT CONFIGURATION COMPLETE');
    console.log('═'.repeat(60));
    console.log('');
    console.log('📊 Summary:');
    console.log(`   Organization ID: ${config.vercel_org_id}`);
    console.log(`   Project ID: ${config.vercel_project_id}`);
    console.log(`   Project Name: ${config.vercel_project_name}`);
    console.log(
      `   Environment Variables: ${Object.keys(envVars).length} configured`
    );
    console.log('');
    console.log('🔗 Next Steps:');
    console.log('   1. Wait 2-3 minutes for Vercel to deploy');
    console.log('   2. Visit: https://elevateconnectsdirectory.org');
    console.log('   3. Check: https://vercel.com/dashboard');
    console.log('');
    console.log('📝 GitHub Secrets (optional - for autopilot workflows):');
    console.log(
      '   Add these to: https://github.com/elevateforhumanity/fix2/settings/secrets/actions'
    );
    console.log('');
    console.log(`   VERCEL_TOKEN: ${VERCEL_TOKEN}`);
    console.log(`   VERCEL_ORG_ID: ${config.vercel_org_id}`);
    console.log(`   VERCEL_PROJECT_ID: ${config.vercel_project_id}`);
    console.log(
      `   SUPABASE_ANON_KEY: ${envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY}`
    );
    console.log(
      `   SUPABASE_SERVICE_ROLE_KEY: ${envVars.SUPABASE_SERVICE_ROLE_KEY}`
    );
    console.log('');
    console.log('✅ Your site should be live in 2-3 minutes!');
    console.log('');
  } catch (error) {
    console.error('');
    console.error('❌ Autopilot Worker Failed');
    console.error('');
    console.error('Error:', error.message);
    console.error('');
    console.error('Troubleshooting:');
    console.error('  1. Verify VERCEL_TOKEN is correct');
    console.error('  2. Check token has correct permissions');
    console.error('  3. Ensure you have access to the project');
    console.error('');
    process.exit(1);
  }
}

main();
