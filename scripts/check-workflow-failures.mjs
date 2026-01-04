#!/usr/bin/env node
/**
 * Check GitHub Actions Workflow Failures
 * Uses GitHub API to fetch and analyze failed workflows
 */

import https from 'https';

const REPO = 'elevateforhumanity/fix2';

function makeRequest(path) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      path: path,
      method: 'GET',
      headers: {
        'User-Agent': 'Deployment-Autopilot',
        'Accept': 'application/vnd.github.v3+json'
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          resolve(body);
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}

async function main() {
  console.log('🔍 Checking GitHub Actions Workflow Failures\n');
  console.log(`Repository: ${REPO}\n`);

  // Get recent workflow runs
  const runs = await makeRequest(`/repos/${REPO}/actions/runs?per_page=10`);

  if (!runs.workflow_runs) {
    console.log('❌ Could not fetch workflow runs');
    console.log('Response:', runs);
    return;
  }

  console.log(`📋 Found ${runs.workflow_runs.length} recent workflow runs\n`);

  // Analyze each run
  for (const run of runs.workflow_runs) {
    const status = run.conclusion === 'failure' ? '❌' : 
                   run.conclusion === 'success' ? '✅' : 
                   run.status === 'in_progress' ? '🟡' : '⚪';
    
    console.log(`${status} ${run.name}`);
    console.log(`   Status: ${run.status} | Conclusion: ${run.conclusion || 'pending'}`);
    console.log(`   Commit: ${run.head_sha.substring(0, 7)} - ${run.head_commit?.message?.split('\n')[0] || 'N/A'}`);
    console.log(`   URL: ${run.html_url}`);

    // If failed, get job details
    if (run.conclusion === 'failure') {
      console.log(`\n   🔍 Fetching failure details...`);
      
      const jobs = await makeRequest(`/repos/${REPO}/actions/runs/${run.id}/jobs`);
      
      if (jobs.jobs) {
        for (const job of jobs.jobs) {
          if (job.conclusion === 'failure') {
            console.log(`\n   ❌ Failed Job: ${job.name}`);
            console.log(`      Started: ${job.started_at}`);
            console.log(`      Completed: ${job.completed_at}`);
            
            // Get steps
            if (job.steps) {
              for (const step of job.steps) {
                if (step.conclusion === 'failure') {
                  console.log(`\n      ❌ Failed Step: ${step.name}`);
                  console.log(`         Status: ${step.status}`);
                  console.log(`         Conclusion: ${step.conclusion}`);
                  console.log(`         Started: ${step.started_at}`);
                  console.log(`         Completed: ${step.completed_at}`);
                }
              }
            }
          }
        }
      }
    }
    
    console.log('');
  }

  // Summary
  const failed = runs.workflow_runs.filter(r => r.conclusion === 'failure');
  const succeeded = runs.workflow_runs.filter(r => r.conclusion === 'success');
  const inProgress = runs.workflow_runs.filter(r => r.status === 'in_progress');

  console.log('📊 Summary:');
  console.log(`   ✅ Successful: ${succeeded.length}`);
  console.log(`   ❌ Failed: ${failed.length}`);
  console.log(`   🟡 In Progress: ${inProgress.length}`);
  console.log('');

  if (failed.length > 0) {
    console.log('🔧 Common Fixes:');
    console.log('   1. Missing environment variables (VERCEL_TOKEN, etc.)');
    console.log('   2. Missing pnpm-lock.yaml');
    console.log('   3. Build errors (check TypeScript/ESLint)');
    console.log('   4. Missing dependencies');
    console.log('');
    console.log('💡 Recommendation:');
    console.log('   Check the failed workflow logs at:');
    failed.forEach(run => {
      console.log(`   - ${run.html_url}`);
    });
  }
}

main().catch(console.error);
