const { test, expect } = require('@playwright/test');
const { text } = require('node:stream/consumers');

test('Assignment02_Test01', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://eventhub.rahulshettyacademy.com/");
    await page.getByPlaceholder("you@email.com").fill("ashok@yopmail.com");
    await page.getByLabel('Password').fill("Test@123");
    await page.getByRole('button').click();
    await expect(page.getByText('Browse Events →')).toBeVisible();
    await page.locator("#event-card").first().locator("#book-now-btn").click();

    await expect(page.locator("#ticket-count")).toHaveText('1');
    await page.getByLabel("Full Name").fill("Test user");
    await page.locator("#customer-email").fill("user@yopmail.com");
    await page.getByPlaceholder("+91 98765 43210").fill("9876543210");
    await page.locator("button.confirm-booking-btn").click();
    await page.locator(".booking-ref").waitFor();
    await expect(page.locator(".booking-ref")).toBeVisible();
    const bookingRef = await page.locator(".booking-ref").textContent();
    console.log(bookingRef);
    const firstCharRef = bookingRef.trim().charAt(0);

    await page.locator("a button").first().click();
    await expect(page.locator("#booking-card").first()).toBeVisible();
    await expect(page.locator("#booking-card").filter({ hasText: bookingRef })).toBeVisible();
    await page.locator("#booking-card").filter({ hasText: bookingRef }).getByRole("button").first().click();
    const EventTitle = await page.locator(".text-2xl").textContent();
    const firstCharEvent = EventTitle.trim().charAt(0);
    console.log(firstCharEvent);
    console.log(EventTitle);
    console.log(firstCharRef);
    await expect(firstCharEvent === firstCharRef).toBeTruthy();

    await page.locator("#check-refund-btn").click();
    await expect(page.getByRole("status")).toBeVisible();
    await expect(page.getByRole("status")).toBeHidden({ timeout: 6000 });
    const result = await page.locator("#refund-result").textContent();
    console.log(result);
    await expect(page.locator("#refund-result")).toBeVisible();
    await expect(result.includes('Eligible for refund.')).toBeTruthy();
    await expect(result.includes('Single-ticket bookings qualify for a full refund.')).toBeTruthy();


})

test('Assignment02_Test02', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://eventhub.rahulshettyacademy.com/");
    await page.getByPlaceholder("you@email.com").fill("test@yopmail.com");
    await page.getByLabel('Password').fill("Test@123");
    await page.getByRole('button').click();
    await expect(page.getByText('Browse Events →')).toBeVisible();
    await page.locator("#event-card").first().locator("#book-now-btn").click();

    await expect(page.locator("#ticket-count")).toHaveText('1');
    await page.locator("button:has-text('+')").click({ clickCount: 2 });
    await page.getByLabel("Full Name").fill("Test user");
    await page.locator("#customer-email").fill("user@yopmail.com");
    await page.getByPlaceholder("+91 98765 43210").fill("9876543210");
    await page.locator("button.confirm-booking-btn").click();
    await page.locator(".booking-ref").waitFor();
    await expect(page.locator(".booking-ref")).toBeVisible();
    const bookingRef = await page.locator(".booking-ref").textContent();
    console.log(bookingRef);
    const firstCharRef = bookingRef.trim().charAt(0);

    await page.locator("a button").first().click();
    await expect(page.locator("#booking-card").first()).toBeVisible();
    await expect(page.locator("#booking-card").filter({ hasText: bookingRef })).toBeVisible();
    await page.locator("#booking-card").filter({ hasText: bookingRef }).getByRole("button").first().click();
    const EventTitle = await page.locator(".text-2xl").textContent();
    const firstCharEvent = EventTitle.trim().charAt(0);
    console.log(firstCharEvent);
    console.log(EventTitle);
    console.log(firstCharRef);
    await expect(firstCharEvent === firstCharRef).toBeTruthy();

    await page.locator("#check-refund-btn").click();
    await expect(page.getByRole("status")).toBeVisible();
    await expect(page.getByRole("status")).toBeHidden({ timeout: 6000 });
    const result = await page.locator("#refund-result").textContent();
    console.log(result);
    await expect(page.locator("#refund-result")).toBeVisible();
    await expect(result.includes('Not eligible for refund')).toBeTruthy();
    await expect(result.includes('Group bookings (3 tickets) are non-refundable')).toBeTruthy();


})