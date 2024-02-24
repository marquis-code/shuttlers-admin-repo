import { test, expect } from '@playwright/test'
import { login } from '../auth/utils'
import { user_fetch_response, user_past_booking_response } from '../stubs/users'

test('View users active bookkings', async ({ page }) => {
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
    await page.route('**/v1/users/386/user-route-schedules*', (route) => {
        route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(user_past_booking_response) // Empty response for GET requests
        })
    })

    await page.goto('http://localhost:3000/users/386/past-bookings')
    expect(page.url()).toContain('/users/386/past-bookings')
    await page.waitForLoadState('networkidle')
    await page.getByText('IKR104').click()
    await page.getByText('TEST12').click()
})
