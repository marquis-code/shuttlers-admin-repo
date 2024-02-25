import { auth_login_response } from '../stubs/auth'

async function login(page) {
  await page.route('**/api.test.shuttlers.africa/**', (route) => {
        route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({})
        })
    })
    await page.route('**/v1/login', (route) => {
    route.fulfill({ json: auth_login_response })
  })
  await page.goto('http://localhost:3000/auth/login')
  await page.getByLabel('Email address').fill('daniel.sumah@shuttlers.ng')
  await page.getByLabel('Password Login with OTP').fill('shuttlers')
  await page.getByRole('button', { name: 'Login to Shuttlers' }).click()
  // Add any additional steps or checks needed after login
}

export { login }
