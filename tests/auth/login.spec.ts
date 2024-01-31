import { test, expect } from '@playwright/test'

test('can login with email and password', async ({ page }) => {
  // Go to the login page
  await page.goto('http://localhost:3000/auth/login')

  // Click on the email tab
  await page.click('.auth_tab')

  // Type into the email input field
  await page.fill('#email', 'daniel.sumah@shuttlers.ng')

  // Type into the password input field
  await page.fill('#password', 'shuttlers')


   await Promise.all([
    page.click('.auth-form-btn'),
    page.waitForLoadState('networkidle')
  ])
  expect(page.url()).toBe('http://localhost:3000/dashboard')
})
