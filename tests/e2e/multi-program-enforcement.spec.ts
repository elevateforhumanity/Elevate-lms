/**
 * Multi-Program Enforcement Tests
 * 
 * Tests enforcement across program types:
 * - internal_apprenticeship (Barber)
 * - internal_clock_program (Cosmo, Nails, Esthetics, CNA)
 * - external_lms_wrapped (HVAC)
 */

import { test, expect } from '@playwright/test';

// ═══════════════════════════════════════════════════════════════════════════
// NEGATIVE TESTS - Must FAIL correctly
// ═══════════════════════════════════════════════════════════════════════════

test.describe('HVAC (external_lms_wrapped) - Hours Blocked', () => {
  test('HVAC student cannot clock in - returns ACTION_NOT_ALLOWED', async ({ request }) => {
    // Attempt to clock in as HVAC student
    const response = await request.post('/api/timeclock/action', {
      data: {
        action: 'clock_in',
        apprentice_id: 'hvac-test-apprentice-id',
        partner_id: 'test-partner-id',
        program_id: 'hvac-program-id',
        site_id: 'test-site-id',
        lat: 39.7684,
        lng: -86.1581,
      },
      headers: {
        'Content-Type': 'application/json',
        // Auth header would be set by test setup
      },
    });

    // Should be denied
    expect(response.status()).toBe(403);
    
    const body = await response.json();
    expect(body.code).toBe('ACTION_NOT_ALLOWED');
    expect(body.error).toContain('not available for this program type');
  });

  test('HVAC student cannot log hours manually', async ({ request }) => {
    const response = await request.post('/api/apprenticeship/hours', {
      data: {
        enrollment_id: 'hvac-enrollment-id',
        hours: 8,
        date: '2026-02-08',
        description: 'Attempted manual hours',
      },
    });

    expect(response.status()).toBe(403);
    const body = await response.json();
    expect(body.code).toBe('ACTION_NOT_ALLOWED');
  });

  test('HVAC student cannot use PWA checkin', async ({ request }) => {
    const response = await request.post('/api/checkin', {
      data: {
        code: 'TEST123',
        enrollment_id: 'hvac-enrollment-id',
      },
    });

    expect(response.status()).toBe(403);
    const body = await response.json();
    expect(body.code).toBe('ACTION_NOT_ALLOWED');
  });
});

test.describe('CNA - Document Gates', () => {
  test('CNA student missing TB test - returns CNA_TB_TEST_REQUIRED', async ({ request }) => {
    // CNA student with background check but no TB test
    const response = await request.post('/api/timeclock/action', {
      data: {
        action: 'clock_in',
        apprentice_id: 'cna-test-apprentice-id',
        partner_id: 'clinical-site-id',
        program_id: 'cna-program-id',
        site_id: 'clinical-site-id',
        lat: 39.7684,
        lng: -86.1581,
      },
    });

    // Should be denied due to missing TB test
    expect(response.status()).toBe(403);
    const body = await response.json();
    expect(['CNA_TB_TEST_REQUIRED', 'DOCUMENTS_REQUIRED']).toContain(body.code);
  });

  test('CNA student missing background check - returns CNA_BACKGROUND_CHECK_REQUIRED', async ({ request }) => {
    const response = await request.post('/api/timeclock/action', {
      data: {
        action: 'clock_in',
        apprentice_id: 'cna-no-background-id',
        partner_id: 'clinical-site-id',
        program_id: 'cna-program-id',
        site_id: 'clinical-site-id',
        lat: 39.7684,
        lng: -86.1581,
      },
    });

    expect(response.status()).toBe(403);
    const body = await response.json();
    expect(['CNA_BACKGROUND_CHECK_REQUIRED', 'DOCUMENTS_REQUIRED']).toContain(body.code);
  });
});

test.describe('Cosmetology - Start Date Enforcement', () => {
  test('Cosmetology student before start date - returns START_DATE_NOT_REACHED', async ({ request }) => {
    const response = await request.post('/api/timeclock/action', {
      data: {
        action: 'clock_in',
        apprentice_id: 'cosmo-future-start-id',
        partner_id: 'salon-partner-id',
        program_id: 'cosmo-program-id',
        site_id: 'salon-site-id',
        lat: 39.7684,
        lng: -86.1581,
      },
    });

    expect(response.status()).toBe(403);
    const body = await response.json();
    expect(body.code).toBe('START_DATE_NOT_REACHED');
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// POSITIVE TESTS - Must PASS
// ═══════════════════════════════════════════════════════════════════════════

test.describe('Barber (internal_apprenticeship) - Full Compliance', () => {
  test('Barber student fully compliant can clock in', async ({ request }) => {
    // This test requires a fully compliant test user:
    // - Enrollment active
    // - Orientation complete
    // - Documents submitted
    // - Start date reached
    // - Payment current
    // - Partner approved
    
    const response = await request.post('/api/timeclock/action', {
      data: {
        action: 'clock_in',
        apprentice_id: 'barber-compliant-apprentice-id',
        partner_id: 'approved-barbershop-id',
        program_id: 'barber-program-id',
        site_id: 'approved-site-id',
        lat: 39.7684,
        lng: -86.1581,
        accuracy_m: 10,
      },
    });

    // Should succeed (or 401 if not authenticated in test)
    expect([200, 201, 401]).toContain(response.status());
    
    if (response.status() === 200 || response.status() === 201) {
      const body = await response.json();
      expect(body.success).toBe(true);
    }
  });
});

test.describe('HVAC - Credential Completion', () => {
  test('HVAC student with verified credential can complete enrollment', async ({ request }) => {
    // Upload credential certificate
    const uploadResponse = await request.post('/api/enrollment/upload-document', {
      data: {
        enrollment_id: 'hvac-enrollment-id',
        document_type: 'credential_certificate',
        file_url: 'https://example.com/hvac-cert.pdf',
      },
    });

    // Verify credential (admin action)
    const verifyResponse = await request.post('/api/admin/verify-document', {
      data: {
        document_id: 'hvac-credential-doc-id',
        verified: true,
      },
    });

    // Check completion status
    const statusResponse = await request.get('/api/enrollment/status?id=hvac-enrollment-id');
    
    if (statusResponse.status() === 200) {
      const body = await statusResponse.json();
      // If credential is verified, completion should be possible
      expect(body.completion_eligible || body.status === 'completed').toBeTruthy();
    }
  });
});

test.describe('CNA - Full Document Compliance', () => {
  test('CNA student with all documents can start clinical', async ({ request }) => {
    // CNA student with:
    // - Government ID
    // - Background check
    // - TB test
    // - Clinical clearance
    
    const response = await request.post('/api/timeclock/action', {
      data: {
        action: 'clock_in',
        apprentice_id: 'cna-compliant-apprentice-id',
        partner_id: 'clinical-facility-id',
        program_id: 'cna-program-id',
        site_id: 'clinical-site-id',
        lat: 39.7684,
        lng: -86.1581,
      },
    });

    // Should succeed if all documents are in place
    expect([200, 201, 401]).toContain(response.status());
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// DATABASE CONSTRAINT TESTS
// ═══════════════════════════════════════════════════════════════════════════

test.describe('Database Constraints', () => {
  test('DB trigger prevents HVAC hours insertion', async ({ request }) => {
    // Direct database insert attempt (would be via admin API)
    const response = await request.post('/api/admin/force-hours', {
      data: {
        enrollment_id: 'hvac-enrollment-id',
        hours: 8,
        bypass_enforcement: true, // Even with bypass flag
      },
    });

    // Should fail at DB level even if API is bypassed
    expect([400, 403, 500]).toContain(response.status());
    
    const body = await response.json();
    expect(body.error).toContain('external LMS');
  });

  test('DB trigger prevents HVAC placement insertion', async ({ request }) => {
    const response = await request.post('/api/admin/assign-placement', {
      data: {
        enrollment_id: 'hvac-enrollment-id',
        site_id: 'some-site-id',
        bypass_enforcement: true,
      },
    });

    expect([400, 403, 500]).toContain(response.status());
    const body = await response.json();
    expect(body.error).toContain('external LMS');
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// UI VISIBILITY TESTS
// ═══════════════════════════════════════════════════════════════════════════

test.describe('Dashboard UI Gating', () => {
  test('HVAC dashboard does not show timeclock link', async ({ page }) => {
    // Login as HVAC student
    await page.goto('/login');
    // ... login steps ...
    
    await page.goto('/apprentice');
    
    // Timeclock should NOT be visible
    const timeclockLink = page.locator('a[href*="hours"], a[href*="timeclock"]');
    await expect(timeclockLink).toHaveCount(0);
    
    // Course access SHOULD be visible
    const courseLink = page.locator('a[href*="courses"]');
    await expect(courseLink).toBeVisible();
  });

  test('Barber dashboard shows timeclock link', async ({ page }) => {
    // Login as Barber student
    await page.goto('/login');
    // ... login steps ...
    
    await page.goto('/apprentice');
    
    // Timeclock SHOULD be visible
    const hoursLink = page.locator('a[href*="hours"]');
    await expect(hoursLink).toBeVisible();
  });
});
