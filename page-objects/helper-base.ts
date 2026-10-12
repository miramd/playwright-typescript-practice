import { Page } from "@playwright/test";
export class HelperBase{
    protected readonly page : Page
    constructor(page: Page) {

        this.page = page;}

    protected async getToastrMessage(){
        return "I'm a cool toastr"
    }

    //protected means that the methods in helperBase will only be visible to the page objects that extend helperbase
    
}