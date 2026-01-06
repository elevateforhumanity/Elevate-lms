#!/usr/bin/env node
/**
 * Autopilot Fix Deployment
 * Directly calls Vercel API to configure domains
 * Uses the same logic as the Vercel autopilot worker
 */

import https from 'https';
import fs from 'fs';

const PROJECT_ID = 'prj_S1qaRjgCpbvMkUuV2gob3ACLn8YO';

// Try to get token from environment or .env file
let VERCEL_TOKEN = process.env.VERCEL_TOKEN;

if (!VERCEL_TOKEN && fs.existsSync('.env.local')) {
  const envContent = fs.readFileSync('.env.local', 'utf8');
  const match = envContent.match(/VERCEL_TOKEN=(.+)/);
  if (match) {
    VERCEL_TOKEN = match[1].trim();
  }
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

  if (!VERCEL_TOKEN) {
  }


  // 1. Add www.elevateforhumanity.institute
  if (VERCEL_TOKEN) {
    const wwwRes = await makeRequest('POST', `/v9/projects/${PROJECT_ID}/domains`, {
      name: 'www.elevateforhumanity.institute'
    });
    if (wwwRes.status === 200 || wwwRes.status === 201) {
    } else if (wwwRes.status === 409) {
    } else {
    }
  } else {
  }

  // 2. Add elevateforhumanity.institute with redirect
  if (VERCEL_TOKEN) {
    const rootRes = await makeRequest('POST', `/v9/projects/${PROJECT_ID}/domains`, {
      name: 'elevateforhumanity.institute',
      redirect: 'www.elevateforhumanity.institute'
    });
    if (rootRes.status === 200 || rootRes.status === 201) {
    } else if (rootRes.status === 409) {
    } else {
    }
  } else {
  }

  // 3. List all domains
  if (VERCEL_TOKEN) {
    const domainsRes = await makeRequest('GET', `/v9/projects/${PROJECT_ID}/domains`);
    if (domainsRes.data.domains) {
      domainsRes.data.domains.forEach(d => {
      });
    }
  } else {
  }

}

main().catch(console.error);
