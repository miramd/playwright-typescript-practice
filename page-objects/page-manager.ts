import { Page } from "@playwright/test";
import { navigationPage } from "./navigation-page";
import { datepickerPage } from "./datepicker-page";
import { formLayoutsPage } from "./form-layouts-page";

export class PageManager {
    readonly navigateTo : navigationPage
    readonly formLayoutsPage : formLayoutsPage
    readonly datepickerPage: datepickerPage

    constructor(page:Page){
        this.navigateTo=new navigationPage(page)
        this.datepickerPage=new datepickerPage(page)
        this.formLayoutsPage=new formLayoutsPage(page)
    }
}