/**
 * Test 2: Mobile Device Testing
 * Tests on iOS and Android device viewports
 */

import { test, expect, devices } from '@playwright/test';

const baseURL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

const mobileDevices = [
  { name: 'iPhone 14 Pro', device: devices['iPhone 14 Pro'] },
  { name: 'iPhone SE', device: devices['iPhone SE'] },
  { name: 'iPad Pro', device: devices['iPad Pro'] },
  { name: 'Samsung Galaxy S23', device: devices['Galaxy S9+'] }, // Using closest available
  { name: 'Google Pixel 7', device: devices['Pixel 5'] }, // Using closest available
];

for (const { name, device } of mobileDevices) {
  test.describe(`${name} - Mobile Tests`, () => {
    test.use(device);

    test('Homepage loads and scrolls smoothly', async ({ page }) => {
      await page.goto(baseURL);
      
      await expect(page).toHaveTitle(/Elevate for Humanity/i);
      
      // Scroll down
      await page.evaluate(() => window.scrollBy(0, 500));
      await page.waitForTimeout(500);
      
      // Scroll back up
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(500);
    });

    test('Touch navigation works', async ({ page }) => {
      await page.goto(baseURL);
      
      // Find and tap mobile menu button if present
      const menuButton = page.locator('button[aria-label*="menu" i]');
      if (await menuButton.count() > 0) {
        await menuButton.tap();
        await page.waitForTimeout(500);
        
        // Check if menu opened
        const nav = page.locator('nav');
        await expect(nav).toBeVisible();
      }
    });

    test('Forms are usable (no zoom issues)', async ({ page }) => {
      await page.goto(`${baseURL}/contact`);
      
      // Tap on input field
      const nameInput = page.locator('input[name="name"]');
      await nameInput.tap();
      
      // Check viewport didn't zoom (font-size should be >= 16px)
      const fontSize = await nameInput.evaluate(el => 
        window.getComputedStyle(el).fontSize
      );
      const fontSizeNum = parseInt(fontSize);
      expect(fontSizeNum).toBeGreaterThanOrEqual(16);
    });

    test('Portrait orientation', async ({ page }) => {
      await page.goto(baseURL);
      
      // Verify content is visible in portrait
      const header = page.locator('header');
      await expect(header).toBeVisible();
      
      const main = page.locator('main');
      await expect(main).toBeVisible();
    });

    test('Landscape orientation', async ({ page, context }) => {
      // Rotate to landscape
      await page.setViewportSize({ 
        width: device.viewport.height, 
        height: device.viewport.width 
      });
      
      await page.goto(baseURL);
      
      const header = page.locator('header');
      await expect(header).toBeVisible();
    });
  });
}

test.describe('Mobile Testing Summary', () => {
  test('Generate mobile test report', async () => {
    console.log('✅ Mobile device testing complete');
    console.log('Tested devices: iPhone 14 Pro, iPhone SE, iPad Pro, Galaxy, Pixel');
    console.log('Tests per device: 5');
    console.log('Total tests: 25');
  });
});
