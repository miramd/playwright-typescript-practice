import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://playground.bondaracademy.com/');
    await page.getByText('Modal & Overlays').click();
    await page.getByText('Dialog').click();
});


test('auto waiting', async ({ page }) => {
  const DialogWithDelayButton = page.locator('nb-card', {hasText: 'Dialog with delay'});
  await DialogWithDelayButton.getByRole('button', {name: '3 seconds'}).click();
  const dialogContainer = page.locator('nb-dialog-container');
  //await dialogContainer.getByRole('button', {name: 'OK'}).click();
  //click() is what triggers the auto waiting, it will wait for the element to be visible and enabled before clicking

  const dialogHeaderText = await dialogContainer.locator('nb-card-header').textContent();

  //const dialogHeaderText1 = await dialogContainer.locator('nb-card-header').allTextContents();
  //all text contents does not wait, so returns an empty array 
  //it excutes right away

  expect(dialogHeaderText).toEqual('Friendly reminder');

  //question is how do i make stable tests if some methods dont have auto waiting?

});

test('alternative wait', async ({ page }) => {
  const DialogWithDelayButton = page.locator('nb-card', {hasText: 'Dialog with delay'});
  await DialogWithDelayButton.getByRole('button', {name: '3 seconds'}).click();
  const dialogContainer = page.locator('nb-dialog-container');

  //wait for the element
  //await dialogContainer.waitFor();
  //OR
  // await page.waitForSelector('nb-dialog-container');
  

  //wait for API response
 // await page.waitForResponse('**/delay/*')

 //wait for load state (not recommended)
 await page.waitForLoadState('networkidle');

 //hardcoded wait (NEVER DO THIS)
 await page.waitForTimeout(3500);

// const dialogHeaderText = await dialogContainer.locator('nb-card-header').allTextContents();
// expect(dialogHeaderText).toContain('Friendly reminder');

await expect(dialogContainer.locator('nb-card-header')).toHaveText("Friendly reminder");

});

//timeouts :
//3 layers : global timeout, 
//testTimeout , action timeout, navig time out, expect timeout
//test and expect by default 

//defineConfig : u configure global and timeout
//use block : u can configure action & navigation timeout

//u can override timeout in the code test

test('generated test', async ({page})=>{
await page.getByRole('button', { name: 'Open with delay 3 seconds' }).click();
await page.getByRole('button', { name: 'OK' }).click();

});