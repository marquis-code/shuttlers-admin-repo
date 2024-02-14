import { test } from '@playwright/test'
import { login } from './auth/utils' // Adjust the path as necessary

test.describe('User Module test', () => {
    test.beforeEach(async ({ page }) => {
        await login(page) // This logs in before each test in the describe block
    })

    test('create user', async ({ page }) => {
        await page.locator('div').filter({ hasText: /^Users$/ }).click()
        await page.getByText('Manage Users').click()
        await page.getByRole('link', { name: 'Add User' }).click()
        await page.getByLabel('First name').click()
        await page.getByLabel('First name').fill('Hot')
        await page.getByLabel('Last name').click()
        await page.getByLabel('Last name').fill('Bread')
        await page.getByLabel('Email address').click()
        await page.getByLabel('Email address').fill('nobodyhotter@hot.com')
        await page.getByLabel('Phone').click()
        await page.getByLabel('Phone').fill('08146923944')
        // await page.getByPlaceholder('Filter by date').click()
        // await page.locator('.mx-calendar-header > button').first().click()
        // await page.locator('.mx-calendar-header > button').first().click({
        //     clickCount: 3
        // })
        // await page.getByRole('button', { name: '2018' }).click()
        // await page.getByRole('button').nth(3).click()
        // await page.getByText('2001').click()
        // await page.getByRole('cell', { name: 'Feb' }).click()
        // await page.getByText('17').click()
        await page.locator('#gender').selectOption('male')
        await page.getByLabel('Enter password').click()
        await page.getByLabel('Enter password').fill('hotestbread')
        await page.getByText('Select company').click()
        await page.getByPlaceholder('Select company').fill('shut')
        await page.getByRole('option', { name: 'Shuttlers Press enter to' }).locator('span').first().click()
        await page.locator('div').filter({ hasText: /^Enter password$/ }).getByRole('img').click()
        await page.getByRole('button', { name: 'Add user' }).click()
        await page.getByText('User created successfully').click()
        await page.getByText('User created successfully').click()
        await page.locator('use').nth(1).click()
        await page.getByRole('link', { name: 'Hot Bread nobodyhotter@hot.com' }).click()
    })

    test('test 2', async ({ page }) => {
        // Another test, also starts with the user logged in
    })
})
