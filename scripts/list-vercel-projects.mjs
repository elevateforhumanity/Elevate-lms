#!/usr/bin/env node
// List all Vercel projects to find the correct one

const VERCEL_TOKEN =
  process.env.VERCEL_TOKEN || process.argv[2] || 'CatFXMsC0PPzwulHl0CrRtfI';

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

async function main() {

  // Get user info
  const user = await fetchVercelData('/v2/user');

  // Get team info
  let teamId = null;
  try {
    const teams = await fetchVercelData('/v2/teams');
    if (teams.teams && teams.teams.length > 0) {
      teamId = teams.teams[0].id;
    }
  } catch (e) {
  }

  // Get all projects
  const projectsEndpoint = teamId
    ? `/v9/projects?teamId=${teamId}`
    : '/v9/projects';
  const projectsData = await fetchVercelData(projectsEndpoint);


  for (const project of projectsData.projects) {

    if (project.link) {
    }

    if (project.targets?.production) {
        `   Production URL: https://${project.targets.production.alias?.[0] || project.name + '.vercel.app'}`
      );
    }

    if (project.latestDeployments && project.latestDeployments.length > 0) {
      const latest = project.latestDeployments[0];
        `   Latest Deploy: ${latest.state} (${new Date(latest.createdAt).toLocaleString()})`
      );
    }
  }

    '\n🎯 Which project is connected to elevateconnectsdirectory.org?'
  );
}

main().catch(console.error);
