import {test} from '@playwright/test'
import {navigationPage} from '../page-objects/navigation-page'


test.beforeEach(async ({page}) => {
    await page.goto('https://playground.bondaracademy.com/')
})

test('navigate to form layout page', async ({page})=>{
//we create a page object for each page file/class
    const navigateTo = new navigationPage(page);

    await navigateTo.formLayoutsPage();
    await navigateTo.datepickerPage();
})