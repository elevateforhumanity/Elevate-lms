#!/usr/bin/env node
/**
 * Diagnose Deployment Issue
 * Check what's actually deployed and where
 */

import https from 'https';

const PROJECT_ID = 'prj_S1qaRjgCpbvMkUuV2gob3ACLn8YO';

function makeRequest(hostname, path, headers = {}) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: hostname,
      path: path,
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)',
        ...headers
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          headers: res.headers,
          body: body
        });
      });
    });

    req.on('error', reject);
    req.end();
  });
}

async function checkDeployment(url, name) {

  try {
    const urlObj = new URL(url);
    const result = await makeRequest(urlObj.hostname, urlObj.pathname);

    // Check for images in HTML
    const hasHeroBanner = result.body.includes('hero-banner.png');
    const hasMedical = result.body.includes('medical-assistant.png');
    const hasBarber = result.body.includes('barber-new.png');


    // Check actual image file
    const imgResult = await makeRequest(urlObj.hostname, '/images/hero-banner.png');

    return {
      url,
      hasNewImages: hasHeroBanner && hasMedical && hasBarber,
      vercelId: result.headers['x-vercel-id'],
      imageSize: imgResult.headers['content-length']
    };

  } catch (error) {
    return { url, error: error.message };
  }
}

async function main() {

  const preview = await checkDeployment(
    'https://fix2-gpql-git-main-elevate-48e460c9.vercel.app',
    'PREVIEW URL'
  );

  const production = await checkDeployment(
    'https://elevateforhumanity.institute',
    'PRODUCTION URL'
  );




  if (preview.vercelId === production.vercelId) {
    if (preview.imageSize === production.imageSize) {
    } else {
    }
  } else {
  }

}

main().catch(console.error);
