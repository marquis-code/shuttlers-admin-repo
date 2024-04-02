import { test, expect } from '@playwright/test'
import { login } from '../auth/utils'
import { active_trips_fetch_response } from '../stubs/trips'

test.describe('End active trip flow', () => {
  test('user can navigate to upcoming trips list after signing in, click a selected trip and click the start trip button', async ({
    page
  }) => {
    await login(page)
    await page.route('**/v1/trips/active*', (route) => {
      const request = route.request()
      if (request.method() === 'GET') {
        // Fulfill GET requests with an empty response
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(active_trips_fetch_response) // Empty response for GET requests
        })
      }
    })
    await page.getByText('Commute').click()
    await page.getByRole('link', { name: 'Trips' }).click()
    await page.goto('http://localhost:3000/trips/type/active')
    await Promise.all([
      page.locator('#headlessui-popover-button-26').click(),
      page.getByRole('menuitem', { name: 'End Trip' }).click(),
      page.getByRole('button', { name: 'Yes' }).click(),
      page.waitForLoadState('networkidle')
    ])
  })
})
