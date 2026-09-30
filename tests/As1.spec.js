const { test, expect } = require('@playwright/test');
const { text } = require('node:stream/consumers');

test('Assignment01', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const EventTitle = "Music Concert";
    await page.goto("https://eventhub.rahulshettyacademy.com/");
    await page.getByPlaceholder("you@email.com").fill("ashok@yopmail.com");
    await page.getByLabel('Password').fill("Test@123");
    await page.getByRole('button').click();
    expect(await page.getByText('Browse Events →')).toBeVisible();
    await page.getByRole('button', { name: 'Admin' }).click();
    await page.locator(".rotate-180").waitFor();
    await page.locator('a').filter({ hasText: 'Manage Events' }).first().click();
    await page.locator("#event-title-input").fill(EventTitle);
    await page.getByPlaceholder("Describe the event…").fill("Join the live music concert...");
    await page.locator("#category").selectOption("Concert");
    await page.locator("#city").fill("Coimbatore");
    await page.getByLabel("Venue").fill("Codissia");
    await page.getByLabel("Event Date & Time").pressSequentially("12122027");
    await page.getByLabel("Event Date & Time").press("Tab");
    await page.getByLabel("Event Date & Time").pressSequentially("0630PM");
    await page.getByLabel("Price").fill("250");
    await page.getByLabel("Total Seats").fill("1000");
    await page.locator("#add-event-btn").click();
    await page.getByText("Event Created").waitFor();
    expect(await page.getByText("Event Created")).toBeVisible();

    await page.locator("#nav-events").click();
    expect(await page.locator("#event-card").first()).toBeVisible();
    expect(await page.locator("#event-card").filter({ hasText: EventTitle })).toBeVisible();
    const SeatsBeforeBooking = await page.locator("#event-card").filter({ hasText: EventTitle }).locator("span.text-emerald-600").textContent();
    console.log(SeatsBeforeBooking);
    await page.locator("#event-card").filter({ hasText: EventTitle }).locator("#book-now-btn").click();
    expect(await page.locator("#ticket-count")).toHaveText('1');
    await page.getByLabel("Full Name").fill("Test user");
    await page.locator("#customer-email").fill("user@yopmail.com");
    await page.getByPlaceholder("+91 98765 43210").fill("9876543210");
    await page.locator("button.confirm-booking-btn").click();
    await page.locator(".booking-ref").waitFor();
    expect(await page.locator(".booking-ref")).toBeVisible();
    const bookingRef = await page.locator(".booking-ref").textContent();
    console.log(bookingRef);

    await page.locator("a button").first().click();
    expect(await page.locator("#booking-card").first()).toBeVisible();
    expect(await page.locator("#booking-card").filter({ hasText: bookingRef })).toBeVisible();
    const Title = await page.locator("#booking-card").filter({ hasText: bookingRef }).locator("h3").textContent();
    expect(Title === EventTitle).toBeTruthy();

    await page.locator("#nav-events").click();
    expect(await page.locator("#event-card").first()).toBeVisible();
    expect(await page.locator("#event-card").filter({ hasText: EventTitle })).toBeVisible();
    const SeatsAfterBooking = await page.locator("#event-card").filter({ hasText: EventTitle }).locator("span.text-emerald-600").textContent();
    console.log(SeatsAfterBooking);
    expect(SeatsAfterBooking === SeatsBeforeBooking - 1);



})  
