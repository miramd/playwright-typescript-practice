import { test, expect } from '@playwright/test';

test.beforeEach(async ({page}) => {
    await page.goto('https://playground.bondaracademy.com/')
})

test.describe('form layouts page', ()=> {

    test.describe.configure({retries:3});

    test.beforeEach(async ({page}, testInfo)=>{
        if(testInfo.retry){
            //clear test data here 
        }
await page.getByText('Forms').click();
await page.getByText('Form Layouts').click();
    });

    test('input fields', async({page})=>{
        const UsingTheGridEmailInput = page.locator('nb-card', {hasText:"Using The Grid"}).getByRole('textbox', {name: "Email"});


        await UsingTheGridEmailInput.fill('Test');
        await UsingTheGridEmailInput.clear();
        await UsingTheGridEmailInput.pressSequentially("testhi@gmail", {delay:500});

        //extract the value
        const inputValue = await UsingTheGridEmailInput.inputValue();

        //asertions 
        await expect(UsingTheGridEmailInput).toHaveValue('testhi@gmail');
        await expect(UsingTheGridEmailInput).toHaveValue(/gmail/);

        //note no need to clear before fill
        //for assertions always use tohavevalue
        //partial text use /text/
    });

    test('radio button',async({page})=>{
                const UsingTheGridForm = page.locator('nb-card', {hasText:"Using The Grid"});
                await UsingTheGridForm.getByLabel('Option 1').check({force:true});

                //radio button is visually hidden 
                //force makes it bypass the bisually hidden
                //force disables auto waiting so it makes tests flaky

                await UsingTheGridForm.getByRole('radio', {name:"Option 2"}).check({force:true});

                const radioStatus = UsingTheGridForm.getByRole('radio', {name:"Option 2"}).isChecked();
                expect(radioStatus).toBeTruthy();

                //correct way to make an assertion/validation : 
                await expect(UsingTheGridForm.getByRole('radio', {name:"Option 2"})).toBeChecked();
                await expect(UsingTheGridForm.getByRole('radio', {name:"Option 1"})).not.toBeChecked();



    })

   
});

 test('checkboxes', async ({page})=>{
        await page.getByText('Modal & Overlays').click();
        await page.getByText('Toastr').click();

        await page.getByRole('checkbox', {name: 'Hide on Click'}).check({force:true});

        //note : here check() and click() work
        //click() will reverse the status of the checkbox
        //check() will check/ keep checked if checked
        const allBoxes = page.getByRole('checkbox');
        for (const box of await allBoxes.all()){

            await box.check({force:true});
            await expect(box).toBeChecked();

        }

    })

    test('Lists & Dropdowns', async({page})=>{
        await page.getByText('Modal & Overlays').click()
        await page.getByText('Toastr').click()

        //standard dropdown
        await page.locator('.form-group', {hasText:'Toast type:'}).getByRole('combobox').selectOption('success')
        await expect(page.getByRole('combobox')).toHaveValue('success')

        //custom dropdown
        await page.locator('.form-group', {hasText:'Position'}).locator('nb-select').click();
        //option 1
        //await page.getByRole('list').getByText('bottom-end').click()
       
        //option 2 
        await page.locator('nb-option', {hasText:'top-left'}).click()

        //asertion
        await expect(page.locator('.form-group', {hasText:'Position:'}).locator('nb-select')).toHaveText('top-left')

        //loop through the list
        const positionDropDown = page.locator('.form-group', {hasText:'Position:'}).locator('nb-select');
        await positionDropDown.click();
        const allListValues = await page.locator('nb-option').allTextContents();

        for (const listValue of allListValues){
             await page.locator('nb-option', {hasText:listValue}).click()
             await expect(positionDropDown).toHaveText(listValue)
             await positionDropDown.click()
        }


    });

    test('tooltip', async ({page})=>{

        await page.getByText('Modal & Overlays').click()
        await page.getByText('Tooltip').click()
        await page.getByRole('button', {name:'Top'}).hover();
        await expect(page.getByRole('tooltip')).toHaveText('This is a tooltip')
    });

    test('dialog box', async({page})=>{
        await page.getByText('Tables & Data').click()
        await page.getByText('Smart Table').click()

         page.on('dialog', dialog =>{
            expect(dialog.message()).toEqual('Are you sure you want to delete?')
            dialog.accept()
         })
        await page.locator('tr', {hasText:'mdo@gmail.com'}).locator('.nb-trash').click()

        await expect(page.locator('tr', {hasText:'mdo@gmail.com'})).not.toBeVisible();
    });

    test('web tables', async({page})=>{
         await page.getByText('Tables & Data').click()
        await page.getByText('Smart Table').click()

        const getRowByEmail = page.getByRole('row', {name:'twitter@outlook.com'})
        await getRowByEmail.locator('.nb-edit').click()
        await getRowByEmail.locator('[placeholder="Age"]').fill('25')
        await getRowByEmail.locator('.nb-checkmark').click()
        await expect(getRowByEmail.locator('td').last()).toBeVisible()

        //find by specific column
        const tableRowByID = page.getByRole('row').filter({has: page.getByRole('cell').nth(1).getByText('10')})
        await tableRowByID.locator('.nb-edit').click()
        await page.locator('tbody').getByPlaceholder('E-mail').fill('newemail@example.com')
        await page.locator('tbody').locator('.nb-checkmark').click()
        await expect(tableRowByID.locator('td').nth(5)).toHaveText('newemail@example.com')

        //loop through table rows
        const ages = ['20', '30', '40','200']
        for (const age of ages){
            await page.getByPlaceholder('Age').fill(age)
            if (age=='200'){
                await expect(page.locator('tbody')).toContainText('No data found')
            }else{
                //here we wait for the filtering to be done/check the first row of the table to have the age we just entered
                await expect(page.locator('tbody').first().locator('td').nth(6)).toHaveText(age)
                 const allTableRows= await page.locator('tbody tr').all()

                 //tbody tr is the row selector that will get all the rows in the table as an array cz we used all()
                 for (let row of allTableRows){
                    await expect(row.locator('td').nth(6)).toHaveText(age)
                 }
            }

        }
    })

    test('date picker', async({page})=>{
        await page.getByText('Forms').click()
        await page.getByText('Datepicker').click()

        const calendarInputField = page.getByPlaceholder('Form Picker')
        await calendarInputField.click()
        //here we select day cell but not the bounding month cell class

        const date = new Date();
        date.setDate(date.getDate() + 60);
        const expectedDate = date.getDate().toString();
        const expectedMonth = date.toLocaleString('En-US', {month:'short'});
        const expectedMonthLong = date.toLocaleString('En-US', {month:'long'});

        const expectedYear = date.getFullYear();
        const expectedDateString = `${expectedMonth} ${expectedDate}, ${expectedYear}`



        let currentMonthAndYear = await page.locator('nb-calendar-view-mode').textContent();
        const expectedMonthAndYear = `${expectedMonthLong} ${expectedYear}`
        while(!currentMonthAndYear?.includes(expectedMonthAndYear) ){
            await page.locator('.next-month').click()
            currentMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
        }           


        await page.locator('.day-cell:not(.bounding-month)').getByText(expectedDate, {exact :true}).click()
        //exact true to make it pick only the expected date and not any value that has it

        await expect(calendarInputField).toHaveValue(expectedDateString)

        //using tohaveValue cz we are interacting with an input field and not a text element

    })

    //sliders 
    test('slider', async({page})=>{

        //set the attributes values
    // const tempGauge= page.locator('[tabtitle="Temperature"] ngx-temperature-dragger circle')
     //to set values of attributes we need to use js
    //  await tempGauge.evaluate (element =>{
    //     element.setAttribute('cx', '243.92928757815181')
    //             element.setAttribute('cy', '219.74774720014238')

    //  })
    //  await tempGauge.click()

     //using mouse to drag the slider
     const tempBox = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger')
     await tempBox.scrollIntoViewIfNeeded()
    const box = await tempBox.boundingBox()

    //const x =  box?.x + box?.width /2;
    //const y = box?.y + box?.height /2;
//     await page.mouse.move(x, y);
//     await page.mouse.down();
//     await page.mouse.move(x+100, y);
//     await page.mouse.move(x+100, y+100);
//     await page.mouse.up();
//    await expect(tempBox).toContainText('30')
    })

    //iframe
    test('iframe', async({page})=>{
               
        await page.getByText('Modal & Overlays').click()
        await page.getByText('Dialog').click()
        //playwright is stuck on the iframe so we need to get the iframe first and then interact with it
        const frameLocator = page.frameLocator('[data-cy="esc-close-iframe"]')
        await frameLocator.getByText('Open Dialog with esc close').click()

    })

    //drag and drop
    test('drag and drop', async({page})=>{
        await page.getByText('Extra Components').click()
        await page.getByText('Drag & Drop').click()

        //option 1
        await page.getByText('Clean my room').dragTo(page.locator('#drop-list'))

        //2
        await page.getByText('Get groceries').hover();
        //simulate mouse click
        await page.mouse.down();
        await page.locator('#drop-list').hover();
        await page.mouse.up();
    })