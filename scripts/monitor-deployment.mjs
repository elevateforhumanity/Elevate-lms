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


    return result.status === 200;
  } catch (error) {
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

          runs.slice(0, 3).forEach(run => {
            const status = run.conclusion === 'success' ? '✅' :
                          run.conclusion === 'failure' ? '❌' :
                          run.status === 'in_progress' ? '🟡' : '⚪';
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


  if (previewOk && prodOk && rootOk) {
    process.exit(0);
  }

  checkCount++;

  if (checkCount >= MAX_CHECKS) {

    if (!prodOk) {
    }

    process.exit(prodOk ? 0 : 1);
  }


  setTimeout(monitor, CHECK_INTERVAL);
}


monitor();
