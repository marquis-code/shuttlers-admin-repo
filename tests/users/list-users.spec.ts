// tests/createUser.spec.js
import { test, expect } from '@playwright/test'
import { login } from '../auth/utils' // Adjust the path as necessary
import { user_fetch_response } from '../stubs/users'

test('should view user list and details', async ({ page }) => {
	await login(page)
	await page.route('**/v1/users*', (route) => {
		const request = route.request()
		if (request.method() === 'GET') {
			// Fulfill GET requests with an empty response
			route.fulfill({
				status: 200,
				contentType: 'application/json',
				body: JSON.stringify(user_fetch_response) // Empty response for GET requests
			})
		}
	})
	await page.goto('http://localhost:3000/users')

	await Promise.all([
		page.getByRole('cell', { name: 'Anthony Akpan daniel.sumah+100@shuttlers.ng' }).click(),
		page.waitForLoadState('networkidle')
	])
	expect(page.url()).toContain('/users/49715/user-info')
	await page.goto('http://localhost:3000/users')
	await Promise.all([
		page.getByRole('cell', { name: 'Anthony Akpan daniel.sumah+100@shuttlers.ng' }).click(),
		page.waitForLoadState('networkidle')
	])
})
