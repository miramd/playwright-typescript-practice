import { expect, Page } from "@playwright/test";

//Page is a type that is provided by playwright and it is used to represent a single tab or page in the browser. It provides methods to interact with the page, such as navigating to URLs, clicking elements, filling out forms, and more.
//page is an instance 
export class navigationPage {
    readonly page: Page; 
    constructor(page: Page) {

        this.page = page;
    }

    async formLayoutsPage(){
        await this.selectGroupMenuItem('Forms')
        await this.page.getByText('Form Layouts').click();
    }

    async datepickerPage(){
       // await this.page.getByText('Forms').click()
        //await this.page.waitForTimeout(1000)
        await this.selectGroupMenuItem('Forms')
        await this.page.getByText('Datepicker').click()
    }

    async toasterPage(){
         await this.selectGroupMenuItem('Modal & Overlays')
        await this.page.getByText('Toastr').click()

    }

    async tooltipPage(){
         await this.selectGroupMenuItem('Modal & Overlays')
        await this.page.getByText('Tooltip').click()
    }

    async smartTablePage(){
         await this.selectGroupMenuItem('Tables & Data')gi
        await this.page.getByText('Smart Table').click()
    }

    private async selectGroupMenuItem(groupMenuTitle:string){
        const groupMenuItem = this.page.getByTitle(groupMenuTitle)
        const expandedState = await groupMenuItem.getAttribute('aria-expanded')
        if (expandedState=="false")
            await groupMenuItem.click()

    }
}