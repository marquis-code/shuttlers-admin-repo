// tests/createUser.spec.js
import { test, expect } from '@playwright/test'
import { login } from '../auth/utils' // Adjust the path as necessary

test.describe('Create User and Redirect', async () => {
  test.beforeEach(async ({ page }) => {
    await login(page)
  })

  test('should create user and redirect to details page', async ({ page }) => {
    await page.goto('http://localhost:3000/users/add')

    // Fill the form
    await page.fill('input[name="first_name"]', 'rutthrrrrr')
    await page.fill('input[name="last_name"]', 'rutthrrrrr')
    await page.fill('input[name="email_address"]', 'rutthrrrrr@gmail.com')
    await page.fill('input[name="phone"]', '09034567888')
    await page.locator('#gender').selectOption('male')
    await page.fill('input[name="password"]', 'Success2024')
    await page.getByText('Filter by date').click()
    page.getByPlaceholder('Filter by date').fill('2024-02-19')
    await page.getByText('Select company').click()
    await page.getByPlaceholder('Select company').fill('she')
    await page.getByRole('option', { name: 'SHE MOVES Press enter to select' }).locator('span').first().click()

    await page.getByRole('button', { name: 'Add user' }).click()
    expect(page.url()).toContain('/users/49703/user-info')
  })

  test('Mock Create User Response', async ({ page }) => {
    await page.route('**/v1/users', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          fname: 'rutthrrrrr',
          lname: 'rutthrrrrr',
          email: 'rutthrrrrr@gmail.com',
          phone: '09034567888',
          gender: 'female',
          dob: '2024-02-16',
          corporate_id: 3,
          country_code: 'NG',
          verified_at: null,
          code: 'e39fc8d0-ca78-11ee-ba81-53790419ed18-49703',
          updated_at: '2024-02-13 15:05:06',
          created_at: '2024-02-13 15:05:06',
          id: 49703,
          active: '1',
          avatar: null,
          car_owner: '0',
          nfc_id: null,
          staff_id: null,
          client_id: null,
          location: null,
          city_id: null,
          login_remote_address: null,
          login_date_time: null,
          login_is_successful: null,
          blocked_reason: null,
          is_blocked: 0,
          blocked_at: null,
          sign_up_source: 'web',
          phone_verified_at: null,
          deleted_at: null,
          delete_reason: null,
          is_email_notification_enabled: 1,
          previous_corporate_id: null,
          date_removed_from_corporate: null,
          token: {
            iat: 1707833106,
            exp: 1739369106,
            token:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmbmFtZSI6InJ1dHRocnJycnIiLCJsbmFtZSI6InJ1dHRocnJycnIiLCJlbWFpbCI6InJ1dHRocnJycnJAZ21haWwuY29tIiwicGhvbmUiOiIwOTAzNDU2Nzg4OCIsImdlbmRlciI6ImZlbWFsZSIsImRvYiI6IjIwMjQtMDItMTYgMDA6MDA6MDAuMDAwIiwiY29ycG9yYXRlX2lkIjozLCJjb3VudHJ5X2NvZGUiOiJORyIsInZlcmlmaWVkX2F0IjpudWxsLCJjb2RlIjoiZTM5ZmM4ZDAtY2E3OC0xMWVlLWJhODEtNTM3OTA0MTllZDE4LTQ5NzAzIiwidXBkYXRlZF9hdCI6IjIwMjQtMDItMTMgMTU6MDU6MDYiLCJjcmVhdGVkX2F0IjoiMjAyNC0wMi0xMyAxNTowNTowNiIsImlkIjo0OTcwMywiYWN0aXZlIjoiMSIsImF2YXRhciI6bnVsbCwiY2FyX293bmVyIjoiMCIsIm5mY19pZCI6bnVsbCwic3RhZmZfaWQiOm51bGwsImNsaWVudF9pZCI6bnVsbCwibG9jYXRpb24iOm51bGwsImNpdHlfaWQiOm51bGwsImxvZ2luX3JlbW90ZV9hZGRyZXNzIjpudWxsLCJsb2dpbl9kYXRlX3RpbWUiOm51bGwsImxvZ2luX2lzX3N1Y2Nlc3NmdWwiOm51bGwsImJsb2NrZWRfcmVhc29uIjpudWxsLCJpc19ibG9ja2VkIjowLCJibG9ja2VkX2F0IjpudWxsLCJzaWduX3VwX3NvdXJjZSI6IndlYiIsInBob25lX3ZlcmlmaWVkX2F0IjpudWxsLCJkZWxldGVkX2F0IjpudWxsLCJkZWxldGVfcmVhc29uIjpudWxsLCJpc19lbWFpbF9ub3RpZmljYXRpb25fZW5hYmxlZCI6MSwicHJldmlvdXNfY29ycG9yYXRlX2lkIjpudWxsLCJkYXRlX3JlbW92ZWRfZnJvbV9jb3Jwb3JhdGUiOm51bGwsIndhbGxldCI6eyJhbW91bnQiOiIwIiwidXNlcl9pZCI6NDk3MDMsInVwZGF0ZWRfYXQiOiIyMDI0LTAyLTEzIDE1OjA1OjA2IiwiY3JlYXRlZF9hdCI6IjIwMjQtMDItMTMgMTU6MDU6MDYiLCJpZCI6NDE5OTMsImNyZWRpdF9hbW91bnQiOiIwIiwiaXNfbWlncmF0ZWRfdG9fY3JlZGl0X3N5c3RlbSI6MH0sImlzR3Vlc3QiOmZhbHNlLCJpYXQiOjE3MDc4MzMxMDYsImV4cCI6MTczOTM2OTEwNn0.ERHT7gdGxOQJQAjtfrwzbdlw5TizvuqmZZDciaQGO6Y'
          },
          wallet: {
            amount: '0',
            user_id: 49703,
            updated_at: '2024-02-13 15:05:06',
            created_at: '2024-02-13 15:05:06',
            id: 41993,
            credit_amount: '0',
            is_migrated_to_credit_system: 0
          },
          isGuest: false
        })
      })
    })
    await page.goto('http://localhost:3000/users/add')
  })
})
