#!/usr/bin/env node
/**
 * Fix Vercel Deployment - Force deployment to www.elevateforhumanity.org
 * Uses Vercel API to configure production domain
 */

import https from 'https';
import fs from 'fs';

const PROJECT_ID = 'prj_S1qaRjgCpbvMkUuV2gob3ACLn8YO';
const ORG_ID = 'team_Ae8f33vVYR36quLOS8HCeROs';

// Get token from environment or GitHub secrets
const VERCEL_TOKEN = process.env.VERCEL_TOKEN;

if (!VERCEL_TOKEN) {
  console.error('❌ VERCEL_TOKEN environment variable not set');
  console.error('This needs to be run in GitHub Actions or with VERCEL_TOKEN set');
  process.exit(1);
}

function makeRequest(method, path, data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.vercel.com',
      path: path,
      method: method,
      headers: {
        'Authorization': `Bearer ${VERCEL_TOKEN}`,
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(body);
          resolve({ status: res.statusCode, data: json });
        } catch (e) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });

    req.on('error', reject);
    
    if (data) {
      req.write(JSON.stringify(data));
    }
    
    req.end();
  });
}

async function main() {
  console.log('🔧 Fixing Vercel Deployment Configuration\n');
  console.log(`Project ID: ${PROJECT_ID}`);
  console.log(`Org ID: ${ORG_ID}\n`);

  // 1. List current domains
  console.log('📋 Current domains:');
  const domainsRes = await makeRequest('GET', `/v9/projects/${PROJECT_ID}/domains`);
  if (domainsRes.data.domains) {
    domainsRes.data.domains.forEach(d => {
      console.log(`  - ${d.name} (verified: ${d.verified}, production: ${d.production || false})`);
    });
  }
  console.log('');

  // 2. Add www.elevateforhumanity.org if not exists
  const wwwDomain = 'www.elevateforhumanity.org';
  const hasWWW = domainsRes.data.domains?.some(d => d.name === wwwDomain);
  
  if (!hasWWW) {
    console.log(`📍 Adding ${wwwDomain}...`);
    const addRes = await makeRequest('POST', `/v9/projects/${PROJECT_ID}/domains`, {
      name: wwwDomain
    });
    console.log(`   Status: ${addRes.status}`);
    if (addRes.status === 200 || addRes.status === 201) {
      console.log('   ✅ Domain added successfully');
    } else {
      console.log(`   ⚠️  Response: ${JSON.stringify(addRes.data)}`);
    }
  } else {
    console.log(`✅ ${wwwDomain} already exists`);
  }
  console.log('');

  // 3. Add root domain with redirect
  const rootDomain = 'elevateforhumanity.org';
  const hasRoot = domainsRes.data.domains?.some(d => d.name === rootDomain);
  
  if (!hasRoot) {
    console.log(`📍 Adding ${rootDomain} with redirect...`);
    const addRes = await makeRequest('POST', `/v9/projects/${PROJECT_ID}/domains`, {
      name: rootDomain,
      redirect: wwwDomain
    });
    console.log(`   Status: ${addRes.status}`);
    if (addRes.status === 200 || addRes.status === 201) {
      console.log('   ✅ Domain added successfully');
    } else {
      console.log(`   ⚠️  Response: ${JSON.stringify(addRes.data)}`);
    }
  } else {
    console.log(`✅ ${rootDomain} already exists`);
  }
  console.log('');

  // 4. Trigger production deployment
  console.log('🚀 Triggering production deployment...');
  const deployRes = await makeRequest('POST', '/v13/deployments', {
    name: 'fix2-gpql',
    project: PROJECT_ID,
    target: 'production',
    gitSource: {
      type: 'github',
      ref: 'main',
      repoId: 'elevateforhumanity/fix2'
    }
  });
  
  if (deployRes.status === 200 || deployRes.status === 201) {
    console.log('✅ Deployment triggered!');
    console.log(`   URL: ${deployRes.data.url || 'pending'}`);
  } else {
    console.log(`⚠️  Status: ${deployRes.status}`);
    console.log(`   Response: ${JSON.stringify(deployRes.data)}`);
  }
  console.log('');

  // 5. Final status
  console.log('📋 Final domain list:');
  const finalRes = await makeRequest('GET', `/v9/projects/${PROJECT_ID}/domains`);
  if (finalRes.data.domains) {
    finalRes.data.domains.forEach(d => {
      console.log(`  - ${d.name} (verified: ${d.verified}, production: ${d.production || false})`);
    });
  }
  console.log('');
  console.log('✅ Configuration complete!');
  console.log('');
  console.log('🌐 Check your site at: https://elevateforhumanity.org');
  console.log('   (Wait 2-3 minutes for deployment to complete)');
}

main().catch(console.error);
