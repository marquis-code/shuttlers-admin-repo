import { test, expect } from '@playwright/test'
import { login } from '../auth/utils'
test.describe('Test user Update Functionality', () => {
    test.beforeEach(async ({ page }) => {
        await login(page)
      })
    test('user update redirects to profile page on success', async ({ page }) => {
      await page.goto('http://localhost:3000/users/add/49703')

      await page.route('**/v1/users/49703', (route) => {
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            id: 49703,
            corporate_id: 3,
            fname: 'rutthrrrrr',
            lname: 'rutthrrrrr',
            email: 'rutthssss@gmail.com',
            phone: '09034567888',
            active: '1',
            avatar: null,
            code: 'e39fc8d0-ca78-11ee-ba81-53790419ed18-49703',
            created_at: '2024-02-13 15:05:06',
            updated_at: '2024-02-15 08:42:48',
            gender: 'male',
            dob: '2024-02-16 00:00:00.000',
            car_owner: '0',
            nfc_id: null,
            staff_id: null,
            client_id: null,
            location: null,
            verified_at: null,
            city_id: null,
            login_remote_address: null,
            login_date_time: null,
            login_is_successful: null,
            blocked_reason: null,
            is_blocked: 0,
            blocked_at: null,
            sign_up_source: 'web',
            country_code: 'NG',
            phone_verified_at: null,
            deleted_at: null,
            delete_reason: null,
            is_email_notification_enabled: 1,
            previous_corporate_id: null,
            date_removed_from_corporate: null,
            isGuest: false
        })
        })
      })

      await page.fill('input[name="first_name"]', 'kromate')
      await page.fill('input[name="last_name"]', 'Anthony')
      await page.fill('input[name="email_address"]', 'kromate@gmail.com')
      await page.fill('input[name="phone"]', '09067543456')
      await page.locator('#gender').selectOption('female')
      await page.getByText('Select company').click()
      await page.getByPlaceholder('Select company').fill('she')
      await page.getByRole('option', { name: 'SHE MOVES Press enter to select' }).locator('span').first().click()

      await page.getByRole('button', { name: 'Edit user' }).click()
      await expect(page).toHaveURL('http://localhost:3000/users/49703/user-info')
    })
})
