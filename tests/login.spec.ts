import { test, expect } from '@playwright/test';
import loginData from '../src/data/loginData.json';
import { setupSession, launchApp } from '../src/utils/setup';
import { executeStep } from '../src/utils/logger';

test('Login → Dashboard → Pay Bills flow', async ({ browser }) => {

    const context = await browser.newContext();

    await setupSession(context);

    const page = await context.newPage();

    await executeStep('Application launched', async () => {
        await launchApp(page);
    });

    await executeStep('Get Started button clicked', async () => {
        await page.getByRole('button', { name: 'Get Started' }).click();
    });

    await executeStep('Mobile number entered', async () => {
        await page
            .getByRole('textbox', { name: 'Enter mobile number*' })
            .fill(loginData.mobileNumber);
    });

    await executeStep('Terms and Conditions accepted', async () => {
        await page.getByRole('img', { name: 'checkbox' }).click();
    });

    await executeStep('Continue button clicked', async () => {
        await page.getByRole('button', { name: 'Continue' }).click();
    });

    await executeStep('OTP entered', async () => {
        await page
            .getByRole('textbox', { name: 'Enter the code*' })
            .fill(loginData.otp);
    });

    await executeStep('NIC entered', async () => {
        await page
            .getByRole('textbox', { name: 'Enter the NIC number*' })
            .fill(loginData.nic);
    });

    await executeStep('Login details submitted', async () => {
        await page.getByRole('button', { name: 'Continue' }).click();
    });

    await executeStep('PIN entered successfully', async () => {
        for (const digit of loginData.pin) {
            await page.getByRole('button', { name: digit }).click();
        }
    });

    await executeStep('Dashboard loaded', async () => {
        await expect(page).toHaveURL(/dashboard/i);
    });

    await executeStep('Pay Bills menu selected', async () => {
        await page.getByText('Pay Bills', { exact: true }).click();
    });

    await executeStep('Bills page loaded', async () => {
        await expect(page).toHaveURL(/bill|payment|pay/i);
    });

});