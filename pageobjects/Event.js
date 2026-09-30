const { expect } = require('@playwright/test');

class Event {
    constructor(page) {

        this.page = page;
        this.Loginbutton = page.getByRole('button');
        this.userName = page.getByPlaceholder("you@email.com");
        this.password = page.getByLabel('Password');
        this.fullName = page.getByLabel("Full Name");
        this.customerMail = page.locator("#customer-email");
        this.phnNum = page.getByPlaceholder("+91 98765 43210");

    }

    async goTo() {
        await this.page.goto("https://eventhub.rahulshettyacademy.com/");
    }

    async ValidLogin(user, password) {
        await this.userName.fill(user);
        await this.password.fill(password);
        await this.Loginbutton.click();
        await this.page.waitForLoadState('networkidle');
    }

    async bookTicket(cusName, cusMail, cusNum) {
        console.log("Test01: Book 1 ticket and check refund eligibility");
        await expect(this.page.getByText('Browse Events →')).toBeVisible();
        await this.page.locator("#event-card").first().locator("#book-now-btn").click();
        await expect(this.page.locator("#ticket-count")).toHaveText('1');
        await this.fullName.fill(cusName);
        await this.customerMail.fill(cusMail);
        await this.phnNum.fill(cusNum);
        await this.page.locator("button.confirm-booking-btn").click();
        await this.page.locator(".booking-ref").waitFor();
        await expect(this.page.locator(".booking-ref")).toBeVisible();

    }

    async ValidateRefID() {
        const bookingRef = await this.page.locator(".booking-ref").textContent();
        console.log("Booking Reference ID: ", bookingRef);
        const firstCharRef = bookingRef.trim().charAt(0);
        await this.page.locator("a button").first().click();
        await expect(this.page.locator("#booking-card").first()).toBeVisible();
        await expect(this.page.locator("#booking-card").filter({ hasText: bookingRef })).toBeVisible();
        await this.page.locator("#booking-card").filter({ hasText: bookingRef }).getByRole("button").first().click();
        const EventTitle = await this.page.locator(".text-2xl").textContent();
        const firstCharEvent = EventTitle.trim().charAt(0);
        console.log("Event Title: ", EventTitle);
        await expect(firstCharEvent === firstCharRef).toBeTruthy();
        console.log("Booking Reference ID matches with Event.");
    }

    async CheckRefundEligibility() {
        await this.page.locator("#check-refund-btn").click();
        await expect(this.page.getByRole("status")).toBeVisible();
        await expect(this.page.getByRole("status")).toBeHidden({ timeout: 6000 });
        const result = await this.page.locator("#refund-result").textContent();
        //console.log(result);
        await expect(this.page.locator("#refund-result")).toBeVisible();
        if (await result.includes("Single-ticket bookings qualify for a full refund.")) {
            console.log("Eligible for refund");
            console.log(result);
        }
        else {
            console.log("Not Eligible for refund");
            console.log(result);
        }

    }

    async book3Tickets(cusName, cusMail, cusNum) {
        console.log("Test02: Book 3 tickets and check refund eligibility");
        await this.page.locator("#event-card").last().locator("#book-now-btn").click();
        await expect(this.page.locator("#ticket-count")).toHaveText('1');
        await this.page.locator("button:has-text('+')").click({ clickCount: 2 });
        await this.page.getByLabel("Full Name").fill("Test user");
        await this.page.locator("#customer-email").fill("user@yopmail.com");
        await this.page.getByPlaceholder("+91 98765 43210").fill("9876543210");
        await this.page.locator("button.confirm-booking-btn").click();
        await this.page.locator(".booking-ref").waitFor();
        await expect(this.page.locator(".booking-ref")).toBeVisible();

    }


}
module.exports = { Event };