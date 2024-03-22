import { test, expect } from '@playwright/test'
import { login } from '../auth/utils'

test.describe('Trips List Flow', () => {
  test('user can navigate to trips list after signing in', async ({ page }) => {
    await login(page)
    await page.getByText('Commute').click()
    await page.getByRole('link', { name: 'Trips' }).click()
    await page.getByRole('link', { name: 'Upcoming Trips' }).click()
    await page.getByRole('link', { name: 'Completed Trips' }).click()
    await page.getByRole('link', { name: 'Cancelled Trips' }).click()
    // await page.getByTitle('Logout').locator('path').click()
    // await page.getByRole('button', { name: 'Logout' }).click()
  })
})
