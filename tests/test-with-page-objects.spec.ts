import { test } from '../fixture';
import { PageManager } from "../page-objects/page-manager";
// import {faker} from '@faker-js/faker';


test("navigate to form layout page", async ({ pom }) => {
  //we create a page object for each page file/class

  await pom.navigateTo.formLayoutsPage();
  await pom.navigateTo.datepickerPage();
});

test("Parameterized page object methods", async ({ pom }) => {

  // const randomFullName = faker.person.fullName();
  // const randomEmail= faker.internet.email({provider:'test.com'});

  await pom.navigateTo.formLayoutsPage();
  await pom.formLayoutsPage.submitUsingTheGridForm(
    "test@example.com",
    "password",
    "Option 2",
  );
  //how to take a screenshot??
  // await page.waitForTimeout(500)
  // await page.screenshot({path: 'screenshots/formLayoutsPage.png'})

  //or
 // const buffer=   await page.screenshot()

 //or if u want partial screenshot await page.locator(..).screenshot({path:..})
//if u want video =< go to playwright config , after trace : video configure
  // await pom.formLayoutsPage.submitInlineForm(
  //   randomFullName,
  //   randomEmail,
  //   true,
  // );
  await pom.navigateTo.datepickerPage();
  await pom.datepickerPage.selectCommonDatepickerDateFromToday(10);

  await pom.datepickerPage.selectDatePickerWithRangeFromToday(10, 20);
});
