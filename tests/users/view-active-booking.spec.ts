import { test, expect } from '@playwright/test'
import { login } from '../auth/utils'
import { user_fetch_response, user_fetch_response_by_id } from '../stubs/users'

    test('user update redirects to profile page on success', async ({ page }) => {
            await login(page)
        await page.route('**/v1/users*', (route) => {
            const request = route.request()
            if (request.method() === 'GET') {
                route.fulfill({
                    status: 200,
                    contentType: 'application/json',
                    body: JSON.stringify(user_fetch_response) // Empty response for GET requests
                })
            }
        })
        await page.route('**/v1/users/49715', (route) => {
            const request = route.request()
            route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(user_fetch_response_by_id) // Empty response for GET requests
            })
        })
        await page.goto('http://localhost:3000/users/49715/user-info')

        expect(page.url()).toContain('/users/49715/user-info')
        await page.getByRole('button', { name: 'Actions' }).click()
        await page.getByRole('menuitem', { name: 'Edit User' }).click()
        await page.getByLabel('Last name').click()
        await page.getByLabel('Last name').fill('Akpannn')
        await Promise.all([
            page.getByRole('button', { name: 'Edit user' }).click(),
            page.waitForLoadState('networkidle')
        ])
        setTimeout(() => {
            expect(page.url()).toContain('/users/49715/user-info')
        }, 1000)
    })
