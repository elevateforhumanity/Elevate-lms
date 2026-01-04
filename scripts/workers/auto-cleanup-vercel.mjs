#!/usr/bin/env node
/**
 * Automated Vercel Duplicate Project Cleanup
 * Uses Vercel API to identify and delete unused projects
 * NO MANUAL STEPS - Full automation
 */

import https from 'https';
import { readFileSync, writeFileSync, existsSync } from 'fs';

const VERCEL_API = 'https://api.vercel.com';

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function section(title) {
  console.log('\n' + '━'.repeat(60));
  log(`▶  ${title}`, 'cyan');
  console.log('━'.repeat(60) + '\n');
}

async function apiRequest(endpoint, token, method = 'GET', body = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(endpoint, VERCEL_API);
    const options = {
      method,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    const req = https.request(url, options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (res.statusCode >= 400) {
            reject(new Error(parsed.error?.message || 'API request failed'));
          } else {
            resolve(parsed);
          }
        } catch (e) {
          reject(new Error('Failed to parse API response'));
        }
      });
    });

    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function getVercelToken() {
  // Check environment variable first
  if (process.env.VERCEL_TOKEN) {
    return process.env.VERCEL_TOKEN;
  }

  // Check config file
  if (existsSync('.vercel-token')) {
    return readFileSync('.vercel-token', 'utf8').trim();
  }

  log('❌ Vercel token not found!', 'red');
  log('\nTo get your token:', 'yellow');
  log('1. Go to: https://vercel.com/account/tokens', 'yellow');
  log('2. Create a new token', 'yellow');
  log('3. Save it to .vercel-token file or set VERCEL_TOKEN env var', 'yellow');
  process.exit(1);
}

async function listProjects(token) {
  try {
    const data = await apiRequest('/v9/projects', token);
    return data.projects || [];
  } catch (error) {
    log(`❌ Failed to list projects: ${error.message}`, 'red');
    throw error;
  }
}

async function getProjectDetails(token, projectId) {
  try {
    return await apiRequest(`/v9/projects/${projectId}`, token);
  } catch (error) {
    log(`⚠️  Failed to get details for ${projectId}`, 'yellow');
    return null;
  }
}

async function deleteProject(token, projectId) {
  try {
    await apiRequest(`/v9/projects/${projectId}`, token, 'DELETE');
    return true;
  } catch (error) {
    log(`❌ Failed to delete ${projectId}: ${error.message}`, 'red');
    return false;
  }
}

function analyzeProject(project) {
  const score = {
    total: 0,
    reasons: [],
  };

  // Has custom domain
  if (project.alias && project.alias.length > 0) {
    const hasCustomDomain = project.alias.some(a => 
      !a.domain.includes('vercel.app')
    );
    if (hasCustomDomain) {
      score.total += 50;
      score.reasons.push('✅ Has custom domain');
    }
  }

  // Recent deployment
  if (project.latestDeployments && project.latestDeployments.length > 0) {
    const latest = project.latestDeployments[0];
    const daysSinceDeployment = (Date.now() - latest.createdAt) / (1000 * 60 * 60 * 24);
    
    if (daysSinceDeployment < 7) {
      score.total += 30;
      score.reasons.push(`✅ Deployed ${Math.floor(daysSinceDeployment)} days ago`);
    } else if (daysSinceDeployment < 30) {
      score.total += 15;
      score.reasons.push(`⚠️  Deployed ${Math.floor(daysSinceDeployment)} days ago`);
    } else {
      score.reasons.push(`❌ Last deployed ${Math.floor(daysSinceDeployment)} days ago`);
    }

    // Successful deployment
    if (latest.state === 'READY') {
      score.total += 20;
      score.reasons.push('✅ Latest deployment successful');
    } else {
      score.reasons.push(`❌ Latest deployment: ${latest.state}`);
    }
  } else {
    score.reasons.push('❌ No deployments');
  }

  // Connected to correct repo
  if (project.link && project.link.type === 'github') {
    if (project.link.repo === 'elevateforhumanity/fix2') {
      score.total += 20;
      score.reasons.push('✅ Connected to correct repo');
    } else {
      score.reasons.push(`⚠️  Connected to: ${project.link.repo}`);
    }
  }

  // Has environment variables
  if (project.env && project.env.length > 0) {
    score.total += 10;
    score.reasons.push(`✅ Has ${project.env.length} environment variables`);
  } else {
    score.reasons.push('❌ No environment variables');
  }

  return score;
}

async function main() {
  log('\n🤖 Automated Vercel Duplicate Project Cleanup', 'cyan');
  log('━'.repeat(60), 'cyan');
  log('This script will automatically identify and delete duplicate projects\n');

  // Get token
  section('Step 1: Authentication');
  const token = await getVercelToken();
  log('✅ Vercel token loaded', 'green');

  // List all projects
  section('Step 2: Fetching Projects');
  const projects = await listProjects(token);
  
  // Filter for fix2/elevate related projects
  const relevantProjects = projects.filter(p => 
    p.name.includes('fix2') || 
    p.name.includes('elevate') ||
    (p.link && p.link.repo === 'elevateforhumanity/fix2')
  );

  if (relevantProjects.length === 0) {
    log('❌ No relevant projects found', 'red');
    process.exit(1);
  }

  log(`Found ${relevantProjects.length} relevant project(s):`, 'blue');
  relevantProjects.forEach(p => log(`  • ${p.name}`, 'blue'));

  if (relevantProjects.length === 1) {
    log('\n✅ Only 1 project found - no duplicates to clean up!', 'green');
    log(`   Project: ${relevantProjects[0].name}`, 'green');
    process.exit(0);
  }

  // Analyze each project
  section('Step 3: Analyzing Projects');
  const analyzed = [];

  for (const project of relevantProjects) {
    log(`\nAnalyzing: ${project.name}`, 'cyan');
    const details = await getProjectDetails(token, project.id);
    const score = analyzeProject(details || project);
    
    analyzed.push({
      ...project,
      score: score.total,
      reasons: score.reasons,
    });

    log(`Score: ${score.total}/100`, score.total >= 70 ? 'green' : score.total >= 40 ? 'yellow' : 'red');
    score.reasons.forEach(r => log(`  ${r}`));
  }

  // Sort by score (highest first)
  analyzed.sort((a, b) => b.score - a.score);

  // Determine which to keep
  section('Step 4: Decision');
  const toKeep = analyzed[0];
  const toDelete = analyzed.slice(1);

  log(`\n✅ KEEP: ${toKeep.name} (Score: ${toKeep.score}/100)`, 'green');
  toKeep.reasons.forEach(r => log(`  ${r}`, 'green'));

  if (toDelete.length === 0) {
    log('\n✅ No duplicates to delete', 'green');
    process.exit(0);
  }

  log(`\n❌ DELETE: ${toDelete.length} duplicate project(s)`, 'red');
  toDelete.forEach(p => {
    log(`\n  • ${p.name} (Score: ${p.score}/100)`, 'red');
    p.reasons.forEach(r => log(`    ${r}`, 'yellow'));
  });

  // Confirm deletion
  log('\n⚠️  WARNING: This will PERMANENTLY delete these projects!', 'yellow');
  log('Press Ctrl+C to cancel, or wait 5 seconds to continue...', 'yellow');
  
  await new Promise(resolve => setTimeout(resolve, 5000));

  // Delete duplicates
  section('Step 5: Deleting Duplicates');
  let deletedCount = 0;
  const deletionLog = [];

  for (const project of toDelete) {
    log(`\nDeleting: ${project.name}...`, 'yellow');
    const success = await deleteProject(token, project.id);
    
    if (success) {
      log(`✅ Deleted: ${project.name}`, 'green');
      deletedCount++;
      deletionLog.push({
        name: project.name,
        id: project.id,
        deletedAt: new Date().toISOString(),
        score: project.score,
      });
    } else {
      log(`❌ Failed to delete: ${project.name}`, 'red');
    }
  }

  // Save cleanup report
  section('Step 6: Saving Report');
  const report = {
    cleanedAt: new Date().toISOString(),
    keptProject: {
      name: toKeep.name,
      id: toKeep.id,
      score: toKeep.score,
    },
    deletedProjects: deletionLog,
    totalDeleted: deletedCount,
  };

  writeFileSync('.vercel-cleanup-report.json', JSON.stringify(report, null, 2));
  log('✅ Report saved to: .vercel-cleanup-report.json', 'green');

  // Update config
  if (existsSync('.vercel-autopilot-config.json')) {
    const config = JSON.parse(readFileSync('.vercel-autopilot-config.json', 'utf8'));
    config.vercel_project_name = toKeep.name;
    config.vercel_project_id = toKeep.id;
    config.cleaned_up_at = new Date().toISOString();
    config.deleted_projects = deletedCount;
    writeFileSync('.vercel-autopilot-config.json', JSON.stringify(config, null, 2));
    log('✅ Updated: .vercel-autopilot-config.json', 'green');
  }

  // Final summary
  section('✅ Cleanup Complete');
  log(`\n📊 Summary:`, 'cyan');
  log(`  • Kept project: ${toKeep.name}`, 'green');
  log(`  • Deleted projects: ${deletedCount}`, deletedCount > 0 ? 'green' : 'yellow');
  log(`  • Production URL: https://www.elevateconnectsdirectory.org`, 'blue');
  
  log('\n🎯 Next Steps:', 'cyan');
  log('  1. Verify production site works', 'blue');
  log('  2. Check environment variables in kept project', 'blue');
  log('  3. Test deployment', 'blue');
  
  log('\n✅ Your Vercel setup is now clean!', 'green');
}

// Run
main().catch(error => {
  log(`\n❌ Fatal error: ${error.message}`, 'red');
  process.exit(1);
});
