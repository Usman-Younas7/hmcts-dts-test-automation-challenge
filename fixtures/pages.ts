import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { logger } from '../utils/logger';

type PageFixtures = {
  loginPage: LoginPage;
};

export const test = base.extend<PageFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  }
});

test.beforeEach(async ({}, testInfo) => {
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
