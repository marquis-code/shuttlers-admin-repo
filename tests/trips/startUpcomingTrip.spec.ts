import { test, expect } from '@playwright/test'
import { upcoming_trips_fetch_response } from '../stubs/trips'
import { login } from '../auth/utils'
test.describe('Start upcoming Flow', () => {
  test('test', async ({ page }) => {
    await login(page)
    await page.route('**/v1/trips/upcoming*', (route) => {
      const request = route.request()
      if (request.method() === 'GET') {
        // Fulfill GET requests with an empty response
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(upcoming_trips_fetch_response) // Empty response for GET requests
        })
      }
    })
    await page
      .locator('div')
      .filter({ hasText: /^Commute$/ })
      .click()
    await page.getByRole('link', { name: 'Trips' }).click()
    await page.getByRole('link', { name: 'Upcoming Trips' }).click()
    await page.goto('http://localhost:3000/trips/type/upcoming')
    await Promise.all([
      page.locator('#headlessui-popover-button-66').click(),
      page.getByRole('menuitem', { name: 'Start Trip' }).click(),
      page.getByRole('button', { name: 'Yes' }).click(),
      page.waitForLoadState('networkidle')
    ])
  })
})
