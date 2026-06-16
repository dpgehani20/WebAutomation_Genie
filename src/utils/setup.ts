import { BrowserContext, Page } from '@playwright/test';

export const BASE_URL =
    'https://genie-web-stg.finpal.lk/onboarding/onboarding';

export async function setupSession(context: BrowserContext) {
    await context.addInitScript(() => {
        sessionStorage.setItem(
            'oneapp_token',
            'f65924db-4df6-4afe-be8d-df82ad4f6390-735151381217580'
        );

        sessionStorage.setItem(
            'device_id',
            '53F7986F-4B8B-4097-849B-62FBEB6748A4'
        );

        sessionStorage.setItem(
            'channel',
            'one_app'
        );
    });
}

export async function launchApp(page: Page) {
    await page.goto(BASE_URL, {
        waitUntil: 'domcontentloaded',
        timeout: 60000
    });
}