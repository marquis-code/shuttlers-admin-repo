import { test, expect } from '@playwright/test'
import { upcoming_trips_fetch_response } from '../stubs/trips'
import { login } from '../auth/utils'

test.describe('Cancel upcoming trip flow', () => {
  test('user can navigate to upcoming trips list after signing in, click a selected trip start trip and click on the cancel button', async ({ page }) => {
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
    await page.getByText('Commute').click()
    await page.locator('li').filter({ hasText: 'Trips' }).click()
    await page.getByRole('link', { name: 'Upcoming Trips' }).click()
    await page.goto('http://localhost:3000/trips/type/upcoming')
    await Promise.all([
      page.locator('#headlessui-popover-button-66').click(),
      page.getByRole('menuitem', { name: 'Cancel Trip' }).click(),
      page.getByLabel('Enter password').click(),
      page.getByLabel('Enter password').fill('shuttlers'),
      page.getByRole('button', { name: 'Proceed' }).click(),
      page.waitForLoadState('networkidle')
    ])
  })
})
