// utils.js
import { expect } from '@playwright/test'

async function login(page) {
  await page.goto('http://localhost:3000/auth/login')
  await page.getByLabel('Email address').fill('daniel.sumah@shuttlers.ng')
  await page.getByLabel('Password Login with OTP').fill('shuttlers')
  await page.getByRole('button', { name: 'Login to Shuttlers' }).click()
  // Add any additional steps or checks needed after login
}

export { login }
