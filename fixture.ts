import { test as base } from "@playwright/test";
import { PageManager } from "./page-objects/page-manager";

type FixtureTypes = {
    pom: PageManager
}
//json object with key value pairs
//first is object, second is use should be in every fixture
export const test = base.extend<FixtureTypes>({
    pom: async({page},use)=>{


        //everything u put before await use() will be like before hook
        //executed before like a pre request script
          await page.goto("/");
          const manager = new PageManager(page);

        await use(manager)
        //everything uput after is after test executes 
        //like teardown


    }
})