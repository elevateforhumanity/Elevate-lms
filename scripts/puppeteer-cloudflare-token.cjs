#!/usr/bin/env node

/**
 * Puppeteer Autopilot - Cloudflare API Token Configuration
 * Automatically creates a Cloudflare API token with correct permissions
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Configuration
const CLOUDFLARE_EMAIL = process.env.CLOUDFLARE_EMAIL;
const CLOUDFLARE_PASSWORD = process.env.CLOUDFLARE_PASSWORD;
const TOKEN_NAME = 'EFH Autopilot Durable Objects';

// Required permissions for the token
const REQUIRED_PERMISSIONS = [
  'Workers Scripts:Edit',
  'Workers KV Storage:Edit',
  'Workers Routes:Edit',
  'Account Settings:Read',
  'User Details:Read',
];

async function createCloudflareToken() {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🤖 Puppeteer Autopilot - Cloudflare Token Configuration');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('');

  // Validate credentials
  if (!CLOUDFLARE_EMAIL || !CLOUDFLARE_PASSWORD) {
    console.error('❌ Missing Cloudflare credentials');
    console.log('');
    console.log('Please set environment variables:');
    console.log('  export CLOUDFLARE_EMAIL=your-email@example.com');
    console.log('  export CLOUDFLARE_PASSWORD=your-password');
    console.log('');
    console.log('Then run this script again.');
    process.exit(1);
  }

  console.log('✅ Credentials loaded');
  console.log(`   Email: ${CLOUDFLARE_EMAIL}`);
  console.log('');

  let browser;
  let token = null;

  try {
    // Launch browser
    console.log('[1/8] Launching browser...');
    browser = await puppeteer.launch({
      headless: false, // Set to true for production
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--disable-gpu',
      ],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    console.log('✅ Browser launched');
    console.log('');

    // Navigate to Cloudflare login
    console.log('[2/8] Navigating to Cloudflare login...');
    await page.goto('https://dash.cloudflare.com/login', {
      waitUntil: 'networkidle2',
      timeout: 30000,
    });
    console.log('✅ Login page loaded');
    console.log('');

    // Fill in login form
    console.log('[3/8] Logging in...');
    await page.waitForSelector('input[type="email"]', { timeout: 10000 });
    await page.type('input[type="email"]', CLOUDFLARE_EMAIL);
    await page.type('input[type="password"]', CLOUDFLARE_PASSWORD);

    // Click login button
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 30000 }),
      page.click('button[type="submit"]'),
    ]);

    console.log('✅ Logged in successfully');
    console.log('');

    // Check for 2FA
    console.log('[4/8] Checking for 2FA...');
    await page.waitForTimeout(2000);

    const url = page.url();
    if (url.includes('2fa') || url.includes('verify')) {
      console.log('⚠️  2FA detected - Please complete 2FA manually');
      console.log('   Waiting 60 seconds for manual completion...');
      await page.waitForTimeout(60000);
    } else {
      console.log('✅ No 2FA required');
    }
    console.log('');

    // Navigate to API tokens page
    console.log('[5/8] Navigating to API tokens page...');
    await page.goto('https://dash.cloudflare.com/profile/api-tokens', {
      waitUntil: 'networkidle2',
      timeout: 30000,
    });
    console.log('✅ API tokens page loaded');
    console.log('');

    // Click "Create Token" button
    console.log('[6/8] Creating new token...');
    await page.waitForSelector(
      'button:has-text("Create Token"), a:has-text("Create Token")',
      { timeout: 10000 }
    );

    // Try different selectors for the Create Token button
    const createTokenButton = await page.evaluateHandle(() => {
      const buttons = Array.from(document.querySelectorAll('button, a'));
      return buttons.find((btn) => btn.textContent.includes('Create Token'));
    });

    if (createTokenButton) {
      await createTokenButton.click();
    } else {
      throw new Error('Could not find Create Token button');
    }

    await page.waitForTimeout(2000);
    console.log('✅ Token creation page loaded');
    console.log('');

    // Look for "Custom token" template
    console.log('[7/8] Configuring token permissions...');
    const customTokenButton = await page.evaluateHandle(() => {
      const buttons = Array.from(document.querySelectorAll('button, a'));
      return buttons.find(
        (btn) =>
          btn.textContent.includes('Custom token') ||
          btn.textContent.includes('Create Custom Token')
      );
    });

    if (customTokenButton) {
      await customTokenButton.click();
      await page.waitForTimeout(2000);
    }

    // Fill in token name
    await page.waitForSelector(
      'input[name="name"], input[placeholder*="Token name"]',
      { timeout: 10000 }
    );
    const nameInput = await page.$(
      'input[name="name"], input[placeholder*="Token name"]'
    );
    await nameInput.type(TOKEN_NAME);
    console.log(`✅ Token name set: ${TOKEN_NAME}`);

    // Configure permissions
    console.log('   Configuring permissions...');

    // This is complex and varies by Cloudflare's UI
    // For now, we'll provide instructions
    console.log('');
    console.log('⚠️  Please manually configure these permissions:');
    REQUIRED_PERMISSIONS.forEach((perm) => {
      console.log(`   • ${perm}`);
    });
    console.log('');
    console.log('   Waiting 30 seconds for manual configuration...');
    await page.waitForTimeout(30000);

    // Click "Continue to summary" or similar
    const continueButton = await page.evaluateHandle(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      return buttons.find(
        (btn) =>
          btn.textContent.includes('Continue') ||
          btn.textContent.includes('Summary') ||
          btn.textContent.includes('Next')
      );
    });

    if (continueButton) {
      await continueButton.click();
      await page.waitForTimeout(2000);
    }

    // Click "Create Token"
    const createButton = await page.evaluateHandle(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      return buttons.find((btn) => btn.textContent.includes('Create Token'));
    });

    if (createButton) {
      await createButton.click();
      await page.waitForTimeout(3000);
    }

    console.log('✅ Token created');
    console.log('');

    // Extract the token
    console.log('[8/8] Extracting token...');
    await page.waitForTimeout(2000);

    // Look for the token in various possible locations
    const tokenElement = await page.evaluateHandle(() => {
      // Try to find token in code blocks, pre tags, or specific classes
      const selectors = [
        'code',
        'pre',
        '[class*="token"]',
        '[class*="api-key"]',
        'input[readonly]',
      ];

      for (const selector of selectors) {
        const elements = document.querySelectorAll(selector);
        for (const el of elements) {
          const text = el.textContent || el.value;
          // Cloudflare tokens typically start with specific patterns
          if (text && text.length > 30 && !text.includes(' ')) {
            return text.trim();
          }
        }
      }
      return null;
    });

    token = await tokenElement.jsonValue();

    if (token) {
      console.log('✅ Token extracted successfully');
      console.log('');
      console.log(
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
      );
      console.log('🎉 Token Created Successfully!');
      console.log(
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
      );
      console.log('');
      console.log('Your new Cloudflare API token:');
      console.log(token);
      console.log('');

      // Update .env file
      const envPath = path.join(__dirname, '..', '.env');
      let envContent = fs.readFileSync(envPath, 'utf8');

      if (envContent.includes('CLOUDFLARE_API_TOKEN=')) {
        envContent = envContent.replace(
          /CLOUDFLARE_API_TOKEN=.*/,
          `CLOUDFLARE_API_TOKEN=${token}`
        );
      } else {
        envContent += `\nCLOUDFLARE_API_TOKEN=${token}\n`;
      }

      fs.writeFileSync(envPath, envContent);
      console.log('✅ Updated .env file with new token');
      console.log('');

      // Save token to separate file for backup
      const tokenPath = path.join(__dirname, '..', 'cloudflare-token.txt');
      fs.writeFileSync(tokenPath, token);
      console.log('✅ Token saved to: cloudflare-token.txt');
      console.log('');

      console.log('Next steps:');
      console.log('1. Run: ./scripts/auto-configure-autopilot.sh');
      console.log('2. The autopilot will automatically deploy to Cloudflare');
      console.log('3. Data will start flowing to Durable Objects');
      console.log('');
    } else {
      console.log('⚠️  Could not automatically extract token');
      console.log('');
      console.log('Please copy the token manually and update .env:');
      console.log('  CLOUDFLARE_API_TOKEN=your-token-here');
      console.log('');
      console.log('Press Enter when done...');
      await page.waitForTimeout(60000);
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('');
    console.log('Troubleshooting:');
    console.log('1. Check your Cloudflare credentials');
    console.log('2. Ensure you have access to create API tokens');
    console.log('3. Try creating the token manually at:');
    console.log('   https://dash.cloudflare.com/profile/api-tokens');
    console.log('');

    if (browser) {
      console.log('Browser will stay open for 30 seconds for debugging...');
      await new Promise((resolve) => setTimeout(resolve, 30000));
    }
  } finally {
    if (browser) {
      await browser.close();
    }
  }

  return token;
}

// Run the script
if (require.main === module) {
  createCloudflareToken()
    .then((token) => {
      if (token) {
        console.log('✅ Autopilot configuration complete!');
        process.exit(0);
      } else {
        console.log('⚠️  Manual configuration required');
        process.exit(1);
      }
    })
    .catch((error) => {
      console.error('Fatal error:', error);
      process.exit(1);
    });
}

module.exports = { createCloudflareToken };
