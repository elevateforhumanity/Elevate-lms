#!/usr/bin/env node

/**
 * Vercel Deployment Checker with Puppeteer
 * Automatically checks the deployed site and reports any errors
 */

import puppeteer from 'puppeteer';

const DEPLOYMENT_URL = process.env.VERCEL_URL || 'https://fix2-i7xhpeuz7-lizzy6262.vercel.app';

async function checkDeployment() {
  console.log('🚀 Starting Vercel Deployment Check...\n');
  console.log(`📍 Target URL: ${DEPLOYMENT_URL}\n`);

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    
    // Collect console logs
    const consoleLogs = [];
    const errors = [];
    
    page.on('console', msg => {
      const text = msg.text();
      consoleLogs.push({ type: msg.type(), text });
      
      if (msg.type() === 'error') {
        errors.push(text);
      }
    });

    // Collect page errors
    page.on('pageerror', error => {
      errors.push(`Page Error: ${error.message}`);
    });

    // Collect failed requests
    const failedRequests = [];
    page.on('requestfailed', request => {
      failedRequests.push({
        url: request.url(),
        failure: request.failure().errorText
      });
    });

    console.log('🌐 Loading page...');
    
    try {
      await page.goto(DEPLOYMENT_URL, {
        waitUntil: 'networkidle0',
        timeout: 30000
      });
      
      console.log('✅ Page loaded successfully\n');
    } catch (error) {
      console.log(`⚠️  Page load issue: ${error.message}\n`);
    }

    // Check for environment variables
    console.log('🔍 Checking Environment Variables...');
    const envCheck = await page.evaluate(() => {
      return {
        supabaseUrl: typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_SUPABASE_URL : 'N/A',
        hasAnonKey: typeof process !== 'undefined' ? !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY : false,
        gaId: typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID : 'N/A',
        fbPixelId: typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID : 'N/A',
      };
    });
    
    console.log('Environment Variables:');
    console.log(`  - NEXT_PUBLIC_SUPABASE_URL: ${envCheck.supabaseUrl || 'undefined'}`);
    console.log(`  - Has Anon Key: ${envCheck.hasAnonKey}`);
    console.log(`  - GA Measurement ID: ${envCheck.gaId || 'undefined'}`);
    console.log(`  - FB Pixel ID: ${envCheck.fbPixelId || 'undefined'}`);
    console.log('');

    // Check for hydration errors
    console.log('🔍 Checking for Hydration Errors...');
    const hydrationErrors = errors.filter(e => 
      e.includes('Hydration') || 
      e.includes('hydration') ||
      e.includes('did not match')
    );
    
    if (hydrationErrors.length > 0) {
      console.log('❌ Hydration Errors Found:');
      hydrationErrors.forEach(err => console.log(`  - ${err}`));
      console.log('');
    } else {
      console.log('✅ No hydration errors detected\n');
    }

    // Check navigation
    console.log('🔍 Checking Navigation...');
    const navCheck = await page.evaluate(() => {
      const header = document.querySelector('header');
      const nav = document.querySelector('nav');
      const dropdowns = document.querySelectorAll('[class*="dropdown"], [class*="menu"]');
      
      return {
        hasHeader: !!header,
        hasNav: !!nav,
        dropdownCount: dropdowns.length,
        navLinks: Array.from(document.querySelectorAll('nav a')).map(a => ({
          text: a.textContent.trim(),
          href: a.getAttribute('href')
        })).slice(0, 10) // First 10 links
      };
    });
    
    console.log('Navigation Status:');
    console.log(`  - Header present: ${navCheck.hasHeader ? '✅' : '❌'}`);
    console.log(`  - Nav present: ${navCheck.hasNav ? '✅' : '❌'}`);
    console.log(`  - Dropdown menus: ${navCheck.dropdownCount}`);
    console.log(`  - Nav links found: ${navCheck.navLinks.length}`);
    if (navCheck.navLinks.length > 0) {
      console.log('  - Sample links:');
      navCheck.navLinks.slice(0, 5).forEach(link => {
        console.log(`    • ${link.text} → ${link.href}`);
      });
    }
    console.log('');

    // Check footer
    console.log('🔍 Checking Footer...');
    const footerCheck = await page.evaluate(() => {
      const footer = document.querySelector('footer');
      if (!footer) return { exists: false };
      
      const styles = window.getComputedStyle(footer);
      return {
        exists: true,
        backgroundColor: styles.backgroundColor,
        color: styles.color
      };
    });
    
    console.log('Footer Status:');
    console.log(`  - Footer present: ${footerCheck.exists ? '✅' : '❌'}`);
    if (footerCheck.exists) {
      console.log(`  - Background: ${footerCheck.backgroundColor}`);
      console.log(`  - Text color: ${footerCheck.color}`);
    }
    console.log('');

    // Report all errors
    if (errors.length > 0) {
      console.log('❌ JavaScript Errors Detected:');
      errors.forEach((err, i) => {
        console.log(`\n${i + 1}. ${err}`);
      });
      console.log('');
    } else {
      console.log('✅ No JavaScript errors detected\n');
    }

    // Report failed requests
    if (failedRequests.length > 0) {
      console.log('❌ Failed Network Requests:');
      failedRequests.forEach(req => {
        console.log(`  - ${req.url}`);
        console.log(`    Error: ${req.failure}`);
      });
      console.log('');
    } else {
      console.log('✅ All network requests successful\n');
    }

    // Take screenshot
    console.log('📸 Taking screenshot...');
    await page.screenshot({ 
      path: '/tmp/vercel-deployment-screenshot.png',
      fullPage: true 
    });
    console.log('✅ Screenshot saved to /tmp/vercel-deployment-screenshot.png\n');

    // Summary
    console.log('═══════════════════════════════════════');
    console.log('📊 DEPLOYMENT CHECK SUMMARY');
    console.log('═══════════════════════════════════════');
    console.log(`Total Errors: ${errors.length}`);
    console.log(`Failed Requests: ${failedRequests.length}`);
    console.log(`Hydration Issues: ${hydrationErrors.length}`);
    console.log(`Navigation Working: ${navCheck.hasNav ? '✅' : '❌'}`);
    console.log(`Footer Working: ${footerCheck.exists ? '✅' : '❌'}`);
    console.log('═══════════════════════════════════════\n');

    if (errors.length === 0 && failedRequests.length === 0) {
      console.log('🎉 Deployment is healthy! All checks passed.\n');
      return 0;
    } else {
      console.log('⚠️  Issues detected. Review errors above.\n');
      return 1;
    }

  } catch (error) {
    console.error('❌ Fatal error during check:', error.message);
    return 1;
  } finally {
    await browser.close();
  }
}

// Run the check
checkDeployment()
  .then(exitCode => process.exit(exitCode))
  .catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
