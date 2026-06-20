import { test } from '../fixtures/pages';
import { negativeLoginCases, users } from '../test-data/users';

test.describe('Login functionality', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('@smoke @positive @regression allows a standard user to log in successfully', async ({ loginPage }) => {
    await test.step('Submit valid credentials', async () => {
      await loginPage.login(users.standard);
    });

    await test.step('Verify login is successful', async () => {
      await loginPage.expectLoginSuccessful();
    });
  });

  for (const loginCase of negativeLoginCases) {
    test(`@negative @regression shows an error for ${loginCase.name}`, async ({ loginPage }) => {
      await loginPage.login(loginCase.user);
      await loginPage.expectError(loginCase.expectedError);
    });
  }
});
