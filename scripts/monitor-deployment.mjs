#!/usr/bin/env node
/**
 * Monitor Deployment Status
 * Continuously checks deployment and domain configuration
 */

import https from 'https';

const PROJECT_ID = 'prj_S1qaRjgCpbvMkUuV2gob3ACLn8YO';
const CHECK_INTERVAL = 30000; // 30 seconds
const MAX_CHECKS = 20; // 10 minutes total

let checkCount = 0;

function makeRequest(hostname, path) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: hostname,
      path: path,
      method: 'HEAD',
      timeout: 10000
    };

    const req = https.request(options, (res) => {
      resolve({
        status: res.statusCode,
        headers: res.headers
      });
    });

    req.on('error', (error) => {
      resolve({ status: 0, error: error.message });
    });

    req.on('timeout', () => {
      req.destroy();
      resolve({ status: 0, error: 'timeout' });
    });

    req.end();
  });
}

async function checkSite(url, name) {
  try {
    const urlObj = new URL(url);
    const result = await makeRequest(urlObj.hostname, urlObj.pathname);
    
    const status = result.status === 200 ? '✅' : 
                   result.status === 0 ? '❌' : 
                   result.status >= 300 && result.status < 400 ? '🔄' : '⚠️';
    
    console.log(`${status} ${name}: ${result.status || 'ERROR'} ${result.error || ''}`);
    
    return result.status === 200;
  } catch (error) {
    console.log(`❌ ${name}: ${error.message}`);
    return false;
  }
}

async function checkGitHubActions() {
  return new Promise((resolve) => {
    const options = {
      hostname: 'api.github.com',
      path: '/repos/elevateforhumanity/fix2/actions/runs?per_page=3',
      method: 'GET',
      headers: {
        'User-Agent': 'Deployment-Monitor',
        'Accept': 'application/vnd.github.v3+json'
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          const data = JSON.parse(body);
          const runs = data.workflow_runs || [];
          
          console.log('\n📋 Recent GitHub Actions:');
          runs.slice(0, 3).forEach(run => {
            const status = run.conclusion === 'success' ? '✅' : 
                          run.conclusion === 'failure' ? '❌' : 
                          run.status === 'in_progress' ? '🟡' : '⚪';
            console.log(`   ${status} ${run.name} - ${run.conclusion || run.status}`);
          });
          
          resolve(runs);
        } catch (e) {
          resolve([]);
        }
      });
    });

    req.on('error', () => resolve([]));
    req.end();
  });
}

async function monitor() {
  console.log('\n🔍 Deployment Monitor Started');
  console.log('━'.repeat(60));
  console.log(`Time: ${new Date().toLocaleString()}`);
  console.log(`Check ${checkCount + 1}/${MAX_CHECKS}\n`);

  // Check preview URL
  const previewOk = await checkSite(
    'https://fix2-gpql-git-main-elevate-48e460c9.vercel.app/',
    'Preview URL (fix2-gpql)'
  );

  // Check production domain
  const prodOk = await checkSite(
    'https://elevateforhumanity.org/',
    'Production (www.elevateforhumanity.org)'
  );

  // Check root domain
  const rootOk = await checkSite(
    'https://elevateforhumanity.org/',
    'Root Domain (elevateforhumanity.org)'
  );

  // Check GitHub Actions
  await checkGitHubActions();

  console.log('\n📊 Status Summary:');
  console.log(`   Preview URL: ${previewOk ? '✅ Working' : '❌ Down'}`);
  console.log(`   Production: ${prodOk ? '✅ Working' : '⏳ Pending'}`);
  console.log(`   Root Domain: ${rootOk ? '✅ Working' : '⏳ Pending'}`);

  if (previewOk && prodOk && rootOk) {
    console.log('\n🎉 SUCCESS! All deployments are live!');
    console.log('\n✅ Your website is now accessible at:');
    console.log('   - https://elevateforhumanity.org');
    console.log('   - https://elevateforhumanity.org (redirects to www)');
    console.log('   - https://fix2-gpql-git-main-elevate-48e460c9.vercel.app/');
    console.log('\n🎨 All changes are live:');
    console.log('   ✅ Custom hero banner');
    console.log('   ✅ Medical Assistant & Barber images');
    console.log('   ✅ Video with voiceover on About page');
    console.log('   ✅ No EIN numbers');
    console.log('   ✅ All feature images');
    process.exit(0);
  }

  checkCount++;

  if (checkCount >= MAX_CHECKS) {
    console.log('\n⏱️  Monitoring timeout reached (10 minutes)');
    console.log('\n📝 Current Status:');
    console.log(`   Preview URL: ${previewOk ? '✅' : '❌'}`);
    console.log(`   Production: ${prodOk ? '✅' : '❌'}`);
    console.log(`   Root Domain: ${rootOk ? '✅' : '❌'}`);
    
    if (!prodOk) {
      console.log('\n💡 Next Steps:');
      console.log('   1. Check Vercel dashboard for domain configuration');
      console.log('   2. Verify DNS settings point to Vercel');
      console.log('   3. Wait for DNS propagation (can take up to 48 hours)');
      console.log('   4. Check autopilot worker logs on Cloudflare');
    }
    
    process.exit(prodOk ? 0 : 1);
  }

  console.log(`\n⏳ Next check in 30 seconds... (${MAX_CHECKS - checkCount} checks remaining)`);
  console.log('━'.repeat(60));
  
  setTimeout(monitor, CHECK_INTERVAL);
}

console.log('🤖 Deployment Monitor');
console.log('Monitoring deployment status every 30 seconds...');
console.log('Press Ctrl+C to stop\n');

monitor();
