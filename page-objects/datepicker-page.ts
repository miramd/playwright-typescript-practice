import {Page,expect} from '@playwright/test';
import { step } from "../helpers/test-step-decorator";
import { HelperBase } from "./helper-base";


export class datepickerPage extends HelperBase {

    constructor(page: Page) {
      super(page)    }   

    @step
    private async selectDateInTheCalendar(daysFromToday: number){
         const date = new Date();
                date.setDate(date.getDate() + daysFromToday);
                const expectedDate = date.getDate().toString();
                const expectedMonth = date.toLocaleString('En-US', {month:'short'});
                const expectedMonthLong = date.toLocaleString('En-US', {month:'long'});
        
                const expectedYear = date.getFullYear();
                const expectedDateString = `${expectedMonth} ${expectedDate}, ${expectedYear}`

        
                let currentMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent();
                const expectedMonthAndYear = `${expectedMonthLong} ${expectedYear}`
                while(!currentMonthAndYear?.includes(expectedMonthAndYear) ){
                    await this.page.locator('.next-month').click()
                    currentMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()

                }      
             await this.page.locator('.day-cell:not(.bounding-month)').getByText(expectedDate, {exact :true}).click()
     

        return expectedDateString;        

}

@step
    async selectCommonDatepickerDateFromToday(daysFromToday: number){
                const calendarInputField = this.page.getByPlaceholder('Form Picker')
                await calendarInputField.click()
                //here we select day cell but not the bounding month cell class
        
                const expectedDate = await this.selectDateInTheCalendar(daysFromToday)

                await expect(calendarInputField).toHaveValue(expectedDate)
            
    }

    @step
    async selectDatePickerWithRangeFromToday(daysFromTodayStart: number, daysFromTodayEnd: number){

        const calendarInputField = this.page.getByPlaceholder('Range Picker')
        await calendarInputField.click()

            const expectedDateStart = await this.selectDateInTheCalendar(daysFromTodayStart)
            const expectedDateEnd = await this.selectDateInTheCalendar(daysFromTodayEnd)

            const expectedRangeDate = `${expectedDateStart} - ${expectedDateEnd}`

            await expect(calendarInputField).toHaveValue(expectedRangeDate)



    }




}