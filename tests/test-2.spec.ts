import { test, expect } from '@playwright/test'

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/')
  await page.goto('http://localhost:3000/auth/login')
  await page.getByLabel('Email address').click()
  await page.getByLabel('Email address').fill('da')
})
