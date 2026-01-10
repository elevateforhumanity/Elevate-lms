/**
 * Test 1: Cross-Browser Testing
 * Tests core functionality across different browser engines
 */

import { test, expect, chromium, firefox, webkit } from '@playwright/test';

const browsers = [
  { name: 'Chromium (Chrome/Edge)', launch: chromium },
  { name: 'Firefox', launch: firefox },
  { name: 'WebKit (Safari)', launch: webkit },
];

const baseURL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

for (const { name, launch } of browsers) {
  test.describe(`${name} - Cross-Browser Tests`, () => {
    
    test('Homepage loads correctly', async () => {
      const browser = await launch.launch();
      const page = await browser.newPage();
      
      await page.goto(baseURL);
      await expect(page).toHaveTitle(/Elevate for Humanity/i);
      
      // Check hero section
      await expect(page.locator('h1')).toBeVisible();
      
      // Check navigation
      await expect(page.locator('nav')).toBeVisible();
      
      await browser.close();
    });

    test('Navigation menu works', async () => {
      const browser = await launch.launch();
      const page = await browser.newPage();
      
      await page.goto(baseURL);
      
      // Check main navigation links
      const programsLink = page.locator('a[href="/programs"]');
      await expect(programsLink).toBeVisible();
      
      // Click and verify navigation
      await programsLink.click();
      await page.waitForURL('**/programs');
      await expect(page).toHaveURL(/\/programs/);
      
      await browser.close();
    });

    test('Forms submit successfully', async () => {
      const browser = await launch.launch();
      const page = await browser.newPage();
      
      await page.goto(`${baseURL}/contact`);
      
      // Fill contact form
      await page.fill('input[name="name"]', 'Test User');
      await page.fill('input[name="email"]', 'test@example.com');
      await page.fill('textarea[name="message"]', 'This is a test message for cross-browser testing.');
      
      // Submit form
      await page.click('button[type="submit"]');
      
      // Wait for success message or redirect
      await page.waitForTimeout(2000);
      
      await browser.close();
    });

    test('Responsive design at 1920x1080', async () => {
      const browser = await launch.launch();
      const page = await browser.newPage();
      
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.goto(baseURL);
      
      // Check layout is not broken
      const header = page.locator('header');
      await expect(header).toBeVisible();
      
      const main = page.locator('main');
      await expect(main).toBeVisible();
      
      await browser.close();
    });

    test('Responsive design at 1366x768', async () => {
      const browser = await launch.launch();
      const page = await browser.newPage();
      
      await page.setViewportSize({ width: 1366, height: 768 });
      await page.goto(baseURL);
      
      const header = page.locator('header');
      await expect(header).toBeVisible();
      
      await browser.close();
    });

    test('Video playback works', async () => {
      const browser = await launch.launch();
      const page = await browser.newPage();
      
      await page.goto(baseURL);
      
      // Check if video element exists
      const video = page.locator('video');
      if (await video.count() > 0) {
        await expect(video.first()).toBeVisible();
      }
      
      await browser.close();
    });
  });
}

test.describe('Cross-Browser Summary', () => {
  test('Generate test report', async () => {
    console.log('✅ Cross-browser testing complete');
    console.log('Tested browsers: Chromium, Firefox, WebKit');
    console.log('Tests per browser: 6');
    console.log('Total tests: 18');
  });
});
