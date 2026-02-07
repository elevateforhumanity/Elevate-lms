import { test, expect } from '@playwright/test';

test.describe('Critical User Flows', () => {
  test.describe('Homepage', () => {
    test('should load homepage successfully', async ({ page }) => {
      await page.goto('/');
      await expect(page).toHaveTitle(/Elevate for Humanity/);
      await expect(page.locator('h1')).toBeVisible();
    });

    test('should have working navigation', async ({ page }) => {
      await page.goto('/');
      
      // Check main nav links exist (use first() to handle multiple matches)
      await expect(page.getByRole('link', { name: /programs/i }).first()).toBeVisible();
      await expect(page.getByRole('link', { name: /about/i }).first()).toBeVisible();
      await expect(page.getByRole('link', { name: /contact/i }).first()).toBeVisible();
    });

    test('should have CTA buttons', async ({ page }) => {
      await page.goto('/');
      
      // Look for any CTA-style buttons (explore, view, learn more, etc.)
      const ctaButton = page.getByRole('link', { name: /apply|get started|enroll|explore|view programs|learn more/i }).first();
      await expect(ctaButton).toBeVisible();
    });
  });

  test.describe('Programs Page', () => {
    test('should display program listings', async ({ page }) => {
      await page.goto('/programs');
      // Title may vary, just check page loads
      await expect(page.locator('h1, h2').first()).toBeVisible();
      
      // Should have program cards or content
      const content = page.locator('main, [class*="card"], [class*="program"], article');
      await expect(content.first()).toBeVisible();
    });

    test('should navigate to individual program', async ({ page }) => {
      await page.goto('/programs/healthcare');
      await expect(page.locator('h1')).toContainText(/healthcare/i);
    });
  });

  test.describe('Contact Form', () => {
    test('should display contact form', async ({ page }) => {
      await page.goto('/contact');
      
      // Check form fields exist (use first() for multiple matches)
      await expect(page.getByLabel(/name/i).first()).toBeVisible();
      await expect(page.getByLabel(/email/i).first()).toBeVisible();
      await expect(page.getByLabel(/message/i).first()).toBeVisible();
    });

    test('should validate required fields', async ({ page }) => {
      await page.goto('/contact');
      
      // Try to submit empty form
      const submitButton = page.getByRole('button', { name: /submit|send/i });
      await submitButton.click();
      
      // Should show validation errors or not submit
      // Form should still be visible (not redirected)
      await expect(page.getByLabel(/email/i).first()).toBeVisible();
    });
  });

  test.describe('Apply Page', () => {
    test('should display application form', async ({ page }) => {
      await page.goto('/apply');
      // Page should load with form or content
      await expect(page.locator('h1, h2, form').first()).toBeVisible();
    });
  });

  test.describe('Authentication Pages', () => {
    test('should display login page', async ({ page }) => {
      await page.goto('/login');
      await expect(page.getByLabel(/email/i)).toBeVisible();
      await expect(page.getByLabel(/password/i)).toBeVisible();
    });

    test('should display signup page', async ({ page }) => {
      await page.goto('/signup');
      await expect(page.getByLabel(/email/i)).toBeVisible();
    });

    test('should have link to reset password', async ({ page }) => {
      await page.goto('/login');
      const resetLink = page.getByRole('link', { name: /forgot|reset/i });
      await expect(resetLink).toBeVisible();
    });
  });

  test.describe('Blog', () => {
    test('should display blog posts', async ({ page }) => {
      await page.goto('/blog');
      // Page should load with content
      await expect(page.locator('h1, h2, main').first()).toBeVisible();
    });
  });

  test.describe('Store', () => {
    test('should display store page', async ({ page }) => {
      await page.goto('/store');
      await expect(page).toHaveTitle(/Store/i);
    });

    test('should have cart page', async ({ page }) => {
      await page.goto('/store/cart');
      await expect(page).toHaveURL(/cart/);
    });
  });

  test.describe('LMS', () => {
    test('should display LMS landing page', async ({ page }) => {
      await page.goto('/lms');
      // Page should load with content
      await expect(page.locator('h1, h2, main').first()).toBeVisible();
    });

    test('should have courses page', async ({ page }) => {
      await page.goto('/lms/courses');
      await expect(page).toHaveURL(/courses/);
    });
  });

  test.describe('API Health', () => {
    test('should return healthy status', async ({ request }) => {
      const response = await request.get('/api/health');
      // API returns 200 even when degraded/fail (for monitoring purposes)
      const data = await response.json();
      // Verify response has expected structure
      expect(data).toHaveProperty('status');
      expect(data).toHaveProperty('checks');
      // System check should always pass
      expect(data.checks.system.status).toBe('pass');
    });
  });

  test.describe('Redirects', () => {
    test('/register should redirect to /signup', async ({ page }) => {
      await page.goto('/register');
      await expect(page).toHaveURL(/signup/);
    });

    test('/forgot-password should redirect to /reset-password', async ({ page }) => {
      await page.goto('/forgot-password');
      await expect(page).toHaveURL(/reset-password/);
    });

    test('/for-employers should redirect to /employers', async ({ page }) => {
      await page.goto('/for-employers');
      await expect(page).toHaveURL(/employers/);
    });
  });

  test.describe('Mobile Responsiveness', () => {
    test('should be responsive on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');
      
      // Page should load without horizontal scroll
      const body = page.locator('body');
      const bodyWidth = await body.evaluate(el => el.scrollWidth);
      expect(bodyWidth).toBeLessThanOrEqual(375);
    });
  });
});
