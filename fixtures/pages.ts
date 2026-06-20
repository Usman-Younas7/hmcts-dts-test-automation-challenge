import { test as base } from '@playwright/test';
import { InventoryPage } from '../pages/inventory-page';
import { LoginPage } from '../pages/login-page';
import { logger } from '../utils/logger';

type PageFixtures = {
  inventoryPage: InventoryPage;
  loginPage: LoginPage;
};

export const test = base.extend<PageFixtures>({
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  }
});

test.beforeEach(async ({ page: _page }, testInfo) => {
  logger.info(`Starting test: ${testInfo.title}`);
});

test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) {
    const screenshotPath = `screenshots/${testInfo.title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.png`;
    await page.screenshot({ path: screenshotPath, fullPage: true });
    logger.error(`Test failed: ${testInfo.title}. Screenshot saved to ${screenshotPath}`);
  }

  logger.info(`Finished test: ${testInfo.title} with status ${testInfo.status}`);
});

export { expect } from '@playwright/test';
