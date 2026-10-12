import {expect , Page } from "@playwright/test";
import { step } from "../helpers/test-step-decorator";
import { HelperBase } from "./helper-base";

export class formLayoutsPage extends HelperBase {

    constructor(page: Page) {
super(page);
    }

    @step
    async submitUsingTheGridForm(email: string, password: string, optionText: string){

        const UsingTheGridForm = this.page.locator('nb-card', {hasText:"Using The Grid"});
        await UsingTheGridForm.getByRole('textbox', {name: "Email"}).fill(email);
        await UsingTheGridForm.getByRole('textbox', {name: "Password"}).fill(password);
        await UsingTheGridForm.getByLabel(optionText).check({force:true});

        await UsingTheGridForm.getByRole('button', {name: "Sign in"}).click();


    }

    /**
     * this method submits inline form with user full name , email and remember me checkbox value 
     * @param fullName - Valid test user full name
     * @param email -- Valid test user email
     * @param rememberMeCheckbox -- true if the checkbox should be checked, false if it should be unchecked
     */
@step
    async submitInlineForm(fullName: string, email: string, rememberMeCheckbox: boolean){
        const InlineForm = this.page.locator('nb-card', {hasText:"Inline form"});
        //here we could've used getbytext
        await InlineForm.getByPlaceholder('Jane Doe').fill(fullName);
        await InlineForm.getByPlaceholder('Email').fill(email);

        if(rememberMeCheckbox){
            await InlineForm.getByRole('checkbox').check({force:true});
        }else {
            await InlineForm.getByRole('checkbox').uncheck({force:true});
        }

        await InlineForm.getByRole('button', {name: "Submit"}).click();

    }

}