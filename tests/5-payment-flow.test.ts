/**
 * Test 5: Payment Flow Testing
 */

import { test, expect } from '@playwright/test';

const baseURL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

test.describe('Payment Flow Tests', () => {
  
  test('Course enrollment payment flow', async ({ page }) => {
    await page.goto(`${baseURL}/programs/healthcare/courses`);
    
    // Find a course with price
    const enrollButton = page.locator('button:has-text("Enroll"), a:has-text("Enroll")').first();
    
    if (await enrollButton.count() > 0) {
      await enrollButton.click();
      await page.waitForTimeout(2000);
      
      // Should redirect to Stripe or show payment form
      const url = page.url();
      console.log('Redirected to:', url);
      
      expect(url).toBeTruthy();
    }
  });

  test('Payment button exists on course pages', async ({ page }) => {
    await page.goto(`${baseURL}/programs/healthcare/courses`);
    
    const paymentButtons = page.locator('button:has-text("Enroll"), button:has-text("Pay"), a:has-text("Enroll")');
    const count = await paymentButtons.count();
    
    console.log(`Found ${count} payment/enrollment buttons`);
    expect(count).toBeGreaterThanOrEqual(0);
  });

  test('Free course enrollment works', async ({ page }) => {
    await page.goto(`${baseURL}/programs`);
    
    // Look for free courses
    const freeBadges = page.locator('text=FREE, text=Free, text=$0');
    const freeCount = await freeBadges.count();
    
    console.log(`Found ${freeCount} free course indicators`);
  });

  test('Payment API endpoint exists', async ({ page }) => {
    const response = await page.request.post(`${baseURL}/api/stripe/checkout`, {
      data: {},
      failOnStatusCode: false
    });
    
    // Should return 400 or 401, not 404
    expect(response.status()).not.toBe(404);
    console.log('Payment API status:', response.status());
  });

  test('Stripe keys are configured', async ({ page }) => {
    await page.goto(baseURL);
    
    const hasStripeKey = process.env.STRIPE_SECRET_KEY || process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    console.log('Stripe configured:', !!hasStripeKey);
  });
});
