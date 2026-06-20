import { test } from '../fixtures/pages';
import { loginErrors, users } from '../test-data/users';

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

  test('@negative @regression shows an error for invalid credentials', async ({ loginPage }) => {
    await loginPage.login(users.invalid);
    await loginPage.expectError(loginErrors.invalidCredentials);
  });

  test('@negative @regression shows an error for valid username with wrong password', async ({ loginPage }) => {
    await loginPage.login(users.validUsernameWrongPassword);
    await loginPage.expectError(loginErrors.invalidCredentials);
  });

  test('@negative @regression shows an error for invalid username with valid password', async ({ loginPage }) => {
    await loginPage.login(users.invalidUsernameValidPassword);
    await loginPage.expectError(loginErrors.invalidCredentials);
  });

  test('@negative @regression shows an error for locked out user', async ({ loginPage }) => {
    await loginPage.login(users.lockedOut);
    await loginPage.expectError(loginErrors.lockedOut);
  });

  test('@negative @regression shows an error when username is missing', async ({ loginPage }) => {
    await loginPage.login(users.emptyUsername);
    await loginPage.expectError(loginErrors.usernameRequired);
  });

  test('@negative @regression shows an error when password is missing', async ({ loginPage }) => {
    await loginPage.login(users.emptyPassword);
    await loginPage.expectError(loginErrors.passwordRequired);
  });

  test('@negative @regression shows an error when both username and password are missing', async ({ loginPage }) => {
    await loginPage.login(users.emptyCredentials);
    await loginPage.expectError(loginErrors.usernameRequired);
  });

  test('@negative @regression shows an error when username casing does not match', async ({ loginPage }) => {
    await loginPage.login(users.uppercaseUsername);
    await loginPage.expectError(loginErrors.invalidCredentials);
  });

  test('@negative @regression shows an error when username contains extra whitespace', async ({ loginPage }) => {
    await loginPage.login(users.usernameWithWhitespace);
    await loginPage.expectError(loginErrors.invalidCredentials);
  });
});
