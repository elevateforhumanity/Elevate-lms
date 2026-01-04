#!/usr/bin/env node

/**
 * Vercel Deployment Checker with Puppeteer
 * Automatically checks the deployed site and reports any errors
 */

import puppeteer from 'puppeteer';

const DEPLOYMENT_URL = process.env.VERCEL_URL || 'https://fix2-i7xhpeuz7-lizzy6262.vercel.app';

async function checkDeployment() {

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


    try {
      await page.goto(DEPLOYMENT_URL, {
        waitUntil: 'networkidle0',
        timeout: 30000
      });

    } catch (error) {
    }

    // Check for environment variables
    const envCheck = await page.evaluate(() => {
      return {
        supabaseUrl: typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_SUPABASE_URL : 'N/A',
        hasAnonKey: typeof process !== 'undefined' ? !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY : false,
        gaId: typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID : 'N/A',
        fbPixelId: typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID : 'N/A',
      };
    });


    // Check for hydration errors
    const hydrationErrors = errors.filter(e =>
      e.includes('Hydration') ||
      e.includes('hydration') ||
      e.includes('did not match')
    );

    if (hydrationErrors.length > 0) {
      hydrationErrors.forEach(err => console.log(`  - ${err}`));
    } else {
    }

    // Check navigation
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

    if (navCheck.navLinks.length > 0) {
      navCheck.navLinks.slice(0, 5).forEach(link => {
      });
    }

    // Check footer
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

    if (footerCheck.exists) {
    }

    // Report all errors
    if (errors.length > 0) {
      errors.forEach((err, i) => {
      });
    } else {
    }

    // Report failed requests
    if (failedRequests.length > 0) {
      failedRequests.forEach(req => {
      });
    } else {
    }

    // Take screenshot
    await page.screenshot({
      path: '/tmp/vercel-deployment-screenshot.png',
      fullPage: true
    });

    // Summary

    if (errors.length === 0 && failedRequests.length === 0) {
      return 0;
    } else {
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
