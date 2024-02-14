import { test, expect } from '@playwright/test'

test('login', async ({ page }) => {
  await page.goto('http://localhost:3000/auth/login')
  await page.getByLabel('Email address').click()
  await page.getByLabel('Email address').fill('daniel.sumah@shuttlers.ng')
  await page.getByLabel('Password Login with OTP').click()
  await page.getByLabel('Password Login with OTP').fill('shuttlers')
  await page.getByRole('button', { name: 'Login to Shuttlers' }).click()
})
