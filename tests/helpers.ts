import { Page } from '@playwright/test';

export async function gotoWithRetry(page: Page, url: string, retries = 2): Promise<void> {
  for (let i = 0; i <= retries; i++) {
    try {
      await page.goto(url, { 
        waitUntil: 'domcontentloaded', 
        timeout: 45000 
      });
      await page.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => {});
      return;
    } catch (error) {
      if (i === retries) throw error;
      await page.waitForTimeout(2000);
    }
  }
}

export async function waitForElement(page: Page, selector: string, timeout = 10000) {
  return page.locator(selector).first().waitFor({ state: 'visible', timeout });
}
