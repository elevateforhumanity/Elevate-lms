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
  console.log(`\n🔍 Checking ${name}: ${url}`);
  console.log('─'.repeat(60));
  
  try {
    const urlObj = new URL(url);
    const result = await makeRequest(urlObj.hostname, urlObj.pathname);
    
    // Check for images in HTML
    const hasHeroBanner = result.body.includes('hero-banner.png');
    const hasMedical = result.body.includes('medical-assistant.png');
    const hasBarber = result.body.includes('barber-new.png');
    
    console.log(`Status: ${result.status}`);
    console.log(`Vercel ID: ${result.headers['x-vercel-id'] || 'N/A'}`);
    console.log(`Cache: ${result.headers['x-vercel-cache'] || 'N/A'}`);
    console.log(`Age: ${result.headers['age'] || '0'} seconds`);
    console.log('');
    console.log('Images in HTML:');
    console.log(`  hero-banner.png: ${hasHeroBanner ? '✅' : '❌'}`);
    console.log(`  medical-assistant.png: ${hasMedical ? '✅' : '❌'}`);
    console.log(`  barber-new.png: ${hasBarber ? '✅' : '❌'}`);
    
    // Check actual image file
    console.log('');
    console.log('Checking actual image file...');
    const imgResult = await makeRequest(urlObj.hostname, '/images/hero-banner.png');
    console.log(`  Image Status: ${imgResult.status}`);
    console.log(`  Image Size: ${imgResult.headers['content-length']} bytes`);
    console.log(`  Image Modified: ${imgResult.headers['last-modified']}`);
    console.log(`  Image Cache: ${imgResult.headers['cache-control'] || 'N/A'}`);
    
    return {
      url,
      hasNewImages: hasHeroBanner && hasMedical && hasBarber,
      vercelId: result.headers['x-vercel-id'],
      imageSize: imgResult.headers['content-length']
    };
    
  } catch (error) {
    console.log(`❌ Error: ${error.message}`);
    return { url, error: error.message };
  }
}

async function main() {
  console.log('🔬 DEPLOYMENT DIAGNOSIS');
  console.log('═'.repeat(60));
  console.log('Checking what is actually deployed to each URL...');
  
  const preview = await checkDeployment(
    'https://fix2-gpql-git-main-elevate-48e460c9.vercel.app',
    'PREVIEW URL'
  );
  
  const production = await checkDeployment(
    'https://elevateforhumanity.org',
    'PRODUCTION URL'
  );
  
  console.log('\n');
  console.log('═'.repeat(60));
  console.log('📊 DIAGNOSIS SUMMARY');
  console.log('═'.repeat(60));
  console.log('');
  
  console.log('Preview URL:');
  console.log(`  Has new images: ${preview.hasNewImages ? '✅ YES' : '❌ NO'}`);
  console.log(`  Vercel ID: ${preview.vercelId}`);
  console.log(`  Image size: ${preview.imageSize} bytes`);
  console.log('');
  
  console.log('Production URL:');
  console.log(`  Has new images: ${production.hasNewImages ? '✅ YES' : '❌ NO'}`);
  console.log(`  Vercel ID: ${production.vercelId}`);
  console.log(`  Image size: ${production.imageSize} bytes`);
  console.log('');
  
  if (preview.vercelId === production.vercelId) {
    console.log('✅ SAME DEPLOYMENT');
    console.log('   Both URLs are using the same Vercel deployment');
    console.log('');
    if (preview.imageSize === production.imageSize) {
      console.log('✅ SAME IMAGE FILES');
      console.log('   Both URLs are serving identical image files');
      console.log('');
      console.log('🔍 CONCLUSION:');
      console.log('   The deployment is correct. Issue is CLIENT-SIDE.');
      console.log('   - Mobile browser has cached old images');
      console.log('   - Service worker may be caching');
      console.log('   - CDN edge cache may be stale');
    } else {
      console.log('❌ DIFFERENT IMAGE FILES');
      console.log('   Same deployment but different images - CDN issue');
    }
  } else {
    console.log('❌ DIFFERENT DEPLOYMENTS');
    console.log('   Preview and Production are using DIFFERENT deployments!');
    console.log('');
    console.log('🔧 FIX REQUIRED:');
    console.log('   Production domain needs to be assigned to the preview deployment');
    console.log('   Autopilot must reassign www.elevateforhumanity.org');
  }
  
  console.log('');
  console.log('═'.repeat(60));
}

main().catch(console.error);
