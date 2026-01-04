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
    const user = await fetchVercelData('/v2/user');

    // Step 2: Get team info if applicable
    let teamId = null;
    try {
      const teams = await fetchVercelData('/v2/teams');
      if (teams.teams && teams.teams.length > 0) {
        teamId = teams.teams[0].id;
      }
    } catch (e) {
    }

    // Step 3: Get projects
    const projectsEndpoint = teamId
      ? `/v9/projects?teamId=${teamId}`
      : '/v9/projects';
    const projectsData = await fetchVercelData(projectsEndpoint);

    if (!projectsData.projects || projectsData.projects.length === 0) {
      console.error('❌ No projects found');
      process.exit(1);
    }


    // Find fix2 project
    let project = projectsData.projects.find(
      (p) => p.name.includes('fix2') || p.name.includes('elevate')
    );

    if (!project) {
      projectsData.projects.forEach((p, i) => {
      });
      project = projectsData.projects[0];
    } else {
    }


    // Step 4: Prepare environment variables
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

      `✅ Prepared ${Object.keys(envVars).length} environment variables`
    );

    // Step 5: Set environment variables
    let setCount = 0;
    let updateCount = 0;

    for (const [key, value] of Object.entries(envVars)) {
      try {
        const target =
          key === 'NODE_ENV'
            ? ['production']
            : ['production', 'preview', 'development'];
        await setVercelEnv(project.id, key, value, target);
        setCount++;
      } catch (error) {
        if (error.message.includes('already exists')) {
          updateCount++;
        } else {
          console.error(`❌ Failed to set ${key}: ${error.message}`);
        }
      }
    }


    // Step 6: Trigger deployment
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
    } else {
    }

    // Step 7: Save configuration
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

    // Step 8: Summary
      `   Environment Variables: ${Object.keys(envVars).length} configured`
    );
      '   Add these to: https://github.com/elevateforhumanity/fix2/settings/secrets/actions'
    );
      `   SUPABASE_ANON_KEY: ${envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY}`
    );
      `   SUPABASE_SERVICE_ROLE_KEY: ${envVars.SUPABASE_SERVICE_ROLE_KEY}`
    );
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
