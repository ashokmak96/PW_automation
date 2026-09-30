const {test, expect} = require('@playwright/test');

test('Browser Context PW test', async ({browser})=>
{
const  context = await browser.newContext();
const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
console.log(await page.title());
    await page.locator("[name='username']").fill("rahul");
    await page.locator("#password").fill("learning");
    await page.locator("#signInBtn").click();
console.log(await page.locator("[style*='block']").textContent());
await expect(page.locator("[style*='block']")).toContainText('Incorrect');

})  

