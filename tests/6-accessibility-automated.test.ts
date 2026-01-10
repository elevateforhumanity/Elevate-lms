/**
 * Test 6: Accessibility Automated Testing
 */

import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const baseURL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

const pages = [
  { name: 'Homepage', url: '/' },
  { name: 'Programs', url: '/programs' },
  { name: 'Contact', url: '/contact' },
  { name: 'Apply', url: '/apply' },
  { name: 'About', url: '/about' },
];

for (const { name, url } of pages) {
  test(`Accessibility scan: ${name}`, async ({ page }) => {
    await page.goto(`${baseURL}${url}`);
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    
    const violations = accessibilityScanResults.violations;
    
    console.log(`${name}: ${violations.length} violations found`);
    
    if (violations.length > 0) {
      console.log('Violations:', violations.map(v => ({
        id: v.id,
        impact: v.impact,
        description: v.description,
        nodes: v.nodes.length
      })));
    }
    
    expect(violations.length).toBe(0);
  });
}

test.describe('Accessibility Summary', () => {
  test('Generate accessibility report', async () => {
    console.log('✅ Accessibility automated testing complete');
    console.log('Pages tested: 5');
    console.log('Standards: WCAG 2.1 AA');
  });
});
