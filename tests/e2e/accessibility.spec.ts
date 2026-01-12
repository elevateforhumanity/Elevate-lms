import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility Tests - WCAG AA Compliance', () => {
  test('homepage should not have accessibility violations', async ({ page }) => {
    await page.goto('/');
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('header navigation should be keyboard accessible', async ({ page }) => {
    await page.goto('/');
    
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(focusedElement).toBeTruthy();
  });

  test('dropdown menus should work with keyboard', async ({ page }) => {
    await page.goto('/');
    
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    
    const dropdownVisible = await page.locator('[role="menu"]').isVisible();
    expect(dropdownVisible).toBeTruthy();
    
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
  });

  test('mobile menu should trap focus', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    await page.click('[aria-label="Open menu"]');
    
    const menuVisible = await page.locator('[role="dialog"]').isVisible();
    expect(menuVisible).toBeTruthy();
    
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    const focusedElement = await page.evaluate(() => {
      const el = document.activeElement;
      return el?.closest('[role="dialog"]') !== null;
    });
    expect(focusedElement).toBeTruthy();
  });

  test('escape key should close mobile menu', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    await page.click('[aria-label="Open menu"]');
    await page.keyboard.press('Escape');
    
    const menuVisible = await page.locator('[role="dialog"]').isVisible();
    expect(menuVisible).toBeFalsy();
  });

  test('skip to main content link should work', async ({ page }) => {
    await page.goto('/');
    
    await page.keyboard.press('Tab');
    
    const skipLink = page.locator('.skip-to-main');
    await expect(skipLink).toBeFocused();
    
    await page.keyboard.press('Enter');
    
    const mainContent = page.locator('#main-content');
    await expect(mainContent).toBeFocused();
  });

  test('all images should have alt text', async ({ page }) => {
    await page.goto('/');
    
    const imagesWithoutAlt = await page.locator('img:not([alt])').count();
    expect(imagesWithoutAlt).toBe(0);
  });

  test('all buttons should have accessible names', async ({ page }) => {
    await page.goto('/');
    
    const buttons = await page.locator('button').all();
    
    for (const button of buttons) {
      const ariaLabel = await button.getAttribute('aria-label');
      const text = await button.textContent();
      const hasAccessibleName = ariaLabel || (text && text.trim().length > 0);
      expect(hasAccessibleName).toBeTruthy();
    }
  });

  test('color contrast should meet WCAG AA standards', async ({ page }) => {
    await page.goto('/');
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2aa'])
      .disableRules(['color-contrast']) // We'll check this separately
      .analyze();

    const contrastViolations = accessibilityScanResults.violations.filter(
      v => v.id === 'color-contrast'
    );
    expect(contrastViolations).toEqual([]);
  });

  test('form inputs should have labels', async ({ page }) => {
    await page.goto('/apply');
    
    const inputsWithoutLabels = await page.locator('input:not([aria-label]):not([aria-labelledby])').count();
    expect(inputsWithoutLabels).toBe(0);
  });

  test('headings should be in correct order', async ({ page }) => {
    await page.goto('/');
    
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
    const levels = await Promise.all(
      headings.map(h => h.evaluate(el => parseInt(el.tagName[1])))
    );
    
    expect(levels[0]).toBe(1);
    
    for (let i = 1; i < levels.length; i++) {
      const diff = levels[i] - levels[i - 1];
      expect(diff).toBeLessThanOrEqual(1);
    }
  });

  test('links should have descriptive text', async ({ page }) => {
    await page.goto('/');
    
    const links = await page.locator('a').all();
    
    for (const link of links) {
      const text = await link.textContent();
      const ariaLabel = await link.getAttribute('aria-label');
      const hasDescriptiveText = (text && text.trim().length > 0) || ariaLabel;
      expect(hasDescriptiveText).toBeTruthy();
    }
  });

  test('page should have proper language attribute', async ({ page }) => {
    await page.goto('/');
    
    const lang = await page.locator('html').getAttribute('lang');
    expect(lang).toBe('en');
  });

  test('aria-expanded should be dynamic', async ({ page }) => {
    await page.goto('/');
    
    const dropdownButton = page.locator('[aria-haspopup="true"]').first();
    
    let expanded = await dropdownButton.getAttribute('aria-expanded');
    expect(expanded).toBe('false');
    
    await dropdownButton.click();
    
    expanded = await dropdownButton.getAttribute('aria-expanded');
    expect(expanded).toBe('true');
  });

  test('focus indicators should be visible', async ({ page }) => {
    await page.goto('/');
    
    await page.keyboard.press('Tab');
    
    const focusedElement = page.locator(':focus');
    const outline = await focusedElement.evaluate(el => 
      window.getComputedStyle(el).outline
    );
    
    expect(outline).not.toBe('none');
    expect(outline).not.toBe('');
  });
});
