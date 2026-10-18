# Automated tests

These tests focus on the behaviors most important for the Employee Madness portfolio demo.
They mock the REST API or Firebase Auth, so **they do not need a real Firebase project**
and **do not change the live database**.

## Install

After applying the patch for the first time, run **`npm install`** (not `npm ci`).
This downloads the new dev dependencies and updates `package-lock.json`.
Commit the updated lockfile with the test changes; afterwards, new clones can use `npm ci`.

## Run

```bash
npm test                   # run once
npm run test:watch         # re-run tests after edits
npm run test:coverage      # optional coverage report
npm run build              # check the production build separately
```

## Covered

- Firebase REST API: employee/equipment list, create, update, delete, error handling, auth token and exact-name search
- Employee list: position + level filtering, no-results state, alphabetic sorting, pagination and deletion from the last page
- URL-driven search and HTTP error display
- Failed/successful delete behavior for both entities
- Sign-up field validation and styled errors
- Protected route access for guests and signed-in users
- Employee form payload and equipment assignment
- Equipment form amount conversion and constraints

These are isolated unit/component tests, **not** an end-to-end Firebase integration test.
Keep doing a brief manual browser smoke test before publishing the live demo.

## Interpreting coverage

`npm run test:coverage` reports application-source coverage only. The configuration
excludes tests, re-export-only `index.js` modules, the Vite entry point, Firebase
initialization, and the test setup. Real application pages without tests remain
included in the denominator; the goal is useful coverage rather than an inflated
percentage. The Firebase calls are mocked rather than executed against production.
