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
  console.log('🔍 Listing All Vercel Projects\n');

  // Get user info
  const user = await fetchVercelData('/v2/user');
  console.log(`Account: ${user.user.username || user.user.email}\n`);

  // Get team info
  let teamId = null;
  try {
    const teams = await fetchVercelData('/v2/teams');
    if (teams.teams && teams.teams.length > 0) {
      teamId = teams.teams[0].id;
      console.log(`Team: ${teams.teams[0].name} (${teamId})\n`);
    }
  } catch (e) {
    console.log('No team found\n');
  }

  // Get all projects
  const projectsEndpoint = teamId
    ? `/v9/projects?teamId=${teamId}`
    : '/v9/projects';
  const projectsData = await fetchVercelData(projectsEndpoint);

  console.log(`Found ${projectsData.projects.length} projects:\n`);
  console.log('═'.repeat(80));

  for (const project of projectsData.projects) {
    console.log(`\n📦 ${project.name}`);
    console.log(`   ID: ${project.id}`);
    console.log(`   Created: ${new Date(project.createdAt).toLocaleString()}`);

    if (project.link) {
      console.log(`   Repo: ${project.link.org}/${project.link.repo}`);
      console.log(`   Branch: ${project.link.productionBranch || 'main'}`);
    }

    if (project.targets?.production) {
      console.log(
        `   Production URL: https://${project.targets.production.alias?.[0] || project.name + '.vercel.app'}`
      );
    }

    if (project.latestDeployments && project.latestDeployments.length > 0) {
      const latest = project.latestDeployments[0];
      console.log(
        `   Latest Deploy: ${latest.state} (${new Date(latest.createdAt).toLocaleString()})`
      );
      console.log(`   Deploy URL: ${latest.url}`);
    }
  }

  console.log('\n' + '═'.repeat(80));
  console.log(
    '\n🎯 Which project is connected to elevateconnectsdirectory.org?'
  );
  console.log('\nCheck the production URLs above to find the correct project.');
}

main().catch(console.error);
