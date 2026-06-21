import { expect, test } from '../fixtures/pages';

test.describe('Login visual regression', () => {
  test('@visual @regression login page matches the approved baseline', async ({ loginPage, page }) => {
    await loginPage.goto();

    await expect(page).toHaveScreenshot('login-page.png', {
      animations: 'disabled',
      fullPage: true
    });
  });
});
