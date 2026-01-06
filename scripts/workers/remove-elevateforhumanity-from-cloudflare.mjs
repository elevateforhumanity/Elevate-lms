#!/usr/bin/env node

/**
 * Cloudflare Autopilot Worker: Remove www.elevateforhumanity.institute from Cloudflare
 *
 * This script removes the Cloudflare configuration for www.elevateforhumanity.institute
 * so it can be properly hosted on Durable (durablesites.co).
 *
 * What it does:
 * 1. Lists all zones in Cloudflare account
 * 2. Finds elevateforhumanity.institute zone
 * 3. Lists DNS records for www subdomain
 * 4. Removes/updates DNS records to point to Durable
 * 5. Disables Cloudflare proxy if enabled
 */

import https from 'https';

// Configuration
const CLOUDFLARE_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const CLOUDFLARE_ZONE_ID = process.env.CLOUDFLARE_ZONE_ID; // Optional: if you know it
const DOMAIN = 'elevateforhumanity.institute';
const SUBDOMAIN = 'www';
const DURABLE_TARGET = 'sites.durablesites.co'; // Update this with actual Durable CNAME

// Colors for output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
}

function makeRequest(options, data = null) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          if (parsed.success) {
            resolve(parsed.result);
          } else {
            reject(new Error(parsed.errors?.[0]?.message || 'API request failed'));
          }
        } catch (e) {
          reject(new Error(`Failed to parse response: ${body}`));
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

async function findZone() {
  log('\n🔍 Finding Cloudflare zone for elevateforhumanity.institute...', 'cyan');

  const options = {
    hostname: 'api.cloudflare.com',
    path: '/client/v4/zones?name=' + DOMAIN,
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${CLOUDFLARE_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
  };

  const zones = await makeRequest(options);

  if (zones.length === 0) {
    throw new Error(`Zone ${DOMAIN} not found in Cloudflare account`);
  }

  const zone = zones[0];
  log(`✅ Found zone: ${zone.name} (${zone.id})`, 'green');
  return zone.id;
}

async function listDNSRecords(zoneId) {
  log('\n📋 Listing DNS records for www subdomain...', 'cyan');

  const options = {
    hostname: 'api.cloudflare.com',
    path: `/client/v4/zones/${zoneId}/dns_records?name=${SUBDOMAIN}.${DOMAIN}`,
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${CLOUDFLARE_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
  };

  const records = await makeRequest(options);

  if (records.length === 0) {
    log('ℹ️  No DNS records found for www subdomain', 'yellow');
    return [];
  }

  log(`Found ${records.length} DNS record(s):`, 'blue');
  records.forEach(record => {
    log(`  - ${record.type} ${record.name} → ${record.content} (Proxied: ${record.proxied})`, 'blue');
  });

  return records;
}

async function updateDNSRecord(zoneId, recordId, recordData) {
  log(`\n🔧 Updating DNS record ${recordId}...`, 'cyan');

  const options = {
    hostname: 'api.cloudflare.com',
    path: `/client/v4/zones/${zoneId}/dns_records/${recordId}`,
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${CLOUDFLARE_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
  };

  const result = await makeRequest(options, recordData);
  log(`✅ DNS record updated successfully`, 'green');
  return result;
}

async function deleteDNSRecord(zoneId, recordId) {
  log(`\n🗑️  Deleting DNS record ${recordId}...`, 'cyan');

  const options = {
    hostname: 'api.cloudflare.com',
    path: `/client/v4/zones/${zoneId}/dns_records/${recordId}`,
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${CLOUDFLARE_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
  };

  await makeRequest(options);
  log(`✅ DNS record deleted successfully`, 'green');
}

async function main() {
  log('═══════════════════════════════════════════════════════════', 'cyan');
  log('  Cloudflare Autopilot: Remove www.elevateforhumanity.institute', 'cyan');
  log('═══════════════════════════════════════════════════════════', 'cyan');

  // Check for API token
  if (!CLOUDFLARE_API_TOKEN) {
    log('\n❌ ERROR: CLOUDFLARE_API_TOKEN environment variable not set', 'red');
    log('\nTo fix this:', 'yellow');
    log('1. Go to: https://dash.cloudflare.com/profile/api-tokens', 'yellow');
    log('2. Create a token with "Zone.DNS" edit permissions', 'yellow');
    log('3. Export it: export CLOUDFLARE_API_TOKEN="your-token-here"', 'yellow');
    log('4. Run this script again', 'yellow');
    process.exit(1);
  }

  try {
    // Step 1: Find the zone
    const zoneId = CLOUDFLARE_ZONE_ID || await findZone();

    // Step 2: List DNS records
    const records = await listDNSRecords(zoneId);

    if (records.length === 0) {
      log('\n✅ No DNS records to remove. Domain is already clean.', 'green');
      log('\n📝 Next steps:', 'cyan');
      log('1. Add DNS record in your DNS provider:', 'yellow');
      log(`   Type: CNAME`, 'yellow');
      log(`   Name: www`, 'yellow');
      log(`   Target: ${DURABLE_TARGET}`, 'yellow');
      log('2. Configure domain in Durable dashboard', 'yellow');
      log('3. Wait for DNS propagation (5-15 minutes)', 'yellow');
      return;
    }

    // Step 3: Process each record
    log('\n🎯 Action Plan:', 'cyan');
    log('Option 1: Update records to point to Durable', 'yellow');
    log('Option 2: Delete records (you\'ll add them manually in DNS provider)', 'yellow');

    // For automation, we'll update CNAME records to point to Durable
    for (const record of records) {
      if (record.type === 'CNAME') {
        // Update to point to Durable
        await updateDNSRecord(zoneId, record.id, {
          type: 'CNAME',
          name: SUBDOMAIN,
          content: DURABLE_TARGET,
          ttl: 1, // Auto
          proxied: false, // Disable Cloudflare proxy
        });
      } else if (record.type === 'A' || record.type === 'AAAA') {
        // Delete A/AAAA records (Durable uses CNAME)
        await deleteDNSRecord(zoneId, record.id);
      }
    }

    log('\n═══════════════════════════════════════════════════════════', 'green');
    log('  ✅ Cloudflare cleanup complete!', 'green');
    log('═══════════════════════════════════════════════════════════', 'green');

    log('\n📝 DNS Configuration Updated:', 'cyan');
    log(`   Type: CNAME`, 'green');
    log(`   Name: www.${DOMAIN}`, 'green');
    log(`   Target: ${DURABLE_TARGET}`, 'green');
    log(`   Proxied: No (DNS only)`, 'green');

    log('\n🚀 Next Steps:', 'cyan');
    log('1. Go to Durable dashboard: https://durablesites.co', 'yellow');
    log('2. Add custom domain: www.elevateforhumanity.institute', 'yellow');
    log('3. Verify DNS settings', 'yellow');
    log('4. Wait for SSL certificate (5-10 minutes)', 'yellow');
    log('5. Test: https://elevateforhumanity.institute', 'yellow');

    log('\n⏱️  DNS propagation may take 5-15 minutes', 'blue');
    log('Check status: https://dnschecker.org/#CNAME/www.elevateforhumanity.institute', 'blue');

  } catch (error) {
    log('\n❌ ERROR: ' + error.message, 'red');
    log('\nTroubleshooting:', 'yellow');
    log('1. Verify CLOUDFLARE_API_TOKEN is correct', 'yellow');
    log('2. Ensure token has "Zone.DNS" edit permissions', 'yellow');
    log('3. Check that elevateforhumanity.institute is in your Cloudflare account', 'yellow');
    process.exit(1);
  }
}

// Run the script
main();
