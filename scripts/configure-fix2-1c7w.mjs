#!/usr/bin/env node
// Configure the correct Vercel project: fix2-1c7w

const VERCEL_TOKEN = 'CatFXMsC0PPzwulHl0CrRtfI';
const PROJECT_NAME = 'fix2-1c7w';

async function setVercelEnv(
  projectId,
  envName,
  envValue,
  target = ['production', 'preview', 'development']
) {
  // First, try to remove existing variable
  try {
    const envs = await fetch(
      `https://api.vercel.com/v9/projects/${projectId}/env`,
      {
        headers: { Authorization: `Bearer ${VERCEL_TOKEN}` },
      }
    ).then((r) => r.json());

    const existing = envs.envs?.find((e) => e.key === envName);
    if (existing) {
      await fetch(
        `https://api.vercel.com/v9/projects/${projectId}/env/${existing.id}`,
        {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${VERCEL_TOKEN}` },
        }
      );
    }
  } catch (e) {
    // Ignore errors
  }

  // Add new variable
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
    throw new Error(`Failed to set ${envName}: ${JSON.stringify(error)}`);
  }

  return response.json();
}

async function main() {

  // Get team info
  const teams = await fetch('https://api.vercel.com/v2/teams', {
    headers: { Authorization: `Bearer ${VERCEL_TOKEN}` },
  }).then((r) => r.json());

  const teamId = teams.teams[0].id;

  // Find the correct project
  const projects = await fetch(
    `https://api.vercel.com/v9/projects?teamId=${teamId}`,
    {
      headers: { Authorization: `Bearer ${VERCEL_TOKEN}` },
    }
  ).then((r) => r.json());

  const project = projects.projects.find((p) => p.name === PROJECT_NAME);

  if (!project) {
    console.error(`❌ Project ${PROJECT_NAME} not found!`);
    projects.projects.forEach((p) => console.log(`  - ${p.name} (${p.id})`));
    process.exit(1);
  }


  // Environment variables to set
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


  for (const [key, value] of Object.entries(envVars)) {
    try {
      const target =
        key === 'NODE_ENV'
          ? ['production']
          : ['production', 'preview', 'development'];
      await setVercelEnv(project.id, key, value, target);
    } catch (error) {
      console.error(`❌ Failed to set ${key}:`, error.message);
    }
  }


  // Trigger deployment
  const deployment = await fetch(
    `https://api.vercel.com/v13/deployments?teamId=${teamId}`,
    {
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
          repoId: project.link?.repoId,
        },
      }),
    }
  ).then((r) => r.json());

  if (deployment.error) {
  } else {
  }

    `   Environment Variables: ${Object.keys(envVars).length} configured`
  );
    '   Check status at: https://vercel.com/gitpod/fix2-1c7w/deployments\n'
  );
}

main().catch(console.error);
