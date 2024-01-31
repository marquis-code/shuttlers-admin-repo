# Rules
- Before adding a new endpoint to the API factory, ensure to do a global search (ctrl + Shift + F) to ensure it doesn't exist already
- The API factory modules is stuctured in terms of API modules and not sidebar modules like the rest of the app. I.e if you call and endpoint in dashboard that is typically `transaction/stats`, this would be under the transaction modules and not the dashboard module



Inside that directory, you can run several commands:

  yarn playwright test
    Runs the end-to-end tests.

  yarn playwright test --ui
    Starts the interactive UI mode.

  yarn playwright test --project=chromium
    Runs the tests only on Desktop Chrome.

  yarn playwright test example
    Runs the tests in a specific file.

  yarn playwright test --debug
    Runs the tests in debug mode.

  yarn playwright codegen
    Auto generate tests with Codegen.

We suggest that you begin by typing:

    yarn playwright test