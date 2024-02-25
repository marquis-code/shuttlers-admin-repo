// tests/createUser.spec.js
import { test, expect } from '@playwright/test'
import { login } from '../auth/utils' // Adjust the path as necessary
import { user_create_response } from '../stubs/users'

	test('should create user and redirect to details page', async ({ page }) => {
		await login(page)
    await page.route('**/v1/users', (route) => {
      const request = route.request()
  if (request.method() === 'POST') {
            // Fulfill GET requests with an empty response
            route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(user_create_response) // Empty response for GET requests
            })
        }
		})
		await page.goto('http://localhost:3000/users/add')

		expect(page.url()).toContain('/users/add')
		// Fill the form
		await page.fill('input[name="first_name"]', 'rutthrrrrr')
		await page.fill('input[name="last_name"]', 'rutthrrrrr')
		await page.fill('input[name="email_address"]', 'rutthrrrrr@gmail.com')
		await page.fill('input[name="phone"]', '09034567888')
		await page.locator('#gender').selectOption('male')
		await page.fill('input[name="password"]', 'Success2024')
		await page.getByText('Select company').click()
		await page.getByPlaceholder('Select company').fill('she')

		await Promise.all([
			page.getByRole('button', { name: 'Add user' }).click(),
			page.waitForLoadState('networkidle')
		])

		expect(page.url()).toContain('/users')
	})
