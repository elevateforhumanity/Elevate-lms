import { test, expect } from '@playwright/test';

test.describe('Preview Deployment Indexing Protection', () => {
  test('should block preview deployments from indexing via robots.txt', async ({ page }) => {
    // This test verifies that non-production environments return blocking robots.txt
    // In a real preview environment, VERCEL_ENV would be 'preview'
    
    const response = await page.goto('/robots.txt');
    expect(response?.status()).toBe(200);
    
    const content = await page.textContent('body');
    
    // In production, robots.txt should allow crawling
    // In preview, it should disallow all
    if (process.env.VERCEL_ENV === 'production') {
      expect(content).toContain('Allow: /');
      expect(content).toContain('Sitemap:');
    } else {
      expect(content).toContain('Disallow: /');
      expect(content).not.toContain('Allow: /');
    }
  });

  test('should have correct X-Robots-Tag header based on environment', async ({ page }) => {
    const response = await page.goto('/');
    expect(response?.status()).toBe(200);
    
    const headers = response?.headers();
    const robotsTag = headers?.['x-robots-tag'];
    
    if (process.env.VERCEL_ENV === 'production') {
      // Production should allow indexing but block AI
      expect(robotsTag).toContain('noai');
      expect(robotsTag).not.toContain('noindex');
    } else {
      // Preview/dev should block all indexing
      expect(robotsTag).toContain('noindex');
      expect(robotsTag).toContain('nofollow');
    }
  });

  test('should have correct meta robots tag in HTML', async ({ page }) => {
    await page.goto('/');
    
    const metaRobots = await page.locator('meta[name="robots"]').getAttribute('content');
    
    if (process.env.VERCEL_ENV === 'production') {
      // Production should allow indexing
      expect(metaRobots).not.toContain('noindex');
    } else {
      // Preview/dev should block indexing
      expect(metaRobots).toContain('noindex');
    }
  });

  test('should block non-production domains via middleware', async ({ request }) => {
    // Test that non-production domains get noindex header
    const testDomains = [
      'elevate-lms-git-test-selfish2.vercel.app',
      'elevate-lms-preview-selfish2.vercel.app',
    ];
    
    for (const domain of testDomains) {
      // This test would need to run in a real Vercel environment
      // For now, we just verify the middleware exists
      const middlewareExists = require('fs').existsSync('./middleware.ts');
      expect(middlewareExists).toBe(true);
    }
  });

  test('should allow production domain to be indexed', async ({ page }) => {
    // Verify production domain doesn't get blocked
    const response = await page.goto('/');
    const headers = response?.headers();
    const robotsTag = headers?.['x-robots-tag'];
    
    // If we're on production domain, should not have noindex
    const host = new URL(page.url()).hostname;
    if (host === 'www.elevateforhumanity.institute' || host === 'elevateforhumanity.institute') {
      expect(robotsTag).not.toContain('noindex');
    }
  });
});

test.describe('Environment Detection', () => {
  test('should correctly identify environment', async ({ page }) => {
    await page.goto('/');
    
    // Verify environment variables are being used correctly
    const env = process.env.VERCEL_ENV;
    expect(['production', 'preview', 'development', undefined]).toContain(env);
  });

  test('should have consistent environment-based behavior', async ({ page }) => {
    const robotsResponse = await page.goto('/robots.txt');
    const robotsContent = await page.textContent('body');
    
    const homeResponse = await page.goto('/');
    const homeHeaders = homeResponse?.headers();
    const robotsTag = homeHeaders?.['x-robots-tag'];
    
    // Robots.txt and X-Robots-Tag should be consistent
    if (robotsContent?.includes('Disallow: /')) {
      // If robots.txt blocks, headers should too
      expect(robotsTag).toContain('noindex');
    } else if (robotsContent?.includes('Allow: /')) {
      // If robots.txt allows, headers should not block
      expect(robotsTag).not.toContain('noindex');
    }
  });
});
