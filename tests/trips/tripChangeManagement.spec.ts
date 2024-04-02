import { test, expect } from '@playwright/test'
import { login } from '../auth/utils'
import { upcoming_trips_fetch_response } from '../stubs/trips'

test.describe('Trip change management flow', () => {
  test('user can navigate to active trips list after signing in, click a selected active trip to navigate to trip details page, and click on actions button to update trip', async ({
    page
  }) => {
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
    await page.getByRole('link', { name: 'Trips' }).click()
    await page.getByRole('link', { name: 'Upcoming Trips' }).click()
    await page.goto('http://localhost:3000/trips/type/upcoming')
    await Promise.all([
      page.locator('#headlessui-popover-button-61').click(),
      page.getByRole('menuitem', { name: 'Update Trip' }).click(),
      page.locator('.multiselect__select').first().click(),
      page.getByText('Benz - Benz - HJR-SDR5 (Ada').click(),
      page
        .locator('div:nth-child(2) > .multiselect > .multiselect__select')
        .click(),
        page.getByText('ajkfaefxkj - grjhekfg').click(),
      page.getByRole('spinbutton').click(),
      page.getByRole('spinbutton').fill('700'),
      page.getByRole('button', { name: 'update' }).click(),
      page.getByTitle('Logout').getByRole('img').click(),
      page.getByRole('button', { name: 'Logout' }).click(),
      page.waitForLoadState('networkidle')
    ])
  })
})
