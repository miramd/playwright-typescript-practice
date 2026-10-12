import {expect , Locator, Page } from "@playwright/test";
import { step } from "../helpers/test-step-decorator";
import { HelperBase } from "./helper-base";


//Page is a type that is provided by playwright and it is used to represent a single tab or page in the browser. It provides methods to interact with the page, such as navigating to URLs, clicking elements, filling out forms, and more.
//page is an instance 
export class navigationPage extends HelperBase{

    //defining locators then assigning them values in the constructor is recommended by playwright documentation
    //however, we can directly do so in each function
    readonly formLayoutsMenu: Locator;
    readonly datepickerMenu: Locator;
    readonly toasterMenu: Locator;
    readonly tooltipMenu: Locator;
    readonly smartTableMenu: Locator;
    
    constructor(page: Page) {

       super(page);
        this.smartTableMenu = page.getByText('Smart Table')
        this.toasterMenu = page.getByText('Toastr')
        this.tooltipMenu = page.getByText('Tooltip')
        this.datepickerMenu = page.getByText('Datepicker')
        this.formLayoutsMenu = page.getByText('Form Layouts')
    }

    @step
    async formLayoutsPage(){
        await this.selectGroupMenuItem('Forms')
        await this.formLayoutsMenu.click();
        
    }

      @step
    async datepickerPage(){
       // await this.page.getByText('Forms').click()
        //await this.page.waitForTimeout(1000)
        await this.selectGroupMenuItem('Forms')
        await this.datepickerMenu.click()
    }
  @step
    async toasterPage(){
         await this.selectGroupMenuItem('Modal & Overlays')
        await this.toasterMenu.click()

    }
  @step
    async tooltipPage(){
         await this.selectGroupMenuItem('Modal & Overlays')
        await this.tooltipMenu.click()
    }

      @step
    async smartTablePage(){
        await this.selectGroupMenuItem('Tables & Data')
        await this.smartTableMenu.click()
    }

    private async selectGroupMenuItem(groupMenuTitle:string){
        const groupMenuItem = this.page.getByTitle(groupMenuTitle)
        const expandedState = await groupMenuItem.getAttribute('aria-expanded')
        if (expandedState=="false")
            await groupMenuItem.click()

    }
}