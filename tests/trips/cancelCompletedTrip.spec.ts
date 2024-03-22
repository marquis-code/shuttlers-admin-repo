import { test, expect } from '@playwright/test'
import { completed_trips_fetch_response } from '../stubs/trips'
import { login } from '../auth/utils'
test.describe('Cancel Completed Trips Flow', () => {
  test('test', async ({ page }) => {
    await login(page)
    await page.route('**/v1/trips/completed*', (route) => {
      const request = route.request()
      if (request.method() === 'GET') {
        // Fulfill GET requests with an empty response
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(completed_trips_fetch_response) // Empty response for GET requests
        })
      }
    })
    await page
      .locator('div')
      .filter({ hasText: /^Commute$/ })
      .click()
    await page.getByRole('link', { name: 'Trips' }).click()
    await page.getByRole('link', { name: 'Completed Trips' }).click()
    await page.goto('http://localhost:3000/trips/type/completed')
    await Promise.all([
      page.locator('#headlessui-popover-button-56').click(),
      page.getByRole('menuitem', { name: 'Cancel trip' }).click(),
      page.locator('form').filter({ hasText: 'Reason' }).locator('input[type="text"]').click(),
      page.locator('form').filter({ hasText: 'Enter your password' }).locator('input[type="text"]').fill('just testing this feature'),
      page.locator('input[type="password"]').click(),
      page.locator('input[type="password"]').fill('shuttlers'),
      page.getByRole('button', { name: 'Cancel trip' }).click(),
      page.waitForLoadState('networkidle')
    ])
  })
})
