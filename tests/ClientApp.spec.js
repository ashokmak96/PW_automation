const {test, expect} = require('@playwright/test');

test('Client app test', async ({browser})=>
{
const  context = await browser.newContext();
const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
console.log(await page.title());
    // await page.locator("[href*='register']").click();
    // await page.locator("#firstName").fill("Ashok");
    // await page.locator("#lastName").fill("Kumar");
    // await page.locator("#userEmail").fill("ashok@yopmail.com");
    // await page.locator("#userMobile").fill("9876543210");
    // await page.locator("#userPassword").fill("Test@123");
    // await page.locator("#confirmPassword").fill("Test@123");
    // await page.locator("[formcontrolname='required']").click();
    // await page.locator("#login").click();
    // await page.locator(".btn.btn-primary").click();
    await page.locator("#userEmail").fill("ashok@yopmail.com");
    await page.locator("#userPassword").fill("Test@123");
    await page.locator("#login").click();
    //await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
const titles = await page.locator(".card-body b").allTextContents();
console.log(titles);
console.log(await page.locator(".card-body b").first().textContent());
console.log(await page.locator(".card-body b").nth(1).textContent());
})  
