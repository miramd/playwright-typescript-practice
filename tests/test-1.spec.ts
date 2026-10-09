import { test, expect } from '@playwright/test';


test('RECORD NEW', async ({ page }) => {
  await page.goto('about:blank');
  await page.goto('https://playground.bondaracademy.com/');
  await page.goto('https://playground.bondaracademy.com/pages/iot-dashboard');
  await page.locator('nb-card').filter({ hasText: 'LightON' }).click();
  await page.getByRole('link', { name: 'Modal & Overlays' }).click();
  await page.getByRole('link', { name: 'Dialog' }).click();
  await page.getByRole('button', { name: 'Open with delay 3 seconds' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
});