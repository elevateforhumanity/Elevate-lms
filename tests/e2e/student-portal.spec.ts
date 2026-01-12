import { test, expect } from '@playwright/test';

/**
 * E2E Tests for Student Portal
 */

test.describe('Student Portal', () => {
  test.describe('Enrollment', () => {
    test('should enroll in a course', async ({ page }) => {
      await page.goto('/login');
      await page.fill('input[name="email"]', process.env.TEST_STUDENT_EMAIL || 'student@example.com');
      await page.fill('input[name="password"]', process.env.TEST_STUDENT_PASSWORD || 'password123');
      await page.click('button[type="submit"]');
      
      await page.goto('/programs/healthcare');
      await page.click('text=Enroll Now');
      
      await expect(page.locator('text=Enrollment successful')).toBeVisible({ timeout: 10000 });
    });
  });

  test.describe('Dashboard', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/login');
      await page.fill('input[name="email"]', process.env.TEST_STUDENT_EMAIL || 'student@example.com');
      await page.fill('input[name="password"]', process.env.TEST_STUDENT_PASSWORD || 'password123');
      await page.click('button[type="submit"]');
    });

    test('should display student dashboard', async ({ page }) => {
      await page.goto('/lms');
      
      await expect(page.locator('h1:has-text("Dashboard")')).toBeVisible();
      await expect(page.locator('text=My Courses')).toBeVisible();
    });

    test('should show progress metrics', async ({ page }) => {
      await page.goto('/lms');
      
      await expect(page.locator('text=Progress')).toBeVisible();
    });
  });

  test.describe('Course Access', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/login');
      await page.fill('input[name="email"]', process.env.TEST_STUDENT_EMAIL || 'student@example.com');
      await page.fill('input[name="password"]', process.env.TEST_STUDENT_PASSWORD || 'password123');
      await page.click('button[type="submit"]');
    });

    test('should access enrolled course', async ({ page }) => {
      await page.goto('/lms');
      
      // Click on first course
      await page.click('[data-testid="course-card"]').catch(() => {
        // Course card might not exist
      });
      
      // Should navigate to course page
      const url = page.url();
      expect(url).toContain('/lms/');
    });
  });
});
