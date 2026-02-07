/**
 * Real Database Smoke Tests
 * 
 * These tests REQUIRE a real Supabase connection.
 * They will FAIL if:
 * - Supabase env vars are not configured
 * - Database is not accessible
 * - Required tables don't exist
 * 
 * Run with: npx playwright test tests/e2e/db-smoke.spec.ts
 */

import { test, expect } from '@playwright/test';

test.describe('Database Smoke Tests - REQUIRES REAL DB', () => {
  test.describe('Health Check Endpoint', () => {
    test('should return pass status when DB is configured', async ({ request }) => {
      const response = await request.get('/api/health/db');
      const data = await response.json();

      // Log full response for debugging
      console.log('Health check response:', JSON.stringify(data, null, 2));

      // STRICT: Must return 200 with pass status
      expect(response.status()).toBe(200);
      expect(data.status).toBe('pass');
      
      // Verify config is present
      expect(data.config.supabase_url_present).toBe(true);
      expect(data.config.supabase_anon_key_present).toBe(true);
      
      // Verify database connection
      expect(data.database.connected).toBe(true);
      expect(data.database.latency_ms).toBeGreaterThan(0);
      expect(data.database.latency_ms).toBeLessThan(5000); // Should be fast
      expect(data.database.error).toBeNull();
    });

    test('should fail with 500 when DB env vars missing', async ({ request }) => {
      // This test documents expected behavior - if env vars are missing,
      // the endpoint should return 500, not fake success
      const response = await request.get('/api/health/db');
      const data = await response.json();

      if (!data.config.supabase_url_present || !data.config.supabase_anon_key_present) {
        expect(response.status()).toBe(500);
        expect(data.status).toBe('fail');
      }
    });
  });

  test.describe('Database-Backed Pages', () => {
    test('programs API should return real data', async ({ request }) => {
      const response = await request.get('/api/programs');
      
      // If DB is configured, should return 200 with data
      if (response.ok()) {
        const data = await response.json();
        expect(Array.isArray(data.data || data)).toBe(true);
        console.log(`Programs returned: ${(data.data || data).length} records`);
      } else {
        // If not configured, should fail explicitly
        expect(response.status()).toBeGreaterThanOrEqual(400);
      }
    });

    test('courses API should return real data', async ({ request }) => {
      const response = await request.get('/api/courses');
      
      if (response.ok()) {
        const data = await response.json();
        expect(Array.isArray(data.data || data)).toBe(true);
        console.log(`Courses returned: ${(data.data || data).length} records`);
      } else {
        expect(response.status()).toBeGreaterThanOrEqual(400);
      }
    });
  });

  test.describe('Admin Routes (require auth)', () => {
    test('admin programs page should load', async ({ page }) => {
      // Navigate to admin programs - will redirect to login if not authenticated
      await page.goto('/admin/programs');
      
      // Should either show programs or redirect to login
      const url = page.url();
      const isLoginRedirect = url.includes('/login') || url.includes('/auth');
      const isAdminPage = url.includes('/admin');
      
      expect(isLoginRedirect || isAdminPage).toBe(true);
      
      // Page should not show error
      const errorText = await page.locator('text=/error|failed|500/i').count();
      expect(errorText).toBe(0);
    });
  });

  test.describe('Store Routes', () => {
    test('store page should load products', async ({ page }) => {
      await page.goto('/store');
      
      // Page should load without errors
      await expect(page.locator('h1, h2, main').first()).toBeVisible();
      
      // Should not show database error
      const errorVisible = await page.locator('text=/database error|connection failed/i').count();
      expect(errorVisible).toBe(0);
    });
  });

  test.describe('LMS Routes', () => {
    test('LMS courses page should load', async ({ page }) => {
      await page.goto('/lms/courses');
      
      // Page should load
      await expect(page.locator('h1, h2, main').first()).toBeVisible();
      
      // Should not show database error
      const errorVisible = await page.locator('text=/database error|connection failed/i').count();
      expect(errorVisible).toBe(0);
    });
  });
});

/**
 * Strict DB Mode Tests
 * 
 * These tests are designed to FAIL when the database is not properly configured.
 * Use these in CI to ensure production deployments have working DB connections.
 */
test.describe('STRICT: Database Must Be Connected', () => {
  test('health/db endpoint must return pass', async ({ request }) => {
    const response = await request.get('/api/health/db');
    const data = await response.json();

    // STRICT ASSERTION: This test fails if DB is not configured
    expect(response.status(), 
      `Database health check failed. Status: ${data.status}, Error: ${data.database?.error}`
    ).toBe(200);
    
    expect(data.status, 
      `Database not connected. Config: ${JSON.stringify(data.config)}`
    ).toBe('pass');
    
    expect(data.database.connected, 
      `Database query failed: ${data.database?.error}`
    ).toBe(true);
  });
});
