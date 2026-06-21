# Login Automation Framework

This project is a TypeScript and Playwright test automation framework for the login functionality of [Sauce Demo](https://www.saucedemo.com/).

Sauce Demo was chosen because it is a stable public demo application with realistic login states, including a valid user, invalid credentials, required-field validation, and a locked-out user.

## Tech Stack

- TypeScript
- Playwright Test
- Page Object Model
- Playwright HTML reporting
- Screenshots, videos, and traces on failure

## Setup

Install dependencies:

```bash
npm ci
```

Use `npm install` only when adding or changing dependencies, then commit the updated `package-lock.json`.

Install Playwright browsers:

```bash
npx playwright install
```

Optional: create a local `.env` file from the example file if you want to change the target URL:

```bash
cp .env.example .env
```

The default value is:

```env
BASE_URL=https://www.saucedemo.com
```

## Running Tests

Run all tests:

```bash
npm test
```

Run static checks:

```bash
npm run typecheck
npm run lint
```

Run tests in headed mode:

```bash
npm run test:headed
```

Debug tests:

```bash
npm run test:debug
```

Open the HTML report:

```bash
npm run report
```

Run smoke tests only:

```bash
npx playwright test --grep @smoke
```

Run negative tests only:

```bash
npx playwright test --grep @negative
```

Run regression tests only:

```bash
npx playwright test --grep @regression
```

## Test Coverage

The login test suite covers:

- Successful login with a standard user
- Logout after successful authentication
- Invalid username and password
- Valid username with wrong password
- Invalid username with valid password
- Locked-out user
- Missing username
- Missing password
- Missing username and password
- Case-sensitive username validation
- Whitespace handling in username

## Design Choices

Playwright was chosen because it provides reliable browser automation with built-in auto-waiting, browser isolation, assertions, screenshots, traces, videos, and HTML reporting. TypeScript adds static typing, which helps catch errors earlier and makes the framework easier to maintain.

The framework uses the Page Object Model to separate test intent from page interaction details. This keeps the test cases readable and makes selectors easier to maintain if the UI changes.

Test data is stored separately in `test-data/users.ts`, which avoids hard-coding credentials across test files and makes it simple to add more login scenarios.

Negative login scenarios are data-driven. The inputs and expected errors are defined once, then the test file loops through those cases to avoid repeating the same test steps.

Fixtures in `fixtures/pages.ts` create reusable page objects and centralise test lifecycle logging, setup, teardown, and failure screenshots.

The framework uses Playwright's isolated browser contexts for test teardown. The positive login test also logs out after authentication to verify the application can return to a clean login state.

Environment configuration is loaded from `.env`, allowing values such as `BASE_URL` to be changed without editing the test code.

## Logging and Reporting

Execution logs are written to the console using a lightweight logger in `utils/logger.ts`.

Playwright generates an HTML report after each test run. On failures, the framework keeps:

- screenshot
- video
- trace file

These artefacts help with debugging failed test runs.

## Continuous Integration

The GitHub Actions workflow runs on push and pull request to `main`. It installs dependencies with `npm ci` from `package-lock.json`, installs Playwright browsers, runs type-checking, linting, and the test suite, then uploads the Playwright HTML report as an artefact.

## Future Improvements

Given more time, I would extend the framework in the following areas:

- Add cross-browser coverage for Firefox and WebKit to increase confidence beyond Chromium.
- Add accessibility checks with axe-core for the login page, supported by manual keyboard navigation checks.
- Move test credentials into environment variables or a secure test data provider if testing against a non-demo application.
