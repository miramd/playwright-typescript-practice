import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
    await page.goto('https://playground.bondaracademy.com/');
    await page.getByText('forms').click();
    await page.getByText('form layouts').click();
});

  test("locator syntax rules",  async ({page}) => {
    //find element by tag name 
    page.locator('input');

    //find element by id
    page.locator('#inputEmail1');

    //find element by class 
    page.locator('.input-full-width');

    //find element by specific attribute
    page.locator('[placeholder="Email"]');

    //find element by multiple attributes
    page.locator('[placeholder="Email"][type="email"]');

    //find by xpath
    page.locator('//*[@id="inputEmail1"]');
    //u dont have to use it, not recommended

    //find by text
    page.locator('text=Email');

     //find by partial text match
   page.locator(':text("using")');

   //find by exact text match
   page.locator('text-is("using the grid")');
});

test('user-visible locators', async ({ page }) =>{

await page.getByRole('button', {name : 'Sign in'}).first().click();
await page.getByRole('textbox', {name: 'Email'}).first().fill('test@example.com');
await page.getByLabel('Email').first().fill('test@example.com');
await page.getByPlaceholder('Jane Doe').first().fill('Artem Bondar');
await page.getByText('Submit').first().click();
await page.getByTestId('inputEmail1').first().fill('dmh');
 await page.getByTitle('Iot Dashboard').click();
});
  
test('locating child elements', async ({ page }) => {
    await page.locator('nb-card').locator('nb-radio-group').locator(':text-is("Option 1")').click();

    await page.locator('nb-card').locator('nb-radio-group').locator(':text-is("Option 2")').click();

    await page.locator('nb-card').locator('nb-radio-group').locator(':text-is("Option 3")').click();

    await page.locator('nb-card').getByRole('radio', {name: 'Option 1'}).click();

}) ;
  
test('locating parent elements', async ({ page }) => {
  await page.locator('nb-card', {hasText: 'Using the Grid'}).getByRole('button').click();
  await page.locator('nb-card', {has : page.locator('nb-radio-group')}).getByRole('button').click();

 await page.locator('nb-card').filter({hasText: 'Using the Grid'}).getByRole('button').click();

 await page.locator('nb-card')
 .filter({has : page.locator('nb-checkbox')})
 .filter({hasText: 'Sign in'})
 .getByLabel('Email').fill('Test');

});


test('reusing locators', async ({ page }) => {
  const basicFormSection = page.locator('nb-card', {hasText: 'Basic form'});
  const emailInput = basicFormSection.getByLabel('Email');

  await emailInput.fill('Hi');
  await basicFormSection.getByRole('textbox', {name: 'Password'}).fill('Hello');
  await basicFormSection.getByRole('button').click();

  await expect(emailInput).toHaveValue('Hi');
});

test('extracting values', async ({ page }) => {
  const basicFormSection = page.locator('nb-card', {hasText: 'Basic form'});
  const submitButtonText = await basicFormSection.getByRole('button').textContent();

  console.log(submitButtonText);

  await expect(submitButtonText).toEqual('Submit');

  const allradioButtons = await page.locator('nb-radio').allTextContents();
  console.log(allradioButtons);

  const emailInput = basicFormSection.getByLabel('Email');
  await emailInput.fill('EMAIL');
  const emailInputValue = await emailInput.inputValue();
  console.log(emailInputValue);

  //Extracting values from attributes
  const emailInputPlaceholder = await emailInput.getAttribute('placeholder');
  console.log(emailInputPlaceholder);
}); 

test('assertions', async ({ page }) => {

  const basicFormSectionButton = page.locator('nb-card', {hasText: 'Basic form'}).getByRole('button');

  //generic assertion
  const value = 5;
  expect(value).toEqual(5);

  
  const submitButtonText = await basicFormSectionButton.textContent();
  expect(submitButtonText).toEqual('Submit');

  //locaotor assertion
  await expect(basicFormSectionButton).toHaveText('Submit');

  //soft assertion
  await expect.soft(basicFormSectionButton).toHaveText('Submit'); 
  await basicFormSectionButton.click();

});

